/* Roteiro do mini-video "Redes neurais e backpropagation" (metafora: fabrica de decisoes com valvulas em camadas e um botao por valvula). Tempos em segundos desde o inicio de cada peca. */
window.Explainers = window.Explainers || {};
Explainers.rede = {
  "meta": {
    "id": "rede",
    "categoria": "MACHINE LEARNING",
    "area": "ml",
    "titulo": "Redes neurais e backpropagation",
    "duracao": 79,
    "cena": "rede"
  },
  "pieces": [
    {
      "id": "grupos",
      "ordem": 1,
      "narration": "Imagine dois grupos de pontos, um cercando o outro. Será que uma reta consegue separar os dois?",
      "words": [
        {"t":"Imagine","s":0.2,"e":0.66,"hl":false},
        {"t":"dois","s":0.7,"e":0.98,"hl":false},
        {"t":"grupos","s":1.02,"e":1.36,"hl":true},
        {"t":"de","s":1.4,"e":1.68,"hl":false},
        {"t":"pontos,","s":1.72,"e":2.06,"hl":false},
        {"t":"um","s":2.3,"e":2.58,"hl":false},
        {"t":"cercando","s":2.62,"e":3.02,"hl":true},
        {"t":"o","s":3.06,"e":3.34,"hl":false},
        {"t":"outro.","s":3.38,"e":3.72,"hl":false},
        {"t":"Será","s":4.16,"e":4.5,"hl":false},
        {"t":"que","s":4.54,"e":4.82,"hl":false},
        {"t":"uma","s":4.86,"e":5.2,"hl":false},
        {"t":"reta","s":5.24,"e":5.58,"hl":true},
        {"t":"consegue","s":5.62,"e":6.02,"hl":false},
        {"t":"separar","s":6.06,"e":6.46,"hl":true},
        {"t":"os","s":6.5,"e":6.78,"hl":false},
        {"t":"dois?","s":6.82,"e":7.1,"hl":false}
      ],
      "dur": 8.3,
      "terminal": {
        "cmd": "len(X)   # 34 pontos: 14 dentro, 20 fora",
        "at": 0.2,
        "dur": 2.4
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "guia",
          "dur": 0.7
        },
        {
          "at": 0.7,
          "acao": "aparecer",
          "alvo": "dados",
          "dur": 0.7
        },
        {
          "at": 1.02,
          "acao": "aparecer",
          "alvo": "pts-out",
          "dur": 0.8
        },
        {
          "at": 2.62,
          "acao": "aparecer",
          "alvo": "pts-in",
          "dur": 0.8
        },
        {
          "at": 3.38,
          "acao": "aparecer",
          "alvo": "legenda",
          "dur": 0.6
        },
        {
          "at": 6.06,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        }
      ],
      "why": "Em muitos problemas reais, a fronteira entre os grupos é curva."
    },
    {
      "id": "reta",
      "ordem": 2,
      "narration": "Qualquer reta deixa pontos dos dois grupos em cada lado. A melhor delas acerta só 68%.",
      "words": [
        {"t":"Qualquer","s":0.2,"e":0.54,"hl":false},
        {"t":"reta","s":0.58,"e":0.92,"hl":true},
        {"t":"deixa","s":0.96,"e":1.3,"hl":false},
        {"t":"pontos","s":1.34,"e":1.68,"hl":false},
        {"t":"dos","s":1.72,"e":2,"hl":false},
        {"t":"dois","s":2.04,"e":2.32,"hl":false},
        {"t":"grupos","s":2.36,"e":2.7,"hl":false},
        {"t":"em","s":2.74,"e":3.02,"hl":false},
        {"t":"cada","s":3.06,"e":3.4,"hl":false},
        {"t":"lado.","s":3.44,"e":3.78,"hl":true},
        {"t":"A","s":4.22,"e":4.5,"hl":false},
        {"t":"melhor","s":4.54,"e":4.88,"hl":true},
        {"t":"delas","s":4.92,"e":5.26,"hl":false},
        {"t":"acerta","s":5.3,"e":5.7,"hl":false},
        {"t":"só","s":5.74,"e":6.02,"hl":false},
        {"t":"68%.","s":6.06,"e":6.34,"hl":true}
      ],
      "dur": 7.54,
      "terminal": {
        "cmd": "acerto = (pred == y).mean()   # 0.68",
        "at": 0.2,
        "dur": 2.4
      },
      "status": {
        "tipo": "erro",
        "texto": "A RETA NÃO SEPARA OS GRUPOS",
        "at": 4.54
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "desenhar",
          "alvo": "reta",
          "dur": 1.3
        },
        {
          "at": 0.96,
          "acao": "aparecer",
          "alvo": "anel-erros",
          "dur": 0.8
        },
        {
          "at": 6.06,
          "acao": "aparecer",
          "alvo": "reta-rot",
          "dur": 0.7
        },
        {
          "at": 6.06,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        }
      ],
      "why": "Um modelo linear sozinho só traça fronteiras retas."
    },
    {
      "id": "neuronio",
      "ordem": 3,
      "narration": "Um neurônio é uma válvula: multiplica cada entrada pelo peso, soma o viés e passa por uma curva.",
      "words": [
        {"t":"Um","s":0.2,"e":0.48,"hl":false},
        {"t":"neurônio","s":0.52,"e":0.92,"hl":false},
        {"t":"é","s":0.96,"e":1.24,"hl":false},
        {"t":"uma","s":1.28,"e":1.62,"hl":false},
        {"t":"válvula:","s":1.66,"e":2.06,"hl":true},
        {"t":"multiplica","s":2.3,"e":2.76,"hl":false},
        {"t":"cada","s":2.8,"e":3.14,"hl":false},
        {"t":"entrada","s":3.18,"e":3.58,"hl":false},
        {"t":"pelo","s":3.62,"e":3.96,"hl":false},
        {"t":"peso,","s":4,"e":4.34,"hl":true},
        {"t":"soma","s":4.58,"e":4.92,"hl":false},
        {"t":"o","s":4.96,"e":5.24,"hl":false},
        {"t":"viés","s":5.28,"e":5.56,"hl":true},
        {"t":"e","s":5.6,"e":5.88,"hl":false},
        {"t":"passa","s":5.92,"e":6.26,"hl":false},
        {"t":"por","s":6.3,"e":6.58,"hl":false},
        {"t":"uma","s":6.62,"e":6.96,"hl":false},
        {"t":"curva.","s":7,"e":7.34,"hl":true}
      ],
      "dur": 8.54,
      "terminal": {
        "cmd": "z = 1*2 + 0.5*2 - 1   # 2\na = np.tanh(z)   # 0.964",
        "at": 0.2,
        "dur": 2.6
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "dados",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "reta-g",
          "dur": 0.3
        },
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "anel-erros",
          "dur": 0.3
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "neuronio",
          "dur": 0.4
        },
        {
          "at": 0.52,
          "acao": "aparecer",
          "alvo": "n-entradas",
          "dur": 0.7
        },
        {
          "at": 1.66,
          "acao": "aparecer",
          "alvo": "n-valvula",
          "dur": 0.8
        },
        {
          "at": 2.3,
          "acao": "desenhar",
          "alvo": "n-cano1",
          "dur": 0.9
        },
        {
          "at": 2.8,
          "acao": "desenhar",
          "alvo": "n-cano2",
          "dur": 0.9
        },
        {
          "at": 4,
          "acao": "aparecer",
          "alvo": "n-pesos",
          "dur": 0.7
        },
        {
          "at": 4.58,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        },
        {
          "at": 5.28,
          "acao": "aparecer",
          "alvo": "n-vies",
          "dur": 0.6
        },
        {
          "at": 5.28,
          "acao": "aparecer",
          "alvo": "n-z",
          "dur": 0.7
        },
        {
          "at": 5.92,
          "acao": "aparecer",
          "alvo": "n-curva",
          "dur": 0.6
        },
        {
          "at": 7,
          "acao": "desenhar",
          "alvo": "n-tanh",
          "dur": 0.9
        },
        {
          "at": 7,
          "acao": "aparecer",
          "alvo": "n-saida",
          "dur": 0.7
        }
      ],
      "why": "O neurônio é a peça básica: soma ponderada mais uma curva."
    },
    {
      "id": "camadas",
      "ordem": 4,
      "narration": "Empilhe válvulas em camadas. As ocultas combinam as entradas e a de saída decide. Com seis ocultas, são 25 parâmetros.",
      "words": [
        {"t":"Empilhe","s":0.2,"e":0.6,"hl":false},
        {"t":"válvulas","s":0.64,"e":1.04,"hl":false},
        {"t":"em","s":1.08,"e":1.36,"hl":false},
        {"t":"camadas.","s":1.4,"e":1.8,"hl":true},
        {"t":"As","s":2.24,"e":2.52,"hl":false},
        {"t":"ocultas","s":2.56,"e":2.96,"hl":false},
        {"t":"combinam","s":3,"e":3.4,"hl":true},
        {"t":"as","s":3.44,"e":3.72,"hl":false},
        {"t":"entradas","s":3.76,"e":4.16,"hl":false},
        {"t":"e","s":4.2,"e":4.48,"hl":false},
        {"t":"a","s":4.52,"e":4.8,"hl":false},
        {"t":"de","s":4.84,"e":5.12,"hl":false},
        {"t":"saída","s":5.16,"e":5.5,"hl":false},
        {"t":"decide.","s":5.54,"e":5.94,"hl":true},
        {"t":"Com","s":6.38,"e":6.66,"hl":false},
        {"t":"seis","s":6.7,"e":6.98,"hl":false},
        {"t":"ocultas,","s":7.02,"e":7.42,"hl":false},
        {"t":"são","s":7.66,"e":7.94,"hl":false},
        {"t":"25","s":7.98,"e":8.26,"hl":false},
        {"t":"parâmetros.","s":8.3,"e":8.76,"hl":true}
      ],
      "dur": 9.96,
      "terminal": {
        "cmd": "n_param = 4*6 + 1   # 25",
        "at": 0.2,
        "dur": 1.8
      },
      "status": {
        "tipo": "ok",
        "texto": "25 PARÂMETROS PARA AJUSTAR",
        "at": 6.7
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "neuronio",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "rede",
          "dur": 0.3
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "r-in",
          "dur": 0.6
        },
        {
          "at": 1.4,
          "acao": "aparecer",
          "alvo": "r-oc",
          "dur": 0.8
        },
        {
          "at": 2.24,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        },
        {
          "at": 3,
          "acao": "desenhar",
          "alvo": "r-c1",
          "dur": 1.1
        },
        {
          "at": 5.16,
          "acao": "aparecer",
          "alvo": "r-out",
          "dur": 0.6
        },
        {
          "at": 5.54,
          "acao": "desenhar",
          "alvo": "r-c2",
          "dur": 0.9
        },
        {
          "at": 6.7,
          "acao": "destacar",
          "alvo": "r-oc",
          "dur": 0.9
        },
        {
          "at": 7.98,
          "acao": "aparecer",
          "alvo": "r-conta",
          "dur": 0.7
        }
      ],
      "why": "Camadas combinam peças simples em fronteiras complexas."
    },
    {
      "id": "dobra",
      "ordem": 5,
      "narration": "Com seis válvulas, seis retas se combinam e a fronteira dobra, cercando o grupo de dentro: 100% de acerto.",
      "words": [
        {"t":"Com","s":0.2,"e":0.48,"hl":false},
        {"t":"seis","s":0.52,"e":0.8,"hl":false},
        {"t":"válvulas,","s":0.84,"e":1.24,"hl":false},
        {"t":"seis","s":1.48,"e":1.76,"hl":false},
        {"t":"retas","s":1.8,"e":2.14,"hl":true},
        {"t":"se","s":2.18,"e":2.46,"hl":false},
        {"t":"combinam","s":2.5,"e":2.9,"hl":false},
        {"t":"e","s":2.94,"e":3.22,"hl":false},
        {"t":"a","s":3.26,"e":3.54,"hl":false},
        {"t":"fronteira","s":3.58,"e":3.98,"hl":true},
        {"t":"dobra,","s":4.02,"e":4.36,"hl":false},
        {"t":"cercando","s":4.6,"e":5,"hl":true},
        {"t":"o","s":5.04,"e":5.32,"hl":false},
        {"t":"grupo","s":5.36,"e":5.7,"hl":false},
        {"t":"de","s":5.74,"e":6.02,"hl":false},
        {"t":"dentro:","s":6.06,"e":6.4,"hl":false},
        {"t":"100%","s":6.64,"e":6.92,"hl":true},
        {"t":"de","s":6.96,"e":7.24,"hl":false},
        {"t":"acerto.","s":7.28,"e":7.68,"hl":false}
      ],
      "dur": 8.88,
      "terminal": {
        "cmd": "acerto = (pred == y).mean()   # 1.00",
        "at": 0.2,
        "dur": 2.4
      },
      "status": {
        "tipo": "ok",
        "texto": "ACERTO 100% NESTA AMOSTRA",
        "at": 5.36
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "rede",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "dados",
          "dur": 0.7
        },
        {
          "at": 0.52,
          "acao": "desenhar",
          "alvo": "hl1",
          "dur": 0.5
        },
        {
          "at": 0.84,
          "acao": "desenhar",
          "alvo": "hl2",
          "dur": 0.5
        },
        {
          "at": 1.48,
          "acao": "desenhar",
          "alvo": "hl3",
          "dur": 0.5
        },
        {
          "at": 1.8,
          "acao": "desenhar",
          "alvo": "hl4",
          "dur": 0.5
        },
        {
          "at": 2.18,
          "acao": "desenhar",
          "alvo": "hl5",
          "dur": 0.5
        },
        {
          "at": 2.5,
          "acao": "desenhar",
          "alvo": "hl6",
          "dur": 0.5
        },
        {
          "at": 3.58,
          "acao": "desenhar",
          "alvo": "fronteira",
          "dur": 1.4
        },
        {
          "at": 4.6,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        },
        {
          "at": 6.64,
          "acao": "aparecer",
          "alvo": "hex-rot",
          "dur": 0.7
        }
      ],
      "why": "Mais válvulas dobram mais a fronteira, e o treino escolhe como."
    },
    {
      "id": "perda",
      "ordem": 6,
      "narration": "Treinar começa com a conta adiante: p vale 0,731, o rótulo pede 1 e a perda mede o erro, 0,313.",
      "words": [
        {"t":"Treinar","s":0.2,"e":0.54,"hl":false},
        {"t":"começa","s":0.58,"e":0.98,"hl":false},
        {"t":"com","s":1.02,"e":1.3,"hl":false},
        {"t":"a","s":1.34,"e":1.62,"hl":false},
        {"t":"conta","s":1.66,"e":2,"hl":false},
        {"t":"adiante:","s":2.04,"e":2.44,"hl":true},
        {"t":"p","s":2.68,"e":2.96,"hl":false},
        {"t":"vale","s":3,"e":3.34,"hl":false},
        {"t":"0,731,","s":3.38,"e":3.66,"hl":false},
        {"t":"o","s":3.9,"e":4.18,"hl":false},
        {"t":"rótulo","s":4.22,"e":4.62,"hl":true},
        {"t":"pede","s":4.66,"e":5,"hl":false},
        {"t":"1","s":5.04,"e":5.32,"hl":false},
        {"t":"e","s":5.36,"e":5.64,"hl":false},
        {"t":"a","s":5.68,"e":5.96,"hl":false},
        {"t":"perda","s":6,"e":6.34,"hl":true},
        {"t":"mede","s":6.38,"e":6.72,"hl":false},
        {"t":"o","s":6.76,"e":7.04,"hl":false},
        {"t":"erro,","s":7.08,"e":7.42,"hl":false},
        {"t":"0,313.","s":7.66,"e":7.94,"hl":true}
      ],
      "dur": 9.14,
      "terminal": {
        "cmd": "L = -np.log(0.731)   # 0.313",
        "at": 0.2,
        "dur": 2
      },
      "status": {
        "tipo": "alerta",
        "texto": "ERRO MEDIDO: PERDA 0,313",
        "at": 6
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "dados",
          "dur": 0.5
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "cadeia",
          "dur": 0.3
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "c-x",
          "dur": 0.6
        },
        {
          "at": 0.2,
          "acao": "aparecer",
          "alvo": "c-vx",
          "dur": 0.6
        },
        {
          "at": 0.58,
          "acao": "aparecer",
          "alvo": "c-valvula",
          "dur": 0.6
        },
        {
          "at": 0.58,
          "acao": "aparecer",
          "alvo": "c-botoes",
          "dur": 0.6
        },
        {
          "at": 0.58,
          "acao": "aparecer",
          "alvo": "th-w",
          "dur": 0.6
        },
        {
          "at": 0.58,
          "acao": "aparecer",
          "alvo": "th-b",
          "dur": 0.6
        },
        {
          "at": 0.58,
          "acao": "aparecer",
          "alvo": "c-wtxt",
          "dur": 0.6
        },
        {
          "at": 0.58,
          "acao": "aparecer",
          "alvo": "c-btxt",
          "dur": 0.6
        },
        {
          "at": 1.66,
          "acao": "desenhar",
          "alvo": "c-canos",
          "dur": 1.3
        },
        {
          "at": 2.04,
          "acao": "aparecer",
          "alvo": "c-z",
          "dur": 0.5
        },
        {
          "at": 2.04,
          "acao": "aparecer",
          "alvo": "c-vz",
          "dur": 0.5
        },
        {
          "at": 2.68,
          "acao": "aparecer",
          "alvo": "c-sig",
          "dur": 0.5
        },
        {
          "at": 3.38,
          "acao": "aparecer",
          "alvo": "c-vp",
          "dur": 0.5
        },
        {
          "at": 4.22,
          "acao": "aparecer",
          "alvo": "c-perda",
          "dur": 0.5
        },
        {
          "at": 4.22,
          "acao": "aparecer",
          "alvo": "c-y",
          "dur": 0.5
        },
        {
          "at": 6,
          "acao": "destacar",
          "alvo": "c-perda",
          "dur": 0.9
        },
        {
          "at": 7.08,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        },
        {
          "at": 7.66,
          "acao": "aparecer",
          "alvo": "c-vL",
          "dur": 0.6
        }
      ],
      "why": "A perda transforma o erro em um número que dá para reduzir."
    },
    {
      "id": "cadeia",
      "ordem": 7,
      "narration": "Na volta, a regra da cadeia multiplica derivadas de trás para a frente e reparte a culpa entre os botões.",
      "words": [
        {"t":"Na","s":0.2,"e":0.48,"hl":false},
        {"t":"volta,","s":0.52,"e":0.86,"hl":false},
        {"t":"a","s":1.1,"e":1.38,"hl":false},
        {"t":"regra","s":1.42,"e":1.76,"hl":false},
        {"t":"da","s":1.8,"e":2.08,"hl":false},
        {"t":"cadeia","s":2.12,"e":2.46,"hl":true},
        {"t":"multiplica","s":2.5,"e":2.96,"hl":false},
        {"t":"derivadas","s":3,"e":3.46,"hl":true},
        {"t":"de","s":3.5,"e":3.78,"hl":false},
        {"t":"trás","s":3.82,"e":4.1,"hl":true},
        {"t":"para","s":4.14,"e":4.48,"hl":false},
        {"t":"a","s":4.52,"e":4.8,"hl":false},
        {"t":"frente","s":4.84,"e":5.18,"hl":false},
        {"t":"e","s":5.22,"e":5.5,"hl":false},
        {"t":"reparte","s":5.54,"e":5.94,"hl":false},
        {"t":"a","s":5.98,"e":6.26,"hl":false},
        {"t":"culpa","s":6.3,"e":6.64,"hl":true},
        {"t":"entre","s":6.68,"e":7.02,"hl":false},
        {"t":"os","s":7.06,"e":7.34,"hl":false},
        {"t":"botões.","s":7.38,"e":7.72,"hl":false}
      ],
      "dur": 8.92,
      "terminal": {
        "cmd": "dLdw = -1.368 * 0.197 * 2   # -0.538",
        "at": 0.2,
        "dur": 2.4
      },
      "status": {
        "tipo": "alerta",
        "texto": "CULPA EM W: −0,538 · EM B: −0,269",
        "at": 6.3
      },
      "scene": [
        {
          "at": 1.42,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        },
        {
          "at": 2.12,
          "acao": "desenhar",
          "alvo": "v-a1",
          "dur": 0.8
        },
        {
          "at": 2.12,
          "acao": "aparecer",
          "alvo": "v-l1",
          "dur": 0.6
        },
        {
          "at": 3,
          "acao": "desenhar",
          "alvo": "v-a2",
          "dur": 0.8
        },
        {
          "at": 3,
          "acao": "aparecer",
          "alvo": "v-l2",
          "dur": 0.6
        },
        {
          "at": 3.82,
          "acao": "desenhar",
          "alvo": "v-a3",
          "dur": 0.8
        },
        {
          "at": 3.82,
          "acao": "aparecer",
          "alvo": "v-l3",
          "dur": 0.6
        },
        {
          "at": 7.38,
          "acao": "destacar",
          "alvo": "th-w",
          "dur": 0.9
        },
        {
          "at": 7.38,
          "acao": "destacar",
          "alvo": "th-b",
          "dur": 0.9
        }
      ],
      "why": "A regra da cadeia diz quanto cada botão contribuiu para o erro."
    },
    {
      "id": "passo",
      "ordem": 8,
      "narration": "Cada botão gira contra o gradiente. Com taxa 0,5, w sobe para 0,769 e a perda cai de 0,313 para 0,172.",
      "words": [
        {"t":"Cada","s":0.2,"e":0.54,"hl":false},
        {"t":"botão","s":0.58,"e":0.92,"hl":true},
        {"t":"gira","s":0.96,"e":1.3,"hl":false},
        {"t":"contra","s":1.34,"e":1.68,"hl":false},
        {"t":"o","s":1.72,"e":2,"hl":false},
        {"t":"gradiente.","s":2.04,"e":2.44,"hl":true},
        {"t":"Com","s":2.88,"e":3.16,"hl":false},
        {"t":"taxa","s":3.2,"e":3.54,"hl":false},
        {"t":"0,5,","s":3.58,"e":3.86,"hl":false},
        {"t":"w","s":4.1,"e":4.38,"hl":false},
        {"t":"sobe","s":4.42,"e":4.76,"hl":true},
        {"t":"para","s":4.8,"e":5.14,"hl":false},
        {"t":"0,769","s":5.18,"e":5.46,"hl":false},
        {"t":"e","s":5.5,"e":5.78,"hl":false},
        {"t":"a","s":5.82,"e":6.1,"hl":false},
        {"t":"perda","s":6.14,"e":6.48,"hl":false},
        {"t":"cai","s":6.52,"e":6.8,"hl":true},
        {"t":"de","s":6.84,"e":7.12,"hl":false},
        {"t":"0,313","s":7.16,"e":7.44,"hl":false},
        {"t":"para","s":7.48,"e":7.82,"hl":false},
        {"t":"0,172.","s":7.86,"e":8.14,"hl":false}
      ],
      "dur": 9.34,
      "terminal": {
        "cmd": "w = 0.5 - 0.5 * (-0.538)   # 0.769",
        "at": 0.2,
        "dur": 2.2
      },
      "status": {
        "tipo": "ok",
        "texto": "PERDA CAIU: 0,313 PARA 0,172",
        "at": 6.52
      },
      "scene": [
        {
          "at": 0.2,
          "acao": "sumir",
          "alvo": "volta",
          "dur": 0.6
        },
        {
          "at": 0.96,
          "acao": "mover",
          "alvo": "th-w",
          "dur": 1.3,
          "para": {
            "x": 16.1,
            "y": 0
          }
        },
        {
          "at": 0.96,
          "acao": "mover",
          "alvo": "th-b",
          "dur": 1.3,
          "para": {
            "x": 8.1,
            "y": 0
          }
        },
        {
          "at": 2.04,
          "acao": "destacar",
          "alvo": "guia-braco",
          "dur": 1
        },
        {
          "at": 4.42,
          "acao": "sumir",
          "alvo": "c-wtxt",
          "dur": 0.4
        },
        {
          "at": 4.42,
          "acao": "aparecer",
          "alvo": "c-wtxt2",
          "dur": 0.6
        },
        {
          "at": 4.42,
          "acao": "sumir",
          "alvo": "c-btxt",
          "dur": 0.4
        },
        {
          "at": 4.42,
          "acao": "aparecer",
          "alvo": "c-btxt2",
          "dur": 0.6
        },
        {
          "at": 6.14,
          "acao": "sumir",
          "alvo": "c-vz",
          "dur": 0.4
        },
        {
          "at": 6.14,
          "acao": "aparecer",
          "alvo": "c-vz2",
          "dur": 0.6
        },
        {
          "at": 6.14,
          "acao": "sumir",
          "alvo": "c-vp",
          "dur": 0.4
        },
        {
          "at": 6.14,
          "acao": "aparecer",
          "alvo": "c-vp2",
          "dur": 0.6
        },
        {
          "at": 6.52,
          "acao": "sumir",
          "alvo": "c-vL",
          "dur": 0.4
        },
        {
          "at": 6.52,
          "acao": "aparecer",
          "alvo": "c-vL2",
          "dur": 0.7
        }
      ],
      "why": "Cuidado: taxa grande demais faz a perda oscilar."
    }
  ],
  "outro": {
    "dur": 7.9,
    "narration": "Num classificador de triagem, esse ciclo se repete milhares de vezes. Agora mexa no laboratório.",
    "words": [
      {"t":"Num","s":0.2,"e":0.48,"hl":false},
      {"t":"classificador","s":0.52,"e":1.04,"hl":true},
      {"t":"de","s":1.08,"e":1.36,"hl":false},
      {"t":"triagem,","s":1.4,"e":1.74,"hl":false},
      {"t":"esse","s":1.98,"e":2.32,"hl":false},
      {"t":"ciclo","s":2.36,"e":2.7,"hl":true},
      {"t":"se","s":2.74,"e":3.02,"hl":false},
      {"t":"repete","s":3.06,"e":3.46,"hl":false},
      {"t":"milhares","s":3.5,"e":3.9,"hl":true},
      {"t":"de","s":3.94,"e":4.22,"hl":false},
      {"t":"vezes.","s":4.26,"e":4.6,"hl":false},
      {"t":"Agora","s":5.04,"e":5.44,"hl":false},
      {"t":"mexa","s":5.48,"e":5.82,"hl":false},
      {"t":"no","s":5.86,"e":6.14,"hl":false},
      {"t":"laboratório.","s":6.18,"e":6.7,"hl":true}
    ],
    "scene": [
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "cadeia",
        "dur": 0.6
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "hex-rot",
        "dur": 0.4
      },
      {
        "at": 0.2,
        "acao": "sumir",
        "alvo": "legenda",
        "dur": 0.4
      },
      {
        "at": 0.2,
        "acao": "mover",
        "alvo": "guia",
        "dur": 0.8,
        "para": {
          "x": 620,
          "y": 0
        }
      },
      {
        "at": 0.2,
        "acao": "mover",
        "alvo": "dados-pos",
        "dur": 0.8,
        "para": {
          "x": 190,
          "y": -6
        }
      },
      {
        "at": 0.2,
        "acao": "dimensionar",
        "alvo": "dados-pos",
        "dur": 0.8,
        "sx": 0.85,
        "sy": 0.85
      },
      {
        "at": 0.2,
        "acao": "aparecer",
        "alvo": "dados",
        "dur": 0.9
      },
      {
        "at": 2.36,
        "acao": "destacar",
        "alvo": "fronteira",
        "dur": 1
      },
      {
        "at": 6.18,
        "acao": "destacar",
        "alvo": "guia-braco",
        "dur": 1.2
      }
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "import torch, torch.nn as nn\nnet = nn.Sequential(nn.Linear(2, 6),\n    nn.Tanh(), nn.Linear(6, 1))\nopt = torch.optim.SGD(\n    net.parameters(), lr=0.5)\nf = nn.BCEWithLogitsLoss()\nfor _ in range(500):\n    opt.zero_grad()\n    f(net(X).squeeze(), y).backward()\n    opt.step()",
      "at": 0.2,
      "dur": 5
    }
  }
};
