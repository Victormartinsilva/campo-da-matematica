/* Módulo 3 de Programação e dados: Fabric e Databricks na prática.
   Laboratório próprio (build escrito à mão, em DOM): mapa de peças das duas plataformas, equivalências e questionário de cenários. CSS com prefixo .pl- injetado uma única vez. */
(function () {
  const esc = t => String(t == null ? "" : t).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));

  const CSS = `
.pl { display: grid; gap: var(--s-3); min-width: 0; }
.pl-cols { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--s-3); }
.pl-col { min-width: 0; border: 2px solid var(--edge); border-radius: var(--r-card); background: var(--card); padding: var(--s-2) var(--s-3) var(--s-3); display: grid; gap: var(--s-2); align-content: start; }
.pl-col h4 { margin: 0; font: 700 15px var(--f-body); }
.pl-col h4 small { font: 400 12px var(--f-body); color: var(--ink-soft); }
.pl-col[data-p="f"] { border-top: 8px solid var(--water); }
.pl-col[data-p="d"] { border-top: 8px solid var(--terra); }
.pl-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
.pl-card { font: 700 13.5px/1.25 var(--f-body); text-align: left; color: var(--ink); background: var(--paper-2); border: 2px solid var(--rule-strong); border-radius: 8px; padding: 8px 9px; min-height: 48px; cursor: pointer; display: grid; gap: 2px; align-content: center; overflow-wrap: anywhere; }
.pl-card:hover { border-color: var(--edge); }
.pl-card:focus-visible { outline: 3px dashed var(--terra); outline-offset: 2px; }
.pl-card[aria-pressed="true"] { border-color: var(--edge); background: var(--card); box-shadow: var(--hard-sm); }
.pl-col[data-p="f"] .pl-card[aria-pressed="true"] { border-left: 8px solid var(--water); }
.pl-col[data-p="d"] .pl-card[aria-pressed="true"] { border-left: 8px solid var(--terra); }
.pl-card small { font: 400 11.5px var(--f-body); color: var(--ink-soft); }
.pl-card.pl-vis small::after { content: " · visto"; }
.pl-det { border: 2px dashed var(--rule-strong); border-radius: 8px; background: var(--paper-2); padding: var(--s-3) var(--s-4); display: grid; gap: 8px; font-size: 15px; line-height: 1.45; min-width: 0; }
.pl-det h4 { margin: 0; font: 700 17px var(--f-display); }
.pl-det h4 span { font: 700 12px var(--f-body); letter-spacing: .08em; text-transform: uppercase; color: var(--ink-soft); margin-left: 6px; }
.pl-det p { margin: 0; overflow-wrap: anywhere; }
.pl-det b { color: var(--area-ink); }
.pl-eq { justify-self: start; }
.pl-q { display: grid; gap: var(--s-2); }
.pl-q h4 { margin: 0; font: 700 13px var(--f-body); letter-spacing: .08em; text-transform: uppercase; color: var(--area-ink); }
.pl-enun { margin: 0; font-size: 15.5px; line-height: 1.45; }
.pl-opts { display: grid; gap: 6px; }
.pl-opt { font: 700 14px/1.3 var(--f-body); text-align: left; color: var(--ink); background: var(--card); border: 2px solid var(--rule-strong); border-radius: 8px; padding: 8px 10px; min-height: 44px; cursor: pointer; display: flex; justify-content: space-between; gap: 8px; align-items: center; }
.pl-opt:hover:not(:disabled) { border-color: var(--edge); }
.pl-opt:focus-visible { outline: 3px dashed var(--terra); outline-offset: 2px; }
.pl-opt small { font: 400 12px var(--f-body); color: var(--ink-soft); flex: none; }
.pl-opt.pl-certa { border-color: var(--leaf); background: color-mix(in srgb, var(--leaf) 18%, var(--card)); }
.pl-opt.pl-errada { border-color: var(--alert); background: color-mix(in srgb, var(--alert) 14%, var(--card)); }
.pl-opt:disabled { cursor: default; }
.pl-fb { margin: 0; min-height: 1.4em; font-size: 14.5px; line-height: 1.4; }
.pl-fb.ok { color: var(--leaf); } .pl-fb.no { color: var(--alert); }
.pl-nav { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.pl-nav .btn { min-height: 40px; }
.pl-pl { font-size: 13px; color: var(--ink-soft); }
@media (max-width: 860px) { .pl-cols { grid-template-columns: minmax(0, 1fr); } }
`;
  function injetaCss() {
    if (document.getElementById("pl-css")) return;
    const s = document.createElement("style"); s.id = "pl-css"; s.textContent = CSS; document.head.appendChild(s);
  }

  /* peças. eq = peça mais próxima na outra plataforma (equivalência aproximada, com a nota dizendo onde difere) */
  const PECAS = [
    {id: "f-ws", p: "f", nome: "Espaço de trabalho", curto: "workspace", faz: "É o contêiner onde a equipe cria e organiza os itens do Fabric (lakehouses, notebooks, pipelines). No OneLake, os workspaces funcionam como pastas dentro do tenant.", brilha: "Separar projetos e equipes, e dar permissão por espaço.", eq: "d-ws", nota: "Os dois agrupam os ativos de uma equipe. No Databricks o workspace é o ambiente onde se acessam notebooks, bibliotecas, dashboards e experimentos."},
    {id: "f-one", p: "f", nome: "OneLake", curto: "armazenamento", faz: "É o data lake lógico e unificado do Fabric, baseado no Azure Data Lake Storage Gen2, único para o tenant e sem provisionamento inicial. Atalhos dão acesso sem cópia a dados do ADLS, Amazon S3 e Google Cloud Storage.", brilha: "Uma só cópia dos dados para todas as cargas de trabalho, sem silos.", eq: "d-delta", nota: "No Databricks as tabelas Delta ficam em armazenamento em nuvem e são governadas pelo Unity Catalog. Compare com o OneLake, que já vem pronto para o tenant."},
    {id: "f-lake", p: "f", nome: "Lakehouse", curto: "tabelas e arquivos", faz: "Guarda dados estruturados e não estruturados: tabelas Delta numa área e arquivos em outra. Acessa-se com Spark em notebooks, e o Fabric gera um endpoint de análise SQL somente leitura para consultas em T-SQL.", brilha: "Engenharia de dados, ciência de dados e arquitetura medalhão.", eq: "d-delta", nota: "No Databricks o equivalente prático são tabelas Delta em um catálogo do Unity Catalog, consultadas por notebooks ou SQL warehouses."},
    {id: "f-wh", p: "f", nome: "Warehouse", curto: "SQL e transações", faz: "É um armazém relacional desenvolvido principalmente em T-SQL, com transações ACID em várias tabelas, e guarda os dados em Delta no OneLake.", brilha: "Equipes orientadas a SQL, modelagem dimensional e relatórios de BI.", eq: "d-sqlw", nota: "O SQL warehouse do Databricks é um recurso de computação para consultas SQL sobre tabelas Delta, e não um item de armazenamento como o Warehouse do Fabric."},
    {id: "f-nb", p: "f", nome: "Notebook", curto: "código Spark", faz: "Escreve código Spark em Python, Scala, SQL ou R para ler, transformar e gravar tabelas e pastas do lakehouse.", brilha: "Transformações flexíveis e exploração de dados com código.", eq: "d-nb", nota: "Mesma ideia nas duas: células de código, resultados e texto no navegador."},
    {id: "f-pipe", p: "f", nome: "Pipeline de dados", curto: "Data Factory", faz: "Move, transforma e orquestra dados no Data Factory: atividade de cópia, atividades de notebook, fluxo de controle e agendamento por horário ou evento. O Dataflow Gen2 faz transformações em baixo código.", brilha: "Ingerir de muitas fontes e automatizar a rotina de dados.", eq: "d-jobs", nota: "No Databricks quem orquestra e agenda notebooks e tarefas são os Lakeflow Jobs."},
    {id: "f-cat", p: "f", nome: "Catálogo do OneLake", curto: "governança", faz: "Centraliza a descoberta, a exploração e a governança dos itens do Fabric. A Microsoft Purview soma proteção de informações, rótulos de confidencialidade e auditoria para dados com suporte.", brilha: "Achar dados e governar permissões e conformidade no tenant.", eq: "d-uc", nota: "É o par mais próximo do Unity Catalog, mas o Unity Catalog também controla o acesso a modelos de IA com o mesmo modelo de permissões."},
    {id: "f-ia", p: "f", nome: "Ciência de Dados e IA", curto: "modelos e Copilot", faz: "A carga de trabalho de Ciência de Dados permite criar, implantar e operacionalizar modelos de machine learning, com acompanhamento de experimentos e registro de modelos. O Fabric também tem Copilot e integração com o Microsoft Foundry.", brilha: "Enriquecer dados da empresa com previsões e levá-las ao Power BI.", eq: "d-ai", nota: "No Databricks a IA aparece como busca vetorial e serviço de modelos sobre dados governados pelo Unity Catalog."},

    {id: "d-ws", p: "d", nome: "Workspace", curto: "ambiente", faz: "É o ambiente para acessar os ativos do Databricks e organizar notebooks, bibliotecas, dashboards e experimentos em pastas.", brilha: "Reunir o trabalho de dados e IA de uma equipe em um lugar.", eq: "f-ws", nota: "Equivale ao espaço de trabalho do Fabric, que também agrupa os itens de uma equipe."},
    {id: "d-delta", p: "d", nome: "Tabelas Delta", curto: "Delta Lake", faz: "O Delta Lake oferece tabelas com transações ACID sobre armazenamento em nuvem, e as tabelas criadas no Databricks são Delta por padrão.", brilha: "Base do lakehouse: tabelas confiáveis para engenharia, SQL e IA.", eq: "f-lake", nota: "O Fabric também usa Delta como formato universal. Por isso uma plataforma consegue ler tabelas da outra, sujeito ao suporte de recursos."},
    {id: "d-nb", p: "d", nome: "Notebook", curto: "código e texto", faz: "Interface web com comandos executáveis, visualizações e texto explicativo, usada em ciência de dados e machine learning.", brilha: "Exploração, modelagem e prototipagem com código.", eq: "f-nb", nota: "Mesma ideia do notebook do Fabric."},
    {id: "d-jobs", p: "d", nome: "Lakeflow Jobs", curto: "orquestração", faz: "Mecanismo não interativo para orquestrar e agendar notebooks, bibliotecas e outras tarefas.", brilha: "Rotinas agendadas e fluxos com várias tarefas encadeadas.", eq: "f-pipe", nota: "Aproximado do pipeline de dados do Fabric no papel de orquestrar e agendar."},
    {id: "d-sdp", p: "d", nome: "Pipelines declarativos", curto: "Lakeflow SDP", faz: "Os Lakeflow Spark Declarative Pipelines são pipelines de processamento de dados sobre o Apache Spark, num framework declarativo para fluxos confiáveis e testáveis.", brilha: "Descrever as tabelas desejadas e deixar a plataforma cuidar da execução.", eq: null, nota: "Não há um item idêntico mapeado aqui. Notebooks de Spark e pipelines do Fabric cobrem a transformação e a orquestração, cada um à sua maneira."},
    {id: "d-sqlw", p: "d", nome: "SQL warehouse", curto: "computação SQL", faz: "É um recurso de computação para executar consultas SQL. Existem os tipos Classic, Pro e Serverless, e o Serverless é o recomendado quando disponível.", brilha: "Consultas de BI e analistas em SQL sobre tabelas Delta.", eq: "f-wh", nota: "Cumpre o papel do Warehouse do Fabric nas consultas SQL, mas é computação sobre tabelas, e não um item de armazenamento."},
    {id: "d-uc", p: "d", nome: "Unity Catalog", curto: "governança", faz: "É a camada unificada de governança para dados e IA: controle de acesso, linhagem, auditoria e descoberta. Os objetos seguem o nome de três níveis catálogo.esquema.objeto.", brilha: "Permissões e linhagem em um só lugar para tabelas, volumes e modelos.", eq: "f-cat", nota: "Par mais próximo do Catálogo do OneLake com a Purview."},
    {id: "d-ai", p: "d", nome: "Busca vetorial e Model Serving", curto: "IA", faz: "A busca vetorial (a documentação atual a chama Databricks AI Search, antes Vector Search) cria índices a partir de uma tabela e recupera os itens mais parecidos com uma consulta, útil em RAG. O Model Serving implanta e consulta modelos como API REST.", brilha: "Aplicações de IA, como RAG, sobre dados governados no Unity Catalog.", eq: "f-ia", nota: "No Fabric a IA vem pela carga de Ciência de Dados, pelo Copilot e pela integração com o Microsoft Foundry."}
  ];
  const POR_ID = Object.fromEntries(PECAS.map(x => [x.id, x]));
  const PLAT = {f: "Fabric", d: "Databricks"};

  const CENARIOS = [
    {q: "Uma equipe de BI só usa T-SQL e precisa atualizar duas tabelas dentro da mesma transação.", opts: ["f-lake", "f-wh", "f-nb", "f-pipe"], certa: "f-wh", porque: "O guia de decisão do Fabric indica o Warehouse para T-SQL e para transações em várias tabelas. O lakehouse não oferece transações multitabela."},
    {q: "Todo dia, às 2h, copiar os dados de um banco SQL para o lakehouse do Fabric.", opts: ["f-nb", "f-pipe", "f-wh", "f-cat"], certa: "f-pipe", porque: "O pipeline de dados do Data Factory tem a atividade de cópia e o agendamento por horário."},
    {q: "No Databricks, controlar quem acessa cada tabela e rastrear de onde vem cada painel (linhagem).", opts: ["d-sqlw", "d-nb", "d-uc", "d-jobs"], certa: "d-uc", porque: "O Unity Catalog centraliza o controle de acesso, a linhagem, a auditoria e a descoberta."},
    {q: "Guardar laudos de solo em PDF junto com tabelas de análises e processar tudo com Spark no Fabric.", opts: ["f-wh", "f-cat", "f-pipe", "f-lake"], certa: "f-lake", porque: "O lakehouse guarda dados estruturados e não estruturados e é acessado com Spark. O warehouse é para dados estruturados."},
    {q: "Num sistema de RAG no Databricks, achar os trechos de documentos mais parecidos com a pergunta do usuário.", opts: ["d-ai", "d-sqlw", "d-jobs", "d-delta"], certa: "d-ai", porque: "A busca vetorial indexa uma tabela e recupera os itens mais similares à consulta, o passo de recuperação do RAG."},
    {q: "Ler no Fabric arquivos que já estão em um bucket do Amazon S3, sem copiá-los.", opts: ["f-pipe", "f-one", "f-wh", "f-nb"], certa: "f-one", porque: "Os atalhos do OneLake dão acesso sem cópia a dados do Amazon S3, do ADLS e do Google Cloud Storage."}
  ];

  function build(stage, panel, extra) {
    injetaCss();
    const visto = new Set(), certos = new Set(), tentou = {};
    let atual = null, equiv = 0, iCen = 0, erros = 0, resolvido = false;

    const grupo = p => `<section class="pl-col" data-p="${p}" aria-labelledby="pl-h-${p}"><h4 id="pl-h-${p}">${PLAT[p]} <small>${p === "f" ? "plataforma SaaS de análise, sobre o OneLake" : "plataforma de dados e IA, em torno do Delta Lake e do Unity Catalog"}</small></h4><div class="pl-grid">${PECAS.filter(x => x.p === p).map(x => `<button type="button" class="pl-card" data-id="${x.id}" aria-pressed="false">${esc(x.nome)}<small>${esc(x.curto)}</small></button>`).join("")}</div></section>`;
    stage.innerHTML = `<div class="pl"><div class="pl-cols">${grupo("f")}${grupo("d")}</div><article class="pl-det" aria-live="polite" aria-label="Detalhe da peça"><p>Escolha uma peça acima para ver o que ela faz, onde brilha e qual é a equivalente na outra plataforma.</p></article></div>`;
    panel.innerHTML = `<div class="read"><p>Clique nas peças do mapa para conhecê-las e use o botão de equivalência para saltar para a peça parecida. Depois responda os cenários: qual peça resolve cada situação?</p></div>
      <div class="pl-q"><h4>Qual peça usar? <span class="pl-pl"></span></h4><p class="pl-enun"></p><div class="pl-opts"></div><p class="pl-fb" role="status" aria-live="polite"></p>
      <div class="pl-nav"><button type="button" class="btn pl-prox" hidden>Próximo cenário</button><button type="button" class="btn alt pl-reinicia">Recomeçar questionário</button></div></div>`;

    const det = stage.querySelector(".pl-det"), cards = [...stage.querySelectorAll(".pl-card")];
    function abre(id, viaEq) {
      const x = POR_ID[id]; if (!x) return;
      atual = id; visto.add(id); if (viaEq) equiv++;
      cards.forEach(c => { c.setAttribute("aria-pressed", String(c.dataset.id === id)); if (visto.has(c.dataset.id)) c.classList.add("pl-vis"); });
      const e = x.eq && POR_ID[x.eq];
      det.innerHTML = `<h4>${esc(x.nome)}<span>${PLAT[x.p]}</span></h4><p><b>O que faz.</b> ${esc(x.faz)}</p><p><b>Onde brilha.</b> ${esc(x.brilha)}</p><p><b>Equivalente ${x.p === "f" ? "no Databricks" : "no Fabric"}.</b> ${e ? esc(e.nome) + ". " : "Sem par direto. "}${esc(x.nota)}</p>${e ? `<button type="button" class="btn alt pl-eq" data-eq="${e.id}">Ver ${esc(e.nome)} (${PLAT[e.p]})</button>` : ""}`;
      const b = det.querySelector(".pl-eq"); if (b) b.addEventListener("click", () => abre(b.dataset.eq, true));
    }
    cards.forEach(c => c.addEventListener("click", () => abre(c.dataset.id, false)));

    const enun = panel.querySelector(".pl-enun"), opts = panel.querySelector(".pl-opts"), fb = panel.querySelector(".pl-fb"), prox = panel.querySelector(".pl-prox"), pos = panel.querySelector(".pl-pl");
    function cenario() {
      const c = CENARIOS[iCen]; resolvido = certos.has(iCen);
      pos.textContent = `cenário ${iCen + 1} de ${CENARIOS.length} · acertos: ${certos.size}`;
      enun.textContent = c.q; fb.textContent = ""; fb.className = "pl-fb"; prox.hidden = true;
      opts.innerHTML = c.opts.map(id => `<button type="button" class="pl-opt" data-id="${id}">${esc(POR_ID[id].nome)}<small>${PLAT[POR_ID[id].p]}</small></button>`).join("");
      opts.querySelectorAll(".pl-opt").forEach(b => b.addEventListener("click", () => responde(b)));
    }
    function responde(b) {
      const c = CENARIOS[iCen], ok = b.dataset.id === c.certa;
      tentou[iCen] = (tentou[iCen] || 0) + 1;
      if (ok) {
        certos.add(iCen); b.classList.add("pl-certa");
        opts.querySelectorAll(".pl-opt").forEach(o => { o.disabled = true; });
        fb.className = "pl-fb ok"; fb.textContent = "Certo. " + c.porque;
        pos.textContent = `cenário ${iCen + 1} de ${CENARIOS.length} · acertos: ${certos.size}`;
        prox.hidden = iCen >= CENARIOS.length - 1; prox.focus();
      } else {
        erros++; b.classList.add("pl-errada"); b.disabled = true;
        fb.className = "pl-fb no"; fb.textContent = "Ainda não. Pense no que o cenário pede (linguagem, tipo de dado, orquestração ou governança) e tente outra peça.";
      }
    }
    prox.addEventListener("click", () => { if (iCen < CENARIOS.length - 1) { iCen++; cenario(); } });
    panel.querySelector(".pl-reinicia").addEventListener("click", () => { certos.clear(); iCen = 0; cenario(); });
    cenario();

    kit("plataformas", extra, {
      state: () => ({
        visitadas: visto.size,
        fabric: [...visto].filter(i => i[0] === "f").length,
        databricks: [...visto].filter(i => i[0] === "d").length,
        equiv, acertos: certos.size, erros
      }),
      goals: [
        {t: "Abra pelo menos 6 peças diferentes do mapa.", ok: s => s.visitadas >= 6, win: () => "Mapa explorado. Cada peça tem um papel e quase todas têm um par na outra plataforma."},
        {t: "Abra uma peça e use o botão de equivalência para ir à peça parecida da outra plataforma.", ok: s => s.equiv >= 1 && s.fabric >= 1 && s.databricks >= 1, win: () => "As duas plataformas resolvem problemas parecidos com nomes diferentes. Leia a nota: o par é aproximado."},
        {t: "Acerte 3 cenários do questionário.", ok: s => s.acertos >= 3, win: () => "Três cenários resolvidos. Escolher a peça é casar o problema com o papel dela."},
        {t: "Acerte os 6 cenários.", ok: s => s.acertos >= CENARIOS.length, win: () => "Todos os cenários acertados. Você já lê um problema de dados e aponta a peça certa."}
      ],
      react: s => s.acertos >= CENARIOS.length ? ["Todos os cenários acertados!", "happy"] : s.visitadas === 0 ? ["Clique numa peça para começar.", "neutral"] : ["Compare a peça com o cenário: o que ele pede?", "thinking"]
    });
    return () => {};
  }

  (window.MODULOS_PROG = window.MODULOS_PROG || []).push({
    id: "plataformas",
    nome: "Fabric e Databricks na prática",
    gancho: "Duas plataformas dizem fazer tudo com dados e IA. Que peça de cada uma resolve o seu problema?",
    resumo: "Microsoft Fabric e Databricks organizam o trabalho com dados em peças parecidas: espaço de trabalho, notebooks, pipelines, lakehouse, warehouse e catálogo de governança.",
    detalhes: "O Microsoft Fabric é uma plataforma de análise entregue como SaaS: experiências como Data Factory, Engenharia de Dados, Ciência de Dados, Data Warehouse e Power BI rodam sobre o OneLake, um data lake lógico único por tenant, e a governança passa pelo Catálogo do OneLake. O Databricks é uma plataforma de dados e IA em torno de workspaces, notebooks, Lakeflow Jobs, SQL warehouses, tabelas Delta e do Unity Catalog, a camada de governança de dados e IA. As duas usam o Delta Lake como formato de tabela, e por isso uma consegue ler tabelas da outra, sujeito ao suporte de recursos. Para escolher, olhe o perfil da equipe (T-SQL ou Spark), o ecossistema que a empresa já usa (Power BI e Microsoft 365, por exemplo), as necessidades de governança e o tipo de aplicação de IA. Em IA, o Databricks traz busca vetorial e Model Serving sobre dados governados, e o Fabric traz Ciência de Dados, Copilot e integração com o Microsoft Foundry.",
    saudacao: "Oi! Eu sou o Chaveta. Explore o mapa das peças e depois resolva os cenários. Duas plataformas, muitas peças parecidas.",
    python: `# Regra simplificada do guia de decisão do Fabric: lakehouse ou warehouse?
def escolher(linguagem, transacoes_multitabela, so_estruturado):
    votos = {"Lakehouse": 0, "Warehouse": 0}
    votos["Warehouse" if linguagem == "T-SQL" else "Lakehouse"] += 1
    votos["Warehouse" if transacoes_multitabela else "Lakehouse"] += 1
    votos["Warehouse" if so_estruturado else "Lakehouse"] += 1
    return max(votos, key=votos.get), votos

print(escolher("T-SQL", True, True))
print(escolher("Spark", False, False))   # PDFs e tabelas juntos, sem transação multitabela

# No Unity Catalog, todo objeto tem um nome de três níveis: catálogo.esquema.objeto
nome = "agro.colheita.produtividade"
catalogo, esquema, tabela = nome.split(".")
print("catálogo:", catalogo, "| esquema:", esquema, "| tabela:", tabela)

# Em um notebook do Databricks, a consulta usaria esse nome completo (apenas para ler, não roda aqui):
#   spark.sql("SELECT talhao, AVG(prod) FROM agro.colheita.produtividade GROUP BY talhao")`,
    build,
    formulas: [
      {nome: "Espaço de trabalho", expressao: "workspace = contêiner de itens e permissões de uma equipe", significado: "No Fabric agrupa lakehouses, notebooks e pipelines. No Databricks reúne notebooks, bibliotecas, dashboards e experimentos."},
      {nome: "Lakehouse ou warehouse", expressao: "Spark e não estruturado -> Lakehouse; T-SQL e transações multitabela -> Warehouse", significado: "O guia de decisão do Fabric usa linguagem, tipo de dado e necessidade de transações em várias tabelas. Os dois guardam Delta no OneLake."},
      {nome: "Orquestração", expressao: "Pipeline de dados (Fabric) ~ Lakeflow Jobs (Databricks)", significado: "Agendar e encadear cópias, notebooks e tarefas. É uma equivalência aproximada: cada produto tem seus detalhes."},
      {nome: "Catálogo e governança", expressao: "Catálogo do OneLake + Purview ~ Unity Catalog (catálogo.esquema.objeto)", significado: "Descoberta, permissões, auditoria e, no Unity Catalog, linhagem. É a camada que diz quem pode ver o quê."},
      {nome: "IA sobre dados governados", expressao: "tabela Delta -> índice vetorial -> consulta -> modelo", significado: "No Databricks, a busca vetorial e o Model Serving usam dados do Unity Catalog. No Fabric, a Ciência de Dados registra modelos e o Copilot e o Foundry ampliam o uso de IA."}
    ],
    exemplos: [
      {titulo: "Lakehouse ou warehouse no Fabric", enunciado: "Uma equipe só conhece T-SQL, trabalha apenas com dados estruturados e precisa gravar em duas tabelas numa única transação. Que item do Fabric escolher?", passos: ["Linguagem: T-SQL aponta para o Warehouse.", "Transações: precisa de várias tabelas na mesma transação, o que o Warehouse oferece e o lakehouse não.", "Tipo de dado: só estruturado também é compatível com o Warehouse."], resultado: "O Warehouse. Os dados ficam em Delta no OneLake e podem ser consultados junto com lakehouses."},
      {titulo: "Traduzir uma arquitetura entre plataformas", enunciado: "No Fabric, um pipeline copia dados toda noite, um notebook limpa as tabelas e o Catálogo do OneLake controla o acesso. Como seria no Databricks?", passos: ["Orquestração e agendamento: Lakeflow Jobs, no lugar do pipeline.", "Transformação: um notebook, igual ao do Fabric.", "Governança: Unity Catalog, que controla acesso e linhagem."], resultado: "Jobs, notebook e Unity Catalog. As equivalências são aproximadas e cada produto tem detalhes próprios."}
    ],
    exercicios: [
      {pergunta: "Qual peça do Databricks cuida de permissões, linhagem e auditoria de dados e de IA?", resposta: "O Unity Catalog", explicacao: "É a camada unificada de governança. Os objetos seguem o nome catálogo.esquema.objeto e os privilégios são concedidos sobre eles."},
      {pergunta: "Qual formato de tabela as duas plataformas usam e que permite a uma ler tabelas da outra?", resposta: "Delta Lake", explicacao: "O Fabric guarda tudo como Delta no OneLake e o Databricks cria tabelas Delta por padrão. A leitura entre elas depende do suporte aos recursos usados."},
      {pergunta: "Para guardar PDFs e tabelas juntos e processar com Spark no Fabric, lakehouse ou warehouse?", resposta: "Lakehouse", explicacao: "O lakehouse aceita dados estruturados e não estruturados e é acessado com Spark. O warehouse é voltado a dados estruturados e T-SQL."}
    ],
    erros: [
      {erro: "Fabric e Databricks são a mesma coisa com nomes diferentes.", correcao: "Resolvem problemas parecidos, mas cada uma tem seus modelos de uso. O Fabric é SaaS integrado ao OneLake e ao Power BI. O Databricks gira em torno de workspaces, computação e Unity Catalog. As equivalências do mapa são aproximadas."},
      {erro: "O SQL warehouse do Databricks é igual ao Warehouse do Fabric.", correcao: "O SQL warehouse é um recurso de computação para consultas SQL. O Warehouse do Fabric é um item que armazena dados relacionais em Delta e oferece transações multitabela."},
      {erro: "Basta escolher uma plataforma e ela serve para qualquer cenário.", correcao: "A escolha depende da equipe (T-SQL ou Spark), do ecossistema já usado, da governança exigida e do tipo de aplicação. Também é possível combiná-las, já que as tabelas Delta são compartilháveis."}
    ],
    fontes: [
      {titulo: "O que é Microsoft Fabric", url: "https://learn.microsoft.com/pt-br/fabric/fundamentals/microsoft-fabric-overview", origem: "Microsoft Learn", idioma: "pt", nivel: "iniciante", estude: "Leia as cargas de trabalho e a seção do OneLake para ver como as experiências compartilham o mesmo armazenamento."},
      {titulo: "O que é uma casa no lago (lakehouse) no Fabric", url: "https://learn.microsoft.com/pt-br/fabric/data-engineering/lakehouse-overview", origem: "Microsoft Learn", idioma: "pt", nivel: "iniciante", estude: "Veja a comparação com o warehouse e as ferramentas para carregar e consultar dados."},
      {titulo: "Databricks concepts", url: "https://docs.databricks.com/aws/en/getting-started/concepts", origem: "Databricks", idioma: "en", nivel: "iniciante", estude: "Leia as definições de workspace, notebook, jobs, pipelines e SQL warehouse."},
      {titulo: "What is Unity Catalog?", url: "https://docs.databricks.com/aws/en/data-governance/unity-catalog/", origem: "Databricks", idioma: "en", nivel: "intermediário", estude: "Entenda o nome de três níveis, o controle de acesso e a linhagem."},
      {titulo: "Databricks AI Search (antes Vector Search)", url: "https://docs.databricks.com/aws/en/ai-search/ai-search", origem: "Databricks", idioma: "en", nivel: "intermediário", estude: "Veja como um índice é criado a partir de uma tabela e como ele apoia o RAG."}
    ]
  });
  (window.CTX_TEXTO = window.CTX_TEXTO || {})["plataformas"] = {
    agro: "Uma fazenda reúne dados de colheitadeiras, estações e laudos de solo. No Fabric eles caem no OneLake e o Power BI mostra a produtividade. No Databricks, tabelas Delta governadas alimentam modelos de previsão de safra.",
    publico: "Dados de vários órgãos precisam de regras claras de acesso. O Catálogo do OneLake ou o Unity Catalog definem quem vê o quê e deixam registro de auditoria.",
    engenharia: "Séries de sensores entram por pipelines, são tratadas em notebooks e consultadas em SQL. A escolha entre Fabric e Databricks depende de onde a equipe já trabalha.",
    dados: "É o dia a dia do engenheiro de dados: workspace, notebook, pipeline ou job, tabela Delta e catálogo. Saber o par de cada peça nas duas plataformas facilita mudar de uma para outra.",
    negocios: "Relatórios de vendas no Power BI conversam bem com o Fabric. Já uma equipe de ciência de dados com muito Spark pode preferir o Databricks. Ambas compartilham tabelas Delta.",
    dia: "É como escolher onde guardar e organizar as fotos da família: uma pasta compartilhada com álbuns prontos ou uma estante própria. Cada opção serve a um jeito de trabalhar."
  };
})();
