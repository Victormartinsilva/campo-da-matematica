/* Roteiro do mini-video "Derivadas e tangentes" (metafora: estrada de montanha). Tempos em segundos desde o inicio de cada peca. */
window.Explainers = window.Explainers || {};
Explainers.derivada = {
  "meta": {
    "id": "derivada",
    "categoria": "CÁLCULO",
    "area": "calculo",
    "titulo": "Derivadas e tangentes",
    "duracao": 83,
    "cena": "derivada"
  },
  "pieces": [
    {
      "id": "abertura",
      "ordem": 1,
      "narration": "Esta é uma estrada de montanha. O ciclista sobe e desce. Quão inclinada ela está aqui?",
      "words": [
        {
          "t": "Esta",
          "s": 0.2,
          "e": 0.56,
          "hl": false
        },
        {
          "t": "é",
          "s": 0.59,
          "e": 0.9,
          "hl": false
        },
        {
          "t": "uma",
          "s": 0.93,
          "e": 1.29,
          "hl": false
        },
        {
          "t": "estrada",
          "s": 1.32,
          "e": 1.73,
          "hl": true
        },
        {
          "t": "de",
          "s": 1.76,
          "e": 2.07,
          "hl": false
        },
        {
          "t": "montanha.",
          "s": 2.1,
          "e": 2.51,
          "hl": false
        },
        {
          "t": "O",
          "s": 2.94,
          "e": 3.25,
          "hl": false
        },
        {
          "t": "ciclista",
          "s": 3.28,
          "e": 3.69,
          "hl": true
        },
        {
          "t": "sobe",
          "s": 3.72,
          "e": 4.08,
          "hl": false
        },
        {
          "t": "e",
          "s": 4.11,
          "e": 4.42,
          "hl": false
        },
        {
          "t": "desce.",
          "s": 4.45,
          "e": 4.81,
          "hl": false
        },
        {
          "t": "Quão",
          "s": 5.24,
          "e": 5.55,
          "hl": false
        },
        {
          "t": "inclinada",
          "s": 5.58,
          "e": 6.04,
          "hl": true
        },
        {
          "t": "ela",
          "s": 6.07,
          "e": 6.43,
          "hl": false
        },
        {
          "t": "está",
          "s": 6.46,
          "e": 6.82,
          "hl": false
        },
        {
          "t": "aqui?",
          "s": 6.85,
          "e": 7.21,
          "hl": true
        }
      ],
      "dur": 8.41,
      "terminal": {
        "cmd": "f(x) = perfil da estrada",
        "at": 1.32,
        "dur": 1.8
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
          "at": 0.2,
          "acao": "desenhar",
          "alvo": "estrada",
          "dur": 2.6
        },
        {
          "at": 1.2,
          "acao": "aparecer",
          "alvo": "massa",
          "dur": 1.2,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 3.28,
          "acao": "aparecer",
          "alvo": "ciclista-vis",
          "dur": 0.8,
          "de": {
            "y": -14
          }
        },
        {
          "at": 3.72,
          "acao": "destacar",
          "alvo": "ciclista",
          "dur": 1.2,
          "vezes": 1
        },
        {
          "at": 5.24,
          "acao": "aparecer",
          "alvo": "pergunta",
          "dur": 0.8,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 5.58,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        },
        {
          "at": 6.85,
          "acao": "aparecer",
          "alvo": "ponto-p",
          "dur": 0.6
        },
        {
          "at": 7.25,
          "acao": "destacar",
          "alvo": "ponto-p",
          "dur": 1
        }
      ],
      "why": "Tudo começa com uma pergunta: qual é a inclinação num ponto só?"
    },
    {
      "id": "secante",
      "ordem": 2,
      "narration": "Pegue um segundo ponto à frente e ligue os dois com uma régua. É a secante.",
      "words": [
        {
          "t": "Pegue",
          "s": 0.2,
          "e": 0.56,
          "hl": false
        },
        {
          "t": "um",
          "s": 0.59,
          "e": 0.9,
          "hl": false
        },
        {
          "t": "segundo",
          "s": 0.93,
          "e": 1.34,
          "hl": true
        },
        {
          "t": "ponto",
          "s": 1.37,
          "e": 1.73,
          "hl": false
        },
        {
          "t": "à",
          "s": 1.76,
          "e": 2.07,
          "hl": false
        },
        {
          "t": "frente",
          "s": 2.1,
          "e": 2.46,
          "hl": false
        },
        {
          "t": "e",
          "s": 2.49,
          "e": 2.8,
          "hl": false
        },
        {
          "t": "ligue",
          "s": 2.83,
          "e": 3.19,
          "hl": false
        },
        {
          "t": "os",
          "s": 3.22,
          "e": 3.53,
          "hl": false
        },
        {
          "t": "dois",
          "s": 3.56,
          "e": 3.87,
          "hl": false
        },
        {
          "t": "com",
          "s": 3.9,
          "e": 4.21,
          "hl": false
        },
        {
          "t": "uma",
          "s": 4.24,
          "e": 4.6,
          "hl": false
        },
        {
          "t": "régua.",
          "s": 4.63,
          "e": 4.99,
          "hl": true
        },
        {
          "t": "É",
          "s": 5.42,
          "e": 5.73,
          "hl": false
        },
        {
          "t": "a",
          "s": 5.76,
          "e": 6.07,
          "hl": false
        },
        {
          "t": "secante.",
          "s": 6.1,
          "e": 6.51,
          "hl": true
        }
      ],
      "dur": 7.71,
      "terminal": {
        "cmd": "secante = [f(x+h) − f(x)] / h",
        "at": 2.83,
        "dur": 2.2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "pergunta",
          "dur": 0.5
        },
        {
          "at": 0.93,
          "acao": "aparecer",
          "alvo": "ponto-q",
          "dur": 0.7,
          "de": {
            "y": -14
          }
        },
        {
          "at": 2.83,
          "acao": "desenhar",
          "alvo": "sec0",
          "dur": 1.1
        },
        {
          "at": 4.63,
          "acao": "destacar",
          "alvo": "sec0",
          "dur": 1,
          "vezes": 1
        },
        {
          "at": 4.63,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        },
        {
          "at": 6.1,
          "acao": "aparecer",
          "alvo": "rot-sec",
          "dur": 0.7,
          "de": {
            "y": 0.01
          }
        }
      ],
      "why": "A secante mede a inclinação média entre dois pontos da estrada."
    },
    {
      "id": "aproximar",
      "ordem": 3,
      "narration": "Agora aproxime o segundo ponto. A secante vai girando e a distância encolhe.",
      "words": [
        {
          "t": "Agora",
          "s": 0.2,
          "e": 0.61,
          "hl": false
        },
        {
          "t": "aproxime",
          "s": 0.64,
          "e": 1.1,
          "hl": false
        },
        {
          "t": "o",
          "s": 1.13,
          "e": 1.44,
          "hl": false
        },
        {
          "t": "segundo",
          "s": 1.47,
          "e": 1.88,
          "hl": false
        },
        {
          "t": "ponto.",
          "s": 1.91,
          "e": 2.27,
          "hl": false
        },
        {
          "t": "A",
          "s": 2.7,
          "e": 3.01,
          "hl": false
        },
        {
          "t": "secante",
          "s": 3.04,
          "e": 3.45,
          "hl": true
        },
        {
          "t": "vai",
          "s": 3.48,
          "e": 3.79,
          "hl": false
        },
        {
          "t": "girando",
          "s": 3.82,
          "e": 4.23,
          "hl": true
        },
        {
          "t": "e",
          "s": 4.26,
          "e": 4.57,
          "hl": false
        },
        {
          "t": "a",
          "s": 4.6,
          "e": 4.91,
          "hl": false
        },
        {
          "t": "distância",
          "s": 4.94,
          "e": 5.35,
          "hl": true
        },
        {
          "t": "encolhe.",
          "s": 5.38,
          "e": 5.79,
          "hl": true
        }
      ],
      "dur": 6.99,
      "terminal": {
        "cmd": "h = 135 → 90 → 55 → 30 → 12 …",
        "at": 0.64,
        "dur": 2.4
      },
      "scene": [
        {
          "at": 0.59,
          "acao": "sumir",
          "alvo": "rot-sec",
          "dur": 0.4
        },
        {
          "at": 0.64,
          "acao": "mover",
          "alvo": "ponto-q",
          "dur": 1.05,
          "para": {
            "x": -45,
            "y": -22.2
          }
        },
        {
          "at": 0.64,
          "acao": "sumir",
          "alvo": "sec0",
          "dur": 0.4
        },
        {
          "at": 0.64,
          "acao": "aparecer",
          "alvo": "sec1",
          "dur": 0.5,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 1.88,
          "acao": "mover",
          "alvo": "ponto-q",
          "dur": 1.05,
          "para": {
            "x": -80,
            "y": -29
          }
        },
        {
          "at": 1.88,
          "acao": "sumir",
          "alvo": "sec1",
          "dur": 0.4
        },
        {
          "at": 1.88,
          "acao": "aparecer",
          "alvo": "sec2",
          "dur": 0.5,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 3.12,
          "acao": "mover",
          "alvo": "ponto-q",
          "dur": 1.05,
          "para": {
            "x": -105,
            "y": -26.6
          }
        },
        {
          "at": 3.12,
          "acao": "sumir",
          "alvo": "sec2",
          "dur": 0.4
        },
        {
          "at": 3.12,
          "acao": "aparecer",
          "alvo": "sec3",
          "dur": 0.5,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 4.35,
          "acao": "mover",
          "alvo": "ponto-q",
          "dur": 1.05,
          "para": {
            "x": -123,
            "y": -21.2
          }
        },
        {
          "at": 4.35,
          "acao": "sumir",
          "alvo": "sec3",
          "dur": 0.4
        },
        {
          "at": 4.35,
          "acao": "aparecer",
          "alvo": "sec4",
          "dur": 0.5,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 3.82,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        }
      ],
      "why": "Quanto menor a distância, mais a média se parece com a inclinação naquele ponto."
    },
    {
      "id": "limite",
      "ordem": 4,
      "narration": "No limite, a distância vira zero e a secante se torna a tangente. Sua inclinação é a derivada.",
      "words": [
        {
          "t": "No",
          "s": 0.2,
          "e": 0.51,
          "hl": false
        },
        {
          "t": "limite,",
          "s": 0.54,
          "e": 0.95,
          "hl": true
        },
        {
          "t": "a",
          "s": 1.18,
          "e": 1.49,
          "hl": false
        },
        {
          "t": "distância",
          "s": 1.52,
          "e": 1.93,
          "hl": false
        },
        {
          "t": "vira",
          "s": 1.96,
          "e": 2.32,
          "hl": false
        },
        {
          "t": "zero",
          "s": 2.35,
          "e": 2.71,
          "hl": true
        },
        {
          "t": "e",
          "s": 2.74,
          "e": 3.05,
          "hl": false
        },
        {
          "t": "a",
          "s": 3.08,
          "e": 3.39,
          "hl": false
        },
        {
          "t": "secante",
          "s": 3.42,
          "e": 3.83,
          "hl": false
        },
        {
          "t": "se",
          "s": 3.86,
          "e": 4.17,
          "hl": false
        },
        {
          "t": "torna",
          "s": 4.2,
          "e": 4.56,
          "hl": false
        },
        {
          "t": "a",
          "s": 4.59,
          "e": 4.9,
          "hl": false
        },
        {
          "t": "tangente.",
          "s": 4.93,
          "e": 5.34,
          "hl": true
        },
        {
          "t": "Sua",
          "s": 5.77,
          "e": 6.08,
          "hl": false
        },
        {
          "t": "inclinação",
          "s": 6.11,
          "e": 6.57,
          "hl": false
        },
        {
          "t": "é",
          "s": 6.6,
          "e": 6.91,
          "hl": false
        },
        {
          "t": "a",
          "s": 6.94,
          "e": 7.25,
          "hl": false
        },
        {
          "t": "derivada.",
          "s": 7.28,
          "e": 7.74,
          "hl": true
        }
      ],
      "dur": 8.94,
      "terminal": {
        "cmd": "f′(x) = lim  [f(x+h) − f(x)] / h   (h → 0)",
        "at": 0.54,
        "dur": 3
      },
      "status": {
        "tipo": "ok",
        "texto": "LIMITE: SECANTE VIRA TANGENTE",
        "at": 5.33
      },
      "scene": [
        {
          "at": 0.54,
          "acao": "mover",
          "alvo": "ponto-q",
          "dur": 1.2,
          "para": {
            "x": -135,
            "y": -16.2
          }
        },
        {
          "at": 0.54,
          "acao": "cor",
          "alvo": "sec4",
          "dur": 1,
          "para": {
            "stroke": "--terra"
          }
        },
        {
          "at": 2.95,
          "acao": "sumir",
          "alvo": "ponto-q",
          "dur": 0.4
        },
        {
          "at": 4.93,
          "acao": "desenhar",
          "alvo": "tangente",
          "dur": 1
        },
        {
          "at": 5.63,
          "acao": "sumir",
          "alvo": "sec4",
          "dur": 0.5
        },
        {
          "at": 5.83,
          "acao": "aparecer",
          "alvo": "rot-tan",
          "dur": 0.7,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 7.28,
          "acao": "destacar",
          "alvo": "tangente",
          "dur": 1.2
        },
        {
          "at": 7.28,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        }
      ],
      "why": "A derivada é o limite da inclinação da secante quando h tende a zero."
    },
    {
      "id": "taxa",
      "ordem": 5,
      "narration": "A derivada é uma taxa de variação. Aqui são quase meio metro de subida por metro andado.",
      "words": [
        {
          "t": "A",
          "s": 0.2,
          "e": 0.51,
          "hl": false
        },
        {
          "t": "derivada",
          "s": 0.54,
          "e": 1,
          "hl": false
        },
        {
          "t": "é",
          "s": 1.03,
          "e": 1.34,
          "hl": false
        },
        {
          "t": "uma",
          "s": 1.37,
          "e": 1.73,
          "hl": false
        },
        {
          "t": "taxa",
          "s": 1.76,
          "e": 2.12,
          "hl": true
        },
        {
          "t": "de",
          "s": 2.15,
          "e": 2.46,
          "hl": false
        },
        {
          "t": "variação.",
          "s": 2.49,
          "e": 2.9,
          "hl": true
        },
        {
          "t": "Aqui",
          "s": 3.33,
          "e": 3.69,
          "hl": false
        },
        {
          "t": "são",
          "s": 3.72,
          "e": 4.03,
          "hl": false
        },
        {
          "t": "quase",
          "s": 4.06,
          "e": 4.42,
          "hl": false
        },
        {
          "t": "meio",
          "s": 4.45,
          "e": 4.76,
          "hl": false
        },
        {
          "t": "metro",
          "s": 4.79,
          "e": 5.15,
          "hl": false
        },
        {
          "t": "de",
          "s": 5.18,
          "e": 5.49,
          "hl": false
        },
        {
          "t": "subida",
          "s": 5.52,
          "e": 5.93,
          "hl": true
        },
        {
          "t": "por",
          "s": 5.96,
          "e": 6.27,
          "hl": false
        },
        {
          "t": "metro",
          "s": 6.3,
          "e": 6.66,
          "hl": false
        },
        {
          "t": "andado.",
          "s": 6.69,
          "e": 7.1,
          "hl": true
        }
      ],
      "dur": 8.3,
      "terminal": {
        "cmd": "f′(215) ≈ 0,46   [m de subida / m andado]",
        "at": 1.76,
        "dur": 2.6
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-tan",
          "dur": 0.5
        },
        {
          "at": 3.33,
          "acao": "aparecer",
          "alvo": "triangulo",
          "dur": 0.9,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 4.06,
          "acao": "aparecer",
          "alvo": "taxa",
          "dur": 0.9,
          "de": {
            "y": 10
          }
        },
        {
          "at": 5.52,
          "acao": "destacar",
          "alvo": "triangulo",
          "dur": 1,
          "vezes": 1
        },
        {
          "at": 6.69,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        }
      ],
      "why": "A derivada sempre vem com unidade: saída por entrada, como metros por metro."
    },
    {
      "id": "grafico",
      "ordem": 6,
      "narration": "O ponto percorre a estrada e desenha o gráfico de efe linha de xis. Subindo, fica positivo. No topo, vale zero. Descendo, fica negativo. No vale, zero de novo.",
      "words": [
        {
          "t": "O",
          "s": 0.2,
          "e": 0.51,
          "hl": false
        },
        {
          "t": "ponto",
          "s": 0.54,
          "e": 0.9,
          "hl": false
        },
        {
          "t": "percorre",
          "s": 0.93,
          "e": 1.34,
          "hl": false
        },
        {
          "t": "a",
          "s": 1.37,
          "e": 1.68,
          "hl": false
        },
        {
          "t": "estrada",
          "s": 1.71,
          "e": 2.12,
          "hl": false
        },
        {
          "t": "e",
          "s": 2.15,
          "e": 2.46,
          "hl": false
        },
        {
          "t": "desenha",
          "s": 2.49,
          "e": 2.9,
          "hl": false
        },
        {
          "t": "o",
          "s": 2.93,
          "e": 3.24,
          "hl": false
        },
        {
          "t": "gráfico",
          "s": 3.27,
          "e": 3.68,
          "hl": true
        },
        {
          "t": "de",
          "s": 3.71,
          "e": 4.02,
          "hl": false
        },
        {
          "t": "efe",
          "s": 4.05,
          "e": 4.41,
          "hl": false
        },
        {
          "t": "linha",
          "s": 4.44,
          "e": 4.8,
          "hl": false
        },
        {
          "t": "de",
          "s": 4.83,
          "e": 5.14,
          "hl": false
        },
        {
          "t": "xis.",
          "s": 5.17,
          "e": 5.48,
          "hl": false
        },
        {
          "t": "Subindo,",
          "s": 5.91,
          "e": 6.32,
          "hl": false
        },
        {
          "t": "fica",
          "s": 6.55,
          "e": 6.91,
          "hl": false
        },
        {
          "t": "positivo.",
          "s": 6.94,
          "e": 7.4,
          "hl": true
        },
        {
          "t": "No",
          "s": 7.83,
          "e": 8.14,
          "hl": false
        },
        {
          "t": "topo,",
          "s": 8.17,
          "e": 8.53,
          "hl": false
        },
        {
          "t": "vale",
          "s": 8.76,
          "e": 9.12,
          "hl": false
        },
        {
          "t": "zero.",
          "s": 9.15,
          "e": 9.51,
          "hl": true
        },
        {
          "t": "Descendo,",
          "s": 9.94,
          "e": 10.35,
          "hl": false
        },
        {
          "t": "fica",
          "s": 10.58,
          "e": 10.94,
          "hl": false
        },
        {
          "t": "negativo.",
          "s": 10.97,
          "e": 11.43,
          "hl": true
        },
        {
          "t": "No",
          "s": 11.86,
          "e": 12.17,
          "hl": false
        },
        {
          "t": "vale,",
          "s": 12.2,
          "e": 12.56,
          "hl": false
        },
        {
          "t": "zero",
          "s": 12.79,
          "e": 13.15,
          "hl": false
        },
        {
          "t": "de",
          "s": 13.18,
          "e": 13.49,
          "hl": false
        },
        {
          "t": "novo.",
          "s": 13.52,
          "e": 13.88,
          "hl": false
        }
      ],
      "dur": 15.08,
      "terminal": {
        "cmd": "f′(x) > 0 sobe | f′(x) = 0 topo | f′(x) < 0 desce",
        "at": 5.91,
        "dur": 3
      },
      "status": {
        "tipo": "ok",
        "texto": "SINAL DA DERIVADA = SENTIDO DA ESTRADA",
        "at": 9.94
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tangente",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "triangulo",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "taxa",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "ponto-p",
          "dur": 0.5
        },
        {
          "at": 0.93,
          "acao": "aparecer",
          "alvo": "tick-0",
          "dur": 0.5,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 2.49,
          "acao": "aparecer",
          "alvo": "grafico-fp",
          "dur": 0.8,
          "de": {
            "y": 8
          }
        },
        {
          "at": 2.89,
          "acao": "aparecer",
          "alvo": "ponto-fp",
          "dur": 0.5
        },
        {
          "at": 3.27,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        },
        {
          "at": 5.91,
          "acao": "mover",
          "alvo": "ciclista",
          "dur": 1.08,
          "para": {
            "x": 26.2,
            "y": -9.4
          }
        },
        {
          "at": 5.91,
          "acao": "mover",
          "alvo": "ponto-fp",
          "dur": 1.08,
          "para": {
            "x": 26.2,
            "y": 8.7
          }
        },
        {
          "at": 5.91,
          "acao": "desenhar",
          "alvo": "fp-0",
          "dur": 1.08
        },
        {
          "at": 6.99,
          "acao": "aparecer",
          "alvo": "tick-1",
          "dur": 0.35,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 7.04,
          "acao": "mover",
          "alvo": "ciclista",
          "dur": 1.08,
          "para": {
            "x": 52.4,
            "y": -12.8
          }
        },
        {
          "at": 7.04,
          "acao": "mover",
          "alvo": "ponto-fp",
          "dur": 1.08,
          "para": {
            "x": 52.4,
            "y": 19.3
          }
        },
        {
          "at": 7.04,
          "acao": "desenhar",
          "alvo": "fp-1",
          "dur": 1.08
        },
        {
          "at": 8.12,
          "acao": "aparecer",
          "alvo": "tick-2",
          "dur": 0.35,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 9.74,
          "acao": "mover",
          "alvo": "ciclista",
          "dur": 0.42,
          "para": {
            "x": 84.9,
            "y": -7.7
          }
        },
        {
          "at": 9.74,
          "acao": "mover",
          "alvo": "ponto-fp",
          "dur": 0.42,
          "para": {
            "x": 84.9,
            "y": 32.1
          }
        },
        {
          "at": 9.74,
          "acao": "desenhar",
          "alvo": "fp-2",
          "dur": 0.42
        },
        {
          "at": 10.16,
          "acao": "aparecer",
          "alvo": "tick-3",
          "dur": 0.35,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 10.19,
          "acao": "mover",
          "alvo": "ciclista",
          "dur": 0.42,
          "para": {
            "x": 117.3,
            "y": 6.2
          }
        },
        {
          "at": 10.19,
          "acao": "mover",
          "alvo": "ponto-fp",
          "dur": 0.42,
          "para": {
            "x": 117.3,
            "y": 41.5
          }
        },
        {
          "at": 10.19,
          "acao": "desenhar",
          "alvo": "fp-3",
          "dur": 0.42
        },
        {
          "at": 10.61,
          "acao": "aparecer",
          "alvo": "tick-4",
          "dur": 0.35,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 10.64,
          "acao": "mover",
          "alvo": "ciclista",
          "dur": 0.42,
          "para": {
            "x": 149.8,
            "y": 25.2
          }
        },
        {
          "at": 10.64,
          "acao": "mover",
          "alvo": "ponto-fp",
          "dur": 0.42,
          "para": {
            "x": 149.8,
            "y": 45
          }
        },
        {
          "at": 10.64,
          "acao": "desenhar",
          "alvo": "fp-4",
          "dur": 0.42
        },
        {
          "at": 11.06,
          "acao": "aparecer",
          "alvo": "tick-5",
          "dur": 0.35,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 11.09,
          "acao": "mover",
          "alvo": "ciclista",
          "dur": 0.42,
          "para": {
            "x": 182.2,
            "y": 44.2
          }
        },
        {
          "at": 11.09,
          "acao": "mover",
          "alvo": "ponto-fp",
          "dur": 0.42,
          "para": {
            "x": 182.2,
            "y": 41.5
          }
        },
        {
          "at": 11.09,
          "acao": "desenhar",
          "alvo": "fp-5",
          "dur": 0.42
        },
        {
          "at": 11.51,
          "acao": "aparecer",
          "alvo": "tick-6",
          "dur": 0.35,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 11.54,
          "acao": "mover",
          "alvo": "ciclista",
          "dur": 0.42,
          "para": {
            "x": 214.7,
            "y": 58.1
          }
        },
        {
          "at": 11.54,
          "acao": "mover",
          "alvo": "ponto-fp",
          "dur": 0.42,
          "para": {
            "x": 214.7,
            "y": 32.1
          }
        },
        {
          "at": 11.54,
          "acao": "desenhar",
          "alvo": "fp-6",
          "dur": 0.42
        },
        {
          "at": 11.96,
          "acao": "aparecer",
          "alvo": "tick-7",
          "dur": 0.35,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 11.99,
          "acao": "mover",
          "alvo": "ciclista",
          "dur": 0.42,
          "para": {
            "x": 247.2,
            "y": 63.2
          }
        },
        {
          "at": 11.99,
          "acao": "mover",
          "alvo": "ponto-fp",
          "dur": 0.42,
          "para": {
            "x": 247.2,
            "y": 19.3
          }
        },
        {
          "at": 11.99,
          "acao": "desenhar",
          "alvo": "fp-7",
          "dur": 0.42
        },
        {
          "at": 12.41,
          "acao": "aparecer",
          "alvo": "tick-8",
          "dur": 0.35,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 12.44,
          "acao": "mover",
          "alvo": "ciclista",
          "dur": 0.47,
          "para": {
            "x": 281.6,
            "y": 57.5
          }
        },
        {
          "at": 12.44,
          "acao": "mover",
          "alvo": "ponto-fp",
          "dur": 0.47,
          "para": {
            "x": 281.6,
            "y": 5.7
          }
        },
        {
          "at": 12.44,
          "acao": "desenhar",
          "alvo": "fp-8",
          "dur": 0.47
        },
        {
          "at": 12.91,
          "acao": "aparecer",
          "alvo": "tick-9",
          "dur": 0.35,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 12.94,
          "acao": "mover",
          "alvo": "ciclista",
          "dur": 0.47,
          "para": {
            "x": 316.1,
            "y": 42.1
          }
        },
        {
          "at": 12.94,
          "acao": "mover",
          "alvo": "ponto-fp",
          "dur": 0.47,
          "para": {
            "x": 316.1,
            "y": -3.8
          }
        },
        {
          "at": 12.94,
          "acao": "desenhar",
          "alvo": "fp-9",
          "dur": 0.47
        },
        {
          "at": 13.41,
          "acao": "aparecer",
          "alvo": "tick-10",
          "dur": 0.35,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 13.44,
          "acao": "mover",
          "alvo": "ciclista",
          "dur": 0.47,
          "para": {
            "x": 350.5,
            "y": 21.6
          }
        },
        {
          "at": 13.44,
          "acao": "mover",
          "alvo": "ponto-fp",
          "dur": 0.47,
          "para": {
            "x": 350.5,
            "y": -6.4
          }
        },
        {
          "at": 13.44,
          "acao": "desenhar",
          "alvo": "fp-10",
          "dur": 0.47
        },
        {
          "at": 13.91,
          "acao": "aparecer",
          "alvo": "tick-11",
          "dur": 0.35,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 13.94,
          "acao": "mover",
          "alvo": "ciclista",
          "dur": 0.47,
          "para": {
            "x": 385,
            "y": 2.2
          }
        },
        {
          "at": 13.94,
          "acao": "mover",
          "alvo": "ponto-fp",
          "dur": 0.47,
          "para": {
            "x": 385,
            "y": -1.2
          }
        },
        {
          "at": 13.94,
          "acao": "desenhar",
          "alvo": "fp-11",
          "dur": 0.47
        },
        {
          "at": 14.41,
          "acao": "aparecer",
          "alvo": "tick-12",
          "dur": 0.35,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 6.94,
          "acao": "aparecer",
          "alvo": "rot-pos",
          "dur": 0.6,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 9.96,
          "acao": "aparecer",
          "alvo": "rot-zero",
          "dur": 0.6,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 10.97,
          "acao": "aparecer",
          "alvo": "rot-neg",
          "dur": 0.6,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 12.44,
          "acao": "aparecer",
          "alvo": "rot-zero2",
          "dur": 0.6,
          "de": {
            "y": 0.01
          }
        }
      ],
      "why": "O sinal de f′ diz se a curva sobe ou desce, e f′ = 0 marca topos e vales."
    },
    {
      "id": "velocimetro",
      "ordem": 7,
      "narration": "No carro, o odômetro marca a posição. O velocímetro marca a derivada, os quilômetros a mais por hora.",
      "words": [
        {
          "t": "No",
          "s": 0.2,
          "e": 0.51,
          "hl": false
        },
        {
          "t": "carro,",
          "s": 0.54,
          "e": 0.9,
          "hl": false
        },
        {
          "t": "o",
          "s": 1.13,
          "e": 1.44,
          "hl": false
        },
        {
          "t": "odômetro",
          "s": 1.47,
          "e": 1.93,
          "hl": true
        },
        {
          "t": "marca",
          "s": 1.96,
          "e": 2.32,
          "hl": false
        },
        {
          "t": "a",
          "s": 2.35,
          "e": 2.66,
          "hl": false
        },
        {
          "t": "posição.",
          "s": 2.69,
          "e": 3.1,
          "hl": true
        },
        {
          "t": "O",
          "s": 3.53,
          "e": 3.84,
          "hl": false
        },
        {
          "t": "velocímetro",
          "s": 3.87,
          "e": 4.37,
          "hl": true
        },
        {
          "t": "marca",
          "s": 4.4,
          "e": 4.76,
          "hl": false
        },
        {
          "t": "a",
          "s": 4.79,
          "e": 5.1,
          "hl": false
        },
        {
          "t": "derivada,",
          "s": 5.13,
          "e": 5.59,
          "hl": true
        },
        {
          "t": "os",
          "s": 5.82,
          "e": 6.13,
          "hl": false
        },
        {
          "t": "quilômetros",
          "s": 6.16,
          "e": 6.62,
          "hl": false
        },
        {
          "t": "a",
          "s": 6.65,
          "e": 6.96,
          "hl": false
        },
        {
          "t": "mais",
          "s": 6.99,
          "e": 7.3,
          "hl": false
        },
        {
          "t": "por",
          "s": 7.33,
          "e": 7.64,
          "hl": false
        },
        {
          "t": "hora.",
          "s": 7.67,
          "e": 8.03,
          "hl": false
        }
      ],
      "dur": 9.23,
      "terminal": {
        "cmd": "velocidade = d(posição) / d(tempo)   [km/h]",
        "at": 3.87,
        "dur": 2.4
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "grafico-fp",
          "dur": 0.7
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "ticks",
          "dur": 0.7
        },
        {
          "at": 1.47,
          "acao": "aparecer",
          "alvo": "odometro",
          "dur": 0.8,
          "de": {
            "y": 12
          }
        },
        {
          "at": 3.87,
          "acao": "aparecer",
          "alvo": "velocimetro",
          "dur": 0.8,
          "de": {
            "y": 12
          }
        },
        {
          "at": 5.13,
          "acao": "aparecer",
          "alvo": "rel-vel",
          "dur": 0.7,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 5.33,
          "acao": "destacar",
          "alvo": "velocimetro",
          "dur": 1.2
        },
        {
          "at": 6.16,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        }
      ],
      "why": "Velocidade é a taxa com que a posição muda no tempo.",
      "example": {
        "titulo": "No dia a dia",
        "texto": "Quando o velocímetro marca 100 km/h, a derivada da posição vale 100 quilômetros a mais a cada hora.",
        "at": 4.47
      }
    },
    {
      "id": "ia",
      "ordem": 8,
      "narration": "Na IA, o gradiente descendente usa a derivada para saber para onde descer, passo a passo.",
      "words": [
        {
          "t": "Na",
          "s": 0.2,
          "e": 0.51,
          "hl": false
        },
        {
          "t": "IA,",
          "s": 0.54,
          "e": 0.85,
          "hl": false
        },
        {
          "t": "o",
          "s": 1.08,
          "e": 1.39,
          "hl": false
        },
        {
          "t": "gradiente",
          "s": 1.42,
          "e": 1.83,
          "hl": true
        },
        {
          "t": "descendente",
          "s": 1.86,
          "e": 2.32,
          "hl": true
        },
        {
          "t": "usa",
          "s": 2.35,
          "e": 2.71,
          "hl": false
        },
        {
          "t": "a",
          "s": 2.74,
          "e": 3.05,
          "hl": false
        },
        {
          "t": "derivada",
          "s": 3.08,
          "e": 3.54,
          "hl": true
        },
        {
          "t": "para",
          "s": 3.57,
          "e": 3.93,
          "hl": false
        },
        {
          "t": "saber",
          "s": 3.96,
          "e": 4.32,
          "hl": false
        },
        {
          "t": "para",
          "s": 4.35,
          "e": 4.71,
          "hl": false
        },
        {
          "t": "onde",
          "s": 4.74,
          "e": 5.1,
          "hl": false
        },
        {
          "t": "descer,",
          "s": 5.13,
          "e": 5.49,
          "hl": true
        },
        {
          "t": "passo",
          "s": 5.72,
          "e": 6.08,
          "hl": false
        },
        {
          "t": "a",
          "s": 6.11,
          "e": 6.42,
          "hl": false
        },
        {
          "t": "passo.",
          "s": 6.45,
          "e": 6.81,
          "hl": false
        }
      ],
      "dur": 8.01,
      "terminal": {
        "cmd": "w ← w − η · f′(w)",
        "at": 2.35,
        "dur": 1.8
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "odometro",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "velocimetro",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rel-vel",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "ia",
          "dur": 0.7,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 0.3,
          "acao": "desenhar",
          "alvo": "tigela",
          "dur": 1.8
        },
        {
          "at": 1.42,
          "acao": "aparecer",
          "alvo": "bola-ia",
          "dur": 0.7,
          "de": {
            "y": -14
          }
        },
        {
          "at": 3.08,
          "acao": "desenhar",
          "alvo": "tg-ia",
          "dur": 0.8
        },
        {
          "at": 3.58,
          "acao": "aparecer",
          "alvo": "rot-ia",
          "dur": 0.6,
          "de": {
            "y": 0.01
          }
        },
        {
          "at": 3.96,
          "acao": "desenhar",
          "alvo": "seta-ia",
          "dur": 0.9
        },
        {
          "at": 5.13,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        },
        {
          "at": 3.86,
          "acao": "mover",
          "alvo": "bola-ia",
          "dur": 0.65,
          "para": {
            "x": 35,
            "y": 38.3
          }
        },
        {
          "at": 4.62,
          "acao": "mover",
          "alvo": "bola-ia",
          "dur": 0.65,
          "para": {
            "x": 56,
            "y": 52.2
          }
        },
        {
          "at": 5.38,
          "acao": "mover",
          "alvo": "bola-ia",
          "dur": 0.65,
          "para": {
            "x": 69,
            "y": 57.4
          }
        },
        {
          "at": 6.15,
          "acao": "mover",
          "alvo": "bola-ia",
          "dur": 0.65,
          "para": {
            "x": 77,
            "y": 59.2
          }
        }
      ],
      "why": "Treinar um modelo é descer um relevo de erro seguindo a derivada.",
      "example": {
        "titulo": "No seu trabalho",
        "texto": "O gradiente descendente usa a derivada do erro para dar um passo no sentido oposto. Passo a passo, o erro cai.",
        "at": 2.35
      }
    }
  ],
  "outro": {
    "dur": 10.55,
    "narration": "A derivada é a inclinação da tangente, ponto a ponto. O sympy faz esse cálculo por você. Agora mexa no laboratório.",
    "words": [
      {
        "t": "A",
        "s": 0.2,
        "e": 0.51,
        "hl": false
      },
      {
        "t": "derivada",
        "s": 0.54,
        "e": 1,
        "hl": false
      },
      {
        "t": "é",
        "s": 1.03,
        "e": 1.34,
        "hl": false
      },
      {
        "t": "a",
        "s": 1.37,
        "e": 1.68,
        "hl": false
      },
      {
        "t": "inclinação",
        "s": 1.71,
        "e": 2.17,
        "hl": true
      },
      {
        "t": "da",
        "s": 2.2,
        "e": 2.51,
        "hl": false
      },
      {
        "t": "tangente,",
        "s": 2.54,
        "e": 2.95,
        "hl": true
      },
      {
        "t": "ponto",
        "s": 3.18,
        "e": 3.54,
        "hl": false
      },
      {
        "t": "a",
        "s": 3.57,
        "e": 3.88,
        "hl": false
      },
      {
        "t": "ponto.",
        "s": 3.91,
        "e": 4.27,
        "hl": false
      },
      {
        "t": "O",
        "s": 4.7,
        "e": 5.01,
        "hl": false
      },
      {
        "t": "sympy",
        "s": 5.04,
        "e": 5.35,
        "hl": true
      },
      {
        "t": "faz",
        "s": 5.38,
        "e": 5.69,
        "hl": false
      },
      {
        "t": "esse",
        "s": 5.72,
        "e": 6.08,
        "hl": false
      },
      {
        "t": "cálculo",
        "s": 6.11,
        "e": 6.52,
        "hl": false
      },
      {
        "t": "por",
        "s": 6.55,
        "e": 6.86,
        "hl": false
      },
      {
        "t": "você.",
        "s": 6.89,
        "e": 7.25,
        "hl": false
      },
      {
        "t": "Agora",
        "s": 7.68,
        "e": 8.09,
        "hl": false
      },
      {
        "t": "mexa",
        "s": 8.12,
        "e": 8.48,
        "hl": false
      },
      {
        "t": "no",
        "s": 8.51,
        "e": 8.82,
        "hl": false
      },
      {
        "t": "laboratório.",
        "s": 8.85,
        "e": 9.35,
        "hl": true
      }
    ],
    "scene": [
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "ia",
        "dur": 0.6
      },
      {
        "at": 0.2,
        "acao": "aparecer",
        "alvo": "ticks",
        "dur": 0.7,
        "de": {
          "y": 0.01
        }
      },
      {
        "at": 0.2,
        "acao": "aparecer",
        "alvo": "grafico-fp",
        "dur": 0.7,
        "de": {
          "y": 0.01
        }
      },
      {
        "at": 0.2,
        "acao": "mover",
        "alvo": "ciclista",
        "dur": 1,
        "para": {
          "x": 316.1,
          "y": 42.1
        }
      },
      {
        "at": 2.54,
        "acao": "destacar",
        "alvo": "ticks",
        "dur": 1.2,
        "vezes": 1
      },
      {
        "at": 8.85,
        "acao": "destacar",
        "alvo": "guia-braco",
        "dur": 1.2
      }
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "import sympy as sp\nx = sp.symbols('x')\nprint(sp.diff(x**2, x))",
      "at": 5.04,
      "dur": 3.4
    }
  }
};
