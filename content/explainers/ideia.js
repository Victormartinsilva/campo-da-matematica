/* Roteiro do mini-video "A grande ideia do cálculo" (metáfora: trilha em subida, altitude e inclinação). Tempos em segundos desde o início de cada peça. */
window.Explainers = window.Explainers || {};
Explainers.ideia = {
  "meta": {
    "id": "ideia",
    "categoria": "CÁLCULO",
    "area": "calculo",
    "titulo": "A grande ideia do cálculo",
    "duracao": 68,
    "cena": "ideia"
  },
  "pieces": [
    {
      "id": "trilha",
      "ordem": 1,
      "narration": "Numa trilha, a altitude é o total subido. A inclinação é o ritmo da subida agora.",
      "words": [
        {
          "t": "Numa",
          "s": 0.2,
          "e": 0.54,
          "hl": false
        },
        {
          "t": "trilha,",
          "s": 0.58,
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
          "t": "altitude",
          "s": 1.48,
          "e": 1.94,
          "hl": true
        },
        {
          "t": "é",
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
          "t": "total",
          "s": 2.62,
          "e": 2.96,
          "hl": true
        },
        {
          "t": "subido.",
          "s": 3,
          "e": 3.4,
          "hl": false
        },
        {
          "t": "A",
          "s": 3.84,
          "e": 4.12,
          "hl": false
        },
        {
          "t": "inclinação",
          "s": 4.16,
          "e": 4.62,
          "hl": true
        },
        {
          "t": "é",
          "s": 4.66,
          "e": 4.94,
          "hl": false
        },
        {
          "t": "o",
          "s": 4.98,
          "e": 5.26,
          "hl": false
        },
        {
          "t": "ritmo",
          "s": 5.3,
          "e": 5.64,
          "hl": true
        },
        {
          "t": "da",
          "s": 5.68,
          "e": 5.96,
          "hl": false
        },
        {
          "t": "subida",
          "s": 6,
          "e": 6.4,
          "hl": false
        },
        {
          "t": "agora.",
          "s": 6.44,
          "e": 6.84,
          "hl": false
        }
      ],
      "dur": 8.04,
      "terminal": {
        "cmd": "altitude(x) = 12·x² − (4/3)·x³   # metros",
        "at": 1.48,
        "dur": 2.2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "guia",
          "dur": 0.7
        },
        {
          "at": 0.58,
          "acao": "desenhar",
          "alvo": "eixos-a",
          "dur": 0.9
        },
        {
          "at": 0.58,
          "acao": "aparecer",
          "alvo": "colina",
          "dur": 0.9
        },
        {
          "at": 0.58,
          "acao": "desenhar",
          "alvo": "alt",
          "dur": 1.6
        },
        {
          "at": 0.58,
          "acao": "aparecer",
          "alvo": "trilheiro",
          "dur": 0.7
        },
        {
          "at": 1.48,
          "acao": "aparecer",
          "alvo": "rot-alt",
          "dur": 0.6
        },
        {
          "at": 2.62,
          "acao": "destacar",
          "alvo": "alt",
          "dur": 0.8
        },
        {
          "at": 4.16,
          "acao": "aparecer",
          "alvo": "rot-incl",
          "dur": 0.6
        },
        {
          "at": 4.16,
          "acao": "mover",
          "alvo": "trilheiro",
          "dur": 1.4,
          "para": {
            "x": 85,
            "y": -18
          }
        },
        {
          "at": 5.3,
          "acao": "destacar",
          "alvo": "rot-incl",
          "dur": 0.9
        },
        {
          "at": 6.44,
          "acao": "mover",
          "alvo": "trilheiro",
          "dur": 1,
          "para": {
            "x": 170,
            "y": -57.6
          }
        }
      ],
      "why": "Total e taxa são duas leituras da mesma trilha."
    },
    {
      "id": "media",
      "ordem": 2,
      "narration": "Entre dois pontos, a subida dividida pela distância dá a inclinação média.",
      "words": [
        {
          "t": "Entre",
          "s": 0.2,
          "e": 0.54,
          "hl": false
        },
        {
          "t": "dois",
          "s": 0.58,
          "e": 0.86,
          "hl": false
        },
        {
          "t": "pontos,",
          "s": 0.9,
          "e": 1.24,
          "hl": false
        },
        {
          "t": "a",
          "s": 1.48,
          "e": 1.76,
          "hl": false
        },
        {
          "t": "subida",
          "s": 1.8,
          "e": 2.2,
          "hl": true
        },
        {
          "t": "dividida",
          "s": 2.24,
          "e": 2.7,
          "hl": false
        },
        {
          "t": "pela",
          "s": 2.74,
          "e": 3.08,
          "hl": false
        },
        {
          "t": "distância",
          "s": 3.12,
          "e": 3.52,
          "hl": true
        },
        {
          "t": "dá",
          "s": 3.56,
          "e": 3.84,
          "hl": false
        },
        {
          "t": "a",
          "s": 3.88,
          "e": 4.16,
          "hl": false
        },
        {
          "t": "inclinação",
          "s": 4.2,
          "e": 4.66,
          "hl": false
        },
        {
          "t": "média.",
          "s": 4.7,
          "e": 5.04,
          "hl": true
        }
      ],
      "dur": 6.24,
      "terminal": {
        "cmd": "(A(5) − A(1)) / (5 − 1) = 30,7 m/km",
        "at": 1.8,
        "dur": 2.2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-incl",
          "dur": 0.4
        },
        {
          "at": 0.58,
          "acao": "aparecer",
          "alvo": "pts-ab",
          "dur": 0.6
        },
        {
          "at": 0.9,
          "acao": "desenhar",
          "alvo": "sec-1",
          "dur": 1
        },
        {
          "at": 1.8,
          "acao": "desenhar",
          "alvo": "tri-sub",
          "dur": 0.7
        },
        {
          "at": 1.8,
          "acao": "aparecer",
          "alvo": "rot-subida",
          "dur": 0.5
        },
        {
          "at": 3.12,
          "acao": "desenhar",
          "alvo": "tri-dist",
          "dur": 0.7
        },
        {
          "at": 3.12,
          "acao": "aparecer",
          "alvo": "rot-dist",
          "dur": 0.5
        },
        {
          "at": 4.2,
          "acao": "destacar",
          "alvo": "sec-1",
          "dur": 0.9
        },
        {
          "at": 4.7,
          "acao": "aparecer",
          "alvo": "rot-media",
          "dur": 0.6
        }
      ],
      "why": "Subida dividida pela distância é a taxa média no trecho."
    },
    {
      "id": "agora",
      "ordem": 3,
      "narration": "Aproxime os pontos até colar. A secante vira tangente: 36 metros por quilômetro.",
      "words": [
        {
          "t": "Aproxime",
          "s": 0.2,
          "e": 0.66,
          "hl": false
        },
        {
          "t": "os",
          "s": 0.7,
          "e": 0.98,
          "hl": false
        },
        {
          "t": "pontos",
          "s": 1.02,
          "e": 1.36,
          "hl": false
        },
        {
          "t": "até",
          "s": 1.4,
          "e": 1.74,
          "hl": false
        },
        {
          "t": "colar.",
          "s": 1.78,
          "e": 2.12,
          "hl": false
        },
        {
          "t": "A",
          "s": 2.56,
          "e": 2.84,
          "hl": false
        },
        {
          "t": "secante",
          "s": 2.88,
          "e": 3.28,
          "hl": true
        },
        {
          "t": "vira",
          "s": 3.32,
          "e": 3.66,
          "hl": false
        },
        {
          "t": "tangente:",
          "s": 3.7,
          "e": 4.1,
          "hl": true
        },
        {
          "t": "36",
          "s": 4.34,
          "e": 4.62,
          "hl": true
        },
        {
          "t": "metros",
          "s": 4.66,
          "e": 5,
          "hl": false
        },
        {
          "t": "por",
          "s": 5.04,
          "e": 5.32,
          "hl": false
        },
        {
          "t": "quilômetro.",
          "s": 5.36,
          "e": 5.82,
          "hl": true
        }
      ],
      "dur": 7.02,
      "terminal": {
        "cmd": "(A(3+h) − A(3−h)) / (2h)   # h = 2, 1, 0,5 e h → 0",
        "at": 1.02,
        "dur": 2.6
      },
      "status": {
        "tipo": "ok",
        "texto": "SECANTE VIRA TANGENTE",
        "at": 3.7
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tri-sub",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tri-dist",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-subida",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-dist",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-media",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "placar",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "pl-0",
          "dur": 0.4
        },
        {
          "at": 1.02,
          "acao": "sumir",
          "alvo": "sec-1",
          "dur": 0.4
        },
        {
          "at": 1.02,
          "acao": "desenhar",
          "alvo": "sec-2",
          "dur": 0.8
        },
        {
          "at": 1.02,
          "acao": "aparecer",
          "alvo": "pl-1",
          "dur": 0.4
        },
        {
          "at": 1.78,
          "acao": "sumir",
          "alvo": "sec-2",
          "dur": 0.4
        },
        {
          "at": 1.78,
          "acao": "desenhar",
          "alvo": "sec-3",
          "dur": 0.8
        },
        {
          "at": 1.78,
          "acao": "aparecer",
          "alvo": "pl-2",
          "dur": 0.4
        },
        {
          "at": 2.88,
          "acao": "destacar",
          "alvo": "sec-3",
          "dur": 0.8
        },
        {
          "at": 3.7,
          "acao": "sumir",
          "alvo": "sec-3",
          "dur": 0.4
        },
        {
          "at": 3.7,
          "acao": "sumir",
          "alvo": "pts-ab",
          "dur": 0.4
        },
        {
          "at": 3.7,
          "acao": "desenhar",
          "alvo": "tang",
          "dur": 0.9
        },
        {
          "at": 3.7,
          "acao": "aparecer",
          "alvo": "pl-3",
          "dur": 0.5
        },
        {
          "at": 4.34,
          "acao": "aparecer",
          "alvo": "rot-t",
          "dur": 0.5
        },
        {
          "at": 4.34,
          "acao": "destacar",
          "alvo": "tang",
          "dur": 0.8
        }
      ],
      "why": "A inclinação num ponto é o limite das inclinações médias de trechos cada vez menores."
    },
    {
      "id": "taxa",
      "ordem": 4,
      "narration": "Marque essa inclinação em outro gráfico. Em cada ponto, a altura é a taxa.",
      "words": [
        {
          "t": "Marque",
          "s": 0.2,
          "e": 0.54,
          "hl": false
        },
        {
          "t": "essa",
          "s": 0.58,
          "e": 0.92,
          "hl": false
        },
        {
          "t": "inclinação",
          "s": 0.96,
          "e": 1.42,
          "hl": false
        },
        {
          "t": "em",
          "s": 1.46,
          "e": 1.74,
          "hl": false
        },
        {
          "t": "outro",
          "s": 1.78,
          "e": 2.12,
          "hl": false
        },
        {
          "t": "gráfico.",
          "s": 2.16,
          "e": 2.56,
          "hl": true
        },
        {
          "t": "Em",
          "s": 3,
          "e": 3.28,
          "hl": false
        },
        {
          "t": "cada",
          "s": 3.32,
          "e": 3.66,
          "hl": false
        },
        {
          "t": "ponto,",
          "s": 3.7,
          "e": 4.04,
          "hl": true
        },
        {
          "t": "a",
          "s": 4.28,
          "e": 4.56,
          "hl": false
        },
        {
          "t": "altura",
          "s": 4.6,
          "e": 5,
          "hl": true
        },
        {
          "t": "é",
          "s": 5.04,
          "e": 5.32,
          "hl": false
        },
        {
          "t": "a",
          "s": 5.36,
          "e": 5.64,
          "hl": false
        },
        {
          "t": "taxa.",
          "s": 5.68,
          "e": 6.02,
          "hl": true
        }
      ],
      "dur": 7.22,
      "terminal": {
        "cmd": "taxa(x) = 4·x·(6 − x)   # derivada da altitude",
        "at": 0.2,
        "dur": 2.2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "placar",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-t",
          "dur": 0.3
        },
        {
          "at": 0.2,
          "acao": "desenhar",
          "alvo": "eixos-r",
          "dur": 0.9
        },
        {
          "at": 0.96,
          "acao": "aparecer",
          "alvo": "pt-r",
          "dur": 0.6
        },
        {
          "at": 0.96,
          "acao": "desenhar",
          "alvo": "guia-x",
          "dur": 0.7
        },
        {
          "at": 2.16,
          "acao": "aparecer",
          "alvo": "rot-r",
          "dur": 0.6
        },
        {
          "at": 3.32,
          "acao": "desenhar",
          "alvo": "curva-r",
          "dur": 2
        },
        {
          "at": 4.6,
          "acao": "destacar",
          "alvo": "pt-r",
          "dur": 1
        },
        {
          "at": 5.68,
          "acao": "destacar",
          "alvo": "curva-r",
          "dur": 1
        }
      ],
      "why": "O gráfico da taxa guarda a inclinação de cada ponto da trilha."
    },
    {
      "id": "area",
      "ordem": 5,
      "narration": "Some a taxa em faixas finas. A área sob ela devolve a altitude: 72 metros em 3 quilômetros.",
      "words": [
        {
          "t": "Some",
          "s": 0.2,
          "e": 0.54,
          "hl": false
        },
        {
          "t": "a",
          "s": 0.58,
          "e": 0.86,
          "hl": false
        },
        {
          "t": "taxa",
          "s": 0.9,
          "e": 1.24,
          "hl": false
        },
        {
          "t": "em",
          "s": 1.28,
          "e": 1.56,
          "hl": false
        },
        {
          "t": "faixas",
          "s": 1.6,
          "e": 1.94,
          "hl": true
        },
        {
          "t": "finas.",
          "s": 1.98,
          "e": 2.32,
          "hl": false
        },
        {
          "t": "A",
          "s": 2.76,
          "e": 3.04,
          "hl": false
        },
        {
          "t": "área",
          "s": 3.08,
          "e": 3.42,
          "hl": true
        },
        {
          "t": "sob",
          "s": 3.46,
          "e": 3.74,
          "hl": false
        },
        {
          "t": "ela",
          "s": 3.78,
          "e": 4.12,
          "hl": false
        },
        {
          "t": "devolve",
          "s": 4.16,
          "e": 4.56,
          "hl": false
        },
        {
          "t": "a",
          "s": 4.6,
          "e": 4.88,
          "hl": false
        },
        {
          "t": "altitude:",
          "s": 4.92,
          "e": 5.38,
          "hl": true
        },
        {
          "t": "72",
          "s": 5.62,
          "e": 5.9,
          "hl": true
        },
        {
          "t": "metros",
          "s": 5.94,
          "e": 6.28,
          "hl": false
        },
        {
          "t": "em",
          "s": 6.32,
          "e": 6.6,
          "hl": false
        },
        {
          "t": "3",
          "s": 6.64,
          "e": 6.92,
          "hl": false
        },
        {
          "t": "quilômetros.",
          "s": 6.96,
          "e": 7.42,
          "hl": false
        }
      ],
      "dur": 8.62,
      "terminal": {
        "cmd": "∫₀³ taxa(x) dx = 72 m   # altitude em x = 3",
        "at": 3.08,
        "dur": 2.4
      },
      "status": {
        "tipo": "ok",
        "texto": "ÁREA = GANHO DE ALTITUDE",
        "at": 5.62
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tang",
          "dur": 0.4
        },
        {
          "at": 0.9,
          "acao": "destacar",
          "alvo": "curva-r",
          "dur": 0.9
        },
        {
          "at": 1.6,
          "acao": "aparecer",
          "alvo": "faixas-r",
          "dur": 0.8
        },
        {
          "at": 3.08,
          "acao": "sumir",
          "alvo": "faixas-r",
          "dur": 0.8
        },
        {
          "at": 3.08,
          "acao": "aparecer",
          "alvo": "area-r",
          "dur": 0.8
        },
        {
          "at": 4.92,
          "acao": "aparecer",
          "alvo": "rot-72",
          "dur": 0.6
        },
        {
          "at": 4.92,
          "acao": "destacar",
          "alvo": "trilheiro",
          "dur": 0.9
        },
        {
          "at": 5.62,
          "acao": "aparecer",
          "alvo": "rot-area",
          "dur": 0.6
        },
        {
          "at": 5.62,
          "acao": "destacar",
          "alvo": "area-r",
          "dur": 1
        }
      ],
      "why": "A área sob a taxa é quanto o total cresceu naquele trecho."
    },
    {
      "id": "inverso",
      "ordem": 6,
      "narration": "Derivar o total dá a taxa. Somar a taxa dá o total. Uma conta desfaz a outra.",
      "words": [
        {
          "t": "Derivar",
          "s": 0.2,
          "e": 0.6,
          "hl": true
        },
        {
          "t": "o",
          "s": 0.64,
          "e": 0.92,
          "hl": false
        },
        {
          "t": "total",
          "s": 0.96,
          "e": 1.3,
          "hl": false
        },
        {
          "t": "dá",
          "s": 1.34,
          "e": 1.62,
          "hl": false
        },
        {
          "t": "a",
          "s": 1.66,
          "e": 1.94,
          "hl": false
        },
        {
          "t": "taxa.",
          "s": 1.98,
          "e": 2.32,
          "hl": false
        },
        {
          "t": "Somar",
          "s": 2.76,
          "e": 3.1,
          "hl": true
        },
        {
          "t": "a",
          "s": 3.14,
          "e": 3.42,
          "hl": false
        },
        {
          "t": "taxa",
          "s": 3.46,
          "e": 3.8,
          "hl": false
        },
        {
          "t": "dá",
          "s": 3.84,
          "e": 4.12,
          "hl": false
        },
        {
          "t": "o",
          "s": 4.16,
          "e": 4.44,
          "hl": false
        },
        {
          "t": "total.",
          "s": 4.48,
          "e": 4.82,
          "hl": false
        },
        {
          "t": "Uma",
          "s": 5.26,
          "e": 5.6,
          "hl": false
        },
        {
          "t": "conta",
          "s": 5.64,
          "e": 5.98,
          "hl": false
        },
        {
          "t": "desfaz",
          "s": 6.02,
          "e": 6.36,
          "hl": true
        },
        {
          "t": "a",
          "s": 6.4,
          "e": 6.68,
          "hl": false
        },
        {
          "t": "outra.",
          "s": 6.72,
          "e": 7.06,
          "hl": false
        }
      ],
      "dur": 8.26,
      "terminal": {
        "cmd": "A′(x) = taxa(x)   e   ∫ₐᵇ taxa dx = A(b) − A(a)",
        "at": 0.2,
        "dur": 2.6
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "teorema",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "tc-d",
          "dur": 0.6
        },
        {
          "at": 2.76,
          "acao": "aparecer",
          "alvo": "tc-s",
          "dur": 0.6
        },
        {
          "at": 6.02,
          "acao": "destacar",
          "alvo": "teorema",
          "dur": 0.9
        },
        {
          "at": 6.72,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        }
      ],
      "why": "É o teorema fundamental: derivar e somar são operações inversas."
    },
    {
      "id": "dados",
      "ordem": 7,
      "narration": "Em dados, a diferença entre totais seguidos dá a taxa. A soma acumulada devolve o total.",
      "words": [
        {
          "t": "Em",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "dados,",
          "s": 0.52,
          "e": 0.86,
          "hl": true
        },
        {
          "t": "a",
          "s": 1.1,
          "e": 1.38,
          "hl": false
        },
        {
          "t": "diferença",
          "s": 1.42,
          "e": 1.88,
          "hl": true
        },
        {
          "t": "entre",
          "s": 1.92,
          "e": 2.26,
          "hl": false
        },
        {
          "t": "totais",
          "s": 2.3,
          "e": 2.64,
          "hl": false
        },
        {
          "t": "seguidos",
          "s": 2.68,
          "e": 3.08,
          "hl": false
        },
        {
          "t": "dá",
          "s": 3.12,
          "e": 3.4,
          "hl": false
        },
        {
          "t": "a",
          "s": 3.44,
          "e": 3.72,
          "hl": false
        },
        {
          "t": "taxa.",
          "s": 3.76,
          "e": 4.1,
          "hl": true
        },
        {
          "t": "A",
          "s": 4.54,
          "e": 4.82,
          "hl": false
        },
        {
          "t": "soma",
          "s": 4.86,
          "e": 5.2,
          "hl": false
        },
        {
          "t": "acumulada",
          "s": 5.24,
          "e": 5.76,
          "hl": true
        },
        {
          "t": "devolve",
          "s": 5.8,
          "e": 6.2,
          "hl": false
        },
        {
          "t": "o",
          "s": 6.24,
          "e": 6.52,
          "hl": false
        },
        {
          "t": "total.",
          "s": 6.56,
          "e": 6.9,
          "hl": false
        }
      ],
      "dur": 8.1,
      "terminal": {
        "cmd": "taxa = np.diff(total)   # 120, 180, 180, 120, 60",
        "at": 1.42,
        "dur": 2.4
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "painel-alt",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "painel-r",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "teorema",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tc-d",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tc-s",
          "dur": 0.5
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "dados",
          "dur": 0.6
        },
        {
          "at": 0.52,
          "acao": "desenhar",
          "alvo": "dados-linha",
          "dur": 1.4
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "dados-pts",
          "dur": 1
        },
        {
          "at": 1.42,
          "acao": "aparecer",
          "alvo": "rot-diff",
          "dur": 0.5
        },
        {
          "at": 3.76,
          "acao": "aparecer",
          "alvo": "dados-barras",
          "dur": 0.9
        },
        {
          "at": 5.24,
          "acao": "aparecer",
          "alvo": "rot-cum",
          "dur": 0.5
        },
        {
          "at": 5.24,
          "acao": "destacar",
          "alvo": "dados-linha",
          "dur": 1
        },
        {
          "at": 6.56,
          "acao": "destacar",
          "alvo": "dados-pts",
          "dur": 0.9
        }
      ],
      "why": "Em dados discretos, diff e cumsum fazem o papel de derivar e somar."
    },
    {
      "id": "partida",
      "ordem": 8,
      "narration": "A taxa ignora o ponto de partida. Duas trilhas, uma 30 metros acima, têm a mesma inclinação.",
      "words": [
        {
          "t": "A",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "taxa",
          "s": 0.52,
          "e": 0.86,
          "hl": true
        },
        {
          "t": "ignora",
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
          "t": "ponto",
          "s": 1.66,
          "e": 2,
          "hl": false
        },
        {
          "t": "de",
          "s": 2.04,
          "e": 2.32,
          "hl": false
        },
        {
          "t": "partida.",
          "s": 2.36,
          "e": 2.76,
          "hl": true
        },
        {
          "t": "Duas",
          "s": 3.2,
          "e": 3.48,
          "hl": false
        },
        {
          "t": "trilhas,",
          "s": 3.52,
          "e": 3.86,
          "hl": false
        },
        {
          "t": "uma",
          "s": 4.1,
          "e": 4.44,
          "hl": false
        },
        {
          "t": "30",
          "s": 4.48,
          "e": 4.76,
          "hl": true
        },
        {
          "t": "metros",
          "s": 4.8,
          "e": 5.14,
          "hl": false
        },
        {
          "t": "acima,",
          "s": 5.18,
          "e": 5.58,
          "hl": false
        },
        {
          "t": "têm",
          "s": 5.82,
          "e": 6.1,
          "hl": false
        },
        {
          "t": "a",
          "s": 6.14,
          "e": 6.42,
          "hl": false
        },
        {
          "t": "mesma",
          "s": 6.46,
          "e": 6.8,
          "hl": false
        },
        {
          "t": "inclinação.",
          "s": 6.84,
          "e": 7.3,
          "hl": true
        }
      ],
      "dur": 8.5,
      "terminal": {
        "cmd": "(A(x) + 30)′ = A′(x)   # a constante some na derivada",
        "at": 3.2,
        "dur": 2.4
      },
      "status": {
        "tipo": "alerta",
        "texto": "SOME A TAXA AO PONTO DE PARTIDA",
        "at": 6.84
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "dados",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "painel-alt",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "painel-r",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "area-r",
          "dur": 0.3
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "faixas-r",
          "dur": 0.3
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-72",
          "dur": 0.3
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-area",
          "dur": 0.3
        },
        {
          "at": 0.52,
          "acao": "destacar",
          "alvo": "curva-r",
          "dur": 0.9
        },
        {
          "at": 2.36,
          "acao": "destacar",
          "alvo": "trilheiro",
          "dur": 0.8
        },
        {
          "at": 3.2,
          "acao": "desenhar",
          "alvo": "alt-b",
          "dur": 1.4
        },
        {
          "at": 4.48,
          "acao": "aparecer",
          "alvo": "desl",
          "dur": 0.6
        },
        {
          "at": 6.84,
          "acao": "desenhar",
          "alvo": "tang",
          "dur": 0.7
        },
        {
          "at": 6.84,
          "acao": "desenhar",
          "alvo": "tang-b",
          "dur": 0.7
        },
        {
          "at": 6.84,
          "acao": "aparecer",
          "alvo": "rot-igual",
          "dur": 0.6
        }
      ],
      "why": "Para reconstruir o total, some a taxa ao ponto de partida."
    }
  ],
  "outro": {
    "dur": 6.06,
    "narration": "Taxa e total contam a mesma história. Agora mexa no laboratório.",
    "words": [
      {
        "t": "Taxa",
        "s": 0.2,
        "e": 0.54,
        "hl": true
      },
      {
        "t": "e",
        "s": 0.58,
        "e": 0.86,
        "hl": false
      },
      {
        "t": "total",
        "s": 0.9,
        "e": 1.24,
        "hl": true
      },
      {
        "t": "contam",
        "s": 1.28,
        "e": 1.62,
        "hl": false
      },
      {
        "t": "a",
        "s": 1.66,
        "e": 1.94,
        "hl": false
      },
      {
        "t": "mesma",
        "s": 1.98,
        "e": 2.32,
        "hl": false
      },
      {
        "t": "história.",
        "s": 2.36,
        "e": 2.76,
        "hl": false
      },
      {
        "t": "Agora",
        "s": 3.2,
        "e": 3.6,
        "hl": false
      },
      {
        "t": "mexa",
        "s": 3.64,
        "e": 3.98,
        "hl": false
      },
      {
        "t": "no",
        "s": 4.02,
        "e": 4.3,
        "hl": false
      },
      {
        "t": "laboratório.",
        "s": 4.34,
        "e": 4.86,
        "hl": true
      }
    ],
    "scene": [
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "alt-b",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "desl",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "tang-b",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "rot-igual",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "tang",
        "dur": 0.5
      },
      {
        "at": 0.9,
        "acao": "aparecer",
        "alvo": "teorema",
        "dur": 0.6
      },
      {
        "at": 0.9,
        "acao": "aparecer",
        "alvo": "tc-d",
        "dur": 0.6
      },
      {
        "at": 0.9,
        "acao": "aparecer",
        "alvo": "tc-s",
        "dur": 0.6
      },
      {
        "at": 4.34,
        "acao": "destacar",
        "alvo": "guia-braco",
        "dur": 1.2
      }
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "import numpy as np                          # arrays e contas numéricas\n\nt = np.linspace(0, 10, 1001)                # 1001 instantes de 0 a 10 minutos\ndt = t[1] - t[0]                            # intervalo entre dois instantes\nq = 30 + 10*np.sin(t)                       # vazão da bomba em L/min\nV = np.cumsum(q) * dt                       # integral: soma acumulada da vazão é o volume\nq_de_volta = np.gradient(V, dt)             # derivada do volume: devolve a vazão\nprint(q[500], q_de_volta[500])              # os dois valores quase coincidem",
      "at": 1,
      "dur": 5
    }
  }
};
