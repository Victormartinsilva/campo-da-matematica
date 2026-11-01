const $ = (s, r = document) => r.querySelector(s);
const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const fmt = (x, d = 2) => Number.isFinite(x) ? x.toLocaleString("pt-BR", {maximumFractionDigits: d}) : "—";
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
let N = 0, onLeave = null;

/* ---------- ferramentas de interface ---------- */
function ctl(panel, label, min, max, step, val, show, on) {
  const d = document.createElement("label"); d.className = "ctl";
  d.innerHTML = `<span class="cl">${label}</span><input id="c${N++}" type="range" min="${min}" max="${max}" step="${step}" value="${val}"><output></output>`;
  const i = d.querySelector("input"), o = d.querySelector("output"); let bump = 0;
  const upd = () => { o.textContent = show(+i.value); i.style.setProperty("--fill", (i.value - min) / (max - min) * 100 + "%"); };
  i.addEventListener("input", () => { upd(); on(+i.value); o.classList.add("bump"); clearTimeout(bump); bump = setTimeout(() => o.classList.remove("bump"), 160); });
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
function readout(panel) { const d = document.createElement("div"); d.className = "read"; d.setAttribute("aria-live", "polite"); d.setAttribute("aria-atomic", "true"); panel.appendChild(d); return d; }
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
  g.font = `11px ${css("--f-body")}`; g.lineWidth = 1;
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

/* arrastar direto no gráfico: fn(x, y, evento) recebe a posição em unidades do gráfico; devolve um registrador do plano atual */
function arrastavel(c, fn) {
  let on = false, p = null; c.style.touchAction = "none"; c.style.cursor = "grab";
  const mv = e => { if (!p) return; const b = c.getBoundingClientRect(); fn(p.x0 + (e.clientX - b.left - p.m.l) / (p.w - p.m.l - p.m.r) * (p.x1 - p.x0), p.y1 - (e.clientY - b.top - p.m.t) / (p.h - p.m.t - p.m.b) * (p.y1 - p.y0), e); };
  c.addEventListener("pointerdown", e => { on = true; c.setPointerCapture(e.pointerId); c.style.cursor = "grabbing"; mv(e); });
  c.addEventListener("pointermove", e => { if (on) mv(e); });
  c.addEventListener("pointerup", () => { on = false; c.style.cursor = "grab"; });
  return q => { p = q; };
}

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
  build(stage, panel, extra) {
    const FN = cenarios("funcao", ctxAtual).map(e => { const C = CURVA(e.curva); return {...e, f: C.f, eq: C.eq(e.simb[0], e.simb[1])}; });
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
    draw();
    kit("funcao", extra, {
      state: () => { const F = FN[k], x = F.a + xs.get() * (F.b - F.a); return {k, x, y: F.f(x)}; },
      goals: [
        {t: `Em "${FN[1].nome}", ache uma entrada em que a saída passe de ${FN[1].meta} ${FN[1].yu}.`, ok: s => s.k === 1 && s.y > FN[1].meta, win: () => "Achou o topo da curva: depois dele, aumentar a entrada deixa de ajudar."},
        {t: `Em "${FN[0].nome}", deixe a saída abaixo de ${FN[0].meta} ${FN[0].yu}.`, ok: s => s.k === 0 && s.y < FN[0].meta, win: () => "Saída baixa: nessa situação ela cresce em linha reta com a entrada."}
      ],
      react: s => s.k === 2 ? ["O crescimento explode: cada passo multiplica o valor.", "worried"] : s.k === 1 && s.y > 0.96 * FN[1].meta ? ["Está perto do topo da curva.", "happy"] : ["Mude a entrada e acompanhe a saída.", "neutral"]
    });
    return draw;
  }});

MODS.push({id: "limite", grupo: "Cálculo", nome: "Limites",
  build(stage, panel, extra) {
    const CS = [
      {nome: "(x² − 1)/(x − 1) perto de x = 1", f: x => (x * x - 1) / (x - 1), a: 1, y0: 0, y1: 4, hole: 2, lim: 2},
      {nome: "sen(x)/x perto de x = 0", f: x => Math.sin(x) / x, a: 0, y0: -0.4, y1: 1.3, hole: 1, lim: 1},
      {nome: "1/x perto de x = 0", f: x => 1 / x, a: 0, y0: -10, y1: 10, lim: null},
      {nome: "Tarifa em degrau perto de x = 2", f: x => x < 2 ? 1 : 3, a: 2, y0: 0, y1: 4, lim: null}
    ];
    let k = 0; const c = canvas(stage, 380); const R = readout(panel);
    const hs = ctl(panel, "Distância h até o ponto", 0, 4, 0.05, 0.5, v => "h = " + fmt(Math.pow(10, -v), 4), draw);
    const es = ctl(panel, "Tolerância ε na saída", 0, 2.5, 0.05, 0.7, v => "ε = " + fmt(Math.pow(10, -v), 3), draw);
    const s = sel(panel, "Função", CS.map(f => f.nome), v => { k = v; draw(); }); panel.insertBefore(s.parentElement, panel.firstChild);
    const drag = arrastavel(c, x => { hs.set(clamp(-Math.log10(clamp(Math.abs(x - CS[k].a), 1e-4, 1)), 0, 4)); draw(); });
    /* δ: a maior distância ao ponto que mantém a saída a menos de ε do limite, dos dois lados */
    const delta = (C, eps) => { for (let t = 0.001; t <= 2; t += 0.001) if (Math.abs(C.f(C.a - t) - C.lim) >= eps || Math.abs(C.f(C.a + t) - C.lim) >= eps) return t; return 2; };
    function draw() {
      const C = CS[k], h = Math.pow(10, -hs.get()), eps = Math.pow(10, -es.get()), a = C.a, L = C.f(a - h), Rr = C.f(a + h), tem = C.lim !== null, d = tem ? delta(C, eps) : 0;
      const p = plane(c, a - 2, a + 2, C.y0, C.y1, "x", "f(x)"), g = p.g; drag(p);
      if (tem) {
        p.clip(); g.globalAlpha = 0.16; g.fillStyle = css("--leaf"); g.fillRect(p.m.l, p.Y(C.lim + eps), p.w - p.m.l - p.m.r, p.Y(C.lim - eps) - p.Y(C.lim + eps));
        g.fillStyle = css("--water"); g.globalAlpha = 0.14; g.fillRect(p.X(a - d), p.m.t, p.X(a + d) - p.X(a - d), p.h - p.m.t - p.m.b); g.globalAlpha = 1; g.restore();
        p.line(a - 2, C.lim + eps, a + 2, C.lim + eps, css("--leaf"), 1.5, [5, 4]); p.line(a - 2, C.lim - eps, a + 2, C.lim - eps, css("--leaf"), 1.5, [5, 4]);
        p.line(a - d, C.y0, a - d, C.y1, css("--water"), 1.5, [5, 4]); p.line(a + d, C.y0, a + d, C.y1, css("--water"), 1.5, [5, 4]);
        g.font = `700 20px ${css("--f-hand")}`; g.textAlign = "left"; g.textBaseline = "bottom"; g.fillStyle = css("--leaf"); g.fillText("ε", p.m.l + 6, p.Y(C.lim + eps) - 2); g.fillStyle = css("--water"); g.fillText("δ", p.X(a + d) + 4, p.m.t + 22);
      }
      p.curve(C.f, css("--curve"));
      p.line(a - h, 0, a - h, L, css("--amber"), 1, [4, 4]); p.line(a + h, 0, a + h, Rr, css("--good"), 1, [4, 4]);
      p.dot(a - h, L, css("--amber"), 7); p.dot(a + h, Rr, css("--good"), 7);
      if (C.hole) p.dot(a, C.hole, css("--curve"), 5, true);
      const fa = C.f(a), fin = Number.isFinite(fa), agree = h <= 0.01 && Math.abs(L - Rr) < 0.01 * Math.max(1, Math.abs(L));
      const verdict = agree ? `<span class="ok">Os dois lados chegam em ≈ ${fmt(L, 3)}. O limite existe.</span>`
        : h <= 0.01 ? `<span class="no">Os lados vão para lugares diferentes. O limite não existe.</span>` : `<span class="am">Reduza h para ver para onde cada lado vai.</span>`;
      R.innerHTML = `<div>pela esquerda: f(${fmt(a - h, 4)}) = <b>${fmt(L, 4)}</b></div><div>pela direita: f(${fmt(a + h, 4)}) = <b>${fmt(Rr, 4)}</b></div>
        <div>no ponto: f(${a}) ${fin ? "= <b>" + fmt(fa, 3) + "</b>" : "é <b>indefinida</b>"}</div><div>${verdict}</div>
        ${tem ? `<div class="ok">Para a saída ficar a menos de ε = <b>${fmt(eps, 3)}</b> de ${C.lim}, basta a entrada ficar a menos de δ = <b>${fmt(d, 3)}</b> de ${a}. Aperte o ε e veja o δ encolher.</div>` : `<div class="no">Sem limite: não existe um valor de saída para o qual algum δ funcione com ε pequeno.</div>`}
        <div>Arraste no gráfico para aproximar os dois pontos de x = ${a}.</div>`;
    }
    draw();
    kit("limite", extra, {
      state: () => ({k, h: Math.pow(10, -hs.get()), eps: Math.pow(10, -es.get())}),
      goals: [
        {t: "Em (x² − 1)/(x − 1), leve h abaixo de 0,001: os dois lados chegam em 2.", ok: s => s.k === 0 && s.h < 0.001, win: () => "Os dois lados chegam em 2. O buraco não atrapalha o limite."},
        {t: "No sen(x)/x, aperte o ε abaixo de 0,02 e veja a faixa do δ ficar estreita.", ok: s => s.k === 1 && s.eps < 0.02, win: () => "Quanto menor a tolerância na saída, menor a distância permitida na entrada."},
        {t: "No 1/x, leve h abaixo de 0,01 e veja os lados irem para lugares diferentes.", ok: s => s.k === 2 && s.h < 0.01, win: () => "Um lado vai para menos infinito e o outro para mais infinito. Sem limite."}
      ],
      react: s => s.h < 0.01 ? (s.k >= 2 ? ["Os lados discordam: aqui o limite não existe.", "worried"] : ["Os dois lados se encontram: o limite existe.", "happy"]) : ["Arraste os pontos para perto de x ou diminua h.", "thinking"]
    });
    return draw;
  }});

MODS.push({id: "derivada", grupo: "Cálculo", nome: "Derivadas e tangentes",
  build(stage, panel, extra) {
    const DF = cenarios("derivada", ctxAtual).map(e => { const C = CURVA(e.curva); return {...e, f: C.f, df: C.df}; });
    let k = 0; const c = canvas(stage); const R = readout(panel);
    const c2 = canvas(stage, 170);
    const drag = arrastavel(c, x => { const F = DF[k]; xs.set(clamp((x - F.a) / (F.b - F.a), 0, 1)); draw(); });
    const xs = ctl(panel, "Ponto x₀", 0, 1, 0.0025, 0.33, v => fmt(DF[k].a + v * (DF[k].b - DF[k].a), 2), draw);
    const hs = ctl(panel, "Distância h da secante", 0, 4, 0.05, 0.7, v => "h = " + fmt((DF[k].b - DF[k].a) * Math.pow(10, -v), 4), draw);
    const s = sel(panel, "Situação", DF.map(f => f.nome), v => { k = v; xs.set((DF[k].x0 - DF[k].a) / (DF[k].b - DF[k].a)); draw(); }); panel.insertBefore(s.parentElement, panel.firstChild);
    function draw() {
      const F = DF[k], w = F.b - F.a, x0 = F.a + xs.get() * w, h = w * Math.pow(10, -hs.get());
      const y0 = F.f(x0), y1 = F.f(x0 + h), ms = (y1 - y0) / h, mt = F.df(x0), [lo, hi] = range(F.f, F.a, F.b), pad = (hi - lo) * 0.1;
      const p = plane(c, F.a, F.b, lo - pad, hi + pad, F.xu || "x", F.yu || "f(x)"); drag(p);
      p.curve(F.f, css("--curve"));
      p.line(F.a, y0 + ms * (F.a - x0), F.b, y0 + ms * (F.b - x0), css("--amber"), 1.5, [6, 4]);
      p.line(F.a, y0 + mt * (F.a - x0), F.b, y0 + mt * (F.b - x0), css("--good"), 2);
      p.dot(x0, y0, css("--good")); p.dot(x0 + h, y1, css("--amber"), 4);
      const un = F.yu ? ` ${F.yu} por ${F.xu}` : "";
      const meaning = F.yu ? `<div>Leitura: em x₀ = ${fmt(x0, 1)} ${F.xu}, mais 1 ${F.xu} muda a saída em ≈ <b>${fmt(mt, 3)} ${F.yu}</b>${mt < 0 ? " (para menos)" : ""}.</div>` : "";
      R.innerHTML = `<div class="am">secante (tracejada): <b>${fmt(ms, 4)}</b>${un}</div><div class="ok">tangente (sólida): <b>${fmt(mt, 4)}</b>${un}</div>
        <div>diferença: <b>${fmt(Math.abs(ms - mt), 5)}</b>. Diminua h e a secante gira até virar a tangente.</div>${meaning}<div>Arraste o ponto no gráfico de cima. Embaixo: a função derivada f′, e o ponto verde é a inclinação da tangente.</div>`;
      const [dl, dh] = range(F.df, F.a, F.b), dp = (dh - dl) * 0.15 || 1, q = plane(c2, F.a, F.b, dl - dp, dh + dp, F.xu || "x", "f′(x): taxa de variação");
      q.curve(F.df, css("--amber")); q.line(F.a, 0, F.b, 0, css("--axis"), 1, [4, 4]); q.line(x0, 0, x0, mt, css("--good"), 1.5, [4, 4]); q.dot(x0, mt, css("--good"));
    }
    draw();
    kit("derivada", extra, {
      state: () => { const F = DF[k], w = F.b - F.a, x0 = F.a + xs.get() * w, h = w * Math.pow(10, -hs.get()); return {k, x0, diff: Math.abs((F.f(x0 + h) - F.f(x0)) / h - F.df(x0))}; },
      goals: [
        {t: "Diminua h até a secante e a tangente diferirem menos que 0,001.", ok: s => s.diff < 0.001, win: () => "A secante virou tangente. Esse é o limite que define a derivada."},
        {t: `Em "${DF[1].nome}", ponha o ponto onde a taxa é máxima (perto de ${DF[1].x0} ${DF[1].xu}).`, ok: s => s.k === 1 && Math.abs(s.x0 - DF[1].x0) < 0.025 * (DF[1].b - DF[1].a), win: () => "Aí está o pico da taxa: a tangente é a mais inclinada."}
      ],
      react: s => s.diff < 0.001 ? ["Secante e tangente coladas.", "happy"] : s.diff > 1 ? ["Com h grande, a secante engana. Diminua h.", "worried"] : ["A secante está chegando perto da tangente.", "thinking"]
    });
    return draw;
  }});

MODS.push({id: "maxmin", grupo: "Cálculo", nome: "Máximos e mínimos",
  build(stage, panel, extra) {
    const S = cenarios("maxmin", ctxAtual), {c0: A0, c1: B, c2: C2} = S.resp, XM = S.xmax, y = x => A0 + B * x - C2 * x * x, un = (v, u, d) => u.startsWith("R$") ? "R$ " + fmt(v, d) + u.slice(2) : fmt(v, d) + " " + u;
    const lucroU = (S.yl.match(/\(([^)]+)\)/) || [])[1] || "", tol = Math.max(1, 0.01 * XM), otimo = (p, q) => clamp((B - q / p) / (2 * C2), 0, XM);
    const c = canvas(stage); const R = readout(panel); let x = S.x0ini;
    const ps = ctl(panel, S.preco.r, S.preco.min, S.preco.max, S.preco.step, S.preco.def, v => un(v, S.preco.un, S.preco.step < 1 ? 1 : 0), draw);
    const cs = ctl(panel, S.custo.r, S.custo.min, S.custo.max, S.custo.step, S.custo.def, v => un(v, S.custo.un, S.custo.step < 1 ? 1 : 0), draw);
    const xs = ctl(panel, S.testada, 0, XM, 1, x, v => v + " " + S.xu, v => { x = v; draw(); });
    const r = row(panel);
    btn(r, "Dar um passo na subida", () => { const p = ps.get(), q = cs.get(); x = clamp(x + 0.5 * (p * (B - 2 * C2 * x) - q) / (2 * p * C2), 0, XM); xs.set(x); draw(); });
    btn(r, "Reiniciar", () => { x = S.x0ini; xs.set(x); draw(); }, true);
    function draw() {
      const p = ps.get(), q = cs.get(), L = z => p * y(z) - q * z, dL = z => p * (B - 2 * C2 * z) - q;
      const xo = otimo(p, q), xm = B / (2 * C2), [lo, hi] = range(L, 0, XM), pad = (hi - lo) * 0.12;
      const g = plane(c, 0, XM, lo - pad, hi + pad, S.xl, S.yl);
      g.curve(L, css("--curve"));
      g.line(xm, lo - pad, xm, hi + pad, css("--amber"), 1.5, [6, 4]); g.line(xo, lo - pad, xo, hi + pad, css("--good"), 1.5, [6, 4]);
      const m = dL(x); g.line(x - XM / 6, L(x) - XM / 6 * m, x + XM / 6, L(x) + XM / 6 * m, css("--amber"), 2);
      g.dot(x, L(x), css("--amber")); g.dot(xo, L(xo), css("--good"), 6);
      R.innerHTML = `<div>inclinação do lucro no ponto testado: <b>${fmt(m, 2)}</b> ${lucroU} a mais para cada 1 ${S.xu} a mais</div>
        <div class="ok">${S.ent} de lucro máximo: <b>${fmt(xo, 0)} ${S.xu}</b> (derivada = 0), lucro <b>${fmt(L(xo), 0)} ${lucroU}</b></div>
        <div class="am">${S.ent} de resposta máxima: <b>${fmt(xm, 0)} ${S.xu}</b>, ${fmt(y(xm), 1)} ${S.yu}</div>
        <div>Parar no ponto de lucro máximo economiza <b>${fmt(xm - xo, 0)} ${S.sub}</b> e perde só <b>${fmt(y(xm) - y(xo), 1)} ${S.yu}</b>.</div>
        <div>Modelo ilustrativo: ${CURVA({tipo: "quad", p: S.resp}).eq("y", "x")}.</div>`;
    }
    draw();
    kit("maxmin", extra, {
      state: () => { const p = ps.get(), q = cs.get(); return {p, x, xo: otimo(p, q)}; },
      goals: [
        {t: `Leve o ponto testado até o lucro máximo (a até ${fmt(tol, 0)} ${S.xu}).`, ok: s => Math.abs(s.x - s.xo) <= tol, win: () => "Topo do lucro. Aí a derivada vale zero."},
        {t: `Suba "${S.preco.r}" acima de ${S.precoAlto} e ache o novo ponto ótimo.`, ok: s => s.p > S.precoAlto && Math.abs(s.x - s.xo) <= tol, win: () => "Com cada unidade de resposta valendo mais, vale ir mais longe: o ponto ótimo subiu."}
      ],
      react: s => Math.abs(s.x - s.xo) <= tol ? ["Esse é o topo do lucro!", "happy"] : s.x > s.xo ? ["Passou do ponto ótimo: a última unidade custa mais do que rende.", "worried"] : ["Ainda dá para ganhar indo mais longe.", "thinking"]
    });
    return draw;
  }});

MODS.push({id: "integral", grupo: "Cálculo", nome: "Integrais",
  build(stage, panel, extra) {
    const PR = cenarios("integral", ctxAtual).map(e => { const C = CURVA(e.curva); return {...e, f: C.f, F: C.F}; });
    let k = 0, mt = 0, lo = PR[0].a, hi = PR[0].b, pega = null; const c = canvas(stage, 300), c2 = canvas(stage, 170); const R = readout(panel);
    const s = sel(panel, "Situação", PR.map(f => f.nome), v => { k = v; lo = PR[k].a; hi = PR[k].b; draw(); }); panel.insertBefore(s.parentElement, panel.firstChild);
    const ns = ctl(panel, "Número de retângulos", 1, 80, 1, 6, v => v, draw);
    const ms = sel(panel, "Altura de cada retângulo", ["Esquerda", "Ponto médio", "Direita", "Trapézios"], v => { mt = v; draw(); });
    const drag = arrastavel(c, (x, y, e) => {
      const P = PR[k], gap = 0.03 * (P.b - P.a); if (e.type === "pointerdown") pega = Math.abs(x - lo) <= Math.abs(x - hi) ? "lo" : "hi";
      if (pega === "lo") lo = clamp(x, P.a, hi - gap); else hi = clamp(x, lo + gap, P.b); draw();
    });
    btn(row(panel), "Voltar aos limites do período", () => { lo = PR[k].a; hi = PR[k].b; draw(); }, true);
    function draw() {
      const P = PR[k], n = ns.get(), dx = (hi - lo) / n, [, top] = range(P.f, P.a, P.b);
      const p = plane(c, P.a, P.b, 0, top * 1.15, P.xl, P.yl), g = p.g; drag(p); let S = 0;
      g.globalAlpha = 0.28; g.fillStyle = css("--curve"); g.strokeStyle = css("--curve"); g.lineWidth = 1;
      for (let i = 0; i < n; i++) {
        const xa = lo + i * dx, xb = xa + dx; let area;
        g.beginPath();
        if (mt === 3) { area = (P.f(xa) + P.f(xb)) / 2 * dx; g.moveTo(p.X(xa), p.Y(0)); g.lineTo(p.X(xa), p.Y(P.f(xa))); g.lineTo(p.X(xb), p.Y(P.f(xb))); g.lineTo(p.X(xb), p.Y(0)); }
        else { const hh = P.f(mt === 0 ? xa : mt === 1 ? (xa + xb) / 2 : xb); area = hh * dx; g.rect(p.X(xa), p.Y(hh), p.X(xb) - p.X(xa), p.Y(0) - p.Y(hh)); }
        g.closePath(); g.fill(); g.globalAlpha = 0.6; g.stroke(); g.globalAlpha = 0.28; S += area;
      }
      g.globalAlpha = 1; p.curve(P.f, css("--curve"));
      [["a", lo], ["b", hi]].forEach(([nm, X]) => { p.line(X, 0, X, P.f(X), css("--ink"), 2.5); p.dot(X, P.f(X), css("--wheat"), 8); g.font = `700 20px ${css("--f-hand")}`; g.fillStyle = css("--ink"); g.textAlign = "center"; g.textBaseline = "top"; g.fillText(nm, p.X(X), p.Y(0) + 4); });
      const E = P.F(hi) - P.F(lo), acum = x => P.F(x) - P.F(lo), q = plane(c2, P.a, P.b, 0, Math.max(E, acum(P.b)) * 1.12 || 1, P.xl, "área acumulada desde a (" + P.u + ")");
      q.curve(acum, css("--good"), 3, lo, P.b); q.line(P.a, 0, lo, 0, css("--axis"), 2); q.line(hi, 0, hi, E, css("--amber"), 1.5, [4, 4]); q.line(P.a, E, hi, E, css("--amber"), 1.5, [4, 4]); q.dot(hi, E, css("--amber"), 6);
      R.innerHTML = `<div>de a = <b>${fmt(lo, 2)}</b> até b = <b>${fmt(hi, 2)}</b></div><div>soma dos ${n} retângulos: <b>${fmt(S, 3)} ${P.u}</b></div><div class="ok">integral exata: <b>${fmt(E, 3)} ${P.u}</b></div>
        <div>erro: <b>${fmt(Math.abs(S - E) / E * 100, 3)}%</b>. Mais retângulos, menos erro; o limite dessa soma é a integral.</div>
        <div>Arraste os pontos a e b no gráfico. O gráfico de baixo mostra a área acumulada: a altura em b é a integral de a até b.</div>`;
    }
    draw();
    kit("integral", extra, {
      state: () => ({k, n: ns.get(), mt, larg: (hi - lo) / (PR[k].b - PR[k].a)}),
      goals: [
        {t: "Chegue a 40 retângulos ou mais e veja o erro quase sumir.", ok: s => s.n >= 40, win: () => "Mais faixas, menos erro. No limite, a soma vira a integral."},
        {t: "Com no máximo 8 faixas, troque para trapézios e compare o erro.", ok: s => s.mt === 3 && s.n <= 8, win: () => "Trapézios acompanham melhor a curva do que retângulos com poucas faixas."},
        {t: "Arraste a e b até cobrir só a metade do período e veja a área acumulada cair.", ok: s => s.larg < 0.55, win: () => "Menos intervalo, menos área: a integral mede quanto a curva acumula entre a e b."}
      ],
      react: s => s.larg < 0.55 ? ["Com um intervalo menor, a área também é menor.", "happy"] : s.n >= 40 ? ["Bem fininho: o erro é bem pequeno.", "happy"] : s.n <= 4 ? ["Poucas faixas: a soma ainda erra bastante.", "worried"] : ["Arraste os pontos a e b para ver a área acumular.", "neutral"]
    });
    return draw;
  }});

MODS.push({id: "multiplas", grupo: "Cálculo", nome: "Integrais duplas e triplas",
  build(stage, panel, extra) {
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
      g.fillStyle = css("--muted"); g.font = `11px ${css("--f-body")}`; g.textAlign = "left"; g.fillText("talhão 100 m × 100 m · ponto = pluviômetro", ox, oy - 5 > 8 ? oy - 5 : 10);
      const V = vol(n), one = rf(50, 50) / 1000 * 10000;
      R.innerHTML = `<div class="am">só o pluviômetro (centro, ${fmt(rf(50, 50), 1)} mm): <b>${fmt(one, 0)} m³</b></div>
        <div>soma em ${n}×${n} células: <b>${fmt(V, 1)} m³</b></div><div class="ok">integral dupla (referência): <b>${fmt(ref, 1)} m³</b></div>
        <div>Um ponto erra em <b>${fmt(Math.abs(one - ref) / ref * 100, 0)}%</b>; a soma em células erra <b>${fmt(Math.abs(V - ref) / ref * 100, 1)}%</b>.</div>`;
      const Z = zs.get() / 100; let m = 0; for (let z = 0; z < Z - 1e-9; z += 0.01) m += (1.15 + 0.5 * (z + 0.005)) * 0.01;
      T.innerHTML = `<div class="cl">Integral tripla: massa de solo em 1 ha</div><div>∭ ρ dV com ρ(z) = 1,15 + 0,5·z (Mg/m³)</div>
        <div>camada de 0 a ${fmt(Z * 100, 0)} cm: <b>${fmt(10000 * m, 0)} Mg/ha</b></div><div>densidade média: ${fmt(m / Z, 3)} Mg/m³</div>`;
    }
    draw();
    kit("multiplas", extra, {
      state: () => ({n: ns.get(), z: zs.get()}),
      goals: [
        {t: "Use 20 × 20 células ou mais e veja o erro cair.", ok: s => s.n >= 20, win: () => "Com muitas células a soma chega bem perto da integral."},
        {t: "Escolha uma camada de solo de 30 cm ou mais e veja a massa por hectare.", ok: s => s.z >= 30, win: () => "Quanto mais fundo, mais massa e maior a densidade média."}
      ],
      react: s => s.n === 1 ? ["Uma célula só é o pluviômetro único: erra feio.", "worried"] : s.n >= 20 ? ["Muitas células: a soma acompanha a chuva real.", "happy"] : ["Mais células, menos erro.", "neutral"]
    });
    return draw;
  }});

MODS.push({id: "matrizes", grupo: "Álgebra linear", nome: "Matrizes e sistemas",
  build(stage, panel, extra) {
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
    draw();
    kit("matrizes", extra, {
      state: () => { const f = (i, j) => stage.querySelector('[data-i="' + i + '"][data-j="' + j + '"]').value, A = [0, 1, 2].map(i => [0, 1, 2].map(j => (+f(i, j) || 0) / 100)), b = [0, 1, 2].map(i => +stage.querySelector('[data-b="' + i + '"]').value || 0), I = inv(A), x = I ? I.map(r => r.reduce((a, v, j) => a + v * b[j], 0)) : null; return {sing: !I, b0: b[0], neg: !!x && x.some(v => v < 0)}; },
      goals: [
        {t: "Torne a matriz singular e veja a receita perder a solução única.", ok: s => s.sing, win: () => "Dois produtos iguais: sem inversa, sem receita única."},
        {t: "Peça 150 kg de N ou mais e ainda ache uma receita viável, sem valores negativos.", ok: s => !s.sing && s.b0 >= 150 && !s.neg, win: () => "Receita viável com a meta mais alta."}
      ],
      react: s => s.sing ? ["Matriz singular: não existe inversa.", "worried"] : s.neg ? ["Valor negativo: essa receita é impossível.", "worried"] : ["A inversa existe: a receita sai direto.", "happy"]
    });
    return draw;
  }});

MODS.push({id: "estatistica", grupo: "Estatística", nome: "Experimentos e testes A/B",
  build(stage, panel, extra) {
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
    run();
    kit("estatistica", extra, {
      state: () => ({d: ds.get(), s: ss.get(), n: ns.get(), p: A.length ? welch(A, B).p : 1}),
      goals: [
        {t: "Com diferença real de pelo menos 3 sc/ha, rode experimentos até o teste detectar (p < 0,05).", ok: s => s.d >= 3 && s.p < 0.05, win: () => "Detectou! Com efeito maior, o teste enxerga mais fácil."},
        {t: "Suba as repetições para 15 ou mais e veja o resultado variar menos.", ok: s => s.n >= 15, win: () => "Mais repetições, mais poder: o acaso pesa menos."}
      ],
      react: s => s.p < 0.05 ? ["Diferença detectada neste experimento.", "happy"] : s.n <= 3 ? ["Poucas repetições: fica difícil separar efeito de acaso.", "worried"] : ["Não detectou. Rode de novo ou aumente as repetições.", "thinking"]
    });
    return draw;
  }});

MODS.push({id: "jogos", grupo: "Decisão", nome: "Teoria dos jogos",
  build(stage, panel, extra) {
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
    build();
    kit("jogos", extra, {
      state: () => ({k, ne: gm.querySelectorAll("td.ne").length}),
      goals: [
        {t: "Visite as três situações: preços, culturas e produtor contra fiscal.", ok: (s, memo) => { memo[s.k] = 1; return Object.keys(memo).length === 3; }, win: () => "Três jogos, três tipos de equilíbrio."},
        {t: "No dilema dos preços, edite os ganhos até haver dois equilíbrios de Nash.", ok: s => s.k === 0 && s.ne >= 2, win: () => "Dois equilíbrios: agora é preciso combinar qual deles."}
      ],
      react: s => s.ne === 0 ? ["Nenhum equilíbrio puro: precisa misturar as jogadas.", "thinking"] : s.ne >= 2 ? ["Dois equilíbrios: coordenação.", "happy"] : ["Um equilíbrio: ninguém ganha mudando sozinho.", "neutral"]
    });
    return draw;
  }});

/* ---------- machine learning ---------- */
const mulberry = s => () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

MODS.push({id: "regressao", grupo: "Machine learning", nome: "Regressão linear e gradiente",
  build(stage, panel, extra) {
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
    draw();
    kit("regressao", extra, {
      state: () => { const f = (a, c) => D.reduce((t, [x, y]) => t + (y - (c + a * x)) ** 2, 0) / n, mse = f(w, b); return {mse, opt: f(wO, bO), bad: !Number.isFinite(mse) || mse > 1e9, lr: +lrs.value}; },
      goals: [
        {t: "Leve o erro quadrático médio a menos de 10% acima do ótimo.", ok: s => !s.bad && s.mse < s.opt * 1.1, win: () => "Quase o ótimo: a reta está bem ajustada."},
        {t: "Use a taxa 0,9 e deixe o erro explodir. Depois reinicie com a taxa boa.", ok: s => s.bad && s.lr === 2, win: () => "O passo grande demais passou do vale. A taxa boa é 0,3."}
      ],
      react: s => s.bad ? ["O erro explodiu: taxa grande demais.", "worried"] : s.mse < s.opt * 1.1 ? ["Reta bem ajustada!", "happy"] : ["Mexa em w e b, ou use o gradiente.", "thinking"]
    });
    return draw;
  }});

MODS.push({id: "embeddings", grupo: "Machine learning", nome: "Vetores, embeddings e busca",
  build(stage, panel, extra) {
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
    draw();
    kit("embeddings", extra, {
      state: () => { const rk = DOCS.map((d, i) => ({i, s: score(d)})).sort((a, b) => b.s - a.s); return {metric, top: rk[0].i}; },
      goals: [
        {t: "Mova a pergunta até o documento sobre RAG ficar em primeiro no cosseno.", ok: s => s.metric === 0 && s.top === 5, win: () => "O RAG é o mais parecido em direção com a pergunta."},
        {t: "Troque a métrica e faça o primeiro colocado mudar.", ok: (s, memo) => { memo[s.metric] = s.top; return new Set(Object.values(memo)).size >= 2; }, win: () => "Métricas diferentes, rankings diferentes."}
      ],
      react: s => s.metric === 1 ? ["Distância: o tamanho do vetor pesa.", "thinking"] : s.top === 5 ? ["O RAG é o primeiro: perguntas parecidas ficam na mesma direção.", "happy"] : ["Clique no gráfico para mover a pergunta.", "neutral"]
    });
    return draw;
  }});

MODS.push({id: "atencao", grupo: "Machine learning", nome: "Softmax e atenção",
  build(stage, panel, extra) {
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
  }});

MODS.push({id: "overfit", grupo: "Machine learning", nome: "Overfitting, viés e variância",
  build(stage, panel, extra) {
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
    draw();
    kit("overfit", extra, {
      state: () => { const d = ds.get(), lam = LAM[ls.get()], w = fit(d, lam), w9 = fit(9, 0); return {d, lam, ete: w ? rmse(w, te) : NaN, base: w9 ? rmse(w9, te) : NaN}; },
      goals: [
        {t: "Ache um grau entre 3 e 5 com erro de teste abaixo de 0,45.", ok: s => s.d >= 3 && s.d <= 5 && s.ete < 0.45, win: () => "Grau médio, erro de teste baixo: o ponto bom."},
        {t: "No grau 9 ou mais, use regularização para derrubar o erro de teste à metade do que era sem ela.", ok: s => s.d >= 9 && s.lam > 0 && s.ete < s.base / 2, win: () => "A regularização domou o modelo flexível."}
      ],
      react: s => s.d <= 1 ? ["Simples demais: não pega a curva.", "worried"] : s.d >= 8 && s.lam === 0 ? ["Flexível demais: ele decora o ruído.", "worried"] : s.d >= 3 && s.d <= 5 ? ["Parece o ponto bom.", "happy"] : ["Compare o erro de treino com o de teste.", "thinking"]
    });
    return draw;
  }});

const erf = x => { const s = Math.sign(x); x = Math.abs(x); const t = 1 / (1 + 0.3275911 * x); return s * (1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)); };
const Phi = z => 0.5 * (1 + erf(z / Math.SQRT2));

MODS.push({id: "logistica", grupo: "Machine learning", nome: "Classificação, limiar e guardrails",
  build(stage, panel, extra) {
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
    draw();
    kit("logistica", extra, {
      state: () => { let bt = 0, bc = Infinity; for (let v = 0; v <= 1; v += 0.01) { const c = cost(v); if (c < bc) { bc = c; bt = v; } } return {t, bt, pi: PI[ps.get()]}; },
      goals: [
        {t: "Ache o limiar de menor custo, a no máximo 0,03 do ótimo.", ok: s => Math.abs(s.t - s.bt) <= 0.03, win: () => "Esse limiar equilibra os dois erros pelo custo."},
        {t: "Baixe a taxa de ataques para 0,5% ou menos e veja a precisão despencar.", ok: s => s.pi <= 0.005, win: () => "Com ataques raros, quase todo bloqueio é alarme falso."}
      ],
      react: s => Math.abs(s.t - s.bt) <= 0.03 ? ["Esse é o limiar de menor custo.", "happy"] : s.pi <= 0.01 ? ["Ataques raros: cuidado com a precisão.", "worried"] : ["Mexa no limiar e olhe os dois erros.", "thinking"]
    });
    return draw;
  }});

MODS.push({id: "rede", grupo: "Machine learning", nome: "Redes neurais e backpropagation",
  build(stage, panel, extra) {
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
    init(); draw();
    kit("rede", extra, {
      state: () => { let ok = 0; for (const [x, y, t] of pts) if ((fwd(x, y).p > 0.5) === !!t) ok++; return {ds, h, epoch, acc: ok / pts.length}; },
      goals: [
        {t: "No círculo dentro de círculo, treine até passar de 95% de acerto.", ok: s => s.ds === 1 && s.acc >= 0.95, win: () => "A rede dobrou a fronteira em volta do círculo."},
        {t: "Com 1 neurônio no círculo, treine 300 passos e veja o acerto travar abaixo de 80%.", ok: s => s.ds === 1 && s.h === 1 && s.epoch >= 300 && s.acc < 0.8, win: () => "Um neurônio só faz uma fronteira simples: não cerca o círculo."}
      ],
      react: s => s.epoch === 0 ? ["Aperte Treinar e acompanhe a fronteira se mexendo.", "thinking"] : s.acc >= 0.95 ? ["Fronteira certinha!", "happy"] : s.h === 1 ? ["Um neurônio só: fronteira rígida.", "worried"] : ["Continue treinando.", "neutral"]
    });
    return draw;
  }});

MODS.push({id: "token", grupo: "Machine learning", nome: "Do logit ao próximo token",
  build(stage, panel, extra) {
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
  }});

MODS.push({id: "trilha", grupo: "Machine learning", nome: "Trilha e ferramentas",
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
  build(stage, panel, extra) {
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
    draw();
    kit("ideia", extra, {
      state: () => ({k, t: ts.get()}),
      goals: [
        {t: "Leve o instante até o fim e veja o volume fechar o total.", ok: s => s.t >= 0.98, win: () => "Fechou: a área até o fim é o volume total."},
        {t: "Na chuva, pare perto de 3 h e compare a área sombreada com a altura do gráfico de baixo.", ok: s => s.k === 1 && Math.abs(s.t * 6 - 3) < 0.15, win: () => "As duas leituras batem: área em cima, altura embaixo."}
      ],
      react: s => s.t > 0.9 ? ["Quase no fim: o volume está chegando ao total.", "happy"] : s.t < 0.1 ? ["No começo quase nada se acumulou.", "thinking"] : ["Veja: a área sombreada em cima é a altura do gráfico de baixo.", "neutral"]
    });
    return draw;
  }});

MODS.push({id: "regras", grupo: "Cálculo", nome: "Regras de derivação",
  build(stage, panel, extra) {
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
    draw();
    kit("regras", extra, {
      state: () => { const x = xs.get(); return {op, x, m: mk().d(x)}; },
      goals: [
        {t: "Visite as quatro combinações: soma, produto, quociente e composição.", ok: (s, memo) => { memo[s.op] = 1; return Object.keys(memo).length === 4; }, win: () => "As quatro regras visitadas. A cadeia é a mais usada em redes neurais."},
        {t: "No produto de sen x por x², ache um x longe do zero onde a derivada vale quase zero.", ok: s => s.op === 1 && gi === 4 && hj === 1 && Math.abs(s.x) > 0.3 && Math.abs(s.m) < 0.1, win: () => "Derivada zero: a curva muda de direção aqui."}
      ],
      react: s => Math.abs(s.m) < 0.1 ? ["Inclinação perto de zero: a curva vira por aqui.", "happy"] : ["Compare a curva de cima com a derivada de baixo.", "neutral"]
    });
    return draw;
  }});

MODS.push({id: "gradiente", grupo: "Cálculo", nome: "Gradientes e curvas de nível",
  build(stage, panel, extra) {
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
    pt = SF[0].st.slice(); draw();
    kit("gradiente", extra, {
      state: () => { const g = SF[k].g(pt[0], pt[1]); return {k, gn: Math.hypot(g[0], g[1]), steps: trail.length - 1}; },
      goals: [
        {t: "Desça até o gradiente ficar menor que 0,05.", ok: s => s.steps > 0 && s.gn < 0.05, win: () => "Gradiente quase zero: você chegou ao fundo."},
        {t: "No relevo do talhão, faça a descida terminar num ponto de gradiente quase zero.", ok: s => s.k === 3 && s.steps > 0 && s.gn < 0.1, win: () => "A água parou aqui: é uma baixada do terreno."}
      ],
      react: s => s.steps === 0 ? ["Clique no mapa para escolher o ponto, ou use Descer.", "thinking"] : s.gn < 0.1 ? ["Quase parado: o gradiente é quase zero.", "happy"] : ["Seta verde: para onde sobe mais rápido. A descida vai ao contrário.", "neutral"]
    });
    return draw;
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

const frac = v => { for (let q = 1; q <= 720; q++) { const p = Math.round(v * q); if (p > 0 && p <= 24 && Math.abs(p / q - v) < 1e-9) return [p, q]; } return null; };
const texNum = v => (+v.toFixed(4)).toString().replace(".", "{,}");
/* monta o polinômio de Taylor em LaTeX: sem termos nulos, sem sinais duplicados, com frações e potências reais */
function taylorTex(F, n, a) {
  const base = Math.abs(a) < 1e-9 ? "x" : a > 0 ? `(x-${texNum(a)})` : `(x+${texNum(-a)})`, parts = []; let more = false;
  for (let j = 0; j <= n; j++) {
    const c = F.dn(j, a) / fact(j); if (Math.abs(c) < 1e-9) continue;
    if (parts.length >= 6) { more = true; break; }
    const v = Math.abs(c), pw = j === 0 ? "" : j === 1 ? base : `${base}^{${j}}`, fr = frac(v), sp = j === 0 ? "" : "\\," + pw; let body;
    if (fr && fr[1] === 1) body = j === 0 ? `${fr[0]}` : fr[0] === 1 ? pw : `${fr[0]}${sp}`;
    else if (fr) body = j === 0 ? `\\frac{${fr[0]}}{${fr[1]}}` : `\\frac{${fr[0] === 1 ? "" : fr[0] + "\\,"}${pw}}{${fr[1]}}`;
    else if (v >= 0.001) body = `${texNum(v)}${sp}`;
    else { const e = Math.floor(Math.log10(v)); body = `${texNum(v / 10 ** e)}\\cdot10^{${e}}${sp}`; }
    parts.push({neg: c < 0, body});
  }
  if (!parts.length) return `P_{${n}}(x)=0`;
  return `P_{${n}}(x)=${parts[0].neg ? "-" : ""}${parts[0].body}${parts.slice(1).map(p => (p.neg ? "-" : "+") + p.body).join("")}${more ? "+\\cdots" : ""}`;
}

MODS.push({id: "taylor", grupo: "Cálculo", nome: "Séries de Taylor",
  gancho: "Por que uma reta serve para prever a curva aqui, mas não ali?",
  resumo: "Perto de um ponto, qualquer curva suave parece um polinômio. Cada termo novo estica a faixa onde a aproximação vale.",
  detalhes: "Cada termo vem de uma derivada no centro a: f(a) dá a altura, f′(a) a inclinação, f″(a) a curvatura, e assim por diante. Com um termo você tem a tangente. Com dois, uma parábola que acompanha a curva. A faixa verde do gráfico mostra onde o erro fica abaixo de 5% do tamanho da função. Longe do centro a aproximação se desfaz. Em funções como ln(1 + x) existe até um limite de distância que nenhum número de termos consegue ultrapassar.",
  python: `import sympy as sp                      # biblioteca de matemática simbólica

x = sp.symbols('x')                     # x vira uma variável simbólica, não um número
f = sp.sin(x)                           # a função que queremos aproximar
a, n = 0, 7                             # centro da aproximação e ordem do polinômio

serie = sp.series(f, x, a, n + 1)       # expande f em torno de a, até o termo de ordem n
P = serie.removeO()                     # tira o resto O(x**8) e deixa só o polinômio
print(P)                                # x - x**3/6 + x**5/120 - x**7/5040

erro = abs(f.subs(x, 3) - P.subs(x, 3)) # compara f e P num ponto de teste, x = 3
print(float(erro))                      # quanto a aproximação erra ali`,
  build(stage, panel, extra) {
    const sc = {a0: -4.2, a1: 4.2, x0: -7, x1: 7, y0: -2.2, y1: 2.2};
    const FS = [
      {nome: "sen x", f: Math.sin, dn: (n, a) => [Math.sin(a), Math.cos(a), -Math.sin(a), -Math.cos(a)][n % 4], ...sc},
      {nome: "cos x", f: Math.cos, dn: (n, a) => [Math.cos(a), -Math.sin(a), -Math.cos(a), Math.sin(a)][n % 4], ...sc},
      {nome: "eˣ", f: Math.exp, dn: (n, a) => Math.exp(a), a0: -2, a1: 2, x0: -4, x1: 4, y0: -2, y1: 20},
      {nome: "ln(1 + x)", f: x => Math.log(1 + x), dn: (n, a) => n === 0 ? Math.log(1 + a) : (n % 2 ? 1 : -1) * fact(n - 1) / Math.pow(1 + a, n), a0: 0, a1: 3, x0: -0.95, x1: 5, y0: -3, y1: 2.5}
    ];
    const G = [
      {t: "Mova o ponto de teste até o erro ficar menor que 0,01, a pelo menos 0,5 de distância do centro.", ok: s => s.err < 0.01 && Math.abs(s.x - s.a) >= 0.5, win: () => "Acertou! Dá para confiar no polinômio nesse ponto."},
      {t: "Deixe só a tangente (ordem 1) e ache um ponto de teste onde o erro passe de 1.", ok: s => s.n === 1 && s.err > 1, win: () => "Isso mesmo: uma reta só segura a curva por perto."},
      {t: "No sen x, com centro em 0, chegue em x ≈ 3 com erro menor que 0,01. Qual a menor ordem que serve?", ok: s => s.k === 0 && Math.abs(s.a) <= 0.15 && Math.abs(s.x - 3) <= 0.12 && s.err < 0.01, win: s => `Acertou! Precisou de ordem ${s.n}. Dá para tentar com menos?`}
    ];
    const done = G.map((_, i) => !!Progress.get().goals["taylor:" + i]); let k = 0, first = true, tm = 0, prev = null; const c = canvas(stage, 380);
    /* o Broto comenta o que mudou, um instante depois de você parar de mexer */
    function react(s) {
      const p = prev; prev = s; if (!broto) return;
      if (p && p.k !== s.k) return broto.say(`Agora é o ${FS[s.k].nome}. Onde você quer o centro?`, "thinking");
      if (s.lvl === "ok") return broto.say("Colou! Aqui a curva e o polinômio quase não se distinguem.", "happy");
      if (s.lvl === "bad") return broto.say(s.beyond ? "O ln(1 + x) só vale até 1 + a de distância do centro. Mais termos não ajudam." : s.dist > 1.2 ? "Muito longe do centro, a curva se solta!" : s.n < 12 ? "Poucos termos para essa curvatura. Que tal subir a ordem?" : "Nem com ordem alta. Chega o centro mais perto daqui.", "worried");
      if (p && p.n !== s.n) return broto.say(s.w > p.w ? "Mais um termo e a faixa verde cresceu." : "A faixa verde mudou de tamanho.", "neutral");
      broto.say("Quase lá. Dá para usar, mas a diferença já aparece.", "thinking");
    }
    const cen = a => (a - FS[k].a0) / (FS[k].a1 - FS[k].a0), A = () => FS[k].a0 + as.get() * (FS[k].a1 - FS[k].a0), XT = () => FS[k].x0 + xt.get() * (FS[k].x1 - FS[k].x0);
    const s = sel(panel, "Função", FS.map(f => f.nome), v => { k = v; as.set(cen(0)); xt.set(clamp((1 - FS[k].x0) / (FS[k].x1 - FS[k].x0), 0, 1)); draw(); }); panel.insertBefore(s.parentElement, panel.firstChild);
    const ns = ctl(panel, "Ordem do polinômio", 0, 12, 1, 3, v => v, draw), as = ctl(panel, "Centro a", 0, 1, 0.005, 0.5, v => fmt(FS[k].a0 + v * (FS[k].a1 - FS[k].a0), 2), draw), xt = ctl(panel, "Ponto de teste x", 0, 1, 0.005, 0.8, v => fmt(FS[k].x0 + v * (FS[k].x1 - FS[k].x0), 2), draw);
    panel.insertAdjacentHTML("beforeend", `<div class="meter"><div class="meter-track" role="img" aria-label="Medidor de erro"><i class="g"></i><i class="y"></i><i class="r"></i><b class="pin"></b></div><div class="meter-lbl"><span>quase igual</span><span>perdida</span></div></div>
      <p class="msg" role="status"></p><div class="formula" aria-label="Polinômio de Taylor"></div><p class="hint"></p>`);
    const pin = $(".pin", panel), msg = $(".msg", panel), fml = $(".formula", panel), hint = $(".hint", panel), meter = $(".meter", panel);
    extra.innerHTML = `<h3 class="goals-title">Desafios</h3><ol class="goals">${G.map((g, i) => `<li class="goal" data-i="${i}"><span class="goal-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 13l5 5L20 6"/></svg></span><span>${g.t}</span></li>`).join("")}</ol><p class="goal-msg" role="status"></p>`;
    done.forEach((d, i) => { if (d) $(`.goal[data-i="${i}"]`, extra).classList.add("done"); });
    const P =(F, n, a, x) => { let s = 0; for (let j = 0; j <= n; j++) s += F.dn(j, a) / fact(j) * (x - a) ** j; return s; };
    function draw() {
      const F = FS[k], n = ns.get(), a = A(), x = XT(), fx = F.f(x), px = P(F, n, a, x), err = Math.abs(fx - px);
      const good = t => Math.abs(F.f(t) - P(F, n, a, t)) <= 0.05 * Math.max(1, Math.abs(F.f(t))), dt = (F.x1 - F.x0) / 600; let xl = a, xr = a;
      while (xr + dt <= F.x1 && good(xr + dt)) xr += dt; while (xl - dt >= F.x0 && good(xl - dt)) xl -= dt;
      const p = plane(c, F.x0, F.x1, F.y0, F.y1, "x", "y"), g = p.g;
      p.clip(); g.globalAlpha = 0.17; g.fillStyle = css("--leaf"); g.fillRect(p.X(xl), p.m.t, p.X(xr) - p.X(xl), p.h - p.m.t - p.m.b); g.restore(); g.globalAlpha = 1;
      p.line(xl, F.y0, xl, F.y1, css("--leaf"), 1.5, [5, 4]); p.line(xr, F.y0, xr, F.y1, css("--leaf"), 1.5, [5, 4]);
      if (p.X(xr) - p.X(xl) > 74) { g.font = `700 20px ${css("--f-hand")}`; g.fillStyle = css("--leaf"); g.textAlign = "left"; g.textBaseline = "top"; g.fillText("faixa boa", p.X(xl) + 8, p.m.t + 6); }
      p.curve(F.f, css("--curve"), 3); p.curve(t => P(F, n, a, t), css("--amber"), 2.5); p.dot(a, F.f(a), css("--good"), 6);
      p.line(x, F.y0, x, F.y1, css("--muted"), 1, [4, 4]); p.dot(x, fx, css("--curve"), 4.5); p.dot(x, px, css("--amber"), 4.5);
      const rel = err / Math.max(1, Math.abs(fx)), lvl = rel < 0.01 ? "ok" : rel < 0.1 ? "mid" : "bad";
      pin.style.left = clamp((Math.log10(Math.max(rel, 1e-4)) + 4) / 4, 0, 1) * 100 + "%"; meter.dataset.level = lvl;
      $(".meter-track", panel).setAttribute("aria-label", `Medidor de erro: ${lvl === "ok" ? "bom" : lvl === "mid" ? "aceitável" : "aproximação perdida"}`);
      const beyond = k === 3 && Math.abs(x - a) > 1 + a;
      msg.dataset.level = lvl;
      msg.textContent = lvl === "ok" ? (rel < 0.0005 ? "Colados: aqui a curva e o polinômio quase não se distinguem." : "Bateu. A aproximação funciona neste ponto.")
        : lvl === "mid" ? "Dá para usar, mas já dá para ver a diferença."
        : beyond ? "Aqui a série do ln(1 + x) nunca fecha: ela só vale até 1 + a de distância do centro. Mais termos não resolvem."
        : n < 12 ? "Aqui a aproximação já se perdeu. Tente aumentar a ordem ou chegar mais perto do centro." : "Mesmo com ordem alta, esse ponto está longe demais do centro. Mova o centro para perto dele.";
      tex(fml, taylorTex(F, n, a));
      hint.textContent = `Faixa boa: de x = ${fmt(xl, 2)} até ${fmt(xr, 2)}. Diferença neste ponto: ${fmt(err, 4)}.`;
      const st = {k, n, a, x, err}; let won = false;
      G.forEach((gl, i) => { if (!done[i] && gl.ok(st)) { won = true;
        done[i] = true; const li = $(`.goal[data-i="${i}"]`, extra); li.classList.add("done", "just"); $(".goal-msg", extra).textContent = gl.win(st);
        meter.classList.remove("flash"); void meter.offsetWidth; meter.classList.add("flash");
        if (broto) { clearTimeout(tm); broto.say(gl.win(st), "happy"); }
        window.dispatchEvent(new CustomEvent("mc:goal", {detail: {module: "taylor", index: i, total: G.length, el: li}}));
      } });
      const next = done.indexOf(false); extra.querySelectorAll(".goal").forEach((li, i) => li.classList.toggle("active", i === next));
      const now = {lvl, beyond, n, k, dist: Math.abs(x - a), w: xr - xl};
      if (first) { prev = now; first = false; } else if (!won) { clearTimeout(tm); tm = setTimeout(() => react(now), 450); }
    }
    draw(); return draw;
  }});

MODS.push({id: "newton", grupo: "Cálculo", nome: "Método de Newton",
  build(stage, panel, extra) {
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
  }});

MODS.push({id: "otimizadores", grupo: "Machine learning", nome: "Otimizadores: GD, momento e Adam",
  build(stage, panel, extra) {
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
    reset();
    kit("otimizadores", extra, {
      state: () => { const S = SO[k], f = o => S.f(o.p[0], o.p[1]); return {k, n: opts[0].n, fG: f(opts[0]), fM: f(opts[1]), fA: f(opts[2])}; },
      goals: [
        {t: "Na banana de Rosenbrock, leve o Adam a um valor de f abaixo de 0,01.", ok: s => s.k === 1 && s.fA < 0.01, win: () => "O Adam achou o fundo da banana, onde o gradiente puro sofre."},
        {t: "No vale estreito, dê 100 passos e veja as três trilhas chegarem perto do mínimo (f abaixo de 0,05).", ok: s => s.k === 0 && s.n >= 100 && s.fG < 0.05 && s.fM < 0.05 && s.fA < 0.05, win: () => "As três chegaram. A diferença está no caminho que cada uma fez."}
      ],
      react: s => s.n === 0 ? ["Dê alguns passos e compare as três trilhas.", "thinking"] : s.fA < s.fG && s.fA < s.fM ? ["O Adam está na frente.", "happy"] : ["O gradiente puro ainda está se arrastando.", "neutral"]
    });
    return draw;
  }});

/* ---------- ligação com o trabalho atual ---------- */
const ID_ORDER = ["ideia", "funcao", "limite", "derivada", "regras", "taylor", "maxmin", "newton", "integral", "multiplas", "gradiente", "matrizes", "vetores", "leis-newton", "propulsao", "gravidade", "manobras", "fisica-engenharia", "estatistica", "regressao", "otimizadores", "overfit", "logistica", "rede", "embeddings", "atencao", "token", "trilha", "jogos"];
/* ---------- Física: cinco laboratórios interativos adicionais ---------- */
function physicsFrame(stage, title, note) {
  stage.innerHTML = `<div class="estudo-lab"><div class="estudo-lab-head"><strong>${title}</strong><p>${note}</p></div><canvas class="estudo-canvas" aria-label="${title}"></canvas><p class="estudo-lab-note">Modelo didático: valores e escalas são simplificados para destacar as relações físicas.</p></div>`;
  const c = $("canvas", stage); c.style.width = "100%"; c.style.height = "350px"; c.style.display = "block"; c.style.touchAction = "pan-y";
  return c;
}
function buildVectorLab(stage, panel, extra) {
  const c = physicsFrame(stage, "Composição de vetores", "Altere módulo e direção de duas grandezas e observe suas componentes e a resultante.");
  const R = readout(panel);
  const a = ctl(panel, "Vetor A — módulo", 0, 100, 1, 60, v => fmt(v, 0) + " u", draw);
  const aa = ctl(panel, "Vetor A — ângulo", 0, 359, 1, 25, v => fmt(v, 0) + "°", draw);
  const b = ctl(panel, "Vetor B — módulo", 0, 100, 1, 45, v => fmt(v, 0) + " u", draw);
  const ba = ctl(panel, "Vetor B — ângulo", 0, 359, 1, 120, v => fmt(v, 0) + "°", draw);
  const resetBtn = row(panel); btn(resetBtn, "Vetores opostos", () => { aa.set(0); ba.set(180); draw(); }, true); btn(resetBtn, "Reiniciar", () => { a.set(60); aa.set(25); b.set(45); ba.set(120); draw(); });
  function draw() {
    const p = plane(c, -120, 120, -120, 120, "Componente x (u)", "Componente y (u)"), g = p.g;
    const ax = a.get() * Math.cos(aa.get() * Math.PI / 180), ay = a.get() * Math.sin(aa.get() * Math.PI / 180);
    const bx = b.get() * Math.cos(ba.get() * Math.PI / 180), by = b.get() * Math.sin(ba.get() * Math.PI / 180);
    const rx = ax + bx, ry = ay + by, mag = Math.hypot(rx, ry), ang = (Math.atan2(ry, rx) * 180 / Math.PI + 360) % 360;
    const ox = p.X(0), oy = p.Y(0);
    arrow(g, ox, oy, p.X(ax), p.Y(ay), css("--curve"), 3); arrow(g, ox, oy, p.X(bx), p.Y(by), css("--amber"), 3);
    arrow(g, ox, oy, p.X(rx), p.Y(ry), css("--area-ink"), 4);
    g.fillStyle = css("--ink"); g.font = `12px ${css("--f-body")}`; g.fillText("A", p.X(ax) + 6, p.Y(ay) - 6); g.fillText("B", p.X(bx) + 6, p.Y(by) - 6); g.fillText("R = A + B", p.X(rx) + 7, p.Y(ry) - 8);
    R.innerHTML = `<div><b>A:</b> (${fmt(ax, 1)}; ${fmt(ay, 1)}) u</div><div><b>B:</b> (${fmt(bx, 1)}; ${fmt(by, 1)}) u</div><div><b>Resultante:</b> (${fmt(rx, 1)}; ${fmt(ry, 1)}) u</div><div><b>Módulo:</b> ${fmt(mag, 2)} u · <b>Direção:</b> ${fmt(ang, 1)}°</div>`;
  }
  kit("vetores", extra, {state: () => { const ax = a.get()*Math.cos(aa.get()*Math.PI/180), ay=a.get()*Math.sin(aa.get()*Math.PI/180), bx=b.get()*Math.cos(ba.get()*Math.PI/180), by=b.get()*Math.sin(ba.get()*Math.PI/180); return {mag:Math.hypot(ax+bx,ay+by), opposed:Math.abs(((aa.get()-ba.get()+360)%360)-180)<5, equal:Math.abs(a.get()-b.get())<1.1, nonzero:a.get()>1&&b.get()>1}; }, goals:[
    {t:"Ajuste dois vetores de mesmo módulo em sentidos opostos e observe a resultante próxima de zero.",ok:s=>s.opposed&&s.equal&&s.nonzero&&s.mag<2,win:()=>"Vetores opostos de mesmo módulo se anulam."},
    {t:"Produza uma resultante com módulo maior que 80 unidades.",ok:s=>s.mag>80,win:()=>"A soma vetorial pode produzir uma resultante maior que cada vetor isolado."}
  ], react:s=>s.mag<2?["A resultante está próxima de zero: os vetores se equilibram.","happy"]:["Observe como a direção altera a soma, mesmo sem mudar os módulos.","thinking"]});
  draw(); return draw;
}
function buildNewtonLab(stage, panel, extra) {
  const c = physicsFrame(stage, "Força, massa e aceleração", "A segunda lei de Newton relaciona a força resultante à massa e à aceleração.");
  const R = readout(panel); let elapsed = 0, velocity = 0, distance = 0;
  const force = ctl(panel, "Força resultante", 0, 20000, 100, 6000, v => fmt(v, 0) + " N", draw);
  const mass = ctl(panel, "Massa", 100, 5000, 50, 1000, v => fmt(v, 0) + " kg", draw);
  const time = ctl(panel, "Tempo do experimento", 1, 20, 1, 5, v => fmt(v, 0) + " s", draw);
  const actions = row(panel); btn(actions, "Executar experimento", run, true); btn(actions, "Reiniciar", reset);
  function reset(){elapsed=0;velocity=0;distance=0;draw();}
  function run(){elapsed=time.get(); const acc=force.get()/mass.get(); velocity=acc*elapsed; distance=.5*acc*elapsed*elapsed; draw();}
  function draw(){const acc=force.get()/mass.get(); const p=plane(c,0,20,0,Math.max(5,Math.ceil((distance||20)/5)*5),"Tempo (s)","Deslocamento (m)"); p.curve(t=>.5*acc*t*t,css("--area-ink"),2.5,0,20); p.dot(elapsed,distance,css("--amber"),6); R.innerHTML=`<div><b>Força resultante:</b> ${fmt(force.get(),0)} N</div><div><b>Aceleração:</b> ${fmt(acc,2)} m/s²</div><div><b>Após ${fmt(elapsed,0)} s:</b> velocidade ${fmt(velocity,2)} m/s · deslocamento ${fmt(distance,2)} m</div><div>Equação: a = F/m</div>`;}
  kit("leis-newton",extra,{state:()=>({elapsed,acc:force.get()/mass.get(),velocity,distance}),goals:[
    {t:"Com 1.000 kg e 2.000 N, execute o experimento e obtenha aceleração de 2 m/s².",ok:s=>Math.abs(s.acc-2)<.01&&s.elapsed>0,win:()=>"A aceleração corresponde à força dividida pela massa."},
    {t:"Dobre a massa mantendo a força e observe a aceleração cair pela metade.",ok:s=>mass.get()>=1900&&Math.abs(s.acc-force.get()/1000/2)<.05,win:()=>"Para a mesma força, maior massa produz menor aceleração."}
  ],react:s=>["Compare a aceleração antes e depois de alterar a massa.","thinking"]}); draw(); return draw;
}
function buildOrbitLab(stage,panel,extra){
  const c=physicsFrame(stage,"Gravidade e órbitas","Explore como a velocidade tangencial inicial altera a trajetória em torno de um corpo central.");
  const R=readout(panel); let x=1,y=0,vx=0,vy=1,t=0,trail=[],running=false;
  const speedCtl=ctl(panel,"Velocidade tangencial inicial",.55,1.45,.01,1,v=>fmt(v,2)+" unidades",reset);
  const actions=row(panel); btn(actions,"Avançar 10 passos",()=>step(10),true); btn(actions,"Avançar 100 passos",()=>step(100),true); btn(actions,"Reiniciar órbita",reset);
  function reset(){x=1;y=0;vx=0;vy=speedCtl.get();t=0;trail=[[x,y]];draw();}
  function step(n){const dt=.01,mu=1;for(let i=0;i<n;i++){let r=Math.hypot(x,y),ax=-mu*x/(r*r*r),ay=-mu*y/(r*r*r);let xn=x+vx*dt+.5*ax*dt*dt,yn=y+vy*dt+.5*ay*dt*dt,rn=Math.hypot(xn,yn),anx=-mu*xn/(rn*rn*rn),any=-mu*yn/(rn*rn*rn);vx+=(ax+anx)*.5*dt;vy+=(ay+any)*.5*dt;x=xn;y=yn;t+=dt;if(i%2===0&&trail.length<5000)trail.push([x,y]);}draw();}
  function draw(){const p=plane(c,-2.2,2.2,-2.2,2.2,"x (unidades)","y (unidades)"),g=p.g;p.clip();if(trail.length>1){g.strokeStyle=css("--curve");g.lineWidth=2;g.beginPath();trail.forEach(([tx,ty],i)=>i?g.lineTo(p.X(tx),p.Y(ty)):g.moveTo(p.X(tx),p.Y(ty)));g.stroke();}g.restore();g.beginPath();g.arc(p.X(0),p.Y(0),9,0,Math.PI*2);g.fillStyle=css("--amber");g.fill();p.dot(x,y,css("--curve"),6);const r=Math.hypot(x,y),v=Math.hypot(vx,vy),energy=.5*v*v-1/r;R.innerHTML=`<div><b>Tempo:</b> ${fmt(t,2)} unidades</div><div><b>Distância ao centro:</b> ${fmt(r,3)}</div><div><b>Velocidade:</b> ${fmt(v,3)}</div><div><b>Energia específica:</b> ${fmt(energy,3)}</div><div>${energy<-.02?"Energia negativa: trajetória ligada (órbita).":energy>.02?"Energia positiva: trajetória de escape.":"Próximo da condição de escape."}</div>`;}
  kit("gravidade",extra,{state:()=>({r:Math.hypot(x,y),energy:.5*(vx*vx+vy*vy)-1/Math.hypot(x,y),t}),goals:[
    {t:"Use velocidade inicial próxima de 1 e avance 100 passos para observar uma órbita aproximadamente circular.",ok:s=>Math.abs(speedCtl.get()-1)<.015&&s.t>=.9&&s.r>.8&&s.r<1.2,win:()=>"A velocidade circular mantém a distância ao centro aproximadamente constante."},
    {t:"Reduza a velocidade inicial para 0,70 e avance para observar uma órbita mais alongada.",ok:s=>speedCtl.get()<.75&&s.t>.5&&s.energy<0,win:()=>"A energia continua negativa: a trajetória permanece ligada, mas deixa de ser circular."}
  ],react:s=>["A velocidade tangencial determina a forma da trajetória gravitacional.","thinking"]});reset();return draw;
}
function buildManeuverLab(stage,panel,extra){
 const c=physicsFrame(stage,"Controle de trajetória","Aplique impulsos em direções diferentes e compare a orientação do veículo com o vetor velocidade.");const R=readout(panel);let vx=30,vy=0,x=0,y=0,trail=[[0,0]],heading=0,impulses=0;
 const dv=ctl(panel,"Intensidade do impulso",1,20,1,5,v=>fmt(v,0)+" m/s",draw);const dir=ctl(panel,"Direção do impulso",0,359,1,90,v=>fmt(v,0)+"°",draw);
 const actions=row(panel);btn(actions,"Aplicar impulso",apply,true);btn(actions,"Avançar 1 s",advance,true);btn(actions,"Apontar na direção da velocidade",align);btn(actions,"Reiniciar",reset);
 function reset(){vx=30;vy=0;x=0;y=0;trail=[[0,0]];heading=0;impulses=0;dir.set(90);draw();}
 function apply(){const a=dir.get()*Math.PI/180;vx+=dv.get()*Math.cos(a);vy+=dv.get()*Math.sin(a);heading=dir.get();impulses++;draw();}
 function advance(){x+=vx;y+=vy;trail.push([x,y]);if(trail.length>300)trail.shift();draw();}
 function align(){heading=(Math.atan2(vy,vx)*180/Math.PI+360)%360;dir.set(Math.round(heading));draw();}
 function draw(){const p=plane(c,-150,150,-100,100,"Posição x (m)","Posição y (m)"),g=p.g;p.clip();if(trail.length>1){g.strokeStyle=css("--area-ink");g.lineWidth=2;g.beginPath();trail.forEach(([tx,ty],i)=>i?g.lineTo(p.X(tx),p.Y(ty)):g.moveTo(p.X(tx),p.Y(ty)));g.stroke();}g.restore();arrow(g,p.X(x),p.Y(y),p.X(x+vx),p.Y(y+vy),css("--curve"),3);p.dot(x,y,css("--amber"),6);const speed=Math.hypot(vx,vy),course=(Math.atan2(vy,vx)*180/Math.PI+360)%360;R.innerHTML=`<div><b>Velocidade:</b> ${fmt(speed,2)} m/s</div><div><b>Direção da trajetória:</b> ${fmt(course,1)}°</div><div><b>Orientação selecionada:</b> ${fmt(heading,0)}°</div><div><b>Impulsos aplicados:</b> ${impulses}</div><div>O impulso altera a velocidade; a orientação pode ser ajustada separadamente.</div>`;}
 kit("manobras",extra,{state:()=>({impulses,vy,speed:Math.hypot(vx,vy),course:(Math.atan2(vy,vx)*180/Math.PI+360)%360}),goals:[
 {t:"Aplique um impulso lateral de 5 m/s e observe a velocidade ganhar componente vertical.",ok:s=>s.impulses>=1&&Math.abs(s.vy)>=4.9,win:()=>"O impulso lateral alterou o vetor velocidade."},
 {t:"Aplique dois impulsos em direções diferentes para mudar a trajetória novamente.",ok:s=>s.impulses>=2,win:()=>"Uma sequência de impulsos permite construir uma nova trajetória."}
 ],react:s=>["Orientação e trajetória são grandezas relacionadas, mas não são a mesma coisa.","thinking"]});draw();return draw;
}
function buildAgricultureLab(stage,panel,extra){
 const c=physicsFrame(stage,"Tração e potência agrícola","Compare a força solicitada por um implemento com a aderência disponível entre pneu e solo.");const R=readout(panel);
 const mass=ctl(panel,"Massa do conjunto",1000,12000,250,6000,v=>fmt(v,0)+" kg",draw);const mu=ctl(panel,"Coeficiente de aderência",.2,1.2,.05,.65,v=>fmt(v,2),draw);const demand=ctl(panel,"Força solicitada pelo implemento",1000,30000,500,12000,v=>fmt(v,0)+" N",draw);const velocity=ctl(panel,"Velocidade de operação",1,15,.5,6,v=>fmt(v,1)+" m/s",draw);
 const actions=row(panel);btn(actions,"Calcular operação",draw,true);btn(actions,"Configuração inicial",()=>{mass.set(6000);mu.set(.65);demand.set(12000);velocity.set(6);draw();});
 function draw(){const g=c.getContext("2d"),w=c.clientWidth,h=c.clientHeight,dpr=window.devicePixelRatio||1;c.width=Math.round(w*dpr);c.height=Math.round(h*dpr);g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,w,h);const ink=css("--ink"),muted=css("--muted"),grid=css("--grid"),ground=h*.7;g.strokeStyle=grid;g.lineWidth=1;for(let i=0;i<10;i++){g.beginPath();g.moveTo(0,ground+i*8);g.lineTo(w,ground+i*8);g.stroke();}g.strokeStyle=ink;g.lineWidth=2;g.beginPath();g.moveTo(20,ground);g.lineTo(w-20,ground);g.stroke();const tx=w*.38,ty=ground-55;g.fillStyle=css("--area-ink");g.fillRect(tx-45,ty,90,38);g.beginPath();g.arc(tx-25,ground-10,17,0,Math.PI*2);g.arc(tx+30,ground-10,17,0,Math.PI*2);g.fillStyle="#303943";g.fill();g.fillStyle=css("--card");g.fillRect(tx-10,ty-27,35,27);g.fillStyle=ink;g.font=`12px ${css("--f-body")}`;g.fillText("Trator + implemento",tx-48,ty-37);const weight=mass.get()*9.81,available=mu.get()*weight,actual=Math.min(demand.get(),available),power=actual*velocity.get()/1000,slip=demand.get()>available;arrow(g,tx+55,ty+17,tx+55+Math.min(120,demand.get()/250),ty+17,css("--amber"),3);arrow(g,tx-50,ty+17,tx-50-Math.min(120,available/250),ty+17,css("--curve"),3);g.fillStyle=muted;g.fillText("Força solicitada",tx+65,ty+4);g.fillText("Tração disponível",tx-155,ty+4);R.innerHTML=`<div><b>Peso:</b> ${fmt(weight,0)} N</div><div><b>Tração máxima estimada:</b> ${fmt(available,0)} N</div><div><b>Força efetivamente transmitida:</b> ${fmt(actual,0)} N</div><div><b>Potência útil estimada:</b> ${fmt(power,2)} kW</div><div class="${slip?"am":"ok"}">${slip?"A força solicitada excede a aderência estimada: há risco de patinagem.":"A aderência estimada é suficiente para transmitir a força solicitada."}</div><div class="cl">Modelo simplificado: tração máxima = μ × massa × gravidade; potência = força × velocidade.</div>`;}
 kit("fisica-engenharia",extra,{state:()=>({available:mu.get()*mass.get()*9.81,demand:demand.get(),power:Math.min(demand.get(),mu.get()*mass.get()*9.81)*velocity.get()/1000}),goals:[
 {t:"Configure a operação para que a tração disponível seja maior que a força solicitada.",ok:s=>s.available>=s.demand,win:()=>"A aderência estimada suporta a força solicitada."},
 {t:"Aumente a força solicitada até superar a tração disponível e identifique o risco de patinagem.",ok:s=>s.demand>s.available,win:()=>"A força exigida superou o limite de aderência estimado."}
 ],react:s=>["Potência útil depende da força efetivamente transmitida e da velocidade.","thinking"]});draw();return draw;
}


/* ---------- Física: cadastro dos módulos e laboratórios ---------- */
const FISICA_MODULOS = [
  {id: "vetores", nome: "Grandezas, unidades e vetores", saudacao: "Vamos decompor grandezas em componentes e entender como vetores se combinam."},
  {id: "leis-newton", nome: "Movimento e leis de Newton", saudacao: "Observe primeiro o movimento; depois identifique as forças que podem alterá-lo."},
  {id: "propulsao", nome: "Propulsão e foguetes", saudacao: "O foguete não empurra o ar: ele expulsa massa e recebe uma variação de movimento no sentido oposto."},
  {id: "gravidade", nome: "Gravidade e órbitas", saudacao: "Uma órbita é uma queda contínua ao redor de um corpo, não ausência de gravidade."},
  {id: "manobras", nome: "Manobras e navegação espacial", saudacao: "Vamos separar o giro da nave da mudança de sua velocidade."},
  {id: "fisica-engenharia", nome: "Física aplicada à engenharia e agricultura", saudacao: "A Física ajuda a estimar se uma máquina tem força, potência e aderência suficientes para a tarefa."}
];
function buildRocketLab(stage, panel, extra) {
  stage.innerHTML = `<div class="rocket-sim"><canvas class="rocket-canvas" role="img" aria-label="Simulação bidimensional do movimento de um foguete">Representação visual do movimento do foguete. Utilize os controles para alterar massa, empuxo e direção.</canvas><div class="rocket-legend"><span><i class="rocket-dot velocity"></i> Velocidade</span><span><i class="rocket-dot thrust"></i> Empuxo</span><span><i class="rocket-dot trail"></i> Trajetória</span></div><p class="rocket-note">Modelo didático 2D: sem gravidade, atmosfera ou perda de massa. A orientação da nave é independente da velocidade.</p></div>`;
  panel.innerHTML = `<div class="rocket-controls-intro"><strong>Controles de voo</strong><p>Comece com os motores desligados e observe a inércia. Depois aplique empuxo para acelerar, frear ou desviar.</p></div>`;
  const c = $("canvas", stage), ctx = c.getContext("2d"), R = readout(panel);
  const mass = ctl(panel, "Massa da nave", 1000, 10000, 250, 4500, v => fmt(v, 0) + " kg", draw);
  const thrust = ctl(panel, "Empuxo do motor", 0, 30000, 500, 9000, v => fmt(v, 0) + " N", draw);
  const angle = ctl(panel, "Direção do empuxo", 0, 359, 1, 0, v => fmt(v, 0) + "°", draw);
  const actions = row(panel); actions.classList.add("rocket-actions");
  const engineButton = btn(actions, "Ligar motor", toggleEngine);
  const runButton = btn(actions, "Iniciar", toggleRun, true);
  const controls2 = row(panel); controls2.classList.add("rocket-actions");
  btn(controls2, "Apontar contra velocidade", pointAgainst, true);
  btn(controls2, "Avançar 1 s", stepOne, true);
  btn(controls2, "Reiniciar", reset, true);
  const state = {x: 0, y: 0, vx: 35, vy: 0, t: 0, engine: false, running: false, trail: [], deltaV: 0, engineTime: 0, maxSpeed: 35, braking: false, lastSpeed: 35};
  let raf = 0, lastFrame = 0, disposed = false;
  const rad = d => d * Math.PI / 180;
  const speed = () => Math.hypot(state.vx, state.vy);
  function reset() {
    stop(); state.x = 0; state.y = 0; state.vx = 35; state.vy = 0; state.t = 0;
    state.engine = false; state.trail = [[0, 0]]; state.deltaV = 0; state.engineTime = 0;
    state.maxSpeed = 35; state.braking = false; state.lastSpeed = 35;
    angle.set(0); engineButton.textContent = "Ligar motor"; runButton.textContent = "Iniciar"; draw();
  }
  function toggleEngine() { state.engine = !state.engine; engineButton.textContent = state.engine ? "Desligar motor" : "Ligar motor"; draw(); }
  function toggleRun() {
    state.running = !state.running; runButton.textContent = state.running ? "Pausar" : "Continuar";
    if (state.running) { lastFrame = 0; raf = requestAnimationFrame(frame); } else cancelAnimationFrame(raf);
    draw();
  }
  function stop() { state.running = false; cancelAnimationFrame(raf); }
  function pointAgainst() {
    if (speed() < 0.05) return;
    angle.set((Math.atan2(state.vy, state.vx) * 180 / Math.PI + 180 + 360) % 360);
    state.braking = true; draw();
  }
  function integrate(dt) {
    const oldSpeed = speed();
    if (state.engine && thrust.get() > 0) {
      const a = thrust.get() / mass.get(), theta = rad(angle.get());
      state.vx += Math.cos(theta) * a * dt; state.vy += Math.sin(theta) * a * dt;
      state.engineTime += dt;
    }
    state.x += state.vx * dt; state.y += state.vy * dt; state.t += dt;
    const newSpeed = speed(); state.deltaV = Math.hypot(state.vx - 35, state.vy);
    state.maxSpeed = Math.max(state.maxSpeed, newSpeed); state.lastSpeed = oldSpeed;
    if (!state.trail.length || Math.hypot(state.x - state.trail[state.trail.length - 1][0], state.y - state.trail[state.trail.length - 1][1]) > 1.5) {
      state.trail.push([state.x, state.y]); if (state.trail.length > 500) state.trail.shift();
    }
  }
  function frame(ts) {
    if (!state.running || disposed) return;
    const dt = lastFrame ? Math.min((ts - lastFrame) / 1000, 0.05) : 1 / 60; lastFrame = ts;
    const n = Math.max(1, Math.ceil(dt / (1 / 120))), sub = dt / n;
    for (let i = 0; i < n; i++) integrate(sub);
    draw(); raf = requestAnimationFrame(frame);
  }
  function stepOne() { for (let i = 0; i < 60; i++) integrate(1 / 60); draw(); }
  function arrow(g, x1, y1, x2, y2, color, width = 2) {
    const a = Math.atan2(y2 - y1, x2 - x1), head = 9;
    g.strokeStyle = color; g.fillStyle = color; g.lineWidth = width; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke();
    g.beginPath(); g.moveTo(x2, y2); g.lineTo(x2 - head * Math.cos(a - .45), y2 - head * Math.sin(a - .45)); g.lineTo(x2 - head * Math.cos(a + .45), y2 - head * Math.sin(a + .45)); g.closePath(); g.fill();
  }
  function draw() {
    const dpr = window.devicePixelRatio || 1, w = c.clientWidth || 640, h = 410;
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h);
    const bg = css("--paper-2") || "#f4f1e8", grid = css("--grid") || "#d7d2c7", ink = css("--ink") || "#263238";
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2, scale = Math.min(w, h) / 150;
    ctx.strokeStyle = grid; ctx.lineWidth = 1;
    for (let x = cx % 40; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = cy % 40; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    const screen = ([x, y]) => [cx + (x - state.x) * scale, cy - (y - state.y) * scale];
    if (state.trail.length > 1) {
      ctx.strokeStyle = css("--area-ink") || css("--area-ink"); ctx.globalAlpha = .75; ctx.lineWidth = 2; ctx.beginPath();
      state.trail.forEach((pt, i) => { const q = screen(pt); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.stroke(); ctx.globalAlpha = 1;
    }
    const vx = state.vx, vy = state.vy, vlen = Math.hypot(vx, vy), vscale = Math.min(1.7, 55 / Math.max(vlen, 1));
    arrow(ctx, cx, cy, cx + vx * vscale, cy - vy * vscale, css("--curve"), 3);
    if (state.engine && thrust.get() > 0) {
      const th = rad(angle.get()), alen = Math.min(80, 18 + thrust.get() / mass.get() * 12);
      arrow(ctx, cx, cy, cx + Math.cos(th) * alen, cy - Math.sin(th) * alen, css("--amber"), 3);
    }
    const rot = rad(angle.get()); ctx.save(); ctx.translate(cx, cy); ctx.rotate(-rot);
    ctx.fillStyle = css("--card"); ctx.strokeStyle = ink; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(21, 0); ctx.lineTo(-12, -9); ctx.lineTo(-8, 0); ctx.lineTo(-12, 9); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = css("--area-ink"); ctx.beginPath(); ctx.moveTo(-5, -7); ctx.lineTo(-16, -14); ctx.lineTo(-13, -5); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-5, 7); ctx.lineTo(-16, 14); ctx.lineTo(-13, 5); ctx.closePath(); ctx.fill();
    if (state.engine && thrust.get() > 0) { ctx.fillStyle = css("--wheat"); ctx.beginPath(); ctx.moveTo(-12, -4); ctx.lineTo(-32, 0); ctx.lineTo(-12, 4); ctx.fill(); }
    ctx.restore();
    ctx.fillStyle = ink; ctx.font = `12px ${css("--f-body")}`; ctx.textAlign = "left"; ctx.fillText("Referencial local — a câmera acompanha a nave", 12, 20);
    const a = state.engine ? thrust.get() / mass.get() : 0;
    R.innerHTML = `<div><b>Tempo:</b> ${fmt(state.t, 1)} s</div><div><b>Velocidade:</b> ${fmt(speed(), 2)} m/s</div><div><b>Aceleração:</b> ${fmt(a, 2)} m/s²</div><div><b>Empuxo:</b> ${state.engine ? fmt(thrust.get(), 0) : "0"} N</div><div><b>Deslocamento:</b> x ${fmt(state.x, 1)} m · y ${fmt(state.y, 1)} m</div><div class="${!state.engine ? "ok" : "am"}">${state.engine ? "Motor ligado: a força altera a velocidade." : "Motor desligado: a velocidade permanece constante."}</div>`;
  }
  const oldLeave = onLeave;
  onLeave = () => { disposed = true; stop(); if (oldLeave) oldLeave(); };
  kit("propulsao", extra, {
    state: () => ({t: state.t, engine: state.engine, speed: speed(), deltaV: state.deltaV, engineTime: state.engineTime, braking: state.braking}),
    goals: [
      {t: "Com o motor desligado, avance pelo menos 5 segundos e observe que a nave mantém sua velocidade próxima de 35 m/s.", ok: s => s.t >= 5 && !s.engine && Math.abs(s.speed - 35) < .05, win: () => "Inércia observada: sem força resultante, a velocidade não desaparece."},
      {t: "Ligue o motor e produza uma variação de velocidade de pelo menos 10 m/s.", ok: s => s.engineTime >= 1 && s.deltaV >= 10, win: () => "O empuxo alterou a quantidade de movimento da nave."},
      {t: "Aponte o motor contra a velocidade e freie até ficar abaixo de 2 m/s.", ok: s => s.braking && s.speed < 2 && s.t > 1, win: () => "Frenagem concluída: a aceleração contrária reduziu o módulo da velocidade."}
    ],
    react: s => s.engine ? ["Com o motor ligado, observe a direção do empuxo em relação à velocidade.", "thinking"] : ["O motor está desligado. A nave continua em movimento por inércia.", "neutral"]
  });
  reset();
  return draw;
}

const FISICA_LABS = {vetores: buildVectorLab, "leis-newton": buildNewtonLab, propulsao: buildRocketLab, gravidade: buildOrbitLab, manobras: buildManeuverLab, "fisica-engenharia": buildAgricultureLab};
FISICA_MODULOS.forEach(m => MODS.push({...m, grupo: "Física", build(stage, panel, extra) { return FISICA_LABS[m.id](stage, panel, extra); }}));

/* matéria Programação e dados: cada arquivo prog/*.js registra seus módulos em MODULOS_PROG */
(window.MODULOS_PROG || []).forEach(m => { MODS.push({grupo: "Programação e dados", ...m}); ID_ORDER.push(m.id); });
MODS.forEach(m => Object.assign(m, CONTENT[m.id]));
/* laboratórios reescritos em arquivos próprios (labs/*.js) substituem o build do assunto */
MODS.forEach(m => { if (window.LABS_V2 && LABS_V2[m.id]) m.build = LABS_V2[m.id]; });
MODS.sort((a, b) => ID_ORDER.indexOf(a.id) - ID_ORDER.indexOf(b.id));

/* ---------- navegação ---------- */
const AREA = {"Cálculo": "calculo", "Álgebra linear": "algebra", "Estatística": "estatistica", "Machine learning": "ml", "Decisão": "decisao", "Física": "fisica", "Programação e dados": "prog"};
const AREAS_LIST = [...new Set(MODS.map(m => m.grupo))];
let redraw = () => {}, curMod = null;
function show(id) {
  if (onLeave) { onLeave(); onLeave = null; }
  if (broto) { broto.dispose(); broto = null; }
  if (videoAtual) { videoAtual.destruir(); videoAtual = null; }
  const m = MODS.find(x => x.id === id) || MODS[0]; curMod = m; N = 0;
  try { localStorage.setItem("mc-mod", m.id); } catch (e) {}
  document.querySelectorAll("#nav button").forEach(b => b.setAttribute("aria-current", b.dataset.id === m.id));
  const main = $("#main"); main.dataset.area = document.documentElement.dataset.area = AREA[m.grupo]; Fundos.montar(AREA[m.grupo]);
  layoutDidatico(m, main);
  redraw = m.build($(".stage", main), $(".panel", main), $(".extra", main));
  main.insertAdjacentHTML("beforeend", finishHTML(m)); bindFinish();
  Progress.get().visited[m.id] = true; Progress.save(); renderAll();
}

/* aba do Campo Vivo: ocupa o lugar de um assunto */
function showCampo() {
  if (onLeave) { onLeave(); onLeave = null; }
  if (broto) { broto.dispose(); broto = null; }
  curMod = null; redraw = () => {}; try { localStorage.setItem("mc-mod", "campo"); } catch (e) {} Fundos.montar(null); delete document.documentElement.dataset.area;
  document.querySelectorAll("#nav button").forEach(b => b.setAttribute("aria-current", b.dataset.id === "campo"));
  const main = $("#main"); main.dataset.area = "calculo"; main.innerHTML = "";
  onLeave = CampoVivo.montar(main); renderAll();
}

/* ---------- layout didático: gancho, laboratório primeiro, contextos em abas, Python com cópia ---------- */
const ICONS = {
  agro: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20.5h18" /><path d="M5 20.5c1.5-2.5 4-3.5 7-3.5s5.500 1 7 3.500z" fill="currentColor" fill-opacity=".2" stroke="none"/><path d="M12 17V9"/><path d="M12 11.500C12 8 9.500 6 5.500 6c0 3.500 2.500 5.500 6.500 5.500z" fill="currentColor" fill-opacity=".2" stroke="none"/><path d="M12 11.500C12 8 9.500 6 5.500 6c0 3.500 2.500 5.500 6.500 5.500z"/><path d="M12 9c0-3.200 2.300-5 6-5 0 3.200-2.300 5-6 5z"/><circle cx="19" cy="6.500" r="0" /></svg>`,
  dia: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10h11v4.500a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z" fill="currentColor" fill-opacity=".2" stroke="none"/><path d="M5 10h11v4.500a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M16 11.500h1.500a2.500 2.500 0 0 1 0 5H16"/><path d="M8 3.500c0 1.500 1.200 1.500 1.200 3M12 3.500c0 1.500 1.200 1.500 1.200 3"/><path d="M4 21.500h13"/></svg>`,
  dados: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" fill-opacity=".2" stroke="none"/><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3"/><path d="M9.500 14.500l2-3 1.500 1.800 2-3.300"/></svg>`,
  publico: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9.500L12 4l9 5.500z" fill="currentColor" fill-opacity=".2" stroke="none"/><path d="M3 9.500L12 4l9 5.500z"/><path d="M5.500 11.500v6M10 11.500v6M14 11.500v6M18.500 11.500v6"/><path d="M3 20h18M4 17.500h16"/></svg>`,
  engenharia: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="6.500" fill="currentColor" fill-opacity=".2" stroke="none"/><path d="M10.200 3.500h3.600l.5 2.200 1.800.8 2-1.200 2.500 2.500-1.200 2 .8 1.800 2.200.5v3.600l-2.200.5-.8 1.800 1.200 2-2.500 2.500-2-1.200-1.800.8-.5 2.200h-3.600l-.5-2.200-1.800-.8-2 1.200-2.500-2.500 1.200-2-.8-1.800-2.200-.5v-3.600l2.200-.5.8-1.800-1.200-2 2.500-2.500 2 1.200 1.800-.8z" transform="translate(0 0) scale(.86) translate(1.950 1.950)"/><circle cx="12" cy="12" r="2.600"/></svg>`,
  negocios: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="8" width="18" height="12" rx="2" fill="currentColor" fill-opacity=".2" stroke="none"/><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V6.500A1.500 1.500 0 0 1 10.500 5h3A1.500 1.500 0 0 1 15 6.500V8M3 13.500h18"/><rect x="10.500" y="12" width="3" height="3" rx=".7"/></svg>`,
  todos: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="7.5" height="7.5" rx="2" fill="currentColor" fill-opacity=".2" stroke="none"/><rect x="13" y="13" width="7.5" height="7.5" rx="2" fill="currentColor" fill-opacity=".2" stroke="none"/><rect x="3.5" y="3.5" width="7.5" height="7.5" rx="2"/><rect x="13" y="3.5" width="7.5" height="7.5" rx="2"/><rect x="3.5" y="13" width="7.5" height="7.5" rx="2"/><rect x="13" y="13" width="7.5" height="7.5" rx="2"/></svg>`
};
/* contextos em que cada assunto é explicado; a escolha vale para o site inteiro e fica lembrada */
const CONTEXTOS = [{id: "todos", nome: "Todos"}, {id: "agro", nome: "Agro e ambiente"}, {id: "publico", nome: "Políticas públicas"}, {id: "engenharia", nome: "Engenharia"}, {id: "dados", nome: "Dados e IA"}, {id: "negocios", nome: "Negócios"}, {id: "dia", nome: "Dia a dia"}];
let ctxAtual = "todos"; try { const salvo = localStorage.getItem("mc-ctx"); if (CONTEXTOS.some(c => c.id === salvo)) ctxAtual = salvo; } catch (e) {}
function tex(el, s) {
  if (window.katex) { try { katex.render(s, el, {throwOnError: false}); return; } catch (e) {} }
  el.textContent = s.replace(/\\[a-z]+|[{}]/g, "");
}
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch (e) {}
  const t = document.createElement("textarea"); t.value = text; t.style.cssText = "position:fixed;opacity:0"; document.body.appendChild(t); t.select();
  let ok = false; try { ok = document.execCommand("copy"); } catch (e) {} t.remove(); return ok;
}
/* ---------- progresso: salvo no navegador, com cópia em memória se o armazenamento falhar ---------- */
const emptyProgress = () => ({done: {}, visited: {}, goals: {}, days: [], badges: {}, notas: {}, videos: {}, trilha: {}, cartoes: {}, foco: {}});
const Progress = (() => {
  let s = emptyProgress(), ok = true;
  try { const raw = localStorage.getItem("mc-progress"); if (raw) s = {...s, ...JSON.parse(raw)}; } catch (e) { ok = false; }
  return {
    get: () => s, persisted: () => ok,
    save() { try { localStorage.setItem("mc-progress", JSON.stringify(s)); } catch (e) { ok = false; } },
    reset() { s = emptyProgress(); this.save(); }
  };
})();
const cnt = o => Object.keys(o).length, today = () => new Date().toLocaleDateString("sv-SE");
const addDays = (iso, n) => { const d = new Date(iso + "T12:00:00"); d.setDate(d.getDate() + n); return d.toLocaleDateString("sv-SE"); };
function streak() {
  const days = new Set(Progress.get().days); let d = today(), n = 0; if (!days.has(d)) d = addDays(d, -1);
  while (days.has(d)) { n++; d = addDays(d, -1); } return n;
}
const ICON_SVG = k => k === "wheat" ? `<svg viewBox="0 0 28 110" aria-hidden="true"><use href="#wheat" width="28" height="110"/></svg>` : `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${k}"/></svg>`;
let badgeCache = null;
function badges() {
  if (badgeCache) return badgeCache;
  const areaBadges = AREAS_LIST.filter(g => MODS.filter(m => m.grupo === g).length >= 3).map(g => ({id: "talhao-" + AREA[g], nome: `${g} completo`, desc: `Estude todos os assuntos de ${g}.`, icon: "wheat", ok: s => MODS.filter(m => m.grupo === g).every(m => s.done[m.id])}));
  return badgeCache = [
    {id: "primeira", nome: "Primeiro assunto", desc: "Marque o primeiro assunto como estudado.", icon: "seed", ok: s => cnt(s.done) >= 1},
    {id: "mao", nome: "Mão na terra", desc: "Cumpra o seu primeiro desafio.", icon: "star", ok: s => cnt(s.goals) >= 1},
    {id: "taylor", nome: "Taylor de ponta a ponta", desc: "Cumpra os 3 desafios das Séries de Taylor.", icon: "star", ok: s => [0, 1, 2].every(i => s.goals["taylor:" + i])},
    {id: "explorador", nome: "Explorador", desc: "Visite 10 assuntos.", icon: "seed", ok: s => cnt(s.visited) >= 10},
    {id: "seq3", nome: "3 dias seguidos", desc: "Estude 3 dias em sequência.", icon: "flame", ok: () => streak() >= 3},
    {id: "seq7", nome: "Semana de estudo", desc: "Estude 7 dias em sequência.", icon: "flame", ok: () => streak() >= 7},
    ...areaBadges,
    {id: "safra", nome: "Caderno completo", desc: "Estude todos os assuntos.", icon: "wheat", ok: s => MODS.every(m => s.done[m.id])}
  ];
}
function toast(text) {
  let h = $("#toasts"); if (!h) { h = document.createElement("div"); h.id = "toasts"; h.setAttribute("aria-live", "polite"); document.body.appendChild(h); }
  const t = document.createElement("div"); t.className = "toast"; t.textContent = text; h.appendChild(t); confetti(innerWidth / 2, innerHeight - 70); setTimeout(() => t.remove(), 4200);
}
function checkBadges() {
  const s = Progress.get(); let any = false;
  for (const b of badges()) if (!s.badges[b.id] && b.ok(s)) { s.badges[b.id] = today(); any = true; toast(`Selo novo: ${b.nome}`); }
  if (any) Progress.save(); return any;
}
function touchDay() {
  const s = Progress.get(), d = today(); if (s.days.includes(d)) return;
  s.days.push(d); Progress.save(); checkBadges(); renderCaderno();
}
function onGoal(d) {
  const s = Progress.get(); s.goals[d.module + ":" + d.index] = today(); touchDay();
  const mod = MODS.find(m => m.id === d.module);
  if (mod && d.total && Array.from({length: d.total}, (_, i) => s.goals[d.module + ":" + i]).every(Boolean) && !s.done[mod.id]) { s.done[mod.id] = today(); toast(`${mod.nome}: assunto concluído!`); window.dispatchEvent(new CustomEvent("mc:done", {detail: {module: mod.id, done: true}})); }
  checkBadges(); Progress.save(); renderAll();
  const f = $(".finish"); if (f && curMod) { f.outerHTML = finishHTML(curMod); bindFinish(); }
}
function finishHTML(m) {
  const d = Progress.get().done[m.id];
  return `<div class="finish ${d ? "is-done" : ""}"><p>${d ? "Assunto estudado. Mais um passo no seu caderno." : "Terminou este assunto? Marque e veja o seu progresso crescer."}</p><button class="btn ${d ? "alt" : ""}" type="button" id="finish">${d ? "Desmarcar" : "Marcar como estudado"}</button></div>`;
}
function bindFinish() { const f = $("#finish"); if (f && curMod) f.onclick = () => toggleDone(curMod); }
function toggleDone(m) {
  const s = Progress.get();
  if (s.done[m.id]) delete s.done[m.id];
  else { s.done[m.id] = today(); const r = $("#finish").getBoundingClientRect(); confetti(r.left + r.width / 2, r.top); if (broto) broto.say("Assunto concluído. Bom trabalho!", "happy"); }
  touchDay(); checkBadges(); Progress.save(); renderAll();
  window.dispatchEvent(new CustomEvent("mc:done", {detail: {module: m.id, done: !!s.done[m.id]}}));
  $(".finish").outerHTML = finishHTML(m); bindFinish();
}
function renderAll() { renderTrail(); renderNav(); renderCaderno(); }
function renderTrail() {
  const s = Progress.get();
  $("#trail").innerHTML = `<div class="trail-title">Mapa da trilha <small>${cnt(s.done)}/${MODS.length} estudados</small></div>` + AREAS_LIST.map(g => {
    const ms = MODS.filter(m => m.grupo === g);
    return `<div class="plot" data-area="${AREA[g]}"><span class="plot-name">${g} <b>${ms.filter(m => s.done[m.id]).length}/${ms.length}</b></span><div class="plants">` + ms.map(m => {
      const st = s.done[m.id] ? 2 : s.visited[m.id] ? 1 : 0, lbl = ["ainda não visitado", "visitado", "estudado"][st], cur = curMod && curMod.id === m.id;
      return `<button class="plant s${st}${cur ? " cur" : ""}" type="button" data-id="${m.id}" title="${m.nome} · ${lbl}" aria-label="${m.nome}: ${lbl}"${cur ? ' aria-current="true"' : ""}><svg viewBox="0 0 26 34" aria-hidden="true"><use href="${ICONES.simbolo(m.id, st)}"/></svg></button>`;
    }).join("") + `</div></div>`;
  }).join("") + `<p class="trail-key"><span class="k"><svg viewBox="0 0 26 34" aria-hidden="true"><use href="#p0"/></svg>Não visto</span><span class="k"><svg viewBox="0 0 26 34" aria-hidden="true"><use href="#p1"/></svg>Visto: você abriu o assunto</span><span class="k"><svg viewBox="0 0 26 34" aria-hidden="true"><use href="#p2"/></svg>Estudado: completou os desafios</span></p>`;
  $("#trail").querySelectorAll(".plant").forEach(b => b.onclick = () => {
    show(b.dataset.id); $("#main").scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start"});
    const again = $(`#trail .plant[data-id="${b.dataset.id}"]`); if (again) again.focus({preventScroll: true});
  });
}
/* trocar de assunto não leva a página ao topo: só sobe se o começo do conteúdo já ficou para trás */
function manterNoConteudo() { const r = $("#main").getBoundingClientRect(); if (r.top < 0) window.scrollTo({top: window.scrollY + r.top - 12, behavior: "auto"}); }
function renderNav() {
  const s = Progress.get();
  document.querySelectorAll("#nav .grp[data-area]").forEach(d => { const ms = MODS.filter(m => AREA[m.grupo] === d.dataset.area); $(".cnt", d).textContent = `${ms.filter(m => s.done[m.id]).length}/${ms.length}`; });
  document.querySelectorAll("#nav button").forEach(b => { b.classList.toggle("done", !!s.done[b.dataset.id]); b.classList.toggle("nota", !!((s.notas || {})[b.dataset.id] || {}).t); });
}
/* bloco "Minhas anotações" do caderno: lista dos assuntos anotados e exportação */
function notasCaderno(s) {
  const n = s.notas || {}, com = MODS.filter(m => n[m.id] && n[m.id].t), esc = t => t.replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
  if (!com.length) return `<div class="notas-resumo"><h3 class="py">Minhas anotações</h3><p class="cad-vazio">Você ainda não anotou nada. Cada assunto tem um campo "Minhas anotações" no fim da página.</p></div>`;
  return `<div class="notas-resumo"><h3 class="py">Minhas anotações</h3><ul class="notas-lista">${com.map(m => `<li><button class="link" type="button" data-nota-ir="${m.id}">${esc(m.nome)}</button><p>${esc(n[m.id].t.trim().slice(0, 140))}${n[m.id].t.trim().length > 140 ? "…" : ""}</p></li>`).join("")}</ul>
    <div class="row"><button class="btn alt notas-copiar" type="button">Copiar tudo (Markdown)</button><button class="btn alt notas-baixar" type="button">Baixar .md</button></div></div>`;
}
let resetTm = 0;
function renderCaderno() {
  const s = Progress.get(), st = streak();
  $("#caderno").innerHTML = `<h2>Meu caderno</h2>
    <div class="cad-stats"><div class="stat"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-flame"/></svg><b>${st}</b><span>${st === 1 ? "dia seguido" : "dias seguidos"}</span></div>
      <div class="stat"><b>${cnt(s.done)}/${MODS.length}</b><span>assuntos estudados</span></div><div class="stat"><b>${cnt(s.goals)}</b><span>${cnt(s.goals) === 1 ? "desafio cumprido" : "desafios cumpridos"}</span></div><div class="stat"><b>${s.days.length}</b><span>${s.days.length === 1 ? "dia de estudo" : "dias de estudo"}</span></div></div>
    <ul class="badges">${badges().map(b => { const got = s.badges[b.id]; return `<li class="badge ${got ? "got" : "lock"}"><span class="stamp-ico" aria-hidden="true">${got ? ICON_SVG(b.icon) : "?"}</span><span class="b-txt"><b>${b.nome}</b><small>${got ? "Conquistado em " + got.split("-").reverse().join("/") : b.desc}</small></span></li>`; }).join("")}</ul>
    ${Progress.persisted() ? "" : `<p class="cad-note">Este navegador não deixou guardar o progresso. Ele vale só enquanto esta aba estiver aberta.</p>`}
    ${cartoesCaderno()}
    ${focoCaderno()}
    ${notasCaderno(s)}
    <button class="reset" type="button">Zerar progresso</button>`;
  ligarNotasCaderno();
  $(".cart-hoje", $("#caderno"))?.addEventListener("click", () => Cartoes.abrir(mapaEmOrdemDeFoco(), "Revisar hoje"));
  const r = $(".reset", $("#caderno"));
  r.onclick = () => { if (r.dataset.sure) { Progress.reset(); badgeCache = null; renderAll(); $(".finish") && ($(".finish").outerHTML = finishHTML(curMod), bindFinish()); return; } r.dataset.sure = "1"; r.textContent = "Tem certeza? Clique de novo para apagar tudo"; clearTimeout(resetTm); resetTm = setTimeout(() => { delete r.dataset.sure; r.textContent = "Zerar progresso"; }, 4000); };
}

/* ---------- Broto, o guia de campo: plantinha que comenta o que você faz ---------- */
let broto = null;
const BROTO_FACES = `
    <g class="f f-neutral"><g class="eyes"><ellipse cx="49" cy="86" rx="3.5" ry="4.8" fill="var(--edge)"/><ellipse cx="71" cy="86" rx="3.5" ry="4.8" fill="var(--edge)"/></g>
      <path d="M53 100Q60 105 67 100" fill="none" stroke="var(--edge)" stroke-width="2.8" stroke-linecap="round"/><ellipse cx="41" cy="96" rx="5.5" ry="3.2" fill="var(--terra)" opacity=".35"/><ellipse cx="79" cy="96" rx="5.5" ry="3.2" fill="var(--terra)" opacity=".35"/></g>
    <g class="f f-happy"><path d="M43 87Q49 78 55 87M65 87Q71 78 77 87" fill="none" stroke="var(--edge)" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M50 96Q60 112 70 96Z" fill="var(--edge)" stroke="var(--edge)" stroke-width="2" stroke-linejoin="round"/><ellipse cx="60" cy="104" rx="5" ry="3" fill="var(--terra)"/><ellipse cx="40" cy="96" rx="6" ry="3.6" fill="var(--terra)" opacity=".5"/><ellipse cx="80" cy="96" rx="6" ry="3.6" fill="var(--terra)" opacity=".5"/></g>
    <g class="f f-worried"><ellipse cx="49" cy="87" rx="3.8" ry="5.2" fill="var(--edge)"/><ellipse cx="71" cy="87" rx="3.8" ry="5.2" fill="var(--edge)"/>
      <path d="M42 76L55 80M78 76L65 80" fill="none" stroke="var(--edge)" stroke-width="3" stroke-linecap="round"/><path d="M51 104Q55.500 98 60 102T69 100" fill="none" stroke="var(--edge)" stroke-width="2.8" stroke-linecap="round"/>
      <path d="M90 70C86 76 85 80 90 82C95 80 94 76 90 70Z" fill="var(--water)" stroke="var(--edge)" stroke-width="1.8"/></g>
    <g class="f f-thinking"><circle cx="49" cy="86" r="5.3" fill="#fff" stroke="var(--edge)" stroke-width="2"/><circle cx="71" cy="86" r="5.3" fill="#fff" stroke="var(--edge)" stroke-width="2"/>
      <circle cx="51" cy="84" r="2.5" fill="var(--edge)"/><circle cx="73" cy="84" r="2.5" fill="var(--edge)"/><path d="M62 74Q69 69 77 74" fill="none" stroke="var(--edge)" stroke-width="3" stroke-linecap="round"/>
      <path d="M55 101H66" fill="none" stroke="var(--edge)" stroke-width="2.8" stroke-linecap="round"/>
      <circle cx="92" cy="62" r="3" fill="var(--ink-soft)"/><circle cx="100" cy="50" r="4.2" fill="var(--ink-soft)"/><circle cx="110" cy="34" r="6" fill="var(--ink-soft)"/></g>
`;
const BROTO_SVG = area => { const p = Personagens[area] || Personagens.calculo; return `<svg class="broto" viewBox="0 0 120 140" role="img" aria-label="${p.nome}, o guia de campo" data-mood="neutral" data-guia="${area || "calculo"}">
  <ellipse cx="60" cy="128" rx="38" ry="7" fill="var(--paper-2)" stroke="var(--edge)" stroke-width="2"/>
  <g class="sway">${p.corpo}${BROTO_FACES}</g></svg>`; };
function createBroto(host, area) {
  host.innerHTML = `${BROTO_SVG(area)}<div class="bubble"><p role="status" aria-live="polite"></p></div>`;
  const svg = $(".broto", host), bubble = $(".bubble", host), p = $("p", bubble); let idle = 0, back = 0;
  const arm = () => { clearTimeout(idle); idle = setTimeout(() => say("Hmm… parou? Mexe num controle e eu comento.", "thinking", true), 16000); };
  function say(text, mood = "neutral", keepIdle) {
    p.textContent = text; svg.dataset.mood = mood; bubble.classList.remove("pop"); void bubble.offsetWidth; bubble.classList.add("pop");
    clearTimeout(back); if (mood === "happy") back = setTimeout(() => { svg.dataset.mood = "neutral"; }, 4500);
    if (!keepIdle) arm();
  }
  arm(); return {say, dispose() { clearTimeout(idle); clearTimeout(back); }};
}

/* confete discreto: folhinhas e grãos que caem do ponto do acerto */
function confetti(x, y) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cols = ["--leaf", "--wheat", "--terra", "--water"].map(css);
  for (let i = 0; i < 26; i++) {
    const el = document.createElement("i"); el.className = "cf " + (i % 3 ? "leaf" : "grain"); el.style.background = cols[i % cols.length]; el.style.left = x + "px"; el.style.top = y + "px"; document.body.appendChild(el);
    const dx = (Math.random() - 0.5) * 260, dy = -40 - Math.random() * 120, r = (Math.random() - 0.5) * 720;
    el.animate([{transform: "translate(0,0) rotate(0)", opacity: 1}, {transform: `translate(${dx * 0.7}px,${dy}px) rotate(${r / 2}deg)`, opacity: 1, offset: .35}, {transform: `translate(${dx}px,${dy + 220}px) rotate(${r}deg)`, opacity: 0}], {duration: 1100 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.4,1)"}).onfinish = () => el.remove();
  }
}
window.addEventListener("mc:goal", e => {
  const r = e.detail && e.detail.el && e.detail.el.getBoundingClientRect(); if (r) confetti(r.left + 20, r.top + 18);
  if (e.detail) onGoal(e.detail);
});

/* desafios e reações do Broto, iguais para todos os assuntos.
   Cada assunto entrega: state() com os fatos do laboratório, goals com a meta e o teste, e react() com o comentário do Broto. */
function kit(mod, extra, {goals, state, react}) {
  const done = goals.map((_, i) => !!Progress.get().goals[mod + ":" + i]), memo = goals.map(() => ({}));
  extra.innerHTML = `<h3 class="goals-title">Desafios</h3><ol class="goals">${goals.map((g, i) => `<li class="goal${done[i] ? " done" : ""}" data-i="${i}"><span class="goal-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 13l5 5L20 6"/></svg></span><span>${g.t}</span></li>`).join("")}</ol><p class="goal-msg" role="status"></p>`;
  const ac = new AbortController(), root = extra.closest("main"); let armed = false, prev = null, tm = 0, last = "";
  ["input", "pointerdown", "click", "keydown"].forEach(ev => root.addEventListener(ev, () => { armed = true; }, {capture: true, signal: ac.signal}));
  const check = () => {
    let s; try { s = state(); } catch (e) { return; }
    const key = JSON.stringify(s); if (key === last) return; last = key;
    let won = false;
    if (armed) goals.forEach((g, i) => {
      if (done[i] || !g.ok(s, memo[i])) return;
      won = true; done[i] = true; const li = $(`.goal[data-i="${i}"]`, extra); li.classList.add("done", "just"); $(".goal-msg", extra).textContent = g.win(s);
      if (broto) { clearTimeout(tm); broto.say(g.win(s), "happy"); }
      window.dispatchEvent(new CustomEvent("mc:goal", {detail: {module: mod, index: i, total: goals.length, el: li}}));
    });
    const next = done.indexOf(false); extra.querySelectorAll(".goal").forEach((li, i) => li.classList.toggle("active", i === next));
    if (!won && armed && prev) { clearTimeout(tm); tm = setTimeout(() => { const r = react && react(s, prev); prev = s; if (r && broto) broto.say(r[0], r[1]); }, 450); }
    if (!prev) prev = s;
  };
  const iv = setInterval(check, 350), old = onLeave;
  onLeave = () => { clearInterval(iv); clearTimeout(tm); ac.abort(); if (old) old(); };
  check();
}

function renderEstudo(m, main) {
  if (!Array.isArray(m.formulas) || !Array.isArray(m.exemplos) || !Array.isArray(m.exercicios)) return;
  const root = document.createElement("section"); root.className = "estudo-study"; root.setAttribute("aria-label", "Material de estudo");
  const section = (title, cls) => { const el = document.createElement("section"); el.className = `estudo-block ${cls}`; const h = document.createElement("h3"); h.textContent = title; el.appendChild(h); root.appendChild(el); return el; };
  const formulas = section("Fórmulas essenciais", "estudo-formulas");
  const fg = document.createElement("div"); fg.className = "estudo-grid"; formulas.appendChild(fg);
  m.formulas.forEach(f => { const card = document.createElement("article"); card.className = "estudo-card"; const h = document.createElement("h4"); h.textContent = f.nome; const eq = document.createElement("p"); eq.className = "estudo-equation"; eq.textContent = f.expressao; const desc = document.createElement("p"); desc.textContent = f.significado; card.append(h, eq, desc); fg.appendChild(card); });
  const examples = section("Exemplos resolvidos", "estudo-examples");
  m.exemplos.forEach((ex, i) => { const card = document.createElement("article"); card.className = "estudo-example"; const h = document.createElement("h4"); h.textContent = `${i + 1}. ${ex.titulo}`; const prompt = document.createElement("p"); prompt.textContent = ex.enunciado; const ol = document.createElement("ol"); ex.passos.forEach(step => { const li = document.createElement("li"); li.textContent = step; ol.appendChild(li); }); const result = document.createElement("p"); result.className = "estudo-result"; result.textContent = ex.resultado; card.append(h, prompt, ol, result); examples.appendChild(card); });
  if (Array.isArray(m.erros) && m.erros.length) {
    const erros = section("Erros comuns", "estudo-erros");
    m.erros.forEach(x => { const card = document.createElement("article"); card.className = "estudo-erro"; const e = document.createElement("p"); e.className = "estudo-erro-t"; const tag = document.createElement("b"); tag.textContent = "Erro"; e.append(tag, " ", x.erro); const c = document.createElement("p"); c.className = "estudo-erro-c"; const tg2 = document.createElement("b"); tg2.textContent = "O certo"; c.append(tg2, " ", x.correcao); card.append(e, c); erros.appendChild(card); });
  }
  const exercises = section("Teste seu entendimento", "estudo-exercises");
  m.exercicios.forEach((ex, i) => { const card = document.createElement("article"); card.className = "estudo-exercise"; const h = document.createElement("h4"); h.textContent = `Questão ${i + 1}`; const q = document.createElement("p"); q.textContent = ex.pergunta; const details = document.createElement("details"); const summary = document.createElement("summary"); summary.textContent = "Ver resposta e resolução"; const answer = document.createElement("p"); answer.className = "estudo-answer"; answer.textContent = `Resposta: ${ex.resposta}`; const explanation = document.createElement("p"); explanation.textContent = ex.explicacao; details.append(summary, answer, explanation); card.append(h, q, details); exercises.appendChild(card); });
  /* botão de calculadora em cada exemplo e exercício */
  root.querySelectorAll(".estudo-example, .estudo-exercise").forEach(card => {
    const b = document.createElement("button"); b.type = "button"; b.className = "btn alt calc-abrir"; b.textContent = "Calculadora"; b.setAttribute("data-abre-calc", ""); b.setAttribute("aria-expanded", "false"); b.onclick = () => Calculadora.abrir(b);
    const alvo = card.querySelector("p"); if (alvo) alvo.insertAdjacentElement("afterend", b); else card.appendChild(b);
  });
  const ancora = $(".extra", main) || $(".lab", main); if (ancora) ancora.insertAdjacentElement("afterend", root); else main.appendChild(root);
}

/* mini-vídeo narrado do assunto, tocado dentro da página quando houver roteiro */
let videoAtual = null;
function videoHTML(m) {
  const ex = window.Explainers && window.Explainer && Explainers[m.id]; if (!ex || !window.gsap) return "";
  const d = ex.meta.duracao;
  return `<section class="video-wrap" aria-label="Mini-vídeo narrado"><div class="video-poster"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/></svg><div><p class="video-kick">Mini-vídeo narrado · ${Math.floor(d / 60)} min ${d % 60} s</p><p class="video-tit">${ex.meta.titulo}: o conceito em cenas</p></div><button class="btn" type="button" id="ver-video">Assistir</button></div><div class="video-host" hidden></div></section>`;
}
function montarVideo(m, main) {
  const wrap = $(".video-wrap", main); if (!wrap) return;
  $("#ver-video", wrap).onclick = () => {
    const host = $(".video-host", wrap); $(".video-poster", wrap).hidden = true; host.hidden = false;
    host.addEventListener("expl:fim", () => { const s = Progress.get(); s.videos = s.videos || {}; s.videos[m.id] = today(); Progress.save(); if (broto) broto.say("Boa! Agora mexa no laboratório e confira.", "happy"); });
    videoAtual = new Explainer.Player(host, Explainers[m.id]); videoAtual.play();
  };
}

/* anotações pessoais por assunto, guardadas junto do progresso */
const notaDe = id => ((Progress.get().notas || {})[id] || {}).t || "";
function salvarNota(id, texto) {
  const s = Progress.get(); s.notas = s.notas || {};
  if (texto.trim()) s.notas[id] = {t: texto, em: today()}; else delete s.notas[id];
  Progress.save(); renderNav(); renderCaderno(); pintarTrilha();
}
function notasEmMarkdown() {
  const n = Progress.get().notas || {}, partes = MODS.filter(m => n[m.id] && n[m.id].t).map(m => `## ${m.nome} (${m.grupo})\n\n${n[m.id].t.trim()}\n`);
  return partes.length ? `# Minhas anotações\n\n${partes.join("\n")}` : "";
}
function montarNotas(m, main) {
  const ta = $(".nota-txt", main), st = $(".notas-st", main); if (!ta) return; ta.value = notaDe(m.id); let tm = 0;
  ta.addEventListener("input", () => { st.textContent = "Salvando…"; clearTimeout(tm); tm = setTimeout(() => { salvarNota(m.id, ta.value); st.textContent = Progress.persisted() ? "Salvo neste navegador" : "Não consegui guardar: vale só enquanto a aba estiver aberta"; }, 400); });
  $(".nota-copiar", main).onclick = async e => { const b = e.currentTarget, ok = ta.value.trim() ? await copyText(ta.value) : false; b.textContent = ok ? "Copiado!" : "Nada para copiar"; setTimeout(() => { b.textContent = "Copiar"; }, 1600); };
  $(".nota-limpar", main).onclick = e => { const b = e.currentTarget; if (!ta.value) return; if (b.dataset.sure) { ta.value = ""; salvarNota(m.id, ""); st.textContent = "Anotação apagada"; delete b.dataset.sure; b.textContent = "Limpar"; return; } b.dataset.sure = "1"; b.textContent = "Apagar mesmo?"; setTimeout(() => { delete b.dataset.sure; b.textContent = "Limpar"; }, 3000); };
}
function ligarNotasCaderno() {
  const root = $("#caderno"), cp = $(".notas-copiar", root), bx = $(".notas-baixar", root); if (!cp) return;
  cp.onclick = async () => { const ok = await copyText(notasEmMarkdown()); cp.textContent = ok ? "Copiado!" : "Não consegui copiar"; setTimeout(() => { cp.textContent = "Copiar tudo (Markdown)"; }, 1600); };
  bx.onclick = () => { const url = URL.createObjectURL(new Blob([notasEmMarkdown()], {type: "text/markdown"})), a = document.createElement("a"); a.href = url; a.download = "minhas-anotacoes.md"; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); };
  root.querySelectorAll("[data-nota-ir]").forEach(b => b.onclick = () => { show(b.dataset.notaIr); $("#main").scrollIntoView({block: "start"}); });
}

/* trilha de aprendizagem: intuição, mãos na massa, exemplos, questões e revisão. A barra mostra onde a pessoa está em cada passo. */
const temEstudo = m => Array.isArray(m.exemplos) && Array.isArray(m.exercicios);
function trilhaHTML(m) {
  const passos = [["intuicao", "Intuição", ".head"], ["lab", "Mãos na massa", ".lab"], ...(temEstudo(m) ? [["exemplos", "Exemplos", ".estudo-examples"], ["questoes", "Questões", ".estudo-exercises"]] : []), ["revisao", "Revisão", ".revisao"]];
  return `<nav class="trilha" aria-label="Trilha deste assunto"><ol>${passos.map(([id, nome, alvo], i) => `<li><button type="button" data-passo="${id}" data-alvo="${alvo}"><span class="t-n">${i + 1}</span><span class="t-t">${nome}</span><span class="t-s" aria-hidden="true"></span></button></li>`).join("")}</ol></nav>`;
}
/* cartões de revisão: botão do assunto e bloco "Revisar hoje" no Meu caderno */
function rotuloCartoes(m) { const c = Cartoes.contar([m]); return c.pendentes ? `Cartões deste assunto (${c.pendentes} para rever)` : "Cartões deste assunto (em dia)"; }
const mapaEmOrdemDeFoco = () => [...MODS].sort((a, b) => (b.grupo === "Machine learning") - (a.grupo === "Machine learning"));
function focoCaderno() {
  const f = Progress.get().foco || {}, hoje = (f.dias || {})[today()] || 0, total = f.total || 0, top = Object.entries(f.assuntos || {}).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const nome = id => (MODS.find(m => m.id === id) || {nome: id}).nome, esc = t => String(t).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
  return `<div class="foco-resumo"><h3 class="py">Tempo de foco</h3><p><b>${hoje}</b> min hoje · <b>${total}</b> min no total · <b>${f.sessoes || 0}</b> ${(f.sessoes || 0) === 1 ? "sessão completa" : "sessões completas"}</p>${top.length ? `<ul class="foco-lista">${top.map(([id, min]) => `<li><span>${esc(nome(id))}</span><b>${min} min</b></li>`).join("")}</ul>` : `<p class="cart-nota">Abra o cronômetro de foco no canto da tela e estude sem sair da página: a muda cresce e vira uma planta na horta.</p>`}</div>`;
}
function cartoesCaderno() {
  const c = Cartoes.contar(MODS), msg = c.vencidos ? `<b>${c.vencidos}</b> para rever hoje e ${c.novos} novos.` : c.novos ? `Nenhum atrasado. ${c.novos} cartões novos esperando.` : "Tudo em dia por hoje.";
  return `<div class="cart-resumo"><h3 class="py">Cartões de revisão</h3><p>${msg}</p><p class="cart-nota">Machine learning entra primeiro. Até 10 cartões novos por sessão.</p><button class="btn cart-hoje" type="button" ${c.pendentes ? "" : "disabled"}>Revisar hoje</button></div>`;
}
/* fontes oficiais para aprofundar (links verificados em content/fontes-ml.js) */
function fontesHTML(m) {
  const lista = m.fontes || (typeof FONTES_ML !== "undefined" && FONTES_ML[m.id]); if (!lista || !lista.length) return "";
  const esc = t => String(t).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
  return `<section class="fontes" aria-label="Para aprofundar"><h3 class="py">Para aprofundar</h3><p class="fontes-lead">Fontes oficiais, do mais introdutório ao mais avançado. Abrem em outra aba.</p><ol class="fontes-lista">${lista.map(f => `<li><a href="${esc(f.url)}" target="_blank" rel="noopener noreferrer"><b>${esc(f.titulo)}</b></a><span class="fontes-meta">${esc(f.origem)} · ${f.idioma === "pt" ? "português" : "inglês"} · ${esc(f.nivel)}</span><span class="fontes-estude">${esc(f.estude)}</span></li>`).join("")}</ol></section>`;
}
function revisaoHTML(m) {
  const f = Array.isArray(m.formulas) ? m.formulas : [], esc = t => String(t).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
  return `<section class="revisao" aria-label="Revisão rápida"><h3 class="py">Revise em um minuto</h3>
    <p class="revisao-q"><b>Pergunta de ouro</b>${m.gancho}</p>
    ${f.length ? `<ul class="revisao-f">${f.map(x => `<li><span>${esc(x.nome)}</span><code>${esc(x.expressao)}</code></li>`).join("")}</ul>` : ""}
    <p>Sem olhar a página, responda a pergunta de ouro com as suas palavras.</p><div class="revisao-acoes"><button class="btn cart-abrir" type="button">${rotuloCartoes(m)}</button><button class="btn alt revisao-escrever" type="button">Escrever minha explicação</button></div></section>`;
}
function estadoTrilha(m, main) {
  const s = Progress.get(); s.trilha = s.trilha || {}; const t = s.trilha[m.id] || {}, goals = [...main.querySelectorAll(".goals .goal")], gf = goals.filter(g => g.classList.contains("done")).length;
  const qs = main.querySelectorAll(".estudo-exercise"), qa = Object.keys(t.q || {}).length, temVideo = !!main.querySelector(".video-wrap");
  return {
    intuicao: temVideo ? [!!(s.videos || {})[m.id], ""] : [!!t.d, ""],
    lab: goals.length ? [gf === goals.length, `${gf}/${goals.length}`] : [false, ""],
    exemplos: [!!t.ex, ""],
    questoes: qs.length ? [qa >= qs.length, `${qa}/${qs.length}`] : [false, ""],
    revisao: [!!notaDe(m.id) || !!s.done[m.id], ""]
  };
}
function pintarTrilha() {
  const m = curMod, main = $("#main"); if (!m || !main.querySelector(".trilha")) return;
  const est = estadoTrilha(m, main);
  main.querySelectorAll(".trilha button").forEach(b => { const [ok, txt] = est[b.dataset.passo] || [false, ""]; b.classList.toggle("feito", ok); b.querySelector(".t-s").textContent = ok ? "✓" : txt; b.setAttribute("aria-label", `${b.querySelector(".t-t").textContent}${ok ? ", concluído" : txt ? ", " + txt : ""}`); });
}
function montarTrilha(m, main) {
  const t = () => { const s = Progress.get(); s.trilha = s.trilha || {}; return (s.trilha[m.id] = s.trilha[m.id] || {}); };
  main.querySelectorAll(".trilha button").forEach(b => b.onclick = () => { const alvo = main.querySelector(b.dataset.alvo); if (alvo) alvo.scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start"}); });
  $(".more", main)?.addEventListener("click", () => { const x = t(); if (!x.d) { x.d = today(); Progress.save(); } pintarTrilha(); });
  main.querySelectorAll(".estudo-exercise details").forEach((d, i) => d.addEventListener("toggle", () => { if (!d.open) return; const x = t(); x.q = x.q || {}; if (!x.q[i]) { x.q[i] = 1; Progress.save(); } pintarTrilha(); }));
  const ex = [...main.querySelectorAll(".estudo-example")];
  if (ex.length && "IntersectionObserver" in window) { const vistos = new Set(), io = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) vistos.add(e.target); }); if (vistos.size === ex.length) { const x = t(); if (!x.ex) { x.ex = today(); Progress.save(); } io.disconnect(); pintarTrilha(); } }, {threshold: .5}); ex.forEach(e => io.observe(e)); const old = onLeave; onLeave = () => { io.disconnect(); if (old) old(); }; }
  $(".cart-abrir", main)?.addEventListener("click", () => Cartoes.abrir([m], m.nome));
  $(".revisao-escrever", main)?.addEventListener("click", () => { const ta = $(".nota-txt", main); ta.scrollIntoView({block: "center"}); ta.focus(); });
  main.addEventListener("expl:fim", pintarTrilha);
  pintarTrilha();
}
window.addEventListener("mc:foco", () => renderCaderno());
window.addEventListener("mc:cartoes", () => { renderCaderno(); const b = $(".cart-abrir", $("#main")); if (b && curMod) b.textContent = rotuloCartoes(curMod); });
window.addEventListener("mc:goal", () => setTimeout(pintarTrilha, 0));
window.addEventListener("mc:done", () => setTimeout(pintarTrilha, 0));

function layoutDidatico(m, main) {
  main.innerHTML = `<div class="head"><p class="eyebrow">${m.grupo}</p><h2>${m.nome}</h2><p class="gancho">${m.gancho}</p>
      <p class="lead">${m.resumo}</p>
      <button class="more" type="button" aria-expanded="false" aria-controls="detalhes">Quero mais detalhes</button><div class="detalhes" id="detalhes" hidden><p>${m.detalhes}</p></div></div>
    ${trilhaHTML(m)}
    ${videoHTML(m)}
    <div class="lab"><div class="stage"></div><div class="side"><div class="guide"></div><div class="panel"></div></div></div>
    <div class="extra"></div>
    <section class="ctx" aria-label="Onde isso aparece"><p class="ctx-titulo">Onde isso aparece</p><div class="tabs" role="tablist" aria-label="Contexto">${CONTEXTOS.map(c => `<button class="tab" role="tab" type="button" id="tab-${c.id}" data-ctx="${c.id}" aria-selected="${c.id === ctxAtual}" aria-controls="pn-ctx" tabindex="${c.id === ctxAtual ? 0 : -1}">${ICONS[c.id]}<span>${c.nome}</span></button>`).join("")}</div>
      <div class="tabpanel" role="tabpanel" id="pn-ctx"></div></section>
    <div class="pywrap"><div class="py-head"><h3 class="py">Em Python</h3><button class="btn alt copy" type="button">Copiar código</button></div><pre><code></code></pre></div>
    ${fontesHTML(m)}
    ${revisaoHTML(m)}
    <section class="notas" aria-label="Minhas anotações"><div class="notas-head"><h3 class="py">Minhas anotações</h3><span class="notas-st" role="status" aria-live="polite"></span></div>
      <textarea class="nota-txt" id="nota-${m.id}" rows="5" placeholder="O que você entendeu, uma dúvida, um exemplo seu…" aria-label="Anotações sobre ${m.nome}"></textarea>
      <div class="row"><button class="btn alt nota-copiar" type="button">Copiar</button><button class="btn alt nota-limpar" type="button">Limpar</button></div></section>`;
  $("pre code", main).textContent = m.python; PythonLab.montar($(".pywrap", main), m.python); renderEstudo(m, main); montarVideo(m, main); montarNotas(m, main); montarTrilha(m, main);
  broto = createBroto($(".guide", main), AREA[m.grupo]); broto.say(m.saudacao || `Oi! Eu sou ${(Personagens[AREA[m.grupo]] || Personagens.calculo).nome}. Mexe nos controles e eu te conto o que acontece.`, "happy");
  const more = $(".more", main), det = $("#detalhes", main);
  more.onclick = () => { const open = det.hidden; det.hidden = !open; more.setAttribute("aria-expanded", open); more.textContent = open ? "Menos detalhes" : "Quero mais detalhes"; };
  const tabs = [...main.querySelectorAll(".tab")], painel = $("#pn-ctx", main), T = CTX_TEXTO[m.id] || {};
  const pintar = () => {
    painel.setAttribute("aria-labelledby", "tab-" + ctxAtual);
    painel.innerHTML = ctxAtual === "todos" ? `<div class="ctx-todos">${CONTEXTOS.slice(1).map((c, i) => `<article class="ctx-nota n${i % 3}"><h4>${ICONS[c.id]}${c.nome}</h4><p>${T[c.id] || ""}</p></article>`).join("")}</div>` : `<p>${T[ctxAtual] || ""}</p>`;
    tabs.forEach(t => { const on = t.dataset.ctx === ctxAtual; t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1; });
  };
  const labDe = c => ({todos: "agro", dia: "negocios"}[c] || c), lab = {stage: $(".stage", main), panel: $(".panel", main), extra: $(".extra", main)};
  const reconstruir = () => {
    if (!CENARIOS[m.id]) return;
    if (onLeave) { onLeave(); onLeave = null; }
    lab.stage.innerHTML = ""; lab.panel.innerHTML = ""; lab.extra.innerHTML = ""; N = 0;
    redraw = m.build(lab.stage, lab.panel, lab.extra);
    if (broto) broto.say("Troquei o cenário do laboratório para esse contexto.", "thinking");
  };
  const escolher = id => { const antes = labDe(ctxAtual); ctxAtual = id; try { localStorage.setItem("mc-ctx", id); } catch (e) {} pintar(); if (labDe(id) !== antes) reconstruir(); };
  tabs.forEach((t, i) => { t.onclick = () => escolher(t.dataset.ctx); t.onkeydown = e => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { const j = (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length; escolher(tabs[j].dataset.ctx); tabs[j].focus(); } }; });
  pintar();
  const cp = $(".copy", main); let tm = 0;
  cp.onclick = async () => { const ok = await copyText((($(".py-code", main)) || {}).value || m.python); if (ok) window.dispatchEvent(new CustomEvent("mc:copy", {detail: {module: m.id}})); cp.textContent = ok ? "Copiado!" : "Não consegui copiar"; clearTimeout(tm); tm = setTimeout(() => { cp.textContent = "Copiar código"; }, 1800); };
}
const nav = $("#nav");
[...new Set(MODS.map(m => m.grupo))].forEach(g => {
  const d = document.createElement("div"); d.className = "grp"; d.dataset.area = AREA[g]; d.innerHTML = `<h4>${g}<span class="cnt"></span></h4>`;
  MODS.filter(m => m.grupo === g).forEach(m => { const b = document.createElement("button"); b.textContent = m.nome; b.dataset.id = m.id; b.onclick = () => { show(m.id); manterNoConteudo(); }; d.appendChild(b); });
  nav.appendChild(d);
});
{ /* aba especial: o Campo Vivo cresce com o progresso */
  const d = document.createElement("div"); d.className = "grp especial"; d.innerHTML = `<h4>Campo Vivo</h4>`;
  const b = document.createElement("button"); b.textContent = "Meu campo"; b.dataset.id = "campo"; b.onclick = () => { showCampo(); manterNoConteudo(); }; d.appendChild(b); nav.appendChild(d);
}

/* curvas de nível: campo de altitude com algumas colinas, desenhado por marching squares */
function contourSVG() {
  const W = 1200, H = 800, cs = 20, nx = W / cs, ny = H / cs;
  const hills = [[260, 190, 230, 1], [900, 580, 280, .9], [650, 110, 170, .6], [1060, 160, 150, .7], [180, 650, 210, .6]];
  const alt = (x, y) => hills.reduce((s, [cx, cy, r, a]) => s + a * Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / (2 * r * r)), 0) + 0.08 * Math.sin(x / 120 + y / 170);
  const V = Array.from({length: ny + 1}, (_, j) => Array.from({length: nx + 1}, (_, i) => alt(i * cs, j * cs)));
  let d = "";
  for (let L = 0.12; L < 1.2; L += 0.1) for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const a = V[j][i], b = V[j][i + 1], c = V[j + 1][i + 1], dd = V[j + 1][i], x = i * cs, y = j * cs;
    const k = (a >= L ? 8 : 0) | (b >= L ? 4 : 0) | (c >= L ? 2 : 0) | (dd >= L ? 1 : 0); if (k === 0 || k === 15) continue;
    const E = {t: [x + (L - a) / (b - a) * cs, y], r: [x + cs, y + (L - b) / (c - b) * cs], b: [x + (L - dd) / (c - dd) * cs, y + cs], l: [x, y + (L - a) / (dd - a) * cs]};
    const seg = {1: ["l", "b"], 2: ["b", "r"], 3: ["l", "r"], 4: ["t", "r"], 5: ["t", "l", "b", "r"], 6: ["t", "b"], 7: ["t", "l"], 8: ["t", "l"], 9: ["t", "b"], 10: ["t", "r", "l", "b"], 11: ["t", "r"], 12: ["l", "r"], 13: ["b", "r"], 14: ["l", "b"]}[k];
    for (let s = 0; s < seg.length; s += 2) { const p = E[seg[s]], q = E[seg[s + 1]]; d += `M${p[0].toFixed(0)} ${p[1].toFixed(0)}L${q[0].toFixed(0)} ${q[1].toFixed(0)}`; }
  }
  return `<svg class="contours" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`;
}
document.body.insertAdjacentHTML("afterbegin", contourSVG());

/* tema claro/escuro, lembrado no navegador quando possível */
(function () {
  const root = document.documentElement; let saved = null;
  try { saved = localStorage.getItem("mc-theme"); } catch (e) {}
  if (saved) root.dataset.theme = saved;
  $("#theme").addEventListener("click", () => {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches, next = dark ? "light" : "dark";
    root.dataset.theme = next; try { localStorage.setItem("mc-theme", next); } catch (e) {}
  });
})();
let first = location.hash.slice(1); try { first = first || localStorage.getItem("mc-mod"); } catch (e) {}
Foco.init({progress: Progress, getMod: () => curMod, toast, today, area: AREA});
CampoVivo.init({mods: MODS, progress: Progress, streak, today, toast, area: AREA, abrir: id => { show(id); $("#main").scrollIntoView({block: "start"}); }});
if (first === "campo") showCampo(); else show(first);
$("#main").addEventListener("input", e => { touchDay(); if (e.target.matches && e.target.matches(".nota-txt")) return; if (curMod) window.dispatchEvent(new CustomEvent("mc:lab", {detail: {module: curMod.id}})); }, true);
$("#main").addEventListener("click", e => { if (e.target.closest("button, .tab")) touchDay(); }, true);
const re = () => redraw();
new ResizeObserver(re).observe($("#main"));
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", re);
new MutationObserver(re).observe(document.documentElement, {attributes: true, attributeFilter: ["data-theme"]});
