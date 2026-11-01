/* Cena SVG do mini-video "A grande ideia do cálculo": trilha em subida, desenhada à mão em caderno quadriculado.
   Altitude A(x) = 12x^2 - (4/3)x^3 (m), x em km de 0 a 6; taxa A'(x) = 4x(6-x) (m/km). Pixels: X = 230 + (340/6)*x; altitude y = 238 - 0.8*m; taxa y = 335 - 2*v.
   A(1) = 10,67; A(3) = 72; A(5) = 133,33; A(6) = 144. Secante 1 a 5: subida 122,7 m / 4 km = 30,7 m/km; 2 a 4: 34,7; 2,5 a 3,5: 35,7; tangente em x = 3: 36 m/km.
   Area sob a taxa de 0 a 3 = 72,0 m (igual a A(3)). Dados: totais 0, 120, 300, 480, 600, 660; diferencas 120, 180, 180, 120, 60. */
window.Cenas = window.Cenas || {};
Cenas.ideia = {
  viewBox: "0 0 800 450",
  svg: `<g id="papel">
  <rect x="0" y="0" width="800" height="450" fill="var(--card)"/>
  <path d="M0 0V450M25 0V450M50 0V450M75 0V450M100 0V450M125 0V450M150 0V450M175 0V450M200 0V450M225 0V450M250 0V450M275 0V450M300 0V450M325 0V450M350 0V450M375 0V450M400 0V450M425 0V450M450 0V450M475 0V450M500 0V450M525 0V450M550 0V450M575 0V450M600 0V450M625 0V450M650 0V450M675 0V450M700 0V450M725 0V450M750 0V450M775 0V450M800 0V450M0 0H800M0 25H800M0 50H800M0 75H800M0 100H800M0 125H800M0 150H800M0 175H800M0 200H800M0 225H800M0 250H800M0 275H800M0 300H800M0 325H800M0 350H800M0 375H800M0 400H800M0 425H800M0 450H800" fill="none" stroke="var(--grid)" stroke-width="1.5"/>
  <path d="M52 0V450" fill="none" stroke="var(--terra)" stroke-width="2" opacity="0.35"/>
  <circle cx="22" cy="60" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="150" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="240" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="330" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="400" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/>
</g>
<g id="painel-alt">
  <path id="eixos-a" pathLength="1" d="M230 244V104M222 114L230 102L238 114M224 238H584M572 230L586 238L572 246" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="rot-alt" style="font-family:var(--f-hand)" fill="var(--ink)" font-size="22"><text x="242" y="112">altitude (m): o total</text><text x="220" y="129" text-anchor="end" font-size="19">144</text><path d="M224 123H236" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"/></g>
  <path id="colina" d="M230 238L230 238L235.7 237.9L241.3 237.6L247 237.2L252.7 236.5L258.3 235.7L264 234.8L269.7 233.7L275.3 232.4L281 231L286.7 229.5L292.3 227.8L298 226L303.7 224.1L309.3 222.1L315 220L320.7 217.8L326.3 215.5L332 213.1L337.7 210.7L343.3 208.1L349 205.5L354.7 202.9L360.3 200.2L366 197.4L371.7 194.7L377.3 191.9L383 189L388.7 186.2L394.3 183.3L400 180.4L405.7 177.5L411.3 174.6L417 171.8L422.7 168.9L428.3 166.1L434 163.4L439.7 160.6L445.3 157.9L451 155.3L456.7 152.7L462.3 150.1L468 147.7L473.7 145.3L479.3 143L485 140.8L490.7 138.7L496.3 136.7L502 134.8L507.7 133L513.3 131.3L519 129.8L524.7 128.4L530.3 127.1L536 126L541.7 125.1L547.3 124.3L553 123.6L558.7 123.2L564.3 122.9L570 122.8L570 238Z" fill="var(--leaf)" fill-opacity="0.25" stroke="none"/>
  <path id="alt-b" pathLength="1" d="M230 214L235.7 213.9L241.3 213.6L247 213.2L252.7 212.5L258.3 211.7L264 210.8L269.7 209.7L275.3 208.4L281 207L286.7 205.5L292.3 203.8L298 202L303.7 200.1L309.3 198.1L315 196L320.7 193.8L326.3 191.5L332 189.1L337.7 186.7L343.3 184.1L349 181.5L354.7 178.9L360.3 176.2L366 173.4L371.7 170.7L377.3 167.9L383 165L388.7 162.2L394.3 159.3L400 156.4L405.7 153.5L411.3 150.6L417 147.8L422.7 144.9L428.3 142.1L434 139.4L439.7 136.6L445.3 133.9L451 131.3L456.7 128.7L462.3 126.1L468 123.7L473.7 121.3L479.3 119L485 116.8L490.7 114.7L496.3 112.7L502 110.8L507.7 109L513.3 107.3L519 105.8L524.7 104.4L530.3 103.1L536 102L541.7 101.1L547.3 100.3L553 99.6L558.7 99.2L564.3 98.9L570 98.8" fill="none" stroke="var(--water)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <path id="alt" pathLength="1" d="M230 238L235.7 237.9L241.3 237.6L247 237.2L252.7 236.5L258.3 235.7L264 234.8L269.7 233.7L275.3 232.4L281 231L286.7 229.5L292.3 227.8L298 226L303.7 224.1L309.3 222.1L315 220L320.7 217.8L326.3 215.5L332 213.1L337.7 210.7L343.3 208.1L349 205.5L354.7 202.9L360.3 200.2L366 197.4L371.7 194.7L377.3 191.9L383 189L388.7 186.2L394.3 183.3L400 180.4L405.7 177.5L411.3 174.6L417 171.8L422.7 168.9L428.3 166.1L434 163.4L439.7 160.6L445.3 157.9L451 155.3L456.7 152.7L462.3 150.1L468 147.7L473.7 145.3L479.3 143L485 140.8L490.7 138.7L496.3 136.7L502 134.8L507.7 133L513.3 131.3L519 129.8L524.7 128.4L530.3 127.1L536 126L541.7 125.1L547.3 124.3L553 123.6L558.7 123.2L564.3 122.9L570 122.8" fill="none" stroke="var(--leaf)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="rot-incl" style="font-family:var(--f-hand)" fill="var(--terra)" font-size="22"><text x="250" y="140">inclinação: o ritmo agora</text></g>
  <g id="pts-ab"><circle cx="286.7" cy="229.5" r="6" fill="var(--paper)" stroke="var(--ink)" stroke-width="3.5"/><circle cx="513.3" cy="131.3" r="6" fill="var(--paper)" stroke="var(--ink)" stroke-width="3.5"/><g style="font-family:var(--f-hand)" font-size="19" fill="var(--ink)"><text x="286.7" y="262" text-anchor="middle">x = 1</text><text x="513.3" y="262" text-anchor="middle">x = 5</text></g></g>
  <path id="sec-1" pathLength="1" d="M264 239.3L536 121.5" fill="none" stroke="var(--water)" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/>
  <path id="sec-2" pathLength="1" d="M309.3 224.8L490.7 136" fill="none" stroke="var(--water)" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/>
  <path id="sec-3" pathLength="1" d="M337.7 211.8L462.3 149" fill="none" stroke="var(--water)" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/>
  <path id="tri-sub" pathLength="1" d="M513.3 229.5V131.3" fill="none" stroke="var(--terra)" stroke-width="3.5" stroke-linecap="round" filter="url(#rough)"/>
  <path id="tri-dist" pathLength="1" d="M286.7 229.5H513.3" fill="none" stroke="var(--terra)" stroke-width="3.5" stroke-linecap="round" filter="url(#rough)"/>
  <g id="rot-subida" style="font-family:var(--f-hand)" font-size="21" fill="var(--terra)"><text x="523.3" y="178.4">subida</text><text x="523.3" y="200.4">122,7 m</text></g>
  <g id="rot-dist" style="font-family:var(--f-hand)" font-size="21" fill="var(--terra)"><text x="400" y="256" text-anchor="middle">distância: 4 km</text></g>
  <g id="rot-media" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="236" y="148">média: 122,7 ÷ 4</text><text x="236" y="172" font-size="25" fill="var(--water)">= 30,7 m/km</text></g>
  <g id="placar" style="font-family:var(--f-hand)" font-size="18" fill="var(--ink)">
    <text id="pl-0" x="238" y="138">h = 2: 30,7 m/km</text>
    <text id="pl-1" x="238" y="158">h = 1: 34,7</text>
    <text id="pl-2" x="238" y="178">h = 0,5: 35,7</text>
    <text id="pl-3" x="238" y="200" fill="var(--terra)" font-size="21">h → 0: 36</text>
  </g>
  <path id="tang" pathLength="1" d="M320.7 220.7L479.3 140.1" fill="none" stroke="var(--terra)" stroke-width="5" stroke-linecap="round" filter="url(#rough)"/>
  <path id="tang-b" pathLength="1" d="M320.7 196.7L479.3 116.1" fill="none" stroke="var(--terra)" stroke-width="5" stroke-linecap="round" filter="url(#rough)"/>
  <g id="rot-t" style="font-family:var(--f-hand)" font-size="23" fill="var(--terra)"><text x="458" y="128">36 m/km</text></g>
  <g id="rot-72" style="font-family:var(--f-hand)" font-size="24" fill="var(--ink)"><text x="418" y="226">72 m</text></g>
  <g id="desl" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><path d="M524.7 109.4V123.4M519.7 116.4L524.7 108.4L529.7 116.4M519.7 116.4L524.7 124.4L529.7 116.4" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><text x="535.7" y="123.4">+30 m</text></g>
  <g id="rot-igual" style="font-family:var(--f-hand)" font-size="21" fill="var(--terra)"><text x="236" y="130">mesma inclinação</text><text x="236" y="152">36 m/km nos dois</text></g>
  <g id="trilheiro"><g transform="translate(230 238)" filter="url(#rough)" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="0" cy="-34" r="6.5" fill="var(--wheat)"/>
    <path d="M0 -27V-12M0 -12L-6 0M0 -12L6 0M0 -23L-8 -15M0 -23L8 -17M8 -17L12 -3" stroke-width="3"/>
    <rect x="-10" y="-27" width="7" height="12" rx="2" fill="var(--terra)" stroke-width="2.5"/>
  </g></g>
</g>
<g id="painel-r">
  <path id="eixos-r" pathLength="1" d="M230 342V250M222 260L230 248L238 260M224 335H584M572 327L586 335L572 343" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="rot-r" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><text x="242" y="258">taxa (m/km): o ritmo</text><text x="220" y="270" text-anchor="end" font-size="19">36</text><path d="M224 263H236" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"/><text x="230" y="358" text-anchor="middle" font-size="19">0</text><text x="400" y="358" text-anchor="middle" font-size="19">3</text><text x="570" y="358" text-anchor="middle" font-size="19">6 km</text></g>
  <g id="faixas-r" fill="var(--a-calculo-fill)" fill-opacity="0.6" stroke="var(--a-calculo-ink)" stroke-width="2.5" stroke-linejoin="round" filter="url(#rough)">
    <rect x="230" y="323.5" width="28.3" height="11.5"/>
    <rect x="258.3" y="303.5" width="28.3" height="31.5"/>
    <rect x="286.7" y="287.5" width="28.3" height="47.5"/>
    <rect x="315" y="275.5" width="28.3" height="59.5"/>
    <rect x="343.3" y="267.5" width="28.3" height="67.5"/>
    <rect x="371.7" y="263.5" width="28.3" height="71.5"/>
  </g>
  <path id="area-r" d="M230 335L230 335L235.7 330.3L241.3 325.7L247 321.3L252.7 317.1L258.3 313L264 309.1L269.7 305.3L275.3 301.7L281 298.3L286.7 295L292.3 291.9L298 288.9L303.7 286.1L309.3 283.5L315 281L320.7 278.7L326.3 276.5L332 274.5L337.7 272.7L343.3 271L349 269.5L354.7 268.1L360.3 266.9L366 265.9L371.7 265L377.3 264.3L383 263.7L388.7 263.3L394.3 263.1L400 263L400 335Z" fill="var(--wheat)" fill-opacity="0.7" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" filter="url(#rough)"/>
  <path id="curva-r" pathLength="1" d="M230 335L235.7 330.3L241.3 325.7L247 321.3L252.7 317.1L258.3 313L264 309.1L269.7 305.3L275.3 301.7L281 298.3L286.7 295L292.3 291.9L298 288.9L303.7 286.1L309.3 283.5L315 281L320.7 278.7L326.3 276.5L332 274.5L337.7 272.7L343.3 271L349 269.5L354.7 268.1L360.3 266.9L366 265.9L371.7 265L377.3 264.3L383 263.7L388.7 263.3L394.3 263.1L400 263L405.7 263.1L411.3 263.3L417 263.7L422.7 264.3L428.3 265L434 265.9L439.7 266.9L445.3 268.1L451 269.5L456.7 271L462.3 272.7L468 274.5L473.7 276.5L479.3 278.7L485 281L490.7 283.5L496.3 286.1L502 288.9L507.7 291.9L513.3 295L519 298.3L524.7 301.7L530.3 305.3L536 309.1L541.7 313L547.3 317.1L553 321.3L558.7 325.7L564.3 330.3L570 335" fill="none" stroke="var(--terra)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <path id="guia-x" pathLength="1" d="M400 188.4V255" fill="none" stroke="var(--terra)" stroke-width="3" stroke-linecap="round" filter="url(#rough)"/>
  <g id="pt-r"><circle cx="400" cy="263" r="6" fill="var(--terra)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><text x="424" y="259" style="font-family:var(--f-hand)" font-size="21" fill="var(--terra)">36 m/km</text></g>
  <g id="rot-area" style="font-family:var(--f-hand)" font-size="24" fill="var(--ink)"><text x="315" y="318" text-anchor="middle">área = 72 m</text></g>
</g>
<g id="teorema">
  <rect x="255" y="150" width="290" height="130" rx="12" fill="var(--card)" fill-opacity="0.96" stroke="var(--ink)" stroke-width="4" filter="url(#rough)"/>
  <text x="400" y="178" text-anchor="middle" style="font-family:var(--f-hand)" font-size="21" fill="var(--terra)">o vai e vem do cálculo</text>
</g>
<g id="tc-d" style="font-family:var(--f-hand)" font-size="26" fill="var(--ink)"><text x="272" y="218">altitude</text><text x="528" y="218" text-anchor="end">taxa</text><path d="M372 211H442M432 203L443 211L432 219" fill="none" stroke="var(--terra)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/><text x="407" y="200" text-anchor="middle" font-size="20" fill="var(--terra)">derivar</text></g>
<g id="tc-s" style="font-family:var(--f-hand)" font-size="26" fill="var(--ink)"><text x="272" y="262">taxa</text><text x="528" y="262" text-anchor="end">altitude</text><path d="M338 255H428M418 247L429 255L418 263" fill="none" stroke="var(--water)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/><text x="383" y="244" text-anchor="middle" font-size="20" fill="var(--water)">somar</text></g>
<g id="dados" style="font-family:var(--f-hand)" font-size="20" fill="var(--ink)">
  <path d="M250 245H575M250 335H575" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" filter="url(#rough)"/>
  <text x="260" y="150">total acumulado (visitas)</text><text x="260" y="266">por dia (taxa)</text><text x="290" y="353" text-anchor="middle" font-size="16">dia 1</text><text x="350" y="353" text-anchor="middle" font-size="16">dia 2</text><text x="410" y="353" text-anchor="middle" font-size="16">dia 3</text><text x="470" y="353" text-anchor="middle" font-size="16">dia 4</text><text x="530" y="353" text-anchor="middle" font-size="16">dia 5</text>
  <path id="dados-linha" pathLength="1" d="M260 245L320 230.5L380 208.6L440 186.8L500 172.3L560 165" fill="none" stroke="var(--leaf)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="dados-pts"><circle cx="260" cy="245" r="5.5" fill="var(--paper)" stroke="var(--ink)" stroke-width="3"/><text x="260" y="234" text-anchor="middle" font-size="17">0</text><circle cx="320" cy="230.5" r="5.5" fill="var(--paper)" stroke="var(--ink)" stroke-width="3"/><text x="320" y="219.5" text-anchor="middle" font-size="17">120</text><circle cx="380" cy="208.6" r="5.5" fill="var(--paper)" stroke="var(--ink)" stroke-width="3"/><text x="380" y="197.6" text-anchor="middle" font-size="17">300</text><circle cx="440" cy="186.8" r="5.5" fill="var(--paper)" stroke="var(--ink)" stroke-width="3"/><text x="440" y="175.8" text-anchor="middle" font-size="17">480</text><circle cx="500" cy="172.3" r="5.5" fill="var(--paper)" stroke="var(--ink)" stroke-width="3"/><text x="500" y="161.3" text-anchor="middle" font-size="17">600</text><circle cx="560" cy="165" r="5.5" fill="var(--paper)" stroke="var(--ink)" stroke-width="3"/><text x="560" y="154" text-anchor="middle" font-size="17">660</text></g>
  <g id="dados-barras" fill="var(--terra)" fill-opacity="0.55" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" filter="url(#rough)"><rect x="270" y="307" width="40" height="28"/><text x="290" y="301" text-anchor="middle" font-size="17" fill="var(--ink)" stroke="none">120</text><rect x="330" y="293" width="40" height="42"/><text x="350" y="287" text-anchor="middle" font-size="17" fill="var(--ink)" stroke="none">180</text><rect x="390" y="293" width="40" height="42"/><text x="410" y="287" text-anchor="middle" font-size="17" fill="var(--ink)" stroke="none">180</text><rect x="450" y="307" width="40" height="28"/><text x="470" y="301" text-anchor="middle" font-size="17" fill="var(--ink)" stroke="none">120</text><rect x="510" y="321" width="40" height="14"/><text x="530" y="315" text-anchor="middle" font-size="17" fill="var(--ink)" stroke="none">60</text></g>
  <g id="rot-diff" fill="var(--terra)"><text x="575" y="266" text-anchor="end" font-size="21">np.diff</text></g>
  <g id="rot-cum" fill="var(--leaf)"><text x="575" y="128" text-anchor="end" font-size="21">np.cumsum</text></g>
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
  ocultos: ["guia","eixos-a","colina","alt","trilheiro","rot-alt","rot-incl","pts-ab","sec-1","tri-sub","rot-subida","tri-dist","rot-dist","rot-media","placar","pl-0","sec-2","pl-1","sec-3","pl-2","tang","pl-3","rot-t","eixos-r","pt-r","guia-x","rot-r","curva-r","faixas-r","area-r","rot-72","rot-area","teorema","tc-d","tc-s","dados","dados-linha","dados-pts","rot-diff","dados-barras","rot-cum","alt-b","desl","tang-b","rot-igual"]
};
