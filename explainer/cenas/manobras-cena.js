/* Cena SVG do mini-video "Manobras e navegação espacial": metáfora: a nave que gira sem sair do caminho, desenhada a mao em papel quadriculado.
Escalas: peca 1 e 3 usam 5 px por m/s (v = 30 m/s = 150 px); peca 4 usa 6 px por m/s. Impulso 20 N x 4 s / 1000 kg = 0.08 m/s; |v'| = 30.414 m/s a 9.46 graus.
   Hohmann (Terra, r1 = 6678 km, r2 = 42164 km): dv1 = 2425.8 m/s, dv2 = 1466.8 m/s. Sequencia: dois impulsos de 10 m/s deslocam 40 m. */
window.Cenas = window.Cenas || {};
Cenas.manobras = {
  viewBox: "0 0 800 450",
  svg: `<g id="papel">
  <rect x="0" y="0" width="800" height="450" fill="var(--card)"/>
  <path d="M0 0V450M25 0V450M50 0V450M75 0V450M100 0V450M125 0V450M150 0V450M175 0V450M200 0V450M225 0V450M250 0V450M275 0V450M300 0V450M325 0V450M350 0V450M375 0V450M400 0V450M425 0V450M450 0V450M475 0V450M500 0V450M525 0V450M550 0V450M575 0V450M600 0V450M625 0V450M650 0V450M675 0V450M700 0V450M725 0V450M750 0V450M775 0V450M800 0V450M0 0H800M0 25H800M0 50H800M0 75H800M0 100H800M0 125H800M0 150H800M0 175H800M0 200H800M0 225H800M0 250H800M0 275H800M0 300H800M0 325H800M0 350H800M0 375H800M0 400H800M0 425H800M0 450H800" fill="none" stroke="var(--grid)" stroke-width="1.5"/>
  <path d="M52 0V450" fill="none" stroke="var(--terra)" stroke-width="2" opacity="0.35"/>
  <circle cx="22" cy="60" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="150" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="240" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="330" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="400" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/>
</g>
<g id="cena1">
  <path id="traj" pathLength="1" d="M205 236L595 236" fill="none" stroke="var(--a-fisica-ink)" stroke-width="4.5" stroke-linecap="round" filter="url(#rough)"/>
  <g id="rot-traj"><text x="505" y="280" text-anchor="middle" font-size="26" fill="var(--a-fisica-ink)" style="font-family:var(--f-hand)">trajetória</text></g>
  <g id="nave1">
    <g transform="translate(245 236)"><g id="nave1-a"><g transform="scale(1)" stroke-linejoin="round" stroke-linecap="round" filter="url(#rough)">
  <path d="M-26 -10L-40 -22L-18 -10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-26 10L-40 22L-18 10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-28 -11L12 -11Q30 -8 36 0Q30 8 12 11L-28 11Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="3.5"/>
  <circle cx="8" cy="0" r="5" fill="var(--card)" stroke="var(--ink)" stroke-width="2.5"/>
</g></g><g id="nave1-b"><g transform="rotate(-90)"><g transform="scale(1)" stroke-linejoin="round" stroke-linecap="round" filter="url(#rough)">
  <path d="M-26 -10L-40 -22L-18 -10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-26 10L-40 22L-18 10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-28 -11L12 -11Q30 -8 36 0Q30 8 12 11L-28 11Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="3.5"/>
  <circle cx="8" cy="0" r="5" fill="var(--card)" stroke="var(--ink)" stroke-width="2.5"/>
</g></g></g></g>
    <g id="rot-atitude"><text x="245" y="158" text-anchor="middle" font-size="26" fill="var(--ink)" style="font-family:var(--f-hand)">atitude</text><path d="M245 168L245 192M238.8 180.6L245 192L251.2 180.6" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /></g>
    <g id="vel1"><path d="M283 236L433 236M421.6 242.2L433 236L421.6 229.8" fill="none" stroke="var(--terra)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="358" y="214" text-anchor="middle" font-size="24" fill="var(--terra)" style="font-family:var(--f-hand)">v = 30 m/s</text></g>
  </g>
</g>
<g id="cena2">
  <g id="par-corpo"><path d="M312 205H488Q508 205 508 225Q508 245 488 245H312Q292 245 292 225Q292 205 312 205Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="4" stroke-linejoin="round" filter="url(#rough)"/>
    <circle cx="455" cy="225" r="9" fill="var(--card)" stroke="var(--ink)" stroke-width="3"/></g>
  <g id="par-cm"><circle cx="400" cy="225" r="6" fill="var(--ink)"/><text x="392" y="270" text-anchor="end" font-size="22" fill="var(--ink)" style="font-family:var(--f-hand)">CM</text></g>
  <g id="par-f1"><path d="M310 225L310 275M303.8 263.6L310 275L316.2 263.6" fill="none" stroke="var(--terra)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="296" y="276" text-anchor="end" font-size="24" fill="var(--terra)" style="font-family:var(--f-hand)">F = 10 N</text></g>
  <g id="par-f2"><path d="M490 225L490 175M496.2 186.4L490 175L483.8 186.4" fill="none" stroke="var(--terra)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="506" y="190" text-anchor="start" font-size="24" fill="var(--terra)" style="font-family:var(--f-hand)">F = 10 N</text></g>
  <g id="par-r"><path d="M400 225H490" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" stroke-dasharray="7 7"/><text x="445" y="276" text-anchor="middle" font-size="24" fill="var(--ink)" style="font-family:var(--f-hand)">r = 1 m</text></g>
  <path id="par-giro" pathLength="1" d="M474 150Q400 92 326 150M331.1 138.1L326 150L338.8 147.9" fill="none" stroke="var(--a-fisica-ink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="par-res"><text x="400" y="352" text-anchor="middle" font-size="30" fill="var(--ink)" style="font-family:var(--f-hand)">ΣF = 10 − 10 = 0 N</text></g>
  <g id="par-tau"><text x="400" y="80" text-anchor="middle" font-size="30" fill="var(--a-fisica-ink)" style="font-family:var(--f-hand)">τ = 2·r·F = 2·1·10 = 20 N·m</text></g>
</g>
<g id="cena3">
  <g id="imp-nave"><g transform="translate(285 190)"><g transform="scale(1.4)" stroke-linejoin="round" stroke-linecap="round" filter="url(#rough)">
  <path d="M-26 -10L-40 -22L-18 -10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-26 10L-40 22L-18 10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-28 -11L12 -11Q30 -8 36 0Q30 8 12 11L-28 11Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="3.5"/>
  <circle cx="8" cy="0" r="5" fill="var(--card)" stroke="var(--ink)" stroke-width="2.5"/>
</g></g></g>
  <g id="imp-chama"><g transform="translate(285 190)"><g transform="scale(1.4)" filter="url(#rough)"><path d="M-30 -6L-56 0L-30 6Z" fill="var(--wheat)" stroke="var(--terra)" stroke-width="3" stroke-linejoin="round"/></g></g></g>
  <g id="imp-v"><path d="M341 190L491 190M479.6 196.2L491 190L479.6 183.8" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="416" y="166" text-anchor="middle" font-size="24" fill="var(--ink)" style="font-family:var(--f-hand)">v = 30 m/s</text></g>
  <g id="imp-dv"><path d="M491 190L507 190M495.6 196.2L507 190L495.6 183.8" fill="none" stroke="var(--terra)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="521" y="168" text-anchor="middle" font-size="24" fill="var(--terra)" style="font-family:var(--f-hand)">Δv<tspan dy="6" font-size="0.7em"></tspan><tspan dy="-6"></tspan></text><text x="521" y="214" text-anchor="middle" font-size="20" fill="var(--terra)" style="font-family:var(--f-hand)">(ampliado)</text></g>
  <g id="imp-f1"><text x="400" y="290" text-anchor="middle" font-size="32" fill="var(--ink)" style="font-family:var(--f-hand)">Δv = F·Δt / m</text></g>
  <g id="imp-f2"><text x="400" y="328" text-anchor="middle" font-size="32" fill="var(--ink)" style="font-family:var(--f-hand)">= 20 · 4 / 1000</text></g>
  <g id="imp-f3"><text x="400" y="370" text-anchor="middle" font-size="36" fill="var(--terra)" style="font-family:var(--f-hand)">= 0,08 m/s</text></g>
</g>
<g id="cena4">
  <g id="d4-a"><path d="M240 165L420 165M408.6 171.2L420 165L408.6 158.8" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="330" y="147" text-anchor="middle" font-size="24" fill="var(--ink)" style="font-family:var(--f-hand)">v = 30</text></g>
  <g id="d4-a-dv"><path d="M420 165L450 165M438.6 171.2L450 165L438.6 158.8" fill="none" stroke="var(--terra)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="435" y="147" text-anchor="middle" font-size="24" fill="var(--terra)" style="font-family:var(--f-hand)">Δv = 5</text></g>
  <g id="d4-a-res"><text x="472" y="173" text-anchor="start" font-size="28" fill="var(--ink)" style="font-family:var(--f-hand)">= 35 m/s</text><text x="472" y="199" text-anchor="start" font-size="20" fill="var(--a-fisica-ink)" style="font-family:var(--f-hand)">mesma direção</text></g>
  <g id="d4-b"><path d="M240 330L420 330M408.6 336.2L420 330L408.6 323.8" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="330" y="358" text-anchor="middle" font-size="24" fill="var(--ink)" style="font-family:var(--f-hand)">v = 30</text></g>
  <g id="d4-b-dv"><path d="M420 330L420 300M426.2 311.4L420 300L413.8 311.4" fill="none" stroke="var(--terra)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="434" y="322" text-anchor="start" font-size="24" fill="var(--terra)" style="font-family:var(--f-hand)">Δv = 5</text></g>
  <g id="d4-b-res"><path d="M240 330L420 300M409.8 308L420 300L407.7 295.7" fill="none" stroke="var(--a-fisica-ink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="434" y="290" text-anchor="start" font-size="28" fill="var(--a-fisica-ink)" style="font-family:var(--f-hand)">|v'| = 30,4 m/s</text></g>
  <g id="d4-b-ang"><path d="M320 330A80 80 0 0 0 318.9 316.8" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="336" y="314" text-anchor="start" font-size="24" fill="var(--ink)" style="font-family:var(--f-hand)">9,5°</text></g>
</g>
<g id="cena5">
  <g id="h-terra"><circle cx="400" cy="232" r="30" fill="var(--water)" fill-opacity="0.55" stroke="var(--ink)" stroke-width="4" filter="url(#rough)"/><path d="M386 226Q396 216 406 224M394 242Q406 236 416 244" fill="none" stroke="var(--leaf)" stroke-width="4" stroke-linecap="round"/></g>
  <path id="h-orb1" pathLength="1" d="M462 232A62 62 0 1 1 338 232A62 62 0 1 1 462 232" fill="none" stroke="var(--a-fisica-ink)" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/>
  <path id="h-orb2" pathLength="1" d="M558 232A158 158 0 1 1 242 232A158 158 0 1 1 558 232" fill="none" stroke="var(--a-fisica-ink)" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/>
  <path id="h-transf" pathLength="1" d="M462 232A110 99 0 0 0 242 232" fill="none" stroke="var(--terra)" stroke-width="5" stroke-linecap="round" filter="url(#rough)"/>
  <g id="h-b1"><path d="M462 232L462 198M468.2 209.4L462 198L455.8 209.4" fill="none" stroke="var(--terra)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="478" y="208" text-anchor="start" font-size="28" fill="var(--terra)" style="font-family:var(--f-hand)">Δv<tspan dy="6" font-size="0.7em">1</tspan><tspan dy="-6"></tspan></text><circle cx="462" cy="232" r="6" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3"/></g>
  <g id="h-b2"><path d="M242 232L242 266M235.8 254.6L242 266L248.2 254.6" fill="none" stroke="var(--terra)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="256" y="268" text-anchor="start" font-size="28" fill="var(--terra)" style="font-family:var(--f-hand)">Δv<tspan dy="6" font-size="0.7em">2</tspan><tspan dy="-6"></tspan></text><circle cx="242" cy="232" r="6" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3"/></g>
</g>
<g id="cena6">
  <g id="dv-titulo"><text x="400" y="120" text-anchor="middle" font-size="32" fill="var(--ink)" style="font-family:var(--f-hand)">cada queima custa Δv</text></g>
  <g id="dv-b1"><rect x="240" y="205" width="194.1" height="46" fill="var(--terra)" fill-opacity="0.55" stroke="var(--ink)" stroke-width="3.5" stroke-linejoin="round" filter="url(#rough)"/><text x="337.04" y="193" text-anchor="middle" font-size="26" fill="var(--ink)" style="font-family:var(--f-hand)">Δv<tspan dy="6" font-size="0.7em">1</tspan><tspan dy="-6"> = 2426 m/s</tspan></text></g>
  <g id="dv-b2"><rect x="434.1" y="205" width="117.4" height="46" fill="var(--wheat)" fill-opacity="0.8" stroke="var(--ink)" stroke-width="3.5" stroke-linejoin="round" filter="url(#rough)"/><text x="492.76000000000005" y="193" text-anchor="middle" font-size="26" fill="var(--ink)" style="font-family:var(--f-hand)">Δv<tspan dy="6" font-size="0.7em">2</tspan><tspan dy="-6"> = 1467 m/s</tspan></text></g>
  <g id="dv-tot"><path d="M240 273V285H551.4V273" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="395.72" y="323" text-anchor="middle" font-size="36" fill="var(--terra)" style="font-family:var(--f-hand)">Δv total = 3893 m/s</text><text x="395.72" y="355" text-anchor="middle" font-size="24" fill="var(--a-fisica-ink)" style="font-family:var(--f-hand)">orçamento de combustível</text></g>
</g>
<g id="cena7">
  <g id="s7-nave"><g transform="translate(212 270)"><g transform="scale(0.7)" stroke-linejoin="round" stroke-linecap="round" filter="url(#rough)">
  <path d="M-26 -10L-40 -22L-18 -10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-26 10L-40 22L-18 10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-28 -11L12 -11Q30 -8 36 0Q30 8 12 11L-28 11Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="3.5"/>
  <circle cx="8" cy="0" r="5" fill="var(--card)" stroke="var(--ink)" stroke-width="2.5"/>
</g></g></g>
  <path id="traj7" pathLength="1" d="M220 270L328 270L436 234L544 234" fill="none" stroke="var(--a-fisica-ink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="s7-b1"><path d="M328 270L328 226M334.2 237.4L328 226L321.8 237.4" fill="none" stroke="var(--terra)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="342" y="304" text-anchor="start" font-size="24" fill="var(--terra)" style="font-family:var(--f-hand)">10 m/s a 90°</text></g>
  <g id="s7-b2"><path d="M436 234L436 278M429.8 266.6L436 278L442.2 266.6" fill="none" stroke="var(--terra)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="422" y="216" text-anchor="end" font-size="24" fill="var(--terra)" style="font-family:var(--f-hand)">10 m/s a 270°</text></g>
  <g id="s7-dim"><path d="M328 270H564" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" stroke-dasharray="7 7"/><path d="M558 234V270M550 234H566M550 270H566" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="574" y="260" text-anchor="start" font-size="28" fill="var(--ink)" style="font-family:var(--f-hand)">40 m</text></g>
</g>
<g id="cena8">
  <path id="sat-orb" pathLength="1" d="M205 110Q400 90 595 110" fill="none" stroke="var(--a-fisica-ink)" stroke-width="4.5" stroke-linecap="round" filter="url(#rough)"/>
  <g id="sat-cone"><path d="M404 134L340 336H470Z" fill="var(--wheat)" fill-opacity="0.35" stroke="var(--wheat)" stroke-width="3" stroke-dasharray="8 8" stroke-linejoin="round"/><text x="470" y="220" text-anchor="start" font-size="26" fill="var(--ink)" style="font-family:var(--f-hand)">câmera</text></g>
  <g id="sat-a"><g transform="translate(400 102)"><g transform="scale(0.9)" stroke-linejoin="round" stroke-linecap="round" filter="url(#rough)">
  <path d="M-26 -10L-40 -22L-18 -10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-26 10L-40 22L-18 10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-28 -11L12 -11Q30 -8 36 0Q30 8 12 11L-28 11Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="3.5"/>
  <circle cx="8" cy="0" r="5" fill="var(--card)" stroke="var(--ink)" stroke-width="2.5"/>
</g></g></g>
  <g id="sat-b"><g transform="translate(400 102) rotate(90)"><g transform="scale(0.9)" stroke-linejoin="round" stroke-linecap="round" filter="url(#rough)">
  <path d="M-26 -10L-40 -22L-18 -10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-26 10L-40 22L-18 10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-28 -11L12 -11Q30 -8 36 0Q30 8 12 11L-28 11Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="3.5"/>
  <circle cx="8" cy="0" r="5" fill="var(--card)" stroke="var(--ink)" stroke-width="2.5"/>
</g></g></g>
  <g id="sat-talhao"><path d="M318 336H482L508 404H292Z" fill="var(--leaf)" fill-opacity="0.5" stroke="var(--ink)" stroke-width="3.5" stroke-linejoin="round" filter="url(#rough)"/><path d="M330 350L316 392M356 350L346 392M382 350L376 392M408 350L406 392M434 350L436 392M460 350L466 392" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/><text x="400" y="428" text-anchor="middle" font-size="26" fill="var(--ink)" style="font-family:var(--f-hand)">talhão</text></g>
  <g id="sat-rot"><text x="520" y="82" text-anchor="middle" font-size="26" fill="var(--a-fisica-ink)" style="font-family:var(--f-hand)">mesma órbita</text></g>
</g>
<g id="cena9"><g id="fim-a"><text x="400" y="150" text-anchor="middle" font-size="40" fill="var(--ink)" style="font-family:var(--f-hand)">girar → atitude</text></g>
  <g id="fim-b"><text x="400" y="230" text-anchor="middle" font-size="40" fill="var(--terra)" style="font-family:var(--f-hand)">Δv<tspan dy="6" font-size="0.7em"></tspan><tspan dy="-6"> → trajetória</tspan></text></g></g>
<g id="guia" stroke-linecap="round" stroke-linejoin="round">
  <g transform="translate(22 205) scale(0.85)">
    <g filter="url(#rough)">
      <g fill="var(--wheat)" stroke="var(--edge)" stroke-width="1.8" stroke-linejoin="round"><path d="M36 36l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5Z"/></g>
      <path d="M44 120Q60 146 76 120Z" fill="var(--wheat)" stroke="var(--edge)" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M32 98L16 124L34 120Z M88 98L104 124L86 120Z" fill="var(--terra)" stroke="var(--edge)" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M60 14C82 30 90 56 90 96V122H30V96C30 56 38 30 60 14Z" fill="var(--a-fisica-fill)" stroke="var(--edge)" stroke-width="3" stroke-linejoin="round"/>
      <path d="M42 46Q60 36 78 46" fill="none" stroke="var(--edge)" stroke-width="2" opacity=".35"/>
      <ellipse cx="46" cy="64" rx="5" ry="9" fill="var(--card)" opacity=".5" transform="rotate(14 46 64)"/>
      <ellipse cx="50" cy="88" rx="3.5" ry="4.8" fill="var(--ink)" stroke="none"/><ellipse cx="70" cy="88" rx="3.5" ry="4.8" fill="var(--ink)" stroke="none"/>
      <path d="M52 101Q60 108 68 101" fill="none" stroke="var(--ink)" stroke-width="3.5"/>
      <ellipse cx="42" cy="98" rx="5" ry="3" fill="var(--terra)" opacity="0.4" stroke="none"/><ellipse cx="78" cy="98" rx="5" ry="3" fill="var(--terra)" opacity="0.4" stroke="none"/>
    </g>
    <g id="guia-braco" filter="url(#rough)">
      <path d="M90 92C102 92 108 84 112 70" fill="none" stroke="var(--edge)" stroke-width="4"/>
      <path d="M112 38l5 13 13 5-13 5-5 13-5-13-13-5 13-5Z" fill="var(--wheat)" stroke="var(--edge)" stroke-width="3" stroke-linejoin="round"/>
    </g>
  </g>
</g>`,
  ocultos: ["guia","nave1","traj","vel1","nave1-b","rot-atitude","rot-traj","par-corpo","par-cm","par-f1","par-f2","par-r","par-giro","par-res","par-tau","imp-nave","imp-v","imp-chama","imp-f1","imp-f2","imp-f3","imp-dv","d4-a","d4-a-dv","d4-a-res","d4-b","d4-b-dv","d4-b-res","d4-b-ang","h-terra","h-orb1","h-orb2","h-transf","h-b1","h-b2","dv-titulo","dv-b1","dv-b2","dv-tot","s7-nave","traj7","s7-b1","s7-b2","s7-dim","sat-orb","sat-a","sat-b","sat-cone","sat-talhao","sat-rot","fim-a","fim-b"]
};
