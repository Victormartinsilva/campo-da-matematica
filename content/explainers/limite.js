/* Roteiro do mini-video "Limites" (metafora: ponte com uma tabua que falta). Tempos em segundos desde o inicio de cada peca. */
window.Explainers = window.Explainers || {};
Explainers.limite = {
  "meta": {
    "id": "limite",
    "categoria": "CÁLCULO",
    "area": "calculo",
    "titulo": "Limites",
    "duracao": 75,
    "cena": "limite"
  },
  "pieces": [
    {
      "id": "ponte",
      "ordem": 1,
      "narration": "Imagine uma ponte com uma tábua faltando. Esta curva tem um buraco em x igual a um. Para onde ela vai?",
      "words": [
        {
          "t": "Imagine",
          "s": 0.2,
          "e": 0.62,
          "hl": false
        },
        {
          "t": "uma",
          "s": 0.65,
          "e": 0.95,
          "hl": false
        },
        {
          "t": "ponte",
          "s": 0.98,
          "e": 1.28,
          "hl": true
        },
        {
          "t": "com",
          "s": 1.31,
          "e": 1.55,
          "hl": false
        },
        {
          "t": "uma",
          "s": 1.58,
          "e": 1.88,
          "hl": false
        },
        {
          "t": "tábua",
          "s": 1.91,
          "e": 2.21,
          "hl": true
        },
        {
          "t": "faltando.",
          "s": 2.24,
          "e": 2.6,
          "hl": false
        },
        {
          "t": "Esta",
          "s": 3.03,
          "e": 3.33,
          "hl": false
        },
        {
          "t": "curva",
          "s": 3.36,
          "e": 3.66,
          "hl": false
        },
        {
          "t": "tem",
          "s": 3.69,
          "e": 3.93,
          "hl": false
        },
        {
          "t": "um",
          "s": 3.96,
          "e": 4.2,
          "hl": false
        },
        {
          "t": "buraco",
          "s": 4.23,
          "e": 4.59,
          "hl": true
        },
        {
          "t": "em",
          "s": 4.62,
          "e": 4.86,
          "hl": false
        },
        {
          "t": "x",
          "s": 4.89,
          "e": 5.13,
          "hl": false
        },
        {
          "t": "igual",
          "s": 5.16,
          "e": 5.46,
          "hl": false
        },
        {
          "t": "a",
          "s": 5.49,
          "e": 5.73,
          "hl": false
        },
        {
          "t": "um.",
          "s": 5.76,
          "e": 6,
          "hl": false
        },
        {
          "t": "Para",
          "s": 6.43,
          "e": 6.73,
          "hl": false
        },
        {
          "t": "onde",
          "s": 6.76,
          "e": 7.06,
          "hl": false
        },
        {
          "t": "ela",
          "s": 7.09,
          "e": 7.39,
          "hl": false
        },
        {
          "t": "vai?",
          "s": 7.42,
          "e": 7.66,
          "hl": true
        }
      ],
      "dur": 8.86,
      "terminal": {
        "cmd": "f(x) = (x² − 1)/(x − 1)",
        "at": 3.03,
        "dur": 2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "guia",
          "dur": 0.8,
          "de": {
            "y": 14
          }
        },
        {
          "at": 0.3,
          "acao": "desenhar",
          "alvo": "eixos",
          "dur": 0.8
        },
        {
          "at": 0.4,
          "acao": "aparecer",
          "alvo": "eixos-rot",
          "dur": 0.6
        },
        {
          "at": 0.98,
          "acao": "desenhar",
          "alvo": "curva",
          "dur": 2
        },
        {
          "at": 0.98,
          "acao": "desenhar",
          "alvo": "tabuas",
          "dur": 2.2
        },
        {
          "at": 1.91,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1,
          "vezes": 1
        },
        {
          "at": 4.23,
          "acao": "aparecer",
          "alvo": "buraco",
          "dur": 0.7
        },
        {
          "at": 4.73,
          "acao": "destacar",
          "alvo": "buraco",
          "dur": 1
        },
        {
          "at": 6.43,
          "acao": "aparecer",
          "alvo": "pergunta",
          "dur": 0.8,
          "de": {
            "y": -8
          }
        },
        {
          "at": 7.42,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        }
      ],
      "why": "O limite pergunta para onde a curva vai ao chegar perto de um ponto."
    },
    {
      "id": "viajantes",
      "ordem": 2,
      "narration": "Dois viajantes caminham rumo ao buraco, um por cada lado. Uma tabela anota a altura de cada passo.",
      "words": [
        {
          "t": "Dois",
          "s": 0.2,
          "e": 0.44,
          "hl": false
        },
        {
          "t": "viajantes",
          "s": 0.47,
          "e": 0.83,
          "hl": true
        },
        {
          "t": "caminham",
          "s": 0.86,
          "e": 1.22,
          "hl": false
        },
        {
          "t": "rumo",
          "s": 1.25,
          "e": 1.55,
          "hl": false
        },
        {
          "t": "ao",
          "s": 1.58,
          "e": 1.82,
          "hl": false
        },
        {
          "t": "buraco,",
          "s": 1.85,
          "e": 2.21,
          "hl": false
        },
        {
          "t": "um",
          "s": 2.44,
          "e": 2.68,
          "hl": false
        },
        {
          "t": "por",
          "s": 2.71,
          "e": 2.95,
          "hl": false
        },
        {
          "t": "cada",
          "s": 2.98,
          "e": 3.28,
          "hl": false
        },
        {
          "t": "lado.",
          "s": 3.31,
          "e": 3.61,
          "hl": false
        },
        {
          "t": "Uma",
          "s": 4.04,
          "e": 4.34,
          "hl": false
        },
        {
          "t": "tabela",
          "s": 4.37,
          "e": 4.73,
          "hl": true
        },
        {
          "t": "anota",
          "s": 4.76,
          "e": 5.12,
          "hl": false
        },
        {
          "t": "a",
          "s": 5.15,
          "e": 5.39,
          "hl": false
        },
        {
          "t": "altura",
          "s": 5.42,
          "e": 5.78,
          "hl": true
        },
        {
          "t": "de",
          "s": 5.81,
          "e": 6.05,
          "hl": false
        },
        {
          "t": "cada",
          "s": 6.08,
          "e": 6.38,
          "hl": false
        },
        {
          "t": "passo.",
          "s": 6.41,
          "e": 6.71,
          "hl": false
        }
      ],
      "dur": 7.91,
      "terminal": {
        "cmd": "x → 1⁻   e   x → 1⁺",
        "at": 0.2,
        "dur": 1.8
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "pergunta",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "viaj-e",
          "dur": 0.7,
          "de": {
            "y": -10
          }
        },
        {
          "at": 0.3,
          "acao": "aparecer",
          "alvo": "viaj-d",
          "dur": 0.7,
          "de": {
            "y": -10
          }
        },
        {
          "at": 0.86,
          "acao": "mover",
          "alvo": "viaj-e",
          "dur": 1.3,
          "para": {
            "x": 39,
            "y": -19.5
          }
        },
        {
          "at": 0.86,
          "acao": "mover",
          "alvo": "viaj-d",
          "dur": 1.3,
          "para": {
            "x": -39,
            "y": 19.5
          }
        },
        {
          "at": 4.37,
          "acao": "aparecer",
          "alvo": "tabela",
          "dur": 0.7,
          "de": {
            "y": -8
          }
        },
        {
          "at": 5.27,
          "acao": "aparecer",
          "alvo": "tab-1",
          "dur": 0.5
        },
        {
          "at": 5.42,
          "acao": "mover",
          "alvo": "viaj-e",
          "dur": 1.2,
          "para": {
            "x": 78,
            "y": -39
          }
        },
        {
          "at": 5.42,
          "acao": "mover",
          "alvo": "viaj-d",
          "dur": 1.2,
          "para": {
            "x": -78,
            "y": 39
          }
        },
        {
          "at": 6.72,
          "acao": "aparecer",
          "alvo": "tab-2",
          "dur": 0.5
        },
        {
          "at": 6.51,
          "acao": "mover",
          "alvo": "viaj-e",
          "dur": 1,
          "para": {
            "x": 91,
            "y": -45.5
          }
        },
        {
          "at": 6.51,
          "acao": "mover",
          "alvo": "viaj-d",
          "dur": 1,
          "para": {
            "x": -91,
            "y": 45.5
          }
        },
        {
          "at": 7.31,
          "acao": "aparecer",
          "alvo": "tab-3",
          "dur": 0.4
        }
      ],
      "why": "Chegar perto pelos dois lados é o que o limite examina."
    },
    {
      "id": "mesma-altura",
      "ordem": 3,
      "narration": "Os dois chegam à mesma altura, o número dois. O limite existe, mesmo que ninguém pise no buraco.",
      "words": [
        {
          "t": "Os",
          "s": 0.2,
          "e": 0.44,
          "hl": false
        },
        {
          "t": "dois",
          "s": 0.47,
          "e": 0.71,
          "hl": false
        },
        {
          "t": "chegam",
          "s": 0.74,
          "e": 1.04,
          "hl": false
        },
        {
          "t": "à",
          "s": 1.07,
          "e": 1.31,
          "hl": false
        },
        {
          "t": "mesma",
          "s": 1.34,
          "e": 1.64,
          "hl": true
        },
        {
          "t": "altura,",
          "s": 1.67,
          "e": 2.03,
          "hl": false
        },
        {
          "t": "o",
          "s": 2.26,
          "e": 2.5,
          "hl": false
        },
        {
          "t": "número",
          "s": 2.53,
          "e": 2.89,
          "hl": false
        },
        {
          "t": "dois.",
          "s": 2.92,
          "e": 3.16,
          "hl": true
        },
        {
          "t": "O",
          "s": 3.59,
          "e": 3.83,
          "hl": false
        },
        {
          "t": "limite",
          "s": 3.86,
          "e": 4.22,
          "hl": true
        },
        {
          "t": "existe,",
          "s": 4.25,
          "e": 4.61,
          "hl": false
        },
        {
          "t": "mesmo",
          "s": 4.84,
          "e": 5.14,
          "hl": false
        },
        {
          "t": "que",
          "s": 5.17,
          "e": 5.41,
          "hl": false
        },
        {
          "t": "ninguém",
          "s": 5.44,
          "e": 5.74,
          "hl": false
        },
        {
          "t": "pise",
          "s": 5.77,
          "e": 6.07,
          "hl": true
        },
        {
          "t": "no",
          "s": 6.1,
          "e": 6.34,
          "hl": false
        },
        {
          "t": "buraco.",
          "s": 6.37,
          "e": 6.73,
          "hl": false
        }
      ],
      "dur": 7.93,
      "terminal": {
        "cmd": "lim (x→1) (x² − 1)/(x − 1) = 2",
        "at": 1.34,
        "dur": 2.2
      },
      "status": {
        "tipo": "ok",
        "texto": "O LIMITE EXISTE: VALE 2",
        "at": 3.86
      },
      "scene": [
        {
          "at": 1.34,
          "acao": "destacar",
          "alvo": "viaj-e",
          "dur": 0.9,
          "vezes": 1
        },
        {
          "at": 1.34,
          "acao": "destacar",
          "alvo": "viaj-d",
          "dur": 0.9,
          "vezes": 1
        },
        {
          "at": 0.47,
          "acao": "aparecer",
          "alvo": "nivel",
          "dur": 0.9,
          "de": {
            "y": 0
          }
        },
        {
          "at": 3.86,
          "acao": "cor",
          "alvo": "buraco",
          "dur": 0.8,
          "para": {
            "stroke": "--leaf"
          }
        },
        {
          "at": 3.96,
          "acao": "destacar",
          "alvo": "nivel",
          "dur": 1
        },
        {
          "at": 5.77,
          "acao": "destacar",
          "alvo": "buraco",
          "dur": 1
        },
        {
          "at": 5.77,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1,
          "vezes": 1
        }
      ],
      "why": "O limite pode existir mesmo onde a função não tem valor."
    },
    {
      "id": "epsilon",
      "ordem": 4,
      "narration": "Agora, uma tolerância na saída. A faixa épsilon é a altura que aceitamos, em volta de dois.",
      "words": [
        {
          "t": "Agora,",
          "s": 0.2,
          "e": 0.56,
          "hl": false
        },
        {
          "t": "uma",
          "s": 0.79,
          "e": 1.09,
          "hl": false
        },
        {
          "t": "tolerância",
          "s": 1.12,
          "e": 1.54,
          "hl": true
        },
        {
          "t": "na",
          "s": 1.57,
          "e": 1.81,
          "hl": false
        },
        {
          "t": "saída.",
          "s": 1.84,
          "e": 2.14,
          "hl": false
        },
        {
          "t": "A",
          "s": 2.57,
          "e": 2.81,
          "hl": false
        },
        {
          "t": "faixa",
          "s": 2.84,
          "e": 3.14,
          "hl": false
        },
        {
          "t": "épsilon",
          "s": 3.17,
          "e": 3.53,
          "hl": true
        },
        {
          "t": "é",
          "s": 3.56,
          "e": 3.8,
          "hl": false
        },
        {
          "t": "a",
          "s": 3.83,
          "e": 4.07,
          "hl": false
        },
        {
          "t": "altura",
          "s": 4.1,
          "e": 4.46,
          "hl": false
        },
        {
          "t": "que",
          "s": 4.49,
          "e": 4.73,
          "hl": false
        },
        {
          "t": "aceitamos,",
          "s": 4.76,
          "e": 5.18,
          "hl": false
        },
        {
          "t": "em",
          "s": 5.41,
          "e": 5.65,
          "hl": false
        },
        {
          "t": "volta",
          "s": 5.68,
          "e": 5.98,
          "hl": false
        },
        {
          "t": "de",
          "s": 6.01,
          "e": 6.25,
          "hl": false
        },
        {
          "t": "dois.",
          "s": 6.28,
          "e": 6.52,
          "hl": true
        }
      ],
      "dur": 7.72,
      "terminal": {
        "cmd": "|f(x) − 2| < ε",
        "at": 1.12,
        "dur": 1.6
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tabela",
          "dur": 0.6
        },
        {
          "at": 1.12,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1,
          "vezes": 1
        },
        {
          "at": 2.84,
          "acao": "aparecer",
          "alvo": "faixa-eps",
          "dur": 0.8
        },
        {
          "at": 3.17,
          "acao": "aparecer",
          "alvo": "rot-eps",
          "dur": 0.6
        },
        {
          "at": 6.28,
          "acao": "destacar",
          "alvo": "nivel",
          "dur": 0.9
        }
      ],
      "why": "O épsilon é a margem de erro que você aceita na altura."
    },
    {
      "id": "delta",
      "ordem": 5,
      "narration": "Na entrada, o delta diz o quanto chegar perto de um. Dentro dessa faixa, a curva cabe na tolerância.",
      "words": [
        {
          "t": "Na",
          "s": 0.2,
          "e": 0.44,
          "hl": false
        },
        {
          "t": "entrada,",
          "s": 0.47,
          "e": 0.83,
          "hl": true
        },
        {
          "t": "o",
          "s": 1.06,
          "e": 1.3,
          "hl": false
        },
        {
          "t": "delta",
          "s": 1.33,
          "e": 1.63,
          "hl": true
        },
        {
          "t": "diz",
          "s": 1.66,
          "e": 1.9,
          "hl": false
        },
        {
          "t": "o",
          "s": 1.93,
          "e": 2.17,
          "hl": false
        },
        {
          "t": "quanto",
          "s": 2.2,
          "e": 2.5,
          "hl": false
        },
        {
          "t": "chegar",
          "s": 2.53,
          "e": 2.83,
          "hl": false
        },
        {
          "t": "perto",
          "s": 2.86,
          "e": 3.16,
          "hl": true
        },
        {
          "t": "de",
          "s": 3.19,
          "e": 3.43,
          "hl": false
        },
        {
          "t": "um.",
          "s": 3.46,
          "e": 3.7,
          "hl": false
        },
        {
          "t": "Dentro",
          "s": 4.13,
          "e": 4.43,
          "hl": false
        },
        {
          "t": "dessa",
          "s": 4.46,
          "e": 4.76,
          "hl": false
        },
        {
          "t": "faixa,",
          "s": 4.79,
          "e": 5.09,
          "hl": false
        },
        {
          "t": "a",
          "s": 5.32,
          "e": 5.56,
          "hl": false
        },
        {
          "t": "curva",
          "s": 5.59,
          "e": 5.89,
          "hl": false
        },
        {
          "t": "cabe",
          "s": 5.92,
          "e": 6.22,
          "hl": true
        },
        {
          "t": "na",
          "s": 6.25,
          "e": 6.49,
          "hl": false
        },
        {
          "t": "tolerância.",
          "s": 6.52,
          "e": 6.94,
          "hl": false
        }
      ],
      "dur": 8.14,
      "terminal": {
        "cmd": "0 < |x − 1| < δ   ⇒   |f(x) − 2| < ε",
        "at": 1.33,
        "dur": 2.4
      },
      "scene": [
        {
          "at": 0.47,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1,
          "vezes": 1
        },
        {
          "at": 1.33,
          "acao": "aparecer",
          "alvo": "faixa-delta",
          "dur": 0.8
        },
        {
          "at": 1.53,
          "acao": "aparecer",
          "alvo": "rot-delta",
          "dur": 0.6
        },
        {
          "at": 2.86,
          "acao": "destacar",
          "alvo": "faixa-delta",
          "dur": 1
        },
        {
          "at": 5.59,
          "acao": "desenhar",
          "alvo": "trecho",
          "dur": 1.4
        },
        {
          "at": 5.92,
          "acao": "destacar",
          "alvo": "trecho",
          "dur": 1
        }
      ],
      "why": "O delta é o quanto você precisa chegar perto na entrada."
    },
    {
      "id": "aperta",
      "ordem": 6,
      "narration": "Apertou o épsilon? O delta encolhe junto. Para qualquer tolerância, existe um delta que serve.",
      "words": [
        {
          "t": "Apertou",
          "s": 0.2,
          "e": 0.56,
          "hl": false
        },
        {
          "t": "o",
          "s": 0.59,
          "e": 0.83,
          "hl": false
        },
        {
          "t": "épsilon?",
          "s": 0.86,
          "e": 1.22,
          "hl": true
        },
        {
          "t": "O",
          "s": 1.65,
          "e": 1.89,
          "hl": false
        },
        {
          "t": "delta",
          "s": 1.92,
          "e": 2.22,
          "hl": true
        },
        {
          "t": "encolhe",
          "s": 2.25,
          "e": 2.61,
          "hl": true
        },
        {
          "t": "junto.",
          "s": 2.64,
          "e": 2.94,
          "hl": false
        },
        {
          "t": "Para",
          "s": 3.37,
          "e": 3.67,
          "hl": false
        },
        {
          "t": "qualquer",
          "s": 3.7,
          "e": 4,
          "hl": true
        },
        {
          "t": "tolerância,",
          "s": 4.03,
          "e": 4.45,
          "hl": false
        },
        {
          "t": "existe",
          "s": 4.68,
          "e": 5.04,
          "hl": false
        },
        {
          "t": "um",
          "s": 5.07,
          "e": 5.31,
          "hl": false
        },
        {
          "t": "delta",
          "s": 5.34,
          "e": 5.64,
          "hl": false
        },
        {
          "t": "que",
          "s": 5.67,
          "e": 5.91,
          "hl": false
        },
        {
          "t": "serve.",
          "s": 5.94,
          "e": 6.24,
          "hl": false
        }
      ],
      "dur": 7.44,
      "terminal": {
        "cmd": "ε: 0,5 → 0,2   δ: 0,5 → 0,2",
        "at": 0.2,
        "dur": 2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "dimensionar",
          "alvo": "faixa-eps",
          "dur": 1.2,
          "sy": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-eps",
          "dur": 0.4
        },
        {
          "at": 0.9,
          "acao": "aparecer",
          "alvo": "rot-eps2",
          "dur": 0.6
        },
        {
          "at": 1.92,
          "acao": "dimensionar",
          "alvo": "faixa-delta",
          "dur": 1.2,
          "sx": 0.4
        },
        {
          "at": 1.92,
          "acao": "sumir",
          "alvo": "rot-delta",
          "dur": 0.4
        },
        {
          "at": 2.62,
          "acao": "aparecer",
          "alvo": "rot-delta2",
          "dur": 0.6
        },
        {
          "at": 2.25,
          "acao": "sumir",
          "alvo": "trecho",
          "dur": 0.5
        },
        {
          "at": 2.55,
          "acao": "desenhar",
          "alvo": "trecho2",
          "dur": 0.9
        },
        {
          "at": 3.7,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        }
      ],
      "why": "Para todo épsilon existe um delta. É isso que define o limite."
    },
    {
      "id": "sem-limite",
      "ordem": 7,
      "narration": "Nem todo ponto tem limite. No degrau, os dois lados chegam em alturas diferentes. No um sobre x, a curva foge para o infinito.",
      "words": [
        {
          "t": "Nem",
          "s": 0.2,
          "e": 0.44,
          "hl": false
        },
        {
          "t": "todo",
          "s": 0.47,
          "e": 0.77,
          "hl": false
        },
        {
          "t": "ponto",
          "s": 0.8,
          "e": 1.1,
          "hl": false
        },
        {
          "t": "tem",
          "s": 1.13,
          "e": 1.37,
          "hl": false
        },
        {
          "t": "limite.",
          "s": 1.4,
          "e": 1.76,
          "hl": false
        },
        {
          "t": "No",
          "s": 2.19,
          "e": 2.43,
          "hl": false
        },
        {
          "t": "degrau,",
          "s": 2.46,
          "e": 2.76,
          "hl": true
        },
        {
          "t": "os",
          "s": 2.99,
          "e": 3.23,
          "hl": false
        },
        {
          "t": "dois",
          "s": 3.26,
          "e": 3.5,
          "hl": false
        },
        {
          "t": "lados",
          "s": 3.53,
          "e": 3.83,
          "hl": false
        },
        {
          "t": "chegam",
          "s": 3.86,
          "e": 4.16,
          "hl": false
        },
        {
          "t": "em",
          "s": 4.19,
          "e": 4.43,
          "hl": false
        },
        {
          "t": "alturas",
          "s": 4.46,
          "e": 4.82,
          "hl": false
        },
        {
          "t": "diferentes.",
          "s": 4.85,
          "e": 5.27,
          "hl": true
        },
        {
          "t": "No",
          "s": 5.7,
          "e": 5.94,
          "hl": false
        },
        {
          "t": "um",
          "s": 5.97,
          "e": 6.21,
          "hl": false
        },
        {
          "t": "sobre",
          "s": 6.24,
          "e": 6.54,
          "hl": false
        },
        {
          "t": "x,",
          "s": 6.57,
          "e": 6.81,
          "hl": false
        },
        {
          "t": "a",
          "s": 7.04,
          "e": 7.28,
          "hl": false
        },
        {
          "t": "curva",
          "s": 7.31,
          "e": 7.61,
          "hl": false
        },
        {
          "t": "foge",
          "s": 7.64,
          "e": 7.94,
          "hl": true
        },
        {
          "t": "para",
          "s": 7.97,
          "e": 8.27,
          "hl": false
        },
        {
          "t": "o",
          "s": 8.3,
          "e": 8.54,
          "hl": false
        },
        {
          "t": "infinito.",
          "s": 8.57,
          "e": 8.99,
          "hl": true
        }
      ],
      "dur": 10.19,
      "terminal": {
        "cmd": "lim (x→1⁻) = 1   ≠   lim (x→1⁺) = 3",
        "at": 2.46,
        "dur": 2.2
      },
      "status": {
        "tipo": "erro",
        "texto": "SEM LIMITE",
        "at": 4.85
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "ponte",
          "dur": 0.6
        },
        {
          "at": 2.46,
          "acao": "aparecer",
          "alvo": "degrau",
          "dur": 0.6
        },
        {
          "at": 2.86,
          "acao": "desenhar",
          "alvo": "deg-esq",
          "dur": 0.8
        },
        {
          "at": 3.46,
          "acao": "desenhar",
          "alvo": "deg-dir",
          "dur": 0.8
        },
        {
          "at": 4.06,
          "acao": "aparecer",
          "alvo": "deg-pts",
          "dur": 0.5
        },
        {
          "at": 4.85,
          "acao": "aparecer",
          "alvo": "deg-niv",
          "dur": 0.8
        },
        {
          "at": 5.75,
          "acao": "destacar",
          "alvo": "deg-niv",
          "dur": 0.9
        },
        {
          "at": 4.85,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1,
          "vezes": 1
        },
        {
          "at": 5.87,
          "acao": "sumir",
          "alvo": "degrau",
          "dur": 0.5
        },
        {
          "at": 5.97,
          "acao": "aparecer",
          "alvo": "umx",
          "dur": 0.6
        },
        {
          "at": 6.47,
          "acao": "desenhar",
          "alvo": "umx-dir",
          "dur": 1
        },
        {
          "at": 7.64,
          "acao": "desenhar",
          "alvo": "umx-esq",
          "dur": 1
        },
        {
          "at": 8.57,
          "acao": "aparecer",
          "alvo": "umx-rot",
          "dur": 0.7
        }
      ],
      "why": "Se os dois lados discordam ou fogem, o limite não existe."
    },
    {
      "id": "velocidade",
      "ordem": 8,
      "narration": "A velocidade do carro num instante é um limite. Dividimos a distância pelo tempo, com o tempo encolhendo. Assim nasce a derivada.",
      "words": [
        {
          "t": "A",
          "s": 0.2,
          "e": 0.44,
          "hl": false
        },
        {
          "t": "velocidade",
          "s": 0.47,
          "e": 0.95,
          "hl": true
        },
        {
          "t": "do",
          "s": 0.98,
          "e": 1.22,
          "hl": false
        },
        {
          "t": "carro",
          "s": 1.25,
          "e": 1.55,
          "hl": false
        },
        {
          "t": "num",
          "s": 1.58,
          "e": 1.82,
          "hl": false
        },
        {
          "t": "instante",
          "s": 1.85,
          "e": 2.21,
          "hl": false
        },
        {
          "t": "é",
          "s": 2.24,
          "e": 2.48,
          "hl": false
        },
        {
          "t": "um",
          "s": 2.51,
          "e": 2.75,
          "hl": false
        },
        {
          "t": "limite.",
          "s": 2.78,
          "e": 3.14,
          "hl": true
        },
        {
          "t": "Dividimos",
          "s": 3.57,
          "e": 3.99,
          "hl": false
        },
        {
          "t": "a",
          "s": 4.02,
          "e": 4.26,
          "hl": false
        },
        {
          "t": "distância",
          "s": 4.29,
          "e": 4.65,
          "hl": false
        },
        {
          "t": "pelo",
          "s": 4.68,
          "e": 4.98,
          "hl": false
        },
        {
          "t": "tempo,",
          "s": 5.01,
          "e": 5.31,
          "hl": false
        },
        {
          "t": "com",
          "s": 5.54,
          "e": 5.78,
          "hl": false
        },
        {
          "t": "o",
          "s": 5.81,
          "e": 6.05,
          "hl": false
        },
        {
          "t": "tempo",
          "s": 6.08,
          "e": 6.38,
          "hl": false
        },
        {
          "t": "encolhendo.",
          "s": 6.41,
          "e": 6.83,
          "hl": true
        },
        {
          "t": "Assim",
          "s": 7.26,
          "e": 7.56,
          "hl": false
        },
        {
          "t": "nasce",
          "s": 7.59,
          "e": 7.89,
          "hl": false
        },
        {
          "t": "a",
          "s": 7.92,
          "e": 8.16,
          "hl": false
        },
        {
          "t": "derivada.",
          "s": 8.19,
          "e": 8.61,
          "hl": true
        }
      ],
      "dur": 9.81,
      "terminal": {
        "cmd": "v = lim (Δt→0) Δs/Δt = s'(t)",
        "at": 3.57,
        "dur": 2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "umx",
          "dur": 0.6
        },
        {
          "at": 0.47,
          "acao": "aparecer",
          "alvo": "deriv",
          "dur": 0.7
        },
        {
          "at": 3.57,
          "acao": "aparecer",
          "alvo": "sec1",
          "dur": 0.7
        },
        {
          "at": 5.54,
          "acao": "sumir",
          "alvo": "sec1",
          "dur": 0.4
        },
        {
          "at": 5.74,
          "acao": "aparecer",
          "alvo": "sec2",
          "dur": 0.6
        },
        {
          "at": 6.41,
          "acao": "sumir",
          "alvo": "sec2",
          "dur": 0.4
        },
        {
          "at": 6.61,
          "acao": "aparecer",
          "alvo": "tang",
          "dur": 0.7
        },
        {
          "at": 8.19,
          "acao": "destacar",
          "alvo": "tang",
          "dur": 1
        },
        {
          "at": 8.19,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1,
          "vezes": 1
        }
      ],
      "why": "A derivada é um limite: a inclinação quando o intervalo encolhe até zero.",
      "example": {
        "titulo": "No dia a dia",
        "texto": "O velocímetro mostra a velocidade naquele instante, mas só dá para medir distância em intervalos. Quanto menor o intervalo, mais a média se aproxima da velocidade instantânea, que é um limite. Um pedágio que muda de preço no corte é o caso sem limite, porque os dois lados discordam.",
        "at": 7.26
      }
    }
  ],
  "outro": {
    "narration": "O limite mostra para onde a curva aponta, mesmo com o buraco. Agora mexa no laboratório.",
    "words": [
      {
        "t": "O",
        "s": 0.2,
        "e": 0.44,
        "hl": false
      },
      {
        "t": "limite",
        "s": 0.47,
        "e": 0.83,
        "hl": true
      },
      {
        "t": "mostra",
        "s": 0.86,
        "e": 1.16,
        "hl": false
      },
      {
        "t": "para",
        "s": 1.19,
        "e": 1.49,
        "hl": false
      },
      {
        "t": "onde",
        "s": 1.52,
        "e": 1.82,
        "hl": false
      },
      {
        "t": "a",
        "s": 1.85,
        "e": 2.09,
        "hl": false
      },
      {
        "t": "curva",
        "s": 2.12,
        "e": 2.42,
        "hl": false
      },
      {
        "t": "aponta,",
        "s": 2.45,
        "e": 2.81,
        "hl": true
      },
      {
        "t": "mesmo",
        "s": 3.04,
        "e": 3.34,
        "hl": false
      },
      {
        "t": "com",
        "s": 3.37,
        "e": 3.61,
        "hl": false
      },
      {
        "t": "o",
        "s": 3.64,
        "e": 3.88,
        "hl": false
      },
      {
        "t": "buraco.",
        "s": 3.91,
        "e": 4.27,
        "hl": true
      },
      {
        "t": "Agora",
        "s": 4.7,
        "e": 5.06,
        "hl": false
      },
      {
        "t": "mexa",
        "s": 5.09,
        "e": 5.39,
        "hl": false
      },
      {
        "t": "no",
        "s": 5.42,
        "e": 5.66,
        "hl": false
      },
      {
        "t": "laboratório.",
        "s": 5.69,
        "e": 6.17,
        "hl": true
      }
    ],
    "dur": 7.37,
    "scene": [
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "deriv",
        "dur": 0.6
      },
      {
        "at": 0.3,
        "acao": "aparecer",
        "alvo": "ponte",
        "dur": 0.8
      },
      {
        "at": 2.45,
        "acao": "destacar",
        "alvo": "nivel",
        "dur": 1
      },
      {
        "at": 3.91,
        "acao": "destacar",
        "alvo": "buraco",
        "dur": 1
      },
      {
        "at": 4.7,
        "acao": "destacar",
        "alvo": "guia-braco",
        "dur": 1.2
      }
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "import sympy as sp\nx = sp.symbols('x')\nprint(sp.limit((x**2 - 1)/(x - 1), x, 1))",
      "at": 0.47,
      "dur": 4.4
    }
  }
};
