# Trabajador del Estudio — instrucciones para Claude en el PC de cada socio

El Estudio vive en upperfumes.com → Cuenta → Administración → pestaña **Estudio**.
Los datos están en Supabase (`estudio_videos`, `estudio_cola`, bucket privado `estudio`).
Este PC es un **trabajador**: toma pedidos de la cola, hace el trabajo con el plan de Claude
del socio y sube el resultado. Los dos PCs ven lo mismo porque todo queda en Supabase.

## Preparar el PC (una sola vez)

1. Clona el repo y crea `estudio/.env` (NUNCA se sube a GitHub, ya está en `.gitignore`):
   ```
   UP_EMAIL=tu-correo-admin
   UP_PASS=tu-clave-de-upperfumes.com
   UP_PC=PC de Juan        (o "PC de Camilo")
   ```
   La cuenta tiene que ser **Administrador** en la web (pestaña Usuarios).
2. Prueba: `python estudio/sb.py cola` debe imprimir `[]` o la lista de pedidos.
3. Para videos (Nico): prepara el taller una vez con `W=$HOME/nico bash estudio/toolkit/setup.sh`
   (descarga cinecode, la voz Kokoro y las fuentes; en Windows úsalo dentro de WSL).

## Cada ronda

1. `python estudio/sb.py cola` → mira los pedidos `pendiente` (los más antiguos primero, máximo 2 por ronda).
2. Por cada pedido: `python estudio/sb.py tomar <id>`. Si responde "ya lo tomó otro PC", sáltalo.
3. Haz el trabajo según el bot (abajo). Para leer un video: `python estudio/sb.py video <video_id>`.
   Para guardar: escribe el JSON `{ "id", "estado", "data": {...todo el data...}, "_accion": "texto" }`
   y corre `python estudio/sb.py guardar archivo.json`. Siempre parte del `data` que acabas de leer
   y conserva todos sus campos (versiones, notas, historial).
4. Cierra el pedido: `python estudio/sb.py hecho <id> "qué hiciste"` (o `error <id> "qué falló"`).
   Nunca digas que algo quedó listo si no quedó.

## Qué hace cada bot

Campos de un video (`data`): `titulo`, `idea`, `perfumes`, `origen`, `guion`, `notas[]`
(`{texto, de:"juan"|"claude", por, fecha, resuelta}`), `versiones[]` (`{path, fecha, nota, por}`),
`publicacion` (`{link, fecha, vistas, likes, comentarios, ventas, notas}`), `analisis`, `historial[]`.
Estados: `idea → guion → produccion → revision → listo → publicado` (o `descartada`).

- **Valentina (ideas)** — pedido sin `video_id`. Crea 2 videos nuevos con `estado: "idea"`, `id` único
  (ej. `v` + fecha), `origen: "valentina"`, `titulo` corto, `idea` (3–6 frases: situación, opciones
  A/B/C con perfumes, remate y cierre "Comenta tu letra" + WhatsApp), `perfumes` ("A X (marca), B Y, C Z").
  Mira `python estudio/sb.py lista` para no repetir ideas y lo que mejor funcionó en Resultados.
- **Mateo (guiones)** — pedido con `video_id` en estado `guion`. Escribe `guion` como texto por escenas:
  `1. (0–4 s) acción · Pantalla: … · Voz: …`. 30–45 s. Si la nota del pedido pide otro guion, cámbialo.
  Deja el estado en `guion` (Juan lo aprueba en la web).
- **Nico (videos)** — pedido con `video_id` en `produccion` (video nuevo) o en `revision` con notas
  `de:"juan"` sin resolver (cambios). Sigue `estudio/toolkit/NICO.md`, sección "Cómo se hace un video"
  (ignora sus partes de artifact/db_write: aquí todo va por `sb.py`). Al final:
  `python estudio/sb.py subir <video_id> <archivo.mp4> "qué hiciste y qué revisar"` — sube el MP4,
  marca las notas como resueltas y pasa el video a `revision`. Borrador 540×960 salvo que pidan HD.
- **Tomás (resultados)** — pedido con `video_id` publicado. Lee `publicacion` (métricas y comentarios)
  y escribe `analisis`: qué funcionó, qué no, y 2 ideas concretas para el próximo video.

## Reglas de marca (siempre)

Las de `estudio/toolkit/NICO.md`: solo perfumes árabes del catálogo, fotos reales de la tienda
(no dibujar frascos), sin "100% originales" ni promesas de duración, personajes propios,
español de Colombia con **tú** (nunca voseo), sin emojis en pantalla, WhatsApp 300 559 8061.
