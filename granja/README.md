# Granja de videos

Los agentes que trabajan lo que apruebas en `upperfumes.com/panel/`.

## Cómo funciona

1. En el panel apruebas una etapa (idea, guion, render o edición). La tarjeta queda **en cola**.
2. Cada 5 minutos, GitHub Actions (`.github/workflows/granja.yml`) revisa si hay tarjetas en cola.
3. `worker.py` ejecuta el agente de esa etapa y deja la tarjeta **por aprobar**:
   - **Ideas / guion / edición:** escribe Claude (API de Anthropic).
   - **Render:** `render_video.py` dibuja el video con el guion y lo sube a Supabase Storage (bucket `videos`).
4. Una vez al día (8:00 a. m. Colombia) el agente de ideas propone ideas nuevas si hay menos de 3 esperando.

Si algo falla, la tarjeta muestra el error y se reintenta hasta 3 veces; después queda **rechazada** para que pidas otra versión.

## Secretos que hay que crear (una sola vez)

GitHub → repositorio → Settings → Secrets and variables → Actions → New repository secret:

| Secreto | De dónde sale |
|---|---|
| `SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `SUPABASE_SERVICE_KEY` | Supabase → Project Settings → API → clave `service_role` (secreta, nunca va en el código ni en el chat) |
| `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys |

## Probar a mano

Actions → "Granja de videos" → Run workflow. Modo `cola` trabaja lo que esté en cola; modo `ideas` propone ideas nuevas.

El render también corre en cualquier computador con ffmpeg y Pillow:
`python3 granja/render_video.py tarjeta.json salida.mp4`
