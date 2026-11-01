/* Laboratório "Matrizes e sistemas" lendo o cenário do contexto escolhido (cenarios("matrizes", ctxAtual)).
   Mesma matemática do original: A·x = b com 3 incógnitas, singularidade e viabilidade (x ≥ 0). */
window.LABS_V2 = window.LABS_V2 || {};
LABS_V2.matrizes = function (stage, panel, extra) {
  const S = cenarios("matrizes", ctxAtual), A0 = S.A0, b0 = S.b0, prod = S.cols, nut = S.linhas, E = S.esc;
  stage.innerHTML = `<div class="mxwrap"><h4>${S.titA}</h4><table class="mx" id="mxA" aria-label="${S.titA}"></table><h4>${S.titB}</h4><table class="mx" id="mxB" aria-label="${S.titB}"></table></div>`;
  const tA = $("#mxA", stage), tB = $("#mxB", stage); let n = 0;
  tA.innerHTML = `<tr><th></th>${prod.map(p => `<th>${p}</th>`).join("")}</tr>` + A0.map((r, i) => `<tr><th>${nut[i]}</th>${r.map((v, j) => `<td><input id="a${n++}" type="number" step="1" value="${v}" data-i="${i}" data-j="${j}" aria-label="${nut[i]} em ${prod[j]}"></td>`).join("")}</tr>`).join("");
  tB.innerHTML = `<tr>${b0.map((v, i) => `<td><input id="b${i}" type="number" step="${S.passoB}" value="${v}" data-b="${i}" aria-label="Meta de ${nut[i]}"></td>`).join("")}</tr>`;
  const R = readout(panel), r = row(panel);
  btn(r, "Valores iniciais", () => { stage.querySelectorAll("[data-i]").forEach(e => e.value = A0[e.dataset.i][e.dataset.j]); stage.querySelectorAll("[data-b]").forEach(e => e.value = b0[e.dataset.b]); draw(); }, true);
  btn(r, "Tornar singular", () => { stage.querySelectorAll("[data-i]").forEach(e => { if (e.dataset.j === "1") e.value = stage.querySelector(`[data-i="${e.dataset.i}"][data-j="0"]`).value; }); draw(); }, true);
  stage.addEventListener("input", draw);
  function draw() {
    const A = [0, 1, 2].map(i => [0, 1, 2].map(j => (+stage.querySelector(`[data-i="${i}"][data-j="${j}"]`).value || 0) / E));
    const b = [0, 1, 2].map(i => +stage.querySelector(`[data-b="${i}"]`).value || 0), d = det3(A), I = inv(A);
    if (!I) { R.innerHTML = `<div class="no"><b>det(A) = ${fmt(d, 4)}</b>. A matriz é singular: não existe inversa.</div><div>${S.sing}</div>`; return; }
    const x = I.map(r => r.reduce((s, v, j) => s + v * b[j], 0)), tot = x.reduce((s, v) => s + v, 0), mx = Math.max(...x.map(Math.abs), 1);
    R.innerHTML = `<div>det(A) = <b>${fmt(d, 4)}</b>, a inversa existe.</div><div class="cl">${S.xr}</div>` +
      x.map((v, i) => `<div>${prod[i]}: <b class="${v < 0 ? "no" : ""}">${fmt(v, 1)} ${S.un}</b>${v < 0 ? " (negativo: inviável)" : ""}<div class="bar"><i style="width:${clamp(Math.abs(v) / mx * 100, 0, 100)}%"></i></div></div>`).join("") +
      `<div>${S.totR}: <b>${fmt(tot, 1)} ${S.totU}</b></div>`;
  }
  draw();
  kit("matrizes", extra, {
    state: () => { const f = (i, j) => stage.querySelector('[data-i="' + i + '"][data-j="' + j + '"]').value, A = [0, 1, 2].map(i => [0, 1, 2].map(j => (+f(i, j) || 0) / E)), b = [0, 1, 2].map(i => +stage.querySelector('[data-b="' + i + '"]').value || 0), I = inv(A), x = I ? I.map(r => r.reduce((a, v, j) => a + v * b[j], 0)) : null; return {sing: !I, b0: b[0], neg: !!x && x.some(v => v < 0)}; },
    goals: [
      {t: S.g1, ok: s => s.sing, win: () => S.g1win},
      {t: S.g2, ok: s => !s.sing && s.b0 >= S.meta && !s.neg, win: () => S.g2win}
    ],
    react: s => s.sing ? [S.rSing, "worried"] : s.neg ? [S.rNeg, "worried"] : [S.rOk, "happy"]
  });
  return draw;
};
