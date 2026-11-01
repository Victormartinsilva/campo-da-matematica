/* Ícones do mapa da trilha: um desenho por assunto, em três estágios (não visto, visto, estudado).
   Cada ícone dá o traço "v" (visto) e o desenho completo "e" (estudado), em 26 x 34. */
const ICONES = (() => {
  const W = "fill=\"var(--wheat)\"";
  const D = {
    ideia:     {v: `<circle cx="13" cy="24" r="3.5"/><path d="M13 20.500V15"/>`, e: `<path d="M3 28Q11 28 14 18T21 8"/><circle cx="21" cy="8" r="3" ${W}/>`},
    funcao:    {v: `<rect x="7" y="14" width="12" height="10" rx="2"/><path d="M2 19h5M19 19h5"/>`, e: `<rect x="2" y="16" width="9" height="9" rx="2"/><rect x="15" y="16" width="9" height="9" rx="2" ${W}/><path d="M11 20.500h4M5 13Q13 3 21 13"/>`},
    limite:    {v: `<path d="M3 26Q10 24 13 16"/><circle cx="14" cy="14" r="2.500"/>`, e: `<path d="M3 27Q9 25 12 17M23 27Q17 25 14 17"/><circle cx="13" cy="14.500" r="3" ${W}/>`},
    derivada:  {v: `<path d="M3 29Q13 -1 23 29"/>`, e: `<path d="M3 29Q13 -1 23 29"/><path d="M2 25L16 12"/><circle cx="9" cy="18.500" r="2.600" ${W}/>`},
    regras:    {v: `<rect x="3" y="14" width="20" height="8" rx="1.500"/><path d="M8 14v4M13 14v5M18 14v4"/>`, e: `<rect x="3" y="16" width="20" height="12" rx="2" ${W}/><path d="M9 16v-4h8v4M3 21.500h20"/>`},
    taylor:    {v: `<path d="M3 26L23 8"/>`, e: `<path d="M3 28C9 28 14 20 23 7"/><path d="M3 24L23 12"/><circle cx="13" cy="19" r="2.600" ${W}/>`},
    maxmin:    {v: `<path d="M2 29Q13 -2 24 29"/>`, e: `<path d="M2 29Q13 -2 24 29"/><path d="M13 14V4"/><path d="M13 4l8 3-8 3Z" ${W}/>`},
    newton:    {v: `<path d="M4 6L20 28M2 29h22"/>`, e: `<path d="M3 5Q18 10 24 28"/><path d="M4 6L20 28"/><circle cx="20" cy="28" r="2.600" ${W}/>`},
    integral:  {v: `<path d="M3 27Q13 5 23 27"/>`, e: `<path d="M3 28Q13 6 23 28Z" ${W}/>`},
    multiplas: {v: `<rect x="5" y="13" width="16" height="12" rx="1.500"/>`, e: `<path d="M5 25V14h13v11Z" ${W}/><path d="M18 14l4-4v11l-4 4M5 14l4-4h13"/>`},
    gradiente: {v: `<path d="M5 26L21 8M21 8h-7M21 8v7"/>`, e: `<ellipse cx="13" cy="19" rx="10" ry="6.500"/><ellipse cx="13" cy="19" rx="5" ry="3.200" ${W}/><path d="M3 29L11 22"/>`},
    matrizes:  {v: `<rect x="5" y="12" width="16" height="14" rx="1.500"/><path d="M13 12v14M5 19h16"/>`, e: `<path d="M8 11H4v17h4M18 11h4v17h-4"/><rect x="8.500" y="14" width="4" height="4" ${W}/><rect x="14" y="20" width="4" height="4" ${W}/>`},
    vetores:   {v: `<path d="M4 27L20 11M20 11h-6M20 11v6"/>`, e: `<path d="M4 27H13M4 27L9 13M4 27L21 14"/><circle cx="21" cy="14" r="2.800" ${W}/>`},
    "leis-newton": {v: `<rect x="6" y="18" width="10" height="8" rx="1.500"/><path d="M16 22h7M20 19l3 3-3 3"/>`, e: `<rect x="8" y="17" width="10" height="9" rx="1.500" ${W}/><path d="M2 21.500h6M5 18.500l-3 3 3 3M18 21.500h6M21 18.500l3 3-3 3"/>`},
    propulsao: {v: `<path d="M13 4Q19 10 18 21H8Q7 10 13 4Z"/>`, e: `<path d="M13 3Q19 9 18 20H8Q7 9 13 3Z"/><circle cx="13" cy="11" r="2.400" ${W}/><path d="M10 21l-3 4M16 21l3 4M13 23v6"/>`},
    gravidade: {v: `<circle cx="13" cy="20" r="6"/>`, e: `<circle cx="13" cy="20" r="4" ${W}/><ellipse cx="13" cy="20" rx="10" ry="5.500"/><circle cx="23" cy="20" r="2" fill="currentColor"/>`},
    manobras:  {v: `<path d="M4 28Q4 8 22 8M22 8h-5M22 8v5"/>`, e: `<circle cx="9" cy="22" r="3.200" ${W}/><path d="M9 14Q23 13 23 22"/><path d="M3 22a6 6 0 0 1 12 0"/>`},
    "fisica-engenharia": {v: `<circle cx="13" cy="20" r="5"/><path d="M13 11v3M13 26v3M4 20h3M19 20h3M7 14l2 2M17 24l2 2M19 14l-2 2M9 24l-2 2"/>`, e: `<circle cx="13" cy="20" r="5.500" ${W}/><circle cx="13" cy="20" r="1.800" fill="var(--paper)"/><path d="M13 10v3M13 27v2M3 20h3M20 20h3M6 13l2 2M18 25l2 2M20 13l-2 2M8 25l-2 2"/>`},
    estatistica: {v: `<path d="M5 27V21M10 27V15M15 27V18M20 27V23"/>`, e: `<path d="M3 27C8 27 8 8 13 8S18 27 23 27Z" ${W}/>`},
    regressao: {v: `<circle cx="6" cy="24" r="1.600"/><circle cx="12" cy="19" r="1.600"/><circle cx="17" cy="17" r="1.600"/><circle cx="22" cy="10" r="1.600"/>`, e: `<path d="M3 27L24 8"/><circle cx="6" cy="24" r="2" ${W}/><circle cx="12" cy="19" r="2" ${W}/><circle cx="17" cy="17" r="2" ${W}/><circle cx="22" cy="10" r="2" ${W}/>`},
    otimizadores: {v: `<path d="M3 11Q13 36 23 11"/>`, e: `<path d="M3 11Q13 36 23 11"/><circle cx="13" cy="25" r="3" ${W}/><path d="M5 14l2 3M8 19l2 3"/>`},
    overfit:   {v: `<path d="M3 25Q6 9 9 22T15 13T23 21"/>`, e: `<path d="M3 25Q13 5 23 21"/><circle cx="6" cy="19" r="1.800" ${W}/><circle cx="12" cy="13" r="1.800" ${W}/><circle cx="18" cy="14" r="1.800" ${W}/>`},
    logistica: {v: `<path d="M3 26C11 26 11 10 23 10"/>`, e: `<path d="M3 26C11 26 11 10 23 10"/><path d="M13 5v22"/><circle cx="13" cy="18" r="3" ${W}/>`},
    rede:      {v: `<circle cx="5" cy="19" r="2.500"/><circle cx="13" cy="19" r="2.500"/><circle cx="21" cy="19" r="2.500"/><path d="M7.500 19h3M15.500 19h3"/>`, e: `<path d="M7 14L11 11M7 14L11 19M7 24L11 19M7 24L11 27M15 11L19 19M15 19H19M15 27L19 19"/><circle cx="5" cy="14" r="2.200"/><circle cx="5" cy="24" r="2.200"/><circle cx="13" cy="11" r="2.200"/><circle cx="13" cy="19" r="2.200"/><circle cx="13" cy="27" r="2.200"/><circle cx="21" cy="19" r="2.800" ${W}/>`},
    embeddings: {v: `<path d="M4 27L18 13"/><circle cx="18" cy="13" r="2.400"/>`, e: `<path d="M4 27L17 11M4 27L21 15M4 27L21 22"/><circle cx="17" cy="11" r="2.200" ${W}/><circle cx="21" cy="15" r="2.200" ${W}/><circle cx="21" cy="22" r="2.200" ${W}/>`},
    atencao:   {v: `<path d="M2 20Q13 8 24 20Q13 32 2 20Z"/>`, e: `<path d="M2 22Q13 10 24 22Q13 34 2 22Z"/><circle cx="13" cy="22" r="3.400" ${W}/><path d="M13 5v3M5 9l2 2M21 9l-2 2"/>`},
    token:     {v: `<rect x="8" y="14" width="10" height="10" rx="2"/>`, e: `<rect x="2" y="16" width="6" height="8" rx="1.500"/><rect x="10" y="16" width="6" height="8" rx="1.500"/><rect x="18" y="16" width="6" height="8" rx="1.500" ${W}/>`},
    trilha:    {v: `<path d="M4 28Q20 26 8 19T20 10"/>`, e: `<path d="M4 28Q20 26 8 19T20 10"/><path d="M20 10V3"/><path d="M20 3l5 2-5 2Z" ${W}/>`},
    jogos:     {v: `<rect x="5" y="12" width="16" height="16" rx="3"/><circle cx="13" cy="20" r="1.400" fill="currentColor"/>`, e: `<rect x="5" y="12" width="16" height="16" rx="3" ${W}/><circle cx="9.500" cy="16" r="1.400" fill="currentColor"/><circle cx="13" cy="20" r="1.400" fill="currentColor"/><circle cx="16.500" cy="24" r="1.400" fill="currentColor"/>`}
  };
  const mont = (corpo, st) => `<path d="M3 31Q13 ${st ? 25 : 24} 23 31Z" fill="var(--soil)"/><g fill="none" stroke="${st ? "currentColor" : "var(--ink-soft)"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${st ? "" : ` stroke-dasharray="2 3" opacity=".7"`}>${corpo}</g>`;
  const defs = Object.entries(D).map(([id, d]) => [0, 1, 2].map(st => `<symbol id="ic-${id}-${st}" viewBox="0 0 26 34">${mont(st === 2 ? d.e : d.v, st)}</symbol>`).join("")).join("");
  const s = document.createElementNS("http://www.w3.org/2000/svg", "svg"); s.setAttribute("width", "0"); s.setAttribute("height", "0"); s.setAttribute("aria-hidden", "true"); s.style.position = "absolute"; s.innerHTML = defs; document.body.prepend(s);
  return {tem: id => id in D, simbolo: (id, st) => (id in D ? `#ic-${id}-${st}` : `#p${st}`)};
})();
