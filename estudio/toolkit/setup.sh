#!/bin/bash
# Prepara el taller de Nico en una sesión nueva. Uso: W=$HOME/nico bash setup.sh
set -e
AQUI=$(cd "$(dirname "$0")" && pwd)
W=${W:-$HOME/nico}; mkdir -p "$W"; cd "$W"
[ -d cinecode ] || git clone -q --depth 1 https://github.com/sarpstar/cinecode.git
[ -d upperfumes ] || GIT_LFS_SKIP_SMUDGE=1 git clone -q --depth 1 https://github.com/Pablogpcv/upperfumes
mkdir -p fonts
if [ ! -f fonts/fredoka-latin-700-normal.woff2 ]; then
  T=$(mktemp -d); (cd "$T" && npm pack -q @fontsource/fredoka @fontsource/inter >/dev/null 2>&1)
  for f in "$T"/*.tgz; do mkdir -p "$T/x" && tar xzf "$f" -C "$T/x" && cp "$T"/x/package/files/*-latin-{500,600,700}-normal.woff2 fonts/ 2>/dev/null || true; rm -rf "$T/x"; done
fi
[ -x venv/bin/python ] || python3 -m venv venv
venv/bin/pip install -q kokoro-onnx soundfile 2>&1 | tail -1
mkdir -p tts
for f in kokoro-v1.0.onnx voices-v1.0.bin; do [ -s tts/$f ] || curl -sSL -m 600 -o tts/$f https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/$f; done
mkdir -p toolkit && cp "$AQUI"/* toolkit/
which ffmpeg >/dev/null && echo "TALLER LISTO en $W" || echo "FALTA ffmpeg"
