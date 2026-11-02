/* Roteiro do mini-video "Como o computador pensa" (metafora: receita com passos numerados, caixa com etiqueta, bifurcacao e esteira de fabrica). Tempos em segundos desde o inicio de cada peca. */
window.Explainers = window.Explainers || {};
Explainers["codigo"] = {
  "meta": {
    "id": "codigo",
    "categoria": "PROGRAMAÇÃO E DADOS",
    "area": "prog",
    "titulo": "Como o computador pensa",
    "duracao": 71,
    "cena": "codigo"
  },
  "pieces": [
    {
      "id": "pergunta",
      "ordem": 1,
      "narration": "Se o computador só segue ordens, como ele consegue decidir alguma coisa?",
      "words": [
        {
          "t": "Se",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "o",
          "s": 0.52,
          "e": 0.8,
          "hl": false
        },
        {
          "t": "computador",
          "s": 0.84,
          "e": 1.3,
          "hl": true
        },
        {
          "t": "só",
          "s": 1.34,
          "e": 1.62,
          "hl": false
        },
        {
          "t": "segue",
          "s": 1.66,
          "e": 2,
          "hl": false
        },
        {
          "t": "ordens,",
          "s": 2.04,
          "e": 2.38,
          "hl": true
        },
        {
          "t": "como",
          "s": 2.62,
          "e": 2.96,
          "hl": false
        },
        {
          "t": "ele",
          "s": 3,
          "e": 3.34,
          "hl": false
        },
        {
          "t": "consegue",
          "s": 3.38,
          "e": 3.78,
          "hl": false
        },
        {
          "t": "decidir",
          "s": 3.82,
          "e": 4.22,
          "hl": true
        },
        {
          "t": "alguma",
          "s": 4.26,
          "e": 4.66,
          "hl": false
        },
        {
          "t": "coisa?",
          "s": 4.7,
          "e": 5.04,
          "hl": false
        }
      ],
      "dur": 6.24,
      "scene": [
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "guia",
          "dur": 0.7
        },
        {
          "at": 0.84,
          "acao": "aparecer",
          "alvo": "pc",
          "dur": 0.8
        },
        {
          "at": 3.82,
          "acao": "aparecer",
          "alvo": "duvida",
          "dur": 0.7
        },
        {
          "at": 4.7,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        }
      ],
      "why": "Tudo o que parece inteligência em um computador vem de poucas peças simples."
    },
    {
      "id": "receita",
      "ordem": 2,
      "narration": "Um programa é como uma receita: passos numerados, lidos de cima para baixo, um de cada vez.",
      "words": [
        {
          "t": "Um",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "programa",
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
          "t": "receita:",
          "s": 2.04,
          "e": 2.44,
          "hl": true
        },
        {
          "t": "passos",
          "s": 2.68,
          "e": 3.02,
          "hl": true
        },
        {
          "t": "numerados,",
          "s": 3.06,
          "e": 3.52,
          "hl": false
        },
        {
          "t": "lidos",
          "s": 3.76,
          "e": 4.1,
          "hl": false
        },
        {
          "t": "de",
          "s": 4.14,
          "e": 4.42,
          "hl": false
        },
        {
          "t": "cima",
          "s": 4.46,
          "e": 4.8,
          "hl": false
        },
        {
          "t": "para",
          "s": 4.84,
          "e": 5.18,
          "hl": false
        },
        {
          "t": "baixo,",
          "s": 5.22,
          "e": 5.56,
          "hl": true
        },
        {
          "t": "um",
          "s": 5.8,
          "e": 6.08,
          "hl": false
        },
        {
          "t": "de",
          "s": 6.12,
          "e": 6.4,
          "hl": false
        },
        {
          "t": "cada",
          "s": 6.44,
          "e": 6.78,
          "hl": false
        },
        {
          "t": "vez.",
          "s": 6.82,
          "e": 7.1,
          "hl": false
        }
      ],
      "dur": 8.3,
      "terminal": {
        "cmd": "receita = [\"bater\", \"assar\", \"servir\"]",
        "at": 2.68,
        "dur": 2.6
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "pc",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "duvida",
          "dur": 0.6
        },
        {
          "at": 2.04,
          "acao": "aparecer",
          "alvo": "receita",
          "dur": 0.9
        },
        {
          "at": 2.68,
          "acao": "aparecer",
          "alvo": "passos",
          "dur": 0.9
        },
        {
          "at": 3.76,
          "acao": "aparecer",
          "alvo": "cursor",
          "dur": 0.5
        },
        {
          "at": 4.46,
          "acao": "mover",
          "alvo": "cursor",
          "dur": 2.4,
          "para": {
            "x": 0,
            "y": 108
          }
        }
      ],
      "why": "O computador executa uma instrução por vez, de cima para baixo, sem adivinhar nada."
    },
    {
      "id": "variavel",
      "ordem": 3,
      "narration": "Uma variável é uma caixa com etiqueta: preco guarda o valor 120.",
      "words": [
        {
          "t": "Uma",
          "s": 0.2,
          "e": 0.54,
          "hl": false
        },
        {
          "t": "variável",
          "s": 0.58,
          "e": 0.98,
          "hl": true
        },
        {
          "t": "é",
          "s": 1.02,
          "e": 1.3,
          "hl": false
        },
        {
          "t": "uma",
          "s": 1.34,
          "e": 1.68,
          "hl": false
        },
        {
          "t": "caixa",
          "s": 1.72,
          "e": 2.06,
          "hl": false
        },
        {
          "t": "com",
          "s": 2.1,
          "e": 2.38,
          "hl": false
        },
        {
          "t": "etiqueta:",
          "s": 2.42,
          "e": 2.88,
          "hl": true
        },
        {
          "t": "preco",
          "s": 3.12,
          "e": 3.46,
          "hl": true
        },
        {
          "t": "guarda",
          "s": 3.5,
          "e": 3.84,
          "hl": false
        },
        {
          "t": "o",
          "s": 3.88,
          "e": 4.16,
          "hl": false
        },
        {
          "t": "valor",
          "s": 4.2,
          "e": 4.54,
          "hl": false
        },
        {
          "t": "120.",
          "s": 4.58,
          "e": 4.86,
          "hl": true
        }
      ],
      "dur": 6.06,
      "terminal": {
        "cmd": "preco = 120.0",
        "at": 3.12,
        "dur": 1.6
      },
      "status": {
        "tipo": "ok",
        "texto": "PRECO GUARDA 120.0",
        "at": 4.2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "receita",
          "dur": 0.6
        },
        {
          "at": 1.72,
          "acao": "aparecer",
          "alvo": "caixa",
          "dur": 0.8
        },
        {
          "at": 2.42,
          "acao": "aparecer",
          "alvo": "etiqueta",
          "dur": 0.8
        },
        {
          "at": 4.58,
          "acao": "aparecer",
          "alvo": "valor",
          "dur": 0.7
        }
      ],
      "why": "A variável é um nome que aponta para um valor, e pode apontar para outro depois."
    },
    {
      "id": "condicao",
      "ordem": 4,
      "narration": "A condição é uma bifurcação: com preço 120, maior que 100, o desconto é 0,1.",
      "words": [
        {
          "t": "A",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "condição",
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
          "t": "uma",
          "s": 1.28,
          "e": 1.62,
          "hl": false
        },
        {
          "t": "bifurcação:",
          "s": 1.66,
          "e": 2.12,
          "hl": true
        },
        {
          "t": "com",
          "s": 2.36,
          "e": 2.64,
          "hl": false
        },
        {
          "t": "preço",
          "s": 2.68,
          "e": 3.02,
          "hl": false
        },
        {
          "t": "120,",
          "s": 3.06,
          "e": 3.34,
          "hl": true
        },
        {
          "t": "maior",
          "s": 3.58,
          "e": 3.86,
          "hl": false
        },
        {
          "t": "que",
          "s": 3.9,
          "e": 4.18,
          "hl": false
        },
        {
          "t": "100,",
          "s": 4.22,
          "e": 4.5,
          "hl": false
        },
        {
          "t": "o",
          "s": 4.74,
          "e": 5.02,
          "hl": false
        },
        {
          "t": "desconto",
          "s": 5.06,
          "e": 5.46,
          "hl": false
        },
        {
          "t": "é",
          "s": 5.5,
          "e": 5.78,
          "hl": false
        },
        {
          "t": "0,1.",
          "s": 5.82,
          "e": 6.1,
          "hl": true
        }
      ],
      "dur": 7.3,
      "terminal": {
        "cmd": "desconto = 0.1 if preco > 100 else 0",
        "at": 0.52,
        "dur": 2.4
      },
      "status": {
        "tipo": "ok",
        "texto": "120 > 100: VERDADEIRO",
        "at": 3.58
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "varbox",
          "dur": 0.6
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "decisao",
          "dur": 0.9
        },
        {
          "at": 1.66,
          "acao": "desenhar",
          "alvo": "dec-nao",
          "dur": 0.9
        },
        {
          "at": 1.66,
          "acao": "desenhar",
          "alvo": "dec-sim",
          "dur": 0.9
        },
        {
          "at": 3.06,
          "acao": "destacar",
          "alvo": "decisao",
          "dur": 0.8
        },
        {
          "at": 4.22,
          "acao": "aparecer",
          "alvo": "dec-res-nao",
          "dur": 0.7
        },
        {
          "at": 5.82,
          "acao": "aparecer",
          "alvo": "dec-res-sim",
          "dur": 0.8
        },
        {
          "at": 5.82,
          "acao": "cor",
          "alvo": "dec-sim",
          "dur": 0.6,
          "para": {
            "stroke": "--leaf"
          }
        }
      ],
      "why": "O teste produz verdadeiro ou falso, e o programa segue só um dos dois caminhos."
    },
    {
      "id": "laco",
      "ordem": 5,
      "narration": "O laço é uma esteira que repete a função: uma, duas e três unidades dão 108, 216 e 324.",
      "words": [
        {
          "t": "O",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "laço",
          "s": 0.52,
          "e": 0.86,
          "hl": true
        },
        {
          "t": "é",
          "s": 0.9,
          "e": 1.18,
          "hl": false
        },
        {
          "t": "uma",
          "s": 1.22,
          "e": 1.56,
          "hl": false
        },
        {
          "t": "esteira",
          "s": 1.6,
          "e": 2,
          "hl": true
        },
        {
          "t": "que",
          "s": 2.04,
          "e": 2.32,
          "hl": false
        },
        {
          "t": "repete",
          "s": 2.36,
          "e": 2.76,
          "hl": false
        },
        {
          "t": "a",
          "s": 2.8,
          "e": 3.08,
          "hl": false
        },
        {
          "t": "função:",
          "s": 3.12,
          "e": 3.46,
          "hl": true
        },
        {
          "t": "uma,",
          "s": 3.7,
          "e": 4.04,
          "hl": false
        },
        {
          "t": "duas",
          "s": 4.28,
          "e": 4.56,
          "hl": false
        },
        {
          "t": "e",
          "s": 4.6,
          "e": 4.88,
          "hl": false
        },
        {
          "t": "três",
          "s": 4.92,
          "e": 5.2,
          "hl": false
        },
        {
          "t": "unidades",
          "s": 5.24,
          "e": 5.7,
          "hl": false
        },
        {
          "t": "dão",
          "s": 5.74,
          "e": 6.02,
          "hl": false
        },
        {
          "t": "108,",
          "s": 6.06,
          "e": 6.34,
          "hl": false
        },
        {
          "t": "216",
          "s": 6.58,
          "e": 6.86,
          "hl": false
        },
        {
          "t": "e",
          "s": 6.9,
          "e": 7.18,
          "hl": false
        },
        {
          "t": "324.",
          "s": 7.22,
          "e": 7.5,
          "hl": true
        }
      ],
      "dur": 8.7,
      "terminal": {
        "cmd": "for qtd in [1, 2, 3]:   # o laço",
        "at": 2.36,
        "dur": 2.2
      },
      "status": {
        "tipo": "ok",
        "texto": "TOTAIS: 108, 216 E 324",
        "at": 6.58
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "bifurcacao",
          "dur": 0.6
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "nota-esteira",
          "dur": 0.8
        },
        {
          "at": 1.6,
          "acao": "aparecer",
          "alvo": "esteira",
          "dur": 0.8
        },
        {
          "at": 3.12,
          "acao": "aparecer",
          "alvo": "maquina",
          "dur": 0.8
        },
        {
          "at": 3.7,
          "acao": "aparecer",
          "alvo": "crate-1",
          "dur": 0.5
        },
        {
          "at": 4.28,
          "acao": "aparecer",
          "alvo": "crate-2",
          "dur": 0.5
        },
        {
          "at": 4.92,
          "acao": "aparecer",
          "alvo": "crate-3",
          "dur": 0.5
        },
        {
          "at": 5.74,
          "acao": "aparecer",
          "alvo": "resultados",
          "dur": 0.5
        },
        {
          "at": 6.06,
          "acao": "aparecer",
          "alvo": "res-1",
          "dur": 0.5
        },
        {
          "at": 6.58,
          "acao": "aparecer",
          "alvo": "res-2",
          "dur": 0.5
        },
        {
          "at": 7.22,
          "acao": "aparecer",
          "alvo": "res-3",
          "dur": 0.5
        }
      ],
      "why": "O laço evita copiar e colar o mesmo trecho: o computador repete por você."
    },
    {
      "id": "igual",
      "ordem": 6,
      "narration": "Armadilha: o sinal de igual guarda um valor. Em x = x + 2, o 5 vira 7.",
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
          "t": "sinal",
          "s": 1.22,
          "e": 1.56,
          "hl": false
        },
        {
          "t": "de",
          "s": 1.6,
          "e": 1.88,
          "hl": false
        },
        {
          "t": "igual",
          "s": 1.92,
          "e": 2.26,
          "hl": true
        },
        {
          "t": "guarda",
          "s": 2.3,
          "e": 2.64,
          "hl": true
        },
        {
          "t": "um",
          "s": 2.68,
          "e": 2.96,
          "hl": false
        },
        {
          "t": "valor.",
          "s": 3,
          "e": 3.34,
          "hl": false
        },
        {
          "t": "Em",
          "s": 3.78,
          "e": 4.06,
          "hl": false
        },
        {
          "t": "x",
          "s": 4.1,
          "e": 4.38,
          "hl": false
        },
        {
          "t": "=",
          "s": 4.42,
          "e": 4.7,
          "hl": false
        },
        {
          "t": "x",
          "s": 4.74,
          "e": 5.02,
          "hl": false
        },
        {
          "t": "+",
          "s": 5.06,
          "e": 5.34,
          "hl": false
        },
        {
          "t": "2,",
          "s": 5.38,
          "e": 5.66,
          "hl": false
        },
        {
          "t": "o",
          "s": 5.9,
          "e": 6.18,
          "hl": false
        },
        {
          "t": "5",
          "s": 6.22,
          "e": 6.5,
          "hl": true
        },
        {
          "t": "vira",
          "s": 6.54,
          "e": 6.88,
          "hl": false
        },
        {
          "t": "7.",
          "s": 6.92,
          "e": 7.2,
          "hl": true
        }
      ],
      "dur": 8.4,
      "terminal": {
        "cmd": "x = 5;  x = x + 2;  print(x)   # 7",
        "at": 0.2,
        "dur": 2.6
      },
      "status": {
        "tipo": "alerta",
        "texto": "= GUARDA · == COMPARA",
        "at": 3
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "fabrica",
          "dur": 0.6
        },
        {
          "at": 1.92,
          "acao": "aparecer",
          "alvo": "ig-eq",
          "dur": 0.8
        },
        {
          "at": 6.22,
          "acao": "aparecer",
          "alvo": "ig-x5",
          "dur": 0.7
        },
        {
          "at": 6.54,
          "acao": "desenhar",
          "alvo": "ig-seta",
          "dur": 0.7
        },
        {
          "at": 6.54,
          "acao": "aparecer",
          "alvo": "ig-mais",
          "dur": 0.5
        },
        {
          "at": 6.92,
          "acao": "aparecer",
          "alvo": "ig-x7",
          "dur": 0.7
        },
        {
          "at": 6.92,
          "acao": "aparecer",
          "alvo": "ig-cmp",
          "dur": 0.9
        }
      ],
      "why": "Para comparar, use ==. Em x = x + 2, o computador lê x, soma 2 e guarda de volta."
    },
    {
      "id": "contagem",
      "ordem": 7,
      "narration": "Armadilha: a contagem começa no zero. O range de 4 dá 0, 1, 2 e 3.",
      "words": [
        {
          "t": "Armadilha:",
          "s": 0.2,
          "e": 0.66,
          "hl": false
        },
        {
          "t": "a",
          "s": 0.9,
          "e": 1.18,
          "hl": false
        },
        {
          "t": "contagem",
          "s": 1.22,
          "e": 1.62,
          "hl": true
        },
        {
          "t": "começa",
          "s": 1.66,
          "e": 2.06,
          "hl": false
        },
        {
          "t": "no",
          "s": 2.1,
          "e": 2.38,
          "hl": false
        },
        {
          "t": "zero.",
          "s": 2.42,
          "e": 2.76,
          "hl": true
        },
        {
          "t": "O",
          "s": 3.2,
          "e": 3.48,
          "hl": false
        },
        {
          "t": "range",
          "s": 3.52,
          "e": 3.86,
          "hl": true
        },
        {
          "t": "de",
          "s": 3.9,
          "e": 4.18,
          "hl": false
        },
        {
          "t": "4",
          "s": 4.22,
          "e": 4.5,
          "hl": false
        },
        {
          "t": "dá",
          "s": 4.54,
          "e": 4.82,
          "hl": false
        },
        {
          "t": "0,",
          "s": 4.86,
          "e": 5.14,
          "hl": false
        },
        {
          "t": "1,",
          "s": 5.38,
          "e": 5.66,
          "hl": false
        },
        {
          "t": "2",
          "s": 5.9,
          "e": 6.18,
          "hl": false
        },
        {
          "t": "e",
          "s": 6.22,
          "e": 6.5,
          "hl": false
        },
        {
          "t": "3.",
          "s": 6.54,
          "e": 6.82,
          "hl": true
        }
      ],
      "dur": 8.02,
      "terminal": {
        "cmd": "list(range(4))   # [0, 1, 2, 3]",
        "at": 3.52,
        "dur": 2.4
      },
      "status": {
        "tipo": "alerta",
        "texto": "4 VOLTAS: DE 0 A 3",
        "at": 2.42
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "igual",
          "dur": 0.6
        },
        {
          "at": 3.52,
          "acao": "aparecer",
          "alvo": "rg-tit",
          "dur": 0.8
        },
        {
          "at": 4.86,
          "acao": "aparecer",
          "alvo": "rg-c0",
          "dur": 0.5
        },
        {
          "at": 5.38,
          "acao": "aparecer",
          "alvo": "rg-c1",
          "dur": 0.5
        },
        {
          "at": 5.9,
          "acao": "aparecer",
          "alvo": "rg-c2",
          "dur": 0.5
        },
        {
          "at": 6.54,
          "acao": "aparecer",
          "alvo": "rg-c3",
          "dur": 0.5
        },
        {
          "at": 6.54,
          "acao": "desenhar",
          "alvo": "rg-colchete",
          "dur": 0.9
        },
        {
          "at": 6.54,
          "acao": "aparecer",
          "alvo": "rg-voltas",
          "dur": 0.7
        },
        {
          "at": 6.54,
          "acao": "aparecer",
          "alvo": "rg-fora",
          "dur": 0.7
        }
      ],
      "why": "Em listas, o primeiro item está no índice 0: em [10, 20, 30], o item 0 vale 10."
    },
    {
      "id": "campo",
      "ordem": 8,
      "narration": "No campo, o laço visita cada talhão e a condição manda adubar se o fósforo está abaixo de 10.",
      "words": [
        {
          "t": "No",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "campo,",
          "s": 0.52,
          "e": 0.86,
          "hl": false
        },
        {
          "t": "o",
          "s": 1.1,
          "e": 1.38,
          "hl": false
        },
        {
          "t": "laço",
          "s": 1.42,
          "e": 1.76,
          "hl": true
        },
        {
          "t": "visita",
          "s": 1.8,
          "e": 2.2,
          "hl": false
        },
        {
          "t": "cada",
          "s": 2.24,
          "e": 2.58,
          "hl": false
        },
        {
          "t": "talhão",
          "s": 2.62,
          "e": 2.96,
          "hl": true
        },
        {
          "t": "e",
          "s": 3,
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
          "t": "condição",
          "s": 3.64,
          "e": 4.04,
          "hl": true
        },
        {
          "t": "manda",
          "s": 4.08,
          "e": 4.42,
          "hl": false
        },
        {
          "t": "adubar",
          "s": 4.46,
          "e": 4.86,
          "hl": false
        },
        {
          "t": "se",
          "s": 4.9,
          "e": 5.18,
          "hl": false
        },
        {
          "t": "o",
          "s": 5.22,
          "e": 5.5,
          "hl": false
        },
        {
          "t": "fósforo",
          "s": 5.54,
          "e": 5.94,
          "hl": false
        },
        {
          "t": "está",
          "s": 5.98,
          "e": 6.32,
          "hl": false
        },
        {
          "t": "abaixo",
          "s": 6.36,
          "e": 6.76,
          "hl": false
        },
        {
          "t": "de",
          "s": 6.8,
          "e": 7.08,
          "hl": false
        },
        {
          "t": "10.",
          "s": 7.12,
          "e": 7.4,
          "hl": false
        }
      ],
      "dur": 8.6,
      "terminal": {
        "cmd": "if fosforo < 10: adubar()",
        "at": 3.64,
        "dur": 2
      },
      "status": {
        "tipo": "alerta",
        "texto": "2 DE 4 TALHÕES PEDEM ADUBO",
        "at": 4.46
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "intervalo",
          "dur": 0.6
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "tal-1",
          "dur": 0.7
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "tal-2",
          "dur": 0.7
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "tal-3",
          "dur": 0.7
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "tal-4",
          "dur": 0.7
        },
        {
          "at": 1.42,
          "acao": "aparecer",
          "alvo": "tal-vals",
          "dur": 0.7
        },
        {
          "at": 1.8,
          "acao": "aparecer",
          "alvo": "visitante",
          "dur": 0.5
        },
        {
          "at": 2.24,
          "acao": "mover",
          "alvo": "visitante",
          "dur": 2.4,
          "para": {
            "x": 282,
            "y": 0
          }
        },
        {
          "at": 3.64,
          "acao": "aparecer",
          "alvo": "limite",
          "dur": 0.8
        },
        {
          "at": 4.46,
          "acao": "cor",
          "alvo": "tal-1",
          "dur": 0.6,
          "para": {
            "fill": "--terra"
          }
        },
        {
          "at": 4.46,
          "acao": "aparecer",
          "alvo": "adubo-1",
          "dur": 0.7
        },
        {
          "at": 4.46,
          "acao": "cor",
          "alvo": "tal-3",
          "dur": 0.6,
          "para": {
            "fill": "--terra"
          }
        },
        {
          "at": 4.46,
          "acao": "aparecer",
          "alvo": "adubo-3",
          "dur": 0.7
        },
        {
          "at": 4.46,
          "acao": "cor",
          "alvo": "tal-2",
          "dur": 0.6,
          "para": {
            "fill": "--leaf"
          }
        },
        {
          "at": 4.46,
          "acao": "cor",
          "alvo": "tal-4",
          "dur": 0.6,
          "para": {
            "fill": "--leaf"
          }
        }
      ],
      "why": "Todo pipeline de dados e de IA é feito destas quatro peças: variável, condição, laço e função."
    }
  ],
  "outro": {
    "dur": 9.58,
    "narration": "Variável, condição, laço e função: a base de todo pipeline de dados e de IA. Agora mexa no laboratório.",
    "words": [
      {
        "t": "Variável,",
        "s": 0.2,
        "e": 0.6,
        "hl": true
      },
      {
        "t": "condição,",
        "s": 0.84,
        "e": 1.24,
        "hl": true
      },
      {
        "t": "laço",
        "s": 1.48,
        "e": 1.82,
        "hl": true
      },
      {
        "t": "e",
        "s": 1.86,
        "e": 2.14,
        "hl": false
      },
      {
        "t": "função:",
        "s": 2.18,
        "e": 2.52,
        "hl": false
      },
      {
        "t": "a",
        "s": 2.76,
        "e": 3.04,
        "hl": false
      },
      {
        "t": "base",
        "s": 3.08,
        "e": 3.42,
        "hl": false
      },
      {
        "t": "de",
        "s": 3.46,
        "e": 3.74,
        "hl": false
      },
      {
        "t": "todo",
        "s": 3.78,
        "e": 4.12,
        "hl": false
      },
      {
        "t": "pipeline",
        "s": 4.16,
        "e": 4.62,
        "hl": false
      },
      {
        "t": "de",
        "s": 4.66,
        "e": 4.94,
        "hl": false
      },
      {
        "t": "dados",
        "s": 4.98,
        "e": 5.32,
        "hl": false
      },
      {
        "t": "e",
        "s": 5.36,
        "e": 5.64,
        "hl": false
      },
      {
        "t": "de",
        "s": 5.68,
        "e": 5.96,
        "hl": false
      },
      {
        "t": "IA.",
        "s": 6,
        "e": 6.28,
        "hl": false
      },
      {
        "t": "Agora",
        "s": 6.72,
        "e": 7.12,
        "hl": false
      },
      {
        "t": "mexa",
        "s": 7.16,
        "e": 7.5,
        "hl": false
      },
      {
        "t": "no",
        "s": 7.54,
        "e": 7.82,
        "hl": false
      },
      {
        "t": "laboratório.",
        "s": 7.86,
        "e": 8.38,
        "hl": true
      }
    ],
    "scene": [
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "campo",
        "dur": 0.6
      },
      {
        "at": 0.2,
        "acao": "aparecer",
        "alvo": "ot-var",
        "dur": 0.7
      },
      {
        "at": 0.84,
        "acao": "aparecer",
        "alvo": "ot-cond",
        "dur": 0.7
      },
      {
        "at": 1.48,
        "acao": "aparecer",
        "alvo": "ot-laco",
        "dur": 0.7
      },
      {
        "at": 2.18,
        "acao": "aparecer",
        "alvo": "ot-func",
        "dur": 0.7
      },
      {
        "at": 7.86,
        "acao": "destacar",
        "alvo": "guia-braco",
        "dur": 1.2
      }
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "preco = 120.0\ndesconto = 0.1 if preco > 100 else 0\ndef com_desconto(v, t):\n    return v * (1 - t)\nfor qtd in [1, 2, 3]:\n    tot = qtd * com_desconto(preco, desconto)\n    print(qtd, tot)",
      "at": 1,
      "dur": 4.6
    }
  }
};
