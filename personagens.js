/* Guias de cada matéria. Todos usam o mesmo rosto (4 humores) e o mesmo balão do Broto; só o corpo muda.
   "corpo" é desenhado em 120 x 140, com o rosto no centro (60, 90). Os grupos lf-l e lf-r giram em torno de (60, 56)
   conforme o humor (orelhas, antenas, folhas). */
const Personagens = {
  calculo: {nome: "Delta", corpo: `
    <g class="lf-l"><path d="M50 54L34 30" fill="none" stroke="var(--edge)" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="27" r="5.500" fill="var(--wheat)" stroke="var(--edge)" stroke-width="2.500"/></g>
    <g class="lf-r"><path d="M70 54Q80 36 96 40" fill="none" stroke="var(--edge)" stroke-width="3" stroke-linecap="round"/><path d="M96 40l-7-4M96 40l-5 7" fill="none" stroke="var(--edge)" stroke-width="3" stroke-linecap="round"/></g>
    <path d="M60 48L110 124H10Z" fill="var(--area-fill)" stroke="var(--edge)" stroke-width="3" stroke-linejoin="round"/>
    <path d="M60 60L96 118H24Z" fill="none" stroke="var(--edge)" stroke-width="1.500" stroke-linejoin="round" opacity=".22"/>
    <ellipse cx="52" cy="76" rx="6" ry="3.500" fill="#fff" opacity=".35" transform="rotate(-50 52 76)"/>`},
  algebra: {nome: "Grade", corpo: `
    <g class="lf-l" fill="none" stroke="var(--edge)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M50 56L36 28M36 28l1.500 9M36 28l8.500 3.500"/></g>
    <g class="lf-r" fill="none" stroke="var(--edge)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M70 56L84 28M84 28l-1.500 9M84 28l-8.500 3.500"/></g>
    <rect x="26" y="54" width="68" height="72" rx="12" fill="var(--area-fill)" stroke="var(--edge)" stroke-width="3"/>
    <path d="M49 56V124M71 56V124M28 78H92M28 102H92" stroke="var(--edge)" stroke-width="1.500" opacity=".2"/>
    <rect x="33" y="60" width="14" height="6" rx="3" fill="#fff" opacity=".35"/>`},
  fisica: {nome: "Foguetinho", corpo: `
    <g class="lf-l" fill="var(--wheat)" stroke="var(--edge)" stroke-width="1.800" stroke-linejoin="round"><path d="M36 36l2.500 6 6 2.500-6 2.500-2.500 6-2.500-6-6-2.500 6-2.500Z"/></g>
    <g class="lf-r" fill="var(--wheat)" stroke="var(--edge)" stroke-width="1.800" stroke-linejoin="round"><path d="M84 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z"/></g>
    <path d="M44 120Q60 146 76 120Z" fill="var(--wheat)" stroke="var(--edge)" stroke-width="2.500" stroke-linejoin="round"/>
    <path d="M32 98L16 124L34 120Z M88 98L104 124L86 120Z" fill="var(--terra)" stroke="var(--edge)" stroke-width="2.500" stroke-linejoin="round"/>
    <path d="M60 14C82 30 90 56 90 96V122H30V96C30 56 38 30 60 14Z" fill="var(--area-fill)" stroke="var(--edge)" stroke-width="3" stroke-linejoin="round"/>
    <path d="M42 46Q60 36 78 46" fill="none" stroke="var(--edge)" stroke-width="2" opacity=".35"/>
    <ellipse cx="46" cy="64" rx="5" ry="9" fill="#fff" opacity=".3" transform="rotate(14 46 64)"/>`},
  estatistica: {nome: "Sininho", corpo: `
    <g class="lf-l" fill="var(--wheat)" stroke="var(--edge)" stroke-width="2.200" stroke-linejoin="round"><rect x="28" y="34" width="9" height="14"/><rect x="39" y="26" width="9" height="22"/></g>
    <g class="lf-r" fill="var(--wheat)" stroke="var(--edge)" stroke-width="2.200" stroke-linejoin="round"><rect x="72" y="26" width="9" height="22"/><rect x="83" y="34" width="9" height="14"/></g>
    <path d="M20 124C30 124 34 92 40 74C46 58 54 54 60 54C66 54 74 58 80 74C86 92 90 124 100 124Z" fill="var(--area-fill)" stroke="var(--edge)" stroke-width="3" stroke-linejoin="round"/>
    <ellipse cx="46" cy="70" rx="6" ry="9" fill="#fff" opacity=".3" transform="rotate(18 46 70)"/>`},
  ml: {nome: "Robozinho", corpo: `
    <g class="lf-l"><path d="M52 56L46 32" stroke="var(--edge)" stroke-width="3" stroke-linecap="round"/><circle cx="45" cy="27" r="6" fill="var(--wheat)" stroke="var(--edge)" stroke-width="2.500"/></g>
    <g class="lf-r"><path d="M68 56L74 32" stroke="var(--edge)" stroke-width="3" stroke-linecap="round"/><circle cx="75" cy="27" r="6" fill="var(--terra)" stroke="var(--edge)" stroke-width="2.500"/></g>
    <rect x="22" y="82" width="8" height="16" rx="3" fill="var(--edge)"/><rect x="90" y="82" width="8" height="16" rx="3" fill="var(--edge)"/>
    <rect x="27" y="54" width="66" height="70" rx="16" fill="var(--area-fill)" stroke="var(--edge)" stroke-width="3"/>
    <path d="M36 62H50" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".4"/>
    <circle cx="36" cy="116" r="2" fill="var(--edge)" opacity=".5"/><circle cx="84" cy="116" r="2" fill="var(--edge)" opacity=".5"/>`},
  decisao: {nome: "Bússola", corpo: `
    <g class="lf-l"><path d="M52 56L40 28L58 46Z" fill="var(--terra)" stroke="var(--edge)" stroke-width="2.500" stroke-linejoin="round"/></g>
    <g class="lf-r"><path d="M68 56L80 28L62 46Z" fill="var(--wheat)" stroke="var(--edge)" stroke-width="2.500" stroke-linejoin="round"/></g>
    <circle cx="60" cy="90" r="37" fill="var(--area-fill)" stroke="var(--edge)" stroke-width="3"/>
    <circle cx="60" cy="90" r="30" fill="none" stroke="var(--edge)" stroke-width="1.500" opacity=".28"/>
    <path d="M60 53V60M60 120V127M23 90H30M90 90H97" stroke="var(--edge)" stroke-width="2.500" stroke-linecap="round" opacity=".55"/>
    <ellipse cx="46" cy="68" rx="7" ry="4" fill="#fff" opacity=".3" transform="rotate(-30 46 68)"/>`}
};
