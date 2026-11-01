/* Módulo de Programação e dados: Primeiros passos em IA. Mapa de conceitos em camadas (IA, ML, aprendizado profundo, LLMs, RAG, agentes) e guardrails, com questionário. */
(window.MODULOS_PROG = window.MODULOS_PROG || []).push({
  id: "ia-base",
  nome: "Primeiros passos em IA",
  gancho: "IA, machine learning, LLM, RAG, agente: são sinônimos ou peças diferentes?",
  resumo: "São camadas e peças diferentes: IA é o guarda-chuva, ML aprende com exemplos, aprendizado profundo usa redes, LLMs geram texto, RAG busca nos seus documentos, agentes agem e guardrails seguram os erros.",
  detalhes: "Inteligência artificial (IA) é qualquer sistema que faz uma tarefa que pareceria exigir inteligência, seja por regras escritas à mão, seja por modelos aprendidos. Dentro dela está o aprendizado de máquina (ML), em que a regra sai de exemplos. Dentro do ML está o aprendizado profundo, que usa redes neurais com muitas camadas e aprende os próprios atributos a partir de dados crus como imagens e texto. Os modelos de linguagem (LLMs) são redes profundas treinadas para prever o próximo token em enormes quantidades de texto, e por isso escrevem com fluência. Fluência não garante verdade: o modelo pode inventar (alucinar) e só conhece o que viu no treino. O RAG resolve parte disso: busca trechos nos seus documentos e entrega ao LLM junto com a pergunta, para ele responder com base neles. Um agente vai além: o LLM decide ações, chama ferramentas (banco de dados, código, APIs) e repete até cumprir uma meta, e cada passo extra acumula risco. Os guardrails são as verificações em volta de tudo: filtram a entrada, validam a saída, limitam o que o agente pode fazer e chamam um humano quando precisa. Nenhuma peça é garantia sozinha. Saber qual conceito resolve qual caso é a base para entender o resto do caderno.",
  saudacao: "Oi! Eu sou o Chaveta. Toque nos blocos do mapa para ver cada conceito e depois teste se você sabe qual deles resolve cada caso.",
  python: `umidade = 18                      # % de umidade do solo: mude com − e +

# 1) IA por regra: uma pessoa escreveu o limite
print("regra:", "irrigar" if umidade < 20 else "esperar")

# 2) Aprendizado de máquina: o limite sai dos exemplos
historico = [(12, "irrigar"), (15, "irrigar"), (19, "irrigar"),
             (24, "esperar"), (30, "esperar"), (35, "esperar")]
maior_irrigar = max(u for u, acao in historico if acao == "irrigar")
menor_esperar = min(u for u, acao in historico if acao == "esperar")
limite = (maior_irrigar + menor_esperar) / 2
print("aprendido:", limite, "->", "irrigar" if umidade < limite else "esperar")

# 3) RAG: busca o trecho mais parecido com a pergunta e o entrega ao modelo
docs = {"irrigação": "irrigar quando a umidade do solo cair abaixo de 20 por cento",
        "adubação": "aplicar fósforo quando a análise mostrar teor baixo"}
pergunta = "quando irrigar"
def pontos(texto):
    return len(set(pergunta.split()) & set(texto.split()))
melhor = max(docs, key=lambda nome: pontos(docs[nome]))
print("RAG buscou:", melhor, "->", docs[melhor])

# 4) Guardrail: confere a resposta antes de entregar
resposta = "irrigar"
permitidas = {"irrigar", "esperar"}
print("guardrail:", "liberada" if resposta in permitidas else "bloqueada")`,
  build: function (stage, panel, extra) {
    const esc = t => String(t).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
    if (!document.getElementById("ia-style")) {
      const st = document.createElement("style"); st.id = "ia-style";
      st.textContent = `
.ia { --ia-f: var(--a-prog-fill); --ia-i: var(--a-prog-ink); display: grid; gap: var(--s-4); min-width: 0; }
.ia-map { display: grid; gap: 6px; justify-items: center; }
.ia-lin { display: flex; gap: 6px; width: 100%; margin: 0 auto; }
.ia-no { flex: 1 1 0; min-width: 0; min-height: 48px; display: grid; gap: 1px; align-content: center; text-align: left; padding: 6px 12px; font: 700 15px/1.25 var(--f-body); color: var(--ink); background: color-mix(in srgb, var(--ia-f) var(--ia-t, 12%), var(--card)); border: 2px solid var(--rule-strong); border-radius: 8px 12px 8px 12px; cursor: pointer; transition: transform .08s, box-shadow .08s; }
.ia-no small { font: 400 12.5px/1.3 var(--f-body); color: var(--ink-soft); overflow-wrap: anywhere; }
.ia-no:hover { border-color: var(--edge); transform: translate(-1px, -1px); box-shadow: 3px 3px 0 var(--shadow); }
.ia-no[aria-pressed="true"] { background: var(--ia-f); color: #1d140c; border-color: var(--edge); box-shadow: 3px 3px 0 var(--shadow); }
.ia-no[aria-pressed="true"] small { color: #3a2a1a; }
.ia-no.visto::after { content: "visto"; justify-self: start; font: 700 11px var(--f-body); letter-spacing: .06em; text-transform: uppercase; color: var(--ia-i); }
.ia-no[aria-pressed="true"].visto::after { color: #1d140c; }
.ia-no.guarda { border-style: dashed; }
.ia-no:focus-visible, .ia-op:focus-visible { outline: 3px dashed var(--terra); outline-offset: 3px; }
.ia-dica { margin: 0; font-size: 13px; color: var(--ink-soft); text-align: center; }
.ia-card { display: grid; gap: var(--s-2); padding: var(--s-4); background: var(--paper-2); border: 2px solid var(--rule-strong); border-left: 8px solid var(--ia-f); border-radius: var(--r-card); }
.ia-card h4 { margin: 0; font: 700 19px/1.2 var(--f-display); color: var(--ink); }
.ia-card p { margin: 0; line-height: 1.5; color: var(--ink); overflow-wrap: anywhere; }
.ia-card b { color: var(--ia-i); }
.ia-card .ia-arm b { color: var(--alert); }
.ia-q { display: grid; gap: var(--s-3); min-width: 0; }
.ia-qt { margin: 0; font: 700 13px var(--f-body); letter-spacing: .08em; text-transform: uppercase; color: var(--ia-i, var(--a-prog-ink)); }
.ia-caso { margin: 0; line-height: 1.5; font-size: 15px; overflow-wrap: anywhere; }
.ia-ops { display: flex; flex-wrap: wrap; gap: 6px; }
.ia-op { flex: 1 1 auto; min-height: 44px; padding: 6px 10px; font: 700 14px var(--f-body); color: var(--ink); background: var(--card); border: 2px solid var(--rule-strong); border-radius: 8px; cursor: pointer; }
.ia-op:hover:not(:disabled) { border-color: var(--edge); }
.ia-op.ok { background: var(--a-prog-fill); color: #1d140c; border-color: var(--edge); }
.ia-op.no { border-color: var(--alert); color: var(--alert); }
.ia-op:disabled { cursor: default; opacity: .7; }
.ia-op.ok:disabled { opacity: 1; }
.ia-fb { margin: 0; min-height: 2.6em; font-size: 14px; line-height: 1.45; color: var(--ink); overflow-wrap: anywhere; }
.ia-fb.bom { color: var(--leaf); }
.ia-fb.ruim { color: var(--alert); }
.ia-placar { margin: 0; font-size: 13px; color: var(--ink-soft); }
@media (max-width: 480px) { .ia-no { padding: 6px 8px; font-size: 14px; } .ia-card { padding: var(--s-3); } }`;
      document.head.appendChild(st);
    }

    /* os sete conceitos: definição curta, exemplo, armadilha e onde aprofundar no caderno */
    const C = [
      {id: "ia", nome: "Inteligência artificial", sub: "o guarda-chuva", curto: "qualquer sistema que faz uma tarefa que parece exigir inteligência",
        def: "Qualquer sistema que realiza uma tarefa que pareceria exigir inteligência. Pode seguir regras escritas por pessoas ou usar modelos aprendidos dos dados.",
        ex: "Um sistema que manda irrigar quando a umidade do solo fica abaixo de 20%: a regra foi escrita à mão e ele não aprende nada.",
        arm: "Achar que IA é sempre um chatbot. Regras fixas também são IA, e um sistema com regras só muda quando alguém reescreve a regra.",
        onde: "Regras são código: veja Como o computador pensa. O resto do caderno trata das camadas de dentro."},
      {id: "ml", nome: "Aprendizado de máquina", sub: "a regra sai dos exemplos", curto: "o modelo aprende a regra a partir de exemplos com resposta",
        def: "O programa recebe exemplos (atributos e rótulo) e ajusta parâmetros para errar menos. Em vez de você escrever o limite, ele sai dos dados.",
        ex: "Com o histórico de pedidos e a coluna atrasou, prever se o próximo pedido vai atrasar.",
        arm: "Só vale para dados parecidos com os do treino. Poucos dados, dados enviesados e vazamento do teste geram uma nota bonita e um modelo fraco.",
        onde: "Aprofunde em Regressão linear e gradiente, Otimizadores: GD, momento e Adam, Overfitting, viés e variância, Classificação, limiar e guardrails e Do dado ao modelo."},
      {id: "dl", nome: "Aprendizado profundo", sub: "redes com muitas camadas", curto: "redes neurais profundas que aprendem os atributos sozinhas",
        def: "ML com redes neurais de muitas camadas. Cada camada transforma a anterior, e a rede aprende sozinha quais atributos importam em dados crus, como imagens, áudio e texto.",
        ex: "Reconhecer uma doença na foto de uma folha tirada por drone, sem escrever regras de cor e forma.",
        arm: "Pede muitos dados e muita computação, e é difícil de explicar. Numa tabela pequena, um modelo simples costuma empatar ou ganhar.",
        onde: "Aprofunde em Redes neurais e backpropagation e em Otimizadores: GD, momento e Adam."},
      {id: "llm", nome: "Modelos de linguagem (LLMs)", sub: "preveem o próximo token", curto: "redes profundas que geram texto prevendo o próximo token",
        def: "Redes profundas (transformers) treinadas com enormes volumes de texto para prever o próximo token. Repetindo essa previsão, escrevem, resumem, traduzem e explicam.",
        ex: "Pedir um resumo, em linguagem simples, de um relatório técnico de dez páginas.",
        arm: "Fluência não garante verdade: o modelo pode inventar fatos (alucinar), só conhece o que viu no treino e não enxerga os seus dados sozinho.",
        onde: "Aprofunde em Do logit ao próximo token (token e temperatura), Softmax e atenção e Vetores, embeddings e busca."},
      {id: "rag", nome: "RAG", sub: "busca nos seus documentos", curto: "busca trechos nos seus documentos e os entrega ao modelo",
        def: "Geração aumentada por recuperação: busca os trechos mais relevantes nos seus documentos (por embeddings) e os entrega ao LLM junto com a pergunta, para ele responder com base neles e citar a fonte.",
        ex: "Perguntar ao manual interno de armazenagem qual é a temperatura máxima de um insumo, com o trecho citado.",
        arm: "Se a busca trouxer o trecho errado, a resposta sai errada com cara de bem fundamentada. Documentos mal divididos ou desatualizados quebram o resultado.",
        onde: "Aprofunde em Vetores, embeddings e busca, que é o motor da etapa de recuperação."},
      {id: "ag", nome: "Agentes", sub: "decidem e usam ferramentas", curto: "um LLM em laço que decide ações e usa ferramentas até cumprir a meta",
        def: "Um LLM em laço: observa, decide a próxima ação, chama uma ferramenta (banco de dados, código, API) e repete até cumprir a meta.",
        ex: "Consultar o estoque, calcular a reposição e abrir o pedido de compra sozinho.",
        arm: "Os erros se acumulam a cada passo e uma ação errada tem efeito de verdade (apagar, comprar, enviar). Também aumenta custo e tempo de resposta.",
        onde: "Aprofunde em Classificação, limiar e guardrails e em Do logit ao próximo token, para entender por que cada passo pode variar."},
      {id: "gr", nome: "Guardrails", sub: "segurança em volta de tudo", curto: "verificações na entrada e na saída que bloqueiam, corrigem ou escalam",
        def: "Verificações em volta do sistema: filtram a entrada, validam a saída, limitam o que o agente pode fazer e chamam um humano em casos de risco. Podem ser regras ou classificadores.",
        ex: "Bloquear qualquer resposta que contenha CPF de cliente ou que fuja do assunto permitido.",
        arm: "Um limiar apertado demais bloqueia respostas legítimas e um frouxo demais deixa o problema passar. Nenhum guardrail é garantia total.",
        onde: "Aprofunde em Classificação, limiar e guardrails, onde o limiar vira um controle que você ajusta."}
    ];
    const porId = Object.fromEntries(C.map(c => [c.id, c]));
    const CASOS = [
      {t: "A cooperativa tem cinco anos de pedidos com a coluna atrasou e quer prever os atrasos dos próximos.", r: "ml", pista: "a regra precisa sair de exemplos com resposta", why: "Há exemplos com rótulo e a regra deve ser aprendida: isso é aprendizado de máquina."},
      {t: "É preciso identificar doença em fotos de folhas feitas por drone, sem escrever regras de cor e forma à mão.", r: "dl", pista: "dados crus como imagens, com atributos aprendidos pela própria rede", why: "Imagens pedem redes com muitas camadas que aprendem os atributos sozinhas: aprendizado profundo."},
      {t: "Você quer um assistente que redija o resumo de um relatório técnico em linguagem simples.", r: "llm", pista: "gerar e reescrever texto", why: "Resumir e reescrever é a especialidade de um modelo de linguagem."},
      {t: "O assistente precisa responder sobre a norma interna de armazenagem, citando o trecho, sem decorar a norma e com a versão mais recente.", r: "rag", pista: "a resposta deve vir dos seus documentos, que mudam", why: "Buscar o trecho atual nos documentos e entregar ao modelo é o RAG. Atualizar a norma é trocar o texto indexado."},
      {t: "O assistente deve consultar o estoque, calcular a reposição e abrir o pedido de compra sozinho.", r: "ag", pista: "decidir ações e chamar ferramentas em sequência", why: "Encadear decisões e ferramentas até cumprir a meta é o trabalho de um agente."},
      {t: "O assistente nunca pode revelar CPF de cliente nem responder fora do escopo, mesmo se o usuário pedir.", r: "gr", pista: "uma verificação na entrada e na saída, em volta do modelo", why: "Bloquear ou corrigir respostas fora da política é o papel dos guardrails."},
      {t: "Um sistema manda irrigar quando a umidade do solo fica abaixo de 20%, uma regra escrita por um agrônomo.", r: "ia", pista: "a regra foi escrita por uma pessoa e nada é aprendido", why: "Uma regra fixa já é IA no sentido amplo, mesmo sem aprendizado."}
    ];

    stage.style.position = "static"; /* o palco é alto (mapa e detalhe): fixo na rolagem ele cobriria o questionário */
    stage.innerHTML = `<div class="ia"><div class="ia-map" role="group" aria-label="Mapa de conceitos, do mais amplo para o mais específico"></div><p class="ia-dica">Cada bloco está dentro do anterior. Toque em um bloco para ler.</p><article class="ia-card" aria-live="polite" aria-label="Detalhe do conceito"></article></div>`;
    const mapa = stage.querySelector(".ia-map"), card = stage.querySelector(".ia-card");
    const lin = (ids, larg, t, cls) => `<div class="ia-lin" style="width:${larg}%">${ids.map(i => `<button class="ia-no${cls ? " " + cls : ""}" type="button" data-c="${i}" aria-pressed="false" style="--ia-t:${t}%"><span>${esc(porId[i].nome)}</span><small>${esc(porId[i].sub)}</small></button>`).join("")}</div>`;
    mapa.innerHTML = lin(["ia"], 100, 8) + lin(["ml"], 92, 14) + lin(["dl"], 84, 20) + lin(["llm"], 76, 26) + lin(["rag", "ag"], 68, 32) + lin(["gr"], 100, 4, "guarda");
    card.innerHTML = `<p>Escolha um bloco do mapa. Você verá o que ele faz, um exemplo e a armadilha mais comum.</p>`;

    const visto = new Set(), resolvidos = new Set(); let atual = 0, erros = 0, sel = null;
    function abrir(id) {
      const c = porId[id]; visto.add(id); sel = id;
      mapa.querySelectorAll(".ia-no").forEach(b => { b.setAttribute("aria-pressed", String(b.dataset.c === id)); if (visto.has(b.dataset.c)) b.classList.add("visto"); });
      card.innerHTML = `<h4>${esc(c.nome)}</h4><p><b>O que é.</b> ${esc(c.def)}</p><p><b>Exemplo.</b> ${esc(c.ex)}</p><p class="ia-arm"><b>Armadilha.</b> ${esc(c.arm)}</p><p><b>No caderno.</b> ${esc(c.onde)}</p>`;
    }
    mapa.addEventListener("click", e => { const b = e.target.closest(".ia-no"); if (b) abrir(b.dataset.c); });

    /* questionário: qual conceito resolve este caso? */
    panel.innerHTML = `<div class="ia-q"><p class="ia-qt">Qual conceito resolve este caso?</p><p class="ia-caso"></p><div class="ia-ops" role="group" aria-label="Escolha o conceito">${C.map(c => `<button class="ia-op" type="button" data-c="${c.id}">${esc(c.nome.replace("Modelos de linguagem (LLMs)", "LLM").replace("Inteligência artificial", "IA por regra").replace("Aprendizado de máquina", "Machine learning").replace("Aprendizado profundo", "Aprend. profundo"))}</button>`).join("")}</div><p class="ia-fb" role="status" aria-live="polite"></p><div class="row"><button class="btn alt ia-prox" type="button">Próximo caso</button></div><p class="ia-placar"></p></div>`;
    const caso = panel.querySelector(".ia-caso"), fb = panel.querySelector(".ia-fb"), placar = panel.querySelector(".ia-placar"), ops = [...panel.querySelectorAll(".ia-op")];
    function mostrar() {
      const k = CASOS[atual], feito = resolvidos.has(atual);
      caso.textContent = `Caso ${atual + 1} de ${CASOS.length}: ${k.t}`;
      ops.forEach(o => { o.className = "ia-op"; o.disabled = feito; if (feito && o.dataset.c === k.r) o.classList.add("ok"); });
      fb.className = "ia-fb" + (feito ? " bom" : ""); fb.textContent = feito ? "Certo: " + k.why : "";
      placar.textContent = `Acertos: ${resolvidos.size} de ${CASOS.length} · Tentativas erradas: ${erros}`;
    }
    ops.forEach(o => o.onclick = () => {
      const k = CASOS[atual], id = o.dataset.c;
      if (id === k.r) { resolvidos.add(atual); mostrar(); }
      else { erros++; o.classList.add("no"); o.disabled = true; fb.className = "ia-fb ruim"; fb.textContent = `${porId[id].nome}: ${porId[id].curto}. Esse caso pede outra coisa. Pista: ${k.pista}.`; placar.textContent = `Acertos: ${resolvidos.size} de ${CASOS.length} · Tentativas erradas: ${erros}`; }
    });
    panel.querySelector(".ia-prox").onclick = () => { atual = (atual + 1) % CASOS.length; mostrar(); };
    mostrar();

    kit("ia-base", extra, {
      state: () => ({visto: [...visto].sort(), certos: [...resolvidos].sort(), erros, sel}),
      goals: [
        {t: "Abra os sete blocos do mapa e leia cada definição, exemplo e armadilha.", ok: s => s.visto.length >= C.length, win: () => "Mapa completo: da regra escrita à mão até o agente com guardrails, cada peça resolve um tipo de problema."},
        {t: "Acerte 3 casos do questionário.", ok: s => s.certos.length >= 3, win: () => "Três casos certos. O truque é perguntar: a regra vem de exemplos, de texto, dos meus documentos ou de ações?"},
        {t: "Acerte os 7 casos, um para cada conceito.", ok: s => s.certos.length >= CASOS.length, win: () => "Todos certos: você já separa IA, ML, aprendizado profundo, LLM, RAG, agente e guardrail."}
      ],
      react: s => s.sel && !s.certos.length ? ["Cada bloco está dentro do anterior. Veja a armadilha, ela diz onde o conceito falha.", "thinking"] : s.certos.length ? ["Bom. Compare o caso com a definição curta do bloco.", "neutral"] : ["Toque em um bloco do mapa.", "neutral"]
    });
    return () => {};
  },
  formulas: [
    {nome: "Aprendizado de máquina", expressao: "exemplos (X, y) → modelo → previsão", significado: "O modelo ajusta seus parâmetros aos exemplos com resposta e depois prevê casos novos. Vale para dados parecidos com os do treino."},
    {nome: "Modelo de linguagem", expressao: "P(próximo token | texto até aqui)", significado: "O LLM calcula a probabilidade de cada próximo token dado o texto anterior e sorteia um. Repetindo, escreve frases inteiras."},
    {nome: "RAG", expressao: "resposta = LLM(pergunta + trechos buscados)", significado: "Antes de gerar, o sistema busca os trechos mais relevantes nos seus documentos e os entrega ao modelo. A qualidade da resposta depende da qualidade da busca."},
    {nome: "Agente", expressao: "observar → decidir → agir → repetir até a meta", significado: "Um LLM em laço escolhe ações e chama ferramentas. Se cada passo acerta com probabilidade p, n passos acertam com p elevado a n."},
    {nome: "Guardrail", expressao: "entrada → modelo → saída verificada", significado: "Uma checagem na entrada ou na saída decide entre liberar, corrigir, bloquear ou chamar um humano. Mede-se por falsos alarmes e casos que escapam."}
  ],
  exemplos: [
    {titulo: "Quanto do manual o modelo lê no RAG", enunciado: "Um manual tem 90.000 palavras, dividido em trechos de 300 palavras. A busca devolve os 4 trechos mais relevantes para cada pergunta. Quantos trechos existem e que fração do manual o LLM lê?", passos: ["Número de trechos: 90.000 ÷ 300 = 300.", "Palavras entregues ao modelo: 4 × 300 = 1.200.", "Fração do manual: 1.200 ÷ 90.000 = 0,0133, ou cerca de 1,3%."], resultado: "São 300 trechos, e o LLM lê 1.200 palavras (cerca de 1,3% do manual). Por isso a busca precisa acertar os trechos."},
    {titulo: "Guardrail: o que passa e o que bloqueia", enunciado: "De 1.000 respostas, 50 continham dado pessoal. O filtro bloqueou 45 delas e também bloqueou 20 respostas legítimas. Calcule recall, precisão e o que escapou.", passos: ["Dados pessoais barrados (VP) = 45. Escaparam (FN) = 50 − 45 = 5.", "Falsos alarmes (FP) = 20, entre as 950 respostas legítimas.", "Recall = 45 ÷ 50 = 0,9. Precisão = 45 ÷ (45 + 20) = 45 ÷ 65 ≈ 0,69. Taxa de falsos alarmes = 20 ÷ 950 ≈ 2,1%."], resultado: "O filtro pega 90% dos vazamentos, mas 5 passam e cerca de 31% dos bloqueios são engano. Apertar o limiar troca uns erros pelos outros."}
  ],
  exercicios: [
    {pergunta: "Um agente executa 5 passos em sequência e cada passo acerta com probabilidade 0,95. Qual é a chance de os 5 passos estarem certos?", resposta: "Cerca de 0,77 (77%)", explicacao: "Os acertos se multiplicam: 0,95 elevado a 5 = 0,7738. Mesmo com 95% por passo, a chance de a cadeia toda estar certa cai para pouco mais de três quartos."},
    {pergunta: "Prever o preço da saca de soja da próxima semana com dez anos de histórico: qual conceito se aplica?", resposta: "Aprendizado de máquina (regressão)", explicacao: "Há exemplos históricos e um número a prever. Um LLM não é a ferramenta natural para isso, e uma regra fixa não captura o padrão."},
    {pergunta: "A política de reembolso da empresa muda toda semana e o assistente precisa responder sempre com a versão atual. RAG ou treinar o modelo de novo?", resposta: "RAG", explicacao: "Com RAG basta atualizar os documentos indexados. Retreinar o modelo toda semana é caro e lento, e ele pode continuar citando a versão antiga."}
  ],
  erros: [
    {erro: "IA, machine learning e LLM querem dizer a mesma coisa.", correcao: "São camadas: IA contém ML, que contém aprendizado profundo, que contém os LLMs. Todo LLM é IA, mas nem toda IA é LLM nem aprende com dados."},
    {erro: "Se o modelo respondeu com segurança e bom português, a resposta está certa.", correcao: "Um LLM é treinado para soar plausível. Confira com a fonte: use RAG com citação do trecho, valide a saída e peça revisão humana quando o erro tiver custo."},
    {erro: "Com um guardrail instalado, o sistema está seguro.", correcao: "O guardrail reduz risco e deixa passar alguns casos. Meça os falsos alarmes e os casos que escapam, ajuste o limiar e combine com limites de ação e revisão humana."}
  ],
  fontes: [
    {titulo: "Introduction to Large Language Models", url: "https://developers.google.com/machine-learning/crash-course/llm", origem: "Google for Developers (Machine Learning Crash Course)", idioma: "en", nivel: "iniciante", estude: "Veja o que é um LLM, o que são tokens e transformers, e quais limitações aparecem na prática."},
    {titulo: "Neural networks", url: "https://developers.google.com/machine-learning/crash-course/neural-networks", origem: "Google for Developers (Machine Learning Crash Course)", idioma: "en", nivel: "iniciante", estude: "Entenda camadas, ativação e como uma rede aprende atributos, a base do aprendizado profundo."},
    {titulo: "LLM Course: Introduction", url: "https://huggingface.co/learn/llm-course/chapter1/1", origem: "Hugging Face", idioma: "en", nivel: "intermediário", estude: "Situe os modelos de linguagem no ecossistema de NLP e veja o que o curso cobre, do uso ao ajuste."},
    {titulo: "Building effective AI agents", url: "https://www.anthropic.com/research/building-effective-agents", origem: "Anthropic", idioma: "en", nivel: "intermediário", estude: "Compare fluxos de trabalho fixos e agentes autônomos e veja quando vale a complexidade extra."},
    {titulo: "Retrieval Augmented Generation (RAG) on Databricks", url: "https://docs.databricks.com/aws/en/agents/retrieval-augmented-generation", origem: "Databricks", idioma: "en", nivel: "intermediário", estude: "Leia como funciona o RAG, com busca nos dados da empresa e geração da resposta pelo modelo."}
  ]
});
(window.CTX_TEXTO = window.CTX_TEXTO || {})["ia-base"] = {
  agro: "Um assistente que responde sobre o manual de defensivos usa RAG para citar o trecho. Um modelo de ML prevê a produtividade do talhão. Um guardrail impede recomendar dose acima do limite da bula.",
  publico: "Um assistente de atendimento ao cidadão pode usar RAG sobre a legislação vigente. Guardrails evitam expor dados pessoais e escalam para um servidor os casos que envolvem decisão sobre direitos.",
  engenharia: "Um modelo de ML prevê a falha de um motor a partir de sensores. Um agente pode abrir a ordem de serviço, e um guardrail exige aprovação humana antes de parar uma linha de produção.",
  dados: "Num lakehouse, ML treina em tabelas, embeddings alimentam a busca do RAG e agentes consultam ferramentas como SQL. Guardrails validam formato, permissões e dados sensíveis na entrada e na saída.",
  negocios: "Um LLM redige propostas, o RAG consulta o catálogo e as políticas atuais, e um agente cria o pedido no sistema. Guardrails limitam descontos e valores que o agente pode aprovar sozinho.",
  dia: "Corretor do celular que aprende seu jeito de escrever é ML, o assistente de conversa é um LLM, e o filtro que esconde mensagens suspeitas é um guardrail."
};
