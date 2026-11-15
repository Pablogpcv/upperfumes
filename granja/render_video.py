#!/usr/bin/env python3
"""Genera un video vertical (720x1280, 30 fps, sin audio) a partir de un guion del panel.

Uso:  python3 granja/render_video.py tarjeta.json salida.mp4

tarjeta.json:  {"code": "EXP 02", "title": "...", "guion": [["PANTALLA", "SUBTÍTULO"], ...]}
Primera escena = gancho, última = cierre, las del medio = puntos numerados.
"""
import sys, os, json, math, random, subprocess, glob, tempfile
import numpy as np
from PIL import Image, ImageDraw, ImageFont

W, H, FPS = 720, 1280, 30
GOLD = (212, 175, 55); WHITE = (245, 245, 235); GREY = (140, 140, 140)
HANDLE = '@upperfumess'
FONT_DIRS = [os.environ.get('GRANJA_FONT_DIR', ''), '/usr/share/fonts/opentype/inter', '/usr/share/fonts/truetype/inter',
             '/usr/share/fonts/truetype/dejavu']
WT = {'black': ['Inter-Black.otf', 'DejaVuSans-Bold.ttf'], 'xb': ['Inter-ExtraBold.otf', 'DejaVuSans-Bold.ttf'],
      'b': ['Inter-Bold.otf', 'DejaVuSans-Bold.ttf']}
_fc = {}


def F(size, w='xb'):
    k = (size, w)
    if k not in _fc:
        for d in FONT_DIRS:
            for name in WT[w]:
                p = os.path.join(d, name)
                if d and os.path.exists(p):
                    _fc[k] = ImageFont.truetype(p, size)
                    break
            if k in _fc:
                break
        if k not in _fc:
            _fc[k] = ImageFont.load_default()
    return _fc[k]


def clamp(x): return max(0.0, min(1.0, x))
def ease(x): x = clamp(x); return 1 - (1 - x) ** 3
def appear(t, t0, d=0.4): return ease((t - t0) / d)


_tc = {}
def tl(segs, size, w='xb', track=0):
    if isinstance(segs, str):
        segs = [(segs, WHITE)]
    key = (tuple(segs), size, w, track)
    if key in _tc:
        return _tc[key]
    f = F(size, w)
    parts = []; x = 0
    for txt, col in segs:
        if track:
            for ch in txt:
                parts.append((ch, col, x)); x += f.getlength(ch) + track
        else:
            parts.append((txt, col, x)); x += f.getlength(txt)
    im = Image.new('RGBA', (int(x) + 16, int(size * 1.45)), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    for txt, col, px in parts:
        d.text((4 + px, int(size * 1.02)), txt, font=f, fill=col + (255,), anchor='ls')
    _tc[key] = im
    return im


def put(base, layer, x, y, a=1.0):
    if a <= 0.003:
        return
    l = layer
    if a < 0.999:
        l = layer.copy(); l.putalpha(l.getchannel('A').point(lambda v: int(v * a)))
    base.paste(l, (int(x - l.width / 2), int(y)), l)


def reveal(img, layer, x, y, p, rise=22):
    put(img, layer, x, y + (1 - p) * rise, p)


def fit(text, start, minimum, maxw, maxlines, w='xb'):
    """Parte el texto en líneas que quepan; baja el tamaño hasta que quepa."""
    words = str(text).split()
    for size in range(start, minimum - 1, -2):
        f = F(size, w); lines = []; cur = ''
        for wd in words:
            test = (cur + ' ' + wd).strip()
            if f.getlength(test) <= maxw or not cur:
                cur = test
            else:
                lines.append(cur); cur = wd
        lines.append(cur)
        if len(lines) <= maxlines and all(f.getlength(l) <= maxw for l in lines):
            return size, lines
    return minimum, lines


def stack(img, text, color, start, minimum, y, t, t0, maxw=640, maxlines=3, w='black', gap=1.12):
    """Dibuja un texto en varias líneas centradas; devuelve la y siguiente."""
    size, lines = fit(text, start, minimum, maxw, maxlines, w)
    for i, ln in enumerate(lines):
        reveal(img, tl([(ln, color)], size, w), W / 2, y, appear(t, t0 + i * 0.12))
        y += size * gap
    return y


# ---------- fondo ----------
def make_bg():
    yy = np.arange(H)[:, None].astype(np.float32); xx = np.arange(W)[None, :].astype(np.float32)
    edge = np.clip(1 - np.abs(xx - W / 2) / (30 + yy * 0.26), 0, 1) ** 0.9
    fall = np.clip(1 - yy / (H * 0.95), 0, 1) ** 1.1
    img = ((edge * fall * 0.34)[..., None] * np.array((190, 150, 50), dtype=np.float32)[None, None, :]).astype(np.uint8)
    return Image.fromarray(img, 'RGB')


BG = make_bg()
random.seed(7)
STARS = [(random.randint(0, W - 1), random.randint(0, H - 1), random.random() * 6.28, random.choice([1, 1, 2])) for _ in range(130)]


def base(gt):
    img = BG.copy(); d = ImageDraw.Draw(img)
    for x, y, ph, s in STARS:
        v = int(255 * (0.18 + 0.30 * (0.5 + 0.5 * math.sin(gt * 1.6 + ph))))
        d.ellipse((x, y, x + s, y + s), fill=(v, v, int(v * 0.82)))
    return img


def chrome(img, code, seg=None, total=0):
    d = ImageDraw.Draw(img)
    put(img, tl([('UPPER', WHITE), ('FUMES', GOLD)], 20, 'black', 3), W / 2, 34)
    d.rounded_rectangle((628, 40, 672, 86), 7, outline=(110, 110, 110), width=2)
    num = ''.join(c for c in str(code) if c.isdigit())[-2:] or '01'
    put(img, tl([('EXP', GREY)], 9, 'b', 1), 650, 46)
    put(img, tl([(num, WHITE)], 19, 'black'), 650, 56)
    if seg and total:
        gap = 10; avail = 460; sw = (avail - gap * (total - 1)) / total
        x0 = (W - avail) / 2
        for i in range(total):
            xa = x0 + i * (sw + gap)
            d.rectangle((xa, 100, xa + sw, 103), fill=GOLD if i < seg else (62, 62, 62))
        put(img, tl([('PUNTO %d / %d' % (seg, total), GREY)], 13, 'b', 3), W / 2, 110)
    put(img, tl([(HANDLE, GREY)], 15, 'b', 1), W / 2, 922, 0.8)


def pill(text, size, fill, tcol, padx=26, pady=13, w='black', track=1):
    lay = tl([(text, tcol)], size, w, track)
    pw = lay.width + 2 * padx - 12; ph = size + 2 * pady
    im = Image.new('RGBA', (pw + 4, ph + 4), (0, 0, 0, 0))
    ImageDraw.Draw(im).rounded_rectangle((2, 2, pw + 2, ph + 2), ph // 2, fill=fill)
    im.alpha_composite(lay, ((im.width - lay.width) // 2, (im.height - lay.height) // 2))
    return im


def numeral_circle(img, cx, cy, r, n, t):
    p = ease((t - 0.1) / 0.5)
    if p <= 0:
        return
    S = 2; R = int(r * p); sz = (2 * r + 40) * S
    lay = Image.new('RGBA', (sz, sz), (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
    c = sz // 2
    d.ellipse((c - R * S, c - R * S, c + R * S, c + R * S), fill=(24, 20, 12, 255), outline=(60, 52, 28, 255), width=5 * S)
    arc = ease((t - 0.3) / 1.2)
    if arc > 0.01 and R > 5:
        d.arc((c - R * S, c - R * S, c + R * S, c + R * S), -90, -90 + 360 * arc, fill=GOLD + (255,), width=7 * S)
    lay = lay.resize((sz // S, sz // S), Image.LANCZOS)
    img.paste(lay, (int(cx - lay.width / 2), int(cy - lay.height / 2)), lay)
    put(img, tl([(str(n), GOLD)], 150, 'black'), cx, cy - 112, p)


# ---------- escenas ----------
def draw_hook(img, t, p):
    chrome(img, p['code'])
    y = 330
    y = stack(img, p['a'], WHITE, 56, 34, y, t, 0.2, maxlines=3, w='xb')
    stack(img, p['b'], GOLD, 80, 40, y + 18, t, 1.0, maxlines=3)


def draw_stamp(img, t, p):
    chrome(img, p['code'])
    txt = tl([('EXPEDIENTE ' + p['num'], GOLD)], 52, 'black')
    w = txt.width + 60; h = 118
    st = Image.new('RGBA', (w, h), (0, 0, 0, 0)); d = ImageDraw.Draw(st)
    d.rounded_rectangle((3, 3, w - 3, h - 3), 10, outline=GOLD + (255,), width=5)
    d.rounded_rectangle((12, 12, w - 12, h - 12), 6, outline=GOLD + (110,), width=2)
    st.alpha_composite(txt, ((w - txt.width) // 2, (h - txt.height) // 2))
    st = st.rotate(5, expand=True, resample=Image.BICUBIC)
    e = ease(t / 0.35); s = 1 + 0.4 * (1 - e)
    st = st.resize((int(st.width * s), int(st.height * s)), Image.BICUBIC)
    put(img, st, W / 2, 440 - st.height / 2, e)
    stack(img, p['title'].upper(), GREY, 30, 20, 590, t, 0.6, maxlines=3, w='xb', gap=1.25)


def draw_mid(img, t, p):
    chrome(img, p['code'], seg=p['k'], total=p['m'])
    size, lines = fit(p['a'], 50, 28, 650, 2, 'black')
    y = 140
    for i, ln in enumerate(lines):
        reveal(img, tl(ln, size, 'black'), W / 2, y, appear(t, 0.0 + i * 0.1, 0.4)); y += size * 1.1
    numeral_circle(img, W / 2, 470, 130, p['k'], t)
    stack(img, p['b'], WHITE, 56, 34, 650, t, 0.7, maxlines=3, w='xb', gap=1.15)


def draw_cta(img, t, p):
    chrome(img, p['code'])
    y = stack(img, p['a'], WHITE, 66, 34, 220, t, 0.1, maxlines=2)
    y = stack(img, p['b'], GOLD, 74, 36, y + 6, t, 0.5, maxlines=2)
    reveal(img, pill('ASESORÍA PERSONALIZADA', 22, GOLD + (255,), (14, 10, 2)), W / 2, max(y + 60, 600), appear(t, 1.2))
    reveal(img, tl([('@UPPERFUMESS · LINK EN MI PERFIL', GOLD)], 17, 'xb', 2), W / 2, max(y + 140, 680), appear(t, 1.6))


DRAW = {'hook': draw_hook, 'stamp': draw_stamp, 'mid': draw_mid, 'cta': draw_cta}


def plan(card):
    g = [list(map(str, s[:2])) + [''] * (2 - len(s)) for s in card.get('guion', []) if s]
    code = card.get('code', 'EXP 01'); num = ''.join(c for c in code if c.isdigit())[-2:] or '01'
    title = card.get('title', '')
    scenes = []
    if not g:
        raise SystemExit('La tarjeta no tiene guion')
    scenes.append(('hook', 3.6, dict(code=code, a=g[0][0], b=g[0][1])))
    scenes.append(('stamp', 3.0, dict(code=code, num=num, title=title)))
    mids = g[1:-1] if len(g) >= 3 else []
    for i, (a, b) in enumerate(mids, 1):
        dur = max(3.6, min(6.0, 2.6 + 0.05 * len(b)))
        scenes.append(('mid', dur, dict(code=code, k=i, m=len(mids), a=a, b=b)))
    if len(g) >= 2:
        scenes.append(('cta', 4.2, dict(code=code, a=g[-1][0], b=g[-1][1])))
    return scenes


def render_scene(args):
    idx, kind, dur, params, start, outdir = args
    n = int(round(dur * FPS))
    tmp = os.path.join(outdir, 's%02d.part.mp4' % idx); out = os.path.join(outdir, 's%02d.mp4' % idx)
    p = subprocess.Popen(['ffmpeg', '-y', '-v', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', '%dx%d' % (W, H),
                          '-r', str(FPS), '-i', '-', '-c:v', 'libx264', '-crf', '18', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', tmp],
                         stdin=subprocess.PIPE)
    for k in range(n):
        t = k / FPS
        img = base(start + t)
        DRAW[kind](img, t, params)
        p.stdin.write(img.tobytes())
    p.stdin.close()
    rc = p.wait()
    if rc != 0:
        raise RuntimeError('ffmpeg falló en la escena %d' % idx)
    os.rename(tmp, out)
    return out


def render(card, out_path):
    from multiprocessing import Pool
    scenes = plan(card)
    with tempfile.TemporaryDirectory() as td:
        jobs = []; acc = 0.0
        for i, (kind, dur, params) in enumerate(scenes):
            jobs.append((i, kind, dur, params, acc, td)); acc += dur
        with Pool(min(4, os.cpu_count() or 1)) as pool:
            files = pool.map(render_scene, jobs)
        lst = os.path.join(td, 'list.txt')
        with open(lst, 'w') as f:
            for p in files:
                f.write("file '%s'\n" % p)
        tmp_out = out_path + '.part.mp4'
        subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', '-movflags', '+faststart', tmp_out], check=True)
        os.rename(tmp_out, out_path)
    return acc


if __name__ == '__main__':
    card = json.load(open(sys.argv[1]))
    secs = render(card, sys.argv[2])
    print('listo: %s (%.1f s)' % (sys.argv[2], secs))
