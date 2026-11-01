/* Fundo inteiro de cada matéria: uma cena desenhada em SVG, fixa atrás da página, no lugar das curvas de nível.
   As cenas usam só variáveis de cor do tema (claro e escuro) e opacidade baixa para não competir com o texto. */
const Fundos = (() => {
  const rng = seed => () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
  const W = 1440, H = 900, f = n => +n.toFixed(1);
  const gauss = r => { let u = 0, v = 0; while (!u) u = r(); while (!v) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };

  const CENAS = {
    /* curvas de várias famílias, com tangentes e pontos */
    calculo() {
      const r = rng(11); let s = "";
      for (let i = 0; i < 9; i++) {
        const A = 40 + r() * 90, k = 0.004 + r() * 0.006, ph = r() * 6, y0 = 80 + i * 95; let d = "";
        for (let x = -20; x <= W + 20; x += 20) d += (x < 0 ? "M" : "L") + f(x) + " " + f(y0 + A * Math.sin(k * x * 2.2 + ph));
        s += `<path d="${d}" stroke="var(--area-ink)" stroke-opacity="${f(0.08 + r() * 0.08)}" stroke-width="1.6"/>`;
        const x0 = 150 + r() * (W - 300), yy = y0 + A * Math.sin(k * x0 * 2.2 + ph), m = A * k * 2.2 * Math.cos(k * x0 * 2.2 + ph);
        s += `<path d="M${f(x0 - 60)} ${f(yy - 60 * m)}L${f(x0 + 60)} ${f(yy + 60 * m)}" stroke="var(--terra)" stroke-opacity=".28" stroke-width="1.4" stroke-dasharray="5 5"/><circle cx="${f(x0)}" cy="${f(yy)}" r="3.5" fill="var(--terra)" fill-opacity=".35"/>`;
      }
      return s;
    },
    /* grade inclinada de um plano com vetores */
    algebra() {
      let s = "";
      const lin = (ang, esp, op) => { const c = Math.cos(ang), sn = Math.sin(ang), n = Math.ceil((W + H) / esp); for (let i = -n; i <= n; i++) { const ox = W / 2 + i * esp * -sn, oy = H / 2 + i * esp * c; s += `<path d="M${f(ox - c * 2000)} ${f(oy - sn * 2000)}L${f(ox + c * 2000)} ${f(oy + sn * 2000)}" stroke="var(--area-ink)" stroke-opacity="${op}" stroke-width="1"/>`; } };
      lin(0.35, 70, .09); lin(1.25, 70, .09);
      const seta = (x, y, dx, dy, c) => { const a = Math.atan2(dy, dx), x2 = x + dx, y2 = y + dy; return `<path d="M${x} ${y}L${x2} ${y2}M${f(x2 - 14 * Math.cos(a - 0.45))} ${f(y2 - 14 * Math.sin(a - 0.45))}L${x2} ${y2}L${f(x2 - 14 * Math.cos(a + 0.45))} ${f(y2 - 14 * Math.sin(a + 0.45))}" stroke="${c}" stroke-opacity=".38" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; };
      s += seta(W * .72, H * .74, 170, -90, "var(--terra)") + seta(W * .72, H * .74, 60, -210, "var(--water)") + seta(W * .72, H * .74, 230, -300, "var(--leaf)");
      s += seta(W * .12, H * .28, 120, 60, "var(--water)") + seta(W * .12, H * .28, -30, 140, "var(--terra)");
      return s;
    },
    /* espaço: névoa, estrelas, órbitas e um planeta */
    fisica() {
      const r = rng(7); let s = `<defs><radialGradient id="fg-n1"><stop offset="0" stop-color="var(--area-fill)" stop-opacity=".28"/><stop offset="1" stop-color="var(--area-fill)" stop-opacity="0"/></radialGradient><radialGradient id="fg-n2"><stop offset="0" stop-color="var(--beet)" stop-opacity=".18"/><stop offset="1" stop-color="var(--beet)" stop-opacity="0"/></radialGradient></defs>`;
      s += `<ellipse cx="${W * .78}" cy="${H * .2}" rx="520" ry="300" fill="url(#fg-n1)"/><ellipse cx="${W * .15}" cy="${H * .85}" rx="480" ry="280" fill="url(#fg-n2)"/>`;
      for (let i = 0; i < 160; i++) { const g = r(); s += `<circle cx="${f(r() * W)}" cy="${f(r() * H)}" r="${f(g > .94 ? 2.2 : g > .7 ? 1.4 : .8)}" fill="var(--ink)" fill-opacity="${f(.12 + r() * .3)}"/>`; }
      [[300, 120, -22], [430, 190, -22], [560, 270, -22]].forEach(([rx, ry, rot]) => { s += `<ellipse cx="${W * .76}" cy="${H * .7}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${W * .76} ${H * .7})" fill="none" stroke="var(--area-ink)" stroke-opacity=".2" stroke-width="1.4" stroke-dasharray="3 7"/>`; });
      s += `<circle cx="${W * .76}" cy="${H * .7}" r="40" fill="var(--area-fill)" fill-opacity=".35" stroke="var(--area-ink)" stroke-opacity=".3" stroke-width="2"/><path d="M${W * .76 - 62} ${H * .7 + 4}Q${W * .76} ${H * .7 - 18} ${W * .76 + 62} ${H * .7 + 4}" fill="none" stroke="var(--area-ink)" stroke-opacity=".3" stroke-width="2"/>`;
      s += `<circle cx="${W * .17}" cy="${H * .22}" r="16" fill="var(--wheat)" fill-opacity=".3"/>`;
      return s;
    },
    /* nuvem de pontos, curvas de distribuição e barras de histograma */
    estatistica() {
      const r = rng(5); let s = "";
      [[W * .3, H * .35, 150, 90], [W * .7, H * .62, 170, 100]].forEach(([cx, cy, sx, sy], k) => { for (let i = 0; i < 120; i++) s += `<circle cx="${f(cx + gauss(r) * sx)}" cy="${f(cy + gauss(r) * sy)}" r="2.4" fill="var(${k ? "--terra" : "--area-ink"})" fill-opacity="${f(.12 + r() * .22)}"/>`; });
      const bell = (cx, base, a, w, c) => { let d = ""; for (let x = cx - 3 * w; x <= cx + 3 * w; x += 10) d += (x === cx - 3 * w ? "M" : "L") + f(x) + " " + f(base - a * Math.exp(-((x - cx) ** 2) / (2 * w * w))); return `<path d="${d}" fill="none" stroke="var(${c})" stroke-opacity=".3" stroke-width="2"/>`; };
      s += bell(W * .3, H * .94, 170, 90, "--area-ink") + bell(W * .7, H * .94, 200, 80, "--terra");
      for (let i = 0; i < 24; i++) { const h = 30 + 150 * Math.exp(-((i - 12) ** 2) / 30) + r() * 20; s += `<rect x="${60 + i * 56}" y="${f(H - h)}" width="40" height="${f(h)}" fill="var(--area-fill)" fill-opacity=".09"/>`; }
      return s;
    },
    /* rede de nós em camadas */
    ml() {
      const r = rng(9); let s = ""; const camadas = [4, 6, 6, 5, 3], xs = camadas.map((_, i) => 140 + i * ((W - 280) / (camadas.length - 1))), nos = camadas.map((n, i) => Array.from({length: n}, (_, j) => [xs[i] + (r() - .5) * 30, 130 + (j + .5) * ((H - 260) / n) + (r() - .5) * 24]));
      nos.slice(0, -1).forEach((c, i) => c.forEach(a => nos[i + 1].forEach(b => { if (r() > .45) s += `<path d="M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}" stroke="var(--area-ink)" stroke-opacity="${f(.05 + r() * .09)}" stroke-width="1"/>`; })));
      nos.forEach((c, i) => c.forEach(p => { const on = r() > .7; s += `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="${on ? 9 : 6}" fill="var(${on ? "--wheat" : "--area-fill"})" fill-opacity="${on ? .38 : .22}" stroke="var(--area-ink)" stroke-opacity=".3" stroke-width="1.5"/>`; }));
      return s;
    },
    /* árvore de decisão com losangos e um tabuleiro ao fundo */
    decisao() {
      let s = ""; const T = 90;
      for (let y = 0; y < H / T + 1; y++) for (let x = 0; x < W / T + 1; x++) if ((x + y) % 2) s += `<rect x="${x * T}" y="${y * T}" width="${T}" height="${T}" fill="var(--area-fill)" fill-opacity=".05"/>`;
      const no = (x, y, rom) => rom ? `<path d="M${x} ${y - 22}L${x + 28} ${y}L${x} ${y + 22}L${x - 28} ${y}Z" fill="var(--card)" fill-opacity=".6" stroke="var(--area-ink)" stroke-opacity=".4" stroke-width="2"/>` : `<circle cx="${x}" cy="${y}" r="14" fill="var(--wheat)" fill-opacity=".35" stroke="var(--area-ink)" stroke-opacity=".4" stroke-width="2"/>`;
      const lig = (a, b) => `<path d="M${a[0]} ${a[1]}C${a[0] + 80} ${a[1]} ${b[0] - 80} ${b[1]} ${b[0]} ${b[1]}" fill="none" stroke="var(--area-ink)" stroke-opacity=".25" stroke-width="1.8"/>`;
      const raiz = [150, 450], n1 = [[430, 300], [430, 600]], n2 = [[720, 200], [720, 380], [720, 520], [720, 700]], folhas = [[1000, 150], [1000, 250], [1000, 340], [1000, 430], [1000, 500], [1000, 600], [1000, 680], [1000, 760]];
      n1.forEach(p => { s += lig(raiz, p); }); n2.forEach((p, i) => { s += lig(n1[i >> 1], p); }); folhas.forEach((p, i) => { s += lig(n2[i >> 1], p); });
      s += no(...raiz, true); n1.forEach(p => { s += no(...p, true); }); n2.forEach(p => { s += no(...p, true); }); folhas.forEach(p => { s += no(...p, false); });
      return `<g transform="translate(${W * .24} 0)">${s.slice(s.indexOf("<path"))}</g>` + s.slice(0, s.indexOf("<path"));
    }
  };

  let el = null;
  function montar(area) {
    const raiz = document.documentElement;
    if (!area || !CENAS[area]) { if (el) el.hidden = true; delete raiz.dataset.fundo; return; }
    if (!el) { el = document.createElement("div"); el.id = "fundo"; el.setAttribute("aria-hidden", "true"); document.body.prepend(el); }
    if (el.dataset.area !== area) { el.dataset.area = area; el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">${CENAS[area]()}</svg>`; }
    el.hidden = false; raiz.dataset.fundo = area;
  }
  return {montar};
})();
