/* Cena SVG do mini-video "Limites": uma ponte com uma tabua que falta, em tracado a mao sobre caderno quadriculado.
   Curva f(x) = (x^2 - 1)/(x - 1), com buraco em x = 1; limite 2. Mapa: px = 400 + 130(x - 1), py = 350 - 65 y.
   Faixa epsilon = 0.5 -> delta = 0.5; apertada para epsilon = 0.2 -> delta = 0.2 (calculados por script). */
window.Cenas = window.Cenas || {};
Cenas.limite = {
  viewBox: "0 0 800 450",
  svg: `<g id="fundo">
  <rect x="0" y="0" width="800" height="450" fill="var(--paper)"/>
  <path d="M0 0V450M25 0V450M50 0V450M75 0V450M100 0V450M125 0V450M150 0V450M175 0V450M200 0V450M225 0V450M250 0V450M275 0V450M300 0V450M325 0V450M350 0V450M375 0V450M400 0V450M425 0V450M450 0V450M475 0V450M500 0V450M525 0V450M550 0V450M575 0V450M600 0V450M625 0V450M650 0V450M675 0V450M700 0V450M725 0V450M750 0V450M775 0V450M800 0V450M0 0H800M0 25H800M0 50H800M0 75H800M0 100H800M0 125H800M0 150H800M0 175H800M0 200H800M0 225H800M0 250H800M0 275H800M0 300H800M0 325H800M0 350H800M0 375H800M0 400H800M0 425H800M0 450H800" fill="none" stroke="var(--grid)" stroke-width="1.5"/>
  <path d="M96 0V450" fill="none" stroke="var(--terra)" stroke-width="2" opacity="0.35"/>
</g>
<g id="ponte">
  <path id="eixos" pathLength="1" d="M215 350H592M586 345L592 350L586 355M270 350V100M265 106L270 100L275 106" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="eixos-rot"><text x="578" y="338" font-family="var(--f-mono)" font-size="15" font-weight="700" fill="var(--ink)" stroke="none" >x</text><text x="279" y="112" font-family="var(--f-mono)" font-size="15" font-weight="700" fill="var(--ink)" stroke="none" >y</text></g>
  <g id="faixa-eps"><rect x="215" y="187.5" width="377" height="65" fill="var(--water)" opacity="0.22"/><path d="M215 187.5H592M215 252.5H592" fill="none" stroke="var(--water)" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/></g>
  <g id="faixa-delta"><rect x="335" y="176" width="130" height="174" fill="var(--leaf)" opacity="0.22"/><path d="M335 176V350M465 176V350" fill="none" stroke="var(--leaf)" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/></g>
  <g id="rot-eps"><text x="592" y="179.5" font-family="var(--f-mono)" font-size="15" font-weight="700" fill="var(--water)" stroke="none" text-anchor="end">ε = 0,5</text><text x="262" y="192.5" font-family="var(--f-mono)" font-size="13" font-weight="700" fill="var(--water)" stroke="none" text-anchor="end">2,5</text><text x="262" y="257.5" font-family="var(--f-mono)" font-size="13" font-weight="700" fill="var(--water)" stroke="none" text-anchor="end">1,5</text></g>
  <g id="rot-eps2"><text x="592" y="199" font-family="var(--f-mono)" font-size="15" font-weight="700" fill="var(--water)" stroke="none" text-anchor="end">ε = 0,2</text><text x="262" y="212" font-family="var(--f-mono)" font-size="13" font-weight="700" fill="var(--water)" stroke="none" text-anchor="end">2,2</text><text x="262" y="238" font-family="var(--f-mono)" font-size="13" font-weight="700" fill="var(--water)" stroke="none" text-anchor="end">1,8</text></g>
  <g id="rot-delta"><text x="400" y="169" font-family="var(--f-mono)" font-size="15" font-weight="700" fill="var(--leaf)" stroke="none" text-anchor="middle">δ = 0,5</text><text x="335" y="368" font-family="var(--f-mono)" font-size="13" font-weight="700" fill="var(--leaf)" stroke="none" text-anchor="middle">0,5</text><text x="465" y="368" font-family="var(--f-mono)" font-size="13" font-weight="700" fill="var(--leaf)" stroke="none" text-anchor="middle">1,5</text></g>
  <g id="rot-delta2"><text x="400" y="169" font-family="var(--f-mono)" font-size="15" font-weight="700" fill="var(--leaf)" stroke="none" text-anchor="middle">δ = 0,2</text><text x="374" y="368" font-family="var(--f-mono)" font-size="13" font-weight="700" fill="var(--leaf)" stroke="none" text-anchor="middle">0,8</text><text x="426" y="368" font-family="var(--f-mono)" font-size="13" font-weight="700" fill="var(--leaf)" stroke="none" text-anchor="middle">1,2</text></g>
  <path id="tabuas" pathLength="1" d="M227.4 297.3L234.6 311.7M253.4 284.3L260.6 298.7M279.4 271.3L286.6 285.7M305.4 258.3L312.6 272.7M331.4 245.3L338.6 259.7M357.4 232.3L364.6 246.7M435.4 193.3L442.6 207.7M461.4 180.3L468.6 194.7M487.4 167.3L494.6 181.7M513.4 154.3L520.6 168.7M539.4 141.3L546.6 155.7M565.4 128.3L572.6 142.7M244 306L244 350M335 260.5L335 350M465 195.5L465 350M530 163L530 350" fill="none" stroke="var(--soil)" stroke-width="3.5" stroke-linecap="round" filter="url(#rough)"/>
  <path id="curva" pathLength="1" d="M218 311L231 304.9L244 297.3L257 292.4L270 284.1L283 279.2L296 271.6L309 265.5L322 259.3L335 251.8L348 246.9L361 238.6L374 233.7L387 226M413 213.5L426 207.4L439 199.8L452 194.9L465 186.6L478 181.7L491 174.1L504 168L517 161.8L530 154.3L543 149.4L556 141.1L569 136.2L582 128.5" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <path id="trecho" pathLength="1" d="M335 252.5L348 246.4L361 238.8L374 233.9L387 225.6M413 213.5L426 207.4L439 199.8L452 194.9L465 186.6" fill="none" stroke="var(--terra)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <path id="trecho2" pathLength="1" d="M374 233L380.5 230.1L387 225.8M413 213.5L419.5 210.6L426 206.3" fill="none" stroke="var(--terra)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="nivel" stroke-linecap="round"><path d="M391 220H270" fill="none" stroke="var(--leaf)" stroke-width="3.5" stroke-dasharray="2 8"/><text x="262" y="225" font-family="var(--f-mono)" font-size="15" font-weight="700" fill="var(--leaf)" stroke="none" text-anchor="end">2</text><text x="283" y="240" font-family="var(--f-mono)" font-size="14" font-weight="700" fill="var(--leaf)" stroke="none" >limite = 2</text></g>
  <g id="buraco" stroke-linecap="round"><path d="M400 229V350" fill="none" stroke="var(--terra)" stroke-width="3" stroke-dasharray="2 8"/><circle cx="400" cy="220" r="7.5" fill="var(--card)" stroke="var(--terra)" stroke-width="4" filter="url(#rough)"/><text x="400" y="368" font-family="var(--f-mono)" font-size="15" font-weight="700" fill="var(--terra)" stroke="none" text-anchor="middle">1</text></g>
  <g id="viaj-e" stroke-linecap="round" stroke-linejoin="round"><g filter="url(#rough)">
  <path d="M296 238L296 220" fill="none" stroke="var(--ink)" stroke-width="3"/>
  <path d="M296 220L307 224L296 229Z" fill="var(--water)" stroke="var(--ink)" stroke-width="2.5"/>
  <path d="M296 247L296 262" fill="none" stroke="var(--water)" stroke-width="7"/>
  <path d="M288 252L296 249L304 252" fill="none" stroke="var(--ink)" stroke-width="3"/>
  <path d="M296 262L291 272M296 262L301 272" fill="none" stroke="var(--ink)" stroke-width="3.5"/>
  <circle cx="296" cy="241" r="7" fill="var(--card)" stroke="var(--ink)" stroke-width="3"/>
  <circle cx="293.5" cy="240" r="1.2" fill="var(--ink)"/><circle cx="298.5" cy="240" r="1.2" fill="var(--ink)"/>
</g></g>
  <g id="viaj-d" stroke-linecap="round" stroke-linejoin="round"><g filter="url(#rough)">
  <path d="M504 134L504 116" fill="none" stroke="var(--ink)" stroke-width="3"/>
  <path d="M504 116L515 120L504 125Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="2.5"/>
  <path d="M504 143L504 158" fill="none" stroke="var(--terra)" stroke-width="7"/>
  <path d="M496 148L504 145L512 148" fill="none" stroke="var(--ink)" stroke-width="3"/>
  <path d="M504 158L499 168M504 158L509 168" fill="none" stroke="var(--ink)" stroke-width="3.5"/>
  <circle cx="504" cy="137" r="7" fill="var(--card)" stroke="var(--ink)" stroke-width="3"/>
  <circle cx="501.5" cy="136" r="1.2" fill="var(--ink)"/><circle cx="506.5" cy="136" r="1.2" fill="var(--ink)"/>
</g></g>
  <g id="tabela" stroke-linecap="round" stroke-linejoin="round">
    <rect x="204" y="100" width="172" height="104" rx="6" fill="var(--card)" stroke="var(--ink)" stroke-width="3" filter="url(#rough)"/>
    <text x="212" y="121" font-family="var(--f-hand)" font-size="18" fill="var(--water)" stroke="none" >esquerda</text><text x="295" y="121" font-family="var(--f-hand)" font-size="18" fill="var(--terra)" stroke="none" >direita</text>
    <path d="M212 128H368" fill="none" stroke="var(--rule-soft)" stroke-width="2.5"/>
    <g id="tab-1"><text x="212" y="150" font-family="var(--f-mono)" font-size="12" font-weight="700" fill="var(--ink)" stroke="none" >0,5 → 1,5</text><text x="295" y="150" font-family="var(--f-mono)" font-size="12" font-weight="700" fill="var(--ink)" stroke="none" >1,5 → 2,5</text></g>
    <g id="tab-2"><text x="212" y="171" font-family="var(--f-mono)" font-size="12" font-weight="700" fill="var(--ink)" stroke="none" >0,8 → 1,8</text><text x="295" y="171" font-family="var(--f-mono)" font-size="12" font-weight="700" fill="var(--ink)" stroke="none" >1,2 → 2,2</text></g>
    <g id="tab-3"><text x="212" y="192" font-family="var(--f-mono)" font-size="12" font-weight="700" fill="var(--ink)" stroke="none" >0,9 → 1,9</text><text x="295" y="192" font-family="var(--f-mono)" font-size="12" font-weight="700" fill="var(--ink)" stroke="none" >1,1 → 2,1</text></g>
  </g>
  <g id="pergunta" stroke-linecap="round" stroke-linejoin="round"><text x="226" y="168" font-family="var(--f-hand)" font-size="30" fill="var(--terra)" stroke="none" >para onde vai?</text><path d="M300 180C336 184 366 196 386 212M386 212L373 210M386 212L384 199" fill="none" stroke="var(--terra)" stroke-width="3.5" filter="url(#rough)"/></g>
</g>
<g id="degrau" stroke-linecap="round" stroke-linejoin="round">
  <path d="M230 340H575M569 335L575 340L569 345M270 340V105M265 111L270 105L275 111" fill="none" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/>
  <text x="560" y="328" font-family="var(--f-mono)" font-size="15" font-weight="700" fill="var(--ink)" stroke="none" >x</text><text x="279" y="117" font-family="var(--f-mono)" font-size="15" font-weight="700" fill="var(--ink)" stroke="none" >y</text><text x="400" y="360" font-family="var(--f-mono)" font-size="15" font-weight="700" fill="var(--ink)" stroke="none" text-anchor="middle">1</text>
  <path id="deg-esq" pathLength="1" d="M218 300Q305 302 392 300" fill="none" stroke="var(--water)" stroke-width="5"/>
  <path id="deg-dir" pathLength="1" d="M408 220Q495 218 582 220" fill="none" stroke="var(--terra)" stroke-width="5"/>
  <g id="deg-pts" filter="url(#rough)"><circle cx="400" cy="300" r="7" fill="var(--card)" stroke="var(--water)" stroke-width="4"/><circle cx="400" cy="220" r="7" fill="var(--terra)" stroke="var(--terra)" stroke-width="4"/></g>
  <g id="deg-niv"><path d="M270 300H388" fill="none" stroke="var(--water)" stroke-width="3" stroke-dasharray="2 8"/><path d="M270 220H388" fill="none" stroke="var(--terra)" stroke-width="3" stroke-dasharray="2 8"/><text x="262" y="305" font-family="var(--f-mono)" font-size="15" font-weight="700" fill="var(--water)" stroke="none" text-anchor="end">1</text><text x="262" y="225" font-family="var(--f-mono)" font-size="15" font-weight="700" fill="var(--terra)" stroke="none" text-anchor="end">3</text><text x="296" y="328" font-family="var(--f-hand)" font-size="24" fill="var(--water)" stroke="none" >esquerda chega em 1</text><text x="420" y="206" font-family="var(--f-hand)" font-size="24" fill="var(--terra)" stroke="none" >direita chega em 3</text></g>
</g>
<g id="umx" stroke-linecap="round" stroke-linejoin="round">
  <path d="M240 290H562M556 285L562 290L556 295M400 350V102M395 108L400 102L405 108" fill="none" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/>
  <text x="548" y="310" font-family="var(--f-mono)" font-size="15" font-weight="700" fill="var(--ink)" stroke="none" >x</text><text x="410" y="114" font-family="var(--f-mono)" font-size="15" font-weight="700" fill="var(--ink)" stroke="none" >y</text>
  <path d="M400 340V110" fill="none" stroke="var(--leaf)" stroke-width="3" stroke-dasharray="2 8" opacity="0.8"/>
  <path id="umx-dir" pathLength="1" d="M410.1 110.7L410.9 123.5L411.8 135.4L412.7 146.4L413.6 156.6L414.7 166.2L415.8 175L417 183.2L418.3 190.8L419.8 197.9L421.3 204.5L422.9 210.6L424.7 216.2L426.6 221.5L428.6 226.4L430.8 230.9L433.2 235.1L435.7 239L438.5 242.7L441.4 246.1L444.6 249.2L448 252.1L451.7 254.8L455.7 257.3L460 259.7L464.6 261.8L469.5 263.8L474.9 265.7L480.6 267.4L486.8 269L493.5 270.5L500.7 271.9L508.4 273.2L516.7 274.4L525.7 275.5L535.4 276.6L545.8 277.5L557 278.4L569 279.2L582 280L596 280.7" fill="none" stroke="var(--ink)" stroke-width="5" filter="url(#rough)"/>
  <path id="umx-esq" pathLength="1" d="M366.8 344.9L364.3 341L361.5 337.3L358.6 333.9L355.4 330.8L352 327.9L348.3 325.2L344.3 322.7L340 320.3L335.4 318.2L330.5 316.2L325.1 314.3L319.4 312.6L313.2 311L306.5 309.5L299.3 308.1L291.6 306.8L283.3 305.6L274.3 304.5L264.6 303.4L254.2 302.5L243 301.6L231 300.8L218 300L204 299.3" fill="none" stroke="var(--ink)" stroke-width="5" filter="url(#rough)"/>
  <g id="umx-rot"><text x="424" y="172" font-family="var(--f-hand)" font-size="26" fill="var(--terra)" stroke="none" >sobe sem parar</text><text x="212" y="372" font-family="var(--f-hand)" font-size="22" fill="var(--terra)" stroke="none" >desce sem parar</text></g>
</g>
<g id="deriv" stroke-linecap="round" stroke-linejoin="round">
  <path d="M240 380H570M564 375L570 380L564 385M250 380V70M245 76L250 70L255 76" fill="none" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/>
  <text x="552" y="368" font-family="var(--f-mono)" font-size="14" font-weight="700" fill="var(--ink)" stroke="none" >tempo</text><text x="262" y="84" font-family="var(--f-hand)" font-size="22" fill="var(--ink)" stroke="none" >distância</text>
  <path d="M250 380L265 379.3L280 377L295 373.3L310 368L325 361.3L340 353L355 343.3L370 332L385 319.3L400 305L415 289.3L430 272L445 253.3L460 233L475 211.3L490 188L505 163.3L520 137L535 109.3L550 80" fill="none" stroke="var(--ink)" stroke-width="5" filter="url(#rough)"/>
  <g id="sec1"><path d="M395 324.5L530 122" fill="none" stroke="var(--water)" stroke-width="4" filter="url(#rough)"/><circle cx="520" cy="137" r="6" fill="var(--water)" stroke="var(--ink)" stroke-width="2.5"/><text x="568" y="350" font-family="var(--f-hand)" font-size="22" fill="var(--water)" stroke="none" text-anchor="end">velocidade média</text></g>
  <g id="sec2"><path d="M395 318.2L530 140" fill="none" stroke="var(--water)" stroke-width="4" filter="url(#rough)"/><circle cx="466" cy="224.5" r="6" fill="var(--water)" stroke="var(--ink)" stroke-width="2.5"/><text x="568" y="350" font-family="var(--f-hand)" font-size="22" fill="var(--water)" stroke="none" text-anchor="end">intervalo menor</text></g>
  <g id="tang"><path d="M395 314L530 152" fill="none" stroke="var(--terra)" stroke-width="5" filter="url(#rough)"/><text x="568" y="350" font-family="var(--f-hand)" font-size="22" fill="var(--terra)" stroke="none" text-anchor="end">velocidade instantânea</text></g>
  <circle cx="430" cy="272" r="7" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5"/>
</g>
<g id="guia" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(0 -42)">
  <g filter="url(#rough)">
    <ellipse cx="118" cy="437" rx="36" ry="6" fill="var(--rule-soft)" stroke="var(--edge)" stroke-width="2"/>
    <path d="M118 366C102 364 90 352 86 336C104 336 116 348 118 366Z" fill="var(--leaf)" stroke="var(--ink)" stroke-width="3"/>
    <path d="M118 366C134 364 146 352 150 336C132 336 120 348 118 366Z" fill="var(--leaf)" stroke="var(--ink)" stroke-width="3"/>
    <ellipse cx="118" cy="400" rx="32" ry="35" fill="var(--a-calculo-fill)" stroke="var(--ink)" stroke-width="3.5"/>
    <ellipse cx="106" cy="384" rx="8" ry="4.5" fill="var(--card)" opacity="0.5" transform="rotate(-25 106 384)"/>
    <ellipse cx="107" cy="400" rx="3.5" ry="4.8" fill="var(--ink)"/><ellipse cx="129" cy="400" rx="3.5" ry="4.8" fill="var(--ink)"/>
    <path d="M111 413Q118 419 125 413" fill="none" stroke="var(--ink)" stroke-width="3"/>
    <ellipse cx="99" cy="410" rx="5.5" ry="3.2" fill="var(--terra)" opacity="0.35"/><ellipse cx="137" cy="410" rx="5.5" ry="3.2" fill="var(--terra)" opacity="0.35"/>
  </g>
  <g id="guia-braco" filter="url(#rough)">
    <path d="M147 398L190 366" fill="none" stroke="var(--leaf)" stroke-width="6"/>
    <path d="M190 366L202 358M190 366L204 368M190 366L198 352" fill="none" stroke="var(--leaf)" stroke-width="3.5"/>
  </g>
</g></g>`,
  ocultos: ["eixos","eixos-rot","faixa-eps","faixa-delta","rot-eps","rot-eps2","rot-delta","rot-delta2","tabuas","curva","trecho","trecho2","nivel","buraco","viaj-e","viaj-d","tabela","tab-1","tab-2","tab-3","pergunta","degrau","deg-esq","deg-dir","deg-pts","deg-niv","umx","umx-dir","umx-esq","umx-rot","deriv","sec1","sec2","tang","guia"]
};
