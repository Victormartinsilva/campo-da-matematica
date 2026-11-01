/* Laboratório "A grande ideia do cálculo" lendo CENARIOS.ideia pelo contexto escolhido.
   Cada situação é uma taxa q(t) (CURVA seno ou decay) e o total V(t) = F(t) − F(a). */
window.LABS_V2 = window.LABS_V2 || {};
LABS_V2.ideia = function (stage, panel, extra) {
  const I = cenarios("ideia", ctxAtual);
  const SC = I.sit.map(e => { const C = CURVA(e.curva), F0 = C.F(e.a); return {...e, q: C.f, V: t => C.F(t) - F0}; });
  let k = 0; const c1 = canvas(stage, 230), c2 = canvas(stage, 230); const R = readout(panel);
  const s = sel(panel, "Situação", SC.map(x => x.nome), v => { k = v; draw(); }); panel.insertBefore(s.parentElement, panel.firstChild);
  const ts = ctl(panel, "Instante t", 0, 1, 0.005, 0.5, v => fmt(SC[k].a + v * (SC[k].b - SC[k].a), 2) + " " + SC[k].tu, draw);
  function draw() {
    const S = SC[k], t = S.a + ts.get() * (S.b - S.a), [, qh] = range(S.q, S.a, S.b), [, Vh] = range(S.V, S.a, S.b);
    const p = plane(c1, S.a, S.b, 0, qh * 1.15, S.xl, S.ql), g = p.g;
    p.clip(); g.globalAlpha = 0.3; g.fillStyle = css("--curve"); g.beginPath(); g.moveTo(p.X(S.a), p.Y(0));
    for (let i = 0; i <= 80; i++) { const x = S.a + (t - S.a) * i / 80; g.lineTo(p.X(x), p.Y(S.q(x))); }
    g.lineTo(p.X(t), p.Y(0)); g.closePath(); g.fill(); g.restore();
    p.curve(S.q, css("--curve")); p.line(t, 0, t, S.q(t), css("--amber"), 1.5, [5, 4]); p.dot(t, S.q(t), css("--amber"));
    const q2 = plane(c2, S.a, S.b, 0, Vh * 1.1, S.xl, S.Vl), dx = (S.b - S.a) * 0.16, sl = S.q(t);
    q2.curve(S.V, css("--good")); q2.line(t - dx, S.V(t) - sl * dx, t + dx, S.V(t) + sl * dx, css("--amber"), 2.5); q2.dot(t, S.V(t), css("--amber"));
    c1.setAttribute("role", "img"); c1.setAttribute("aria-label", `Gráfico da taxa: ${S.ql}. Área sombreada até t = ${fmt(t, 2)} ${S.tu}: ${fmt(S.V(t), 2)} ${S.u}.`);
    c2.setAttribute("role", "img"); c2.setAttribute("aria-label", `Gráfico do total: ${S.Vl}. Em t = ${fmt(t, 2)} ${S.tu} vale ${fmt(S.V(t), 2)} ${S.u}, com tangente de inclinação ${fmt(sl, 2)} ${S.ur}.`);
    R.innerHTML = `<div class="cl">Em t = ${fmt(t, 2)} ${S.tu}</div><div style="color:var(--curve)">área sombreada em cima: <b>${fmt(S.V(t), 2)} ${S.u}</b></div><div class="ok">altura do gráfico de baixo: <b>${fmt(S.V(t), 2)} ${S.u}</b></div>
      <div class="am">inclinação da tangente embaixo: <b>${fmt(sl, 2)} ${S.ur}</b> = altura da curva de cima</div><div>As duas leituras coincidem em qualquer t: integrar a taxa dá o total, e derivar o total devolve a taxa.</div>`;
  }
  draw();
  const G2 = I.g2;
  kit("ideia", extra, {
    state: () => ({k, t: ts.get()}),
    goals: [
      {t: I.g1.t, ok: s => s.t >= 0.98, win: () => I.g1.win},
      {t: G2.t, ok: s => { const S = SC[G2.k]; return s.k === G2.k && Math.abs(s.t * (S.b - S.a) + S.a - G2.t0) < 0.15; }, win: () => G2.win}
    ],
    react: s => s.t > 0.9 ? [`Quase no fim: ${I.termo} está chegando ao total.`, "happy"] : s.t < 0.1 ? ["No começo quase nada se acumulou.", "thinking"] : ["Veja: a área sombreada em cima é a altura do gráfico de baixo.", "neutral"]
  });
  return draw;
};
