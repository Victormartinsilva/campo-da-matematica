/* Roteiro do mini-video "SQL para analise" (metafora: duas fichas ligadas por um barbante; chave = id_posto). Tempos em segundos desde o inicio de cada peca.
   Numeros calculados por script sobre as tabelas do laboratorio (prog/sql-analise.js): 30 atendimentos, 5 postos; media de espera por posto Centro 26.75, Zona Rural 27.25 (acima de 25: 2 de 4 grupos);
   media geral 23.57, 15 atendimentos acima; piores casos ids 13, 18, 23 e 24; JOIN sem ON = 30 x 5 = 150 linhas. */
window.Explainers = window.Explainers || {};
Explainers["sql-analise"] = {
  "meta": {"id": "sql-analise", "categoria": "PROGRAMAÇÃO E DADOS", "area": "prog", "titulo": "SQL para análise", "duracao": 74, "cena": "sql-analise"},
  "pieces": [
    {
      "id": "pergunta",
      "ordem": 1,
      "narration": "Como cruzar duas tabelas, resumir por grupo e achar o pior caso de cada posto?",
      "words": [
        {"t": "Como", "s": 0.2, "e": 0.54, "hl": false},
        {"t": "cruzar", "s": 0.58, "e": 0.92, "hl": true},
        {"t": "duas", "s": 0.96, "e": 1.24, "hl": false},
        {"t": "tabelas,", "s": 1.28, "e": 1.68, "hl": true},
        {"t": "resumir", "s": 1.92, "e": 2.32, "hl": false},
        {"t": "por", "s": 2.36, "e": 2.64, "hl": false},
        {"t": "grupo", "s": 2.68, "e": 3.02, "hl": true},
        {"t": "e", "s": 3.06, "e": 3.34, "hl": false},
        {"t": "achar", "s": 3.38, "e": 3.72, "hl": false},
        {"t": "o", "s": 3.76, "e": 4.04, "hl": false},
        {"t": "pior", "s": 4.08, "e": 4.36, "hl": true},
        {"t": "caso", "s": 4.4, "e": 4.74, "hl": false},
        {"t": "de", "s": 4.78, "e": 5.06, "hl": false},
        {"t": "cada", "s": 5.1, "e": 5.44, "hl": false},
        {"t": "posto?", "s": 5.48, "e": 5.82, "hl": false}
      ],
      "dur": 7.02,
      "scene": [
        {"at": 0.2, "acao": "aparecer", "alvo": "guia", "dur": 0.7},
        {"at": 0.96, "acao": "aparecer", "alvo": "t-postos", "dur": 0.8},
        {"at": 1.28, "acao": "aparecer", "alvo": "t-atend", "dur": 0.8}
      ],
      "why": "Dados reais vivem em várias tabelas ligadas por uma chave."
    },
    {
      "id": "barbante",
      "ordem": 2,
      "narration": "O JOIN é um barbante que liga o atendimento ao posto pela chave, o id_posto.",
      "words": [
        {"t": "O", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "JOIN", "s": 0.52, "e": 0.8, "hl": true},
        {"t": "é", "s": 0.84, "e": 1.12, "hl": false},
        {"t": "um", "s": 1.16, "e": 1.44, "hl": false},
        {"t": "barbante", "s": 1.48, "e": 1.88, "hl": true},
        {"t": "que", "s": 1.92, "e": 2.2, "hl": false},
        {"t": "liga", "s": 2.24, "e": 2.58, "hl": false},
        {"t": "o", "s": 2.62, "e": 2.9, "hl": false},
        {"t": "atendimento", "s": 2.94, "e": 3.46, "hl": false},
        {"t": "ao", "s": 3.5, "e": 3.78, "hl": false},
        {"t": "posto", "s": 3.82, "e": 4.16, "hl": false},
        {"t": "pela", "s": 4.2, "e": 4.54, "hl": false},
        {"t": "chave,", "s": 4.58, "e": 4.92, "hl": true},
        {"t": "o", "s": 5.16, "e": 5.44, "hl": false},
        {"t": "id_posto.", "s": 5.48, "e": 5.88, "hl": true}
      ],
      "dur": 7.08,
      "terminal": {"cmd": "JOIN postos p ON p.id_posto = a.id_posto", "at": 0.52, "dur": 2.4},
      "status": {"tipo": "ok", "texto": "30 LINHAS: UMA POR ATENDIMENTO", "at": 4.58},
      "scene": [
        {"at": 0.52, "acao": "destacar", "alvo": "guia-braco", "dur": 1},
        {"at": 1.48, "acao": "desenhar", "alvo": "fios", "dur": 2},
        {"at": 4.58, "acao": "aparecer", "alvo": "chaves", "dur": 0.8}
      ],
      "why": "O JOIN reúne duas tabelas lado a lado pela chave."
    },
    {
      "id": "grupo",
      "ordem": 3,
      "narration": "O GROUP BY empilha as fichas de cada posto. A média do Centro dá vinte e seis vírgula setenta e cinco.",
      "words": [
        {"t": "O", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "GROUP", "s": 0.52, "e": 0.8, "hl": true},
        {"t": "BY", "s": 0.84, "e": 1.12, "hl": false},
        {"t": "empilha", "s": 1.16, "e": 1.56, "hl": false},
        {"t": "as", "s": 1.6, "e": 1.88, "hl": false},
        {"t": "fichas", "s": 1.92, "e": 2.26, "hl": false},
        {"t": "de", "s": 2.3, "e": 2.58, "hl": false},
        {"t": "cada", "s": 2.62, "e": 2.96, "hl": false},
        {"t": "posto.", "s": 3, "e": 3.34, "hl": true},
        {"t": "A", "s": 3.78, "e": 4.06, "hl": false},
        {"t": "média", "s": 4.1, "e": 4.44, "hl": true},
        {"t": "do", "s": 4.48, "e": 4.76, "hl": false},
        {"t": "Centro", "s": 4.8, "e": 5.14, "hl": false},
        {"t": "dá", "s": 5.18, "e": 5.46, "hl": false},
        {"t": "vinte", "s": 5.5, "e": 5.84, "hl": false},
        {"t": "e", "s": 5.88, "e": 6.16, "hl": false},
        {"t": "seis", "s": 6.2, "e": 6.48, "hl": false},
        {"t": "vírgula", "s": 6.52, "e": 6.92, "hl": false},
        {"t": "setenta", "s": 6.96, "e": 7.36, "hl": false},
        {"t": "e", "s": 7.4, "e": 7.68, "hl": false},
        {"t": "cinco.", "s": 7.72, "e": 8.06, "hl": false}
      ],
      "dur": 9.26,
      "terminal": {"cmd": "GROUP BY p.nome  -- AVG(a.espera_min)", "at": 0.52, "dur": 2.2},
      "status": {"tipo": "ok", "texto": "4 GRUPOS: UM POR POSTO", "at": 4.8},
      "scene": [
        {"at": 0.2, "acao": "sumir", "alvo": "mesa", "dur": 0.6},
        {"at": 0.52, "acao": "aparecer", "alvo": "barras", "dur": 1}
      ],
      "why": "GROUP BY transforma muitas linhas em uma linha por grupo."
    },
    {
      "id": "having",
      "ordem": 4,
      "narration": "O WHERE filtra linhas, o HAVING filtra grupos. Acima de vinte e cinco, só Centro e Zona Rural.",
      "words": [
        {"t": "O", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "WHERE", "s": 0.52, "e": 0.86, "hl": true},
        {"t": "filtra", "s": 0.9, "e": 1.24, "hl": false},
        {"t": "linhas,", "s": 1.28, "e": 1.62, "hl": false},
        {"t": "o", "s": 1.86, "e": 2.14, "hl": false},
        {"t": "HAVING", "s": 2.18, "e": 2.52, "hl": true},
        {"t": "filtra", "s": 2.56, "e": 2.9, "hl": false},
        {"t": "grupos.", "s": 2.94, "e": 3.28, "hl": true},
        {"t": "Acima", "s": 3.72, "e": 4.12, "hl": false},
        {"t": "de", "s": 4.16, "e": 4.44, "hl": false},
        {"t": "vinte", "s": 4.48, "e": 4.82, "hl": false},
        {"t": "e", "s": 4.86, "e": 5.14, "hl": false},
        {"t": "cinco,", "s": 5.18, "e": 5.52, "hl": false},
        {"t": "só", "s": 5.76, "e": 6.04, "hl": false},
        {"t": "Centro", "s": 6.08, "e": 6.42, "hl": false},
        {"t": "e", "s": 6.46, "e": 6.74, "hl": false},
        {"t": "Zona", "s": 6.78, "e": 7.12, "hl": false},
        {"t": "Rural.", "s": 7.16, "e": 7.5, "hl": false}
      ],
      "dur": 8.7,
      "terminal": {"cmd": "HAVING AVG(a.espera_min) > 25", "at": 2.18, "dur": 2.2},
      "status": {"tipo": "ok", "texto": "2 DE 4 GRUPOS PASSAM", "at": 6.78},
      "scene": [
        {"at": 2.18, "acao": "desenhar", "alvo": "corte-linha", "dur": 1},
        {"at": 2.18, "acao": "aparecer", "alvo": "corte", "dur": 0.4},
        {
          "at": 5.76,
          "acao": "cor",
          "alvo": "bar-1",
          "dur": 0.8,
          "para": {"fill": "--rule-soft", "stroke": "--rule-strong"}
        },
        {
          "at": 5.76,
          "acao": "cor",
          "alvo": "bar-3",
          "dur": 0.8,
          "para": {"fill": "--rule-soft", "stroke": "--rule-strong"}
        },
        {
          "at": 6.08,
          "acao": "cor",
          "alvo": "bar-0",
          "dur": 0.8,
          "para": {"fill": "--leaf"}
        },
        {
          "at": 6.78,
          "acao": "cor",
          "alvo": "bar-2",
          "dur": 0.8,
          "para": {"fill": "--leaf"}
        }
      ],
      "why": "WHERE roda antes de agrupar, HAVING depois: só ele enxerga a média."
    },
    {
      "id": "subconsulta",
      "ordem": 5,
      "narration": "A subconsulta calcula antes a média geral, vinte e três vírgula cinquenta e sete. Quinze atendimentos passam dela.",
      "words": [
        {"t": "A", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "subconsulta", "s": 0.52, "e": 0.98, "hl": true},
        {"t": "calcula", "s": 1.02, "e": 1.42, "hl": false},
        {"t": "antes", "s": 1.46, "e": 1.8, "hl": false},
        {"t": "a", "s": 1.84, "e": 2.12, "hl": false},
        {"t": "média", "s": 2.16, "e": 2.5, "hl": true},
        {"t": "geral,", "s": 2.54, "e": 2.88, "hl": false},
        {"t": "vinte", "s": 3.12, "e": 3.46, "hl": false},
        {"t": "e", "s": 3.5, "e": 3.78, "hl": false},
        {"t": "três", "s": 3.82, "e": 4.1, "hl": false},
        {"t": "vírgula", "s": 4.14, "e": 4.54, "hl": false},
        {"t": "cinquenta", "s": 4.58, "e": 4.98, "hl": false},
        {"t": "e", "s": 5.02, "e": 5.3, "hl": false},
        {"t": "sete.", "s": 5.34, "e": 5.68, "hl": false},
        {"t": "Quinze", "s": 6.12, "e": 6.46, "hl": true},
        {"t": "atendimentos", "s": 6.5, "e": 7.02, "hl": false},
        {"t": "passam", "s": 7.06, "e": 7.4, "hl": false},
        {"t": "dela.", "s": 7.44, "e": 7.78, "hl": false}
      ],
      "dur": 8.98,
      "terminal": {"cmd": "WHERE x > (SELECT AVG(x) FROM tabela)", "at": 0.2, "dur": 2.4},
      "status": {"tipo": "ok", "texto": "15 DE 30 ACIMA DA MÉDIA", "at": 6.12},
      "scene": [
        {"at": 0.2, "acao": "sumir", "alvo": "barras", "dur": 0.6},
        {"at": 0.2, "acao": "sumir", "alvo": "corte", "dur": 0.6},
        {"at": 0.2, "acao": "aparecer", "alvo": "plot", "dur": 0.9},
        {"at": 2.16, "acao": "desenhar", "alvo": "linha-media", "dur": 1.2},
        {"at": 6.12, "acao": "aparecer", "alvo": "pontos-cima", "dur": 0.9}
      ],
      "why": "A subconsulta roda primeiro e entrega um número para comparar."
    },
    {
      "id": "janela",
      "ordem": 6,
      "narration": "A janela numera os atendimentos dentro de cada posto. O número um é o pior caso.",
      "words": [
        {"t": "A", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "janela", "s": 0.52, "e": 0.92, "hl": true},
        {"t": "numera", "s": 0.96, "e": 1.36, "hl": false},
        {"t": "os", "s": 1.4, "e": 1.68, "hl": false},
        {"t": "atendimentos", "s": 1.72, "e": 2.24, "hl": false},
        {"t": "dentro", "s": 2.28, "e": 2.62, "hl": false},
        {"t": "de", "s": 2.66, "e": 2.94, "hl": false},
        {"t": "cada", "s": 2.98, "e": 3.32, "hl": false},
        {"t": "posto.", "s": 3.36, "e": 3.7, "hl": false},
        {"t": "O", "s": 4.14, "e": 4.42, "hl": false},
        {"t": "número", "s": 4.46, "e": 4.86, "hl": false},
        {"t": "um", "s": 4.9, "e": 5.18, "hl": true},
        {"t": "é", "s": 5.22, "e": 5.5, "hl": false},
        {"t": "o", "s": 5.54, "e": 5.82, "hl": false},
        {"t": "pior", "s": 5.86, "e": 6.14, "hl": true},
        {"t": "caso.", "s": 6.18, "e": 6.52, "hl": false}
      ],
      "dur": 7.72,
      "terminal": {"cmd": "OVER (PARTITION BY id_posto ORDER BY min DESC)", "at": 0.52, "dur": 3},
      "status": {"tipo": "ok", "texto": "IDS 13, 18, 23 E 24", "at": 5.86},
      "scene": [
        {"at": 0.2, "acao": "sumir", "alvo": "plot", "dur": 0.6},
        {"at": 0.2, "acao": "sumir", "alvo": "linha-media", "dur": 0.6},
        {"at": 0.52, "acao": "aparecer", "alvo": "colunas", "dur": 0.9},
        {"at": 4.9, "acao": "aparecer", "alvo": "topos", "dur": 0.8},
        {"at": 5.86, "acao": "destacar", "alvo": "topos", "dur": 1}
      ],
      "why": "A janela mantém todas as linhas e ainda ranqueia dentro do grupo."
    },
    {
      "id": "armadilha",
      "ordem": 7,
      "narration": "Esqueceu o ON? Cada atendimento liga a todos os postos: trinta vezes cinco dá cento e cinquenta linhas.",
      "words": [
        {"t": "Esqueceu", "s": 0.2, "e": 0.6, "hl": false},
        {"t": "o", "s": 0.64, "e": 0.92, "hl": false},
        {"t": "ON?", "s": 0.96, "e": 1.24, "hl": true},
        {"t": "Cada", "s": 1.68, "e": 2.02, "hl": false},
        {"t": "atendimento", "s": 2.06, "e": 2.58, "hl": false},
        {"t": "liga", "s": 2.62, "e": 2.96, "hl": false},
        {"t": "a", "s": 3, "e": 3.28, "hl": false},
        {"t": "todos", "s": 3.32, "e": 3.66, "hl": false},
        {"t": "os", "s": 3.7, "e": 3.98, "hl": false},
        {"t": "postos:", "s": 4.02, "e": 4.36, "hl": false},
        {"t": "trinta", "s": 4.6, "e": 4.94, "hl": false},
        {"t": "vezes", "s": 4.98, "e": 5.32, "hl": false},
        {"t": "cinco", "s": 5.36, "e": 5.7, "hl": false},
        {"t": "dá", "s": 5.74, "e": 6.02, "hl": false},
        {"t": "cento", "s": 6.06, "e": 6.4, "hl": true},
        {"t": "e", "s": 6.44, "e": 6.72, "hl": false},
        {"t": "cinquenta", "s": 6.76, "e": 7.16, "hl": false},
        {"t": "linhas.", "s": 7.2, "e": 7.54, "hl": true}
      ],
      "dur": 8.74,
      "terminal": {"cmd": "FROM atendimentos, postos  -- sem ON", "at": 0.2, "dur": 2.2},
      "status": {"tipo": "erro", "texto": "150 LINHAS, ERA PARA SER 30", "at": 6.06},
      "scene": [
        {"at": 0.2, "acao": "sumir", "alvo": "colunas", "dur": 0.6},
        {"at": 0.2, "acao": "sumir", "alvo": "topos", "dur": 0.6},
        {"at": 0.2, "acao": "aparecer", "alvo": "cruza", "dur": 0.9},
        {"at": 2.62, "acao": "desenhar", "alvo": "cruza-fios", "dur": 1.6},
        {"at": 6.06, "acao": "destacar", "alvo": "cruza-total", "dur": 1}
      ],
      "why": "Sem ON o resultado incha em silêncio. Depois de um JOIN, confira a contagem de linhas."
    },
    {
      "id": "ia",
      "ordem": 8,
      "narration": "Na camada prata do Databricks ou do Fabric, essas consultas montam a tabela de variáveis do modelo.",
      "words": [
        {"t": "Na", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "camada", "s": 0.52, "e": 0.92, "hl": false},
        {"t": "prata", "s": 0.96, "e": 1.3, "hl": true},
        {"t": "do", "s": 1.34, "e": 1.62, "hl": false},
        {"t": "Databricks", "s": 1.66, "e": 2.06, "hl": true},
        {"t": "ou", "s": 2.1, "e": 2.38, "hl": false},
        {"t": "do", "s": 2.42, "e": 2.7, "hl": false},
        {"t": "Fabric,", "s": 2.74, "e": 3.08, "hl": false},
        {"t": "essas", "s": 3.32, "e": 3.66, "hl": false},
        {"t": "consultas", "s": 3.7, "e": 4.1, "hl": false},
        {"t": "montam", "s": 4.14, "e": 4.48, "hl": false},
        {"t": "a", "s": 4.52, "e": 4.8, "hl": false},
        {"t": "tabela", "s": 4.84, "e": 5.24, "hl": true},
        {"t": "de", "s": 5.28, "e": 5.56, "hl": false},
        {"t": "variáveis", "s": 5.6, "e": 6, "hl": false},
        {"t": "do", "s": 6.04, "e": 6.32, "hl": false},
        {"t": "modelo.", "s": 6.36, "e": 6.76, "hl": true}
      ],
      "dur": 7.96,
      "terminal": {"cmd": "CREATE TABLE variaveis AS SELECT ...", "at": 0.2, "dur": 2.2},
      "status": {"tipo": "ok", "texto": "4 LINHAS PRONTAS PARA O MODELO", "at": 4.84},
      "scene": [
        {"at": 0.2, "acao": "sumir", "alvo": "cruza", "dur": 0.6},
        {"at": 0.2, "acao": "aparecer", "alvo": "ia", "dur": 0.9},
        {"at": 6.36, "acao": "desenhar", "alvo": "ia-seta", "dur": 0.7},
        {"at": 6.36, "acao": "aparecer", "alvo": "ia-modelo", "dur": 0.8}
      ],
      "why": "Para IA, JOIN, GROUP BY e janela montam as variáveis de entrada."
    }
  ],
  "outro": {
    "dur": 9,
    "narration": "O JOIN liga, o GROUP BY resume, a subconsulta compara e a janela ranqueia. Agora mexa no laboratório.",
    "words": [
      {"t": "O", "s": 0.2, "e": 0.48, "hl": false},
      {"t": "JOIN", "s": 0.52, "e": 0.8, "hl": false},
      {"t": "liga,", "s": 0.84, "e": 1.18, "hl": false},
      {"t": "o", "s": 1.42, "e": 1.7, "hl": false},
      {"t": "GROUP", "s": 1.74, "e": 2.02, "hl": false},
      {"t": "BY", "s": 2.06, "e": 2.34, "hl": false},
      {"t": "resume,", "s": 2.38, "e": 2.78, "hl": false},
      {"t": "a", "s": 3.02, "e": 3.3, "hl": false},
      {"t": "subconsulta", "s": 3.34, "e": 3.8, "hl": false},
      {"t": "compara", "s": 3.84, "e": 4.24, "hl": false},
      {"t": "e", "s": 4.28, "e": 4.56, "hl": false},
      {"t": "a", "s": 4.6, "e": 4.88, "hl": false},
      {"t": "janela", "s": 4.92, "e": 5.32, "hl": false},
      {"t": "ranqueia.", "s": 5.36, "e": 5.7, "hl": false},
      {"t": "Agora", "s": 6.14, "e": 6.54, "hl": false},
      {"t": "mexa", "s": 6.58, "e": 6.92, "hl": false},
      {"t": "no", "s": 6.96, "e": 7.24, "hl": false},
      {"t": "laboratório.", "s": 7.28, "e": 7.8, "hl": false}
    ],
    "scene": [
      {"at": 0.2, "acao": "sumir", "alvo": "ia", "dur": 0.6},
      {"at": 0.2, "acao": "sumir", "alvo": "ia-seta", "dur": 0.6},
      {"at": 0.2, "acao": "sumir", "alvo": "ia-modelo", "dur": 0.6},
      {"at": 0.52, "acao": "aparecer", "alvo": "res-0", "dur": 0.5},
      {"at": 1.74, "acao": "aparecer", "alvo": "res-1", "dur": 0.5},
      {"at": 3.34, "acao": "aparecer", "alvo": "res-2", "dur": 0.5},
      {"at": 4.92, "acao": "aparecer", "alvo": "res-3", "dur": 0.5},
      {"at": 7.28, "acao": "destacar", "alvo": "guia-braco", "dur": 1.2}
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {"cmd": "SELECT p.nome,\n  AVG(a.espera_min) AS media\nFROM atendimentos a\nJOIN postos p\n  ON p.id_posto = a.id_posto\nGROUP BY p.nome\nHAVING AVG(a.espera_min) > 25;", "at": 0.2, "dur": 5.2}
  }
};
