/* Laboratório "Teoria dos jogos" lendo o cenário do contexto escolhido (cenarios("jogos", ctxAtual)).
   Mesma matemática do original: melhores respostas, equilíbrios de Nash puros e equilíbrio misto 2×2 editáveis. */
window.LABS_V2 = window.LABS_V2 || {};
LABS_V2.jogos = function (stage, panel, extra) {
  const S = cenarios("jogos", ctxAtual), PS = S.jogos;
  let k = 0; const R = readout(panel);
  const s = sel(panel, S.sit, PS.map(f => f.nome), v => { k = v; build(); }); panel.insertBefore(s.parentElement, panel.firstChild);
  stage.innerHTML = `<div class="mxwrap"><table class="mx game" id="gm" aria-label="Matriz de ganhos: cada célula mostra o ganho da linha e o da coluna"></table></div>`;
  const gm = $("#gm", stage);
  function build() {
    const G = PS[k];
    gm.innerHTML = `<tr><td class="hd"></td>${G.C.map(c => `<td class="hd">Coluna: ${c}</td>`).join("")}</tr>` +
      G.P.map((r, i) => `<tr><td class="hd">Linha: ${G.L[i]}</td>${r.map((p, j) => `<td id="cell${i}${j}"><input id="p${i}${j}0" type="number" value="${p[0]}" data-i="${i}" data-j="${j}" data-k="0" aria-label="Ganho da linha em ${G.L[i]} contra ${G.C[j]}"> , <input id="p${i}${j}1" type="number" value="${p[1]}" data-i="${i}" data-j="${j}" data-k="1" aria-label="Ganho da coluna em ${G.C[j]} contra ${G.L[i]}"></td>`).join("")}</tr>`).join("");
    draw();
  }
  stage.addEventListener("input", draw);
  function draw() {
    const G = PS[k], P = [0, 1].map(i => [0, 1].map(j => [0, 1].map(q => +gm.querySelector(`[data-i="${i}"][data-j="${j}"][data-k="${q}"]`).value || 0)));
    const brL = (i, j) => P[i][j][0] >= P[1 - i][j][0], brC = (i, j) => P[i][j][1] >= P[i][1 - j][1], ne = [];
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
      const cell = $(`#cell${i}${j}`, gm), a = brL(i, j), b = brC(i, j);
      cell.classList.toggle("ne", a && b);
      gm.querySelector(`[data-i="${i}"][data-j="${j}"][data-k="0"]`).classList.toggle("br", a);
      gm.querySelector(`[data-i="${i}"][data-j="${j}"][data-k="1"]`).classList.toggle("br", b);
      if (a && b) ne.push(`${G.L[i]} / ${G.C[j]}`);
    }
    const dq = P[0][0][1] - P[0][1][1] - P[1][0][1] + P[1][1][1], dp = P[0][0][0] - P[1][0][0] - P[0][1][0] + P[1][1][0];
    const pr = dq ? (P[1][1][1] - P[1][0][1]) / dq : NaN, qc = dp ? (P[1][1][0] - P[0][1][0]) / dp : NaN;
    const mixed = pr > 0 && pr < 1 && qc > 0 && qc < 1 ? `<div class="am">equilíbrio misto: linha joga “${G.L[0]}” em <b>${fmt(pr * 100, 0)}%</b> das vezes, coluna joga “${G.C[0]}” em <b>${fmt(qc * 100, 0)}%</b></div>` : "";
    R.innerHTML = `<div>${G.t}</div><div class="${ne.length ? "ok" : "no"}">${ne.length ? "Equilíbrio de Nash puro: <b>" + ne.join("; ") + "</b>" : "Não há equilíbrio puro."}</div>${mixed}
      <div>Números em verde são a melhor resposta daquele jogador. Célula com borda verde: as duas são melhores respostas. Edite os ganhos e veja o equilíbrio mudar.</div>`;
  }
  build();
  kit("jogos", extra, {
    state: () => ({k, ne: gm.querySelectorAll("td.ne").length}),
    goals: [
      {t: S.g1, ok: (s, memo) => { memo[s.k] = 1; return Object.keys(memo).length === 3; }, win: () => "Três jogos, três tipos de equilíbrio."},
      {t: S.g2, ok: s => s.k === 0 && s.ne >= 2, win: () => "Dois equilíbrios: agora é preciso combinar qual deles."}
    ],
    react: s => s.ne === 0 ? ["Nenhum equilíbrio puro: precisa misturar as jogadas.", "thinking"] : s.ne >= 2 ? ["Dois equilíbrios: coordenação.", "happy"] : ["Um equilíbrio: ninguém ganha mudando sozinho.", "neutral"]
  });
  return draw;
};
