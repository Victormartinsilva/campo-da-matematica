/* Cena SVG do mini-video "Derivadas e tangentes": estrada de montanha desenhada em caderno quadriculado.
   Perfil analitico: f(x) = 190 - 38*sen((x - 170)/62) em pixels do viewBox (y cresce para baixo); declive df/dx = -(38/62)*cos((x - 170)/62).
   Ponto P em x = 215 (y = 164.8); secantes por Q em x = 350, 305, 270, 245, 227; tangente com declive -0.46 (sobe 0.46 px por px).
   Topo em x = 267.4, vale em x = 462.2. Grafico de f' com eixo em y = 296 e escala 42 px por unidade de declive.
   Bacia de custo: y = 360 - 94*((x - 490)/110)^2; bola parte de x = 402 e faz passos de gradiente descendente. */
window.Cenas = window.Cenas || {};
Cenas.derivada = {
  viewBox: "0 0 800 450",
  svg: `<g id="papel">
  <rect x="0" y="0" width="800" height="450" fill="var(--card)"/>
  <path d="M0 0V450M40 0V450M80 0V450M120 0V450M160 0V450M200 0V450M240 0V450M280 0V450M320 0V450M360 0V450M400 0V450M440 0V450M480 0V450M520 0V450M560 0V450M600 0V450M640 0V450M680 0V450M720 0V450M760 0V450M800 0V450M0 0H800M0 40H800M0 80H800M0 120H800M0 160H800M0 200H800M0 240H800M0 280H800M0 320H800M0 360H800M0 400H800M0 440H800" fill="none" stroke="var(--grid)" stroke-width="1.5"/>
  <path d="M96 0V450" fill="none" stroke="var(--terra)" stroke-width="2" opacity="0.3"/>
</g>
<path id="massa" d="M-10 199L-4 202.5L2 205.9L8 209.2L14 212.2L20 215.1L26 217.8L32 220.1L38 222.2L44 224L50 225.5L56 226.6L62 227.4L68 227.9L74 228L80 227.7L86 227.1L92 226.2L98 224.9L104 223.2L110 221.3L116 219.1L122 216.6L128 213.8L134 210.8L140 207.7L146 204.3L152 200.9L158 197.3L164 193.7L170 190L176 186.3L182 182.7L188 179.1L194 175.7L200 172.3L206 169.2L212 166.2L218 163.4L224 160.9L230 158.7L236 156.8L242 155.1L248 153.8L254 152.9L260 152.3L266 152L272 152.1L278 152.6L284 153.4L290 154.5L296 156L302 157.8L308 159.9L314 162.2L320 164.9L326 167.8L332 170.8L338 174.1L344 177.5L350 181L356 184.6L362 188.3L368 192L374 195.6L380 199.2L386 202.8L392 206.2L398 209.4L404 212.5L410 215.3L416 217.9L422 220.3L428 222.4L434 224.1L440 225.6L446 226.7L452 227.5L458 227.9L464 228L470 227.7L476 227.1L482 226.1L488 224.7L494 223.1L500 221.1L506 218.9L512 216.4L518 213.6L524 210.6L530 207.4L536 204.1L542 200.6L548 197L554 193.4L560 189.7L566 186.1L572 182.4L578 178.9L584 175.4L590 172.1L596 168.9L602 166L608 163.2L614 160.8L620 158.5L626 156.6L632 155L638 153.8L644 152.8L650 152.2L656 152L662 152.1L668 152.6L674 153.4L680 154.6L686 156.1L692 157.9L698 160L704 162.4L710 165.1L716 168L722 171.1L728 174.3L734 177.8L740 181.3L746 184.9L752 188.6L758 192.2L764 195.9L770 199.5L776 203L782 206.4L788 209.6L794 212.7L800 215.5L806 218.1L810 250L-10 250Z" fill="var(--soil)" fill-opacity="0.22"/>
<path id="estrada" pathLength="1" d="M-10 199L-4 202.5L2 205.9L8 209.2L14 212.2L20 215.1L26 217.8L32 220.1L38 222.2L44 224L50 225.5L56 226.6L62 227.4L68 227.9L74 228L80 227.7L86 227.1L92 226.2L98 224.9L104 223.2L110 221.3L116 219.1L122 216.6L128 213.8L134 210.8L140 207.7L146 204.3L152 200.9L158 197.3L164 193.7L170 190L176 186.3L182 182.7L188 179.1L194 175.7L200 172.3L206 169.2L212 166.2L218 163.4L224 160.9L230 158.7L236 156.8L242 155.1L248 153.8L254 152.9L260 152.3L266 152L272 152.1L278 152.6L284 153.4L290 154.5L296 156L302 157.8L308 159.9L314 162.2L320 164.9L326 167.8L332 170.8L338 174.1L344 177.5L350 181L356 184.6L362 188.3L368 192L374 195.6L380 199.2L386 202.8L392 206.2L398 209.4L404 212.5L410 215.3L416 217.9L422 220.3L428 222.4L434 224.1L440 225.6L446 226.7L452 227.5L458 227.9L464 228L470 227.7L476 227.1L482 226.1L488 224.7L494 223.1L500 221.1L506 218.9L512 216.4L518 213.6L524 210.6L530 207.4L536 204.1L542 200.6L548 197L554 193.4L560 189.7L566 186.1L572 182.4L578 178.9L584 175.4L590 172.1L596 168.9L602 166L608 163.2L614 160.8L620 158.5L626 156.6L632 155L638 153.8L644 152.8L650 152.2L656 152L662 152.1L668 152.6L674 153.4L680 154.6L686 156.1L692 157.9L698 160L704 162.4L710 165.1L716 168L722 171.1L728 174.3L734 177.8L740 181.3L746 184.9L752 188.6L758 192.2L764 195.9L770 199.5L776 203L782 206.4L788 209.6L794 212.7L800 215.5L806 218.1" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="ticks" fill="none" stroke="var(--terra)" stroke-width="4" stroke-linecap="round">
  <path id="tick-0" d="M209.4 183.8L233.1 173" filter="url(#rough)"/>
  <path id="tick-1" d="M232.2 173.1L257.5 166.7" filter="url(#rough)"/>
  <path id="tick-2" d="M254.4 167L280.4 167" filter="url(#rough)"/>
  <path id="tick-3" d="M283 167.6L307.9 175.2" filter="url(#rough)"/>
  <path id="tick-4" d="M313.8 178.2L336.8 190.3" filter="url(#rough)"/>
  <path id="tick-5" d="M345.9 196L368 209.6" filter="url(#rough)"/>
  <path id="tick-6" d="M378.7 216.2L401.7 228.3" filter="url(#rough)"/>
  <path id="tick-7" d="M412.9 233.4L437.7 241.1" filter="url(#rough)"/>
  <path id="tick-8" d="M449.2 243L475.2 243" filter="url(#rough)"/>
  <path id="tick-9" d="M488.9 240.6L513.6 232.6" filter="url(#rough)"/>
  <path id="tick-10" d="M526.9 226.3L549.7 213.7" filter="url(#rough)"/>
  <path id="tick-11" d="M562.3 205.9L584.5 192.4" filter="url(#rough)"/>
  <path id="tick-12" d="M594.9 186.1L618.3 174.7" filter="url(#rough)"/>
</g>
<path id="sec0" pathLength="1" d="M200 163L380 184.6" fill="none" stroke="var(--water)" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/>
<path id="sec1" pathLength="1" d="M200 165.8L335 156.8" fill="none" stroke="var(--water)" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/>
<path id="sec2" pathLength="1" d="M200 168.3L300 145.1" fill="none" stroke="var(--water)" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/>
<path id="sec3" pathLength="1" d="M200 169.9L275 144.1" fill="none" stroke="var(--water)" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/>
<path id="sec4" pathLength="1" d="M200 171L257 147.3" fill="none" stroke="var(--water)" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/>
<path id="tangente" pathLength="1" d="M198 172.6L300 125.8" fill="none" stroke="var(--terra)" stroke-width="5" stroke-linecap="round" filter="url(#rough)"/>
<g id="triangulo" stroke-linecap="round" stroke-linejoin="round">
  <g filter="url(#rough)" fill="none" stroke="var(--ink)" stroke-width="3">
    <path d="M215 164.8H285V132.7" stroke-dasharray="1 7"/>
    <path d="M285 164.8V132.7" stroke="var(--leaf)" stroke-width="4"/>
    <path d="M215 172.8H285" stroke="var(--water)" stroke-width="4"/>
  </g>
  <text x="203" y="198.8" font-family="var(--f-hand)" font-size="19" fill="var(--water)" stroke="none">metros andados</text>
  <text x="295" y="142.7" font-family="var(--f-hand)" font-size="21" fill="var(--leaf)" stroke="none">metros de subida</text>
</g>
<g id="taxa">
  <text x="270" y="298" font-family="var(--f-hand)" font-size="27" font-weight="700" fill="var(--ink)">inclinação = subida ÷ andado</text>
  <text x="270" y="330" font-family="var(--f-hand)" font-size="27" font-weight="700" fill="var(--terra)">≈ 0,46 m de subida por m andado</text>
</g>
<g id="ponto-q">
  <circle cx="350" cy="181" r="6" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3" filter="url(#rough)"/>
</g>
<circle id="ponto-p" cx="215" cy="164.8" r="6" fill="var(--terra)" stroke="var(--ink)" stroke-width="3" filter="url(#rough)"/>
<text id="rot-sec" x="362" y="217" font-family="var(--f-hand)" font-size="26" font-weight="700" fill="var(--water)">secante</text>
<text id="rot-tan" x="308" y="143.8" font-family="var(--f-hand)" font-size="26" font-weight="700" fill="var(--terra)">tangente</text>
<g id="pergunta">
  <text x="292" y="126" font-family="var(--f-hand)" font-size="27" font-weight="700" fill="var(--terra)">quão inclinada aqui?</text>
  <path d="M288 124C270 126 250 128 236 144" fill="none" stroke="var(--terra)" stroke-width="3" stroke-linecap="round" filter="url(#rough)"/>
  <path d="M236 144l1 -11M236 144l10 -4" fill="none" stroke="var(--terra)" stroke-width="3" stroke-linecap="round"/>
</g>
<g id="ciclista">
  <g id="ciclista-vis" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)">
    <circle cx="215" cy="156.8" r="8" fill="var(--card)" stroke="var(--ink)" stroke-width="3"/>
    <path d="M210 156.8H220M215 151.8V161.8" fill="none" stroke="var(--ink)" stroke-width="1.5" opacity="0.5"/>
    <path d="M215 156.8L215 142.8" fill="none" stroke="var(--ink)" stroke-width="3"/>
    <path d="M212 141.8L217 127.80000000000001" fill="none" stroke="var(--terra)" stroke-width="5"/>
    <path d="M217 129.8L225 136.8" fill="none" stroke="var(--ink)" stroke-width="3"/>
    <path d="M213 142.8L218 150.8" fill="none" stroke="var(--ink)" stroke-width="3"/>
    <circle cx="218" cy="120.80000000000001" r="5.5" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3"/>
    <path d="M212 118.80000000000001C215 111.80000000000001 223 112.80000000000001 224 118.80000000000001" fill="var(--terra)" stroke="var(--ink)" stroke-width="2.5"/>
  </g>
</g>
<g id="grafico-fp" stroke-linecap="round" stroke-linejoin="round">
  <g id="eixos-fp" fill="none" stroke="var(--ink)" stroke-width="3" filter="url(#rough)" opacity="0.7">
    <path d="M200 296H606M600 291L606 296L600 301"/>
  </g>
  <text x="204" y="266" font-family="var(--f-hand)" font-size="26" font-weight="700" fill="var(--ink)">f′(x)</text>
  <path id="fp-0" pathLength="1" d="M215 276.7L218.7 277.8L222.5 278.9L226.2 280.1L230 281.4L233.7 282.7L237.5 284L241.2 285.4" fill="none" stroke="var(--terra)" stroke-width="5" filter="url(#rough)"/>
  <path id="fp-1" pathLength="1" d="M241.2 285.4L244.9 286.9L248.7 288.3L252.4 289.8L256.2 291.4L259.9 292.9L263.6 294.4L267.4 296" fill="none" stroke="var(--terra)" stroke-width="5" filter="url(#rough)"/>
  <path id="fp-2" pathLength="1" d="M267.4 296L271.4 297.7L275.5 299.4L279.6 301L283.6 302.7L287.7 304.3L291.7 305.9L295.8 307.4L299.9 308.9" fill="none" stroke="var(--terra)" stroke-width="5" filter="url(#rough)"/>
  <path id="fp-3" pathLength="1" d="M299.9 308.9L303.9 310.3L308 311.7L312 313L316.1 314.2L320.1 315.4L324.2 316.4L328.3 317.4L332.3 318.3" fill="none" stroke="var(--terra)" stroke-width="5" filter="url(#rough)"/>
  <path id="fp-4" pathLength="1" d="M332.3 318.3L336.4 319.1L340.4 319.8L344.5 320.4L348.5 320.9L352.6 321.2L356.7 321.5L360.7 321.7L364.8 321.7" fill="none" stroke="var(--terra)" stroke-width="5" filter="url(#rough)"/>
  <path id="fp-5" pathLength="1" d="M364.8 321.7L368.8 321.7L372.9 321.5L377 321.2L381 320.9L385.1 320.4L389.1 319.8L393.2 319.1L397.2 318.3" fill="none" stroke="var(--terra)" stroke-width="5" filter="url(#rough)"/>
  <path id="fp-6" pathLength="1" d="M397.2 318.3L401.3 317.4L405.4 316.4L409.4 315.4L413.5 314.2L417.5 313L421.6 311.7L425.6 310.3L429.7 308.9" fill="none" stroke="var(--terra)" stroke-width="5" filter="url(#rough)"/>
  <path id="fp-7" pathLength="1" d="M429.7 308.9L433.8 307.4L437.8 305.9L441.9 304.3L445.9 302.7L450 301L454.1 299.4L458.1 297.7L462.2 296" fill="none" stroke="var(--terra)" stroke-width="5" filter="url(#rough)"/>
  <path id="fp-8" pathLength="1" d="M462.2 296L466 294.4L469.8 292.8L473.7 291.3L477.5 289.7L481.3 288.2L485.1 286.7L489 285.2L492.8 283.8L496.6 282.4" fill="none" stroke="var(--terra)" stroke-width="5" filter="url(#rough)"/>
  <path id="fp-9" pathLength="1" d="M496.6 282.4L500.5 281.1L504.3 279.8L508.1 278.6L511.9 277.5L515.8 276.4L519.6 275.4L523.4 274.5L527.3 273.7L531.1 272.9" fill="none" stroke="var(--terra)" stroke-width="5" filter="url(#rough)"/>
  <path id="fp-10" pathLength="1" d="M531.1 272.9L534.9 272.3L538.7 271.7L542.6 271.2L546.4 270.8L550.2 270.5L554.1 270.4L557.9 270.3L561.7 270.3L565.5 270.4" fill="none" stroke="var(--terra)" stroke-width="5" filter="url(#rough)"/>
  <path id="fp-11" pathLength="1" d="M565.5 270.4L569.4 270.6L573.2 270.9L577 271.3L580.9 271.8L584.7 272.3L588.5 273L592.3 273.8L596.2 274.6L600 275.5" fill="none" stroke="var(--terra)" stroke-width="5" filter="url(#rough)"/>
  <text id="rot-pos" x="236" y="326" text-anchor="middle" font-family="var(--f-hand)" font-size="19" font-weight="700" fill="var(--leaf)">f′ &gt; 0</text>
  <text id="rot-zero" x="295.4" y="288" text-anchor="middle" font-family="var(--f-hand)" font-size="19" font-weight="700" fill="var(--ink)">f′ = 0</text>
  <text id="rot-neg" x="364.8" y="284" text-anchor="middle" font-family="var(--f-hand)" font-size="19" font-weight="700" fill="var(--water)">f′ &lt; 0</text>
  <text id="rot-zero2" x="434.2" y="288" text-anchor="middle" font-family="var(--f-hand)" font-size="19" font-weight="700" fill="var(--ink)">f′ = 0</text>
  <g id="ponto-fp">
    <circle cx="215" cy="276.7" r="6" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3" filter="url(#rough)"/>
  </g>
</g>
<g id="odometro" stroke-linecap="round" stroke-linejoin="round">
  <g filter="url(#rough)">
    <rect x="240" y="314" width="112" height="34" rx="6" fill="var(--card)" stroke="var(--ink)" stroke-width="4"/>
    <path d="M276 314V348M314 314V348" fill="none" stroke="var(--ink)" stroke-width="1.5" opacity="0.4"/>
  </g>
  <text x="296" y="338" text-anchor="middle" font-family="var(--f-mono)" font-size="20" font-weight="700" fill="var(--ink)">128 460</text>
  <text x="296" y="304" text-anchor="middle" font-family="var(--f-hand)" font-size="26" font-weight="700" fill="var(--ink)">odômetro</text>
  <text x="296" y="368" text-anchor="middle" font-family="var(--f-hand)" font-size="24" fill="var(--ink)">posição (km)</text>
</g>
<g id="rel-vel" stroke-linecap="round" stroke-linejoin="round">
  <path d="M362 332H430M420 324l10 8l-10 8" fill="none" stroke="var(--terra)" stroke-width="4" filter="url(#rough)"/>
  <text x="396" y="320" text-anchor="middle" font-family="var(--f-hand)" font-size="24" font-weight="700" fill="var(--terra)">derivada</text>
</g>
<g id="velocimetro" stroke-linecap="round" stroke-linejoin="round">
  <g filter="url(#rough)">
    <circle cx="495" cy="336" r="46" fill="var(--card)" stroke="var(--ink)" stroke-width="4"/>
    <path d="M462.1 355A38 38 0 1 1 527.9 355" fill="none" stroke="var(--rule-soft)" stroke-width="6"/>
    <path d="M463.8 354L469.9 350.5M459 336L466 336M463.8 318L469.9 321.5M477 304.8L480.5 310.9M495 300L495 307M513 304.8L509.5 310.9M526.2 318L520.1 321.5M531 336L524 336M526.2 354L520.1 350.5" fill="none" stroke="var(--ink)" stroke-width="2.5"/>
    <path d="M495 336L508 313.5" fill="none" stroke="var(--terra)" stroke-width="4"/>
    <circle cx="495" cy="336" r="5" fill="var(--ink)"/>
  </g>
  <text x="495" y="362" text-anchor="middle" font-family="var(--f-mono)" font-size="11" font-weight="700" fill="var(--ink)">km/h</text>
  <text x="495" y="280" text-anchor="middle" font-family="var(--f-hand)" font-size="25" font-weight="700" fill="var(--ink)">velocímetro</text>
</g>
<g id="ia" stroke-linecap="round" stroke-linejoin="round">
  <path id="tigela" pathLength="1" d="M380 266L384 272.7L388 279.2L392 285.4L396 291.4L400 297.1L404 302.5L408 307.8L412 312.7L416 317.5L420 321.9L424 326.2L428 330.1L432 333.9L436 337.3L440 340.6L444 343.6L448 346.3L452 348.8L456 351L460 353L464 354.7L468 356.2L472 357.5L476 358.5L480 359.2L484 359.7L488 360L492 360L496 359.7L500 359.2L504 358.5L508 357.5L512 356.2L516 354.7L520 353L524 351L528 348.8L532 346.3L536 343.6L540 340.6L544 337.3L548 333.9L552 330.1L556 326.2L560 321.9L564 317.5L568 312.7L572 307.8L576 302.5L580 297.1L584 291.4L588 285.4L592 279.2L596 272.7L600 266" fill="none" stroke="var(--ink)" stroke-width="5" filter="url(#rough)"/>
  <path id="tg-ia" pathLength="1" d="M386.7 278.9L417.3 320.8" fill="none" stroke="var(--terra)" stroke-width="4" filter="url(#rough)"/>
  <path id="seta-ia" pathLength="1" d="M419.8 286.9L454 333.7M454 333.7l-1.4 -13.8M454 333.7l-12.7 -5.6" fill="none" stroke="var(--terra)" stroke-width="4" filter="url(#rough)"/>
  <text id="rot-ia" x="546" y="330" text-anchor="end" font-family="var(--f-hand)" font-size="26" font-weight="700" fill="var(--ink)">erro</text>
  <g id="bola-ia">
    <g filter="url(#rough)">
      <circle cx="402" cy="288.8" r="11" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5"/>
      <path d="M397 285.8C399 281.8 403 280.8 406 282.8" fill="none" stroke="var(--card)" stroke-width="2.5"/>
    </g>
  </g>
</g>
<g id="guia" stroke-linecap="round" stroke-linejoin="round">
  <g filter="url(#rough)">
    <ellipse cx="112" cy="349" rx="34" ry="6" fill="var(--soil)" opacity="0.35" stroke="none"/>
    <path d="M112 292C99 291 88 282 85 266C99 266 110 276 112 292Z" fill="var(--a-calculo-ink)" stroke="var(--ink)" stroke-width="3"/>
    <path d="M112 292C125 291 136 282 139 266C125 266 114 276 112 292Z" fill="var(--a-calculo-ink)" stroke="var(--ink)" stroke-width="3"/>
    <path d="M109 287C103 281 97 275 91 270" fill="none" stroke="var(--ink)" stroke-width="1.8" opacity="0.45"/>
    <ellipse cx="112" cy="319" rx="27" ry="29" fill="var(--a-calculo-fill)" stroke="var(--ink)" stroke-width="3.5"/>
    <ellipse cx="102" cy="305" rx="6" ry="3.5" fill="var(--card)" opacity="0.5" stroke="none" transform="rotate(-25 102 305)"/>
    <ellipse cx="103" cy="317" rx="3" ry="4.2" fill="var(--ink)" stroke="none"/>
    <ellipse cx="121" cy="317" rx="3" ry="4.2" fill="var(--ink)" stroke="none"/>
    <path d="M105 329Q112 336 119 329" fill="none" stroke="var(--ink)" stroke-width="2.8"/>
    <ellipse cx="95" cy="327" rx="4.5" ry="2.8" fill="var(--terra)" opacity="0.4" stroke="none"/>
    <ellipse cx="129" cy="327" rx="4.5" ry="2.8" fill="var(--terra)" opacity="0.4" stroke="none"/>
    <path d="M87 322Q78 330 82 340" fill="none" stroke="var(--ink)" stroke-width="3.5"/>
  </g>
  <g id="guia-braco" filter="url(#rough)">
    <path d="M137 322Q156 318 169 300" fill="none" stroke="var(--ink)" stroke-width="3.5"/>
    <path d="M169 300l9 -3M169 300l6 -9M169 300l-1 -10" fill="none" stroke="var(--ink)" stroke-width="3"/>
  </g>
</g>`,
  ocultos: ["guia","massa","estrada","ciclista-vis","pergunta","ponto-p","ponto-q","rot-sec","rot-tan","sec0","sec1","sec2","sec3","sec4","tangente","triangulo","taxa","grafico-fp","ponto-fp","rot-pos","rot-zero","rot-neg","rot-zero2","fp-0","fp-1","fp-2","fp-3","fp-4","fp-5","fp-6","fp-7","fp-8","fp-9","fp-10","fp-11","tick-0","tick-1","tick-2","tick-3","tick-4","tick-5","tick-6","tick-7","tick-8","tick-9","tick-10","tick-11","tick-12","odometro","rel-vel","velocimetro","ia","tigela","tg-ia","seta-ia","rot-ia","bola-ia"]
};
