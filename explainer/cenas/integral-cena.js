/* Cena SVG do mini-video "Integrais": tanque de agua enchendo, desenhado a mao em papel quadriculado.
   Vazao q(t) = 12*exp(-t/2) L/min, t de 0 a 6 min. Pixels: x = 230 + (340/6)*t ; y = 295 - 13.5*q.
   Integral exata de 0 a 6 = 22.8051 L; de 1 a 4 = 11.3087 L.
   Somas de ponto medio: 4 faixas = 22.2793; 8 = 22.6720; 16 = 22.7717.
   Nivel do tanque: o grupo nivel sobe por y = -(4 + 124*V/26). */
window.Cenas = window.Cenas || {};
Cenas.integral = {
  viewBox: "0 0 800 450",
  svg: `<g id="papel">
  <rect x="0" y="0" width="800" height="450" fill="var(--card)"/>
  <path d="M0 0V450M25 0V450M50 0V450M75 0V450M100 0V450M125 0V450M150 0V450M175 0V450M200 0V450M225 0V450M250 0V450M275 0V450M300 0V450M325 0V450M350 0V450M375 0V450M400 0V450M425 0V450M450 0V450M475 0V450M500 0V450M525 0V450M550 0V450M575 0V450M600 0V450M625 0V450M650 0V450M675 0V450M700 0V450M725 0V450M750 0V450M775 0V450M800 0V450M0 0H800M0 25H800M0 50H800M0 75H800M0 100H800M0 125H800M0 150H800M0 175H800M0 200H800M0 225H800M0 250H800M0 275H800M0 300H800M0 325H800M0 350H800M0 375H800M0 400H800M0 425H800M0 450H800" fill="none" stroke="var(--grid)" stroke-width="1.5"/>
  <path d="M52 0V450" fill="none" stroke="var(--terra)" stroke-width="2" opacity="0.35"/>
  <circle cx="22" cy="60" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="150" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="240" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="330" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="400" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/>
</g>
<g id="grafico">
  <path id="eixos" pathLength="1" d="M230 301V116M222 124L230 112L238 124M224 295H588M576 287L590 295L576 303" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="rotulos" fill="var(--ink)" style="font-family:var(--f-hand)" font-size="22">
    <text x="212" y="139" text-anchor="end">12</text>
    <text x="240" y="130">q (L/min)</text>
    <text x="230" y="319" text-anchor="middle">0</text>
    <text x="570" y="319" text-anchor="middle">6</text>
    <text x="588" y="343" text-anchor="end">t (min)</text>
  </g>
  <path id="area-exata" d="M230 295L230 133L232.8 137L235.7 140.9L238.5 144.7L241.3 148.4L244.2 152L247 155.6L249.8 159L252.7 162.4L255.5 165.6L258.3 168.8L261.2 171.9L264 175L266.8 178L269.7 180.8L272.5 183.7L275.3 186.4L278.2 189.1L281 191.7L283.8 194.3L286.7 196.7L289.5 199.2L292.3 201.5L295.2 203.8L298 206.1L300.8 208.3L303.7 210.4L306.5 212.5L309.3 214.6L312.2 216.5L315 218.5L317.8 220.4L320.7 222.2L323.5 224L326.3 225.8L329.2 227.5L332 229.1L334.8 230.8L337.7 232.3L340.5 233.9L343.3 235.4L346.2 236.9L349 238.3L351.8 239.7L354.7 241.1L357.5 242.4L360.3 243.7L363.2 245L366 246.2L368.8 247.4L371.7 248.6L374.5 249.7L377.3 250.8L380.2 251.9L383 253L385.8 254L388.7 255.1L391.5 256L394.3 257L397.2 257.9L400 258.9L402.8 259.7L405.7 260.6L408.5 261.5L411.3 262.3L414.2 263.1L417 263.9L419.8 264.7L422.7 265.4L425.5 266.1L428.3 266.8L431.2 267.5L434 268.2L436.8 268.9L439.7 269.5L442.5 270.2L445.3 270.8L448.2 271.4L451 272L453.8 272.5L456.7 273.1L459.5 273.6L462.3 274.1L465.2 274.7L468 275.2L470.8 275.7L473.7 276.1L476.5 276.6L479.3 277L482.2 277.5L485 277.9L487.8 278.3L490.7 278.8L493.5 279.2L496.3 279.6L499.2 279.9L502 280.3L504.8 280.7L507.7 281L510.5 281.4L513.3 281.7L516.2 282L519 282.4L521.8 282.7L524.7 283L527.5 283.3L530.3 283.6L533.2 283.8L536 284.1L538.8 284.4L541.7 284.6L544.5 284.9L547.3 285.1L550.2 285.4L553 285.6L555.8 285.9L558.7 286.1L561.5 286.3L564.3 286.5L567.2 286.7L570 286.9L570 295Z" fill="var(--water)" fill-opacity="0.32" stroke="none"/>
  <g id="faixas4" fill="var(--a-calculo-fill)" fill-opacity="0.6" stroke="var(--a-calculo-ink)" stroke-width="3" stroke-linejoin="round" filter="url(#rough)">
  <rect id="f4-1" x="230" y="183.7" width="85" height="111.3"/>
  <rect id="f4-2" x="315" y="242.4" width="85" height="52.6"/>
  <rect id="f4-3" x="400" y="270.2" width="85" height="24.8"/>
  <rect id="f4-4" x="485" y="283.3" width="85" height="11.7"/>
</g>
  <g id="faixas8" fill="var(--a-calculo-fill)" fill-opacity="0.6" stroke="var(--a-calculo-ink)" stroke-width="3" stroke-linejoin="round" filter="url(#rough)">
  <rect x="230" y="160.7" width="42.5" height="134.3"/>
  <rect x="272.5" y="202.7" width="42.5" height="92.3"/>
  <rect x="315" y="231.6" width="42.5" height="63.4"/>
  <rect x="357.5" y="251.4" width="42.5" height="43.6"/>
  <rect x="400" y="265" width="42.5" height="30"/>
  <rect x="442.5" y="274.4" width="42.5" height="20.6"/>
  <rect x="485" y="280.8" width="42.5" height="14.2"/>
  <rect x="527.5" y="285.3" width="42.5" height="9.7"/>
</g>
  <g id="faixas16" fill="var(--a-calculo-fill)" fill-opacity="0.6" stroke="var(--a-calculo-ink)" stroke-width="2.5" stroke-linejoin="round" filter="url(#rough)">
  <rect x="230" y="147.5" width="21.3" height="147.5"/>
  <rect x="251.3" y="172.7" width="21.3" height="122.3"/>
  <rect x="272.5" y="193.6" width="21.3" height="101.4"/>
  <rect x="293.8" y="211" width="21.3" height="84"/>
  <rect x="315" y="225.3" width="21.3" height="69.7"/>
  <rect x="336.3" y="237.2" width="21.3" height="57.8"/>
  <rect x="357.5" y="247.1" width="21.3" height="47.9"/>
  <rect x="378.8" y="255.3" width="21.3" height="39.7"/>
  <rect x="400" y="262.1" width="21.3" height="32.9"/>
  <rect x="421.3" y="267.7" width="21.3" height="27.3"/>
  <rect x="442.5" y="272.4" width="21.3" height="22.6"/>
  <rect x="463.8" y="276.2" width="21.3" height="18.8"/>
  <rect x="485" y="279.5" width="21.3" height="15.5"/>
  <rect x="506.3" y="282.1" width="21.3" height="12.9"/>
  <rect x="527.5" y="284.3" width="21.3" height="10.7"/>
  <rect x="548.8" y="286.1" width="21.3" height="8.9"/>
</g>
  <path id="curva" pathLength="1" d="M230 133L235.7 140.9L241.3 148.4L247 155.6L252.7 162.4L258.3 168.8L264 175L269.7 180.8L275.3 186.4L281 191.7L286.7 196.7L292.3 201.5L298 206.1L303.7 210.4L309.3 214.6L315 218.5L320.7 222.2L326.3 225.8L332 229.1L337.7 232.3L343.3 235.4L349 238.3L354.7 241.1L360.3 243.7L366 246.2L371.7 248.6L377.3 250.8L383 253L388.7 255.1L394.3 257L400 258.9L405.7 260.6L411.3 262.3L417 263.9L422.7 265.4L428.3 266.8L434 268.2L439.7 269.5L445.3 270.8L451 272L456.7 273.1L462.3 274.1L468 275.2L473.7 276.1L479.3 277L485 277.9L490.7 278.8L496.3 279.6L502 280.3L507.7 281L513.3 281.7L519 282.4L524.7 283L530.3 283.6L536 284.1L541.7 284.6L547.3 285.1L553 285.6L558.7 286.1L564.3 286.5L570 286.9" fill="none" stroke="var(--water)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="faixa-um" filter="url(#rough)"><rect x="343.3" y="242.4" width="28.3" height="52.6" fill="var(--wheat)" fill-opacity="0.7" stroke="var(--ink)" stroke-width="3.5" stroke-linejoin="round"/></g>
  <g id="rot-altura" style="font-family:var(--f-hand)" font-size="24" fill="var(--terra)"><text x="335.3" y="276.7" text-anchor="end">altura q</text></g>
  <g id="rot-largura" style="font-family:var(--f-hand)" font-size="24" fill="var(--terra)"><path d="M343.3 327H371.7M343.3 321V333M371.7 321V333" fill="none" stroke="var(--terra)" stroke-width="3" stroke-linecap="round"/><text x="357.5" y="349" text-anchor="middle">largura Δt</text></g>
  <g id="rot-agua" style="font-family:var(--f-hand)" font-size="26" fill="var(--ink)"><text x="378" y="168" text-anchor="middle">água ≈ q · Δt</text></g>
  <g id="pergunta" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="378" y="152" text-anchor="middle">Quanta água</text><text x="378" y="178" text-anchor="middle">entrou no total?</text><path d="M372 188C374 206 360 218 350 224M350 224l12 -1M350 224l3 -12" fill="none" stroke="var(--terra)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/></g>
  <g id="placar" style="font-family:var(--f-hand)" font-size="19" fill="var(--ink)">
    <text x="330" y="150">erro (L)</text>
    <text id="placar4" x="330" y="172">4 faixas: 0,53</text>
    <text id="placar8" x="330" y="194">8 faixas: 0,13</text>
    <text id="placar16" x="330" y="216">16 faixas: 0,03</text>
  </g>
  <g id="integral-sim" style="font-family:var(--f-hand)" font-size="28" fill="var(--ink)"><text x="378" y="156" text-anchor="middle">V = ∫ q dt</text><text x="378" y="188" text-anchor="middle">= 22,8 L</text></g>
  <g id="area-ab"><path d="M286.7 295L286.7 196.7L289.5 199.2L292.3 201.5L295.2 203.8L298 206.1L300.8 208.3L303.7 210.4L306.5 212.5L309.3 214.6L312.2 216.5L315 218.5L317.8 220.4L320.7 222.2L323.5 224L326.3 225.8L329.2 227.5L332 229.1L334.8 230.8L337.7 232.3L340.5 233.9L343.3 235.4L346.2 236.9L349 238.3L351.8 239.7L354.7 241.1L357.5 242.4L360.3 243.7L363.2 245L366 246.2L368.8 247.4L371.7 248.6L374.5 249.7L377.3 250.8L380.2 251.9L383 253L385.8 254L388.7 255.1L391.5 256L394.3 257L397.2 257.9L400 258.9L402.8 259.7L405.7 260.6L408.5 261.5L411.3 262.3L414.2 263.1L417 263.9L419.8 264.7L422.7 265.4L425.5 266.1L428.3 266.8L431.2 267.5L434 268.2L436.8 268.9L439.7 269.5L442.5 270.2L445.3 270.8L448.2 271.4L451 272L453.8 272.5L456.7 273.1L456.7 295Z" fill="var(--wheat)" fill-opacity="0.7" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" filter="url(#rough)"/><text x="371.7" y="281" text-anchor="middle" style="font-family:var(--f-hand)" font-size="26" fill="var(--ink)">11,3 L</text></g>
  <g id="marca-a" style="font-family:var(--f-hand)" font-size="24" fill="var(--terra)"><path d="M286.7 303V174.7" fill="none" stroke="var(--terra)" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="7 7"/><text x="286.7" y="325" text-anchor="middle">a</text></g>
  <g id="marca-b" style="font-family:var(--f-hand)" font-size="24" fill="var(--terra)"><path d="M456.7 303V233.1" fill="none" stroke="var(--terra)" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="7 7"/><text x="456.7" y="325" text-anchor="middle">b</text></g>
  <defs><clipPath id="clip-tanque"><rect x="492" y="84" width="96" height="122"/></clipPath><clipPath id="clip-roda"><rect x="422" y="266" width="30" height="34"/></clipPath></defs>
  <g clip-path="url(#clip-tanque)"><g id="nivel"><path d="M492 210q12 -5 24 0t24 0t24 0t24 0V340H492Z" fill="var(--water)" fill-opacity="0.6" stroke="var(--water)" stroke-width="3" stroke-linejoin="round"/></g></g>
  <g id="tanque" fill="none" stroke="var(--ink)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)">
    <path d="M490 84V204Q490 212 498 212H582Q590 212 590 204V84"/>
    <path d="M438 78H520Q532 78 532 90V96M438 66V90"/>
    <path d="M532 104V112M532 124V130" stroke="var(--water)" stroke-width="4"/>
    <path d="M490 108H502M490 140H502M490 172H502" stroke-width="3" opacity="0.6"/>
  </g>
</g>
<g id="hodo-vel" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)">
  <path d="M452 152A48 48 0 0 1 548 152Z" fill="var(--card)" stroke="var(--ink)" stroke-width="4"/>
  <path d="M459 152L452 152M464.5 131.5L458.4 128M479.5 116.5L476 110.4M500 111L500 104M520.5 116.5L524 110.4M535.5 131.5L541.6 128M541 152L548 152" fill="none" stroke="var(--ink)" stroke-width="3"/>
  <path d="M500 152L526 122" fill="none" stroke="var(--terra)" stroke-width="5"/>
  <circle cx="500" cy="152" r="6" fill="var(--ink)"/>
  <text x="500" y="176" text-anchor="middle" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)" stroke="none">km/h</text>
</g>
<g id="hodo-odo" stroke-linecap="round" stroke-linejoin="round">
  <rect x="318" y="258" width="182" height="50" rx="8" fill="var(--card)" stroke="var(--ink)" stroke-width="4" filter="url(#rough)"/>
  <g fill="var(--ink)" font-family="var(--f-mono)" font-size="30" font-weight="700" text-anchor="middle"><text x="342" y="293">0</text><text x="372" y="293">1</text><text x="402" y="293">2</text></g>
  <rect x="422" y="266" width="30" height="34" fill="var(--wheat)" fill-opacity="0.7" stroke="none"/>
  <g clip-path="url(#clip-roda)"><g id="hodo-roda" fill="var(--ink)" font-family="var(--f-mono)" font-size="30" font-weight="700"><text x="437" y="293" text-anchor="middle">0</text><text x="437" y="327" text-anchor="middle">1</text><text x="437" y="361" text-anchor="middle">2</text><text x="437" y="395" text-anchor="middle">3</text><text x="437" y="429" text-anchor="middle">4</text><text x="437" y="463" text-anchor="middle">5</text><text x="437" y="497" text-anchor="middle">6</text><text x="437" y="531" text-anchor="middle">7</text><text x="437" y="565" text-anchor="middle">8</text><text x="437" y="599" text-anchor="middle">9</text></g></g>
  <text x="462" y="293" style="font-family:var(--f-hand)" font-size="26" fill="var(--ink)">km</text>
</g>
<g id="stream">
  <path id="stream-eixos" pathLength="1" d="M240 322V170M240 318H556" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/>
  <g id="stream-barras" fill="var(--water)" fill-opacity="0.7" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" filter="url(#rough)">
  <rect x="252" y="308.4" width="28" height="9.6"/>
  <rect x="289" y="302" width="28" height="16"/>
  <rect x="326" y="305.2" width="28" height="12.8"/>
  <rect x="363" y="295.6" width="28" height="22.4"/>
  <rect x="400" y="298.8" width="28" height="19.2"/>
  <rect x="437" y="292.4" width="28" height="25.6"/>
  <rect x="474" y="302" width="28" height="16"/>
  <rect x="511" y="305.2" width="28" height="12.8"/>
  </g>
  <path id="stream-soma" pathLength="1" d="M266 308.4L303 292.4L340 279.6L377 257.2L414 238L451 212.4L488 196.4L525 183.6" fill="none" stroke="var(--terra)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="stream-rotulos" style="font-family:var(--f-hand)" font-size="23" fill="var(--ink)"><text x="252" y="346">eventos por minuto</text><text x="525" y="171.6" text-anchor="end" fill="var(--terra)">cumsum: 42</text></g>
</g>
<g id="guia" stroke-linecap="round" stroke-linejoin="round">
  <g transform="translate(20 168) scale(0.9)">
    <ellipse cx="60" cy="128" rx="38" ry="7" fill="var(--rule-soft)" stroke="var(--ink)" stroke-width="3"/>
    <g filter="url(#rough)">
      <path d="M60 56C44 54 30 42 26 26C44 26 58 38 60 56Z" fill="var(--a-calculo-ink)" stroke="var(--ink)" stroke-width="3.5"/>
      <path d="M60 56C76 54 90 42 94 26C76 26 62 38 60 56Z" fill="var(--a-calculo-ink)" stroke="var(--ink)" stroke-width="3.5"/>
      <ellipse cx="60" cy="90" rx="33" ry="35" fill="var(--a-calculo-fill)" stroke="var(--ink)" stroke-width="4"/>
      <ellipse cx="48" cy="72" rx="8" ry="4.5" fill="var(--card)" opacity="0.5" transform="rotate(-25 48 72)"/>
      <ellipse cx="49" cy="86" rx="3.5" ry="4.8" fill="var(--ink)" stroke="none"/><ellipse cx="71" cy="86" rx="3.5" ry="4.8" fill="var(--ink)" stroke="none"/>
      <path d="M52 99Q60 106 68 99" fill="none" stroke="var(--ink)" stroke-width="3.5"/>
      <ellipse cx="41" cy="96" rx="5.5" ry="3.2" fill="var(--terra)" opacity="0.4" stroke="none"/><ellipse cx="79" cy="96" rx="5.5" ry="3.2" fill="var(--terra)" opacity="0.4" stroke="none"/>
    </g>
    <g id="guia-braco" filter="url(#rough)">
      <path d="M92 92C104 92 112 84 118 72" fill="none" stroke="var(--ink)" stroke-width="4"/>
      <path d="M118 72C120 62 128 58 136 58C136 68 130 74 118 72Z" fill="var(--leaf)" stroke="var(--ink)" stroke-width="3"/>
    </g>
  </g>
</g>`,
  ocultos: ["guia","tanque","nivel","eixos","rotulos","curva","pergunta","faixa-um","rot-altura","rot-largura","rot-agua","f4-1","f4-2","f4-3","f4-4","faixas8","faixas16","placar","placar4","placar8","placar16","area-exata","integral-sim","marca-a","marca-b","area-ab","hodo-vel","hodo-odo","stream","stream-eixos","stream-barras","stream-soma","stream-rotulos"]
};
