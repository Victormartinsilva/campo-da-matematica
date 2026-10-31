/* Laboratório "Máximos e mínimos" com manipulação direta: arrastar o ponto testado sobre a curva,
   tangente rotulada, faixa de alerta em volta do ótimo e animação da subida do gradiente.
   Os helpers globais (ctl, btn, plane, arrastavel, kit...) vêm do app.js e só são usados quando a função roda. */
window.LABS_V2 = window.LABS_V2 || {};
LABS_V2.maxmin = function (stage, panel, extra) {
  const S = cenarios("maxmin", ctxAtual), {c0: A0, c1: B, c2: C2} = S.resp, XM = S.xmax, y = x => A0 + B * x - C2 * x * x, un = (v, u, d) => u.startsWith("R$") ? "R$ " + fmt(v, d) + u.slice(2) : fmt(v, d) + " " + u;
  const lucroU = (S.yl.match(/\(([^)]+)\)/) || [])[1] || "", tol = Math.max(1, 0.01 * XM), otimo = (p, q) => clamp((B - q / p) / (2 * C2), 0, XM);
  const c = canvas(stage); const R = readout(panel); let x = S.x0ini, timer = null;
  const drag = arrastavel(c, v => { parar(); x = clamp(Math.round(v), 0, XM); xs.set(x); draw(); });
  const ps = ctl(panel, S.preco.r, S.preco.min, S.preco.max, S.preco.step, S.preco.def, v => un(v, S.preco.un, S.preco.step < 1 ? 1 : 0), draw);
  const cs = ctl(panel, S.custo.r, S.custo.min, S.custo.max, S.custo.step, S.custo.def, v => un(v, S.custo.un, S.custo.step < 1 ? 1 : 0), draw);
  const xs = ctl(panel, S.testada, 0, XM, 1, x, v => v + " " + S.xu, v => { parar(); x = v; draw(); });
  /* um passo da subida; devolve quanto o ponto andou */
  const passo = () => { const p = ps.get(), q = cs.get(), nx = clamp(x + 0.5 * (p * (B - 2 * C2 * x) - q) / (2 * p * C2), 0, XM), d = Math.abs(nx - x); x = nx; xs.set(x); draw(); return d; };
  const r = row(panel);
  const anima = btn(r, "Animar a subida", () => timer ? parar() : animar(), true);
  btn(r, "Dar um passo na subida", () => { parar(); passo(); });
  btn(r, "Reiniciar", () => { parar(); x = S.x0ini; xs.set(x); draw(); }, true);
  /* animação: um passo a cada 400 ms até convergir (ou 80 passos) */
  function parar() { if (timer) { clearInterval(timer); timer = null; } anima.textContent = "Animar a subida"; }
  function animar() {
    let n = 0; anima.textContent = "Parar a animação";
    timer = setInterval(() => { if (!c.isConnected || passo() < 0.05 || ++n >= 80) parar(); }, 400);
  }
  const oldLeave = onLeave; onLeave = () => { parar(); if (oldLeave) oldLeave(); };
  function draw() {
    const p = ps.get(), q = cs.get(), L = z => p * y(z) - q * z, dL = z => p * (B - 2 * C2 * z) - q;
    const xo = otimo(p, q), xm = B / (2 * C2), [lo, hi] = range(L, 0, XM), pad = (hi - lo) * 0.12, dentro = Math.abs(x - xo) <= tol;
    const g = plane(c, 0, XM, lo - pad, hi + pad, S.xl, S.yl), ctx = g.g; drag(g);
    /* faixa de alerta: ±1% do eixo em volta do ótimo, mais forte quando o ponto testado entra nela */
    g.clip(); ctx.fillStyle = css("--good"); ctx.globalAlpha = dentro ? 0.32 : 0.14;
    ctx.fillRect(g.X(xo - tol), g.m.t, g.X(xo + tol) - g.X(xo - tol), g.h - g.m.t - g.m.b); ctx.restore(); ctx.globalAlpha = 1;
    g.curve(L, css("--curve"));
    g.line(xm, lo - pad, xm, hi + pad, css("--amber"), 1.5, [6, 4]); g.line(xo, lo - pad, xo, hi + pad, css("--good"), 1.5, [6, 4]);
    const m = dL(x); g.line(x - XM / 6, L(x) - XM / 6 * m, x + XM / 6, L(x) + XM / 6 * m, css("--amber"), 2);
    g.dot(xo, L(xo), css("--good"), 6); g.dot(x, L(x), css("--amber"), dentro ? 9 : 7);
    /* rótulo curto da inclinação, do lado que tiver espaço */
    const txt = "inclinação " + fmt(m, 1), px = g.X(x), py = g.Y(L(x)); ctx.font = `700 12px ${css("--f-body")}`;
    const tw = ctx.measureText(txt).width, direita = px + 14 + tw < g.w - g.m.r, tx = direita ? px + 14 : px - 14 - tw, ty = py - 22 < g.m.t ? py + 12 : py - 22;
    ctx.globalAlpha = 0.85; ctx.fillStyle = css("--panel"); ctx.fillRect(tx - 4, ty - 2, tw + 8, 18); ctx.globalAlpha = 1;
    ctx.fillStyle = css("--ink"); ctx.textAlign = "left"; ctx.textBaseline = "top"; ctx.fillText(txt, tx, ty);
    c.setAttribute("role", "img");
    c.setAttribute("aria-label", `Gráfico do lucro (${lucroU}) pela ${S.ent} (${S.xu}). Ponto testado em ${x} ${S.xu}, inclinação ${fmt(m, 1)}. Lucro máximo em ${fmt(xo, 0)} ${S.xu}${dentro ? "; o ponto testado está na faixa do ótimo" : ""}. Arraste o ponto ou use o controle deslizante.`);
    R.innerHTML = `<div>inclinação do lucro no ponto testado: <b>${fmt(m, 2)}</b> ${lucroU} a mais para cada 1 ${S.xu} a mais</div>
      <div class="ok">${S.ent} de lucro máximo: <b>${fmt(xo, 0)} ${S.xu}</b> (derivada = 0), lucro <b>${fmt(L(xo), 0)} ${lucroU}</b></div>
      <div class="am">${S.ent} de resposta máxima: <b>${fmt(xm, 0)} ${S.xu}</b>, ${fmt(y(xm), 1)} ${S.yu}</div>
      <div>Parar no ponto de lucro máximo economiza <b>${fmt(xm - xo, 0)} ${S.sub}</b> e perde só <b>${fmt(y(xm) - y(xo), 1)} ${S.yu}</b>.</div>
      ${dentro ? `<div class="ok">O ponto testado está na faixa verde: a inclinação já é quase zero.</div>` : ""}
      <div>Arraste o ponto laranja no gráfico. A faixa verde marca ±${fmt(tol, 0)} ${S.xu} em volta do ótimo.</div>
      <div>Modelo ilustrativo: ${CURVA({tipo: "quad", p: S.resp}).eq("y", "x")}.</div>`;
  }
  draw();
  kit("maxmin", extra, {
    state: () => { const p = ps.get(), q = cs.get(); return {p, x, xo: otimo(p, q)}; },
    goals: [
      {t: `Leve o ponto testado até o lucro máximo (a até ${fmt(tol, 0)} ${S.xu}).`, ok: s => Math.abs(s.x - s.xo) <= tol, win: () => "Topo do lucro. Aí a derivada vale zero."},
      {t: `Suba "${S.preco.r}" acima de ${S.precoAlto} e ache o novo ponto ótimo.`, ok: s => s.p > S.precoAlto && Math.abs(s.x - s.xo) <= tol, win: () => "Com cada unidade de resposta valendo mais, vale ir mais longe: o ponto ótimo subiu."}
    ],
    react: s => Math.abs(s.x - s.xo) <= tol ? ["Esse é o topo do lucro!", "happy"] : s.x > s.xo ? ["Passou do ponto ótimo: a última unidade custa mais do que rende.", "worried"] : ["Ainda dá para ganhar indo mais longe.", "thinking"]
  });
  return draw;
};
