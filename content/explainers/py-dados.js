/* Roteiro do mini-video "Python para dados" (metafora: planilha como tabuleiro; lista em gavetas, ficha, vetor, filtro e agrupamento). Tempos em segundos desde o inicio de cada peca. */
window.Explainers = window.Explainers || {};
Explainers["py-dados"] = {
  "meta": {
    "id": "py-dados",
    "categoria": "PROGRAMAÇÃO E DADOS",
    "area": "prog",
    "titulo": "Python para dados",
    "duracao": 73,
    "cena": "py-dados"
  },
  "pieces": [
    {
      "id": "pergunta",
      "ordem": 1,
      "narration": "Como transformar uma tabela com milhares de linhas em uma resposta de três linhas?",
      "words": [
        {
          "t": "Como",
          "s": 0.2,
          "e": 0.54,
          "hl": false
        },
        {
          "t": "transformar",
          "s": 0.58,
          "e": 0.98,
          "hl": false
        },
        {
          "t": "uma",
          "s": 1.02,
          "e": 1.36,
          "hl": false
        },
        {
          "t": "tabela",
          "s": 1.4,
          "e": 1.8,
          "hl": true
        },
        {
          "t": "com",
          "s": 1.84,
          "e": 2.12,
          "hl": false
        },
        {
          "t": "milhares",
          "s": 2.16,
          "e": 2.56,
          "hl": true
        },
        {
          "t": "de",
          "s": 2.6,
          "e": 2.88,
          "hl": false
        },
        {
          "t": "linhas",
          "s": 2.92,
          "e": 3.26,
          "hl": false
        },
        {
          "t": "em",
          "s": 3.3,
          "e": 3.58,
          "hl": false
        },
        {
          "t": "uma",
          "s": 3.62,
          "e": 3.96,
          "hl": false
        },
        {
          "t": "resposta",
          "s": 4,
          "e": 4.4,
          "hl": true
        },
        {
          "t": "de",
          "s": 4.44,
          "e": 4.72,
          "hl": false
        },
        {
          "t": "três",
          "s": 4.76,
          "e": 5.04,
          "hl": false
        },
        {
          "t": "linhas?",
          "s": 5.08,
          "e": 5.42,
          "hl": false
        }
      ],
      "dur": 6.62,
      "scene": [
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "guia",
          "dur": 0.7
        },
        {
          "at": 1.4,
          "acao": "aparecer",
          "alvo": "tabelao",
          "dur": 0.9
        },
        {
          "at": 2.16,
          "acao": "desenhar",
          "alvo": "seta-resumo",
          "dur": 0.9
        },
        {
          "at": 4,
          "acao": "aparecer",
          "alvo": "resposta",
          "dur": 0.9
        },
        {
          "at": 5.08,
          "acao": "destacar",
          "alvo": "resposta",
          "dur": 0.9
        }
      ],
      "why": "Quase toda pergunta sobre dados é filtrar, agrupar e resumir."
    },
    {
      "id": "tabuleiro",
      "ordem": 2,
      "narration": "Pense na planilha como um tabuleiro: colunas com nome, uma linha por venda, e cada casa tem endereço.",
      "words": [
        {
          "t": "Pense",
          "s": 0.2,
          "e": 0.54,
          "hl": false
        },
        {
          "t": "na",
          "s": 0.58,
          "e": 0.86,
          "hl": false
        },
        {
          "t": "planilha",
          "s": 0.9,
          "e": 1.3,
          "hl": true
        },
        {
          "t": "como",
          "s": 1.34,
          "e": 1.68,
          "hl": false
        },
        {
          "t": "um",
          "s": 1.72,
          "e": 2,
          "hl": false
        },
        {
          "t": "tabuleiro:",
          "s": 2.04,
          "e": 2.5,
          "hl": true
        },
        {
          "t": "colunas",
          "s": 2.74,
          "e": 3.14,
          "hl": true
        },
        {
          "t": "com",
          "s": 3.18,
          "e": 3.46,
          "hl": false
        },
        {
          "t": "nome,",
          "s": 3.5,
          "e": 3.84,
          "hl": false
        },
        {
          "t": "uma",
          "s": 4.08,
          "e": 4.42,
          "hl": false
        },
        {
          "t": "linha",
          "s": 4.46,
          "e": 4.8,
          "hl": true
        },
        {
          "t": "por",
          "s": 4.84,
          "e": 5.12,
          "hl": false
        },
        {
          "t": "venda,",
          "s": 5.16,
          "e": 5.5,
          "hl": false
        },
        {
          "t": "e",
          "s": 5.74,
          "e": 6.02,
          "hl": false
        },
        {
          "t": "cada",
          "s": 6.06,
          "e": 6.4,
          "hl": false
        },
        {
          "t": "casa",
          "s": 6.44,
          "e": 6.78,
          "hl": false
        },
        {
          "t": "tem",
          "s": 6.82,
          "e": 7.1,
          "hl": false
        },
        {
          "t": "endereço.",
          "s": 7.14,
          "e": 7.6,
          "hl": false
        }
      ],
      "dur": 8.8,
      "terminal": {
        "cmd": "vendas = pd.DataFrame({...})",
        "at": 0.9,
        "dur": 2.6
      },
      "status": {
        "tipo": "ok",
        "texto": "LINHA 2 · COLUNA VALOR = 200",
        "at": 7.14
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tabelao",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "seta-resumo",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "resposta",
          "dur": 0.6
        },
        {
          "at": 0.9,
          "acao": "aparecer",
          "alvo": "tabuleiro",
          "dur": 0.9
        },
        {
          "at": 2.74,
          "acao": "aparecer",
          "alvo": "hl-header",
          "dur": 0.6
        },
        {
          "at": 4.46,
          "acao": "aparecer",
          "alvo": "hl-linha",
          "dur": 0.6
        },
        {
          "at": 6.44,
          "acao": "aparecer",
          "alvo": "peao",
          "dur": 0.6
        },
        {
          "at": 7.14,
          "acao": "mover",
          "alvo": "peao",
          "dur": 1,
          "para": {
            "x": 0,
            "y": 78
          }
        },
        {
          "at": 7.14,
          "acao": "aparecer",
          "alvo": "endereco",
          "dur": 0.8
        }
      ],
      "why": "Cada valor da tabela tem um endereço: o nome da coluna e o número da linha."
    },
    {
      "id": "colecoes",
      "ordem": 3,
      "narration": "A lista guarda valores em ordem. O dicionário guarda pares, chave e valor, como uma ficha.",
      "words": [
        {
          "t": "A",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "lista",
          "s": 0.52,
          "e": 0.86,
          "hl": true
        },
        {
          "t": "guarda",
          "s": 0.9,
          "e": 1.24,
          "hl": false
        },
        {
          "t": "valores",
          "s": 1.28,
          "e": 1.68,
          "hl": false
        },
        {
          "t": "em",
          "s": 1.72,
          "e": 2,
          "hl": false
        },
        {
          "t": "ordem.",
          "s": 2.04,
          "e": 2.38,
          "hl": true
        },
        {
          "t": "O",
          "s": 2.82,
          "e": 3.1,
          "hl": false
        },
        {
          "t": "dicionário",
          "s": 3.14,
          "e": 3.6,
          "hl": true
        },
        {
          "t": "guarda",
          "s": 3.64,
          "e": 3.98,
          "hl": false
        },
        {
          "t": "pares,",
          "s": 4.02,
          "e": 4.36,
          "hl": false
        },
        {
          "t": "chave",
          "s": 4.6,
          "e": 4.94,
          "hl": false
        },
        {
          "t": "e",
          "s": 4.98,
          "e": 5.26,
          "hl": false
        },
        {
          "t": "valor,",
          "s": 5.3,
          "e": 5.64,
          "hl": false
        },
        {
          "t": "como",
          "s": 5.88,
          "e": 6.22,
          "hl": false
        },
        {
          "t": "uma",
          "s": 6.26,
          "e": 6.6,
          "hl": false
        },
        {
          "t": "ficha.",
          "s": 6.64,
          "e": 6.98,
          "hl": true
        }
      ],
      "dur": 8.18,
      "terminal": {
        "cmd": "sensor[\"local\"]   # \"estufa\"",
        "at": 4.6,
        "dur": 2
      },
      "status": {
        "tipo": "ok",
        "texto": "SENSOR[\"LOCAL\"] = ESTUFA",
        "at": 5.3
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tabuleiro",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "hl-header",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "hl-linha",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "peao",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "endereco",
          "dur": 0.6
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "lista",
          "dur": 0.9
        },
        {
          "at": 2.04,
          "acao": "aparecer",
          "alvo": "nota-pos",
          "dur": 0.7
        },
        {
          "at": 3.14,
          "acao": "aparecer",
          "alvo": "ficha",
          "dur": 0.9
        },
        {
          "at": 4.6,
          "acao": "aparecer",
          "alvo": "nota-chave",
          "dur": 0.7
        },
        {
          "at": 6.64,
          "acao": "aparecer",
          "alvo": "fi-dest",
          "dur": 0.7
        }
      ],
      "why": "A lista se acessa por posição, e o dicionário pela chave, não importa a ordem."
    },
    {
      "id": "numpy",
      "ordem": 4,
      "narration": "O numpy faz a conta no vetor inteiro, sem laço: média 25 e 35 graus viram 95 Fahrenheit.",
      "words": [
        {
          "t": "O",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "numpy",
          "s": 0.52,
          "e": 0.8,
          "hl": true
        },
        {
          "t": "faz",
          "s": 0.84,
          "e": 1.12,
          "hl": false
        },
        {
          "t": "a",
          "s": 1.16,
          "e": 1.44,
          "hl": false
        },
        {
          "t": "conta",
          "s": 1.48,
          "e": 1.82,
          "hl": false
        },
        {
          "t": "no",
          "s": 1.86,
          "e": 2.14,
          "hl": false
        },
        {
          "t": "vetor",
          "s": 2.18,
          "e": 2.52,
          "hl": true
        },
        {
          "t": "inteiro,",
          "s": 2.56,
          "e": 2.96,
          "hl": false
        },
        {
          "t": "sem",
          "s": 3.2,
          "e": 3.48,
          "hl": false
        },
        {
          "t": "laço:",
          "s": 3.52,
          "e": 3.86,
          "hl": true
        },
        {
          "t": "média",
          "s": 4.1,
          "e": 4.44,
          "hl": false
        },
        {
          "t": "25",
          "s": 4.48,
          "e": 4.76,
          "hl": false
        },
        {
          "t": "e",
          "s": 4.8,
          "e": 5.08,
          "hl": false
        },
        {
          "t": "35",
          "s": 5.12,
          "e": 5.4,
          "hl": false
        },
        {
          "t": "graus",
          "s": 5.44,
          "e": 5.72,
          "hl": false
        },
        {
          "t": "viram",
          "s": 5.76,
          "e": 6.1,
          "hl": false
        },
        {
          "t": "95",
          "s": 6.14,
          "e": 6.42,
          "hl": true
        },
        {
          "t": "Fahrenheit.",
          "s": 6.46,
          "e": 6.86,
          "hl": false
        }
      ],
      "dur": 8.06,
      "terminal": {
        "cmd": "temp * 9 / 5 + 32",
        "at": 1.48,
        "dur": 1.6
      },
      "status": {
        "tipo": "ok",
        "texto": "MÉDIA = 25.0 °C",
        "at": 4.1
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "colecoes",
          "dur": 0.6
        },
        {
          "at": 2.18,
          "acao": "aparecer",
          "alvo": "vt-c",
          "dur": 0.9
        },
        {
          "at": 2.56,
          "acao": "aparecer",
          "alvo": "vt-conta",
          "dur": 0.8
        },
        {
          "at": 3.52,
          "acao": "destacar",
          "alvo": "vt-conta",
          "dur": 0.8
        },
        {
          "at": 4.1,
          "acao": "aparecer",
          "alvo": "vt-media",
          "dur": 0.7
        },
        {
          "at": 5.12,
          "acao": "destacar",
          "alvo": "vt-c2",
          "dur": 0.7
        },
        {
          "at": 5.76,
          "acao": "aparecer",
          "alvo": "vt-f",
          "dur": 0.9
        },
        {
          "at": 6.14,
          "acao": "destacar",
          "alvo": "vt-f2",
          "dur": 0.9
        }
      ],
      "why": "A operação vale para todos os valores de uma vez, sem escrever laço."
    },
    {
      "id": "filtrar",
      "ordem": 5,
      "narration": "Filtrar é perguntar a cada linha: valor maior que 100? Passam 3: 120, 200 e 150.",
      "words": [
        {
          "t": "Filtrar",
          "s": 0.2,
          "e": 0.54,
          "hl": true
        },
        {
          "t": "é",
          "s": 0.58,
          "e": 0.86,
          "hl": false
        },
        {
          "t": "perguntar",
          "s": 0.9,
          "e": 1.3,
          "hl": false
        },
        {
          "t": "a",
          "s": 1.34,
          "e": 1.62,
          "hl": false
        },
        {
          "t": "cada",
          "s": 1.66,
          "e": 2,
          "hl": false
        },
        {
          "t": "linha:",
          "s": 2.04,
          "e": 2.38,
          "hl": false
        },
        {
          "t": "valor",
          "s": 2.62,
          "e": 2.96,
          "hl": true
        },
        {
          "t": "maior",
          "s": 3,
          "e": 3.28,
          "hl": false
        },
        {
          "t": "que",
          "s": 3.32,
          "e": 3.6,
          "hl": false
        },
        {
          "t": "100?",
          "s": 3.64,
          "e": 3.92,
          "hl": false
        },
        {
          "t": "Passam",
          "s": 4.36,
          "e": 4.7,
          "hl": false
        },
        {
          "t": "3:",
          "s": 4.74,
          "e": 5.02,
          "hl": true
        },
        {
          "t": "120,",
          "s": 5.26,
          "e": 5.54,
          "hl": false
        },
        {
          "t": "200",
          "s": 5.78,
          "e": 6.06,
          "hl": false
        },
        {
          "t": "e",
          "s": 6.1,
          "e": 6.38,
          "hl": false
        },
        {
          "t": "150.",
          "s": 6.42,
          "e": 6.7,
          "hl": true
        }
      ],
      "dur": 7.9,
      "terminal": {
        "cmd": "vendas[vendas[\"valor\"] > 100]",
        "at": 2.62,
        "dur": 2.2
      },
      "status": {
        "tipo": "ok",
        "texto": "3 LINHAS PASSAM",
        "at": 4.74
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "vetor",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "tabuleiro",
          "dur": 0.9
        },
        {
          "at": 2.62,
          "acao": "aparecer",
          "alvo": "mascara",
          "dur": 0.8
        },
        {
          "at": 4.36,
          "acao": "aparecer",
          "alvo": "cinza-1",
          "dur": 0.6
        },
        {
          "at": 4.36,
          "acao": "aparecer",
          "alvo": "cinza-4",
          "dur": 0.6
        },
        {
          "at": 4.36,
          "acao": "aparecer",
          "alvo": "cinza-5",
          "dur": 0.6
        },
        {
          "at": 5.26,
          "acao": "aparecer",
          "alvo": "sel-0",
          "dur": 0.6
        },
        {
          "at": 5.78,
          "acao": "aparecer",
          "alvo": "sel-2",
          "dur": 0.6
        },
        {
          "at": 6.42,
          "acao": "aparecer",
          "alvo": "sel-3",
          "dur": 0.6
        }
      ],
      "why": "A condição vira verdadeiro ou falso em cada linha, e só as verdadeiras ficam."
    },
    {
      "id": "agrupar",
      "ordem": 6,
      "narration": "O groupby separa por região e o sum resume: Leste 150, Norte 140, Sul 410.",
      "words": [
        {
          "t": "O",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "groupby",
          "s": 0.52,
          "e": 0.8,
          "hl": true
        },
        {
          "t": "separa",
          "s": 0.84,
          "e": 1.24,
          "hl": false
        },
        {
          "t": "por",
          "s": 1.28,
          "e": 1.56,
          "hl": false
        },
        {
          "t": "região",
          "s": 1.6,
          "e": 1.94,
          "hl": true
        },
        {
          "t": "e",
          "s": 1.98,
          "e": 2.26,
          "hl": false
        },
        {
          "t": "o",
          "s": 2.3,
          "e": 2.58,
          "hl": false
        },
        {
          "t": "sum",
          "s": 2.62,
          "e": 2.9,
          "hl": true
        },
        {
          "t": "resume:",
          "s": 2.94,
          "e": 3.34,
          "hl": false
        },
        {
          "t": "Leste",
          "s": 3.58,
          "e": 3.92,
          "hl": false
        },
        {
          "t": "150,",
          "s": 3.96,
          "e": 4.24,
          "hl": false
        },
        {
          "t": "Norte",
          "s": 4.48,
          "e": 4.82,
          "hl": false
        },
        {
          "t": "140,",
          "s": 4.86,
          "e": 5.14,
          "hl": false
        },
        {
          "t": "Sul",
          "s": 5.38,
          "e": 5.66,
          "hl": false
        },
        {
          "t": "410.",
          "s": 5.7,
          "e": 5.98,
          "hl": true
        }
      ],
      "dur": 7.18,
      "terminal": {
        "cmd": "vendas.groupby(\"regiao\")[\"valor\"].sum()",
        "at": 0.52,
        "dur": 2.6
      },
      "status": {
        "tipo": "ok",
        "texto": "SUL VENDEU MAIS: 410",
        "at": 5.7
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "filtro",
          "dur": 0.6
        },
        {
          "at": 0.84,
          "acao": "aparecer",
          "alvo": "grp-sul",
          "dur": 0.7
        },
        {
          "at": 0.84,
          "acao": "aparecer",
          "alvo": "grp-norte",
          "dur": 0.7
        },
        {
          "at": 0.84,
          "acao": "aparecer",
          "alvo": "grp-leste",
          "dur": 0.7
        },
        {
          "at": 2.62,
          "acao": "aparecer",
          "alvo": "resumo",
          "dur": 0.6
        },
        {
          "at": 2.62,
          "acao": "aparecer",
          "alvo": "res-tit",
          "dur": 0.6
        },
        {
          "at": 3.96,
          "acao": "aparecer",
          "alvo": "res-leste",
          "dur": 0.6
        },
        {
          "at": 4.86,
          "acao": "aparecer",
          "alvo": "res-norte",
          "dur": 0.6
        },
        {
          "at": 5.7,
          "acao": "aparecer",
          "alvo": "res-sul",
          "dur": 0.6
        }
      ],
      "why": "Dividir, resumir e juntar: o resultado tem uma linha por categoria."
    },
    {
      "id": "armadilha",
      "ordem": 7,
      "narration": "Armadilha: o and falha em colunas, use o e comercial. E o groupby sozinho só separa: falta o sum.",
      "words": [
        {
          "t": "Armadilha:",
          "s": 0.2,
          "e": 0.66,
          "hl": false
        },
        {
          "t": "o",
          "s": 0.9,
          "e": 1.18,
          "hl": false
        },
        {
          "t": "and",
          "s": 1.22,
          "e": 1.5,
          "hl": true
        },
        {
          "t": "falha",
          "s": 1.54,
          "e": 1.88,
          "hl": false
        },
        {
          "t": "em",
          "s": 1.92,
          "e": 2.2,
          "hl": false
        },
        {
          "t": "colunas,",
          "s": 2.24,
          "e": 2.64,
          "hl": false
        },
        {
          "t": "use",
          "s": 2.88,
          "e": 3.22,
          "hl": false
        },
        {
          "t": "o",
          "s": 3.26,
          "e": 3.54,
          "hl": false
        },
        {
          "t": "e",
          "s": 3.58,
          "e": 3.86,
          "hl": false
        },
        {
          "t": "comercial.",
          "s": 3.9,
          "e": 4.3,
          "hl": true
        },
        {
          "t": "E",
          "s": 4.74,
          "e": 5.02,
          "hl": false
        },
        {
          "t": "o",
          "s": 5.06,
          "e": 5.34,
          "hl": false
        },
        {
          "t": "groupby",
          "s": 5.38,
          "e": 5.66,
          "hl": true
        },
        {
          "t": "sozinho",
          "s": 5.7,
          "e": 6.1,
          "hl": false
        },
        {
          "t": "só",
          "s": 6.14,
          "e": 6.42,
          "hl": false
        },
        {
          "t": "separa:",
          "s": 6.46,
          "e": 6.86,
          "hl": false
        },
        {
          "t": "falta",
          "s": 7.1,
          "e": 7.44,
          "hl": false
        },
        {
          "t": "o",
          "s": 7.48,
          "e": 7.76,
          "hl": false
        },
        {
          "t": "sum.",
          "s": 7.8,
          "e": 8.08,
          "hl": true
        }
      ],
      "dur": 9.28,
      "status": {
        "tipo": "erro",
        "texto": "AND FALHA EM COLUNAS",
        "at": 1.54
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "mesa",
          "dur": 0.6
        },
        {
          "at": 1.22,
          "acao": "aparecer",
          "alvo": "trap-and",
          "dur": 0.7
        },
        {
          "at": 1.22,
          "acao": "desenhar",
          "alvo": "x-and",
          "dur": 0.7
        },
        {
          "at": 3.9,
          "acao": "aparecer",
          "alvo": "trap-e",
          "dur": 0.7
        },
        {
          "at": 3.9,
          "acao": "desenhar",
          "alvo": "ok-e",
          "dur": 0.7
        },
        {
          "at": 5.38,
          "acao": "aparecer",
          "alvo": "trap-grp",
          "dur": 0.8
        },
        {
          "at": 7.8,
          "acao": "aparecer",
          "alvo": "trap-sum",
          "dur": 0.8
        }
      ],
      "why": "Em colunas, combine condições com & e parênteses. O groupby só mostra resultado depois de um resumo."
    },
    {
      "id": "pipeline",
      "ordem": 8,
      "narration": "Na lavoura, a tabela de talhões é filtrada, agrupada e só então entra em um modelo de IA.",
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
          "t": "tabela",
          "s": 1.48,
          "e": 1.88,
          "hl": true
        },
        {
          "t": "de",
          "s": 1.92,
          "e": 2.2,
          "hl": false
        },
        {
          "t": "talhões",
          "s": 2.24,
          "e": 2.58,
          "hl": false
        },
        {
          "t": "é",
          "s": 2.62,
          "e": 2.9,
          "hl": false
        },
        {
          "t": "filtrada,",
          "s": 2.94,
          "e": 3.34,
          "hl": true
        },
        {
          "t": "agrupada",
          "s": 3.58,
          "e": 4.04,
          "hl": true
        },
        {
          "t": "e",
          "s": 4.08,
          "e": 4.36,
          "hl": false
        },
        {
          "t": "só",
          "s": 4.4,
          "e": 4.68,
          "hl": false
        },
        {
          "t": "então",
          "s": 4.72,
          "e": 5.06,
          "hl": false
        },
        {
          "t": "entra",
          "s": 5.1,
          "e": 5.44,
          "hl": false
        },
        {
          "t": "em",
          "s": 5.48,
          "e": 5.76,
          "hl": false
        },
        {
          "t": "um",
          "s": 5.8,
          "e": 6.08,
          "hl": false
        },
        {
          "t": "modelo",
          "s": 6.12,
          "e": 6.52,
          "hl": false
        },
        {
          "t": "de",
          "s": 6.56,
          "e": 6.84,
          "hl": false
        },
        {
          "t": "IA.",
          "s": 6.88,
          "e": 7.16,
          "hl": true
        }
      ],
      "dur": 8.36,
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "armadilhas",
          "dur": 0.6
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "pipe-nota",
          "dur": 0.8
        },
        {
          "at": 1.48,
          "acao": "aparecer",
          "alvo": "pipe-1",
          "dur": 0.7
        },
        {
          "at": 2.94,
          "acao": "desenhar",
          "alvo": "pipe-a1",
          "dur": 0.5
        },
        {
          "at": 2.94,
          "acao": "aparecer",
          "alvo": "pipe-2",
          "dur": 0.7
        },
        {
          "at": 3.58,
          "acao": "desenhar",
          "alvo": "pipe-a2",
          "dur": 0.5
        },
        {
          "at": 3.58,
          "acao": "aparecer",
          "alvo": "pipe-3",
          "dur": 0.7
        },
        {
          "at": 6.88,
          "acao": "desenhar",
          "alvo": "pipe-a3",
          "dur": 0.5
        },
        {
          "at": 6.88,
          "acao": "aparecer",
          "alvo": "pipe-4",
          "dur": 0.8
        }
      ],
      "why": "Em Databricks ou Fabric, filtrar e agrupar aparecem antes de qualquer modelo de IA."
    }
  ],
  "outro": {
    "dur": 8.16,
    "narration": "Filtrar, agrupar e resumir: três linhas respondem a uma tabela inteira. Agora mexa no laboratório.",
    "words": [
      {
        "t": "Filtrar,",
        "s": 0.2,
        "e": 0.54,
        "hl": true
      },
      {
        "t": "agrupar",
        "s": 0.78,
        "e": 1.18,
        "hl": true
      },
      {
        "t": "e",
        "s": 1.22,
        "e": 1.5,
        "hl": false
      },
      {
        "t": "resumir:",
        "s": 1.54,
        "e": 1.94,
        "hl": true
      },
      {
        "t": "três",
        "s": 2.18,
        "e": 2.46,
        "hl": false
      },
      {
        "t": "linhas",
        "s": 2.5,
        "e": 2.84,
        "hl": false
      },
      {
        "t": "respondem",
        "s": 2.88,
        "e": 3.28,
        "hl": false
      },
      {
        "t": "a",
        "s": 3.32,
        "e": 3.6,
        "hl": false
      },
      {
        "t": "uma",
        "s": 3.64,
        "e": 3.98,
        "hl": false
      },
      {
        "t": "tabela",
        "s": 4.02,
        "e": 4.42,
        "hl": false
      },
      {
        "t": "inteira.",
        "s": 4.46,
        "e": 4.86,
        "hl": false
      },
      {
        "t": "Agora",
        "s": 5.3,
        "e": 5.7,
        "hl": false
      },
      {
        "t": "mexa",
        "s": 5.74,
        "e": 6.08,
        "hl": false
      },
      {
        "t": "no",
        "s": 6.12,
        "e": 6.4,
        "hl": false
      },
      {
        "t": "laboratório.",
        "s": 6.44,
        "e": 6.96,
        "hl": true
      }
    ],
    "scene": [
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "pipeline",
        "dur": 0.6
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "pipe-nota",
        "dur": 0.6
      },
      {
        "at": 0.2,
        "acao": "aparecer",
        "alvo": "ot-filtrar",
        "dur": 0.7
      },
      {
        "at": 0.78,
        "acao": "aparecer",
        "alvo": "ot-agrupar",
        "dur": 0.7
      },
      {
        "at": 1.54,
        "acao": "aparecer",
        "alvo": "ot-resumir",
        "dur": 0.7
      },
      {
        "at": 6.44,
        "acao": "destacar",
        "alvo": "guia-braco",
        "dur": 1.2
      }
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "import pandas as pd\nvendas = pd.read_csv(\"vendas.csv\")\ngrandes = vendas[vendas[\"valor\"] > 100]\nprint(len(grandes))\ng = vendas.groupby(\"regiao\")\nprint(g[\"valor\"].sum())",
      "at": 1,
      "dur": 4.8
    }
  }
};
