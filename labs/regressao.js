/* Laboratório "Regressão linear e gradiente" com manipulação direta: dois pontos de controle sobre a reta,
   pontos de dado arrastáveis (a reta de mínimos quadrados acompanha) e curva do erro por passo.
   Os helpers globais (ctl, btn, plane, arrastavel, kit, mulberry...) vêm do app.js e só são usados quando a função roda. */
window.LABS_V2 = window.LABS_V2 || {};
LABS_V2.regressao = function (stage, panel, extra) {
  const rnd = mulberry(7), gz = () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(2 * Math.PI * rnd());
  const D0 = Array.from({length: 24}, (_, i) => { const x = -2 + 4 * (i + .5) / 24 + (rnd() - .5) * .1; return [x, 60 + 8 * x + 6 * gz()]; });
  let D = D0.map(d => [...d]); const n = D.length;
  /* mínimos quadrados, recalculados quando um dado é arrastado */
  const ajusta = () => {
    const mx = mean(D.map(d => d[0])), my = mean(D.map(d => d[1])), sxx = D.reduce((s, d) => s + (d[0] - mx) ** 2, 0);
    const wO = sxx > 1e-9 ? D.reduce((s, d) => s + (d[0] - mx) * (d[1] - my), 0) / sxx : 0;
    return {my, wO, bO: my - wO * mx};
  };
  let F = ajusta();
  const X0 = -2.4, X1 = 2.4, HA = -1.9, HB = 1.9, W_MIN = -5, W_MAX = 20, B_MIN = 0, B_MAX = 100;
  /* escala vertical fixa (dos dados originais), para o gráfico não pular enquanto se arrasta */
  const ys0 = D0.map(d => d[1]), Y0 = Math.min(...ys0) - 20, Y1 = Math.max(...ys0) + 20;
  const mseDe = (a, k) => D.reduce((t, [x, y]) => t + (y - (k + a * x)) ** 2, 0) / n;
  let w = 0, b = 40, steps = 0, pega = null, hist = [mseDe(w, b)];
  const c = canvas(stage), c2 = canvas(stage, 170); const R = readout(panel); const LR = [0.02, 0.3, 0.9];
  const novoInicio = () => { steps = 0; hist = [mseDe(w, b)]; };
  const ws = ctl(panel, "Inclinação w", W_MIN, W_MAX, 0.1, w, v => fmt(v, 1) + " sc/ha por 100 mm", v => { w = v; novoInicio(); draw(); });
  const bs = ctl(panel, "Intercepto b", B_MIN, B_MAX, 0.5, b, v => fmt(v, 1) + " sc/ha", v => { b = v; novoInicio(); draw(); });
  const lrs = sel(panel, "Taxa de aprendizado", ["0,02 (lenta)", "0,3 (boa)", "0,9 (grande demais)"], () => {}); lrs.value = 1;
  const r = row(panel);
  const step = () => { let gw = 0, gb = 0; for (const [x, y] of D) { const e = b + w * x - y; gw += 2 * e * x / n; gb += 2 * e / n; } w -= LR[+lrs.value] * gw; b -= LR[+lrs.value] * gb; steps++; const m = mseDe(w, b); hist.push(Number.isFinite(m) ? Math.min(m, 1e12) : 1e12); };
  const sync = () => { ws.set(clamp(w, W_MIN, W_MAX)); bs.set(clamp(b, B_MIN, B_MAX)); draw(); };
  btn(r, "1 passo", () => { step(); sync(); }); btn(r, "20 passos", () => { for (let i = 0; i < 20; i++) step(); sync(); });
  btn(r, "Solução exata", () => { w = F.wO; b = F.bO; novoInicio(); sync(); }, true); btn(r, "Zerar", () => { w = 0; b = 40; novoInicio(); sync(); }, true);
  btn(r, "Reiniciar dados", () => { D = D0.map(d => [...d]); F = ajusta(); pega = null; novoInicio(); draw(); }, true);
  /* arrastar: pega o ponto de controle ou o dado sob o dedo; fora de tudo, o controle mais próximo em x */
  let plano = null;
  const drag = arrastavel(c, (x, y, e) => {
    const p = plano; if (!p) return;
    if (e.type === "pointerdown") {
      const px = p.X(x), py = p.Y(y), d2 = (u, v) => (p.X(u) - px) ** 2 + (p.Y(v) - py) ** 2, f = u => b + w * u;
      let melhor = null, dm = 1e9;
      [HA, HB].forEach((u, i) => { const d = d2(u, f(u)); if (d < 18 ** 2 && d < dm) { melhor = {t: "h", i}; dm = d; } });
      if (!melhor) D.forEach(([u, v], i) => { const d = d2(u, v); if (d < 14 ** 2 && d < dm) { melhor = {t: "d", i}; dm = d; } });
      pega = melhor || {t: "h", i: x < (HA + HB) / 2 ? 0 : 1};
    }
    if (!Number.isFinite(w + b)) { w = 0; b = 40; }
    if (pega.t === "h") {
      /* o outro controle fica parado: a reta gira em torno dele */
      const u = pega.i ? HB : HA, v = pega.i ? HA : HB, yv = b + w * v, yu = clamp(y, Y0, Y1);
      w = clamp((yu - yv) / (u - v), W_MIN, W_MAX); b = clamp(yv - w * v, B_MIN, B_MAX);
      ws.set(w); bs.set(b);
    } else {
      D[pega.i] = [clamp(x, X0 + 0.1, X1 - 0.1), clamp(y, Y0, Y1)]; F = ajusta();
    }
    novoInicio(); draw();
  });
  function draw() {
    const p = plane(c, X0, X1, Y0, Y1, "chuva do ciclo (centenas de mm, centrada em 5)", "produtividade (sc/ha)"); plano = p; drag(p);
    const f = x => b + w * x, {my, wO, bO} = F, mudou = D.some((d, i) => d[0] !== D0[i][0] || d[1] !== D0[i][1]);
    D.forEach(([x, y]) => p.line(x, y, x, f(x), css("--amber"), 1, [3, 3]));
    p.curve(x => bO + wO * x, css("--good"), 1.5, X0, X1); p.curve(f, css("--curve"), 2.5, X0, X1);
    D.forEach(([x, y], i) => p.dot(x, y, css("--ink"), pega && pega.t === "d" && pega.i === i ? 5.5 : 3.5));
    [HA, HB].forEach(u => p.dot(u, f(u), css("--curve"), 8, true));
    const sse = D.reduce((s, [x, y]) => s + (y - f(x)) ** 2, 0), sst = D.reduce((s, [, y]) => s + (y - my) ** 2, 0), mse = sse / n, bad = !Number.isFinite(mse) || mse > 1e9;
    let gw = 0, gb = 0; D.forEach(([x, y]) => { const e = f(x) - y; gw += 2 * e * x / n; gb += 2 * e / n; });
    c.setAttribute("role", "img");
    c.setAttribute("aria-label", `Gráfico de dispersão: produtividade pela chuva do ciclo, com ${n} pontos${mudou ? " (alguns movidos)" : ""}. Reta ajustada com inclinação ${fmt(w, 1)} e intercepto ${fmt(b, 1)}; mínimos quadrados em inclinação ${fmt(wO, 1)} e intercepto ${fmt(bO, 1)}. Arraste os dois círculos da reta ou os pontos, ou use os controles deslizantes.`);
    R.innerHTML = bad ? `<div class="no"><b>O erro explodiu.</b> O passo é maior do que a curvatura da perda permite e cada atualização passa do mínimo. Aperte Zerar e use uma taxa menor.</div>` :
      `<div>ŷ = <b>${fmt(b, 2)}</b> + <b>${fmt(w, 2)}</b>·x · passos: <b>${steps}</b></div><div>erro quadrático médio: <b>${fmt(mse, 2)}</b> · R² = <b>${fmt(1 - sse / sst, 3)}</b></div>
      <div>gradiente: dw = <b>${fmt(gw, 2)}</b>, db = <b>${fmt(gb, 2)}</b> (zero no mínimo)</div><div class="ok">solução exata${mudou ? " (dos dados atuais)" : ""}: w = ${fmt(wO, 2)}, b = ${fmt(bO, 2)}</div>
      <div>Tracejado = resíduos; verde = mínimos quadrados. Arraste os dois círculos da reta para girá-la e movê-la; arraste um ponto de dado para ver a reta verde se mover.</div>`;
    erro(mseDe(wO, bO));
  }
  /* curva do erro (MSE) por passo de gradiente; valores fora da escala saem do quadro */
  function erro(otimo) {
    const topo = Math.max(hist[0], otimo * 1.5) * 1.08, nx = Math.max(10, hist.length - 1);
    const q = plane(c2, 0, nx, 0, topo, "passo de gradiente", "erro quadrático médio (MSE)"), g = q.g;
    q.line(0, otimo, nx, otimo, css("--good"), 1.5, [5, 4]);
    q.clip(); g.strokeStyle = css("--curve"); g.lineWidth = 2.5; g.setLineDash([]); g.beginPath();
    hist.forEach((v, i) => { const px = q.X(i), py = q.Y(v); if (i) g.lineTo(px, py); else g.moveTo(px, py); }); g.stroke(); g.restore();
    q.dot(hist.length - 1, Math.min(hist[hist.length - 1], topo), css("--curve"), 5);
    c2.setAttribute("role", "img");
    c2.setAttribute("aria-label", `Erro quadrático médio por passo de gradiente: ${fmt(hist[0], 1)} no início e ${fmt(hist[hist.length - 1], 1)} agora, em ${steps} passos. O mínimo possível é ${fmt(otimo, 1)}.`);
  }
  draw();
  kit("regressao", extra, {
    state: () => { const mse = mseDe(w, b); return {mse, opt: mseDe(F.wO, F.bO), bad: !Number.isFinite(mse) || mse > 1e9, lr: +lrs.value}; },
    goals: [
      {t: "Leve o erro quadrático médio a menos de 10% acima do ótimo.", ok: s => !s.bad && s.mse < s.opt * 1.1, win: () => "Quase o ótimo: a reta está bem ajustada."},
      {t: "Use a taxa 0,9 e deixe o erro explodir. Depois reinicie com a taxa boa.", ok: s => s.bad && s.lr === 2, win: () => "O passo grande demais passou do vale. A taxa boa é 0,3."}
    ],
    react: s => s.bad ? ["O erro explodiu: taxa grande demais.", "worried"] : s.mse < s.opt * 1.1 ? ["Reta bem ajustada!", "happy"] : ["Mexa em w e b, ou use o gradiente.", "thinking"]
  });
  return draw;
};
