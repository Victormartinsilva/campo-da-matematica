/* Cena SVG do mini-video "Series de Taylor": lavoura vista de lado.
   Relevo: y(x) = 255 + soma de senos; estaca, bambu, arame e arame4 sao os polinomios de Taylor de ordem 1, 2, 3 e 4 em x = 400.
   O sensor parte de x = 470; ao mover +230 em x ele precisa de +77.3 em y para ficar sobre o relevo em x = 700. */
window.Cenas = window.Cenas || {};
Cenas.taylor = {
  viewBox: "0 0 800 450",
  svg: `<g id="ceu">
  <rect x="0" y="0" width="800" height="450" fill="var(--card)"/>
  <circle cx="690" cy="72" r="26" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3" filter="url(#rough)"/>
  <g fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.35" filter="url(#rough)">
    <path d="M110 70 C120 54 142 54 150 66 C162 58 180 64 178 78 L108 78 C100 78 100 72 110 70Z"/>
    <path d="M640 150 C648 138 666 138 674 148 C684 142 698 148 696 158 L636 158 C630 158 630 152 640 150Z"/>
  </g>
</g>
<g id="chao" stroke-linecap="round" stroke-linejoin="round">
  <path d="M-10 301.6L-4 304.2L2 306.6L8 308.8L14 310.8L20 312.6L26 314.1L32 315.5L38 316.6L44 317.5L50 318.1L56 318.5L62 318.7L68 318.6L74 318.3L80 317.8L86 317L92 316.1L98 314.9L104 313.5L110 311.9L116 310.2L122 308.3L128 306.2L134 304L140 301.6L146 299.1L152 296.5L158 293.8L164 291.1L170 288.2L176 285.4L182 282.4L188 279.5L194 276.5L200 273.5L206 270.5L212 267.6L218 264.6L224 261.7L230 258.9L236 256.1L242 253.4L248 250.7L254 248.2L260 245.7L266 243.2L272 240.9L278 238.7L284 236.5L290 234.5L296 232.6L302 230.7L308 228.9L314 227.3L320 225.7L326 224.2L332 222.8L338 221.5L344 220.3L350 219.2L356 218.1L362 217.1L368 216.2L374 215.3L380 214.5L386 213.8L392 213.1L398 212.5L404 212L410 211.5L416 211L422 210.6L428 210.3L434 210L440 209.8L446 209.6L452 209.5L458 209.5L464 209.5L470 209.6L476 209.8L482 210L488 210.3L494 210.7L500 211.2L506 211.8L512 212.5L518 213.3L524 214.2L530 215.2L536 216.3L542 217.5L548 218.9L554 220.3L560 221.9L566 223.7L572 225.5L578 227.5L584 229.6L590 231.8L596 234.2L602 236.6L608 239.2L614 241.9L620 244.7L626 247.6L632 250.5L638 253.6L644 256.7L650 259.9L656 263.1L662 266.4L668 269.6L674 272.9L680 276.2L686 279.5L692 282.7L698 285.9L704 289L710 292L716 295L722 297.8L728 300.6L734 303.2L740 305.6L746 307.9L752 310L758 312L764 313.7L770 315.2L776 316.6L782 317.7L788 318.6L794 319.2L800 319.6L806 319.8L810 450L-10 450Z" fill="var(--a-calculo-fill)" opacity="0.38"/>
  <path d="M-10 372Q20 379 40 372Q60 365 80 372Q100 379 120 372Q140 365 160 372Q180 379 200 372Q220 365 240 372Q260 379 280 372Q300 365 320 372Q340 379 360 372Q380 365 400 372Q420 379 440 372Q460 365 480 372Q500 379 520 372Q540 365 560 372Q580 379 600 372Q620 365 640 372Q660 379 680 372Q700 365 720 372Q740 379 760 372Q780 365 800 372Q820 379 840 372L810 450L-10 450Z" fill="var(--soil)" opacity="0.6"/>
  <g fill="none" stroke="var(--ink)" stroke-width="3" opacity="0.4" filter="url(#rough)">
    <path d="M40 398 C140 390 220 402 320 394 S520 402 640 394 S760 398 790 396"/>
    <path d="M10 424 C120 416 240 428 360 420 S560 428 700 420 S780 424 800 422"/>
  </g>
  <g fill="none" stroke="var(--leaf)" stroke-width="3" opacity="0.5">
    <path d="M250 372 l-3 -12 M256 372 l1 -14 M262 372 l4 -11"/>
    <path d="M520 374 l-3 -12 M526 374 l1 -14 M532 374 l4 -11"/>
    <path d="M660 372 l-3 -11 M666 372 l1 -13 M672 372 l4 -10"/>
  </g>
</g>
<g id="faixa">
  <rect x="355" y="40" width="90" height="370" fill="var(--leaf)" opacity="0.2"/>
  <path d="M355 40 V410 M445 40 V410" fill="none" stroke="var(--leaf)" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round" opacity="0.8"/>
</g>
<path id="relevo" pathLength="1" d="M-10 301.6L-4 304.2L2 306.6L8 308.8L14 310.8L20 312.6L26 314.1L32 315.5L38 316.6L44 317.5L50 318.1L56 318.5L62 318.7L68 318.6L74 318.3L80 317.8L86 317L92 316.1L98 314.9L104 313.5L110 311.9L116 310.2L122 308.3L128 306.2L134 304L140 301.6L146 299.1L152 296.5L158 293.8L164 291.1L170 288.2L176 285.4L182 282.4L188 279.5L194 276.5L200 273.5L206 270.5L212 267.6L218 264.6L224 261.7L230 258.9L236 256.1L242 253.4L248 250.7L254 248.2L260 245.7L266 243.2L272 240.9L278 238.7L284 236.5L290 234.5L296 232.6L302 230.7L308 228.9L314 227.3L320 225.7L326 224.2L332 222.8L338 221.5L344 220.3L350 219.2L356 218.1L362 217.1L368 216.2L374 215.3L380 214.5L386 213.8L392 213.1L398 212.5L404 212L410 211.5L416 211L422 210.6L428 210.3L434 210L440 209.8L446 209.6L452 209.5L458 209.5L464 209.5L470 209.6L476 209.8L482 210L488 210.3L494 210.7L500 211.2L506 211.8L512 212.5L518 213.3L524 214.2L530 215.2L536 216.3L542 217.5L548 218.9L554 220.3L560 221.9L566 223.7L572 225.5L578 227.5L584 229.6L590 231.8L596 234.2L602 236.6L608 239.2L614 241.9L620 244.7L626 247.6L632 250.5L638 253.6L644 256.7L650 259.9L656 263.1L662 266.4L668 269.6L674 272.9L680 276.2L686 279.5L692 282.7L698 285.9L704 289L710 292L716 295L722 297.8L728 300.6L734 303.2L740 305.6L746 307.9L752 310L758 312L764 313.7L770 315.2L776 316.6L782 317.7L788 318.6L794 319.2L800 319.6L806 319.8" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<path id="bambu" pathLength="1" d="M230 250.8L236 248.7L242 246.6L248 244.6L254 242.7L260 240.8L266 238.9L272 237.1L278 235.4L284 233.7L290 232.1L296 230.5L302 229L308 227.6L314 226.2L320 224.8L326 223.6L332 222.3L338 221.2L344 220L350 219L356 218L362 217L368 216.1L374 215.3L380 214.5L386 213.8L392 213.1L398 212.5L404 212L410 211.5L416 211L422 210.6L428 210.3L434 210L440 209.8L446 209.7L452 209.5L458 209.5L464 209.5L470 209.6L476 209.7L482 209.9L488 210.1L494 210.4L500 210.7L506 211.1L512 211.6L518 212.1L524 212.6L530 213.3L536 214L542 214.7L548 215.5L554 216.3L560 217.2L566 218.2L572 219.2L578 220.3L584 221.4L590 222.6L596 223.8L602 225.1L608 226.5L614 227.9L620 229.3L626 230.9L632 232.4L638 234.1L644 235.8L650 237.5" fill="none" stroke="var(--wheat)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<path id="arame" pathLength="1" d="M230 255.4L236 252.8L242 250.3L248 247.9L254 245.6L260 243.3L266 241.2L272 239.1L278 237.1L284 235.2L290 233.4L296 231.6L302 229.9L308 228.3L314 226.8L320 225.3L326 223.9L332 222.6L338 221.4L344 220.2L350 219.1L356 218.1L362 217.1L368 216.2L374 215.3L380 214.5L386 213.8L392 213.1L398 212.5L404 212L410 211.5L416 211L422 210.6L428 210.3L434 210L440 209.8L446 209.6L452 209.4L458 209.3L464 209.3L470 209.2L476 209.3L482 209.3L488 209.5L494 209.6L500 209.8L506 210L512 210.3L518 210.5L524 210.9L530 211.2L536 211.6L542 212L548 212.4L554 212.9L560 213.4L566 213.9L572 214.4L578 215L584 215.6L590 216.2L596 216.8L602 217.4L608 218.1L614 218.7L620 219.4L626 220.1L632 220.8L638 221.5L644 222.2L650 222.9" fill="none" stroke="var(--water)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<path id="arame4" pathLength="1" d="M230 266.4L236 262.4L242 258.5L248 254.9L254 251.6L260 248.4L266 245.4L272 242.6L278 240L284 237.6L290 235.3L296 233.1L302 231.1L308 229.3L314 227.5L320 225.9L326 224.3L332 222.9L338 221.6L344 220.3L350 219.2L356 218.1L362 217.1L368 216.2L374 215.3L380 214.5L386 213.8L392 213.1L398 212.5L404 212L410 211.5L416 211L422 210.6L428 210.3L434 210L440 209.8L446 209.6L452 209.5L458 209.5L464 209.5L470 209.6L476 209.7L482 209.9L488 210.2L494 210.6L500 211.1L506 211.7L512 212.3L518 213.1L524 214L530 215L536 216.1L542 217.4L548 218.8L554 220.3L560 222L566 223.9L572 226L578 228.2L584 230.7L590 233.3L596 236.2L602 239.3L608 242.7L614 246.3L620 250.2L626 254.4L632 258.9L638 263.7L644 268.9L650 274.3L656 280.2L662 286.4L668 293L674 300.1L680 307.5L686 315.4L692 323.8L698 332.6" fill="none" stroke="var(--a-calculo-ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<path id="estaca" pathLength="1" d="M330 218.9L340 218L350 217L360 216.1L370 215.2L380 214.2L390 213.3L400 212.3L410 211.4L420 210.5L430 209.5L440 208.6L450 207.6L460 206.7L470 205.7" fill="none" stroke="var(--soil)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="bandeira" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)">
  <path d="M400 212.3 V146.3" fill="none" stroke="var(--ink)" stroke-width="4"/>
  <path d="M400 146.3 L442 159.3 L400 172.3Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <circle cx="400" cy="212.3" r="6" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
</g>
<g id="sensor" stroke-linecap="round" stroke-linejoin="round">
  <g transform="translate(470 209.6) rotate(1.2)">
    <g filter="url(#rough)">
      <path d="M0 -38 V-54" fill="none" stroke="var(--ink)" stroke-width="3"/>
      <circle cx="0" cy="-58" r="5" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
      <rect x="-26" y="-38" width="52" height="22" rx="5" fill="var(--card)" stroke="var(--ink)" stroke-width="4"/>
      <rect x="-17" y="-33" width="22" height="9" rx="2" fill="var(--a-calculo-fill)" stroke="var(--ink)" stroke-width="2.5"/>
      <circle cx="-16" cy="-9" r="9" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5"/>
      <circle cx="16" cy="-9" r="9" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5"/>
      <circle cx="-16" cy="-9" r="2" fill="var(--ink)"/>
      <circle cx="16" cy="-9" r="2" fill="var(--ink)"/>
    </g>
  </g>
</g>
<g id="erro" stroke-linecap="round" stroke-linejoin="round">
  <g filter="url(#rough)" fill="none" stroke="var(--terra)" stroke-width="4">
    <path d="M700 286.9 V335.7"/>
    <path d="M690 286.9 H710 M690 335.7 H710" stroke-width="3"/>
    <path d="M722 333.3 C735 341.3 745 321.3 738 313.3" stroke-width="3"/>
  </g>
  <text x="716" y="357.3" font-family="var(--f-hand)" font-size="26" fill="var(--terra)" stroke="none">erro</text>
</g>
<g id="calc" stroke-linecap="round" stroke-linejoin="round">
  <g filter="url(#rough)">
    <rect x="505" y="40" width="92" height="124" rx="10" fill="var(--card)" stroke="var(--ink)" stroke-width="4"/>
    <rect x="515" y="51" width="72" height="30" rx="4" fill="var(--a-calculo-fill)" stroke="var(--ink)" stroke-width="3"/>
    <g fill="var(--wheat)" stroke="var(--ink)" stroke-width="2.5">
      <circle cx="525" cy="102" r="7"/><circle cx="546" cy="102" r="7"/><circle cx="567" cy="102" r="7"/>
      <circle cx="525" cy="124" r="7"/><circle cx="546" cy="124" r="7"/><circle cx="567" cy="124" r="7"/>
      <circle cx="525" cy="146" r="7"/><circle cx="546" cy="146" r="7"/><circle cx="567" cy="146" r="7"/>
    </g>
    <circle cx="581" cy="113" r="7" fill="var(--terra)" stroke="var(--ink)" stroke-width="2.5"/>
    <circle cx="581" cy="135" r="7" fill="var(--terra)" stroke="var(--ink)" stroke-width="2.5"/>
  </g>
  <text x="580" y="74" text-anchor="end" font-family="var(--f-mono)" font-size="17" font-weight="700" fill="var(--ink)" stroke="none">0,8415</text>
</g>
<g id="bola" stroke-linecap="round" stroke-linejoin="round">
  <g filter="url(#rough)">
    <path d="M225 98 L355 163" fill="none" stroke="var(--ink)" stroke-width="5"/>
    <path d="M245 114 l-5 14 M275 129 l-5 14 M305 144 l-5 14 M335 159 l-5 14" fill="none" stroke="var(--soil)" stroke-width="3"/>
    <circle cx="275.7" cy="107.2" r="14" fill="var(--terra)" stroke="var(--ink)" stroke-width="3.5"/>
    <path d="M268 103 C270 98 275 96 279 97" fill="none" stroke="var(--card)" stroke-width="3"/>
  </g>
</g>
<path id="seta-descida" pathLength="1" d="M296 84 C328 84 352 104 358 134 M358 134 l-12 -11 M358 134 l16 -6" fill="none" stroke="var(--terra)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="palha" stroke-linecap="round" stroke-linejoin="round">
  <g filter="url(#rough)">
    <path d="M90 442 V290" fill="none" stroke="var(--soil)" stroke-width="7"/>
    <path d="M90 322 L36 338" fill="none" stroke="var(--soil)" stroke-width="6"/>
    <path d="M36 338 l-14 -6 M36 338 l-14 4 M36 338 l-12 12" fill="none" stroke="var(--wheat)" stroke-width="3"/>
    <path d="M66 300 L114 300 C122 330 120 362 114 380 L66 380 C60 362 58 330 66 300Z" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5"/>
    <path d="M70 380 l-4 14 M80 380 l-2 16 M92 380 l0 15 M104 380 l3 15 M112 380 l5 12" fill="none" stroke="var(--wheat)" stroke-width="3.5"/>
    <path d="M74 316 L106 330 M74 340 L106 354" fill="none" stroke="var(--ink)" stroke-width="2" opacity="0.5"/>
    <circle cx="90" cy="272" r="25" fill="var(--card)" stroke="var(--ink)" stroke-width="3.5"/>
    <circle cx="81" cy="268" r="3" fill="var(--ink)"/>
    <circle cx="99" cy="268" r="3" fill="var(--ink)"/>
    <path d="M79 281 C86 291 95 291 101 281" fill="none" stroke="var(--ink)" stroke-width="3"/>
    <circle cx="72" cy="279" r="4" fill="var(--terra)" opacity="0.6"/>
    <circle cx="108" cy="279" r="4" fill="var(--terra)" opacity="0.6"/>
  </g>
  <g id="palha-braco" filter="url(#rough)">
    <path d="M112 322 L168 284" fill="none" stroke="var(--soil)" stroke-width="6"/>
    <path d="M168 284 l14 -8 M168 284 l15 2 M168 284 l10 -15" fill="none" stroke="var(--wheat)" stroke-width="3"/>
  </g>
  <g id="palha-chapeu" filter="url(#rough)">
    <ellipse cx="90" cy="250" rx="40" ry="9" fill="var(--soil)" stroke="var(--ink)" stroke-width="3.5"/>
    <path d="M65 248 C66 224 78 214 90 214 C102 214 114 224 115 248Z" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5"/>
    <path d="M66 241 C80 246 100 246 114 241" fill="none" stroke="var(--terra)" stroke-width="4"/>
  </g>
</g>`,
  ocultos: ["relevo","bandeira","estaca","bambu","arame","arame4","faixa","sensor","erro","calc","bola","seta-descida"]
};
