// ============================== FILM ==============================
const TITLE = 'Upperfumes Mandarin y Yum Yum';
const PURPOSE = 'ad';
const LOOKS = {
  'anime-cel': { grade: 'saturate(1.08) contrast(1.02)', bloom: 0.1, texture: null, vignette: 0.12, grain: 0, grainHold: 1, hold: 24, line: 0.004, steps: 0,
    palette: { bg: '#2a1a2e', ink: '#ffffff', accent: '#e2b04a', dim: '#5a3a5e' } },
};
const LOOK_ID = 'anime-cel';
const LOOK = LOOKS[LOOK_ID];
const FINISH = { shutter: null, weave: 0, tone: null };
const FPS = 24;
const BPM = 100;
const BEAT0 = 0;
const beat = (n) => BEAT0 + n * 60 / BPM, bar = (n) => beat(4 * n);
const DURATION = 18.0;
const OWN_MUSIC = null;
const INSTRUMENTS = [];
const CAST = {};
const FORMULAS = {};
const PALETTE = { bg: '#2a1a2e', ink: '#ffffff', accent: '#e2b04a', dim: '#5a3a5e', line: '#141414', face: '#fbfbf7',
  gold2: '#f3cd6b', mand: '#f28a1e', mandRed: '#e2452a', heart: '#ff4f6d', straw: '#ff4f7a', candy: '#ffc4e6', date: '#7a4520', leaf: '#3fae6a' };
const TYPE = {
  lang: 'es',
  roles: {
    display: { family: 'Fredoka', subsets: ['latin'], files: { 600: 'fonts/fredoka-latin-600-normal.woff2', 700: 'fonts/fredoka-latin-700-normal.woff2' } },
    text: { family: 'Inter', subsets: ['latin'], files: { 500: 'fonts/inter-latin-500-normal.woff2', 600: 'fonts/inter-latin-600-normal.woff2' } },
    mono: null,
  },
  check: { strings: { display: ['3 meses juntos', 'Mandarin Sky', 'Yum Yum', 'Khamrah', 'Tranquilo.', 'A mí me gusta lo cítrico.', 'Él cítrico · Ella dulce', '¿Team Mandarin o Team Khamrah?', 'Comenta', 'UPPERFUMES'], text: ['Pide por WhatsApp', '300 559 8061'] }, sizes: { text: 0.04 } },
};

const CUES = { cita: 0, khamrah: 4.6, calma: 9.0, cta: 12.6, end: DURATION };
const VO = [];
const CAPTIONS = null;
const CAPTION_STYLE = { role: 'display', accentRole: 'display', size: 0.062, caps: false, ink: PALETTE.ink, hi: PALETTE.ink, accent: PALETTE.accent, punch: 0.07 };

const SCENES = [
  { chapter: 'C1', from: CUES.cita, to: CUES.khamrah, draw: scCita, action: 'Yum Yum arrives and hearts pop', amb: { kind: 'air', gain: 0.05 } },
  { chapter: 'C1', from: CUES.khamrah, to: CUES.calma, draw: scKhamrah, action: 'Khamrah struts past and Mandarin boils', in: { type: 'cut' }, amb: { kind: 'air', gain: 0.05 } },
  { chapter: 'C1', from: CUES.calma, to: CUES.cta, draw: scCalma, action: 'she takes his hand and he melts', in: { type: 'cut' }, amb: { kind: 'air', gain: 0.05 } },
  { chapter: 'C1', from: CUES.cta, to: CUES.end, draw: endCard, action: 'the couple and the bottles pop in', in: { type: 'dissolve', dur: 0.35 }, amb: { kind: 'air', gain: 0.03 } },
];
const SFX = [
  { at: 0.0, voice: 'hit', gain: 0.3, wet: 0.3 }, { at: 2.0, voice: 'foley', kind: 'tap', gain: 0.3, wet: 0.2 }, { at: 3.0, voice: 'tick', gain: 0.15, wet: 0.4 },
  { at: CUES.khamrah, voice: 'hit', gain: 0.3, wet: 0.35 }, { at: 6.6, voice: 'tick', gain: 0.2, wet: 0.3 }, { at: 7.4, voice: 'riser', dur: 1.2, gain: 0.16, wet: 0.3 },
  { at: CUES.calma, voice: 'hit', gain: 0.25, wet: 0.35 }, { at: 9.6, voice: 'foley', kind: 'cloth', gain: 0.3, wet: 0.2 }, { at: 11.0, voice: 'tick', gain: 0.15, wet: 0.4 },
  { at: CUES.cta - 0.3, voice: 'whoosh', dur: 0.6, gain: 0.22, wet: 0.3 }, { at: 14.6, voice: 'foley', kind: 'tap', gain: 0.3, wet: 0.3 },
];
const ROOM = { secs: 1.6, decay: 2.4, tone: 5200 };
const ARRANGEMENT = [
  { section: 'love', from: 0, to: CUES.khamrah, parts: ['pad', 'arp'] },
  { section: 'drama', from: CUES.khamrah, to: CUES.calma, parts: ['drone', 'kick'] },
  { section: 'sweet', from: CUES.calma, to: CUES.end, parts: ['pad', 'arp', 'kick', 'bell'] },
];

// ---------- helpers ----------
const fade = (t, a, b, c, d) => clamp((t - a) / (b - a)) * (1 - clamp((t - c) / (d - c)));
const pop = (t, at, d = 0.3) => MOTION.back(clamp((t - at) / d), 2);
function mixHex(a, b, k) { const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); const A = p(a), B = p(b); return '#' + A.map((v, i) => Math.round(lerp(v, B[i], k)).toString(16).padStart(2, '0')).join(''); }
function rrect(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
function capText(g, str, x, y, size, alpha = 1, rot = 0, fill = '#ffffff', p = 1, align = 'center') {
  if (alpha <= 0 || p <= 0) return;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(0.01 * p, 0.01 * p); g.globalAlpha = alpha;
  g.font = `700 ${size * 100}px "Fredoka"`; g.textAlign = align; g.textBaseline = 'middle'; g.lineJoin = 'round';
  g.lineWidth = size * 100 * 0.18; g.strokeStyle = PALETTE.line; g.strokeText(str, 0, 0); g.fillStyle = fill; g.fillText(str, 0, 0); g.restore();
}
function plainText(g, str, x, y, size, color, alpha = 1, align = 'left') { g.save(); g.translate(x, y); g.scale(0.01, 0.01); g.globalAlpha = alpha; g.font = `600 ${size * 100}px "Fredoka"`; g.textAlign = align; g.textBaseline = 'middle'; g.fillStyle = color; g.fillText(str, 0, 0); g.restore(); }
const IMG = Object.fromEntries(['A', 'B', 'C'].map((k) => { const im = new Image(); im.src = `assets/${k}.jpg`; return [k, im]; }));
const photoReady = Promise.all(Object.values(IMG).map((im) => im.decode()));
function photo(g, img, cx, cy, w, rot = 0, alpha = 1) {
  const h = w, b = 0.01; g.save(); g.globalAlpha = alpha; g.translate(cx, cy); g.rotate(rot);
  g.shadowColor = 'rgba(0,0,0,0.4)'; g.shadowBlur = 16; g.shadowOffsetY = 5;
  rrect(g, -w / 2 - b, -h / 2 - b, w + 2 * b, h + 2 * b, 0.014); g.fillStyle = '#ffffff'; g.fill(); g.shadowColor = 'transparent'; g.lineWidth = 0.004; g.strokeStyle = PALETTE.line; g.stroke();
  g.save(); rrect(g, -w / 2, -h / 2, w, h, 0.008); g.clip(); g.drawImage(img, -w / 2, -h / 2, w, h); g.restore(); g.restore();
}
function heart(g, x, y, s, color = PALETTE.heart, a = 1) {
  if (a <= 0) return; g.save(); g.translate(x, y); g.globalAlpha = a; g.fillStyle = color; g.strokeStyle = PALETTE.line; g.lineWidth = s * 0.14;
  g.beginPath(); g.moveTo(0, s * 0.35); g.bezierCurveTo(-s * 1.1, -s * 0.35, -s * 0.45, -s * 1.05, 0, -s * 0.45); g.bezierCurveTo(s * 0.45, -s * 1.05, s * 1.1, -s * 0.35, 0, s * 0.35); g.closePath(); g.fill(); g.stroke(); g.restore();
}
function bubble(g, lines, cx, cy, w, size, tx, ty, p) {
  if (p <= 0) return; const h = lines.length * size * 1.25 + size * 0.9;
  g.save(); g.translate(cx, cy); g.scale(p, p); g.translate(-cx, -cy);
  g.fillStyle = '#ffffff'; g.strokeStyle = PALETTE.line; g.lineWidth = 0.006; g.lineJoin = 'round';
  rrect(g, cx - w / 2, cy - h / 2, w, h, 0.04); g.fill(); g.stroke();
  const sd = Math.sign(tx - cx) || 1, ey = ty < cy ? cy - h / 2 : cy + h / 2;
  g.beginPath(); g.moveTo(cx + 0.03 * sd, ey); g.lineTo(tx, ty); g.lineTo(cx + 0.11 * sd, ey); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(cx + 0.03 * sd, ey); g.lineTo(tx, ty); g.lineTo(cx + 0.11 * sd, ey); g.stroke();
  lines.forEach((ln, i) => plainText(g, ln, cx, cy - h / 2 + size * 0.95 + i * size * 1.25, size, PALETTE.line, 1, 'center'));
  g.restore();
}

// ---------- the fruit people (original characters) ----------
// kind: 'mandarin' | 'yumyum' | 'khamrah'; (x, y) = between the feet; o: { emo, look, arm: 0..1 toward partner (+1 right), wave, walk, jealous, scale }
function fruit(g, kind, x, y, t, o = {}) {
  const s = o.scale || 1, L = PALETTE.line, lw = 0.012 * s, walk = o.walk || 0;
  const bob = walk ? Math.abs(Math.sin(walk * 6)) * 0.015 * s : 0;
  const by = y - 0.3 * s - bob, R = kind === 'khamrah' ? 0.13 * s : 0.15 * s;
  g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = L; g.lineWidth = lw;
  // legs
  for (const sd of [-1, 1]) { const sw = walk ? Math.sin(walk * 6 + (sd > 0 ? Math.PI : 0)) * 0.04 * s : 0;
    g.beginPath(); g.moveTo(x + sd * 0.05 * s, by + R * 0.85); g.lineTo(x + sd * 0.055 * s + sw, y); g.stroke();
    g.fillStyle = L; g.beginPath(); g.ellipse(x + sd * 0.065 * s + sw, y + 0.006, 0.03 * s, 0.014 * s, 0, 0, TAU); g.fill(); }
  // arms
  for (const sd of [-1, 1]) {
    const sh = [x + sd * R * 0.92, by + R * 0.15];
    let hand = [sh[0] + sd * 0.09 * s, sh[1] + 0.12 * s];
    if (o.arm && Math.sign(o.arm) === sd) hand = [lerp(hand[0], sh[0] + sd * 0.16 * s, Math.abs(o.arm)), lerp(hand[1], sh[1] + 0.03 * s, Math.abs(o.arm))];
    if (o.wave && sd === 1) hand = [sh[0] + 0.1 * s, sh[1] - 0.12 * s + 0.03 * Math.sin(t * 14) * s];
    if (o.watch && sd === -1) hand = [x - 0.02 * s, by + R * 0.35];
    g.beginPath(); g.moveTo(sh[0], sh[1]); g.quadraticCurveTo(sh[0] + sd * 0.05 * s, (sh[1] + hand[1]) / 2, hand[0], hand[1]); g.stroke();
    g.fillStyle = L; g.beginPath(); g.arc(hand[0], hand[1], 0.014 * s, 0, TAU); g.fill();
  }
  // body
  g.lineWidth = lw * 0.9;
  if (kind === 'mandarin') {
    g.fillStyle = mixHex(PALETTE.mand, PALETTE.mandRed, o.jealous || 0); g.beginPath(); g.ellipse(x, by, R, R * 0.93, 0, 0, TAU); g.fill(); g.stroke();
    g.fillStyle = 'rgba(255,255,255,0.18)'; const r = rng(3); for (let i = 0; i < 16; i++) { const a = r() * TAU, d = r() * R * 0.85; g.beginPath(); g.arc(x + Math.cos(a) * d, by + Math.sin(a) * d, 0.004 * s, 0, TAU); g.fill(); }
    g.fillStyle = PALETTE.leaf; g.beginPath(); g.ellipse(x + 0.03 * s, by - R - 0.02 * s, 0.045 * s, 0.018 * s, -0.5 + 0.1 * Math.sin(t * 3), 0, TAU); g.fill(); g.stroke();
    g.fillStyle = '#5a3a1e'; g.fillRect(x - 0.005 * s, by - R - 0.025 * s, 0.01 * s, 0.03 * s);
    g.fillStyle = '#1b3c7a'; for (const sd of [-1, 1]) { g.beginPath(); g.moveTo(x, by + R * 0.62); g.lineTo(x + sd * 0.045 * s, by + R * 0.5); g.lineTo(x + sd * 0.045 * s, by + R * 0.76); g.closePath(); g.fill(); g.stroke(); }
  } else if (kind === 'yumyum') {
    g.fillStyle = PALETTE.candy; for (const [px, py, pr] of [[0, -1.05, 0.55], [-0.55, -0.85, 0.42], [0.55, -0.85, 0.42], [-0.3, -1.25, 0.38], [0.32, -1.25, 0.38]]) { g.beginPath(); g.arc(x + px * R, by + py * R, pr * R, 0, TAU); g.fill(); g.stroke(); }
    g.fillStyle = PALETTE.candy; for (const [px, py, pr] of [[0, -1.05, 0.52], [-0.55, -0.85, 0.39], [0.55, -0.85, 0.39], [-0.3, -1.25, 0.35], [0.32, -1.25, 0.35]]) { g.beginPath(); g.arc(x + px * R, by + py * R, pr * R, 0, TAU); g.fill(); }
    g.fillStyle = PALETTE.straw; g.beginPath(); g.moveTo(x - R, by - R * 0.5); g.quadraticCurveTo(x, by - R * 1.15, x + R, by - R * 0.5); g.quadraticCurveTo(x + R * 1.05, by + R * 0.5, x, by + R * 1.1); g.quadraticCurveTo(x - R * 1.05, by + R * 0.5, x - R, by - R * 0.5); g.fill(); g.stroke();
    g.fillStyle = '#ffe9a8'; const r = rng(5); for (let i = 0; i < 12; i++) { const px = (r() - 0.5) * 1.5 * R, py = (r() - 0.2) * 1.2 * R; if (Math.abs(px) < R * 0.5 && py > -R * 0.3 && py < R * 0.6) continue; g.beginPath(); g.ellipse(x + px, by + py, 0.005 * s, 0.008 * s, 0, 0, TAU); g.fill(); }
    g.fillStyle = PALETTE.leaf; for (let i = -2; i <= 2; i++) { g.beginPath(); g.ellipse(x + i * 0.03 * s, by - R * 0.88, 0.022 * s, 0.01 * s, i * 0.5, 0, TAU); g.fill(); g.stroke(); }
  } else {
    g.fillStyle = PALETTE.date; g.beginPath(); g.ellipse(x, by, R * 0.85, R * 1.15, 0, 0, TAU); g.fill(); g.stroke();
    g.strokeStyle = 'rgba(0,0,0,0.25)'; g.lineWidth = lw * 0.5; for (let i = -1; i <= 1; i++) { g.beginPath(); g.moveTo(x + i * R * 0.35, by - R * 0.9); g.quadraticCurveTo(x + i * R * 0.45, by, x + i * R * 0.35, by + R * 0.9); g.stroke(); }
    g.strokeStyle = L; g.lineWidth = lw * 0.9;
    g.fillStyle = '#b5652a'; g.save(); g.translate(x + R * 0.75, by - R * 0.85); g.rotate(-0.6); g.fillRect(-0.008 * s, -0.05 * s, 0.016 * s, 0.1 * s); g.strokeRect(-0.008 * s, -0.05 * s, 0.016 * s, 0.1 * s); g.restore();
  }
  // face
  const fy = kind === 'yumyum' ? by - R * 0.05 : by - R * 0.12, emo = o.emo || 'neutral', lk = o.look || [0, 0];
  for (const sd of [-1, 1]) {
    const ex = x + sd * R * 0.36, ey = fy;
    if (emo === 'love') heart(g, ex, ey, R * 0.2 * (1 + 0.1 * Math.sin(t * 10)));
    else if (emo === 'cool') { g.fillStyle = '#111'; g.beginPath(); g.ellipse(ex, ey, R * 0.26, R * 0.17, 0, 0, TAU); g.fill(); g.fillStyle = 'rgba(255,255,255,0.4)'; g.fillRect(ex - R * 0.15, ey - R * 0.08, R * 0.08, R * 0.04); if (sd < 0) { g.lineWidth = lw * 0.6; g.beginPath(); g.moveTo(ex + R * 0.25, ey - R * 0.04); g.lineTo(ex + R * 0.47, ey - R * 0.04); g.stroke(); } }
    else if (emo === 'bliss') { g.lineWidth = lw * 0.8; g.beginPath(); g.arc(ex, ey + R * 0.06, R * 0.13, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); }
    else {
      const ew = R * 0.17, eh = R * 0.21 * ((t % 3.1) > 3.0 ? 0.1 : 1);
      g.fillStyle = '#ffffff'; g.lineWidth = lw * 0.55; g.beginPath(); g.ellipse(ex, ey, ew, eh, 0, 0, TAU); g.fill(); g.stroke();
      g.fillStyle = L; g.beginPath(); g.arc(ex + lk[0] * ew * 0.45, ey + lk[1] * eh * 0.45, R * 0.08, 0, TAU); g.fill();
      if (emo === 'angry') { g.lineWidth = lw * 0.9; g.beginPath(); g.moveTo(ex - sd * R * 0.2, ey - R * 0.3); g.lineTo(ex + sd * R * 0.12, ey - R * 0.18); g.stroke(); }
      if (kind === 'yumyum') { g.lineWidth = lw * 0.5; g.beginPath(); g.moveTo(ex + sd * ew * 0.8, ey - eh * 0.75); g.lineTo(ex + sd * ew * 1.3, ey - eh * 1.1); g.stroke(); }
    }
  }
  g.lineWidth = lw * 0.8; const my = fy + R * 0.42;
  g.beginPath();
  if (emo === 'angry') { g.moveTo(x - R * 0.18, my + R * 0.05); g.quadraticCurveTo(x, my - R * 0.08, x + R * 0.18, my + R * 0.05); g.stroke(); }
  else if (emo === 'cool') { g.moveTo(x - R * 0.12, my); g.quadraticCurveTo(x + R * 0.05, my + R * 0.1, x + R * 0.2, my - R * 0.06); g.stroke(); }
  else if (emo === 'laugh' || emo === 'love' || emo === 'joy') { g.fillStyle = '#5a1d1d'; g.moveTo(x - R * 0.22, my - R * 0.04); g.quadraticCurveTo(x, my + R * 0.3, x + R * 0.22, my - R * 0.04); g.closePath(); g.fill(); g.stroke(); }
  else { g.moveTo(x - R * 0.16, my - R * 0.02); g.quadraticCurveTo(x, my + R * 0.12, x + R * 0.16, my - R * 0.02); g.stroke(); }
  if (['love', 'bliss', 'joy', 'laugh'].includes(emo) || o.jealous) { g.fillStyle = o.jealous ? 'rgba(200,30,20,0.45)' : 'rgba(240,110,90,0.45)'; for (const sd of [-1, 1]) { g.beginPath(); g.ellipse(x + sd * R * 0.6, fy + R * 0.3, R * 0.13, R * 0.07, 0, 0, TAU); g.fill(); } }
  if (o.jealous > 0.5) for (let i = 0; i < 3; i++) { const u = ((t * 1.4 + i / 3) % 1); g.fillStyle = `rgba(255,255,255,${0.8 * (1 - u)})`; g.strokeStyle = `rgba(20,20,20,${0.8 * (1 - u)})`; g.lineWidth = 0.003; g.beginPath(); g.arc(x + (i - 1) * 0.06 * s, by - R - 0.04 - u * 0.12, 0.02 + u * 0.02, 0, TAU); g.fill(); g.stroke(); }
  return [x, by - R];
}

// ---------- the park ----------
function park(g, t) {
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.restore();
  const sky = g.createLinearGradient(0, -0.9, 0, 0.3); sky.addColorStop(0, '#5b6fd6'); sky.addColorStop(0.6, '#ff9fb2'); sky.addColorStop(1, '#ffd08a');
  g.fillStyle = sky; g.fillRect(-1, -1, 2, 1.32);
  g.fillStyle = '#fff3c4'; g.beginPath(); g.arc(-0.25, 0.2, 0.09, 0, TAU); g.fill();
  g.fillStyle = '#6cc070'; g.beginPath(); g.moveTo(-1, 0.32); g.quadraticCurveTo(0, 0.22, 1, 0.32); g.lineTo(1, 1); g.lineTo(-1, 1); g.closePath(); g.fill();
  g.strokeStyle = PALETTE.line; g.lineWidth = 0.006; g.beginPath(); g.moveTo(-1, 0.32); g.quadraticCurveTo(0, 0.22, 1, 0.32); g.stroke();
  g.fillStyle = '#d9c39a'; g.beginPath(); g.moveTo(-0.12, 0.27); g.lineTo(0.12, 0.27); g.lineTo(0.4, 1); g.lineTo(-0.4, 1); g.closePath(); g.fill();
  // tree
  g.fillStyle = '#7a5038'; g.fillRect(-0.44, -0.1, 0.05, 0.4); g.strokeRect(-0.44, -0.1, 0.05, 0.4);
  g.fillStyle = '#3f9b55'; for (const [px, py, pr] of [[-0.42, -0.2, 0.13], [-0.32, -0.12, 0.1], [-0.5, -0.1, 0.1]]) { g.beginPath(); g.arc(px, py, pr, 0, TAU); g.fill(); g.stroke(); }
  // lamp
  g.fillStyle = '#333'; g.fillRect(0.4, -0.25, 0.015, 0.55); g.beginPath(); g.arc(0.407, -0.27, 0.03, 0, TAU); g.fillStyle = '#ffe9a0'; g.fill(); g.stroke();
  // bench
  g.fillStyle = '#9a5b34'; g.fillRect(-0.3, 0.28, 0.5, 0.025); g.strokeRect(-0.3, 0.28, 0.5, 0.025); g.fillRect(-0.3, 0.33, 0.5, 0.025); g.strokeRect(-0.3, 0.33, 0.5, 0.025);
  g.fillStyle = '#333'; g.fillRect(-0.28, 0.355, 0.015, 0.08); g.fillRect(0.17, 0.355, 0.015, 0.08);
}
function shot(g, t, S, k, d0, d1, draw) {
  const cam = CAM.base(); CAM.dolly(cam, k, d0 * 0.72, d1 * 0.72); CAM.handheld(cam, t, 0.4);
  plane(g, S, cam, 0, (g) => { g.translate(0, -0.12); park(g, t); draw(g); });
}
const FLOOR = 0.5;

// ---------- scenes ----------
function scCita(g, k, t, S) {
  // she walks in from the right on frame 0; hearts when they meet
  const p = EASE.out(clamp(t / 1.8));
  shot(g, t, S, EASE.out(k), 1.08, 0.96, (g) => {
    fruit(g, 'mandarin', -0.15, FLOOR, t, { emo: t > 1.6 ? 'love' : 'neutral', look: [1, 0], watch: t < 1.2, arm: t > 2.4 ? 1 : 0 });
    fruit(g, 'yumyum', lerp(0.75, 0.16, p), FLOOR, t, { emo: t > 1.8 ? 'love' : 'joy', look: [-1, 0], walk: p < 1 ? t : 0, wave: t < 1.8, arm: t > 2.4 ? -1 : 0 });
    if (t > 2.6) for (let i = 0; i < 7; i++) { const lt = t - 2.6 - i * 0.2; if (lt < 0) continue; const u = (lt % 1.8) / 1.8; heart(g, -0.06 + (i % 3) * 0.06 + 0.03 * Math.sin(lt * 4 + i), 0.0 - 0.3 * u, 0.022, PALETTE.heart, 1 - u); }
  });
  plane(g, S, CAM.base(), 0, (g) => {
    capText(g, '3 meses juntos', 0, -0.58, 0.075, clamp(t / 0.15), -0.03, '#ffffff', pop(t, 0, 0.35));
    capText(g, 'Mandarin Sky', -0.2, 0.42, 0.045, fade(t, 0.3, 0.5, 4.2, 4.5), 0, PALETTE.mand);
    capText(g, 'Yum Yum', 0.22, 0.42, 0.045, fade(t, 1.8, 2.0, 4.2, 4.5), 0, PALETTE.straw);
  });
}
function scKhamrah(g, k, t, S) {
  const lt = t - CUES.khamrah, p = clamp((lt - 0.6) / 3.6), jealous = clamp((lt - 2.4) / 0.6);
  shot(g, t, S, EASE.inOut(k), 1.0, 0.92, (g) => {
    fruit(g, 'mandarin', -0.15, FLOOR, t, { emo: jealous > 0.3 ? 'angry' : 'neutral', look: [1, 0], jealous, arm: jealous > 0.3 ? 0 : 1 });
    const kx = lerp(0.75, -0.75, p);
    fruit(g, 'yumyum', 0.16, FLOOR, t, { emo: lt > 2.0 && lt < 3.4 ? 'joy' : 'neutral', look: [Math.sign(kx - 0.16) || -1, 0], arm: jealous > 0.3 ? 0 : -1 });
    fruit(g, 'khamrah', kx, FLOOR + 0.2, t, { emo: 'cool', walk: p > 0 && p < 1 ? t : 0, wave: lt > 1.8 && lt < 2.6, scale: 1.15 });
    if (lt > 1.9 && lt < 3.2) { g.save(); g.translate(kx + 0.14, 0.15); capText(g, '*guiño*', 0, 0, 0.035, 1, -0.1, PALETTE.gold2); g.restore(); }
  });
  plane(g, S, CAM.base(), 0, (g) => {
    capText(g, 'Khamrah', 0, -0.58, 0.075, clamp((lt - 0.6) / 0.2), -0.03, PALETTE.gold2, pop(lt, 0.6, 0.35));
  });
}
function scCalma(g, k, t, S) {
  const lt = t - CUES.calma, hold = EASE.out(clamp((lt - 0.4) / 0.5)), calm = clamp((lt - 2.2) / 0.8);
  shot(g, t, S, EASE.inOut(k), 0.9, 0.82, (g) => {
    fruit(g, 'mandarin', -0.13, FLOOR, t, { emo: calm > 0.5 ? 'love' : 'angry', look: [1, 0], jealous: 1 - calm, arm: hold });
    fruit(g, 'yumyum', 0.14, FLOOR, t, { emo: 'bliss', arm: -hold });
    if (calm > 0.4) for (let i = 0; i < 7; i++) { const l2 = lt - 2.4 - i * 0.2; if (l2 < 0) continue; const u = (l2 % 1.8) / 1.8; heart(g, -0.05 + (i % 3) * 0.06 + 0.03 * Math.sin(l2 * 4 + i), 0.0 - 0.3 * u, 0.022, PALETTE.heart, 1 - u); }
  });
  plane(g, S, CAM.base(), 0, (g) => bubble(g, ['Tranquilo.', 'A mí me gusta lo cítrico.'], 0.06, -0.52, 0.72, 0.05, 0.2, -0.22, pop(lt, 0.6, 0.3)));
}
const stars = lazy(() => { const r = rng(61); return Array.from({ length: 80 }, () => [(r() - 0.5) * 1.2, (r() - 0.5) * 2, r() * TAU, 0.002 + r() * 0.004]); });
function endCard(g, k, t, S) {
  const lt = t - CUES.cta, cam = CAM.base(); CAM.dolly(cam, EASE.out(k), 1.03, 0.98);
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); const bg = g.createLinearGradient(0, 0, 0, S.H); bg.addColorStop(0, '#2a1a3e'); bg.addColorStop(1, '#5a3a5e'); g.fillStyle = bg; g.fillRect(0, 0, S.W, S.H); g.restore();
  plane(g, S, cam, 0.4, (g) => { for (const [x, y, p, s] of stars()) dot(g, S, x, y, s, '#ffffff', 0.3 + 0.3 * Math.sin(t * 3 + p)); });
  plane(g, S, cam, 0, (g) => {
    fruit(g, 'mandarin', -0.12, -0.18, t, { emo: 'love', arm: 1, scale: 0.75 });
    fruit(g, 'yumyum', 0.12, -0.18, t, { emo: 'love', arm: -1, scale: 0.75 });
    capText(g, 'Él cítrico · Ella dulce', 0, -0.6, 0.066, 1, -0.02, '#ffffff', pop(lt, 0, 0.3));
    [['A', -0.15], ['B', 0.15]].forEach(([L, x], i) => { const p = pop(lt, 0.3 + i * 0.12, 0.35); if (p <= 0) return; g.save(); g.translate(x, 0.0); g.scale(p, p); photo(g, IMG[L], 0, 0, 0.2, (i ? 1 : -1) * 0.06); g.restore(); });
    capText(g, '¿Team Mandarin o Team Khamrah?', 0, 0.17, 0.05, clamp((lt - 1.0) / 0.2), 0.02, PALETTE.gold2, pop(lt, 1.0, 0.3));
    capText(g, 'Comenta', 0, 0.25, 0.06, clamp((lt - 1.4) / 0.2), -0.02, '#ffffff', pop(lt, 1.4, 0.3));
    capText(g, 'UPPERFUMES', 0, 0.36, 0.075, clamp((lt - 2.0) / 0.2), 0, PALETTE.gold2, pop(lt, 2.0, 0.35));
  });
  const ca = clamp((lt - 2.3) / 0.3);
  label(g, S, 'Pide por WhatsApp · 300 559 8061', 0, 0.45, 0.038, '#ffffff', null, ca, 'center');
}

// Music: a sweet pop loop in C at 100 BPM; it drops to a tense drone when Khamrah walks past.
const PROG = ['Cmaj7', 'Am7', 'Fmaj7', 'G'];
function score(ctx, out) {
  const barLen = bar(1) - bar(0);
  for (const [a, b] of spans('pad')) for (let n = Math.floor(a / barLen); bar(n) < b - 1e-6; n++) { const s0 = Math.max(a, bar(n)); pad(ctx, out, s0, Math.min(barLen + 0.5, b - s0 + 0.3), chord(chordAt(PROG, s0 + 0.01), 3), 0.026); }
  for (const t of beats('arp', 60 / BPM / 2)) { const notes = chord(chordAt(PROG, t + 0.01), 5), i = Math.round(t / (60 / BPM / 2)); pluck(ctx, out, t, notes[[0, 2, 1, 3, 2, 1, 3, 2][i % 8] % notes.length], 0.04); }
  for (const t of beats('kick', 60 / BPM)) kick(ctx, out, t, Math.round(t / (60 / BPM)) % 2 ? 0.16 : 0.28);
  for (const [a, b] of spans('drone')) pad(ctx, out, a, b - a, chord('Am', 2), 0.02);
  for (const [a] of spans('bell')) chord('Cmaj7', 5).forEach((f, i) => pluck(ctx, out, a + 3.8 + i * 0.07, f, 0.05));
}

