/* Laboratório "Vetores, embeddings e busca" por contexto: os itens (títulos e rótulos) vêm de cenarios("embeddings", ctxAtual);
   as posições 2D são as mesmas em todos os contextos, então a matemática e os desafios não mudam.
   Os helpers globais (canvas, readout, sel, ctl, plane, kit...) vêm do app.js e só são usados quando a função roda. */
window.LABS_V2 = window.LABS_V2 || {};
LABS_V2.embeddings = function (stage, panel, extra) {
  const S = cenarios("embeddings", ctxAtual), V = [[-0.8, 0.45], [-0.35, 0.2], [0.8, -0.4], [0.45, -0.22], [0.4, 0.85], [0.2, 0.5]], ALVO = 5;
  const DOCS = S.docs.map(([t, s], i) => ({t, s, v: V[i]}));
  const c = canvas(stage, 380); c.style.touchAction = "none"; const R = readout(panel); let q = [0.5, 0.3], metric = 0, last = null, drag = false;
  c.setAttribute("role", "img");
  const ms = sel(panel, "Métrica de similaridade", ["Cosseno (ângulo)", "Distância euclidiana", "Produto escalar"], v => { metric = v; draw(); });
  const ks = ctl(panel, "Trechos recuperados (top-k)", 1, 4, 1, 2, v => v, draw);
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1], nm = a => Math.hypot(a[0], a[1]);
  const score = d => metric === 0 ? dot(d.v, q) / (nm(d.v) * nm(q) || 1) : metric === 1 ? -Math.hypot(d.v[0] - q[0], d.v[1] - q[1]) : dot(d.v, q);
  const mv = e => { const b = c.getBoundingClientRect(), px = e.clientX - b.left, py = e.clientY - b.top; q = [clamp(last.x0 + (px - last.m.l) / (last.w - last.m.l - last.m.r) * (last.x1 - last.x0), -1, 1), clamp(last.y0 + (last.h - last.m.b - py) / (last.h - last.m.t - last.m.b) * (last.y1 - last.y0), -1, 1)]; draw(); };
  c.addEventListener("pointerdown", e => { drag = true; c.setPointerCapture(e.pointerId); mv(e); }); c.addEventListener("pointermove", e => { if (drag) mv(e); }); c.addEventListener("pointerup", () => { drag = false; });
  function draw() {
    const p = plane(c, -1, 1, -1, 1, "clique no gráfico para mover a pergunta", ""); last = p; const g = p.g;
    const rk = DOCS.map((d, i) => ({d, i, s: score(d)})).sort((a, b) => b.s - a.s), top = new Set(rk.slice(0, ks.get()).map(x => x.i));
    DOCS.forEach((d, i) => { p.line(0, 0, d.v[0], d.v[1], css("--axis"), 1); p.dot(d.v[0], d.v[1], top.has(i) ? css("--good") : css("--muted"), top.has(i) ? 7 : 5);
      g.fillStyle = css("--ink"); g.font = `12px ${css("--f-body")}`; g.textAlign = "left"; g.textBaseline = "middle"; g.fillText(d.s, p.X(d.v[0]) + 10, p.Y(d.v[1])); });
    p.line(0, 0, q[0], q[1], css("--amber"), 2); p.dot(q[0], q[1], css("--amber"), 8); g.fillStyle = css("--amber"); g.font = `600 12px ${css("--f-body")}`; g.fillText("pergunta", p.X(q[0]) + 12, p.Y(q[1]) - 4);
    c.setAttribute("aria-label", `Plano de vetores com ${DOCS.length} documentos (${DOCS.map(d => d.s).join(", ")}) e a pergunta em (${fmt(q[0], 2)}; ${fmt(q[1], 2)}). Primeiro do ranking: ${rk[0].d.t}. Clique no gráfico para mover a pergunta.`);
    R.innerHTML = `<div class="cl">Ranking (${["cosseno, maior é melhor", "distância, menor é melhor", "produto escalar, maior é melhor"][metric]})</div>` +
      rk.map((x, j) => `<div class="${top.has(x.i) ? "ok" : ""}">${j + 1}. ${x.d.t} · <b>${fmt(metric === 1 ? -x.s : x.s, 3)}</b></div>`).join("") +
      `<div>Troque a métrica: documentos curtos e longos na mesma direção mudam de posição entre cosseno e distância. Por isso a métrica deve combinar com a do modelo de embedding.</div>`;
  }
  draw();
  kit("embeddings", extra, {
    state: () => { const rk = DOCS.map((d, i) => ({i, s: score(d)})).sort((a, b) => b.s - a.s); return {metric, top: rk[0].i}; },
    goals: [
      {t: `Mova a pergunta até o documento sobre ${S.alvo} ficar em primeiro no cosseno.`, ok: s => s.metric === 0 && s.top === ALVO, win: () => `${S.alvoA} é o mais parecido em direção com a pergunta.`},
      {t: "Troque a métrica e faça o primeiro colocado mudar.", ok: (s, memo) => { memo[s.metric] = s.top; return new Set(Object.values(memo)).size >= 2; }, win: () => "Métricas diferentes, rankings diferentes."}
    ],
    react: s => s.metric === 1 ? ["Distância: o tamanho do vetor pesa.", "thinking"] : s.top === ALVO ? [`${S.alvoA} é o primeiro: perguntas parecidas ficam na mesma direção.`, "happy"] : ["Clique no gráfico para mover a pergunta.", "neutral"]
  });
  return draw;
};
