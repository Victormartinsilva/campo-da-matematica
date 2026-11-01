/* Cena SVG do mini-video "Funções": máquina de entrada e saída, desenhada à mão em caderno quadriculado.
   f(x) = 2x + 1 (f(0..3) = 1, 3, 5, 7); parábola 9 - (x-3)^2; exponencial 2^(x/2). Grafico principal: X = 250 + 50x, Y = 330 - 15y.
   Composição g(f(3)) = g(7) = 49 com g(y) = y^2. Frete C(d) = 50 + 2d: C(120) = 290; R$ 150 pagam 50 km (mapa de 0 a 120 km em 340 px).
   Modelo: 6 pontos x = 1..6, y = 3.2, 5.1, 7.3, 9, 11.2, 12.6; minimos quadrados a = 1,914, b = 1,367; f(7) = 14,77. Pixels: X = 250 + 40x, Y = 330 - 12,5y. */
window.Cenas = window.Cenas || {};
Cenas.funcao = {
  viewBox: "0 0 800 450",
  svg: `<g id="papel">
  <rect x="0" y="0" width="800" height="450" fill="var(--card)"/>
  <path d="M0 0V450M25 0V450M50 0V450M75 0V450M100 0V450M125 0V450M150 0V450M175 0V450M200 0V450M225 0V450M250 0V450M275 0V450M300 0V450M325 0V450M350 0V450M375 0V450M400 0V450M425 0V450M450 0V450M475 0V450M500 0V450M525 0V450M550 0V450M575 0V450M600 0V450M625 0V450M650 0V450M675 0V450M700 0V450M725 0V450M750 0V450M775 0V450M800 0V450M0 0H800M0 25H800M0 50H800M0 75H800M0 100H800M0 125H800M0 150H800M0 175H800M0 200H800M0 225H800M0 250H800M0 275H800M0 300H800M0 325H800M0 350H800M0 375H800M0 400H800M0 425H800M0 450H800" fill="none" stroke="var(--grid)" stroke-width="1.5"/>
  <path d="M52 0V450" fill="none" stroke="var(--terra)" stroke-width="2" opacity="0.35"/>
  <circle cx="22" cy="60" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="150" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="240" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="330" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="400" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/>
</g>
<g id="maq">
  <path d="M210 153L330 153L290 200L250 200Z" fill="var(--card)" stroke="var(--ink)" stroke-width="4.5" stroke-linejoin="round" filter="url(#rough)"/>
  <path d="M330 263H378L392 283H330Z" fill="var(--card)" stroke="var(--ink)" stroke-width="4.5" stroke-linejoin="round" filter="url(#rough)"/>
  <path d="M226 292V307H246V292M294 292V307H314V292" fill="none" stroke="var(--ink)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <rect x="210" y="200" width="120" height="92" rx="10" fill="var(--a-calculo-fill)" fill-opacity="0.75" stroke="var(--ink)" stroke-width="4.5" filter="url(#rough)"/>
  <g fill="var(--wheat)" stroke="var(--ink)" stroke-width="3" filter="url(#rough)"><circle cx="228" cy="218" r="8"/><circle cx="312" cy="218" r="8"/></g>
  <g fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round"><path d="M228 207V229M217 218H239M312 207V229M301 218H323"/></g>
  <g id="maq-f" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="270" y="269" text-anchor="middle" font-size="54">f</text></g>
  <g id="maq-regra" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="270" y="263" text-anchor="middle" font-size="34">2x + 1</text></g>
</g>
<g id="rot-ent" style="font-family:var(--f-hand)" fill="var(--terra)" font-size="22"><text x="244" y="144" text-anchor="end">entrada x</text></g>
<g id="tok-in"><circle cx="270" cy="140" r="18" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><text style="font-family:var(--f-hand)" x="270" y="148" text-anchor="middle" font-size="26" fill="var(--ink)">3</text></g>
<g id="tok-out"><circle cx="404" cy="273" r="18" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><text style="font-family:var(--f-hand)" x="404" y="281" text-anchor="middle" font-size="26" fill="var(--ink)">7</text></g>
<g id="rot-saida" style="font-family:var(--f-hand)" fill="var(--terra)" font-size="22"><text x="404" y="315" text-anchor="middle">saída f(x)</text></g>
<g id="tabela" style="font-family:var(--f-hand)" fill="var(--ink)">
  <text x="530" y="160" text-anchor="middle" font-size="22" fill="var(--terra)">x  →  f(x)</text>
  <path d="M474 170H586" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" filter="url(#rough)"/>
  <g id="lin-0"><text x="530" y="196" text-anchor="middle" font-size="30">0  →  1</text></g>
    <g id="lin-1"><text x="530" y="228" text-anchor="middle" font-size="30">1  →  3</text></g>
    <g id="lin-2"><text x="530" y="260" text-anchor="middle" font-size="30">2  →  5</text></g>
    <g id="lin-3"><text x="530" y="292" text-anchor="middle" font-size="30">3  →  7</text></g>
</g>
<g id="graf" style="font-family:var(--f-hand)" fill="var(--ink)">
  <path d="M240 342V122M232 132L240 120L248 132M234 330H580M568 322L582 330L568 338" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <text x="250" y="128" font-size="22">f(x)</text><text x="578" y="354" text-anchor="end" font-size="22">x</text>
  <text x="250" y="354" text-anchor="middle" font-size="19">0</text><text x="350" y="354" text-anchor="middle" font-size="19">2</text><text x="450" y="354" text-anchor="middle" font-size="19">4</text><text x="550" y="354" text-anchor="middle" font-size="19">6</text>
  <text x="228" y="261" text-anchor="end" font-size="19">5</text><text x="228" y="186" text-anchor="end" font-size="19">10</text>
  <rect id="dominio" x="250" y="124" width="150" height="206" fill="var(--leaf)" fill-opacity="0.2" stroke="none"/>
  <g id="rot-dom" font-size="21" fill="var(--a-calculo-ink)"><text x="258" y="150">domínio:</text><text x="258" y="172">x de 0 a 3</text></g>
  <path id="palpite" d="M400 225L405 222L410 219L415 216L420 213L425 210L430 207L435 204L440 201L445 198L450 195L455 192L460 189L465 186L470 183L475 180L480 177L485 174L490 171L495 168L500 165L505 162L510 159L515 156L520 153L525 150L530 147L535 144L540 141L545 138L550 135" fill="none" stroke="var(--terra)" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="10 9" filter="url(#rough)"/>
  <g id="rot-palpite" font-size="23" fill="var(--terra)"><text x="500" y="217" text-anchor="middle">palpite?</text></g>
  <path id="c-reta" pathLength="1" d="M250 315L255 312L260 309L265 306L270 303L275 300L280 297L285 294L290 291L295 288L300 285L305 282L310 279L315 276L320 273L325 270L330 267L335 264L340 261L345 258L350 255L355 252L360 249L365 246L370 243L375 240L380 237L385 234L390 231L395 228L400 225" fill="none" stroke="var(--water)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="pts"><circle cx="250" cy="315" r="6.5" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><circle cx="300" cy="285" r="6.5" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><circle cx="350" cy="255" r="6.5" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><circle cx="400" cy="225" r="6.5" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><text x="412" y="221" font-size="21" fill="var(--ink)">(3, 7)</text></g>
</g>
<g id="mini-reta" style="font-family:var(--f-hand)" fill="var(--ink)"><path d="M236 145V240H334" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
    <path id="mc-reta" pathLength="1" d="M240 227.8L243 225.4L246 222.9L249 220.5L252 218L255 215.5L258 213.1L261 210.6L264 208.2L267 205.7L270 203.2L273 200.8L276 198.3L279 195.8L282 193.4L285 190.9L288 188.5L291 186L294 183.5L297 181.1L300 178.6L303 176.2L306 173.7L309 171.2L312 168.8L315 166.3L318 163.8L321 161.4L324 158.9L327 156.5L330 154" fill="none" stroke="var(--water)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
    <text x="285" y="268" text-anchor="middle" font-size="20">reta</text><text x="285" y="292" text-anchor="middle" font-size="17">2x + 1</text></g>
<g id="mini-parab" style="font-family:var(--f-hand)" fill="var(--ink)"><path d="M356 145V240H454" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
    <path id="mc-parab" pathLength="1" d="M360 234L363 226.9L366 220.2L369 214.1L372 208.4L375 203.2L378 198.6L381 194.4L384 190.7L387 187.5L390 184.8L393 182.6L396 180.8L399 179.6L402 178.9L405 178.6L408 178.9L411 179.6L414 180.8L417 182.6L420 184.8L423 187.5L426 190.7L429 194.4L432 198.6L435 203.2L438 208.4L441 214.1L444 220.2L447 226.9L450 234" fill="none" stroke="var(--terra)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
    <text x="405" y="268" text-anchor="middle" font-size="20">parábola</text><text x="405" y="292" text-anchor="middle" font-size="17">9 − (x − 3)²</text></g>
<g id="mini-exp" style="font-family:var(--f-hand)" fill="var(--ink)"><path d="M476 145V240H574" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
    <path id="mc-exp" pathLength="1" d="M480 227.8L483 227.4L486 226.9L489 226.4L492 225.9L495 225.3L498 224.7L501 224L504 223.3L507 222.5L510 221.7L513 220.8L516 219.9L519 218.8L522 217.8L525 216.6L528 215.3L531 214L534 212.6L537 211L540 209.4L543 207.6L546 205.7L549 203.7L552 201.5L555 199.2L558 196.7L561 194L564 191.1L567 188.1L570 184.8" fill="none" stroke="var(--leaf)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
    <text x="525" y="268" text-anchor="middle" font-size="20">exponencial</text><text x="525" y="292" text-anchor="middle" font-size="17">2^(x/2)</text></g>
<g id="cad-f">
  <rect x="286" y="216" width="78" height="66" rx="8" fill="var(--a-calculo-fill)" fill-opacity="0.75" stroke="var(--ink)" stroke-width="4" filter="url(#rough)"/>
  <text style="font-family:var(--f-hand)" x="325" y="257" text-anchor="middle" font-size="24" fill="var(--ink)">2x + 1</text><text style="font-family:var(--f-hand)" x="325" y="204" text-anchor="middle" font-size="21" fill="var(--terra)">máquina f</text>
</g>
<g id="cad-g">
  <rect x="446" y="216" width="78" height="66" rx="8" fill="var(--a-calculo-fill)" fill-opacity="0.75" stroke="var(--ink)" stroke-width="4" filter="url(#rough)"/>
  <text style="font-family:var(--f-hand)" x="485" y="258" text-anchor="middle" font-size="28" fill="var(--ink)">y²</text><text style="font-family:var(--f-hand)" x="485" y="204" text-anchor="middle" font-size="21" fill="var(--terra)">máquina g</text>
</g>
<g id="val-3"><circle cx="246" cy="249" r="17" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><text style="font-family:var(--f-hand)" x="246" y="257" text-anchor="middle" font-size="24" fill="var(--ink)">3</text><path d="M268 249H283M276 243L284 249L276 255" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/></g>
<g id="val-7"><path d="M366 249H381M373 243L381 249L373 255" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/><circle cx="406" cy="249" r="17" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><text style="font-family:var(--f-hand)" x="406" y="257" text-anchor="middle" font-size="24" fill="var(--ink)">7</text><path d="M428 249H443M435 243L443 249L435 255" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/></g>
<g id="val-49"><path d="M526 249H541M533 243L541 249L533 255" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/><circle cx="566" cy="249" r="19" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><text style="font-family:var(--f-hand)" x="566" y="257" text-anchor="middle" font-size="24" fill="var(--ink)">49</text></g>
<g id="rot-comp" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="406" y="322" text-anchor="middle" font-size="30">g(f(x)) = (2x + 1)²</text></g>
<g id="frete" style="font-family:var(--f-hand)" fill="var(--ink)">
  <path id="estrada" d="M230 296H580M230 288V304M371.7 288V304M570 288V304" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/>
  <text x="230" y="326" text-anchor="middle" font-size="21">0</text><text x="371.7" y="326" text-anchor="middle" font-size="21">50 km</text><text x="570" y="326" text-anchor="middle" font-size="21">120 km</text>
  <g id="caminhao" filter="url(#rough)" stroke="var(--ink)" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">
    <rect x="206" y="258" width="46" height="32" rx="3" fill="var(--wheat)" fill-opacity="0.85"/>
    <path d="M252 266H268L278 280V290H252Z" fill="var(--a-calculo-fill)"/>
    <circle cx="222" cy="292" r="7" fill="var(--paper)"/><circle cx="266" cy="292" r="7" fill="var(--paper)"/>
  </g>
  <g id="rot-fixo" fill="var(--terra)"><text x="236" y="240" text-anchor="middle" font-size="23">fixo: R$ 50</text></g>
  <g id="rot-km" fill="var(--water)"><text x="410" y="240" text-anchor="middle" font-size="24">+ R$ 2 por km</text></g>
  <g id="rot-150"><rect x="311.7" y="150" width="120" height="54" rx="8" fill="var(--card)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><text x="371.7" y="174" text-anchor="middle" font-size="24">R$ 150</text><text x="371.7" y="196" text-anchor="middle" font-size="21" fill="var(--terra)">= 50 km</text></g>
  <g id="rot-290"><rect x="506" y="150" width="90" height="54" rx="8" fill="var(--card)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><text x="551" y="174" text-anchor="middle" font-size="21">120 km</text><text x="551" y="196" text-anchor="middle" font-size="24" fill="var(--terra)">R$ 290</text></g>
</g>
<g id="modelo" style="font-family:var(--f-hand)" fill="var(--ink)">
  <path d="M240 342V122M232 132L240 120L248 132M234 330H580M568 322L582 330L568 338" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <text x="250" y="128" font-size="22">y</text><text x="578" y="354" text-anchor="end" font-size="22">x</text>
  <g id="dados-m"><circle cx="290" cy="290" r="7" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><circle cx="330" cy="266.3" r="7" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><circle cx="370" cy="238.8" r="7" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><circle cx="410" cy="217.5" r="7" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><circle cx="450" cy="190" r="7" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><circle cx="490" cy="172.5" r="7" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/></g>
  <path id="reta-aj" pathLength="1" d="M266 303.3L554 131.1" fill="none" stroke="var(--terra)" stroke-width="5" stroke-linecap="round" filter="url(#rough)"/>
  <g id="pred"><circle cx="530" cy="145.4" r="9" fill="none" stroke="var(--water)" stroke-width="3.5" stroke-dasharray="5 5" filter="url(#rough)"/><text x="530" y="127.4" text-anchor="middle" font-size="20" fill="var(--water)">previsão</text></g>
  <g id="rot-eq" fill="var(--terra)"><text x="566" y="272" text-anchor="end" font-size="25">f(x) = 1,9·x + 1,4</text><text x="566" y="298" text-anchor="end" font-size="22" fill="var(--water)">f(7) = 14,8</text></g>
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
  ocultos: ["guia","maq","tok-in","rot-ent","tok-out","rot-saida","maq-regra","tabela","lin-0","lin-1","lin-2","lin-3","graf","pts","c-reta","mini-reta","mc-reta","mini-parab","mc-parab","mini-exp","mc-exp","dominio","rot-dom","palpite","rot-palpite","cad-f","cad-g","val-3","val-7","val-49","rot-comp","frete","rot-fixo","rot-km","rot-150","rot-290","modelo","dados-m","reta-aj","rot-eq","pred"]
};
