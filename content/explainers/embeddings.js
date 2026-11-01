/* Roteiro do mini-video "Vetores, embeddings e busca" (metafora: mapa de cidade onde significados parecidos moram no mesmo bairro). Tempos em segundos desde o inicio de cada peca. */
window.Explainers = window.Explainers || {};
Explainers.embeddings = {
  "meta": {
    "id": "embeddings",
    "categoria": "MACHINE LEARNING",
    "area": "ml",
    "titulo": "Vetores, embeddings e busca",
    "duracao": 76,
    "cena": "embeddings"
  },
  "pieces": [
    {
      "id": "palavras",
      "ordem": 1,
      "narration": "Alguém pergunta como achar o parágrafo certo, e o trecho que responde usa outras palavras. Em comum, zero.",
      "words": [
        {"t":"Alguém","s":0.2,"e":0.54,"hl":false},
        {"t":"pergunta","s":0.58,"e":0.98,"hl":true},
        {"t":"como","s":1.02,"e":1.36,"hl":false},
        {"t":"achar","s":1.4,"e":1.74,"hl":false},
        {"t":"o","s":1.78,"e":2.06,"hl":false},
        {"t":"parágrafo","s":2.1,"e":2.56,"hl":false},
        {"t":"certo,","s":2.6,"e":2.94,"hl":false},
        {"t":"e","s":3.18,"e":3.46,"hl":false},
        {"t":"o","s":3.5,"e":3.78,"hl":false},
        {"t":"trecho","s":3.82,"e":4.16,"hl":false},
        {"t":"que","s":4.2,"e":4.48,"hl":false},
        {"t":"responde","s":4.52,"e":4.92,"hl":false},
        {"t":"usa","s":4.96,"e":5.3,"hl":false},
        {"t":"outras","s":5.34,"e":5.68,"hl":true},
        {"t":"palavras.","s":5.72,"e":6.12,"hl":true},
        {"t":"Em","s":6.56,"e":6.84,"hl":false},
        {"t":"comum,","s":6.88,"e":7.22,"hl":false},
        {"t":"zero.","s":7.46,"e":7.8,"hl":true}
      ],
      "dur": 9,
      "terminal": {
        "cmd": "len(set(q) & set(d))   # 0 palavras",
        "at": 0.2,
        "dur": 2.2
      },
      "status": {
        "tipo": "erro",
        "texto": "BUSCA POR PALAVRA FALHOU",
        "at": 7.46
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
          "alvo": "q-card",
          "dur": 0.7
        },
        {
          "at": 3.82,
          "acao": "aparecer",
          "alvo": "d-card",
          "dur": 0.7
        },
        {
          "at": 5.34,
          "acao": "desenhar",
          "alvo": "ponte",
          "dur": 1.1
        },
        {
          "at": 7.46,
          "acao": "aparecer",
          "alvo": "zero",
          "dur": 0.7
        },
        {
          "at": 7.46,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        }
      ],
      "why": "A busca por palavra exata falha quando o texto muda."
    },
    {
      "id": "vetores",
      "ordem": 2,
      "narration": "Um modelo de embedding transforma cada texto em dois números, as coordenadas de um ponto no mapa.",
      "words": [
        {"t":"Um","s":0.2,"e":0.48,"hl":false},
        {"t":"modelo","s":0.52,"e":0.92,"hl":false},
        {"t":"de","s":0.96,"e":1.24,"hl":false},
        {"t":"embedding","s":1.28,"e":1.68,"hl":true},
        {"t":"transforma","s":1.72,"e":2.12,"hl":false},
        {"t":"cada","s":2.16,"e":2.5,"hl":false},
        {"t":"texto","s":2.54,"e":2.88,"hl":false},
        {"t":"em","s":2.92,"e":3.2,"hl":false},
        {"t":"dois","s":3.24,"e":3.52,"hl":false},
        {"t":"números,","s":3.56,"e":3.96,"hl":true},
        {"t":"as","s":4.2,"e":4.48,"hl":false},
        {"t":"coordenadas","s":4.52,"e":4.98,"hl":true},
        {"t":"de","s":5.02,"e":5.3,"hl":false},
        {"t":"um","s":5.34,"e":5.62,"hl":false},
        {"t":"ponto","s":5.66,"e":6,"hl":true},
        {"t":"no","s":6.04,"e":6.32,"hl":false},
        {"t":"mapa.","s":6.36,"e":6.7,"hl":false}
      ],
      "dur": 7.9,
      "terminal": {
        "cmd": "emb(\"Tabelas Delta\")   # [0.8, -0.4]",
        "at": 0.2,
        "dur": 2.2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "q-card",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "d-card",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "ponte",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "zero",
          "dur": 0.5
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "ex-card",
          "dur": 0.7
        },
        {
          "at": 1.28,
          "acao": "desenhar",
          "alvo": "ex-seta1",
          "dur": 0.5
        },
        {
          "at": 1.28,
          "acao": "aparecer",
          "alvo": "ex-modelo",
          "dur": 0.7
        },
        {
          "at": 1.72,
          "acao": "desenhar",
          "alvo": "ex-seta2",
          "dur": 0.5
        },
        {
          "at": 3.56,
          "acao": "aparecer",
          "alvo": "ex-vetor",
          "dur": 0.7
        },
        {
          "at": 4.52,
          "acao": "aparecer",
          "alvo": "mapa",
          "dur": 0.8
        },
        {
          "at": 5.66,
          "acao": "aparecer",
          "alvo": "p-delta",
          "dur": 0.7
        },
        {
          "at": 5.66,
          "acao": "destacar",
          "alvo": "p-delta",
          "dur": 0.9
        },
        {
          "at": 6.36,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        }
      ],
      "why": "Um vetor é uma lista de números que vira endereço."
    },
    {
      "id": "bairros",
      "ordem": 3,
      "narration": "Assuntos parecidos moram no mesmo bairro: Delta e Power BI ficam a 0,39, e Adubação está a 1,81 de Delta.",
      "words": [
        {"t":"Assuntos","s":0.2,"e":0.6,"hl":false},
        {"t":"parecidos","s":0.64,"e":1.1,"hl":true},
        {"t":"moram","s":1.14,"e":1.48,"hl":false},
        {"t":"no","s":1.52,"e":1.8,"hl":false},
        {"t":"mesmo","s":1.84,"e":2.18,"hl":false},
        {"t":"bairro:","s":2.22,"e":2.56,"hl":true},
        {"t":"Delta","s":2.8,"e":3.14,"hl":false},
        {"t":"e","s":3.18,"e":3.46,"hl":false},
        {"t":"Power","s":3.5,"e":3.84,"hl":false},
        {"t":"BI","s":3.88,"e":4.16,"hl":false},
        {"t":"ficam","s":4.2,"e":4.54,"hl":false},
        {"t":"a","s":4.58,"e":4.86,"hl":false},
        {"t":"0,39,","s":4.9,"e":5.18,"hl":true},
        {"t":"e","s":5.42,"e":5.7,"hl":false},
        {"t":"Adubação","s":5.74,"e":6.2,"hl":false},
        {"t":"está","s":6.24,"e":6.58,"hl":false},
        {"t":"a","s":6.62,"e":6.9,"hl":false},
        {"t":"1,81","s":6.94,"e":7.22,"hl":true},
        {"t":"de","s":7.26,"e":7.54,"hl":false},
        {"t":"Delta.","s":7.58,"e":7.92,"hl":false}
      ],
      "dur": 9.12,
      "terminal": {
        "cmd": "np.linalg.norm(delta - bi)   # 0.39",
        "at": 0.2,
        "dur": 2.2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "ex-card",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "ex-seta1",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "ex-modelo",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "ex-seta2",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "ex-vetor",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "p-adub",
          "dur": 0.5
        },
        {
          "at": 0.64,
          "acao": "aparecer",
          "alvo": "p-irrig",
          "dur": 0.5
        },
        {
          "at": 1.14,
          "acao": "aparecer",
          "alvo": "p-guard",
          "dur": 0.5
        },
        {
          "at": 1.52,
          "acao": "aparecer",
          "alvo": "p-rag",
          "dur": 0.5
        },
        {
          "at": 1.84,
          "acao": "aparecer",
          "alvo": "p-bi",
          "dur": 0.5
        },
        {
          "at": 2.22,
          "acao": "aparecer",
          "alvo": "b-agro",
          "dur": 0.6
        },
        {
          "at": 2.22,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        },
        {
          "at": 2.8,
          "acao": "aparecer",
          "alvo": "b-ia",
          "dur": 0.6
        },
        {
          "at": 3.5,
          "acao": "aparecer",
          "alvo": "b-dados",
          "dur": 0.6
        },
        {
          "at": 4.2,
          "acao": "desenhar",
          "alvo": "seg-perto",
          "dur": 0.6
        },
        {
          "at": 4.9,
          "acao": "aparecer",
          "alvo": "t-perto",
          "dur": 0.5
        },
        {
          "at": 5.74,
          "acao": "desenhar",
          "alvo": "seg-longe",
          "dur": 1.4
        },
        {
          "at": 6.94,
          "acao": "aparecer",
          "alvo": "t-longe",
          "dur": 0.5
        }
      ],
      "why": "Distância no mapa vira medida de semelhança de sentido."
    },
    {
      "id": "pergunta",
      "ordem": 4,
      "narration": "A pergunta também vira um ponto no mapa. Agora vamos ver quais textos moram mais perto dela.",
      "words": [
        {"t":"A","s":0.2,"e":0.48,"hl":false},
        {"t":"pergunta","s":0.52,"e":0.92,"hl":true},
        {"t":"também","s":0.96,"e":1.3,"hl":false},
        {"t":"vira","s":1.34,"e":1.68,"hl":false},
        {"t":"um","s":1.72,"e":2,"hl":false},
        {"t":"ponto","s":2.04,"e":2.38,"hl":true},
        {"t":"no","s":2.42,"e":2.7,"hl":false},
        {"t":"mapa.","s":2.74,"e":3.08,"hl":true},
        {"t":"Agora","s":3.52,"e":3.92,"hl":false},
        {"t":"vamos","s":3.96,"e":4.3,"hl":false},
        {"t":"ver","s":4.34,"e":4.62,"hl":false},
        {"t":"quais","s":4.66,"e":4.94,"hl":false},
        {"t":"textos","s":4.98,"e":5.32,"hl":false},
        {"t":"moram","s":5.36,"e":5.7,"hl":false},
        {"t":"mais","s":5.74,"e":6.02,"hl":false},
        {"t":"perto","s":6.06,"e":6.4,"hl":true},
        {"t":"dela.","s":6.44,"e":6.78,"hl":false}
      ],
      "dur": 7.98,
      "terminal": {
        "cmd": "q = emb(pergunta)   # [0.5, 0.3]",
        "at": 0.2,
        "dur": 2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "seg-perto",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "t-perto",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "seg-longe",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "t-longe",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "b-agro",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "b-ia",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "b-dados",
          "dur": 0.5
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "qv-card",
          "dur": 0.7
        },
        {
          "at": 0.96,
          "acao": "desenhar",
          "alvo": "qv-seta",
          "dur": 0.6
        },
        {
          "at": 1.34,
          "acao": "aparecer",
          "alvo": "qv-vetor",
          "dur": 0.7
        },
        {
          "at": 2.04,
          "acao": "aparecer",
          "alvo": "p-q",
          "dur": 0.7
        },
        {
          "at": 2.04,
          "acao": "destacar",
          "alvo": "p-q",
          "dur": 0.9
        },
        {
          "at": 6.06,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        }
      ],
      "why": "Pergunta e documentos dividem o mesmo mapa."
    },
    {
      "id": "distancia",
      "ordem": 5,
      "narration": "Primeiro, a régua: a distância em linha reta. RAG fica a 0,36 da pergunta; Guardrails, a 0,56.",
      "words": [
        {"t":"Primeiro,","s":0.2,"e":0.6,"hl":false},
        {"t":"a","s":0.84,"e":1.12,"hl":false},
        {"t":"régua:","s":1.16,"e":1.5,"hl":true},
        {"t":"a","s":1.74,"e":2.02,"hl":false},
        {"t":"distância","s":2.06,"e":2.46,"hl":true},
        {"t":"em","s":2.5,"e":2.78,"hl":false},
        {"t":"linha","s":2.82,"e":3.16,"hl":false},
        {"t":"reta.","s":3.2,"e":3.54,"hl":false},
        {"t":"RAG","s":3.98,"e":4.26,"hl":true},
        {"t":"fica","s":4.3,"e":4.64,"hl":false},
        {"t":"a","s":4.68,"e":4.96,"hl":false},
        {"t":"0,36","s":5,"e":5.28,"hl":true},
        {"t":"da","s":5.32,"e":5.6,"hl":false},
        {"t":"pergunta;","s":5.64,"e":6.04,"hl":false},
        {"t":"Guardrails,","s":6.28,"e":6.62,"hl":false},
        {"t":"a","s":6.86,"e":7.14,"hl":false},
        {"t":"0,56.","s":7.18,"e":7.46,"hl":false}
      ],
      "dur": 8.66,
      "terminal": {
        "cmd": "d = np.linalg.norm(docs - q, axis=1)",
        "at": 0.2,
        "dur": 2.2
      },
      "status": {
        "tipo": "ok",
        "texto": "MAIS PERTO: RAG, 0,36",
        "at": 3.98
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "qv-card",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "qv-seta",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "qv-vetor",
          "dur": 0.4
        },
        {
          "at": 1.16,
          "acao": "aparecer",
          "alvo": "rk-dist",
          "dur": 0.7
        },
        {
          "at": 2.06,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        },
        {
          "at": 3.98,
          "acao": "desenhar",
          "alvo": "rg-rag",
          "dur": 0.7
        },
        {
          "at": 3.98,
          "acao": "aparecer",
          "alvo": "halo-rag",
          "dur": 0.6
        },
        {
          "at": 5.32,
          "acao": "desenhar",
          "alvo": "rg-bi",
          "dur": 0.6
        },
        {
          "at": 6.28,
          "acao": "desenhar",
          "alvo": "rg-guard",
          "dur": 0.8
        }
      ],
      "why": "A distância conta o tamanho do vetor."
    },
    {
      "id": "cosseno",
      "ordem": 6,
      "narration": "O cosseno mede só o ângulo. Guardrails sai na frente com 0,83, e RAG fica com 0,80.",
      "words": [
        {"t":"O","s":0.2,"e":0.48,"hl":false},
        {"t":"cosseno","s":0.52,"e":0.92,"hl":true},
        {"t":"mede","s":0.96,"e":1.3,"hl":false},
        {"t":"só","s":1.34,"e":1.62,"hl":false},
        {"t":"o","s":1.66,"e":1.94,"hl":false},
        {"t":"ângulo.","s":1.98,"e":2.38,"hl":true},
        {"t":"Guardrails","s":2.82,"e":3.16,"hl":true},
        {"t":"sai","s":3.2,"e":3.48,"hl":false},
        {"t":"na","s":3.52,"e":3.8,"hl":false},
        {"t":"frente","s":3.84,"e":4.18,"hl":false},
        {"t":"com","s":4.22,"e":4.5,"hl":false},
        {"t":"0,83,","s":4.54,"e":4.82,"hl":true},
        {"t":"e","s":5.06,"e":5.34,"hl":false},
        {"t":"RAG","s":5.38,"e":5.66,"hl":false},
        {"t":"fica","s":5.7,"e":6.04,"hl":false},
        {"t":"com","s":6.08,"e":6.36,"hl":false},
        {"t":"0,80.","s":6.4,"e":6.68,"hl":false}
      ],
      "dur": 7.88,
      "terminal": {
        "cmd": "cos = a @ b / (na * nb)   # 0.83",
        "at": 0.2,
        "dur": 2.2
      },
      "status": {
        "tipo": "alerta",
        "texto": "AGORA GUARDRAILS FICA EM 1º",
        "at": 2.82
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rg-rag",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rg-bi",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rg-guard",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "halo-rag",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rk-dist",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "desenhar",
          "alvo": "ray-q",
          "dur": 0.7
        },
        {
          "at": 0.52,
          "acao": "desenhar",
          "alvo": "ray-g",
          "dur": 0.7
        },
        {
          "at": 0.96,
          "acao": "desenhar",
          "alvo": "ray-r",
          "dur": 0.7
        },
        {
          "at": 1.34,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        },
        {
          "at": 1.98,
          "acao": "desenhar",
          "alvo": "arco-g",
          "dur": 0.7
        },
        {
          "at": 1.98,
          "acao": "desenhar",
          "alvo": "arco-r",
          "dur": 0.7
        },
        {
          "at": 2.82,
          "acao": "aparecer",
          "alvo": "rk-cos",
          "dur": 0.7
        }
      ],
      "why": "O cosseno compara só a direção e ignora o tamanho do vetor."
    },
    {
      "id": "topk",
      "ordem": 7,
      "narration": "No RAG, o retriever devolve os k mais próximos. Com k igual a 2, Guardrails e RAG seguem para o modelo.",
      "words": [
        {"t":"No","s":0.2,"e":0.48,"hl":false},
        {"t":"RAG,","s":0.52,"e":0.8,"hl":false},
        {"t":"o","s":1.04,"e":1.32,"hl":false},
        {"t":"retriever","s":1.36,"e":1.76,"hl":true},
        {"t":"devolve","s":1.8,"e":2.2,"hl":false},
        {"t":"os","s":2.24,"e":2.52,"hl":false},
        {"t":"k","s":2.56,"e":2.84,"hl":false},
        {"t":"mais","s":2.88,"e":3.16,"hl":false},
        {"t":"próximos.","s":3.2,"e":3.6,"hl":true},
        {"t":"Com","s":4.04,"e":4.32,"hl":false},
        {"t":"k","s":4.36,"e":4.64,"hl":false},
        {"t":"igual","s":4.68,"e":5.02,"hl":false},
        {"t":"a","s":5.06,"e":5.34,"hl":false},
        {"t":"2,","s":5.38,"e":5.66,"hl":false},
        {"t":"Guardrails","s":5.9,"e":6.24,"hl":true},
        {"t":"e","s":6.28,"e":6.56,"hl":false},
        {"t":"RAG","s":6.6,"e":6.88,"hl":false},
        {"t":"seguem","s":6.92,"e":7.26,"hl":false},
        {"t":"para","s":7.3,"e":7.64,"hl":false},
        {"t":"o","s":7.68,"e":7.96,"hl":false},
        {"t":"modelo.","s":8,"e":8.4,"hl":true}
      ],
      "dur": 9.6,
      "terminal": {
        "cmd": "idx = np.argsort(-cos)[:2]   # [2 3]",
        "at": 0.2,
        "dur": 2.2
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "ray-q",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "ray-g",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "ray-r",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "arco-g",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "arco-r",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rk-cos",
          "dur": 0.4
        },
        {
          "at": 1.36,
          "acao": "aparecer",
          "alvo": "topk",
          "dur": 0.7
        },
        {
          "at": 1.8,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        },
        {
          "at": 5.9,
          "acao": "aparecer",
          "alvo": "halo-g",
          "dur": 0.6
        },
        {
          "at": 6.6,
          "acao": "aparecer",
          "alvo": "halo-r",
          "dur": 0.6
        },
        {
          "at": 6.92,
          "acao": "desenhar",
          "alvo": "llm-seta",
          "dur": 0.5
        },
        {
          "at": 8,
          "acao": "aparecer",
          "alvo": "llm",
          "dur": 0.7
        }
      ],
      "why": "O modelo só enxerga os trechos que a busca trouxe."
    },
    {
      "id": "normalizar",
      "ordem": 8,
      "narration": "Para evitar surpresas, normalize os vetores para comprimento 1. Aí cosseno e distância dão a mesma ordem.",
      "words": [
        {"t":"Para","s":0.2,"e":0.54,"hl":false},
        {"t":"evitar","s":0.58,"e":0.98,"hl":false},
        {"t":"surpresas,","s":1.02,"e":1.42,"hl":false},
        {"t":"normalize","s":1.66,"e":2.12,"hl":true},
        {"t":"os","s":2.16,"e":2.44,"hl":false},
        {"t":"vetores","s":2.48,"e":2.88,"hl":false},
        {"t":"para","s":2.92,"e":3.26,"hl":false},
        {"t":"comprimento","s":3.3,"e":3.76,"hl":true},
        {"t":"1.","s":3.8,"e":4.08,"hl":false},
        {"t":"Aí","s":4.52,"e":4.8,"hl":false},
        {"t":"cosseno","s":4.84,"e":5.24,"hl":false},
        {"t":"e","s":5.28,"e":5.56,"hl":false},
        {"t":"distância","s":5.6,"e":6,"hl":false},
        {"t":"dão","s":6.04,"e":6.32,"hl":false},
        {"t":"a","s":6.36,"e":6.64,"hl":false},
        {"t":"mesma","s":6.68,"e":7.02,"hl":true},
        {"t":"ordem.","s":7.06,"e":7.4,"hl":true}
      ],
      "dur": 8.6,
      "terminal": {
        "cmd": "docs = docs / norms[:, None]",
        "at": 0.2,
        "dur": 1.8
      },
      "status": {
        "tipo": "ok",
        "texto": "MESMA ORDEM NOS DOIS RANKINGS",
        "at": 7.06
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "topk",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "llm-seta",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "llm",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "halo-g",
          "dur": 0.4
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "halo-r",
          "dur": 0.4
        },
        {
          "at": 1.66,
          "acao": "desenhar",
          "alvo": "circ-un",
          "dur": 1.2
        },
        {
          "at": 2.48,
          "acao": "desenhar",
          "alvo": "norm-set",
          "dur": 1
        },
        {
          "at": 2.48,
          "acao": "aparecer",
          "alvo": "norm-pts",
          "dur": 0.8
        },
        {
          "at": 3.3,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        },
        {
          "at": 6.68,
          "acao": "aparecer",
          "alvo": "rk-igual",
          "dur": 0.7
        }
      ],
      "why": "Use a mesma métrica do modelo que gerou os embeddings."
    }
  ],
  "outro": {
    "dur": 7.34,
    "narration": "Texto vira ponto, e buscar vira medir perto e longe. Agora mexa no laboratório.",
    "words": [
      {"t":"Texto","s":0.2,"e":0.54,"hl":false},
      {"t":"vira","s":0.58,"e":0.92,"hl":false},
      {"t":"ponto,","s":0.96,"e":1.3,"hl":true},
      {"t":"e","s":1.54,"e":1.82,"hl":false},
      {"t":"buscar","s":1.86,"e":2.2,"hl":true},
      {"t":"vira","s":2.24,"e":2.58,"hl":false},
      {"t":"medir","s":2.62,"e":2.96,"hl":false},
      {"t":"perto","s":3,"e":3.34,"hl":true},
      {"t":"e","s":3.38,"e":3.66,"hl":false},
      {"t":"longe.","s":3.7,"e":4.04,"hl":false},
      {"t":"Agora","s":4.48,"e":4.88,"hl":false},
      {"t":"mexa","s":4.92,"e":5.26,"hl":false},
      {"t":"no","s":5.3,"e":5.58,"hl":false},
      {"t":"laboratório.","s":5.62,"e":6.14,"hl":true}
    ],
    "scene": [
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "circ-un",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "norm-set",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "norm-pts",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "rk-igual",
        "dur": 0.5
      },
      {
        "at": 0.2,
        "acao": "mover",
        "alvo": "guia",
        "dur": 0.8,
        "para": {
          "x": 660,
          "y": 0
        }
      },
      {
        "at": 0.2,
        "acao": "mover",
        "alvo": "mapa-pos",
        "dur": 0.8,
        "para": {
          "x": 105,
          "y": -4
        }
      },
      {
        "at": 0.2,
        "acao": "dimensionar",
        "alvo": "mapa-pos",
        "dur": 0.8,
        "sx": 0.85,
        "sy": 0.85
      },
      {
        "at": 3,
        "acao": "destacar",
        "alvo": "p-q",
        "dur": 1
      },
      {
        "at": 5.62,
        "acao": "destacar",
        "alvo": "guia-braco",
        "dur": 1.2
      }
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "import numpy as np\ndocs = np.array([[.8, -.4], [.45, -.22],\n    [.4, .85], [.2, .5]])\nq = np.array([.5, .3])\nn = np.linalg.norm\ncos = docs @ q / (n(docs, axis=1)*n(q))\ndist = n(docs - q, axis=1)\nprint(np.argsort(-cos))\nprint(np.argsort(dist))",
      "at": 0.2,
      "dur": 5
    }
  }
};
