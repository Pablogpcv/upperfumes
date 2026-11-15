#!/usr/bin/env python3
"""Worker de la granja de videos.

Cada vez que corre (cada 5 minutos desde GitHub Actions) revisa en Supabase las tarjetas del panel que están
"en cola" (status = working) y ejecuta el agente de su etapa:

  idea     -> el agente de ideas propone/rehace la idea
  guion    -> el agente de guion escribe el guion
  render   -> el render dibuja el video y lo sube a Supabase Storage
  edicion  -> el agente de edición escribe el texto para publicar (caption, hashtags)

Al terminar deja la tarjeta en "review" para que la apruebes en el panel.
Además, una vez al día propone ideas nuevas si hay pocas esperando aprobación (modo --ideas).

Variables de entorno (secretos de GitHub):
  SUPABASE_URL, SUPABASE_SERVICE_KEY, ANTHROPIC_API_KEY
"""
import os, sys, json, time, tempfile, urllib.request, urllib.error, urllib.parse, uuid

SB_URL = os.environ.get('SUPABASE_URL', '').rstrip('/')
SB_KEY = os.environ.get('SUPABASE_SERVICE_KEY', '')
AI_KEY = os.environ.get('ANTHROPIC_API_KEY', '')
MODEL = os.environ.get('GRANJA_MODEL', 'claude-sonnet-5-5')
BUCKET = 'videos'
MAX_TRIES = 3

STAGE_AGENT = {'idea': 'Agente de ideas', 'guion': 'Agente de guion', 'render': 'Agente de animación', 'edicion': 'Agente de edición'}
STAGE_DID = {'idea': 'propuso la idea', 'guion': 'entregó el guion', 'render': 'entregó el render', 'edicion': 'entregó el video final'}

CONTEXTO = """Marca: Upperfumes, tienda online de perfumes (diseñador y árabes) en Colombia, con asesoría personalizada.
Los perfumes son réplicas 1.1: NO afirmes que son originales ni uses marcas registradas de forma engañosa.
Formato: reels verticales de ~30 s en Instagram, estilo "expediente": un dato claro por escena, texto corto en MAYÚSCULAS.
Tono: cercano, colombiano neutro, útil y sin exagerar. No inventes cifras médicas ni promesas absolutas."""


# ---------------- HTTP ----------------
def http(method, url, headers=None, body=None, raw=False, timeout=120):
    h = dict(headers or {})
    data = None
    if body is not None:
        data = body if isinstance(body, (bytes, bytearray)) else json.dumps(body).encode()
        h.setdefault('Content-Type', 'application/json')
    req = urllib.request.Request(url, data=data, headers=h, method=method)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            out = r.read()
            return out if raw else (json.loads(out) if out else None)
    except urllib.error.HTTPError as e:
        raise RuntimeError('%s %s -> %s %s' % (method, url.split('?')[0], e.code, e.read()[:300].decode('utf-8', 'ignore')))


def sb_headers(extra=None):
    h = {'apikey': SB_KEY, 'Authorization': 'Bearer ' + SB_KEY}
    h.update(extra or {})
    return h


def sb_cards():
    q = urllib.parse.quote('videos|%', safe='')
    rows = http('GET', '%s/rest/v1/admin_datos?select=clave,data&clave=like.%s' % (SB_URL, q), sb_headers())
    return [r['data'] for r in rows if r.get('data')]


def sb_save(card):
    card['u'] = int(time.time() * 1000)
    http('POST', SB_URL + '/rest/v1/admin_datos?on_conflict=clave',
         sb_headers({'Prefer': 'resolution=merge-duplicates,return=minimal'}),
         [{'clave': 'videos|' + card['id'], 'data': card, 'actualizado': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())}])


def sb_upload_video(path, name):
    # el bucket público 'videos' se crea una vez; si ya existe, se ignora el error
    try:
        http('POST', SB_URL + '/storage/v1/bucket', sb_headers(), {'id': BUCKET, 'name': BUCKET, 'public': True})
    except RuntimeError as e:
        if 'already exists' not in str(e) and 'Duplicate' not in str(e) and '409' not in str(e):
            raise
    with open(path, 'rb') as f:
        data = f.read()
    http('POST', '%s/storage/v1/object/%s/%s' % (SB_URL, BUCKET, name),
         sb_headers({'Content-Type': 'video/mp4', 'x-upsert': 'true'}), data, raw=True, timeout=300)
    return '%s/storage/v1/object/public/%s/%s' % (SB_URL, BUCKET, name)


# ---------------- Claude ----------------
def claude_json(system, user, max_tokens=1800):
    out = http('POST', 'https://api.anthropic.com/v1/messages',
               {'x-api-key': AI_KEY, 'anthropic-version': '2023-06-01'},
               {'model': MODEL, 'max_tokens': max_tokens, 'system': system + '\n\nResponde SOLO con JSON válido, sin texto adicional ni bloques de código.',
                'messages': [{'role': 'user', 'content': user}]})
    text = ''.join(b.get('text', '') for b in out.get('content', []))
    a, b = text.find('{'), text.rfind('}')
    if a < 0 or b < 0:
        a, b = text.find('['), text.rfind(']')
    return json.loads(text[a:b + 1])


def log(card, who, text):
    card.setdefault('history', []).append({'t': int(time.time() * 1000), 'who': who, 'text': text})


# ---------------- agentes ----------------
def agente_idea(card):
    motivo = card.get('rejectReason') or ''
    prev = card.get('idea') or {}
    r = claude_json(CONTEXTO + '\nEres el agente de ideas. Mejoras una idea de reel.',
        'Tema: %s\nGancho actual: %s\nÁngulo actual: %s\nCorrección pedida por el dueño: %s\n\n'
        'Devuelve {"hook": "...", "angulo": "...", "cta": "...", "duracion": "~30 s"} con una versión mejor. '
        'El gancho debe ser una frase corta que enganche en 2 segundos.' % (card['title'], card.get('hook', ''), prev.get('angulo', ''), motivo or 'ninguna'))
    card['hook'] = r['hook']
    card['idea'] = {'angulo': r['angulo'], 'cta': r.get('cta', ''), 'duracion': r.get('duracion', '~30 s')}


def agente_guion(card):
    idea = card.get('idea') or {}
    motivo = card.get('rejectReason') or ''
    r = claude_json(CONTEXTO + '\nEres el agente de guion. Escribes el guion de un reel por escenas.',
        'Tema: %s\nGancho: %s\nÁngulo: %s\nCierre deseado: %s\nCorrección pedida por el dueño: %s\n\n'
        'Devuelve {"guion": [[PANTALLA, SUBTÍTULO], ...]} con 5 a 7 escenas, todo en MAYÚSCULAS y muy corto '
        '(PANTALLA máx. 3 palabras, SUBTÍTULO máx. 7 palabras). Escena 1 = gancho (dos líneas que se leen seguidas). '
        'Escenas del medio = PANTALLA "HÁBITO 1"/"PASO 2"/etc. y SUBTÍTULO con la idea. Última escena = pregunta de cierre '
        'y "COMENTA" o "TE AYUDAMOS A ELEGIR".' % (card['title'], card.get('hook', ''), idea.get('angulo', ''), idea.get('cta', ''), motivo or 'ninguna'))
    g = [[str(a).strip().upper(), str(b).strip().upper()] for a, b in r['guion'] if a or b]
    if len(g) < 3:
        raise RuntimeError('guion demasiado corto')
    card['guion'] = g


def agente_render(card):
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    import render_video
    with tempfile.TemporaryDirectory() as td:
        out = os.path.join(td, 'v.mp4')
        secs = render_video.render(card, out)
        name = '%s-%s.mp4' % (card['id'], int(time.time()))
        card['videoUrl'] = sb_upload_video(out, name)
        card['videoSecs'] = round(secs)


def agente_edicion(card):
    idea = card.get('idea') or {}
    guion = ' / '.join(' '.join(p) for p in card.get('guion', []))
    r = claude_json(CONTEXTO + '\nEres el agente de edición. Preparas el texto para publicar el reel en Instagram.',
        'Tema: %s\nGancho: %s\nGuion: %s\nCierre deseado: %s\n\n'
        'Devuelve {"caption": "...", "tags": ["#...", ...], "music": "..."}: caption de 2 a 4 frases (sin comillas raras), '
        'termina invitando a escribirnos para una asesoría personalizada; 5 hashtags; y una sugerencia de música instrumental '
        '(solo describe el tipo, no nombres canciones con derechos).' % (card['title'], card.get('hook', ''), guion, idea.get('cta', '')))
    card['caption'] = r['caption']
    card['tags'] = r['tags'][:6]
    card['music'] = r.get('music', 'por elegir')


AGENTES = {'idea': agente_idea, 'guion': agente_guion, 'render': agente_render, 'edicion': agente_edicion}


def procesar(card):
    st = card['stage']
    fn = AGENTES.get(st)
    if not fn:
        return
    print('->', card.get('code'), st)
    try:
        fn(card)
        card['status'] = 'review'; card['startedAt'] = None; card['tries'] = 0; card.pop('error', None)
        log(card, STAGE_AGENT[st], STAGE_DID[st])
    except Exception as e:
        card['tries'] = card.get('tries', 0) + 1
        card['error'] = str(e)[:300]
        print('   falló:', e)
        if card['tries'] >= MAX_TRIES:
            card['status'] = 'rejected'
            card['rejectReason'] = 'El agente falló 3 veces: ' + card['error']
            log(card, STAGE_AGENT[st], 'falló 3 veces; revisa y pide otra versión')
        else:
            log(card, STAGE_AGENT[st], 'falló (intento %d de %d), reintenta en 5 min' % (card['tries'], MAX_TRIES))
    sb_save(card)


def proponer_ideas(cards, minimo=3):
    pendientes = [c for c in cards if c['stage'] == 'idea' and c['status'] in ('review', 'working')]
    if len(pendientes) >= minimo:
        print('Hay %d ideas esperando; no propongo más.' % len(pendientes))
        return
    temas = [c['title'] for c in cards]
    n_new = minimo - len(pendientes)
    r = claude_json(CONTEXTO + '\nEres el agente de ideas. Propones temas nuevos para reels educativos sobre perfumes.',
        'Temas que ya existen (no los repitas): %s\n\nPropón %d ideas nuevas. Devuelve {"ideas": [{"title": "...", "hook": "...", "angulo": "...", "cta": "..."}]}. '
        'Cada una útil para quien compra perfume (cómo elegir, cuidar, probar, combinar con ocasión o clima).' % ('; '.join(temas) or 'ninguno', n_new))
    nums = [int(''.join(ch for ch in str(c.get('code', '')) if ch.isdigit()) or 0) for c in cards]
    n = max([0] + nums)
    for idea in r['ideas'][:n_new]:
        n += 1
        c = {'id': 'v' + uuid.uuid4().hex[:8], 'code': 'EXP %02d' % n, 'title': idea['title'], 'hook': idea['hook'], 'stage': 'idea', 'status': 'review',
             'idea': {'angulo': idea['angulo'], 'cta': idea.get('cta', ''), 'duracion': '~30 s'}, 'history': []}
        log(c, STAGE_AGENT['idea'], STAGE_DID['idea'])
        sb_save(c)
        print('idea nueva:', c['code'], c['title'])


def main():
    if not (SB_URL and SB_KEY):
        sys.exit('Faltan SUPABASE_URL y SUPABASE_SERVICE_KEY')
    if not AI_KEY:
        print('Aviso: falta ANTHROPIC_API_KEY; solo funcionará el render.')
    cards = [c for c in sb_cards() if c.get('status') != 'archived']
    if '--check' in sys.argv:
        # paso barato: dice si hay tarjetas en cola para no instalar nada cuando no hay trabajo
        hay = any(c.get('status') == 'working' for c in cards)
        print('Hay trabajo:', hay)
        out = os.environ.get('GITHUB_OUTPUT')
        if out:
            with open(out, 'a') as f:
                f.write('hay=%s\n' % ('true' if hay else 'false'))
        return
    if '--ideas' in sys.argv:
        proponer_ideas(cards)
        return
    cola = [c for c in cards if c.get('status') == 'working']
    # primero lo barato (texto), al final el render
    cola.sort(key=lambda c: 1 if c['stage'] == 'render' else 0)
    print('Tarjetas en cola:', len(cola))
    for c in cola:
        if c['stage'] in ('idea', 'guion', 'edicion') and not AI_KEY:
            continue
        procesar(c)


if __name__ == '__main__':
    main()
