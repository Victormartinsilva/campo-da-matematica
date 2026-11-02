/* Roteiro do mini-video "Bancos analiticos (OLAP)" (metafora: estrela com a tabela fato no centro e as dimensoes nas pontas). Tempos em segundos desde o inicio de cada peca.
   Numeros calculados por script com o esquema e os dados do laboratorio (prog/olap.js): fato_vendas 12 linhas x 6 colunas = 72 valores;
   SUM(valor) por coluna le 12 valores; faturamento por regiao Sul 56150, Centro-Oeste 52600, Sudeste 26700; total 135450 (soma das regioes confere). */
window.Explainers = window.Explainers || {};
Explainers["olap"] = {
  "meta": {
    "id": "olap",
    "categoria": "PROGRAMAÇÃO E DADOS",
    "area": "prog",
    "titulo": "Bancos analíticos (OLAP)",
    "duracao": 74,
    "cena": "olap"
  },
  "pieces": [
    {
      "id": "pergunta",
      "ordem": 1,
      "narration": "O gerente pede o faturamento do ano, e o banco dos caixas, que registra as vendas, fica lento.",
      "words": [
        {
          "t": "O",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "gerente",
          "s": 0.52,
          "e": 0.92,
          "hl": false
        },
        {
          "t": "pede",
          "s": 0.96,
          "e": 1.3,
          "hl": false
        },
        {
          "t": "o",
          "s": 1.34,
          "e": 1.62,
          "hl": false
        },
        {
          "t": "faturamento",
          "s": 1.66,
          "e": 2.18,
          "hl": true
        },
        {
          "t": "do",
          "s": 2.22,
          "e": 2.5,
          "hl": false
        },
        {
          "t": "ano,",
          "s": 2.54,
          "e": 2.88,
          "hl": false
        },
        {
          "t": "e",
          "s": 3.12,
          "e": 3.4,
          "hl": false
        },
        {
          "t": "o",
          "s": 3.44,
          "e": 3.72,
          "hl": false
        },
        {
          "t": "banco",
          "s": 3.76,
          "e": 4.1,
          "hl": false
        },
        {
          "t": "dos",
          "s": 4.14,
          "e": 4.42,
          "hl": false
        },
        {
          "t": "caixas,",
          "s": 4.46,
          "e": 4.8,
          "hl": true
        },
        {
          "t": "que",
          "s": 5.04,
          "e": 5.32,
          "hl": false
        },
        {
          "t": "registra",
          "s": 5.36,
          "e": 5.76,
          "hl": false
        },
        {
          "t": "as",
          "s": 5.8,
          "e": 6.08,
          "hl": false
        },
        {
          "t": "vendas,",
          "s": 6.12,
          "e": 6.46,
          "hl": false
        },
        {
          "t": "fica",
          "s": 6.7,
          "e": 7.04,
          "hl": false
        },
        {
          "t": "lento.",
          "s": 7.08,
          "e": 7.42,
          "hl": true
        }
      ],
      "dur": 8.62,
      "status": {
        "tipo": "alerta",
        "texto": "BANCO LENTO PARA OS CAIXAS",
        "at": 7.08
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "guia",
          "dur": 0.7
        },
        {
          "at": 1.66,
          "acao": "aparecer",
          "alvo": "relatorio",
          "dur": 0.8
        },
        {
          "at": 3.76,
          "acao": "aparecer",
          "alvo": "oltp",
          "dur": 0.8
        },
        {
          "at": 6.12,
          "acao": "aparecer",
          "alvo": "tickets",
          "dur": 0.7
        },
        {
          "at": 6.7,
          "acao": "desenhar",
          "alvo": "seta-pesada",
          "dur": 0.9
        },
        {
          "at": 7.08,
          "acao": "destacar",
          "alvo": "oltp",
          "dur": 0.9
        }
      ],
      "why": "Relatório pesado e vendas ao vivo disputam os mesmos recursos."
    },
    {
      "id": "estrela",
      "ordem": 2,
      "narration": "Pense numa estrela: a tabela de vendas no centro e, nas pontas, três dimensões.",
      "words": [
        {
          "t": "Pense",
          "s": 0.2,
          "e": 0.54,
          "hl": false
        },
        {
          "t": "numa",
          "s": 0.58,
          "e": 0.92,
          "hl": false
        },
        {
          "t": "estrela:",
          "s": 0.96,
          "e": 1.36,
          "hl": true
        },
        {
          "t": "a",
          "s": 1.6,
          "e": 1.88,
          "hl": false
        },
        {
          "t": "tabela",
          "s": 1.92,
          "e": 2.32,
          "hl": false
        },
        {
          "t": "de",
          "s": 2.36,
          "e": 2.64,
          "hl": false
        },
        {
          "t": "vendas",
          "s": 2.68,
          "e": 3.02,
          "hl": false
        },
        {
          "t": "no",
          "s": 3.06,
          "e": 3.34,
          "hl": false
        },
        {
          "t": "centro",
          "s": 3.38,
          "e": 3.72,
          "hl": true
        },
        {
          "t": "e,",
          "s": 3.76,
          "e": 4.04,
          "hl": false
        },
        {
          "t": "nas",
          "s": 4.28,
          "e": 4.56,
          "hl": false
        },
        {
          "t": "pontas,",
          "s": 4.6,
          "e": 4.94,
          "hl": true
        },
        {
          "t": "três",
          "s": 5.18,
          "e": 5.46,
          "hl": false
        },
        {
          "t": "dimensões.",
          "s": 5.5,
          "e": 5.9,
          "hl": true
        }
      ],
      "dur": 7.1,
      "status": {
        "tipo": "ok",
        "texto": "1 FATO NO CENTRO + 3 DIMENSÕES",
        "at": 5.5
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "oltp",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tickets",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "relatorio",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "seta-pesada",
          "dur": 0.5
        },
        {
          "at": 0.96,
          "acao": "aparecer",
          "alvo": "estrela-fundo",
          "dur": 0.8
        },
        {
          "at": 1.92,
          "acao": "aparecer",
          "alvo": "fato",
          "dur": 0.8
        },
        {
          "at": 4.28,
          "acao": "desenhar",
          "alvo": "raios",
          "dur": 0.9
        },
        {
          "at": 4.6,
          "acao": "aparecer",
          "alvo": "dim-produto",
          "dur": 0.7
        },
        {
          "at": 5.18,
          "acao": "aparecer",
          "alvo": "dim-tempo",
          "dur": 0.7
        },
        {
          "at": 5.5,
          "acao": "aparecer",
          "alvo": "dim-regiao",
          "dur": 0.7
        }
      ],
      "why": "Os números ficam no centro e a descrição do contexto fica em volta."
    },
    {
      "id": "fato",
      "ordem": 3,
      "narration": "O fato tem 12 linhas, uma por venda, com quantidade e valor. As dimensões dão produto, mês e região.",
      "words": [
        {
          "t": "O",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "fato",
          "s": 0.52,
          "e": 0.86,
          "hl": true
        },
        {
          "t": "tem",
          "s": 0.9,
          "e": 1.18,
          "hl": false
        },
        {
          "t": "12",
          "s": 1.22,
          "e": 1.5,
          "hl": false
        },
        {
          "t": "linhas,",
          "s": 1.54,
          "e": 1.88,
          "hl": false
        },
        {
          "t": "uma",
          "s": 2.12,
          "e": 2.46,
          "hl": false
        },
        {
          "t": "por",
          "s": 2.5,
          "e": 2.78,
          "hl": false
        },
        {
          "t": "venda,",
          "s": 2.82,
          "e": 3.16,
          "hl": true
        },
        {
          "t": "com",
          "s": 3.4,
          "e": 3.68,
          "hl": false
        },
        {
          "t": "quantidade",
          "s": 3.72,
          "e": 4.18,
          "hl": false
        },
        {
          "t": "e",
          "s": 4.22,
          "e": 4.5,
          "hl": false
        },
        {
          "t": "valor.",
          "s": 4.54,
          "e": 4.88,
          "hl": true
        },
        {
          "t": "As",
          "s": 5.32,
          "e": 5.6,
          "hl": false
        },
        {
          "t": "dimensões",
          "s": 5.64,
          "e": 6.04,
          "hl": true
        },
        {
          "t": "dão",
          "s": 6.08,
          "e": 6.36,
          "hl": false
        },
        {
          "t": "produto,",
          "s": 6.4,
          "e": 6.8,
          "hl": false
        },
        {
          "t": "mês",
          "s": 7.04,
          "e": 7.32,
          "hl": false
        },
        {
          "t": "e",
          "s": 7.36,
          "e": 7.64,
          "hl": false
        },
        {
          "t": "região.",
          "s": 7.68,
          "e": 8.02,
          "hl": false
        }
      ],
      "dur": 9.22,
      "scene": [
        {
          "at": 1.22,
          "acao": "aparecer",
          "alvo": "det-fato",
          "dur": 0.8
        },
        {
          "at": 2.82,
          "acao": "destacar",
          "alvo": "fato",
          "dur": 0.9
        },
        {
          "at": 6.4,
          "acao": "aparecer",
          "alvo": "det-produto",
          "dur": 0.6
        },
        {
          "at": 7.04,
          "acao": "aparecer",
          "alvo": "det-tempo",
          "dur": 0.6
        },
        {
          "at": 7.68,
          "acao": "aparecer",
          "alvo": "det-regiao",
          "dur": 0.6
        }
      ],
      "why": "Fato: medidas e chaves. Dimensões: descrições do contexto."
    },
    {
      "id": "colunas",
      "ordem": 4,
      "narration": "Por linhas, somar o valor lê 72 valores. Por colunas, lê só a coluna valor, 12 valores.",
      "words": [
        {
          "t": "Por",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "linhas,",
          "s": 0.52,
          "e": 0.86,
          "hl": true
        },
        {
          "t": "somar",
          "s": 1.1,
          "e": 1.44,
          "hl": false
        },
        {
          "t": "o",
          "s": 1.48,
          "e": 1.76,
          "hl": false
        },
        {
          "t": "valor",
          "s": 1.8,
          "e": 2.14,
          "hl": false
        },
        {
          "t": "lê",
          "s": 2.18,
          "e": 2.46,
          "hl": false
        },
        {
          "t": "72",
          "s": 2.5,
          "e": 2.78,
          "hl": false
        },
        {
          "t": "valores.",
          "s": 2.82,
          "e": 3.22,
          "hl": false
        },
        {
          "t": "Por",
          "s": 3.66,
          "e": 3.94,
          "hl": false
        },
        {
          "t": "colunas,",
          "s": 3.98,
          "e": 4.38,
          "hl": true
        },
        {
          "t": "lê",
          "s": 4.62,
          "e": 4.9,
          "hl": false
        },
        {
          "t": "só",
          "s": 4.94,
          "e": 5.22,
          "hl": false
        },
        {
          "t": "a",
          "s": 5.26,
          "e": 5.54,
          "hl": false
        },
        {
          "t": "coluna",
          "s": 5.58,
          "e": 5.98,
          "hl": true
        },
        {
          "t": "valor,",
          "s": 6.02,
          "e": 6.36,
          "hl": false
        },
        {
          "t": "12",
          "s": 6.6,
          "e": 6.88,
          "hl": true
        },
        {
          "t": "valores.",
          "s": 6.92,
          "e": 7.32,
          "hl": false
        }
      ],
      "dur": 8.52,
      "terminal": {
        "cmd": "sum(por_coluna[\"valor\"])   # só a coluna valor",
        "at": 3.98,
        "dur": 2.2
      },
      "status": {
        "tipo": "ok",
        "texto": "LÊ 12 DE 72 VALORES",
        "at": 6.6
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "estrela",
          "dur": 0.6
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "grade-linhas",
          "dur": 0.7
        },
        {
          "at": 2.18,
          "acao": "aparecer",
          "alvo": "leitura-linhas",
          "dur": 0.8
        },
        {
          "at": 2.5,
          "acao": "aparecer",
          "alvo": "cont-linhas",
          "dur": 0.6
        },
        {
          "at": 3.98,
          "acao": "aparecer",
          "alvo": "grade-colunas",
          "dur": 0.7
        },
        {
          "at": 5.58,
          "acao": "aparecer",
          "alvo": "leitura-coluna",
          "dur": 0.8
        },
        {
          "at": 6.6,
          "acao": "aparecer",
          "alvo": "cont-colunas",
          "dur": 0.6
        }
      ],
      "why": "Menos dado lido, e valores parecidos lado a lado comprimem bem."
    },
    {
      "id": "etl",
      "ordem": 5,
      "narration": "O ETL transforma antes de carregar. O ELT carrega o dado bruto e transforma dentro do warehouse.",
      "words": [
        {
          "t": "O",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "ETL",
          "s": 0.52,
          "e": 0.8,
          "hl": true
        },
        {
          "t": "transforma",
          "s": 0.84,
          "e": 1.24,
          "hl": false
        },
        {
          "t": "antes",
          "s": 1.28,
          "e": 1.62,
          "hl": false
        },
        {
          "t": "de",
          "s": 1.66,
          "e": 1.94,
          "hl": false
        },
        {
          "t": "carregar.",
          "s": 1.98,
          "e": 2.38,
          "hl": false
        },
        {
          "t": "O",
          "s": 2.82,
          "e": 3.1,
          "hl": false
        },
        {
          "t": "ELT",
          "s": 3.14,
          "e": 3.42,
          "hl": true
        },
        {
          "t": "carrega",
          "s": 3.46,
          "e": 3.86,
          "hl": false
        },
        {
          "t": "o",
          "s": 3.9,
          "e": 4.18,
          "hl": false
        },
        {
          "t": "dado",
          "s": 4.22,
          "e": 4.56,
          "hl": false
        },
        {
          "t": "bruto",
          "s": 4.6,
          "e": 4.94,
          "hl": true
        },
        {
          "t": "e",
          "s": 4.98,
          "e": 5.26,
          "hl": false
        },
        {
          "t": "transforma",
          "s": 5.3,
          "e": 5.7,
          "hl": false
        },
        {
          "t": "dentro",
          "s": 5.74,
          "e": 6.08,
          "hl": false
        },
        {
          "t": "do",
          "s": 6.12,
          "e": 6.4,
          "hl": false
        },
        {
          "t": "warehouse.",
          "s": 6.44,
          "e": 6.9,
          "hl": true
        }
      ],
      "dur": 8.1,
      "status": {
        "tipo": "ok",
        "texto": "ELT: COMUM EM DATABRICKS E FABRIC",
        "at": 6.44
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "cena-colunas",
          "dur": 0.6
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "etl",
          "dur": 0.8
        },
        {
          "at": 0.84,
          "acao": "destacar",
          "alvo": "t-etl",
          "dur": 0.8
        },
        {
          "at": 3.14,
          "acao": "aparecer",
          "alvo": "elt",
          "dur": 0.8
        },
        {
          "at": 5.3,
          "acao": "destacar",
          "alvo": "t-elt",
          "dur": 0.8
        }
      ],
      "why": "A diferença está em onde a transformação roda."
    },
    {
      "id": "numeros",
      "ordem": 6,
      "narration": "Junte o fato à região, agrupe e some: o Sul soma 56150, e o total fecha em 135450.",
      "words": [
        {
          "t": "Junte",
          "s": 0.2,
          "e": 0.54,
          "hl": false
        },
        {
          "t": "o",
          "s": 0.58,
          "e": 0.86,
          "hl": false
        },
        {
          "t": "fato",
          "s": 0.9,
          "e": 1.24,
          "hl": false
        },
        {
          "t": "à",
          "s": 1.28,
          "e": 1.56,
          "hl": false
        },
        {
          "t": "região,",
          "s": 1.6,
          "e": 1.94,
          "hl": true
        },
        {
          "t": "agrupe",
          "s": 2.18,
          "e": 2.58,
          "hl": true
        },
        {
          "t": "e",
          "s": 2.62,
          "e": 2.9,
          "hl": false
        },
        {
          "t": "some:",
          "s": 2.94,
          "e": 3.28,
          "hl": false
        },
        {
          "t": "o",
          "s": 3.52,
          "e": 3.8,
          "hl": false
        },
        {
          "t": "Sul",
          "s": 3.84,
          "e": 4.12,
          "hl": true
        },
        {
          "t": "soma",
          "s": 4.16,
          "e": 4.5,
          "hl": false
        },
        {
          "t": "56150,",
          "s": 4.54,
          "e": 4.82,
          "hl": false
        },
        {
          "t": "e",
          "s": 5.06,
          "e": 5.34,
          "hl": false
        },
        {
          "t": "o",
          "s": 5.38,
          "e": 5.66,
          "hl": false
        },
        {
          "t": "total",
          "s": 5.7,
          "e": 6.04,
          "hl": true
        },
        {
          "t": "fecha",
          "s": 6.08,
          "e": 6.42,
          "hl": false
        },
        {
          "t": "em",
          "s": 6.46,
          "e": 6.74,
          "hl": false
        },
        {
          "t": "135450.",
          "s": 6.78,
          "e": 7.06,
          "hl": false
        }
      ],
      "dur": 8.26,
      "terminal": {
        "cmd": "SELECT r.nome, SUM(f.valor)\nFROM fato_vendas f\nJOIN dim_regiao r ON r.id = f.regiao_id\nGROUP BY r.nome",
        "at": 0.9,
        "dur": 2.4
      },
      "status": {
        "tipo": "ok",
        "texto": "SOMA DAS 3 REGIÕES = 135450",
        "at": 6.78
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "cena-etl",
          "dur": 0.6
        },
        {
          "at": 2.18,
          "acao": "aparecer",
          "alvo": "barras",
          "dur": 0.8
        },
        {
          "at": 4.54,
          "acao": "destacar",
          "alvo": "barra-sul",
          "dur": 0.9
        },
        {
          "at": 6.78,
          "acao": "aparecer",
          "alvo": "total",
          "dur": 0.8
        }
      ],
      "why": "A soma das regiões bate com o total do fato."
    },
    {
      "id": "armadilha",
      "ordem": 7,
      "narration": "Armadilha: esquecer o GROUP BY. O SUM junta tudo em uma linha só, 135450, e as regiões somem.",
      "words": [
        {
          "t": "Armadilha:",
          "s": 0.2,
          "e": 0.66,
          "hl": true
        },
        {
          "t": "esquecer",
          "s": 0.9,
          "e": 1.3,
          "hl": false
        },
        {
          "t": "o",
          "s": 1.34,
          "e": 1.62,
          "hl": false
        },
        {
          "t": "GROUP",
          "s": 1.66,
          "e": 1.94,
          "hl": true
        },
        {
          "t": "BY.",
          "s": 1.98,
          "e": 2.26,
          "hl": true
        },
        {
          "t": "O",
          "s": 2.7,
          "e": 2.98,
          "hl": false
        },
        {
          "t": "SUM",
          "s": 3.02,
          "e": 3.3,
          "hl": false
        },
        {
          "t": "junta",
          "s": 3.34,
          "e": 3.68,
          "hl": false
        },
        {
          "t": "tudo",
          "s": 3.72,
          "e": 4.06,
          "hl": false
        },
        {
          "t": "em",
          "s": 4.1,
          "e": 4.38,
          "hl": false
        },
        {
          "t": "uma",
          "s": 4.42,
          "e": 4.76,
          "hl": false
        },
        {
          "t": "linha",
          "s": 4.8,
          "e": 5.14,
          "hl": true
        },
        {
          "t": "só,",
          "s": 5.18,
          "e": 5.46,
          "hl": false
        },
        {
          "t": "135450,",
          "s": 5.7,
          "e": 5.98,
          "hl": false
        },
        {
          "t": "e",
          "s": 6.22,
          "e": 6.5,
          "hl": false
        },
        {
          "t": "as",
          "s": 6.54,
          "e": 6.82,
          "hl": false
        },
        {
          "t": "regiões",
          "s": 6.86,
          "e": 7.2,
          "hl": false
        },
        {
          "t": "somem.",
          "s": 7.24,
          "e": 7.58,
          "hl": false
        }
      ],
      "dur": 8.78,
      "status": {
        "tipo": "erro",
        "texto": "SEM GROUP BY: 1 LINHA SÓ",
        "at": 4.8
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "barras",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "total",
          "dur": 0.5
        },
        {
          "at": 0.9,
          "acao": "aparecer",
          "alvo": "res-com",
          "dur": 0.8
        },
        {
          "at": 3.34,
          "acao": "aparecer",
          "alvo": "res-sem",
          "dur": 0.8
        },
        {
          "at": 5.7,
          "acao": "destacar",
          "alvo": "res-sem",
          "dur": 0.9
        }
      ],
      "why": "Sem o agrupamento, SUM junta tudo em uma linha só."
    },
    {
      "id": "lavoura",
      "ordem": 8,
      "narration": "Na lavoura, a colheita é o fato; talhão, cultura, safra e município são as dimensões.",
      "words": [
        {
          "t": "Na",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "lavoura,",
          "s": 0.52,
          "e": 0.92,
          "hl": false
        },
        {
          "t": "a",
          "s": 1.16,
          "e": 1.44,
          "hl": false
        },
        {
          "t": "colheita",
          "s": 1.48,
          "e": 1.88,
          "hl": true
        },
        {
          "t": "é",
          "s": 1.92,
          "e": 2.2,
          "hl": false
        },
        {
          "t": "o",
          "s": 2.24,
          "e": 2.52,
          "hl": false
        },
        {
          "t": "fato;",
          "s": 2.56,
          "e": 2.9,
          "hl": true
        },
        {
          "t": "talhão,",
          "s": 3.14,
          "e": 3.48,
          "hl": true
        },
        {
          "t": "cultura,",
          "s": 3.72,
          "e": 4.12,
          "hl": false
        },
        {
          "t": "safra",
          "s": 4.36,
          "e": 4.7,
          "hl": false
        },
        {
          "t": "e",
          "s": 4.74,
          "e": 5.02,
          "hl": false
        },
        {
          "t": "município",
          "s": 5.06,
          "e": 5.52,
          "hl": false
        },
        {
          "t": "são",
          "s": 5.56,
          "e": 5.84,
          "hl": false
        },
        {
          "t": "as",
          "s": 5.88,
          "e": 6.16,
          "hl": false
        },
        {
          "t": "dimensões.",
          "s": 6.2,
          "e": 6.6,
          "hl": true
        }
      ],
      "dur": 7.8,
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "res-com",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "res-sem",
          "dur": 0.5
        },
        {
          "at": 1.48,
          "acao": "aparecer",
          "alvo": "agro-fato",
          "dur": 0.8
        },
        {
          "at": 2.56,
          "acao": "desenhar",
          "alvo": "agro-raios",
          "dur": 0.9
        },
        {
          "at": 3.14,
          "acao": "aparecer",
          "alvo": "agro-talhao",
          "dur": 0.6
        },
        {
          "at": 3.72,
          "acao": "aparecer",
          "alvo": "agro-cultura",
          "dur": 0.6
        },
        {
          "at": 4.36,
          "acao": "aparecer",
          "alvo": "agro-safra",
          "dur": 0.6
        },
        {
          "at": 5.06,
          "acao": "aparecer",
          "alvo": "agro-municipio",
          "dur": 0.6
        },
        {
          "at": 6.2,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 0.9
        }
      ],
      "why": "O engenheiro de dados constrói essa camada, com ETL ou ELT."
    }
  ],
  "outro": {
    "dur": 7.28,
    "narration": "Fato no centro, dimensões nas pontas, colunas para somar. Agora mexa no laboratório.",
    "words": [
      {
        "t": "Fato",
        "s": 0.2,
        "e": 0.54,
        "hl": true
      },
      {
        "t": "no",
        "s": 0.58,
        "e": 0.86,
        "hl": false
      },
      {
        "t": "centro,",
        "s": 0.9,
        "e": 1.24,
        "hl": false
      },
      {
        "t": "dimensões",
        "s": 1.48,
        "e": 1.88,
        "hl": true
      },
      {
        "t": "nas",
        "s": 1.92,
        "e": 2.2,
        "hl": false
      },
      {
        "t": "pontas,",
        "s": 2.24,
        "e": 2.58,
        "hl": false
      },
      {
        "t": "colunas",
        "s": 2.82,
        "e": 3.22,
        "hl": true
      },
      {
        "t": "para",
        "s": 3.26,
        "e": 3.6,
        "hl": false
      },
      {
        "t": "somar.",
        "s": 3.64,
        "e": 3.98,
        "hl": false
      },
      {
        "t": "Agora",
        "s": 4.42,
        "e": 4.82,
        "hl": false
      },
      {
        "t": "mexa",
        "s": 4.86,
        "e": 5.2,
        "hl": false
      },
      {
        "t": "no",
        "s": 5.24,
        "e": 5.52,
        "hl": false
      },
      {
        "t": "laboratório.",
        "s": 5.56,
        "e": 6.08,
        "hl": true
      }
    ],
    "scene": [
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "agro",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "aparecer",
        "alvo": "mini",
        "dur": 0.9
      },
      {
        "at": 5.56,
        "acao": "destacar",
        "alvo": "guia-braco",
        "dur": 1
      }
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "SELECT r.nome,\n  SUM(f.valor) AS total\nFROM fato_vendas f\nJOIN dim_regiao r\n  ON r.id = f.regiao_id\nGROUP BY r.nome;",
      "at": 1.92,
      "dur": 5
    }
  }
};
