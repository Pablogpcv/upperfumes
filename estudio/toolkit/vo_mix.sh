#!/bin/bash
# usage: vo_mix.sh video.mp4 spec.json out.mp4
set -e
V=$1; J=$2; O=$3
D=$(python3 -c "import json;print(json.load(open('$J'))['out'])")
mapfile -t ATS < <(python3 -c "import json;[print(l['at']) for l in json.load(open('$J'))['lines']]")
IN=""; F=""; L=""
for i in "${!ATS[@]}"; do n=$((i+1)); IN="$IN -i $D/L$n.wav"; ms=$(python3 -c "print(int(${ATS[$i]}*1000))"); F="$F[$n:a]aresample=48000,adelay=${ms}|${ms},pan=stereo|c0=c0|c1=c0[v$n];"; L="$L[v$n]"; done
N=${#ATS[@]}
ffmpeg -v error -y -i "$V" $IN -filter_complex "${F}${L}amix=inputs=$N:normalize=0,volume=1.9,highpass=f=80,acompressor=threshold=-20dB:ratio=3:attack=5:release=120,asplit=2[vo][sc];[0:a]aresample=48000,volume=0.75[bg];[bg][sc]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=350[duck];[duck][vo]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=9[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k "$O"
