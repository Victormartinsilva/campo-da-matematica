/* Método de Newton com manipulação direta: arraste o chute inicial x₀ no gráfico; "Animar" roda as iterações uma por segundo.
   Carregado antes do app.js; os helpers globais só são usados dentro da função. */
window.LABS_V2 = window.LABS_V2 || {};

LABS_V2.newton = function (stage, panel, extra) {
  const FN = [
    {nome: "x² − 2 (raiz de 2)", f: x => x * x - 2, d: x => 2 * x, a: -3, b: 3, y0: -4, y1: 8, x0: 1, roots: [-Math.SQRT2, Math.SQRT2]},
    {nome: "x³ − 2x − 5", f: x => x ** 3 - 2 * x - 5, d: x => 3 * x * x - 2, a: -3, b: 4, y0: -20, y1: 40, x0: 3, roots: [2.0945514815]},
    {nome: "cos x − x", f: x => Math.cos(x) - x, d: x => -Math.sin(x) - 1, a: -2, b: 3, y0: -4, y1: 2.5, x0: 2, roots: [0.7390851332]},
    {nome: "eˣ − 3x (duas raízes)", f: x => Math.exp(x) - 3 * x, d: x => Math.exp(x) - 3, a: -1, b: 3, y0: -2, y1: 8, x0: 0, roots: [0.6190612867, 1.5121345517]}
  ];
  const MAX = 12; let k = 0, xs = [FN[0].x0], anim = 0;
  const c = canvas(stage, 360); c.setAttribute("role", "img"); const R = readout(panel);
  const erroDe = (F, x) => Math.min(...F.roots.map(rt => Math.abs(x - rt)));
  const s = sel(panel, "Equação f(x) = 0", FN.map(f => f.nome), v => { k = v; reset(FN[k].x0); }); panel.insertBefore(s.parentElement, panel.firstChild);
  const x0s = ctl(panel, "Chute inicial x₀", 0, 1, 0.005, 0.8, v => fmt(FN[k].a + v * (FN[k].b - FN[k].a), 2), v => reset(FN[k].a + v * (FN[k].b - FN[k].a)));

  /* novo chute: zera as iterações e para a animação */
  function reset(x) { parar(); xs = [x]; x0s.set(clamp((x - FN[k].a) / (FN[k].b - FN[k].a), 0, 1)); draw(); }
  /* um passo de Newton; false se a tangente é horizontal ou o valor explodiu */
  function avanca() { const F = FN[k], x = xs[xs.length - 1], d = F.d(x); if (Math.abs(d) < 1e-9 || Math.abs(x) > 1e6) return false; xs.push(x - F.f(x) / d); return true; }
  function step(n) { parar(); for (let i = 0; i < n && avanca(); i++); draw(); }

  /* animação: um passo por segundo até convergir ou até MAX passos; o temporizador é limpo ao sair do assunto */
  const r = row(panel); btn(r, "Próximo passo", () => step(1)); btn(r, "Rodar 5", () => step(5), true);
  const bAn = btn(r, "Animar", () => {
    if (anim) return parar();
    xs = [xs[0]]; bAn.textContent = "Parar"; bAn.setAttribute("aria-pressed", "true"); draw();
    anim = setInterval(() => {
      const ok = avanca(), e = erroDe(FN[k], xs[xs.length - 1]);
      draw(); if (!ok || e < 1e-13 || xs.length - 1 >= MAX) parar();
    }, 1000);
  });
  btn(r, "Reiniciar", () => reset(FN[k].x0), true);
  function parar() { clearInterval(anim); anim = 0; bAn.textContent = "Animar"; bAn.setAttribute("aria-pressed", "false"); }
  const oldLeave = onLeave; onLeave = () => { clearInterval(anim); anim = 0; if (oldLeave) oldLeave(); };

  /* arrastar o chute x₀: a posição horizontal do ponteiro vale, o ponto acompanha a curva */
  const drag = arrastavel(c, x => { const F = FN[k]; reset(clamp(x, F.a, F.b)); });
  const tab = document.createElement("div"); tab.style.overflowX = "auto"; panel.appendChild(tab);

  function draw() {
    const F = FN[k], p = plane(c, F.a, F.b, F.y0, F.y1, "x", "f(x)"), g = p.g; drag(p); p.curve(F.f, css("--curve"), 3);
    for (let i = 0; i < xs.length; i++) { const x = xs[i], y = F.f(x), d = F.d(x), last = i === xs.length - 1;
      p.line(x, 0, x, y, css("--muted"), 1, [3, 3]);
      if (Math.abs(d) > 1e-9) { const nx = x - y / d; p.line(x, y, nx, 0, css("--amber"), last ? 2.5 : 1.2, last ? [] : [5, 4]); }
      p.dot(x, 0, last ? css("--amber") : css("--muted"), last ? 6 : 3.5); }
    F.roots.forEach(rt => p.dot(rt, 0, css("--good"), 4, true));
    /* alça do chute x₀: círculo grande com anel sobre a curva (preso ao quadro se a curva sai dele) */
    const px = p.X(xs[0]), py = clamp(p.Y(F.f(xs[0])), p.m.t + 14, p.h - p.m.b - 14), cor = css("--amber");
    g.save(); g.beginPath(); g.arc(px, py, 14, 0, 7); g.globalAlpha = 0.2; g.fillStyle = cor; g.fill(); g.globalAlpha = 1; g.lineWidth = 2; g.strokeStyle = cor; g.stroke();
    g.beginPath(); g.arc(px, py, 7.5, 0, 7); g.fillStyle = cor; g.fill(); g.lineWidth = 2; g.strokeStyle = css("--panel"); g.stroke();
    g.font = `700 12px ${css("--f-body")}`; g.fillStyle = cor; g.textAlign = "center"; g.textBaseline = "bottom"; g.fillText("x₀", px, py - 17); g.restore();
    const x = xs[xs.length - 1], d = F.d(x), err = erroDe(F, x);
    c.setAttribute("aria-label", `Gráfico de f(x) = ${F.nome}. Chute inicial x₀ = ${fmt(xs[0], 2)}; ${xs.length - 1} passos de Newton; x atual = ${fmt(x, 6)}; erro até a raiz ${err < 1e-12 ? "praticamente zero" : err.toExponential(1)}. O controle deslizante do chute inicial ajusta o mesmo valor.`);
    R.innerHTML = `<div>passos: <b>${xs.length - 1}</b> · x = <b>${fmt(x, 8)}</b></div><div>f(x) = <b>${fmt(F.f(x), 8)}</b> · erro até a raiz ≈ <b>${err < 1e-12 ? "0" : err.toExponential(1)}</b></div>` +
      (Math.abs(d) < 1e-9 ? `<div class="no"><b>Tangente horizontal:</b> ela nunca cruza o eixo. Mude o chute inicial.</div>` : `<div>próximo x: <b>${fmt(x - F.f(x) / d, 8)}</b> (onde a tangente cruza o eixo)</div>`) +
      `<div>Círculos verdes = raízes. Arraste o ponto x₀ no gráfico para trocar o chute. Observe o erro: perto da raiz ele cai de forma muito mais rápida que a cada passo anterior.${k === 3 ? " Aqui o chute decide de qual raiz você chega perto; em x = ln 3 a tangente é horizontal." : ""}</div>`;
    /* erro de cada passo e quantos dígitos já estão corretos (últimos MAX + 1 passos) */
    const ini = Math.max(0, xs.length - (MAX + 1)), linhas = xs.slice(ini).map((v, j) => {
      const e = erroDe(F, v), dig = e < 1e-15 ? "15 ou mais" : e >= 1 ? "0" : Math.floor(-Math.log10(e));
      return `<tr><td>${ini + j}</td><td>${fmt(v, 10)}</td><td>${e < 1e-15 ? "≈ 0" : e.toExponential(1).replace(".", ",")}</td><td>${dig}</td></tr>`;
    }).join("");
    tab.innerHTML = `<table class="mx" style="width:100%"><caption style="text-align:left;font:700 12px ${css("--f-body")};padding:4px 6px">Erro de cada passo</caption><thead><tr><th scope="col">passo</th><th scope="col">x</th><th scope="col">erro</th><th scope="col">dígitos corretos</th></tr></thead><tbody>${linhas}</tbody></table>`;
  }
  draw();
  kit("newton", extra, {
    state: () => { const F = FN[k], x = xs[xs.length - 1], e = F.roots.map(rt => Math.abs(x - rt)), err = Math.min(...e); return {k, err, ri: e.indexOf(err), n: xs.length - 1}; },
    goals: [
      {t: "Chegue a uma raiz com erro menor que 0,000000001.", ok: s => s.err < 1e-9, win: s => "Em " + s.n + " passos. Newton converge muito rápido."},
      {t: "Em eˣ − 3x, ache as duas raízes mudando o chute inicial.", ok: (s, memo) => { if (s.k === 3 && s.err < 1e-6) memo[s.ri] = 1; return Object.keys(memo).length === 2; }, win: () => "As duas raízes! O chute inicial decide qual você alcança."}
    ],
    react: s => s.err < 1e-9 ? ["Chegamos: o erro some em poucos passos.", "happy"] : s.n === 0 ? ["Dê um passo: a tangente aponta onde cruza o eixo.", "thinking"] : ["Cada passo aproxima bem mais que o anterior.", "neutral"]
  });
  return draw;
};
