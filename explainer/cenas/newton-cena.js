/* Cena SVG do mini-video "Metodo de Newton": regua apoiada na curva, desenhada a mao em papel quadriculado.
   f(x) = x^2 - 2, raiz = 1,41421356. Pixels: x_px = 230 + 150*(x - 0,5) ; y_px = 300 - 45*f.
   Chute x0 = 2; x1 = 1.5; x2 = 1.41667; x3 = 1.41421569. Erros: 5.86e-1, 8.58e-2, 2.45e-3, 2.12e-6.
   Falha: x0 = 0,1, f'(0,1) = 0,2, x1 = 10,05. Bissecao em [1,2] ate erro <= 2.12e-6: 15 passos. */
window.Cenas = window.Cenas || {};
Cenas.newton = {
  viewBox: "0 0 800 450",
  svg: `<g id="papel">
  <rect x="0" y="0" width="800" height="450" fill="var(--card)"/>
  <path d="M0 0V450M25 0V450M50 0V450M75 0V450M100 0V450M125 0V450M150 0V450M175 0V450M200 0V450M225 0V450M250 0V450M275 0V450M300 0V450M325 0V450M350 0V450M375 0V450M400 0V450M425 0V450M450 0V450M475 0V450M500 0V450M525 0V450M550 0V450M575 0V450M600 0V450M625 0V450M650 0V450M675 0V450M700 0V450M725 0V450M750 0V450M775 0V450M800 0V450M0 0H800M0 25H800M0 50H800M0 75H800M0 100H800M0 125H800M0 150H800M0 175H800M0 200H800M0 225H800M0 250H800M0 275H800M0 300H800M0 325H800M0 350H800M0 375H800M0 400H800M0 425H800M0 450H800" fill="none" stroke="var(--grid)" stroke-width="1.5"/>
  <path d="M52 0V450" fill="none" stroke="var(--terra)" stroke-width="2" opacity="0.35"/>
  <circle cx="22" cy="60" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="150" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="240" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="330" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="400" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/>
</g>
<g id="grafico">
  <path id="eixos" pathLength="1" d="M226 400V120M218 132L226 120L234 132M214 300H566M554 292L566 300L554 308" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="rotulos" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="240" y="134" text-anchor="start" font-size="22" fill="var(--ink)" >f(x)</text><text x="572" y="326" text-anchor="start" font-size="22" fill="var(--ink)" >x</text><text x="236" y="288" text-anchor="start" font-size="21" fill="var(--terra)" >chão: f = 0</text></g>
  <path id="curva" pathLength="1" d="M230 378.8L237.1 376.5L244.3 374.1L251.4 371.4L258.5 368.6L265.6 365.5L272.8 362.3L279.9 358.8L287 355.2L294.1 351.3L301.3 347.2L308.4 343L315.5 338.5L322.6 333.8L329.8 328.9L336.9 323.8L344 318.6L351.1 313.1L358.3 307.4L365.4 301.5L372.5 295.4L379.6 289.1L386.8 282.6L393.9 275.9L401 269L408.1 261.9L415.3 254.5L422.4 247L429.5 239.3L436.6 231.4L443.8 223.2L450.9 214.9L458 206.4L465.1 197.6L472.3 188.7L479.4 179.6L486.5 170.2L493.6 160.7L500.8 150.9L507.9 141L515 130.8" fill="none" stroke="var(--water)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="raiz-alvo" style="font-family:var(--f-hand)">
    <circle cx="367.1" cy="300" r="8" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
    <text x="262" y="268" text-anchor="start" font-size="24" fill="var(--ink)" >raiz</text>
    <path d="M302 274C328 280 348 286 360 294M360 294l-12 -1M360 294l-4 -11" fill="none" stroke="var(--terra)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  </g>
  <g id="x0-ponto"><path d="M455 300V210" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round" filter="url(#rough)"/><circle cx="455" cy="210" r="7" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3"/><circle cx="455" cy="300" r="6" fill="var(--terra)" stroke="var(--ink)" stroke-width="2.5"/></g>
  <g id="regua" filter="url(#rough)"><g transform="translate(439 229.2) rotate(-50.2)"><rect x="-115" y="0" width="230" height="22" rx="3" fill="var(--wheat)" fill-opacity="0.75" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/><path d="M-110 0V13M-99 0V7M-88 0V7M-77 0V7M-66 0V7M-55 0V13M-44 0V7M-33 0V7M-22 0V7M-11 0V7M0 0V13M11 0V7M22 0V7M33 0V7M44 0V7M55 0V13M66 0V7M77 0V7M88 0V7M99 0V7M110 0V13" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/></g></g>
  <path id="tang-0" pathLength="1" d="M365.4 317.6L503 152.4" fill="none" stroke="var(--terra)" stroke-width="5" stroke-linecap="round" filter="url(#rough)"/>
  <g id="rot-tang" style="font-family:var(--f-hand)" fill="var(--terra)"><text x="440" y="150" text-anchor="end" font-size="23" fill="var(--ink)" >tangente</text><text x="440" y="176" text-anchor="end" font-size="21" fill="var(--ink)" >f′(2) = 4</text></g>
  <g id="cruz-1"><circle cx="380" cy="300" r="8" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/></g>
  <path id="queda-1" pathLength="1" d="M380 300V288.8" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round"/>
  <path id="tang-1" pathLength="1" d="M354 312.2L439.5 235.2" fill="none" stroke="var(--terra)" stroke-width="5" stroke-linecap="round" filter="url(#rough)"/>
  <g id="cruz-2"><circle cx="367.5" cy="300" r="6" fill="var(--leaf)" stroke="var(--ink)" stroke-width="3"/></g>
  <g id="tabela" style="font-family:var(--f-hand)" font-size="18" fill="var(--ink)">
    <g id="t-x0"><text x="478" y="232" text-anchor="start" font-size="22" fill="var(--ink)" >x₀ = 2</text></g>
    <g id="t-x1"><text x="478" y="256" text-anchor="start" font-size="22" fill="var(--ink)" >x₁ = 1,5</text></g>
    <g id="t-x2"><text x="478" y="280" text-anchor="start" font-size="22" fill="var(--ink)" >x₂ = 1,4167</text></g>
  </g>
  <g id="placar" style="font-family:var(--f-hand)" font-size="19" fill="var(--ink)">
    <text x="250" y="152" text-anchor="start" font-size="19" fill="var(--terra)" >erro |xₙ − √2|</text>
    <g id="pl-0"><text x="250" y="172" text-anchor="start" font-size="19" fill="var(--ink)" >passo 0: 0,586</text></g>
    <g id="pl-1"><text x="250" y="192" text-anchor="start" font-size="19" fill="var(--ink)" >passo 1: 0,086</text></g>
    <g id="pl-2"><text x="250" y="212" text-anchor="start" font-size="19" fill="var(--ink)" >passo 2: 0,0025</text></g>
    <g id="pl-3"><text x="250" y="232" text-anchor="start" font-size="19" fill="var(--ink)" >passo 3: 0,0000021</text></g>
  </g>
</g>
<g id="falha">
  <path d="M215 210H585M573 202L585 210L573 218" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="236" y="150" text-anchor="start" font-size="22" fill="var(--ink)" >f(x) = x² − 2</text><text x="236" y="198" text-anchor="start" font-size="20" fill="var(--terra)" >chão</text></g>
</g>
<path id="falha-curva" pathLength="1" d="M195 200L204.6 212.3L214.2 223.8L223.8 234.3L233.4 243.9L243 252.6L252.6 260.4L262.2 267.3L271.8 273.3L281.4 278.3L291 282.5L300.6 285.7L310.2 288.1L319.8 289.5L329.4 290L339 289.6L348.6 288.3L358.2 286.1L367.8 282.9L377.4 278.9L387 274L396.6 268.1L406.2 261.3L415.8 253.6L425.4 245.1L435 235.6L444.6 225.1L454.2 213.8L463.8 201.6L473.4 188.5L483 174.4" fill="none" stroke="var(--water)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="falha-x0"><circle cx="339" cy="289.6" r="7" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3"/><g style="font-family:var(--f-hand)"><text x="339" y="318" text-anchor="middle" font-size="21" fill="var(--ink)" >x₀ = 0,1</text></g></g>
<path id="falha-reta" pathLength="1" d="M215 300.6L585 267.7" fill="none" stroke="var(--terra)" stroke-width="5" stroke-linecap="round" filter="url(#rough)"/>
<g id="falha-deriv" style="font-family:var(--f-hand)" font-size="21" fill="var(--terra)"><text x="236" y="346" text-anchor="start" font-size="22" fill="var(--ink)" >f′(0,1) = 0,2</text><text x="236" y="368" text-anchor="start" font-size="22" fill="var(--ink)" >quase horizontal</text></g>
<g id="falha-seta" style="font-family:var(--f-hand)" fill="var(--ink)"><path d="M585 267.7l-14 -6M585 267.7l-13 9" fill="none" stroke="var(--terra)" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/><text x="570" y="300" text-anchor="end" font-size="23" fill="var(--terra)" >x₁ = 10,05</text><text x="570" y="324" text-anchor="end" font-size="20" fill="var(--ink)" >longe demais</text></g>
<g id="dados" style="font-family:var(--f-hand)" fill="var(--ink)">
  <text x="236" y="140" text-anchor="start" font-size="22" fill="var(--terra)" >passos até o mesmo erro</text><text x="236" y="164" text-anchor="start" font-size="20" fill="var(--ink)" >(2 milionésimos)</text>
  <path d="M338 182V282" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" filter="url(#rough)"/>
<g id="barra-newton" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="236" y="220" text-anchor="start" font-size="22" fill="var(--ink)" >Newton</text><rect x="342" y="196" width="42" height="34" fill="var(--leaf)" fill-opacity="0.8" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round" filter="url(#rough)"/><text x="394" y="220" text-anchor="start" font-size="22" fill="var(--ink)" >3</text></g>
<g id="barra-bissecao" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="236" y="270" text-anchor="start" font-size="22" fill="var(--ink)" >bisseção</text><rect x="342" y="246" width="210" height="34" fill="var(--wheat)" fill-opacity="0.8" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round" filter="url(#rough)"/><text x="562" y="270" text-anchor="start" font-size="22" fill="var(--ink)" >15</text></g>
</g>
<g id="guia" stroke-linecap="round" stroke-linejoin="round">
  <g transform="translate(20 168) scale(0.9)">
    <ellipse cx="60" cy="128" rx="38" ry="7" fill="var(--rule-soft)" stroke="var(--ink)" stroke-width="3"/>
    <g filter="url(#rough)">
      <path d="M50 54L34 30" fill="none" stroke="var(--ink)" stroke-width="3.5"/><circle cx="32" cy="27" r="5.5" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3"/>
      <path d="M70 54Q80 36 96 40M96 40l-7-4M96 40l-5 7" fill="none" stroke="var(--ink)" stroke-width="3.5"/>
      <path d="M60 48L110 124H10Z" fill="var(--a-calculo-fill)" stroke="var(--ink)" stroke-width="4" stroke-linejoin="round"/>
      <ellipse cx="48" cy="72" rx="8" ry="4.5" fill="var(--card)" opacity="0.5" transform="rotate(-25 48 72)"/>
      <ellipse cx="49" cy="86" rx="3.5" ry="4.8" fill="var(--ink)" stroke="none"/><ellipse cx="71" cy="86" rx="3.5" ry="4.8" fill="var(--ink)" stroke="none"/>
      <path d="M52 99Q60 106 68 99" fill="none" stroke="var(--ink)" stroke-width="3.5"/>
      <ellipse cx="41" cy="96" rx="5.5" ry="3.2" fill="var(--terra)" opacity="0.4" stroke="none"/><ellipse cx="79" cy="96" rx="5.5" ry="3.2" fill="var(--terra)" opacity="0.4" stroke="none"/>
    </g>
    <g id="guia-braco" filter="url(#rough)">
      <path d="M92 92C104 92 112 84 118 72" fill="none" stroke="var(--ink)" stroke-width="4"/>
      <circle cx="127" cy="64" r="7" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3"/>
    </g>
  </g>
</g>`,
  ocultos: ["guia","eixos","rotulos","curva","raiz-alvo","x0-ponto","t-x0","regua","tang-0","rot-tang","cruz-1","queda-1","t-x1","tang-1","cruz-2","t-x2","placar","pl-0","pl-1","pl-2","pl-3","falha","falha-curva","falha-x0","falha-reta","falha-deriv","falha-seta","dados","barra-newton","barra-bissecao"]
};
