/* Cena SVG do mini-video "Física aplicada à engenharia e agricultura": metáfora: o trator puxando o implemento, desenhada a mao em papel quadriculado.
Numeros: N = m*g = 58860 N; F max = mu*N = 38259 N (mu 0,65); W = F*d = 1200000 J; P = F*v = 72000 W; mu 0,30 gera 17658 N; folga 5658 N; media da telemetria 69.250 kW. Setas de forca: 2,2 px por kN. */
window.Cenas = window.Cenas || {};
Cenas["fisica-engenharia"] = {
  viewBox: "0 0 800 450",
  svg: `<g id="papel">
  <rect x="0" y="0" width="800" height="450" fill="var(--card)"/>
  <path d="M0 0V450M25 0V450M50 0V450M75 0V450M100 0V450M125 0V450M150 0V450M175 0V450M200 0V450M225 0V450M250 0V450M275 0V450M300 0V450M325 0V450M350 0V450M375 0V450M400 0V450M425 0V450M450 0V450M475 0V450M500 0V450M525 0V450M550 0V450M575 0V450M600 0V450M625 0V450M650 0V450M675 0V450M700 0V450M725 0V450M750 0V450M775 0V450M800 0V450M0 0H800M0 25H800M0 50H800M0 75H800M0 100H800M0 125H800M0 150H800M0 175H800M0 200H800M0 225H800M0 250H800M0 275H800M0 300H800M0 325H800M0 350H800M0 375H800M0 400H800M0 425H800M0 450H800" fill="none" stroke="var(--grid)" stroke-width="1.5"/>
  <path d="M52 0V450" fill="none" stroke="var(--terra)" stroke-width="2" opacity="0.35"/>
  <circle cx="22" cy="60" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="150" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="240" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="330" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="400" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/>
</g>
<g id="solo"><rect x="0" y="300" width="800" height="52" fill="var(--soil)" fill-opacity="0.38"/><path d="M0 300L800 300" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><path d="M40 322l10 4M120 340l10 -4M610 320l10 4M700 338l10 -4M560 342l10 -4" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/></g>
<g id="cena1"><g id="kw-1"><rect x="242" y="76" width="96" height="40" rx="12" fill="var(--a-fisica-fill)" fill-opacity="0.5" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><text x="290" y="105" text-anchor="middle" font-size="28" fill="var(--ink)" style="font-family:var(--f-hand)">força</text></g><g id="kw-2"><rect x="344" y="76" width="122" height="40" rx="12" fill="var(--a-fisica-fill)" fill-opacity="0.5" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><text x="405" y="105" text-anchor="middle" font-size="28" fill="var(--ink)" style="font-family:var(--f-hand)">potência</text></g><g id="kw-3"><rect x="467" y="76" width="126" height="40" rx="12" fill="var(--a-fisica-fill)" fill-opacity="0.5" stroke="var(--ink)" stroke-width="3.5" filter="url(#rough)"/><text x="530" y="105" text-anchor="middle" font-size="28" fill="var(--ink)" style="font-family:var(--f-hand)">aderência</text></g></g>
<g id="maquina">
  <g id="implemento" stroke-linejoin="round" stroke-linecap="round" filter="url(#rough)" fill="none" stroke="var(--ink)">
  <path d="M312 270H212" stroke-width="7"/><path d="M228 270L214 324M258 270L244 324M288 270L274 324" stroke-width="5"/><path d="M214 324L206 326M244 324L236 326M274 324L266 326" stroke-width="4"/>
</g><g id="trator" stroke-linejoin="round" stroke-linecap="round" filter="url(#rough)">
  <path d="M392 232L498 228Q514 230 516 246L512 268L392 268Z" fill="var(--leaf)" stroke="var(--ink)" stroke-width="4"/>
  <path d="M340 232L350 190H424L428 232Z" fill="var(--leaf)" stroke="var(--ink)" stroke-width="4"/>
  <path d="M357 198H418L420 224H353Z" fill="var(--card)" stroke="var(--ink)" stroke-width="3"/>
  <path d="M342 186H432" fill="none" stroke="var(--ink)" stroke-width="6"/>
  <path d="M490 228V196" fill="none" stroke="var(--ink)" stroke-width="6"/>
  <circle cx="470" cy="276" r="24" fill="var(--soil)" stroke="var(--ink)" stroke-width="5"/><circle cx="470" cy="276" r="8" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3"/>
  <circle cx="350" cy="260" r="40" fill="var(--soil)" stroke="var(--ink)" stroke-width="5"/><path d="M380 260L389 260M371.2 281.2L377.6 287.6M350 290L350 299M328.8 281.2L322.4 287.6M320 260L311 260M328.8 238.8L322.4 232.4M350 230L350 221M371.2 238.8L377.6 232.4" fill="none" stroke="var(--ink)" stroke-width="3"/><circle cx="350" cy="260" r="13" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3"/>
</g>
  <g id="f-demand"><path d="M308 248L281.6 248M293 241.8L281.6 248L293 254.2" fill="none" stroke="var(--terra)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="285.6" y="230" text-anchor="start" font-size="24" fill="var(--terra)" style="font-family:var(--f-hand)">F = 12000 N</text></g>
  <g id="f-demand2"><path d="M308 248L209 248M220.4 241.8L209 248L220.4 254.2" fill="none" stroke="var(--terra)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="213" y="230" text-anchor="start" font-size="24" fill="var(--terra)" style="font-family:var(--f-hand)">F = 45000 N</text></g>
  <g id="pe-fmax"><path d="M350 316L434.2 316M422.8 322.2L434.2 316L422.8 309.8" fill="none" stroke="var(--a-fisica-ink)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="440" y="344" text-anchor="middle" font-size="24" fill="var(--ink)" style="font-family:var(--f-hand)">F máx = 38259 N</text></g>
  <g id="pe-fmax2"><path d="M350 316L388.8 316M377.4 322.2L388.8 316L377.4 309.8" fill="none" stroke="var(--a-fisica-ink)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="430" y="344" text-anchor="middle" font-size="24" fill="var(--ink)" style="font-family:var(--f-hand)">F máx = 17658 N</text></g>
  <g id="slip-marcas"><path d="M314 296L292 300M318 290L292 288M322 304L300 314" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /></g>
  <g id="poeira" fill="var(--rule-soft)" stroke="var(--ink)" stroke-width="2.5" filter="url(#rough)"><circle cx="292" cy="278" r="11"/><circle cx="276" cy="288" r="8"/><circle cx="264" cy="276" r="10"/></g>
</g>
<g id="cena3">
  <g id="trab-w1"><text x="400" y="96" text-anchor="middle" font-size="34" fill="var(--ink)" style="font-family:var(--f-hand)">W = F · d</text></g>
  <g id="trab-w2"><text x="400" y="134" text-anchor="middle" font-size="34" fill="var(--ink)" style="font-family:var(--f-hand)">= 12000 · 100</text></g>
  <g id="trab-w3"><text x="400" y="174" text-anchor="middle" font-size="38" fill="var(--terra)" style="font-family:var(--f-hand)">= 1200 kJ</text></g>
  <g id="trab-d"><path d="M350 376H430M350 366V386M430 366V386" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /></g>
  <g id="trab-dl"><text x="390" y="410" text-anchor="middle" font-size="28" fill="var(--ink)" style="font-family:var(--f-hand)">d = 100 m</text></g>
</g>
<g id="cena4">
  <g id="pot-f1"><text x="310" y="96" text-anchor="middle" font-size="34" fill="var(--ink)" style="font-family:var(--f-hand)">P = F · v</text></g>
  <g id="pot-f2"><text x="310" y="134" text-anchor="middle" font-size="34" fill="var(--ink)" style="font-family:var(--f-hand)">= 12000 · 6</text></g>
  <g id="pot-f3"><text x="310" y="174" text-anchor="middle" font-size="38" fill="var(--terra)" style="font-family:var(--f-hand)">= 72 kW</text></g>
  <g id="pot-v"><path d="M460 150L560 150M548.6 156.2L560 150L548.6 143.8" fill="none" stroke="var(--ink)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /><text x="510" y="128" text-anchor="middle" font-size="26" fill="var(--ink)" style="font-family:var(--f-hand)">v = 6 m/s</text></g>
  <g id="pot-barra"><path d="M240 404H540" fill="none" stroke="var(--rule-soft)" stroke-width="24" stroke-linecap="round"/><text x="240" y="380" text-anchor="start" font-size="24" fill="var(--ink)" style="font-family:var(--f-hand)">potência na barra</text><text x="540" y="380" text-anchor="end" font-size="22" fill="var(--ink)" style="font-family:var(--f-hand)">120 kW</text></g>
  <path id="pot-fill" pathLength="1" d="M240 404H420" fill="none" stroke="var(--terra)" stroke-width="18" stroke-linecap="round" filter="url(#rough)"/>
</g>
<g id="cena5">
  <g id="ad-l1"><text x="400" y="96" text-anchor="middle" font-size="34" fill="var(--ink)" style="font-family:var(--f-hand)">F máx = μ · m · g</text></g>
  <g id="ad-l2"><text x="400" y="134" text-anchor="middle" font-size="34" fill="var(--ink)" style="font-family:var(--f-hand)">= 0,65 · 6000 · 9,81</text></g>
  <g id="ad-l3"><text x="400" y="174" text-anchor="middle" font-size="38" fill="var(--a-fisica-ink)" style="font-family:var(--f-hand)">= 38259 N</text></g>
  <g id="pe-mu"><text x="430" y="392" text-anchor="middle" font-size="28" fill="var(--ink)" style="font-family:var(--f-hand)">μ = 0,65</text><path d="M430 360V374" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" /></g>
</g>
<g id="cena6">
  <g id="sl-l1"><text x="400" y="96" text-anchor="middle" font-size="34" fill="var(--terra)" style="font-family:var(--f-hand)">pedida: 45000 N</text></g>
  <g id="sl-l2"><text x="400" y="134" text-anchor="middle" font-size="34" fill="var(--a-fisica-ink)" style="font-family:var(--f-hand)">teto: 38259 N</text></g>
  <g id="sl-l3"><text x="400" y="174" text-anchor="middle" font-size="36" fill="var(--ink)" style="font-family:var(--f-hand)">transmitida: 38259 N</text></g>
</g>
<g id="cena7">
  <g id="chuva"><path d="M500 96Q490 76 510 72Q516 52 540 58Q556 44 572 62Q592 62 590 82Q594 98 576 98H506Q496 98 500 96Z" fill="var(--card)" stroke="var(--ink)" stroke-width="3.5" stroke-linejoin="round" filter="url(#rough)"/>
    <path d="M512 112l-6 14M538 112l-6 14M564 112l-6 14M590 112l-6 14" fill="none" stroke="var(--water)" stroke-width="4" stroke-linecap="round"/></g>
  <g id="sm-mu"><text x="340" y="120" text-anchor="middle" font-size="34" fill="var(--ink)" style="font-family:var(--f-hand)">μ: 0,65 → 0,30</text><text x="340" y="160" text-anchor="middle" font-size="30" fill="var(--a-fisica-ink)" style="font-family:var(--f-hand)">teto: 38259 → 17658 N</text></g>
  <g id="sm-barras">
    <text x="240" y="372" text-anchor="start" font-size="22" fill="var(--ink)" style="font-family:var(--f-hand)">μ = 0,65  (38259 N)</text>
    <rect x="240" y="378" width="286.9" height="16" fill="var(--a-fisica-fill)" fill-opacity="0.7" stroke="var(--ink)" stroke-width="3" filter="url(#rough)"/>
    <text x="240" y="414" text-anchor="start" font-size="22" fill="var(--ink)" style="font-family:var(--f-hand)">μ = 0,30  (17658 N)</text>
    <rect x="240" y="420" width="132.4" height="16" fill="var(--wheat)" fill-opacity="0.8" stroke="var(--ink)" stroke-width="3" filter="url(#rough)"/>
  </g>
  <g id="sm-dem"><path d="M330 366V442" fill="none" stroke="var(--terra)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)" stroke-dasharray="7 7"/><text x="338" y="446" text-anchor="start" font-size="20" fill="var(--terra)" style="font-family:var(--f-hand)">implemento: 12000 N</text></g>
</g>
<g id="cena8">
  <path id="tele-eixos" pathLength="1" d="M240 330H560M240 330V116M232 126L240 114L248 126" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
  <g id="tele-barras" fill="var(--water)" fill-opacity="0.7" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" filter="url(#rough)"><rect x="262" y="195.5" width="34" height="134.5"/><rect x="312" y="164.4" width="34" height="165.6"/><rect x="362" y="157.5" width="34" height="172.5"/><rect x="412" y="162.3" width="34" height="167.7"/><rect x="462" y="180.3" width="34" height="149.7"/><rect x="512" y="164.4" width="34" height="165.6"/></g>
  <g id="tele-rot"><text x="279" y="187.5" text-anchor="middle" font-size="19" fill="var(--ink)" style="font-family:var(--f-hand)">58,5</text><text x="329" y="156.4" text-anchor="middle" font-size="19" fill="var(--ink)" style="font-family:var(--f-hand)">72,0</text><text x="379" y="149.5" text-anchor="middle" font-size="19" fill="var(--ink)" style="font-family:var(--f-hand)">75,0</text><text x="429" y="154.3" text-anchor="middle" font-size="19" fill="var(--ink)" style="font-family:var(--f-hand)">72,9</text><text x="479" y="172.3" text-anchor="middle" font-size="19" fill="var(--ink)" style="font-family:var(--f-hand)">65,1</text><text x="529" y="156.4" text-anchor="middle" font-size="19" fill="var(--ink)" style="font-family:var(--f-hand)">72,0</text><text x="250" y="108" text-anchor="start" font-size="24" fill="var(--ink)" style="font-family:var(--f-hand)">P = F · v (kW)</text><text x="400" y="362" text-anchor="middle" font-size="22" fill="var(--ink)" style="font-family:var(--f-hand)">uma leitura a cada 10 s</text></g>
  <path id="tele-media" pathLength="1" d="M240 170.7H560" fill="none" stroke="var(--terra)" stroke-width="4" stroke-linecap="round" stroke-dasharray="1" filter="url(#rough)"/>
  <g id="tele-mrot"><text x="556" y="108.69999999999999" text-anchor="end" font-size="28" fill="var(--terra)" style="font-family:var(--f-hand)">média ≈ 69 kW</text></g>
</g>
<g id="cena9">
  <g id="fim-a"><text x="400" y="120" text-anchor="middle" font-size="40" fill="var(--ink)" style="font-family:var(--f-hand)">P = F · v</text></g>
  <g id="fim-b"><text x="400" y="168" text-anchor="middle" font-size="40" fill="var(--a-fisica-ink)" style="font-family:var(--f-hand)">F máx = μ · m · g</text></g>
</g>
<g id="guia" stroke-linecap="round" stroke-linejoin="round">
  <g transform="translate(22 196) scale(0.85)">
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
  ocultos: ["guia","solo","trator","implemento","kw-1","kw-2","kw-3","f-demand","trab-w1","trab-d","trab-w2","trab-dl","trab-w3","pot-f1","pot-v","pot-f2","pot-barra","pot-f3","pot-fill","ad-l1","pe-mu","ad-l2","pe-fmax","ad-l3","f-demand2","sl-l1","sl-l2","slip-marcas","poeira","sl-l3","chuva","sm-mu","pe-fmax2","sm-barras","sm-dem","tele-eixos","tele-barras","tele-rot","tele-media","tele-mrot","fim-a","fim-b"]
};
