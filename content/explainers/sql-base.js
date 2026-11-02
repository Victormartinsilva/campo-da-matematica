/* Roteiro do mini-video "SQL do zero" (metafora: um fichario em que se pede "me de so as fichas que..."). Tempos em segundos desde o inicio de cada peca.
   Numeros calculados por script a partir da tabela pedidos de prog/sql-base.js: 24 linhas; 18 entregues; soma 1.226,45; top 3 299,80, 129,90, 91,00; 21 sem cupom. */
window.Explainers = window.Explainers || {};
Explainers["sql-base"] = {
  "meta": {
    "id": "sql-base",
    "categoria": "PROGRAMAÇÃO E DADOS",
    "area": "prog",
    "titulo": "SQL do zero",
    "duracao": 73,
    "cena": "sql-base"
  },
  "pieces": [
    {
      "id": "pergunta",
      "ordem": 1,
      "narration": "Como perguntar a uma tabela de 24 linhas, ou de 24 milhões, usando as mesmas poucas palavras?",
      "words": [
        {"t": "Como", "s": 0.2, "e": 0.54, "hl": false},
        {"t": "perguntar", "s": 0.58, "e": 0.98, "hl": false},
        {"t": "a", "s": 1.02, "e": 1.3, "hl": false},
        {"t": "uma", "s": 1.34, "e": 1.68, "hl": false},
        {"t": "tabela", "s": 1.72, "e": 2.12, "hl": true},
        {"t": "de", "s": 2.16, "e": 2.44, "hl": false},
        {"t": "24", "s": 2.48, "e": 2.76, "hl": false},
        {"t": "linhas,", "s": 2.8, "e": 3.14, "hl": true},
        {"t": "ou", "s": 3.38, "e": 3.66, "hl": false},
        {"t": "de", "s": 3.7, "e": 3.98, "hl": false},
        {"t": "24", "s": 4.02, "e": 4.3, "hl": false},
        {"t": "milhões,", "s": 4.34, "e": 4.68, "hl": true},
        {"t": "usando", "s": 4.92, "e": 5.32, "hl": false},
        {"t": "as", "s": 5.36, "e": 5.64, "hl": false},
        {"t": "mesmas", "s": 5.68, "e": 6.02, "hl": false},
        {"t": "poucas", "s": 6.06, "e": 6.4, "hl": false},
        {"t": "palavras?", "s": 6.44, "e": 6.84, "hl": true}
      ],
      "dur": 8.04,
      "scene": [
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "guia",
          "dur": 0.7
        },
        {
          "at": 1.72,
          "acao": "aparecer",
          "alvo": "fichario",
          "dur": 0.8
        },
        {
          "at": 2.48,
          "acao": "aparecer",
          "alvo": "fichas",
          "dur": 1
        },
        {
          "at": 2.8,
          "acao": "destacar",
          "alvo": "fichas",
          "dur": 0.9
        },
        {
          "at": 4.34,
          "acao": "aparecer",
          "alvo": "rot-milhoes",
          "dur": 0.7
        }
      ],
      "why": "A mesma meia dúzia de palavras serve para poucas linhas ou para milhões."
    },
    {
      "id": "fichario",
      "ordem": 2,
      "narration": "Pense num fichário: cada ficha é um pedido. Em SQL você diz: me dê só as fichas entregues.",
      "words": [
        {"t": "Pense", "s": 0.2, "e": 0.54, "hl": false},
        {"t": "num", "s": 0.58, "e": 0.86, "hl": false},
        {"t": "fichário:", "s": 0.9, "e": 1.3, "hl": true},
        {"t": "cada", "s": 1.54, "e": 1.88, "hl": false},
        {"t": "ficha", "s": 1.92, "e": 2.26, "hl": true},
        {"t": "é", "s": 2.3, "e": 2.58, "hl": false},
        {"t": "um", "s": 2.62, "e": 2.9, "hl": false},
        {"t": "pedido.", "s": 2.94, "e": 3.34, "hl": true},
        {"t": "Em", "s": 3.78, "e": 4.06, "hl": false},
        {"t": "SQL", "s": 4.1, "e": 4.38, "hl": false},
        {"t": "você", "s": 4.42, "e": 4.76, "hl": false},
        {"t": "diz:", "s": 4.8, "e": 5.08, "hl": false},
        {"t": "me", "s": 5.32, "e": 5.6, "hl": false},
        {"t": "dê", "s": 5.64, "e": 5.92, "hl": false},
        {"t": "só", "s": 5.96, "e": 6.24, "hl": false},
        {"t": "as", "s": 6.28, "e": 6.56, "hl": false},
        {"t": "fichas", "s": 6.6, "e": 6.94, "hl": false},
        {"t": "entregues.", "s": 6.98, "e": 7.38, "hl": true}
      ],
      "dur": 8.58,
      "status": {
        "tipo": "ok",
        "texto": "UMA FICHA = UM PEDIDO",
        "at": 1.54
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-milhoes",
          "dur": 0.5
        },
        {
          "at": 1.92,
          "acao": "destacar",
          "alvo": "f-13",
          "dur": 1
        },
        {
          "at": 4.8,
          "acao": "aparecer",
          "alvo": "balao",
          "dur": 0.7
        },
        {
          "at": 6.98,
          "acao": "destacar",
          "alvo": "fichas-entregue",
          "dur": 1
        }
      ],
      "why": "Você descreve o que quer e o banco decide como buscar."
    },
    {
      "id": "select-where",
      "ordem": 3,
      "narration": "O SELECT escolhe as colunas. O WHERE filtra as linhas: ficam só as fichas com status entregue.",
      "words": [
        {"t": "O", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "SELECT", "s": 0.52, "e": 0.86, "hl": true},
        {"t": "escolhe", "s": 0.9, "e": 1.3, "hl": false},
        {"t": "as", "s": 1.34, "e": 1.62, "hl": false},
        {"t": "colunas.", "s": 1.66, "e": 2.06, "hl": true},
        {"t": "O", "s": 2.5, "e": 2.78, "hl": false},
        {"t": "WHERE", "s": 2.82, "e": 3.16, "hl": true},
        {"t": "filtra", "s": 3.2, "e": 3.54, "hl": false},
        {"t": "as", "s": 3.58, "e": 3.86, "hl": false},
        {"t": "linhas:", "s": 3.9, "e": 4.24, "hl": false},
        {"t": "ficam", "s": 4.48, "e": 4.82, "hl": false},
        {"t": "só", "s": 4.86, "e": 5.14, "hl": false},
        {"t": "as", "s": 5.18, "e": 5.46, "hl": false},
        {"t": "fichas", "s": 5.5, "e": 5.84, "hl": false},
        {"t": "com", "s": 5.88, "e": 6.16, "hl": false},
        {"t": "status", "s": 6.2, "e": 6.54, "hl": false},
        {"t": "entregue.", "s": 6.58, "e": 6.98, "hl": true}
      ],
      "dur": 8.18,
      "terminal": {
        "cmd": "WHERE status = 'entregue'",
        "at": 2.82,
        "dur": 1.8
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "balao",
          "dur": 0.4
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "colunas",
          "dur": 0.7
        },
        {
          "at": 2.82,
          "acao": "sumir",
          "alvo": "colunas",
          "dur": 0.5
        },
        {
          "at": 6.2,
          "acao": "aparecer",
          "alvo": "legenda",
          "dur": 0.7
        },
        {
          "at": 4.48,
          "acao": "sumir",
          "alvo": "fichas-outras",
          "dur": 0.9
        },
        {
          "at": 6.58,
          "acao": "destacar",
          "alvo": "fichas-entregue",
          "dur": 1
        }
      ],
      "why": "SELECT escolhe colunas, WHERE escolhe linhas."
    },
    {
      "id": "ordem",
      "ordem": 4,
      "narration": "Depois, ORDER BY ordena do maior total para o menor, e LIMIT 3 guarda só as três primeiras.",
      "words": [
        {"t": "Depois,", "s": 0.2, "e": 0.54, "hl": false},
        {"t": "ORDER", "s": 0.78, "e": 1.12, "hl": false},
        {"t": "BY", "s": 1.16, "e": 1.44, "hl": false},
        {"t": "ordena", "s": 1.48, "e": 1.88, "hl": true},
        {"t": "do", "s": 1.92, "e": 2.2, "hl": false},
        {"t": "maior", "s": 2.24, "e": 2.52, "hl": true},
        {"t": "total", "s": 2.56, "e": 2.9, "hl": false},
        {"t": "para", "s": 2.94, "e": 3.28, "hl": false},
        {"t": "o", "s": 3.32, "e": 3.6, "hl": false},
        {"t": "menor,", "s": 3.64, "e": 3.98, "hl": false},
        {"t": "e", "s": 4.22, "e": 4.5, "hl": false},
        {"t": "LIMIT", "s": 4.54, "e": 4.88, "hl": true},
        {"t": "3", "s": 4.92, "e": 5.2, "hl": false},
        {"t": "guarda", "s": 5.24, "e": 5.58, "hl": false},
        {"t": "só", "s": 5.62, "e": 5.9, "hl": false},
        {"t": "as", "s": 5.94, "e": 6.22, "hl": false},
        {"t": "três", "s": 6.26, "e": 6.54, "hl": false},
        {"t": "primeiras.", "s": 6.58, "e": 6.98, "hl": true}
      ],
      "dur": 8.18,
      "terminal": {
        "cmd": "ORDER BY total DESC\nLIMIT 3",
        "at": 0.78,
        "dur": 2.2
      },
      "status": {
        "tipo": "ok",
        "texto": "SÓ 3 FICHAS SOBRAM",
        "at": 5.24
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "grade",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "legenda",
          "dur": 0.5
        },
        {
          "at": 1.48,
          "acao": "aparecer",
          "alvo": "rank",
          "dur": 0.8
        },
        {
          "at": 1.48,
          "acao": "aparecer",
          "alvo": "rank-resto",
          "dur": 0.8
        },
        {
          "at": 4.54,
          "acao": "desenhar",
          "alvo": "corte",
          "dur": 0.7
        },
        {
          "at": 4.92,
          "acao": "aparecer",
          "alvo": "rot-corte",
          "dur": 0.5
        },
        {
          "at": 6.58,
          "acao": "sumir",
          "alvo": "rank-resto",
          "dur": 0.8
        }
      ],
      "why": "Primeiro ordene, depois corte: LIMIT sozinho só corta."
    },
    {
      "id": "agregar",
      "ordem": 5,
      "narration": "Agregações resumem tudo em um número. Entre as entregues, COUNT dá 18 e SUM dá 1.226,45 reais.",
      "words": [
        {"t": "Agregações", "s": 0.2, "e": 0.66, "hl": true},
        {"t": "resumem", "s": 0.7, "e": 1.1, "hl": false},
        {"t": "tudo", "s": 1.14, "e": 1.48, "hl": false},
        {"t": "em", "s": 1.52, "e": 1.8, "hl": false},
        {"t": "um", "s": 1.84, "e": 2.12, "hl": false},
        {"t": "número.", "s": 2.16, "e": 2.56, "hl": true},
        {"t": "Entre", "s": 3, "e": 3.34, "hl": false},
        {"t": "as", "s": 3.38, "e": 3.66, "hl": false},
        {"t": "entregues,", "s": 3.7, "e": 4.1, "hl": false},
        {"t": "COUNT", "s": 4.34, "e": 4.62, "hl": true},
        {"t": "dá", "s": 4.66, "e": 4.94, "hl": false},
        {"t": "18", "s": 4.98, "e": 5.26, "hl": false},
        {"t": "e", "s": 5.3, "e": 5.58, "hl": false},
        {"t": "SUM", "s": 5.62, "e": 5.9, "hl": true},
        {"t": "dá", "s": 5.94, "e": 6.22, "hl": false},
        {"t": "1.226,45", "s": 6.26, "e": 6.54, "hl": false},
        {"t": "reais.", "s": 6.58, "e": 6.86, "hl": false}
      ],
      "dur": 8.06,
      "terminal": {
        "cmd": "SELECT COUNT(*),\n  SUM(quantidade * valor_unit)",
        "at": 0.2,
        "dur": 2.6
      },
      "status": {
        "tipo": "ok",
        "texto": "AGREGA DEPOIS DO WHERE",
        "at": 3
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rank",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "corte",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-corte",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "grade",
          "dur": 0.8
        },
        {
          "at": 4.34,
          "acao": "aparecer",
          "alvo": "res-count",
          "dur": 0.7
        },
        {
          "at": 4.34,
          "acao": "destacar",
          "alvo": "fichas-entregue",
          "dur": 0.9
        },
        {
          "at": 5.62,
          "acao": "aparecer",
          "alvo": "res-sum",
          "dur": 0.7
        }
      ],
      "why": "Agregações comprimem várias linhas em uma e rodam depois do filtro."
    },
    {
      "id": "null",
      "ordem": 6,
      "narration": "Cuidado com o NULL: cupom=NULL devolve zero linhas. IS NULL acha os 21 pedidos sem cupom.",
      "words": [
        {"t": "Cuidado", "s": 0.2, "e": 0.6, "hl": false},
        {"t": "com", "s": 0.64, "e": 0.92, "hl": false},
        {"t": "o", "s": 0.96, "e": 1.24, "hl": false},
        {"t": "NULL:", "s": 1.28, "e": 1.56, "hl": true},
        {"t": "cupom=NULL", "s": 1.8, "e": 2.2, "hl": false},
        {"t": "devolve", "s": 2.24, "e": 2.64, "hl": false},
        {"t": "zero", "s": 2.68, "e": 3.02, "hl": true},
        {"t": "linhas.", "s": 3.06, "e": 3.4, "hl": false},
        {"t": "IS", "s": 3.84, "e": 4.12, "hl": false},
        {"t": "NULL", "s": 4.16, "e": 4.44, "hl": true},
        {"t": "acha", "s": 4.48, "e": 4.82, "hl": false},
        {"t": "os", "s": 4.86, "e": 5.14, "hl": false},
        {"t": "21", "s": 5.18, "e": 5.46, "hl": true},
        {"t": "pedidos", "s": 5.5, "e": 5.9, "hl": false},
        {"t": "sem", "s": 5.94, "e": 6.22, "hl": false},
        {"t": "cupom.", "s": 6.26, "e": 6.6, "hl": false}
      ],
      "dur": 7.8,
      "terminal": {
        "cmd": "WHERE cupom = NULL    -- 0 linhas\nWHERE cupom IS NULL   -- 21 linhas",
        "at": 0.2,
        "dur": 3
      },
      "status": {
        "tipo": "erro",
        "texto": "= NULL NUNCA É VERDADEIRO",
        "at": 2.68
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "res-count",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "res-sum",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "fichas-outras",
          "dur": 0.8
        },
        {
          "at": 1.8,
          "acao": "aparecer",
          "alvo": "selos",
          "dur": 0.8
        },
        {
          "at": 2.68,
          "acao": "aparecer",
          "alvo": "res-zero",
          "dur": 0.7
        },
        {
          "at": 3.84,
          "acao": "aparecer",
          "alvo": "res-null",
          "dur": 0.7
        }
      ],
      "why": "NULL é desconhecido: ele nunca é igual a nada, nem a outro NULL."
    },
    {
      "id": "limit",
      "ordem": 7,
      "narration": "LIMIT 3 sem ORDER BY traz três fichas quaisquer, talvez baratas. Primeiro ordene, depois corte.",
      "words": [
        {"t": "LIMIT", "s": 0.2, "e": 0.54, "hl": true},
        {"t": "3", "s": 0.58, "e": 0.86, "hl": false},
        {"t": "sem", "s": 0.9, "e": 1.18, "hl": false},
        {"t": "ORDER", "s": 1.22, "e": 1.56, "hl": false},
        {"t": "BY", "s": 1.6, "e": 1.88, "hl": false},
        {"t": "traz", "s": 1.92, "e": 2.2, "hl": false},
        {"t": "três", "s": 2.24, "e": 2.52, "hl": false},
        {"t": "fichas", "s": 2.56, "e": 2.9, "hl": false},
        {"t": "quaisquer,", "s": 2.94, "e": 3.28, "hl": true},
        {"t": "talvez", "s": 3.52, "e": 3.86, "hl": false},
        {"t": "baratas.", "s": 3.9, "e": 4.3, "hl": false},
        {"t": "Primeiro", "s": 4.74, "e": 5.14, "hl": false},
        {"t": "ordene,", "s": 5.18, "e": 5.58, "hl": true},
        {"t": "depois", "s": 5.82, "e": 6.16, "hl": false},
        {"t": "corte.", "s": 6.2, "e": 6.54, "hl": true}
      ],
      "dur": 7.74,
      "status": {
        "tipo": "alerta",
        "texto": "SEM ORDER BY A ORDEM NÃO É GARANTIDA",
        "at": 0.9
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "selos",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "res-zero",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "res-null",
          "dur": 0.5
        },
        {
          "at": 2.24,
          "acao": "aparecer",
          "alvo": "tres-primeiras",
          "dur": 0.8
        },
        {
          "at": 2.94,
          "acao": "aparecer",
          "alvo": "nota-limit",
          "dur": 0.8
        },
        {
          "at": 3.9,
          "acao": "destacar",
          "alvo": "f-14",
          "dur": 1
        }
      ],
      "why": "Sem ORDER BY, as primeiras linhas são quaisquer."
    },
    {
      "id": "dados-ia",
      "ordem": 8,
      "narration": "Antes de um modelo de IA, um SQL assim monta a tabela de treino. Serve em Databricks e Fabric.",
      "words": [
        {"t": "Antes", "s": 0.2, "e": 0.54, "hl": false},
        {"t": "de", "s": 0.58, "e": 0.86, "hl": false},
        {"t": "um", "s": 0.9, "e": 1.18, "hl": false},
        {"t": "modelo", "s": 1.22, "e": 1.62, "hl": true},
        {"t": "de", "s": 1.66, "e": 1.94, "hl": false},
        {"t": "IA,", "s": 1.98, "e": 2.26, "hl": false},
        {"t": "um", "s": 2.5, "e": 2.78, "hl": false},
        {"t": "SQL", "s": 2.82, "e": 3.1, "hl": true},
        {"t": "assim", "s": 3.14, "e": 3.48, "hl": false},
        {"t": "monta", "s": 3.52, "e": 3.86, "hl": false},
        {"t": "a", "s": 3.9, "e": 4.18, "hl": false},
        {"t": "tabela", "s": 4.22, "e": 4.62, "hl": false},
        {"t": "de", "s": 4.66, "e": 4.94, "hl": false},
        {"t": "treino.", "s": 4.98, "e": 5.32, "hl": true},
        {"t": "Serve", "s": 5.76, "e": 6.1, "hl": false},
        {"t": "em", "s": 6.14, "e": 6.42, "hl": false},
        {"t": "Databricks", "s": 6.46, "e": 6.86, "hl": true},
        {"t": "e", "s": 6.9, "e": 7.18, "hl": false},
        {"t": "Fabric.", "s": 7.22, "e": 7.56, "hl": false}
      ],
      "dur": 8.76,
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "grade",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tres-primeiras",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "nota-limit",
          "dur": 0.5
        },
        {
          "at": 1.22,
          "acao": "aparecer",
          "alvo": "box-modelo",
          "dur": 0.7
        },
        {
          "at": 2.82,
          "acao": "aparecer",
          "alvo": "box-sql",
          "dur": 0.7
        },
        {
          "at": 3.52,
          "acao": "aparecer",
          "alvo": "box-pedidos",
          "dur": 0.7
        },
        {
          "at": 3.52,
          "acao": "desenhar",
          "alvo": "seta-1",
          "dur": 0.5
        },
        {
          "at": 4.22,
          "acao": "aparecer",
          "alvo": "box-treino",
          "dur": 0.7
        },
        {
          "at": 4.22,
          "acao": "desenhar",
          "alvo": "seta-2",
          "dur": 0.5
        },
        {
          "at": 4.22,
          "acao": "desenhar",
          "alvo": "seta-3",
          "dur": 0.5
        },
        {
          "at": 4.98,
          "acao": "destacar",
          "alvo": "box-treino",
          "dur": 0.9
        },
        {
          "at": 6.46,
          "acao": "aparecer",
          "alvo": "plataformas",
          "dur": 0.7
        }
      ],
      "why": "Antes de um modelo de IA, alguém escreveu um SQL assim para montar a tabela de treino."
    }
  ],
  "outro": {
    "dur": 7.22,
    "narration": "Escolha, filtre, ordene, corte e resuma. Agora faça suas consultas no laboratório.",
    "words": [
      {"t": "Escolha,", "s": 0.2, "e": 0.6, "hl": false},
      {"t": "filtre,", "s": 0.84, "e": 1.18, "hl": false},
      {"t": "ordene,", "s": 1.42, "e": 1.82, "hl": false},
      {"t": "corte", "s": 2.06, "e": 2.4, "hl": false},
      {"t": "e", "s": 2.44, "e": 2.72, "hl": false},
      {"t": "resuma.", "s": 2.76, "e": 3.16, "hl": false},
      {"t": "Agora", "s": 3.6, "e": 4, "hl": false},
      {"t": "faça", "s": 4.04, "e": 4.38, "hl": false},
      {"t": "suas", "s": 4.42, "e": 4.7, "hl": false},
      {"t": "consultas", "s": 4.74, "e": 5.14, "hl": false},
      {"t": "no", "s": 5.18, "e": 5.46, "hl": false},
      {"t": "laboratório.", "s": 5.5, "e": 6.02, "hl": false}
    ],
    "scene": [
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "box-pedidos",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "box-sql",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "box-treino",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "box-modelo",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "seta-1",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "seta-2",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "seta-3",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "plataformas",
        "dur": 0.5
      },
      {
        "at": 5.5,
        "acao": "destacar",
        "alvo": "guia-braco",
        "dur": 1.2
      }
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "SELECT cliente,\n  quantidade * valor_unit AS total\nFROM pedidos\nWHERE status = 'entregue'\nORDER BY total DESC\nLIMIT 3;",
      "at": 0.2,
      "dur": 4.6
    }
  }
};
