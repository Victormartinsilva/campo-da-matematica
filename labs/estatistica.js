/* Laboratório "Experimentos" (estatística) lendo o cenário do contexto escolhido (cenarios("estatistica", ctxAtual)).
   Mesma matemática do original: dois grupos com média base e efeito real, teste t de Welch, repetição de 500 experimentos. */
window.LABS_V2 = window.LABS_V2 || {};
LABS_V2.estatistica = function (stage, panel, extra) {
  const S = cenarios("estatistica", ctxAtual), un = v => S.unid === "R$" ? "R$ " + fmt(v, S.dec) : fmt(v, S.dec) + " " + S.unid, pad = 4 * S.d.max / 15;
  const c = canvas(stage); const R = readout(panel); let A = [], B = [];
  const ds = ctl(panel, S.lD, 0, S.d.max, S.d.step, S.d.def, un, () => run());
  const ss = ctl(panel, S.lS, S.s.min, S.s.max, S.s.step, S.s.def, un, () => run());
  const ns = ctl(panel, S.lN, S.n.min, S.n.max, 1, S.n.def, v => v, () => run());
  const r = row(panel); let power = "";
  btn(r, "Rodar um experimento", () => run());
  btn(r, "Repetir 500 vezes", () => { let hit = 0; for (let i = 0; i < 500; i++) { const a = Array.from({length: ns.get()}, () => S.base + ss.get() * gauss()), b = Array.from({length: ns.get()}, () => S.base + ds.get() + ss.get() * gauss()); if (welch(a, b).p < 0.05) hit++; } power = `Em <b>${fmt(hit / 5, 1)}%</b> de 500 experimentos o teste detectou diferença (p < 0,05). ${ds.get() === 0 ? "Sem diferença real, isso são falsos positivos." : "Esse é o poder do teste."}`; draw(); }, true);
  function run() { power = ""; A = Array.from({length: ns.get()}, () => S.base + ss.get() * gauss()); B = Array.from({length: ns.get()}, () => S.base + ds.get() + ss.get() * gauss()); draw(); }
  function draw() {
    if (!A.length) return;
    const all = [...A, ...B], lo = Math.min(...all) - pad, hi = Math.max(...all) + pad, p = plane(c, 0, 3, lo, hi, "", S.yl), g = p.g;
    [[A, 1, css("--curve"), S.rotA], [B, 2, css("--amber"), S.rotB]].forEach(([arr, cx, col, nm]) => {
      arr.forEach((v, i) => p.dot(cx + ((i % 5) - 2) * 0.05 + (i % 2 ? .02 : -.02), v, col, 5));
      const m = mean(arr), s = sd(arr); p.line(cx - .3, m, cx + .3, m, col, 3); p.line(cx, m - s, cx, m + s, col, 1.5, [4, 3]);
      g.fillStyle = css("--ink"); g.font = `600 14px ${css("--f-body")}`; g.textAlign = "center"; g.fillText(nm, p.X(cx), p.h - p.m.b + 20);
    });
    const t = welch(A, B), sig = t.p < 0.05;
    c.setAttribute("aria-label", `Gráfico de pontos: ${S.yl} em dois grupos com ${A.length} observações cada. Média de ${S.rotA}: ${fmt(mean(A), S.dec)}; média de ${S.rotB}: ${fmt(mean(B), S.dec)}. Teste de Welch com p = ${fmt(t.p, 4)}: ${sig ? "diferença detectada" : "diferença não detectada"}.`);
    R.innerHTML = `<div>média ${S.sA} <b>${fmt(mean(A), S.dec)}</b> · média ${S.sB} <b>${fmt(mean(B), S.dec)}</b></div><div>desvio ${S.sA} <b>${fmt(sd(A), S.dec)}</b> · desvio ${S.sB} <b>${fmt(sd(B), S.dec)}</b></div>
      <div>t de Welch = <b>${fmt(t.t, 2)}</b> (gl ${fmt(t.df, 1)}) · p = <b>${fmt(t.p, 4)}</b></div>
      <div class="${sig ? "ok" : "no"}">${sig ? "Diferença detectada (p < 0,05)." : "Diferença não detectada neste experimento."}</div>
      ${power ? `<div>${power}</div>` : ""}<div>Linha cheia = média; tracejada = ± 1 desvio.</div>`;
  }
  run();
  kit("estatistica", extra, {
    state: () => ({d: ds.get(), s: ss.get(), n: ns.get(), p: A.length ? welch(A, B).p : 1}),
    goals: [
      {t: `Com diferença real de pelo menos ${S.unid === "R$" ? "R$ " + fmt(S.metaD, 0) : fmt(S.metaD, S.metaD % 1 ? 1 : 0) + " " + S.unid}, rode experimentos até o teste detectar (p < 0,05).`, ok: s => s.d >= S.metaD && s.p < 0.05, win: () => "Detectou! Com efeito maior, o teste enxerga mais fácil."},
      {t: `Suba ${S.unN} para ${S.metaN} ou mais e veja o resultado variar menos.`, ok: s => s.n >= S.metaN, win: () => "Mais repetições, mais poder: o acaso pesa menos."}
    ],
    react: s => s.p < 0.05 ? ["Diferença detectada neste experimento.", "happy"] : s.n <= 3 ? [S.poucas, "worried"] : ["Não detectou. Rode de novo ou aumente as repetições.", "thinking"]
  });
  return draw;
};
