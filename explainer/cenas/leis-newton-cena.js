/* Cena SVG do mini-video "Movimento e leis de Newton": carro, disco no gelo, caminhao na rampa e carrinho, em papel quadriculado.
   Pista: 9 px por metro (x = 235 + 9*s, s = v0*t + a*t^2/2). Grafico v x t: 70 px por s, 12 px por m/s. Setas de forca: 0,007 px por N.
   Rampa de 30 graus: motor 15000 N, atrito 1000 N, peso na rampa 9810 N, resultante 4190 N. */
window.Cenas = window.Cenas || {};
Cenas["leis-newton"] = {
  viewBox: "0 0 800 450",
  svg: `<g id="papel"><rect x="0" y="0" width="800" height="450" fill="var(--card)"/><path d="M0 0V450M25 0V450M50 0V450M75 0V450M100 0V450M125 0V450M150 0V450M175 0V450M200 0V450M225 0V450M250 0V450M275 0V450M300 0V450M325 0V450M350 0V450M375 0V450M400 0V450M425 0V450M450 0V450M475 0V450M500 0V450M525 0V450M550 0V450M575 0V450M600 0V450M625 0V450M650 0V450M675 0V450M700 0V450M725 0V450M750 0V450M775 0V450M800 0V450M0 0H800M0 25H800M0 50H800M0 75H800M0 100H800M0 125H800M0 150H800M0 175H800M0 200H800M0 225H800M0 250H800M0 275H800M0 300H800M0 325H800M0 350H800M0 375H800M0 400H800M0 425H800M0 450H800" fill="none" stroke="var(--rule-soft)" stroke-width="1" opacity="0.55"/><path d="M52 0V450" fill="none" stroke="var(--terra)" stroke-width="2" opacity="0.35"/><circle cx="22" cy="60" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="150" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="240" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="330" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/><circle cx="22" cy="400" r="7" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" opacity="0.5"/></g>
<g id="pista" filter="url(#rough)"><path d="M210 220H600" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M220 232H246M270 232H300M330 232H360M390 232H420M450 232H480M510 232H540M570 232H596" fill="none" stroke="var(--soil)" stroke-width="3" stroke-linecap="round" opacity="0.5"/></g>
<g id="marcas"><path d="M235 220V238M289 220V238M361 220V238M451 220V238M559 220V238" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><g id="marcas-t" style="font-family:var(--f-hand)" font-size="20" fill="var(--ink)"><text x="235" y="262" text-anchor="middle" font-size="20">0 s</text><text x="289" y="262" text-anchor="middle" font-size="20">1 s</text><text x="361" y="262" text-anchor="middle" font-size="20">2 s</text><text x="451" y="262" text-anchor="middle" font-size="20">3 s</text><text x="559" y="262" text-anchor="middle" font-size="20">4 s</text></g></g>
<g id="carro-p1"><g transform="translate(235 220)" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)">
<path d="M-38 -16L-38 -30Q-38 -34 -33 -34L-22 -34L-12 -50L16 -50L26 -34L34 -34Q38 -34 38 -28L38 -16Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="3.5"/>
<path d="M-15 -34L-9 -45H0V-34ZM6 -34V-45H14L21 -34Z" fill="var(--card)" stroke="var(--ink)" stroke-width="2.5"/>
<circle cx="-22" cy="-9" r="9" fill="var(--ink)" stroke="var(--ink)" stroke-width="2"/><circle cx="22" cy="-9" r="9" fill="var(--ink)" stroke="var(--ink)" stroke-width="2"/>
<circle cx="-22" cy="-9" r="3" fill="var(--paper)" stroke="none"/><circle cx="22" cy="-9" r="3" fill="var(--paper)" stroke="none"/></g></g>
<g id="tag-0" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="235" y="156" text-anchor="middle" font-size="22" fill="var(--ink)">5 m/s</text></g>
<g id="tag-1" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="289" y="156" text-anchor="middle" font-size="22" fill="var(--terra)">7</text></g>
<g id="tag-2" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="361" y="156" text-anchor="middle" font-size="22" fill="var(--terra)">9</text></g>
<g id="tag-3" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="451" y="156" text-anchor="middle" font-size="22" fill="var(--terra)">11</text></g>
<g id="tag-4" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="559" y="156" text-anchor="middle" font-size="22" fill="var(--terra)">13 m/s</text></g>
<path id="eixos-v" pathLength="1" d="M270 311V142M262 154L270 140L278 154M264 305H584M572 297L586 305L572 313" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="rot-graf" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="286" y="152" font-size="22">v (m/s)</text><text x="580" y="331" text-anchor="end" font-size="22">t (s)</text><text x="270" y="331" text-anchor="middle" font-size="20">0</text><text x="340" y="331" text-anchor="middle" font-size="20">1</text><text x="410" y="331" text-anchor="middle" font-size="20">2</text><text x="480" y="331" text-anchor="middle" font-size="20">3</text><text x="550" y="331" text-anchor="middle" font-size="20">4</text></g>
<path id="reta-v" pathLength="1" d="M270 250L550 162" fill="none" stroke="var(--terra)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="rot-v0" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="260" y="256" text-anchor="end" font-size="22">5 m/s</text></g>
<g id="rot-a" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="450" y="276" text-anchor="middle" font-size="26" fill="var(--terra)">a = 2 m/s²</text></g>
<g id="rot-v13" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="550" y="146" text-anchor="middle" font-size="24">13 m/s</text></g>
<g id="rot-dt" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="445" y="291" text-anchor="middle" font-size="20">passo dt = 1 s</text></g>
<circle id="pt-0" cx="270" cy="250" r="8" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
<circle id="pt-1" cx="340" cy="228" r="8" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
<circle id="pt-2" cx="410" cy="206" r="8" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
<circle id="pt-3" cx="480" cy="184" r="8" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
<circle id="pt-4" cx="550" cy="162" r="8" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
<g id="gelo" filter="url(#rough)"><rect x="215" y="270" width="380" height="22" rx="6" fill="var(--a-fisica-fill)" fill-opacity="0.45" stroke="var(--ink)" stroke-width="3.5"/><path d="M240 281H290M330 281H380M440 281H500M530 281H570" fill="none" stroke="var(--card)" stroke-width="3" stroke-linecap="round"/></g>
<g id="ghost-0" filter="url(#rough)" stroke-linecap="round" stroke-linejoin="round"><rect x="228" y="250" width="44" height="20" rx="5" fill="var(--ink)" stroke="var(--ink)" stroke-width="2.5"/><path d="M236 255H254" stroke="var(--paper)" stroke-width="3" opacity="0.6"/><path d="M232 228L280 228M269.19 222.78L280 228L269.19 233.22" fill="none" stroke="var(--terra)" stroke-width="4.5"/></g>
<g id="ghost-1" filter="url(#rough)" stroke-linecap="round" stroke-linejoin="round"><rect x="308" y="250" width="44" height="20" rx="5" fill="var(--ink)" stroke="var(--ink)" stroke-width="2.5"/><path d="M316 255H334" stroke="var(--paper)" stroke-width="3" opacity="0.6"/><path d="M312 228L360 228M349.19 222.78L360 228L349.19 233.22" fill="none" stroke="var(--terra)" stroke-width="4.5"/></g>
<g id="ghost-2" filter="url(#rough)" stroke-linecap="round" stroke-linejoin="round"><rect x="388" y="250" width="44" height="20" rx="5" fill="var(--ink)" stroke="var(--ink)" stroke-width="2.5"/><path d="M396 255H414" stroke="var(--paper)" stroke-width="3" opacity="0.6"/><path d="M392 228L440 228M429.19 222.78L440 228L429.19 233.22" fill="none" stroke="var(--terra)" stroke-width="4.5"/></g>
<g id="ghost-3" filter="url(#rough)" stroke-linecap="round" stroke-linejoin="round"><rect x="468" y="250" width="44" height="20" rx="5" fill="var(--ink)" stroke="var(--ink)" stroke-width="2.5"/><path d="M476 255H494" stroke="var(--paper)" stroke-width="3" opacity="0.6"/><path d="M472 228L520 228M509.19 222.78L520 228L509.19 233.22" fill="none" stroke="var(--terra)" stroke-width="4.5"/></g>
<g id="ghost-4" filter="url(#rough)" stroke-linecap="round" stroke-linejoin="round"><rect x="548" y="250" width="44" height="20" rx="5" fill="var(--ink)" stroke="var(--ink)" stroke-width="2.5"/><path d="M556 255H574" stroke="var(--paper)" stroke-width="3" opacity="0.6"/><path d="M552 228L600 228M589.19 222.78L600 228L589.19 233.22" fill="none" stroke="var(--terra)" stroke-width="4.5"/></g>
<g id="rot-v5" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="410" y="204" text-anchor="middle" font-size="24" fill="var(--terra)">v = 5 m/s (constante)</text></g>
<g id="rot-f0" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="330" y="160" text-anchor="middle" font-size="32" fill="var(--terra)">ΣF = 0</text></g>
<g id="rot-a0" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="490" y="160" text-anchor="middle" font-size="32" fill="var(--terra)">a = 0</text></g>
<g id="carro-v"><g transform="translate(345 205)" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)">
<path d="M-38 -16L-38 -30Q-38 -34 -33 -34L-22 -34L-12 -50L16 -50L26 -34L34 -34Q38 -34 38 -28L38 -16Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="3.5"/>
<path d="M-15 -34L-9 -45H0V-34ZM6 -34V-45H14L21 -34Z" fill="var(--card)" stroke="var(--ink)" stroke-width="2.5"/>
<circle cx="-22" cy="-9" r="9" fill="var(--ink)" stroke="var(--ink)" stroke-width="2"/><circle cx="22" cy="-9" r="9" fill="var(--ink)" stroke="var(--ink)" stroke-width="2"/>
<circle cx="-22" cy="-9" r="3" fill="var(--paper)" stroke="none"/><circle cx="22" cy="-9" r="3" fill="var(--paper)" stroke="none"/></g></g>
<path id="f-carro" pathLength="1" d="M220 177L299 177M285.49 170.48L299 177L285.49 183.52" fill="none" stroke="var(--terra)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="rot-f-carro" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="250" y="203" text-anchor="middle" font-size="21" fill="var(--terra)">F = 2.400 N</text></g>
<g id="rot-m-carro" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="345" y="148" text-anchor="middle" font-size="22">1.200 kg</text></g>
<path id="a-carro" pathLength="1" d="M391 177L471 177M458.39 170.91L471 177L458.39 183.09" fill="none" stroke="var(--a-fisica-ink)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="rot-a-carro" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="484" y="184" font-size="24">a = 2 m/s²</text></g>
<g id="caminhao-v"><g transform="translate(369 300)" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)">
<rect x="-62" y="-66" width="82" height="48" rx="3" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5"/>
<path d="M20 -18V-54H40L54 -36H58V-18Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="3.5"/>
<path d="M26 -48H38L48 -36H26Z" fill="var(--card)" stroke="var(--ink)" stroke-width="2.5"/>
<circle cx="-42" cy="-9" r="9" fill="var(--ink)"/><circle cx="-14" cy="-9" r="9" fill="var(--ink)"/><circle cx="38" cy="-9" r="9" fill="var(--ink)"/>
<circle cx="-42" cy="-9" r="3" fill="var(--paper)"/><circle cx="-14" cy="-9" r="3" fill="var(--paper)"/><circle cx="38" cy="-9" r="3" fill="var(--paper)"/></g></g>
<path id="f-cam" pathLength="1" d="M220 262L299 262M285.49 255.48L299 262L285.49 268.52" fill="none" stroke="var(--terra)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="rot-f-cam" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="250" y="288" text-anchor="middle" font-size="21" fill="var(--terra)">F = 2.400 N</text></g>
<g id="rot-m-cam" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="369" y="226" text-anchor="middle" font-size="22">2.400 kg</text></g>
<path id="a-cam" pathLength="1" d="M435 262L475 262M462.39 255.91L475 262L462.39 268.09" fill="none" stroke="var(--a-fisica-ink)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="rot-a-cam" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="488" y="269" font-size="24">a = 1 m/s²</text></g>
<g id="o-carro"><g transform="translate(345 300)" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)">
<path d="M-38 -16L-38 -30Q-38 -34 -33 -34L-22 -34L-12 -50L16 -50L26 -34L34 -34Q38 -34 38 -28L38 -16Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="3.5"/>
<path d="M-15 -34L-9 -45H0V-34ZM6 -34V-45H14L21 -34Z" fill="var(--card)" stroke="var(--ink)" stroke-width="2.5"/>
<circle cx="-22" cy="-9" r="9" fill="var(--ink)" stroke="var(--ink)" stroke-width="2"/><circle cx="22" cy="-9" r="9" fill="var(--ink)" stroke="var(--ink)" stroke-width="2"/>
<circle cx="-22" cy="-9" r="3" fill="var(--paper)" stroke="none"/><circle cx="22" cy="-9" r="3" fill="var(--paper)" stroke="none"/></g></g>
<path id="o-f" pathLength="1" d="M220 272L299 272M285.49 265.48L299 272L285.49 278.52" fill="none" stroke="var(--terra)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="o-rf" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="250" y="298" text-anchor="middle" font-size="21" fill="var(--terra)">F = 2.400 N</text></g>
<g id="o-m" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="345" y="243" text-anchor="middle" font-size="22">1.200 kg</text></g>
<path id="o-a" pathLength="1" d="M391 272L471 272M458.39 265.91L471 272L458.39 278.09" fill="none" stroke="var(--a-fisica-ink)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="o-ra" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="484" y="279" font-size="24">a = 2 m/s²</text></g>
<g id="bloco-terra" filter="url(#rough)" stroke-linecap="round" stroke-linejoin="round"><path d="M330 150V175" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="294" y="175" width="72" height="54" rx="4" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5"/><g id="bloco-terra-t" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><text x="330" y="209" text-anchor="middle" font-size="21">1.200 kg</text></g></g>
<g id="bloco-lua" filter="url(#rough)" stroke-linecap="round" stroke-linejoin="round"><path d="M520 150V175" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="484" y="175" width="72" height="54" rx="4" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5"/><g id="bloco-lua-t" style="font-family:var(--f-hand)" font-size="21" fill="var(--ink)"><text x="520" y="209" text-anchor="middle" font-size="21">1.200 kg</text></g></g>
<path id="seta-pt" pathLength="1" d="M330 229L330 293.75M336.52 280.24L330 293.75L323.48 280.24" fill="none" stroke="var(--terra)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<path id="seta-pl" pathLength="1" d="M520 229L520 239.69M523.91 231.59L520 239.69L516.09 231.59" fill="none" stroke="var(--terra)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="rot-pt" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="344" y="272" font-size="22" fill="var(--terra)">P = 11.772 N</text></g>
<g id="rot-pl" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="520" y="270" text-anchor="middle" font-size="22" fill="var(--terra)">P = 1.944 N</text></g>
<g id="rot-gt" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="330" y="140" text-anchor="middle" font-size="21">Terra · g = 9,81 m/s²</text></g>
<g id="rot-gl" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="520" y="140" text-anchor="middle" font-size="21">Lua · g = 1,62 m/s²</text></g>
<g id="pessoa" filter="url(#rough)" stroke-linecap="round" stroke-linejoin="round"><path d="M230 270H520" fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="296" cy="192" r="11" fill="var(--card)" stroke="var(--ink)" stroke-width="3.5"/><path d="M296 203L304 240L288 270M304 240L322 270M298 216L336 224" fill="none" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g>
<g id="cart-m" filter="url(#rough)" stroke-linecap="round" stroke-linejoin="round"><rect x="346" y="216" width="80" height="34" rx="4" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5"/><circle cx="364" cy="259" r="9" fill="var(--ink)"/><circle cx="408" cy="259" r="9" fill="var(--ink)"/><circle cx="364" cy="259" r="3" fill="var(--paper)"/><circle cx="408" cy="259" r="3" fill="var(--paper)"/></g>
<path id="acao" pathLength="1" d="M346 184L446 184M431.59 177.04L446 184L431.59 190.96" fill="none" stroke="var(--terra)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<path id="reacao" pathLength="1" d="M334 184L234 184M248.41 190.96L234 184L248.41 177.04" fill="none" stroke="var(--water)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="rot-acao" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="396" y="168" text-anchor="middle" font-size="24" fill="var(--terra)">200 N</text></g>
<g id="rot-reacao" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="284" y="168" text-anchor="middle" font-size="24">200 N</text></g>
<g id="rot-par" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="390" y="140" text-anchor="middle" font-size="24">ação e reação: corpos diferentes</text></g>
<path id="rampa" pathLength="1" d="M290 300L580 132.57V300Z" fill="var(--a-fisica-fill)" fill-opacity="0.35" stroke="var(--ink)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="caminhao-r"><g transform="translate(435 216.28) rotate(-30) scale(0.95)" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)">
<rect x="-62" y="-66" width="82" height="48" rx="3" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3.5"/>
<path d="M20 -18V-54H40L54 -36H58V-18Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="3.5"/>
<path d="M26 -48H38L48 -36H26Z" fill="var(--card)" stroke="var(--ink)" stroke-width="2.5"/>
<circle cx="-42" cy="-9" r="9" fill="var(--ink)"/><circle cx="-14" cy="-9" r="9" fill="var(--ink)"/><circle cx="38" cy="-9" r="9" fill="var(--ink)"/>
<circle cx="-42" cy="-9" r="3" fill="var(--paper)"/><circle cx="-14" cy="-9" r="3" fill="var(--paper)"/><circle cx="38" cy="-9" r="3" fill="var(--paper)"/></g></g>
<path id="f-motor" pathLength="1" d="M415 181.64L492.94 136.64M477.98 137.75L492.94 136.64L484.51 149.05" fill="none" stroke="var(--terra)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<path id="f-peso" pathLength="1" d="M415 181.64L364.03 211.07M378.99 209.97L364.03 211.07L372.46 198.67" fill="none" stroke="var(--water)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<path id="f-atrito" pathLength="1" d="M421 192.04L415.8 195.04M423.78 194.45L415.8 195.04L420.3 188.42" fill="none" stroke="var(--soil)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<path id="f-res" pathLength="1" d="M395 147L416.77 134.43M404.8 135.31L416.77 134.43L410.02 144.36" fill="none" stroke="var(--ink)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough)"/>
<g id="rot-motor" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="215" y="150" font-size="21" fill="var(--terra)">motor  +15.000 N</text></g>
<g id="rot-atrito" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="215" y="172" font-size="21">atrito  −1.000 N</text></g>
<g id="rot-peso" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="215" y="194" font-size="21">peso  −9.810 N</text></g>
<g id="rot-res" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="215" y="226" font-size="24">ΣF = 4.190 N</text></g>
<g id="rot-a7" style="font-family:var(--f-hand)" font-size="22" fill="var(--ink)"><text x="215" y="254" font-size="24" fill="var(--terra)">a ≈ 2,1 m/s²</text></g>
<g id="guia" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(28 195) scale(0.8)">
<ellipse cx="60" cy="140" rx="36" ry="6" fill="var(--rule-soft)" stroke="var(--ink)" stroke-width="3"/>
<g filter="url(#rough)">
<path d="M44 120Q60 146 76 120Z" fill="var(--wheat)" stroke="var(--ink)" stroke-width="3"/>
<path d="M32 98L16 124L34 120Z M88 98L104 124L86 120Z" fill="var(--terra)" stroke="var(--ink)" stroke-width="3"/>
<path d="M60 14C82 30 90 56 90 96V122H30V96C30 56 38 30 60 14Z" fill="var(--a-fisica-fill)" stroke="var(--ink)" stroke-width="3.5"/>
<path d="M42 46Q60 36 78 46" fill="none" stroke="var(--ink)" stroke-width="2" opacity="0.35"/>
<ellipse cx="46" cy="64" rx="5" ry="9" fill="var(--card)" opacity="0.5" transform="rotate(14 46 64)"/>
<ellipse cx="50" cy="82" rx="3.5" ry="4.8" fill="var(--ink)" stroke="none"/><ellipse cx="70" cy="82" rx="3.5" ry="4.8" fill="var(--ink)" stroke="none"/>
<path d="M52 95Q60 102 68 95" fill="none" stroke="var(--ink)" stroke-width="3.5"/>
<ellipse cx="43" cy="92" rx="5" ry="3" fill="var(--terra)" opacity="0.4" stroke="none"/><ellipse cx="77" cy="92" rx="5" ry="3" fill="var(--terra)" opacity="0.4" stroke="none"/>
<path d="M36 36l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5Z" fill="var(--wheat)" stroke="var(--ink)" stroke-width="2"/>
</g>
<g id="guia-braco" filter="url(#rough)"><path d="M84 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="var(--wheat)" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/></g>
</g></g>`,
  ocultos: ["pista","marcas","tag-0","tag-1","tag-2","tag-3","tag-4","eixos-v","rot-graf","reta-v","rot-v0","rot-a","rot-v13","rot-dt","pt-0","pt-1","pt-2","pt-3","pt-4","gelo","ghost-0","ghost-1","ghost-2","ghost-3","ghost-4","rot-v5","rot-f0","rot-a0","carro-v","f-carro","rot-f-carro","rot-m-carro","a-carro","rot-a-carro","caminhao-v","f-cam","rot-f-cam","rot-m-cam","a-cam","rot-a-cam","o-carro","o-f","o-rf","o-m","o-a","o-ra","bloco-terra","bloco-lua","seta-pt","seta-pl","rot-pt","rot-pl","rot-gt","rot-gl","pessoa","cart-m","acao","reacao","rot-acao","rot-reacao","rot-par","rampa","caminhao-r","f-motor","f-peso","f-atrito","f-res","rot-motor","rot-atrito","rot-peso","rot-res","rot-a7","guia","guia-braco"]
};
