"""Conexión del trabajador (Claude en el PC de cada socio) con el Estudio en Supabase.

Usa la llave pública de la web + el correo y clave de una cuenta ADMIN, guardados en
estudio/.env (ese archivo NUNCA se sube a GitHub; ya está en .gitignore):

    UP_EMAIL=correo-admin@ejemplo.com
    UP_PASS=la-clave
    UP_PC=PC de Juan

Uso desde la terminal:
    python estudio/sb.py cola                 -> pedidos pendientes
    python estudio/sb.py tomar <id>           -> marca un pedido como "tomado" por este PC
    python estudio/sb.py hecho <id> [nota]    -> marca un pedido como hecho
    python estudio/sb.py error <id> [nota]
    python estudio/sb.py video <id>           -> imprime el video (JSON)
    python estudio/sb.py lista [estado]       -> lista videos (id, estado, título)
    python estudio/sb.py guardar <archivo.json>   -> inserta/actualiza un video {id, estado, ...data}
    python estudio/sb.py subir <video_id> <archivo.mp4> [nota]  -> sube versión y pasa a revisión
"""
import json, os, sys, time, urllib.request, urllib.error

URL = "https://pyxmrttbjynccwviotef.supabase.co"
KEY = "sb_publishable_QDeX1szmmx4wxQ4enVhuyQ_SdKFxxGM"   # llave pública (la misma de js/app.js)
AQUI = os.path.dirname(os.path.abspath(__file__))


def env():
    e = {}
    p = os.path.join(AQUI, ".env")
    if os.path.exists(p):
        for l in open(p, encoding="utf-8"):
            if "=" in l and not l.strip().startswith("#"):
                k, v = l.strip().split("=", 1); e[k.strip()] = v.strip()
    e.update({k: v for k, v in os.environ.items() if k.startswith("UP_")})
    return e


E = env()
PC = E.get("UP_PC", "PC")


def req(method, path, body=None, token=None, headers=None, raw=None):
    h = {"apikey": KEY, "Authorization": "Bearer " + (token or KEY)}
    if body is not None: h["Content-Type"] = "application/json"
    h.update(headers or {})
    data = raw if raw is not None else (json.dumps(body).encode() if body is not None else None)
    r = urllib.request.Request(URL + path, data=data, method=method, headers=h)
    try:
        with urllib.request.urlopen(r, timeout=120) as f:
            t = f.read().decode() or "null"
            return json.loads(t) if t.strip()[:1] in "[{n" else t
    except urllib.error.HTTPError as e:
        sys.exit(f"Error {e.code}: {e.read().decode()[:400]}")


_tok = None
def token():
    global _tok
    if not _tok:
        if not E.get("UP_EMAIL"): sys.exit("Falta estudio/.env con UP_EMAIL y UP_PASS (cuenta administradora).")
        r = req("POST", "/auth/v1/token?grant_type=password", {"email": E["UP_EMAIL"], "password": E["UP_PASS"]})
        _tok = r["access_token"]
    return _tok


def ahora(): return time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
def db(method, path, body=None, prefer=None):
    return req(method, "/rest/v1/" + path, body, token(), {"Prefer": prefer} if prefer else None)


def video(vid):
    r = db("GET", f"estudio_videos?id=eq.{vid}&select=*")
    if not r: sys.exit("No existe el video " + vid)
    return r[0]


def guardar_video(v, accion=None):
    vid, estado = v.pop("id"), v.pop("estado", None)
    for k in ("creado", "actualizado"): v.pop(k, None)
    data = v.get("data", v)
    if accion: data["historial"] = (data.get("historial") or [])[-39:] + [{"fecha": ahora(), "por": PC, "accion": accion}]
    fila = {"id": vid, "data": data, "actualizado": ahora()}
    if estado: fila["estado"] = estado
    return db("POST", "estudio_videos?on_conflict=id", fila, "resolution=merge-duplicates,return=minimal")


def main(a):
    c = a[0] if a else "cola"
    if c == "cola":
        print(json.dumps(db("GET", "estudio_cola?estado=in.(pendiente,tomado)&order=creado.asc"), ensure_ascii=False, indent=1))
    elif c in ("tomar", "hecho", "error"):
        est = {"tomar": "tomado", "hecho": "hecho", "error": "error"}[c]
        cambio = {"estado": est, "actualizado": ahora()}
        if c == "tomar": cambio["tomado_por"] = PC
        if len(a) > 2: cambio["nota"] = " ".join(a[2:])
        filtro = f"estudio_cola?id=eq.{a[1]}" + ("&estado=eq.pendiente" if c == "tomar" else "")
        r = db("PATCH", filtro, cambio, "return=representation")
        print("OK" if r else "Ese pedido ya lo tomó otro PC")
    elif c == "video":
        print(json.dumps(video(a[1]), ensure_ascii=False, indent=1))
    elif c == "lista":
        f = f"&estado=eq.{a[1]}" if len(a) > 1 else ""
        for v in db("GET", "estudio_videos?select=id,estado,data->>titulo&order=actualizado.desc" + f):
            print(v["id"], v["estado"], v.get("titulo"), sep=" | ")
    elif c == "guardar":
        v = json.load(open(a[1], encoding="utf-8")); acc = v.pop("_accion", None)
        guardar_video(v, acc); print("OK")
    elif c == "subir":
        vid, archivo, nota = a[1], a[2], " ".join(a[3:]) or f"Versión de {PC}"
        path = f"{vid}/v{int(time.time())}.mp4"
        req("POST", f"/storage/v1/object/estudio/{path}", token=token(), headers={"Content-Type": "video/mp4"}, raw=open(archivo, "rb").read())
        v = video(vid); d = v["data"]
        d["versiones"] = [x for x in (d.get("versiones") or []) if x.get("path")] + [{"path": path, "fecha": ahora(), "nota": nota, "por": PC}]
        for n in d.get("notas") or []:
            if n.get("de") != "claude": n["resuelta"] = True
        d["notas"] = (d.get("notas") or []) + [{"texto": nota, "de": "claude", "por": "Nico", "fecha": ahora()}]
        guardar_video({"id": vid, "estado": "revision", "data": d}, "Nico subió una versión")
        print("OK", path)
    else:
        print(__doc__)


if __name__ == "__main__":
    main(sys.argv[1:])
