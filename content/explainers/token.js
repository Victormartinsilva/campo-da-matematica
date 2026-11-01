/* Roteiro do mini-video "Do logit ao proximo token" (metafora: roleta com fatias de tamanhos diferentes que a temperatura achata ou afia). Tempos em segundos desde o inicio de cada peca.
   Numeros calculados por script (mesma conta de labs/token.js): prompt "o milho precisa de ___", logits (4,2; 3,9; 3,1; 2,9; 2,0; 0,5; -1; -2);
   T=0,8 -> 45.2; 31.1; 11.4; 8.9; 2.9; 0.4; 0.1; 0.0%; T=0,3 nitrogenio 71.1%; T=2 nitrogenio 28.0% e banco 1.3%;
   top-k 3 -> 51.5; 35.4; 13.0%; top-p 0,9 mantem 4 (acumulado 96.6%) -> 46.8; 32.2; 11.8; 9.2%;
   sorteios de exemplo u = 0.12, 0.61, 0.83 -> nitrogênio, água, luz; T=0,1 nitrogenio 95.3%. */
window.Explainers = window.Explainers || {};
Explainers.token = {
  "meta": {
    "id": "token",
    "categoria": "MACHINE LEARNING",
    "area": "ml",
    "titulo": "Do logit ao próximo token",
    "duracao": 79,
    "cena": "token"
  },
  "pieces": [
    {
      "id": "logits",
      "ordem": 1,
      "narration": "O modelo lê o começo da frase e dá um logit, uma nota, a cada palavra candidata.",
      "words": [
        {"t": "O", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "modelo", "s": 0.52, "e": 0.92, "hl": true},
        {"t": "lê", "s": 0.96, "e": 1.24, "hl": false},
        {"t": "o", "s": 1.28, "e": 1.56, "hl": false},
        {"t": "começo", "s": 1.6, "e": 2, "hl": false},
        {"t": "da", "s": 2.04, "e": 2.32, "hl": false},
        {"t": "frase", "s": 2.36, "e": 2.7, "hl": false},
        {"t": "e", "s": 2.74, "e": 3.02, "hl": false},
        {"t": "dá", "s": 3.06, "e": 3.34, "hl": false},
        {"t": "um", "s": 3.38, "e": 3.66, "hl": false},
        {"t": "logit,", "s": 3.7, "e": 4.04, "hl": true},
        {"t": "uma", "s": 4.28, "e": 4.62, "hl": false},
        {"t": "nota,", "s": 4.66, "e": 5, "hl": true},
        {"t": "a", "s": 5.24, "e": 5.52, "hl": false},
        {"t": "cada", "s": 5.56, "e": 5.9, "hl": false},
        {"t": "palavra", "s": 5.94, "e": 6.34, "hl": false},
        {"t": "candidata.", "s": 6.38, "e": 6.84, "hl": true}
      ],
      "dur": 8.04,
      "scene": [
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "guia",
          "dur": 0.7
        },
        {
          "at": 1.6,
          "acao": "aparecer",
          "alvo": "prompt",
          "dur": 0.7
        },
        {
          "at": 3.7,
          "acao": "aparecer",
          "alvo": "tabela",
          "dur": 1
        },
        {
          "at": 6.38,
          "acao": "destacar",
          "alvo": "lin-0",
          "dur": 0.9
        }
      ],
      "why": "O modelo começa dando uma nota a cada palavra possível."
    },
    {
      "id": "roleta",
      "ordem": 2,
      "narration": "O softmax converte as notas em probabilidades que somam cem por cento. Cada palavra ganha uma fatia da roleta.",
      "words": [
        {"t": "O", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "softmax", "s": 0.52, "e": 0.86, "hl": true},
        {"t": "converte", "s": 0.9, "e": 1.3, "hl": false},
        {"t": "as", "s": 1.34, "e": 1.62, "hl": false},
        {"t": "notas", "s": 1.66, "e": 2, "hl": false},
        {"t": "em", "s": 2.04, "e": 2.32, "hl": false},
        {"t": "probabilidades", "s": 2.36, "e": 2.91, "hl": true},
        {"t": "que", "s": 2.95, "e": 3.23, "hl": false},
        {"t": "somam", "s": 3.27, "e": 3.61, "hl": false},
        {"t": "cem", "s": 3.65, "e": 3.93, "hl": false},
        {"t": "por", "s": 3.97, "e": 4.25, "hl": false},
        {"t": "cento.", "s": 4.29, "e": 4.63, "hl": false},
        {"t": "Cada", "s": 5.07, "e": 5.41, "hl": false},
        {"t": "palavra", "s": 5.45, "e": 5.85, "hl": false},
        {"t": "ganha", "s": 5.89, "e": 6.23, "hl": false},
        {"t": "uma", "s": 6.27, "e": 6.61, "hl": false},
        {"t": "fatia", "s": 6.65, "e": 6.99, "hl": true},
        {"t": "da", "s": 7.03, "e": 7.31, "hl": false},
        {"t": "roleta.", "s": 7.35, "e": 7.75, "hl": true}
      ],
      "dur": 8.95,
      "terminal": {
        "cmd": "p = softmax(z / T)   # aqui T = 0.8",
        "at": 0.52,
        "dur": 2.2
      },
      "status": {
        "tipo": "ok",
        "texto": "SOMA DAS FATIAS = 100,0%",
        "at": 3.27
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "tabela",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "prompt",
          "dur": 0.6
        },
        {
          "at": 6.65,
          "acao": "aparecer",
          "alvo": "roda",
          "dur": 1
        },
        {
          "at": 6.65,
          "acao": "aparecer",
          "alvo": "ponteiro",
          "dur": 0.6
        },
        {
          "at": 7.35,
          "acao": "destacar",
          "alvo": "roda",
          "dur": 0.9
        }
      ],
      "why": "Probabilidade é o tamanho da fatia: mais nota, fatia maior."
    },
    {
      "id": "fria",
      "ordem": 3,
      "narration": "Com temperatura baixa, 0,3, a roleta afia: nitrogênio ocupa setenta e um por cento.",
      "words": [
        {"t": "Com", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "temperatura", "s": 0.52, "e": 1.04, "hl": true},
        {"t": "baixa,", "s": 1.08, "e": 1.42, "hl": true},
        {"t": "0,3,", "s": 1.66, "e": 1.94, "hl": false},
        {"t": "a", "s": 2.18, "e": 2.46, "hl": false},
        {"t": "roleta", "s": 2.5, "e": 2.9, "hl": false},
        {"t": "afia:", "s": 2.94, "e": 3.28, "hl": true},
        {"t": "nitrogênio", "s": 3.52, "e": 3.98, "hl": false},
        {"t": "ocupa", "s": 4.02, "e": 4.42, "hl": false},
        {"t": "setenta", "s": 4.46, "e": 4.86, "hl": true},
        {"t": "e", "s": 4.9, "e": 5.18, "hl": false},
        {"t": "um", "s": 5.22, "e": 5.5, "hl": false},
        {"t": "por", "s": 5.54, "e": 5.82, "hl": false},
        {"t": "cento.", "s": 5.86, "e": 6.2, "hl": false}
      ],
      "dur": 7.4,
      "terminal": {
        "cmd": "softmax(z / 0.3)[0]   # 0.711",
        "at": 2.94,
        "dur": 2
      },
      "status": {
        "tipo": "ok",
        "texto": "NITROGÊNIO: 45,2% PARA 71,1%",
        "at": 4.02
      },
      "scene": [
        {
          "at": 0.52,
          "acao": "sumir",
          "alvo": "roda",
          "dur": 0.5
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "roda-fria",
          "dur": 0.9
        },
        {
          "at": 4.46,
          "acao": "destacar",
          "alvo": "roda-fria",
          "dur": 0.8
        }
      ],
      "why": "Temperatura baixa deixa a resposta mais previsível."
    },
    {
      "id": "quente",
      "ordem": 4,
      "narration": "Com temperatura alta, 2, a roleta achata: nitrogênio cai para vinte e oito por cento e banco ganha fatia.",
      "words": [
        {"t": "Com", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "temperatura", "s": 0.52, "e": 1.04, "hl": false},
        {"t": "alta,", "s": 1.08, "e": 1.42, "hl": true},
        {"t": "2,", "s": 1.66, "e": 1.94, "hl": false},
        {"t": "a", "s": 2.18, "e": 2.46, "hl": false},
        {"t": "roleta", "s": 2.5, "e": 2.9, "hl": false},
        {"t": "achata:", "s": 2.94, "e": 3.34, "hl": true},
        {"t": "nitrogênio", "s": 3.58, "e": 4.04, "hl": false},
        {"t": "cai", "s": 4.08, "e": 4.36, "hl": false},
        {"t": "para", "s": 4.4, "e": 4.74, "hl": false},
        {"t": "vinte", "s": 4.78, "e": 5.12, "hl": true},
        {"t": "e", "s": 5.16, "e": 5.44, "hl": false},
        {"t": "oito", "s": 5.48, "e": 5.82, "hl": false},
        {"t": "por", "s": 5.86, "e": 6.14, "hl": false},
        {"t": "cento", "s": 6.18, "e": 6.52, "hl": false},
        {"t": "e", "s": 6.56, "e": 6.84, "hl": false},
        {"t": "banco", "s": 6.88, "e": 7.22, "hl": true},
        {"t": "ganha", "s": 7.26, "e": 7.6, "hl": false},
        {"t": "fatia.", "s": 7.64, "e": 7.98, "hl": false}
      ],
      "dur": 9.18,
      "terminal": {
        "cmd": "softmax(z / 2)[-1]   # banco = 0.013",
        "at": 2.94,
        "dur": 2
      },
      "status": {
        "tipo": "alerta",
        "texto": "BANCO: 0,02% PARA 1,3%",
        "at": 6.88
      },
      "scene": [
        {
          "at": 0.52,
          "acao": "sumir",
          "alvo": "roda-fria",
          "dur": 0.5
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "roda-quente",
          "dur": 0.9
        },
        {
          "at": 6.88,
          "acao": "destacar",
          "alvo": "roda-quente",
          "dur": 0.9
        }
      ],
      "why": "Armadilha comum: temperatura alta dá chance até a palavras improváveis, e o texto pode sair do rumo."
    },
    {
      "id": "topk",
      "ordem": 5,
      "narration": "O top-k corta a roleta: com k igual a três, só as maiores ficam, refeitas para somar cem.",
      "words": [
        {"t": "O", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "top-k", "s": 0.52, "e": 0.8, "hl": true},
        {"t": "corta", "s": 0.84, "e": 1.18, "hl": true},
        {"t": "a", "s": 1.22, "e": 1.5, "hl": false},
        {"t": "roleta:", "s": 1.54, "e": 1.94, "hl": false},
        {"t": "com", "s": 2.18, "e": 2.46, "hl": false},
        {"t": "k", "s": 2.5, "e": 2.78, "hl": false},
        {"t": "igual", "s": 2.82, "e": 3.16, "hl": false},
        {"t": "a", "s": 3.2, "e": 3.48, "hl": false},
        {"t": "três,", "s": 3.52, "e": 3.8, "hl": true},
        {"t": "só", "s": 4.04, "e": 4.32, "hl": false},
        {"t": "as", "s": 4.36, "e": 4.64, "hl": false},
        {"t": "maiores", "s": 4.68, "e": 5.02, "hl": false},
        {"t": "ficam,", "s": 5.06, "e": 5.4, "hl": false},
        {"t": "refeitas", "s": 5.64, "e": 6.04, "hl": true},
        {"t": "para", "s": 6.08, "e": 6.42, "hl": false},
        {"t": "somar", "s": 6.46, "e": 6.8, "hl": false},
        {"t": "cem.", "s": 6.84, "e": 7.12, "hl": false}
      ],
      "dur": 8.32,
      "terminal": {
        "cmd": "q = p[:3] / p[:3].sum()   # 0.515 0.354 0.130",
        "at": 0.84,
        "dur": 2.4
      },
      "status": {
        "tipo": "ok",
        "texto": "RESTAM 3 DE 8 PALAVRAS",
        "at": 2.82
      },
      "scene": [
        {
          "at": 0.84,
          "acao": "sumir",
          "alvo": "roda-quente",
          "dur": 0.5
        },
        {
          "at": 0.84,
          "acao": "aparecer",
          "alvo": "roda-k3",
          "dur": 0.9
        },
        {
          "at": 5.64,
          "acao": "destacar",
          "alvo": "roda-k3",
          "dur": 0.9
        }
      ],
      "why": "O top-k fixa quantos candidatos entram no sorteio."
    },
    {
      "id": "topp",
      "ordem": 6,
      "narration": "O top-p corta pela soma: guarda o menor grupo que chega a noventa por cento. Aqui são quatro palavras.",
      "words": [
        {"t": "O", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "top-p", "s": 0.52, "e": 0.8, "hl": true},
        {"t": "corta", "s": 0.84, "e": 1.18, "hl": false},
        {"t": "pela", "s": 1.22, "e": 1.56, "hl": false},
        {"t": "soma:", "s": 1.6, "e": 1.94, "hl": true},
        {"t": "guarda", "s": 2.18, "e": 2.52, "hl": false},
        {"t": "o", "s": 2.56, "e": 2.84, "hl": false},
        {"t": "menor", "s": 2.88, "e": 3.22, "hl": true},
        {"t": "grupo", "s": 3.26, "e": 3.6, "hl": false},
        {"t": "que", "s": 3.64, "e": 3.92, "hl": false},
        {"t": "chega", "s": 3.96, "e": 4.3, "hl": false},
        {"t": "a", "s": 4.34, "e": 4.62, "hl": false},
        {"t": "noventa", "s": 4.66, "e": 5.06, "hl": false},
        {"t": "por", "s": 5.1, "e": 5.38, "hl": false},
        {"t": "cento.", "s": 5.42, "e": 5.76, "hl": false},
        {"t": "Aqui", "s": 6.2, "e": 6.54, "hl": false},
        {"t": "são", "s": 6.58, "e": 6.86, "hl": false},
        {"t": "quatro", "s": 6.9, "e": 7.24, "hl": true},
        {"t": "palavras.", "s": 7.28, "e": 7.68, "hl": false}
      ],
      "dur": 8.88,
      "terminal": {
        "cmd": "cum = [0.452, 0.763, 0.877, 0.966]",
        "at": 1.6,
        "dur": 2.2
      },
      "status": {
        "tipo": "ok",
        "texto": "4 PALAVRAS SOMAM 96,6%",
        "at": 6.9
      },
      "scene": [
        {
          "at": 0.84,
          "acao": "sumir",
          "alvo": "roda-k3",
          "dur": 0.5
        },
        {
          "at": 0.84,
          "acao": "aparecer",
          "alvo": "roda-p",
          "dur": 0.9
        },
        {
          "at": 1.6,
          "acao": "aparecer",
          "alvo": "acumulado",
          "dur": 0.8
        },
        {
          "at": 6.9,
          "acao": "destacar",
          "alvo": "acumulado",
          "dur": 0.9
        }
      ],
      "why": "O top-p adapta o número de candidatos à confiança do modelo."
    },
    {
      "id": "sorteio",
      "ordem": 7,
      "narration": "A roleta sorteia nitrogênio. Gire outra vez e sai água. Mais uma, e sai luz. Mesmo prompt, respostas diferentes.",
      "words": [
        {"t": "A", "s": 0.2, "e": 0.48, "hl": false},
        {"t": "roleta", "s": 0.52, "e": 0.92, "hl": false},
        {"t": "sorteia", "s": 0.96, "e": 1.3, "hl": true},
        {"t": "nitrogênio.", "s": 1.34, "e": 1.8, "hl": false},
        {"t": "Gire", "s": 2.24, "e": 2.58, "hl": false},
        {"t": "outra", "s": 2.62, "e": 2.96, "hl": false},
        {"t": "vez", "s": 3, "e": 3.28, "hl": false},
        {"t": "e", "s": 3.32, "e": 3.6, "hl": false},
        {"t": "sai", "s": 3.64, "e": 3.92, "hl": false},
        {"t": "água.", "s": 3.96, "e": 4.3, "hl": true},
        {"t": "Mais", "s": 4.74, "e": 5.02, "hl": false},
        {"t": "uma,", "s": 5.06, "e": 5.4, "hl": false},
        {"t": "e", "s": 5.64, "e": 5.92, "hl": false},
        {"t": "sai", "s": 5.96, "e": 6.24, "hl": false},
        {"t": "luz.", "s": 6.28, "e": 6.56, "hl": true},
        {"t": "Mesmo", "s": 7, "e": 7.34, "hl": false},
        {"t": "prompt,", "s": 7.38, "e": 7.66, "hl": false},
        {"t": "respostas", "s": 7.9, "e": 8.3, "hl": false},
        {"t": "diferentes.", "s": 8.34, "e": 8.8, "hl": true}
      ],
      "dur": 10,
      "terminal": {
        "cmd": "k = np.random.choice(len(p), p=q)",
        "at": 0.96,
        "dur": 2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "acumulado",
          "dur": 0.5
        },
        {
          "at": 0.96,
          "acao": "aparecer",
          "alvo": "bola1",
          "dur": 0.5
        },
        {
          "at": 1.34,
          "acao": "aparecer",
          "alvo": "res1",
          "dur": 0.5
        },
        {
          "at": 2.62,
          "acao": "aparecer",
          "alvo": "bola2",
          "dur": 0.5
        },
        {
          "at": 3.96,
          "acao": "aparecer",
          "alvo": "res2",
          "dur": 0.5
        },
        {
          "at": 5.06,
          "acao": "aparecer",
          "alvo": "bola3",
          "dur": 0.5
        },
        {
          "at": 6.28,
          "acao": "aparecer",
          "alvo": "res3",
          "dur": 0.5
        },
        {
          "at": 8.34,
          "acao": "destacar",
          "alvo": "resultados",
          "dur": 0.9
        }
      ],
      "why": "O sorteio é a origem da variação entre respostas do mesmo prompt."
    },
    {
      "id": "uso",
      "ordem": 8,
      "narration": "Para extração, temperatura 0,1 repete nitrogênio em noventa e cinco por cento. Para criar, suba. Guardrails validam a saída.",
      "words": [
        {"t": "Para", "s": 0.2, "e": 0.54, "hl": false},
        {"t": "extração,", "s": 0.58, "e": 0.98, "hl": true},
        {"t": "temperatura", "s": 1.22, "e": 1.74, "hl": false},
        {"t": "0,1", "s": 1.78, "e": 2.06, "hl": false},
        {"t": "repete", "s": 2.1, "e": 2.5, "hl": true},
        {"t": "nitrogênio", "s": 2.54, "e": 3, "hl": false},
        {"t": "em", "s": 3.04, "e": 3.32, "hl": false},
        {"t": "noventa", "s": 3.36, "e": 3.76, "hl": false},
        {"t": "e", "s": 3.8, "e": 4.08, "hl": false},
        {"t": "cinco", "s": 4.12, "e": 4.46, "hl": false},
        {"t": "por", "s": 4.5, "e": 4.78, "hl": false},
        {"t": "cento.", "s": 4.82, "e": 5.16, "hl": false},
        {"t": "Para", "s": 5.6, "e": 5.94, "hl": false},
        {"t": "criar,", "s": 5.98, "e": 6.26, "hl": true},
        {"t": "suba.", "s": 6.5, "e": 6.84, "hl": false},
        {"t": "Guardrails", "s": 7.28, "e": 7.62, "hl": true},
        {"t": "validam", "s": 7.66, "e": 8.06, "hl": false},
        {"t": "a", "s": 8.1, "e": 8.38, "hl": false},
        {"t": "saída.", "s": 8.42, "e": 8.76, "hl": false}
      ],
      "dur": 9.96,
      "terminal": {
        "cmd": "llm(prompt, temperature=0.1)",
        "at": 0.2,
        "dur": 2
      },
      "status": {
        "tipo": "ok",
        "texto": "T BAIXA: RESPOSTA REPETÍVEL",
        "at": 2.1
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "roda-p",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "ponteiro",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "bola1",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "bola2",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "bola3",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "resultados",
          "dur": 0.5
        },
        {
          "at": 0.58,
          "acao": "aparecer",
          "alvo": "cartao-baixa",
          "dur": 0.8
        },
        {
          "at": 5.98,
          "acao": "aparecer",
          "alvo": "cartao-alta",
          "dur": 0.8
        },
        {
          "at": 7.28,
          "acao": "aparecer",
          "alvo": "guardrail",
          "dur": 0.8
        }
      ],
      "why": "Ajuste a temperatura à tarefa e valide a saída em qualquer caso."
    }
  ],
  "outro": {
    "dur": 8.18,
    "narration": "Nota, softmax, temperatura, corte e sorteio: assim nasce cada token. Agora mexa no laboratório.",
    "words": [
      {"t": "Nota,", "s": 0.2, "e": 0.54, "hl": false},
      {"t": "softmax,", "s": 0.78, "e": 1.12, "hl": true},
      {"t": "temperatura,", "s": 1.36, "e": 1.88, "hl": false},
      {"t": "corte", "s": 2.12, "e": 2.46, "hl": false},
      {"t": "e", "s": 2.5, "e": 2.78, "hl": false},
      {"t": "sorteio:", "s": 2.82, "e": 3.16, "hl": false},
      {"t": "assim", "s": 3.4, "e": 3.74, "hl": false},
      {"t": "nasce", "s": 3.78, "e": 4.12, "hl": false},
      {"t": "cada", "s": 4.16, "e": 4.5, "hl": false},
      {"t": "token.", "s": 4.54, "e": 4.88, "hl": true},
      {"t": "Agora", "s": 5.32, "e": 5.72, "hl": false},
      {"t": "mexa", "s": 5.76, "e": 6.1, "hl": false},
      {"t": "no", "s": 6.14, "e": 6.42, "hl": false},
      {"t": "laboratório.", "s": 6.46, "e": 6.98, "hl": true}
    ],
    "scene": [
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "cartao-baixa",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "cartao-alta",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "guardrail",
        "dur": 0.5
      },
      {
        "at": 0.78,
        "acao": "aparecer",
        "alvo": "roda",
        "dur": 0.9
      },
      {
        "at": 0.78,
        "acao": "aparecer",
        "alvo": "ponteiro",
        "dur": 0.6
      },
      {
        "at": 6.46,
        "acao": "destacar",
        "alvo": "guia-braco",
        "dur": 1.2
      }
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "import numpy as np\ndef amostrar(logits, T=0.7, k=5, p=0.9):\n    z = np.array(logits) / T\n    e = np.exp(z - z.max()); pr = e / e.sum()\n    o = np.argsort(-pr)[:k]\n    c = np.cumsum(pr[o])\n    o = o[:np.searchsorted(c, p) + 1]\n    q = np.zeros_like(pr); q[o] = pr[o]\n    q /= q.sum()\n    return np.random.choice(len(q), p=q)",
      "at": 1,
      "dur": 5.5
    }
  }
};
