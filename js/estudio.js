/* =====================================================================
   ESTUDIO DE VIDEOS · granja de bots de contenido (solo administradores)
   Pestaña "Estudio" del panel de administración. Datos en Supabase:
   tablas estudio_videos y estudio_cola, archivos en el bucket privado "estudio"
   (ver supabase/estudio.sql). Usa sb, session, esc, toast y $ de app.js.
   Flujo: Ideas → Guion → Producción/Revisión → Publicar → Resultados.
   Los bots (Valentina, Mateo, Nico, Tomás) corren en el PC de cada socio
   con Claude y toman los pedidos de la cola; esta página solo los pide y muestra.
   ===================================================================== */
(function () {
  const PASOS = [
    { k: 'ideas', ic: '💡', n: 'Ideas', est: ['idea'] },
    { k: 'guion', ic: '✍️', n: 'Guion', est: ['guion'] },
    { k: 'revision', ic: '🎬', n: 'Revisión', est: ['produccion', 'revision'] },
    { k: 'publicar', ic: '🚀', n: 'Publicar', est: ['listo'] },
    { k: 'resultados', ic: '📊', n: 'Resultados', est: ['publicado'] },
  ];
  const BOTS = [
    { k: 'valentina', n: 'Valentina', r: 'Ideas', ic: '💡', d: 'Propone 2 ideas nuevas con perfumes del catálogo.' },
    { k: 'mateo', n: 'Mateo', r: 'Guiones', ic: '✍️', d: 'Escribe el guion de las ideas aprobadas.' },
    { k: 'nico', n: 'Nico', r: 'Videos', ic: '🎬', d: 'Hace los videos de los guiones aprobados y los cambios pedidos.' },
    { k: 'tomas', n: 'Tomás', r: 'Resultados', ic: '📊', d: 'Analiza cómo les fue a los videos publicados y propone mejoras.' },
  ];
  const E = { tab: 'ideas', videos: [], cola: [], listo: false, falta: false, urls: {}, canal: null, ver: {} };
  const ahora = () => new Date().toISOString();
  const yo = () => (typeof session!=='undefined' && session && (session.name || session.email)) || 'admin';
  const fecha = (iso) => { try { return new Date(iso).toLocaleString('es-CO', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }); } catch (e) { return ''; } };
  const guionTxt = (g) => Array.isArray(g) ? g.map((s, i) => `${i + 1}. (${s.tiempo || ''}) ${s.accion || ''}\n   Pantalla: ${s.pantalla || ''}\n   Voz: ${s.voz || ''}${s.pronuncia ? `\n   Pronunciación: ${s.pronuncia}` : ''}`).join('\n\n') : (g || '');
  const nid = () => 'v' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const faltaTablas = (err) => err && (err.code === '42P01' || err.code === 'PGRST205' || /does not exist|schema cache/i.test(err.message || ''));

  /* ---------- datos ---------- */
  async function cargar() {
    if (typeof sb==='undefined' || !sb) { E.listo = true; return; }
    const [v, c] = await Promise.all([
      sb.from('estudio_videos').select('id,estado,data,creado,actualizado').neq('estado', 'descartada').order('actualizado', { ascending: false }),
      sb.from('estudio_cola').select('*').order('creado', { ascending: false }).limit(60),
    ]);
    if (faltaTablas(v.error) || faltaTablas(c.error)) { E.falta = true; E.listo = true; return; }
    if (v.error) { toast('Estudio: ' + v.error.message); }
    E.falta = false; E.videos = (v.data || []).map((r) => ({ id: r.id, estado: r.estado, creado: r.creado, actualizado: r.actualizado, ...(r.data || {}) }));
    E.cola = c.data || []; E.listo = true;
    if (!E.canal && sb.channel) {
      let t = null; const re = () => { clearTimeout(t); t = setTimeout(async () => { await cargar(); pintar(true); }, 400); };
      E.canal = sb.channel('estudio')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'estudio_videos' }, re)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'estudio_cola' }, re)
        .subscribe();
    }
  }
  const fila = (v) => { const { id, estado, creado, actualizado, ...data } = v; return { id, estado, data }; };
  async function guardar(id, cambios, accion) {
    const { data: r, error: e1 } = await sb.from('estudio_videos').select('id,estado,data').eq('id', id).single();
    if (e1) return toast('No se pudo leer: ' + e1.message);
    const data = { ...(r.data || {}) }, estado = cambios.estado || r.estado;
    Object.keys(cambios).forEach((k) => { if (k !== 'estado') data[k] = cambios[k]; });
    if (accion) data.historial = [...(data.historial || []), { fecha: ahora(), por: yo(), accion }].slice(-40);
    const { error } = await sb.from('estudio_videos').update({ estado, data, actualizado: ahora() }).eq('id', id);
    if (error) return toast('No se pudo guardar: ' + error.message);
    await cargar(); pintar(true);
  }
  async function pedir(bot, video_id, nota) {
    const { error } = await sb.from('estudio_cola').insert({ bot, video_id: video_id || null, pedido_por: yo(), nota: nota || '' });
    if (error) return toast('No se pudo pedir: ' + error.message);
    toast(`Pedido enviado a ${BOTS.find((b) => b.k === bot).n}`); await cargar(); pintar(true);
  }
  async function urlDe(path) {
    if (!path) return null;
    const c = E.urls[path]; if (c && c.exp > Date.now()) return c.url;
    const { data, error } = await sb.storage.from('estudio').createSignedUrl(path, 3600);
    if (error) return null; E.urls[path] = { url: data.signedUrl, exp: Date.now() + 3500e3 }; return data.signedUrl;
  }

  /* ---------- pintar ---------- */
  function pintar(mantener) {
    const ab = $('ab'); if (!ab || typeof atab==='undefined' || atab !== 'estudio') return;
    const y = window.scrollY, foco = document.activeElement && document.activeElement.id, val = foco && $(foco) ? $(foco).value : null;
    if (mantener && foco && /TEXTAREA|INPUT/.test(document.activeElement.tagName) && val) return;   // no borrar lo que alguien está escribiendo
    if (!E.listo) { ab.innerHTML = '<p class="hint">Cargando el estudio…</p>'; return; }
    if (E.falta) { ab.innerHTML = `<div class="panel"><b>Falta activar el Estudio en Supabase.</b><p class="hint">Entra a Supabase → SQL Editor → New query, pega el archivo <b>supabase/estudio.sql</b> del repositorio y dale Run. Luego recarga esta página.</p></div>`; return; }
    const paso = PASOS.find((p) => p.k === E.tab), items = E.videos.filter((v) => paso.est.includes(v.estado));
    ab.innerHTML = `
      <div class="es-pasos">${PASOS.map((p) => { const n = E.videos.filter((v) => p.est.includes(v.estado)).length;
        return `<button class="es-paso ${E.tab === p.k ? 'on' : ''}" onclick="EST.tab('${p.k}')"><span>${p.ic}</span>${p.n}${n ? `<i>${n}</i>` : ''}</button>`; }).join('')}</div>
      ${bots()}
      ${(VISTA[E.tab](items) || '')}
      ${herramientas()}`;
    if (mantener) window.scrollTo(0, y);
    ab.querySelectorAll('video[data-path]').forEach(async (el) => { const u = await urlDe(el.dataset.path); if (u) el.src = u; });
    ab.querySelectorAll('a[data-path]').forEach(async (el) => { const u = await urlDe(el.dataset.path); if (u) el.href = u; });
  }
  function bots() {
    const pend = (b) => E.cola.filter((c) => c.bot === b && (c.estado === 'pendiente' || c.estado === 'tomado'));
    return `<details class="panel es-bots"><summary><b>🤖 Bots</b> <small>${E.cola.filter((c) => c.estado === 'pendiente').length} pedidos en cola</small></summary>
      ${BOTS.map((b) => { const p = pend(b.k), ult = E.cola.find((c) => c.bot === b.k && c.estado === 'hecho');
        return `<div class="row"><div class="av" style="width:38px;height:38px;font-size:18px">${b.ic}</div><div class="grow"><b>${b.n}</b> <small>· ${b.r}</small><small>${b.d}</small>
          <small>${p.length ? `⏳ ${p.map((c) => `${c.estado === 'tomado' ? 'trabajando (' + esc(c.tomado_por) + ')' : 'en cola'} · pidió ${esc(c.pedido_por)}`).join(' · ')}` : ult ? `Último trabajo: ${fecha(ult.actualizado)}` : 'Sin pedidos'}</small></div>
          <button class="ghost es-mini" onclick="EST.correr('${b.k}')">Correr ahora</button></div>`; }).join('')}
      <p class="hint">"Correr ahora" deja el pedido en la cola. Lo hace el primer computador con Claude encendido (el de Juan o el de su socio).</p></details>`;
  }
  const vacio = (t) => `<p class="hint" style="text-align:center;padding:18px 0">${t}</p>`;
  const nombreDe = (v) => esc(v.titulo || 'Sin título');
  const quien = (v) => { const h = (v.historial || []).slice(-1)[0]; return h ? `<small>${esc(h.accion)} · ${esc(h.por)} · ${fecha(h.fecha)}</small>` : ''; };
  const VISTA = {
    ideas(items) {
      return `<div class="panel"><textarea id="esIdea" rows="3" placeholder="Tu idea… ej: en la fila del banco alguien huele delicioso"></textarea>
        <div class="two" style="margin-top:8px"><button class="btn-gold" style="margin:0" onclick="EST.nuevaIdea()">Guardar idea</button><button class="btn-line" onclick="EST.correr('valentina')">💡 Pedir ideas a Valentina</button></div></div>
        ${items.length ? items.map((v) => `<div class="panel"><b>${nombreDe(v)}</b> <span class="pill">${esc(v.origen || '')}</span>
          <p class="es-txt">${esc(v.idea)}</p>${v.perfumes ? `<small class="es-mut">Perfumes: ${esc(v.perfumes)}</small>` : ''}${quien(v)}
          <div class="two" style="margin-top:10px"><button class="btn-gold" style="margin:0" onclick="EST.aprobarIdea('${v.id}')">✓ Aprobar idea</button><button class="ghost" onclick="EST.descartar('${v.id}')">Descartar</button></div></div>`).join('') : vacio('No hay ideas pendientes.')}`;
    },
    guion(items) {
      if (!items.length) return vacio('No hay guiones pendientes. Aprueba una idea primero.');
      return items.map((v) => { const g = guionTxt(v.guion), esperando = E.cola.some((c) => c.bot === 'mateo' && c.video_id === v.id && c.estado !== 'hecho' && c.estado !== 'error');
        return `<div class="panel"><b>${nombreDe(v)}</b><p class="es-mut">${esc(v.idea)}</p>${quien(v)}
          ${g ? `<textarea id="esG_${v.id}" rows="14" style="margin-top:8px">${esc(g)}</textarea>
            <div class="two" style="margin-top:8px"><button class="btn-gold" style="margin:0" onclick="EST.aprobarGuion('${v.id}')">✓ Aprobar guion</button><button class="btn-line" onclick="EST.guardarGuion('${v.id}')">Guardar cambios</button></div>
            <button class="ghost" style="margin-top:6px" onclick="EST.correr('mateo','${v.id}','Escribir otro guion')">↻ Pedir otro guion a Mateo</button>`
          : `<p class="hint">${esperando ? '✍️ Mateo tiene el pedido en cola.' : 'Todavía no tiene guion.'}</p>${esperando ? '' : `<button class="btn-gold" onclick="EST.correr('mateo','${v.id}')">✍️ Pedir guion a Mateo</button>`}`}
          <button class="ghost" style="margin-top:6px" onclick="EST.mover('${v.id}','idea','Devuelta a ideas')">← Devolver a ideas</button></div>`; }).join('');
    },
    revision(items) {
      if (!items.length) return vacio('Nada en revisión.');
      return items.map((v) => { const vers = v.versiones || [], ver = vers[vers.length - 1], pend = (v.notas || []).filter((n) => n.de !== 'claude' && !n.resuelta), nico = (v.notas || []).filter((n) => n.de === 'claude').slice(-1)[0];
        if (v.estado === 'produccion' || !ver) return `<div class="panel es-wait"><b>${nombreDe(v)}</b><p class="hint">🎬 Nico tiene el pedido${v.pedido ? ' desde ' + fecha(v.pedido) : ''}. Lo hace el primer computador con Claude encendido.</p>${quien(v)}
          <details><summary class="es-sum">Ver guion</summary><p class="es-txt">${esc(guionTxt(v.guion))}</p></details>${subir(v)}</div>`;
        return `<div class="panel"><b>${nombreDe(v)}</b> <span class="pill">v${vers.length}</span>${videoTag(ver)}
          ${nico ? `<small class="es-mut">🎬 Nico: ${esc(String(nico.texto).replace(/^\s*Nico:\s*/i,''))}</small>` : ''}${quien(v)}
          <details><summary class="es-sum">Ver guion</summary><p class="es-txt">${esc(guionTxt(v.guion))}</p></details>
          ${pend.length ? `<p class="hint">⏳ Cambios pedidos: ${pend.map((n) => `${esc(n.texto)} (${esc(n.por || 'admin')})`).join(' · ')}</p>` : ''}
          <textarea id="esC_${v.id}" rows="2" placeholder="¿Algo que cambiar? Escríbelo aquí…" style="margin-top:8px"></textarea>
          <div class="two" style="margin-top:8px"><button class="btn-gold" style="margin:0" onclick="EST.aprobarVideo('${v.id}')">✓ Aprobar video</button><button class="btn-line" onclick="EST.cambio('${v.id}')">Pedir cambio</button></div>${subir(v)}</div>`; }).join('');
    },
    publicar(items) {
      if (!items.length) return vacio('No hay videos listos para publicar.');
      return items.map((v) => { const ver = (v.versiones || []).slice(-1)[0];
        return `<div class="panel"><b>${nombreDe(v)}</b>${videoTag(ver)}${ver && ver.path ? `<a class="btn-line es-dl" data-path="${esc(ver.path)}" href="#" download target="_blank" rel="noopener">⬇ Descargar video</a>` : ''}${quien(v)}
          <input id="esL_${v.id}" type="url" placeholder="Pega el link del post (TikTok / Instagram / Facebook)" style="margin-top:8px">
          <div class="two" style="margin-top:8px"><button class="btn-gold" style="margin:0" onclick="EST.publicar('${v.id}')">🚀 Marcar como publicado</button><button class="ghost" onclick="EST.mover('${v.id}','revision','Devuelto a revisión')">← A revisión</button></div></div>`; }).join('');
    },
    resultados(items) {
      if (!items.length) return vacio('Todavía no hay videos publicados.');
      return items.map((v) => { const p = v.publicacion || {}, f = (k, l) => `<label class="es-st"><small>${l}</small><input id="es${k}_${v.id}" type="number" value="${p[k] ?? ''}"></label>`;
        return `<div class="panel"><b>${nombreDe(v)}</b> ${p.link ? `<a href="${esc(p.link)}" target="_blank" rel="noopener">Ver post ↗</a>` : ''}${quien(v)}
          <div class="es-stats">${f('vistas', 'Vistas')}${f('likes', 'Likes')}${f('comentarios', 'Coment.')}${f('ventas', 'Ventas')}</div>
          <textarea id="esN_${v.id}" rows="2" placeholder="¿Qué comentó la gente? (A, B, C…)" style="margin-top:8px">${esc(p.notas || '')}</textarea>
          <div class="two" style="margin-top:8px"><button class="btn-line" onclick="EST.metricas('${v.id}')">Guardar</button><button class="btn-gold" style="margin:0" onclick="EST.metricas('${v.id}',1)">📊 Pedir análisis a Tomás</button></div>
          ${v.analisis ? `<div class="es-ana"><small>📊 Tomás</small><p class="es-txt">${esc(v.analisis)}</p></div>` : ''}</div>`; }).join('');
    },
  };
  function videoTag(ver) {
    if (!ver) return '';
    if (ver.path) return `<video controls playsinline preload="metadata" data-path="${esc(ver.path)}" class="es-video"></video><small class="es-mut">${esc(ver.nota || '')} · ${fecha(ver.fecha)}</small>`;
    return `<p class="hint">Este video quedó en el Estudio anterior de Claude. Súbelo aquí abajo para verlo en la web.</p>`;
  }
  const subir = (v) => `<details style="margin-top:6px"><summary class="es-sum">Subir versión del video (MP4)</summary>
    <input type="file" accept="video/mp4" id="esF_${v.id}" style="margin-top:6px"><input type="text" id="esFN_${v.id}" placeholder="Nota (opcional)" style="margin-top:6px">
    <button class="btn-line" style="margin-top:6px" onclick="EST.subirVideo('${v.id}')">Subir</button></details>`;
  function herramientas() {
    return `<details class="panel"><summary class="es-sum">⚙️ Herramientas</summary>
      <p class="hint">Importar el respaldo del Estudio anterior (archivo <b>estudio/videos.json</b> del respaldo). Si un video ya existe, se actualiza.</p>
      <input type="file" accept="application/json,.json" id="esImp"><button class="btn-line" style="margin-top:6px" onclick="EST.importar()">Importar</button></details>`;
  }

  /* ---------- acciones ---------- */
  const EST = {
    tab(k) { E.tab = k; pintar(); },
    correr(bot, video_id, nota) { pedir(bot, video_id, nota); },
    async nuevaIdea() {
      const t = $('esIdea').value.trim(); if (!t) return;
      const v = { titulo: t.split(/[.,\n]/)[0].slice(0, 50), idea: t, perfumes: '', origen: yo(), notas: [], guion: '', versiones: [], archivos: [], publicacion: {}, historial: [{ fecha: ahora(), por: yo(), accion: 'Idea creada' }] };
      const { error } = await sb.from('estudio_videos').insert({ id: nid(), estado: 'idea', data: v });
      if (error) return toast('No se pudo guardar: ' + error.message);
      $('esIdea').value = ''; toast('Idea guardada'); await cargar(); pintar();
    },
    async aprobarIdea(id) { await guardar(id, { estado: 'guion' }, 'Idea aprobada'); const v = E.videos.find((x) => x.id === id); if (v && !guionTxt(v.guion)) pedir('mateo', id); E.tab = 'guion'; pintar(); },
    async descartar(id) { if (!confirm('¿Descartar esta idea?')) return; await guardar(id, { estado: 'descartada' }, 'Descartada'); },
    async mover(id, estado, accion) { await guardar(id, { estado }, accion); },
    async guardarGuion(id) { await guardar(id, { guion: $('esG_' + id).value }, 'Guion editado'); toast('Guion guardado'); },
    async aprobarGuion(id) { await guardar(id, { guion: $('esG_' + id).value, estado: 'produccion', pedido: ahora() }, 'Guion aprobado'); await pedir('nico', id); E.tab = 'revision'; pintar(); },
    async cambio(id) {
      const t = $('esC_' + id).value.trim(); if (!t) return; const v = E.videos.find((x) => x.id === id);
      await guardar(id, { notas: [...(v.notas || []), { texto: t, de: 'juan', por: yo(), fecha: ahora(), resuelta: false }] }, 'Cambio pedido');
      await pedir('nico', id, t);
    },
    async aprobarVideo(id) { await guardar(id, { estado: 'listo' }, 'Video aprobado'); E.tab = 'publicar'; pintar(); },
    async publicar(id) { const v = E.videos.find((x) => x.id === id); await guardar(id, { estado: 'publicado', publicacion: { ...(v.publicacion || {}), link: $('esL_' + id).value.trim(), fecha: ahora().slice(0, 10) } }, 'Publicado'); E.tab = 'resultados'; pintar(); },
    async metricas(id, analizar) {
      const v = E.videos.find((x) => x.id === id), n = (k) => { const x = $('es' + k + '_' + id).value; return x === '' ? null : Number(x); };
      await guardar(id, { publicacion: { ...(v.publicacion || {}), vistas: n('vistas'), likes: n('likes'), comentarios: n('comentarios'), ventas: n('ventas'), notas: $('esN_' + id).value.trim() } }, 'Métricas actualizadas');
      if (analizar) await pedir('tomas', id); else toast('Guardado');
    },
    async subirVideo(id) {
      const f = $('esF_' + id).files[0]; if (!f) return toast('Elige un archivo MP4');
      if (f.size > 50 * 1024 * 1024) return toast('El video pesa más de 50 MB');
      toast('Subiendo video…'); const path = `${id}/v${Date.now()}.mp4`;
      const { error } = await sb.storage.from('estudio').upload(path, f, { contentType: 'video/mp4' });
      if (error) return toast('No se pudo subir: ' + error.message);
      const v = E.videos.find((x) => x.id === id), vers = (v.versiones || []).filter((x) => x.path || x.assetId);
      await guardar(id, { versiones: [...vers, { path, fecha: ahora(), nota: $('esFN_' + id).value.trim() || 'Subido por ' + yo(), por: yo() }], ...(v.estado === 'produccion' ? { estado: 'revision' } : {}) }, 'Video subido');
      toast('Video subido');
    },
    async importar() {
      const f = $('esImp').files[0]; if (!f) return toast('Elige el archivo videos.json');
      let j; try { j = JSON.parse(await f.text()); } catch (e) { return toast('Ese archivo no es un JSON válido'); }
      const lista = Array.isArray(j) ? j : j.videos; if (!Array.isArray(lista)) return toast('No encontré la lista de videos');
      const filas = lista.filter((v) => v && v.id).map((v) => fila({ ...v, estado: PASOS.some((p) => p.est.includes(v.estado)) || v.estado === 'descartada' ? v.estado : 'idea' }));
      const { error } = await sb.from('estudio_videos').upsert(filas, { onConflict: 'id' });
      if (error) return toast('No se pudo importar: ' + error.message);
      toast(`${filas.length} videos importados`); await cargar(); pintar();
    },
  };
  window.EST = EST;

  /* ---------- estilos propios del estudio ---------- */
  const css = `.es-pasos{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;margin:4px 0 10px}
  .es-paso{position:relative;border:1px solid var(--line);background:var(--s1);border-radius:10px;padding:6px 2px;font-size:11px;color:var(--muted);text-align:center}
  .es-paso span{display:block;font-size:17px}.es-paso.on{background:var(--gold);color:var(--onGold);border-color:var(--gold);font-weight:600}
  .es-paso i{position:absolute;top:-6px;right:-3px;font-style:normal;background:#c0392b;color:#fff;border-radius:9px;font-size:10px;padding:0 5px;font-weight:600}
  .es-bots summary,.es-sum{cursor:pointer;color:var(--gold);font-size:13px}.es-bots summary small{color:var(--muted);margin-left:6px}
  .es-mini{width:auto!important;margin:0 0 0 8px!important;padding:5px 9px!important;font-size:12px!important}
  .es-txt{white-space:pre-wrap;font-size:13.5px;margin:6px 0}.es-mut{display:block;color:var(--muted);font-size:12.5px;margin-top:4px}
  .es-video{width:100%;max-height:70vh;background:#000;border-radius:8px;margin-top:8px;display:block}
  .es-dl{display:block;text-align:center;margin-top:8px}.es-wait{border-style:dashed}
  .es-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:8px}.es-st small{color:var(--muted);font-size:11px}
  .es-ana{background:var(--s2);border-radius:8px;padding:8px 10px;margin-top:10px}
  #ab textarea,#ab input[type=url],#ab input[type=text],#ab input[type=number]{width:100%;background:var(--s2);color:var(--ink);border:1px solid var(--line);border-radius:8px;padding:9px 11px;font:inherit;font-size:14px}
  #ab textarea::placeholder,#ab input::placeholder{color:var(--muted)}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* ---------- entrada desde el panel de administración ---------- */
  window.aEstudio = async function () {
    if (typeof isAdmin!=='function' || !isAdmin()) return;
    if (!E.listo) { pintar(); await cargar(); }
    pintar();
    cargar().then(() => pintar(true));
  };
})();
