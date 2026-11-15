# Uso: python3 -I armar.py <film_dir>/film.html <seccion_film.js>
# Pone la sección FILM (desde "// ===... FILM ===" hasta antes de "// ===... HELPERS (picture)") dentro del film.html de cinecode
# y hace que la página espere a que carguen las fotos (photoReady) antes de renderizar.
import sys
html, sec = sys.argv[1], sys.argv[2]
s = open(html).read(); f = open(sec).read()
a = s.index('// ============================== FILM ==='); b = s.index('// ============================== HELPERS (picture)')
s = s[:a] + f.rstrip() + '\n\n' + s[b:]
old = 'window.READY = loadType(TYPE).then(loadFormulas)'
if old in s: s = s.replace(old, 'window.READY = loadType(TYPE).then((r) => photoReady.then(() => r)).then(loadFormulas)')
open(html, 'w').write(s); print('film.html armado:', html)
