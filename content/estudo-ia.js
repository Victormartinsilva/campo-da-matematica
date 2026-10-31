/* Material de estudo (fórmulas, exemplos resolvidos e exercícios) dos assuntos de IA e teoria dos jogos.
   Carregado depois de content.js: acrescenta os campos aos assuntos que já existem em CONTENT. */
Object.assign(CONTENT.rede, {
  formulas: [
    {
      nome: "Neurônio",
      expressao: "z = w₁x₁ + w₂x₂ + b   |   a = tanh(z)",
      significado: "Soma ponderada das entradas mais o viés, seguida de uma curva. A tanh devolve valores entre −1 e 1."
    },
    {
      nome: "Sigmoide e sua derivada",
      expressao: "σ(z) = 1 / (1 + e⁻ᶻ)   |   σ′(z) = σ(z)·(1 − σ(z))",
      significado: "Transforma qualquer número em probabilidade entre 0 e 1. A derivada é máxima em z = 0, onde vale 0,25."
    },
    {
      nome: "Perda de entropia cruzada (duas classes)",
      expressao: "L = −[ y·ln(p) + (1 − y)·ln(1 − p) ]",
      significado: "Mede o erro da probabilidade p contra o rótulo y (0 ou 1). Cresce muito quando o modelo erra com confiança."
    },
    {
      nome: "Backpropagation pela regra da cadeia",
      expressao: "∂L/∂w = ∂L/∂p · ∂p/∂z · ∂z/∂w   |   com sigmoide: ∂L/∂z = p − y",
      significado: "Multiplica as derivadas de trás para a frente. Na saída sigmoide com entropia cruzada, o erro de z é simplesmente p − y."
    },
    {
      nome: "Atualização dos pesos e contagem de parâmetros",
      expressao: "w ← w − η·∂L/∂w   |   rede 2-h-1: 4h + 1 parâmetros",
      significado: "O passo anda contra o gradiente, com taxa η. Em 2-h-1 há 2h pesos e h vieses na camada oculta, mais h pesos e 1 viés na saída."
    }
  ],
  exemplos: [
    {
      titulo: "Saída de um neurônio de sensor",
      enunciado: "Um neurônio recebe do sensor de vibração de uma bomba as entradas x = (2, 2), com pesos w = (1; 0,5) e viés b = −1. A ativação é tanh. Qual é a saída?",
      passos: [
        "Calcule a soma ponderada: z = 1·2 + 0,5·2 + (−1).",
        "z = 2 + 1 − 1 = 2.",
        "Aplique a curva: a = tanh(2).",
        "tanh(2) ≈ 0,9640."
      ],
      resultado: "z = 2 e saída a ≈ 0,9640. O neurônio está quase saturado, perto do teto de 1."
    },
    {
      titulo: "Um passo de backpropagation",
      enunciado: "Um modelo de triagem de cadastros tem um neurônio sigmoide com w = 0,5, b = 0 e entrada x = 2. O rótulo é y = 1 e a taxa é η = 0,5. Calcule a perda, o gradiente e o novo w e b.",
      passos: [
        "Passo adiante: z = 0,5·2 + 0 = 1, então p = σ(1) ≈ 0,7311.",
        "Perda: L = −ln(0,7311) ≈ 0,3133.",
        "Erro em z: ∂L/∂z = p − y ≈ −0,2689.",
        "Pela cadeia, ∂L/∂w = (p − y)·x ≈ −0,5379 e ∂L/∂b = p − y ≈ −0,2689.",
        "Atualize: w = 0,5 − 0,5·(−0,5379) ≈ 0,7689 e b = 0 − 0,5·(−0,2689) ≈ 0,1345.",
        "Novo passo adiante: z ≈ 1,6724, p ≈ 0,8419 e L ≈ 0,1721."
      ],
      resultado: "A perda caiu de 0,3133 para 0,1721 depois de um único passo, e p subiu de 0,7311 para 0,8419."
    }
  ],
  exercicios: [
    {
      pergunta: "Uma rede 2-h-1 tem 41 parâmetros. Quantos neurônios há na camada oculta?",
      resposta: "h = 10.",
      explicacao: "A contagem é 4h + 1 = 41, então 4h = 40 e h = 10."
    },
    {
      pergunta: "Um classificador de fraude dá p = 0,9 de que uma transação é fraude, mas ela é legítima (y = 0). Qual é a perda de entropia cruzada, com duas casas decimais?",
      resposta: "L ≈ 2,30.",
      explicacao: "Com y = 0, L = −ln(1 − p) = −ln(0,1) ≈ 2,3026. Errar com confiança custa caro."
    },
    {
      pergunta: "Um neurônio sigmoide tem w = 1, entrada x = 3, saída p = 0,9 e rótulo y = 0. Com η = 0,1, qual é o novo w depois de um passo?",
      resposta: "w = 0,73.",
      explicacao: "∂L/∂w = (p − y)·x = 0,9·3 = 2,7. Então w = 1 − 0,1·2,7 = 0,73."
    }
  ]
});

Object.assign(CONTENT.embeddings, {
  formulas: [
    {
      nome: "Produto escalar",
      expressao: "a·b = ∑ aᵢ·bᵢ",
      significado: "Soma dos produtos componente a componente. Cresce com o alinhamento e também com o tamanho dos vetores."
    },
    {
      nome: "Norma (comprimento)",
      expressao: "‖a‖ = √(∑ aᵢ²)",
      significado: "Comprimento do vetor, pelo teorema de Pitágoras em várias dimensões."
    },
    {
      nome: "Similaridade do cosseno",
      expressao: "cos θ = a·b / (‖a‖·‖b‖)",
      significado: "Mede só o ângulo entre os vetores. Vai de −1 a 1 e ignora o tamanho."
    },
    {
      nome: "Distância euclidiana",
      expressao: "d(a, b) = √(∑ (aᵢ − bᵢ)²)",
      significado: "Distância em linha reta entre os pontos. Quanto menor, mais perto."
    },
    {
      nome: "Quando os rankings diferem",
      expressao: "d² = ‖a‖² + ‖b‖² − 2·a·b",
      significado: "Se todos os vetores têm norma 1, d² = 2 − 2·cos θ e os dois rankings coincidem. Com normas diferentes, podem divergir."
    }
  ],
  exemplos: [
    {
      titulo: "Cosseno entre dois chamados de suporte",
      enunciado: "Dois chamados viram os vetores a = (1, 2, 2) e b = (2, 1, 2). Qual é a similaridade do cosseno?",
      passos: [
        "Produto escalar: a·b = 1·2 + 2·1 + 2·2 = 8.",
        "Norma de a: √(1 + 4 + 4) = 3.",
        "Norma de b: √(4 + 1 + 4) = 3.",
        "cos θ = 8 / (3·3) = 8/9 ≈ 0,889."
      ],
      resultado: "A similaridade é 8/9 ≈ 0,889. Os chamados são bem parecidos."
    },
    {
      titulo: "Cosseno e distância escolhem documentos diferentes",
      enunciado: "Uma busca interna tem a pergunta q = (3, 4) e dois documentos: D1 = (6, 8) e D2 = (4, 3). Quem fica em primeiro pelo cosseno e quem fica pela distância?",
      passos: [
        "Normas: ‖q‖ = 5, ‖D1‖ = 10 e ‖D2‖ = 5.",
        "Cosseno de D1: (18 + 32) / (5·10) = 50/50 = 1.",
        "Cosseno de D2: (12 + 12) / (5·5) = 24/25 = 0,96.",
        "Distância a D1: q − D1 = (−3, −4), então d = 5.",
        "Distância a D2: q − D2 = (−1, 1), então d = √2 ≈ 1,414."
      ],
      resultado: "O cosseno põe D1 em primeiro (1 contra 0,96). A distância põe D2 em primeiro (1,414 contra 5). D1 tem a mesma direção da pergunta, mas é mais longo."
    }
  ],
  exercicios: [
    {
      pergunta: "Calcule o produto escalar de (2, −1, 3) com (4, 5, −2).",
      resposta: "−3.",
      explicacao: "2·4 + (−1)·5 + 3·(−2) = 8 − 5 − 6 = −3. Resultado negativo indica vetores que apontam em sentidos opostos em média."
    },
    {
      pergunta: "Qual é o cosseno entre (1, 0) e (1, 1), com três casas decimais?",
      resposta: "≈ 0,707.",
      explicacao: "O produto escalar é 1, as normas são 1 e √2. Então cos θ = 1/√2 ≈ 0,707, o que corresponde a 45°."
    },
    {
      pergunta: "A pergunta é q = (2, 2). O documento A é (1, 1) e o documento B é (4, 4). Compare o cosseno e a distância euclidiana de cada um com q. Qual documento a distância prefere?",
      resposta: "Cosseno 1 para os dois (empate). Distância: A ≈ 1,41 e B ≈ 2,83. A distância prefere A.",
      explicacao: "Os três vetores têm a mesma direção, então o cosseno não distingue. A distância a A é √2 e a B é √8, e só ela enxerga a diferença de tamanho."
    }
  ]
});

Object.assign(CONTENT.atencao, {
  formulas: [
    {
      nome: "Pontuação escalada",
      expressao: "sⱼ = (q·kⱼ) / √d",
      significado: "Similaridade entre a consulta q e a chave kⱼ, dividida pela raiz da dimensão d. A escala evita pontuações grandes demais."
    },
    {
      nome: "Softmax",
      expressao: "softmax(s)ⱼ = e^sⱼ / ∑ e^sₖ",
      significado: "Transforma pontuações em pesos positivos que somam 1."
    },
    {
      nome: "Média ponderada dos valores",
      expressao: "saída = ∑ wⱼ·vⱼ",
      significado: "Cada valor vⱼ entra na mistura com seu peso wⱼ. A saída é um ponto entre os valores."
    },
    {
      nome: "Atenção completa",
      expressao: "Atenção(Q, K, V) = softmax(Q·Kᵀ / √d)·V",
      significado: "Faz a conta para todos os tokens de uma vez, com matrizes."
    },
    {
      nome: "Efeito da temperatura",
      expressao: "pesos = softmax(s / T)",
      significado: "T pequeno concentra o peso no maior valor. T grande aproxima os pesos de uma distribuição uniforme."
    }
  ],
  exemplos: [
    {
      titulo: "Pesos de atenção de três pontuações",
      enunciado: "Em um sistema de busca de contratos, um token tem pontuações s = (2, 1, 0) para três outros tokens. Quais são os pesos de atenção?",
      passos: [
        "Exponenciais: e² ≈ 7,389, e¹ ≈ 2,718 e e⁰ = 1.",
        "Soma: 7,389 + 2,718 + 1 ≈ 11,107.",
        "Pesos: 7,389/11,107 ≈ 0,665, 2,718/11,107 ≈ 0,245 e 1/11,107 ≈ 0,090.",
        "Confira: 0,665 + 0,245 + 0,090 = 1."
      ],
      resultado: "Os pesos são aproximadamente (0,665; 0,245; 0,090). O token de maior pontuação recebe dois terços da atenção."
    },
    {
      titulo: "Atenção com a escala por raiz de d",
      enunciado: "Com d = 4, a consulta é q = (1, 1, 1, 1) e há duas chaves: k₁ = (1, 1, 1, 1) e k₂ = (1, 1, −1, −1). Os valores são v₁ = (10, 0) e v₂ = (0, 10). Qual é a saída?",
      passos: [
        "Produtos escalares: q·k₁ = 4 e q·k₂ = 1 + 1 − 1 − 1 = 0.",
        "Escala: √d = 2, então as pontuações são s = (2, 0).",
        "Softmax: e² / (e² + 1) ≈ 0,8808 e 1 / (e² + 1) ≈ 0,1192.",
        "Saída: 0,8808·(10, 0) + 0,1192·(0, 10) = (8,808; 1,192)."
      ],
      resultado: "A saída é aproximadamente (8,81; 1,19). Sem a escala, as pontuações seriam (4, 0) e o peso de k₁ subiria para cerca de 0,982."
    }
  ],
  exercicios: [
    {
      pergunta: "Quatro tokens têm a mesma pontuação, s = (1, 1, 1, 1). Qual é o peso de cada um?",
      resposta: "0,25 cada.",
      explicacao: "Pontuações iguais dão exponenciais iguais, e os pesos dividem 1 por 4."
    },
    {
      pergunta: "As pontuações são s = (2, 0) e a temperatura é T = 2. Qual é o peso do primeiro token, com quatro casas decimais?",
      resposta: "≈ 0,7311.",
      explicacao: "Com T = 2 as pontuações viram (1, 0). O peso é e / (e + 1) ≈ 0,7311, menor que 0,8808 com T = 1."
    },
    {
      pergunta: "Com d = 9, a consulta tem produto escalar 6 com a chave 1 e 3 com a chave 2. Os valores escalares são v₁ = 10 e v₂ = 20. Qual é a saída da atenção, com duas casas decimais?",
      resposta: "≈ 12,69.",
      explicacao: "As pontuações escaladas são 6/3 = 2 e 3/3 = 1. Os pesos são 0,7311 e 0,2689, e a saída é 0,7311·10 + 0,2689·20 ≈ 12,69."
    }
  ]
});

Object.assign(CONTENT.token, {
  formulas: [
    {
      nome: "Softmax com temperatura",
      expressao: "pᵢ = e^(zᵢ/T) / ∑ e^(zⱼ/T)",
      significado: "Converte as pontuações z do modelo em probabilidades. T < 1 afina a distribuição e T > 1 a achata."
    },
    {
      nome: "Top-k",
      expressao: "manter os k maiores pᵢ, depois renormalizar",
      significado: "Descarta tudo fora dos k tokens mais prováveis. As probabilidades que sobram são divididas pela soma delas."
    },
    {
      nome: "Top-p (núcleo)",
      expressao: "menor conjunto cuja soma de pᵢ ≥ p",
      significado: "Ordena do mais para o menos provável e corta quando a soma acumulada alcança p. O tamanho do conjunto varia."
    },
    {
      nome: "Entropia em bits",
      expressao: "H = −∑ pᵢ·log₂(pᵢ)",
      significado: "Mede a incerteza da distribuição. Vale 0 com uma opção certa e log₂(n) com n opções igualmente prováveis."
    }
  ],
  exemplos: [
    {
      titulo: "Temperatura em um chatbot de atendimento",
      enunciado: "O modelo dá as pontuações z = (2, 1, 0, −1) para quatro respostas possíveis. Compare a probabilidade da primeira com T = 1 e com T = 0,5.",
      passos: [
        "Com T = 1: exponenciais e² ≈ 7,389, e ≈ 2,718, 1 e e⁻¹ ≈ 0,368.",
        "Soma ≈ 11,475, então p₁ = 7,389/11,475 ≈ 0,644.",
        "Com T = 0,5 as pontuações viram (4, 2, 0, −2).",
        "Exponenciais: e⁴ ≈ 54,598, e² ≈ 7,389, 1 e e⁻² ≈ 0,135. Soma ≈ 63,123.",
        "p₁ = 54,598/63,122 ≈ 0,865."
      ],
      resultado: "A primeira resposta passa de 64,4% para 86,5% quando a temperatura cai de 1 para 0,5. O modelo fica mais previsível."
    },
    {
      titulo: "Top-k e top-p em uma lista de respostas",
      enunciado: "Para o resumo de uma consulta pública, as probabilidades ordenadas são (0,50; 0,30; 0,15; 0,05). Aplique top-p = 0,9 e depois top-k = 2.",
      passos: [
        "Acumulado para top-p: 0,50, 0,80, 0,95. O corte em 0,9 ocorre no terceiro token.",
        "Tokens mantidos: três, com soma 0,95.",
        "Renormalize: 0,50/0,95 ≈ 0,526, 0,30/0,95 ≈ 0,316 e 0,15/0,95 ≈ 0,158.",
        "Com top-k = 2 ficam só os dois primeiros, com soma 0,80.",
        "Renormalize: 0,50/0,80 = 0,625 e 0,30/0,80 = 0,375."
      ],
      resultado: "O top-p = 0,9 mantém 3 tokens, com (0,526; 0,316; 0,158). O top-k = 2 mantém 2, com (0,625; 0,375)."
    }
  ],
  exercicios: [
    {
      pergunta: "Qual é a entropia, em bits, de uma distribuição uniforme sobre 8 tokens?",
      resposta: "3 bits.",
      explicacao: "Para n opções igualmente prováveis, H = log₂(n) = log₂(8) = 3."
    },
    {
      pergunta: "As pontuações são z = (4, 2, 0) e T = 2. Qual é a probabilidade do primeiro token, com três casas decimais?",
      resposta: "≈ 0,665.",
      explicacao: "Com T = 2 as pontuações viram (2, 1, 0). O softmax dá 7,389 / 11,107 ≈ 0,665."
    },
    {
      pergunta: "Qual é a entropia, em bits, da distribuição (0,7; 0,1; 0,1; 0,1), com duas casas decimais? E depois de um top-k = 1?",
      resposta: "H ≈ 1,36 bit. Com top-k = 1, H = 0.",
      explicacao: "H = −0,7·log₂(0,7) − 3·0,1·log₂(0,1) ≈ 0,360 + 0,997 ≈ 1,36. Com um só token restante a probabilidade é 1 e não há incerteza."
    }
  ]
});

Object.assign(CONTENT.jogos, {
  formulas: [
    {
      nome: "Matriz de ganhos",
      expressao: "A[i, j] = ganho da linha   |   B[i, j] = ganho da coluna",
      significado: "Cada célula traz um par de ganhos, um para cada jogador, para a combinação de jogadas (i, j)."
    },
    {
      nome: "Melhor resposta",
      expressao: "MR_linha(j) = argmaxᵢ A[i, j]   |   MR_coluna(i) = argmaxⱼ B[i, j]",
      significado: "A jogada que maximiza o ganho, dada a jogada fixa do outro."
    },
    {
      nome: "Equilíbrio de Nash puro",
      expressao: "A[i*, j*] ≥ A[i, j*] para todo i   e   B[i*, j*] ≥ B[i*, j] para todo j",
      significado: "Ninguém ganha mudando sozinho. Na tabela, é a célula onde as duas melhores respostas coincidem."
    },
    {
      nome: "Estratégia mista em 2×2",
      expressao: "p = (B₂₂ − B₂₁) / (B₁₁ − B₁₂ − B₂₁ + B₂₂)",
      significado: "Probabilidade p de a linha jogar a primeira opção que deixa a coluna indiferente. A de q, para a coluna, usa a matriz A de forma análoga."
    },
    {
      nome: "Ganho esperado",
      expressao: "E = ∑ᵢ ∑ⱼ pᵢ·qⱼ·A[i, j]",
      significado: "Média dos ganhos ponderada pelas probabilidades de cada combinação de jogadas."
    }
  ],
  exemplos: [
    {
      titulo: "Duas lojas e o preço",
      enunciado: "Duas lojas escolhem preço Alto ou Baixo. Ganhos (loja 1, loja 2): (Alto, Alto) = (5, 5); (Alto, Baixo) = (1, 7); (Baixo, Alto) = (7, 1); (Baixo, Baixo) = (3, 3). Qual é o equilíbrio de Nash puro?",
      passos: [
        "Se a loja 2 põe Alto, a loja 1 compara 5 (Alto) com 7 (Baixo) e escolhe Baixo.",
        "Se a loja 2 põe Baixo, a loja 1 compara 1 com 3 e escolhe Baixo.",
        "Por simetria, a loja 2 também escolhe Baixo, seja qual for a jogada da loja 1.",
        "A célula (Baixo, Baixo) é a única onde as duas melhores respostas coincidem.",
        "Ela dá (3, 3), pior para ambas que (5, 5)."
      ],
      resultado: "O único Nash puro é (Baixo, Baixo), com ganhos (3, 3). Cada loja ganharia mais coordenando em (Alto, Alto), mas nenhuma tem incentivo para cumprir o acordo sozinha."
    },
    {
      titulo: "Fiscalização e sonegação: estratégia mista",
      enunciado: "Uma prefeitura escolhe Fiscalizar ou Não e o contribuinte escolhe Pagar ou Sonegar. Ganhos (prefeitura, contribuinte): (F, P) = (2, 2); (F, S) = (4, 0); (N, P) = (3, 2); (N, S) = (0, 4). Não há Nash puro. Ache as probabilidades de equilíbrio.",
      passos: [
        "Seja p a probabilidade de fiscalizar. O contribuinte ganha 2 ao pagar e 4 − 4p ao sonegar.",
        "Indiferença do contribuinte: 2 = 4 − 4p, então p = 0,5.",
        "Seja q a probabilidade de pagar. A prefeitura ganha 4 − 2q ao fiscalizar e 3q ao não fiscalizar.",
        "Indiferença da prefeitura: 4 − 2q = 3q, então q = 0,8.",
        "Ganho esperado da prefeitura: 3·0,8 = 2,4."
      ],
      resultado: "A prefeitura fiscaliza com probabilidade 0,5 e o contribuinte paga com probabilidade 0,8. O ganho esperado da prefeitura é 2,4."
    }
  ],
  exercicios: [
    {
      pergunta: "Dois produtores escolhem Cooperar (C) ou Furar (F) em um acordo de cotas. Ganhos (1, 2): (C, C) = (3, 3); (C, F) = (0, 5); (F, C) = (5, 0); (F, F) = (1, 1). Qual é o Nash puro?",
      resposta: "(F, F), com ganhos (1, 1).",
      explicacao: "Furar vale mais que cooperar para cada um, qualquer que seja a jogada do outro (5 > 3 e 1 > 0). Só (F, F) satisfaz as duas melhores respostas."
    },
    {
      pergunta: "Em um jogo de coordenação, os ganhos são (2, 2) para (X, X), (1, 1) para (Y, Y) e (0, 0) nas combinações diferentes. Quantos equilíbrios de Nash puros existem?",
      resposta: "2: (X, X) e (Y, Y).",
      explicacao: "Em (X, X), quem muda para Y cai de 2 para 0. Em (Y, Y), quem muda para X cai de 1 para 0. Os dois são equilíbrios, embora (X, X) pague mais."
    },
    {
      pergunta: "Os ganhos da linha são A = [[2, 0], [0, 1]] e os da coluna são B = [[0, 1], [2, 0]]. Não há Nash puro. Com que probabilidade p a linha deve jogar sua primeira opção para deixar a coluna indiferente?",
      resposta: "p = 2/3.",
      explicacao: "A coluna ganha 0·p + 2·(1 − p) na primeira opção e 1·p + 0 na segunda. Igualando, 2 − 2p = p e p = 2/3."
    }
  ]
});
