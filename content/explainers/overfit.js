/* Roteiro do mini-video "Overfitting, vies e variancia" (metafora: decorar a lista de exercicios contra entender a materia). Numeros calculados por script com a semente do laboratorio: treino 14 pontos, teste 80; grau 0: 0,87,0,77; grau 5: 0,15,0,34; grau 9: 0,14,1,55; grau 9 com ridge 1e-3: 0,15,0,33; menor erro de teste no grau 5. Tempos em segundos desde o inicio de cada peca. */
window.Explainers = window.Explainers || {};
Explainers.overfit = {
  "meta": {
    "id": "overfit",
    "categoria": "MACHINE LEARNING",
    "area": "ml",
    "titulo": "Overfitting, viés e variância",
    "duracao": 73,
    "cena": "overfit"
  },
  "pieces": [
    {
      "id": "decorar",
      "ordem": 1,
      "narration": "Um aluno decora as respostas da lista. Na prova, a questão vem nova e ele erra.",
      "words": [
        {"t":"Um","s":0.2,"e":0.48,"hl":false},
        {"t":"aluno","s":0.52,"e":0.92,"hl":false},
        {"t":"decora","s":0.96,"e":1.36,"hl":true},
        {"t":"as","s":1.4,"e":1.68,"hl":false},
        {"t":"respostas","s":1.72,"e":2.12,"hl":false},
        {"t":"da","s":2.16,"e":2.44,"hl":false},
        {"t":"lista.","s":2.48,"e":2.82,"hl":true},
        {"t":"Na","s":3.26,"e":3.54,"hl":false},
        {"t":"prova,","s":3.58,"e":3.92,"hl":true},
        {"t":"a","s":4.16,"e":4.44,"hl":false},
        {"t":"questão","s":4.48,"e":4.82,"hl":false},
        {"t":"vem","s":4.86,"e":5.14,"hl":false},
        {"t":"nova","s":5.18,"e":5.52,"hl":true},
        {"t":"e","s":5.56,"e":5.84,"hl":false},
        {"t":"ele","s":5.88,"e":6.22,"hl":false},
        {"t":"erra.","s":6.26,"e":6.6,"hl":false}
      ],
      "dur": 7.8,
      "terminal": {
        "cmd": "treino = lista que ele estudou\nteste = prova com questões novas",
        "at": 3.4,
        "dur": 2.4
      },
      "status": {
        "tipo": "alerta",
        "texto": "DECOROU SEM ENTENDER",
        "at": 6.26
      },
      "scene": [
        {"at":0.2,"acao":"aparecer","alvo":"guia","dur":0.7},
        {"at":0.96,"acao":"aparecer","alvo":"lista","dur":0.8},
        {"at":1.72,"acao":"desenhar","alvo":"ticks-lista","dur":0.9},
        {"at":3.58,"acao":"aparecer","alvo":"prova","dur":0.8},
        {"at":5.18,"acao":"aparecer","alvo":"perguntas","dur":0.7},
        {"at":5.18,"acao":"destacar","alvo":"guia-braco","dur":0.9},
        {"at":6.26,"acao":"desenhar","alvo":"x-prova","dur":0.7}
      ],
      "why": "O que vale é acertar a questão que ele ainda não viu."
    },
    {
      "id": "dados",
      "ordem": 2,
      "narration": "Cada ponto é um exercício. Catorze de treino, oitenta de teste, sobre um padrão com ruído.",
      "words": [
        {"t":"Cada","s":0.2,"e":0.54,"hl":false},
        {"t":"ponto","s":0.58,"e":0.92,"hl":false},
        {"t":"é","s":0.96,"e":1.24,"hl":false},
        {"t":"um","s":1.28,"e":1.56,"hl":false},
        {"t":"exercício.","s":1.6,"e":2.06,"hl":false},
        {"t":"Catorze","s":2.5,"e":2.9,"hl":false},
        {"t":"de","s":2.94,"e":3.22,"hl":false},
        {"t":"treino,","s":3.26,"e":3.6,"hl":true},
        {"t":"oitenta","s":3.84,"e":4.24,"hl":false},
        {"t":"de","s":4.28,"e":4.56,"hl":false},
        {"t":"teste,","s":4.6,"e":4.94,"hl":true},
        {"t":"sobre","s":5.18,"e":5.52,"hl":false},
        {"t":"um","s":5.56,"e":5.84,"hl":false},
        {"t":"padrão","s":5.88,"e":6.22,"hl":true},
        {"t":"com","s":6.26,"e":6.54,"hl":false},
        {"t":"ruído.","s":6.58,"e":6.92,"hl":true}
      ],
      "dur": 8.12,
      "terminal": {
        "cmd": "n_treino, n_teste = 14, 80\nruido = 0.25   # desvio dos dados",
        "at": 1.6,
        "dur": 2.4
      },
      "scene": [
        {"at":0.2,"acao":"sumir","alvo":"lista","dur":0.5},
        {"at":0.2,"acao":"sumir","alvo":"ticks-lista","dur":0.5},
        {"at":0.2,"acao":"sumir","alvo":"prova","dur":0.5},
        {"at":0.2,"acao":"sumir","alvo":"perguntas","dur":0.5},
        {"at":0.2,"acao":"sumir","alvo":"x-prova","dur":0.5},
        {"at":0.58,"acao":"desenhar","alvo":"eixos","dur":0.9},
        {"at":0.58,"acao":"aparecer","alvo":"rot-eixos","dur":0.6},
        {"at":2.5,"acao":"aparecer","alvo":"treino","dur":0.8},
        {"at":3.26,"acao":"aparecer","alvo":"legenda","dur":0.6},
        {"at":3.84,"acao":"aparecer","alvo":"teste","dur":0.9},
        {"at":5.88,"acao":"desenhar","alvo":"verdade","dur":1.2},
        {"at":5.88,"acao":"aparecer","alvo":"rot-verdade","dur":0.6},
        {"at":6.58,"acao":"aparecer","alvo":"rot-ruido","dur":0.7}
      ],
      "why": "O treino ensina o modelo e só o teste mostra se ele aprendeu o padrão."
    },
    {
      "id": "vies",
      "ordem": 3,
      "narration": "No grau zero, o modelo é só a média. Simples demais, erra até no treino: é o viés.",
      "words": [
        {"t":"No","s":0.2,"e":0.48,"hl":false},
        {"t":"grau","s":0.52,"e":0.8,"hl":false},
        {"t":"zero,","s":0.84,"e":1.18,"hl":true},
        {"t":"o","s":1.42,"e":1.7,"hl":false},
        {"t":"modelo","s":1.74,"e":2.14,"hl":false},
        {"t":"é","s":2.18,"e":2.46,"hl":false},
        {"t":"só","s":2.5,"e":2.78,"hl":false},
        {"t":"a","s":2.82,"e":3.1,"hl":false},
        {"t":"média.","s":3.14,"e":3.48,"hl":true},
        {"t":"Simples","s":3.92,"e":4.26,"hl":false},
        {"t":"demais,","s":4.3,"e":4.64,"hl":false},
        {"t":"erra","s":4.88,"e":5.22,"hl":false},
        {"t":"até","s":5.26,"e":5.6,"hl":false},
        {"t":"no","s":5.64,"e":5.92,"hl":false},
        {"t":"treino:","s":5.96,"e":6.3,"hl":false},
        {"t":"é","s":6.54,"e":6.82,"hl":false},
        {"t":"o","s":6.86,"e":7.14,"hl":false},
        {"t":"viés.","s":7.18,"e":7.46,"hl":true}
      ],
      "dur": 8.66,
      "terminal": {
        "cmd": "y_prev = y_treino.mean()   # grau 0",
        "at": 0.6,
        "dur": 2
      },
      "status": {
        "tipo": "alerta",
        "texto": "SUBAJUSTE: ERRO ALTO NOS DOIS",
        "at": 7.18
      },
      "scene": [
        {"at":0.2,"acao":"sumir","alvo":"rot-ruido","dur":0.4},
        {"at":0.84,"acao":"destacar","alvo":"guia-braco","dur":0.9},
        {"at":3.14,"acao":"desenhar","alvo":"c-g0","dur":1},
        {"at":4.3,"acao":"aparecer","alvo":"placar-g0","dur":0.7},
        {"at":7.18,"acao":"destacar","alvo":"placar-g0","dur":0.9}
      ],
      "why": "Modelo simples demais erra em qualquer dado: é viés alto."
    },
    {
      "id": "variancia",
      "ordem": 4,
      "narration": "No grau nove, a curva decora até o ruído. Treino 0,14, teste 1,55: é a variância.",
      "words": [
        {"t":"No","s":0.2,"e":0.48,"hl":false},
        {"t":"grau","s":0.52,"e":0.8,"hl":false},
        {"t":"nove,","s":0.84,"e":1.18,"hl":true},
        {"t":"a","s":1.42,"e":1.7,"hl":false},
        {"t":"curva","s":1.74,"e":2.08,"hl":false},
        {"t":"decora","s":2.12,"e":2.52,"hl":true},
        {"t":"até","s":2.56,"e":2.9,"hl":false},
        {"t":"o","s":2.94,"e":3.22,"hl":false},
        {"t":"ruído.","s":3.26,"e":3.6,"hl":false},
        {"t":"Treino","s":4.04,"e":4.38,"hl":false},
        {"t":"0,14,","s":4.42,"e":4.7,"hl":false},
        {"t":"teste","s":4.94,"e":5.28,"hl":false},
        {"t":"1,55:","s":5.32,"e":5.6,"hl":true},
        {"t":"é","s":5.84,"e":6.12,"hl":false},
        {"t":"a","s":6.16,"e":6.44,"hl":false},
        {"t":"variância.","s":6.48,"e":6.88,"hl":true}
      ],
      "dur": 8.08,
      "terminal": {
        "cmd": "w = np.polyfit(x_treino, y_treino, 9)",
        "at": 0.4,
        "dur": 2.2
      },
      "status": {
        "tipo": "erro",
        "texto": "SOBREAJUSTE: TESTE 11× O TREINO",
        "at": 6.48
      },
      "scene": [
        {"at":0.2,"acao":"sumir","alvo":"c-g0","dur":0.5},
        {"at":0.2,"acao":"sumir","alvo":"placar-g0","dur":0.5},
        {"at":0.84,"acao":"desenhar","alvo":"c-g9","dur":1.4},
        {"at":2.12,"acao":"destacar","alvo":"treino","dur":1},
        {"at":4.04,"acao":"aparecer","alvo":"placar-g9","dur":0.7},
        {"at":6.48,"acao":"destacar","alvo":"placar-g9","dur":0.9}
      ],
      "why": "Modelo solto demais acerta o treino e falha no dado novo: é variância alta."
    },
    {
      "id": "meio",
      "ordem": 5,
      "narration": "O grau cinco segue o padrão e ignora o ruído. Treino 0,15, teste 0,34: um meio-termo.",
      "words": [
        {"t":"O","s":0.2,"e":0.48,"hl":false},
        {"t":"grau","s":0.52,"e":0.8,"hl":false},
        {"t":"cinco","s":0.84,"e":1.18,"hl":true},
        {"t":"segue","s":1.22,"e":1.56,"hl":true},
        {"t":"o","s":1.6,"e":1.88,"hl":false},
        {"t":"padrão","s":1.92,"e":2.26,"hl":false},
        {"t":"e","s":2.3,"e":2.58,"hl":false},
        {"t":"ignora","s":2.62,"e":3.02,"hl":false},
        {"t":"o","s":3.06,"e":3.34,"hl":false},
        {"t":"ruído.","s":3.38,"e":3.72,"hl":false},
        {"t":"Treino","s":4.16,"e":4.5,"hl":false},
        {"t":"0,15,","s":4.54,"e":4.82,"hl":false},
        {"t":"teste","s":5.06,"e":5.4,"hl":false},
        {"t":"0,34:","s":5.44,"e":5.72,"hl":true},
        {"t":"um","s":5.96,"e":6.24,"hl":false},
        {"t":"meio-termo.","s":6.28,"e":6.68,"hl":true}
      ],
      "dur": 7.88,
      "terminal": {
        "cmd": "grau = 5   # nem simples, nem solto",
        "at": 0.6,
        "dur": 2
      },
      "status": {
        "tipo": "ok",
        "texto": "BOM EQUILÍBRIO: TESTE 0,34",
        "at": 6.28
      },
      "scene": [
        {"at":0.2,"acao":"sumir","alvo":"c-g9","dur":0.5},
        {"at":0.2,"acao":"sumir","alvo":"placar-g9","dur":0.5},
        {"at":0.84,"acao":"desenhar","alvo":"c-g5","dur":1.2},
        {"at":4.16,"acao":"aparecer","alvo":"placar-g5","dur":0.7},
        {"at":6.28,"acao":"destacar","alvo":"placar-g5","dur":0.9}
      ],
      "why": "O meio-termo erra pouco no treino e pouco no teste."
    },
    {
      "id": "erros",
      "ordem": 6,
      "narration": "Compare os erros em cada grau. O de treino sempre cai. O de teste desce e depois sobe.",
      "words": [
        {"t":"Compare","s":0.2,"e":0.6,"hl":false},
        {"t":"os","s":0.64,"e":0.92,"hl":false},
        {"t":"erros","s":0.96,"e":1.3,"hl":false},
        {"t":"em","s":1.34,"e":1.62,"hl":false},
        {"t":"cada","s":1.66,"e":2,"hl":false},
        {"t":"grau.","s":2.04,"e":2.32,"hl":false},
        {"t":"O","s":2.76,"e":3.04,"hl":false},
        {"t":"de","s":3.08,"e":3.36,"hl":false},
        {"t":"treino","s":3.4,"e":3.74,"hl":true},
        {"t":"sempre","s":3.78,"e":4.12,"hl":false},
        {"t":"cai.","s":4.16,"e":4.44,"hl":false},
        {"t":"O","s":4.88,"e":5.16,"hl":false},
        {"t":"de","s":5.2,"e":5.48,"hl":false},
        {"t":"teste","s":5.52,"e":5.86,"hl":true},
        {"t":"desce","s":5.9,"e":6.24,"hl":false},
        {"t":"e","s":6.28,"e":6.56,"hl":false},
        {"t":"depois","s":6.6,"e":6.94,"hl":false},
        {"t":"sobe.","s":6.98,"e":7.32,"hl":true}
      ],
      "dur": 8.52,
      "terminal": {
        "cmd": "erros = [rmse(g) for g in range(11)]",
        "at": 0.6,
        "dur": 2
      },
      "status": {
        "tipo": "ok",
        "texto": "MENOR ERRO DE TESTE: GRAU 5",
        "at": 6.98
      },
      "scene": [
        {"at":0.2,"acao":"sumir","alvo":"plano","dur":0.6},
        {"at":0.2,"acao":"sumir","alvo":"c-g5","dur":0.1},
        {"at":0.2,"acao":"sumir","alvo":"placar-g5","dur":0.1},
        {"at":0.2,"acao":"aparecer","alvo":"grafico-erro","dur":0.6},
        {"at":0.96,"acao":"desenhar","alvo":"eixos2","dur":0.9},
        {"at":2.04,"acao":"aparecer","alvo":"rot-eixos2","dur":0.6},
        {"at":3.4,"acao":"desenhar","alvo":"er-treino","dur":1.3},
        {"at":3.4,"acao":"aparecer","alvo":"rot-er-treino","dur":0.6},
        {"at":5.52,"acao":"desenhar","alvo":"er-teste","dur":1.5},
        {"at":5.52,"acao":"aparecer","alvo":"rot-er-teste","dur":0.6},
        {"at":6.98,"acao":"aparecer","alvo":"er-min","dur":0.7}
      ],
      "why": "O erro de treino sempre cai; escolha o grau pelo erro de teste."
    },
    {
      "id": "regularizacao",
      "ordem": 7,
      "narration": "A regularização segura os coeficientes. No grau nove, o erro de teste cai de 1,55 para 0,33.",
      "words": [
        {"t":"A","s":0.2,"e":0.48,"hl":false},
        {"t":"regularização","s":0.52,"e":1.07,"hl":true},
        {"t":"segura","s":1.11,"e":1.51,"hl":false},
        {"t":"os","s":1.55,"e":1.83,"hl":false},
        {"t":"coeficientes.","s":1.87,"e":2.33,"hl":false},
        {"t":"No","s":2.77,"e":3.05,"hl":false},
        {"t":"grau","s":3.09,"e":3.37,"hl":false},
        {"t":"nove,","s":3.41,"e":3.75,"hl":true},
        {"t":"o","s":3.99,"e":4.27,"hl":false},
        {"t":"erro","s":4.31,"e":4.65,"hl":false},
        {"t":"de","s":4.69,"e":4.97,"hl":false},
        {"t":"teste","s":5.01,"e":5.35,"hl":false},
        {"t":"cai","s":5.39,"e":5.67,"hl":false},
        {"t":"de","s":5.71,"e":5.99,"hl":false},
        {"t":"1,55","s":6.03,"e":6.31,"hl":false},
        {"t":"para","s":6.35,"e":6.69,"hl":false},
        {"t":"0,33.","s":6.73,"e":7.01,"hl":true}
      ],
      "dur": 8.21,
      "terminal": {
        "cmd": "Ridge(alpha=1e-3)   # λ = 0,001",
        "at": 0.6,
        "dur": 2
      },
      "status": {
        "tipo": "ok",
        "texto": "GRAU 9 DOMADO: TESTE 0,33",
        "at": 6.73
      },
      "scene": [
        {"at":0.2,"acao":"sumir","alvo":"grafico-erro","dur":0.5},
        {"at":0.2,"acao":"aparecer","alvo":"plano","dur":0.6},
        {"at":3.41,"acao":"aparecer","alvo":"c-g9","dur":0.8},
        {"at":5.39,"acao":"desenhar","alvo":"c-g9r","dur":1.3},
        {"at":6.73,"acao":"aparecer","alvo":"placar-reg","dur":0.7}
      ],
      "why": "A regularização troca um pouco de ajuste no treino por estabilidade no teste."
    },
    {
      "id": "data",
      "ordem": 8,
      "narration": "Com dados no tempo, separe por data: treine nas safras antigas e teste na mais nova.",
      "words": [
        {"t":"Com","s":0.2,"e":0.48,"hl":false},
        {"t":"dados","s":0.52,"e":0.86,"hl":false},
        {"t":"no","s":0.9,"e":1.18,"hl":false},
        {"t":"tempo,","s":1.22,"e":1.56,"hl":false},
        {"t":"separe","s":1.8,"e":2.2,"hl":false},
        {"t":"por","s":2.24,"e":2.52,"hl":false},
        {"t":"data:","s":2.56,"e":2.9,"hl":true},
        {"t":"treine","s":3.14,"e":3.48,"hl":true},
        {"t":"nas","s":3.52,"e":3.8,"hl":false},
        {"t":"safras","s":3.84,"e":4.18,"hl":false},
        {"t":"antigas","s":4.22,"e":4.62,"hl":false},
        {"t":"e","s":4.66,"e":4.94,"hl":false},
        {"t":"teste","s":4.98,"e":5.32,"hl":true},
        {"t":"na","s":5.36,"e":5.64,"hl":false},
        {"t":"mais","s":5.68,"e":5.96,"hl":false},
        {"t":"nova.","s":6,"e":6.34,"hl":true}
      ],
      "dur": 7.54,
      "terminal": {
        "cmd": "treino = d[d.data < corte]\nteste  = d[d.data >= corte]",
        "at": 0.8,
        "dur": 2.2
      },
      "status": {
        "tipo": "ok",
        "texto": "SEM VAZAMENTO DO FUTURO",
        "at": 6
      },
      "scene": [
        {"at":0.2,"acao":"sumir","alvo":"plano","dur":0.6},
        {"at":1.22,"acao":"desenhar","alvo":"tempo-eixo","dur":1},
        {"at":1.22,"acao":"aparecer","alvo":"safras","dur":0.8},
        {"at":2.56,"acao":"desenhar","alvo":"corte-data","dur":0.8},
        {"at":2.56,"acao":"aparecer","alvo":"rot-corte","dur":0.6},
        {"at":3.14,"acao":"cor","alvo":"safra-1","dur":0.6,"para":{"fill":"--water"}},
        {"at":3.14,"acao":"cor","alvo":"safra-2","dur":0.6,"para":{"fill":"--water"}},
        {"at":3.14,"acao":"cor","alvo":"safra-3","dur":0.6,"para":{"fill":"--water"}},
        {"at":3.14,"acao":"cor","alvo":"safra-4","dur":0.6,"para":{"fill":"--water"}},
        {"at":3.14,"acao":"aparecer","alvo":"rot-treino-t","dur":0.6},
        {"at":4.98,"acao":"cor","alvo":"safra-teste","dur":0.6,"para":{"fill":"--terra"}},
        {"at":4.98,"acao":"aparecer","alvo":"rot-teste-t","dur":0.6}
      ],
      "why": "Em dados com data, o teste precisa vir depois do treino, como na vida real."
    }
  ],
  "outro": {
    "dur": 7.84,
    "narration": "Entre decorar e ignorar o padrão, fique no meio e regularize. Agora mexa no laboratório.",
    "words": [
      {"t":"Entre","s":0.2,"e":0.54,"hl":false},
      {"t":"decorar","s":0.58,"e":0.98,"hl":false},
      {"t":"e","s":1.02,"e":1.3,"hl":false},
      {"t":"ignorar","s":1.34,"e":1.74,"hl":false},
      {"t":"o","s":1.78,"e":2.06,"hl":false},
      {"t":"padrão,","s":2.1,"e":2.44,"hl":false},
      {"t":"fique","s":2.68,"e":3.02,"hl":false},
      {"t":"no","s":3.06,"e":3.34,"hl":false},
      {"t":"meio","s":3.38,"e":3.66,"hl":true},
      {"t":"e","s":3.7,"e":3.98,"hl":false},
      {"t":"regularize.","s":4.02,"e":4.54,"hl":true},
      {"t":"Agora","s":4.98,"e":5.38,"hl":false},
      {"t":"mexa","s":5.42,"e":5.76,"hl":false},
      {"t":"no","s":5.8,"e":6.08,"hl":false},
      {"t":"laboratório.","s":6.12,"e":6.64,"hl":true}
    ],
    "scene": [
      {"at":0.2,"acao":"sumir","alvo":"linha-tempo","dur":0.5},
      {"at":3.38,"acao":"aparecer","alvo":"selo","dur":0.9},
      {"at":6.12,"acao":"destacar","alvo":"guia-braco","dur":1.2}
    ],
    "cta": "Agora mexa no laboratório",
    "alvoLab": ".lab",
    "terminal": {
      "cmd": "import numpy as np\nimport sklearn.preprocessing as pp\nimport sklearn.linear_model as lm\nfrom sklearn.pipeline import make_pipeline\nfor g in range(11):\n    f = pp.PolynomialFeatures(g)\n    m = make_pipeline(f, lm.Ridge(1e-3))\n    m.fit(X_tr, y_tr)\n    e = m.predict(X_te) - y_te\n    print(g, np.sqrt(np.mean(e**2)))",
      "at": 0.8,
      "dur": 4.5
    }
  }
};
