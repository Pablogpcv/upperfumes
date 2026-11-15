// ============================== FILM ==============================
const TITLE = 'Upperfumes Perdon';
const PURPOSE = 'ad';
const LOOKS = {
  'anime-cel': { grade: 'saturate(1.05) contrast(1.02)', bloom: 0.08, texture: null, vignette: 0.12, grain: 0, grainHold: 1, hold: 24, line: 0.004, steps: 0,
    palette: { bg: '#2a1620', ink: '#ffffff', accent: '#e2b04a', dim: '#5a2f42' } },
};
const LOOK_ID = 'anime-cel';
const LOOK = LOOKS[LOOK_ID];
const FINISH = { shutter: null, weave: 0, tone: null };
const FPS = 24;
const BPM = 92;
const BEAT0 = 0;
const beat = (n) => BEAT0 + n * 60 / BPM, bar = (n) => beat(4 * n);
const DURATION = 38.5;
const OWN_MUSIC = null;
const INSTRUMENTS = [];
const CAST = {};
const FORMULAS = {};
const PALETTE = { bg: '#2a1620', ink: '#ffffff', accent: '#e2b04a', dim: '#5a2f42', line: '#141414', face: '#fbfbf7',
  gold2: '#f3cd6b', mand: '#f28a1e', heart: '#ff4f6d', dress: '#7a5af0', hairF: '#3a2117', pink: '#ff9fd0' };
const TYPE = {
  lang: 'es',
  roles: {
    display: { family: 'Fredoka', subsets: ['latin'], files: { 600: 'fonts/fredoka-latin-600-normal.woff2', 700: 'fonts/fredoka-latin-700-normal.woff2' } },
    text: { family: 'Inter', subsets: ['latin'], files: { 500: 'fonts/inter-latin-500-normal.woff2', 600: 'fonts/inter-latin-600-normal.woff2' } },
    mono: null,
  },
  check: { strings: { display: ['Olvidaste el aniversario', '¿Qué perfume le llevas?', 'Pausa y elige', 'Yum Yum', 'Atheeri', 'Sublime', 'Royal Amber', 'Honor & Glory', 'Mandarin Sky', '¿Qué te pones para la cena?', 'UPPERFUMES', 'Comenta tu letra', 'ANIVERSARIO', 'Perdóname'], text: ['Pide por WhatsApp', '300 559 8061', 'fragancias que te elevan'] }, sizes: { text: 0.04 } },
};

const CUES = { hook: 0, q1: 4.4, a: 11.4, c: 16.2, b: 21.6, q2: 26.0, cta: 33.0, end: DURATION };
const VO = [];
const CAPTIONS = null;
const CAPTION_STYLE = { role: 'display', accentRole: 'display', size: 0.062, caps: false, ink: PALETTE.ink, hi: PALETTE.ink, accent: PALETTE.accent, punch: 0.07 };

const SCENES = [
  { chapter: 'C1', from: CUES.hook, to: CUES.q1, draw: hook, action: 'he walks in empty-handed, she glares', amb: { kind: 'room', gain: 0.05 } },
  { chapter: 'C1', from: CUES.q1, to: CUES.a, draw: question1, action: 'three perfume options slide in', in: { type: 'cut' }, amb: { kind: 'room', gain: 0.04 } },
  { chapter: 'C1', from: CUES.a, to: CUES.c, draw: pathA, action: 'a giant cotton candy floats past', in: { type: 'cut' }, amb: { kind: 'room', gain: 0.05 } },
  { chapter: 'C1', from: CUES.c, to: CUES.b, draw: pathC, action: 'she smiles, then shows the calendar', in: { type: 'cut' }, amb: { kind: 'room', gain: 0.05 } },
  { chapter: 'C1', from: CUES.b, to: CUES.q2, draw: pathB, action: 'she uncrosses her arms as petals fall', in: { type: 'cut' }, amb: { kind: 'room', gain: 0.05 } },
  { chapter: 'C1', from: CUES.q2, to: CUES.cta, draw: question2, action: 'three perfumes for him slide in', in: { type: 'cut' }, amb: { kind: 'room', gain: 0.04 } },
  { chapter: 'C1', from: CUES.cta, to: CUES.end, draw: endCard, action: 'the six bottles pop in', in: { type: 'dissolve', dur: 0.35 }, amb: { kind: 'air', gain: 0.03 } },
];

const SFX = [
  { at: 0.0, voice: 'hit', gain: 0.35, wet: 0.3 }, { at: 1.4, voice: 'foley', kind: 'tap', gain: 0.3, wet: 0.3 },
  { at: CUES.q1 - 0.3, voice: 'whoosh', dur: 0.6, gain: 0.25, wet: 0.3 },
  { at: 4.6, voice: 'foley', kind: 'tap', gain: 0.3, wet: 0.2 }, { at: 6.6, voice: 'foley', kind: 'tap', gain: 0.3, wet: 0.2 }, { at: 8.6, voice: 'foley', kind: 'tap', gain: 0.3, wet: 0.2 },
  { at: 10.6, voice: 'tick', gain: 0.18, wet: 0.3 },
  { at: CUES.a, voice: 'hit', gain: 0.3, wet: 0.35 }, { at: 12.0, voice: 'air', dur: 1.2, gain: 0.15, wet: 0.3 },
  { at: CUES.c, voice: 'hit', gain: 0.3, wet: 0.35 }, { at: 19.6, voice: 'foley', kind: 'tap', gain: 0.35, wet: 0.2 },
  { at: CUES.b - 0.9, voice: 'riser', dur: 0.9, gain: 0.14, wet: 0.3 }, { at: CUES.b, voice: 'hit', gain: 0.35, wet: 0.4 }, { at: 24.4, voice: 'tick', gain: 0.15, wet: 0.4 },
  { at: CUES.q2 - 0.3, voice: 'whoosh', dur: 0.6, gain: 0.25, wet: 0.3 },
  { at: 29.5, voice: 'foley', kind: 'tap', gain: 0.3, wet: 0.2 }, { at: 30.6, voice: 'foley', kind: 'tap', gain: 0.3, wet: 0.2 }, { at: 31.6, voice: 'foley', kind: 'tap', gain: 0.3, wet: 0.2 },
  { at: CUES.cta, voice: 'foley', kind: 'tap', gain: 0.3, wet: 0.35 },
];
const ROOM = { secs: 1.8, decay: 2.6, tone: 5200 };

const ARRANGEMENT = [
  { section: 'tension', from: 0, to: CUES.a, parts: ['drone', 'arp'] },
  { section: 'story', from: CUES.a, to: CUES.cta, parts: ['pad', 'arp', 'kick', 'bass'] },
  { section: 'cta', from: CUES.cta, to: CUES.end, parts: ['pad', 'arp', 'kick', 'bell'] },
];

// ---------- helpers ----------
const fade = (t, a, b, c, d) => clamp((t - a) / (b - a)) * (1 - clamp((t - c) / (d - c)));
const pop = (t, at, d = 0.3) => MOTION.back(clamp((t - at) / d), 2);
function mixHex(a, b, k) {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const A = p(a), B = p(b);
  return '#' + A.map((v, i) => Math.round(lerp(v, B[i], k)).toString(16).padStart(2, '0')).join('');
}
function rrect(g, x, y, w, h, r) {
  g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
}
const boilAt = (t, i) => (hash1(Math.floor(t * 12) * 7.3 + i * 1.7) - 0.5) * 0.004;
function capText(g, str, x, y, size, alpha = 1, rot = 0, fill = '#ffffff', p = 1, align = 'center') {
  if (alpha <= 0 || p <= 0) return;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(0.01 * p, 0.01 * p); g.globalAlpha = alpha;
  g.font = `700 ${size * 100}px "Fredoka"`; g.textAlign = align; g.textBaseline = 'middle'; g.lineJoin = 'round';
  g.lineWidth = size * 100 * 0.18; g.strokeStyle = PALETTE.line; g.strokeText(str, 0, 0);
  g.fillStyle = fill; g.fillText(str, 0, 0); g.restore();
}
function plainText(g, str, x, y, size, color, alpha = 1, align = 'left') {
  g.save(); g.translate(x, y); g.scale(0.01, 0.01); g.globalAlpha = alpha;
  g.font = `600 ${size * 100}px "Fredoka"`; g.textAlign = align; g.textBaseline = 'middle'; g.fillStyle = color; g.fillText(str, 0, 0); g.restore();
}
// The user's own product photos (from the Upperfumes site).
const IMG = Object.fromEntries(['A', 'B', 'C', 'D', 'E', 'F'].map((k) => { const im = new Image(); im.src = `assets/${k}.jpg`; return [k, im]; }));
const photoReady = Promise.all(Object.values(IMG).map((im) => im.decode()));
function photo(g, img, cx, cy, w, rot = 0, alpha = 1) {
  const h = w, b = 0.01;
  g.save(); g.globalAlpha = alpha; g.translate(cx, cy); g.rotate(rot);
  g.shadowColor = 'rgba(0,0,0,0.4)'; g.shadowBlur = 16; g.shadowOffsetY = 5;
  rrect(g, -w / 2 - b, -h / 2 - b, w + 2 * b, h + 2 * b, 0.014); g.fillStyle = '#ffffff'; g.fill(); g.shadowColor = 'transparent';
  g.lineWidth = 0.004; g.strokeStyle = PALETTE.line; g.stroke();
  g.save(); rrect(g, -w / 2, -h / 2, w, h, 0.008); g.clip(); g.drawImage(img, -w / 2, -h / 2, w, h); g.restore();
  g.restore();
}
function badge(g, letter, x, y, r, p = 1) {
  if (p <= 0) return;
  g.save(); g.translate(x, y); g.scale(p, p);
  g.fillStyle = PALETTE.gold2; g.strokeStyle = PALETTE.line; g.lineWidth = r * 0.14;
  g.beginPath(); g.arc(0, 0, r, 0, TAU); g.fill(); g.stroke(); g.restore();
  capText(g, letter, x, y + r * 0.05, r * 1.25, 1, 0, '#ffffff', p);
}
function heart(g, x, y, s, color = PALETTE.heart, a = 1) {
  if (a <= 0) return;
  g.save(); g.translate(x, y); g.globalAlpha = a; g.fillStyle = color; g.strokeStyle = PALETTE.line; g.lineWidth = s * 0.14;
  g.beginPath(); g.moveTo(0, s * 0.35); g.bezierCurveTo(-s * 1.1, -s * 0.35, -s * 0.45, -s * 1.05, 0, -s * 0.45);
  g.bezierCurveTo(s * 0.45, -s * 1.05, s * 1.1, -s * 0.35, 0, s * 0.35); g.closePath(); g.fill(); g.stroke(); g.restore();
}
// A speech bubble with a tail pointing at (tx, ty).
function bubble(g, lines, cx, cy, w, size, tx, ty, p) {
  if (p <= 0) return;
  const h = lines.length * size * 1.25 + size * 0.9;
  g.save(); g.translate(cx, cy); g.scale(p, p); g.translate(-cx, -cy);
  g.fillStyle = '#ffffff'; g.strokeStyle = PALETTE.line; g.lineWidth = 0.006; g.lineJoin = 'round';
  rrect(g, cx - w / 2, cy - h / 2, w, h, 0.04); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(cx + 0.03 * Math.sign(tx - cx), cy - h / 2 + 0.002); g.lineTo(tx, ty); g.lineTo(cx + 0.11 * Math.sign(tx - cx), cy - h / 2 + 0.002); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(cx + 0.03 * Math.sign(tx - cx), cy - h / 2); g.lineTo(tx, ty); g.lineTo(cx + 0.11 * Math.sign(tx - cx), cy - h / 2); g.stroke();
  lines.forEach((ln, i) => plainText(g, ln, cx, cy - h / 2 + size * 0.95 + i * size * 1.25, size, PALETTE.line, 1, 'center'));
  g.restore();
}

// ---------- characters: original stick figures ----------
const ARMS = {
  rest: [[0.13, 0.15], [0.1, 0.29]],
  table: [[0.15, 0.14], [0.17, 0.21]],
  chin: [[0.14, 0.24], [0.04, 0.04]],
  cheeks: [[0.12, 0.27], [0.1, -0.06]],
  up: [[0.17, -0.09], [0.24, -0.25]],
  belly: [[0.15, 0.12], [0.06, 0.17]],
  hold: [[0.16, 0.1], [0.22, 0.02]],
  bar: [[0.17, 0.02], [0.19, -0.07]],
  ears: [[0.15, 0.06], [0.12, -0.1]],
  wave: [[0.17, -0.02], [0.24, -0.16]],
  crossed: [[0.12, 0.14], [-0.07, 0.11]],
  present: [[0.12, 0.16], [0.05, 0.2]],
  phone: [[0.14, 0.12], [0.1, -0.02]],
};
function stick(g, x, y, s, pose, t) {
  const L = PALETTE.line, lw = 0.016 * s, j = (i) => boilAt(t, i) * s, st = pose.style || {};
  const shake = pose.shake ? 0.012 * s * Math.sin(t * 40) : 0;
  const neck = [x + j(1) + (pose.lean || 0) * 0.07 * s, y - 0.27 * s + shake], r = 0.145 * s;
  const head = [neck[0] + (pose.tilt || 0) * 0.04 * s + (pose.lean || 0) * 0.03 * s, neck[1] - 0.13 * s + (pose.drop || 0) * 0.05 * s];
  g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = L; g.lineWidth = lw;
  for (const sd of [-1, 1]) {
    let knee = [x + sd * 0.07 * s, y + 0.03 * s], foot = [x + sd * 0.08 * s, y + 0.27 * s];
    if (pose.legs === 'stand') { const fy = pose.floor ?? y + 0.27 * s, comp = Math.max(0, 0.27 * s - (fy - y)); foot = [x + sd * 0.07 * s, fy]; knee = [x + sd * (0.05 * s + comp * 1.1), (y + fy) / 2]; }
    g.beginPath(); g.moveTo(x, y); g.lineTo(knee[0] + j(sd + 4), knee[1]); g.lineTo(foot[0], foot[1]); g.stroke();
    g.fillStyle = L; g.beginPath(); g.ellipse(foot[0] + sd * 0.015 * s, foot[1] + 0.008 * s, 0.035 * s, 0.017 * s, 0, 0, TAU); g.fill();
  }
  g.beginPath(); g.moveTo(x, y); g.lineTo(neck[0], neck[1]); g.stroke();
  if (st.dress) {
    g.fillStyle = st.dress; g.beginPath(); g.moveTo(neck[0] - 0.05 * s, neck[1] + 0.04 * s); g.lineTo(neck[0] + 0.05 * s, neck[1] + 0.04 * s);
    g.lineTo(x + 0.14 * s, y + 0.12 * s); g.lineTo(x - 0.14 * s, y + 0.12 * s); g.closePath(); g.fill(); g.lineWidth = lw * 0.7; g.stroke(); g.lineWidth = lw;
  }
  const [a0, a1, kb] = pose.arms || ['rest', 'rest', 0];
  for (const sd of [-1, 1]) {
    const P = (name, i) => ARMS[name][i];
    const e = [lerp(P(a0, 0)[0], P(a1, 0)[0], kb), lerp(P(a0, 0)[1], P(a1, 0)[1], kb)];
    const h = [lerp(P(a0, 1)[0], P(a1, 1)[0], kb), lerp(P(a0, 1)[1], P(a1, 1)[1], kb)];
    const sh = [neck[0], neck[1] + 0.03 * s];
    g.beginPath(); g.moveTo(sh[0], sh[1]); g.lineTo(sh[0] + sd * e[0] * s + j(sd + 8), sh[1] + e[1] * s); g.lineTo(sh[0] + sd * h[0] * s, sh[1] + h[1] * s); g.stroke();
    g.fillStyle = L; g.beginPath(); g.arc(sh[0] + sd * h[0] * s, sh[1] + h[1] * s, 0.018 * s, 0, TAU); g.fill();
  }
  if (pose.scapular) {
    g.strokeStyle = '#6b3a1e'; g.lineWidth = lw * 0.35; g.beginPath(); g.moveTo(neck[0] - 0.04 * s, neck[1] - 0.01 * s); g.lineTo(neck[0], neck[1] + 0.1 * s); g.lineTo(neck[0] + 0.04 * s, neck[1] - 0.01 * s); g.stroke();
    g.fillStyle = '#8a4b22'; g.fillRect(neck[0] - 0.02 * s, neck[1] + 0.09 * s, 0.04 * s, 0.05 * s); g.strokeStyle = L; g.strokeRect(neck[0] - 0.02 * s, neck[1] + 0.09 * s, 0.04 * s, 0.05 * s); g.lineWidth = lw; g.strokeStyle = L;
  }
  if (st.bow) {
    g.fillStyle = PALETTE.gold2; g.lineWidth = lw * 0.5;
    for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(neck[0], neck[1] + 0.02 * s); g.lineTo(neck[0] + sd * 0.05 * s, neck[1] - 0.005 * s); g.lineTo(neck[0] + sd * 0.05 * s, neck[1] + 0.045 * s); g.closePath(); g.fill(); g.stroke(); }
    g.lineWidth = lw;
  }
  g.save(); g.translate(head[0], head[1]); g.rotate((pose.tilt || 0) * 0.25);
  if (st.hair === 'long') {                                   // long wavy hair behind the head
    g.fillStyle = PALETTE.hairF; g.beginPath(); g.moveTo(-r * 1.08, -r * 0.1);
    g.bezierCurveTo(-r * 1.2, -r * 1.5, r * 1.2, -r * 1.5, r * 1.08, -r * 0.1);
    for (let i = 0; i <= 6; i++) { const u = i / 6, xx = lerp(r * 1.1, -r * 1.1, u), yy = r * (1.55 + 0.12 * Math.sin(u * 9 + t * 2)); g.lineTo(xx, yy); }
    g.closePath(); g.fill(); g.lineWidth = lw * 0.7; g.stroke(); g.lineWidth = lw;
  }
  g.fillStyle = PALETTE.face; g.beginPath(); g.ellipse(0, 0, r, r * 1.04, 0, 0, TAU); g.fill(); g.lineWidth = lw * 0.9; g.stroke();
  if (st.hair === 'long') {                                   // side-swept fringe
    g.fillStyle = PALETTE.hairF; g.beginPath(); g.moveTo(-r * 1.04, 0);
    g.bezierCurveTo(-r * 1.1, -r * 1.42, r * 1.1, -r * 1.42, r * 1.04, -r * 0.05);
    g.quadraticCurveTo(r * 0.5, -r * 0.62, -r * 0.15, -r * 0.5); g.quadraticCurveTo(-r * 0.7, -r * 0.4, -r * 1.04, 0); g.fill();
    g.fillStyle = PALETTE.gold2; for (const sd of [-1, 1]) { g.beginPath(); g.arc(sd * r * 1.02, r * 0.42, r * 0.09, 0, TAU); g.fill(); g.lineWidth = lw * 0.4; g.stroke(); }
  } else if (st.hair === 'bun') {
    g.fillStyle = st.hairColor || '#5a3a28'; g.beginPath(); g.ellipse(0, -r * 0.35, r * 1.04, r * 0.72, 0, Math.PI, TAU); g.fill(); g.lineWidth = lw * 0.6; g.stroke();
    g.beginPath(); g.arc(0, -r * 1.12, r * 0.36, 0, TAU); g.fill(); g.stroke(); g.lineWidth = lw;
  } else if (st.hair === 'none') {
    g.fillStyle = L; g.beginPath(); g.ellipse(0, -r * 0.95, r * 0.5, r * 0.12, 0, 0, TAU); g.fill();
  } else {                                                    // black spiky hair
    g.fillStyle = L; g.beginPath();
    for (let i = 0; i <= 9; i++) { const a = Math.PI * (1.08 + 0.84 * i / 9), rr = r * (i % 2 ? 1.42 : 1.0); const px = Math.cos(a) * rr + (i % 2 ? r * 0.08 : 0), py = Math.sin(a) * rr * 1.04; i ? g.lineTo(px, py) : g.moveTo(px, py); }
    g.lineTo(r * 0.9, -r * 0.2); g.quadraticCurveTo(r * 0.2, -r * 0.55, -r * 0.92, -r * 0.18); g.closePath(); g.fill();
  }
  const emo = pose.emo || 'neutral', lk = pose.look || [0, 0], blink = (t % 3.7) > 3.58 ? 0.1 : 1;
  g.lineWidth = lw * 0.8;
  for (const sd of [-1, 1]) {
    const ex = sd * r * 0.36, ey = r * 0.05;
    const closed = emo === 'laugh' || emo === 'bliss' || (emo === 'wink' && sd > 0);
    if (emo === 'love') { heart(g, ex, ey, r * 0.2 * (1 + 0.12 * Math.sin(t * 10))); }
    else if (closed) { g.beginPath(); g.arc(ex, ey + r * 0.06, r * 0.13, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); }
    else {
      const big = emo === 'surprised' ? 1.3 : 1, ew = r * 0.17 * big, eh = r * 0.21 * big * blink;
      g.fillStyle = '#ffffff'; g.lineWidth = lw * 0.6; g.beginPath(); g.ellipse(ex, ey, ew, eh, 0, 0, TAU); g.fill(); g.stroke();
      g.fillStyle = L; g.beginPath(); g.arc(ex + lk[0] * ew * 0.45, ey + lk[1] * eh * 0.45, r * (emo === 'surprised' ? 0.06 : 0.085), 0, TAU); g.fill();
      if (emo === 'smitten' || emo === 'stern') { g.fillStyle = PALETTE.face; g.beginPath(); g.ellipse(ex, ey, ew + lw, eh + lw * 0.3, 0, Math.PI, Math.PI * 1.55 + (sd > 0 ? 0.45 : 0.45)); g.fill(); g.lineWidth = lw * 0.6; g.beginPath(); g.moveTo(ex - ew * 1.05, ey - eh * 0.25); g.lineTo(ex + ew * 1.05, ey - eh * 0.25); g.stroke(); }
      if (st.hair === 'long') { g.lineWidth = lw * 0.5; g.beginPath(); g.moveTo(ex + sd * ew * 0.9, ey - eh * 0.7); g.lineTo(ex + sd * ew * 1.35, ey - eh * 1.05); g.stroke(); }
    }
    g.lineWidth = lw * 0.8; g.beginPath();
    const by = ey - r * (emo === 'surprised' ? 0.42 : 0.33), tl = emo === 'sad' ? -0.06 : emo === 'stern' ? 0.1 : emo === 'surprised' ? 0.05 : 0.02;
    g.moveTo(ex - r * 0.14, by + sd * tl * r); g.lineTo(ex + r * 0.14, by - sd * tl * r); g.stroke();
  }
  const my = r * 0.52; g.lineWidth = lw * 0.8; g.beginPath();
  if (emo === 'sad') { g.moveTo(-r * 0.16, my + r * 0.05); g.quadraticCurveTo(0, my - r * 0.08, r * 0.16, my + r * 0.05); g.stroke(); }
  else if (emo === 'stern') { g.moveTo(-r * 0.16, my + r * 0.02); g.lineTo(r * 0.16, my + r * 0.02); g.stroke(); }
  else if (emo === 'surprised') { g.fillStyle = '#5a1d1d'; g.ellipse(0, my, r * 0.09, r * 0.12, 0, 0, TAU); g.fill(); g.stroke(); }
  else if (emo === 'neutral' || emo === 'smitten' || emo === 'wink' || emo === 'bliss') { g.moveTo(-r * 0.18, my - r * 0.02); g.quadraticCurveTo(0, my + r * 0.12, r * 0.18, my - r * 0.02); g.stroke(); }
  else { g.fillStyle = '#5a1d1d'; g.moveTo(-r * 0.26, my - r * 0.06); g.quadraticCurveTo(0, my + r * 0.36, r * 0.26, my - r * 0.06); g.closePath(); g.fill(); g.stroke(); }
  if (['love', 'smitten', 'laugh', 'bliss', 'joy'].includes(emo)) {
    g.fillStyle = 'rgba(240,110,90,0.45)';
    for (const sd of [-1, 1]) { g.beginPath(); g.ellipse(sd * r * 0.58, r * 0.32, r * 0.13, r * 0.07, 0, 0, TAU); g.fill(); }
  }
  if (st.glasses) { g.lineWidth = lw * 0.6; g.strokeStyle = L; for (const sd of [-1, 1]) { g.beginPath(); g.arc(sd * r * 0.36, r * 0.05, r * 0.25, 0, TAU); g.stroke(); } g.beginPath(); g.moveTo(-r * 0.11, r * 0.02); g.lineTo(r * 0.11, r * 0.02); g.stroke(); }
  if (st.mustache) { g.fillStyle = L; g.beginPath(); g.ellipse(-r * 0.12, r * 0.36, r * 0.14, r * 0.05, 0.2, 0, TAU); g.ellipse(r * 0.12, r * 0.36, r * 0.14, r * 0.05, -0.2, 0, TAU); g.fill(); }
  if (pose.sweat) { g.fillStyle = '#8fd3ff'; g.beginPath(); g.moveTo(r * 0.9, -r * 0.5); g.quadraticCurveTo(r * 1.08, -r * 0.2, r * 0.9, -r * 0.12); g.quadraticCurveTo(r * 0.72, -r * 0.2, r * 0.9, -r * 0.5); g.fill(); g.lineWidth = lw * 0.5; g.stroke(); }
  g.restore();
  return head;
}

// ---------- the living room ----------
function livingRoom(g, t) {
  const wall = g.createLinearGradient(0, -0.9, 0, 0.45); wall.addColorStop(0, '#d9c2e8'); wall.addColorStop(1, '#ecdcf2');
  g.fillStyle = wall; g.fillRect(-1, -1, 2, 1.45);
  g.fillStyle = '#9b7a62'; g.fillRect(-1, 0.45, 2, 0.6);
  g.strokeStyle = PALETTE.line; g.lineWidth = 0.006; g.beginPath(); g.moveTo(-1, 0.45); g.lineTo(1, 0.45); g.stroke();
  // door (left, behind him)
  g.fillStyle = '#7a5038'; g.fillRect(-0.44, -0.33, 0.2, 0.78); g.strokeRect(-0.44, -0.33, 0.2, 0.78);
  g.fillStyle = PALETTE.gold2; g.beginPath(); g.arc(-0.27, 0.06, 0.012, 0, TAU); g.fill();
  // framed couple photo and a lamp
  g.fillStyle = '#5a3a28'; g.fillRect(0.1, -0.38, 0.16, 0.12); g.fillStyle = '#fff6e5'; g.fillRect(0.115, -0.365, 0.13, 0.09);
  heart(g, 0.18, -0.32, 0.025, PALETTE.heart, 0.9);
  g.fillStyle = '#f4d58a'; g.beginPath(); g.moveTo(0.42, -0.2); g.lineTo(0.49, -0.2); g.lineTo(0.5, -0.12); g.lineTo(0.41, -0.12); g.closePath(); g.fill(); g.stroke();
  // sofa (right)
  g.fillStyle = '#5b6fc4'; rrect(g, 0.0, -0.06, 0.48, 0.27, 0.04); g.fill(); g.stroke();
}
function sofaFront(g) {
  g.strokeStyle = PALETTE.line; g.lineWidth = 0.006; g.fillStyle = '#4a5cb0';
  rrect(g, -0.02, 0.2, 0.52, 0.12, 0.03); g.fill(); g.stroke();
  rrect(g, -0.04, 0.08, 0.07, 0.24, 0.03); g.fill(); g.stroke(); rrect(g, 0.45, 0.08, 0.07, 0.24, 0.03); g.fill(); g.stroke();
  g.fillStyle = '#3a2a20'; g.fillRect(0.0, 0.32, 0.02, 0.04); g.fillRect(0.46, 0.32, 0.02, 0.04);
}
function cottonCandy(g, x, y, s) {
  g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = PALETTE.line; g.lineWidth = 0.006;
  g.fillStyle = '#f5f0e0'; g.fillRect(-0.008, 0.05, 0.016, 0.2); g.strokeRect(-0.008, 0.05, 0.016, 0.2);
  g.fillStyle = PALETTE.pink; for (const [px, py, pr] of [[0, -0.02, 0.09], [-0.07, 0.02, 0.06], [0.07, 0.02, 0.06], [0, 0.05, 0.06]]) { g.beginPath(); g.arc(px, py, pr, 0, TAU); g.fill(); g.stroke(); }
  g.fillStyle = PALETTE.pink; for (const [px, py, pr] of [[0, -0.02, 0.085], [-0.07, 0.02, 0.055], [0.07, 0.02, 0.055], [0, 0.05, 0.055]]) { g.beginPath(); g.arc(px, py, pr, 0, TAU); g.fill(); }
  g.restore();
}
function phoneCal(g, x, y, p) {
  if (p <= 0) return; g.save(); g.translate(x, y); g.scale(p, p); g.rotate(0.12); g.strokeStyle = PALETTE.line; g.lineWidth = 0.005;
  g.fillStyle = '#1b1b1b'; rrect(g, -0.07, -0.12, 0.14, 0.24, 0.02); g.fill(); g.stroke();
  g.fillStyle = '#ffffff'; g.fillRect(-0.06, -0.105, 0.12, 0.21);
  g.fillStyle = '#e0453a'; g.fillRect(-0.06, -0.105, 0.12, 0.045);
  plainText(g, 'HOY', 0, -0.082, 0.028, '#ffffff', 1, 'center');
  plainText(g, '12', 0, -0.02, 0.06, PALETTE.line, 1, 'center');
  plainText(g, 'ANIVERSARIO', 0, 0.045, 0.019, '#e0453a', 1, 'center');
  heart(g, 0, 0.08, 0.015, PALETTE.heart, 1);
  g.restore();
}
function paper(g, x, y, p) {
  if (p <= 0) return; g.save(); g.translate(x, y); g.scale(p, p); g.rotate(-0.08); g.strokeStyle = PALETTE.line; g.lineWidth = 0.004;
  g.fillStyle = '#fbf6e8'; g.beginPath(); g.moveTo(-0.06, -0.08); g.lineTo(0.05, -0.085); g.lineTo(0.065, 0.07); g.lineTo(-0.055, 0.08); g.closePath(); g.fill(); g.stroke();
  plainText(g, 'Perdóname', 0.0, -0.05, 0.02, '#c0392b', 1, 'center');
  for (let i = 0; i < 4; i++) { g.beginPath(); g.moveTo(-0.04, -0.02 + i * 0.022); g.lineTo(0.04 - (i % 2) * 0.02, -0.02 + i * 0.022); g.stroke(); }
  g.restore();
}
const STY = {
  him: {},
  her: { hair: 'long', dress: PALETTE.dress },
};
// One living-room shot. o: { him, her, gift (img), candy, phone, petals, paper, hearts, himX, k, d0, d1 }
function homeShot(g, t, S, o) {
  const cam = CAM.base(); CAM.dolly(cam, o.k == null ? 0 : o.k, (o.d0 || 1.0) * 0.95, (o.d1 || 0.95) * 0.95); CAM.handheld(cam, t, 0.4);
  plane(g, S, cam, 0, (g) => {
    g.translate(0, 0.05);
    livingRoom(g, t);
    const floor = 0.45;
    const herHead = stick(g, 0.24, 0.2, 0.8, Object.assign({ arms: ['crossed', 'crossed', 1], look: [-1, 0], style: STY.her }, o.her), t);
    sofaFront(g);
    const hx = o.himX != null ? o.himX : -0.22;
    stick(g, hx, floor - 0.215, 0.8, Object.assign({ arms: o.gift ? ['present', 'present', 1] : ['rest', 'rest', 1], legs: 'stand', floor, look: [1, 0], style: STY.him }, o.him), t);
    if (o.gift) photo(g, IMG[o.gift], hx + 0.03, 0.1, 0.14, -0.06);
    if (o.paper != null) paper(g, hx + 0.04, 0.0, pop(t, o.paper, 0.3));
    if (o.candy != null) { const u = (t - o.candy) / 3.2; if (u > 0 && u < 1) cottonCandy(g, lerp(-0.75, 0.75, u), -0.12 + 0.03 * Math.sin(t * 4), 1.1); }
    if (o.phone != null) phoneCal(g, 0.06, -0.05, pop(t, o.phone, 0.35));
    if (o.petals != null) { const r = rng(8); for (let i = 0; i < 26; i++) { const x0 = (r() - 0.5) * 1.0, sp = 0.12 + r() * 0.15, lt = t - o.petals - r() * 1.2; if (lt < 0) continue;
      const y = -0.6 + lt * sp * 1.6, x = x0 + 0.04 * Math.sin(lt * 3 + i); if (y > 0.5) continue;
      g.save(); g.translate(x, y); g.rotate(lt * 2 + i); g.fillStyle = '#ffffff'; g.strokeStyle = PALETTE.line; g.lineWidth = 0.003; g.beginPath(); g.ellipse(0, 0, 0.014, 0.008, 0, 0, TAU); g.fill(); g.stroke(); g.restore(); } }
    if (o.hearts != null) for (let i = 0; i < 8; i++) { const lt = t - o.hearts - i * 0.22; if (lt < 0) continue; const u = (lt % 2.0) / 2.0;
      heart(g, herHead[0] - 0.08 + 0.05 * Math.sin(lt * 4 + i) + (i % 3) * 0.05, herHead[1] - 0.1 - 0.25 * u, 0.02 + 0.008 * (i % 2), PALETTE.heart, 1 - u); }
  });
}
function optionsBackdrop(g, t, S, o) {
  homeShot(g, t, S, o);
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.fillStyle = 'rgba(25,10,18,0.74)'; g.fillRect(0, 0, S.W, S.H); g.restore();
}
function banner(g, S, t, at, letter, img, title, sub) {
  const p = pop(t, at, 0.35); if (p <= 0) return;
  plane(g, S, CAM.base(), 0, (g) => {
    g.save(); g.translate(0, -0.55); g.scale(p, p); g.translate(0, 0.55);
    g.fillStyle = 'rgba(30,12,22,0.92)'; g.strokeStyle = PALETTE.gold2; g.lineWidth = 0.005; rrect(g, -0.46, -0.68, 0.84, 0.24, 0.03); g.fill(); g.stroke();
    photo(g, img, -0.33, -0.56, 0.18, -0.04); badge(g, letter, -0.42, -0.65, 0.045);
    capText(g, title, -0.2, -0.6, 0.062, 1, 0, PALETTE.gold2, 1, 'left');
    if (sub) plainText(g, sub, -0.2, -0.51, 0.038, '#ffffff', 1, 'left');
    g.restore();
  });
}
function optionRow(g, t, at, y, letter, img, title, sub) {
  const p = EASE.out(clamp((t - at) / 0.35)); if (p <= 0) return;
  g.save(); g.translate((1 - p) * 0.8, 0);
  g.fillStyle = 'rgba(255,255,255,0.96)'; g.strokeStyle = PALETTE.line; g.lineWidth = 0.006; rrect(g, -0.45, y - 0.12, 0.83, 0.24, 0.035); g.fill(); g.stroke();
  badge(g, letter, -0.38, y, 0.05); photo(g, img, -0.22, y, 0.19, 0);
  plainText(g, title, -0.1, y - (sub ? 0.03 : 0), 0.055, PALETTE.line, 1, 'left');
  if (sub) plainText(g, sub, -0.1, y + 0.045, 0.034, '#7a5a2a', 1, 'left');
  g.restore();
}
const bub = (g, S, t, lines, at, size = 0.046, w = 0.86) => plane(g, S, CAM.base(), 0, (g) => bubble(g, lines, 0.0, 0.52, w, size, 0.24, 0.12, pop(t, at, 0.3)));

// ---------- the scenes ----------
function hook(g, k, t, S) {
  // he walks in through the door on frame 0, empty-handed; she is already glaring
  const walk = EASE.out(clamp(t / 1.2));
  homeShot(g, t, S, { k: EASE.out(k), d0: 1.08, d1: 0.96, himX: lerp(-0.34, -0.2, walk), him: { emo: t > 1.4 ? 'sad' : 'joy', sweat: t > 1.4, arms: ['rest', 'cheeks', clamp((t - 2.6) / 0.4)] }, her: { emo: 'stern' } });
  plane(g, S, CAM.base(), 0, (g) => capText(g, 'Olvidaste el aniversario', 0, -0.58, 0.068, clamp(t / 0.15), -0.03, '#ffffff', pop(t, 0, 0.35)));
}
function question1(g, k, t, S) {
  optionsBackdrop(g, t, S, { him: { emo: 'sad', sweat: true }, her: { emo: 'stern' } });
  plane(g, S, CAM.base(), 0, (g) => {
    capText(g, '¿Qué perfume le llevas?', 0, -0.56, 0.072, 1, -0.02, '#ffffff', pop(t, CUES.q1, 0.3));
    optionRow(g, t, 4.6, -0.32, 'A', IMG.A, 'Yum Yum', 'fresa · algodón de azúcar');
    optionRow(g, t, 6.6, -0.04, 'B', IMG.B, 'Atheeri', 'pera · flores blancas');
    optionRow(g, t, 8.6, 0.24, 'C', IMG.C, 'Sublime', 'frutos rojos · vainilla');
    capText(g, 'Pausa y elige', 0, 0.46, 0.06, clamp((t - 10.6) / 0.2), 0.02, PALETTE.gold2, pop(t, 10.6, 0.3));
  });
}
function pathA(g, k, t, S) {
  homeShot(g, t, S, { k: EASE.out(k), him: { emo: 'joy' }, her: { emo: t > 12.9 ? 'stern' : 'surprised', tilt: t > 12.9 ? 0.3 : 0 }, gift: 'A', candy: 11.6 });
  banner(g, S, t, CUES.a, 'A', IMG.A, 'Yum Yum', 'fresa · algodón de azúcar');
  bub(g, S, t, ['¿Me estás pidiendo perdón', 'o me estás invitando a la feria?'], 12.95);
}
function pathC(g, k, t, S) {
  const show = t > 19.4;
  homeShot(g, t, S, { k: EASE.out(k), him: { emo: show ? 'sad' : 'joy', sweat: show }, her: { emo: show ? 'stern' : 'bliss', arms: ['crossed', 'phone', clamp((t - 19.3) / 0.3)] }, gift: 'C', phone: 19.6 });
  banner(g, S, t, CUES.c, 'C', IMG.C, 'Sublime', 'frutos rojos · vainilla');
  bub(g, S, t, ['Huele delicioso. Pero igual', 'se te olvidó el aniversario.'], 18.4);
}
function pathB(g, k, t, S) {
  const open = clamp((t - 23.0) / 0.6);
  homeShot(g, t, S, { k: EASE.inOut(k), d0: 1.0, d1: 0.9, him: { emo: t > 24.4 ? 'surprised' : 'joy' }, her: { emo: t > 23.4 ? 'smitten' : 'surprised', arms: ['crossed', 'rest', open] }, gift: 'B', petals: 21.8, hearts: 24.4 });
  banner(g, S, t, CUES.b, 'B', IMG.B, 'Atheeri', 'pera · flores blancas');
  bub(g, S, t, ['Mmm... sigue hablando.'], 24.4, 0.05, 0.6);
}
function question2(g, k, t, S) {
  optionsBackdrop(g, t, S, { him: { emo: 'joy', arms: ['present', 'present', 1] }, her: { emo: 'smitten', arms: ['rest', 'rest', 1] }, paper: 26.0 });
  plane(g, S, CAM.base(), 0, (g) => {
    capText(g, '¿Qué te pones para la cena?', 0, -0.56, 0.066, 1, -0.02, '#ffffff', pop(t, CUES.q2, 0.3));
    optionRow(g, t, 29.5, -0.32, 'A', IMG.D, 'Royal Amber', 'bergamota · ámbar · vainilla');
    optionRow(g, t, 30.6, -0.04, 'B', IMG.E, 'Honor & Glory', 'piña · vainilla · sándalo');
    optionRow(g, t, 31.6, 0.24, 'C', IMG.F, 'Mandarin Sky', 'mandarina · caramelo');
    capText(g, 'Pausa y elige', 0, 0.46, 0.06, clamp((t - 32.2) / 0.2), 0.02, PALETTE.gold2, pop(t, 32.2, 0.3));
  });
}
const stars = lazy(() => { const r = rng(61); return Array.from({ length: 90 }, () => [(r() - 0.5) * 1.2, (r() - 0.5) * 2, r() * TAU, 0.002 + r() * 0.004]); });
function endCard(g, k, t, S) {
  const lt = t - CUES.cta, cam = CAM.base(); CAM.dolly(cam, EASE.out(k), 1.03, 0.98);
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
  const bg = g.createLinearGradient(0, 0, 0, S.H); bg.addColorStop(0, '#1e0f17'); bg.addColorStop(1, '#4a2638'); g.fillStyle = bg; g.fillRect(0, 0, S.W, S.H); g.restore();
  plane(g, S, cam, 0.4, (g) => { for (const [x, y, p, s] of stars()) dot(g, S, x, y, s, '#ffffff', 0.3 + 0.3 * Math.sin(t * 3 + p)); });
  plane(g, S, cam, 0, (g) => {
    capText(g, '¿Y tú qué te pondrías?', 0, -0.6, 0.068, 1, -0.02, '#ffffff', pop(lt, 0, 0.3));
    [['D', 'A', -0.28], ['E', 'B', 0], ['F', 'C', 0.28]].forEach(([I, L, x], i) => {
      const p = pop(lt, 0.25 + i * 0.12, 0.35); if (p <= 0) return;
      g.save(); g.translate(x, -0.35); g.scale(p, p); photo(g, IMG[I], 0, 0, 0.22, (i - 1) * 0.06); badge(g, L, -0.095, -0.1, 0.038); g.restore();
    });
    capText(g, 'Comenta tu letra', 0, -0.13, 0.075, clamp((lt - 1.0) / 0.2), 0.02, PALETTE.gold2, pop(lt, 1.0, 0.3));
    capText(g, 'UPPERFUMES', 0, 0.04, 0.09, clamp((lt - 1.6) / 0.2), 0, PALETTE.gold2, pop(lt, 1.6, 0.35));
  });
  const ca = clamp((lt - 2.0) / 0.3);
  label(g, S, 'fragancias que te elevan', 0, 0.14, 0.045, '#ffffff', null, ca, 'center');
  label(g, S, 'Pide por WhatsApp', 0, 0.28, 0.042, '#ffffff', null, ca, 'center');
  label(g, S, '300 559 8061', 0, 0.37, 0.062, PALETTE.gold2, null, ca, 'center');
}

// Music: a tense, sparse start (he forgot); a warm R&B-pop groove in F major at 92 BPM once the gifts come in.
const PROG = ['Fmaj7', 'Dm7', 'Bbmaj7', 'C'];
function score(ctx, out) {
  const barLen = bar(1) - bar(0);
  for (const [a, b] of spans('pad')) for (let n = Math.floor(a / barLen); bar(n) < b - 1e-6; n++) {
    const s0 = Math.max(a, bar(n)); pad(ctx, out, s0, Math.min(barLen + 0.5, b - s0 + 0.3), chord(chordAt(PROG, s0 + 0.01), 3), 0.026);
  }
  for (const t of beats('arp', 60 / BPM / 2)) {
    const notes = chord(chordAt(PROG, t + 0.01), 5), i = Math.round(t / (60 / BPM / 2));
    pluck(ctx, out, t, notes[[0, 2, 1, 3, 2, 1, 3, 2][i % 8] % notes.length], t < CUES.a ? 0.022 : 0.038);
  }
  for (const t of beats('kick', 60 / BPM)) kick(ctx, out, t, Math.round(t / (60 / BPM)) % 2 ? 0.16 : 0.28);
  for (const t of beats('bass', 60 / BPM * 2)) bass(ctx, out, t, 60 / BPM * 1.6, chord(chordAt(PROG, t + 0.01), 2)[0], 0.09);
  for (const [a, b] of spans('drone')) pad(ctx, out, a, b - a, chord('Dm', 2), 0.018);
  for (const [a] of spans('bell')) chord('Fmaj7', 5).forEach((f, i) => pluck(ctx, out, a + 0.2 + i * 0.07, f, 0.05));
}

