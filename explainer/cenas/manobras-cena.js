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
  <path id="traj" pathLength="1" d="M205 236L595 236" fill="none" stroke="var(--a-fisica-ink)" stroke-width="4.5" stroke-linecap="round"/>
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
  <g id="par-r"><path d="M400 225H490" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 7"/><text x="445" y="276" text-anchor="middle" font-size="24" fill="var(--ink)" style="font-family:var(--f-hand)">r = 1 m</text></g>
  <path id="par-giro" pathLength="1" d="M462 160Q400 122 338 160M344.5 148.7L338 160L351 159.4" fill="none" stroke="var(--a-fisica-ink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="par-res"><text x="500" y="296" text-anchor="start" font-size="28" fill="var(--ink)" style="font-family:var(--f-hand)">ΣF = 0 N</text></g>
  <g id="par-tau"><text x="500" y="326" text-anchor="start" font-size="26" fill="var(--a-fisica-ink)" style="font-family:var(--f-hand)">τ = 2·r·F</text><text x="500" y="352" text-anchor="start" font-size="26" fill="var(--a-fisica-ink)" style="font-family:var(--f-hand)">= 2 · 1 · 10</text><text x="500" y="380" text-anchor="start" font-size="30" fill="var(--terra)" style="font-family:var(--f-hand)">= 20 N·m</text></g>
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
  <g id="imp-f1"><text x="380" y="292" text-anchor="start" font-size="32" fill="var(--ink)" style="font-family:var(--f-hand)">Δv = F·Δt / m</text></g>
  <g id="imp-f2"><text x="380" y="330" text-anchor="start" font-size="32" fill="var(--ink)" style="font-family:var(--f-hand)">= 20 · 4 / 1000</text></g>
  <g id="imp-f3"><text x="380" y="370" text-anchor="start" font-size="36" fill="var(--terra)" style="font-family:var(--f-hand)">= 0,08 m/s</text></g>
</g>
<g id="cena4">
  <g id="d4-a"><path d="M300 160L450 160M438.6 166.2L450 160L438.6 153.8" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="375" y="142" text-anchor="middle" font-size="24" fill="var(--ink)" style="font-family:var(--f-hand)">v = 30</text></g>
  <g id="d4-a-dv"><path d="M450 160L475 160M463.6 166.2L475 160L463.6 153.8" fill="none" stroke="var(--terra)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="462.5" y="142" text-anchor="middle" font-size="24" fill="var(--terra)" style="font-family:var(--f-hand)">Δv = 5</text></g>
  <g id="d4-a-res"><text x="497" y="168" text-anchor="start" font-size="28" fill="var(--ink)" style="font-family:var(--f-hand)">= 35 m/s</text><text x="497" y="194" text-anchor="start" font-size="20" fill="var(--a-fisica-ink)" style="font-family:var(--f-hand)">mesma direção</text></g>
  <g id="d4-b"><path d="M300 262L450 262M438.6 268.2L450 262L438.6 255.8" fill="none" stroke="var(--ink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="375" y="290" text-anchor="middle" font-size="24" fill="var(--ink)" style="font-family:var(--f-hand)">v = 30</text></g>
  <g id="d4-b-dv"><path d="M450 262L450 237M456.2 248.4L450 237L443.8 248.4" fill="none" stroke="var(--terra)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="464" y="254" text-anchor="start" font-size="24" fill="var(--terra)" style="font-family:var(--f-hand)">Δv = 5</text></g>
  <g id="d4-b-res"><path d="M300 262L450 237M439.8 245L450 237L437.7 232.7" fill="none" stroke="var(--a-fisica-ink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="330" y="200" text-anchor="start" font-size="28" fill="var(--a-fisica-ink)" style="font-family:var(--f-hand)">|v'| = 30,4 m/s</text></g>
  <g id="d4-b-ang"><path d="M380 262A80 80 0 0 0 378.9 248.8" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="344" y="236" text-anchor="start" font-size="24" fill="var(--ink)" style="font-family:var(--f-hand)">9,5°</text></g>
</g>
<g id="cena5">
  <g id="h-terra"><circle cx="450" cy="255" r="30" fill="var(--water)" fill-opacity="0.55" stroke="var(--ink)" stroke-width="4" filter="url(#rough)"/><path d="M436 249Q446 239 456 247M444 265Q456 259 466 267" fill="none" stroke="var(--leaf)" stroke-width="4" stroke-linecap="round"/></g>
  <path id="h-orb1" pathLength="1" d="M502 255A52 52 0 1 1 398 255A52 52 0 1 1 502 255" fill="none" stroke="var(--a-fisica-ink)" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/>
  <path id="h-orb2" pathLength="1" d="M580 255A130 130 0 1 1 320 255A130 130 0 1 1 580 255" fill="none" stroke="var(--a-fisica-ink)" stroke-width="4" stroke-linecap="round" filter="url(#rough)"/>
  <path id="h-transf" pathLength="1" d="M502 255A91 82.2 0 0 0 320 255" fill="none" stroke="var(--terra)" stroke-width="5" stroke-linecap="round" filter="url(#rough)"/>
  <g id="h-b1"><path d="M502 255L502 221M508.2 232.4L502 221L495.8 232.4" fill="none" stroke="var(--terra)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="518" y="231" text-anchor="start" font-size="28" fill="var(--terra)" style="font-family:var(--f-hand)">Δv<tspan dy="6" font-size="0.7em">1</tspan><tspan dy="-6"></tspan></text><circle cx="502" cy="255" r="6" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3"/></g>
  <g id="h-b2"><path d="M320 255L320 289M313.8 277.6L320 289L326.2 277.6" fill="none" stroke="var(--terra)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="310" y="263" text-anchor="end" font-size="28" fill="var(--terra)" style="font-family:var(--f-hand)">Δv<tspan dy="6" font-size="0.7em">2</tspan><tspan dy="-6"></tspan></text><circle cx="320" cy="255" r="6" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3"/></g>
</g>
<g id="cena6">
  <g id="dv-titulo"><text x="447" y="150" text-anchor="middle" font-size="30" fill="var(--ink)" style="font-family:var(--f-hand)">cada queima custa Δv</text></g>
  <g id="dv-b1"><rect x="320" y="172" width="157.7" height="62" fill="var(--terra)" fill-opacity="0.55" stroke="var(--ink)" stroke-width="3.5" stroke-linejoin="round" filter="url(#rough)"/><text x="398.845" y="198" text-anchor="middle" font-size="26" fill="var(--ink)" style="font-family:var(--f-hand)">Δv<tspan dy="6" font-size="0.7em">1</tspan><tspan dy="-6"></tspan></text><text x="398.845" y="224" text-anchor="middle" font-size="22" fill="var(--ink)" style="font-family:var(--f-hand)">2426 m/s</text></g>
  <g id="dv-b2"><rect x="477.7" y="172" width="95.4" height="62" fill="var(--wheat)" fill-opacity="0.8" stroke="var(--ink)" stroke-width="3.5" stroke-linejoin="round" filter="url(#rough)"/><text x="525.3675" y="198" text-anchor="middle" font-size="26" fill="var(--ink)" style="font-family:var(--f-hand)">Δv<tspan dy="6" font-size="0.7em">2</tspan><tspan dy="-6"></tspan></text><text x="525.3675" y="224" text-anchor="middle" font-size="22" fill="var(--ink)" style="font-family:var(--f-hand)">1467 m/s</text></g>
  <g id="dv-tot"><path d="M320 248V260H573V248" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="446.52250000000004" y="296" text-anchor="middle" font-size="32" fill="var(--terra)" style="font-family:var(--f-hand)">Δv total = 3893 m/s</text></g>
</g>
<g id="cena7">
  <g id="s7-nave"><g transform="translate(212 240)"><g transform="scale(0.7)" stroke-linejoin="round" stroke-linecap="round" filter="url(#rough)">
  <path d="M-26 -10L-40 -22L-18 -10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-26 10L-40 22L-18 10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-28 -11L12 -11Q30 -8 36 0Q30 8 12 11L-28 11Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="3.5"/>
  <circle cx="8" cy="0" r="5" fill="var(--card)" stroke="var(--ink)" stroke-width="2.5"/>
</g></g></g>
  <path id="traj7" pathLength="1" d="M220 240L316 240L412 208L508 208" fill="none" stroke="var(--a-fisica-ink)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="s7-b1"><path d="M316 240L316 196M322.2 207.4L316 196L309.8 207.4" fill="none" stroke="var(--terra)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="302" y="214" text-anchor="end" font-size="24" fill="var(--terra)" style="font-family:var(--f-hand)">10 m/s a 90°</text></g>
  <g id="s7-b2"><path d="M412 208L412 252M405.8 240.6L412 252L418.2 240.6" fill="none" stroke="var(--terra)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="426" y="282" text-anchor="start" font-size="24" fill="var(--terra)" style="font-family:var(--f-hand)">10 m/s a 270°</text></g>
  <g id="s7-dim"><path d="M316 240H528" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-dasharray="7 7"/><path d="M522 208V240M514 208H530M514 240H530" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="538" y="232" text-anchor="start" font-size="28" fill="var(--ink)" style="font-family:var(--f-hand)">40 m</text></g>
</g>
<g id="cena8">
  <path id="sat-orb" pathLength="1" d="M205 150Q400 130 595 150" fill="none" stroke="var(--a-fisica-ink)" stroke-width="4.5" stroke-linecap="round" filter="url(#rough)"/>
  <g id="sat-cone"><path d="M404 168L352 318H452Z" fill="var(--wheat)" fill-opacity="0.35" stroke="var(--wheat)" stroke-width="3" stroke-dasharray="8 8" stroke-linejoin="round"/></g>
  <g id="sat-a"><g transform="translate(400 142)"><g transform="scale(0.9)" stroke-linejoin="round" stroke-linecap="round" filter="url(#rough)">
  <path d="M-26 -10L-40 -22L-18 -10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-26 10L-40 22L-18 10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-28 -11L12 -11Q30 -8 36 0Q30 8 12 11L-28 11Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="3.5"/>
  <circle cx="8" cy="0" r="5" fill="var(--card)" stroke="var(--ink)" stroke-width="2.5"/>
</g></g></g>
  <g id="sat-b"><g transform="translate(400 142) rotate(90)"><g transform="scale(0.9)" stroke-linejoin="round" stroke-linecap="round" filter="url(#rough)">
  <path d="M-26 -10L-40 -22L-18 -10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-26 10L-40 22L-18 10Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M-28 -11L12 -11Q30 -8 36 0Q30 8 12 11L-28 11Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="3.5"/>
  <circle cx="8" cy="0" r="5" fill="var(--card)" stroke="var(--ink)" stroke-width="2.5"/>
</g></g></g>
  <g id="sat-talhao"><path d="M340 318H464L486 372H318Z" fill="var(--leaf)" fill-opacity="0.5" stroke="var(--ink)" stroke-width="3.5" stroke-linejoin="round" filter="url(#rough)"/><path d="M350 328L338 364M376 328L368 364M402 328L398 364M428 328L428 364M454 328L458 364" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/><text x="500" y="352" text-anchor="start" font-size="26" fill="var(--ink)" style="font-family:var(--f-hand)">talhão</text></g>
  <g id="sat-rot"><text x="520" y="124" text-anchor="middle" font-size="26" fill="var(--a-fisica-ink)" style="font-family:var(--f-hand)">mesma órbita</text></g>
</g>
<g id="cena9"><g id="fim-a"><text x="470" y="250" text-anchor="middle" font-size="36" fill="var(--ink)" style="font-family:var(--f-hand)">girar → atitude</text></g>
  <g id="fim-b"><text x="470" y="300" text-anchor="middle" font-size="36" fill="var(--terra)" style="font-family:var(--f-hand)">Δv<tspan dy="6" font-size="0.7em"></tspan><tspan dy="-6"> → trajetória</tspan></text></g></g>
<g id="guia" stroke-linecap="round" stroke-linejoin="round">
  <g transform="translate(22 170) scale(0.85)">
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
