/* Cena SVG do mini-video "Propulsão e foguetes": patinador no gelo e foguete, tracado a mao sobre caderno quadriculado. p = m·v; M = 60 kg, mochila 10 kg a 3 m/s -> v = 0.5 m/s; a = F/m = 2 e 3 m/s²; dv = ve·ln(razao) = 2772.6 m/s. Escala dos deslocamentos: 50 px por m/s. */
window.Cenas = window.Cenas || {};
Cenas.propulsao = {
  viewBox: "0 0 800 450",
  svg: `<g id="papel">
  <rect x="0" y="0" width="800" height="450" fill="var(--card)"/>
  <path d="M0 0V450M25 0V450M50 0V450M75 0V450M100 0V450M125 0V450M150 0V450M175 0V450M200 0V450M225 0V450M250 0V450M275 0V450M300 0V450M325 0V450M350 0V450M375 0V450M400 0V450M425 0V450M450 0V450M475 0V450M500 0V450M525 0V450M550 0V450M575 0V450M600 0V450M625 0V450M650 0V450M675 0V450M700 0V450M725 0V450M750 0V450M775 0V450M800 0V450M0 0H800M0 25H800M0 50H800M0 75H800M0 100H800M0 125H800M0 150H800M0 175H800M0 200H800M0 225H800M0 250H800M0 275H800M0 300H800M0 325H800M0 350H800M0 375H800M0 400H800M0 425H800M0 450H800" fill="none" stroke="var(--grid)" stroke-width="1.5"/>
  <path d="M52 0V450" fill="none" stroke="var(--terra)" stroke-width="2" opacity="0.35"/>
  <circle cx="22" cy="60" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="150" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="240" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="330" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="400" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/>
</g>
<g id="estrelas" fill="var(--wheat)" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"><path d="M250 68L253.6 76.4L262 80L253.6 83.6L250 92L246.4 83.6L238 80L246.4 76.4Z"/><path d="M560 61L562.7 67.3L569 70L562.7 72.7L560 79L557.3 72.7L551 70L557.3 67.3Z"/><path d="M330 183L332.1 187.9L337 190L332.1 192.1L330 197L327.9 192.1L323 190L327.9 187.9Z"/><path d="M580 200L583 207L590 210L583 213L580 220L577 213L570 210L577 207Z"/><path d="M470 54L471.8 58.2L476 60L471.8 61.8L470 66L468.2 61.8L464 60L468.2 58.2Z"/></g>
<g id="pergunta" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="420" y="105" text-anchor="middle" font-size="26" fill="var(--ink)" >Sem ar no espaço,</text><text x="420" y="138" text-anchor="middle" font-size="26" fill="var(--ink)" >contra o que ele empurra?</text><path d="M430 152C440 176 452 190 470 196M470 196l-12 -2M470 196l-3 -12" fill="none" stroke="var(--terra)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/></g>
<g id="cena-gelo">
  <path id="gelo" pathLength="1" d="M130 340C250 337 400 343 560 339S680 342 700 340" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round" filter="url(#rough)"/>
  <g fill="none" stroke="var(--water)" stroke-width="3" stroke-linecap="round" opacity="0.7"><path d="M170 354H215M300 358H360M470 354H520M600 358H650"/></g>
  <g id="dados" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="420" y="104" text-anchor="middle" font-size="24" fill="var(--ink)" >patinador: 60 kg</text><text x="420" y="134" text-anchor="middle" font-size="24" fill="var(--ink)" >mochila: 10 kg, lançada a 3 m/s</text></g>
  <g id="mochila" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)">
    <rect x="372" y="250" width="30" height="42" rx="8" fill="var(--terra)" stroke="var(--ink)" stroke-width="3.5"/>
    <path d="M377 266H397M387 250V243" fill="none" stroke="var(--ink)" stroke-width="3"/>
    <rect x="378" y="272" width="18" height="12" rx="3" fill="var(--wheat)" stroke="var(--ink)" stroke-width="2.5"/>
  </g>
  <g id="patinador" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)">
    <path d="M437 302L433 334M463 302L467 334" fill="none" stroke="var(--ink)" stroke-width="6"/>
    <path d="M424 334H446M454 334H478M424 339H446M454 339H478" fill="none" stroke="var(--ink)" stroke-width="3.5"/>
    <path d="M430 242Q450 232 470 242L467 304H433Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="4"/>
    <path d="M433 254L398 262M467 254L488 278" fill="none" stroke="var(--ink)" stroke-width="5"/>
    <circle cx="450" cy="218" r="16" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5"/>
    <path d="M434 214Q450 192 466 214Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
    <circle cx="456" cy="220" r="2.4" fill="var(--ink)" stroke="none"/><path d="M452 227Q457 230 462 226" fill="none" stroke="var(--ink)" stroke-width="2.5"/>
  </g>
  <path id="seta-mochila" pathLength="1" d="M400 190H300M313 180L300 190L313 200" fill="none" stroke="var(--terra)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <path id="seta-patin" pathLength="1" d="M515 190H615M602 180L615 190L602 200" fill="none" stroke="var(--leaf)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="rot-mochila" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="350" y="156" text-anchor="middle" font-size="21" fill="var(--ink)" >mochila</text><text x="350" y="218" text-anchor="middle" font-size="22" fill="var(--ink)" >10 · 3 = 30</text></g>
  <g id="rot-patin" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="569" y="156" text-anchor="middle" font-size="21" fill="var(--ink)" >patinador</text><text x="569" y="218" text-anchor="middle" font-size="22" fill="var(--ink)" >60 · 0,5 = 30</text></g>
  <g id="soma0" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="420" y="104" text-anchor="middle" font-size="28" fill="var(--ink)" >p total antes = 0</text></g>
  <g id="soma-fim" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="420" y="134" text-anchor="middle" font-size="28" fill="var(--ink)" >30 − 30 = 0</text></g>
</g>
<g id="cena-foguete">
  <g id="gases" stroke="var(--ink)" stroke-width="2.5" fill="var(--wheat)" fill-opacity="0.85" filter="url(#rough)">
    <circle cx="344" cy="230" r="12"/><circle cx="318" cy="244" r="10"/><circle cx="294" cy="228" r="8"/><circle cx="272" cy="242" r="6.5"/>
  </g>
  <g id="foguete" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)">
    <path d="M395 212L372 178L428 212Z M395 258L372 292L428 258Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3.5"/>
    <path d="M385 222L368 217V253L385 248Z" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3"/>
    <path d="M385 212H465Q520 212 548 235Q520 258 465 258H385Q375 235 385 212Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="4.5"/>
    <rect id="prop" x="410" y="222" width="56" height="26" rx="5" fill="var(--water)" fill-opacity="0.7" stroke="var(--ink)" stroke-width="2.5"/>
    <circle cx="494" cy="235" r="11" fill="var(--card)" stroke="var(--ink)" stroke-width="3"/>
  </g>
  <path id="seta-gas" pathLength="1" d="M390 312H290M303 302L290 312L303 322" fill="none" stroke="var(--terra)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <path id="seta-empuxo" pathLength="1" d="M450 312H550M537 302L550 312L537 322" fill="none" stroke="var(--leaf)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="rot-gas" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="340" y="345" text-anchor="middle" font-size="22" fill="var(--ink)" >gás</text></g>
  <g id="rot-empuxo" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="500" y="345" text-anchor="middle" font-size="22" fill="var(--ink)" >empuxo</text></g>
  <g id="rot-F" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="500" y="372" text-anchor="middle" font-size="22" fill="var(--ink)" >F = 12.000 N</text></g>
  <g id="rot-m6" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="500" y="196" text-anchor="middle" font-size="22" fill="var(--ink)" >m = 6.000 kg</text></g>
  <g id="rot-m4" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="500" y="196" text-anchor="middle" font-size="22" fill="var(--ink)" >m = 4.000 kg</text></g>
  <g id="formula-a" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="430" y="112" text-anchor="middle" font-size="34" fill="var(--ink)" >a = F / m</text></g>
  <g id="res2" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="430" y="148" text-anchor="middle" font-size="26" fill="var(--ink)" >= 12.000 / 6.000 = 2 m/s²</text></g>
  <g id="res3" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="430" y="148" text-anchor="middle" font-size="26" fill="var(--ink)" >= 12.000 / 4.000 = 3 m/s²</text></g>
</g>
<g id="cena-eq">
  <g id="f-dv" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="215" y="130" text-anchor="start" font-size="32" fill="var(--ink)" >Δv =</text></g>
  <g id="f-ve" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="290" y="130" text-anchor="start" font-size="32" fill="var(--terra)" >vₑ</text></g>
  <g id="f-ln" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="335" y="130" text-anchor="start" font-size="32" fill="var(--ink)" >· ln</text></g>
  <g id="f-raz" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="405" y="130" text-anchor="start" font-size="32" fill="var(--ink)" >( m₀ / m_f )</text></g>
  <g id="massas" stroke-linejoin="round" filter="url(#rough)">
    <g fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="3.5"><rect x="235" y="235" width="62" height="34"/><rect x="235" y="269" width="62" height="34"/><rect x="235" y="303" width="62" height="34"/><rect x="235" y="337" width="62" height="34"/></g>
    <rect x="335" y="337" width="62" height="34" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5"/>
    <path d="M303 354H328M320 346L329 354L320 362" fill="none" stroke="var(--terra)" stroke-width="3.5" stroke-linecap="round"/>
    <g style="font-family:var(--f-hand)" fill="var(--ink)" stroke="none"><text x="266" y="224" text-anchor="middle" font-size="24" fill="var(--ink)" >m₀</text><text x="366" y="326" text-anchor="middle" font-size="24" fill="var(--ink)" >m_f</text></g>
  </g>
  <g id="n-ve" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="430" y="232" text-anchor="start" font-size="22" fill="var(--terra)" >vₑ = 2.000 m/s</text></g>
  <g id="n-raz" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="430" y="270" text-anchor="start" font-size="22" fill="var(--ink)" >m₀ / m_f = 4</text></g>
  <g id="n-res" style="font-family:var(--f-hand)" fill="var(--ink)"><text x="430" y="314" text-anchor="start" font-size="22" fill="var(--ink)" >Δv = 2.000·ln 4</text><text x="430" y="346" text-anchor="start" font-size="28" fill="var(--leaf)" >= 2,8 km/s</text></g>
</g>
<g id="guia" stroke-linecap="round" stroke-linejoin="round">
  <g transform="translate(30 296) scale(0.8)">
    <ellipse cx="60" cy="140" rx="34" ry="5" fill="var(--rule-soft)" stroke="var(--ink)" stroke-width="2.5"/>
    <g fill="var(--wheat)" stroke="var(--edge)" stroke-width="1.8" stroke-linejoin="round"><path d="M36 36l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5Z"/></g>
    <g filter="url(#rough)">
      <path d="M44 120Q60 146 76 120Z" fill="var(--wheat)" stroke="var(--edge)" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M32 98L16 124L34 120Z M88 98L104 124L86 120Z" fill="var(--terra)" stroke="var(--edge)" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M60 14C82 30 90 56 90 96V122H30V96C30 56 38 30 60 14Z" fill="var(--a-fisica-fill)" stroke="var(--edge)" stroke-width="3" stroke-linejoin="round"/>
      <path d="M42 46Q60 36 78 46" fill="none" stroke="var(--edge)" stroke-width="2" opacity=".35"/>
      <ellipse cx="46" cy="64" rx="5" ry="9" fill="var(--card)" opacity=".4" transform="rotate(14 46 64)"/>
      <ellipse cx="50" cy="76" rx="3.4" ry="4.6" fill="var(--ink)" stroke="none"/><ellipse cx="70" cy="76" rx="3.4" ry="4.6" fill="var(--ink)" stroke="none"/>
      <path d="M53 88Q60 94 67 88" fill="none" stroke="var(--ink)" stroke-width="3"/>
    </g>
    <g id="guia-braco" fill="var(--wheat)" stroke="var(--edge)" stroke-width="1.8" stroke-linejoin="round"><path d="M84 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z"/></g>
  </g>
</g>`,
  ocultos: ["guia","estrelas","pergunta","gelo","patinador","mochila","dados","soma0","seta-mochila","rot-mochila","seta-patin","rot-patin","soma-fim","cena-foguete","gases","foguete","seta-gas","rot-gas","seta-empuxo","rot-empuxo","rot-F","rot-m6","formula-a","res2","rot-m4","res3","f-dv","f-ve","f-ln","f-raz","massas","n-ve","n-raz","n-res"]
};
