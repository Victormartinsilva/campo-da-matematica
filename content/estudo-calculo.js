/* Material de estudo de Cálculo: fórmulas, exemplos resolvidos e exercícios com resposta.
   Carregue depois de content.js. O assunto "taylor" nasce em app.js, então aqui ele é criado em CONTENT se ainda não existir. */
CONTENT.taylor = CONTENT.taylor || {};

Object.assign(CONTENT.ideia, {
  formulas: [
    {nome: "Taxa média", expressao: "Δy / Δx", significado: "Variação do total dividida pela variação da entrada. Dá o ritmo médio no intervalo."},
    {nome: "Total com taxa constante", expressao: "V = q · Δt", significado: "Se o ritmo não muda, o total acumulado é o ritmo vezes o tempo."},
    {nome: "Teorema fundamental, parte 1", expressao: "d/dt ∫ₐᵗ q(s) ds = q(t)", significado: "Derivar o total acumulado devolve a taxa."},
    {nome: "Teorema fundamental, parte 2", expressao: "∫ₐᵇ q(t) dt = V(b) − V(a),  com V′ = q", significado: "Somar a taxa entre a e b dá a variação do total nesse intervalo."}
  ],
  exemplos: [
    {
      titulo: "Bomba com vazão crescente",
      enunciado: "Uma bomba tem vazão q(t) = 2t L/min. Qual o volume bombeado nos primeiros 5 min e qual a vazão em t = 5?",
      passos: [
        "O volume é a integral da vazão: V(t) = ∫₀ᵗ 2s ds = t².",
        "Em t = 5: V(5) = 25 L.",
        "A taxa é a derivada do volume: V′(t) = 2t.",
        "Em t = 5: V′(5) = 10 L/min, igual a q(5)."
      ],
      resultado: "Foram bombeados 25 L e a vazão em t = 5 é 10 L/min. Integrar e derivar se desfazem."
    },
    {
      titulo: "Custo marginal e custo extra",
      enunciado: "Uma fábrica tem custo total C(q) = 50 + 3q² (em reais, q em unidades). Quanto custa passar de 2 para 4 unidades?",
      passos: [
        "O custo marginal é a derivada: C′(q) = 6q.",
        "O custo extra é a integral do marginal: ∫₂⁴ 6q dq = 3·(16 − 4) = 36.",
        "Confira pelo total: C(4) = 50 + 48 = 98 e C(2) = 50 + 12 = 62.",
        "A diferença é 98 − 62 = 36."
      ],
      resultado: "Passar de 2 para 4 unidades custa R$ 36 a mais. As duas contas coincidem."
    }
  ],
  exercicios: [
    {
      pergunta: "Uma bomba mantém vazão constante de 30 L/min por 8 min. Qual o volume bombeado?",
      resposta: "240 L.",
      explicacao: "Com taxa constante, V = q · Δt = 30 · 8 = 240 L. É a área de um retângulo no gráfico da vazão."
    },
    {
      pergunta: "O volume acumulado em um tanque é V(t) = t³ litros. Qual a vazão, em L/min, no instante t = 3 min?",
      resposta: "27 L/min.",
      explicacao: "A vazão é a derivada do volume: V′(t) = 3t². Em t = 3, vale 3 · 9 = 27."
    },
    {
      pergunta: "Um servidor recebe q(t) = 3t² + 2 requisições por minuto. Quantas chegam entre t = 1 e t = 3 min?",
      resposta: "30 requisições.",
      explicacao: "Uma primitiva é V(t) = t³ + 2t. Então V(3) − V(1) = (27 + 6) − (1 + 2) = 30."
    }
  ]
});

Object.assign(CONTENT.funcao, {
  formulas: [
    {nome: "Função afim", expressao: "f(x) = a·x + b", significado: "Cresce em linha reta. O coeficiente a é a taxa por unidade de x e b é o valor em x = 0."},
    {nome: "Função quadrática e vértice", expressao: "f(x) = a·x² + b·x + c   |   x_v = −b / (2a)", significado: "Parábola. O vértice é o topo se a < 0 e o fundo se a > 0."},
    {nome: "Crescimento exponencial", expressao: "f(t) = C · bᵗ", significado: "Multiplica o valor por b a cada unidade de t. Com b > 1, cresce cada vez mais rápido."},
    {nome: "Domínio", expressao: "Dom(f) = { x : f(x) está definida }", significado: "Conjunto de entradas em que a regra vale. Fora dele, a conta não tem sentido."},
    {nome: "Composição", expressao: "(g∘f)(x) = g(f(x))", significado: "A saída de f vira a entrada de g."}
  ],
  exemplos: [
    {
      titulo: "Frete por quilômetro",
      enunciado: "Um frete custa C(d) = 50 + 2d reais, com d em km. Quanto custa levar a carga a 120 km? Até onde dá para ir com R$ 150?",
      passos: [
        "Para d = 120: C(120) = 50 + 2·120 = 290.",
        "Para R$ 150: 50 + 2d = 150, logo 2d = 100.",
        "Então d = 50 km.",
        "A regra vale para d ≥ 0, que é o domínio do problema."
      ],
      resultado: "Custa R$ 290 a 120 km, e R$ 150 pagam 50 km."
    },
    {
      titulo: "Dose de adubo e produtividade",
      enunciado: "A produtividade é y(x) = 80 + 0,30x − 0,0009x² sacas/ha, com x em kg/ha de N. Calcule y(100) e a dose que dá a maior produtividade.",
      passos: [
        "y(100) = 80 + 30 − 9 = 101 sc/ha.",
        "É uma parábola com a < 0, então o vértice é o topo.",
        "x_v = −0,30 / (2·(−0,0009)) = 0,30 / 0,0018 ≈ 166,67 kg/ha.",
        "y(166,67) = 80 + 50 − 25 = 105 sc/ha."
      ],
      resultado: "A dose de 100 kg/ha rende 101 sc/ha. O topo da curva é 105 sc/ha, em cerca de 166,7 kg/ha."
    }
  ],
  exercicios: [
    {
      pergunta: "Dada f(x) = 3x − 7, calcule f(5).",
      resposta: "8.",
      explicacao: "Substitua x por 5: 3·5 − 7 = 15 − 7 = 8."
    },
    {
      pergunta: "Qual o menor valor de x no domínio real de f(x) = √(2x − 6)?",
      resposta: "x = 3.",
      explicacao: "A raiz exige 2x − 6 ≥ 0, ou seja, x ≥ 3. O menor valor permitido é 3."
    },
    {
      pergunta: "Uma base de usuários segue U(t) = 500 · 2^(t/3), com t em meses. Em quantos meses chega a 16.000 usuários?",
      resposta: "15 meses.",
      explicacao: "Igualando, 2^(t/3) = 32 = 2⁵. Então t/3 = 5 e t = 15."
    }
  ]
});

Object.assign(CONTENT.limite, {
  formulas: [
    {nome: "Ideia de limite", expressao: "lim x→a f(x) = L", significado: "Os valores de f(x) chegam tão perto de L quanto se queira quando x se aproxima de a, sem precisar chegar em a."},
    {nome: "Limites laterais", expressao: "lim x→a f(x) existe  ⇔  lim x→a⁻ f(x) = lim x→a⁺ f(x)", significado: "Se esquerda e direita apontam para valores diferentes, o limite não existe."},
    {nome: "Limite fundamental", expressao: "lim x→0 sen(x) / x = 1", significado: "Resolve a forma 0/0 em vários problemas com seno. O ângulo está em radianos."},
    {nome: "Diferença de quadrados", expressao: "lim x→a (x² − a²) / (x − a) = 2a", significado: "Fatorar x² − a² = (x − a)(x + a) desfaz o 0/0."},
    {nome: "Continuidade", expressao: "lim x→a f(x) = f(a)", significado: "A função é contínua em a quando o limite existe e é igual ao valor da função."}
  ],
  exemplos: [
    {
      titulo: "O buraco em x = 1",
      enunciado: "Calcule o limite de f(x) = (x² − 1)/(x − 1) quando x tende a 1.",
      passos: [
        "Em x = 1 a conta dá 0/0, então f(1) não existe.",
        "Fatore o numerador: x² − 1 = (x − 1)(x + 1).",
        "Para x ≠ 1, simplifique: f(x) = x + 1.",
        "Numericamente: f(0,99) = 1,99 e f(1,01) = 2,01.",
        "Os dois lados apontam para 2."
      ],
      resultado: "O limite é 2, mesmo com a função indefinida em x = 1."
    },
    {
      titulo: "Tarifa em degrau",
      enunciado: "Uma corrida custa T(d) = 8 reais para d ≤ 10 km e T(d) = 12 reais para d > 10 km. Existe o limite de T em d = 10?",
      passos: [
        "Pela esquerda, T vale 8 em todo d < 10, então o limite lateral é 8.",
        "Pela direita, T vale 12 em todo d > 10, então o limite lateral é 12.",
        "Como 8 ≠ 12, os lados discordam."
      ],
      resultado: "O limite não existe em d = 10. A tarifa tem um salto de R$ 4 ali."
    }
  ],
  exercicios: [
    {
      pergunta: "Calcule lim x→3 (2x + 1).",
      resposta: "7.",
      explicacao: "A função é contínua em 3. Basta substituir: 2·3 + 1 = 7."
    },
    {
      pergunta: "Calcule lim x→2 (x² − 4)/(x − 2).",
      resposta: "4.",
      explicacao: "Fatore x² − 4 = (x − 2)(x + 2). Cortando x − 2, sobra x + 2, que vale 4 em x = 2."
    },
    {
      pergunta: "Calcule lim x→0 sen(3x)/x.",
      resposta: "3.",
      explicacao: "Escreva sen(3x)/x = 3 · sen(3x)/(3x). O fator sen(u)/u tende a 1, então o limite é 3."
    }
  ]
});

Object.assign(CONTENT.derivada, {
  formulas: [
    {nome: "Definição de derivada", expressao: "f′(a) = lim h→0 [f(a + h) − f(a)] / h", significado: "Inclinação da tangente em a. É a taxa de variação instantânea."},
    {nome: "Inclinação da secante", expressao: "m = [f(a + h) − f(a)] / h", significado: "Taxa média entre a e a + h. Vira a derivada quando h tende a 0."},
    {nome: "Regra da potência", expressao: "(xⁿ)′ = n · xⁿ⁻¹", significado: "Atalho para derivar potências."},
    {nome: "Reta tangente", expressao: "y = f(a) + f′(a)·(x − a)", significado: "Melhor reta que acompanha a curva perto de a."},
    {nome: "Aproximação linear", expressao: "f(a + Δx) ≈ f(a) + f′(a)·Δx", significado: "Estima a variação da saída usando a derivada. Funciona para Δx pequeno."}
  ],
  exemplos: [
    {
      titulo: "Velocidade pela definição",
      enunciado: "A posição de um corpo é s(t) = t² metros. Ache a velocidade em t = 3 s usando a definição.",
      passos: [
        "Monte o quociente: [s(3 + h) − s(3)]/h = [(3 + h)² − 9]/h.",
        "Expanda: (9 + 6h + h² − 9)/h = (6h + h²)/h = 6 + h.",
        "Com h = 0,1 a secante vale 6,1.",
        "Faça h tender a 0: o valor tende a 6."
      ],
      resultado: "A velocidade em t = 3 s é 6 m/s."
    },
    {
      titulo: "Casos acumulados e previsão pela tangente",
      enunciado: "Os casos acumulados de uma doença seguem C(t) = 40t², com t em semanas. Qual o ritmo de novos casos na semana 5 e qual a previsão linear para t = 5,5?",
      passos: [
        "Derive: C′(t) = 80t.",
        "Em t = 5: C′(5) = 400 casos por semana.",
        "Valor atual: C(5) = 40·25 = 1.000 casos.",
        "Tangente: C ≈ 1.000 + 400·(t − 5). Em t = 5,5: 1.000 + 400·0,5 = 1.200.",
        "O valor exato é 40·30,25 = 1.210, bem perto."
      ],
      resultado: "O ritmo é 400 casos/semana e a tangente prevê cerca de 1.200 casos em t = 5,5 (exato: 1.210)."
    }
  ],
  exercicios: [
    {
      pergunta: "Calcule a derivada de f(x) = x³ em x = 2.",
      resposta: "12.",
      explicacao: "Pela regra da potência, f′(x) = 3x². Em x = 2, vale 3·4 = 12."
    },
    {
      pergunta: "Se f(x) = 5x² − 3x, quanto vale f′(4)?",
      resposta: "37.",
      explicacao: "f′(x) = 10x − 3. Em x = 4: 40 − 3 = 37."
    },
    {
      pergunta: "Use a reta tangente a f(x) = √x em x = 4 para estimar √4,4.",
      resposta: "2,1.",
      explicacao: "f′(x) = 1/(2√x), então f′(4) = 1/4. A tangente dá 2 + (1/4)·0,4 = 2,1. O valor exato é cerca de 2,0976."
    }
  ]
});

Object.assign(CONTENT.regras, {
  formulas: [
    {nome: "Soma e constante", expressao: "(a·f + b·g)′ = a·f′ + b·g′", significado: "Derive termo a termo e mantenha as constantes."},
    {nome: "Produto", expressao: "(f·g)′ = f′·g + f·g′", significado: "Derive um fator de cada vez e some."},
    {nome: "Quociente", expressao: "(f/g)′ = (f′·g − f·g′) / g²", significado: "Vale onde g ≠ 0. Cuidado com a ordem do numerador."},
    {nome: "Cadeia", expressao: "(f∘g)′(x) = f′(g(x)) · g′(x)", significado: "Função dentro de função: derive a de fora e multiplique pela derivada da de dentro."},
    {nome: "Derivadas básicas", expressao: "(eˣ)′ = eˣ   |   (sen x)′ = cos x   |   (ln x)′ = 1/x", significado: "Peças usadas com as regras acima."}
  ],
  exemplos: [
    {
      titulo: "Receita marginal",
      enunciado: "O preço cai com a quantidade: p(q) = 100 − 2q reais. A receita é R(q) = q·p(q). Qual a receita marginal em q = 10?",
      passos: [
        "R é um produto de q por p(q).",
        "Pela regra do produto: R′ = 1·p + q·p′.",
        "Aqui p′ = −2, então R′(q) = 100 − 2q − 2q = 100 − 4q.",
        "Em q = 10: p(10) = 80 e R′(10) = 80 + 10·(−2) = 60."
      ],
      resultado: "A receita marginal em q = 10 é R$ 60 por unidade extra."
    },
    {
      titulo: "Gradiente de uma perda (cadeia)",
      enunciado: "Um modelo tem perda L(w) = (3w − 6)². Calcule dL/dw em w = 1.",
      passos: [
        "Função de fora: u². Função de dentro: u = 3w − 6.",
        "Derivada de fora: 2u. Derivada de dentro: 3.",
        "Cadeia: L′(w) = 2(3w − 6)·3 = 6(3w − 6).",
        "Em w = 1: u = −3, então L′(1) = 2·(−3)·3 = −18."
      ],
      resultado: "L′(1) = −18. A perda cai quando w aumenta, então o passo de ajuste vai para a direita."
    }
  ],
  exercicios: [
    {
      pergunta: "Calcule a derivada de f(x) = 4x³ + 2x em x = 1.",
      resposta: "14.",
      explicacao: "f′(x) = 12x² + 2. Em x = 1: 12 + 2 = 14."
    },
    {
      pergunta: "Calcule a derivada de f(x) = x·ln(x) em x = e.",
      resposta: "2.",
      explicacao: "Produto: f′ = 1·ln x + x·(1/x) = ln x + 1. Em x = e, ln e = 1, logo f′(e) = 2."
    },
    {
      pergunta: "Calcule a derivada de f(x) = (2x + 1)³ em x = 1.",
      resposta: "54.",
      explicacao: "Cadeia: f′ = 3(2x + 1)²·2. Em x = 1: 3·9·2 = 54."
    }
  ]
});

Object.assign(CONTENT.taylor, {
  formulas: [
    {nome: "Polinômio de Taylor", expressao: "Pₙ(x) = ∑ₖ₌₀ⁿ f⁽ᵏ⁾(a)/k! · (x − a)ᵏ", significado: "Aproxima f perto do centro a usando suas derivadas em a."},
    {nome: "Exponencial em torno de 0", expressao: "eˣ ≈ 1 + x + x²/2 + x³/6", significado: "Cada termo novo é a próxima potência dividida pelo fatorial."},
    {nome: "Seno e cosseno em torno de 0", expressao: "sen x ≈ x − x³/6 + x⁵/120   |   cos x ≈ 1 − x²/2 + x⁴/24", significado: "O seno só tem potências ímpares e o cosseno só pares. x em radianos."},
    {nome: "Logaritmo em torno de 0", expressao: "ln(1 + x) ≈ x − x²/2 + x³/3", significado: "Vale para |x| < 1. Perto do limite do intervalo, converge devagar."},
    {nome: "Resto de Lagrange", expressao: "Rₙ(x) = f⁽ⁿ⁺¹⁾(c) / (n + 1)! · (x − a)ⁿ⁺¹", significado: "Mede o erro. Existe um c entre a e x. O erro cai rápido perto do centro."}
  ],
  exemplos: [
    {
      titulo: "Pêndulo e sen θ ≈ θ",
      enunciado: "Para θ = 0,2 rad, compare sen θ com as aproximações P₁ = θ e P₃ = θ − θ³/6.",
      passos: [
        "Valor real: sen(0,2) ≈ 0,198669.",
        "P₁ = 0,2, com erro de cerca de 0,00133.",
        "P₃ = 0,2 − 0,008/6 = 0,2 − 0,001333 = 0,198667.",
        "O erro de P₃ é da ordem de 0,000002."
      ],
      resultado: "A reta já serve para ângulos pequenos (erro de 0,7%). Com o termo cúbico, o erro cai para 0,001%."
    },
    {
      titulo: "Taxa contínua equivalente a 5%",
      enunciado: "A taxa contínua equivalente a um rendimento de 5% é ln(1,05). Estime-a com Taylor de ln(1 + x), x = 0,05.",
      passos: [
        "P₁ = 0,05.",
        "P₂ = 0,05 − 0,05²/2 = 0,05 − 0,00125 = 0,04875.",
        "P₃ = 0,04875 + 0,05³/3 = 0,04875 + 0,0000417 ≈ 0,048792.",
        "O valor real é ln(1,05) ≈ 0,048790."
      ],
      resultado: "A taxa contínua é cerca de 4,879% ao ano. Três termos já acertam cinco casas decimais."
    }
  ],
  exercicios: [
    {
      pergunta: "Calcule P₂(0,4) para cos x em torno de 0.",
      resposta: "0,92.",
      explicacao: "P₂(x) = 1 − x²/2. Com x = 0,4: 1 − 0,16/2 = 0,92. O cosseno real é cerca de 0,9211."
    },
    {
      pergunta: "Use o polinômio de Taylor de ordem 2 de eˣ em torno de 0 para estimar e^0,2.",
      resposta: "1,22.",
      explicacao: "P₂ = 1 + x + x²/2 = 1 + 0,2 + 0,02 = 1,22. O valor real é cerca de 1,2214."
    },
    {
      pergunta: "Use Taylor de ordem 2 de f(x) = √x em torno de a = 4 para estimar √4,2.",
      resposta: "≈ 2,0494 (2,049375).",
      explicacao: "f(4) = 2, f′(4) = 1/4, f″(4) = −1/32. P₂ = 2 + 0,2/4 − (1/32)/2·0,04 = 2,05 − 0,000625 = 2,049375."
    }
  ]
});

Object.assign(CONTENT.maxmin, {
  formulas: [
    {nome: "Ponto crítico", expressao: "f′(x*) = 0", significado: "Candidato a máximo ou mínimo: a tangente é horizontal."},
    {nome: "Teste da segunda derivada", expressao: "f″(x*) < 0 → máximo   |   f″(x*) > 0 → mínimo", significado: "A curvatura diz se o ponto crítico é topo ou fundo."},
    {nome: "Lucro máximo", expressao: "L(x) = R(x) − C(x)   |   R′(x*) = C′(x*)", significado: "No ótimo, o que a última unidade rende é igual ao que ela custa."},
    {nome: "Dose econômica ótima", expressao: "x* = (B − c/p) / (2·C₂),  para y = A + B·x − C₂·x²", significado: "Lucro p·y − c·x, com p o preço do produto e c o custo do insumo. Fica antes do topo da produção."},
    {nome: "Intervalo fechado", expressao: "comparar f nos pontos críticos e nas extremidades", significado: "O maior e o menor valor de uma função contínua em [a, b] estão entre esses candidatos."}
  ],
  exemplos: [
    {
      titulo: "Dose que dá o maior lucro",
      enunciado: "Com y(x) = 80 + 0,30x − 0,0009x² sc/ha, preço p = R$ 60/sc e custo c = R$ 6/kg de N, ache a dose de maior lucro L = p·y − c·x.",
      passos: [
        "L′(x) = 60·(0,30 − 0,0018x) − 6 = 12 − 0,108x.",
        "L′ = 0 em x* = 12/0,108 ≈ 111,1 kg/ha.",
        "L″ = −0,108 < 0, então é um máximo.",
        "L(111,1): y ≈ 102,22 e L ≈ 6.133,3 − 666,7 = 5.466,7 reais/ha.",
        "Na dose do topo da produção (166,7): y = 105 e L = 6.300 − 1.000 = 5.300."
      ],
      resultado: "A dose ótima é cerca de 111 kg/ha (L ≈ R$ 5.467/ha). Produzir o máximo, em 166,7 kg/ha, rende R$ 5.300/ha."
    },
    {
      titulo: "Cerca com área máxima",
      enunciado: "Com 100 m de cerca, forma-se um retângulo de lados x e 50 − x. Qual x maximiza a área?",
      passos: [
        "A área é A(x) = x·(50 − x) = 50x − x².",
        "A′(x) = 50 − 2x = 0, logo x = 25.",
        "A″ = −2 < 0, então é máximo.",
        "A(25) = 25·25 = 625."
      ],
      resultado: "O melhor retângulo é um quadrado de 25 m de lado, com 625 m²."
    }
  ],
  exercicios: [
    {
      pergunta: "Em que x a função f(x) = x² − 6x + 5 tem seu mínimo?",
      resposta: "x = 3.",
      explicacao: "f′(x) = 2x − 6 = 0 dá x = 3, e f″ = 2 > 0 confirma o mínimo. O valor mínimo é f(3) = −4."
    },
    {
      pergunta: "A receita é R(q) = 100q − 2q² e o custo é C(q) = 20q + 50. Qual o lucro máximo?",
      resposta: "R$ 750.",
      explicacao: "L = 80q − 2q² − 50. L′ = 80 − 4q = 0 dá q = 20, e L(20) = 1.600 − 800 − 50 = 750."
    },
    {
      pergunta: "Qual o valor máximo de f(x) = x³ − 3x no intervalo [0, 2]?",
      resposta: "2 (em x = 2).",
      explicacao: "f′ = 3x² − 3 = 0 dá x = 1 e f(1) = −2. Nas pontas, f(0) = 0 e f(2) = 2. O máximo é 2 e o mínimo é −2."
    }
  ]
});

Object.assign(CONTENT.newton, {
  formulas: [
    {nome: "Passo de Newton", expressao: "xₙ₊₁ = xₙ − f(xₙ) / f′(xₙ)", significado: "Cruzamento da tangente em xₙ com o eixo x. Vira o novo palpite."},
    {nome: "Raiz quadrada (Heron)", expressao: "xₙ₊₁ = (xₙ + a/xₙ) / 2", significado: "Newton aplicado a f(x) = x² − a. Média entre o palpite e a/palpite."},
    {nome: "Convergência quadrática", expressao: "|eₙ₊₁| ≈ |f″(r) / (2·f′(r))| · eₙ²", significado: "Perto da raiz r, o erro é elevado ao quadrado a cada passo, e os dígitos certos dobram."},
    {nome: "Critério de parada", expressao: "|xₙ₊₁ − xₙ| < tol   ou   |f(xₙ)| < tol", significado: "Pare quando o palpite quase não muda ou o resíduo é pequeno."},
    {nome: "Falha", expressao: "f′(xₙ) = 0", significado: "Tangente horizontal nunca cruza o eixo. Troque o chute inicial."}
  ],
  exemplos: [
    {
      titulo: "Raiz de 2",
      enunciado: "Aplique Newton a f(x) = x² − 2 com x₀ = 1 e ache x₁, x₂ e x₃.",
      passos: [
        "f′(x) = 2x, então xₙ₊₁ = xₙ − (xₙ² − 2)/(2xₙ).",
        "x₁ = 1 − (−1)/2 = 1,5.",
        "x₂ = 1,5 − 0,25/3 ≈ 1,416667.",
        "x₃ = 1,416667 − 0,006944/2,833333 ≈ 1,414216."
      ],
      resultado: "x₃ ≈ 1,414216, e √2 ≈ 1,414214. Três passos já dão cinco casas."
    },
    {
      titulo: "Onde cos x encontra a reta y = x",
      enunciado: "Ache a raiz de f(x) = cos x − x. Use x₀ = 1.",
      passos: [
        "f′(x) = −sen x − 1.",
        "f(1) = 0,5403 − 1 = −0,4597 e f′(1) = −1,8415.",
        "x₁ = 1 − (−0,4597)/(−1,8415) ≈ 0,7504.",
        "Repetindo em x₁: x₂ ≈ 0,73911."
      ],
      resultado: "A raiz é cerca de 0,7391. Dois passos já acertam quatro casas."
    }
  ],
  exercicios: [
    {
      pergunta: "Para f(x) = x² − 9 com x₀ = 4, quanto vale x₁?",
      resposta: "3,125.",
      explicacao: "x₁ = 4 − (16 − 9)/(2·4) = 4 − 7/8 = 3,125. A raiz é 3."
    },
    {
      pergunta: "Use Newton em f(x) = x³ − 10 com x₀ = 2 para achar x₁ (aproximação da raiz cúbica de 10).",
      resposta: "≈ 2,1667.",
      explicacao: "f(2) = −2 e f′(2) = 12. Então x₁ = 2 − (−2)/12 = 2 + 1/6 ≈ 2,1667."
    },
    {
      pergunta: "Para f(x) = x² − 5 com x₀ = 2, calcule x₂.",
      resposta: "≈ 2,2361.",
      explicacao: "x₁ = 2 − (−1)/4 = 2,25. Depois x₂ = 2,25 − (5,0625 − 5)/4,5 ≈ 2,236111. A raiz de 5 é cerca de 2,236068."
    }
  ]
});

Object.assign(CONTENT.integral, {
  formulas: [
    {nome: "Soma de Riemann", expressao: "∑ᵢ f(xᵢ)·Δx → ∫ₐᵇ f(x) dx", significado: "Soma de áreas de retângulos finos. No limite com Δx → 0, vira a integral."},
    {nome: "Teorema fundamental", expressao: "∫ₐᵇ f(x) dx = F(b) − F(a),  com F′ = f", significado: "Calcula a área achando uma primitiva."},
    {nome: "Potência", expressao: "∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C   (n ≠ −1)", significado: "Regra básica de primitivas."},
    {nome: "Regra dos trapézios", expressao: "T = Δx · [f₀/2 + f₁ + … + fₙ₋₁ + fₙ/2]", significado: "Aproxima a área por trapézios. Costuma errar menos que retângulos."},
    {nome: "Valor médio", expressao: "f̄ = 1/(b − a) · ∫ₐᵇ f(x) dx", significado: "Altura do retângulo que tem a mesma área da curva."}
  ],
  exemplos: [
    {
      titulo: "Chuva acumulada",
      enunciado: "A intensidade da chuva é i(t) = 12·e^(−t/2) mm/h. Quanto choveu em 6 h?",
      passos: [
        "A chuva total é ∫₀⁶ 12·e^(−t/2) dt.",
        "Uma primitiva é F(t) = −24·e^(−t/2).",
        "F(6) − F(0) = −24·e⁻³ + 24 = 24·(1 − e⁻³).",
        "Com e⁻³ ≈ 0,049787, o total é 24·0,950213 ≈ 22,8."
      ],
      resultado: "Choveram cerca de 22,8 mm em 6 h."
    },
    {
      titulo: "Energia: retângulos, trapézios e exato",
      enunciado: "A potência de uma máquina é P(t) = t² kW, de 0 a 2 h. Estime a energia com 4 faixas e compare com o valor exato.",
      passos: [
        "Δt = 0,5 h. Valores: P(0) = 0, P(0,5) = 0,25, P(1) = 1, P(1,5) = 2,25, P(2) = 4.",
        "Retângulos à esquerda: 0,5·(0 + 0,25 + 1 + 2,25) = 1,75 kWh.",
        "Trapézios: 0,5·(0/2 + 0,25 + 1 + 2,25 + 4/2) = 2,75 kWh.",
        "Exato: ∫₀² t² dt = 8/3 ≈ 2,667 kWh."
      ],
      resultado: "A energia exata é cerca de 2,667 kWh. Os retângulos dão 1,75 e os trapézios, 2,75."
    }
  ],
  exercicios: [
    {
      pergunta: "Calcule ∫₀³ 2x dx.",
      resposta: "9.",
      explicacao: "Uma primitiva é x². Então 3² − 0² = 9. É a área de um triângulo de base 3 e altura 6."
    },
    {
      pergunta: "Calcule ∫₀² (x³ + 1) dx.",
      resposta: "6.",
      explicacao: "Primitiva: x⁴/4 + x. Em 2: 4 + 2 = 6. Em 0: 0. Diferença: 6."
    },
    {
      pergunta: "Qual o valor médio de f(x) = x² no intervalo [0, 3]?",
      resposta: "3.",
      explicacao: "∫₀³ x² dx = 27/3 = 9. Dividindo pelo comprimento 3: 9/3 = 3."
    }
  ]
});

Object.assign(CONTENT.multiplas, {
  formulas: [
    {nome: "Integral dupla em retângulo", expressao: "∬ f dA = ∫ₐᵇ ∫_c^d f(x, y) dy dx", significado: "Integre primeiro em y, com x fixo, depois em x. Em retângulo e f contínua, a ordem pode ser trocada."},
    {nome: "Soma por células", expressao: "∬ f dA ≈ ∑ᵢⱼ f(xᵢ, yⱼ)·Δx·Δy", significado: "Divida a região em células, meça cada uma e some. Mais células, menos erro."},
    {nome: "Massa e volume", expressao: "m = ∭ ρ(x, y, z) dV", significado: "Massa é a densidade somada sobre o volume."},
    {nome: "Valor médio", expressao: "f̄ = (1/A) · ∬ f dA", significado: "Média espacial: o total dividido pela área da região."},
    {nome: "Coordenadas polares", expressao: "dA = r dr dθ", significado: "O fator r aparece ao trocar (x, y) por (r, θ). Útil em regiões circulares."}
  ],
  exemplos: [
    {
      titulo: "Volume de chuva em um talhão",
      enunciado: "Em um talhão de 100 m × 50 m, a chuva é r(x, y) = 4 + 0,1x mm, com x em metros ao longo dos 100 m. Qual o volume de água?",
      passos: [
        "Converta mm em m: r/1000 metros de lâmina.",
        "V = ∫₀¹⁰⁰ ∫₀⁵⁰ (4 + 0,1x)/1000 dy dx.",
        "A integral em y dá 50: V = (50/1000)·∫₀¹⁰⁰ (4 + 0,1x) dx.",
        "∫₀¹⁰⁰ (4 + 0,1x) dx = 400 + 0,05·10.000 = 900.",
        "V = 0,05·900 = 45 m³."
      ],
      resultado: "Caíram 45 m³ de água. Em média, 45/5.000 m = 9 mm sobre o talhão."
    },
    {
      titulo: "Massa de solo por hectare",
      enunciado: "A densidade do solo cresce com a profundidade: ρ(z) = 1.200 + 400z kg/m³, com z em metros, de 0 a 0,3 m. Qual a massa em 1 ha (10.000 m²)?",
      passos: [
        "A densidade só depende de z, então m = 10.000 · ∫₀^0,3 ρ(z) dz.",
        "∫₀^0,3 (1.200 + 400z) dz = 1.200·0,3 + 200·0,09.",
        "Isso vale 360 + 18 = 378 kg/m².",
        "m = 10.000 · 378 = 3.780.000 kg."
      ],
      resultado: "A camada de 30 cm pesa 3.780 t por hectare, com densidade média de 1.260 kg/m³."
    }
  ],
  exercicios: [
    {
      pergunta: "Calcule ∫₀² ∫₀³ x·y dy dx.",
      resposta: "9.",
      explicacao: "A integral separa: (∫₀² x dx)·(∫₀³ y dy) = 2 · 4,5 = 9."
    },
    {
      pergunta: "A densidade populacional de uma região [0, 2] × [0, 1] (km) é f(x, y) = x + y, em mil hab/km². Quantos milhares de pessoas vivem nela?",
      resposta: "3 mil habitantes.",
      explicacao: "∫₀¹ ∫₀² (x + y) dx dy = ∫₀¹ (2 + 2y) dy = 2 + 1 = 3."
    },
    {
      pergunta: "Um bloco ocupa [0, 1] × [0, 2] × [0, 3] m e tem densidade ρ(z) = z kg/m³. Qual a massa?",
      resposta: "9 kg.",
      explicacao: "m = ∫₀¹ ∫₀² ∫₀³ z dz dy dx = 1 · 2 · (9/2) = 9."
    }
  ]
});

Object.assign(CONTENT.gradiente, {
  formulas: [
    {nome: "Gradiente", expressao: "∇f = (∂f/∂x, ∂f/∂y)", significado: "Vetor com a derivada em relação a cada variável, mantendo as outras fixas."},
    {nome: "Derivada direcional", expressao: "D_u f = ∇f · u,   com |u| = 1", significado: "Taxa de variação de f ao andar na direção do vetor unitário u."},
    {nome: "Direção de maior subida", expressao: "u = ∇f / |∇f|   →   D_u f = |∇f|", significado: "A maior taxa de subida é o módulo do gradiente. A descida mais rápida é na direção oposta."},
    {nome: "Descida do gradiente", expressao: "pₖ₊₁ = pₖ − η·∇f(pₖ)", significado: "Passo contra o gradiente, com taxa de aprendizado η. É o método básico de treino de modelos."},
    {nome: "Curvas de nível", expressao: "∇f ⟂ curva de nível de f", significado: "Andar sobre uma curva de nível não muda f, então o gradiente é perpendicular a ela."}
  ],
  exemplos: [
    {
      titulo: "Gradiente em um vale",
      enunciado: "Seja f(x, y) = 0,5x² + 4y², a superfície do laboratório. No ponto (2, 1), ache ∇f, seu módulo e a derivada nas direções (1, 0) e (0,6; 0,8).",
      passos: [
        "∂f/∂x = x e ∂f/∂y = 8y. Em (2, 1): ∇f = (2, 8).",
        "Módulo: √(4 + 64) = √68 ≈ 8,25.",
        "Em u = (1, 0): D_u f = 2·1 + 8·0 = 2.",
        "Em u = (0,6; 0,8): D_u f = 2·0,6 + 8·0,8 = 1,2 + 6,4 = 7,6."
      ],
      resultado: "∇f = (2, 8), com módulo 8,25. A subida mais rápida é 8,25, e a direção (0,6; 0,8) dá 7,6."
    },
    {
      titulo: "Dois passos de descida",
      enunciado: "Para f(x, y) = 0,5x² + 4y², comece em (2, 1) e dê dois passos de descida do gradiente com η = 0,1.",
      passos: [
        "Em (2, 1): ∇f = (2, 8) e f = 2 + 4 = 6.",
        "Passo 1: (2 − 0,2; 1 − 0,8) = (1,8; 0,2) e f = 1,62 + 0,16 = 1,78.",
        "Em (1,8; 0,2): ∇f = (1,8; 1,6).",
        "Passo 2: (1,8 − 0,18; 0,2 − 0,16) = (1,62; 0,04) e f ≈ 1,3186."
      ],
      resultado: "Em dois passos, f cai de 6 para cerca de 1,32. A descida é rápida em y e mais lenta em x."
    }
  ],
  exercicios: [
    {
      pergunta: "Para f(x, y) = x² + y², qual o módulo de ∇f no ponto (3, 4)?",
      resposta: "10.",
      explicacao: "∇f = (2x, 2y) = (6, 8). O módulo é √(36 + 64) = 10."
    },
    {
      pergunta: "Para f(x, y) = x²·y, calcule a derivada direcional em (1, 2) na direção u = (0,6; 0,8).",
      resposta: "3,2.",
      explicacao: "∇f = (2xy, x²) = (4, 1) em (1, 2). Então ∇f · u = 4·0,6 + 1·0,8 = 3,2."
    },
    {
      pergunta: "Para f(x, y) = 3x² + y², dê um passo de descida do gradiente a partir de (1, 2) com η = 0,1. Qual o valor de f no novo ponto?",
      resposta: "3,04.",
      explicacao: "∇f = (6x, 2y) = (6, 4). O novo ponto é (0,4; 1,6) e f = 3·0,16 + 2,56 = 3,04, contra 7 antes."
    }
  ]
});
