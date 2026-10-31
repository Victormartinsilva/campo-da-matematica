/* Material de estudo (fórmulas, exemplos resolvidos e exercícios) dos assuntos de álgebra linear, estatística e machine learning.
   Carregado depois de content.js: acrescenta campos aos assuntos que já existem em CONTENT. */

Object.assign(CONTENT.matrizes, {
  formulas: [
    {
      nome: "Sistema linear em forma matricial",
      expressao: "A·x = b",
      significado: "A guarda os coeficientes (cada linha é uma meta), x é o vetor de incógnitas e b são os valores que se quer atingir."
    },
    {
      nome: "Determinante de uma matriz 2×2",
      expressao: "det [[a, b], [c, d]] = a·d − b·c",
      significado: "Se for diferente de zero, a matriz tem inversa. Se for zero, a matriz é singular."
    },
    {
      nome: "Inversa de uma matriz 2×2",
      expressao: "A⁻¹ = (1/det A) · [[d, −b], [−c, a]]",
      significado: "Troca-se a posição de a e d, inverte-se o sinal de b e c e divide-se tudo pelo determinante."
    },
    {
      nome: "Solução pela inversa",
      expressao: "x = A⁻¹·b",
      significado: "Vale quando det A ≠ 0 e dá a única solução do sistema. Confira sempre voltando em A·x = b."
    },
    {
      nome: "Matriz singular",
      expressao: "det A = 0",
      significado: "Há uma linha (ou coluna) que é combinação das outras. O sistema fica sem solução ou com infinitas soluções."
    }
  ],
  exemplos: [
    {
      titulo: "Horas de máquina em uma fábrica",
      enunciado: "Uma fábrica faz dois produtos. Cada unidade de P1 usa 2 h da máquina M1 e 1 h da M2. Cada unidade de P2 usa 1 h da M1 e 3 h da M2. Em um dia, M1 trabalha 8 h e M2 trabalha 9 h, sem folga. Quantas unidades de cada produto cabem?",
      passos: [
        "Monte A = [[2, 1], [1, 3]], x = (x₁, x₂) e b = (8, 9).",
        "det A = 2·3 − 1·1 = 5, diferente de zero, então existe inversa.",
        "A⁻¹ = (1/5)·[[3, −1], [−1, 2]].",
        "x₁ = (3·8 − 1·9)/5 = 15/5 = 3.",
        "x₂ = (−1·8 + 2·9)/5 = 10/5 = 2.",
        "Confira: 2·3 + 1·2 = 8 e 1·3 + 3·2 = 9."
      ],
      resultado: "Cabem 3 unidades de P1 e 2 unidades de P2, e as duas máquinas fecham as horas exatas."
    },
    {
      titulo: "Colunas repetidas em um modelo de dados",
      enunciado: "Em um conjunto de dados, a segunda variável é sempre o dobro da primeira, e o sistema é A = [[1, 2], [2, 4]] com b = (3, 6). Ele tem solução única?",
      passos: [
        "Calcule det A = 1·4 − 2·2 = 0.",
        "Determinante zero indica que A é singular e não existe A⁻¹.",
        "A segunda linha é o dobro da primeira, e b também (6 = 2·3).",
        "Logo as duas equações dizem a mesma coisa: x₁ + 2·x₂ = 3.",
        "Por exemplo, (3, 0), (1, 1) e (−1, 2) servem."
      ],
      resultado: "Não há solução única: são infinitas. Se b fosse (3, 7), não haveria nenhuma. Variáveis redundantes causam esse problema em regressões."
    }
  ],
  exercicios: [
    {
      pergunta: "Calcule o determinante de A = [[3, 2], [1, 4]].",
      resposta: "10.",
      explicacao: "det A = 3·4 − 2·1 = 12 − 2 = 10. Como é diferente de zero, A tem inversa."
    },
    {
      pergunta: "Para A = [[4, 7], [2, 6]], ache A⁻¹ e resolva A·x = (15, 10).",
      resposta: "A⁻¹ = [[0,6, −0,7], [−0,2, 0,4]] e x = (2, 1).",
      explicacao: "det A = 24 − 14 = 10, então A⁻¹ = (1/10)·[[6, −7], [−2, 4]]. Daí x₁ = 0,6·15 − 0,7·10 = 2 e x₂ = −0,2·15 + 0,4·10 = 1."
    },
    {
      pergunta: "Para que valor de k a matriz [[2, k], [3, 6]] é singular?",
      resposta: "k = 4.",
      explicacao: "Imponha det = 2·6 − k·3 = 12 − 3k = 0. Então k = 4, e a primeira linha vira (2, 4), que é 2/3 da segunda."
    }
  ]
});

Object.assign(CONTENT.estatistica, {
  formulas: [
    {
      nome: "Média e variância amostrais",
      expressao: "x̄ = (∑xᵢ)/n   |   s² = ∑(xᵢ − x̄)² / (n − 1)",
      significado: "Resumem o centro e a dispersão da amostra. O divisor n − 1 corrige o fato de x̄ ter sido estimada dos mesmos dados."
    },
    {
      nome: "Erro padrão da diferença (Welch)",
      expressao: "EP = √( s₁²/n₁ + s₂²/n₂ )",
      significado: "Mede o quanto a diferença entre duas médias oscila só por acaso. Não exige variâncias iguais."
    },
    {
      nome: "Estatística t de Welch",
      expressao: "t = (x̄₁ − x̄₂) / EP",
      significado: "Diferença observada medida em unidades de erro padrão. Valores longe de zero são raros se não houver efeito real."
    },
    {
      nome: "Graus de liberdade de Welch-Satterthwaite",
      expressao: "gl = (s₁²/n₁ + s₂²/n₂)² / [ (s₁²/n₁)²/(n₁ − 1) + (s₂²/n₂)²/(n₂ − 1) ]",
      significado: "Define a curva t usada para obter o p-valor. Fica entre o menor (n − 1) e n₁ + n₂ − 2."
    },
    {
      nome: "Tamanho da amostra por grupo",
      expressao: "n ≈ 2·(z₁₋α/₂ + z₁₋β)² · σ² / δ²",
      significado: "Para detectar uma diferença δ com desvio σ, nível α e poder 1 − β. Arredonde sempre para cima."
    }
  ],
  exemplos: [
    {
      titulo: "Duas cultivares em cinco parcelas cada",
      enunciado: "Produtividade (sc/ha) da cultivar A: 56, 58, 60, 62, 64. Da cultivar B: 60, 62, 64, 66, 68. Calcule o t de Welch e os graus de liberdade.",
      passos: [
        "Médias: x̄ₐ = 300/5 = 60 e x̄ᵦ = 320/5 = 64.",
        "Variância de A: (16 + 4 + 0 + 4 + 16)/4 = 10. B tem os mesmos desvios, logo também 10.",
        "EP = √(10/5 + 10/5) = √4 = 2.",
        "t = (60 − 64)/2 = −2.",
        "gl = (2 + 2)² / (2²/4 + 2²/4) = 16/2 = 8."
      ],
      resultado: "t = −2 com 8 graus de liberdade. O p-valor bilateral fica perto de 0,08, acima de 0,05: com 5 parcelas, 4 sc/ha ainda pode ser acaso."
    },
    {
      titulo: "Quantos pacientes por grupo",
      enunciado: "Um ensaio quer detectar uma queda de 5 mmHg na pressão arterial, com desvio de 10 mmHg, nível α = 0,05 (bilateral) e poder de 80%. Quantos pacientes por grupo?",
      passos: [
        "Pegue z₁₋α/₂ = 1,96 e z₁₋β = 0,84 (poder de 80%).",
        "A soma é 1,96 + 0,84 = 2,80, e 2,80² ≈ 7,85.",
        "A razão σ²/δ² = 100/25 = 4.",
        "n = 2 · 7,85 · 4 ≈ 62,8.",
        "Arredonde para cima."
      ],
      resultado: "São necessários 63 pacientes por grupo, 126 no total. Se δ caísse à metade, n quadruplicaria."
    }
  ],
  exercicios: [
    {
      pergunta: "Dois modelos de IA têm latência média de 130 ms e 124 ms, variância 18 ms² em cada um, medida em 9 requisições por modelo. Qual é o t de Welch?",
      resposta: "t = 3.",
      explicacao: "EP = √(18/9 + 18/9) = √4 = 2. A diferença é 6, então t = 6/2 = 3."
    },
    {
      pergunta: "Em um teste A/B, o erro padrão da diferença é 4 com 25 usuários por grupo. Quanto passa a ser com 100 usuários por grupo, se o desvio não mudar?",
      resposta: "2.",
      explicacao: "O erro padrão cai com √n. Quadruplicar n divide o EP por 2, e 4/2 = 2."
    },
    {
      pergunta: "Uma empresa quer detectar um ganho de 15 pontos em um índice com σ = 30, α = 0,05 bilateral e poder de 90% (z = 1,96 e 1,28). Quantos clientes por grupo?",
      resposta: "85 por grupo.",
      explicacao: "(1,96 + 1,28)² ≈ 10,5 e σ²/δ² = 900/225 = 4. Então n ≈ 2·10,5·4 = 84,1, que sobe para 85."
    }
  ]
});

Object.assign(CONTENT.regressao, {
  formulas: [
    {
      nome: "Modelo linear simples",
      expressao: "ŷ = b + w·x",
      significado: "w é a inclinação (quanto y muda por unidade de x) e b é o intercepto (valor previsto em x = 0)."
    },
    {
      nome: "Erro quadrático médio",
      expressao: "EQM = (1/n) · ∑(ŷᵢ − yᵢ)²",
      significado: "Média dos quadrados dos erros. É a perda que a reta ajustada procura minimizar."
    },
    {
      nome: "Mínimos quadrados (forma fechada)",
      expressao: "w = ∑(xᵢ − x̄)(yᵢ − ȳ) / ∑(xᵢ − x̄)²   |   b = ȳ − w·x̄",
      significado: "Dá a reta de menor EQM direto dos dados, sem iterar. A reta passa sempre pelo ponto (x̄, ȳ)."
    },
    {
      nome: "Gradiente do EQM",
      expressao: "∂EQM/∂w = (2/n)·∑ eᵢ·xᵢ   |   ∂EQM/∂b = (2/n)·∑ eᵢ,   com eᵢ = ŷᵢ − yᵢ",
      significado: "Mostra para onde a perda cresce mais rápido em cada parâmetro."
    },
    {
      nome: "Passo do gradiente descendente",
      expressao: "w ← w − η·∂EQM/∂w   |   b ← b − η·∂EQM/∂b",
      significado: "η é a taxa de aprendizado. Pequeno demais é lento, grande demais oscila ou diverge."
    }
  ],
  exemplos: [
    {
      titulo: "Vendas em função do gasto com anúncios",
      enunciado: "Uma loja registrou o gasto com anúncios x (mil R$) e as vendas y (mil unidades) em 5 meses: x = 1, 2, 3, 4, 5 e y = 2, 4, 5, 4, 5. Ajuste a reta e calcule o EQM.",
      passos: [
        "Médias: x̄ = 3 e ȳ = 4.",
        "∑(x − x̄)(y − ȳ) = (−2)(−2) + (−1)(0) + 0·1 + 1·0 + 2·1 = 6.",
        "∑(x − x̄)² = 4 + 1 + 0 + 1 + 4 = 10.",
        "w = 6/10 = 0,6 e b = 4 − 0,6·3 = 2,2.",
        "Previsões: 2,8; 3,4; 4,0; 4,6; 5,2. Erros ao quadrado: 0,64; 0,36; 1; 0,36; 0,04.",
        "EQM = 2,4/5 = 0,48."
      ],
      resultado: "A reta é ŷ = 2,2 + 0,6·x, com EQM = 0,48. Cada mil reais a mais em anúncios soma cerca de 0,6 mil unidades vendidas."
    },
    {
      titulo: "Um passo de gradiente na calibração de um sensor",
      enunciado: "Leituras de um sensor: x = 1, 2, 3 e y = 2, 4, 6. Comece com w = 0, b = 0 e use η = 0,1. Calcule os parâmetros após um passo.",
      passos: [
        "Com w = b = 0, as previsões são 0 e os erros eᵢ = ŷ − y são −2, −4, −6.",
        "EQM inicial = (4 + 16 + 36)/3 ≈ 18,67.",
        "∂EQM/∂w = (2/3)·(−2·1 − 4·2 − 6·3) = (2/3)·(−28) ≈ −18,67.",
        "∂EQM/∂b = (2/3)·(−12) = −8.",
        "w ← 0 − 0,1·(−18,67) ≈ 1,87 e b ← 0 − 0,1·(−8) = 0,8."
      ],
      resultado: "Após um passo, w ≈ 1,87 e b = 0,8. Os dados seguem y = 2·x, então w já está perto do valor correto de 2."
    }
  ],
  exercicios: [
    {
      pergunta: "Em uma triagem, os valores reais de y são 3, 5 e 8 e o modelo prevê 2, 5 e 10. Qual é o EQM?",
      resposta: "5/3 ≈ 1,67.",
      explicacao: "Os erros são −1, 0 e 2. Ao quadrado: 1, 0 e 4. A média é 5/3."
    },
    {
      pergunta: "Pressão no pneu y (psi) por carga x (t): x = 2, 4, 6 e y = 10, 14, 12. Ache a reta de mínimos quadrados.",
      resposta: "ŷ = 10 + 0,5·x.",
      explicacao: "x̄ = 4 e ȳ = 12. ∑(x − x̄)(y − ȳ) = (−2)(−2) + 0 + (2)(0) = 4 e ∑(x − x̄)² = 8, então w = 0,5. Daí b = 12 − 0,5·4 = 10."
    },
    {
      pergunta: "Minimize L(w) = w² por gradiente descendente começando em w = 3. Qual é w após um passo com η = 0,25? E com η = 1,1?",
      resposta: "w = 1,5 com η = 0,25 e w = −3,6 com η = 1,1.",
      explicacao: "O gradiente é 2w = 6. Com 0,25: 3 − 0,25·6 = 1,5. Com 1,1: 3 − 1,1·6 = −3,6, que está mais longe de 0 do que o ponto inicial, sinal de divergência."
    }
  ]
});

Object.assign(CONTENT.otimizadores, {
  formulas: [
    {
      nome: "Gradiente descendente",
      expressao: "pₜ₊₁ = pₜ − η·∇f(pₜ)",
      significado: "Anda contra o gradiente, com passo proporcional à inclinação local."
    },
    {
      nome: "Momento",
      expressao: "vₜ₊₁ = β·vₜ + ∇f(pₜ)   |   pₜ₊₁ = pₜ − η·vₜ₊₁",
      significado: "v acumula os gradientes recentes. As viradas se cancelam e a direção constante ganha velocidade. Costuma-se usar β = 0,9."
    },
    {
      nome: "Adam",
      expressao: "m = β₁m + (1 − β₁)g   |   s = β₂s + (1 − β₂)g²   |   p ← p − η·m̂/(√ŝ + ε)",
      significado: "m̂ e ŝ são m e s corrigidos no início (divididos por 1 − βᵗ). Cada eixo recebe um passo na própria escala."
    },
    {
      nome: "Número de condição",
      expressao: "κ = λmáx / λmín",
      significado: "Razão entre a maior e a menor curvatura (autovalores do Hessiano). Quanto maior, mais difícil é a descida."
    },
    {
      nome: "Passo máximo estável (quadrática)",
      expressao: "η < 2 / λmáx",
      significado: "Acima desse valor o gradiente puro diverge no eixo mais curvo. A convergência no eixo plano segue lenta, na razão 1 − η·λmín."
    }
  ],
  exemplos: [
    {
      titulo: "Gradiente puro em um vale estreito",
      enunciado: "Treine uma função de perda f(x, y) = ½x² + 4y², com gradiente (x, 8y). Comece em (2,5; 1,5) com η = 0,1. Calcule κ e dois passos de gradiente descendente.",
      passos: [
        "O Hessiano é diag(1, 8), logo κ = 8/1 = 8.",
        "A atualização é x ← x − 0,1·x = 0,9·x e y ← y − 0,1·8y = 0,2·y.",
        "Passo 1: (2,5·0,9; 1,5·0,2) = (2,25; 0,3).",
        "Passo 2: (2,25·0,9; 0,3·0,2) = (2,025; 0,06).",
        "O limite de estabilidade é η < 2/8 = 0,25, e 0,1 está dentro."
      ],
      resultado: "κ = 8 e, após 2 passos, o ponto é (2,025; 0,06). O eixo y quase zerou, mas x mal se mexeu: é essa disparidade de escalas que torna o treino lento."
    },
    {
      titulo: "O primeiro passo do Adam",
      enunciado: "No mesmo vale, o gradiente inicial em (2,5; 1,5) é g = (2,5; 12). Com η = 0,1, β₁ = 0,9, β₂ = 0,999 e ε muito pequeno, qual é o primeiro passo do Adam?",
      passos: [
        "Após o primeiro passo, m = 0,1·g e s = 0,001·g².",
        "As correções dividem por 1 − 0,9 = 0,1 e por 1 − 0,999 = 0,001, então m̂ = g e ŝ = g².",
        "O passo em cada eixo é η·g/|g| = η·sinal(g).",
        "Ambos os componentes de g são positivos, então cada coordenada anda 0,1 para baixo.",
        "Novo ponto: (2,5 − 0,1; 1,5 − 0,1) = (2,4; 1,4)."
      ],
      resultado: "O ponto vai para (2,4; 1,4). No primeiro passo, o Adam anda o mesmo tamanho nos dois eixos, mesmo com gradientes de 2,5 e 12. É isso que ele corrige em relação ao gradiente puro."
    }
  ],
  exercicios: [
    {
      pergunta: "Uma perda quadrática tem Hessiano com autovalores 2 e 50. Qual é o número de condição?",
      resposta: "κ = 25.",
      explicacao: "κ = λmáx/λmín = 50/2 = 25. Um κ alto indica um vale estreito e comprido."
    },
    {
      pergunta: "Aplique gradiente descendente a f(x) = 5x² (gradiente 10x) com η = 0,15, a partir de x = 4. Quanto vale x após 2 passos?",
      resposta: "x₁ = −2 e x₂ = 1.",
      explicacao: "A cada passo, x ← x − 0,15·10x = −0,5·x. Então 4 vira −2 e depois 1. Converge oscilando, porque 0,15 passa de 1/10 (o passo ideal) mas fica abaixo de 2/10."
    },
    {
      pergunta: "Em f(p) = ½p², comece em p = 2 com η = 0,1 e momento β = 0,9, com v inicial 0. Qual é p após 2 passos? Compare com o gradiente puro.",
      resposta: "Com momento, p = 1,44. Com gradiente puro, p = 1,62.",
      explicacao: "Passo 1: v = 2, p = 2 − 0,2 = 1,8. Passo 2: v = 0,9·2 + 1,8 = 3,6, p = 1,8 − 0,36 = 1,44. O gradiente puro dá 2 → 1,8 → 1,62. O momento acumulou velocidade e chegou mais perto do mínimo."
    }
  ]
});

Object.assign(CONTENT.overfit, {
  formulas: [
    {
      nome: "Decomposição do erro esperado",
      expressao: "Erro = viés² + variância + ruído",
      significado: "Viés é o erro sistemático de um modelo simples demais. Variância é a sensibilidade ao conjunto de treino. O ruído do próprio fenômeno não tem como ser reduzido."
    },
    {
      nome: "Erro de treino e erro de teste",
      expressao: "EQM_treino = (1/n)·∑(ŷ − y)²   |   EQM_teste = a mesma conta em dados não vistos",
      significado: "O erro de treino sempre cai com a complexidade. O erro de teste estima o desempenho real e mostra o overfitting quando sobe."
    },
    {
      nome: "Validação cruzada com k partes",
      expressao: "erro_CV = (1/k)·∑ erroⱼ",
      significado: "Cada parte serve de teste uma vez. A média dá uma estimativa mais estável do que uma única separação."
    },
    {
      nome: "Perda ridge",
      expressao: "L(w) = ∑(yᵢ − ŷᵢ)² + λ·∑ wⱼ²",
      significado: "Soma ao erro uma penalização sobre o tamanho dos coeficientes. λ maior encolhe mais o modelo."
    },
    {
      nome: "Ridge com uma variável sem intercepto",
      expressao: "w = ∑xᵢyᵢ / (∑xᵢ² + λ)",
      significado: "Com λ = 0 volta a ser mínimos quadrados. Conforme λ cresce, w tende a zero."
    }
  ],
  exemplos: [
    {
      titulo: "Previsão de demanda: modelo simples ou flexível?",
      enunciado: "Uma varejista compara dois modelos de demanda. O simples tem viés 3 e variância 1. O flexível tem viés 1 e variância 12. O ruído dos dados é 4. Qual tem menor erro esperado?",
      passos: [
        "Use erro = viés² + variância + ruído.",
        "Simples: 3² + 1 + 4 = 9 + 1 + 4 = 14.",
        "Flexível: 1² + 12 + 4 = 1 + 12 + 4 = 17.",
        "O flexível erra menos em média no treino, mas a variância alta o prejudica em dados novos."
      ],
      resultado: "O modelo simples vence, com erro esperado 14 contra 17. Tirar viés não compensa se a variância dispara."
    },
    {
      titulo: "Ridge encolhe o coeficiente",
      enunciado: "Em um modelo de retorno de ativo, x = 1, 2, 3 e y = 2, 4, 6, sem intercepto. Calcule w para λ = 0, λ = 7 e λ = 14.",
      passos: [
        "∑xy = 1·2 + 2·4 + 3·6 = 28 e ∑x² = 1 + 4 + 9 = 14.",
        "λ = 0: w = 28/14 = 2.",
        "λ = 7: w = 28/(14 + 7) = 28/21 ≈ 1,33.",
        "λ = 14: w = 28/(14 + 14) = 1."
      ],
      resultado: "w vai de 2 para 1,33 e depois para 1. A penalização troca um pouco de viés por menos variância, e λ deve ser escolhido por validação."
    }
  ],
  exercicios: [
    {
      pergunta: "Um modelo tem viés = 3, variância = 4 e ruído = 2. Qual é o erro esperado?",
      resposta: "15.",
      explicacao: "Erro = viés² + variância + ruído = 9 + 4 + 2 = 15."
    },
    {
      pergunta: "Em uma validação cruzada com 5 partes, os erros foram 4, 6, 5, 7 e 3. Calcule a média e o desvio padrão amostral.",
      resposta: "Média 5 e desvio ≈ 1,58.",
      explicacao: "A soma é 25, então a média é 5. Os desvios ao quadrado são 1, 1, 0, 4 e 4, com soma 10. A variância é 10/4 = 2,5 e √2,5 ≈ 1,58."
    },
    {
      pergunta: "Em uma regressão ridge com uma variável e sem intercepto, ∑xy = 12 e ∑x² = 8. Qual é w com λ = 4? E sem regularização?",
      resposta: "w = 1 com λ = 4 e w = 1,5 sem regularização.",
      explicacao: "Sem regularização, w = 12/8 = 1,5. Com ridge, w = 12/(8 + 4) = 1. A penalização encolheu o coeficiente em um terço."
    }
  ]
});

Object.assign(CONTENT.logistica, {
  formulas: [
    {
      nome: "Função sigmoide",
      expressao: "σ(z) = 1 / (1 + e⁻ᶻ)",
      significado: "Transforma o escore linear z em uma probabilidade entre 0 e 1. Em z = 0, vale 0,5."
    },
    {
      nome: "Precisão e recall",
      expressao: "precisão = VP / (VP + FP)   |   recall = VP / (VP + FN)",
      significado: "Precisão: dos que o modelo marcou, quantos eram positivos de fato. Recall: dos positivos reais, quantos o modelo achou."
    },
    {
      nome: "Ponto da curva ROC",
      expressao: "TPR = VP / (VP + FN)   |   FPR = FP / (FP + VN)",
      significado: "Cada limiar gera um ponto (FPR, TPR). Subir o limiar leva para a esquerda e para baixo na curva."
    },
    {
      nome: "Precisão e taxa base",
      expressao: "precisão = r·TPR / ( r·TPR + (1 − r)·FPR )",
      significado: "r é a proporção real de positivos. Com r pequeno, o termo (1 − r)·FPR domina e a precisão cai, mesmo com um bom filtro."
    },
    {
      nome: "Medida F1",
      expressao: "F1 = 2·precisão·recall / (precisão + recall)",
      significado: "Média harmônica entre precisão e recall. Fica baixa se qualquer um dos dois for baixo."
    }
  ],
  exemplos: [
    {
      titulo: "Matriz de confusão de um filtro de ataques",
      enunciado: "Um filtro analisa 10.000 pedidos, dos quais 100 são ataques. Em um limiar, ele pega 80 dos ataques e bloqueia 2% dos pedidos legítimos. Monte a matriz de confusão e calcule precisão e recall.",
      passos: [
        "Ataques: VP = 80 e FN = 100 − 80 = 20.",
        "Legítimos: são 9.900, então FP = 2% · 9.900 = 198 e VN = 9.702.",
        "Recall = 80/(80 + 20) = 0,80.",
        "Precisão = 80/(80 + 198) = 80/278 ≈ 0,288.",
        "O ponto ROC é (FPR; TPR) = (0,02; 0,80)."
      ],
      resultado: "Recall de 80%, mas precisão de só 28,8%: mais de 7 em cada 10 bloqueios são pedidos legítimos, porque eles são muito mais numerosos."
    },
    {
      titulo: "O mesmo teste em duas populações",
      enunciado: "Um teste de triagem de saúde tem sensibilidade (TPR) de 90% e taxa de falsos positivos (FPR) de 5%. Qual é a precisão se a doença atinge 1% da população? E se atinge 10%?",
      passos: [
        "Use precisão = r·TPR / (r·TPR + (1 − r)·FPR).",
        "Com r = 0,01: numerador 0,01·0,90 = 0,009 e (0,99)·0,05 = 0,0495.",
        "Precisão = 0,009/(0,009 + 0,0495) ≈ 0,154.",
        "Com r = 0,10: numerador 0,09 e (0,90)·0,05 = 0,045.",
        "Precisão = 0,09/(0,09 + 0,045) ≈ 0,667."
      ],
      resultado: "A precisão é cerca de 15,4% com taxa base de 1% e cerca de 66,7% com taxa base de 10%. O mesmo teste muda de utilidade conforme a população testada."
    }
  ],
  exercicios: [
    {
      pergunta: "Um classificador produz VP = 45, FP = 15 e FN = 5. Calcule precisão e recall.",
      resposta: "Precisão = 0,75 e recall = 0,90.",
      explicacao: "Precisão = 45/(45 + 15) = 0,75. Recall = 45/(45 + 5) = 0,90."
    },
    {
      pergunta: "Em um limiar de um modelo de crédito: VP = 90, FN = 10, FP = 30 e VN = 970. Qual é o ponto (FPR, TPR) da curva ROC?",
      resposta: "(0,03; 0,90).",
      explicacao: "FPR = 30/(30 + 970) = 0,03 e TPR = 90/(90 + 10) = 0,90."
    },
    {
      pergunta: "Um detector de fraudes tem TPR = 0,8 e FPR = 0,1. Se a fraude ocorre em 5% das transações, qual é a precisão?",
      resposta: "Cerca de 0,296.",
      explicacao: "Numerador: 0,05·0,8 = 0,04. Falsos alarmes: 0,95·0,1 = 0,095. Precisão = 0,04/(0,04 + 0,095) = 0,04/0,135 ≈ 0,296."
    }
  ]
});
