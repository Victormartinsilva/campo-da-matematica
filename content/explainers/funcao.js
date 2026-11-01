/* Roteiro do mini-video "Funções" (metáfora: máquina de entrada e saída). Tempos em segundos desde o início de cada peça. */
window.Explainers = window.Explainers || {};
Explainers.funcao = {
  "meta": {
    "id": "funcao",
    "categoria": "CÁLCULO",
    "area": "calculo",
    "titulo": "Funções",
    "duracao": 72,
    "cena": "funcao"
  },
  "pieces": [
    {
      "id": "maquina",
      "ordem": 1,
      "narration": "Uma função é como uma máquina. Entra um número, sai outro. Cada entrada tem uma só saída.",
      "words": [
        {
          "t": "Uma",
          "s": 0.2,
          "e": 0.54,
          "hl": false
        },
        {
          "t": "função",
          "s": 0.58,
          "e": 0.92,
          "hl": true
        },
        {
          "t": "é",
          "s": 0.96,
          "e": 1.24,
          "hl": false
        },
        {
          "t": "como",
          "s": 1.28,
          "e": 1.62,
          "hl": false
        },
        {
          "t": "uma",
          "s": 1.66,
          "e": 2,
          "hl": false
        },
        {
          "t": "máquina.",
          "s": 2.04,
          "e": 2.44,
          "hl": true
        },
        {
          "t": "Entra",
          "s": 2.88,
          "e": 3.22,
          "hl": true
        },
        {
          "t": "um",
          "s": 3.26,
          "e": 3.54,
          "hl": false
        },
        {
          "t": "número,",
          "s": 3.58,
          "e": 3.98,
          "hl": false
        },
        {
          "t": "sai",
          "s": 4.22,
          "e": 4.5,
          "hl": false
        },
        {
          "t": "outro.",
          "s": 4.54,
          "e": 4.88,
          "hl": false
        },
        {
          "t": "Cada",
          "s": 5.32,
          "e": 5.66,
          "hl": false
        },
        {
          "t": "entrada",
          "s": 5.7,
          "e": 6.1,
          "hl": false
        },
        {
          "t": "tem",
          "s": 6.14,
          "e": 6.42,
          "hl": false
        },
        {
          "t": "uma",
          "s": 6.46,
          "e": 6.8,
          "hl": false
        },
        {
          "t": "só",
          "s": 6.84,
          "e": 7.12,
          "hl": false
        },
        {
          "t": "saída.",
          "s": 7.16,
          "e": 7.5,
          "hl": true
        }
      ],
      "dur": 8.7,
      "terminal": {
        "cmd": "y = f(x)   # entra x, sai y",
        "at": 2.88,
        "dur": 2
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
          "acao": "aparecer",
          "alvo": "maq",
          "dur": 0.9
        },
        {
          "at": 2.04,
          "acao": "destacar",
          "alvo": "maq",
          "dur": 0.9
        },
        {
          "at": 2.88,
          "acao": "aparecer",
          "alvo": "tok-in",
          "dur": 0.5
        },
        {
          "at": 2.88,
          "acao": "aparecer",
          "alvo": "rot-ent",
          "dur": 0.5
        },
        {
          "at": 3.58,
          "acao": "mover",
          "alvo": "tok-in",
          "dur": 0.7,
          "para": {
            "x": 0,
            "y": 44
          }
        },
        {
          "at": 4.22,
          "acao": "sumir",
          "alvo": "tok-in",
          "dur": 0.3
        },
        {
          "at": 4.22,
          "acao": "aparecer",
          "alvo": "tok-out",
          "dur": 0.6
        },
        {
          "at": 7.16,
          "acao": "aparecer",
          "alvo": "rot-saida",
          "dur": 0.6
        },
        {
          "at": 7.16,
          "acao": "destacar",
          "alvo": "tok-out",
          "dur": 0.9
        }
      ],
      "why": "Função é uma regra que dá uma saída para cada entrada."
    },
    {
      "id": "regra",
      "ordem": 2,
      "narration": "A regra diz o que a máquina faz. Aqui, ela dobra a entrada e soma um.",
      "words": [
        {
          "t": "A",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "regra",
          "s": 0.52,
          "e": 0.86,
          "hl": true
        },
        {
          "t": "diz",
          "s": 0.9,
          "e": 1.18,
          "hl": false
        },
        {
          "t": "o",
          "s": 1.22,
          "e": 1.5,
          "hl": false
        },
        {
          "t": "que",
          "s": 1.54,
          "e": 1.82,
          "hl": false
        },
        {
          "t": "a",
          "s": 1.86,
          "e": 2.14,
          "hl": false
        },
        {
          "t": "máquina",
          "s": 2.18,
          "e": 2.58,
          "hl": false
        },
        {
          "t": "faz.",
          "s": 2.62,
          "e": 2.9,
          "hl": false
        },
        {
          "t": "Aqui,",
          "s": 3.34,
          "e": 3.68,
          "hl": false
        },
        {
          "t": "ela",
          "s": 3.92,
          "e": 4.26,
          "hl": false
        },
        {
          "t": "dobra",
          "s": 4.3,
          "e": 4.64,
          "hl": true
        },
        {
          "t": "a",
          "s": 4.68,
          "e": 4.96,
          "hl": false
        },
        {
          "t": "entrada",
          "s": 5,
          "e": 5.4,
          "hl": false
        },
        {
          "t": "e",
          "s": 5.44,
          "e": 5.72,
          "hl": false
        },
        {
          "t": "soma",
          "s": 5.76,
          "e": 6.1,
          "hl": true
        },
        {
          "t": "um.",
          "s": 6.14,
          "e": 6.42,
          "hl": false
        }
      ],
      "dur": 7.62,
      "terminal": {
        "cmd": "f(x) = 2·x + 1",
        "at": 4.3,
        "dur": 1.4
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tok-out",
          "dur": 0.3
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-ent",
          "dur": 0.3
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-saida",
          "dur": 0.3
        },
        {
          "at": 0.52,
          "acao": "sumir",
          "alvo": "maq-f",
          "dur": 0.4
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "maq-regra",
          "dur": 0.6
        },
        {
          "at": 2.18,
          "acao": "destacar",
          "alvo": "maq",
          "dur": 0.8
        },
        {
          "at": 3.34,
          "acao": "aparecer",
          "alvo": "tabela",
          "dur": 0.6
        },
        {
          "at": 4.3,
          "acao": "aparecer",
          "alvo": "lin-0",
          "dur": 0.4
        },
        {
          "at": 5,
          "acao": "aparecer",
          "alvo": "lin-1",
          "dur": 0.4
        },
        {
          "at": 5.76,
          "acao": "aparecer",
          "alvo": "lin-2",
          "dur": 0.4
        },
        {
          "at": 6.14,
          "acao": "aparecer",
          "alvo": "lin-3",
          "dur": 0.4
        }
      ],
      "why": "Com a regra na mão, qualquer entrada vira uma saída previsível."
    },
    {
      "id": "pontos",
      "ordem": 3,
      "narration": "Cada par de entrada e saída vira um ponto. Juntos, os pontos desenham a curva.",
      "words": [
        {
          "t": "Cada",
          "s": 0.2,
          "e": 0.54,
          "hl": false
        },
        {
          "t": "par",
          "s": 0.58,
          "e": 0.86,
          "hl": true
        },
        {
          "t": "de",
          "s": 0.9,
          "e": 1.18,
          "hl": false
        },
        {
          "t": "entrada",
          "s": 1.22,
          "e": 1.62,
          "hl": false
        },
        {
          "t": "e",
          "s": 1.66,
          "e": 1.94,
          "hl": false
        },
        {
          "t": "saída",
          "s": 1.98,
          "e": 2.32,
          "hl": false
        },
        {
          "t": "vira",
          "s": 2.36,
          "e": 2.7,
          "hl": false
        },
        {
          "t": "um",
          "s": 2.74,
          "e": 3.02,
          "hl": false
        },
        {
          "t": "ponto.",
          "s": 3.06,
          "e": 3.4,
          "hl": true
        },
        {
          "t": "Juntos,",
          "s": 3.84,
          "e": 4.18,
          "hl": false
        },
        {
          "t": "os",
          "s": 4.42,
          "e": 4.7,
          "hl": false
        },
        {
          "t": "pontos",
          "s": 4.74,
          "e": 5.08,
          "hl": false
        },
        {
          "t": "desenham",
          "s": 5.12,
          "e": 5.52,
          "hl": true
        },
        {
          "t": "a",
          "s": 5.56,
          "e": 5.84,
          "hl": false
        },
        {
          "t": "curva.",
          "s": 5.88,
          "e": 6.22,
          "hl": true
        }
      ],
      "dur": 7.42,
      "terminal": {
        "cmd": "[(x, 2*x + 1) for x in range(4)]",
        "at": 0.58,
        "dur": 2.2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "maq",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tabela",
          "dur": 0.5
        },
        {
          "at": 0.58,
          "acao": "aparecer",
          "alvo": "graf",
          "dur": 0.8
        },
        {
          "at": 3.06,
          "acao": "aparecer",
          "alvo": "pts",
          "dur": 0.7
        },
        {
          "at": 5.12,
          "acao": "desenhar",
          "alvo": "c-reta",
          "dur": 1.4
        },
        {
          "at": 5.88,
          "acao": "destacar",
          "alvo": "c-reta",
          "dur": 0.9
        }
      ],
      "why": "O gráfico mostra a regra inteira de uma vez."
    },
    {
      "id": "familias",
      "ordem": 4,
      "narration": "Nem toda regra é uma reta. A parábola sobe e cai, e a exponencial dispara.",
      "words": [
        {
          "t": "Nem",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "toda",
          "s": 0.52,
          "e": 0.86,
          "hl": false
        },
        {
          "t": "regra",
          "s": 0.9,
          "e": 1.24,
          "hl": false
        },
        {
          "t": "é",
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
          "t": "reta.",
          "s": 1.98,
          "e": 2.32,
          "hl": true
        },
        {
          "t": "A",
          "s": 2.76,
          "e": 3.04,
          "hl": false
        },
        {
          "t": "parábola",
          "s": 3.08,
          "e": 3.54,
          "hl": true
        },
        {
          "t": "sobe",
          "s": 3.58,
          "e": 3.92,
          "hl": false
        },
        {
          "t": "e",
          "s": 3.96,
          "e": 4.24,
          "hl": false
        },
        {
          "t": "cai,",
          "s": 4.28,
          "e": 4.56,
          "hl": false
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
          "t": "exponencial",
          "s": 5.44,
          "e": 5.9,
          "hl": true
        },
        {
          "t": "dispara.",
          "s": 5.94,
          "e": 6.34,
          "hl": true
        }
      ],
      "dur": 7.54,
      "terminal": {
        "cmd": "2x + 1   |   9 − (x − 3)²   |   2^(x/2)",
        "at": 1.98,
        "dur": 2.4
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "graf",
          "dur": 0.5
        },
        {
          "at": 1.98,
          "acao": "aparecer",
          "alvo": "mini-reta",
          "dur": 0.6
        },
        {
          "at": 1.98,
          "acao": "desenhar",
          "alvo": "mc-reta",
          "dur": 1
        },
        {
          "at": 3.08,
          "acao": "aparecer",
          "alvo": "mini-parab",
          "dur": 0.6
        },
        {
          "at": 3.08,
          "acao": "desenhar",
          "alvo": "mc-parab",
          "dur": 1.2
        },
        {
          "at": 5.44,
          "acao": "aparecer",
          "alvo": "mini-exp",
          "dur": 0.6
        },
        {
          "at": 5.44,
          "acao": "desenhar",
          "alvo": "mc-exp",
          "dur": 1
        },
        {
          "at": 5.94,
          "acao": "destacar",
          "alvo": "mc-exp",
          "dur": 1
        }
      ],
      "why": "Cada família de funções conta uma história diferente sobre o processo."
    },
    {
      "id": "dominio",
      "ordem": 5,
      "narration": "O domínio é onde a regra vale. Além dele, a curva é só um palpite.",
      "words": [
        {
          "t": "O",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "domínio",
          "s": 0.52,
          "e": 0.92,
          "hl": true
        },
        {
          "t": "é",
          "s": 0.96,
          "e": 1.24,
          "hl": false
        },
        {
          "t": "onde",
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
          "t": "regra",
          "s": 1.98,
          "e": 2.32,
          "hl": true
        },
        {
          "t": "vale.",
          "s": 2.36,
          "e": 2.7,
          "hl": false
        },
        {
          "t": "Além",
          "s": 3.14,
          "e": 3.48,
          "hl": false
        },
        {
          "t": "dele,",
          "s": 3.52,
          "e": 3.86,
          "hl": false
        },
        {
          "t": "a",
          "s": 4.1,
          "e": 4.38,
          "hl": false
        },
        {
          "t": "curva",
          "s": 4.42,
          "e": 4.76,
          "hl": false
        },
        {
          "t": "é",
          "s": 4.8,
          "e": 5.08,
          "hl": false
        },
        {
          "t": "só",
          "s": 5.12,
          "e": 5.4,
          "hl": false
        },
        {
          "t": "um",
          "s": 5.44,
          "e": 5.72,
          "hl": false
        },
        {
          "t": "palpite.",
          "s": 5.76,
          "e": 6.16,
          "hl": true
        }
      ],
      "dur": 7.36,
      "terminal": {
        "cmd": "x ∈ [0, 3]   # f(5) = 11 já é palpite",
        "at": 0.52,
        "dur": 2.4
      },
      "status": {
        "tipo": "alerta",
        "texto": "FORA DO DOMÍNIO: SÓ UM PALPITE",
        "at": 5.76
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "mini-reta",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "mini-parab",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "mini-exp",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "graf",
          "dur": 0.6
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "dominio",
          "dur": 0.7
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "rot-dom",
          "dur": 0.5
        },
        {
          "at": 1.98,
          "acao": "destacar",
          "alvo": "c-reta",
          "dur": 0.9
        },
        {
          "at": 3.14,
          "acao": "aparecer",
          "alvo": "palpite",
          "dur": 0.9
        },
        {
          "at": 5.76,
          "acao": "aparecer",
          "alvo": "rot-palpite",
          "dur": 0.6
        },
        {
          "at": 5.76,
          "acao": "destacar",
          "alvo": "palpite",
          "dur": 1
        }
      ],
      "why": "Fora da faixa medida, a curva não garante o resultado."
    },
    {
      "id": "composicao",
      "ordem": 6,
      "narration": "Ligue duas máquinas em fila. A saída da primeira vira a entrada da segunda. Isso é composição.",
      "words": [
        {
          "t": "Ligue",
          "s": 0.2,
          "e": 0.54,
          "hl": false
        },
        {
          "t": "duas",
          "s": 0.58,
          "e": 0.86,
          "hl": false
        },
        {
          "t": "máquinas",
          "s": 0.9,
          "e": 1.3,
          "hl": true
        },
        {
          "t": "em",
          "s": 1.34,
          "e": 1.62,
          "hl": false
        },
        {
          "t": "fila.",
          "s": 1.66,
          "e": 2,
          "hl": false
        },
        {
          "t": "A",
          "s": 2.44,
          "e": 2.72,
          "hl": false
        },
        {
          "t": "saída",
          "s": 2.76,
          "e": 3.1,
          "hl": true
        },
        {
          "t": "da",
          "s": 3.14,
          "e": 3.42,
          "hl": false
        },
        {
          "t": "primeira",
          "s": 3.46,
          "e": 3.86,
          "hl": false
        },
        {
          "t": "vira",
          "s": 3.9,
          "e": 4.24,
          "hl": false
        },
        {
          "t": "a",
          "s": 4.28,
          "e": 4.56,
          "hl": false
        },
        {
          "t": "entrada",
          "s": 4.6,
          "e": 5,
          "hl": true
        },
        {
          "t": "da",
          "s": 5.04,
          "e": 5.32,
          "hl": false
        },
        {
          "t": "segunda.",
          "s": 5.36,
          "e": 5.76,
          "hl": false
        },
        {
          "t": "Isso",
          "s": 6.2,
          "e": 6.54,
          "hl": false
        },
        {
          "t": "é",
          "s": 6.58,
          "e": 6.86,
          "hl": false
        },
        {
          "t": "composição.",
          "s": 6.9,
          "e": 7.36,
          "hl": true
        }
      ],
      "dur": 8.56,
      "terminal": {
        "cmd": "g(f(3)) = g(7) = 49",
        "at": 1.66,
        "dur": 1.6
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "graf",
          "dur": 0.5
        },
        {
          "at": 0.58,
          "acao": "aparecer",
          "alvo": "cad-f",
          "dur": 0.6
        },
        {
          "at": 0.9,
          "acao": "aparecer",
          "alvo": "cad-g",
          "dur": 0.6
        },
        {
          "at": 1.66,
          "acao": "aparecer",
          "alvo": "val-3",
          "dur": 0.6
        },
        {
          "at": 2.76,
          "acao": "aparecer",
          "alvo": "val-7",
          "dur": 0.7
        },
        {
          "at": 4.6,
          "acao": "destacar",
          "alvo": "val-7",
          "dur": 0.9
        },
        {
          "at": 5.36,
          "acao": "aparecer",
          "alvo": "val-49",
          "dur": 0.7
        },
        {
          "at": 6.9,
          "acao": "aparecer",
          "alvo": "rot-comp",
          "dur": 0.7
        }
      ],
      "why": "Compor funções é encadear etapas, como num pipeline de dados."
    },
    {
      "id": "frete",
      "ordem": 7,
      "narration": "No dia a dia, o frete é uma função da distância. São 50 reais fixos mais 2 por quilômetro.",
      "words": [
        {
          "t": "No",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "dia",
          "s": 0.52,
          "e": 0.8,
          "hl": false
        },
        {
          "t": "a",
          "s": 0.84,
          "e": 1.12,
          "hl": false
        },
        {
          "t": "dia,",
          "s": 1.16,
          "e": 1.44,
          "hl": false
        },
        {
          "t": "o",
          "s": 1.68,
          "e": 1.96,
          "hl": false
        },
        {
          "t": "frete",
          "s": 2,
          "e": 2.34,
          "hl": true
        },
        {
          "t": "é",
          "s": 2.38,
          "e": 2.66,
          "hl": false
        },
        {
          "t": "uma",
          "s": 2.7,
          "e": 3.04,
          "hl": false
        },
        {
          "t": "função",
          "s": 3.08,
          "e": 3.42,
          "hl": false
        },
        {
          "t": "da",
          "s": 3.46,
          "e": 3.74,
          "hl": false
        },
        {
          "t": "distância.",
          "s": 3.78,
          "e": 4.18,
          "hl": true
        },
        {
          "t": "São",
          "s": 4.62,
          "e": 4.9,
          "hl": false
        },
        {
          "t": "50",
          "s": 4.94,
          "e": 5.22,
          "hl": false
        },
        {
          "t": "reais",
          "s": 5.26,
          "e": 5.54,
          "hl": false
        },
        {
          "t": "fixos",
          "s": 5.58,
          "e": 5.92,
          "hl": true
        },
        {
          "t": "mais",
          "s": 5.96,
          "e": 6.24,
          "hl": false
        },
        {
          "t": "2",
          "s": 6.28,
          "e": 6.56,
          "hl": false
        },
        {
          "t": "por",
          "s": 6.6,
          "e": 6.88,
          "hl": false
        },
        {
          "t": "quilômetro.",
          "s": 6.92,
          "e": 7.38,
          "hl": true
        }
      ],
      "dur": 8.58,
      "terminal": {
        "cmd": "C(d) = 50 + 2·d   # C(120) = 290",
        "at": 2,
        "dur": 2.2
      },
      "status": {
        "tipo": "ok",
        "texto": "R$ 150 PAGAM 50 KM",
        "at": 6.92
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "cad-f",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "cad-g",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "val-3",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "val-7",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "val-49",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rot-comp",
          "dur": 0.5
        },
        {
          "at": 2,
          "acao": "aparecer",
          "alvo": "frete",
          "dur": 0.6
        },
        {
          "at": 3.78,
          "acao": "destacar",
          "alvo": "estrada",
          "dur": 0.9
        },
        {
          "at": 4.94,
          "acao": "aparecer",
          "alvo": "rot-fixo",
          "dur": 0.5
        },
        {
          "at": 5.96,
          "acao": "mover",
          "alvo": "caminhao",
          "dur": 2,
          "para": {
            "x": 288,
            "y": 0
          }
        },
        {
          "at": 6.28,
          "acao": "aparecer",
          "alvo": "rot-km",
          "dur": 0.5
        },
        {
          "at": 6.92,
          "acao": "aparecer",
          "alvo": "rot-150",
          "dur": 0.5
        },
        {
          "at": 6.92,
          "acao": "aparecer",
          "alvo": "rot-290",
          "dur": 0.5
        }
      ],
      "why": "Quando a regra é uma reta, o custo cresce em ritmo constante."
    },
    {
      "id": "modelo",
      "ordem": 8,
      "narration": "No trabalho, um modelo de IA é uma função ajustada aos dados. Treinar é achar a regra.",
      "words": [
        {
          "t": "No",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "trabalho,",
          "s": 0.52,
          "e": 0.92,
          "hl": false
        },
        {
          "t": "um",
          "s": 1.16,
          "e": 1.44,
          "hl": false
        },
        {
          "t": "modelo",
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
          "t": "IA",
          "s": 2.24,
          "e": 2.52,
          "hl": false
        },
        {
          "t": "é",
          "s": 2.56,
          "e": 2.84,
          "hl": false
        },
        {
          "t": "uma",
          "s": 2.88,
          "e": 3.22,
          "hl": false
        },
        {
          "t": "função",
          "s": 3.26,
          "e": 3.6,
          "hl": true
        },
        {
          "t": "ajustada",
          "s": 3.64,
          "e": 4.1,
          "hl": true
        },
        {
          "t": "aos",
          "s": 4.14,
          "e": 4.42,
          "hl": false
        },
        {
          "t": "dados.",
          "s": 4.46,
          "e": 4.8,
          "hl": false
        },
        {
          "t": "Treinar",
          "s": 5.24,
          "e": 5.58,
          "hl": false
        },
        {
          "t": "é",
          "s": 5.62,
          "e": 5.9,
          "hl": false
        },
        {
          "t": "achar",
          "s": 5.94,
          "e": 6.28,
          "hl": false
        },
        {
          "t": "a",
          "s": 6.32,
          "e": 6.6,
          "hl": false
        },
        {
          "t": "regra.",
          "s": 6.64,
          "e": 6.98,
          "hl": true
        }
      ],
      "dur": 8.18,
      "terminal": {
        "cmd": "a, b = np.polyfit(x, y, 1)   # a = 1,9, b = 1,4",
        "at": 3.64,
        "dur": 2.4
      },
      "status": {
        "tipo": "ok",
        "texto": "REGRA APRENDIDA DOS DADOS",
        "at": 6.64
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "frete",
          "dur": 0.5
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "modelo",
          "dur": 0.6
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "dados-m",
          "dur": 0.8
        },
        {
          "at": 1.48,
          "acao": "destacar",
          "alvo": "dados-m",
          "dur": 0.8
        },
        {
          "at": 3.64,
          "acao": "desenhar",
          "alvo": "reta-aj",
          "dur": 1.4
        },
        {
          "at": 4.46,
          "acao": "destacar",
          "alvo": "dados-m",
          "dur": 0.9
        },
        {
          "at": 6.64,
          "acao": "aparecer",
          "alvo": "rot-eq",
          "dur": 0.6
        },
        {
          "at": 6.64,
          "acao": "aparecer",
          "alvo": "pred",
          "dur": 0.6
        }
      ],
      "why": "Aprender com dados é achar a função que melhor descreve a relação."
    }
  ],
  "outro": {
    "dur": 7.6,
    "narration": "Entrada, regra e saída: é isso que uma função descreve. Agora mexa no laboratório.",
    "words": [
      {
        "t": "Entrada,",
        "s": 0.2,
        "e": 0.6,
        "hl": false
      },
      {
        "t": "regra",
        "s": 0.84,
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
        "t": "saída:",
        "s": 1.54,
        "e": 1.88,
        "hl": false
      },
      {
        "t": "é",
        "s": 2.12,
        "e": 2.4,
        "hl": false
      },
      {
        "t": "isso",
        "s": 2.44,
        "e": 2.78,
        "hl": false
      },
      {
        "t": "que",
        "s": 2.82,
        "e": 3.1,
        "hl": false
      },
      {
        "t": "uma",
        "s": 3.14,
        "e": 3.48,
        "hl": false
      },
      {
        "t": "função",
        "s": 3.52,
        "e": 3.86,
        "hl": true
      },
      {
        "t": "descreve.",
        "s": 3.9,
        "e": 4.3,
        "hl": false
      },
      {
        "t": "Agora",
        "s": 4.74,
        "e": 5.14,
        "hl": false
      },
      {
        "t": "mexa",
        "s": 5.18,
        "e": 5.52,
        "hl": false
      },
      {
        "t": "no",
        "s": 5.56,
        "e": 5.84,
        "hl": false
      },
      {
        "t": "laboratório.",
        "s": 5.88,
        "e": 6.4,
        "hl": true
      }
    ],
    "scene": [
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "modelo",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "aparecer",
        "alvo": "maq",
        "dur": 0.8
      },
      {
        "at": 0.84,
        "acao": "destacar",
        "alvo": "maq-regra",
        "dur": 0.9
      },
      {
        "at": 3.52,
        "acao": "destacar",
        "alvo": "maq",
        "dur": 0.9
      },
      {
        "at": 5.88,
        "acao": "destacar",
        "alvo": "guia-braco",
        "dur": 1.2
      }
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "def produtividade(x):                       # x é a dose de N em kg por hectare\n    return 80 + 0.30*x - 0.0009*x**2        # regra: sobe no começo e curva para baixo depois\n\nfor dose in (0, 100, 200, 300):             # testa quatro entradas\n    print(dose, produtividade(dose))        # mostra entrada e saída lado a lado",
      "at": 1,
      "dur": 4.5
    }
  }
};
