/* Foco: cronômetro de estudo (pomodoro) que faz uma muda crescer enquanto a página fica aberta e à vista.
   Sessão completa vira uma planta adulta na horta do Campo Vivo. Sair da página por mais de 1 minuto interrompe a sessão. */
const Foco = (() => {
  const OPC = {foco: [15, 25, 50], pausa: [5, 10]}, AUSENTE_MS = 60000, CHAVE = "mc-foco";
  let D = null, el = null, estado = "parado", durMs = 0, acumMs = 0, ultimo = 0, ausenteDesde = 0, suspenso = false, assunto = null, esp = null, timer = 0, aberto = false;
  const cfg = {foco: 25, pausa: 5};
  try { Object.assign(cfg, JSON.parse(localStorage.getItem(CHAVE) || "{}")); } catch (e) {}
  const salvarCfg = () => { try { localStorage.setItem(CHAVE, JSON.stringify(cfg)); } catch (e) {} };
  const mmss = ms => { const s = Math.max(0, Math.ceil(ms / 1000)); return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };
  const $ = q => el.querySelector(q);

  /* tempo estudado, guardado junto do progresso */
  const tempo = () => { const s = D.progress.get(); s.foco = s.foco || {}; const f = s.foco; f.total = f.total || 0; f.sessoes = f.sessoes || 0; f.assuntos = f.assuntos || {}; f.dias = f.dias || {}; return f; };
  function somarMinutos(min, id, sessaoCompleta) {
    if (min <= 0 && !sessaoCompleta) return; const f = tempo();
    f.total += min; f.dias[D.today()] = (f.dias[D.today()] || 0) + min; if (id) f.assuntos[id] = (f.assuntos[id] || 0) + min; if (sessaoCompleta) f.sessoes++;
    D.progress.save(); window.dispatchEvent(new CustomEvent("mc:foco"));
  }
  const especieDe = m => { const C = CAMPO_CONFIG; const area = m ? D.area[m.grupo] : null; return C.areaEspecie[area] || (["estatistica", "ml", "decisao"].includes(area) ? "arbusto" : "arvore"); };

  function planta() {   /* desenho da muda, no estágio que a sessão já alcançou */
    const alvo = esp && CAMPO_CONFIG.especies[esp] ? esp : "arvore", e = CAMPO_CONFIG.especies[alvo], max = e.lsystem.iteracoes;
    const p = estado === "foco" || (suspenso && estado === "foco") ? Math.min(1, acumMs / durMs) : 0, f = p * max, est = Math.min(max, Math.floor(f));
    return `<svg viewBox="-36 -112 72 126" class="foco-svg" aria-hidden="true" style="--tronco:var(${e.cores.tronco});--folha:var(${e.cores.folha})"><ellipse class="anel" cx="0" cy="3" rx="26" ry="6"/>${CampoCena.mini(e, est, f - est)}</svg>`;
  }

  function pintar() {
    if (!el) return;
    const rest = Math.max(0, durMs - acumMs), agora = estado === "parado" ? cfg.foco * 60000 : rest;
    $(".foco-tempo").textContent = mmss(agora); el.dataset.estado = suspenso ? "suspenso" : estado;
    $(".foco-pill").setAttribute("aria-label", `Foco, ${estado === "parado" ? "parado" : estado === "pausa" ? "em pausa" : suspenso ? "pausado" : "em andamento"}, ${mmss(agora)}. ${aberto ? "Fechar" : "Abrir"} o painel`);
    $(".foco-planta").innerHTML = planta();
    const b1 = $(".foco-go"), b2 = $(".foco-stop");
    b1.textContent = estado === "parado" ? "Começar foco" : suspenso ? "Continuar" : estado === "pausa" ? "Pular a pausa" : "Pausar"; b2.hidden = estado === "parado";
    $(".foco-opc").hidden = estado !== "parado";
    const f = tempo(), hoje = f.dias[D.today()] || 0;
    $(".foco-hoje").textContent = `Hoje: ${hoje} min de estudo · ${f.sessoes} ${f.sessoes === 1 ? "sessão completa" : "sessões completas"}`;
  }
  function msg(t) { const m = $(".foco-msg"); if (m) m.textContent = t; }

  function iniciarFoco() {
    const m = D.getMod(); assunto = m ? m.id : null; esp = especieDe(m); durMs = cfg.foco * 60000; acumMs = 0; estado = "foco"; suspenso = false; ultimo = Date.now(); ausenteDesde = document.visibilityState === "hidden" ? ultimo : 0;
    msg(`Foco de ${cfg.foco} min${m ? " em " + m.nome : ""}. A muda cresce enquanto esta página fica aberta e à vista.`); pintar();
  }
  function iniciarPausa() { estado = "pausa"; durMs = cfg.pausa * 60000; acumMs = 0; suspenso = false; ultimo = Date.now(); msg(`Pausa de ${cfg.pausa} min. Levante, beba água e descanse os olhos.`); pintar(); }
  function parar(aviso) { estado = "parado"; suspenso = false; acumMs = 0; if (aviso) msg(aviso); pintar(); }

  function concluirFoco() {
    const min = cfg.foco; somarMinutos(min, assunto, true);
    const novo = CampoEstado.registrarFoco(assunto, min, esp, CAMPO_CONFIG.especies[esp].bioma);
    D.toast(`Sessão concluída: ${CAMPO_CONFIG.especies[esp].nome} plantada na ${CAMPO_CONFIG.biomas[novo.bioma].nome}.`); iniciarPausa();
  }
  function interromper() {
    const min = Math.floor(acumMs / 60000); somarMinutos(min, assunto, false);
    const m = D.getMod(); CampoEstado.murchar(assunto);
    D.toast("Sessão interrompida: você ficou fora da página por mais de 1 minuto. A muda murchou."); parar("A sessão foi interrompida e a muda murchou. Comece outra quando quiser.");
  }

  function tick() {
    if (estado === "parado" || suspenso) { ultimo = Date.now(); return; }
    const agora = Date.now(), dt = agora - ultimo; ultimo = agora;
    const visivel = document.visibilityState === "visible";
    if (estado === "pausa") { acumMs += dt; if (acumMs >= durMs) { parar("A pausa acabou. Pronto para outra sessão?"); D.toast("A pausa acabou."); } else pintar(); return; }
    if (visivel) { if (ausenteDesde) { if (agora - ausenteDesde > AUSENTE_MS) return interromper(); ausenteDesde = 0; } acumMs += Math.min(dt, 5000); }
    else { if (!ausenteDesde) ausenteDesde = agora - dt; if (agora - ausenteDesde > AUSENTE_MS) return interromper(); }
    if (acumMs >= durMs) return concluirFoco();
    pintar();
  }

  function clique(e) {
    const b = e.target.closest("button"); if (!b) return;
    if (b.classList.contains("foco-pill")) { aberto = !aberto; $(".foco-painel").hidden = !aberto; b.setAttribute("aria-expanded", aberto); pintar(); return; }
    if (b.classList.contains("foco-fechar")) { aberto = false; $(".foco-painel").hidden = true; $(".foco-pill").setAttribute("aria-expanded", "false"); $(".foco-pill").focus(); return; }
    if (b.classList.contains("foco-go")) {
      if (estado === "parado") iniciarFoco(); else if (estado === "pausa") parar("Pausa encerrada."); else { suspenso = !suspenso; ultimo = Date.now(); msg(suspenso ? "Foco pausado. O tempo não conta até você continuar." : "Foco retomado."); pintar(); } return;
    }
    if (b.classList.contains("foco-stop")) { if (estado === "foco") somarMinutos(Math.floor(acumMs / 60000), assunto, false); parar(estado === "foco" ? "Sessão encerrada sem plantar. O tempo estudado ficou registrado." : "Pausa encerrada."); }
  }

  function init(deps) {
    D = deps; if (el) return;
    el = document.createElement("div"); el.className = "foco"; el.dataset.estado = "parado";
    el.innerHTML = `<button class="foco-pill" type="button" aria-expanded="false"><span class="foco-icone" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 3h6"/></svg></span><span class="foco-tempo">25:00</span></button>
      <div class="foco-painel" role="group" aria-label="Cronômetro de foco" hidden>
        <div class="foco-topo"><b>Sessão de foco</b><button class="foco-fechar" type="button" aria-label="Fechar o painel de foco">×</button></div>
        <div class="foco-planta"></div><p class="foco-msg" role="status" aria-live="polite">Estude sem sair da página e a muda cresce.</p>
        <div class="foco-botoes"><button class="btn foco-go" type="button">Começar foco</button><button class="btn alt foco-stop" type="button" hidden>Encerrar</button></div>
        <div class="foco-opc"><label>Foco <select class="foco-sel-f" aria-label="Minutos de foco">${OPC.foco.map(v => `<option value="${v}">${v} min</option>`).join("")}</select></label><label>Pausa <select class="foco-sel-p" aria-label="Minutos de pausa">${OPC.pausa.map(v => `<option value="${v}">${v} min</option>`).join("")}</select></label></div>
        <p class="foco-hoje"></p></div>`;
    document.body.appendChild(el);
    $(".foco-sel-f").value = cfg.foco; $(".foco-sel-p").value = cfg.pausa;
    $(".foco-sel-f").onchange = e => { cfg.foco = +e.target.value; salvarCfg(); pintar(); }; $(".foco-sel-p").onchange = e => { cfg.pausa = +e.target.value; salvarCfg(); };
    el.addEventListener("click", clique); el.addEventListener("keydown", e => { if (e.key === "Escape" && aberto) { aberto = false; $(".foco-painel").hidden = true; $(".foco-pill").setAttribute("aria-expanded", "false"); $(".foco-pill").focus(); } });
    document.addEventListener("visibilitychange", () => { if (estado === "foco" && !suspenso) { if (document.visibilityState === "hidden") ausenteDesde = Date.now(); else tick(); } });
    timer = setInterval(tick, 1000); pintar();
  }
  return {init, estado: () => estado, tempo};
})();
