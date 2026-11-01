/* Laboratório "Softmax e atenção" por contexto: as palavras da frase vêm de cenarios("atencao", ctxAtual);
   os vetores de cada posição (artigo, sujeito, verbo, preposição, complemento, ponto) são os mesmos em todos os contextos. */
window.LABS_V2 = window.LABS_V2 || {};
LABS_V2.atencao = function (stage, panel, extra) {
  const S = cenarios("atencao", ctxAtual), VEC = [[0.1, 0.1], [1, 0.2], [0.3, 0.9], [0.1, 0.2], [0.9, 0.5], [-0.2, 0]], T = S.tokens.map((t, i) => [t, VEC[i]]);
  const c = canvas(stage, 380); const R = readout(panel); let qi = 1;
  c.setAttribute("role", "img");
  const qs = sel(panel, "Token que pergunta", T.map(t => t[0]), v => { qi = v; draw(); }); qs.value = 1;
  const ts = ctl(panel, "Temperatura do softmax", 0.1, 3, 0.05, 1, v => fmt(v, 2), draw);
  function W(tau) { return T.map(([, a]) => { const s = T.map(([, b]) => (a[0] * b[0] + a[1] * b[1]) / (Math.SQRT2 * tau)), m = Math.max(...s), e = s.map(v => Math.exp(v - m)), z = e.reduce((x, y) => x + y, 0); return e.map(v => v / z); }); }
  function draw() {
    const {g, w, h} = setup(c), M = W(ts.get()), n = T.length, cs = Math.max(20, Math.min((w - 110) / n, (h - 90) / n)), ox = 96, oy = 70;
    g.font = `12px ${css("--f-body")}`; g.fillStyle = css("--muted"); g.textAlign = "left"; g.textBaseline = "alphabetic"; g.fillText("colunas: tokens observados · linhas: quem pergunta", 8, 18);
    for (let i = 0; i < n; i++) {
      g.fillStyle = i === qi ? css("--amber") : css("--ink"); g.textAlign = "right"; g.textBaseline = "middle"; g.fillText(T[i][0], ox - 8, oy + i * cs + cs / 2);
      g.save(); g.translate(ox + i * cs + cs / 2, oy - 8); g.rotate(-Math.PI / 4); g.fillStyle = css("--ink"); g.textAlign = "left"; g.fillText(T[i][0], 0, 0); g.restore();
      for (let j = 0; j < n; j++) { g.globalAlpha = 0.06 + 0.94 * M[i][j]; g.fillStyle = css("--curve"); g.fillRect(ox + j * cs, oy + i * cs, cs - 2, cs - 2); g.globalAlpha = 1;
        if (cs >= 40) { g.fillStyle = M[i][j] > .45 ? "#fff" : css("--ink"); g.textAlign = "center"; g.fillText(Math.round(M[i][j] * 100), ox + j * cs + cs / 2 - 1, oy + i * cs + cs / 2 - 1); } }
    }
    g.strokeStyle = css("--amber"); g.lineWidth = 2.5; g.strokeRect(ox - 1, oy + qi * cs - 1, n * cs, cs);
    const row = M[qi], out = [0, 1].map(k => row.reduce((s, wj, j) => s + wj * T[j][1][k], 0)), top = row.map((v, j) => ({v, j})).sort((a, b) => b.v - a.v);
    c.setAttribute("aria-label", `Mapa de atenção da frase "${T.map(t => t[0]).join(" ")}". O token "${T[qi][0]}" presta mais atenção em "${T[top[0].j][0]}" (${fmt(top[0].v * 100, 0)}%). Temperatura ${fmt(ts.get(), 2)}.`);
    R.innerHTML = `<div class="cl">“${T[qi][0]}” presta atenção em</div>` + top.map(x => `<div>${T[x.j][0]}: <b>${fmt(x.v * 100, 0)}%</b><div class="bar"><i style="width:${x.v * 100}%"></i></div></div>`).join("") +
      `<div>vetor de saída: <b>(${fmt(out[0], 2)}; ${fmt(out[1], 2)})</b>, a média ponderada dos tokens.</div><div>Temperatura baixa concentra a atenção; alta espalha igualmente. A divisão por √d já está aplicada.</div>`;
  }
  draw();
  kit("atencao", extra, {
    state: () => { const T = ts.get(), M = W(T); return {T, mx: Math.max(...M[qi])}; },
    goals: [
      {t: "Leve a temperatura ao mínimo (abaixo de 0,15) e veja a atenção se concentrar.", ok: s => s.T < 0.15 && s.mx > 0.5, win: () => "Temperatura baixa concentra a atenção num token."},
      {t: "Suba a temperatura acima de 2,5 e veja a atenção se espalhar: nenhum peso acima de 25%.", ok: s => s.T > 2.5 && s.mx < 0.25, win: () => "Temperatura alta espalha: todo token pesa quase igual."}
    ],
    react: s => s.mx > 0.5 ? ["Quase tudo num token só.", "thinking"] : s.mx < 0.25 ? ["Tudo igual: a atenção se espalhou.", "neutral"] : ["Troque o token que pergunta e compare as linhas.", "neutral"]
  });
  return draw;
};
