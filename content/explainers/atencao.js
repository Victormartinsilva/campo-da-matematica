/* Roteiro do mini-video "Softmax e atencao" (metafora: plateia onde cada pessoa levanta a mao com mais ou menos forca). Tempos em segundos desde o inicio de cada peca.
   Numeros calculados por script (mesma conta de labs/atencao.js): frase "o milho precisa de nitrogenio .", pergunta = "milho", pontuacoes s = (0.085; 0.735; 0.339; 0.099; 0.707; -0.141), soma 1.82;
   pesos T=1 = (12.7; 24.3; 16.4; 12.9; 23.6; 10.1)%; T=0,3 maior 40.6%; T=3 de 14.3% a 19.1%; saida = (0.510; 0.353). */
window.Explainers = window.Explainers || {};
Explainers.atencao = {
  "meta": {
    "id": "atencao",
    "categoria": "MACHINE LEARNING",
    "area": "ml",
    "titulo": "Softmax e atenção",
    "duracao": 78,
    "cena": "atencao"
  },
  "pieces": [
    {
      "id": "plateia",
      "ordem": 1,
      "narration": "Pense numa plateia: cada pessoa é uma palavra da frase. A palavra milho pergunta: quem importa para mim?",
      "words": [
        {"t": "Pense", "s": 0.2, "e": 0.54, "hl": false},
        {"t": "numa", "s": 0.58, "e": 0.92, "hl": false},
        {"t": "plateia:", "s": 0.96, "e": 1.3, "hl": true},
        {"t": "cada", "s": 1.54, "e": 1.88, "hl": false},
        {"t": "pessoa", "s": 1.92, "e": 2.26, "hl": false},
        {"t": "é", "s": 2.3, "e": 2.58, "hl": false},
        {"t": "uma", "s": 2.62, "e": 2.96, "hl": false},
        {"t": "palavra", "s": 3, "e": 3.4, "hl": false},
        {"t": "da", "s": 3.44, "e": 3.72, "hl": false},
        {"t": "frase.", "s": 3.76, "e": 4.1, "hl": false},
        {"t": "A", "s": 4.54, "e": 4.82, "hl": false},
        {"t": "palavra", "s": 4.86, "e": 5.26, "hl": false},
        {"t": "milho", "s": 5.3, "e": 5.64, "hl": true},
        {"t": "pergunta:", "s": 5.68, "e": 6.08, "hl": true},
        {"t": "quem", "s": 6.32, "e": 6.6, "hl": false},
        {"t": "importa", "s": 6.64, "e": 7.04, "hl": true},
        {"t": "para", "s": 7.08, "e": 7.42, "hl": false},
        {"t": "mim?", "s": 7.46, "e": 7.74, "hl": false}
      ],
      "dur": 8.94,
      "terminal": {
        "cmd": "q = E[1]   # o vetor de \"milho\" faz a pergunta",
        "at": 5.68,
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
          "at": 0.96,
          "acao": "aparecer",
          "alvo": "plateia",
          "dur": 0.9
        },
        {
          "at": 5.3,
          "acao": "aparecer",
          "alvo": "foco-milho",
          "dur": 0.6
        },
        {
          "at": 6.32,
          "acao": "aparecer",
          "alvo": "balao",
          "dur": 0.7
        },
        {
          "at": 7.46,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        }
      ],
      "why": "A atenção decide em quais outras palavras da frase olhar."
    },
    {
      "id": "pontuacao",
      "ordem": 2,
      "narration": "Cada pessoa recebe uma pontuação: a semelhança do vetor dela com o de milho. Pode ficar negativa.",
      "words": [
        {"t": "Cada", "s": 0.2, "e": 0.54, "hl": false},
        {"t": "pessoa", "s": 0.58, "e": 0.92, "hl": false},
        {"t": "recebe", "s": 0.96, "e": 1.36, "hl": false},
        {"t": "uma", "s": 1.4, "e": 1.74, "hl": false},
        {"t": "pontuação:", "s": 1.78, "e": 2.18, "hl": true},
        {"t": "a", "s": 2.42, "e": 2.7, "hl": false},
        {"t": "semelhança", "s": 2.74, "e": 3.2, "hl": true},
        {"t": "do", "s": 3.24, "e": 3.52, "hl": false},
        {"t": "vetor", "s": 3.56, "e": 3.9, "hl": true},
        {"t": "dela", "s": 3.94, "e": 4.28, "hl": false},
        {"t": "com", "s": 4.32, "e": 4.6, "hl": false},
        {"t": "o", "s": 4.64, "e": 4.92, "hl": false},
        {"t": "de", "s": 4.96, "e": 5.24, "hl": false},
        {"t": "milho.", "s": 5.28, "e": 5.62, "hl": false},
        {"t": "Pode", "s": 6.06, "e": 6.4, "hl": false},
        {"t": "ficar", "s": 6.44, "e": 6.78, "hl": false},
        {"t": "negativa.", "s": 6.82, "e": 7.28, "hl": true}
      ],
      "dur": 8.48,
      "terminal": {
        "cmd": "s = E @ q / np.sqrt(2)   # uma nota por palavra",
        "at": 2.74,
        "dur": 2.4
      },
      "status": {
        "tipo": "alerta",
        "texto": "NOTAS CRUAS SOMAM 1,82",
        "at": 6.06
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "balao",
          "dur": 0.5
        },
        {
          "at": 1.78,
          "acao": "aparecer",
          "alvo": "pontuacoes",
          "dur": 0.8
        },
        {
          "at": 6.82,
          "acao": "destacar",
          "alvo": "nota-neg",
          "dur": 1
        }
      ],
      "why": "A nota mede o quanto cada palavra se parece com a pergunta."
    },
    {
      "id": "softmax",
      "ordem": 3,
      "narration": "O softmax resolve: eleva cada nota à exponencial e divide pela soma. Saem pesos que somam cem por cento.",
      "words": [
        {"t": "O", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "softmax", "s": 0.52, "e": 0.86, "hl": true},
        {"t": "resolve:", "s": 0.9, "e": 1.3, "hl": false},
        {"t": "eleva", "s": 1.54, "e": 1.94, "hl": false},
        {"t": "cada", "s": 1.98, "e": 2.32, "hl": false},
        {"t": "nota", "s": 2.36, "e": 2.7, "hl": false},
        {"t": "à", "s": 2.74, "e": 3.02, "hl": false},
        {"t": "exponencial", "s": 3.06, "e": 3.52, "hl": true},
        {"t": "e", "s": 3.56, "e": 3.84, "hl": false},
        {"t": "divide", "s": 3.88, "e": 4.28, "hl": false},
        {"t": "pela", "s": 4.32, "e": 4.66, "hl": false},
        {"t": "soma.", "s": 4.7, "e": 5.04, "hl": false},
        {"t": "Saem", "s": 5.48, "e": 5.76, "hl": false},
        {"t": "pesos", "s": 5.8, "e": 6.14, "hl": true},
        {"t": "que", "s": 6.18, "e": 6.46, "hl": false},
        {"t": "somam", "s": 6.5, "e": 6.84, "hl": false},
        {"t": "cem", "s": 6.88, "e": 7.16, "hl": true},
        {"t": "por", "s": 7.2, "e": 7.48, "hl": false},
        {"t": "cento.", "s": 7.52, "e": 7.86, "hl": false}
      ],
      "dur": 9.06,
      "terminal": {
        "cmd": "w = np.exp(s) / np.exp(s).sum()",
        "at": 1.54,
        "dur": 2.2
      },
      "status": {
        "tipo": "ok",
        "texto": "PESOS SOMAM 100,0%",
        "at": 6.5
      },
      "scene": [
        {
          "at": 0.9,
          "acao": "aparecer",
          "alvo": "tag-t1",
          "dur": 0.5
        },
        {
          "at": 5.48,
          "acao": "sumir",
          "alvo": "pontuacoes",
          "dur": 0.5
        },
        {
          "at": 5.8,
          "acao": "aparecer",
          "alvo": "maos-t1",
          "dur": 0.9
        },
        {
          "at": 6.88,
          "acao": "aparecer",
          "alvo": "soma-100",
          "dur": 0.6
        }
      ],
      "why": "O softmax transforma notas quaisquer em pesos positivos que somam 1."
    },
    {
      "id": "maior",
      "ordem": 4,
      "narration": "Quem tem maior nota levanta a mão mais alto. Milho e nitrogênio pesam vinte e quatro por cento cada.",
      "words": [
        {"t": "Quem", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "tem", "s": 0.52, "e": 0.8, "hl": false},
        {"t": "maior", "s": 0.84, "e": 1.12, "hl": true},
        {"t": "nota", "s": 1.16, "e": 1.5, "hl": false},
        {"t": "levanta", "s": 1.54, "e": 1.94, "hl": false},
        {"t": "a", "s": 1.98, "e": 2.26, "hl": false},
        {"t": "mão", "s": 2.3, "e": 2.58, "hl": false},
        {"t": "mais", "s": 2.62, "e": 2.9, "hl": false},
        {"t": "alto.", "s": 2.94, "e": 3.28, "hl": true},
        {"t": "Milho", "s": 3.72, "e": 4.06, "hl": false},
        {"t": "e", "s": 4.1, "e": 4.38, "hl": false},
        {"t": "nitrogênio", "s": 4.42, "e": 4.88, "hl": true},
        {"t": "pesam", "s": 4.92, "e": 5.26, "hl": false},
        {"t": "vinte", "s": 5.3, "e": 5.64, "hl": true},
        {"t": "e", "s": 5.68, "e": 5.96, "hl": false},
        {"t": "quatro", "s": 6, "e": 6.34, "hl": false},
        {"t": "por", "s": 6.38, "e": 6.66, "hl": false},
        {"t": "cento", "s": 6.7, "e": 7.04, "hl": false},
        {"t": "cada.", "s": 7.08, "e": 7.42, "hl": false}
      ],
      "dur": 8.62,
      "status": {
        "tipo": "ok",
        "texto": "QUASE EMPATE: 24,3% E 23,6%",
        "at": 4.92
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "soma-100",
          "dur": 0.5
        },
        {
          "at": 3.72,
          "acao": "destacar",
          "alvo": "mao-milho",
          "dur": 0.9
        },
        {
          "at": 4.42,
          "acao": "destacar",
          "alvo": "mao-nitro",
          "dur": 0.9
        }
      ],
      "why": "Mais nota, mais peso, e todo mundo ainda recebe uma fração."
    },
    {
      "id": "fria",
      "ordem": 5,
      "narration": "Com temperatura pequena, 0,3, a plateia se concentra: milho sobe para quarenta e um por cento.",
      "words": [
        {"t": "Com", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "temperatura", "s": 0.52, "e": 1.04, "hl": true},
        {"t": "pequena,", "s": 1.08, "e": 1.48, "hl": true},
        {"t": "0,3,", "s": 1.72, "e": 2, "hl": false},
        {"t": "a", "s": 2.24, "e": 2.52, "hl": false},
        {"t": "plateia", "s": 2.56, "e": 2.9, "hl": false},
        {"t": "se", "s": 2.94, "e": 3.22, "hl": false},
        {"t": "concentra:", "s": 3.26, "e": 3.66, "hl": true},
        {"t": "milho", "s": 3.9, "e": 4.24, "hl": false},
        {"t": "sobe", "s": 4.28, "e": 4.62, "hl": false},
        {"t": "para", "s": 4.66, "e": 5, "hl": false},
        {"t": "quarenta", "s": 5.04, "e": 5.44, "hl": true},
        {"t": "e", "s": 5.48, "e": 5.76, "hl": false},
        {"t": "um", "s": 5.8, "e": 6.08, "hl": false},
        {"t": "por", "s": 6.12, "e": 6.4, "hl": false},
        {"t": "cento.", "s": 6.44, "e": 6.78, "hl": false}
      ],
      "dur": 7.98,
      "terminal": {
        "cmd": "w = softmax(s / 0.3)   # T pequena",
        "at": 1.08,
        "dur": 2
      },
      "status": {
        "tipo": "ok",
        "texto": "MAIOR PESO: 24,3% PARA 40,6%",
        "at": 4.28
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "maos-t1",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tag-t1",
          "dur": 0.4
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "tag-t03",
          "dur": 0.5
        },
        {
          "at": 3.26,
          "acao": "aparecer",
          "alvo": "maos-t03",
          "dur": 0.9
        },
        {
          "at": 5.04,
          "acao": "destacar",
          "alvo": "mao03-milho",
          "dur": 0.9
        }
      ],
      "why": "Temperatura baixa se aproxima de escolher só o maior valor."
    },
    {
      "id": "quente",
      "ordem": 6,
      "narration": "Com temperatura grande, 3, todos levantam a mão quase igual, entre catorze e dezenove por cento.",
      "words": [
        {"t": "Com", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "temperatura", "s": 0.52, "e": 1.04, "hl": false},
        {"t": "grande,", "s": 1.08, "e": 1.42, "hl": true},
        {"t": "3,", "s": 1.66, "e": 1.94, "hl": false},
        {"t": "todos", "s": 2.18, "e": 2.52, "hl": false},
        {"t": "levantam", "s": 2.56, "e": 2.96, "hl": false},
        {"t": "a", "s": 3, "e": 3.28, "hl": false},
        {"t": "mão", "s": 3.32, "e": 3.6, "hl": false},
        {"t": "quase", "s": 3.64, "e": 3.98, "hl": true},
        {"t": "igual,", "s": 4.02, "e": 4.36, "hl": true},
        {"t": "entre", "s": 4.6, "e": 4.94, "hl": false},
        {"t": "catorze", "s": 4.98, "e": 5.38, "hl": false},
        {"t": "e", "s": 5.42, "e": 5.7, "hl": false},
        {"t": "dezenove", "s": 5.74, "e": 6.2, "hl": true},
        {"t": "por", "s": 6.24, "e": 6.52, "hl": false},
        {"t": "cento.", "s": 6.56, "e": 6.9, "hl": false}
      ],
      "dur": 8.1,
      "terminal": {
        "cmd": "w = softmax(s / 3)   # T grande",
        "at": 1.08,
        "dur": 2
      },
      "status": {
        "tipo": "alerta",
        "texto": "ATENÇÃO ESPALHADA: 14,3% A 19,1%",
        "at": 3.64
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "maos-t03",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tag-t03",
          "dur": 0.4
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "tag-t3",
          "dur": 0.5
        },
        {
          "at": 2.18,
          "acao": "aparecer",
          "alvo": "maos-t3",
          "dur": 0.9
        },
        {
          "at": 4.02,
          "acao": "destacar",
          "alvo": "maos-t3",
          "dur": 0.9
        }
      ],
      "why": "Armadilha comum: temperatura alta dá peso quase igual a tudo, e a atenção perde o foco."
    },
    {
      "id": "media",
      "ordem": 7,
      "narration": "A mistura: a saída de milho é a média dos vetores, ponderada pelos pesos. Dá o ponto 0,51 e 0,35.",
      "words": [
        {"t": "A", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "mistura:", "s": 0.52, "e": 0.92, "hl": false},
        {"t": "a", "s": 1.16, "e": 1.44, "hl": false},
        {"t": "saída", "s": 1.48, "e": 1.82, "hl": true},
        {"t": "de", "s": 1.86, "e": 2.14, "hl": false},
        {"t": "milho", "s": 2.18, "e": 2.52, "hl": false},
        {"t": "é", "s": 2.56, "e": 2.84, "hl": false},
        {"t": "a", "s": 2.88, "e": 3.16, "hl": false},
        {"t": "média", "s": 3.2, "e": 3.54, "hl": true},
        {"t": "dos", "s": 3.58, "e": 3.86, "hl": false},
        {"t": "vetores,", "s": 3.9, "e": 4.3, "hl": false},
        {"t": "ponderada", "s": 4.54, "e": 5, "hl": true},
        {"t": "pelos", "s": 5.04, "e": 5.38, "hl": false},
        {"t": "pesos.", "s": 5.42, "e": 5.76, "hl": true},
        {"t": "Dá", "s": 6.2, "e": 6.48, "hl": false},
        {"t": "o", "s": 6.52, "e": 6.8, "hl": false},
        {"t": "ponto", "s": 6.84, "e": 7.18, "hl": false},
        {"t": "0,51", "s": 7.22, "e": 7.5, "hl": false},
        {"t": "e", "s": 7.54, "e": 7.82, "hl": false},
        {"t": "0,35.", "s": 7.86, "e": 8.14, "hl": false}
      ],
      "dur": 9.34,
      "terminal": {
        "cmd": "saida = w @ E   # (0.51, 0.35)",
        "at": 3.2,
        "dur": 2
      },
      "status": {
        "tipo": "ok",
        "texto": "SAÍDA: (0,51; 0,35)",
        "at": 6.84
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "maos-t3",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tag-t3",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "plateia",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "foco-milho",
          "dur": 0.4
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "plano",
          "dur": 0.8
        },
        {
          "at": 3.9,
          "acao": "aparecer",
          "alvo": "pts-vetores",
          "dur": 0.8
        },
        {
          "at": 4.54,
          "acao": "aparecer",
          "alvo": "puxoes",
          "dur": 0.9
        },
        {
          "at": 6.84,
          "acao": "aparecer",
          "alvo": "saida",
          "dur": 0.7
        }
      ],
      "why": "A saída é uma mistura: cada palavra entra na proporção do seu peso."
    },
    {
      "id": "modelo",
      "ordem": 8,
      "narration": "Num modelo, isso se repete em muitas camadas. Texto colado no prompt disputa atenção, e o guardrail vigia.",
      "words": [
        {"t": "Num", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "modelo,", "s": 0.52, "e": 0.92, "hl": false},
        {"t": "isso", "s": 1.16, "e": 1.5, "hl": false},
        {"t": "se", "s": 1.54, "e": 1.82, "hl": false},
        {"t": "repete", "s": 1.86, "e": 2.26, "hl": false},
        {"t": "em", "s": 2.3, "e": 2.58, "hl": false},
        {"t": "muitas", "s": 2.62, "e": 2.96, "hl": false},
        {"t": "camadas.", "s": 3, "e": 3.4, "hl": true},
        {"t": "Texto", "s": 3.84, "e": 4.18, "hl": false},
        {"t": "colado", "s": 4.22, "e": 4.62, "hl": true},
        {"t": "no", "s": 4.66, "e": 4.94, "hl": false},
        {"t": "prompt", "s": 4.98, "e": 5.26, "hl": true},
        {"t": "disputa", "s": 5.3, "e": 5.7, "hl": false},
        {"t": "atenção,", "s": 5.74, "e": 6.14, "hl": false},
        {"t": "e", "s": 6.38, "e": 6.66, "hl": false},
        {"t": "o", "s": 6.7, "e": 6.98, "hl": false},
        {"t": "guardrail", "s": 7.02, "e": 7.36, "hl": true},
        {"t": "vigia.", "s": 7.4, "e": 7.74, "hl": false}
      ],
      "dur": 8.94,
      "terminal": {
        "cmd": "Atenção = softmax(Q @ K.T / np.sqrt(d)) @ V",
        "at": 3,
        "dur": 2.4
      },
      "status": {
        "tipo": "alerta",
        "texto": "TEXTO COLADO TAMBÉM PESA",
        "at": 4.22
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "plano",
          "dur": 0.5
        },
        {
          "at": 3,
          "acao": "aparecer",
          "alvo": "camadas",
          "dur": 0.9
        },
        {
          "at": 4.22,
          "acao": "aparecer",
          "alvo": "colado",
          "dur": 0.8
        },
        {
          "at": 7.02,
          "acao": "aparecer",
          "alvo": "guardrail",
          "dur": 0.8
        }
      ],
      "why": "Tudo no contexto disputa atenção, então vale validar entrada e saída."
    }
  ],
  "outro": {
    "dur": 8.48,
    "narration": "Pontuação, softmax e média ponderada: assim a atenção decide em que olhar. Agora mexa no laboratório.",
    "words": [
      {"t": "Pontuação,", "s": 0.2, "e": 0.6, "hl": false},
      {"t": "softmax", "s": 0.84, "e": 1.18, "hl": true},
      {"t": "e", "s": 1.22, "e": 1.5, "hl": false},
      {"t": "média", "s": 1.54, "e": 1.88, "hl": false},
      {"t": "ponderada:", "s": 1.92, "e": 2.38, "hl": false},
      {"t": "assim", "s": 2.62, "e": 2.96, "hl": false},
      {"t": "a", "s": 3, "e": 3.28, "hl": false},
      {"t": "atenção", "s": 3.32, "e": 3.72, "hl": true},
      {"t": "decide", "s": 3.76, "e": 4.16, "hl": false},
      {"t": "em", "s": 4.2, "e": 4.48, "hl": false},
      {"t": "que", "s": 4.52, "e": 4.8, "hl": false},
      {"t": "olhar.", "s": 4.84, "e": 5.18, "hl": false},
      {"t": "Agora", "s": 5.62, "e": 6.02, "hl": false},
      {"t": "mexa", "s": 6.06, "e": 6.4, "hl": false},
      {"t": "no", "s": 6.44, "e": 6.72, "hl": false},
      {"t": "laboratório.", "s": 6.76, "e": 7.28, "hl": true}
    ],
    "scene": [
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "camadas",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "colado",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "guardrail",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "aparecer",
        "alvo": "plateia",
        "dur": 0.8
      },
      {
        "at": 0.84,
        "acao": "aparecer",
        "alvo": "maos-t1",
        "dur": 0.9
      },
      {
        "at": 6.76,
        "acao": "destacar",
        "alvo": "guia-braco",
        "dur": 1.2
      }
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "import numpy as np\nE = np.array([[.1,.1],[1,.2],[.3,.9],\n              [.1,.2],[.9,.5],[-.2,0]])\nS = E @ E.T / np.sqrt(2)\nW = np.exp(S - S.max(1, keepdims=True))\nW /= W.sum(1, keepdims=True)\nsaida = W @ E\nprint(W[1].round(2), saida[1].round(2))",
      "at": 1,
      "dur": 5
    }
  }
};
