import os, sys, json, soundfile as sf
from kokoro_onnx import Kokoro
k = Kokoro(os.environ["TTS_DIR"] + "/kokoro-v1.0.onnx", os.environ["TTS_DIR"] + "/voices-v1.0.bin")
spec = json.load(open(sys.argv[1]))
for i, ln in enumerate(spec["lines"]):
    a, sr = k.create(ln["text"], voice=ln.get("voice", spec["voice"]), speed=ln.get("speed", spec["speed"]), lang="es")
    sf.write(f'{spec["out"]}/L{i+1}.wav', a, sr); print(f'L{i+1} {len(a)/sr:4.2f} {ln["text"]}')
