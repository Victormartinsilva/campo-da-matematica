/* Cena simples só para testar o player: terreno, bandeira, faixa e um ponto móvel. */
window.Cenas = window.Cenas || {};
Cenas.teste = {
  viewBox: "0 0 800 450",
  svg: `<g id="ceu"><rect width="800" height="450" fill="color-mix(in srgb, var(--water) 16%, var(--card))"/></g>
    <g id="chao"><rect y="330" width="800" height="120" fill="color-mix(in srgb, var(--soil) 55%, var(--card))"/></g>
    <g id="faixa"><rect x="355" y="120" width="90" height="210" fill="var(--leaf)" opacity=".22"/></g>
    <path id="relevo" pathLength="1" d="M60 300C160 250 240 190 330 175C400 165 470 190 560 250C620 290 680 300 740 285" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/>
    <g id="bandeira"><path d="M400 172V118" stroke="var(--soil)" stroke-width="5" stroke-linecap="round"/><path d="M400 118l38 12-38 12z" fill="var(--terra)" stroke="var(--edge)" stroke-width="3" stroke-linejoin="round"/></g>
    <g id="ponto"><circle cx="470" cy="190" r="12" fill="var(--wheat)" stroke="var(--edge)" stroke-width="4"/></g>`,
  ocultos: ["bandeira", "faixa", "ponto", "relevo"]
};
