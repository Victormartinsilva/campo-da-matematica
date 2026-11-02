/* Roteiro do mini-video "R e Python lado a lado" (metafora: duas ferramentas na bancada, uma para cada trabalho). Tempos em segundos desde o inicio de cada peca.
   Numeros calculados por script (mesmos dados do modulo prog/r-py.js): media 21; 4 linhas com mais de 15 casos; Beta 30 + 41 = 71; x[1] no Python = 30. */
window.Explainers = window.Explainers || {};
Explainers["r-py"] = {
  "meta": {
    "id": "r-py",
    "categoria": "PROGRAMAÇÃO E DADOS",
    "area": "prog",
    "titulo": "R e Python lado a lado",
    "duracao": 75,
    "cena": "r-py"
  },
  "pieces": [
    {
      "id": "escolha",
      "ordem": 1,
      "narration": "Você precisa escolher entre R e Python? Ou cada um tem o seu lugar na bancada?",
      "words": [
        {"t": "Você", "s": 0.2, "e": 0.54, "hl": false},
        {"t": "precisa", "s": 0.58, "e": 0.98, "hl": false},
        {"t": "escolher", "s": 1.02, "e": 1.42, "hl": true},
        {"t": "entre", "s": 1.46, "e": 1.8, "hl": false},
        {"t": "R", "s": 1.84, "e": 2.12, "hl": false},
        {"t": "e", "s": 2.16, "e": 2.44, "hl": false},
        {"t": "Python?", "s": 2.48, "e": 2.76, "hl": true},
        {"t": "Ou", "s": 3.2, "e": 3.48, "hl": false},
        {"t": "cada", "s": 3.52, "e": 3.86, "hl": false},
        {"t": "um", "s": 3.9, "e": 4.18, "hl": false},
        {"t": "tem", "s": 4.22, "e": 4.5, "hl": false},
        {"t": "o", "s": 4.54, "e": 4.82, "hl": false},
        {"t": "seu", "s": 4.86, "e": 5.14, "hl": false},
        {"t": "lugar", "s": 5.18, "e": 5.52, "hl": true},
        {"t": "na", "s": 5.56, "e": 5.84, "hl": false},
        {"t": "bancada?", "s": 5.88, "e": 6.28, "hl": true}
      ],
      "dur": 7.48,
      "status": {
        "tipo": "alerta",
        "texto": "UM OU OUTRO?",
        "at": 3.2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "guia",
          "dur": 0.7
        },
        {
          "at": 1.84,
          "acao": "aparecer",
          "alvo": "ferramenta-r",
          "dur": 0.7
        },
        {
          "at": 2.48,
          "acao": "aparecer",
          "alvo": "ferramenta-py",
          "dur": 0.7
        },
        {
          "at": 1.02,
          "acao": "aparecer",
          "alvo": "pergunta",
          "dur": 0.8
        },
        {
          "at": 5.88,
          "acao": "destacar",
          "alvo": "bancada",
          "dur": 0.9
        }
      ],
      "why": "As duas linguagens se completam: cada uma tem o seu trabalho."
    },
    {
      "id": "bancada",
      "ordem": 2,
      "narration": "Numa bancada, o R é o paquímetro, que mede com rigor. O Python é o canivete, que serve a tudo.",
      "words": [
        {"t": "Numa", "s": 0.2, "e": 0.54, "hl": false},
        {"t": "bancada,", "s": 0.58, "e": 0.98, "hl": false},
        {"t": "o", "s": 1.22, "e": 1.5, "hl": false},
        {"t": "R", "s": 1.54, "e": 1.82, "hl": false},
        {"t": "é", "s": 1.86, "e": 2.14, "hl": false},
        {"t": "o", "s": 2.18, "e": 2.46, "hl": false},
        {"t": "paquímetro,", "s": 2.5, "e": 2.96, "hl": true},
        {"t": "que", "s": 3.2, "e": 3.48, "hl": false},
        {"t": "mede", "s": 3.52, "e": 3.86, "hl": false},
        {"t": "com", "s": 3.9, "e": 4.18, "hl": false},
        {"t": "rigor.", "s": 4.22, "e": 4.56, "hl": true},
        {"t": "O", "s": 5, "e": 5.28, "hl": false},
        {"t": "Python", "s": 5.32, "e": 5.6, "hl": false},
        {"t": "é", "s": 5.64, "e": 5.92, "hl": false},
        {"t": "o", "s": 5.96, "e": 6.24, "hl": false},
        {"t": "canivete,", "s": 6.28, "e": 6.74, "hl": true},
        {"t": "que", "s": 6.98, "e": 7.26, "hl": false},
        {"t": "serve", "s": 7.3, "e": 7.64, "hl": false},
        {"t": "a", "s": 7.68, "e": 7.96, "hl": false},
        {"t": "tudo.", "s": 8, "e": 8.34, "hl": true}
      ],
      "dur": 9.54,
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "pergunta",
          "dur": 0.5
        },
        {
          "at": 2.5,
          "acao": "destacar",
          "alvo": "ferramenta-r",
          "dur": 0.9
        },
        {
          "at": 3.52,
          "acao": "aparecer",
          "alvo": "rot-r",
          "dur": 0.6
        },
        {
          "at": 6.28,
          "acao": "destacar",
          "alvo": "ferramenta-py",
          "dur": 0.9
        },
        {
          "at": 7.3,
          "acao": "aparecer",
          "alvo": "rot-py",
          "dur": 0.6
        }
      ],
      "why": "R nasceu para estatística e gráficos. Python é de uso geral e domina a IA."
    },
    {
      "id": "tabela",
      "ordem": 3,
      "narration": "Ambos guardam os dados numa tabela: data frame no R, DataFrame no pandas, com colunas nomeadas.",
      "words": [
        {"t": "Ambos", "s": 0.2, "e": 0.54, "hl": false},
        {"t": "guardam", "s": 0.58, "e": 0.92, "hl": false},
        {"t": "os", "s": 0.96, "e": 1.24, "hl": false},
        {"t": "dados", "s": 1.28, "e": 1.62, "hl": false},
        {"t": "numa", "s": 1.66, "e": 2, "hl": false},
        {"t": "tabela:", "s": 2.04, "e": 2.44, "hl": true},
        {"t": "data", "s": 2.68, "e": 3.02, "hl": false},
        {"t": "frame", "s": 3.06, "e": 3.4, "hl": true},
        {"t": "no", "s": 3.44, "e": 3.72, "hl": false},
        {"t": "R,", "s": 3.76, "e": 4.04, "hl": false},
        {"t": "DataFrame", "s": 4.28, "e": 4.74, "hl": true},
        {"t": "no", "s": 4.78, "e": 5.06, "hl": false},
        {"t": "pandas,", "s": 5.1, "e": 5.44, "hl": false},
        {"t": "com", "s": 5.68, "e": 5.96, "hl": false},
        {"t": "colunas", "s": 6, "e": 6.4, "hl": true},
        {"t": "nomeadas.", "s": 6.44, "e": 6.84, "hl": false}
      ],
      "dur": 8.04,
      "terminal": {
        "cmd": "saude = pd.DataFrame({...})   # 6 linhas, 3 colunas",
        "at": 2.04,
        "dur": 2.4
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-r",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-py",
          "dur": 0.4
        },
        {
          "at": 2.04,
          "acao": "aparecer",
          "alvo": "tabela",
          "dur": 0.8
        },
        {
          "at": 6,
          "acao": "destacar",
          "alvo": "cab-tabela",
          "dur": 0.9
        },
        {
          "at": 6.44,
          "acao": "destacar",
          "alvo": "lin-2",
          "dur": 0.9
        }
      ],
      "why": "Entendeu a tabela em uma linguagem, entendeu nas duas."
    },
    {
      "id": "escrita",
      "ordem": 4,
      "narration": "Filtrar no R é filter; no pandas, colchetes. Agrupar no R é group_by; no pandas, groupby.",
      "words": [
        {"t": "Filtrar", "s": 0.2, "e": 0.54, "hl": false},
        {"t": "no", "s": 0.58, "e": 0.86, "hl": false},
        {"t": "R", "s": 0.9, "e": 1.18, "hl": false},
        {"t": "é", "s": 1.22, "e": 1.5, "hl": false},
        {"t": "filter;", "s": 1.54, "e": 1.88, "hl": true},
        {"t": "no", "s": 2.12, "e": 2.4, "hl": false},
        {"t": "pandas,", "s": 2.44, "e": 2.78, "hl": false},
        {"t": "colchetes.", "s": 3.02, "e": 3.42, "hl": true},
        {"t": "Agrupar", "s": 3.86, "e": 4.26, "hl": false},
        {"t": "no", "s": 4.3, "e": 4.58, "hl": false},
        {"t": "R", "s": 4.62, "e": 4.9, "hl": false},
        {"t": "é", "s": 4.94, "e": 5.22, "hl": false},
        {"t": "group_by;", "s": 5.26, "e": 5.54, "hl": true},
        {"t": "no", "s": 5.78, "e": 6.06, "hl": false},
        {"t": "pandas,", "s": 6.1, "e": 6.44, "hl": false},
        {"t": "groupby.", "s": 6.68, "e": 6.96, "hl": true}
      ],
      "dur": 8.16,
      "status": {
        "tipo": "ok",
        "texto": "MESMA IDEIA, OUTRA ESCRITA",
        "at": 3.86
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tabela",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "cod-filtro",
          "dur": 0.8
        },
        {
          "at": 3.02,
          "acao": "destacar",
          "alvo": "py-filtro",
          "dur": 0.9
        },
        {
          "at": 3.86,
          "acao": "aparecer",
          "alvo": "cod-grupo",
          "dur": 0.8
        },
        {
          "at": 6.68,
          "acao": "destacar",
          "alvo": "py-grupo",
          "dur": 0.9
        }
      ],
      "why": "O plano é o mesmo: filtrar, agrupar e resumir. Muda só a escrita."
    },
    {
      "id": "numeros",
      "ordem": 5,
      "narration": "Nos seis registros, a média é 21 casos. Acima de 15 ficam quatro linhas. Beta soma 71.",
      "words": [
        {"t": "Nos", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "seis", "s": 0.52, "e": 0.8, "hl": false},
        {"t": "registros,", "s": 0.84, "e": 1.24, "hl": false},
        {"t": "a", "s": 1.48, "e": 1.76, "hl": false},
        {"t": "média", "s": 1.8, "e": 2.14, "hl": true},
        {"t": "é", "s": 2.18, "e": 2.46, "hl": false},
        {"t": "21", "s": 2.5, "e": 2.78, "hl": false},
        {"t": "casos.", "s": 2.82, "e": 3.16, "hl": false},
        {"t": "Acima", "s": 3.6, "e": 4, "hl": true},
        {"t": "de", "s": 4.04, "e": 4.32, "hl": false},
        {"t": "15", "s": 4.36, "e": 4.64, "hl": false},
        {"t": "ficam", "s": 4.68, "e": 5.02, "hl": false},
        {"t": "quatro", "s": 5.06, "e": 5.4, "hl": true},
        {"t": "linhas.", "s": 5.44, "e": 5.78, "hl": false},
        {"t": "Beta", "s": 6.22, "e": 6.56, "hl": true},
        {"t": "soma", "s": 6.6, "e": 6.94, "hl": false},
        {"t": "71.", "s": 6.98, "e": 7.26, "hl": false}
      ],
      "dur": 8.46,
      "terminal": {
        "cmd": "saude[\"casos\"].mean()   # 21.0",
        "at": 0.2,
        "dur": 2.2
      },
      "status": {
        "tipo": "ok",
        "texto": "AS DUAS DÃO 21, 4 E 71",
        "at": 3.6
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "cod-filtro",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "cod-grupo",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "tabela",
          "dur": 0.8
        },
        {
          "at": 1.8,
          "acao": "aparecer",
          "alvo": "col-casos",
          "dur": 0.7
        },
        {
          "at": 2.5,
          "acao": "aparecer",
          "alvo": "res-media",
          "dur": 0.7
        },
        {
          "at": 3.6,
          "acao": "aparecer",
          "alvo": "marcas-15",
          "dur": 0.8
        },
        {
          "at": 5.06,
          "acao": "aparecer",
          "alvo": "res-filtro",
          "dur": 0.7
        },
        {
          "at": 6.22,
          "acao": "aparecer",
          "alvo": "res-beta",
          "dur": 0.7
        }
      ],
      "why": "Mesmos dados, mesmas respostas nas duas linguagens."
    },
    {
      "id": "indice",
      "ordem": 6,
      "narration": "No R o primeiro item é x[1]; no Python, x[0]. Quem usa x[1] no Python pega o segundo.",
      "words": [
        {"t": "No", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "R", "s": 0.52, "e": 0.8, "hl": false},
        {"t": "o", "s": 0.84, "e": 1.12, "hl": false},
        {"t": "primeiro", "s": 1.16, "e": 1.56, "hl": true},
        {"t": "item", "s": 1.6, "e": 1.94, "hl": false},
        {"t": "é", "s": 1.98, "e": 2.26, "hl": false},
        {"t": "x[1];", "s": 2.3, "e": 2.58, "hl": false},
        {"t": "no", "s": 2.82, "e": 3.1, "hl": false},
        {"t": "Python,", "s": 3.14, "e": 3.42, "hl": false},
        {"t": "x[0].", "s": 3.66, "e": 3.94, "hl": true},
        {"t": "Quem", "s": 4.38, "e": 4.66, "hl": false},
        {"t": "usa", "s": 4.7, "e": 5.04, "hl": false},
        {"t": "x[1]", "s": 5.08, "e": 5.36, "hl": false},
        {"t": "no", "s": 5.4, "e": 5.68, "hl": false},
        {"t": "Python", "s": 5.72, "e": 6, "hl": false},
        {"t": "pega", "s": 6.04, "e": 6.38, "hl": true},
        {"t": "o", "s": 6.42, "e": 6.7, "hl": false},
        {"t": "segundo.", "s": 6.74, "e": 7.14, "hl": true}
      ],
      "dur": 8.34,
      "status": {
        "tipo": "erro",
        "texto": "x[1] NO PYTHON DÁ 30, O SEGUNDO",
        "at": 4.38
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tabela",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "col-casos",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "marcas-15",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "res-media",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "res-filtro",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "res-beta",
          "dur": 0.5
        },
        {
          "at": 1.16,
          "acao": "aparecer",
          "alvo": "fila",
          "dur": 0.8
        },
        {
          "at": 2.3,
          "acao": "aparecer",
          "alvo": "idx-r",
          "dur": 0.6
        },
        {
          "at": 2.3,
          "acao": "destacar",
          "alvo": "caixa-1",
          "dur": 0.8
        },
        {
          "at": 3.66,
          "acao": "aparecer",
          "alvo": "idx-py",
          "dur": 0.6
        },
        {
          "at": 3.66,
          "acao": "destacar",
          "alvo": "caixa-1",
          "dur": 0.8
        },
        {
          "at": 6.74,
          "acao": "aparecer",
          "alvo": "seta-x1",
          "dur": 0.7
        },
        {
          "at": 6.74,
          "acao": "destacar",
          "alvo": "caixa-2",
          "dur": 0.9
        }
      ],
      "why": "O R conta a partir de 1 e o Python a partir de 0. É a diferença que mais confunde."
    },
    {
      "id": "filtro",
      "ordem": 7,
      "narration": "Outro tropeço: escrever saude[casos>15], como no dplyr. No pandas, a coluna precisa vir da tabela.",
      "words": [
        {"t": "Outro", "s": 0.2, "e": 0.54, "hl": false},
        {"t": "tropeço:", "s": 0.58, "e": 0.98, "hl": true},
        {"t": "escrever", "s": 1.22, "e": 1.62, "hl": false},
        {"t": "saude[casos>15],", "s": 1.66, "e": 2.12, "hl": false},
        {"t": "como", "s": 2.36, "e": 2.7, "hl": false},
        {"t": "no", "s": 2.74, "e": 3.02, "hl": false},
        {"t": "dplyr.", "s": 3.06, "e": 3.34, "hl": true},
        {"t": "No", "s": 3.78, "e": 4.06, "hl": false},
        {"t": "pandas,", "s": 4.1, "e": 4.44, "hl": true},
        {"t": "a", "s": 4.68, "e": 4.96, "hl": false},
        {"t": "coluna", "s": 5, "e": 5.4, "hl": true},
        {"t": "precisa", "s": 5.44, "e": 5.84, "hl": false},
        {"t": "vir", "s": 5.88, "e": 6.16, "hl": false},
        {"t": "da", "s": 6.2, "e": 6.48, "hl": false},
        {"t": "tabela.", "s": 6.52, "e": 6.92, "hl": false}
      ],
      "dur": 8.12,
      "terminal": {
        "cmd": "saude[saude[\"casos\"] > 15]   # 4 linhas",
        "at": 5,
        "dur": 2.4
      },
      "status": {
        "tipo": "erro",
        "texto": "ERRO: CASOS NÃO EXISTE SOZINHA",
        "at": 2.36
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "fila",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "idx-r",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "idx-py",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "seta-x1",
          "dur": 0.5
        },
        {
          "at": 1.22,
          "acao": "aparecer",
          "alvo": "filtro-errado",
          "dur": 0.7
        },
        {
          "at": 3.06,
          "acao": "desenhar",
          "alvo": "x-errado",
          "dur": 0.7
        },
        {
          "at": 5,
          "acao": "aparecer",
          "alvo": "filtro-certo",
          "dur": 0.8
        },
        {
          "at": 6.52,
          "acao": "destacar",
          "alvo": "filtro-certo",
          "dur": 0.9
        }
      ],
      "why": "No pandas a coluna sai da tabela: saude[\"casos\"]."
    },
    {
      "id": "trabalho",
      "ordem": 8,
      "narration": "Em IA, o R analisa e publica; o Python leva o modelo à produção. Equipes de dados usam os dois.",
      "words": [
        {"t": "Em", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "IA,", "s": 0.52, "e": 0.8, "hl": false},
        {"t": "o", "s": 1.04, "e": 1.32, "hl": false},
        {"t": "R", "s": 1.36, "e": 1.64, "hl": false},
        {"t": "analisa", "s": 1.68, "e": 2.14, "hl": true},
        {"t": "e", "s": 2.18, "e": 2.46, "hl": false},
        {"t": "publica;", "s": 2.5, "e": 2.9, "hl": false},
        {"t": "o", "s": 3.14, "e": 3.42, "hl": false},
        {"t": "Python", "s": 3.46, "e": 3.74, "hl": true},
        {"t": "leva", "s": 3.78, "e": 4.12, "hl": false},
        {"t": "o", "s": 4.16, "e": 4.44, "hl": false},
        {"t": "modelo", "s": 4.48, "e": 4.88, "hl": false},
        {"t": "à", "s": 4.92, "e": 5.2, "hl": false},
        {"t": "produção.", "s": 5.24, "e": 5.64, "hl": true},
        {"t": "Equipes", "s": 6.08, "e": 6.48, "hl": false},
        {"t": "de", "s": 6.52, "e": 6.8, "hl": false},
        {"t": "dados", "s": 6.84, "e": 7.18, "hl": false},
        {"t": "usam", "s": 7.22, "e": 7.56, "hl": false},
        {"t": "os", "s": 7.6, "e": 7.88, "hl": false},
        {"t": "dois.", "s": 7.92, "e": 8.2, "hl": true}
      ],
      "dur": 9.4,
      "status": {
        "tipo": "ok",
        "texto": "OS DOIS CONVIVEM NA EQUIPE",
        "at": 6.08
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "filtro-errado",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "x-errado",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "filtro-certo",
          "dur": 0.5
        },
        {
          "at": 1.68,
          "acao": "aparecer",
          "alvo": "uso-r",
          "dur": 0.8
        },
        {
          "at": 1.68,
          "acao": "destacar",
          "alvo": "ferramenta-r",
          "dur": 0.9
        },
        {
          "at": 3.78,
          "acao": "aparecer",
          "alvo": "uso-py",
          "dur": 0.8
        },
        {
          "at": 5.24,
          "acao": "destacar",
          "alvo": "ferramenta-py",
          "dur": 0.9
        },
        {
          "at": 7.92,
          "acao": "destacar",
          "alvo": "bancada",
          "dur": 0.9
        }
      ],
      "why": "No trabalho com dados e IA, saber ler os dois amplia o que você aproveita."
    }
  ],
  "outro": {
    "dur": 7.48,
    "narration": "Tabela, filtro, grupo e resumo valem nas duas. Agora rode o Python no laboratório.",
    "words": [
      {"t": "Tabela,", "s": 0.2, "e": 0.6, "hl": false},
      {"t": "filtro,", "s": 0.84, "e": 1.18, "hl": false},
      {"t": "grupo", "s": 1.42, "e": 1.76, "hl": false},
      {"t": "e", "s": 1.8, "e": 2.08, "hl": false},
      {"t": "resumo", "s": 2.12, "e": 2.52, "hl": false},
      {"t": "valem", "s": 2.56, "e": 2.9, "hl": false},
      {"t": "nas", "s": 2.94, "e": 3.22, "hl": false},
      {"t": "duas.", "s": 3.26, "e": 3.54, "hl": false},
      {"t": "Agora", "s": 3.98, "e": 4.38, "hl": false},
      {"t": "rode", "s": 4.42, "e": 4.76, "hl": false},
      {"t": "o", "s": 4.8, "e": 5.08, "hl": false},
      {"t": "Python", "s": 5.12, "e": 5.4, "hl": false},
      {"t": "no", "s": 5.44, "e": 5.72, "hl": false},
      {"t": "laboratório.", "s": 5.76, "e": 6.28, "hl": false}
    ],
    "scene": [
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "uso-r",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "uso-py",
        "dur": 0.5
      },
      {
        "at": 5.76,
        "acao": "destacar",
        "alvo": "guia-braco",
        "dur": 1.2
      }
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "import pandas as pd\nsaude = pd.DataFrame(...)\nsaude[\"casos\"].mean()\nsaude[saude[\"casos\"] > 15]\nsaude.groupby(\"municipio\")",
      "at": 0.2,
      "dur": 4.2
    }
  }
};
