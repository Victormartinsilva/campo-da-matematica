/* Laboratório "Integrais duplas e triplas" lendo CENARIOS.multiplas pelo contexto escolhido.
   Os helpers globais (ctl, readout, canvas, setup, kit...) vêm do app.js e só são usados quando a função roda. */
window.LABS_V2 = window.LABS_V2 || {};
LABS_V2.multiplas = function (stage, panel, extra) {
  const M = cenarios("multiplas", ctxAtual), D = M.dupla, T3 = M.tripla, dn = D.dens;
  const rf = (x, y) => dn.base + dn.amp * Math.exp(-((x - dn.cx) ** 2 + (y - dn.cy) ** 2) / (2 * dn.s * dn.s));
  /* soma em células n × n: densidade no centro de cada célula × área da célula (lado/n)² × fator de conversão */
  const vol = n => { let s = 0; const d = 100 / n; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) s += rf((i + .5) * d, (j + .5) * d); return s * (D.lado / n) ** 2 * D.fator; };
  const ref = vol(300), c = canvas(stage, 360); const R = readout(panel);
  const ns = ctl(panel, "Células por lado (n × n)", 1, 40, 1, 4, v => v + " × " + v + " = " + v * v, draw);
  const T = readout(panel);
  const zc = T3.z, zs = ctl(panel, zc.r, zc.min, zc.max, zc.step, zc.def, v => fmt(v, 1) + " " + zc.u, draw);
  const rho = T3.rho, sinal = rho.r1 < 0 ? "−" : "+", fz = `ρ(z) = ${fmt(rho.r0, 3)} ${sinal} ${fmt(Math.abs(rho.r1), 3)}·z`;
  function draw() {
    const {g, w, h} = setup(c), n = ns.get(), S = Math.min(w, h) - 24, ox = (w - S) / 2, oy = (h - S) / 2, d = S / n;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const r = rf((i + .5) * 100 / n, (j + .5) * 100 / n);
      g.globalAlpha = 0.08 + 0.85 * (r - dn.base) / dn.amp; g.fillStyle = css("--curve"); g.fillRect(ox + i * d, oy + S - (j + 1) * d, d + .5, d + .5);
    }
    g.globalAlpha = 1; g.strokeStyle = css("--axis"); g.lineWidth = 1; if (n <= 40) { for (let i = 0; i <= n; i++) { g.beginPath(); g.moveTo(ox + i * d, oy); g.lineTo(ox + i * d, oy + S); g.moveTo(ox, oy + i * d); g.lineTo(ox + S, oy + i * d); g.globalAlpha = .35; g.stroke(); } }
    g.globalAlpha = 1; g.strokeRect(ox, oy, S, S);
    g.fillStyle = css("--amber"); g.beginPath(); g.arc(ox + S / 2, oy + S / 2, 6, 0, 7); g.fill();
    g.fillStyle = css("--muted"); g.font = `11px ${css("--f-body")}`; g.textAlign = "left"; g.fillText(D.legenda, ox, oy - 5 > 8 ? oy - 5 : 10);
    const V = vol(n), one = rf(50, 50) * D.lado * D.lado * D.fator;
    c.setAttribute("role", "img");
    c.setAttribute("aria-label", `Mapa de densidade (${D.densU}) dividido em ${n} por ${n} células. ${D.legenda}. Soma nas células: ${fmt(V, 1)} ${D.totU}; integral dupla de referência: ${fmt(ref, 1)} ${D.totU}.`);
    R.innerHTML = `<div class="am">${D.so} (centro, ${fmt(rf(50, 50), 1)} ${D.densU}): <b>${fmt(one, 0)} ${D.totU}</b></div>
      <div>soma em ${n}×${n} células: <b>${fmt(V, 1)} ${D.totU}</b></div><div class="ok">integral dupla (referência): <b>${fmt(ref, 1)} ${D.totU}</b></div>
      <div>Um ponto erra em <b>${fmt(Math.abs(one - ref) / ref * 100, 0)}%</b>; a soma em células erra <b>${fmt(Math.abs(V - ref) / ref * 100, 1)}%</b>.</div>`;
    const Z = zs.get() / zc.esc, I = rho.r0 * Z + rho.r1 * Z * Z / 2;
    T.innerHTML = `<div class="cl">${T3.titulo}</div><div>∭ ρ dV com ${fz} (${rho.u})</div>
      <div>${T3.cam} de 0 a ${fmt(Z * zc.esc, 1)} ${zc.u}: <b>${fmt(T3.area * I, 0)} ${T3.totU}</b></div><div>${T3.medr}: ${fmt(I / Z, 3)} ${rho.u}</div>`;
  }
  draw();
  kit("multiplas", extra, {
    state: () => ({n: ns.get(), z: zs.get()}),
    goals: [
      {t: "Use 20 × 20 células ou mais e veja o erro cair.", ok: s => s.n >= 20, win: () => "Com muitas células a soma chega bem perto da integral."},
      {t: T3.g.t, ok: s => s.z >= T3.meta, win: () => T3.g.win}
    ],
    react: s => s.n === 1 ? [`Uma célula só é ${D.unico}: erra feio.`, "worried"] : s.n >= 20 ? [`Muitas células: a soma acompanha ${D.real || "a densidade real"}.`, "happy"] : ["Mais células, menos erro.", "neutral"]
  });
  return draw;
};
