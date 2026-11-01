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
    gradiente: {v: `<path d="M5 26L21 8M21 8h-7M21 8v7"/>`, e: `<ellipse cx="13" cy="19" rx="10" ry="6.500"/><ellipse cx="13" cy="19" rx="5" ry="3.200" ${W}/><path d="M3 29L11 22"/>`}
  };
  const mont = (corpo, st) => `<path d="M3 31Q13 ${st ? 25 : 24} 23 31Z" fill="var(--soil)"/><g fill="none" stroke="${st ? "currentColor" : "var(--ink-soft)"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${st ? "" : ` stroke-dasharray="2 3" opacity=".7"`}>${corpo}</g>`;
  const defs = Object.entries(D).map(([id, d]) => [0, 1, 2].map(st => `<symbol id="ic-${id}-${st}" viewBox="0 0 26 34">${mont(st === 2 ? d.e : d.v, st)}</symbol>`).join("")).join("");
  const s = document.createElementNS("http://www.w3.org/2000/svg", "svg"); s.setAttribute("width", "0"); s.setAttribute("height", "0"); s.setAttribute("aria-hidden", "true"); s.style.position = "absolute"; s.innerHTML = defs; document.body.prepend(s);
  return {tem: id => id in D, simbolo: (id, st) => (id in D ? `#ic-${id}-${st}` : `#p${st}`)};
})();
