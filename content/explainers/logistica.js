/* Roteiro do mini-video "Classificacao, limiar e guardrails" (metafora: porteiro com uma regua de rigor e catraca na porta do LLM). Numeros calculados por script com os padroes do laboratorio (separacao 0,30; taxa 1%; custo 10x): em 10.000 pedidos, limiar 0,5: VP 84, FN 16, FP 1571, VN 8329, recall 84,1%, precisao 5,1%, AUC 0,92; limiar de menor custo 0,67, custo por mil 173 para 72. Tempos em segundos desde o inicio de cada peca. */
window.Explainers = window.Explainers || {};
Explainers.logistica = {
  "meta": {
    "id": "logistica",
    "categoria": "MACHINE LEARNING",
    "area": "ml",
    "titulo": "Classificação, limiar e guardrails",
    "duracao": 78,
    "cena": "logistica"
  },
  "pieces": [
    {
      "id": "fila",
      "ordem": 1,
      "narration": "Chegam cem pedidos ao assistente de IA. Noventa e nove são legítimos, um é ataque. Como filtrar?",
      "words": [
        {"t":"Chegam","s":0.2,"e":0.54,"hl":false},
        {"t":"cem","s":0.58,"e":0.86,"hl":true},
        {"t":"pedidos","s":0.9,"e":1.3,"hl":false},
        {"t":"ao","s":1.34,"e":1.62,"hl":false},
        {"t":"assistente","s":1.66,"e":2.12,"hl":false},
        {"t":"de","s":2.16,"e":2.44,"hl":false},
        {"t":"IA.","s":2.48,"e":2.76,"hl":false},
        {"t":"Noventa","s":3.2,"e":3.6,"hl":false},
        {"t":"e","s":3.64,"e":3.92,"hl":false},
        {"t":"nove","s":3.96,"e":4.3,"hl":false},
        {"t":"são","s":4.34,"e":4.62,"hl":false},
        {"t":"legítimos,","s":4.66,"e":5.12,"hl":true},
        {"t":"um","s":5.36,"e":5.64,"hl":false},
        {"t":"é","s":5.68,"e":5.96,"hl":false},
        {"t":"ataque.","s":6,"e":6.4,"hl":true},
        {"t":"Como","s":6.84,"e":7.18,"hl":false},
        {"t":"filtrar?","s":7.22,"e":7.56,"hl":true}
      ],
      "dur": 8.76,
      "terminal": {
        "cmd": "pedidos = 100\nataques = 1   # taxa de 1%",
        "at": 1.8,
        "dur": 2.2
      },
      "scene": [
        {"at":0.2,"acao":"aparecer","alvo":"guia","dur":0.7},
        {"at":0.58,"acao":"aparecer","alvo":"grade","dur":0.9},
        {"at":4.66,"acao":"aparecer","alvo":"rot-legit","dur":0.6},
        {"at":6,"acao":"aparecer","alvo":"ataque-1","dur":0.7},
        {"at":6,"acao":"aparecer","alvo":"rot-ataque","dur":0.6},
        {"at":7.22,"acao":"destacar","alvo":"guia-braco","dur":0.9}
      ],
      "why": "Quando o ataque é raro, quase tudo que chega é legítimo."
    },
    {
      "id": "score",
      "ordem": 2,
      "narration": "Cada pedido recebe uma probabilidade de ataque, o score. Os ataques pontuam mais alto, e os grupos se misturam.",
      "words": [
        {"t":"Cada","s":0.2,"e":0.54,"hl":false},
        {"t":"pedido","s":0.58,"e":0.98,"hl":false},
        {"t":"recebe","s":1.02,"e":1.42,"hl":false},
        {"t":"uma","s":1.46,"e":1.8,"hl":false},
        {"t":"probabilidade","s":1.84,"e":2.39,"hl":true},
        {"t":"de","s":2.43,"e":2.71,"hl":false},
        {"t":"ataque,","s":2.75,"e":3.15,"hl":false},
        {"t":"o","s":3.39,"e":3.67,"hl":false},
        {"t":"score.","s":3.71,"e":4.05,"hl":true},
        {"t":"Os","s":4.49,"e":4.77,"hl":false},
        {"t":"ataques","s":4.81,"e":5.21,"hl":false},
        {"t":"pontuam","s":5.25,"e":5.59,"hl":false},
        {"t":"mais","s":5.63,"e":5.91,"hl":false},
        {"t":"alto,","s":5.95,"e":6.29,"hl":true},
        {"t":"e","s":6.53,"e":6.81,"hl":false},
        {"t":"os","s":6.85,"e":7.13,"hl":false},
        {"t":"grupos","s":7.17,"e":7.51,"hl":false},
        {"t":"se","s":7.55,"e":7.83,"hl":false},
        {"t":"misturam.","s":7.87,"e":8.27,"hl":true}
      ],
      "dur": 9.47,
      "terminal": {
        "cmd": "p = 1 / (1 + exp(−z))   # z = w·x + b",
        "at": 0.4,
        "dur": 2.4
      },
      "status": {
        "tipo": "alerta",
        "texto": "AUC 0,92: GRUPOS SE SOBREPÕEM",
        "at": 7.87
      },
      "scene": [
        {"at":0.2,"acao":"sumir","alvo":"grade","dur":0.5},
        {"at":0.2,"acao":"sumir","alvo":"rot-legit","dur":0.4},
        {"at":0.2,"acao":"sumir","alvo":"ataque-1","dur":0.4},
        {"at":0.2,"acao":"sumir","alvo":"rot-ataque","dur":0.4},
        {"at":0.58,"acao":"desenhar","alvo":"eixo-s","dur":0.9},
        {"at":0.58,"acao":"aparecer","alvo":"rot-eixo-s","dur":0.6},
        {"at":1.84,"acao":"desenhar","alvo":"curva-ok","dur":1.2},
        {"at":1.84,"acao":"aparecer","alvo":"rot-ok","dur":0.6},
        {"at":3.71,"acao":"destacar","alvo":"rot-eixo-s","dur":0.9},
        {"at":4.81,"acao":"desenhar","alvo":"curva-atk","dur":1.2},
        {"at":4.81,"acao":"aparecer","alvo":"rot-atk","dur":0.6},
        {"at":5.95,"acao":"aparecer","alvo":"rot-medias","dur":0.6},
        {"at":7.87,"acao":"aparecer","alvo":"sobreposicao","dur":0.8}
      ],
      "why": "O modelo entrega uma probabilidade; a decisão vem depois."
    },
    {
      "id": "limiar",
      "ordem": 3,
      "narration": "Você escolhe o limiar, a régua de rigor do porteiro. Score acima dela, bloqueado; abaixo, passa.",
      "words": [
        {"t":"Você","s":0.2,"e":0.54,"hl":false},
        {"t":"escolhe","s":0.58,"e":0.98,"hl":false},
        {"t":"o","s":1.02,"e":1.3,"hl":false},
        {"t":"limiar,","s":1.34,"e":1.68,"hl":true},
        {"t":"a","s":1.92,"e":2.2,"hl":false},
        {"t":"régua","s":2.24,"e":2.58,"hl":true},
        {"t":"de","s":2.62,"e":2.9,"hl":false},
        {"t":"rigor","s":2.94,"e":3.28,"hl":false},
        {"t":"do","s":3.32,"e":3.6,"hl":false},
        {"t":"porteiro.","s":3.64,"e":4.04,"hl":false},
        {"t":"Score","s":4.48,"e":4.82,"hl":false},
        {"t":"acima","s":4.86,"e":5.26,"hl":false},
        {"t":"dela,","s":5.3,"e":5.64,"hl":false},
        {"t":"bloqueado;","s":5.88,"e":6.28,"hl":true},
        {"t":"abaixo,","s":6.52,"e":6.92,"hl":false},
        {"t":"passa.","s":7.16,"e":7.5,"hl":true}
      ],
      "dur": 8.7,
      "terminal": {
        "cmd": "bloqueia = score >= limiar   # 0,5",
        "at": 0.8,
        "dur": 2.2
      },
      "scene": [
        {"at":1.34,"acao":"aparecer","alvo":"limiar","dur":0.8},
        {"at":1.34,"acao":"aparecer","alvo":"rot-lim50","dur":0.6},
        {"at":2.24,"acao":"destacar","alvo":"limiar","dur":0.9},
        {"at":3.64,"acao":"aparecer","alvo":"porteiro","dur":0.8},
        {"at":5.88,"acao":"aparecer","alvo":"rot-bloqueia","dur":0.6},
        {"at":7.16,"acao":"aparecer","alvo":"rot-passa","dur":0.6}
      ],
      "why": "O limiar transforma a probabilidade em bloquear ou liberar."
    },
    {
      "id": "erros",
      "ordem": 4,
      "narration": "Há dois erros. Bloquear um pedido legítimo é falso positivo. Deixar passar um ataque é falso negativo.",
      "words": [
        {"t":"Há","s":0.2,"e":0.48,"hl":false},
        {"t":"dois","s":0.52,"e":0.8,"hl":false},
        {"t":"erros.","s":0.84,"e":1.18,"hl":false},
        {"t":"Bloquear","s":1.62,"e":1.96,"hl":false},
        {"t":"um","s":2,"e":2.28,"hl":false},
        {"t":"pedido","s":2.32,"e":2.72,"hl":false},
        {"t":"legítimo","s":2.76,"e":3.22,"hl":true},
        {"t":"é","s":3.26,"e":3.54,"hl":false},
        {"t":"falso","s":3.58,"e":3.92,"hl":false},
        {"t":"positivo.","s":3.96,"e":4.42,"hl":true},
        {"t":"Deixar","s":4.86,"e":5.2,"hl":false},
        {"t":"passar","s":5.24,"e":5.58,"hl":false},
        {"t":"um","s":5.62,"e":5.9,"hl":false},
        {"t":"ataque","s":5.94,"e":6.34,"hl":true},
        {"t":"é","s":6.38,"e":6.66,"hl":false},
        {"t":"falso","s":6.7,"e":7.04,"hl":false},
        {"t":"negativo.","s":7.08,"e":7.54,"hl":true}
      ],
      "dur": 8.74,
      "terminal": {
        "cmd": "FP: bloqueou um legítimo\nFN: deixou passar um ataque",
        "at": 0.6,
        "dur": 2.4
      },
      "status": {
        "tipo": "alerta",
        "texto": "DOIS ERROS, DOIS CUSTOS",
        "at": 7.08
      },
      "scene": [
        {"at":0.2,"acao":"sumir","alvo":"rot-bloqueia","dur":0.4},
        {"at":0.2,"acao":"sumir","alvo":"rot-passa","dur":0.4},
        {"at":2.76,"acao":"aparecer","alvo":"area-fp","dur":0.8},
        {"at":3.96,"acao":"aparecer","alvo":"rot-fp","dur":0.7},
        {"at":5.94,"acao":"aparecer","alvo":"area-fn","dur":0.8},
        {"at":7.08,"acao":"aparecer","alvo":"rot-fn","dur":0.7}
      ],
      "why": "Cada limiar troca um tipo de erro por outro."
    },
    {
      "id": "contagem",
      "ordem": 5,
      "narration": "Em dez mil pedidos, com limiar 0,50, o filtro barra 84 ataques, deixa passar 16 e bloqueia 1.571 legítimos.",
      "words": [
        {"t":"Em","s":0.2,"e":0.48,"hl":false},
        {"t":"dez","s":0.52,"e":0.8,"hl":false},
        {"t":"mil","s":0.84,"e":1.12,"hl":false},
        {"t":"pedidos,","s":1.16,"e":1.56,"hl":false},
        {"t":"com","s":1.8,"e":2.08,"hl":false},
        {"t":"limiar","s":2.12,"e":2.46,"hl":false},
        {"t":"0,50,","s":2.5,"e":2.78,"hl":true},
        {"t":"o","s":3.02,"e":3.3,"hl":false},
        {"t":"filtro","s":3.34,"e":3.68,"hl":false},
        {"t":"barra","s":3.72,"e":4.06,"hl":false},
        {"t":"84","s":4.1,"e":4.38,"hl":true},
        {"t":"ataques,","s":4.42,"e":4.82,"hl":false},
        {"t":"deixa","s":5.06,"e":5.4,"hl":false},
        {"t":"passar","s":5.44,"e":5.78,"hl":false},
        {"t":"16","s":5.82,"e":6.1,"hl":true},
        {"t":"e","s":6.14,"e":6.42,"hl":false},
        {"t":"bloqueia","s":6.46,"e":6.8,"hl":false},
        {"t":"1.571","s":6.84,"e":7.12,"hl":true},
        {"t":"legítimos.","s":7.16,"e":7.62,"hl":false}
      ],
      "dur": 8.82,
      "terminal": {
        "cmd": "n = 10_000   # 100 ataques (1%)\nlimiar = 0.5",
        "at": 0.6,
        "dur": 2.2
      },
      "status": {
        "tipo": "alerta",
        "texto": "1.571 BLOQUEIOS À TOA",
        "at": 6.84
      },
      "scene": [
        {"at":0.2,"acao":"sumir","alvo":"plano","dur":0.6},
        {"at":0.2,"acao":"aparecer","alvo":"matriz","dur":0.7},
        {"at":4.1,"acao":"aparecer","alvo":"cel-vp","dur":0.6},
        {"at":5.82,"acao":"aparecer","alvo":"cel-fn","dur":0.6},
        {"at":6.84,"acao":"aparecer","alvo":"cel-fp","dur":0.6},
        {"at":6.84,"acao":"destacar","alvo":"cel-fp","dur":0.9},
        {"at":7.16,"acao":"aparecer","alvo":"cel-vn","dur":0.6}
      ],
      "why": "Mesmo um bom filtro bloqueia muito pedido legítimo quando o ataque é raro."
    },
    {
      "id": "precisao",
      "ordem": 6,
      "narration": "O recall mede os ataques pegos: 84%. A precisão mede os bloqueios certos: só 5,1%.",
      "words": [
        {"t":"O","s":0.2,"e":0.48,"hl":false},
        {"t":"recall","s":0.52,"e":0.86,"hl":true},
        {"t":"mede","s":0.9,"e":1.24,"hl":false},
        {"t":"os","s":1.28,"e":1.56,"hl":false},
        {"t":"ataques","s":1.6,"e":2,"hl":false},
        {"t":"pegos:","s":2.04,"e":2.38,"hl":false},
        {"t":"84%.","s":2.62,"e":2.9,"hl":true},
        {"t":"A","s":3.34,"e":3.62,"hl":false},
        {"t":"precisão","s":3.66,"e":4.06,"hl":true},
        {"t":"mede","s":4.1,"e":4.44,"hl":false},
        {"t":"os","s":4.48,"e":4.76,"hl":false},
        {"t":"bloqueios","s":4.8,"e":5.14,"hl":false},
        {"t":"certos:","s":5.18,"e":5.52,"hl":false},
        {"t":"só","s":5.76,"e":6.04,"hl":false},
        {"t":"5,1%.","s":6.08,"e":6.36,"hl":true}
      ],
      "dur": 7.56,
      "terminal": {
        "cmd": "recall = 84 / (84 + 16)\nprecisão = 84 / (84 + 1571)",
        "at": 0.6,
        "dur": 2.4
      },
      "status": {
        "tipo": "alerta",
        "texto": "PRECISÃO BAIXA: 5,1%",
        "at": 6.08
      },
      "scene": [
        {"at":0.2,"acao":"sumir","alvo":"matriz","dur":0.5},
        {"at":0.52,"acao":"aparecer","alvo":"bar-recall","dur":0.7},
        {"at":2.62,"acao":"aparecer","alvo":"val-recall","dur":0.6},
        {"at":3.66,"acao":"aparecer","alvo":"bar-prec","dur":0.7},
        {"at":6.08,"acao":"aparecer","alvo":"val-prec","dur":0.6},
        {"at":6.08,"acao":"destacar","alvo":"val-prec","dur":0.9}
      ],
      "why": "Recall alto com precisão baixa significa muitos alarmes falsos."
    },
    {
      "id": "custo",
      "ordem": 7,
      "narration": "Se um ataque custa dez vezes mais, o limiar ideal é 0,67: o custo cai de 173 para 72.",
      "words": [
        {"t":"Se","s":0.2,"e":0.48,"hl":false},
        {"t":"um","s":0.52,"e":0.8,"hl":false},
        {"t":"ataque","s":0.84,"e":1.24,"hl":false},
        {"t":"custa","s":1.28,"e":1.62,"hl":false},
        {"t":"dez","s":1.66,"e":1.94,"hl":true},
        {"t":"vezes","s":1.98,"e":2.32,"hl":false},
        {"t":"mais,","s":2.36,"e":2.64,"hl":false},
        {"t":"o","s":2.88,"e":3.16,"hl":false},
        {"t":"limiar","s":3.2,"e":3.54,"hl":false},
        {"t":"ideal","s":3.58,"e":3.92,"hl":false},
        {"t":"é","s":3.96,"e":4.24,"hl":false},
        {"t":"0,67:","s":4.28,"e":4.56,"hl":true},
        {"t":"o","s":4.8,"e":5.08,"hl":false},
        {"t":"custo","s":5.12,"e":5.46,"hl":false},
        {"t":"cai","s":5.5,"e":5.78,"hl":false},
        {"t":"de","s":5.82,"e":6.1,"hl":false},
        {"t":"173","s":6.14,"e":6.42,"hl":false},
        {"t":"para","s":6.46,"e":6.8,"hl":false},
        {"t":"72.","s":6.84,"e":7.12,"hl":true}
      ],
      "dur": 8.32,
      "terminal": {
        "cmd": "custo = 10·FN + 1·FP",
        "at": 0.6,
        "dur": 1.8
      },
      "status": {
        "tipo": "ok",
        "texto": "CUSTO POR MIL: 173 PARA 72",
        "at": 6.84
      },
      "scene": [
        {"at":0.2,"acao":"sumir","alvo":"bar-recall","dur":0.4},
        {"at":0.2,"acao":"sumir","alvo":"val-recall","dur":0.4},
        {"at":0.2,"acao":"sumir","alvo":"bar-prec","dur":0.4},
        {"at":0.2,"acao":"sumir","alvo":"val-prec","dur":0.4},
        {"at":0.2,"acao":"aparecer","alvo":"plano","dur":0.6},
        {"at":0.2,"acao":"sumir","alvo":"rot-fp","dur":0.2},
        {"at":0.2,"acao":"sumir","alvo":"rot-fn","dur":0.2},
        {"at":1.66,"acao":"destacar","alvo":"area-fn","dur":1},
        {"at":4.28,"acao":"mover","alvo":"limiar","dur":1.2,"para":{"x":51,"y":0}},
        {"at":4.28,"acao":"mover","alvo":"porteiro","dur":1.2,"para":{"x":51,"y":0}},
        {"at":4.28,"acao":"sumir","alvo":"area-fp","dur":0.5},
        {"at":4.28,"acao":"sumir","alvo":"area-fn","dur":0.5},
        {"at":4.28,"acao":"sumir","alvo":"rot-lim50","dur":0.5},
        {"at":4.28,"acao":"aparecer","alvo":"area-fp2","dur":0.8},
        {"at":4.28,"acao":"aparecer","alvo":"area-fn2","dur":0.8},
        {"at":4.28,"acao":"aparecer","alvo":"rot-limopt","dur":0.6},
        {"at":6.14,"acao":"aparecer","alvo":"rot-custo","dur":0.7}
      ],
      "why": "O limiar certo vem do custo de cada erro e da taxa real de ataques."
    },
    {
      "id": "guardrail",
      "ordem": 8,
      "narration": "O guardrail é a catraca na porta do LLM. Pedido com nota baixa passa. Com nota alta, fica de fora.",
      "words": [
        {"t":"O","s":0.2,"e":0.48,"hl":false},
        {"t":"guardrail","s":0.52,"e":0.86,"hl":false},
        {"t":"é","s":0.9,"e":1.18,"hl":false},
        {"t":"a","s":1.22,"e":1.5,"hl":false},
        {"t":"catraca","s":1.54,"e":1.94,"hl":true},
        {"t":"na","s":1.98,"e":2.26,"hl":false},
        {"t":"porta","s":2.3,"e":2.64,"hl":false},
        {"t":"do","s":2.68,"e":2.96,"hl":false},
        {"t":"LLM.","s":3,"e":3.28,"hl":true},
        {"t":"Pedido","s":3.72,"e":4.12,"hl":false},
        {"t":"com","s":4.16,"e":4.44,"hl":false},
        {"t":"nota","s":4.48,"e":4.82,"hl":false},
        {"t":"baixa","s":4.86,"e":5.2,"hl":true},
        {"t":"passa.","s":5.24,"e":5.58,"hl":false},
        {"t":"Com","s":6.02,"e":6.3,"hl":false},
        {"t":"nota","s":6.34,"e":6.68,"hl":false},
        {"t":"alta,","s":6.72,"e":7.06,"hl":true},
        {"t":"fica","s":7.3,"e":7.64,"hl":false},
        {"t":"de","s":7.68,"e":7.96,"hl":false},
        {"t":"fora.","s":8,"e":8.34,"hl":false}
      ],
      "dur": 9.54,
      "terminal": {
        "cmd": "if score >= limiar:\n    bloquear(pedido)",
        "at": 0.8,
        "dur": 2
      },
      "status": {
        "tipo": "ok",
        "texto": "ATAQUE BARRADO ANTES DO LLM",
        "at": 8
      },
      "scene": [
        {"at":0.2,"acao":"sumir","alvo":"plano","dur":0.6},
        {"at":1.54,"acao":"desenhar","alvo":"chao-g","dur":0.8},
        {"at":1.54,"acao":"aparecer","alvo":"catraca","dur":0.8},
        {"at":1.54,"acao":"aparecer","alvo":"rot-catraca","dur":0.6},
        {"at":3,"acao":"aparecer","alvo":"llm","dur":0.7},
        {"at":4.48,"acao":"aparecer","alvo":"pk-ok","dur":0.6},
        {"at":5.24,"acao":"mover","alvo":"pk-ok","dur":1.6,"para":{"x":245,"y":0}},
        {"at":6.34,"acao":"aparecer","alvo":"pk-atk","dur":0.6},
        {"at":7.3,"acao":"mover","alvo":"pk-atk","dur":0.8,"para":{"x":40,"y":0}},
        {"at":8,"acao":"desenhar","alvo":"x-atk","dur":0.6}
      ],
      "why": "Ataque raro derruba a precisão, então revise o que a catraca barra."
    }
  ],
  "outro": {
    "dur": 8.24,
    "narration": "Cada limiar troca um erro por outro. Escolha o seu pelo custo. Agora mexa no laboratório.",
    "words": [
      {"t":"Cada","s":0.2,"e":0.54,"hl":false},
      {"t":"limiar","s":0.58,"e":0.92,"hl":true},
      {"t":"troca","s":0.96,"e":1.3,"hl":false},
      {"t":"um","s":1.34,"e":1.62,"hl":false},
      {"t":"erro","s":1.66,"e":2,"hl":true},
      {"t":"por","s":2.04,"e":2.32,"hl":false},
      {"t":"outro.","s":2.36,"e":2.7,"hl":false},
      {"t":"Escolha","s":3.14,"e":3.54,"hl":false},
      {"t":"o","s":3.58,"e":3.86,"hl":false},
      {"t":"seu","s":3.9,"e":4.18,"hl":false},
      {"t":"pelo","s":4.22,"e":4.56,"hl":false},
      {"t":"custo.","s":4.6,"e":4.94,"hl":true},
      {"t":"Agora","s":5.38,"e":5.78,"hl":false},
      {"t":"mexa","s":5.82,"e":6.16,"hl":false},
      {"t":"no","s":6.2,"e":6.48,"hl":false},
      {"t":"laboratório.","s":6.52,"e":7.04,"hl":true}
    ],
    "scene": [
      {"at":0.2,"acao":"sumir","alvo":"guardrail","dur":0.5},
      {"at":4.6,"acao":"aparecer","alvo":"selo","dur":0.9},
      {"at":6.52,"acao":"destacar","alvo":"guia-braco","dur":1.2}
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "import numpy as np\nfrom sklearn import metrics as m\nok = np.random.normal(0.35, 0.15, 9900)\natk = np.random.normal(0.65, 0.15, 100)\ny = np.r_[np.zeros(9900), np.ones(100)]\ns = np.r_[ok, atk]\nprint(m.roc_auc_score(y, s))\np, r, t = m.precision_recall_curve(y, s)",
      "at": 0.8,
      "dur": 4.5
    }
  }
};
