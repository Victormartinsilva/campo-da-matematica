/* Laboratório "Do logit ao próximo token" por contexto: o começo da frase e os candidatos com seus logits vêm de cenarios("token", ctxAtual). */
window.LABS_V2 = window.LABS_V2 || {};
LABS_V2.token = function (stage, panel, extra) {
  const S = cenarios("token", ctxAtual), TK = S.tokens; let counts = null;
  stage.innerHTML = `<div class="mxwrap" id="tk"></div>`; const box = $("#tk", stage), R = readout(panel);
  const Ts = ctl(panel, "Temperatura", 0.1, 2, 0.05, 0.8, v => fmt(v, 2), () => { counts = null; draw(); }), ks = ctl(panel, "top-k", 1, 8, 1, 8, v => v, () => { counts = null; draw(); }), ps = ctl(panel, "top-p", 0.1, 1, 0.05, 1, v => fmt(v, 2), () => { counts = null; draw(); });
  let q = [];
  btn(row(panel), "Amostrar 1000 vezes", () => { counts = TK.map(() => 0); for (let i = 0; i < 1000; i++) { let u = Math.random(), a = 0; for (let j = 0; j < q.length; j++) { a += q[j]; if (u <= a || j === q.length - 1) { counts[j]++; break; } } } draw(); });
  function draw() {
    const z = TK.map(t => t[1] / Ts.get()), mx = Math.max(...z), e = z.map(v => Math.exp(v - mx)), Z = e.reduce((s, v) => s + v, 0), pr = e.map(v => v / Z);
    const ord = pr.map((v, i) => i).sort((a, b) => pr[b] - pr[a]); let cum = 0, keep = 0; for (const i of ord) { cum += pr[i]; keep++; if (cum >= ps.get() - 1e-9) break; }
    const n = Math.min(ks.get(), keep), kept = new Set(ord.slice(0, n)), tot = ord.slice(0, n).reduce((s, i) => s + pr[i], 0);
    q = pr.map((v, i) => kept.has(i) ? v / tot : 0); const H = -q.reduce((s, v) => s + (v > 0 ? v * Math.log2(v) : 0), 0);
    box.innerHTML = `<h4 class="cl" style="margin:4px 0 10px">${S.prompt} ___</h4>` + ord.map(i => `<div style="display:grid;grid-template-columns:96px minmax(80px,1fr) 150px;gap:10px;align-items:center;margin:7px 0">
      <span>${TK[i][0]}</span><div class="bar"><i style="width:${pr[i] * 100}%;opacity:${kept.has(i) ? 1 : 0.28}"></i></div>
      <span style="font:500 13px var(--f-body)">${fmt(q[i] * 100, 1)}%${counts ? " · sorteado " + fmt(counts[i] / 10, 1) + "%" : ""}</span></div>`).join("");
    R.innerHTML = `<div>candidatos mantidos: <b>${n}</b> de ${TK.length}</div><div>entropia: <b>${fmt(H, 2)} bits</b> (0 = sempre a mesma resposta)</div>
      <div>Temperatura baixa e top-k 1 dão sempre “${TK[ord[0]][0]}”. Temperatura alta espalha a probabilidade. Barras apagadas foram cortadas por top-k ou top-p.</div>`;
  }
  draw();
  kit("token", extra, {
    state: () => ({T: Ts.get(), k: ks.get(), kept: q.filter(v => v > 0).length}),
    goals: [
      {t: "Deixe só 1 candidato (top-k = 1): a resposta fica sempre igual.", ok: s => s.k === 1, win: () => "Top-k 1 é o modo determinístico: sempre a palavra mais provável."},
      {t: "Ajuste temperatura e top-p até sobrarem 3 ou 4 candidatos.", ok: s => s.kept >= 3 && s.kept <= 4, win: () => "Variedade controlada: poucos candidatos plausíveis."}
    ],
    react: s => s.kept === 1 ? ["Um candidato só: sem variedade.", "thinking"] : s.T > 1.5 ? ["Temperatura alta: até as palavras improváveis ganham chance.", "worried"] : ["Veja quantos candidatos sobraram.", "neutral"]
  });
  return draw;
};
