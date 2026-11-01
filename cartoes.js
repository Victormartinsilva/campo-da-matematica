/* Cartões de revisão (flashcards): saem sozinhos do conteúdo de cada assunto e voltam com repetição espaçada.
   Cada cartão guarda só a caixa (0 a 5) e a data da próxima revisão, no progresso do navegador. */
const Cartoes = (() => {
  const INTERVALOS = [0, 1, 3, 7, 14, 30];   /* dias até voltar, por caixa */
  const NOVOS_POR_SESSAO = 10;
  const hoje = () => new Date().toLocaleDateString("sv-SE");
  const somar = (iso, d) => { const t = new Date(iso + "T12:00:00"); t.setDate(t.getDate() + d); return t.toLocaleDateString("sv-SE"); };
  const estado = () => { const s = Progress.get(); return (s.cartoes = s.cartoes || {}); };
  const txt = v => (v == null ? "" : String(v));

  /* os cartões de um assunto, na ordem em que fazem sentido: pergunta de ouro, fórmulas, erros, questões */
  function baralho(m) {
    const c = [];
    if (m.gancho && m.resumo) c.push({id: `${m.id}:ouro`, mod: m.id, tipo: "Pergunta de ouro", frente: txt(m.gancho), verso: txt(m.resumo)});
    (m.formulas || []).forEach((f, i) => c.push({id: `${m.id}:f${i}`, mod: m.id, tipo: "Fórmula", frente: `Como se escreve e o que significa: ${txt(f.nome)}?`, verso: `${txt(f.expressao)}\n\n${txt(f.significado)}`, mono: true}));
    (m.erros || []).forEach((e, i) => c.push({id: `${m.id}:e${i}`, mod: m.id, tipo: "Verdadeiro ou falso?", frente: txt(e.erro), verso: txt(e.correcao)}));
    (m.exercicios || []).forEach((q, i) => c.push({id: `${m.id}:q${i}`, mod: m.id, tipo: "Questão", frente: txt(q.pergunta), verso: `Resposta: ${txt(q.resposta)}\n\n${txt(q.explicacao)}`}));
    return c;
  }

  /* cartões a revisar agora: os vencidos primeiro e depois alguns novos */
  function fila(mods, limiteNovos = NOVOS_POR_SESSAO) {
    const est = estado(), h = hoje(), venc = [], novos = [];
    mods.forEach(m => baralho(m).forEach(c => { const e = est[c.id]; if (!e) novos.push(c); else if (e.due <= h) venc.push(c); }));
    venc.sort((a, b) => est[a.id].due.localeCompare(est[b.id].due));
    return [...venc, ...novos.slice(0, limiteNovos)];
  }
  function contar(mods) {
    const est = estado(), h = hoje(); let total = 0, vencidos = 0, novos = 0;
    mods.forEach(m => baralho(m).forEach(c => { total++; const e = est[c.id]; if (!e) novos++; else if (e.due <= h) vencidos++; }));
    return {total, vencidos, novos, pendentes: vencidos + novos};
  }

  function avaliar(c, nota) {   /* nota: 0 errei, 1 quase, 2 acertei */
    const est = estado(), atual = est[c.id] ? est[c.id].box : 0;
    const box = nota === 0 ? 0 : nota === 1 ? Math.max(1, atual) : Math.min(INTERVALOS.length - 1, atual + 1);
    est[c.id] = {box, due: somar(hoje(), INTERVALOS[box])}; Progress.save();
  }

  let aberto = null;
  function abrir(mods, titulo, opcoes = {}) {
    if (aberto) fechar();
    const lista = fila(mods, opcoes.limiteNovos);
    const origem = document.activeElement, fundo = document.createElement("div");
    fundo.className = "cart-fundo"; fundo.setAttribute("role", "dialog"); fundo.setAttribute("aria-modal", "true"); fundo.setAttribute("aria-label", `Cartões de revisão: ${titulo}`);
    fundo.innerHTML = `<div class="cart"><div class="cart-topo"><span class="cart-t"></span><span class="cart-n" aria-live="polite"></span><button class="cart-x" type="button" aria-label="Fechar os cartões">×</button></div>
      <div class="cart-barra" aria-hidden="true"><i></i></div><div class="cart-corpo"></div></div>`;
    document.body.appendChild(fundo); document.body.classList.add("cart-aberto");
    const corpo = fundo.querySelector(".cart-corpo"), n = fundo.querySelector(".cart-n"), barra = fundo.querySelector(".cart-barra i");
    fundo.querySelector(".cart-t").textContent = titulo;
    const sessao = {fila: [...lista], feitos: 0, total: lista.length, acertos: 0, quases: 0, erros: 0, refeitos: new Set()};
    let virado = false, atual = null;

    function proximo() {
      atual = sessao.fila.shift(); virado = false;
      barra.style.width = (sessao.total ? Math.round(100 * sessao.feitos / sessao.total) : 100) + "%";
      if (!atual) return resumo();
      n.textContent = `${Math.min(sessao.feitos + 1, sessao.total)} de ${sessao.total}`;
      corpo.innerHTML = `<button class="cart-card" type="button" aria-label="Virar o cartão"><span class="cart-tag"></span><span class="cart-txt"></span><span class="cart-dica">Toque ou aperte espaço para ver a resposta</span></button><div class="cart-notas" hidden></div>`;
      const card = corpo.querySelector(".cart-card");
      card.querySelector(".cart-tag").textContent = atual.tipo; card.querySelector(".cart-txt").textContent = atual.frente;
      card.onclick = virar; card.focus();
    }
    function virar() {
      if (virado || !atual) return; virado = true;
      const card = corpo.querySelector(".cart-card"), notas = corpo.querySelector(".cart-notas");
      card.classList.add("virado"); card.querySelector(".cart-tag").textContent = "Resposta";
      const t = card.querySelector(".cart-txt"); t.textContent = atual.verso; if (atual.mono) t.classList.add("mono");
      card.querySelector(".cart-dica").textContent = ""; card.setAttribute("aria-label", "Cartão virado");
      notas.hidden = false;
      notas.innerHTML = `<button type="button" data-n="0" class="n0"><b>1</b> Errei</button><button type="button" data-n="1" class="n1"><b>2</b> Quase</button><button type="button" data-n="2" class="n2"><b>3</b> Acertei</button>`;
      notas.querySelectorAll("button").forEach(b => b.onclick = () => dar(+b.dataset.n)); notas.querySelector(".n2").focus();
    }
    function dar(nota) {
      if (!virado || !atual) return;
      avaliar(atual, nota); sessao.feitos++;
      if (nota === 2) sessao.acertos++; else if (nota === 1) sessao.quases++; else { sessao.erros++; if (!sessao.refeitos.has(atual.id)) { sessao.refeitos.add(atual.id); sessao.total++; sessao.fila.push(atual); } }
      proximo();
    }
    function resumo() {
      n.textContent = ""; barra.style.width = "100%";
      const vazio = !lista.length;
      corpo.innerHTML = `<div class="cart-fim"><p class="cart-fim-t">${vazio ? "Nada para revisar agora" : "Sessão concluída"}</p>
        <p>${vazio ? "Todos os cartões deste conjunto estão em dia. Eles voltam nas datas marcadas." : `Você revisou ${sessao.feitos} cartões: ${sessao.acertos} certos, ${sessao.quases} quase e ${sessao.erros} errados. Os errados voltam em breve.`}</p><button class="btn cart-ok" type="button">Fechar</button></div>`;
      corpo.querySelector(".cart-ok").onclick = fechar; corpo.querySelector(".cart-ok").focus();
    }
    function tecla(e) {
      if (e.key === "Escape") { e.preventDefault(); fechar(); return; }
      if (e.key === " " && document.activeElement && document.activeElement.classList.contains("cart-card")) { e.preventDefault(); virar(); return; }
      if (virado && ["1", "2", "3"].includes(e.key)) { e.preventDefault(); dar(+e.key - 1); }
      if (e.key === "Tab") { const f = [...fundo.querySelectorAll("button:not([hidden])")].filter(b => b.offsetParent !== null); if (!f.length) return; const i = f.indexOf(document.activeElement); if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } }
    }
    function fechar() {
      document.removeEventListener("keydown", tecla, true); fundo.remove(); document.body.classList.remove("cart-aberto"); aberto = null;
      if (origem && origem.isConnected) origem.focus();
      window.dispatchEvent(new CustomEvent("mc:cartoes"));
    }
    aberto = {fechar}; fundo.querySelector(".cart-x").onclick = fechar;
    fundo.addEventListener("pointerdown", e => { if (e.target === fundo) fechar(); });
    document.addEventListener("keydown", tecla, true);
    proximo();
  }
  const fechar = () => { if (aberto) aberto.fechar(); };
  return {baralho, fila, contar, abrir, fechar};
})();
