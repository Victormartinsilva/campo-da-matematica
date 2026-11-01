/* Campo Vivo: liga o progresso do curso ao ecossistema (plantio, rega, adubo, solo e biomas) e monta a aba.
   O app entrega o que precisa em init(deps); nada aqui lê variáveis globais do app. */
const CampoVivo = (() => {
  const C = CAMPO_CONFIG, $ = (q, r) => r.querySelector(q);
  let D = null, host = null, bioma = "horta", sel = null, timer = 0, resetTm = 0;

  const ativos = () => D.mods.filter(m => C.assuntosAtivos.includes(m.id));
  const mod = id => D.mods.find(m => m.id === id);
  const esc = t => String(t).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));

  /* planta o que já foi estudado, liberando antes os biomas que isso abre */
  function sincronizar(avisar) {
    const feitos = D.progress.get().done;
    CampoEstado.desbloquear(feitos).forEach(id => avisar && D.toast("Bioma liberado: " + C.biomas[id].nome));
    for (const m of ativos()) {
      const esp = C.areaEspecie[D.area[m.grupo]];
      if (!feitos[m.id] || !esp || CampoEstado.planta(m.id)) continue;
      if (CampoEstado.plantar(m.id, esp, C.especies[esp].bioma) && avisar) D.toast(`Muda plantada: ${C.especies[esp].nome}`);
    }
  }
  const agora = () => CampoEstado.tick(Date.now(), D.streak());

  /* ---------- texto ---------- */
  const nivel = (v, a, b, c) => v > 0.66 ? a : v > 0.25 ? b : c;
  function itens() {
    const st = CampoEstado.get(), lista = [];
    for (const p of st.plantas.filter(p => p.bioma === bioma)) {
      const m = mod(p.assunto), e = CampoEstado.estagio(p), esp = C.especies[p.especie];
      lista.push({id: p.id, tipo: "planta", esp: p.especie, estagio: e, frac: e >= esp.lsystem.iteracoes ? 0 : p.crescimento - e, animar: e > CampoEstado.foiVisto(p),
        rotulo: `${esp.nome} de ${m ? m.nome : p.assunto}, estágio ${e} de ${esp.lsystem.iteracoes}`, planta: p});
    }
    for (const r of st.foco.sessoes.filter(r => r.bioma === bioma)) {
      const esp = C.especies[r.especie]; if (!esp) continue; const m = mod(r.assunto), e = esp.lsystem.iteracoes;
      lista.push({id: r.id, tipo: "foco", esp: r.especie, estagio: e, frac: 0, animar: false, rotulo: `${esp.nome} de uma sessão de foco de ${r.minutos} min em ${m ? m.nome : "estudo livre"}`, sessao: r});
    }
    if (st.biomas[bioma]) {
      const {n, estagio} = CampoEstado.capins(), esp = C.especies.capim;
      for (let i = 0; i < n; i++) lista.push({id: `c-${bioma}-${i}`, tipo: "capim", esp: "capim", estagio, frac: 0, animar: false, rotulo: `${esp.nome} nascido do solo vivo, estágio ${estagio} de ${esp.lsystem.iteracoes}`});
    }
    return lista;
  }

  function detalhe(it) {
    if (!it) return `<p>Toque numa planta para ver de onde ela veio e como está.</p>`;
    const esp = C.especies[it.esp], max = esp.lsystem.iteracoes;
    if (it.tipo === "foco") { const r = it.sessao, m = mod(r.assunto); return `<h3>${esp.nome} · plantada pelo foco</h3><p>Sessão de ${r.minutos} min de estudo${m ? " em <b>" + esc(m.nome) + "</b>" : ""}, em ${new Date(r.quando).toLocaleDateString("pt-BR")}. Cada sessão completa, sem sair da página, vira uma planta adulta na horta.</p>`; }
    if (it.tipo === "capim") return `<h3>${esp.nome} · estágio ${it.estagio} de ${max}</h3><p>Nasceu sozinho: o solo está vivo porque você voltou em dias seguidos. ${esp.nome} ${esp.descricao}. Volte amanhã para o solo ficar ainda mais fértil.</p>`;
    const p = it.planta, m = mod(p.assunto), prox = it.estagio >= max ? 1 : p.crescimento - it.estagio;
    const aguaTxt = nivel(p.agua, "bem regada", "vai precisar de água em breve", "seca: mexa num laboratório para regar"), aduboTxt = nivel(p.adubo, "bem adubada", "adubo acabando", "sem adubo: cumpra um desafio ou copie o código");
    return `<h3>${esp.nome} · estágio ${it.estagio} de ${max}</h3>
      <p>Nasceu da lição <button class="link" type="button" data-lesson="${esc(p.assunto)}">${esc(m ? m.nome : p.assunto)}</button>. Toque no nome para voltar a ela. Esta espécie ${esp.descricao}.</p>
      <ul class="medidores">
        <li><span>Água</span><meter min="0" max="1" value="${p.agua.toFixed(2)}" aria-label="Água"></meter><b>${aguaTxt}</b></li>
        <li><span>Adubo</span><meter min="0" max="1" value="${p.adubo.toFixed(2)}" aria-label="Adubo"></meter><b>${aduboTxt}</b></li>
        <li><span>Crescimento</span><meter min="0" max="1" value="${prox.toFixed(2)}" aria-label="Progresso até o próximo estágio"></meter><b>${it.estagio >= max ? "no tamanho máximo" : Math.round(prox * 100) + "% até o próximo estágio"}</b></li></ul>`;
  }

  /* ---------- tela ---------- */
  function desenhar() {
    if (!host) return;
    const st = CampoEstado.get(), lista = itens(), b = C.biomas[bioma], livre = !!st.biomas[bioma], seq = st.solo.sequencia, caps = CampoEstado.capins().n;
    const especies = new Set(st.plantas.map(p => p.especie)); if (caps) especies.add("capim");
    $(".campo-stats", host).innerHTML = `
      <div class="stat"><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-flame"/></svg><b>${seq}</b><span>${seq === 1 ? "dia seguido" : "dias seguidos"}</span></div>
      <div class="stat"><b>${Math.round(st.solo.fertilidade)}/100</b><span>fertilidade do solo</span></div>
      <div class="stat"><b>${especies.size}</b><span>${especies.size === 1 ? "espécie" : "espécies"} no campo</span></div>
      <div class="stat"><b>${st.plantas.length}</b><span>${st.plantas.length === 1 ? "planta de lição" : "plantas de lições"}</span></div>
      <div class="stat"><b>${st.foco.sessoes.length}</b><span>${st.foco.sessoes.length === 1 ? "planta de foco" : "plantas de foco"}</span></div>`;
    $(".campo-biomas", host).innerHTML = Object.entries(C.biomas).map(([id, bi]) => {
      const aberto = !!st.biomas[id];
      return `<button class="tab" role="tab" type="button" data-bioma="${id}" aria-selected="${id === bioma}" ${aberto ? "" : 'aria-disabled="true"'}>${aberto ? "" : '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'}<span>${bi.nome}${aberto ? "" : " (bloqueado)"}</span></button>`;
    }).join("");
    const desc = `Bioma ${b.nome}: ${lista.length ? lista.length + " plantas" : "nenhuma planta ainda"}`;
    $(".campo-cena", host).innerHTML = livre ? CampoCena.renderizar(bioma, lista.map(it => ({...it, sel: it.id === sel})), desc) : "";
    lista.forEach(it => { if (it.planta) CampoEstado.marcarVisto(it.planta); }); CampoEstado.salvar();
    const falta = !livre ? b.desbloqueio.assuntos.filter(a => !D.progress.get().done[a]).map(a => mod(a) ? mod(a).nome : a) : [];
    const vazio = livre && !lista.length ? `<p class="campo-aviso">Nada plantado aqui ainda. Conclua um assunto (${ativos().map(m => esc(m.nome)).join(" ou ")}) para plantar uma muda.</p>` : "";
    $(".campo-detalhe", host).innerHTML = !livre ? `<p class="campo-aviso">Bioma bloqueado: ${esc(b.descricao)}. Conclua ${falta.map(esc).join(" e ")} para abrir.</p>` : vazio || detalhe(lista.find(it => it.id === sel));
    $(".campo-lista", host).innerHTML = lista.length ? `<h3>Plantas deste bioma</h3><ul>${lista.map(it => `<li><button class="link" type="button" data-planta="${it.id}" aria-pressed="${it.id === sel}">${esc(it.rotulo)}</button></li>`).join("")}</ul>` : "";
  }

  function montar(el) {
    host = el; sel = null; bioma = "horta"; sincronizar(false); agora();
    host.innerHTML = `<div class="campo"><div class="head"><p class="eyebrow">Campo Vivo</p><h2>O seu campo cresce com o seu estudo</h2>
      <p class="gancho">E se cada assunto estudado virasse uma planta de verdade?</p>
      <p class="lead">Conclua assuntos para plantar. Mexa nos laboratórios para regar, cumpra desafios e copie os códigos para adubar. Volte em dias seguidos e o solo fica vivo.</p></div>
      <div class="cad-stats campo-stats"></div><div class="tabs campo-biomas" role="tablist" aria-label="Biomas"></div>
      <div class="campo-cena"></div><div class="campo-detalhe" aria-live="polite"></div><section class="campo-lista"></section>
      <div class="finish"><p>${CampoEstado.persiste() ? "O campo fica salvo neste navegador." : "Este navegador não deixou guardar o campo: ele vale só enquanto a aba estiver aberta."}</p><button class="btn alt campo-reset" type="button">Zerar o Campo Vivo</button></div></div>`;
    host.addEventListener("click", clique); host.addEventListener("keydown", tecla);
    timer = setInterval(() => { agora(); desenhar(); }, 30000);
    desenhar();
    return () => { clearInterval(timer); clearTimeout(resetTm); host = null; };
  }

  function escolher(id) { sel = sel === id ? null : id; desenhar(); }
  function clique(e) {
    const aba = e.target.closest("button[data-bioma]"), pl = e.target.closest("g[data-id]"), lista = e.target.closest("[data-planta]"), lic = e.target.closest("[data-lesson]"), rs = e.target.closest(".campo-reset");
    if (aba) { bioma = aba.dataset.bioma; sel = null; desenhar(); }
    else if (pl) escolher(pl.dataset.id);
    else if (lista) escolher(lista.dataset.planta);
    else if (lic) D.abrir(lic.dataset.lesson);
    else if (rs) {
      if (rs.dataset.sure) { CampoEstado.reset(); sincronizar(false); sel = null; bioma = "horta"; desenhar(); rs.textContent = "Zerar o Campo Vivo"; delete rs.dataset.sure; return; }
      rs.dataset.sure = "1"; rs.textContent = "Tem certeza? Clique de novo (as plantas recomeçam do broto)";
      clearTimeout(resetTm); resetTm = setTimeout(() => { if (rs.isConnected) { delete rs.dataset.sure; rs.textContent = "Zerar o Campo Vivo"; } }, 4000);
    }
  }
  function tecla(e) { const pl = e.target.closest && e.target.closest("g[data-id]"); if (pl && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); escolher(pl.dataset.id); } }

  /* ---------- ligação com o app ---------- */
  function init(deps) {
    D = deps; CampoEstado.carregar(); sincronizar(false); agora();
    window.addEventListener("mc:foco", () => { if (host) desenhar(); });
    window.addEventListener("mc:done", e => { if (!e.detail.done) return; agora(); sincronizar(true); if (host) desenhar(); });
    window.addEventListener("mc:lab", e => { if (CampoEstado.regar(e.detail.module, D.today()) && host) desenhar(); });
    window.addEventListener("mc:copy", e => { if (CampoEstado.adubar(e.detail.module, D.today())) D.toast("O código adubou a sua planta"); });
    window.addEventListener("mc:goal", e => { if (CampoEstado.adubar(e.detail.module) && host) desenhar(); });
  }
  return {init, montar};
})();
