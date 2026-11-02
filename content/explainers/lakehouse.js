/* Roteiro do mini-video "Lakehouse e arquitetura medalhao" (metafora: mineracao com pedra bruta, peneira e pepita = bronze, prata e ouro). Tempos em segundos desde o inicio de cada peca.
   Numeros calculados por script com a mesma logica do laboratorio (prog/lakehouse.js): bronze 11 linhas, 2 duplicadas, 2 nulas, 7 datas fora do padrao, 2 talhoes fora do padrao (nao narrado);
   prata (dedupe 9 -> sem nulos) 7 linhas; ouro media T1 64, T2 59.5, T3 72; armadilha: nulo preenchido com 0 leva T2 a 39.7. */
window.Explainers = window.Explainers || {};
Explainers["lakehouse"] = {
  "meta": {
    "id": "lakehouse",
    "categoria": "PROGRAMAÇÃO E DADOS",
    "area": "prog",
    "titulo": "Lakehouse e arquitetura medalhão",
    "duracao": 74,
    "cena": "lakehouse"
  },
  "pieces": [
    {
      "id": "pergunta",
      "ordem": 1,
      "narration": "O dado chega bagunçado de dez fontes. Onde ele fica guardado, e quando passa a merecer confiança?",
      "words": [
        {
          "t": "O",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "dado",
          "s": 0.52,
          "e": 0.86,
          "hl": false
        },
        {
          "t": "chega",
          "s": 0.9,
          "e": 1.24,
          "hl": false
        },
        {
          "t": "bagunçado",
          "s": 1.28,
          "e": 1.74,
          "hl": true
        },
        {
          "t": "de",
          "s": 1.78,
          "e": 2.06,
          "hl": false
        },
        {
          "t": "dez",
          "s": 2.1,
          "e": 2.38,
          "hl": false
        },
        {
          "t": "fontes.",
          "s": 2.42,
          "e": 2.76,
          "hl": true
        },
        {
          "t": "Onde",
          "s": 3.2,
          "e": 3.54,
          "hl": false
        },
        {
          "t": "ele",
          "s": 3.58,
          "e": 3.92,
          "hl": false
        },
        {
          "t": "fica",
          "s": 3.96,
          "e": 4.3,
          "hl": false
        },
        {
          "t": "guardado,",
          "s": 4.34,
          "e": 4.74,
          "hl": true
        },
        {
          "t": "e",
          "s": 4.98,
          "e": 5.26,
          "hl": false
        },
        {
          "t": "quando",
          "s": 5.3,
          "e": 5.64,
          "hl": false
        },
        {
          "t": "passa",
          "s": 5.68,
          "e": 6.02,
          "hl": false
        },
        {
          "t": "a",
          "s": 6.06,
          "e": 6.34,
          "hl": false
        },
        {
          "t": "merecer",
          "s": 6.38,
          "e": 6.78,
          "hl": false
        },
        {
          "t": "confiança?",
          "s": 6.82,
          "e": 7.22,
          "hl": true
        }
      ],
      "dur": 8.42,
      "status": {
        "tipo": "alerta",
        "texto": "SEM GARANTIA DE QUALIDADE",
        "at": 6.38
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "guia",
          "dur": 0.7
        },
        {
          "at": 1.28,
          "acao": "aparecer",
          "alvo": "pilha",
          "dur": 0.8
        },
        {
          "at": 2.1,
          "acao": "aparecer",
          "alvo": "fontes",
          "dur": 0.9
        },
        {
          "at": 3.2,
          "acao": "aparecer",
          "alvo": "interrogacao",
          "dur": 0.6
        }
      ],
      "why": "Um lake guarda arquivos sem garantias: nada impede duplicados."
    },
    {
      "id": "mineracao",
      "ordem": 2,
      "narration": "Pense numa mineração: pedra bruta, peneira e pepita. São as camadas bronze, prata e ouro.",
      "words": [
        {
          "t": "Pense",
          "s": 0.2,
          "e": 0.54,
          "hl": false
        },
        {
          "t": "numa",
          "s": 0.58,
          "e": 0.92,
          "hl": false
        },
        {
          "t": "mineração:",
          "s": 0.96,
          "e": 1.42,
          "hl": true
        },
        {
          "t": "pedra",
          "s": 1.66,
          "e": 2,
          "hl": false
        },
        {
          "t": "bruta,",
          "s": 2.04,
          "e": 2.38,
          "hl": false
        },
        {
          "t": "peneira",
          "s": 2.62,
          "e": 3.02,
          "hl": false
        },
        {
          "t": "e",
          "s": 3.06,
          "e": 3.34,
          "hl": false
        },
        {
          "t": "pepita.",
          "s": 3.38,
          "e": 3.78,
          "hl": false
        },
        {
          "t": "São",
          "s": 4.22,
          "e": 4.5,
          "hl": false
        },
        {
          "t": "as",
          "s": 4.54,
          "e": 4.82,
          "hl": false
        },
        {
          "t": "camadas",
          "s": 4.86,
          "e": 5.26,
          "hl": false
        },
        {
          "t": "bronze,",
          "s": 5.3,
          "e": 5.64,
          "hl": true
        },
        {
          "t": "prata",
          "s": 5.88,
          "e": 6.22,
          "hl": true
        },
        {
          "t": "e",
          "s": 6.26,
          "e": 6.54,
          "hl": false
        },
        {
          "t": "ouro.",
          "s": 6.58,
          "e": 6.92,
          "hl": true
        }
      ],
      "dur": 8.12,
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "pilha",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "fontes",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "interrogacao",
          "dur": 0.5
        },
        {
          "at": 2.04,
          "acao": "aparecer",
          "alvo": "est-bronze",
          "dur": 0.8
        },
        {
          "at": 2.62,
          "acao": "aparecer",
          "alvo": "est-prata",
          "dur": 0.8
        },
        {
          "at": 3.38,
          "acao": "aparecer",
          "alvo": "est-ouro",
          "dur": 0.8
        },
        {
          "at": 4.86,
          "acao": "desenhar",
          "alvo": "seta-fluxo",
          "dur": 0.9
        },
        {
          "at": 5.3,
          "acao": "aparecer",
          "alvo": "rot-bronze",
          "dur": 0.5
        },
        {
          "at": 5.88,
          "acao": "aparecer",
          "alvo": "rot-prata",
          "dur": 0.5
        },
        {
          "at": 6.58,
          "acao": "aparecer",
          "alvo": "rot-ouro",
          "dur": 0.5
        }
      ],
      "why": "O dado sobe de camada à medida que ganha confiança."
    },
    {
      "id": "delta",
      "ordem": 3,
      "narration": "O lakehouse põe tabelas sobre arquivos abertos. O Delta é Parquet mais um log, com ACID e viagem no tempo.",
      "words": [
        {
          "t": "O",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "lakehouse",
          "s": 0.52,
          "e": 0.98,
          "hl": true
        },
        {
          "t": "põe",
          "s": 1.02,
          "e": 1.3,
          "hl": false
        },
        {
          "t": "tabelas",
          "s": 1.34,
          "e": 1.74,
          "hl": false
        },
        {
          "t": "sobre",
          "s": 1.78,
          "e": 2.12,
          "hl": false
        },
        {
          "t": "arquivos",
          "s": 2.16,
          "e": 2.56,
          "hl": false
        },
        {
          "t": "abertos.",
          "s": 2.6,
          "e": 3,
          "hl": false
        },
        {
          "t": "O",
          "s": 3.44,
          "e": 3.72,
          "hl": false
        },
        {
          "t": "Delta",
          "s": 3.76,
          "e": 4.1,
          "hl": false
        },
        {
          "t": "é",
          "s": 4.14,
          "e": 4.42,
          "hl": false
        },
        {
          "t": "Parquet",
          "s": 4.46,
          "e": 4.8,
          "hl": true
        },
        {
          "t": "mais",
          "s": 4.84,
          "e": 5.12,
          "hl": false
        },
        {
          "t": "um",
          "s": 5.16,
          "e": 5.44,
          "hl": false
        },
        {
          "t": "log,",
          "s": 5.48,
          "e": 5.76,
          "hl": true
        },
        {
          "t": "com",
          "s": 6,
          "e": 6.28,
          "hl": false
        },
        {
          "t": "ACID",
          "s": 6.32,
          "e": 6.66,
          "hl": true
        },
        {
          "t": "e",
          "s": 6.7,
          "e": 6.98,
          "hl": false
        },
        {
          "t": "viagem",
          "s": 7.02,
          "e": 7.36,
          "hl": false
        },
        {
          "t": "no",
          "s": 7.4,
          "e": 7.68,
          "hl": false
        },
        {
          "t": "tempo.",
          "s": 7.72,
          "e": 8.06,
          "hl": false
        }
      ],
      "dur": 9.26,
      "status": {
        "tipo": "ok",
        "texto": "DELTA = PARQUET + LOG DE TRANSAÇÕES",
        "at": 5.48
      },
      "scene": [
        {
          "at": 2.16,
          "acao": "aparecer",
          "alvo": "arquivos",
          "dur": 0.7
        },
        {
          "at": 4.46,
          "acao": "aparecer",
          "alvo": "parquet",
          "dur": 0.7
        },
        {
          "at": 5.48,
          "acao": "aparecer",
          "alvo": "log",
          "dur": 0.7
        },
        {
          "at": 6.32,
          "acao": "aparecer",
          "alvo": "garantias",
          "dur": 0.8
        }
      ],
      "why": "Arquivos abertos, com transações e esquema por cima."
    },
    {
      "id": "bronze",
      "ordem": 4,
      "narration": "Na bronze o dado fica como chegou: 11 linhas, 2 duplicadas, 2 nulas e 7 datas fora do padrão.",
      "words": [
        {
          "t": "Na",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "bronze",
          "s": 0.52,
          "e": 0.86,
          "hl": true
        },
        {
          "t": "o",
          "s": 0.9,
          "e": 1.18,
          "hl": false
        },
        {
          "t": "dado",
          "s": 1.22,
          "e": 1.56,
          "hl": false
        },
        {
          "t": "fica",
          "s": 1.6,
          "e": 1.94,
          "hl": false
        },
        {
          "t": "como",
          "s": 1.98,
          "e": 2.32,
          "hl": false
        },
        {
          "t": "chegou:",
          "s": 2.36,
          "e": 2.7,
          "hl": true
        },
        {
          "t": "11",
          "s": 2.94,
          "e": 3.22,
          "hl": false
        },
        {
          "t": "linhas,",
          "s": 3.26,
          "e": 3.6,
          "hl": false
        },
        {
          "t": "2",
          "s": 3.84,
          "e": 4.12,
          "hl": false
        },
        {
          "t": "duplicadas,",
          "s": 4.16,
          "e": 4.62,
          "hl": true
        },
        {
          "t": "2",
          "s": 4.86,
          "e": 5.14,
          "hl": false
        },
        {
          "t": "nulas",
          "s": 5.18,
          "e": 5.52,
          "hl": true
        },
        {
          "t": "e",
          "s": 5.56,
          "e": 5.84,
          "hl": false
        },
        {
          "t": "7",
          "s": 5.88,
          "e": 6.16,
          "hl": false
        },
        {
          "t": "datas",
          "s": 6.2,
          "e": 6.54,
          "hl": false
        },
        {
          "t": "fora",
          "s": 6.58,
          "e": 6.92,
          "hl": false
        },
        {
          "t": "do",
          "s": 6.96,
          "e": 7.24,
          "hl": false
        },
        {
          "t": "padrão.",
          "s": 7.28,
          "e": 7.62,
          "hl": false
        }
      ],
      "dur": 8.82,
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "delta",
          "dur": 0.5
        },
        {
          "at": 0.52,
          "acao": "destacar",
          "alvo": "est-bronze",
          "dur": 0.8
        },
        {
          "at": 2.94,
          "acao": "aparecer",
          "alvo": "badge-bronze",
          "dur": 0.6
        },
        {
          "at": 4.16,
          "acao": "aparecer",
          "alvo": "d-dup",
          "dur": 0.6
        },
        {
          "at": 5.18,
          "acao": "aparecer",
          "alvo": "d-nulo",
          "dur": 0.6
        },
        {
          "at": 5.88,
          "acao": "aparecer",
          "alvo": "d-data",
          "dur": 0.6
        },
        {
          "at": 7.28,
          "acao": "aparecer",
          "alvo": "d-talhao",
          "dur": 0.6
        }
      ],
      "why": "A bronze preserva o original, para auditar e reprocessar."
    },
    {
      "id": "prata",
      "ordem": 5,
      "narration": "Na prata, uma etapa por defeito: remove duplicados, padroniza talhão e data, descarta nulos. Sobram 7 linhas.",
      "words": [
        {
          "t": "Na",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "prata,",
          "s": 0.52,
          "e": 0.86,
          "hl": true
        },
        {
          "t": "uma",
          "s": 1.1,
          "e": 1.44,
          "hl": false
        },
        {
          "t": "etapa",
          "s": 1.48,
          "e": 1.88,
          "hl": false
        },
        {
          "t": "por",
          "s": 1.92,
          "e": 2.2,
          "hl": false
        },
        {
          "t": "defeito:",
          "s": 2.24,
          "e": 2.64,
          "hl": false
        },
        {
          "t": "remove",
          "s": 2.88,
          "e": 3.28,
          "hl": false
        },
        {
          "t": "duplicados,",
          "s": 3.32,
          "e": 3.78,
          "hl": true
        },
        {
          "t": "padroniza",
          "s": 4.02,
          "e": 4.48,
          "hl": true
        },
        {
          "t": "talhão",
          "s": 4.52,
          "e": 4.86,
          "hl": false
        },
        {
          "t": "e",
          "s": 4.9,
          "e": 5.18,
          "hl": false
        },
        {
          "t": "data,",
          "s": 5.22,
          "e": 5.56,
          "hl": false
        },
        {
          "t": "descarta",
          "s": 5.8,
          "e": 6.2,
          "hl": false
        },
        {
          "t": "nulos.",
          "s": 6.24,
          "e": 6.58,
          "hl": true
        },
        {
          "t": "Sobram",
          "s": 7.02,
          "e": 7.36,
          "hl": false
        },
        {
          "t": "7",
          "s": 7.4,
          "e": 7.68,
          "hl": false
        },
        {
          "t": "linhas.",
          "s": 7.72,
          "e": 8.06,
          "hl": false
        }
      ],
      "dur": 9.26,
      "status": {
        "tipo": "ok",
        "texto": "PRATA LIMPA: 7 LINHAS",
        "at": 7.4
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "det-bronze",
          "dur": 0.5
        },
        {
          "at": 0.52,
          "acao": "destacar",
          "alvo": "est-prata",
          "dur": 0.8
        },
        {
          "at": 2.88,
          "acao": "aparecer",
          "alvo": "e-dup",
          "dur": 0.6
        },
        {
          "at": 4.02,
          "acao": "aparecer",
          "alvo": "e-pad",
          "dur": 0.6
        },
        {
          "at": 5.8,
          "acao": "aparecer",
          "alvo": "e-nulo",
          "dur": 0.6
        },
        {
          "at": 7.4,
          "acao": "aparecer",
          "alvo": "badge-prata",
          "dur": 0.6
        }
      ],
      "why": "Na prata se limpa e valida, antes de qualquer conta."
    },
    {
      "id": "ouro",
      "ordem": 6,
      "narration": "A ouro agrega a prata para o negócio: a média por talhão dá T1 64, T2 59,5 e T3 72.",
      "words": [
        {
          "t": "A",
          "s": 0.2,
          "e": 0.48,
          "hl": false
        },
        {
          "t": "ouro",
          "s": 0.52,
          "e": 0.86,
          "hl": true
        },
        {
          "t": "agrega",
          "s": 0.9,
          "e": 1.3,
          "hl": true
        },
        {
          "t": "a",
          "s": 1.34,
          "e": 1.62,
          "hl": false
        },
        {
          "t": "prata",
          "s": 1.66,
          "e": 2,
          "hl": false
        },
        {
          "t": "para",
          "s": 2.04,
          "e": 2.38,
          "hl": false
        },
        {
          "t": "o",
          "s": 2.42,
          "e": 2.7,
          "hl": false
        },
        {
          "t": "negócio:",
          "s": 2.74,
          "e": 3.14,
          "hl": false
        },
        {
          "t": "a",
          "s": 3.38,
          "e": 3.66,
          "hl": false
        },
        {
          "t": "média",
          "s": 3.7,
          "e": 4.04,
          "hl": true
        },
        {
          "t": "por",
          "s": 4.08,
          "e": 4.36,
          "hl": false
        },
        {
          "t": "talhão",
          "s": 4.4,
          "e": 4.74,
          "hl": true
        },
        {
          "t": "dá",
          "s": 4.78,
          "e": 5.06,
          "hl": false
        },
        {
          "t": "T1",
          "s": 5.1,
          "e": 5.38,
          "hl": false
        },
        {
          "t": "64,",
          "s": 5.42,
          "e": 5.7,
          "hl": false
        },
        {
          "t": "T2",
          "s": 5.94,
          "e": 6.22,
          "hl": false
        },
        {
          "t": "59,5",
          "s": 6.26,
          "e": 6.54,
          "hl": false
        },
        {
          "t": "e",
          "s": 6.58,
          "e": 6.86,
          "hl": false
        },
        {
          "t": "T3",
          "s": 6.9,
          "e": 7.18,
          "hl": false
        },
        {
          "t": "72.",
          "s": 7.22,
          "e": 7.5,
          "hl": false
        }
      ],
      "dur": 8.7,
      "status": {
        "tipo": "ok",
        "texto": "MÉDIA POR TALHÃO EM SACAS/HA",
        "at": 4.4
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "det-prata",
          "dur": 0.5
        },
        {
          "at": 0.52,
          "acao": "destacar",
          "alvo": "est-ouro",
          "dur": 0.8
        },
        {
          "at": 3.7,
          "acao": "aparecer",
          "alvo": "badge-ouro",
          "dur": 0.6
        },
        {
          "at": 5.1,
          "acao": "aparecer",
          "alvo": "ouro-t1",
          "dur": 0.6
        },
        {
          "at": 5.94,
          "acao": "aparecer",
          "alvo": "ouro-t2",
          "dur": 0.6
        },
        {
          "at": 6.9,
          "acao": "aparecer",
          "alvo": "ouro-t3",
          "dur": 0.6
        }
      ],
      "why": "A ouro responde à pergunta do negócio, sobre dado limpo."
    },
    {
      "id": "armadilha",
      "ordem": 7,
      "narration": "Armadilha: preencher o nulo com 0. A média do T2 cai de 59,5 para 39,7.",
      "words": [
        {
          "t": "Armadilha:",
          "s": 0.2,
          "e": 0.66,
          "hl": true
        },
        {
          "t": "preencher",
          "s": 0.9,
          "e": 1.24,
          "hl": false
        },
        {
          "t": "o",
          "s": 1.28,
          "e": 1.56,
          "hl": false
        },
        {
          "t": "nulo",
          "s": 1.6,
          "e": 1.94,
          "hl": true
        },
        {
          "t": "com",
          "s": 1.98,
          "e": 2.26,
          "hl": false
        },
        {
          "t": "0.",
          "s": 2.3,
          "e": 2.58,
          "hl": false
        },
        {
          "t": "A",
          "s": 3.02,
          "e": 3.3,
          "hl": false
        },
        {
          "t": "média",
          "s": 3.34,
          "e": 3.68,
          "hl": false
        },
        {
          "t": "do",
          "s": 3.72,
          "e": 4,
          "hl": false
        },
        {
          "t": "T2",
          "s": 4.04,
          "e": 4.32,
          "hl": false
        },
        {
          "t": "cai",
          "s": 4.36,
          "e": 4.64,
          "hl": true
        },
        {
          "t": "de",
          "s": 4.68,
          "e": 4.96,
          "hl": false
        },
        {
          "t": "59,5",
          "s": 5,
          "e": 5.28,
          "hl": false
        },
        {
          "t": "para",
          "s": 5.32,
          "e": 5.66,
          "hl": false
        },
        {
          "t": "39,7.",
          "s": 5.7,
          "e": 5.98,
          "hl": true
        }
      ],
      "dur": 7.18,
      "terminal": {
        "cmd": "(58 + 0 + 61) / 3   # 39.7",
        "at": 1.6,
        "dur": 2
      },
      "status": {
        "tipo": "erro",
        "texto": "T2: 59,5 CAI PARA 39,7",
        "at": 5.7
      },
      "scene": [
        {
          "at": 4.36,
          "acao": "cor",
          "alvo": "barra-t2",
          "dur": 0.7,
          "para": {
            "fill": "--rule-soft"
          }
        },
        {
          "at": 5.7,
          "acao": "aparecer",
          "alvo": "t2-zero",
          "dur": 0.8
        }
      ],
      "why": "Zero é um valor. Nulo é ausência de valor, e a média muda."
    },
    {
      "id": "plataforma",
      "ordem": 8,
      "narration": "Sensores, estações e colheitadeiras chegam na bronze, e a ouro entrega a produtividade média por talhão.",
      "words": [
        {
          "t": "Sensores,",
          "s": 0.2,
          "e": 0.6,
          "hl": true
        },
        {
          "t": "estações",
          "s": 0.84,
          "e": 1.24,
          "hl": false
        },
        {
          "t": "e",
          "s": 1.28,
          "e": 1.56,
          "hl": false
        },
        {
          "t": "colheitadeiras",
          "s": 1.6,
          "e": 2.12,
          "hl": false
        },
        {
          "t": "chegam",
          "s": 2.16,
          "e": 2.5,
          "hl": false
        },
        {
          "t": "na",
          "s": 2.54,
          "e": 2.82,
          "hl": false
        },
        {
          "t": "bronze,",
          "s": 2.86,
          "e": 3.2,
          "hl": true
        },
        {
          "t": "e",
          "s": 3.44,
          "e": 3.72,
          "hl": false
        },
        {
          "t": "a",
          "s": 3.76,
          "e": 4.04,
          "hl": false
        },
        {
          "t": "ouro",
          "s": 4.08,
          "e": 4.42,
          "hl": true
        },
        {
          "t": "entrega",
          "s": 4.46,
          "e": 4.86,
          "hl": false
        },
        {
          "t": "a",
          "s": 4.9,
          "e": 5.18,
          "hl": false
        },
        {
          "t": "produtividade",
          "s": 5.22,
          "e": 5.77,
          "hl": false
        },
        {
          "t": "média",
          "s": 5.81,
          "e": 6.15,
          "hl": false
        },
        {
          "t": "por",
          "s": 6.19,
          "e": 6.47,
          "hl": false
        },
        {
          "t": "talhão.",
          "s": 6.51,
          "e": 6.85,
          "hl": true
        }
      ],
      "dur": 8.05,
      "status": {
        "tipo": "ok",
        "texto": "FABRIC E DATABRICKS USAM ESSA IDEIA",
        "at": 6.51
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "det-ouro",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "src-solo",
          "dur": 0.6
        },
        {
          "at": 0.84,
          "acao": "aparecer",
          "alvo": "src-estacao",
          "dur": 0.6
        },
        {
          "at": 1.6,
          "acao": "aparecer",
          "alvo": "src-colheit",
          "dur": 0.6
        },
        {
          "at": 2.16,
          "acao": "desenhar",
          "alvo": "src-seta",
          "dur": 0.9
        },
        {
          "at": 2.86,
          "acao": "destacar",
          "alvo": "est-bronze",
          "dur": 0.8
        },
        {
          "at": 4.08,
          "acao": "destacar",
          "alvo": "est-ouro",
          "dur": 0.8
        },
        {
          "at": 5.22,
          "acao": "aparecer",
          "alvo": "painel",
          "dur": 0.7
        }
      ],
      "why": "É o desenho padrão de uma plataforma de dados."
    }
  ],
  "outro": {
    "dur": 6.2,
    "narration": "Bronze guarda, prata limpa, ouro responde. Agora mexa no laboratório.",
    "words": [
      {
        "t": "Bronze",
        "s": 0.2,
        "e": 0.54,
        "hl": true
      },
      {
        "t": "guarda,",
        "s": 0.58,
        "e": 0.92,
        "hl": false
      },
      {
        "t": "prata",
        "s": 1.16,
        "e": 1.5,
        "hl": true
      },
      {
        "t": "limpa,",
        "s": 1.54,
        "e": 1.88,
        "hl": false
      },
      {
        "t": "ouro",
        "s": 2.12,
        "e": 2.46,
        "hl": true
      },
      {
        "t": "responde.",
        "s": 2.5,
        "e": 2.9,
        "hl": false
      },
      {
        "t": "Agora",
        "s": 3.34,
        "e": 3.74,
        "hl": false
      },
      {
        "t": "mexa",
        "s": 3.78,
        "e": 4.12,
        "hl": false
      },
      {
        "t": "no",
        "s": 4.16,
        "e": 4.44,
        "hl": false
      },
      {
        "t": "laboratório.",
        "s": 4.48,
        "e": 5,
        "hl": true
      }
    ],
    "scene": [
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "pipeline",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "aparecer",
        "alvo": "mini",
        "dur": 0.9
      },
      {
        "at": 4.48,
        "acao": "destacar",
        "alvo": "guia-braco",
        "dur": 1
      }
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "prata = (bronze\n  .drop_duplicates(\"id\")\n  .dropna(subset=[\"prod\"]))\nouro = (prata\n  .groupby(\"talhao\")[\"prod\"]\n  .mean())",
      "at": 0.58,
      "dur": 5
    }
  }
};
