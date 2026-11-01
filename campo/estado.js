/* Estado do Campo Vivo: esquema versionado, tempo offline e regras de crescimento.
   Salvo no localStorage; se o armazenamento falhar, o estado vive só em memória. */
const CampoEstado = (() => {
  const C = CAMPO_CONFIG; let s = null, persiste = true;
  const novo = () => ({schema: C.schema, ultimaVisita: Date.now(), solo: {fertilidade: 0, sequencia: 0}, plantas: [], biomas: {horta: true}, dias: {rega: {}, adubo: {}}, vistos: {}, foco: {sessoes: []}});

  /* futuras versões do esquema são convertidas aqui */
  function migrar(raw) {
    if (!raw || typeof raw !== "object" || raw.schema !== C.schema) return novo();
    const base = novo(); return {...base, ...raw, solo: {...base.solo, ...raw.solo}, dias: {rega: {...raw.dias?.rega}, adubo: {...raw.dias?.adubo}}, foco: {sessoes: [...(raw.foco?.sessoes || [])]}};
  }
  function carregar() {
    try { const t = localStorage.getItem(C.chave); s = migrar(t ? JSON.parse(t) : null); } catch (e) { persiste = false; s = novo(); }
    return s;
  }
  const get = () => s || carregar();
  function salvar() { try { localStorage.setItem(C.chave, JSON.stringify(s)); } catch (e) { persiste = false; } }
  function reset() { s = novo(); salvar(); return s; }

  const maximo = esp => C.especies[esp].lsystem.iteracoes;
  const estagio = p => Math.min(maximo(p.especie), Math.floor(p.crescimento));
  const planta = assunto => get().plantas.find(p => p.assunto === assunto);

  /* conta o tempo desde a última visita (com teto) e faz as plantas crescerem */
  function tick(agora, sequencia) {
    const st = get(), w = C.crescimento, horas = Math.min(w.offlineMaxHoras, Math.max(0, (agora - st.ultimaVisita) / 3600000));
    st.solo.sequencia = sequencia; st.solo.fertilidade = Math.min(100, sequencia * w.fertilidadePorDia);
    for (const p of st.plantas) {
      const fator = (0.3 + 0.7 * p.agua) * (1 + w.solo * st.solo.fertilidade / 100);
      p.crescimento = Math.min(maximo(p.especie), p.crescimento + horas * w.tempo * fator);
      p.agua = Math.max(0, p.agua - horas / w.aguaDuraHoras); p.adubo = Math.max(0, p.adubo - horas / w.adubaDuraHoras);
    }
    st.ultimaVisita = agora; salvar(); return horas;
  }

  /* biomas liberados: devolve os que acabaram de abrir */
  function desbloquear(concluidos) {
    const st = get(), novos = [];
    for (const [id, b] of Object.entries(C.biomas)) {
      if (st.biomas[id]) continue;
      if (b.desbloqueio && b.desbloqueio.assuntos.every(a => concluidos[a])) { st.biomas[id] = true; novos.push(id); }
    }
    if (novos.length) salvar(); return novos;
  }

  function plantar(assunto, especie, bioma) {
    const st = get(); if (planta(assunto)) return null;
    const p = {id: "p-" + assunto, especie, bioma: st.biomas[bioma] ? bioma : "horta", assunto, plantadaEm: Date.now(), crescimento: 0, agua: 0.5, adubo: 0};
    st.plantas.push(p); salvar(); return p;
  }
  function regar(assunto, dia) {
    const st = get(), p = planta(assunto); if (!p || st.dias.rega[assunto] === dia) return false;
    st.dias.rega[assunto] = dia; p.agua = 1; p.crescimento = Math.min(maximo(p.especie), p.crescimento + C.crescimento.rega); salvar(); return true;
  }
  /* diaUnico: com um dia, só adubo uma vez por dia por assunto (copiar o código); sem dia, sempre (desafio cumprido) */
  function adubar(assunto, diaUnico) {
    const st = get(), p = planta(assunto); if (!p) return false;
    if (diaUnico) { if (st.dias.adubo[assunto] === diaUnico) return false; st.dias.adubo[assunto] = diaUnico; }
    p.adubo = 1; p.crescimento = Math.min(maximo(p.especie), p.crescimento + C.crescimento.adubo); salvar(); return true;
  }
  /* uma sessão de foco completa vira uma planta adulta; o bioma só vale se já estiver aberto */
  function registrarFoco(assunto, minutos, especie, bioma) {
    const st = get(), b = st.biomas[bioma] ? bioma : "horta", reg = {id: "foco-" + Date.now(), assunto, minutos, especie, bioma: b, quando: Date.now()};
    st.foco.sessoes.push(reg); salvar(); return reg;
  }
  /* sair da página no meio da sessão: a planta do assunto murcha um pouco, sem perder o estágio já conquistado */
  function murchar(assunto) {
    const p = planta(assunto); if (!p) return false; p.crescimento = Math.max(Math.floor(p.crescimento), p.crescimento - 0.3); p.agua = Math.max(0, p.agua - 0.3); salvar(); return true;
  }
  const marcarVisto = p => { get().vistos[p.id] = estagio(p); };
  const foiVisto = p => get().vistos[p.id] ?? -1;

  /* capins que nascem sozinhos: derivados do solo, não guardados */
  function capins() {
    const st = get(), w = C.crescimento, n = Math.min(w.capimMax, Math.floor(st.solo.sequencia / w.capimPorDias)), e = Math.min(maximo("capim"), 1 + Math.floor(st.solo.fertilidade / 30));
    return {n, estagio: e};
  }
  return {get, carregar, salvar, reset, tick, desbloquear, plantar, regar, adubar, registrarFoco, murchar, planta, estagio, maximo, marcarVisto, foiVisto, capins, persiste: () => persiste};
})();
