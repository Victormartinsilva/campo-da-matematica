/* Laboratório "Gradientes e curvas de nível" lendo CENARIOS.gradiente pelo contexto escolhido.
   As cinco superfícies (f, gradiente, domínio, ponto inicial, taxa) são as mesmas em todos os contextos;
   o contexto troca nomes, textos, eixos e a letra da função. heatImage e arrow vêm do app.js. */
window.LABS_V2 = window.LABS_V2 || {};
LABS_V2.gradiente = function (stage, panel, extra) {
  const G = cenarios("gradiente", ctxAtual), FL = G.fl;
  const MAT = [
    {f: (x, y) => x * x + y * y, g: (x, y) => [2 * x, 2 * y], R: 3, st: [2.2, 1.6], lr: 0.1, gs: 4},
    {f: (x, y) => 0.5 * x * x + 4 * y * y, g: (x, y) => [x, 8 * y], R: 3, st: [2.5, 1.2], lr: 0.1, gs: 6},
    {f: (x, y) => x * x - y * y, g: (x, y) => [2 * x, -2 * y], R: 3, st: [1.5, 0.2], lr: 0.1, gs: 4},
    {f: (x, y) => 3 * Math.sin(x) * Math.cos(y / 1.3) + 0.3 * x, g: (x, y) => [3 * Math.cos(x) * Math.cos(y / 1.3) + 0.3, -(3 / 1.3) * Math.sin(x) * Math.sin(y / 1.3)], R: 4, st: [-1, 1.5], lr: 0.15, gs: 2.5},
    {f: (x, y) => (x * x + y - 11) ** 2 + (x + y * y - 7) ** 2, g: (x, y) => [4 * x * (x * x + y - 11) + 2 * (x + y * y - 7), 2 * (x * x + y - 11) + 4 * y * (x + y * y - 7)], R: 5, st: [0, 0], lr: 0.01, gs: 80}
  ];
  const SF = MAT.map((m, i) => ({...m, nome: G.sup[i].nome, t: G.sup[i].t, ex: G.sup[i].ex || G.ex, ey: G.sup[i].ey || G.ey}));
  let k = 0, pt = SF[0].st.slice(), trail = [pt.slice()], field = true, cache = null, ckey = "", last = null, drag = false;
  const c = canvas(stage, 440); c.style.maxWidth = "520px"; c.style.margin = "0 auto"; c.style.touchAction = "none"; const R = readout(panel);
  const s = sel(panel, "Superfície", SF.map(x => x.nome), v => { k = v; reset(); }); panel.insertBefore(s.parentElement, panel.firstChild);
  const th = ctl(panel, "Direção u (ângulo)", 0, 360, 1, 45, v => v + "°", draw), lr = ctl(panel, "Taxa de aprendizado", 0.005, 0.3, 0.005, 0.1, v => fmt(v, 3), () => {});
  const r1 = row(panel), r2 = row(panel);
  btn(r1, "Descer 1 passo", () => go(1)); btn(r1, "Descer 25 passos", () => go(25));
  btn(r2, "Alinhar u ao gradiente", () => { const g = SF[k].g(pt[0], pt[1]); th.set(Math.round((Math.atan2(g[1], g[0]) * 180 / Math.PI + 360) % 360)); draw(); }, true);
  const fb = btn(r2, "Setas: ligadas", () => { field = !field; fb.textContent = "Setas: " + (field ? "ligadas" : "desligadas"); draw(); }, true); btn(r2, "Limpar trilha", () => { trail = [pt.slice()]; draw(); }, true);
  function reset() { pt = SF[k].st.slice(); trail = [pt.slice()]; lr.set(SF[k].lr); cache = null; draw(); }
  function go(n) { const S = SF[k]; for (let i = 0; i < n; i++) { const g = S.g(pt[0], pt[1]); pt = [clamp(pt[0] - lr.get() * g[0], -S.R, S.R), clamp(pt[1] - lr.get() * g[1], -S.R, S.R)]; trail.push(pt.slice()); } draw(); }
  const heat = heatImage;
  const mv = e => { const S = SF[k], b = c.getBoundingClientRect(), pw = last.w - last.m.l - last.m.r, ph = last.h - last.m.t - last.m.b;
    pt = [clamp(-S.R + (e.clientX - b.left - last.m.l) / pw * 2 * S.R, -S.R, S.R), clamp(S.R - (e.clientY - b.top - last.m.t) / ph * 2 * S.R, -S.R, S.R)]; trail = [pt.slice()]; draw(); };
  c.addEventListener("pointerdown", e => { drag = true; c.setPointerCapture(e.pointerId); mv(e); }); c.addEventListener("pointermove", e => { if (drag) mv(e); }); c.addEventListener("pointerup", () => { drag = false; });
  function draw() {
    const S = SF[k]; c.style.height = Math.max(240, c.clientWidth - 14) + "px";
    const p = plane(c, -S.R, S.R, -S.R, S.R, S.ex, S.ey), g = p.g, pw = p.w - p.m.l - p.m.r, ph = p.h - p.m.t - p.m.b; last = p;
    const key = k + css("--curve") + css("--panel"); if (!cache || key !== ckey) { cache = heat(S); ckey = key; }
    g.drawImage(cache, p.m.l, p.m.t, pw, ph); g.strokeStyle = css("--axis"); g.lineWidth = 1; g.strokeRect(p.m.l, p.m.t, pw, ph);
    if (field) for (let i = 0; i < 11; i++) for (let j = 0; j < 11; j++) { const x = -S.R + (i + .5) * 2 * S.R / 11, y = -S.R + (j + .5) * 2 * S.R / 11, gr = S.g(x, y), mg = Math.hypot(gr[0], gr[1]); if (mg < 1e-9) continue;
      const ax = p.X(x), ay = p.Y(y), dx = gr[0] / mg * 8, dy = -gr[1] / mg * 8; g.globalAlpha = 0.55; arrow(g, ax - dx, ay - dy, ax + dx, ay + dy, css("--ink"), 1.2); g.globalAlpha = 1; }
    if (trail.length > 1) { g.strokeStyle = css("--ink"); g.lineWidth = 2; g.beginPath(); trail.forEach(([x, y], i) => i ? g.lineTo(p.X(x), p.Y(y)) : g.moveTo(p.X(x), p.Y(y))); g.stroke(); trail.forEach(([x, y]) => { g.fillStyle = css("--ink"); g.beginPath(); g.arc(p.X(x), p.Y(y), 2.5, 0, 7); g.fill(); }); }
    const gr = S.g(pt[0], pt[1]), mg = Math.hypot(gr[0], gr[1]), px = p.X(pt[0]), py = p.Y(pt[1]), ang = th.get() * Math.PI / 180, ux = Math.cos(ang), uy = Math.sin(ang);
    if (mg > 1e-9) { const len = 26 + 70 * Math.tanh(mg / S.gs); arrow(g, px, py, px + gr[0] / mg * len, py - gr[1] / mg * len, css("--good"), 3.5); }
    arrow(g, px, py, px + ux * 52, py - uy * 52, css("--amber"), 2.5); p.dot(pt[0], pt[1], css("--panel"), 6); p.dot(pt[0], pt[1], css("--ink"), 3);
    const D = gr[0] * ux + gr[1] * uy, ga = (Math.atan2(gr[1], gr[0]) * 180 / Math.PI + 360) % 360;
    c.setAttribute("role", "img");
    c.setAttribute("aria-label", `Mapa de curvas de nível de ${S.nome}. Ponto em ${fmt(pt[0], 2)}; ${fmt(pt[1], 2)}, gradiente de tamanho ${fmt(mg, 2)} na direção ${fmt(ga, 0)} graus. Clique ou arraste no mapa para mover o ponto.`);
    R.innerHTML = `<div class="ok">gradiente ∇${FL} = (<b>${fmt(gr[0], 2)}</b>; <b>${fmt(gr[1], 2)}</b>)</div><div>tamanho |∇${FL}| = <b>${fmt(mg, 2)}</b> · direção <b>${fmt(ga, 0)}°</b></div>
      <div class="am">derivada na direção u: ∇${FL}·u = <b>${fmt(D, 2)}</b> ${mg < 1e-6 ? "" : D > 0.05 ? "(subindo)" : D < -0.05 ? "(descendo)" : "(seguindo a curva de nível)"}</div>
      <div>${FL}(x, y) = <b>${fmt(S.f(pt[0], pt[1]), 2)}</b>${mg < 1e-3 ? " · gradiente ≈ 0: ponto crítico" : ""}</div><div>${S.t}</div>
      <div>Seta verde = gradiente (sobe mais rápido). Seta laranja = direção u. Gire u: o valor é máximo quando alinha com a verde e zero quando é perpendicular.</div>`;
  }
  pt = SF[0].st.slice(); draw();
  kit("gradiente", extra, {
    state: () => { const g = SF[k].g(pt[0], pt[1]); return {k, gn: Math.hypot(g[0], g[1]), steps: trail.length - 1}; },
    goals: [
      {t: "Desça até o gradiente ficar menor que 0,05.", ok: s => s.steps > 0 && s.gn < 0.05, win: () => "Gradiente quase zero: você chegou ao fundo."},
      {t: G.g2.t, ok: s => s.k === 3 && s.steps > 0 && s.gn < 0.1, win: () => G.g2.win}
    ],
    react: s => s.steps === 0 ? ["Clique no mapa para escolher o ponto, ou use Descer.", "thinking"] : s.gn < 0.1 ? ["Quase parado: o gradiente é quase zero.", "happy"] : ["Seta verde: para onde sobe mais rápido. A descida vai ao contrário.", "neutral"]
  });
  return draw;
};
