/* Cena SVG do mini-video "Maximos e minimos": trilho de montanha-russa, cafeteria e bacia de erro em papel quadriculado.
   Trilho: f(x) = x^3 - 6x^2 + 9x, pixels x = 250 + 80x, y = 306 - 21f. f'(x) = 3x^2 - 12x + 9 = 0 em x = 1 e x = 3; f(1) = 4, f(3) = 0; f''(1) = -6, f''(3) = 6.
   Intervalo [0.5; 4.2]: f(0.5) = 3.125, f(4.2) = 6.048 (maior, na borda), menor f(3) = 0.
   Cafeteria: p(q) = 10 - q/10, custo 2 por xicara: L(q) = 8q - 0,1q^2, topo em q = 40 (L = 160); L(30) = L(50) = 150; receita maxima em q = 50 (R = 250, L = 150).
   Marginais: R'(q) = 10 - q/5 cruza C' = 2 em q = 40. Pixels lucro: x = 250 + 4,4q, y = 310 - 0,8L; marginais y = 344 - 11m.
   Bacia: J(w) = (w - 3)^2 + 1, passo 0,3: w = 0, 1,8, 2,52, 2,808; J' = −6, −2,4, −0,96, −0,384; x = 260 + 64w, y = 342 - 11J. */
window.Cenas = window.Cenas || {};
Cenas.maxmin = {
  viewBox: "0 0 800 450",
  svg: `<g id="papel">
  <rect x="0" y="0" width="800" height="450" fill="var(--card)"/>
  <path d="M0 0V450M25 0V450M50 0V450M75 0V450M100 0V450M125 0V450M150 0V450M175 0V450M200 0V450M225 0V450M250 0V450M275 0V450M300 0V450M325 0V450M350 0V450M375 0V450M400 0V450M425 0V450M450 0V450M475 0V450M500 0V450M525 0V450M550 0V450M575 0V450M600 0V450M625 0V450M650 0V450M675 0V450M700 0V450M725 0V450M750 0V450M775 0V450M800 0V450M0 0H800M0 25H800M0 50H800M0 75H800M0 100H800M0 125H800M0 150H800M0 175H800M0 200H800M0 225H800M0 250H800M0 275H800M0 300H800M0 325H800M0 350H800M0 375H800M0 400H800M0 425H800M0 450H800" fill="none" stroke="var(--grid)" stroke-width="1.5"/>
  <path d="M52 0V450" fill="none" stroke="var(--terra)" stroke-width="2" opacity="0.35"/>
  <circle cx="22" cy="60" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="150" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="240" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="330" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="400" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/>
</g>
<path id="chao-t" pathLength="1" d="M236 330H604M240 330l-9 11M262 330l-9 11M284 330l-9 11M306 330l-9 11M328 330l-9 11M350 330l-9 11M372 330l-9 11M394 330l-9 11M416 330l-9 11M438 330l-9 11M460 330l-9 11M482 330l-9 11M504 330l-9 11M526 330l-9 11M548 330l-9 11M570 330l-9 11M592 330l-9 11" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/>
<g id="suportes" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round" opacity="0.28" filter="url(#rough)"><path d="M270 270.3V326M302 234.6V326M334 226.2V326M366 236.8V326M398 258.6V326M430 283.4V326M462 303.2V326M494 309.8V326M526 295.3V326M558 251.6V326"/></g>
<path id="trilho" pathLength="1" d="M250 306L258 288.3L266 273.1L274 260.1L282 249.2L290 240.4L298 233.4L306 228.2L314 224.7L322 222.7L330 222L338 222.6L346 224.4L354 227.1L362 230.7L370 235.1L378 240.1L386 245.7L394 251.6L402 257.7L410 264L418 270.3L426 276.4L434 282.3L442 287.9L450 292.9L458 297.3L466 300.9L474 303.6L482 305.4L490 306L498 305.3L506 303.3L514 299.8L522 294.6L530 287.6L538 278.8L546 267.9L554 254.9L562 239.7L570 222L578 201.8L586 179" fill="none" stroke="var(--terra)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="bolinha" filter="url(#rough)"><circle cx="262" cy="269.4" r="11" fill="var(--wheat)" stroke="var(--ink)" stroke-width="4"/><ellipse cx="258" cy="265.4" rx="3.5" ry="2.5" fill="var(--card)" stroke="none"/></g>

<path id="tg-topo" pathLength="1" d="M276 222H384" fill="none" stroke="var(--water)" stroke-width="5" stroke-linecap="round" filter="url(#rough)"/>
<path id="tg-vale" pathLength="1" d="M436 305H544" fill="none" stroke="var(--water)" stroke-width="5" stroke-linecap="round" filter="url(#rough)"/>
<g id="pt-topo" filter="url(#rough)"><circle cx="330" cy="222" r="9" fill="none" stroke="var(--ink)" stroke-width="4.5"/></g>
<g id="pt-vale" filter="url(#rough)"><circle cx="490" cy="306" r="9" fill="none" stroke="var(--ink)" stroke-width="4.5"/></g>
<g id="rot-topo" style="font-family:var(--f-hand)" font-size="24" fill="var(--ink)"><text x="330" y="200" text-anchor="middle">f′ = 0</text></g>
<g id="rot-vale" style="font-family:var(--f-hand)" font-size="24" fill="var(--ink)"><text x="490" y="270" text-anchor="middle">f′ = 0</text></g>
<g id="sinais" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><text x="286" y="284" text-anchor="middle" fill="var(--leaf)">f′ > 0, sobe</text><text x="424" y="232" text-anchor="middle" fill="var(--terra)">f′ < 0, desce</text><text x="560" y="300" text-anchor="middle" fill="var(--leaf)">f′ > 0, sobe</text></g>

<g id="eq-crit" style="font-family:var(--f-hand)" font-size="26" fill="var(--ink)"><text x="396" y="168">f′(x) = 0:</text><text x="396" y="196">3x² − 12x + 9 = 0</text><text x="396" y="226" fill="var(--terra)" font-size="28">x = 1  ou  x = 3</text></g>
<g id="val-topo" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="330" y="200" text-anchor="middle">x = 1, f = 4</text></g>
<g id="val-vale" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="490" y="270" text-anchor="middle">x = 3, f = 0</text></g>

<g id="seg-topo">
  <path d="M306 206Q330 178 354 206" fill="none" stroke="var(--terra)" stroke-width="4.5" stroke-linecap="round" filter="url(#rough)"/>
  <g id="seg-topo-t" style="font-family:var(--f-hand)" font-size="23" fill="var(--ink)"><text x="330" y="168" text-anchor="middle">f″(1) = −6: topo</text></g>
</g>
<g id="seg-vale">
  <path d="M466 262Q490 288 514 262" fill="none" stroke="var(--leaf)" stroke-width="4.5" stroke-linecap="round" filter="url(#rough)"/>
  <g id="seg-vale-t" style="font-family:var(--f-hand)" font-size="23" fill="var(--ink)"><text x="490" y="246" text-anchor="middle">f″(3) = +6: vale</text></g>
</g>

<g id="faixa-int"><rect x="290" y="158" width="296" height="172" fill="var(--leaf)" fill-opacity="0.14" stroke="var(--leaf)" stroke-width="3" stroke-dasharray="8 7" filter="url(#rough)"/><g id="rot-int" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><text x="438" y="321" text-anchor="middle">intervalo [0,5 ; 4,2]</text></g></g>
<g id="cand-a" filter="url(#rough)"><circle cx="290" cy="240.4" r="9" fill="none" stroke="var(--leaf)" stroke-width="4.5"/><g id="cand-a-t" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><text x="290" y="274.375" text-anchor="middle">borda: 3,1</text></g></g>
<g id="cand-b" filter="url(#rough)"><circle cx="330" cy="222" r="9" fill="none" stroke="var(--leaf)" stroke-width="4.5"/><g id="cand-b-t" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><text x="330" y="202" text-anchor="middle">topo: 4</text></g></g>
<g id="cand-c" filter="url(#rough)"><circle cx="490" cy="306" r="9" fill="none" stroke="var(--leaf)" stroke-width="4.5"/><g id="cand-c-t" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><text x="490" y="286" text-anchor="middle">vale: 0</text></g></g>
<g id="cand-d" filter="url(#rough)"><circle cx="586" cy="179" r="9" fill="none" stroke="var(--leaf)" stroke-width="4.5"/><g id="cand-d-t" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><text x="572" y="174.99199999999982" text-anchor="end">borda: 6</text></g></g>

<path id="eixos-l" pathLength="1" d="M244 310H602M590 302L604 310L590 318M250 316V160M242 174L250 158L258 174" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="rot-eixos-l" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="262" y="176">lucro L (R$)</text><text x="600" y="338" text-anchor="end">q (xícaras)</text></g>
<path id="lucro-curva" pathLength="1" d="M250 310L258.8 297.5L267.6 285.7L276.4 274.5L285.2 263.9L294 254L302.8 244.7L311.6 236.1L320.4 228.1L329.2 220.7L338 214L346.8 207.9L355.6 202.5L364.4 197.7L373.2 193.5L382 190L390.8 187.1L399.6 184.9L408.4 183.3L417.2 182.3L426 182L434.8 182.3L443.6 183.3L452.4 184.9L461.2 187.1L470 190L478.8 193.5L487.6 197.7L496.4 202.5L505.2 207.9L514 214L522.8 220.7L531.6 228.1L540.4 236.1L549.2 244.7L558 254L566.8 263.9L575.6 274.5L584.4 285.7L593.2 297.5" fill="none" stroke="var(--terra)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="pt-lucro" filter="url(#rough)"><circle cx="426" cy="182" r="9" fill="none" stroke="var(--ink)" stroke-width="4.5"/></g>
<g id="rot-lucro" style="font-family:var(--f-hand)" font-size="24" fill="var(--ink)"><text x="426" y="162" text-anchor="middle">topo: q = 40, L = 160</text></g>
<g id="guia-q40"><path d="M426 194V316" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 7" opacity="0.6"/><g id="guia-q40-t" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><text x="426" y="338" text-anchor="middle">40</text></g></g>
<g id="xicara" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)">
  <path d="M545 170H589L584 206Q567 216 550 206Z" fill="var(--wheat)" fill-opacity="0.8" stroke="var(--ink)" stroke-width="4"/>
  <path d="M589 178Q604 180 600 192Q597 200 586 200" fill="none" stroke="var(--ink)" stroke-width="4"/>
  <path d="M556 160Q550 150 557 142M570 160Q564 148 572 138" fill="none" stroke="var(--terra)" stroke-width="3.5"/>
</g>

<path id="eixos-m" pathLength="1" d="M244 344H602M590 336L604 344L590 352M250 350V212M242 226L250 210L258 226" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<path id="marg-r" pathLength="1" d="M250 234L470 344" fill="none" stroke="var(--leaf)" stroke-width="5.5" stroke-linecap="round" filter="url(#rough)"/>
<path id="marg-c" pathLength="1" d="M250 322H596" fill="none" stroke="var(--terra)" stroke-width="5.5" stroke-linecap="round" filter="url(#rough)"/>
<g id="pt-marg" filter="url(#rough)"><circle cx="426" cy="322" r="9" fill="none" stroke="var(--ink)" stroke-width="4.5"/></g>
<g id="rot-r" style="font-family:var(--f-hand)" font-size="22" fill="var(--leaf)"><text x="268" y="222">R′: rende</text></g>
<g id="rot-c" style="font-family:var(--f-hand)" font-size="22" fill="var(--terra)"><text x="592" y="310" text-anchor="end">C′ = 2: custa</text></g>
<g id="rot-marg" style="font-family:var(--f-hand)" font-size="23" fill="var(--ink)"><text x="426" y="292" text-anchor="middle">q = 40</text></g>

<path id="eixo-j" pathLength="1" d="M244 344H604" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/>
<path id="bacia" pathLength="1" d="M260 232L266.4 238.5L272.8 244.8L279.2 250.8L285.6 256.6L292 262.3L298.4 267.6L304.8 272.8L311.2 277.8L317.6 282.5L324 287L330.4 291.3L336.8 295.4L343.2 299.2L349.6 302.8L356 306.3L362.4 309.4L368.8 312.4L375.2 315.2L381.6 317.7L388 320L394.4 322.1L400.8 324L407.2 325.6L413.6 327L420 328.3L426.4 329.2L432.8 330L439.2 330.6L445.6 330.9L452 331L458.4 330.9L464.8 330.6L471.2 330L477.6 329.2L484 328.3L490.4 327L496.8 325.6L503.2 324L509.6 322.1L516 320L522.4 317.7L528.8 315.2L535.2 312.4L541.6 309.4L548 306.3L554.4 302.8L560.8 299.2L567.2 295.4L573.6 291.3L580 287" fill="none" stroke="var(--terra)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="rot-j" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="244" y="214">erro J</text><text x="604" y="366" text-anchor="end">peso w</text></g>
<g id="bola" filter="url(#rough)"><circle cx="260" cy="232" r="10" fill="var(--wheat)" stroke="var(--ink)" stroke-width="4"/></g>
<g id="passo-1" filter="url(#rough)"><circle cx="375.2" cy="315.2" r="9" fill="none" stroke="var(--leaf)" stroke-width="4.5"/></g>
<g id="passo-2" filter="url(#rough)"><circle cx="421.3" cy="328.5" r="9" fill="none" stroke="var(--leaf)" stroke-width="4.5"/></g>
<g id="passo-3" filter="url(#rough)"><circle cx="439.7" cy="330.6" r="9" fill="none" stroke="var(--leaf)" stroke-width="4.5"/></g>
<g id="rot-p0" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><text x="278" y="240">w = 0: J′ = −6</text></g>
<g id="rot-p1" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><text x="393.2" y="289.16">J′ = −2,4</text></g>
<g id="rot-p2" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><text x="443.28" y="316.4656">J′ = −0,96</text></g>
<g id="rot-p3" style="font-family:var(--f-hand)" font-size="22" fill="var(--terra)"><text x="439.712" y="366" text-anchor="middle">J′ ≈ −0,38</text></g>
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
  ocultos: ["guia","chao-t","suportes","trilho","bolinha","tg-topo","tg-vale","pt-topo","pt-vale","rot-topo","rot-vale","sinais","eq-crit","val-topo","val-vale","seg-topo","seg-vale","faixa-int","cand-a","cand-b","cand-c","cand-d","eixos-l","rot-eixos-l","lucro-curva","pt-lucro","rot-lucro","guia-q40","xicara","eixos-m","marg-r","marg-c","pt-marg","rot-r","rot-c","rot-marg","eixo-j","bacia","rot-j","bola","passo-1","passo-2","passo-3","rot-p0","rot-p1","rot-p2","rot-p3"]
};
