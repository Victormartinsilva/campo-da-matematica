/* Cena SVG do Campo Vivo: céu, chão do bioma e as plantas desenhadas pelo L-System. */
const CampoCena = (() => {
  const C = CAMPO_CONFIG, W = 420, H = 280, POR_FILA = 6;
  const FILAS = [{y: 250, k: 1, dx: 0}, {y: 204, k: 0.8, dx: 34}];
  const n = v => v.toFixed(1);

  /* os ramos e as folhas de uma planta, já em pixels da cena */
  function arte(esp, estagio, frac, k, animar) {
    const fig = LSystem.gerar(esp, estagio), [h0, h1] = esp.altura, max = esp.lsystem.iteracoes;
    const alvo = (h0 + (h1 - h0) * estagio / max) * (1 + 0.08 * frac) * k, sc = alvo * fig.escala, tronco = Math.max(1.1, 1 + alvo / 55);
    const baldes = new Map();
    for (const [x1, y1, x2, y2, d] of fig.segs) { if (!baldes.has(d)) baldes.set(d, []); baldes.get(d).push(`M${n(x1 * sc)} ${n(y1 * sc)}L${n(x2 * sc)} ${n(y2 * sc)}`); }
    let svg = ""; const classe = animar ? "ramos draw" : "ramos";
    [...baldes.keys()].sort((a, b) => a - b).forEach(d => {
      svg += `<path class="${classe}" pathLength="1" d="${baldes.get(d).join("")}" stroke-width="${n(Math.max(1, tronco * Math.pow(0.72, d)))}" style="animation-delay:${(d * 0.16).toFixed(2)}s"/>`;
    });
    const r = Math.max(2, alvo * 0.034), ry = r * 0.55, passo = Math.max(1, Math.ceil(fig.folhas.length / 400));
    let f = ""; fig.folhas.forEach(([x, y], i) => { if (i % passo) return; const cx = x * sc, cy = y * sc; f += `M${n(cx - r)} ${n(cy)}a${n(r)} ${n(ry)} 0 1 0 ${n(2 * r)} 0a${n(r)} ${n(ry)} 0 1 0 ${n(-2 * r)} 0`; });
    if (f) svg += `<path class="folhas${animar ? " draw-folha" : ""}" d="${f}" style="animation-delay:${(estagio * 0.16 + 0.5).toFixed(2)}s"/>`;
    return svg;
  }

  /* o chão e os enfeites de cada bioma */
  function chao(bioma) {
    const terra = `<rect x="0" y="170" width="${W}" height="${H - 170}" class="terra"/>`;
    if (bioma === "pomar") return `<circle cx="352" cy="46" r="20" class="sol"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path class="raio" d="M352 46l${n(Math.cos(i * 0.785) * 32)} ${n(Math.sin(i * 0.785) * 32)}"/>`).join("")}${terra}<path class="grama" d="M0 170Q60 160 120 170T240 170T360 170T420 170V186H0Z"/><path class="sulco" d="M0 214H420M0 258H420"/>`;
    if (bioma === "mata") return `${terra}<path class="riacho" d="M0 212C50 196 80 228 140 212S240 196 300 214S380 226 420 208V232C380 250 340 238 300 236S200 222 140 236S40 250 0 234Z"/><path class="junco" d="M30 232v-26M38 232v-20M46 232v-30M386 226v-24M394 226v-30"/>`;
    return `${terra}<path class="sulco" d="M0 206H420M0 252H420"/><path class="cerca" d="M18 170v-22M52 170v-22M18 156h34M370 170v-22M404 170v-22M370 156h34"/>`;
  }

  /* itens: [{id, esp, estagio, frac, rotulo, animar, sel}] */
  function renderizar(bioma, itens, descricao) {
    let plantas = "";
    itens.forEach((it, i) => {
      const fila = FILAS[Math.floor(i / POR_FILA) % 2], col = i % POR_FILA, x = 46 + fila.dx + col * 62, y = fila.y, esp = C.especies[it.esp], max = esp.lsystem.iteracoes;
      plantas += `<g class="planta${it.sel ? " sel" : ""}" data-id="${it.id}" role="button" tabindex="0" aria-pressed="${!!it.sel}" aria-label="${it.rotulo}" transform="translate(${x} ${y})" style="--tronco:var(${esp.cores.tronco});--folha:var(${esp.cores.folha})">
        <title>${it.rotulo}</title><ellipse class="anel" cx="0" cy="3" rx="24" ry="6"/>${arte(esp, it.estagio, it.frac, fila.k, it.animar)}
        <g class="selo" transform="translate(0 16)"><rect x="-17" y="-8" width="34" height="14" rx="7"/><text y="3" text-anchor="middle">${it.estagio}/${max}</text></g></g>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}" class="cena-svg" data-bioma="${bioma}" role="group" aria-label="${descricao}"><rect width="${W}" height="${H}" class="ceu"/>${chao(bioma)}${plantas}</svg>`;
  }
  return {renderizar};
})();
