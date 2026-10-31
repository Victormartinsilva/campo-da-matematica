/* Roteiro do mini-vídeo "Séries de Taylor" (metáfora: lavoura). Tempos em segundos desde o início de cada peça. */
window.Explainers = window.Explainers || {};
Explainers.taylor = {
  "meta": {
    "id": "taylor",
    "categoria": "CÁLCULO",
    "area": "calculo",
    "titulo": "Séries de Taylor",
    "duracao": 77,
    "cena": "taylor"
  },
  "pieces": [
    {
      "id": "abertura",
      "ordem": 1,
      "narration": "Esta é a lavoura do Seu Palha. O terreno ondulado é a função real. A bandeirinha marca o ponto central.",
      "words": [
        {
          "t": "Esta",
          "s": 0.2,
          "e": 0.5,
          "hl": false
        },
        {
          "t": "é",
          "s": 0.53,
          "e": 0.83,
          "hl": false
        },
        {
          "t": "a",
          "s": 0.86,
          "e": 1.16,
          "hl": false
        },
        {
          "t": "lavoura",
          "s": 1.19,
          "e": 1.51,
          "hl": true
        },
        {
          "t": "do",
          "s": 1.54,
          "e": 1.84,
          "hl": false
        },
        {
          "t": "Seu",
          "s": 1.87,
          "e": 2.17,
          "hl": false
        },
        {
          "t": "Palha.",
          "s": 2.2,
          "e": 2.5,
          "hl": false
        },
        {
          "t": "O",
          "s": 2.93,
          "e": 3.23,
          "hl": false
        },
        {
          "t": "terreno",
          "s": 3.26,
          "e": 3.58,
          "hl": false
        },
        {
          "t": "ondulado",
          "s": 3.61,
          "e": 3.95,
          "hl": false
        },
        {
          "t": "é",
          "s": 3.98,
          "e": 4.28,
          "hl": false
        },
        {
          "t": "a",
          "s": 4.31,
          "e": 4.61,
          "hl": false
        },
        {
          "t": "função",
          "s": 4.64,
          "e": 4.94,
          "hl": true
        },
        {
          "t": "real.",
          "s": 4.97,
          "e": 5.27,
          "hl": true
        },
        {
          "t": "A",
          "s": 5.7,
          "e": 6,
          "hl": false
        },
        {
          "t": "bandeirinha",
          "s": 6.03,
          "e": 6.43,
          "hl": true
        },
        {
          "t": "marca",
          "s": 6.46,
          "e": 6.76,
          "hl": false
        },
        {
          "t": "o",
          "s": 6.79,
          "e": 7.09,
          "hl": false
        },
        {
          "t": "ponto",
          "s": 7.12,
          "e": 7.42,
          "hl": false
        },
        {
          "t": "central.",
          "s": 7.45,
          "e": 7.77,
          "hl": false
        }
      ],
      "dur": 8.97,
      "terminal": {
        "cmd": "f(x) = relevo do terreno",
        "at": 3.26,
        "dur": 1.8
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "destacar",
          "alvo": "palha",
          "dur": 1.2
        },
        {
          "at": 1.87,
          "acao": "destacar",
          "alvo": "palha-chapeu",
          "dur": 1,
          "vezes": 1
        },
        {
          "at": 3.26,
          "acao": "desenhar",
          "alvo": "relevo",
          "dur": 2.4
        },
        {
          "at": 6.03,
          "acao": "aparecer",
          "alvo": "bandeira",
          "dur": 0.8,
          "de": {
            "y": -14
          }
        },
        {
          "at": 7.45,
          "acao": "destacar",
          "alvo": "bandeira",
          "dur": 1
        }
      ],
      "why": "Toda a história começa com a função real e com um ponto de operação."
    },
    {
      "id": "tangente",
      "ordem": 2,
      "narration": "Primeiro, uma estaca reta na bandeirinha. Ela guarda a altura e a inclinação. Perto do ponto, a reta já serve.",
      "words": [
        {
          "t": "Primeiro,",
          "s": 0.2,
          "e": 0.54,
          "hl": false
        },
        {
          "t": "uma",
          "s": 0.77,
          "e": 1.07,
          "hl": false
        },
        {
          "t": "estaca",
          "s": 1.1,
          "e": 1.4,
          "hl": true
        },
        {
          "t": "reta",
          "s": 1.43,
          "e": 1.73,
          "hl": false
        },
        {
          "t": "na",
          "s": 1.76,
          "e": 2.06,
          "hl": false
        },
        {
          "t": "bandeirinha.",
          "s": 2.09,
          "e": 2.49,
          "hl": false
        },
        {
          "t": "Ela",
          "s": 2.92,
          "e": 3.22,
          "hl": false
        },
        {
          "t": "guarda",
          "s": 3.25,
          "e": 3.55,
          "hl": false
        },
        {
          "t": "a",
          "s": 3.58,
          "e": 3.88,
          "hl": false
        },
        {
          "t": "altura",
          "s": 3.91,
          "e": 4.21,
          "hl": true
        },
        {
          "t": "e",
          "s": 4.24,
          "e": 4.54,
          "hl": false
        },
        {
          "t": "a",
          "s": 4.57,
          "e": 4.87,
          "hl": false
        },
        {
          "t": "inclinação.",
          "s": 4.9,
          "e": 5.28,
          "hl": true
        },
        {
          "t": "Perto",
          "s": 5.71,
          "e": 6.01,
          "hl": false
        },
        {
          "t": "do",
          "s": 6.04,
          "e": 6.34,
          "hl": false
        },
        {
          "t": "ponto,",
          "s": 6.37,
          "e": 6.67,
          "hl": false
        },
        {
          "t": "a",
          "s": 6.9,
          "e": 7.2,
          "hl": false
        },
        {
          "t": "reta",
          "s": 7.23,
          "e": 7.53,
          "hl": false
        },
        {
          "t": "já",
          "s": 7.56,
          "e": 7.86,
          "hl": false
        },
        {
          "t": "serve.",
          "s": 7.89,
          "e": 8.19,
          "hl": true
        }
      ],
      "dur": 9.39,
      "terminal": {
        "cmd": "P1 = f(a) + f'(a)·(x − a)",
        "at": 0.2,
        "dur": 2.2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "estaca",
          "dur": 0.9,
          "de": {
            "y": -16
          }
        },
        {
          "at": 3.91,
          "acao": "destacar",
          "alvo": "bandeira",
          "dur": 0.8
        },
        {
          "at": 5.71,
          "acao": "destacar",
          "alvo": "estaca",
          "dur": 1.2
        },
        {
          "at": 5.71,
          "acao": "destacar",
          "alvo": "palha-braco",
          "dur": 1
        }
      ],
      "why": "A tangente é a melhor aproximação em linha reta perto de um ponto."
    },
    {
      "id": "parabola",
      "ordem": 3,
      "narration": "Agora, uma vara de bambu dobrada. Ela traz a curvatura, a ordem dois, e segue o terreno melhor.",
      "words": [
        {
          "t": "Agora,",
          "s": 0.2,
          "e": 0.5,
          "hl": false
        },
        {
          "t": "uma",
          "s": 0.73,
          "e": 1.03,
          "hl": false
        },
        {
          "t": "vara",
          "s": 1.06,
          "e": 1.36,
          "hl": false
        },
        {
          "t": "de",
          "s": 1.39,
          "e": 1.69,
          "hl": false
        },
        {
          "t": "bambu",
          "s": 1.72,
          "e": 2.02,
          "hl": true
        },
        {
          "t": "dobrada.",
          "s": 2.05,
          "e": 2.37,
          "hl": false
        },
        {
          "t": "Ela",
          "s": 2.8,
          "e": 3.1,
          "hl": false
        },
        {
          "t": "traz",
          "s": 3.13,
          "e": 3.43,
          "hl": false
        },
        {
          "t": "a",
          "s": 3.46,
          "e": 3.76,
          "hl": false
        },
        {
          "t": "curvatura,",
          "s": 3.79,
          "e": 4.15,
          "hl": true
        },
        {
          "t": "a",
          "s": 4.38,
          "e": 4.68,
          "hl": false
        },
        {
          "t": "ordem",
          "s": 4.71,
          "e": 5.01,
          "hl": false
        },
        {
          "t": "dois,",
          "s": 5.04,
          "e": 5.34,
          "hl": true
        },
        {
          "t": "e",
          "s": 5.57,
          "e": 5.87,
          "hl": false
        },
        {
          "t": "segue",
          "s": 5.9,
          "e": 6.2,
          "hl": false
        },
        {
          "t": "o",
          "s": 6.23,
          "e": 6.53,
          "hl": false
        },
        {
          "t": "terreno",
          "s": 6.56,
          "e": 6.88,
          "hl": false
        },
        {
          "t": "melhor.",
          "s": 6.91,
          "e": 7.21,
          "hl": false
        }
      ],
      "dur": 8.41,
      "terminal": {
        "cmd": "P2 = P1 + f″(a)/2·(x − a)²",
        "at": 0.2,
        "dur": 2.2
      },
      "status": {
        "tipo": "alerta",
        "texto": "ERRO MÉDIO: DÁ PARA USAR",
        "at": 5.9
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "bambu",
          "dur": 0.9,
          "de": {
            "y": -16
          }
        },
        {
          "at": 3.79,
          "acao": "destacar",
          "alvo": "bambu",
          "dur": 1.2
        },
        {
          "at": 5.9,
          "acao": "destacar",
          "alvo": "palha-braco",
          "dur": 1
        }
      ],
      "why": "A curvatura corrige o que a reta não enxerga."
    },
    {
      "id": "ordem3",
      "ordem": 4,
      "narration": "O arame da ordem três ajusta a cauda. Na faixa verde, o erro fica abaixo de cinco por cento. Ela se alarga.",
      "words": [
        {
          "t": "O",
          "s": 0.2,
          "e": 0.5,
          "hl": false
        },
        {
          "t": "arame",
          "s": 0.53,
          "e": 0.83,
          "hl": true
        },
        {
          "t": "da",
          "s": 0.86,
          "e": 1.16,
          "hl": false
        },
        {
          "t": "ordem",
          "s": 1.19,
          "e": 1.49,
          "hl": false
        },
        {
          "t": "três",
          "s": 1.52,
          "e": 1.82,
          "hl": true
        },
        {
          "t": "ajusta",
          "s": 1.85,
          "e": 2.15,
          "hl": false
        },
        {
          "t": "a",
          "s": 2.18,
          "e": 2.48,
          "hl": false
        },
        {
          "t": "cauda.",
          "s": 2.51,
          "e": 2.81,
          "hl": false
        },
        {
          "t": "Na",
          "s": 3.24,
          "e": 3.54,
          "hl": false
        },
        {
          "t": "faixa",
          "s": 3.57,
          "e": 3.87,
          "hl": true
        },
        {
          "t": "verde,",
          "s": 3.9,
          "e": 4.2,
          "hl": false
        },
        {
          "t": "o",
          "s": 4.43,
          "e": 4.73,
          "hl": false
        },
        {
          "t": "erro",
          "s": 4.76,
          "e": 5.06,
          "hl": false
        },
        {
          "t": "fica",
          "s": 5.09,
          "e": 5.39,
          "hl": false
        },
        {
          "t": "abaixo",
          "s": 5.42,
          "e": 5.72,
          "hl": false
        },
        {
          "t": "de",
          "s": 5.75,
          "e": 6.05,
          "hl": false
        },
        {
          "t": "cinco",
          "s": 6.08,
          "e": 6.38,
          "hl": true
        },
        {
          "t": "por",
          "s": 6.41,
          "e": 6.71,
          "hl": false
        },
        {
          "t": "cento.",
          "s": 6.74,
          "e": 7.04,
          "hl": false
        },
        {
          "t": "Ela",
          "s": 7.47,
          "e": 7.77,
          "hl": false
        },
        {
          "t": "se",
          "s": 7.8,
          "e": 8.1,
          "hl": false
        },
        {
          "t": "alarga.",
          "s": 8.13,
          "e": 8.43,
          "hl": false
        }
      ],
      "dur": 9.63,
      "terminal": {
        "cmd": "P3 = P2 + f‴(a)/6·(x − a)³",
        "at": 0.53,
        "dur": 2.2
      },
      "scene": [
        {
          "at": 0.53,
          "acao": "aparecer",
          "alvo": "arame",
          "dur": 0.9,
          "de": {
            "y": -16
          }
        },
        {
          "at": 3.24,
          "acao": "aparecer",
          "alvo": "faixa",
          "dur": 0.8
        },
        {
          "at": 4.76,
          "acao": "destacar",
          "alvo": "faixa",
          "dur": 1.2
        },
        {
          "at": 8.13,
          "acao": "dimensionar",
          "alvo": "faixa",
          "dur": 1.4,
          "sx": 1.8
        }
      ],
      "why": "Cada termo novo alarga a região em que a aproximação é boa."
    },
    {
      "id": "ordemAlta",
      "ordem": 5,
      "narration": "Quanto mais termos, mais a faixa cresce. O arame de ordem alta cola no relevo por um trecho enorme.",
      "words": [
        {
          "t": "Quanto",
          "s": 0.2,
          "e": 0.5,
          "hl": false
        },
        {
          "t": "mais",
          "s": 0.53,
          "e": 0.83,
          "hl": false
        },
        {
          "t": "termos,",
          "s": 0.86,
          "e": 1.16,
          "hl": true
        },
        {
          "t": "mais",
          "s": 1.39,
          "e": 1.69,
          "hl": false
        },
        {
          "t": "a",
          "s": 1.72,
          "e": 2.02,
          "hl": false
        },
        {
          "t": "faixa",
          "s": 2.05,
          "e": 2.35,
          "hl": true
        },
        {
          "t": "cresce.",
          "s": 2.38,
          "e": 2.68,
          "hl": false
        },
        {
          "t": "O",
          "s": 3.11,
          "e": 3.41,
          "hl": false
        },
        {
          "t": "arame",
          "s": 3.44,
          "e": 3.74,
          "hl": false
        },
        {
          "t": "de",
          "s": 3.77,
          "e": 4.07,
          "hl": false
        },
        {
          "t": "ordem",
          "s": 4.1,
          "e": 4.4,
          "hl": true
        },
        {
          "t": "alta",
          "s": 4.43,
          "e": 4.73,
          "hl": false
        },
        {
          "t": "cola",
          "s": 4.76,
          "e": 5.06,
          "hl": false
        },
        {
          "t": "no",
          "s": 5.09,
          "e": 5.39,
          "hl": false
        },
        {
          "t": "relevo",
          "s": 5.42,
          "e": 5.72,
          "hl": false
        },
        {
          "t": "por",
          "s": 5.75,
          "e": 6.05,
          "hl": false
        },
        {
          "t": "um",
          "s": 6.08,
          "e": 6.38,
          "hl": false
        },
        {
          "t": "trecho",
          "s": 6.41,
          "e": 6.71,
          "hl": false
        },
        {
          "t": "enorme.",
          "s": 6.74,
          "e": 7.04,
          "hl": false
        }
      ],
      "dur": 8.24,
      "terminal": {
        "cmd": "Pn = Σ f⁽ᵏ⁾(a)/k! · (x − a)ᵏ",
        "at": 0.2,
        "dur": 2.4
      },
      "status": {
        "tipo": "ok",
        "texto": "ERRO BAIXO: A FAIXA CRESCEU",
        "at": 6.41
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "dimensionar",
          "alvo": "faixa",
          "dur": 1.8,
          "sx": 3.2
        },
        {
          "at": 3.44,
          "acao": "aparecer",
          "alvo": "arame4",
          "dur": 0.9,
          "de": {
            "y": -12
          }
        },
        {
          "at": 6.41,
          "acao": "destacar",
          "alvo": "arame4",
          "dur": 1.2
        }
      ],
      "why": "Mais termos dão uma faixa de acerto cada vez maior."
    },
    {
      "id": "afastar",
      "ordem": 6,
      "narration": "Mas o carrinho-sensor se afasta. Longe do centro, a aproximação se solta e o erro dispara. Taylor só vale por perto.",
      "words": [
        {
          "t": "Mas",
          "s": 0.2,
          "e": 0.5,
          "hl": false
        },
        {
          "t": "o",
          "s": 0.53,
          "e": 0.83,
          "hl": false
        },
        {
          "t": "carrinho-sensor",
          "s": 0.86,
          "e": 1.34,
          "hl": true
        },
        {
          "t": "se",
          "s": 1.37,
          "e": 1.67,
          "hl": false
        },
        {
          "t": "afasta.",
          "s": 1.7,
          "e": 2,
          "hl": false
        },
        {
          "t": "Longe",
          "s": 2.43,
          "e": 2.73,
          "hl": true
        },
        {
          "t": "do",
          "s": 2.76,
          "e": 3.06,
          "hl": false
        },
        {
          "t": "centro,",
          "s": 3.09,
          "e": 3.39,
          "hl": false
        },
        {
          "t": "a",
          "s": 3.62,
          "e": 3.92,
          "hl": false
        },
        {
          "t": "aproximação",
          "s": 3.95,
          "e": 4.35,
          "hl": false
        },
        {
          "t": "se",
          "s": 4.38,
          "e": 4.68,
          "hl": false
        },
        {
          "t": "solta",
          "s": 4.71,
          "e": 5.01,
          "hl": false
        },
        {
          "t": "e",
          "s": 5.04,
          "e": 5.34,
          "hl": false
        },
        {
          "t": "o",
          "s": 5.37,
          "e": 5.67,
          "hl": false
        },
        {
          "t": "erro",
          "s": 5.7,
          "e": 6,
          "hl": true
        },
        {
          "t": "dispara.",
          "s": 6.03,
          "e": 6.35,
          "hl": false
        },
        {
          "t": "Taylor",
          "s": 6.78,
          "e": 7.08,
          "hl": false
        },
        {
          "t": "só",
          "s": 7.11,
          "e": 7.41,
          "hl": false
        },
        {
          "t": "vale",
          "s": 7.44,
          "e": 7.74,
          "hl": false
        },
        {
          "t": "por",
          "s": 7.77,
          "e": 8.07,
          "hl": false
        },
        {
          "t": "perto.",
          "s": 8.1,
          "e": 8.4,
          "hl": true
        }
      ],
      "dur": 9.6,
      "terminal": {
        "cmd": "erro = |f(x) − Pn(x)|",
        "at": 2.43,
        "dur": 2
      },
      "status": {
        "tipo": "erro",
        "texto": "ERRO ALTO: APROXIMAÇÃO PERDIDA",
        "at": 5.7
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "sensor",
          "dur": 0.7
        },
        {
          "at": 1.7,
          "acao": "mover",
          "alvo": "sensor",
          "dur": 2.4,
          "para": {
            "x": 230,
            "y": 77.3
          }
        },
        {
          "at": 5.7,
          "acao": "aparecer",
          "alvo": "erro",
          "dur": 0.8
        },
        {
          "at": 6.03,
          "acao": "destacar",
          "alvo": "erro",
          "dur": 1.4
        },
        {
          "at": 6.78,
          "acao": "destacar",
          "alvo": "palha-braco",
          "dur": 1
        }
      ],
      "why": "Taylor é uma aproximação local, e longe do centro ela perde a validade."
    },
    {
      "id": "calculadora",
      "ordem": 7,
      "narration": "Na calculadora, seno, exponencial e logaritmo viram poucos termos de Taylor.",
      "words": [
        {
          "t": "Na",
          "s": 0.2,
          "e": 0.5,
          "hl": false
        },
        {
          "t": "calculadora,",
          "s": 0.53,
          "e": 0.93,
          "hl": true
        },
        {
          "t": "seno,",
          "s": 1.16,
          "e": 1.46,
          "hl": true
        },
        {
          "t": "exponencial",
          "s": 1.69,
          "e": 2.09,
          "hl": true
        },
        {
          "t": "e",
          "s": 2.12,
          "e": 2.42,
          "hl": false
        },
        {
          "t": "logaritmo",
          "s": 2.45,
          "e": 2.81,
          "hl": false
        },
        {
          "t": "viram",
          "s": 2.84,
          "e": 3.14,
          "hl": false
        },
        {
          "t": "poucos",
          "s": 3.17,
          "e": 3.47,
          "hl": false
        },
        {
          "t": "termos",
          "s": 3.5,
          "e": 3.8,
          "hl": false
        },
        {
          "t": "de",
          "s": 3.83,
          "e": 4.13,
          "hl": false
        },
        {
          "t": "Taylor.",
          "s": 4.16,
          "e": 4.46,
          "hl": true
        }
      ],
      "dur": 5.66,
      "terminal": {
        "cmd": "sen(x) ≈ x − x³/3! + x⁵/5!",
        "at": 1.16,
        "dur": 2.2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "sensor",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "erro",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "calc",
          "dur": 0.9,
          "de": {
            "y": 14
          }
        },
        {
          "at": 1.16,
          "acao": "destacar",
          "alvo": "calc",
          "dur": 1.2
        }
      ],
      "why": "Funções difíceis viram somas de potências, que o computador sabe calcular.",
      "example": {
        "titulo": "No dia a dia",
        "texto": "Sua calculadora não guarda uma tabela de senos. Ela soma poucos termos de Taylor, como x − x³/6 + x⁵/120, e já acerta várias casas decimais para x pequeno."
      }
    },
    {
      "id": "trabalho",
      "ordem": 8,
      "narration": "Na IA, o gradiente descendente usa a tangente. O método de Newton usa a parábola.",
      "words": [
        {
          "t": "Na",
          "s": 0.2,
          "e": 0.5,
          "hl": false
        },
        {
          "t": "IA,",
          "s": 0.53,
          "e": 0.83,
          "hl": false
        },
        {
          "t": "o",
          "s": 1.06,
          "e": 1.36,
          "hl": false
        },
        {
          "t": "gradiente",
          "s": 1.39,
          "e": 1.75,
          "hl": true
        },
        {
          "t": "descendente",
          "s": 1.78,
          "e": 2.18,
          "hl": false
        },
        {
          "t": "usa",
          "s": 2.21,
          "e": 2.51,
          "hl": false
        },
        {
          "t": "a",
          "s": 2.54,
          "e": 2.84,
          "hl": false
        },
        {
          "t": "tangente.",
          "s": 2.87,
          "e": 3.21,
          "hl": true
        },
        {
          "t": "O",
          "s": 3.64,
          "e": 3.94,
          "hl": false
        },
        {
          "t": "método",
          "s": 3.97,
          "e": 4.27,
          "hl": false
        },
        {
          "t": "de",
          "s": 4.3,
          "e": 4.6,
          "hl": false
        },
        {
          "t": "Newton",
          "s": 4.63,
          "e": 4.93,
          "hl": true
        },
        {
          "t": "usa",
          "s": 4.96,
          "e": 5.26,
          "hl": false
        },
        {
          "t": "a",
          "s": 5.29,
          "e": 5.59,
          "hl": false
        },
        {
          "t": "parábola.",
          "s": 5.62,
          "e": 5.96,
          "hl": true
        }
      ],
      "dur": 7.16,
      "terminal": {
        "cmd": "x ← x − η·f'(x)   |   x ← x − f'(x)/f″(x)",
        "at": 1.39,
        "dur": 2.6
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "calc",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "bola",
          "dur": 0.9
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "seta-descida",
          "dur": 0.9
        },
        {
          "at": 1.39,
          "acao": "destacar",
          "alvo": "seta-descida",
          "dur": 1.2
        },
        {
          "at": 2.87,
          "acao": "mover",
          "alvo": "bola",
          "dur": 1.8,
          "para": {
            "x": 60,
            "y": 30
          }
        },
        {
          "at": 4.63,
          "acao": "destacar",
          "alvo": "palha-braco",
          "dur": 1
        }
      ],
      "why": "Treinar modelos de IA é descer um relevo, e Taylor diz como dar cada passo.",
      "example": {
        "titulo": "No seu trabalho",
        "texto": "O gradiente descendente usa a tangente (ordem 1) para decidir a direção do passo. O método de Newton usa a parábola (ordem 2) e acelera a chegada ao mínimo."
      }
    }
  ],
  "outro": {
    "narration": "Perto do ponto, cada ordem a mais alarga a faixa de acerto. Longe dele, o erro cresce. Agora mexa no laboratório.",
    "words": [
      {
        "t": "Perto",
        "s": 0.2,
        "e": 0.5,
        "hl": false
      },
      {
        "t": "do",
        "s": 0.53,
        "e": 0.83,
        "hl": false
      },
      {
        "t": "ponto,",
        "s": 0.86,
        "e": 1.16,
        "hl": false
      },
      {
        "t": "cada",
        "s": 1.39,
        "e": 1.69,
        "hl": false
      },
      {
        "t": "ordem",
        "s": 1.72,
        "e": 2.02,
        "hl": true
      },
      {
        "t": "a",
        "s": 2.05,
        "e": 2.35,
        "hl": false
      },
      {
        "t": "mais",
        "s": 2.38,
        "e": 2.68,
        "hl": false
      },
      {
        "t": "alarga",
        "s": 2.71,
        "e": 3.01,
        "hl": false
      },
      {
        "t": "a",
        "s": 3.04,
        "e": 3.34,
        "hl": false
      },
      {
        "t": "faixa",
        "s": 3.37,
        "e": 3.67,
        "hl": true
      },
      {
        "t": "de",
        "s": 3.7,
        "e": 4,
        "hl": false
      },
      {
        "t": "acerto.",
        "s": 4.03,
        "e": 4.33,
        "hl": false
      },
      {
        "t": "Longe",
        "s": 4.76,
        "e": 5.06,
        "hl": false
      },
      {
        "t": "dele,",
        "s": 5.09,
        "e": 5.39,
        "hl": false
      },
      {
        "t": "o",
        "s": 5.62,
        "e": 5.92,
        "hl": false
      },
      {
        "t": "erro",
        "s": 5.95,
        "e": 6.25,
        "hl": true
      },
      {
        "t": "cresce.",
        "s": 6.28,
        "e": 6.58,
        "hl": false
      },
      {
        "t": "Agora",
        "s": 7.01,
        "e": 7.31,
        "hl": false
      },
      {
        "t": "mexa",
        "s": 7.34,
        "e": 7.64,
        "hl": false
      },
      {
        "t": "no",
        "s": 7.67,
        "e": 7.97,
        "hl": false
      },
      {
        "t": "laboratório.",
        "s": 8,
        "e": 8.4,
        "hl": true
      }
    ],
    "dur": 10.16,
    "scene": [
      {
        "at": 0.2,
        "acao": "aparecer",
        "alvo": "relevo",
        "dur": 0.6
      },
      {
        "at": 0.2,
        "acao": "aparecer",
        "alvo": "bandeira",
        "dur": 0.6
      },
      {
        "at": 0.2,
        "acao": "aparecer",
        "alvo": "estaca",
        "dur": 0.6
      },
      {
        "at": 0.2,
        "acao": "aparecer",
        "alvo": "bambu",
        "dur": 0.6
      },
      {
        "at": 0.2,
        "acao": "aparecer",
        "alvo": "arame",
        "dur": 0.6
      },
      {
        "at": 0.2,
        "acao": "aparecer",
        "alvo": "arame4",
        "dur": 0.6
      },
      {
        "at": 0.2,
        "acao": "aparecer",
        "alvo": "faixa",
        "dur": 0.6
      },
      {
        "at": 0.2,
        "acao": "dimensionar",
        "alvo": "faixa",
        "dur": 0.6,
        "sx": 3.2
      },
      {
        "at": 0.2,
        "acao": "aparecer",
        "alvo": "sensor",
        "dur": 0.6
      },
      {
        "at": 4.76,
        "acao": "mover",
        "alvo": "sensor",
        "dur": 1.6,
        "para": {
          "x": 230,
          "y": 77.3
        }
      },
      {
        "at": 4.76,
        "acao": "aparecer",
        "alvo": "erro",
        "dur": 0.8
      },
      {
        "at": 7.01,
        "acao": "destacar",
        "alvo": "palha-braco",
        "dur": 1.2
      }
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "import sympy as sp\nx = sp.symbols('x')\nprint(sp.series(sp.sin(x), x, 0, 8))",
      "at": 5.06,
      "dur": 5
    }
  }
};
