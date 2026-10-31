const $ = (s, r = document) => r.querySelector(s);
const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const fmt = (x, d = 2) => Number.isFinite(x) ? x.toLocaleString("pt-BR", {maximumFractionDigits: d}) : "—";
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
let N = 0, onLeave = null;

/* ---------- ferramentas de interface ---------- */
function ctl(panel, label, min, max, step, val, show, on) {
  const d = document.createElement("label"); d.className = "ctl";
  d.innerHTML = `<span class="cl">${label}</span><input id="c${N++}" type="range" min="${min}" max="${max}" step="${step}" value="${val}"><output></output>`;
  const i = d.querySelector("input"), o = d.querySelector("output");
  const upd = () => { o.textContent = show(+i.value); };
  i.addEventListener("input", () => { upd(); on(+i.value); });
  upd(); panel.appendChild(d);
  return {get: () => +i.value, set: v => { i.value = v; upd(); }};
}
function sel(panel, label, opts, on) {
  const d = document.createElement("label"); d.className = "ctl";
  d.innerHTML = `<span class="cl">${label}</span><select id="c${N++}">${opts.map((o, i) => `<option value="${i}">${o}</option>`).join("")}</select>`;
  const s = d.querySelector("select");
  s.addEventListener("change", () => on(+s.value));
  panel.appendChild(d); return s;
}
function readout(panel) { const d = document.createElement("div"); d.className = "read"; d.setAttribute("aria-live", "polite"); panel.appendChild(d); return d; }
function btn(host, text, on, alt) { const b = document.createElement("button"); b.className = "btn" + (alt ? " alt" : ""); b.textContent = text; b.onclick = on; host.appendChild(b); return b; }
function row(panel) { const d = document.createElement("div"); d.className = "row"; panel.appendChild(d); return d; }
function canvas(stage, h = 340) { const c = document.createElement("canvas"); c.style.height = h + "px"; stage.appendChild(c); return c; }

/* ---------- desenho de gráficos ---------- */
function niceStep(r) { const p = Math.pow(10, Math.floor(Math.log10(r))), f = r / p; return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * p; }
function setup(c) {
  const dpr = window.devicePixelRatio || 1, w = c.clientWidth, h = c.clientHeight;
  if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
  const g = c.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, w, h);
  return {g, w, h};
}
function plane(c, x0, x1, y0, y1, xl, yl) {
  const {g, w, h} = setup(c), m = {l: 52, r: 14, t: 16, b: 36};
  const X = x => m.l + (x - x0) / (x1 - x0) * (w - m.l - m.r), Y = y => h - m.b - (y - y0) / (y1 - y0) * (h - m.t - m.b);
  g.font = `11px ${css("--f-mono")}`; g.lineWidth = 1;
  const sx = niceStep((x1 - x0) / 6), sy = niceStep((y1 - y0) / 5);
  g.textAlign = "center"; g.textBaseline = "top";
  for (let x = Math.ceil(x0 / sx) * sx; x <= x1 + 1e-9; x += sx) {
    g.strokeStyle = css("--grid"); g.beginPath(); g.moveTo(X(x), m.t); g.lineTo(X(x), h - m.b); g.stroke();
    g.fillStyle = css("--muted"); g.fillText(fmt(+x.toFixed(10), 4), X(x), h - m.b + 5);
  }
  g.textAlign = "right"; g.textBaseline = "middle";
  for (let y = Math.ceil(y0 / sy) * sy; y <= y1 + 1e-9; y += sy) {
    g.strokeStyle = css("--grid"); g.beginPath(); g.moveTo(m.l, Y(y)); g.lineTo(w - m.r, Y(y)); g.stroke();
    g.fillStyle = css("--muted"); g.fillText(fmt(+y.toFixed(10), 4), m.l - 6, Y(y));
  }
  g.strokeStyle = css("--axis"); g.lineWidth = 1.5;
  if (y0 < 0 && y1 > 0) { g.beginPath(); g.moveTo(m.l, Y(0)); g.lineTo(w - m.r, Y(0)); g.stroke(); }
  if (x0 < 0 && x1 > 0) { g.beginPath(); g.moveTo(X(0), m.t); g.lineTo(X(0), h - m.b); g.stroke(); }
  g.fillStyle = css("--muted"); g.textAlign = "center"; g.textBaseline = "bottom"; g.fillText(xl || "", (m.l + w - m.r) / 2, h - 2);
  g.textAlign = "left"; g.textBaseline = "top"; g.fillText(yl || "", m.l + 6, m.t + 2);
  const clip = () => { g.save(); g.beginPath(); g.rect(m.l, m.t, w - m.l - m.r, h - m.t - m.b); g.clip(); };
  const curve = (fn, color, lw = 2.5, a = x0, b = x1) => {
    clip(); g.strokeStyle = color; g.lineWidth = lw; g.setLineDash([]); g.beginPath();
    let pen = false, prev = 0; const n = 500;
    for (let i = 0; i <= n; i++) {
      const x = a + (b - a) * i / n, y = fn(x);
      if (!Number.isFinite(y)) { pen = false; continue; }
      const px = X(x), py = Y(y);
      if (pen && Math.abs(py - prev) > h * 1.2) pen = false;
      if (pen) g.lineTo(px, py); else g.moveTo(px, py);
      pen = true; prev = py;
    }
    g.stroke(); g.restore();
  };
  const line = (xa, ya, xb, yb, color, lw = 1.5, dash = []) => {
    clip(); g.strokeStyle = color; g.lineWidth = lw; g.setLineDash(dash); g.beginPath(); g.moveTo(X(xa), Y(ya)); g.lineTo(X(xb), Y(yb)); g.stroke(); g.restore();
  };
  const dot = (x, y, color, r = 5, hollow = false) => {
    g.beginPath(); g.arc(X(x), Y(y), r, 0, 7); g.lineWidth = 2; g.strokeStyle = color; g.fillStyle = hollow ? css("--panel") : color;
    g.fill(); g.stroke();
  };
  return {g, w, h, m, X, Y, curve, line, dot, clip, x0, x1, y0, y1};
}
const range = (f, a, b) => { let lo = Infinity, hi = -Infinity; for (let i = 0; i <= 200; i++) { const y = f(a + (b - a) * i / 200); if (Number.isFinite(y)) { lo = Math.min(lo, y); hi = Math.max(hi, y); } } return [lo, hi]; };

/* ---------- estatística: p-valor do teste t ---------- */
function lgamma(z) { const c = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5]; let y = z, t = z + 5.5; t -= (z + .5) * Math.log(t); let s = 1.000000000190015; for (const ci of c) { y += 1; s += ci / y; } return -t + Math.log(2.5066282746310005 * s / z); }
function betacf(a, b, x) {
  const T = 1e-300; let qab = a + b, qap = a + 1, qam = a - 1, c = 1, d = 1 - qab * x / qap; if (Math.abs(d) < T) d = T; d = 1 / d; let h = d;
  for (let m = 1; m <= 200; m++) {
    const m2 = 2 * m; let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < T) d = T; c = 1 + aa / c; if (Math.abs(c) < T) c = T; d = 1 / d; h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d; if (Math.abs(d) < T) d = T; c = 1 + aa / c; if (Math.abs(c) < T) c = T; d = 1 / d; const del = d * c; h *= del; if (Math.abs(del - 1) < 3e-12) break;
  } return h;
}
function ibeta(x, a, b) {
  if (x <= 0) return 0; if (x >= 1) return 1;
  const bt = Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  return x < (a + 1) / (a + b + 2) ? bt * betacf(a, b, x) / a : 1 - bt * betacf(b, a, 1 - x) / b;
}
const pTwo = (t, df) => ibeta(df / (df + t * t), df / 2, 0.5);
const mean = a => a.reduce((s, v) => s + v, 0) / a.length;
const sd = a => { const m = mean(a); return Math.sqrt(a.reduce((s, v) => s + (v - m) ** 2, 0) / (a.length - 1)); };
function welch(a, b) {
  const va = sd(a) ** 2 / a.length, vb = sd(b) ** 2 / b.length, se = Math.sqrt(va + vb);
  if (se === 0) return {t: 0, df: a.length + b.length - 2, p: 1};
  const t = (mean(b) - mean(a)) / se, df = (va + vb) ** 2 / (va ** 2 / (a.length - 1) + vb ** 2 / (b.length - 1));
  return {t, df, p: pTwo(t, df)};
}
const gauss = () => Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());

/* ---------- álgebra linear ---------- */
function inv(A) {
  const n = A.length, M = A.map((r, i) => [...r, ...Array.from({length: n}, (_, j) => +(i === j))]);
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (Math.abs(M[p][c]) < 1e-9) return null;
    [M[c], M[p]] = [M[p], M[c]]; const d = M[c][c]; for (let j = 0; j < 2 * n; j++) M[c][j] /= d;
    for (let r = 0; r < n; r++) if (r !== c) { const f = M[r][c]; for (let j = 0; j < 2 * n; j++) M[r][j] -= f * M[c][j]; }
  }
  return M.map(r => r.slice(n));
}
const det3 = A => A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);

/* ---------- módulos ---------- */
const MODS = [];

MODS.push({id: "funcao", grupo: "Cálculo", nome: "Funções",
  lead: "Uma função é uma regra que transforma uma entrada em uma saída. Todo o resto do cálculo conversa com ela.",
  campo: "Toda recomendação técnica é uma função: dose de adubo vira produtividade, lâmina de água vira produção, temperatura vira ritmo de desenvolvimento. Sem a função você só tem uma tabela de pontos soltos.",
  dia: "Frete por quilômetro, conta de energia e parcela de financiamento são funções. Conhecer o domínio evita extrapolar: uma dose de 1.000 kg/ha não rende 1.000 sacas.",
  python: `def produtividade(x):          # x em kg de N por hectare
    return 80 + 0.30*x - 0.0009*x**2

for dose in (0, 100, 200, 300):
    print(dose, produtividade(dose))`,
  build(stage, panel) {
    const FN = [
      {nome: "Frete: custo por distância (linear)", f: x => 120 + 3.5 * x, a: 0, b: 200, xu: "km", yu: "R$", eq: "C(x) = 120 + 3,5·x", xl: "distância (km)", yl: "custo (R$)"},
      {nome: "Adubação: produtividade (quadrática)", f: x => 80 + 0.30 * x - 0.0009 * x * x, a: 0, b: 300, xu: "kg N/ha", yu: "sc/ha", eq: "y(x) = 80 + 0,30·x − 0,0009·x²", xl: "dose de N (kg/ha)", yl: "produtividade (sc/ha)"},
      {nome: "Praga: população (exponencial)", f: t => 50 * Math.exp(0.22 * t), a: 0, b: 14, xu: "dias", yu: "indivíduos", eq: "N(t) = 50·e^(0,22·t)", xl: "tempo (dias)", yl: "população"}
    ];
    let k = 1; const c = canvas(stage); const R = readout(panel);
    const xs = ctl(panel, "Entrada x", 0, 1, 0.005, 0.5, v => fmt(FN[k].a + v * (FN[k].b - FN[k].a), 1) + " " + FN[k].xu, draw);
    const s = sel(panel, "Situação", FN.map(f => f.nome), v => { k = v; draw(); }); panel.insertBefore(s.parentElement, panel.firstChild); s.value = 1;
    function draw() {
      const F = FN[k], x = F.a + xs.get() * (F.b - F.a), y = F.f(x), [lo, hi] = range(F.f, F.a, F.b);
      const p = plane(c, F.a, F.b, Math.min(0, lo), hi * 1.1, F.xl, F.yl);
      p.curve(F.f, css("--curve"));
      p.line(x, 0, x, y, css("--amber"), 1.5, [5, 4]); p.line(F.a, y, x, y, css("--amber"), 1.5, [5, 4]); p.dot(x, y, css("--amber"));
      R.innerHTML = `<div>${F.eq}</div><div>entrada <b>${fmt(x, 1)} ${F.xu}</b> → f → saída <b>${fmt(y, 1)} ${F.yu}</b></div>
        <div>Domínio mostrado: de ${F.a} a ${F.b} ${F.xu}.</div>
        <div>Se a entrada subir 1 ${F.xu}, a saída muda cerca de <b>${fmt(F.f(x + 1) - y, 3)} ${F.yu}</b>. Medir essa mudança é o trabalho da derivada.</div>`;
    }
    draw(); return draw;
  }});

MODS.push({id: "limite", grupo: "Cálculo", nome: "Limites",
  lead: "O limite responde para onde a função está indo quando você chega perto de um ponto, mesmo que ela nem exista nele.",
  campo: "O que acontece com a produtividade quando a dose cresce sem parar? Ela satura em um platô. Concentração de nutriente na solução, temperatura de equilíbrio e tamanho de amostra grande também são perguntas de limite.",
  dia: "É a forma rigorosa de lidar com o 0/0 e com o “tende a”. Derivada e integral são definidas como limites. Também mostra quando um modelo quebra, como em degraus de tarifa ou divisão por zero.",
  python: `import numpy as np

f = lambda x: (x**2 - 1)/(x - 1)     # indefinida em x = 1
for p in range(1, 7):
    h = 10**-p
    print(h, f(1 - h), f(1 + h))     # os dois lados chegam em 2`,
  build(stage, panel) {
    const CS = [
      {nome: "(x² − 1)/(x − 1) perto de x = 1", f: x => (x * x - 1) / (x - 1), a: 1, y0: 0, y1: 4, hole: 2},
      {nome: "sen(x)/x perto de x = 0", f: x => Math.sin(x) / x, a: 0, y0: -0.4, y1: 1.3, hole: 1},
      {nome: "1/x perto de x = 0", f: x => 1 / x, a: 0, y0: -10, y1: 10},
      {nome: "Tarifa em degrau perto de x = 2", f: x => x < 2 ? 1 : 3, a: 2, y0: 0, y1: 4}
    ];
    let k = 0; const c = canvas(stage); const R = readout(panel);
    const hs = ctl(panel, "Distância h até o ponto", 0, 4, 0.05, 0.5, v => "h = " + fmt(Math.pow(10, -v), 4), draw);
    const s = sel(panel, "Função", CS.map(f => f.nome), v => { k = v; draw(); }); panel.insertBefore(s.parentElement, panel.firstChild);
    function draw() {
      const C = CS[k], h = Math.pow(10, -hs.get()), a = C.a, L = C.f(a - h), Rr = C.f(a + h);
      const p = plane(c, a - 2, a + 2, C.y0, C.y1, "x", "f(x)");
      p.curve(C.f, css("--curve"));
      p.line(a - h, 0, a - h, L, css("--amber"), 1, [4, 4]); p.line(a + h, 0, a + h, Rr, css("--good"), 1, [4, 4]);
      p.dot(a - h, L, css("--amber")); p.dot(a + h, Rr, css("--good"));
      if (C.hole) p.dot(a, C.hole, css("--curve"), 5, true);
      const fa = C.f(a), fin = Number.isFinite(fa);
      const agree = h <= 0.01 && Math.abs(L - Rr) < 0.01 * Math.max(1, Math.abs(L));
      const verdict = agree ? `<span class="ok">Os dois lados chegam em ≈ ${fmt(L, 3)}. O limite existe.</span>`
        : h <= 0.01 ? `<span class="no">Os lados vão para lugares diferentes. O limite não existe.</span>` : `<span class="am">Reduza h para ver para onde cada lado vai.</span>`;
      R.innerHTML = `<div>pela esquerda: f(${fmt(a - h, 4)}) = <b>${fmt(L, 4)}</b></div><div>pela direita: f(${fmt(a + h, 4)}) = <b>${fmt(Rr, 4)}</b></div>
        <div>no ponto: f(${a}) ${fin ? "= <b>" + fmt(fa, 3) + "</b>" : "é <b>indefinida</b>"}</div><div>${verdict}</div>`;
    }
    draw(); return draw;
  }});

MODS.push({id: "derivada", grupo: "Cálculo", nome: "Derivadas e tangentes",
  lead: "A derivada é a inclinação da reta que encosta na curva num ponto. Ela mede quão rápido a saída muda quando a entrada muda.",
  campo: "Quanto cada kg extra de nitrogênio rende (produto marginal). Quão rápido a planta cresce hoje. Vazão é a derivada do volume no tempo. Taxa de infiltração é a derivada da lâmina infiltrada.",
  dia: "O velocímetro é a derivada da posição. Em inteligência artificial, treinar um modelo é descer uma ladeira guiado por derivadas. A reta tangente é a melhor aproximação linear perto do ponto.",
  python: `import sympy as sp

x = sp.symbols('x')
y = 80 + 0.30*x - 0.0009*x**2
dy = sp.diff(y, x)                  # 0.3 - 0.0018*x
print(dy.subs(x, 100))              # 0.12 sc/ha por kg de N`,
  build(stage, panel) {
    const DF = [
      {nome: "Produtividade × adubo", f: x => 80 + 0.30 * x - 0.0009 * x * x, df: x => 0.30 - 0.0018 * x, a: 0, b: 300, xu: "kg N/ha", yu: "sc/ha", x0: 100},
      {nome: "Altura da planta × dias", f: t => 200 / (1 + Math.exp(-0.25 * (t - 20))), df: t => { const e = Math.exp(-0.25 * (t - 20)); return 50 * e / ((1 + e) ** 2); }, a: 0, b: 40, xu: "dia", yu: "cm", x0: 20},
      {nome: "sen(x) (o clássico)", f: Math.sin, df: Math.cos, a: -6.28, b: 6.28, xu: "", yu: "", x0: 0}
    ];
    let k = 0; const c = canvas(stage); const R = readout(panel);
    const c2 = canvas(stage, 170);
    const xs = ctl(panel, "Ponto x₀", 0, 1, 0.0025, 0.33, v => fmt(DF[k].a + v * (DF[k].b - DF[k].a), 2), draw);
    const hs = ctl(panel, "Distância h da secante", 0, 4, 0.05, 0.7, v => "h = " + fmt((DF[k].b - DF[k].a) * Math.pow(10, -v), 4), draw);
    const s = sel(panel, "Situação", DF.map(f => f.nome), v => { k = v; xs.set((DF[k].x0 - DF[k].a) / (DF[k].b - DF[k].a)); draw(); }); panel.insertBefore(s.parentElement, panel.firstChild);
    function draw() {
      const F = DF[k], w = F.b - F.a, x0 = F.a + xs.get() * w, h = w * Math.pow(10, -hs.get());
      const y0 = F.f(x0), y1 = F.f(x0 + h), ms = (y1 - y0) / h, mt = F.df(x0), [lo, hi] = range(F.f, F.a, F.b), pad = (hi - lo) * 0.1;
      const p = plane(c, F.a, F.b, lo - pad, hi + pad, F.xu || "x", F.yu || "f(x)");
      p.curve(F.f, css("--curve"));
      p.line(F.a, y0 + ms * (F.a - x0), F.b, y0 + ms * (F.b - x0), css("--amber"), 1.5, [6, 4]);
      p.line(F.a, y0 + mt * (F.a - x0), F.b, y0 + mt * (F.b - x0), css("--good"), 2);
      p.dot(x0, y0, css("--good")); p.dot(x0 + h, y1, css("--amber"), 4);
      const un = F.yu ? ` ${F.yu} por ${F.xu}` : "";
      const meaning = F.yu ? `<div>Leitura: em x₀ = ${fmt(x0, 1)} ${F.xu}, mais 1 ${F.xu} muda a saída em ≈ <b>${fmt(mt, 3)} ${F.yu}</b>${mt < 0 ? " (para menos)" : ""}.</div>` : "";
      R.innerHTML = `<div class="am">secante (tracejada): <b>${fmt(ms, 4)}</b>${un}</div><div class="ok">tangente (sólida): <b>${fmt(mt, 4)}</b>${un}</div>
        <div>diferença: <b>${fmt(Math.abs(ms - mt), 5)}</b>. Diminua h e a secante gira até virar a tangente.</div>${meaning}<div>Gráfico de baixo: a função derivada f′. O ponto verde é a inclinação da tangente de cima.</div>`;
      const [dl, dh] = range(F.df, F.a, F.b), dp = (dh - dl) * 0.15 || 1, q = plane(c2, F.a, F.b, dl - dp, dh + dp, F.xu || "x", "f′(x): taxa de variação");
      q.curve(F.df, css("--amber")); q.line(F.a, 0, F.b, 0, css("--axis"), 1, [4, 4]); q.line(x0, 0, x0, mt, css("--good"), 1.5, [4, 4]); q.dot(x0, mt, css("--good"));
    }
    draw(); return draw;
  }});

MODS.push({id: "maxmin", grupo: "Cálculo", nome: "Máximos e mínimos",
  lead: "Onde a derivada vale zero, a curva para de subir ou de descer. É assim que se acha o melhor valor de uma decisão.",
  campo: "A dose de adubo que dá mais lucro não é a que dá mais produção: depois de certo ponto, o último quilo custa mais do que rende. O mesmo vale para ração, lâmina de irrigação e dimensionamento de canais.",
  dia: "Qualquer decisão do tipo “até onde vale a pena” é um problema de otimização. O botão abaixo faz o que algoritmos de aprendizado de máquina fazem: seguir a derivada, passo a passo.",
  python: `B, C2 = 0.30, 0.0009
p, c = 60, 6                         # preço da saca e custo do kg de N
dL = lambda x: p*(B - 2*C2*x) - c    # derivada do lucro

x = 40.0
for passo in range(10):
    x += 0.5 * dL(x) / (2*p*C2)      # sobe a ladeira
print(x, (B - c/p)/(2*C2))           # numérico x analítico`,
  build(stage, panel) {
    const A0 = 80, B = 0.30, C2 = 0.0009; const y = x => A0 + B * x - C2 * x * x;
    const c = canvas(stage); const R = readout(panel); let x = 40;
    const ps = ctl(panel, "Preço do milho", 30, 120, 1, 60, v => "R$ " + v + " / saca", draw);
    const cs = ctl(panel, "Custo do nitrogênio", 2, 14, 0.5, 6, v => "R$ " + fmt(v, 1) + " / kg", draw);
    const xs = ctl(panel, "Dose testada", 0, 300, 1, x, v => v + " kg N/ha", v => { x = v; draw(); });
    const r = row(panel);
    btn(r, "Dar um passo na subida", () => { const p = ps.get(), q = cs.get(); x = clamp(x + 0.5 * (p * (B - 2 * C2 * x) - q) / (2 * p * C2), 0, 300); xs.set(x); draw(); });
    btn(r, "Reiniciar", () => { x = 40; xs.set(x); draw(); }, true);
    function draw() {
      const p = ps.get(), q = cs.get(), L = z => p * y(z) - q * z, dL = z => p * (B - 2 * C2 * z) - q;
      const xo = clamp((B - q / p) / (2 * C2), 0, 300), xm = B / (2 * C2), [lo, hi] = range(L, 0, 300), pad = (hi - lo) * 0.12;
      const g = plane(c, 0, 300, lo - pad, hi + pad, "dose de N (kg/ha)", "lucro após adubo (R$/ha)");
      g.curve(L, css("--curve"));
      g.line(xm, lo - pad, xm, hi + pad, css("--amber"), 1.5, [6, 4]); g.line(xo, lo - pad, xo, hi + pad, css("--good"), 1.5, [6, 4]);
      const m = dL(x); g.line(x - 50, L(x) - 50 * m, x + 50, L(x) + 50 * m, css("--amber"), 2);
      g.dot(x, L(x), css("--amber")); g.dot(xo, L(xo), css("--good"), 6);
      R.innerHTML = `<div>inclinação do lucro na dose testada: <b>${fmt(m, 2)}</b> R$/ha por kg</div>
        <div class="ok">dose de lucro máximo: <b>${fmt(xo, 0)} kg/ha</b> (derivada = 0), lucro <b>R$ ${fmt(L(xo), 0)}</b></div>
        <div class="am">dose de produção máxima: <b>${fmt(xm, 0)} kg/ha</b>, ${fmt(y(xm), 1)} sc/ha</div>
        <div>Parar na dose de lucro economiza <b>${fmt(xm - xo, 0)} kg de N/ha</b> e perde só <b>${fmt(y(xm) - y(xo), 1)} sc/ha</b>.</div>
        <div>Modelo ilustrativo: y = 80 + 0,30x − 0,0009x².</div>`;
    }
    draw(); return draw;
  }});

MODS.push({id: "integral", grupo: "Cálculo", nome: "Integrais",
  lead: "A integral soma uma quantidade que varia. Geometricamente é a área sob a curva, calculada com retângulos cada vez mais finos.",
  campo: "Chuva acumulada a partir da intensidade, volume irrigado a partir da vazão, carga de sedimentos, graus-dia acumulados ao longo da safra. O equipamento mede a taxa e a integral entrega o total.",
  dia: "Distância percorrida a partir da velocidade, energia em kWh a partir da potência, lucro acumulado a partir do fluxo de caixa. Taxa em um eixo, total na área.",
  python: `import numpy as np

t = np.linspace(0, 6, 1000)
i = 12*np.exp(-t/2)                 # intensidade da chuva (mm/h)
print(np.trapz(i, t))               # chuva total em mm  → ≈ 22.8`,
  build(stage, panel) {
    const PR = [
      {nome: "Chuva: intensidade (mm/h) em 6 h", f: t => 12 * Math.exp(-t / 2), F: t => -24 * Math.exp(-t / 2), a: 0, b: 6, xl: "tempo (h)", yl: "mm/h", u: "mm"},
      {nome: "Irrigação: vazão pulsante (L/min) em 10 min", f: t => 30 + 10 * Math.sin(t), F: t => 30 * t - 10 * Math.cos(t), a: 0, b: 10, xl: "tempo (min)", yl: "L/min", u: "L"}
    ];
    let k = 0, mt = 0; const c = canvas(stage); const R = readout(panel);
    const s = sel(panel, "Situação", PR.map(f => f.nome), v => { k = v; draw(); }); panel.insertBefore(s.parentElement, panel.firstChild);
    const ns = ctl(panel, "Número de retângulos", 1, 80, 1, 6, v => v, draw);
    const ms = sel(panel, "Altura de cada retângulo", ["Esquerda", "Ponto médio", "Direita", "Trapézios"], v => { mt = v; draw(); });
    function draw() {
      const P = PR[k], n = ns.get(), dx = (P.b - P.a) / n, [, hi] = range(P.f, P.a, P.b);
      const p = plane(c, P.a, P.b, 0, hi * 1.15, P.xl, P.yl), g = p.g; let S = 0;
      g.globalAlpha = 0.28; g.fillStyle = css("--curve"); g.strokeStyle = css("--curve"); g.lineWidth = 1;
      for (let i = 0; i < n; i++) {
        const xa = P.a + i * dx, xb = xa + dx; let area;
        g.beginPath();
        if (mt === 3) { area = (P.f(xa) + P.f(xb)) / 2 * dx; g.moveTo(p.X(xa), p.Y(0)); g.lineTo(p.X(xa), p.Y(P.f(xa))); g.lineTo(p.X(xb), p.Y(P.f(xb))); g.lineTo(p.X(xb), p.Y(0)); }
        else { const hh = P.f(mt === 0 ? xa : mt === 1 ? (xa + xb) / 2 : xb); area = hh * dx; g.rect(p.X(xa), p.Y(hh), p.X(xb) - p.X(xa), p.Y(0) - p.Y(hh)); }
        g.closePath(); g.fill(); g.globalAlpha = 0.6; g.stroke(); g.globalAlpha = 0.28; S += area;
      }
      g.globalAlpha = 1; p.curve(P.f, css("--curve"));
      const E = P.F(P.b) - P.F(P.a);
      R.innerHTML = `<div>soma dos ${n} retângulos: <b>${fmt(S, 3)} ${P.u}</b></div><div class="ok">integral exata: <b>${fmt(E, 3)} ${P.u}</b></div>
        <div>erro: <b>${fmt(Math.abs(S - E) / E * 100, 3)}%</b>. Mais retângulos, menos erro; o limite dessa soma é a integral.</div>`;
    }
    draw(); return draw;
  }});

MODS.push({id: "multiplas", grupo: "Cálculo", nome: "Integrais duplas e triplas",
  lead: "Somar sobre uma região em vez de uma linha: a dupla acha volumes sob uma superfície, a tripla acha massas quando a densidade varia no espaço.",
  campo: "Um pluviômetro mede a chuva em um ponto, mas a lavoura recebe chuva desigual. O volume sobre o talhão é uma integral dupla. A massa de solo em uma camada, com densidade que muda com a profundidade, é uma integral tripla.",
  dia: "Volume de terra em terraplenagem, probabilidade conjunta de duas variáveis, massa de um objeto com densidade irregular. É a mesma ideia dos retângulos, agora em células e cubinhos.",
  python: `import numpy as np

n = 200; L = 100
x = (np.arange(n) + .5) * L/n
X, Y = np.meshgrid(x, x)
r = 5 + 20*np.exp(-((X-30)**2 + (Y-65)**2)/(2*22**2))   # mm
V = (r/1000).sum() * (L/n)**2                           # m³
print(V)                                                # ≈ 110 m³`,
  build(stage, panel) {
    const rf = (x, y) => 5 + 20 * Math.exp(-((x - 30) ** 2 + (y - 65) ** 2) / (2 * 22 * 22));
    const vol = n => { let s = 0; const d = 100 / n; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) s += rf((i + .5) * d, (j + .5) * d); return s / 1000 * d * d; };
    const ref = vol(300), c = canvas(stage, 360); const R = readout(panel);
    const ns = ctl(panel, "Células por lado (n × n)", 1, 40, 1, 4, v => v + " × " + v + " = " + v * v, draw);
    const T = readout(panel); const zs = ctl(panel, "Profundidade da camada", 5, 50, 1, 20, v => v + " cm", draw);
    function draw() {
      const {g, w, h} = setup(c), n = ns.get(), S = Math.min(w, h) - 24, ox = (w - S) / 2, oy = (h - S) / 2, d = S / n;
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        const r = rf((i + .5) * 100 / n, (j + .5) * 100 / n);
        g.globalAlpha = 0.08 + 0.85 * (r - 5) / 20; g.fillStyle = css("--curve"); g.fillRect(ox + i * d, oy + S - (j + 1) * d, d + .5, d + .5);
      }
      g.globalAlpha = 1; g.strokeStyle = css("--axis"); g.lineWidth = 1; if (n <= 40) { for (let i = 0; i <= n; i++) { g.beginPath(); g.moveTo(ox + i * d, oy); g.lineTo(ox + i * d, oy + S); g.moveTo(ox, oy + i * d); g.lineTo(ox + S, oy + i * d); g.globalAlpha = .35; g.stroke(); } }
      g.globalAlpha = 1; g.strokeRect(ox, oy, S, S);
      g.fillStyle = css("--amber"); g.beginPath(); g.arc(ox + S / 2, oy + S / 2, 6, 0, 7); g.fill();
      g.fillStyle = css("--muted"); g.font = `11px ${css("--f-mono")}`; g.textAlign = "left"; g.fillText("talhão 100 m × 100 m · ponto = pluviômetro", ox, oy - 5 > 8 ? oy - 5 : 10);
      const V = vol(n), one = rf(50, 50) / 1000 * 10000;
      R.innerHTML = `<div class="am">só o pluviômetro (centro, ${fmt(rf(50, 50), 1)} mm): <b>${fmt(one, 0)} m³</b></div>
        <div>soma em ${n}×${n} células: <b>${fmt(V, 1)} m³</b></div><div class="ok">integral dupla (referência): <b>${fmt(ref, 1)} m³</b></div>
        <div>Um ponto erra em <b>${fmt(Math.abs(one - ref) / ref * 100, 0)}%</b>; a soma em células erra <b>${fmt(Math.abs(V - ref) / ref * 100, 1)}%</b>.</div>`;
      const Z = zs.get() / 100; let m = 0; for (let z = 0; z < Z - 1e-9; z += 0.01) m += (1.15 + 0.5 * (z + 0.005)) * 0.01;
      T.innerHTML = `<div class="cl">Integral tripla: massa de solo em 1 ha</div><div>∭ ρ dV com ρ(z) = 1,15 + 0,5·z (Mg/m³)</div>
        <div>camada de 0 a ${fmt(Z * 100, 0)} cm: <b>${fmt(10000 * m, 0)} Mg/ha</b></div><div>densidade média: ${fmt(m / Z, 3)} Mg/m³</div>`;
    }
    draw(); return draw;
  }});

MODS.push({id: "matrizes", grupo: "Álgebra linear", nome: "Matrizes e sistemas",
  lead: "Um sistema de equações vira A·x = b. Se a matriz A tem inversa, a solução é x = A⁻¹·b.",
  campo: "Formular adubo ou ração é um sistema linear: quanto de cada produto comercial entrega os nutrientes-alvo? Cada coluna é um produto, cada linha é um nutriente, e a inversa devolve as quantidades.",
  dia: "Orçamentos, redes elétricas, gráficos 3D e redes neurais usam matrizes. Uma matriz sem inversa (singular) indica informação redundante: dois ingredientes que fazem o mesmo papel.",
  python: `import numpy as np

A = np.array([[.45, .11, 0],         # N  de cada produto
              [0,   .52, 0],         # P2O5
              [0,   0,   .60]])      # K2O
b = np.array([100, 80, 60])          # kg de nutriente por ha
print(np.linalg.solve(A, b))         # kg de ureia, MAP, KCl`,
  build(stage, panel) {
    const A0 = [[45, 11, 0], [0, 52, 0], [0, 0, 60]], b0 = [100, 80, 60], prod = ["Ureia", "MAP", "KCl"], nut = ["N", "P₂O₅", "K₂O"];
    stage.innerHTML = `<div class="mxwrap"><h4>A: teor de nutriente (%) em cada produto</h4><table class="mx" id="mxA"></table><h4>b: meta (kg de nutriente por ha)</h4><table class="mx" id="mxB"></table></div>`;
    const tA = $("#mxA", stage), tB = $("#mxB", stage); let n = 0;
    tA.innerHTML = `<tr><th></th>${prod.map(p => `<th>${p}</th>`).join("")}</tr>` + A0.map((r, i) => `<tr><th>${nut[i]}</th>${r.map((v, j) => `<td><input id="a${n++}" type="number" step="1" value="${v}" data-i="${i}" data-j="${j}"></td>`).join("")}</tr>`).join("");
    tB.innerHTML = `<tr>${b0.map((v, i) => `<td><input id="b${i}" type="number" step="5" value="${v}" data-b="${i}"></td>`).join("")}</tr>`;
    const R = readout(panel), r = row(panel);
    btn(r, "Valores iniciais", () => { stage.querySelectorAll("[data-i]").forEach(e => e.value = A0[e.dataset.i][e.dataset.j]); stage.querySelectorAll("[data-b]").forEach(e => e.value = b0[e.dataset.b]); draw(); }, true);
    btn(r, "Tornar singular", () => { stage.querySelectorAll("[data-i]").forEach(e => { if (e.dataset.j === "1") e.value = stage.querySelector(`[data-i="${e.dataset.i}"][data-j="0"]`).value; }); draw(); }, true);
    stage.addEventListener("input", draw);
    function draw() {
      const A = [0, 1, 2].map(i => [0, 1, 2].map(j => (+stage.querySelector(`[data-i="${i}"][data-j="${j}"]`).value || 0) / 100));
      const b = [0, 1, 2].map(i => +stage.querySelector(`[data-b="${i}"]`).value || 0), d = det3(A), I = inv(A);
      if (!I) { R.innerHTML = `<div class="no"><b>det(A) = ${fmt(d, 4)}</b>. A matriz é singular: não existe inversa.</div><div>Dois produtos entregam os nutrientes na mesma proporção, então a receita não tem solução única. Troque um dos ingredientes.</div>`; return; }
      const x = I.map(r => r.reduce((s, v, j) => s + v * b[j], 0)), tot = x.reduce((s, v) => s + v, 0), mx = Math.max(...x.map(Math.abs), 1);
      R.innerHTML = `<div>det(A) = <b>${fmt(d, 4)}</b>, a inversa existe.</div><div class="cl">x = A⁻¹·b (kg de produto por ha)</div>` +
        x.map((v, i) => `<div>${prod[i]}: <b class="${v < 0 ? "no" : ""}">${fmt(v, 1)} kg</b>${v < 0 ? " (negativo: inviável)" : ""}<div class="bar"><i style="width:${clamp(Math.abs(v) / mx * 100, 0, 100)}%"></i></div></div>`).join("") +
        `<div>Total de produto: <b>${fmt(tot, 1)} kg/ha</b></div>`;
    }
    draw(); return draw;
  }});

MODS.push({id: "estatistica", grupo: "Estatística", nome: "Experimentos de campo",
  lead: "Dois tratamentos dão resultados diferentes. A pergunta é se a diferença é do tratamento ou do acaso do solo e do clima.",
  campo: "Comparar cultivares, doses e manejos exige repetições. Cada parcela varia por razões que você não controla. Mais repetições ou menos variação deixam o efeito real mais fácil de enxergar.",
  dia: "É o mesmo raciocínio do teste A/B de um site e do controle de qualidade de uma fábrica. O poder do teste diz a chance de enxergar uma diferença que realmente existe.",
  python: `import numpy as np
from scipy import stats

rng = np.random.default_rng()
a = rng.normal(60, 6, 5)             # cultivar A: 5 repetições
b = rng.normal(64, 6, 5)             # cultivar B: +4 sc/ha de verdade
print(stats.ttest_ind(a, b, equal_var=False))`,
  build(stage, panel) {
    const c = canvas(stage); const R = readout(panel); let A = [], B = [];
    const ds = ctl(panel, "Diferença real entre cultivares", 0, 15, 0.5, 4, v => fmt(v, 1) + " sc/ha", () => run());
    const ss = ctl(panel, "Variação entre parcelas (desvio)", 1, 15, 0.5, 6, v => fmt(v, 1) + " sc/ha", () => run());
    const ns = ctl(panel, "Repetições por cultivar", 2, 20, 1, 5, v => v, () => run());
    const r = row(panel); let power = "";
    btn(r, "Rodar um experimento", () => run());
    btn(r, "Repetir 500 vezes", () => { let hit = 0; for (let i = 0; i < 500; i++) { const a = Array.from({length: ns.get()}, () => 60 + ss.get() * gauss()), b = Array.from({length: ns.get()}, () => 60 + ds.get() + ss.get() * gauss()); if (welch(a, b).p < 0.05) hit++; } power = `Em <b>${fmt(hit / 5, 1)}%</b> de 500 experimentos o teste detectou diferença (p < 0,05). ${ds.get() === 0 ? "Sem diferença real, isso são falsos positivos." : "Esse é o poder do teste."}`; draw(); }, true);
    function run() { power = ""; A = Array.from({length: ns.get()}, () => 60 + ss.get() * gauss()); B = Array.from({length: ns.get()}, () => 60 + ds.get() + ss.get() * gauss()); draw(); }
    function draw() {
      if (!A.length) return;
      const all = [...A, ...B], lo = Math.min(...all) - 4, hi = Math.max(...all) + 4, p = plane(c, 0, 3, lo, hi, "", "produtividade (sc/ha)"), g = p.g;
      [[A, 1, css("--curve"), "A"], [B, 2, css("--amber"), "B"]].forEach(([arr, cx, col, nm]) => {
        arr.forEach((v, i) => p.dot(cx + ((i % 5) - 2) * 0.05 + (i % 2 ? .02 : -.02), v, col, 5));
        const m = mean(arr), s = sd(arr); p.line(cx - .3, m, cx + .3, m, col, 3); p.line(cx, m - s, cx, m + s, col, 1.5, [4, 3]);
        g.fillStyle = css("--ink"); g.font = `600 14px ${css("--f-body")}`; g.textAlign = "center"; g.fillText("Cultivar " + nm, p.X(cx), p.h - p.m.b + 20);
      });
      const t = welch(A, B), sig = t.p < 0.05;
      R.innerHTML = `<div>média A <b>${fmt(mean(A), 1)}</b> · média B <b>${fmt(mean(B), 1)}</b></div><div>desvio A <b>${fmt(sd(A), 1)}</b> · desvio B <b>${fmt(sd(B), 1)}</b></div>
        <div>t de Welch = <b>${fmt(t.t, 2)}</b> (gl ${fmt(t.df, 1)}) · p = <b>${fmt(t.p, 4)}</b></div>
        <div class="${sig ? "ok" : "no"}">${sig ? "Diferença detectada (p < 0,05)." : "Diferença não detectada neste experimento."}</div>
        ${power ? `<div>${power}</div>` : ""}<div>Linha cheia = média; tracejada = ± 1 desvio.</div>`;
    }
    run(); return draw;
  }});

MODS.push({id: "jogos", grupo: "Decisão", nome: "Teoria dos jogos",
  lead: "Quando o resultado de cada um depende da escolha dos outros, a melhor jogada muda. O equilíbrio de Nash é o ponto onde ninguém ganha mudando sozinho.",
  campo: "Duas cooperativas decidindo se baixam o preço, vizinhos que dividem silo ou maquinário, produtor e fiscalização. Em todos, a sua melhor escolha depende do que o outro faz.",
  dia: "Negociação, leilão, trânsito, preço de concorrentes. Marcar a melhor resposta em cada coluna e em cada linha já revela os equilíbrios.",
  python: `import numpy as np

A = np.array([[5, 1], [7, 3]])       # ganhos da linha
B = np.array([[5, 7], [1, 3]])       # ganhos da coluna
for i in range(2):
    for j in range(2):
        if A[i, j] == A[:, j].max() and B[i, j] == B[i, :].max():
            print("Nash:", i, j)`,
  build(stage, panel) {
    const PS = [
      {nome: "Cooperativas: dilema dos preços", L: ["Manter preço", "Baixar preço"], C: ["Manter preço", "Baixar preço"], P: [[[5, 5], [1, 7]], [[7, 1], [3, 3]]], t: "Cada uma ganha mais baixando o preço, qualquer que seja a outra. Resultado: ambas baixam e ficam pior do que se mantivessem."},
      {nome: "Vizinhos: qual cultura plantar", L: ["Soja", "Milho"], C: ["Soja", "Milho"], P: [[[4, 4], [0, 0]], [[0, 0], [3, 3]]], t: "Os dois só ganham se plantarem a mesma coisa (silo e frete compartilhados). Há dois equilíbrios e é preciso combinar."},
      {nome: "Produtor × fiscal", L: ["Cumprir", "Burlar"], C: ["Fiscalizar", "Ignorar"], P: [[[2, -1], [2, 0]], [[-3, 1], [4, -2]]], t: "Se o fiscal sempre fiscaliza, burlar não compensa; se nunca fiscaliza, compensa. Sem equilíbrio fixo: cada um precisa misturar jogadas."}
    ];
    let k = 0; const R = readout(panel);
    const s = sel(panel, "Situação", PS.map(f => f.nome), v => { k = v; build(); }); panel.insertBefore(s.parentElement, panel.firstChild);
    stage.innerHTML = `<div class="mxwrap"><table class="mx game" id="gm"></table></div>`;
    const gm = $("#gm", stage);
    function build() {
      const G = PS[k];
      gm.innerHTML = `<tr><td class="hd"></td>${G.C.map(c => `<td class="hd">Coluna: ${c}</td>`).join("")}</tr>` +
        G.P.map((r, i) => `<tr><td class="hd">Linha: ${G.L[i]}</td>${r.map((p, j) => `<td id="cell${i}${j}"><input id="p${i}${j}0" type="number" value="${p[0]}" data-i="${i}" data-j="${j}" data-k="0"> , <input id="p${i}${j}1" type="number" value="${p[1]}" data-i="${i}" data-j="${j}" data-k="1"></td>`).join("")}</tr>`).join("");
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
    build(); return draw;
  }});

/* ---------- machine learning ---------- */
const mulberry = s => () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

MODS.push({id: "regressao", grupo: "Machine learning", nome: "Regressão linear e gradiente",
  lead: "Ajustar uma reta aos dados é achar os parâmetros que minimizam o erro. O gradiente descendente chega lá andando contra a derivada da perda.",
  campo: "Prever a produtividade a partir da chuva do ciclo, da temperatura ou da dose de adubo é regressão. É a base de quase todo modelo de previsão: ajustar parâmetros para errar o mínimo possível.",
  dia: "O treino de uma rede neural repete este laço: calcular o erro, calcular a derivada, andar na direção que reduz o erro. A taxa de aprendizado é o tamanho do passo.",
  python: `import numpy as np

x = np.linspace(-2, 2, 24)
y = 60 + 8*x + np.random.normal(0, 6, 24)
w, b, lr = 0.0, 40.0, 0.3
for _ in range(100):
    e = b + w*x - y                       # erro de cada ponto
    w -= lr * np.mean(2*e*x)              # derivada da perda em w
    b -= lr * np.mean(2*e)                # derivada da perda em b
print(w, b)                               # perto de 8 e 60`,
  build(stage, panel) {
    const rnd = mulberry(7), gz = () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(2 * Math.PI * rnd());
    const D = Array.from({length: 24}, (_, i) => { const x = -2 + 4 * (i + .5) / 24 + (rnd() - .5) * .1; return [x, 60 + 8 * x + 6 * gz()]; });
    const n = D.length, mx = mean(D.map(d => d[0])), my = mean(D.map(d => d[1]));
    const wO = D.reduce((s, d) => s + (d[0] - mx) * (d[1] - my), 0) / D.reduce((s, d) => s + (d[0] - mx) ** 2, 0), bO = my - wO * mx;
    let w = 0, b = 40, steps = 0; const c = canvas(stage); const R = readout(panel); const LR = [0.02, 0.3, 0.9];
    const ws = ctl(panel, "Inclinação w", -5, 20, 0.1, w, v => fmt(v, 1) + " sc/ha por 100 mm", v => { w = v; steps = 0; draw(); });
    const bs = ctl(panel, "Intercepto b", 0, 100, 0.5, b, v => fmt(v, 1) + " sc/ha", v => { b = v; steps = 0; draw(); });
    const lrs = sel(panel, "Taxa de aprendizado", ["0,02 (lenta)", "0,3 (boa)", "0,9 (grande demais)"], () => {}); lrs.value = 1;
    const r = row(panel);
    const step = () => { let gw = 0, gb = 0; for (const [x, y] of D) { const e = b + w * x - y; gw += 2 * e * x / n; gb += 2 * e / n; } w -= LR[+lrs.value] * gw; b -= LR[+lrs.value] * gb; steps++; };
    const sync = () => { ws.set(clamp(w, -5, 20)); bs.set(clamp(b, 0, 100)); draw(); };
    btn(r, "1 passo", () => { step(); sync(); }); btn(r, "20 passos", () => { for (let i = 0; i < 20; i++) step(); sync(); });
    btn(r, "Solução exata", () => { w = wO; b = bO; steps = 0; sync(); }, true); btn(r, "Zerar", () => { w = 0; b = 40; steps = 0; sync(); }, true);
    function draw() {
      const ys = D.map(d => d[1]), p = plane(c, -2.4, 2.4, Math.min(...ys) - 12, Math.max(...ys) + 12, "chuva do ciclo (centenas de mm, centrada em 5)", "produtividade (sc/ha)");
      const f = x => b + w * x; D.forEach(([x, y]) => p.line(x, y, x, f(x), css("--amber"), 1, [3, 3]));
      p.curve(x => bO + wO * x, css("--good"), 1.5, -2.4, 2.4); p.curve(f, css("--curve"), 2.5, -2.4, 2.4); D.forEach(([x, y]) => p.dot(x, y, css("--ink"), 3.5));
      const sse = D.reduce((s, [x, y]) => s + (y - f(x)) ** 2, 0), sst = D.reduce((s, [, y]) => s + (y - my) ** 2, 0), mse = sse / n, bad = !Number.isFinite(mse) || mse > 1e9;
      let gw = 0, gb = 0; D.forEach(([x, y]) => { const e = f(x) - y; gw += 2 * e * x / n; gb += 2 * e / n; });
      R.innerHTML = bad ? `<div class="no"><b>O erro explodiu.</b> O passo é maior do que a curvatura da perda permite e cada atualização passa do mínimo. Aperte Zerar e use uma taxa menor.</div>` :
        `<div>ŷ = <b>${fmt(b, 2)}</b> + <b>${fmt(w, 2)}</b>·x · passos: <b>${steps}</b></div><div>erro quadrático médio: <b>${fmt(mse, 2)}</b> · R² = <b>${fmt(1 - sse / sst, 3)}</b></div>
        <div>gradiente: dw = <b>${fmt(gw, 2)}</b>, db = <b>${fmt(gb, 2)}</b> (zero no mínimo)</div><div class="ok">solução exata: w = ${fmt(wO, 2)}, b = ${fmt(bO, 2)}</div>
        <div>Tracejado = resíduos; verde = mínimos quadrados.</div>`;
    }
    draw(); return draw;
  }});

MODS.push({id: "embeddings", grupo: "Machine learning", nome: "Vetores, embeddings e busca",
  lead: "Um texto vira um ponto num espaço. Perguntas parecidas com um documento ficam perto dele, e buscar vira medir distância ou ângulo.",
  campo: "Achar, em milhares de laudos e boletins técnicos, o trecho sobre o problema que o produtor descreveu. A busca por palavra falha quando o produtor usa outros termos; a busca por significado funciona.",
  dia: "É o que acontece por trás de recomendação de filmes, busca semântica e detecção de duplicatas. Aqui o espaço tem 2 dimensões; os modelos reais usam centenas ou milhares.",
  python: `import numpy as np

docs = np.array([[.8, -.4], [.45, -.22], [.4, .85], [.2, .5]])
q = np.array([.5, .3])
cos = docs @ q / (np.linalg.norm(docs, axis=1) * np.linalg.norm(q))
dist = np.linalg.norm(docs - q, axis=1)
print(np.argsort(-cos), np.argsort(dist))   # rankings diferentes`,
  build(stage, panel) {
    const DOCS = [
      {t: "Adubação nitrogenada em milho", s: "Adubação N", v: [-0.8, 0.45]}, {t: "Irrigação por gotejamento", s: "Irrigação", v: [-0.35, 0.2]},
      {t: "Tabelas Delta no Databricks", s: "Delta", v: [0.8, -0.4]}, {t: "Modelo semântico do Power BI", s: "Power BI", v: [0.45, -0.22]},
      {t: "Guardrails para LLM", s: "Guardrails", v: [0.4, 0.85]}, {t: "RAG: busca vetorial e reranking", s: "RAG", v: [0.2, 0.5]}
    ];
    const c = canvas(stage, 380); c.style.touchAction = "none"; const R = readout(panel); let q = [0.5, 0.3], metric = 0, last = null, drag = false;
    const ms = sel(panel, "Métrica de similaridade", ["Cosseno (ângulo)", "Distância euclidiana", "Produto escalar"], v => { metric = v; draw(); });
    const ks = ctl(panel, "Trechos recuperados (top-k)", 1, 4, 1, 2, v => v, draw);
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1], nm = a => Math.hypot(a[0], a[1]);
    const score = d => metric === 0 ? dot(d.v, q) / (nm(d.v) * nm(q) || 1) : metric === 1 ? -Math.hypot(d.v[0] - q[0], d.v[1] - q[1]) : dot(d.v, q);
    const mv = e => { const b = c.getBoundingClientRect(), px = e.clientX - b.left, py = e.clientY - b.top; q = [clamp(last.x0 + (px - last.m.l) / (last.w - last.m.l - last.m.r) * (last.x1 - last.x0), -1, 1), clamp(last.y0 + (last.h - last.m.b - py) / (last.h - last.m.t - last.m.b) * (last.y1 - last.y0), -1, 1)]; draw(); };
    c.addEventListener("pointerdown", e => { drag = true; c.setPointerCapture(e.pointerId); mv(e); }); c.addEventListener("pointermove", e => { if (drag) mv(e); }); c.addEventListener("pointerup", () => { drag = false; });
    function draw() {
      const p = plane(c, -1, 1, -1, 1, "clique no gráfico para mover a pergunta", ""); last = p; const g = p.g;
      const rk = DOCS.map((d, i) => ({d, i, s: score(d)})).sort((a, b) => b.s - a.s), top = new Set(rk.slice(0, ks.get()).map(x => x.i));
      DOCS.forEach((d, i) => { p.line(0, 0, d.v[0], d.v[1], css("--axis"), 1); p.dot(d.v[0], d.v[1], top.has(i) ? css("--good") : css("--muted"), top.has(i) ? 7 : 5);
        g.fillStyle = css("--ink"); g.font = `12px ${css("--f-body")}`; g.textAlign = "left"; g.textBaseline = "middle"; g.fillText(d.s, p.X(d.v[0]) + 10, p.Y(d.v[1])); });
      p.line(0, 0, q[0], q[1], css("--amber"), 2); p.dot(q[0], q[1], css("--amber"), 8); g.fillStyle = css("--amber"); g.font = `600 12px ${css("--f-body")}`; g.fillText("pergunta", p.X(q[0]) + 12, p.Y(q[1]) - 4);
      R.innerHTML = `<div class="cl">Ranking (${["cosseno, maior é melhor", "distância, menor é melhor", "produto escalar, maior é melhor"][metric]})</div>` +
        rk.map((x, j) => `<div class="${top.has(x.i) ? "ok" : ""}">${j + 1}. ${x.d.t} · <b>${fmt(metric === 1 ? -x.s : x.s, 3)}</b></div>`).join("") +
        `<div>Troque a métrica: documentos curtos e longos na mesma direção mudam de posição entre cosseno e distância. Por isso a métrica deve combinar com a do modelo de embedding.</div>`;
    }
    draw(); return draw;
  }});

MODS.push({id: "atencao", grupo: "Machine learning", nome: "Softmax e atenção",
  lead: "Atenção é uma média ponderada: cada token mede a similaridade com os outros, converte em pesos com softmax e mistura as informações.",
  campo: "Na frase “o milho precisa de nitrogênio”, entender “precisa” exige olhar para “milho” e “nitrogênio”. A atenção aprende quais palavras importam para cada uma.",
  dia: "É o bloco central do Transformer, repetido em várias cabeças e camadas. Os vetores abaixo são valores de brinquedo, escolhidos à mão. Em um modelo real eles vêm do treino.",
  python: `import numpy as np

E = np.array([[.1,.1],[1,.2],[.3,.9],[.1,.2],[.9,.5],[-.2,0]])
S = E @ E.T / np.sqrt(E.shape[1])        # similaridades escaladas
W = np.exp(S - S.max(1, keepdims=True))
W /= W.sum(1, keepdims=True)             # softmax por linha
saida = W @ E                            # média ponderada`,
  build(stage, panel) {
    const T = [["o", [0.1, 0.1]], ["milho", [1, 0.2]], ["precisa", [0.3, 0.9]], ["de", [0.1, 0.2]], ["nitrogênio", [0.9, 0.5]], [".", [-0.2, 0]]];
    const c = canvas(stage, 380); const R = readout(panel); let qi = 1;
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
      const row = M[qi], out = [0, 1].map(k => row.reduce((s, wj, j) => s + wj * T[j][1][k], 0));
      R.innerHTML = `<div class="cl">“${T[qi][0]}” presta atenção em</div>` + row.map((v, j) => ({v, j})).sort((a, b) => b.v - a.v).map(x => `<div>${T[x.j][0]}: <b>${fmt(x.v * 100, 0)}%</b><div class="bar"><i style="width:${x.v * 100}%"></i></div></div>`).join("") +
        `<div>vetor de saída: <b>(${fmt(out[0], 2)}; ${fmt(out[1], 2)})</b>, a média ponderada dos tokens.</div><div>Temperatura baixa concentra a atenção; alta espalha igualmente. A divisão por √d já está aplicada.</div>`;
    }
    draw(); return draw;
  }});

MODS.push({id: "overfit", grupo: "Machine learning", nome: "Overfitting, viés e variância",
  lead: "Um modelo flexível demais decora o ruído dos dados de treino e falha em dados novos. Um simples demais não captura o padrão. O ponto bom está no meio.",
  campo: "Ajustar uma curva de resposta da cultura com poucas parcelas é o caso clássico. Um polinômio de grau alto passa por todos os pontos e prevê absurdos entre eles.",
  dia: "Toda a prática de ML gira em torno disso: separar treino e teste, validação cruzada, regularização, parar o treino cedo. O erro no treino sempre melhora com mais complexidade. O erro no teste, não.",
  python: `import numpy as np
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import Ridge

for grau in range(0, 11):
    m = make_pipeline(PolynomialFeatures(grau), Ridge(alpha=1e-3))
    m.fit(x_treino.reshape(-1, 1), y_treino)
    erro_t = np.sqrt(np.mean((m.predict(x_teste.reshape(-1, 1)) - y_teste)**2))
    print(grau, erro_t)               # cai e depois sobe`,
  build(stage, panel) {
    const rnd = mulberry(21), gz = () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(2 * Math.PI * rnd()), f0 = x => Math.sin(2.2 * x);
    const tr = Array.from({length: 14}, () => { const x = rnd() * 2 - 1; return [x, f0(x) + 0.25 * gz()]; }), te = Array.from({length: 80}, () => { const x = rnd() * 2 - 1; return [x, f0(x) + 0.25 * gz()]; });
    const LAM = [0, 1e-4, 1e-3, 1e-2, 1e-1, 1, 10];
    const c1 = canvas(stage, 300), c2 = canvas(stage, 190); const R = readout(panel);
    const ds = ctl(panel, "Grau do polinômio", 0, 10, 1, 9, v => v, draw), ls = ctl(panel, "Regularização (ridge)", 0, 6, 1, 0, v => v === 0 ? "nenhuma" : "λ = " + LAM[v], draw);
    function fit(d, lam) {
      const X = tr.map(([x]) => Array.from({length: d + 1}, (_, j) => x ** j)), A = Array.from({length: d + 1}, (_, i) => Array.from({length: d + 1}, (_, j) => X.reduce((s, r) => s + r[i] * r[j], 0) + (i === j ? Math.max(lam, 1e-7) : 0)));
      const I = inv(A); if (!I) return null; const bv = Array.from({length: d + 1}, (_, i) => X.reduce((s, r, k) => s + r[i] * tr[k][1], 0));
      return I.map(r => r.reduce((s, v, j) => s + v * bv[j], 0));
    }
    const pred = (w, x) => w.reduce((s, c, j) => s + c * x ** j, 0), rmse = (w, D) => Math.sqrt(D.reduce((s, [x, y]) => s + (pred(w, x) - y) ** 2, 0) / D.length);
    function draw() {
      const d = ds.get(), lam = LAM[ls.get()], w = fit(d, lam);
      const p = plane(c1, -1, 1, -1.8, 1.8, "x", "y"); p.curve(f0, css("--good"), 1.5);
      te.forEach(([x, y]) => p.dot(x, y, css("--axis"), 2)); if (w) p.curve(x => pred(w, x), css("--curve")); tr.forEach(([x, y]) => p.dot(x, y, css("--amber"), 5));
      const E = []; for (let k = 0; k <= 10; k++) { const wk = fit(k, lam); E.push(wk ? [rmse(wk, tr), rmse(wk, te)] : [NaN, NaN]); }
      const q = plane(c2, 0, 10, 0, 1.2, "grau do polinômio", "erro (RMSE)");
      for (let k = 0; k < 10; k++) { if (Number.isFinite(E[k][0]) && Number.isFinite(E[k + 1][0])) { q.line(k, Math.min(E[k][0], 1.2), k + 1, Math.min(E[k + 1][0], 1.2), css("--amber"), 2); q.line(k, Math.min(E[k][1], 1.2), k + 1, Math.min(E[k + 1][1], 1.2), css("--curve"), 2); } }
      q.line(d, 0, d, 1.2, css("--muted"), 1, [4, 4]);
      const [etr, ete] = w ? [rmse(w, tr), rmse(w, te)] : [NaN, NaN];
      const diag = !w ? "Não foi possível ajustar (matriz singular)." : ete > 2 * etr && ete > 0.4 ? "Sobreajuste: o erro de teste é muito maior que o de treino." : etr > 0.45 ? "Subajuste: o modelo é simples demais para o padrão." : "Equilíbrio razoável entre treino e teste.";
      R.innerHTML = `<div class="am">erro de treino: <b>${fmt(etr, 3)}</b></div><div style="color:var(--curve)">erro de teste: <b>${fmt(ete, 3)}</b></div><div>${diag}</div>
        <div>Verde = função verdadeira · laranja = 14 pontos de treino · cinza = 80 pontos de teste. O ruído dos dados é 0,25, então nenhum modelo vai abaixo disso no teste.</div>`;
    }
    draw(); return draw;
  }});

const erf = x => { const s = Math.sign(x); x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x); return s * (1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)); };
const Phi = z => 0.5 * (1 + erf(z / Math.SQRT2));

MODS.push({id: "logistica", grupo: "Machine learning", nome: "Classificação, limiar e guardrails",
  lead: "Um classificador devolve um score. Você escolhe o limiar que transforma o score em decisão, e cada limiar troca um tipo de erro por outro.",
  campo: "Detectar doença em folhas por imagem: chamar uma planta sadia de doente custa uma visita. Deixar passar uma doente custa a safra. Os dois erros têm preços diferentes.",
  dia: "Spam, fraude e exame médico seguem a mesma lógica. A regressão logística é o modelo mais simples que gera esse score: a sigmoide transforma uma soma ponderada em probabilidade.",
  python: `import numpy as np
from sklearn.metrics import roc_auc_score, precision_recall_curve

ok  = np.random.normal(0.35, 0.15, 9900)      # pedidos legítimos
atk = np.random.normal(0.65, 0.15, 100)       # ataques: 1% do tráfego
y = np.r_[np.zeros(9900), np.ones(100)]; s = np.r_[ok, atk]
print(roc_auc_score(y, s))
p, r, t = precision_recall_curve(y, s)        # a precisão cai com poucos ataques`,
  build(stage, panel) {
    const PI = [0.001, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5], S = 0.15, M0 = 0.35; let t = 0.5;
    const c1 = canvas(stage, 220), c2 = canvas(stage, 250); const R = readout(panel);
    const sp = ctl(panel, "Separação entre os grupos", 0, 0.6, 0.01, 0.3, v => fmt(v, 2), draw), ps = ctl(panel, "Taxa real de ataques", 0, 7, 1, 2, v => fmt(PI[v] * 100, 1) + "%", draw);
    const cs = ctl(panel, "Custo de deixar um ataque passar", 1, 100, 1, 10, v => v + "× o de bloquear à toa", draw), ts = ctl(panel, "Limiar de bloqueio", 0, 1, 0.01, t, v => fmt(v, 2), v => { t = v; draw(); });
    const m = (th) => { const m1 = M0 + sp.get(); return {tpr: 1 - Phi((th - m1) / S), fpr: 1 - Phi((th - M0) / S)}; };
    const cost = th => { const {tpr, fpr} = m(th), pi = PI[ps.get()]; return 1000 * (pi * (1 - tpr) * cs.get() + (1 - pi) * fpr); };
    btn(row(panel), "Usar o limiar de menor custo", () => { let b = 0, bc = Infinity; for (let x = 0; x <= 1; x += 0.005) { const q = cost(x); if (q < bc) { bc = q; b = x; } } t = +b.toFixed(2); ts.set(t); draw(); }, true);
    const pdf = (x, mu) => Math.exp(-0.5 * ((x - mu) / S) ** 2) / (S * Math.sqrt(2 * Math.PI));
    function draw() {
      const m1 = M0 + sp.get(), pi = PI[ps.get()], {tpr, fpr} = m(t);
      const p = plane(c1, -0.2, 1.2, 0, 3.1, "score do classificador", "densidade"); p.curve(x => pdf(x, M0), css("--curve")); p.curve(x => pdf(x, m1), css("--amber")); p.line(t, 0, t, 3.1, css("--ink"), 2);
      const q = plane(c2, 0, 1, 0, 1, "falsos positivos (FPR)", "verdadeiros positivos (TPR)"); q.line(0, 0, 1, 1, css("--axis"), 1, [4, 4]);
      for (let x = -0.4; x < 1.6; x += 0.01) { const a = m(x), b = m(x + 0.01); q.line(a.fpr, a.tpr, b.fpr, b.tpr, css("--curve"), 2.5); }
      q.dot(fpr, tpr, css("--amber"), 6);
      const N0 = 10000, A = pi * N0, B = N0 - A, TP = A * tpr, FN = A - TP, FP = B * fpr, TN = B - FP, prec = TP + FP > 0 ? TP / (TP + FP) : NaN, f1 = prec > 0 && tpr > 0 ? 2 * prec * tpr / (prec + tpr) : NaN;
      R.innerHTML = `<div>Em 10.000 pedidos: <b>${fmt(A, 0)}</b> ataques e <b>${fmt(B, 0)}</b> legítimos</div>
        <div>bloqueou ataque (VP): <b>${fmt(TP, 0)}</b> · deixou passar (FN): <b class="no">${fmt(FN, 0)}</b></div><div>bloqueou à toa (FP): <b class="no">${fmt(FP, 0)}</b> · liberou legítimo (VN): <b>${fmt(TN, 0)}</b></div>
        <div>recall: <b>${fmt(tpr * 100, 1)}%</b> · precisão: <b>${fmt(prec * 100, 1)}%</b> · F1: <b>${fmt(f1 * 100, 1)}%</b></div><div>AUC: <b>${fmt(Phi(sp.get() / (S * Math.SQRT2)), 3)}</b> · custo esperado por 1.000 pedidos: <b>${fmt(cost(t), 1)}</b></div>
        <div>Diminua a taxa de ataques: a precisão despenca mesmo com o mesmo classificador, porque os legítimos são muito mais numerosos.</div>`;
    }
    draw(); return draw;
  }});

MODS.push({id: "rede", grupo: "Machine learning", nome: "Redes neurais e backpropagation",
  lead: "Uma rede é uma função composta de camadas simples. O treino calcula o erro, propaga a derivada de trás para frente com a regra da cadeia e ajusta cada peso.",
  campo: "Separar áreas de solo por duas medidas (por exemplo, argila e matéria orgânica) quando a fronteira não é uma reta. Uma rede com poucos neurônios já desenha fronteiras curvas.",
  dia: "É a mesma máquina de redes de visão e de linguagem, em escala minúscula. Aqui há 2 entradas, uma camada oculta e 1 saída. Os pesos são treinados ao vivo no seu navegador.",
  python: `import torch, torch.nn as nn

net = nn.Sequential(nn.Linear(2, 6), nn.Tanh(), nn.Linear(6, 1))
opt = torch.optim.SGD(net.parameters(), lr=0.5)
loss_fn = nn.BCEWithLogitsLoss()
for epoca in range(500):
    opt.zero_grad()
    loss = loss_fn(net(X).squeeze(), y)   # X: (n, 2), y: (n,) float
    loss.backward()                       # backpropagation
    opt.step()`,
  build(stage, panel) {
    const LR = [0.1, 0.5, 1.5]; let ds = 1, h = 6, lri = 1, epoch = 0, hist = [], timer = null, pts, W1, b1, W2, b2;
    const cm = canvas(stage, 320), cl = canvas(stage, 150); const R = readout(panel);
    function data() { const r = mulberry(11 + ds), P = []; for (let i = 0; i < 160; i++) { const x = r() * 2 - 1, y = r() * 2 - 1; P.push([x, y, ds === 0 ? (0.8 * x + 0.6 * y > 0 ? 1 : 0) : ds === 1 ? (Math.hypot(x, y) > 0.6 ? 1 : 0) : (x * y > 0 ? 1 : 0)]); } return P; }
    function init() { const r = mulberry(5 + h); pts = data(); W1 = Array.from({length: h}, () => [(r() - .5) * 2, (r() - .5) * 2]); b1 = Array.from({length: h}, () => r() - .5); W2 = Array.from({length: h}, () => (r() - .5) * 2); b2 = 0; epoch = 0; hist = []; }
    function fwd(x, y) { let z = b2; const a = []; for (let k = 0; k < h; k++) { const v = Math.tanh(W1[k][0] * x + W1[k][1] * y + b1[k]); a.push(v); z += W2[k] * v; } return {a, p: 1 / (1 + Math.exp(-z))}; }
    function step() {
      const n = pts.length, gW1 = W1.map(() => [0, 0]), gb1 = Array(h).fill(0), gW2 = Array(h).fill(0); let gb2 = 0, L = 0;
      for (const [x, y, t] of pts) { const {a, p} = fwd(x, y); L -= t ? Math.log(p + 1e-9) : Math.log(1 - p + 1e-9); const dz = (p - t) / n; gb2 += dz;
        for (let k = 0; k < h; k++) { gW2[k] += dz * a[k]; const dp = dz * W2[k] * (1 - a[k] * a[k]); gW1[k][0] += dp * x; gW1[k][1] += dp * y; gb1[k] += dp; } }
      const lr = LR[lri]; for (let k = 0; k < h; k++) { W1[k][0] -= lr * gW1[k][0]; W1[k][1] -= lr * gW1[k][1]; b1[k] -= lr * gb1[k]; W2[k] -= lr * gW2[k]; } b2 -= lr * gb2; hist.push(L / n); epoch++;
    }
    const stopT = () => { if (timer) clearInterval(timer); timer = null; tb.textContent = "Treinar"; }; onLeave = stopT;
    const s1 = sel(panel, "Conjunto de dados", ["Separável por uma reta", "Círculo dentro de círculo", "XOR (cantos opostos)"], v => { ds = v; stopT(); init(); draw(); }); s1.value = 1; panel.insertBefore(s1.parentElement, panel.firstChild);
    ctl(panel, "Neurônios na camada oculta", 1, 12, 1, h, v => v, v => { h = v; stopT(); init(); draw(); });
    const s2 = sel(panel, "Taxa de aprendizado", ["0,1", "0,5", "1,5"], v => { lri = v; }); s2.value = 1;
    const r = row(panel); const tb = btn(r, "Treinar", () => { if (timer) { stopT(); return; } timer = setInterval(() => { for (let i = 0; i < 10; i++) step(); draw(); }, 40); tb.textContent = "Pausar"; });
    btn(r, "1 passo", () => { stopT(); step(); draw(); }, true); btn(r, "Reiniciar", () => { stopT(); init(); draw(); }, true);
    function draw() {
      const {g, w, h: H} = setup(cm), S = Math.min(w, H) - 8, ox = (w - S) / 2, oy = (H - S) / 2, G = 34, d = S / G;
      for (let i = 0; i < G; i++) for (let j = 0; j < G; j++) { const {p} = fwd(-1 + (i + .5) * 2 / G, 1 - (j + .5) * 2 / G); g.globalAlpha = 0.12 + 0.5 * Math.abs(2 * p - 1); g.fillStyle = p > .5 ? css("--curve") : css("--amber"); g.fillRect(ox + i * d, oy + j * d, d + .5, d + .5); }
      g.globalAlpha = 1; let ok = 0;
      for (const [x, y, t] of pts) { const {p} = fwd(x, y); if ((p > .5) === !!t) ok++; g.beginPath(); g.arc(ox + (x + 1) / 2 * S, oy + (1 - y) / 2 * S, 3.5, 0, 7); g.fillStyle = t ? css("--curve") : css("--amber"); g.fill(); g.strokeStyle = css("--ink"); g.lineWidth = 1.2; g.stroke(); }
      g.strokeStyle = css("--axis"); g.strokeRect(ox, oy, S, S);
      const mx = Math.max(0.8, hist[0] || 0), q = plane(cl, 0, Math.max(100, epoch), 0, mx, "passos", "perda"), k = Math.max(1, Math.floor(hist.length / 300));
      for (let i = k; i < hist.length; i += k) q.line(i - k, hist[i - k], i, hist[i], css("--curve"), 2);
      R.innerHTML = `<div>passos: <b>${epoch}</b> · parâmetros: <b>${4 * h + 1}</b></div><div>perda: <b>${fmt(hist[hist.length - 1] ?? NaN, 4)}</b> · acerto: <b>${fmt(ok / pts.length * 100, 1)}%</b></div>
        <div>Com poucos neurônios a fronteira é rígida: tente 1 neurônio no círculo e veja o acerto travar. Taxa 1,5 pode oscilar.</div>`;
    }
    init(); draw(); return draw;
  }});

MODS.push({id: "token", grupo: "Machine learning", nome: "Do logit ao próximo token",
  lead: "A última etapa de um modelo de linguagem dá um número (logit) para cada palavra possível. Temperatura, top-k e top-p decidem como sortear a próxima.",
  campo: "Para a frase “o milho precisa de ___”, o modelo pontua cada candidato. O mais provável é “nitrogênio”, mas “água” está logo atrás, e “carro” é quase impossível.",
  dia: "Os logits abaixo são valores de brinquedo escolhidos à mão. Em um modelo real há dezenas de milhares de candidatos, mas a conta é exatamente esta.",
  python: `import numpy as np

def amostrar(logits, T=0.7, k=5, p=0.9):
    z = np.array(logits) / T
    pr = np.exp(z - z.max()); pr /= pr.sum()          # softmax com temperatura
    ordem = np.argsort(-pr)[:k]                       # top-k
    cum = np.cumsum(pr[ordem])
    ordem = ordem[:np.searchsorted(cum, p) + 1]       # top-p
    q = np.zeros_like(pr); q[ordem] = pr[ordem]
    return np.random.choice(len(pr), p=q / q.sum())`,
  build(stage, panel) {
    const TK = [["nitrogênio", 4.2], ["água", 3.9], ["luz", 3.1], ["fósforo", 2.9], ["sol", 2.0], [".", 0.5], ["carro", -1], ["banco", -2]]; let counts = null;
    stage.innerHTML = `<div class="mxwrap" id="tk"></div>`; const box = $("#tk", stage), R = readout(panel);
    const Ts = ctl(panel, "Temperatura", 0.1, 2, 0.05, 0.8, v => fmt(v, 2), () => { counts = null; draw(); }), ks = ctl(panel, "top-k", 1, 8, 1, 8, v => v, () => { counts = null; draw(); }), ps = ctl(panel, "top-p", 0.1, 1, 0.05, 1, v => fmt(v, 2), () => { counts = null; draw(); });
    let q = [];
    btn(row(panel), "Amostrar 1000 vezes", () => { counts = TK.map(() => 0); for (let i = 0; i < 1000; i++) { let u = Math.random(), a = 0; for (let j = 0; j < q.length; j++) { a += q[j]; if (u <= a || j === q.length - 1) { counts[j]++; break; } } } draw(); });
    function draw() {
      const z = TK.map(t => t[1] / Ts.get()), mx = Math.max(...z), e = z.map(v => Math.exp(v - mx)), Z = e.reduce((s, v) => s + v, 0), pr = e.map(v => v / Z);
      const ord = pr.map((v, i) => i).sort((a, b) => pr[b] - pr[a]); let cum = 0, keep = 0; for (const i of ord) { cum += pr[i]; keep++; if (cum >= ps.get() - 1e-9) break; }
      const n = Math.min(ks.get(), keep), kept = new Set(ord.slice(0, n)), tot = ord.slice(0, n).reduce((s, i) => s + pr[i], 0);
      q = pr.map((v, i) => kept.has(i) ? v / tot : 0); const H = -q.reduce((s, v) => s + (v > 0 ? v * Math.log2(v) : 0), 0);
      box.innerHTML = `<h4 class="cl" style="margin:4px 0 10px">o milho precisa de ___</h4>` + ord.map(i => `<div style="display:grid;grid-template-columns:96px minmax(80px,1fr) 150px;gap:10px;align-items:center;margin:7px 0">
        <span>${TK[i][0]}</span><div class="bar"><i style="width:${pr[i] * 100}%;opacity:${kept.has(i) ? 1 : 0.28}"></i></div>
        <span style="font:500 13px var(--f-mono)">${fmt(q[i] * 100, 1)}%${counts ? " · sorteado " + fmt(counts[i] / 10, 1) + "%" : ""}</span></div>`).join("");
      R.innerHTML = `<div>candidatos mantidos: <b>${n}</b> de ${TK.length}</div><div>entropia: <b>${fmt(H, 2)} bits</b> (0 = sempre a mesma resposta)</div>
        <div>Temperatura baixa e top-k 1 dão sempre “${TK[ord[0]][0]}”. Temperatura alta espalha a probabilidade. Barras apagadas foram cortadas por top-k ou top-p.</div>`;
    }
    draw(); return draw;
  }});

MODS.push({id: "trilha", grupo: "Machine learning", nome: "Trilha e ferramentas",
  lead: "Uma ordem de estudo que reaproveita a matemática de cada etapa, com a ferramenta típica e um exercício para fazer com dados do seu ambiente.",
  campo: "A graduação treinou o hábito mais importante: formular o problema, modelar, resolver e conferir se o resultado faz sentido no mundo real.",
  dia: "Estudar modelos sem aplicar em algo concreto não fixa. Cada etapa abaixo termina em um exercício que dá para guardar como projeto.",
  python: `# Ambiente mínimo para a trilha
# pip install numpy pandas scikit-learn torch transformers mlflow
import mlflow
with mlflow.start_run():
    mlflow.log_param("modelo", "regressao_linear")
    mlflow.log_metric("rmse", 4.2)          # registre cada experimento`,
  build(stage, panel) {
    const T = [
      ["Regressão linear e logística", "derivadas, matrizes, probabilidade", "scikit-learn, statsmodels", "Prever um indicador do seu negócio e comparar com a média simples."],
      ["Validação e overfitting", "viés e variância, amostragem", "scikit-learn (validação cruzada)", "Separar treino e teste por data, não ao acaso, em dados com tempo."],
      ["Árvores e boosting", "entropia, otimização", "XGBoost, LightGBM, Spark MLlib", "Treinar um boosting em dados tabulares e bater a regressão."],
      ["Redes neurais", "regra da cadeia, gradiente", "PyTorch", "Reproduzir a rede do laboratório e depois treinar uma em dados reais."],
      ["Transformers", "álgebra linear, softmax", "Hugging Face Transformers", "Ler o código de uma camada de atenção e rodar um modelo de embeddings."],
      ["RAG e avaliação", "similaridade, estatística, limiares", "busca vetorial, MLflow", "Montar 50 perguntas com resposta esperada e medir acerto do retriever com intervalo de confiança."],
      ["Guardrails", "classificação, custo dos erros", "classificadores, regras, testes adversariais", "Escolher o limiar pelo custo dos dois erros, como no laboratório."]
    ];
    stage.innerHTML = `<div class="mxwrap"><table class="mx" style="text-align:left;font-family:var(--f-body);font-size:15px"><tr><th>Etapa</th><th>Matemática</th><th>Ferramentas</th><th>Exercício</th></tr>` +
      T.map((r, i) => `<tr style="border-top:1px solid var(--line);vertical-align:top">${r.map((c, j) => `<td style="text-align:left;padding:10px 8px;${j === 0 ? "font-weight:600;" : ""}min-width:${j === 3 ? 220 : 120}px">${i + 1}. ${j === 0 ? c : ""}${j ? c : ""}</td>`).join("")}</tr>`).join("") + `</table></div>`;
    stage.querySelectorAll("tr:not(:first-child) td:not(:first-child)").forEach(td => td.innerHTML = td.innerHTML.replace(/^\d+\.\s*/, ""));
    const R = readout(panel); R.innerHTML = `<div class="cl">Como estudar</div><div>1. Rode o laboratório do tema.</div><div>2. Reproduza em Python com dados sintéticos.</div><div>3. Repita com um conjunto real e registre o resultado.</div>`;
    return () => {};
  }});

/* ---------- cálculo visual ---------- */
const hexRGB = h => { h = h.replace("#", ""); if (h.length === 3) h = [...h].map(c => c + c).join(""); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)); };
function prange(f, a, b) {
  const v = []; for (let i = 0; i <= 300; i++) { const y = f(a + (b - a) * i / 300); if (Number.isFinite(y)) v.push(y); }
  v.sort((p, q) => p - q); if (!v.length) return [-1, 1];
  let lo = v[Math.floor(v.length * .03)], hi = v[Math.floor(v.length * .97)]; if (hi - lo < 1e-9) { lo -= 1; hi += 1; }
  const pad = (hi - lo) * .12; return [lo - pad, hi + pad];
}
function arrow(g, x1, y1, x2, y2, color, w = 2) {
  const a = Math.atan2(y2 - y1, x2 - x1), s = 6 + w; g.strokeStyle = color; g.fillStyle = color; g.lineWidth = w; g.setLineDash([]);
  g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke();
  g.beginPath(); g.moveTo(x2, y2); g.lineTo(x2 - s * Math.cos(a - .45), y2 - s * Math.sin(a - .45)); g.lineTo(x2 - s * Math.cos(a + .45), y2 - s * Math.sin(a + .45)); g.closePath(); g.fill();
}

MODS.push({id: "ideia", grupo: "Cálculo", nome: "A grande ideia do cálculo",
  lead: "Derivar e integrar são operações inversas. Uma taxa (vazão) e um total (volume) contam a mesma história de dois jeitos. Mova o instante e veja os dois gráficos andarem juntos.",
  campo: "O hidrômetro mede a vazão agora. A conta de água cobra o volume acumulado. O pluviômetro registra mm/h, mas a lavoura sente os mm do total da chuva.",
  dia: "Velocímetro e hodômetro. Uma mostra a taxa, o outro soma tudo. O teorema fundamental diz que a inclinação do acumulado em cada instante é a taxa daquele instante.",
  python: `import numpy as np

t = np.linspace(0, 10, 1001); dt = t[1] - t[0]
q = 30 + 10*np.sin(t)                 # vazão em L/min
V = np.cumsum(q) * dt                 # integral: volume acumulado
q_de_volta = np.gradient(V, dt)       # derivada: recupera a vazão`,
  build(stage, panel) {
    const SC = [
      {nome: "Reservatório: vazão e volume", q: t => 30 + 10 * Math.sin(t), V: t => 30 * t - 10 * Math.cos(t) + 10, a: 0, b: 10, xl: "tempo (min)", ql: "vazão q(t) em L/min", Vl: "volume acumulado V(t) em L", u: "L", ur: "L/min", tu: "min"},
      {nome: "Chuva: intensidade e acumulado", q: t => 12 * Math.exp(-t / 2), V: t => 24 * (1 - Math.exp(-t / 2)), a: 0, b: 6, xl: "tempo (h)", ql: "intensidade i(t) em mm/h", Vl: "chuva acumulada em mm", u: "mm", ur: "mm/h", tu: "h"}
    ];
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
      R.innerHTML = `<div class="cl">Em t = ${fmt(t, 2)} ${S.tu}</div><div style="color:var(--curve)">área sombreada em cima: <b>${fmt(S.V(t), 2)} ${S.u}</b></div><div class="ok">altura do gráfico de baixo: <b>${fmt(S.V(t), 2)} ${S.u}</b></div>
        <div class="am">inclinação da tangente embaixo: <b>${fmt(sl, 2)} ${S.ur}</b> = altura da curva de cima</div><div>As duas leituras coincidem em qualquer t: integrar a taxa dá o total, e derivar o total devolve a taxa.</div>`;
    }
    draw(); return draw;
  }});

MODS.push({id: "regras", grupo: "Cálculo", nome: "Regras de derivação",
  lead: "Quase toda derivada que você precisa sai de poucas regras. Escolha duas funções, combine por soma, produto, quociente ou composição, e veja a regra produzir a curva derivada.",
  campo: "Respostas reais são combinações: produtividade vezes preço, uma função de dose dentro de outra de clima, uma razão custo por área. A regra certa evita derivar tudo na unha.",
  dia: "Soma e produto são fáceis. A regra do quociente aparece em razões e médias. A regra da cadeia, função dentro de função, é a mais usada em ciência de dados.",
  python: `import sympy as sp

x = sp.symbols('x')
g, h = sp.sin(x), x**2
print(sp.diff(g*h, x))                # regra do produto
print(sp.diff(g/h, x))                # regra do quociente
print(sp.diff(g.subs(x, h), x))       # cadeia: 2*x*cos(x**2)`,
  build(stage, panel) {
    const LB = [
      ["x", x => x, x => 1, "x", "1"], ["x²", x => x * x, x => 2 * x, "x²", "2x"], ["x³", x => x ** 3, x => 3 * x * x, "x³", "3x²"], ["eˣ", Math.exp, Math.exp, "eˣ", "eˣ"],
      ["sen x", Math.sin, Math.cos, "sen x", "cos x"], ["cos x", Math.cos, x => -Math.sin(x), "cos x", "−sen x"], ["ln(1+x²)", x => Math.log(1 + x * x), x => 2 * x / (1 + x * x), "ln(1+x²)", "2x/(1+x²)"]
    ];
    const OPS = ["Soma: g + h", "Produto: g · h", "Quociente: g / h", "Composição: g(h(x))"], RT = ["(g + h)′ = g′ + h′", "(g·h)′ = g′·h + g·h′", "(g/h)′ = (g′·h − g·h′) / h²", "(g∘h)′ = g′(h(x)) · h′(x)"];
    let gi = 4, hj = 1, op = 1;
    const c1 = canvas(stage, 230), c2 = canvas(stage, 200);
    stage.insertAdjacentHTML("beforeend", `<details open style="margin:10px 6px 4px"><summary class="cl" style="cursor:pointer">Tabela das principais regras</summary><div class="mxwrap"><table class="mx" style="text-align:left;font-size:14px">
      <tr><th style="text-align:left">Regra</th><th style="text-align:left">Fórmula</th><th style="text-align:left">Onde aparece</th></tr>
      <tr><td>constante</td><td>(c)′ = 0</td><td>custo fixo some ao derivar</td></tr><tr><td>potência</td><td>(xⁿ)′ = n·xⁿ⁻¹</td><td>respostas polinomiais, áreas, volumes</td></tr>
      <tr><td>exponencial</td><td>(eˣ)′ = eˣ</td><td>crescimento de pragas, decaimento</td></tr><tr><td>logaritmo</td><td>(ln x)′ = 1/x</td><td>log-verossimilhança, escalas log</td></tr>
      <tr><td>seno e cosseno</td><td>(sen x)′ = cos x · (cos x)′ = −sen x</td><td>sazonalidade, radiação ao longo do dia</td></tr>
      <tr><td>soma</td><td>(g + h)′ = g′ + h′</td><td>perda total = soma das perdas</td></tr><tr><td>produto</td><td>(g·h)′ = g′h + gh′</td><td>receita = preço · quantidade</td></tr>
      <tr><td>quociente</td><td>(g/h)′ = (g′h − gh′)/h²</td><td>razões, médias móveis</td></tr><tr><td>cadeia</td><td>(g∘h)′ = g′(h)·h′</td><td>sigmoide, camadas de rede</td></tr></table></div></details>`);
    const R = readout(panel);
    const sg = sel(panel, "Função g", LB.map(l => l[0]), v => { gi = v; draw(); }), so = sel(panel, "Combinar por", OPS, v => { op = v; draw(); }), sh = sel(panel, "Função h", LB.map(l => l[0]), v => { hj = v; draw(); });
    sg.value = gi; sh.value = hj; so.value = op;
    const xs = ctl(panel, "Ponto x₀", -3, 3, 0.01, 1, v => fmt(v, 2), draw);
    const mk = () => { const G = LB[gi], H = LB[hj];
      if (op === 0) return {f: x => G[1](x) + H[1](x), d: x => G[2](x) + H[2](x)};
      if (op === 1) return {f: x => G[1](x) * H[1](x), d: x => G[2](x) * H[1](x) + G[1](x) * H[2](x)};
      if (op === 2) return {f: x => G[1](x) / H[1](x), d: x => (G[2](x) * H[1](x) - G[1](x) * H[2](x)) / H[1](x) ** 2};
      return {f: x => G[1](H[1](x)), d: x => G[2](H[1](x)) * H[2](x)}; };
    function draw() {
      const G = LB[gi], H = LB[hj], F = mk(), x0 = xs.get(), y0 = F.f(x0), m = F.d(x0), [fl, fh] = prange(F.f, -3, 3), [dl, dh] = prange(F.d, -3, 3);
      const p = plane(c1, -3, 3, fl, fh, "x", "f(x)"); p.curve(F.f, css("--curve")); p.line(-3, y0 - m * (x0 + 3), 3, y0 + m * (3 - x0), css("--good"), 1.5, [6, 4]); p.dot(x0, y0, css("--good"));
      const q = plane(c2, -3, 3, dl, dh, "x", "f′(x) pela regra"); q.curve(F.d, css("--amber")); q.line(-3, 0, 3, 0, css("--axis"), 1, [4, 4]); q.line(x0, 0, x0, m, css("--good"), 1.5, [4, 4]); q.dot(x0, m, css("--good"));
      const hx = H[1](x0), gx = G[1](x0), n = v => fmt(v, 3), e = 1e-5, nd = (F.f(x0 + e) - F.f(x0 - e)) / (2 * e);
      const sub = op === 0 ? `${n(G[2](x0))} + ${n(H[2](x0))}` : op === 1 ? `${n(G[2](x0))}·${n(hx)} + ${n(gx)}·${n(H[2](x0))}` : op === 2 ? `(${n(G[2](x0))}·${n(hx)} − ${n(gx)}·${n(H[2](x0))}) / ${n(hx)}²` : `g′(${n(hx)})·h′(x₀) = ${n(G[2](hx))}·${n(H[2](x0))}`;
      R.innerHTML = `<div class="ok"><b>${RT[op]}</b></div><div>g = ${G[3]} → g′ = ${G[4]}</div><div>h = ${H[3]} → h′ = ${H[4]}</div><div>em x₀ = ${fmt(x0, 2)}: ${sub}</div>
        <div>regra: <b>${n(m)}</b></div><div>conferência numérica (diferença finita): <b>${n(nd)}</b></div><div>Em cima, a tangente com essa inclinação. Embaixo, a curva derivada inteira.</div>`;
    }
    draw(); return draw;
  }});

MODS.push({id: "gradiente", grupo: "Cálculo", nome: "Gradientes e curvas de nível",
  lead: "Com duas variáveis, a derivada vira um vetor: o gradiente aponta para onde a função sobe mais rápido e seu tamanho diz o quão íngreme é. Clique no mapa para escolher o ponto.",
  campo: "Num talhão, z(x, y) é a altitude. O gradiente é a ladeira: aponta morro acima, e a água escorre no sentido contrário. A declividade é o tamanho do gradiente, e é o que comanda erosão e terraceamento.",
  dia: "As cores são curvas de nível: cada faixa é um valor da função. O gradiente é sempre perpendicular a elas. Descer contra o gradiente é o gradiente descendente que treina modelos.",
  python: `import numpy as np

f = lambda p: 0.5*p[0]**2 + 4*p[1]**2
grad = lambda p: np.array([p[0], 8*p[1]])      # [df/dx, df/dy]
p = np.array([2.5, 1.2])
for _ in range(50):
    p = p - 0.1*grad(p)                         # desce contra o gradiente
print(p, f(p))`,
  build(stage, panel) {
    const SF = [
      {nome: "Tigela (perda simples)", f: (x, y) => x * x + y * y, g: (x, y) => [2 * x, 2 * y], R: 3, st: [2.2, 1.6], lr: 0.1, gs: 4, t: "Mínimo único no centro. O gradiente aponta para fora; descer leva ao centro em linha reta."},
      {nome: "Vale estreito (perda mal condicionada)", f: (x, y) => 0.5 * x * x + 4 * y * y, g: (x, y) => [x, 8 * y], R: 3, st: [2.5, 1.2], lr: 0.1, gs: 6, t: "O gradiente não aponta para o mínimo e a descida faz zigue-zague. Suba a taxa até 0,25 e veja a oscilação crescer."},
      {nome: "Sela", f: (x, y) => x * x - y * y, g: (x, y) => [2 * x, -2 * y], R: 3, st: [1.5, 0.2], lr: 0.1, gs: 4, t: "Sobe num eixo e desce no outro. No centro o gradiente é zero, mas não é mínimo."},
      {nome: "Relevo de um talhão (altitude)", f: (x, y) => 3 * Math.sin(x) * Math.cos(y / 1.3) + 0.3 * x, g: (x, y) => [3 * Math.cos(x) * Math.cos(y / 1.3) + 0.3, -(3 / 1.3) * Math.sin(x) * Math.sin(y / 1.3)], R: 4, st: [-1, 1.5], lr: 0.15, gs: 2.5, t: "Cores escuras são os altos. A trilha de descida é o caminho que a água escorre. Onde as faixas ficam juntas, o terreno é mais íngreme."},
      {nome: "Dois vales (Himmelblau)", f: (x, y) => (x * x + y - 11) ** 2 + (x + y * y - 7) ** 2, g: (x, y) => [4 * x * (x * x + y - 11) + 2 * (x + y * y - 7), 2 * (x * x + y - 11) + 4 * y * (x + y * y - 7)], R: 5, st: [0, 0], lr: 0.01, gs: 80, t: "Quatro mínimos. Para onde a descida vai depende de onde começa, como no treino de redes neurais."}
    ];
    let k = 0, pt = SF[0].st.slice(), trail = [pt.slice()], field = true, cache = null, ckey = "", last = null, drag = false;
    const c = canvas(stage, 440); c.style.maxWidth = "520px"; c.style.margin = "0 auto"; c.style.touchAction = "none"; const R = readout(panel);
    const s = sel(panel, "Superfície", SF.map(x => x.nome), v => { k = v; reset(); }); panel.insertBefore(s.parentElement, panel.firstChild);
    const th = ctl(panel, "Direção u (ângulo)", 0, 360, 1, 45, v => v + "°", draw), lr = ctl(panel, "Taxa de aprendizado", 0.005, 0.3, 0.005, 0.1, v => fmt(v, 3), () => {});
    const r1 = row(panel), r2 = row(panel);
    btn(r1, "Descer 1 passo", () => go(1)); btn(r1, "Descer 25 passos", () => go(25));
    btn(r2, "Alinhar u ao gradiente", () => { const g = SF[k].g(pt[0], pt[1]); th.set(Math.round((Math.atan2(g[1], g[0]) * 180 / Math.PI + 360) % 360)); draw(); }, true);
    const fb = btn(r2, "Setas: ligadas", () => { field = !field; fb.textContent = "Setas: " + (field ? "ligadas" : "desligadas"); draw(); }, true); btn(r2, "Limpar trilha", () => { trail = [pt.slice()]; draw(); }, true);
    function reset() { pt = SF[k].st.slice(); trail = [pt.slice()]; lr.set(SF[k].lr); cache = null; draw(); }
    function go(n) { const S = SF[k]; for (let i = 0; i < n; i++) { const g = S.g(pt[0], pt[1]); pt = [clamp(pt[0] - lr.get() * g[0], -S.R, S.R), clamp(pt[1] - lr.get() * g[1], -S.R, S.R)]; trail.push(pt.slice()); } draw(); }
    const heat = heatImage;
    const mv = e => { const S = SF[k], b = c.getBoundingClientRect(), pw = last.w - last.m.l - last.m.r, ph = last.h - last.m.t - last.m.b;
      pt = [clamp(-S.R + (e.clientX - b.left - last.m.l) / pw * 2 * S.R, -S.R, S.R), clamp(S.R - (e.clientY - b.top - last.m.t) / ph * 2 * S.R, -S.R, S.R)]; trail = [pt.slice()]; draw(); };
    c.addEventListener("pointerdown", e => { drag = true; c.setPointerCapture(e.pointerId); mv(e); }); c.addEventListener("pointermove", e => { if (drag) mv(e); }); c.addEventListener("pointerup", () => { drag = false; });
    function draw() {
      const S = SF[k]; c.style.height = Math.max(240, c.clientWidth - 14) + "px";
      const p = plane(c, -S.R, S.R, -S.R, S.R, "x", "y"), g = p.g, pw = p.w - p.m.l - p.m.r, ph = p.h - p.m.t - p.m.b; last = p;
      const key = k + css("--curve") + css("--panel"); if (!cache || key !== ckey) { cache = heat(S); ckey = key; }
      g.drawImage(cache, p.m.l, p.m.t, pw, ph); g.strokeStyle = css("--axis"); g.lineWidth = 1; g.strokeRect(p.m.l, p.m.t, pw, ph);
      if (field) for (let i = 0; i < 11; i++) for (let j = 0; j < 11; j++) { const x = -S.R + (i + .5) * 2 * S.R / 11, y = -S.R + (j + .5) * 2 * S.R / 11, gr = S.g(x, y), mg = Math.hypot(gr[0], gr[1]); if (mg < 1e-9) continue;
        const ax = p.X(x), ay = p.Y(y), dx = gr[0] / mg * 8, dy = -gr[1] / mg * 8; g.globalAlpha = 0.55; arrow(g, ax - dx, ay - dy, ax + dx, ay + dy, css("--ink"), 1.2); g.globalAlpha = 1; }
      if (trail.length > 1) { g.strokeStyle = css("--ink"); g.lineWidth = 2; g.beginPath(); trail.forEach(([x, y], i) => i ? g.lineTo(p.X(x), p.Y(y)) : g.moveTo(p.X(x), p.Y(y))); g.stroke(); trail.forEach(([x, y]) => { g.fillStyle = css("--ink"); g.beginPath(); g.arc(p.X(x), p.Y(y), 2.5, 0, 7); g.fill(); }); }
      const gr = S.g(pt[0], pt[1]), mg = Math.hypot(gr[0], gr[1]), px = p.X(pt[0]), py = p.Y(pt[1]), ang = th.get() * Math.PI / 180, ux = Math.cos(ang), uy = Math.sin(ang);
      if (mg > 1e-9) { const len = 26 + 70 * Math.tanh(mg / S.gs); arrow(g, px, py, px + gr[0] / mg * len, py - gr[1] / mg * len, css("--good"), 3.5); }
      arrow(g, px, py, px + ux * 52, py - uy * 52, css("--amber"), 2.5); p.dot(pt[0], pt[1], css("--panel"), 6); p.dot(pt[0], pt[1], css("--ink"), 3);
      const D = gr[0] * ux + gr[1] * uy, ga = (Math.atan2(gr[1], gr[0]) * 180 / Math.PI + 360) % 360;
      R.innerHTML = `<div class="ok">gradiente ∇f = (<b>${fmt(gr[0], 2)}</b>; <b>${fmt(gr[1], 2)}</b>)</div><div>tamanho |∇f| = <b>${fmt(mg, 2)}</b> · direção <b>${fmt(ga, 0)}°</b></div>
        <div class="am">derivada na direção u: ∇f·u = <b>${fmt(D, 2)}</b> ${mg < 1e-6 ? "" : D > 0.05 ? "(subindo)" : D < -0.05 ? "(descendo)" : "(seguindo a curva de nível)"}</div>
        <div>f(x, y) = <b>${fmt(S.f(pt[0], pt[1]), 2)}</b>${mg < 1e-3 ? " · gradiente ≈ 0: ponto crítico" : ""}</div><div>${S.t}</div>
        <div>Seta verde = gradiente (sobe mais rápido). Seta laranja = direção u. Gire u: o valor é máximo quando alinha com a verde e zero quando é perpendicular.</div>`;
    }
    pt = SF[0].st.slice(); draw(); return draw;
  }});

/* ---------- mais cálculo visual ---------- */
function heatImage(S) {
  const res = 180, v = new Float64Array(res * res); let lo = Infinity, hi = -Infinity;
  for (let j = 0; j < res; j++) for (let i = 0; i < res; i++) { const val = S.f(-S.R + (i + .5) * 2 * S.R / res, S.R - (j + .5) * 2 * S.R / res); v[j * res + i] = val; lo = Math.min(lo, val); hi = Math.max(hi, val); }
  const A = hexRGB(css("--panel")), B = hexRGB(css("--curve")), E = hexRGB(css("--ink")), img = new ImageData(res, res), nz = idx => Math.pow((v[idx] - lo) / (hi - lo || 1), 0.55), band = idx => Math.floor(nz(idx) * 14);
  for (let j = 0; j < res; j++) for (let i = 0; i < res; i++) {
    const idx = j * res + i, m = 0.12 + 0.78 * nz(idx), edge = (i < res - 1 && band(idx + 1) !== band(idx)) || (j < res - 1 && band(idx + res) !== band(idx));
    for (let q = 0; q < 3; q++) { let col = A[q] + (B[q] - A[q]) * m; if (edge) col += (E[q] - col) * 0.45; img.data[idx * 4 + q] = col; } img.data[idx * 4 + 3] = 255;
  }
  const oc = document.createElement("canvas"); oc.width = oc.height = res; oc.getContext("2d").putImageData(img, 0, 0); return oc;
}
const fact = n => n <= 1 ? 1 : n * fact(n - 1);

MODS.push({id: "taylor", grupo: "Cálculo", nome: "Séries de Taylor",
  lead: "Perto de um ponto, uma função suave parece um polinômio. Com 1 termo é a tangente, com 2 é uma parábola que acompanha a curvatura, e cada termo novo estende a faixa em que a aproximação vale.",
  campo: "Em torno do ponto de operação, a resposta da cultura a uma pequena mudança de dose ou de temperatura cabe numa reta ou numa parábola. Por isso modelos locais servem para ajuste fino e falham ao extrapolar.",
  dia: "É como calculadoras e bibliotecas calculam sen, exp e log. A tangente (ordem 1) e a parábola (ordem 2) sustentam o método de Newton e as otimizações de segunda ordem.",
  python: `import sympy as sp

x = sp.symbols('x')
print(sp.series(sp.sin(x), x, 0, 8))    # x - x**3/6 + x**5/120 - x**7/5040 + O(x**8)
print(sp.series(sp.exp(x), x, 1, 4))    # expansão em torno de x = 1`,
  build(stage, panel) {
    const sc = {a0: -4.2, a1: 4.2, x0: -7, x1: 7, y0: -2.2, y1: 2.2};
    const FS = [
      {nome: "sen x", f: Math.sin, dn: (n, a) => [Math.sin(a), Math.cos(a), -Math.sin(a), -Math.cos(a)][n % 4], ...sc},
      {nome: "cos x", f: Math.cos, dn: (n, a) => [Math.cos(a), -Math.sin(a), -Math.cos(a), Math.sin(a)][n % 4], ...sc},
      {nome: "eˣ", f: Math.exp, dn: (n, a) => Math.exp(a), a0: -2, a1: 2, x0: -4, x1: 4, y0: -2, y1: 20},
      {nome: "ln(1 + x)", f: x => Math.log(1 + x), dn: (n, a) => n === 0 ? Math.log(1 + a) : (n % 2 ? 1 : -1) * fact(n - 1) / Math.pow(1 + a, n), a0: 0, a1: 3, x0: -0.95, x1: 5, y0: -3, y1: 2.5}
    ];
    let k = 0; const c = canvas(stage, 360); const R = readout(panel);
    const cen = a => (a - FS[k].a0) / (FS[k].a1 - FS[k].a0), A = () => FS[k].a0 + as.get() * (FS[k].a1 - FS[k].a0), XT = () => FS[k].x0 + xt.get() * (FS[k].x1 - FS[k].x0);
    const s = sel(panel, "Função", FS.map(f => f.nome), v => { k = v; as.set(cen(0)); xt.set(clamp((1 - FS[k].x0) / (FS[k].x1 - FS[k].x0), 0, 1)); draw(); }); panel.insertBefore(s.parentElement, panel.firstChild);
    const ns = ctl(panel, "Ordem do polinômio", 0, 12, 1, 3, v => v, draw), as = ctl(panel, "Centro a", 0, 1, 0.005, 0.5, v => fmt(FS[k].a0 + v * (FS[k].a1 - FS[k].a0), 2), draw), xt = ctl(panel, "Ponto de teste x", 0, 1, 0.005, 0.8, v => fmt(FS[k].x0 + v * (FS[k].x1 - FS[k].x0), 2), draw);
    const P = (F, n, a, x) => { let s = 0; for (let j = 0; j <= n; j++) s += F.dn(j, a) / fact(j) * (x - a) ** j; return s; };
    function draw() {
      const F = FS[k], n = ns.get(), a = A(), x = XT(), p = plane(c, F.x0, F.x1, F.y0, F.y1, "x", "y");
      p.curve(F.f, css("--curve"), 3); p.curve(t => P(F, n, a, t), css("--amber"), 2.5); p.dot(a, F.f(a), css("--good"), 6);
      p.line(x, F.y0, x, F.y1, css("--muted"), 1, [4, 4]); p.dot(x, F.f(x), css("--curve"), 4); p.dot(x, P(F, n, a, x), css("--amber"), 4);
      const co = Array.from({length: Math.min(n, 4) + 1}, (_, j) => `${fmt(F.dn(j, a) / fact(j), 4)}${j ? "·(x−a)" + (j > 1 ? "^" + j : "") : ""}`).join(" + ") + (n > 4 ? " + …" : "");
      const fx = F.f(x), px = P(F, n, a, x), nome = n === 0 ? "constante" : n === 1 ? "a tangente em a" : n === 2 ? "a parábola que acompanha a curvatura" : "polinômio de ordem " + n;
      R.innerHTML = `<div class="am">P${n === 1 ? "₁" : n === 2 ? "₂" : "ₙ"}(x) = ${co}</div><div>ordem ${n}: ${nome}</div><div>em x = ${fmt(x, 2)}: f = <b>${fmt(fx, 4)}</b> · P = <b>${fmt(px, 4)}</b></div>
        <div class="${Math.abs(fx - px) < 0.01 * Math.max(1, Math.abs(fx)) ? "ok" : "no"}">erro absoluto: <b>${fmt(Math.abs(fx - px), 5)}</b></div><div>Azul = função, laranja = polinômio, ponto verde = centro. Longe do centro a aproximação se desfaz; mais termos alargam a faixa boa.${k === 3 ? " O ln(1+x) só converge perto do centro: a série tem raio limitado." : ""}</div>`;
    }
    draw(); return draw;
  }});

MODS.push({id: "newton", grupo: "Cálculo", nome: "Método de Newton",
  lead: "Para achar onde uma função vale zero, trace a tangente e veja onde ela cruza o eixo. Repita. Perto da raiz, cada passo costuma dobrar os dígitos corretos.",
  campo: "Achar a dose em que o lucro marginal zera, o pH de equilíbrio, a vazão em que a pressão no canal bate o limite ou a taxa de juros de um financiamento. Equações sem fórmula fechada se resolvem assim.",
  dia: "É o algoritmo por trás da raiz quadrada em calculadoras e de muitos solvers. Aplicado à derivada vira otimização de segunda ordem. Também mostra quando um algoritmo falha: tangente horizontal e chute inicial ruim.",
  python: `f  = lambda x: x**2 - 2
df = lambda x: 2*x
x = 1.0
for i in range(6):
    x = x - f(x)/df(x)              # passo de Newton
    print(i, x)                     # 1.5, 1.4167, 1.41422, ...`,
  build(stage, panel) {
    const FN = [
      {nome: "x² − 2 (raiz de 2)", f: x => x * x - 2, d: x => 2 * x, a: -3, b: 3, y0: -4, y1: 8, x0: 1, roots: [-Math.SQRT2, Math.SQRT2]},
      {nome: "x³ − 2x − 5", f: x => x ** 3 - 2 * x - 5, d: x => 3 * x * x - 2, a: -3, b: 4, y0: -20, y1: 40, x0: 3, roots: [2.0945514815]},
      {nome: "cos x − x", f: x => Math.cos(x) - x, d: x => -Math.sin(x) - 1, a: -2, b: 3, y0: -4, y1: 2.5, x0: 2, roots: [0.7390851332]},
      {nome: "eˣ − 3x (duas raízes)", f: x => Math.exp(x) - 3 * x, d: x => Math.exp(x) - 3, a: -1, b: 3, y0: -2, y1: 8, x0: 0, roots: [0.6190612867, 1.5121345517]}
    ];
    let k = 0, xs = [FN[0].x0]; const c = canvas(stage, 360); const R = readout(panel);
    const s = sel(panel, "Equação f(x) = 0", FN.map(f => f.nome), v => { k = v; reset(FN[k].x0); }); panel.insertBefore(s.parentElement, panel.firstChild);
    const x0s = ctl(panel, "Chute inicial x₀", 0, 1, 0.005, 0.8, v => fmt(FN[k].a + v * (FN[k].b - FN[k].a), 2), v => reset(FN[k].a + v * (FN[k].b - FN[k].a)));
    function reset(x) { xs = [x]; x0s.set(clamp((x - FN[k].a) / (FN[k].b - FN[k].a), 0, 1)); draw(); }
    function step(n) { const F = FN[k]; for (let i = 0; i < n; i++) { const x = xs[xs.length - 1], d = F.d(x); if (Math.abs(d) < 1e-9 || Math.abs(x) > 1e6) break; xs.push(x - F.f(x) / d); } draw(); }
    const r = row(panel); btn(r, "Próximo passo", () => step(1)); btn(r, "Rodar 5", () => step(5), true); btn(r, "Reiniciar", () => reset(FN[k].x0), true);
    function draw() {
      const F = FN[k], p = plane(c, F.a, F.b, F.y0, F.y1, "x", "f(x)"); p.curve(F.f, css("--curve"), 3);
      for (let i = 0; i < xs.length; i++) { const x = xs[i], y = F.f(x), d = F.d(x), last = i === xs.length - 1;
        p.line(x, 0, x, y, css("--muted"), 1, [3, 3]);
        if (Math.abs(d) > 1e-9) { const nx = x - y / d; p.line(x, y, nx, 0, css("--amber"), last ? 2.5 : 1.2, last ? [] : [5, 4]); }
        p.dot(x, 0, last ? css("--amber") : css("--muted"), last ? 6 : 3.5); }
      F.roots.forEach(rt => p.dot(rt, 0, css("--good"), 4, true));
      const x = xs[xs.length - 1], d = F.d(x), err = Math.min(...F.roots.map(rt => Math.abs(x - rt)));
      R.innerHTML = `<div>passos: <b>${xs.length - 1}</b> · x = <b>${fmt(x, 8)}</b></div><div>f(x) = <b>${fmt(F.f(x), 8)}</b> · erro até a raiz ≈ <b>${err < 1e-12 ? "0" : err.toExponential(1)}</b></div>` +
        (Math.abs(d) < 1e-9 ? `<div class="no"><b>Tangente horizontal:</b> ela nunca cruza o eixo. Mude o chute inicial.</div>` : `<div>próximo x: <b>${fmt(x - F.f(x) / d, 8)}</b> (onde a tangente cruza o eixo)</div>`) +
        `<div>Círculos verdes = raízes. Observe o erro: perto da raiz ele cai de forma muito mais rápida que a cada passo anterior.${k === 3 ? " Aqui o chute decide de qual raiz você chega perto; em x = ln 3 a tangente é horizontal." : ""}</div>`;
    }
    draw(); return draw;
  }});

MODS.push({id: "otimizadores", grupo: "Machine learning", nome: "Otimizadores: GD, momento e Adam",
  lead: "Três jeitos de descer a mesma superfície a partir do mesmo ponto. O gradiente puro segue a ladeira, o momento acumula velocidade e o Adam ajusta o passo de cada eixo.",
  campo: "É o problema de calibrar um modelo de resposta da cultura com muitos parâmetros: a superfície do erro tem vales estreitos, e a forma de descer decide se o ajuste converge em segundos ou nunca.",
  dia: "Cada trilha é um treino. O vale estreito mostra por que o gradiente puro zigue-zagueia. A banana de Rosenbrock é o teste clássico de otimizadores. Clique no mapa para mudar o ponto de partida.",
  python: `import numpy as np

grad = lambda p: np.array([p[0], 8*p[1]])        # vale estreito
p = v = m = s = np.zeros(2); p = np.array([2.5, 1.5])
for t in range(1, 101):
    g = grad(p)
    m = 0.9*m + 0.1*g                              # média móvel do gradiente
    s = 0.999*s + 0.001*g**2                       # média móvel do g²
    p = p - 0.1 * (m/(1-0.9**t)) / (np.sqrt(s/(1-0.999**t)) + 1e-8)   # Adam`,
  build(stage, panel) {
    const SO = [
      {nome: "Vale estreito", f: (x, y) => 0.5 * x * x + 4 * y * y, g: (x, y) => [x, 8 * y], R: 3, st: [2.5, 1.5], lr: 0.1, lra: 0.1},
      {nome: "Banana de Rosenbrock", f: (x, y) => (1 - x) ** 2 + 100 * (y - x * x) ** 2, g: (x, y) => [-2 * (1 - x) - 400 * x * (y - x * x), 200 * (y - x * x)], R: 2, st: [-1.2, 1], lr: 0.001, lra: 0.05},
      {nome: "Dois vales (Himmelblau)", f: (x, y) => (x * x + y - 11) ** 2 + (x + y * y - 7) ** 2, g: (x, y) => [4 * x * (x * x + y - 11) + 2 * (x + y * y - 7), 2 * (x * x + y - 11) + 4 * y * (x + y * y - 7)], R: 5, st: [0, 0], lr: 0.01, lra: 0.3}
    ];
    const OP = [["Gradiente puro", "--ink"], ["Momento", "--amber"], ["Adam", "--good"]];
    let k = 0, st = SO[0].st.slice(), opts = [], cache = null, ckey = "", last = null, drag = false;
    const c = canvas(stage, 440); c.style.maxWidth = "520px"; c.style.margin = "0 auto"; c.style.touchAction = "none"; const R = readout(panel);
    const s = sel(panel, "Superfície", SO.map(x => x.nome), v => { k = v; st = SO[k].st.slice(); lg.set(SO[k].lr); la.set(SO[k].lra); cache = null; reset(); }); panel.insertBefore(s.parentElement, panel.firstChild);
    const lg = ctl(panel, "Taxa do gradiente e do momento", 0.001, 0.3, 0.001, 0.1, v => fmt(v, 3), () => {}), la = ctl(panel, "Taxa do Adam", 0.01, 0.5, 0.01, 0.1, v => fmt(v, 2), () => {});
    const r = row(panel); btn(r, "1 passo", () => go(1)); btn(r, "25 passos", () => go(25)); btn(r, "100 passos", () => go(100)); btn(r, "Reiniciar", reset, true);
    function reset() { opts = OP.map(() => ({p: st.slice(), v: [0, 0], m: [0, 0], s: [0, 0], t: 0, n: 0, trail: [st.slice()]})); draw(); }
    function go(n) {
      const S = SO[k];
      for (let i = 0; i < n; i++) opts.forEach((o, q) => {
        const g = S.g(o.p[0], o.p[1]); let d;
        if (q === 0) d = [lg.get() * g[0], lg.get() * g[1]];
        else if (q === 1) { o.v = [0.9 * o.v[0] + g[0], 0.9 * o.v[1] + g[1]]; d = [lg.get() * o.v[0], lg.get() * o.v[1]]; }
        else { o.t++; d = [0, 1].map(j => { o.m[j] = 0.9 * o.m[j] + 0.1 * g[j]; o.s[j] = 0.999 * o.s[j] + 0.001 * g[j] * g[j]; return la.get() * (o.m[j] / (1 - 0.9 ** o.t)) / (Math.sqrt(o.s[j] / (1 - 0.999 ** o.t)) + 1e-8); }); }
        o.p = [clamp(o.p[0] - d[0], -S.R, S.R), clamp(o.p[1] - d[1], -S.R, S.R)]; o.n++; if (o.trail.length < 3000) o.trail.push(o.p.slice());
      });
      draw();
    }
    const mv = e => { const S = SO[k], b = c.getBoundingClientRect(), pw = last.w - last.m.l - last.m.r, ph = last.h - last.m.t - last.m.b;
      st = [clamp(-S.R + (e.clientX - b.left - last.m.l) / pw * 2 * S.R, -S.R, S.R), clamp(S.R - (e.clientY - b.top - last.m.t) / ph * 2 * S.R, -S.R, S.R)]; reset(); };
    c.addEventListener("pointerdown", e => { drag = true; c.setPointerCapture(e.pointerId); mv(e); }); c.addEventListener("pointermove", e => { if (drag) mv(e); }); c.addEventListener("pointerup", () => { drag = false; });
    function hess(S, x, y) { const e = 1e-4, a = S.g(x + e, y), b = S.g(x - e, y), cc = S.g(x, y + e), d = S.g(x, y - e), hxx = (a[0] - b[0]) / (2 * e), hyy = (cc[1] - d[1]) / (2 * e), hxy = ((cc[0] - d[0]) + (a[1] - b[1])) / (4 * e), tr = hxx + hyy, ds = Math.sqrt(Math.max(0, tr * tr / 4 - (hxx * hyy - hxy * hxy))); return [tr / 2 + ds, tr / 2 - ds]; }
    function draw() {
      const S = SO[k]; c.style.height = Math.max(240, c.clientWidth - 14) + "px";
      const p = plane(c, -S.R, S.R, -S.R, S.R, "x", "y"), g = p.g, pw = p.w - p.m.l - p.m.r, ph = p.h - p.m.t - p.m.b; last = p;
      const key = k + css("--curve") + css("--panel"); if (!cache || key !== ckey) { cache = heatImage(S); ckey = key; }
      g.drawImage(cache, p.m.l, p.m.t, pw, ph); g.strokeStyle = css("--axis"); g.lineWidth = 1; g.strokeRect(p.m.l, p.m.t, pw, ph);
      opts.forEach((o, q) => { const col = css(OP[q][1]); if (o.trail.length > 1) { g.strokeStyle = col; g.lineWidth = 2; g.beginPath(); o.trail.forEach(([x, y], i) => i ? g.lineTo(p.X(x), p.Y(y)) : g.moveTo(p.X(x), p.Y(y))); g.stroke(); } p.dot(o.p[0], o.p[1], col, 5); });
      p.dot(st[0], st[1], css("--panel"), 6, true);
      const ad = opts[2].p, [l1, l2] = hess(S, ad[0], ad[1]), kind = l1 > 1e-6 && l2 > 1e-6 ? "mínimo local (curvatura positiva nos dois eixos)" : l1 < -1e-6 && l2 < -1e-6 ? "máximo local" : l2 < -1e-6 ? "sela (sobe num eixo, desce no outro)" : "região plana ou quase singular";
      R.innerHTML = OP.map(([nm, col], q) => { const o = opts[q], gr = S.g(o.p[0], o.p[1]); return `<div style="color:var(${col})"><b>${nm}</b>: ${o.n} passos · f = ${fmt(S.f(o.p[0], o.p[1]), 3)} · |∇f| = ${fmt(Math.hypot(gr[0], gr[1]), 3)}</div>`; }).join("") +
        `<div class="cl">Hessiano no ponto do Adam</div><div>autovalores: <b>${fmt(l1, 2)}</b> e <b>${fmt(l2, 2)}</b></div><div>${kind}${l2 > 1e-6 ? " · número de condição: <b>" + fmt(l1 / l2, 1) + "</b>" : ""}</div>
        <div>Condição alta significa vale muito mais curvo num eixo que no outro: é o que faz o gradiente puro zigue-zaguear.</div>`;
    }
    reset(); return draw;
  }});

/* ---------- ligação com o trabalho atual ---------- */
const IA = {
  funcao: "Um modelo de ML é uma função aprendida, f(entrada; parâmetros), e um endpoint de API também é uma função. Entender domínio e extrapolação explica por que um modelo erra fora do que viu no treino, o chamado drift.",
  limite: "Convergência de treino, tolerância ε, estabilidade numérica (overflow no softmax, log de zero) e o que acontece com latência e custo quando o volume cresce sem parar em um pipeline.",
  derivada: "Backpropagation é a regra da cadeia aplicada camada por camada, e os otimizadores (SGD, Adam) usam essas derivadas. Em séries temporais de métricas, a taxa de variação ajuda a detectar anomalias.",
  maxmin: "Treinar é minimizar uma função de perda. A mesma lógica acha o ponto ideal entre custo e qualidade (tamanho de chunk, tokens, temperatura) e o limiar de um guardrail, entre falso positivo e falso negativo.",
  integral: "Probabilidade é área sob uma densidade, e a AUC-ROC é uma integral. Também aparece em métricas acumuladas em janelas de streaming e no custo total de tokens ou de computação a partir de uma taxa de consumo.",
  multiplas: "Distribuições conjuntas e marginalização são somas sobre várias variáveis. Quando a integral não tem fórmula fechada, métodos de Monte Carlo fazem a soma por amostragem, como em simulações e inferência bayesiana.",
  matrizes: "Embeddings são vetores, uma camada de rede é A·x + b, e PCA e SVD reduzem dimensão. Adaptadores como LoRA aproximam as matrizes de pesos com matrizes menores.",
  estatistica: "Avaliar prompts, RAG e guardrails com amostras pede intervalo de confiança da taxa de acerto, teste A/B entre versões e tamanho adequado do conjunto de avaliação. Poucos exemplos geram conclusões frágeis.",
  jogos: "Atacante e defensor em prompt injection, sistemas multiagente, leilões de anúncio e preço de APIs. Redes generativas adversariais são um jogo entre dois modelos.",
  regressao: "A regressão linear é o baseline de qualquer problema tabular: se um modelo complexo não a supera, algo está errado. Tanto o scikit-learn quanto o Spark MLlib implementam esse ajuste, e o MLflow registra os parâmetros e as métricas dos experimentos.",
  embeddings: "É a base do RAG: documentos e pergunta viram vetores e o retriever devolve os mais próximos. A métrica deve seguir a do modelo de embedding, e vetores normalizados fazem cosseno e produto escalar darem o mesmo ranking.",
  atencao: "Cada bloco de um Transformer repete este mecanismo em várias cabeças. O custo cresce com o quadrado do tamanho do contexto, e o softmax com temperatura reaparece na amostragem de tokens e na calibração de scores."
};
Object.assign(IA, {
  overfit: "Em pipelines de dados, vazamento entre treino e teste gera métricas bonitas e modelos ruins em produção. A validação deve imitar o uso real, por exemplo separando por data em vez de sortear linhas.",
  logistica: "Guardrails, classificadores de intenção e filtros de qualidade são classificadores com limiar. O limiar certo vem do custo dos dois erros e da taxa real de casos ruins, não de 0,5 por padrão.",
  rede: "Um LLM é uma rede enormemente maior, treinada com o mesmo laço: passo adiante, perda, passo atrás, atualização. Entender o laço pequeno ajuda a depurar treino, ajuste fino e taxa de aprendizado.",
  token: "Temperatura, top-k e top-p são os parâmetros que você ajusta nas chamadas de API de um LLM. Temperatura baixa dá respostas mais repetíveis, útil em extração e classificação. Alta dá variedade.",
  trilha: "Use esta ordem como roteiro: cada etapa reaproveita a matemática da anterior e tem um exercício com dados do seu ambiente."
});
Object.assign(IA, {
  ideia: "No mundo dos dados, diff e cumsum (pandas, funções de janela no Spark) são a versão discreta da derivada e da integral. A taxa e o acumulado de uma métrica de streaming formam esse mesmo par.",
  regras: "A regra da cadeia é a que mais pesa: backpropagation é a regra da cadeia aplicada camada por camada. O PyTorch calcula essas derivadas sozinho (autograd), mas saber a regra ajuda a depurar gradientes que somem ou explodem.",
  gradiente: "Treinar um modelo é descer a superfície da perda seguindo o gradiente. Taxa grande demais oscila, vale estreito faz zigue-zague (por isso existem momento e Adam) e pontos de sela são comuns em redes grandes."
});
Object.assign(IA, {
  taylor: "A aproximação de primeira ordem (tangente) é o que o gradiente descendente usa, e a de segunda ordem (parábola, via Hessiano) é a base de Newton e L-BFGS. Localmente tudo é quase linear, por isso passos pequenos são seguros.",
  newton: "A mesma ideia resolve equações em solvers numéricos, na calibração de modelos e no cálculo de TIR. Como toda rotina iterativa de produção, precisa de critério de parada e de tratamento dos casos em que falha.",
  otimizadores: "Adam, e sua variante AdamW, é o otimizador mais comum no treino e no ajuste fino de redes e LLMs. Os sintomas ficam legíveis: perda oscilando indica taxa alta, treino lento em vale estreito indica mau condicionamento, e platôs lembram selas."
});
const ID_ORDER = ["ideia", "funcao", "limite", "derivada", "regras", "taylor", "maxmin", "newton", "integral", "multiplas", "gradiente", "matrizes", "estatistica", "regressao", "otimizadores", "overfit", "logistica", "rede", "embeddings", "atencao", "token", "trilha", "jogos"];
MODS.sort((a, b) => ID_ORDER.indexOf(a.id) - ID_ORDER.indexOf(b.id));

/* ---------- navegação ---------- */
let redraw = () => {}, curMod = null;
function show(id) {
  if (onLeave) { onLeave(); onLeave = null; }
  const m = MODS.find(x => x.id === id) || MODS[0]; curMod = m; N = 0;
  try { localStorage.setItem("mc-mod", m.id); } catch (e) {}
  document.querySelectorAll("#nav button").forEach(b => b.setAttribute("aria-current", b.dataset.id === m.id));
  const main = $("#main");
  main.innerHTML = `<div><p class="eyebrow">${m.grupo}</p><h2>${m.nome}</h2><p class="lead">${m.lead}</p></div>
    <div class="uses"><section><h3>No campo</h3><p>${m.campo}</p></section><section><h3>No dia a dia</h3><p>${m.dia}</p></section><section class="me"><h3>No seu trabalho</h3><p>${IA[m.id]}</p></section></div>
    <div class="lab"><div class="stage"></div><div class="panel"></div></div>
    <div><h3 class="py">Em Python</h3><pre><code></code></pre></div>`;
  $("pre code", main).textContent = m.python;
  redraw = m.build($(".stage", main), $(".panel", main));
}
const nav = $("#nav");
[...new Set(MODS.map(m => m.grupo))].forEach(g => {
  const d = document.createElement("div"); d.className = "grp"; d.innerHTML = `<h4>${g}</h4>`;
  MODS.filter(m => m.grupo === g).forEach(m => { const b = document.createElement("button"); b.textContent = m.nome; b.dataset.id = m.id; b.onclick = () => { show(m.id); window.scrollTo({top: 0}); }; d.appendChild(b); });
  nav.appendChild(d);
});
$("#chips").innerHTML = [...new Set(MODS.map(m => m.grupo))].map(g => `<span>${g} · ${MODS.filter(m => m.grupo === g).length}</span>`).join("");
let first = location.hash.slice(1); try { first = first || localStorage.getItem("mc-mod"); } catch (e) {}
show(first);
const re = () => redraw();
new ResizeObserver(re).observe($("#main"));
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", re);
new MutationObserver(re).observe(document.documentElement, {attributes: true, attributeFilter: ["data-theme"]});
