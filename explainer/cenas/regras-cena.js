/* Cena SVG do mini-video "Regras de derivacao": areas de quadrado e retangulo, torre de blocos, engrenagens e caixas aninhadas em papel quadriculado.
   Potencia: x = 3, h = 0,5 (36 px por unidade): area 9 -> 12.25; ganho 3.25 ~ 2xh = 3.
   Soma: f = 3x^2 + 5x em x = 3: 3x^2 = 27, 5x = 15; taxas 18 e 5, total 23.
   Produto: u = 4, v = 3, du = dv = 0,5 (30 px por unidade): ganho 3.75 = 1.5 + 2 + 0.25.
   Engrenagens x3 e x2 = x6. Cadeia: (x^2+1)^3 em x = 1: 3u^2 = 12, 2x = 2, produto 24; F(1,01)-F(1) = 0.2436.
   IA: x = 2, y = 7, w = 1: yh = 2, L = 25, dL/dyh = -10, dyh/dw = 2, dL/dw = -20. */
window.Cenas = window.Cenas || {};
Cenas.regras = {
  viewBox: "0 0 800 450",
  svg: `<g id="papel">
  <rect x="0" y="0" width="800" height="450" fill="var(--card)"/>
  <path d="M0 0V450M25 0V450M50 0V450M75 0V450M100 0V450M125 0V450M150 0V450M175 0V450M200 0V450M225 0V450M250 0V450M275 0V450M300 0V450M325 0V450M350 0V450M375 0V450M400 0V450M425 0V450M450 0V450M475 0V450M500 0V450M525 0V450M550 0V450M575 0V450M600 0V450M625 0V450M650 0V450M675 0V450M700 0V450M725 0V450M750 0V450M775 0V450M800 0V450M0 0H800M0 25H800M0 50H800M0 75H800M0 100H800M0 125H800M0 150H800M0 175H800M0 200H800M0 225H800M0 250H800M0 275H800M0 300H800M0 325H800M0 350H800M0 375H800M0 400H800M0 425H800M0 450H800" fill="none" stroke="var(--grid)" stroke-width="1.5"/>
  <path d="M52 0V450" fill="none" stroke="var(--terra)" stroke-width="2" opacity="0.35"/>
  <circle cx="22" cy="60" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="150" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="240" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="330" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="400" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/>
</g>
<g id="limite-exp" style="font-family:var(--f-hand)" font-size="27" fill="var(--ink)"><text x="400" y="172" text-anchor="middle">f′(x) = lim [ f(x+h) − f(x) ] / h</text></g>
<path id="rabisco" pathLength="1" d="M232 182C290 144 330 204 400 168S500 140 570 184" fill="none" stroke="var(--terra)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="fer-pot" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><rect x="204" y="190" width="92" height="104" rx="10" fill="var(--water)" fill-opacity="0.4" stroke="var(--ink)" stroke-width="4" stroke-linejoin="round" filter="url(#rough)"/><text x="250" y="244" text-anchor="middle" font-size="38">xⁿ</text><text x="250" y="280" text-anchor="middle">potência</text></g>
<g id="fer-soma" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><rect x="306" y="190" width="92" height="104" rx="10" fill="var(--leaf)" fill-opacity="0.4" stroke="var(--ink)" stroke-width="4" stroke-linejoin="round" filter="url(#rough)"/><text x="352" y="244" text-anchor="middle" font-size="52">+</text><text x="352" y="280" text-anchor="middle">soma</text></g>
<g id="fer-prod" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><rect x="408" y="190" width="92" height="104" rx="10" fill="var(--wheat)" fill-opacity="0.4" stroke="var(--ink)" stroke-width="4" stroke-linejoin="round" filter="url(#rough)"/><text x="454" y="244" text-anchor="middle" font-size="52">×</text><text x="454" y="280" text-anchor="middle">produto</text></g>
<g id="fer-cad" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><rect x="510" y="190" width="92" height="104" rx="10" fill="var(--terra)" fill-opacity="0.4" stroke="var(--ink)" stroke-width="4" stroke-linejoin="round" filter="url(#rough)"/><text x="556" y="244" text-anchor="middle" font-size="34">f∘g</text><text x="556" y="280" text-anchor="middle">cadeia</text></g>

<g id="quad">
  <g filter="url(#rough)" stroke-linejoin="round">
    <rect x="230" y="190" width="108" height="108" fill="var(--water)" fill-opacity="0.35" stroke="var(--ink)" stroke-width="4"/>
  </g>
  <g id="quad-area" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="284" y="240" text-anchor="middle">lado x = 3</text><text x="284" y="270" text-anchor="middle">área = 9</text></g>
</g>
<g id="tira-d" filter="url(#rough)" stroke-linejoin="round"><rect x="338" y="190" width="18" height="108" fill="var(--terra)" fill-opacity="0.6" stroke="var(--ink)" stroke-width="3"/></g>
<g id="tira-t" filter="url(#rough)" stroke-linejoin="round"><rect x="230" y="172" width="108" height="18" fill="var(--terra)" fill-opacity="0.6" stroke="var(--ink)" stroke-width="3"/></g>
<g id="canto" filter="url(#rough)" stroke-linejoin="round"><rect x="338" y="172" width="18" height="18" fill="var(--wheat)" fill-opacity="0.8" stroke="var(--ink)" stroke-width="2.5"/></g>
<g id="rot-tiras" style="font-family:var(--f-hand)" font-size="23" fill="var(--terra)"><text x="372" y="184">h = 0,5: ganho 3,25</text><text x="372" y="208">≈ 2·x·h = 3</text></g>
<g id="regra-pot" style="font-family:var(--f-hand)" font-size="30" fill="var(--ink)"><text x="430" y="242">x² → 2x</text><text x="430" y="278">x³ → 3x²</text><text x="430" y="318" fill="var(--terra)" font-size="34">xⁿ → n·xⁿ⁻¹</text></g>

<g id="torre">
  <g filter="url(#rough)" stroke-linejoin="round">
    <rect id="bloco-a" x="235" y="245.2" width="100" height="64.8" fill="var(--water)" fill-opacity="0.55" stroke="var(--ink)" stroke-width="4"/>
    <rect id="bloco-b" x="235" y="209.2" width="100" height="36" fill="var(--leaf)" fill-opacity="0.6" stroke="var(--ink)" stroke-width="4"/>
  </g>
  <g id="rot-blocos" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><text x="285" y="283.6" text-anchor="middle">3x² = 27</text><text x="285" y="233.2" text-anchor="middle">5x = 15</text></g>
</g>
<g id="rot-fx" style="font-family:var(--f-hand)" font-size="26" fill="var(--ink)"><text x="235" y="192">f = 3x² + 5x</text></g>
<g id="taxa-b" style="font-family:var(--f-hand)" font-size="24" fill="var(--ink)"><path d="M358 240V214M351 223L358 214L365 223" fill="none" stroke="var(--leaf)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/><text x="378" y="235">5x cresce 5</text></g>
<g id="taxa-a" style="font-family:var(--f-hand)" font-size="24" fill="var(--ink)"><path d="M358 292V262M351 271L358 262L365 271" fill="none" stroke="var(--water)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/><text x="378" y="285">3x² cresce 6x = 18</text></g>
<g id="taxa-t" style="font-family:var(--f-hand)" font-size="30" fill="var(--terra)"><text x="400" y="192">total: 18 + 5 = 23</text></g>

<g id="ret">
  <g filter="url(#rough)" stroke-linejoin="round"><rect x="230" y="215" width="120" height="90" fill="var(--leaf)" fill-opacity="0.4" stroke="var(--ink)" stroke-width="4"/></g>
  <g id="ret-rot" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="290" y="253" text-anchor="middle">u = 4, v = 3</text><text x="290" y="283" text-anchor="middle">área = 12</text></g>
</g>
<g id="tira-u" filter="url(#rough)" stroke-linejoin="round"><rect x="350" y="215" width="15" height="90" fill="var(--terra)" fill-opacity="0.6" stroke="var(--ink)" stroke-width="3"/></g>
<g id="tira-v" filter="url(#rough)" stroke-linejoin="round"><rect x="230" y="200" width="120" height="15" fill="var(--wheat)" fill-opacity="0.85" stroke="var(--ink)" stroke-width="3"/></g>
<g id="canto-p" filter="url(#rough)" stroke-linejoin="round"><rect x="350" y="200" width="15" height="15" fill="var(--card)" stroke="var(--ink)" stroke-width="2.5"/></g>
<g id="rot-tu" style="font-family:var(--f-hand)" font-size="22" fill="var(--terra)"><text x="373" y="265">v·Δu = 1,5</text></g>
<g id="rot-tv" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="290" y="192" text-anchor="middle">u·Δv = 2</text></g>
<g id="rot-canto" style="font-family:var(--f-hand)" font-size="20" fill="var(--ink)"><text x="373" y="211">Δu·Δv = 0,25</text></g>
<g id="regra-prod" style="font-family:var(--f-hand)" font-size="30" fill="var(--ink)"><text x="470" y="246">(u·v)′ =</text><text x="470" y="282" fill="var(--terra)" font-size="34">u′·v + u·v′</text></g>
<g id="rot-prod" style="font-family:var(--f-hand)" font-size="24" fill="var(--terra)"><text x="230" y="178">ganho 3,75 = 1,5 + 2 + 0,25</text></g>

<g id="eng-a"><g stroke-linejoin="round" filter="url(#rough)"><path d="M317.7 270.6L326.9 271.8L326.9 278.2L317.7 279.4L316.4 285.2L324.1 290.3L321.3 296.1L312.5 293.2L308.9 297.8L313.6 305.7L308.6 309.7L301.9 303.3L296.6 305.9L297.4 315.1L291.2 316.5L288 307.9L282 307.9L278.8 316.5L272.6 315.1L273.4 305.9L268.1 303.3L261.4 309.7L256.4 305.7L261.1 297.8L257.5 293.2L248.7 296.1L245.9 290.3L253.6 285.2L252.3 279.4L243.1 278.2L243.1 271.8L252.3 270.6L253.6 264.8L245.9 259.7L248.7 253.9L257.5 256.8L261.1 252.2L256.4 244.3L261.4 240.3L268.1 246.7L273.4 244.1L272.6 234.9L278.8 233.5L282 242.1L288 242.1L291.2 233.5L297.4 234.9L296.6 244.1L301.9 246.7L308.6 240.3L313.6 244.3L308.9 252.2L312.5 256.8L321.3 253.9L324.1 259.7L316.4 264.8Z" fill="var(--water)" fill-opacity="0.5" stroke="var(--ink)" stroke-width="4"/><circle cx="285" cy="275" r="11.8" fill="var(--card)" stroke="var(--ink)" stroke-width="3.5"/></g><g style="font-family:var(--f-hand)" font-size="24" fill="var(--ink)"><text x="285" y="347" text-anchor="middle">x</text></g></g>
<g id="eng-b"><g stroke-linejoin="round" filter="url(#rough)"><path d="M429.6 270.7L438.8 271.7L438.8 278.3L429.6 279.3L428 284.7L435.3 290.5L431.7 296.1L423.4 291.9L419.1 295.6L422.1 304.4L416.1 307.2L411.4 299.2L405.7 300L403.4 309L396.9 308L397.3 298.8L392.1 296.4L385.3 302.7L380.3 298.4L385.6 290.8L382.6 286L373.5 287.7L371.6 281.4L380.2 277.8L380.2 272.2L371.6 268.6L373.5 262.3L382.6 264L385.6 259.2L380.3 251.6L385.3 247.3L392.1 253.6L397.3 251.2L396.9 242L403.4 241L405.7 250L411.4 250.8L416.1 242.8L422.1 245.6L419.1 254.4L423.4 258.1L431.7 253.9L435.3 259.5L428 265.3Z" fill="var(--leaf)" fill-opacity="0.5" stroke="var(--ink)" stroke-width="4"/><circle cx="405" cy="275" r="9.5" fill="var(--card)" stroke="var(--ink)" stroke-width="3.5"/></g><g style="font-family:var(--f-hand)" font-size="24" fill="var(--ink)"><text x="405" y="339" text-anchor="middle">u = 3x</text></g></g>
<g id="eng-c"><g stroke-linejoin="round" filter="url(#rough)"><path d="M531.6 271.5L540.8 271.9L540.8 278.1L531.6 278.5L530 283L536.8 289.2L532.8 294L525.5 288.4L521.4 290.8L522.5 299.9L516.5 301L514.4 292L509.7 291.2L504.8 298.9L499.4 295.8L503.6 287.6L500.6 284L491.8 286.7L489.7 280.9L498.2 277.4L498.2 272.6L489.7 269.1L491.8 263.3L500.6 266L503.6 262.4L499.4 254.2L504.8 251.1L509.7 258.8L514.4 258L516.5 249L522.5 250.1L521.4 259.2L525.5 261.6L532.8 256L536.8 260.8L530 267Z" fill="var(--wheat)" fill-opacity="0.5" stroke="var(--ink)" stroke-width="4"/><circle cx="515" cy="275" r="7.3" fill="var(--card)" stroke="var(--ink)" stroke-width="3.5"/></g><g style="font-family:var(--f-hand)" font-size="24" fill="var(--ink)"><text x="515" y="331" text-anchor="middle">y = 2u</text></g></g>
<g id="seta-3">
  <path d="M298 232Q345 196 392 240M382 228L394 241L379 244" fill="none" stroke="var(--terra)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="seta-3-t" style="font-family:var(--f-hand)" font-size="28" fill="var(--terra)"><text x="345" y="214" text-anchor="middle">× 3</text></g>
</g>
<g id="seta-2">
  <path d="M416 244Q462 210 504 252M494 240L506 253L491 256" fill="none" stroke="var(--terra)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="seta-2-t" style="font-family:var(--f-hand)" font-size="28" fill="var(--terra)"><text x="462" y="226" text-anchor="middle">× 2</text></g>
</g>
<g id="res-eng" style="font-family:var(--f-hand)" font-size="32" fill="var(--ink)"><text x="400" y="172" text-anchor="middle">dy/dx = 2 · 3 = 6</text></g>
<g id="form-cad" style="font-family:var(--f-hand)" font-size="24" fill="var(--terra)"><text x="400" y="198" text-anchor="middle">(f∘g)′ = f′(g) · g′</text></g>

<g id="aninhada">
  <g stroke-linejoin="round" filter="url(#rough)">
    <rect id="caixa-fora" x="215" y="162" width="190" height="150" rx="14" fill="var(--water)" fill-opacity="0.3" stroke="var(--ink)" stroke-width="4"/>
    <rect id="caixa-dentro" x="245" y="222" width="130" height="62" rx="10" fill="var(--wheat)" fill-opacity="0.7" stroke="var(--ink)" stroke-width="4"/>
  </g>
  <g id="rot-fora" style="font-family:var(--f-hand)" font-size="25" fill="var(--ink)"><text x="310" y="200" text-anchor="middle">fora: ( )³</text></g>
  <g id="rot-dentro" style="font-family:var(--f-hand)" font-size="24" fill="var(--ink)"><text x="310" y="260" text-anchor="middle">dentro: x² + 1</text></g>
</g>
<g id="calc-fora" style="font-family:var(--f-hand)" font-size="25" fill="var(--ink)"><text x="430" y="200">fora: 3u² = 12</text></g>
<g id="calc-dentro" style="font-family:var(--f-hand)" font-size="25" fill="var(--ink)"><text x="430" y="238">dentro: 2x = 2</text></g>
<g id="calc-prod" style="font-family:var(--f-hand)" font-size="36" fill="var(--terra)"><text x="430" y="284">12 · 2 = 24</text></g>
<g id="calc-conf" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><text x="430" y="312">x de 1 a 1,01: sobe 0,24</text></g>


<g id="cx-w" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><rect x="204" y="264" width="122" height="62" rx="11" fill="var(--leaf)" fill-opacity="0.5" stroke="var(--ink)" stroke-width="4" stroke-linejoin="round" filter="url(#rough)"/><text x="265" y="288" text-anchor="middle">peso</text><text x="265" y="316" text-anchor="middle" font-size="25">w = 1</text></g>
<g id="cx-y" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><rect x="339" y="264" width="122" height="62" rx="11" fill="var(--wheat)" fill-opacity="0.5" stroke="var(--ink)" stroke-width="4" stroke-linejoin="round" filter="url(#rough)"/><text x="400" y="288" text-anchor="middle">previsão</text><text x="400" y="316" text-anchor="middle" font-size="25">ŷ = 2</text></g>
<g id="cx-l" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><rect x="474" y="264" width="122" height="62" rx="11" fill="var(--terra)" fill-opacity="0.5" stroke="var(--ink)" stroke-width="4" stroke-linejoin="round" filter="url(#rough)"/><text x="535" y="288" text-anchor="middle">erro</text><text x="535" y="316" text-anchor="middle" font-size="25">L = 25</text></g>
<g id="seta-ia1" style="font-family:var(--f-hand)" font-size="20" fill="var(--ink)"><path d="M321 295H341M332 288L341 295L332 302" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/></g>
<g id="seta-ia2" style="font-family:var(--f-hand)" font-size="20" fill="var(--ink)"><path d="M456 295H476M467 288L476 295L467 302" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/></g>
<g id="tag-ia1" style="font-family:var(--f-hand)" font-size="19" fill="var(--terra)"><text x="335" y="254" text-anchor="middle">dŷ/dw = 2</text></g>
<g id="tag-ia2" style="font-family:var(--f-hand)" font-size="19" fill="var(--terra)"><text x="470" y="254" text-anchor="middle">dL/dŷ = −10</text></g>
<g id="res-ia" style="font-family:var(--f-hand)" font-size="32" fill="var(--ink)"><text x="400" y="142" text-anchor="middle">dL/dw = 2 · (−10) = −20</text></g>

<g id="res-pot" style="font-family:var(--f-hand)" font-size="25" fill="var(--ink)"><rect x="206" y="157" width="104" height="36" rx="9" fill="var(--water)" fill-opacity="0.55" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round" filter="url(#rough)"/><text x="258" y="182" text-anchor="middle" font-size="22">potência</text><text x="322" y="182">(xⁿ)′ = n·xⁿ⁻¹</text></g>
<g id="res-soma" style="font-family:var(--f-hand)" font-size="25" fill="var(--ink)"><rect x="206" y="199" width="104" height="36" rx="9" fill="var(--leaf)" fill-opacity="0.55" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round" filter="url(#rough)"/><text x="258" y="224" text-anchor="middle" font-size="22">soma</text><text x="322" y="224">(a·f + b·g)′ = a·f′ + b·g′</text></g>
<g id="res-prod" style="font-family:var(--f-hand)" font-size="25" fill="var(--ink)"><rect x="206" y="241" width="104" height="36" rx="9" fill="var(--wheat)" fill-opacity="0.55" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round" filter="url(#rough)"/><text x="258" y="266" text-anchor="middle" font-size="22">produto</text><text x="322" y="266">(u·v)′ = u′·v + u·v′</text></g>
<g id="res-cad" style="font-family:var(--f-hand)" font-size="25" fill="var(--ink)"><rect x="206" y="283" width="104" height="36" rx="9" fill="var(--terra)" fill-opacity="0.55" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round" filter="url(#rough)"/><text x="258" y="308" text-anchor="middle" font-size="22">cadeia</text><text x="322" y="308">(f∘g)′ = f′(g) · g′</text></g>
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
  ocultos: ["guia","limite-exp","rabisco","fer-pot","fer-soma","fer-prod","fer-cad","quad","tira-d","tira-t","canto","rot-tiras","regra-pot","torre","rot-fx","taxa-a","taxa-b","taxa-t","ret","tira-u","tira-v","canto-p","rot-tu","rot-tv","rot-canto","regra-prod","rot-prod","eng-a","eng-b","eng-c","seta-3","seta-2","res-eng","form-cad","aninhada","calc-fora","calc-dentro","calc-prod","calc-conf","cx-w","cx-y","cx-l","seta-ia1","seta-ia2","tag-ia1","tag-ia2","res-ia","res-pot","res-soma","res-prod","res-cad"]
};
