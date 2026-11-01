/* Erros comuns: três confusões frequentes por assunto, cada uma com a correção.
   Carregue depois de content.js e antes de app.js. Os assuntos definidos só em app.js (ex.: taylor) nascem aqui em CONTENT. */
["taylor", "vetores", "propulsao", "gravidade", "manobras"].forEach(id => { CONTENT[id] = CONTENT[id] || {}; });

Object.assign(CONTENT.ideia, {erros: [
  {erro: "Se a vazão está caindo, o volume acumulado também está caindo.",
   correcao: "O total só diminui quando a taxa é negativa. Com q(t) = 10 − t, a vazão cai o tempo todo, mas V(3) = 25,5 L e V(4) = 32 L: o volume continua subindo enquanto q > 0."},
  {erro: "Taxa média e taxa instantânea são a mesma coisa.",
   correcao: "A média resume um intervalo e a instantânea vale em um ponto. Com V(t) = t², a média entre 0 e 5 min é 25 / 5 = 5 L/min, mas a vazão em t = 5 é V′(5) = 10 L/min."},
  {erro: "A integral de q entre a e b é V(b).",
   correcao: "É V(b) − V(a), porque a primitiva é definida a menos de uma constante. Com q = 2t e V = t² + C, de 1 a 3 sai (9 + C) − (1 + C) = 8. Usar só V(3) daria 9 + C, que depende de C."}
]});

Object.assign(CONTENT.funcao, {erros: [
  {erro: "O domínio de qualquer função é todos os números reais.",
   correcao: "O domínio é onde a regra faz sentido. 1/(x − 2) não existe em x = 2 e √(x − 3) exige x ≥ 3. Em dados, o equivalente é prever fora da faixa que o modelo viu."},
  {erro: "g(f(x)) e f(g(x)) dão o mesmo resultado.",
   correcao: "A composição depende da ordem. Com f(x) = x + 1 e g(x) = x², g(f(2)) = 9 e f(g(2)) = 5."},
  {erro: "Crescer 5% ao ano por 10 anos dá 50% no total.",
   correcao: "Crescimento exponencial multiplica a cada período: 1,05¹⁰ ≈ 1,629, ou seja, 62,9%. A conta linear subestima porque ignora o ganho sobre o que já cresceu."}
]});

Object.assign(CONTENT.limite, {erros: [
  {erro: "Se f(a) existe, o limite em a é f(a).",
   correcao: "O limite olha os vizinhos de a, e o valor no ponto pode ser outro. Se f(x) = x para x ≠ 0 e f(0) = 5, o limite em 0 é 0 e f(0) = 5. A função é contínua em a só quando os dois coincidem."},
  {erro: "O limite de |x|/x em x = 0 é 1, porque eu testei x = 0,1.",
   correcao: "Testar só um lado engana. Pela direita o valor é +1 e pela esquerda é −1. Com limites laterais diferentes, o limite não existe."},
  {erro: "O limite de sen(x)/x quando x → 0 é 0, porque sen 0 = 0.",
   correcao: "Numerador e denominador vão a zero juntos, e a razão vai a 1: sen(0,1)/0,1 ≈ 0,9983. Isso vale com x em radianos; em graus o limite é outro número."}
]});

Object.assign(CONTENT.derivada, {erros: [
  {erro: "A derivada em a é a inclinação da reta entre dois pontos do gráfico.",
   correcao: "Essa é a secante. A derivada é o limite dela quando h → 0. Com f(x) = x² em a = 1, a secante com h = 1 dá 3, com h = 0,01 dá 2,01, e a derivada é 2."},
  {erro: "A reta tangente prevê bem em qualquer distância do ponto.",
   correcao: "A aproximação linear só é boa perto de a. Para f(x) = x² em a = 3, a tangente prevê f(5) ≈ 9 + 6·2 = 21, e o valor real é 25."},
  {erro: "Se f′(a) > 0, então f(a) > 0.",
   correcao: "A derivada diz para onde a função anda, e o valor de f diz onde ela está. Com f(x) = x − 10, f′(3) = 1 > 0 e f(3) = −7. Na unidade, f′ é unidade de saída por unidade de entrada."}
]});

Object.assign(CONTENT.regras, {erros: [
  {erro: "A derivada de f·g é f′·g′.",
   correcao: "O produto tem dois termos: (f·g)′ = f′·g + f·g′. Com f = x² e g = x³, o produto é x⁵ e a derivada é 5x⁴. Em x = 2 isso dá 80, enquanto f′·g′ = 6x³ daria 48."},
  {erro: "A derivada de f/g é f′/g′.",
   correcao: "Use (f′·g − f·g′) / g². Com f = x² e g = x, f/g = x e a derivada é 1. A fórmula errada daria 2x / 1 = 2x, que vale 6 em x = 3."},
  {erro: "A derivada de e^(3x) é e^(3x).",
   correcao: "A cadeia pede multiplicar pela derivada de dentro: (e^(3x))′ = 3·e^(3x). Em x = 0 a derivada vale 3, e não 1. Esquecer esse fator é o erro clássico ao derivar uma perda composta."}
]});

Object.assign(CONTENT.taylor, {erros: [
  {erro: "Quanto mais termos do polinômio, melhor a aproximação em qualquer x.",
   correcao: "A série só converge dentro de um raio em torno de a. Para ln(1 + x) em x = 2, fora do raio 1, os polinômios de 1, 2, 3 e 4 termos dão 2, 0, 2,667 e −1,333, enquanto ln 3 ≈ 1,099. Mais termos pioram."},
  {erro: "sen x ≈ x vale com x em graus.",
   correcao: "A série de Taylor assume radianos. Para 30°, sen = 0,5. Em radianos, x = 0,5236 e a aproximação erra por cerca de 4,7%. Usar x = 30 daria 30."},
  {erro: "Se usei Taylor, o resultado é exato.",
   correcao: "O polinômio de grau n deixa um resto Rₙ. Para eˣ em x = 1 com grau 3, P₃ = 2,6667 e e = 2,7183, então falta 0,0516. O resto de Lagrange limita esse erro, no caso a 0,113."}
]});

Object.assign(CONTENT.maxmin, {erros: [
  {erro: "Todo ponto com f′(x) = 0 é máximo ou mínimo.",
   correcao: "Pode ser um ponto de inflexão. Em f(x) = x³, f′(0) = 0 e f″(0) = 0, e a curva sobe dos dois lados. Quando o teste da segunda derivada dá zero, compare o sinal de f′ antes e depois."},
  {erro: "Em um intervalo fechado, o extremo está onde f′ = 0.",
   correcao: "Compare também as extremidades. Para f(x) = x³ − 3x em [0, 3], o ponto crítico x = 1 dá o mínimo f = −2, mas o máximo é f(3) = 18, onde f′ = 24."},
  {erro: "O lucro máximo está onde a receita é máxima.",
   correcao: "O lucro está onde R′ = C′. Com R = 40x − x² e C = 4x + 100, a receita é máxima em x = 20 (L = 220), mas o lucro é máximo em x = 18 (L = 224)."}
]});

Object.assign(CONTENT.newton, {erros: [
  {erro: "O método de Newton converge de qualquer chute inicial.",
   correcao: "Ele pode girar em ciclo. Para f(x) = x³ − 2x + 2 com x₀ = 0, os passos dão 1, 0, 1, 0 e nunca se aproximam da raiz. Um chute melhor, ou alguns passos de bisseção para começar, resolve."},
  {erro: "Se f′(x) está perto de zero, o passo é pequeno e seguro.",
   correcao: "A derivada divide o passo, então valor pequeno gera salto enorme. Em f(x) = x² − 2 com x₀ = 0,001, o próximo ponto é 0,001 + 1,999999 / 0,002 ≈ 1000. Confira f′ antes de aceitar o passo."},
  {erro: "Se |f(x)| ficou pequeno, estou perto da raiz.",
   correcao: "Em raiz múltipla, f é muito achatada. Com f(x) = (x − 1)³, em x = 1,01 o valor é 10⁻⁶ e a distância até a raiz é 0,01. Use também o tamanho do passo |xₙ₊₁ − xₙ| como critério."}
]});

Object.assign(CONTENT.integral, {erros: [
  {erro: "A integral definida é sempre a área entre a curva e o eixo.",
   correcao: "Ela soma com sinal. A integral de sen x de 0 a 2π vale 0, porque o trecho negativo cancela o positivo, mas a área geométrica é 4. Para a área, integre |f| ou divida nos cruzamentos."},
  {erro: "A integral indefinida de 2x é x².",
   correcao: "Falta a constante: x² + C. Na integral definida ela se cancela, como em (9 + C) − (1 + C) = 8 entre 1 e 3, mas a indefinida representa a família inteira de primitivas."},
  {erro: "Quatro retângulos já dão o valor da integral.",
   correcao: "A soma de Riemann é uma aproximação. Para a integral de x² de 0 a 1, que vale 1/3, quatro retângulos pela esquerda dão 0,21875 e pela direita 0,46875. O erro cai com mais retângulos ou com trapézios."}
]});

Object.assign(CONTENT.multiplas, {erros: [
  {erro: "A integral dupla é o valor de f no centro vezes a área.",
   correcao: "Isso só vale se f for constante ou linear. Para f = x² em [0, 2] × [0, 1], a integral dupla é 8/3 ≈ 2,667, e f no centro (1) vezes a área (2) dá 2."},
  {erro: "Para trocar a ordem de dx dy, basta trocar os símbolos.",
   correcao: "Os limites também mudam em regiões que não são retângulos. Na região 0 ≤ y ≤ x ≤ 2, a integral de 1 vale 2 nas duas ordens: ∫₀² ∫₀ˣ dy dx = 2 e ∫₀² ∫ᵧ² dx dy = 2. Manter os limites antigos daria uma conta sem sentido."},
  {erro: "Em coordenadas polares, dA = dr dθ.",
   correcao: "Falta o fator r: dA = r dr dθ. Para um disco de raio 3, ∫₀²π ∫₀³ r dr dθ = 9π ≈ 28,27. Sem o r a conta daria 6π ≈ 18,85."}
]});

Object.assign(CONTENT.gradiente, {erros: [
  {erro: "Para minimizar f, somo o gradiente ao ponto.",
   correcao: "O gradiente aponta para a subida, então minimizar pede p − η·∇f. Em f = x² + y² no ponto (1, 2), f = 5 e ∇f = (2, 4). Com η = 0,1, somar leva a f = 7,2 e subtrair leva a f = 3,2."},
  {erro: "O gradiente é tangente à curva de nível.",
   correcao: "Ele é perpendicular a ela, porque ao longo da curva f não muda. Em f = x² + y² no ponto (3, 4), ∇f = (6, 8) e a tangente do círculo é (−4, 3). O produto escalar é −24 + 24 = 0."},
  {erro: "Para a derivada direcional, multiplico o gradiente por qualquer direção.",
   correcao: "A direção precisa ter módulo 1. Com ∇f = (3, 4), usar (1, 1) direto dá 7. O vetor unitário (0,7071; 0,7071) dá 4,95, e o máximo possível é |∇f| = 5."}
]});

Object.assign(CONTENT.matrizes, {erros: [
  {erro: "A·B é igual a B·A.",
   correcao: "O produto de matrizes não comuta. Com A = [[1, 2], [0, 1]] e B = [[1, 0], [3, 1]], A·B = [[7, 2], [3, 1]] e B·A = [[1, 2], [3, 7]]. A ordem muda o resultado."},
  {erro: "A inversa é 1 dividido por cada elemento.",
   correcao: "Para 2×2, use A⁻¹ = (1/det)·[[d, −b], [−c, a]]. Com A = [[2, 1], [1, 1]], det = 1 e A⁻¹ = [[1, −1], [−1, 2]]. Elemento a elemento daria [[0,5; 1], [1; 1]], e A vezes isso não é a identidade."},
  {erro: "Se o determinante não é zero, a solução é confiável.",
   correcao: "Determinante perto de zero amplifica ruído. Com A = [[1, 1], [1, 1,0001]], det = 0,0001. Mudar b de (2; 2,0001) para (2; 2,0002) leva a solução de (1; 1) para (0; 2). É o que acontece com colunas quase colineares em um modelo."}
]});

Object.assign(CONTENT.vetores, {erros: [
  {erro: "O módulo da soma é a soma dos módulos.",
   correcao: "Só vale para vetores no mesmo sentido. Com |A| = 3 e |B| = 4 formando 60°, |A + B| = √(9 + 16 + 2·3·4·cos 60°) = √37 ≈ 6,08, e não 7."},
  {erro: "A componente horizontal de uma força é sempre F·cos θ.",
   correcao: "Depende de qual eixo mede o ângulo. Com 100 N a 30° da vertical, a componente horizontal é 100·sen 30° = 50 N. Usar cos daria 86,6 N."},
  {erro: "Converto km/h em m/s multiplicando por 3,6.",
   correcao: "É o contrário: 1 m/s = 3,6 km/h, então divida. 20 km/h = 20 / 3,6 ≈ 5,56 m/s, e não 72 m/s."}
]});

Object.assign(CONTENT["leis-newton"], {erros: [
  {erro: "Sem força resultante, o corpo está parado.",
   correcao: "ΣF = 0 dá aceleração zero, e a velocidade permanece constante, parada ou não. Um trator a 72 km/h em linha reta (20 m/s) com a = 0 tem força resultante nula."},
  {erro: "Peso e massa são a mesma grandeza.",
   correcao: "Massa é kg e não muda. Peso é força, P = m·g, em N. Uma pessoa de 60 kg pesa 588,6 N na Terra (g = 9,81) e 97,2 N na Lua (g = 1,62), com a mesma massa."},
  {erro: "Com aceleração constante, o deslocamento é v·t.",
   correcao: "A velocidade muda ao longo do tempo. Partindo do repouso com a = 2 m/s² por 5 s, v = 10 m/s, mas Δs = ½·2·5² = 25 m. A conta v·t daria 50 m."}
]});

Object.assign(CONTENT.propulsao, {erros: [
  {erro: "O foguete anda porque empurra o ar atrás dele.",
   correcao: "A propulsão vem da conservação da quantidade de movimento: o gás expelido leva momento para trás e a nave ganha o mesmo para frente. Por isso funciona no vácuo, onde não há ar."},
  {erro: "Dobrar o propelente dobra o Δv.",
   correcao: "A equação tem logaritmo: Δv = vₑ·ln(m₀/m_f). Com vₑ = 3000 m/s e m_f = 1000 kg, 1000 kg de propelente dão 2079 m/s e 2000 kg dão 3296 m/s, ou seja, 58,5% a mais."},
  {erro: "A mesma força produz a mesma mudança de velocidade, não importa o tempo.",
   correcao: "O impulso é J = F·Δt = Δp. Com 500 N por 4 s, J = 2000 N·s, e em uma nave de 250 kg isso dá Δv = 8 m/s. Com 8 s seriam 16 m/s."}
]});

Object.assign(CONTENT.gravidade, {erros: [
  {erro: "Astronautas flutuam em órbita porque lá não tem gravidade.",
   correcao: "A 400 km de altitude, g = GM/r² ≈ 8,69 m/s², quase o valor da superfície. Eles flutuam porque estão em queda livre junto com a nave, com velocidade tangencial suficiente para errar o chão."},
  {erro: "A velocidade orbital depende da massa do satélite.",
   correcao: "Em vₒ = √(GM/r) entram só a massa do planeta e o raio. Um satélite de 100 kg ou de 10 000 kg a 400 km de altitude vai a cerca de 7,67 km/s."},
  {erro: "A velocidade de escape é o dobro da orbital.",
   correcao: "A razão é √2, porque vₑₛc = √(2GM/r). A 400 km de altitude, vₒ ≈ 7,67 km/s e vₑₛc ≈ 10,85 km/s, ou seja, 1,41 vez."}
]});

Object.assign(CONTENT.manobras, {erros: [
  {erro: "Girar a nave muda para onde ela está indo.",
   correcao: "Girar muda a atitude (para onde ela aponta). A trajetória só muda com força que altera a quantidade de movimento. Uma nave que gira sem acionar o motor segue na mesma trajetória."},
  {erro: "Torque é força vezes distância, em qualquer direção.",
   correcao: "Conta a parte perpendicular ao braço: τ = r × F. Com F = 100 N e r = 0,5 m, o torque é 50 N·m se perpendicular, 25 N·m a 30° do braço, e zero se a força apontar ao longo dele."},
  {erro: "O mesmo pulso dá o mesmo Δv em qualquer nave.",
   correcao: "Δv = F·Δt / m depende da massa. Com 200 N por 10 s, uma nave de 400 kg ganha 5 m/s e uma de 800 kg ganha 2,5 m/s."}
]});

Object.assign(CONTENT["fisica-engenharia"], {erros: [
  {erro: "Com um motor de 100 kW, a tração só depende da potência: F = P/v.",
   correcao: "A tração também é limitada pela aderência, μ·N. A 2 m/s, P/v = 50 kN, mas um trator de 6000 kg com μ = 0,5 só transmite 0,5 · 6000 · 9,81 ≈ 29,4 kN. O menor valor manda."},
  {erro: "A potência do motor da bomba é ρ·g·Q·H.",
   correcao: "Essa é a potência hidráulica, entregue à água. Com Q = 0,02 m³/s e H = 30 m, ela vale 5886 W. Com rendimento η = 0,6, o motor precisa de 5886 / 0,6 = 9810 W."},
  {erro: "O trabalho de uma força é sempre F·d.",
   correcao: "Só conta a componente na direção do deslocamento: W = F·d·cos θ. Puxar com 100 N por 10 m um cabo a 60° do chão realiza 500 J, e não 1000 J."}
]});

Object.assign(CONTENT.estatistica, {erros: [
  {erro: "Se p < 0,05, o efeito é grande e importa para a lavoura.",
   correcao: "O p-valor indica se a diferença se distingue do acaso e diz pouco sobre o tamanho dela. Com 10 000 parcelas por grupo e s = 6, uma diferença de 0,2 sc/ha dá t ≈ 2,36 e p ≈ 0,02, e rende pouco no campo. Olhe o tamanho do efeito e o intervalo."},
  {erro: "Uma cultivar rendeu 3 sc/ha mais, então ela é melhor.",
   correcao: "Compare a diferença com a variação entre parcelas. Com s = 5 e n = 4 por grupo, EP = √(2·25/4) ≈ 3,54 e t ≈ 0,85, bem abaixo do ≈ 2,45 exigido com 6 graus de liberdade. Com tão poucas repetições, 3 sc/ha cabe no acaso."},
  {erro: "Medi 10 plantas na mesma parcela, então tenho n = 10 por tratamento.",
   correcao: "A unidade experimental é a parcela que recebeu o tratamento. Dez plantas em uma única parcela são pseudorreplicação: n = 1. Para estimar a variação do tratamento, repita em parcelas diferentes."}
]});

Object.assign(CONTENT.regressao, {erros: [
  {erro: "Se a média dos erros é zero, o modelo ajusta bem.",
   correcao: "Erros positivos e negativos se cancelam. Com erros +2 e −2, a média é 0, mas o EQM = (4 + 4)/2 = 4. Por isso a perda eleva o erro ao quadrado antes de tirar a média."},
  {erro: "A reta ajustada vale para qualquer x.",
   correcao: "Ela só é apoiada pelos dados vistos. Uma reta y = 50 + 2x ajustada com x entre 3 e 7 prevê 110 para x = 30, uma chuva que nunca apareceu no treino. Fora da faixa observada, a previsão é extrapolação."},
  {erro: "Se y = 0,5·x na regressão de y em x, então x = 2·y na regressão de x em y.",
   correcao: "As duas regressões não são inversas. Com x = (1, 2, 3) e y = (1, 3, 2), w de y em x é 0,5, e w de x em y também é 0,5, e não 2. O ajuste minimiza o erro no eixo escolhido como saída."}
]});

Object.assign(CONTENT.otimizadores, {erros: [
  {erro: "O momento com β = 0,9 anda 90% do gradiente.",
   correcao: "O momento acumula. Com gradiente constante g, v tende a g/(1 − β) = 10·g, e o passo efetivo fica 10 vezes maior. Por isso o momento pede η menor que o do gradiente puro."},
  {erro: "Aumentar η sempre acelera o treino.",
   correcao: "Acima de 2/λmáx o método diverge. Em f = ½·10·x², o limite é 0,2: com η = 0,25, o fator por passo é 1 − 0,25·10 = −1,5, e o erro cresce 50% a cada passo."},
  {erro: "Padronizar as features é cosmético.",
   correcao: "Escalas diferentes inflam o número de condição κ = λmáx/λmín. Com uma feature na casa dos milhares e outra perto de 1, κ é da ordem de 10⁶ e o passo precisa ser minúsculo. Padronizar aproxima κ de 1."}
]});

Object.assign(CONTENT.overfit, {erros: [
  {erro: "O erro de treino está baixo, então o modelo é bom.",
   correcao: "O treino mede o que o modelo decorou. Um modelo com EQM de treino 0,2 e de teste 9 tem flexibilidade demais. O que importa é o erro em dados não vistos."},
  {erro: "Para validar, embaralho os dados e divido ao acaso, mesmo em série temporal.",
   correcao: "Em safras ou séries, o embaralhamento deixa o futuro vazar para o treino. Divida por tempo, treine no passado e teste no período seguinte. O mesmo vale para normalizar com a base inteira antes de dividir."},
  {erro: "No ridge, quanto maior o λ, melhor o modelo.",
   correcao: "O λ troca variância por viés. Com Σxy = 20 e Σx² = 10, w = 20/(10 + λ) vale 2 com λ = 0, 1 com λ = 10 e ≈ 0,02 com λ = 1000. Escolha λ por validação cruzada."}
]});

Object.assign(CONTENT.logistica, {erros: [
  {erro: "O filtro tem 99% de acurácia, então pega os ataques.",
   correcao: "Com 1% de ataques em 10 000 requisições, um filtro que sempre diz \"normal\" acerta 99% e tem recall zero. Com classes desbalanceadas, olhe precisão, recall e a matriz de confusão."},
  {erro: "O limiar de 0,5 é o certo por padrão.",
   correcao: "O limiar define a troca entre erros. Com VP = 80, FN = 20 e FP = 40, a precisão é 0,67 e o recall 0,80. Subir o limiar para VP = 60, FN = 40 e FP = 10 leva a precisão a 0,86 e o recall a 0,60. Escolha pelo custo de cada erro."},
  {erro: "Score 0,8 significa 80% de chance de ser ataque.",
   correcao: "A sigmoide dá um score que ordena os casos. Ele só vira probabilidade se estiver calibrado, ou seja, se entre os casos com score perto de 0,8 cerca de 80% forem de fato positivos. Verifique em dados de validação."}
]});

Object.assign(CONTENT.rede, {erros: [
  {erro: "Empilhar camadas lineares deixa a rede mais expressiva.",
   correcao: "Duas camadas lineares colapsam em uma: w₂·(w₁·x) = (w₂·w₁)·x. Com w₁ = 2 e w₂ = 3, é o mesmo que um único peso 6. A não linearidade (tanh, ReLU) entre as camadas é o que dá capacidade."},
  {erro: "Posso iniciar todos os pesos com zero.",
   correcao: "Neurônios ocultos iguais recebem o mesmo gradiente e continuam iguais para sempre, então a camada age como um só neurônio. Inicie com valores pequenos e aleatórios para quebrar a simetria."},
  {erro: "Um erro de classificação custa o mesmo se eu estava confiante ou não.",
   correcao: "A entropia cruzada pune a confiança errada. Com y = 1, p = 0,9 dá L = 0,105, mas p = 0,01 dá L = 4,605. Em LLMs e guardrails, é isso que torna o modelo cauteloso."}
]});

Object.assign(CONTENT.embeddings, {erros: [
  {erro: "Cosseno 0 significa que os textos são opostos.",
   correcao: "Cosseno 0 significa vetores ortogonais, sem relação. Em (1, 0) e (0, 1) o cosseno é 0. Os opostos teriam −1, como (1, 0) e (−1, 0), embora isso seja raro em embeddings de texto."},
  {erro: "Posso comparar o vetor da pergunta de um modelo com os documentos de outro.",
   correcao: "Cada modelo cria seu próprio espaço, com dimensão e escala próprias, e os cossenos entre espaços diferentes perdem o sentido. No RAG, indexe e consulte com o mesmo modelo de embedding, e reindexe se trocar de versão."},
  {erro: "Quanto maior o produto escalar, mais parecido é o documento.",
   correcao: "O produto escalar também cresce com o tamanho do vetor. Com a = (3, 4), b = (6, 8) e d = (30, 0): a·d = 90 e a·b = 50, mas cos(a, d) = 0,6 e cos(a, b) = 1. Normalize ou use o cosseno."}
]});

Object.assign(CONTENT.atencao, {erros: [
  {erro: "A saída da atenção é a média ponderada das chaves K.",
   correcao: "Os pesos vêm de q·K, mas a mistura é feita com os valores V: saída = ∑ wⱼ·vⱼ. As chaves servem para decidir quanto de cada valor entra."},
  {erro: "O softmax dá pesos proporcionais às pontuações.",
   correcao: "Ele usa exponencial. Com pontuações (3, 1, 0), os pesos são 0,844, 0,114 e 0,042, e a proporção 3:1:0 não se repete. Uma pontuação zero ainda recebe 4,2% do peso."},
  {erro: "Temperatura baixa suaviza a distribuição.",
   correcao: "Dividir por T < 1 afia os pesos. Com pontuações (2, 1, 0), T = 0,5 dá 0,867, 0,117 e 0,016. T = 2 achata para 0,506, 0,307 e 0,186."}
]});

Object.assign(CONTENT.token, {erros: [
  {erro: "Temperatura alta deixa o modelo mais inteligente e criativo.",
   correcao: "Ela só achata a distribuição. Com logits (4, 2, 0), T = 1 dá 0,867, 0,117 e 0,016, e T = 2 dá 0,665, 0,245 e 0,090. A cauda improvável passa de 1,6% para 9,0%. Para extração de campos e JSON, use T baixa."},
  {erro: "Top-k e top-p fazem o mesmo corte.",
   correcao: "Top-k mantém um número fixo de candidatos; top-p mantém o menor conjunto que soma p. Em (0,6; 0,25; 0,1; 0,05), top-p = 0,9 mantém 3. Em (0,95; 0,03; 0,01; 0,01), mantém 1, e top-k = 2 manteria 2."},
  {erro: "Entropia baixa quer dizer que a resposta está certa.",
   correcao: "A entropia mede a incerteza da distribuição e ignora se a resposta está correta. Com p = (0,97; 0,01; 0,01; 0,01), H ≈ 0,24 bit, e o modelo pode estar confiante e errado. Para quatro opções iguais, H = 2 bits."}
]});

Object.assign(CONTENT.jogos, {erros: [
  {erro: "O equilíbrio de Nash é o melhor resultado para os dois jogadores.",
   correcao: "Nash garante que ninguém ganha mudando sozinho. No dilema do prisioneiro com ganhos A = [[3, 0], [5, 1]] para a linha (e simétrico para a coluna), o equilíbrio é (trair, trair), e cada um fica com 1 em vez de 3."},
  {erro: "Na estratégia mista, calculo p para igualar os meus ganhos.",
   correcao: "A linha escolhe p para deixar a coluna indiferente, então a fórmula usa os ganhos B da coluna. Com B = [[1, 0], [0, 3]], p = 3/4: a coluna ganha 0,75 em qualquer das duas escolhas."},
  {erro: "Todo jogo tem um equilíbrio de Nash em estratégias puras.",
   correcao: "Nem sempre. Em um jogo de moedas (a linha ganha 1 se as escolhas casam, perde 1 se não, e a coluna tem o oposto), cada jogador quer mudar a cada vez. O equilíbrio existe em estratégias mistas, com 50% para cada lado."}
]});
