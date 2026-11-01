/* Roteiro do mini-video "Gradientes e curvas de nivel" (metafora: pessoa numa encosta com nevoa). Tempos em segundos desde o inicio de cada peca.
   Numeros calculados por script: f(x, y) = x² + 4y², p0 = (3, 1), f = 13, gradiente (6, 8), |gradiente| = 10, taxa 0,1;
   p1 = (2,4; 0,2) com f = 5,92; p2 f = 3,69; p8 f = 0,25. */
window.Explainers = window.Explainers || {};
Explainers.gradiente = {
  "meta": {"id":"gradiente","categoria":"CÁLCULO","area":"calculo","titulo":"Gradientes e curvas de nível","duracao":78,"cena":"gradiente"},
  "pieces": [
    {
      "id": "nevoa",
      "ordem": 1,
      "narration": "Você está numa encosta coberta de névoa. Só sente a inclinação sob os pés. Para onde descer?",
      "words": [
        {
          "t": "Você",
          "s": 0.2,
          "e": 0.54,
          "hl": false
        },
        {
          "t": "está",
          "s": 0.58,
          "e": 0.92,
          "hl": false
        },
        {
          "t": "numa",
          "s": 0.96,
          "e": 1.3,
          "hl": false
        },
        {
          "t": "encosta",
          "s": 1.34,
          "e": 1.74,
          "hl": false
        },
        {
          "t": "coberta",
          "s": 1.78,
          "e": 2.18,
          "hl": false
        },
        {
          "t": "de",
          "s": 2.22,
          "e": 2.5,
          "hl": false
        },
        {
          "t": "névoa.",
          "s": 2.54,
          "e": 2.88,
          "hl": true
        },
        {
          "t": "Só",
          "s": 3.32,
          "e": 3.6,
          "hl": false
        },
        {
          "t": "sente",
          "s": 3.64,
          "e": 3.98,
          "hl": false
        },
        {
          "t": "a",
          "s": 4.02,
          "e": 4.3,
          "hl": false
        },
        {
          "t": "inclinação",
          "s": 4.34,
          "e": 4.8,
          "hl": true
        },
        {
          "t": "sob",
          "s": 4.84,
          "e": 5.12,
          "hl": false
        },
        {
          "t": "os",
          "s": 5.16,
          "e": 5.44,
          "hl": false
        },
        {
          "t": "pés.",
          "s": 5.48,
          "e": 5.76,
          "hl": false
        },
        {
          "t": "Para",
          "s": 6.2,
          "e": 6.54,
          "hl": false
        },
        {
          "t": "onde",
          "s": 6.58,
          "e": 6.92,
          "hl": false
        },
        {
          "t": "descer?",
          "s": 6.96,
          "e": 7.3,
          "hl": true
        }
      ],
      "dur": 8.5,
      "terminal": {
        "cmd": "f(x, y) = x² + 4y²   # altura do terreno",
        "at": 3.32,
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
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "pessoa",
          "dur": 0.7
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "ponto-p0",
          "dur": 0.5
        },
        {
          "at": 2.54,
          "acao": "aparecer",
          "alvo": "nevoa",
          "dur": 1.2
        },
        {
          "at": 4.34,
          "acao": "aparecer",
          "alvo": "sente",
          "dur": 0.7
        },
        {
          "at": 6.2,
          "acao": "aparecer",
          "alvo": "pergunta",
          "dur": 0.7
        },
        {
          "at": 6.96,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        }
      ],
      "why": "Sem ver o mapa inteiro, só a inclinação local orienta o próximo passo."
    },
    {
      "id": "curvas",
      "ordem": 2,
      "narration": "De cima, ligue os pontos de mesma altura e surgem as curvas de nível. Juntas, mostram terreno íngreme.",
      "words": [
        {
          "t": "De",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "cima,",
          "s": 0.52,
          "e": 0.86,
          "hl": false
        },
        {
          "t": "ligue",
          "s": 1.1,
          "e": 1.44,
          "hl": false
        },
        {
          "t": "os",
          "s": 1.48,
          "e": 1.76,
          "hl": false
        },
        {
          "t": "pontos",
          "s": 1.8,
          "e": 2.14,
          "hl": false
        },
        {
          "t": "de",
          "s": 2.18,
          "e": 2.46,
          "hl": false
        },
        {
          "t": "mesma",
          "s": 2.5,
          "e": 2.84,
          "hl": false
        },
        {
          "t": "altura",
          "s": 2.88,
          "e": 3.28,
          "hl": true
        },
        {
          "t": "e",
          "s": 3.32,
          "e": 3.6,
          "hl": false
        },
        {
          "t": "surgem",
          "s": 3.64,
          "e": 3.98,
          "hl": false
        },
        {
          "t": "as",
          "s": 4.02,
          "e": 4.3,
          "hl": false
        },
        {
          "t": "curvas",
          "s": 4.34,
          "e": 4.68,
          "hl": true
        },
        {
          "t": "de",
          "s": 4.72,
          "e": 5,
          "hl": false
        },
        {
          "t": "nível.",
          "s": 5.04,
          "e": 5.38,
          "hl": false
        },
        {
          "t": "Juntas,",
          "s": 5.82,
          "e": 6.16,
          "hl": true
        },
        {
          "t": "mostram",
          "s": 6.4,
          "e": 6.74,
          "hl": false
        },
        {
          "t": "terreno",
          "s": 6.78,
          "e": 7.18,
          "hl": false
        },
        {
          "t": "íngreme.",
          "s": 7.22,
          "e": 7.62,
          "hl": true
        }
      ],
      "dur": 8.82,
      "terminal": {
        "cmd": "curva de nível:  f(x, y) = c   # mesma altura",
        "at": 1.8,
        "dur": 2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "nevoa",
          "dur": 0.9
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "sente",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "pergunta",
          "dur": 0.5
        },
        {
          "at": 2.18,
          "acao": "desenhar",
          "alvo": "c4",
          "dur": 0.6
        },
        {
          "at": 2.88,
          "acao": "aparecer",
          "alvo": "vale-fundo",
          "dur": 0.8
        },
        {
          "at": 3.64,
          "acao": "desenhar",
          "alvo": "c16",
          "dur": 0.6
        },
        {
          "at": 4.34,
          "acao": "desenhar",
          "alvo": "c9",
          "dur": 0.6
        },
        {
          "at": 5.04,
          "acao": "desenhar",
          "alvo": "c1",
          "dur": 0.6
        },
        {
          "at": 5.54,
          "acao": "aparecer",
          "alvo": "rotulos-nivel",
          "dur": 0.6
        },
        {
          "at": 5.82,
          "acao": "aparecer",
          "alvo": "rot-ingreme",
          "dur": 0.6
        },
        {
          "at": 7.22,
          "acao": "destacar",
          "alvo": "rot-ingreme",
          "dur": 0.9
        }
      ],
      "why": "As curvas de nível resumem o relevo inteiro em um desenho plano."
    },
    {
      "id": "gradiente",
      "ordem": 3,
      "narration": "Em cada eixo há uma inclinação, seis em x e oito em y. Juntas formam o gradiente, a seta da subida.",
      "words": [
        {
          "t": "Em",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "cada",
          "s": 0.52,
          "e": 0.86,
          "hl": false
        },
        {
          "t": "eixo",
          "s": 0.9,
          "e": 1.24,
          "hl": false
        },
        {
          "t": "há",
          "s": 1.28,
          "e": 1.56,
          "hl": false
        },
        {
          "t": "uma",
          "s": 1.6,
          "e": 1.94,
          "hl": false
        },
        {
          "t": "inclinação,",
          "s": 1.98,
          "e": 2.44,
          "hl": false
        },
        {
          "t": "seis",
          "s": 2.68,
          "e": 2.96,
          "hl": true
        },
        {
          "t": "em",
          "s": 3,
          "e": 3.28,
          "hl": false
        },
        {
          "t": "x",
          "s": 3.32,
          "e": 3.6,
          "hl": false
        },
        {
          "t": "e",
          "s": 3.64,
          "e": 3.92,
          "hl": false
        },
        {
          "t": "oito",
          "s": 3.96,
          "e": 4.3,
          "hl": true
        },
        {
          "t": "em",
          "s": 4.34,
          "e": 4.62,
          "hl": false
        },
        {
          "t": "y.",
          "s": 4.66,
          "e": 4.94,
          "hl": false
        },
        {
          "t": "Juntas",
          "s": 5.38,
          "e": 5.72,
          "hl": false
        },
        {
          "t": "formam",
          "s": 5.76,
          "e": 6.1,
          "hl": false
        },
        {
          "t": "o",
          "s": 6.14,
          "e": 6.42,
          "hl": false
        },
        {
          "t": "gradiente,",
          "s": 6.46,
          "e": 6.86,
          "hl": true
        },
        {
          "t": "a",
          "s": 7.1,
          "e": 7.38,
          "hl": false
        },
        {
          "t": "seta",
          "s": 7.42,
          "e": 7.76,
          "hl": false
        },
        {
          "t": "da",
          "s": 7.8,
          "e": 8.08,
          "hl": false
        },
        {
          "t": "subida.",
          "s": 8.12,
          "e": 8.52,
          "hl": true
        }
      ],
      "dur": 9.72,
      "terminal": {
        "cmd": "∇f(3, 1) = (2·3, 8·1) = (6, 8)",
        "at": 0.2,
        "dur": 2
      },
      "status": {
        "tipo": "alerta",
        "texto": "SUBIDA MAIS FORTE: |∇f| = 10",
        "at": 8.12
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-ingreme",
          "dur": 0.5
        },
        {
          "at": 2.68,
          "acao": "aparecer",
          "alvo": "comp-x",
          "dur": 0.7
        },
        {
          "at": 3.96,
          "acao": "aparecer",
          "alvo": "comp-y",
          "dur": 0.7
        },
        {
          "at": 6.46,
          "acao": "desenhar",
          "alvo": "seta-grad",
          "dur": 0.8
        },
        {
          "at": 7.42,
          "acao": "destacar",
          "alvo": "seta-grad",
          "dur": 0.9
        },
        {
          "at": 8.12,
          "acao": "aparecer",
          "alvo": "rot-grad",
          "dur": 0.6
        }
      ],
      "why": "O gradiente guarda a inclinação de cada eixo em um único vetor."
    },
    {
      "id": "perpendicular",
      "ordem": 4,
      "narration": "Andando ao longo da curva de nível, a altura fica igual. O gradiente cruza essa curva em ângulo reto.",
      "words": [
        {
          "t": "Andando",
          "s": 0.2,
          "e": 0.6,
          "hl": false
        },
        {
          "t": "ao",
          "s": 0.64,
          "e": 0.92,
          "hl": false
        },
        {
          "t": "longo",
          "s": 0.96,
          "e": 1.3,
          "hl": false
        },
        {
          "t": "da",
          "s": 1.34,
          "e": 1.62,
          "hl": false
        },
        {
          "t": "curva",
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
          "t": "nível,",
          "s": 2.36,
          "e": 2.7,
          "hl": false
        },
        {
          "t": "a",
          "s": 2.94,
          "e": 3.22,
          "hl": false
        },
        {
          "t": "altura",
          "s": 3.26,
          "e": 3.66,
          "hl": true
        },
        {
          "t": "fica",
          "s": 3.7,
          "e": 4.04,
          "hl": false
        },
        {
          "t": "igual.",
          "s": 4.08,
          "e": 4.42,
          "hl": false
        },
        {
          "t": "O",
          "s": 4.86,
          "e": 5.14,
          "hl": false
        },
        {
          "t": "gradiente",
          "s": 5.18,
          "e": 5.58,
          "hl": true
        },
        {
          "t": "cruza",
          "s": 5.62,
          "e": 5.96,
          "hl": false
        },
        {
          "t": "essa",
          "s": 6,
          "e": 6.34,
          "hl": false
        },
        {
          "t": "curva",
          "s": 6.38,
          "e": 6.72,
          "hl": false
        },
        {
          "t": "em",
          "s": 6.76,
          "e": 7.04,
          "hl": false
        },
        {
          "t": "ângulo",
          "s": 7.08,
          "e": 7.48,
          "hl": true
        },
        {
          "t": "reto.",
          "s": 7.52,
          "e": 7.86,
          "hl": true
        }
      ],
      "dur": 9.06,
      "terminal": {
        "cmd": "∇f · t = 6·8 + 8·(−6) = 0   # t anda sobre a curva",
        "at": 0.2,
        "dur": 2.4
      },
      "status": {
        "tipo": "ok",
        "texto": "ÂNGULO RETO COM A CURVA",
        "at": 7.08
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "comp-x",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "comp-y",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-grad",
          "dur": 0.5
        },
        {
          "at": 0.96,
          "acao": "aparecer",
          "alvo": "tangente",
          "dur": 0.6
        },
        {
          "at": 1.66,
          "acao": "desenhar",
          "alvo": "c13",
          "dur": 0.9
        },
        {
          "at": 5.18,
          "acao": "destacar",
          "alvo": "seta-grad",
          "dur": 0.9
        },
        {
          "at": 7.08,
          "acao": "aparecer",
          "alvo": "angulo-reto",
          "dur": 0.5
        },
        {
          "at": 7.52,
          "acao": "destacar",
          "alvo": "angulo-reto",
          "dur": 0.8
        }
      ],
      "why": "Por isso o gradiente é o caminho mais curto entre uma curva de nível e a outra."
    },
    {
      "id": "descida",
      "ordem": 5,
      "narration": "Para descer, vá no sentido oposto. O menos gradiente é a direção da descida mais rápida.",
      "words": [
        {
          "t": "Para",
          "s": 0.2,
          "e": 0.54,
          "hl": false
        },
        {
          "t": "descer,",
          "s": 0.58,
          "e": 0.92,
          "hl": false
        },
        {
          "t": "vá",
          "s": 1.16,
          "e": 1.44,
          "hl": false
        },
        {
          "t": "no",
          "s": 1.48,
          "e": 1.76,
          "hl": false
        },
        {
          "t": "sentido",
          "s": 1.8,
          "e": 2.2,
          "hl": false
        },
        {
          "t": "oposto.",
          "s": 2.24,
          "e": 2.64,
          "hl": true
        },
        {
          "t": "O",
          "s": 3.08,
          "e": 3.36,
          "hl": false
        },
        {
          "t": "menos",
          "s": 3.4,
          "e": 3.74,
          "hl": true
        },
        {
          "t": "gradiente",
          "s": 3.78,
          "e": 4.18,
          "hl": false
        },
        {
          "t": "é",
          "s": 4.22,
          "e": 4.5,
          "hl": false
        },
        {
          "t": "a",
          "s": 4.54,
          "e": 4.82,
          "hl": false
        },
        {
          "t": "direção",
          "s": 4.86,
          "e": 5.26,
          "hl": false
        },
        {
          "t": "da",
          "s": 5.3,
          "e": 5.58,
          "hl": false
        },
        {
          "t": "descida",
          "s": 5.62,
          "e": 6.02,
          "hl": true
        },
        {
          "t": "mais",
          "s": 6.06,
          "e": 6.34,
          "hl": false
        },
        {
          "t": "rápida.",
          "s": 6.38,
          "e": 6.78,
          "hl": true
        }
      ],
      "dur": 7.98,
      "terminal": {
        "cmd": "−∇f(3, 1) = (−6, −8)   # sentido da descida",
        "at": 0.2,
        "dur": 2
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
          "alvo": "angulo-reto",
          "dur": 0.5
        },
        {
          "at": 2.24,
          "acao": "desenhar",
          "alvo": "seta-descida",
          "dur": 0.8
        },
        {
          "at": 3.4,
          "acao": "aparecer",
          "alvo": "rot-descida",
          "dur": 0.6
        },
        {
          "at": 5.62,
          "acao": "destacar",
          "alvo": "seta-descida",
          "dur": 0.9
        }
      ],
      "why": "Subir e descer usam o mesmo vetor, só com o sinal trocado.",
      "example": {
        "at": 4.6,
        "titulo": "No dia a dia",
        "texto": "A água da chuva escorre pela linha de maior descida, cruzando as curvas de nível em ângulo reto. É o caminho da erosão."
      }
    },
    {
      "id": "passo",
      "ordem": 6,
      "narration": "Dê um passo curto. A taxa de aprendizado diz quanto do gradiente você anda. Aqui, um décimo.",
      "words": [
        {
          "t": "Dê",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "um",
          "s": 0.52,
          "e": 0.8,
          "hl": false
        },
        {
          "t": "passo",
          "s": 0.84,
          "e": 1.18,
          "hl": true
        },
        {
          "t": "curto.",
          "s": 1.22,
          "e": 1.56,
          "hl": false
        },
        {
          "t": "A",
          "s": 2,
          "e": 2.28,
          "hl": false
        },
        {
          "t": "taxa",
          "s": 2.32,
          "e": 2.66,
          "hl": true
        },
        {
          "t": "de",
          "s": 2.7,
          "e": 2.98,
          "hl": false
        },
        {
          "t": "aprendizado",
          "s": 3.02,
          "e": 3.54,
          "hl": true
        },
        {
          "t": "diz",
          "s": 3.58,
          "e": 3.86,
          "hl": false
        },
        {
          "t": "quanto",
          "s": 3.9,
          "e": 4.24,
          "hl": false
        },
        {
          "t": "do",
          "s": 4.28,
          "e": 4.56,
          "hl": false
        },
        {
          "t": "gradiente",
          "s": 4.6,
          "e": 5,
          "hl": false
        },
        {
          "t": "você",
          "s": 5.04,
          "e": 5.38,
          "hl": false
        },
        {
          "t": "anda.",
          "s": 5.42,
          "e": 5.76,
          "hl": false
        },
        {
          "t": "Aqui,",
          "s": 6.2,
          "e": 6.54,
          "hl": false
        },
        {
          "t": "um",
          "s": 6.78,
          "e": 7.06,
          "hl": false
        },
        {
          "t": "décimo.",
          "s": 7.1,
          "e": 7.5,
          "hl": true
        }
      ],
      "dur": 8.7,
      "terminal": {
        "cmd": "p₁ = (3, 1) − 0,1·(6, 8) = (2,4; 0,2)",
        "at": 0.2,
        "dur": 2
      },
      "status": {
        "tipo": "ok",
        "texto": "ALTURA CAIU: 13 PARA 5,92",
        "at": 6.2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "seta-grad",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "c13",
          "dur": 0.5
        },
        {
          "at": 0.84,
          "acao": "mover",
          "alvo": "pessoa",
          "dur": 1.4,
          "para": {
            "x": -26.4,
            "y": 35.2
          }
        },
        {
          "at": 0.84,
          "acao": "desenhar",
          "alvo": "seg1",
          "dur": 1.4
        },
        {
          "at": 5.42,
          "acao": "aparecer",
          "alvo": "rot-p1",
          "dur": 0.6
        },
        {
          "at": 6.2,
          "acao": "sumir",
          "alvo": "seta-descida",
          "dur": 0.5
        },
        {
          "at": 6.2,
          "acao": "sumir",
          "alvo": "rot-descida",
          "dur": 0.5
        },
        {
          "at": 7.1,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        }
      ],
      "why": "Passo curto demais demora, passo longo demais passa do vale."
    },
    {
      "id": "repetir",
      "ordem": 7,
      "narration": "Repita o passo, de novo e de novo. A altura cai a cada passo, rápido na ladeira e devagar no fundo.",
      "words": [
        {
          "t": "Repita",
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
          "t": "passo,",
          "s": 0.96,
          "e": 1.3,
          "hl": false
        },
        {
          "t": "de",
          "s": 1.54,
          "e": 1.82,
          "hl": false
        },
        {
          "t": "novo",
          "s": 1.86,
          "e": 2.2,
          "hl": false
        },
        {
          "t": "e",
          "s": 2.24,
          "e": 2.52,
          "hl": false
        },
        {
          "t": "de",
          "s": 2.56,
          "e": 2.84,
          "hl": false
        },
        {
          "t": "novo.",
          "s": 2.88,
          "e": 3.22,
          "hl": false
        },
        {
          "t": "A",
          "s": 3.66,
          "e": 3.94,
          "hl": false
        },
        {
          "t": "altura",
          "s": 3.98,
          "e": 4.38,
          "hl": true
        },
        {
          "t": "cai",
          "s": 4.42,
          "e": 4.7,
          "hl": false
        },
        {
          "t": "a",
          "s": 4.74,
          "e": 5.02,
          "hl": false
        },
        {
          "t": "cada",
          "s": 5.06,
          "e": 5.4,
          "hl": false
        },
        {
          "t": "passo,",
          "s": 5.44,
          "e": 5.78,
          "hl": false
        },
        {
          "t": "rápido",
          "s": 6.02,
          "e": 6.42,
          "hl": true
        },
        {
          "t": "na",
          "s": 6.46,
          "e": 6.74,
          "hl": false
        },
        {
          "t": "ladeira",
          "s": 6.78,
          "e": 7.18,
          "hl": false
        },
        {
          "t": "e",
          "s": 7.22,
          "e": 7.5,
          "hl": false
        },
        {
          "t": "devagar",
          "s": 7.54,
          "e": 7.94,
          "hl": true
        },
        {
          "t": "no",
          "s": 7.98,
          "e": 8.26,
          "hl": false
        },
        {
          "t": "fundo.",
          "s": 8.3,
          "e": 8.64,
          "hl": false
        }
      ],
      "dur": 9.84,
      "terminal": {
        "cmd": "f: 13 → 5,92 → 3,69 → … → 0,25   # 8 passos",
        "at": 0.2,
        "dur": 2.4
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "mover",
          "alvo": "pessoa",
          "dur": 0.34,
          "para": {
            "x": -47.5,
            "y": 42.2
          }
        },
        {
          "at": 0.2,
          "acao": "desenhar",
          "alvo": "seg2",
          "dur": 0.34
        },
        {
          "at": 0.64,
          "acao": "mover",
          "alvo": "pessoa",
          "dur": 0.34,
          "para": {
            "x": -64.4,
            "y": 43.6
          }
        },
        {
          "at": 0.64,
          "acao": "desenhar",
          "alvo": "seg3",
          "dur": 0.34
        },
        {
          "at": 0.96,
          "acao": "mover",
          "alvo": "pessoa",
          "dur": 0.34,
          "para": {
            "x": -77.9,
            "y": 43.9
          }
        },
        {
          "at": 0.96,
          "acao": "desenhar",
          "alvo": "seg4",
          "dur": 0.34
        },
        {
          "at": 1.54,
          "acao": "mover",
          "alvo": "pessoa",
          "dur": 0.34,
          "para": {
            "x": -88.7,
            "y": 44
          }
        },
        {
          "at": 1.54,
          "acao": "desenhar",
          "alvo": "seg5",
          "dur": 0.34
        },
        {
          "at": 1.86,
          "acao": "mover",
          "alvo": "pessoa",
          "dur": 0.34,
          "para": {
            "x": -97.4,
            "y": 44
          }
        },
        {
          "at": 1.86,
          "acao": "desenhar",
          "alvo": "seg6",
          "dur": 0.34
        },
        {
          "at": 2.24,
          "acao": "mover",
          "alvo": "pessoa",
          "dur": 0.34,
          "para": {
            "x": -104.3,
            "y": 44
          }
        },
        {
          "at": 2.24,
          "acao": "desenhar",
          "alvo": "seg7",
          "dur": 0.34
        },
        {
          "at": 2.56,
          "acao": "mover",
          "alvo": "pessoa",
          "dur": 0.34,
          "para": {
            "x": -109.9,
            "y": 44
          }
        },
        {
          "at": 2.56,
          "acao": "desenhar",
          "alvo": "seg8",
          "dur": 0.34
        },
        {
          "at": 3.98,
          "acao": "aparecer",
          "alvo": "pontos",
          "dur": 0.6
        },
        {
          "at": 6.02,
          "acao": "destacar",
          "alvo": "seg2",
          "dur": 0.8
        },
        {
          "at": 7.54,
          "acao": "destacar",
          "alvo": "seg8",
          "dur": 0.8
        },
        {
          "at": 8.3,
          "acao": "aparecer",
          "alvo": "rot-vale",
          "dur": 0.6
        }
      ],
      "why": "No vale comprido, o passo anda depressa no eixo íngreme e devagar no suave."
    },
    {
      "id": "modelos",
      "ordem": 8,
      "narration": "Treinar um modelo é descer assim. A altura é o erro, e a posição são os pesos.",
      "words": [
        {
          "t": "Treinar",
          "s": 0.2,
          "e": 0.54,
          "hl": true
        },
        {
          "t": "um",
          "s": 0.58,
          "e": 0.86,
          "hl": false
        },
        {
          "t": "modelo",
          "s": 0.9,
          "e": 1.3,
          "hl": true
        },
        {
          "t": "é",
          "s": 1.34,
          "e": 1.62,
          "hl": false
        },
        {
          "t": "descer",
          "s": 1.66,
          "e": 2,
          "hl": false
        },
        {
          "t": "assim.",
          "s": 2.04,
          "e": 2.38,
          "hl": false
        },
        {
          "t": "A",
          "s": 2.82,
          "e": 3.1,
          "hl": false
        },
        {
          "t": "altura",
          "s": 3.14,
          "e": 3.54,
          "hl": false
        },
        {
          "t": "é",
          "s": 3.58,
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
          "t": "erro,",
          "s": 4.22,
          "e": 4.56,
          "hl": true
        },
        {
          "t": "e",
          "s": 4.8,
          "e": 5.08,
          "hl": false
        },
        {
          "t": "a",
          "s": 5.12,
          "e": 5.4,
          "hl": false
        },
        {
          "t": "posição",
          "s": 5.44,
          "e": 5.84,
          "hl": false
        },
        {
          "t": "são",
          "s": 5.88,
          "e": 6.16,
          "hl": false
        },
        {
          "t": "os",
          "s": 6.2,
          "e": 6.48,
          "hl": false
        },
        {
          "t": "pesos.",
          "s": 6.52,
          "e": 6.86,
          "hl": true
        }
      ],
      "dur": 8.06,
      "terminal": {
        "cmd": "pesos = pesos − η · grad(erro)",
        "at": 1.66,
        "dur": 2
      },
      "status": {
        "tipo": "ok",
        "texto": "ERRO CAINDO A CADA PASSO",
        "at": 4.22
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "mapa",
          "dur": 0.8
        },
        {
          "at": 0.2,
          "acao": "desenhar",
          "alvo": "ge-eixos",
          "dur": 0.8
        },
        {
          "at": 0.9,
          "acao": "desenhar",
          "alvo": "ge-curva",
          "dur": 1.8
        },
        {
          "at": 4.22,
          "acao": "aparecer",
          "alvo": "ge-rot",
          "dur": 0.6
        },
        {
          "at": 6.52,
          "acao": "aparecer",
          "alvo": "ge-pontos",
          "dur": 0.7
        }
      ],
      "why": "É a mesma descida, com o erro do modelo no lugar da altura.",
      "example": {
        "at": 5,
        "titulo": "No trabalho",
        "texto": "Uma rede tem milhões de pesos. O backpropagation calcula o gradiente do erro e o otimizador dá o passo contra ele."
      }
    }
  ],
  "outro": {
    "dur": 7.4,
    "narration": "Siga contra o gradiente e o erro cai até o vale. Agora mexa no laboratório.",
    "words": [
      {
        "t": "Siga",
        "s": 0.2,
        "e": 0.54,
        "hl": false
      },
      {
        "t": "contra",
        "s": 0.58,
        "e": 0.92,
        "hl": false
      },
      {
        "t": "o",
        "s": 0.96,
        "e": 1.24,
        "hl": false
      },
      {
        "t": "gradiente",
        "s": 1.28,
        "e": 1.68,
        "hl": true
      },
      {
        "t": "e",
        "s": 1.72,
        "e": 2,
        "hl": false
      },
      {
        "t": "o",
        "s": 2.04,
        "e": 2.32,
        "hl": false
      },
      {
        "t": "erro",
        "s": 2.36,
        "e": 2.7,
        "hl": false
      },
      {
        "t": "cai",
        "s": 2.74,
        "e": 3.02,
        "hl": false
      },
      {
        "t": "até",
        "s": 3.06,
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
        "t": "vale.",
        "s": 3.76,
        "e": 4.1,
        "hl": true
      },
      {
        "t": "Agora",
        "s": 4.54,
        "e": 4.94,
        "hl": false
      },
      {
        "t": "mexa",
        "s": 4.98,
        "e": 5.32,
        "hl": false
      },
      {
        "t": "no",
        "s": 5.36,
        "e": 5.64,
        "hl": false
      },
      {
        "t": "laboratório.",
        "s": 5.68,
        "e": 6.2,
        "hl": true
      }
    ],
    "scene": [
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "ge-eixos",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "ge-curva",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "ge-pontos",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "ge-rot",
        "dur": 0.5
      },
      {
        "at": 0.3,
        "acao": "aparecer",
        "alvo": "mapa",
        "dur": 0.9
      },
      {
        "at": 3.76,
        "acao": "aparecer",
        "alvo": "bandeira",
        "dur": 0.7
      },
      {
        "at": 5.68,
        "acao": "destacar",
        "alvo": "guia-braco",
        "dur": 1.2
      }
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "import numpy as np\np = np.array([3.0, 1.0])\nfor _ in range(8):\n    g = np.array([2*p[0], 8*p[1]])\n    p = p - 0.1*g\nprint(p, p[0]**2 + 4*p[1]**2)",
      "at": 1,
      "dur": 4.5
    }
  }
};
