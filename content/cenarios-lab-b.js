/* Cenários dos laboratórios regressao, embeddings, atencao e token por contexto (agro, publico, engenharia, dados, negocios).
   Carregado depois de cenarios-outros.js. A matemática de cada laboratório é a mesma em todos os contextos; mudam rótulos, unidades e itens.
   O contrato geral e a função cenarios() estão em cenarios.js.

   regressao: {xn, yn, xl, yl, wu, bu, b, w, ruido, margem, wMin, wMax, wStep, bMin, bMax, bStep, b0}
     os dados são y = b + w·x + ruído·N(0,1) com x centrado em [-2, 2]; xn/yn = nomes curtos (para a descrição acessível);
     wu/bu = unidades da inclinação e do intercepto; margem = folga vertical do gráfico; b0 = intercepto inicial (e do "Zerar").
   embeddings: {docs: [[título, rótulo curto] x 6], alvo, alvoA}
     as posições 2D são fixas no laboratório: docs 0-1 formam um grupo, 2-3 outro, 4-5 o grupo de IA; o doc 5 é o alvo do desafio.
   atencao: {tokens: [6 palavras]} na estrutura: artigo, sujeito, verbo, preposição, complemento, ponto.
   token: {prompt, tokens: [[palavra, logit] x 8]} */
Object.assign(CENARIOS, {
  regressao: {
    agro: {xn: "chuva do ciclo", yn: "produtividade", xl: "chuva do ciclo (centenas de mm, centrada em 5)", yl: "produtividade (sc/ha)", wu: "sc/ha por 100 mm", bu: "sc/ha",
      b: 60, w: 8, ruido: 6, margem: 20, wMin: -5, wMax: 20, wStep: 0.1, bMin: 0, bMax: 100, bStep: 0.5, b0: 40},
    publico: {xn: "agentes de saúde", yn: "cobertura vacinal", xl: "agentes de saúde por mil habitantes (centrado em 3)", yl: "cobertura vacinal (%)", wu: "pontos percentuais por agente", bu: "%",
      b: 70, w: 6, ruido: 4, margem: 10, wMin: -5, wMax: 20, wStep: 0.1, bMin: 0, bMax: 100, bStep: 0.5, b0: 50},
    engenharia: {xn: "carga aplicada", yn: "comprimento da mola", xl: "carga aplicada (centenas de N, centrada em 5)", yl: "comprimento da mola (mm)", wu: "mm por 100 N", bu: "mm",
      b: 120, w: 12, ruido: 5, margem: 20, wMin: -10, wMax: 40, wStep: 0.1, bMin: 0, bMax: 200, bStep: 0.5, b0: 80},
    dados: {xn: "carga do serviço", yn: "latência", xl: "carga do serviço (centenas de req/s, centrada em 5)", yl: "latência p95 (ms)", wu: "ms por 100 req/s", bu: "ms",
      b: 180, w: 25, ruido: 15, margem: 50, wMin: -20, wMax: 60, wStep: 0.5, bMin: 0, bMax: 300, bStep: 1, b0: 120},
    negocios: {xn: "gasto em anúncios", yn: "vendas", xl: "gasto em anúncios (R$ mil por semana, centrado em 5)", yl: "vendas (un/semana)", wu: "un por R$ mil", bu: "un",
      b: 400, w: 50, ruido: 30, margem: 100, wMin: -50, wMax: 150, wStep: 1, bMin: 0, bMax: 800, bStep: 2, b0: 250}
  },
  embeddings: {
    agro: {docs: [["Adubação nitrogenada em milho", "Adubação N"], ["Irrigação por gotejamento", "Irrigação"], ["Tabelas Delta no Databricks", "Delta"], ["Modelo semântico do Power BI", "Power BI"], ["Guardrails para LLM", "Guardrails"], ["RAG: busca vetorial e reranking", "RAG"]], alvo: "RAG", alvoA: "O RAG"},
    publico: {docs: [["Calendário de vacinação infantil", "Vacinação"], ["Busca ativa de gestantes no pré-natal", "Pré-natal"], ["Execução orçamentária da prefeitura", "Verba"], ["Licitações no portal da transparência", "Licitações"], ["Regras de uso de IA no atendimento ao cidadão", "Regras de IA"], ["Busca em decretos e normas com RAG", "Busca em normas"]], alvo: "busca em normas", alvoA: "A busca em normas"},
    engenharia: {docs: [["Dimensionamento de vigas de aço", "Vigas"], ["Cálculo de pilares de concreto", "Pilares"], ["Manutenção preditiva de motores", "Motores"], ["Sensores de vibração em mancais", "Vibração"], ["Revisão humana de cálculos gerados por IA", "Revisão de IA"], ["Busca em normas técnicas com RAG", "RAG de normas"]], alvo: "RAG de normas", alvoA: "O RAG de normas"},
    dados: {docs: [["Qualidade de dados: nulos e duplicatas", "Qualidade"], ["Particionamento de tabelas grandes", "Partições"], ["Tabelas Delta no Databricks", "Delta"], ["Modelo semântico do Power BI", "Power BI"], ["Guardrails para LLM", "Guardrails"], ["RAG: busca vetorial e reranking", "RAG"]], alvo: "RAG", alvoA: "O RAG"},
    negocios: {docs: [["Precificação por margem de contribuição", "Preço"], ["Previsão de demanda semanal", "Demanda"], ["Fluxo de caixa mensal", "Caixa"], ["Painel de vendas por região", "Painel de vendas"], ["Política de uso de IA com dados de clientes", "Política de IA"], ["Busca em contratos e propostas com RAG", "RAG de contratos"]], alvo: "RAG de contratos", alvoA: "O RAG de contratos"}
  },
  atencao: {
    agro: {tokens: ["o", "milho", "precisa", "de", "nitrogênio", "."]},
    publico: {tokens: ["o", "município", "precisa", "de", "vacinas", "."]},
    engenharia: {tokens: ["o", "motor", "precisa", "de", "óleo", "."]},
    dados: {tokens: ["o", "modelo", "precisa", "de", "dados", "."]},
    negocios: {tokens: ["a", "empresa", "precisa", "de", "capital", "."]}
  },
  token: {
    agro: {prompt: "o milho precisa de", tokens: [["nitrogênio", 4.2], ["água", 3.9], ["luz", 3.1], ["fósforo", 2.9], ["sol", 2.0], [".", 0.5], ["carro", -1], ["banco", -2]]},
    publico: {prompt: "a prefeitura precisa de", tokens: [["orçamento", 4.2], ["pessoal", 3.9], ["dados", 3.1], ["vacinas", 2.9], ["prazo", 2.0], [".", 0.5], ["foguete", -1], ["samba", -2]]},
    engenharia: {prompt: "a viga precisa de", tokens: [["reforço", 4.2], ["apoio", 3.9], ["aço", 3.1], ["cálculo", 2.9], ["tempo", 2.0], [".", 0.5], ["sorvete", -1], ["poema", -2]]},
    dados: {prompt: "o modelo precisa de", tokens: [["dados", 4.2], ["treino", 3.9], ["memória", 3.1], ["contexto", 2.9], ["GPU", 2.0], [".", 0.5], ["feijão", -1], ["sofá", -2]]},
    negocios: {prompt: "a empresa precisa de", tokens: [["capital", 4.2], ["clientes", 3.9], ["caixa", 3.1], ["estoque", 2.9], ["marca", 2.0], [".", 0.5], ["vulcão", -1], ["poema", -2]]}
  }
});
