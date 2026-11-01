/* Conteúdo didático dos assuntos: gancho, resumo, detalhes e Python comentado.
   As aplicações (campo, dia a dia, trabalho) e os laboratórios ficam em app.js. */
const CONTENT = {
  ideia: {
    gancho: "Se o total é o que você paga, o que mede o que está acontecendo agora?",
    resumo: "A taxa e o total contam a mesma história. Derivar o total dá a taxa, e somar a taxa dá o total.",
    detalhes: "Imagine a vazão de uma bomba mudando minuto a minuto. A área sob a curva de vazão até o instante t é o volume bombeado até ali. A inclinação da curva do volume, nesse mesmo instante, é a vazão. Esse vai e volta é o teorema fundamental do cálculo: integrar e derivar desfazem um ao outro.",
    python: `import numpy as np                          # arrays e contas numéricas

t = np.linspace(0, 10, 1001)                # 1001 instantes de 0 a 10 minutos
dt = t[1] - t[0]                            # intervalo entre dois instantes
q = 30 + 10*np.sin(t)                       # vazão da bomba em L/min
V = np.cumsum(q) * dt                       # integral: soma acumulada da vazão é o volume
q_de_volta = np.gradient(V, dt)             # derivada do volume: devolve a vazão
print(q[500], q_de_volta[500])              # os dois valores quase coincidem`
  },
  funcao: {
    gancho: "Se eu dobrar o esforço, o resultado dobra?",
    resumo: "Uma função liga uma entrada a uma saída. Conhecer a regra e o domínio evita prometer o que a curva não entrega.",
    detalhes: "Cada situação do laboratório tem a sua regra: um custo que cresce em linha reta, uma resposta que sobe e depois cai, um crescimento que explode. A pergunta é sempre a mesma: para essa entrada, qual é a saída? E até onde a regra vale? Fora do domínio medido, a curva é só um palpite.",
    python: `def produtividade(x):                       # x é a dose de N em kg por hectare
    return 80 + 0.30*x - 0.0009*x**2        # regra: sobe no começo e curva para baixo depois

for dose in (0, 100, 200, 300):             # testa quatro entradas
    print(dose, produtividade(dose))        # mostra entrada e saída lado a lado`
  },
  limite: {
    gancho: "O que acontece quando a conta dá 0 dividido por 0?",
    resumo: "O limite diz para onde a função vai quando você chega perto de um ponto, mesmo que ela não exista nele.",
    detalhes: "Chegando pela esquerda e pela direita, a função aponta para o mesmo valor? Se sim, o limite existe, mesmo que o ponto em si seja um buraco. Se os lados discordam, como num degrau de tarifa, ou fogem para o infinito, como em 1/x, o limite não existe. Derivada e integral são definidas como limites.",
    python: `f = lambda x: (x**2 - 1)/(x - 1)            # indefinida em x = 1, onde dá 0/0

for p in range(1, 7):                       # h = 0,1; 0,01; ... 0,000001
    h = 10**-p                              # distância até o ponto
    print(h, f(1 - h), f(1 + h))            # esquerda e direita chegam em 2`
  },
  derivada: {
    gancho: "Esse número está subindo rápido ou devagar agora?",
    resumo: "A derivada é a inclinação da tangente: a velocidade com que a saída muda naquele ponto.",
    detalhes: "Comece com uma secante, a reta que liga dois pontos próximos. Quanto menor a distância h, mais ela se parece com a tangente. A inclinação resultante é a taxa de variação: quanto a saída muda para cada unidade a mais de entrada, como cm por dia, casos por semana ou reais por unidade. O gráfico de baixo mostra a derivada em todos os pontos de uma vez.",
    python: `import sympy as sp                          # matemática simbólica

x = sp.symbols('x')                         # x vira uma variável, não um número
y = 80 + 0.30*x - 0.0009*x**2               # produtividade em função da dose
dy = sp.diff(y, x)                          # derivada: 0.3 - 0.0018*x
print(dy.subs(x, 100))                      # inclinação em 100 kg/ha: 0.12 sc/ha por kg`
  },
  regras: {
    gancho: "Como derivar uma função que é feita de outras funções?",
    resumo: "Soma, produto, quociente e cadeia cobrem quase tudo. Cada regra diz como montar a derivada a partir das peças.",
    detalhes: "A soma deriva termo a termo. O produto precisa derivar um fator de cada vez. O quociente é um produto disfarçado. A cadeia vale quando há função dentro de função, como uma sigmoide sobre uma soma ponderada, e é a regra que o backpropagation aplica camada por camada.",
    python: `import sympy as sp                          # derivadas simbólicas

x = sp.symbols('x')                         # variável
g, h = sp.sin(x), x**2                      # duas funções simples
print(sp.diff(g*h, x))                      # produto: x**2*cos(x) + 2*x*sin(x)
print(sp.diff(g/h, x))                      # quociente
print(sp.diff(g.subs(x, h), x))             # cadeia: sen(x**2) deriva em 2*x*cos(x**2)`
  },
  maxmin: {
    gancho: "Investir mais sempre dá mais retorno?",
    resumo: "Onde a derivada vale zero, a curva para de subir. Esse ponto é a melhor escolha, e quase nunca é a de maior produção.",
    detalhes: "O lucro é a receita menos o custo, e o laboratório usa como exemplo a dose de um insumo. No começo cada unidade a mais rende mais do que custa. Depois de certo ponto, a última unidade custa mais do que rende. O topo da curva de lucro fica antes do topo da produção. O botão de subida faz o que o aprendizado de máquina faz: seguir a derivada, passo a passo.",
    python: `B, C2 = 0.30, 0.0009                        # parâmetros da curva de produtividade
p, c = 60, 6                                # preço da saca e custo do kg de N
dL = lambda x: p*(B - 2*C2*x) - c           # derivada do lucro em relação à dose

x = 40.0                                    # dose inicial
for passo in range(10):                     # dez passos de subida
    x += 0.5 * dL(x) / (2*p*C2)             # anda na direção em que o lucro sobe
print(x, (B - c/p)/(2*C2))                  # numérico e analítico se encontram`
  },
  newton: {
    gancho: "Como achar o ponto em que o saldo zera, sem fórmula pronta?",
    resumo: "Trace a tangente, veja onde ela cruza o eixo e repita. Perto da raiz, cada passo costuma dobrar os dígitos certos.",
    detalhes: "A tangente é a melhor reta local. Ela cruza o eixo perto da raiz, e esse cruzamento vira o novo palpite. Funciona rápido, mas pode falhar: com a tangente horizontal ela nunca cruza, e um chute ruim pode levar você a outra raiz.",
    python: `f  = lambda x: x**2 - 2                     # queremos f(x) = 0, ou seja, a raiz de 2
df = lambda x: 2*x                          # derivada de f

x = 1.0                                     # chute inicial
for i in range(6):                          # seis passos
    x = x - f(x)/df(x)                      # onde a tangente cruza o eixo
    print(i, x)                             # 1.5, 1.4167, 1.41422, ...`
  },
  integral: {
    gancho: "Como saber o total acumulado quando o ritmo não para de mudar?",
    resumo: "A integral soma uma quantidade que varia. Com retângulos cada vez mais finos, a soma vira a área exata.",
    detalhes: "Um sensor mede uma taxa, como mm de chuva por hora, litros por minuto ou casos por dia, mas o que importa costuma ser o total. Dividir o tempo em faixas, multiplicar altura por largura e somar dá uma aproximação. Quanto mais faixas, menor o erro, e o limite dessa soma é a integral.",
    python: `import numpy as np                          # contas numéricas

t = np.linspace(0, 6, 1000)                 # 1000 instantes em 6 horas
i = 12*np.exp(-t/2)                         # intensidade da chuva em mm/h
total = np.sum((i[1:] + i[:-1])/2 * np.diff(t))     # soma de trapézios: chuva total em mm
print(total)                                # perto de 22,8`
  },
  multiplas: {
    gancho: "Uma medição num ponto só basta para saber o total de uma região inteira?",
    resumo: "A integral dupla soma sobre uma região e a tripla soma sobre um volume, como a massa de um solo, a população de uma cidade ou o volume de um reservatório.",
    detalhes: "A chuva não cai igual em toda a área, nem a densidade de pessoas num mapa. Dividir a região em células, medir cada uma e somar dá o total. Com poucas células o erro é grande, e um único ponto de medição pode errar muito. Para a massa de um corpo, soma-se também ao longo da profundidade, com a densidade mudando em cada camada.",
    python: `import numpy as np                          # contas numéricas

n, L = 200, 100                             # 200 células por lado, talhão de 100 m
x = (np.arange(n) + .5) * L/n               # centro de cada célula
X, Y = np.meshgrid(x, x)                    # todas as posições (x, y)
r = 5 + 20*np.exp(-((X-30)**2 + (Y-65)**2)/(2*22**2))   # chuva em mm em cada célula
V = (r/1000).sum() * (L/n)**2               # mm viram m e multiplicam a área da célula
print(V)                                    # volume total em m3, perto de 110`
  },
  gradiente: {
    gancho: "A partir de onde você está, em que direção as coisas melhoram mais depressa?",
    resumo: "O gradiente aponta para onde a função sobe mais rápido. Descer contra ele leva ao fundo do vale.",
    detalhes: "Com duas variáveis, a derivada vira um vetor com uma componente por eixo. O tamanho dele é a declividade, e ele é perpendicular às curvas de nível. A derivada numa direção qualquer é o produto do gradiente pela direção, e é máxima quando a direção coincide com ele.",
    python: `import numpy as np                          # vetores

f = lambda p: 0.5*p[0]**2 + 4*p[1]**2       # superfície: vale estreito
grad = lambda p: np.array([p[0], 8*p[1]])   # [df/dx, df/dy]
p = np.array([2.5, 1.2])                    # ponto de partida
for _ in range(50):                         # 50 passos
    p = p - 0.1*grad(p)                     # desce contra o gradiente
print(p, f(p))                              # perto do mínimo, na origem`
  },
  matrizes: {
    gancho: "Quanto de cada ingrediente fecha todas as metas ao mesmo tempo?",
    resumo: "Um sistema vira A·x = b. Quando a matriz tem inversa, a receita sai de x = A⁻¹·b.",
    detalhes: "Cada coluna da matriz é um insumo e cada linha, uma meta (no laboratório, produtos e nutrientes). Resolver é achar quanto de cada insumo fecha todas as metas. Se dois insumos entregam as metas na mesma proporção, a matriz perde a inversa e a receita deixa de ter solução única. Quantidades negativas indicam que a receita é inviável.",
    python: `import numpy as np                          # álgebra linear

A = np.array([[.45, .11, 0],                # linha N: teor de N em ureia, MAP e KCl
              [0,   .52, 0],                # linha P2O5
              [0,   0,   .60]])             # linha K2O
b = np.array([100, 80, 60])                 # meta em kg de nutriente por hectare
print(np.linalg.solve(A, b))                # kg de ureia, MAP e KCl que fecham a meta`
  },
  estatistica: {
    gancho: "A versão B foi melhor de verdade, ou foi sorte?",
    resumo: "O teste compara a diferença entre as médias com a variação entre unidades. Mais repetições deixam o efeito real mais fácil de ver.",
    detalhes: "Cada unidade de teste varia por motivos que você não controla: parcelas de solo, lotes de peças, usuários de um site. O teste t de Welch pergunta se a diferença observada seria comum só pelo acaso. O poder do teste é a chance de enxergar uma diferença que realmente existe, e cresce com mais repetições, menos ruído e efeito maior.",
    python: `import numpy as np                          # sorteios
from scipy import stats                     # testes estatísticos

rng = np.random.default_rng()               # gerador de números aleatórios
a = rng.normal(60, 6, 5)                    # cultivar A: média 60, desvio 6, 5 parcelas
b = rng.normal(64, 6, 5)                    # cultivar B: 4 sc/ha melhor de verdade
print(stats.ttest_ind(a, b, equal_var=False))   # teste de Welch: estatística e p-valor`
  },
  regressao: {
    gancho: "Dá para prever um resultado a partir de outro número?",
    resumo: "Ajustar uma reta é achar os parâmetros que errem o mínimo. O gradiente chega lá andando contra a derivada do erro.",
    detalhes: "Cada ponto tem um erro: a diferença entre o que a reta prevê e o que foi medido. Elevar ao quadrado e tirar a média dá a perda. A derivada da perda diz em que direção mexer a inclinação e o intercepto. A taxa de aprendizado é o tamanho do passo: pequeno demais demora, grande demais passa do ponto.",
    python: `import numpy as np                          # contas numéricas

x = np.linspace(-2, 2, 24)                  # chuva do ciclo, centrada
y = 60 + 8*x + np.random.normal(0, 6, 24)   # produtividade medida, com ruído
w, b, lr = 0.0, 40.0, 0.3                   # parâmetros iniciais e taxa de aprendizado
for _ in range(100):                        # 100 passos
    e = b + w*x - y                         # erro de cada ponto
    w -= lr * np.mean(2*e*x)                # derivada da perda em relação a w
    b -= lr * np.mean(2*e)                  # derivada da perda em relação a b
print(w, b)                                 # perto de 8 e 60`
  },
  otimizadores: {
    gancho: "Por que treinar às vezes é lento e às vezes dá certo em segundos?",
    resumo: "O gradiente puro segue a ladeira, o momento acumula velocidade e o Adam ajusta o passo de cada eixo.",
    detalhes: "Num vale estreito o gradiente puro zigue-zagueia, porque a ladeira aponta para os lados. O momento suaviza as viradas, e o Adam normaliza cada eixo pela escala do gradiente. O Hessiano mostra o motivo: quando a curvatura é muito diferente entre os eixos, o número de condição fica alto e a descida sofre.",
    python: `import numpy as np                          # vetores

grad = lambda p: np.array([p[0], 8*p[1]])   # gradiente do vale estreito
p = np.array([2.5, 1.5])                    # ponto de partida
m = s = np.zeros(2)                         # médias móveis do Adam
for t in range(1, 101):                     # 100 passos
    g = grad(p)                             # gradiente atual
    m = 0.9*m + 0.1*g                       # média móvel do gradiente
    s = 0.999*s + 0.001*g**2                # média móvel do gradiente ao quadrado
    mh, sh = m/(1-0.9**t), s/(1-0.999**t)   # correção do início
    p = p - 0.1*mh/(np.sqrt(sh) + 1e-8)     # passo normalizado de cada eixo
print(p)                                    # perto da origem`
  },
  overfit: {
    gancho: "Por que o modelo que acerta todos os pontos erra o próximo?",
    resumo: "Flexível demais, o modelo decora o ruído. Simples demais, não acha o padrão. O ponto bom fica no meio.",
    detalhes: "O erro de treino sempre cai quando o modelo ganha complexidade. O erro de teste desce e depois sobe. A regularização (ridge) segura os coeficientes e doma o modelo flexível. Por isso se separa treino e teste, e em dados com data a separação deve ser por data.",
    python: `import numpy as np                          # contas numéricas
from sklearn.pipeline import make_pipeline  # encadeia passos
from sklearn.preprocessing import PolynomialFeatures   # cria x, x², x³...
from sklearn.linear_model import Ridge      # regressão com regularização

for grau in range(0, 11):                   # testa graus de 0 a 10
    m = make_pipeline(PolynomialFeatures(grau), Ridge(alpha=1e-3))   # polinômio mais ridge
    m.fit(x_treino.reshape(-1, 1), y_treino)            # ajusta só nos dados de treino
    erro = np.sqrt(np.mean((m.predict(x_teste.reshape(-1, 1)) - y_teste)**2))   # RMSE no teste
    print(grau, erro)                       # cai e depois sobe`
  },
  logistica: {
    gancho: "Bloquear mais pedidos sempre é mais seguro?",
    resumo: "O classificador dá um score e você escolhe o limiar. Cada limiar troca um tipo de erro por outro.",
    detalhes: "Deixar um ataque passar e bloquear um pedido legítimo têm custos diferentes. O limiar certo vem desses custos e da taxa real de ataques. Quando os ataques são raros, mesmo um bom filtro tem precisão baixa, porque os legítimos são muito mais numerosos.",
    python: `import numpy as np                          # sorteios
from sklearn.metrics import roc_auc_score, precision_recall_curve   # métricas

ok  = np.random.normal(0.35, 0.15, 9900)    # scores de pedidos legítimos
atk = np.random.normal(0.65, 0.15, 100)     # scores de ataques: 1% do tráfego
y = np.r_[np.zeros(9900), np.ones(100)]     # rótulos: 0 legítimo, 1 ataque
s = np.r_[ok, atk]                          # scores na mesma ordem
print(roc_auc_score(y, s))                  # capacidade de separar os grupos
p, r, t = precision_recall_curve(y, s)      # precisão e recall para cada limiar`
  },
  rede: {
    gancho: "Uma reta separa dois grupos, mas e se um estiver cercando o outro?",
    resumo: "Uma rede é uma função de camadas simples. O treino propaga a derivada de trás para a frente e ajusta cada peso.",
    detalhes: "Cada neurônio faz uma conta linear seguida de uma curva. Poucos neurônios desenham fronteiras rígidas, e mais neurônios dobram a fronteira. O passo de trás aplica a regra da cadeia para saber quanto cada peso contribuiu para o erro. Taxa grande demais faz a perda oscilar.",
    python: `import torch, torch.nn as nn                # biblioteca de redes neurais

net = nn.Sequential(nn.Linear(2, 6), nn.Tanh(), nn.Linear(6, 1))   # 2 entradas, 6 neurônios, 1 saída
opt = torch.optim.SGD(net.parameters(), lr=0.5)     # descida do gradiente
loss_fn = nn.BCEWithLogitsLoss()            # perda para duas classes
for epoca in range(500):                    # 500 passos
    opt.zero_grad()                         # zera os gradientes do passo anterior
    loss = loss_fn(net(X).squeeze(), y)     # passo adiante: calcula a perda
    loss.backward()                         # backpropagation: calcula os gradientes
    opt.step()                              # atualiza os pesos`
  },
  embeddings: {
    gancho: "Como achar o trecho certo quando as pessoas usam outras palavras?",
    resumo: "Um texto vira um ponto no espaço. Perguntas parecidas ficam perto, e buscar vira medir ângulo ou distância.",
    detalhes: "Cada documento e a pergunta viram vetores, e a busca devolve os mais próximos. O cosseno mede o ângulo e ignora o tamanho do vetor. A distância e o produto escalar também contam o tamanho, e por isso o ranking pode mudar. A métrica deve ser a do modelo que gerou os embeddings.",
    python: `import numpy as np                          # vetores

docs = np.array([[.8, -.4], [.45, -.22], [.4, .85], [.2, .5]])   # documentos como pontos
q = np.array([.5, .3])                      # a pergunta
cos = docs @ q / (np.linalg.norm(docs, axis=1) * np.linalg.norm(q))   # cosseno de cada documento
dist = np.linalg.norm(docs - q, axis=1)     # distância de cada documento
print(np.argsort(-cos), np.argsort(dist))   # os rankings podem diferir`
  },
  atencao: {
    gancho: "Para entender \"precisa\", qual outra palavra da frase importa?",
    resumo: "A atenção é uma média ponderada: cada token mede a similaridade com os outros e mistura as informações.",
    detalhes: "Cada token compara o seu vetor com os dos outros. As similaridades passam por um softmax e viram pesos que somam 1, e a saída é a média dos vetores com esses pesos. Os valores aqui são de brinquedo. Em um modelo real eles vêm do treino, e há muitas cabeças e camadas.",
    python: `import numpy as np                          # matrizes

E = np.array([[.1,.1],[1,.2],[.3,.9],[.1,.2],[.9,.5],[-.2,0]])   # um vetor por token
S = E @ E.T / np.sqrt(E.shape[1])           # similaridades, escaladas pela raiz da dimensão
W = np.exp(S - S.max(1, keepdims=True))     # exponencial, subtraindo o máximo por estabilidade
W /= W.sum(1, keepdims=True)                # softmax: cada linha soma 1
saida = W @ E                               # média ponderada dos vetores`
  },
  token: {
    gancho: "Por que o mesmo prompt dá respostas diferentes?",
    resumo: "O modelo dá uma pontuação a cada palavra possível. Temperatura, top-k e top-p decidem como sortear a próxima.",
    detalhes: "A temperatura achata ou afina a distribuição. O top-k mantém só os k mais prováveis. O top-p mantém o menor grupo que soma p de probabilidade. Em extração e classificação, temperatura baixa dá respostas repetíveis. Em texto criativo, valores mais altos dão variedade.",
    python: `import numpy as np                          # contas numéricas

def amostrar(logits, T=0.7, k=5, p=0.9):    # logits são as pontuações do modelo
    z = np.array(logits) / T                # temperatura: divide as pontuações
    pr = np.exp(z - z.max()); pr /= pr.sum()            # softmax: vira probabilidade
    ordem = np.argsort(-pr)[:k]             # top-k: fica com os k mais prováveis
    cum = np.cumsum(pr[ordem])              # probabilidade acumulada
    ordem = ordem[:np.searchsorted(cum, p) + 1]         # top-p: corta quando soma p
    q = np.zeros_like(pr); q[ordem] = pr[ordem]         # zera o que foi cortado
    return np.random.choice(len(pr), p=q / q.sum())     # sorteia uma palavra`
  },
  trilha: {
    gancho: "Por onde começar a estudar machine learning?",
    resumo: "Uma ordem que reaproveita a matemática de cada etapa, com a ferramenta típica e um exercício.",
    detalhes: "Cada etapa usa o que a anterior ensinou: derivadas e matrizes na regressão, validação no overfitting, regra da cadeia na rede, softmax na atenção. O exercício de cada uma deve usar dados do seu ambiente, para virar projeto e não só leitura.",
    python: `# pip install numpy pandas scikit-learn torch transformers mlflow
import mlflow                               # registra os experimentos

with mlflow.start_run():                    # abre um registro de experimento
    mlflow.log_param("modelo", "regressao_linear")      # guarda o que foi testado
    mlflow.log_metric("rmse", 4.2)          # guarda o resultado para comparar depois`
  },
  jogos: {
    gancho: "Se o vizinho baixar o preço, eu também devo baixar?",
    resumo: "Quando o resultado depende da escolha do outro, a sua melhor jogada muda. O equilíbrio de Nash é onde ninguém ganha mudando sozinho.",
    detalhes: "Em cada coluna marque a melhor resposta da linha, e em cada linha a da coluna. Onde as duas coincidem há um equilíbrio. Alguns jogos têm vários, outros nenhum puro, e aí cada jogador precisa misturar as jogadas. Edite os ganhos e veja os equilíbrios mudarem.",
    python: `import numpy as np                          # matrizes

A = np.array([[5, 1], [7, 3]])              # ganhos de quem escolhe a linha
B = np.array([[5, 7], [1, 3]])              # ganhos de quem escolhe a coluna
for i in range(2):                          # cada linha
    for j in range(2):                      # cada coluna
        if A[i, j] == A[:, j].max() and B[i, j] == B[i, :].max():   # melhor resposta dos dois
            print("Nash:", i, j)            # equilíbrio de Nash puro`
  },
  "vetores": {
    gancho: "Como descrever uma força que aponta para o nordeste e tem intensidade de 500 N?",
    resumo: "Grandezas escalares precisam apenas de valor e unidade. Grandezas vetoriais também exigem direção e sentido. Decompor vetores transforma movimentos e forças em contas organizadas por eixo.",
    detalhes: "A Física começa medindo. O Sistema Internacional (SI) padroniza unidades como metro (m), quilograma (kg), segundo (s), ampere (A) e kelvin (K). Massa, tempo, temperatura e energia são exemplos de grandezas escalares: um valor com unidade basta para descrevê-las. Deslocamento, velocidade, aceleração e força são vetoriais: além do módulo, precisam de direção e sentido. Em um plano cartesiano, um vetor de módulo A e ângulo θ em relação ao eixo x pode ser decomposto em Ax = A·cos(θ) e Ay = A·sen(θ). A soma de vetores é feita componente a componente. Se dois vetores são perpendiculares, o módulo da resultante é obtido pelo teorema de Pitágoras. O ângulo deve ser medido a partir do eixo de referência informado; trocar o eixo ou o sentido muda os sinais das componentes. Unidades também precisam ser coerentes: antes de calcular, converta quilômetros para metros, horas para segundos e toneladas para quilogramas quando necessário.",
    formulas: [
      {
        "nome": "Componentes cartesianas",
        "expressao": "Aₓ = A · cos(θ)   |   Aᵧ = A · sen(θ)",
        "significado": "A é o módulo do vetor e θ é o ângulo medido a partir do eixo x positivo."
      },
      {
        "nome": "Módulo a partir das componentes",
        "expressao": "|A| = √(Aₓ² + Aᵧ²)",
        "significado": "Reconstrói o tamanho do vetor a partir das componentes horizontal e vertical."
      },
      {
        "nome": "Soma vetorial",
        "expressao": "Rₓ = ΣAₓ   |   Rᵧ = ΣAᵧ",
        "significado": "Some separadamente todas as componentes em cada eixo; depois calcule o módulo e a direção da resultante."
      },
      {
        "nome": "Conversão de velocidade",
        "expressao": "1 m/s = 3,6 km/h",
        "significado": "Multiplique m/s por 3,6 para obter km/h; divida km/h por 3,6 para voltar a m/s."
      }
    ],
    exemplos: [
      {
        "titulo": "Decompondo uma força",
        "enunciado": "Uma força de 100 N atua a 30° acima do eixo horizontal. Quais são suas componentes?",
        "passos": [
          "Componente horizontal: Fx = 100 · cos(30°).",
          "Componente vertical: Fy = 100 · sen(30°).",
          "Usando cos(30°) ≈ 0,866 e sen(30°) = 0,5: Fx ≈ 86,6 N e Fy = 50 N."
        ],
        "resultado": "A força equivale a 86,6 N na horizontal e 50 N na vertical."
      },
      {
        "titulo": "Resultante perpendicular",
        "enunciado": "Duas forças perpendiculares têm módulos de 3 N e 4 N. Qual é o módulo da resultante?",
        "passos": [
          "Como os vetores são perpendiculares, use Pitágoras.",
          "R = √(3² + 4²) = √25."
        ],
        "resultado": "R = 5 N. A direção depende da orientação dos dois vetores."
      }
    ],
    exercicios: [
      {
        "pergunta": "Um deslocamento tem módulo 20 m e forma 60° com o eixo x positivo. Quais são aproximadamente suas componentes?",
        "resposta": "Ax = 10 m e Ay ≈ 17,32 m.",
        "explicacao": "Ax = 20·cos(60°) = 10. Ay = 20·sen(60°) ≈ 17,32."
      },
      {
        "pergunta": "Uma pessoa caminha 6 m para leste e depois 8 m para norte. Qual é o módulo do deslocamento resultante?",
        "resposta": "10 m.",
        "explicacao": "Os deslocamentos são perpendiculares: R = √(6² + 8²) = 10 m."
      },
      {
        "pergunta": "A velocidade de 72 km/h corresponde a quantos m/s?",
        "resposta": "20 m/s.",
        "explicacao": "72 ÷ 3,6 = 20."
      }
    ],
    python: `import math

modulo = 100.0                              # intensidade do vetor em newtons
angulo_graus = 30.0                        # ângulo em relação ao eixo x
angulo = math.radians(angulo_graus)        # converte graus para radianos

ax = modulo * math.cos(angulo)             # componente horizontal
ay = modulo * math.sin(angulo)             # componente vertical
resultante = math.hypot(ax, ay)            # módulo reconstruído

print(f"Fx = {ax:.2f} N")
print(f"Fy = {ay:.2f} N")
print(f"Módulo = {resultante:.2f} N")`
  },
  "leis-newton": {
    gancho: "Por que um caminhão precisa de mais força que uma bicicleta para ganhar a mesma aceleração?",
    resumo: "A cinemática descreve como o movimento muda. As leis de Newton explicam por que ele muda: a força resultante produz aceleração, enquanto a inércia resiste à mudança de velocidade.",
    detalhes: "Posição, deslocamento, velocidade e aceleração descrevem o movimento. No movimento retilíneo uniforme, a velocidade é constante e a aceleração é zero. No movimento uniformemente variado, a aceleração é constante. A primeira lei de Newton afirma que um corpo mantém seu estado de repouso ou movimento retilíneo uniforme quando a força resultante é nula. A segunda lei relaciona força resultante, massa e aceleração: ΣF = m·a. A terceira lei diz que forças de interação surgem em pares de mesma intensidade e direção, mas sentidos opostos, aplicadas em corpos diferentes. Peso é a força gravitacional sobre um corpo; massa mede sua inércia. Atrito é uma força de contato que se opõe ao deslizamento relativo ou à tendência de deslizamento. Em problemas, desenhe o diagrama de corpo livre, escolha eixos, decomponha forças e só então aplique as equações. A aceleração acompanha a força resultante, não necessariamente a direção da velocidade.",
    formulas: [
      {
        "nome": "Velocidade média",
        "expressao": "vₘ = Δs / Δt",
        "significado": "Deslocamento dividido pelo intervalo de tempo. No SI, m/s."
      },
      {
        "nome": "Aceleração média",
        "expressao": "a = Δv / Δt",
        "significado": "Variação da velocidade por unidade de tempo. No SI, m/s²."
      },
      {
        "nome": "Movimento com aceleração constante",
        "expressao": "v = v₀ + a·t   |   Δs = v₀·t + ½·a·t²",
        "significado": "Equações horárias para movimento retilíneo com aceleração constante."
      },
      {
        "nome": "Segunda lei de Newton",
        "expressao": "ΣF = m·a",
        "significado": "A força resultante, em newtons, é igual à massa em kg multiplicada pela aceleração em m/s²."
      },
      {
        "nome": "Peso próximo à superfície da Terra",
        "expressao": "P = m·g   (g ≈ 9,81 m/s²)",
        "significado": "Peso é uma força e varia com o campo gravitacional; massa não muda ao trocar de planeta."
      }
    ],
    exemplos: [
      {
        "titulo": "Aceleração de um veículo",
        "enunciado": "Um veículo de 1.200 kg recebe força resultante horizontal de 2.400 N. Desprezando outras forças horizontais, qual é sua aceleração?",
        "passos": [
          "Identifique m = 1.200 kg e ΣF = 2.400 N.",
          "Aplique ΣF = m·a e isole a: a = ΣF/m.",
          "a = 2.400/1.200 = 2 m/s²."
        ],
        "resultado": "A aceleração é 2 m/s² no sentido da força resultante."
      },
      {
        "titulo": "Velocidade após alguns segundos",
        "enunciado": "Um corpo parte com velocidade de 5 m/s e acelera a 2 m/s² durante 4 s. Qual será a velocidade final?",
        "passos": [
          "Use v = v₀ + a·t.",
          "v = 5 + 2·4 = 13 m/s."
        ],
        "resultado": "A velocidade final é 13 m/s, supondo aceleração constante."
      }
    ],
    exercicios: [
      {
        "pergunta": "Uma força resultante de 900 N atua em uma massa de 300 kg. Qual é a aceleração?",
        "resposta": "3 m/s².",
        "explicacao": "a = ΣF/m = 900/300 = 3 m/s²."
      },
      {
        "pergunta": "Um objeto de 10 kg está em repouso e recebe força resultante constante de 20 N durante 3 s. Qual é sua velocidade final?",
        "resposta": "6 m/s.",
        "explicacao": "a = 20/10 = 2 m/s². Então v = 0 + 2·3 = 6 m/s."
      },
      {
        "pergunta": "Se a força resultante sobre um corpo é zero, ele necessariamente está parado?",
        "resposta": "Não.",
        "explicacao": "Pela primeira lei de Newton, ele pode estar em repouso ou em movimento retilíneo uniforme."
      }
    ],
    python: `massa = 1200.0                              # massa do veículo em kg
forca_resultante = 2400.0                  # força horizontal resultante em N
velocidade_inicial = 5.0                   # velocidade inicial em m/s
tempo = 4.0                                # duração em segundos

aceleracao = forca_resultante / massa     # segunda lei de Newton
velocidade_final = velocidade_inicial + aceleracao * tempo
deslocamento = velocidade_inicial * tempo + 0.5 * aceleracao * tempo**2

print(f"Aceleração: {aceleracao:.2f} m/s²")
print(f"Velocidade final: {velocidade_final:.2f} m/s")
print(f"Deslocamento: {deslocamento:.2f} m")`
  },
  "propulsao": {
    gancho: "Se não existe ar no espaço, contra o que o foguete empurra para avançar?",
    resumo: "Um foguete acelera ao expelir massa em alta velocidade. A conservação da quantidade de movimento explica a propulsão; o empuxo altera a velocidade e pode acelerar, frear ou desviar a nave.",
    detalhes: "O motor de um foguete não precisa empurrar o ar. Ele lança gases para trás e, pela conservação da quantidade de movimento, o foguete recebe variação de movimento no sentido oposto. A terceira lei de Newton descreve as forças de interação entre motor e gases; a conservação do momento explica o sistema foguete + propelente. Empuxo é uma força, medida em newtons. A aceleração instantânea depende da força resultante e da massa naquele instante. Como o combustível é consumido, a massa do foguete diminui; por isso, a aceleração pode aumentar mesmo com empuxo aproximadamente constante. Desligar o motor não faz a nave parar: sem força resultante significativa, ela mantém sua velocidade. Para frear, é necessário produzir aceleração contrária à velocidade. Para curvar, aplica-se uma força com componente perpendicular à velocidade. Em uma descrição mais completa, a equação ideal do foguete relaciona a variação de velocidade à velocidade efetiva de exaustão e à razão entre massa inicial e final. Atmosfera, gravidade, perdas e limites estruturais tornam o voo real mais complexo; os exemplos desta trilha isolam princípios para facilitar a compreensão.",
    formulas: [
      {
        "nome": "Quantidade de movimento",
        "expressao": "p = m·v",
        "significado": "Produto da massa pela velocidade; é uma grandeza vetorial."
      },
      {
        "nome": "Impulso",
        "expressao": "J = F·Δt = Δp",
        "significado": "Para força constante, o impulso é força vezes tempo e corresponde à variação da quantidade de movimento."
      },
      {
        "nome": "Aceleração translacional",
        "expressao": "a = Fresultante / m",
        "significado": "Modelo instantâneo: use a massa atual do veículo e a força resultante naquele instante."
      },
      {
        "nome": "Equação ideal do foguete",
        "expressao": "Δv = vₑ · ln(m₀ / m_f)",
        "significado": "vₑ é a velocidade efetiva de exaustão; m₀ é a massa inicial e m_f a massa final. Modelo ideal sem perdas externas."
      }
    ],
    exemplos: [
      {
        "titulo": "Aceleração simplificada",
        "enunciado": "Um veículo espacial tem massa instantânea de 6.000 kg e recebe empuxo resultante de 12.000 N. Qual é a aceleração naquele instante?",
        "passos": [
          "Considere o empuxo como força resultante no eixo analisado.",
          "a = F/m = 12.000/6.000.",
          "a = 2 m/s²."
        ],
        "resultado": "A aceleração instantânea é 2 m/s². À medida que a massa diminui, esse valor muda se o empuxo permanecer igual."
      },
      {
        "titulo": "Frenagem no espaço",
        "enunciado": "Uma nave se desloca a 100 m/s para a direita. Um motor produz aceleração constante de 2 m/s² para a esquerda. Quanto tempo leva para reduzir a velocidade a zero?",
        "passos": [
          "Defina a direita como positiva: v₀ = 100 m/s e a = −2 m/s².",
          "Use v = v₀ + a·t e faça v = 0.",
          "0 = 100 − 2t; portanto t = 50 s."
        ],
        "resultado": "A nave leva 50 s para parar nesse modelo. O motor precisa atuar no sentido contrário ao movimento."
      }
    ],
    exercicios: [
      {
        "pergunta": "Uma nave de 2.000 kg recebe força resultante de 4.000 N. Qual é a aceleração instantânea?",
        "resposta": "2 m/s².",
        "explicacao": "a = F/m = 4.000/2.000 = 2 m/s²."
      },
      {
        "pergunta": "Uma nave segue em linha reta com motores desligados e força resultante desprezível. O que acontece com sua velocidade?",
        "resposta": "Permanece constante.",
        "explicacao": "A primeira lei de Newton: força resultante zero implica aceleração zero, não velocidade zero."
      },
      {
        "pergunta": "Para reduzir a velocidade de uma nave que avança para a direita, em que sentido deve apontar a aceleração de frenagem?",
        "resposta": "Para a esquerda.",
        "explicacao": "A aceleração precisa ter componente contrária à velocidade para reduzir seu módulo."
      }
    ],
    python: `massa = 6000.0                              # massa instantânea em kg
empuxo = 12000.0                            # empuxo resultante em N
velocidade = 100.0                          # velocidade inicial em m/s

aceleracao = empuxo / massa                # modelo instantâneo com massa constante no passo
print(f"Aceleração: {aceleracao:.2f} m/s²")

# Exemplo separado: frenagem com aceleração contrária ao movimento
aceleracao_frenagem = -2.0                 # sinal negativo: sentido oposto à velocidade
tempo_parada = -velocidade / aceleracao_frenagem
print(f"Tempo para parar: {tempo_parada:.1f} s")

# Em um foguete real, a massa diminui durante a queima do propelente.`
  },
  "gravidade": {
    gancho: "Se a gravidade puxa a estação espacial, por que ela não cai diretamente sobre a Terra?",
    resumo: "A gravidade atua mesmo a grandes altitudes. Uma órbita acontece quando a velocidade tangencial faz o corpo cair continuamente ao redor do planeta, sem atingir sua superfície.",
    detalhes: "Toda massa atrai outra massa. A lei da gravitação universal calcula a intensidade dessa força usando as massas envolvidas e a distância entre seus centros. Próximo à superfície terrestre, o campo gravitacional tem módulo aproximado de 9,81 m/s², mas esse valor diminui com a altitude. Em órbita circular, a gravidade fornece a força centrípeta necessária para curvar a trajetória. A nave está em queda livre contínua: ela e tudo dentro dela aceleram aproximadamente juntos, o que produz a sensação de ausência de peso. Isso não significa ausência de gravidade. Para uma órbita circular ideal, a velocidade depende da massa do corpo central e do raio orbital medido a partir do centro do planeta. Se a velocidade tangencial for insuficiente, a trajetória pode interceptar o planeta; se for muito alta, pode se tornar uma órbita elíptica ou uma trajetória de escape, dependendo das condições. A velocidade de escape é a mínima velocidade ideal para chegar muito longe sem propulsão adicional, desprezando atmosfera e outros corpos. Órbitas reais sofrem perturbações de outros corpos, irregularidades gravitacionais e resistência atmosférica em baixas altitudes.",
    formulas: [
      {
        "nome": "Gravitação universal",
        "expressao": "F = G · (M·m / r²)",
        "significado": "G é a constante gravitacional; M e m são as massas; r é a distância entre os centros."
      },
      {
        "nome": "Campo gravitacional",
        "expressao": "g = G·M / r²",
        "significado": "Aceleração gravitacional produzida por uma massa M a uma distância r."
      },
      {
        "nome": "Velocidade orbital circular",
        "expressao": "vₒ = √(G·M / r)",
        "significado": "Velocidade necessária para uma órbita circular ideal de raio r ao redor da massa M."
      },
      {
        "nome": "Velocidade de escape",
        "expressao": "vₑₛc = √(2·G·M / r)",
        "significado": "Velocidade mínima ideal para escapar do campo gravitacional sem propulsão posterior."
      }
    ],
    exemplos: [
      {
        "titulo": "Gravidade em altitude",
        "enunciado": "Considere um planeta de massa M. Se a distância ao centro dobra, como fica o módulo do campo gravitacional?",
        "passos": [
          "Use g = G·M/r².",
          "Substitua r por 2r: g₂ = G·M/(2r)².",
          "g₂ = G·M/(4r²) = g₁/4."
        ],
        "resultado": "O campo gravitacional cai para um quarto do valor inicial quando a distância ao centro dobra."
      },
      {
        "titulo": "Velocidade orbital terrestre aproximada",
        "enunciado": "Use G = 6,674×10⁻¹¹ SI, M = 5,972×10²⁴ kg e raio orbital r = 6,78×10⁶ m. Estime a velocidade circular.",
        "passos": [
          "Aplique v = √(G·M/r).",
          "Substitua os valores em unidades SI.",
          "O resultado é aproximadamente 7.670 m/s."
        ],
        "resultado": "A velocidade orbital é cerca de 7,67 km/s, em um modelo circular ideal."
      }
    ],
    exercicios: [
      {
        "pergunta": "Se a distância entre dois corpos dobra, mantendo as massas, como muda a força gravitacional?",
        "resposta": "Cai para um quarto.",
        "explicacao": "A força é inversamente proporcional ao quadrado da distância: 1/(2²) = 1/4."
      },
      {
        "pergunta": "Astronautas em uma estação orbital estão fora da gravidade terrestre?",
        "resposta": "Não.",
        "explicacao": "A gravidade ainda atua. A sensação de ausência de peso ocorre porque estação e astronautas estão em queda livre conjunta."
      },
      {
        "pergunta": "Na fórmula da velocidade orbital, r é a altitude acima do solo ou a distância ao centro do planeta?",
        "resposta": "Distância ao centro do planeta.",
        "explicacao": "Se a altitude for h, use r = raio do planeta + h."
      }
    ],
    python: `G = 6.674e-11                               # constante gravitacional, N·m²/kg²
M_terra = 5.972e24                          # massa da Terra em kg
raio_orbital = 6.78e6                       # distância ao centro da Terra em m

g = G * M_terra / raio_orbital**2          # campo gravitacional na órbita
v_orbital = (G * M_terra / raio_orbital) ** 0.5
v_escape = (2 * G * M_terra / raio_orbital) ** 0.5

print(f"g = {g:.3f} m/s²")
print(f"Velocidade orbital = {v_orbital/1000:.2f} km/s")
print(f"Velocidade de escape = {v_escape/1000:.2f} km/s")`
  },
  "manobras": {
    gancho: "Uma nave pode girar para apontar a câmera sem mudar o caminho que está percorrendo?",
    resumo: "Orientação e trajetória são coisas diferentes. Girar a nave altera sua atitude; aplicar força altera sua quantidade de movimento e, portanto, sua trajetória.",
    detalhes: "A atitude descreve para onde a nave está apontada. A trajetória descreve como sua posição muda no espaço. Uma nave pode girar em torno do próprio centro de massa sem alterar significativamente a velocidade do centro de massa. Para isso, sistemas de controle de atitude aplicam torques: rodas de reação, giroscópios de controle ou pequenos propulsores. Já para mudar a trajetória, é necessário produzir impulso externo, por exemplo com propulsores. Um pulso de força altera a quantidade de movimento: quanto maior a força ou o tempo de aplicação, maior a variação de velocidade para uma mesma massa. Uma queima na direção do movimento aumenta a velocidade; uma queima contrária reduz; uma queima perpendicular altera principalmente a direção da velocidade. Em órbita, pequenas variações de velocidade podem mudar bastante a forma e a orientação da órbita ao longo do tempo. O controle real exige considerar massa variável, braços de alavanca, acoplamentos, atrasos dos atuadores e restrições de combustível. O modelo didático separa primeiro rotação e translação para evitar a confusão comum de que apontar o nariz da nave automaticamente muda seu rumo.",
    formulas: [
      {
        "nome": "Impulso e variação de velocidade",
        "expressao": "Δv = F·Δt / m",
        "significado": "Para força constante e massa aproximadamente constante durante o pulso."
      },
      {
        "nome": "Torque",
        "expressao": "τ = r × F",
        "significado": "O torque depende da força e do braço perpendicular em relação ao centro de massa."
      },
      {
        "nome": "Momento angular",
        "expressao": "L = I·ω",
        "significado": "Para rotação em torno de eixo principal fixo: I é o momento de inércia e ω a velocidade angular."
      },
      {
        "nome": "Aceleração angular",
        "expressao": "τ = I·α",
        "significado": "Em um modelo de eixo fixo, torque resultante produz aceleração angular."
      }
    ],
    exemplos: [
      {
        "titulo": "Pulso de propulsor",
        "enunciado": "Um propulsor aplica 20 N durante 4 s em uma nave de 1.000 kg. Qual é a variação de velocidade?",
        "passos": [
          "Calcule o impulso: J = F·Δt = 20·4 = 80 N·s.",
          "Use Δv = J/m.",
          "Δv = 80/1.000 = 0,08 m/s."
        ],
        "resultado": "A velocidade muda em 0,08 m/s na direção do propulsor. O sentido depende da orientação do jato e da força sobre a nave."
      },
      {
        "titulo": "Girar sem transladar",
        "enunciado": "Uma nave usa propulsores em pares opostos, produzindo torque resultante, mas força resultante aproximadamente nula. O que muda?",
        "passos": [
          "A força resultante próxima de zero implica aceleração translacional próxima de zero.",
          "O torque resultante diferente de zero altera a rotação.",
          "A atitude muda, mas a velocidade do centro de massa permanece aproximadamente igual."
        ],
        "resultado": "A nave pode apontar para outra direção sem mudar imediatamente sua trajetória."
      }
    ],
    exercicios: [
      {
        "pergunta": "Um propulsor de 10 N atua por 5 s em uma nave de 500 kg. Qual é o módulo de Δv?",
        "resposta": "0,10 m/s.",
        "explicacao": "Δv = F·Δt/m = 10·5/500 = 0,10 m/s."
      },
      {
        "pergunta": "Uma nave gira 90° usando rodas de reação, sem aplicar força externa significativa. Sua trajetória muda automaticamente?",
        "resposta": "Não.",
        "explicacao": "A orientação muda; sem força externa resultante, a velocidade do centro de massa não muda de forma significativa."
      },
      {
        "pergunta": "Qual é o efeito de um impulso perpendicular à velocidade instantânea?",
        "resposta": "Altera a direção da velocidade.",
        "explicacao": "A componente perpendicular de Δv muda a direção do vetor velocidade; uma componente paralela muda seu módulo."
      }
    ],
    python: `massa = 1000.0                               # massa da nave em kg
forca = 20.0                                 # força aplicada pelo propulsor em N
duracao = 4.0                               # tempo de acionamento em s

impulso = forca * duracao                  # N·s
delta_v = impulso / massa                  # variação de velocidade em m/s

print(f"Impulso: {impulso:.1f} N·s")
print(f"Variação de velocidade: {delta_v:.3f} m/s")

# O cálculo não descreve a rotação da nave. Para isso, seria necessário
# conhecer o torque aplicado e o momento de inércia.`
  },
  "fisica-engenharia": {
    gancho: "Por que um trator mais potente nem sempre consegue puxar um implemento mais pesado?",
    resumo: "Trabalho, energia, potência, atrito e tração ajudam a dimensionar máquinas, bombas e operações agrícolas. Potência disponível não elimina limites de aderência, resistência e eficiência.",
    detalhes: "Trabalho mede a energia transferida por uma força ao longo de um deslocamento. Quando a força é paralela ao movimento, trabalho é força vezes deslocamento; quando há ângulo, entra o cosseno desse ângulo. Potência mede a rapidez com que o trabalho é realizado. Em movimento retilíneo com força e velocidade na mesma direção, P = F·v. Para um trator, a potência no motor não chega integralmente à barra de tração: transmissão, pneus, solo e implemento introduzem perdas. A força de tração disponível depende da aderência entre pneu e solo e pode ser limitada pelo patinamento. Atrito de deslizamento é frequentemente aproximado por μ·N em modelos simples, mas o solo agrícola é deformável e seu comportamento depende de umidade, textura, compactação e tipo de rodado. Em sistemas de bombeamento, a potência hidráulica ideal depende da densidade do fluido, gravidade, vazão e altura manométrica; a potência exigida no eixo é maior devido à eficiência menor que 100%. Esses modelos são estimativas de engenharia: para dimensionamento real, use curvas do fabricante, medições de campo, condições de operação e fatores de segurança.",
    formulas: [
      {
        "nome": "Trabalho de uma força constante",
        "expressao": "W = F·d·cos(θ)",
        "significado": "F é a força, d o deslocamento e θ o ângulo entre força e deslocamento. Unidade: joule (J)."
      },
      {
        "nome": "Potência média",
        "expressao": "P = W / Δt",
        "significado": "Trabalho realizado por unidade de tempo. Unidade: watt (W)."
      },
      {
        "nome": "Potência mecânica em movimento",
        "expressao": "P = F·v",
        "significado": "Válida quando força e velocidade são paralelas; para ângulo, use P = F·v·cos(θ)."
      },
      {
        "nome": "Atrito cinético simplificado",
        "expressao": "Fₐₜ = μₖ·N",
        "significado": "μₖ é o coeficiente de atrito cinético e N a força normal. É uma aproximação de contato seco rígido."
      },
      {
        "nome": "Potência hidráulica de uma bomba",
        "expressao": "Pₕ = ρ·g·Q·H   |   Pentrada = Pₕ / η",
        "significado": "ρ é densidade, Q vazão volumétrica, H altura manométrica e η eficiência global."
      }
    ],
    exemplos: [
      {
        "titulo": "Potência na barra de tração",
        "enunciado": "Um trator exerce força de tração de 18 kN e se desloca a 2 m/s. Qual é a potência mecânica transmitida nessa condição?",
        "passos": [
          "Converta 18 kN para 18.000 N.",
          "Como força e velocidade estão na mesma direção, use P = F·v.",
          "P = 18.000·2 = 36.000 W."
        ],
        "resultado": "A potência na barra é 36 kW. A potência exigida no motor será maior devido às perdas do sistema."
      },
      {
        "titulo": "Potência de bombeamento",
        "enunciado": "Uma bomba movimenta água (ρ = 1.000 kg/m³) com vazão de 0,02 m³/s e altura manométrica de 20 m. Considere eficiência global de 70%. Estime a potência de entrada.",
        "passos": [
          "Calcule a potência hidráulica: Pₕ = ρ·g·Q·H.",
          "Pₕ = 1.000·9,81·0,02·20 = 3.924 W.",
          "Divida pela eficiência: Pentrada = 3.924/0,70 ≈ 5.606 W."
        ],
        "resultado": "A potência de entrada estimada é 5,6 kW. O valor real depende da curva da bomba e das perdas da instalação."
      }
    ],
    exercicios: [
      {
        "pergunta": "Uma máquina aplica força constante de 500 N ao longo de 10 m, na mesma direção do deslocamento. Qual é o trabalho?",
        "resposta": "5.000 J.",
        "explicacao": "W = F·d = 500·10 = 5.000 J."
      },
      {
        "pergunta": "Um equipamento realiza 12.000 J de trabalho em 20 s. Qual é a potência média?",
        "resposta": "600 W.",
        "explicacao": "P = W/Δt = 12.000/20 = 600 W."
      },
      {
        "pergunta": "Se a eficiência de uma bomba é 80%, a potência de entrada é menor ou maior que a potência hidráulica útil?",
        "resposta": "Maior.",
        "explicacao": "Pentrada = Pútil/η. Com η menor que 1, a potência de entrada precisa ser maior para compensar as perdas."
      }
    ],
    python: `# Potência de tração de um trator
forca_tracao = 18_000.0                    # 18 kN convertidos para N
velocidade = 2.0                           # m/s
potencia_tracao = forca_tracao * velocidade

# Estimativa de potência de entrada de uma bomba
densidade = 1000.0                        # água, kg/m³
gravidade = 9.81                           # m/s²
vazao = 0.02                              # m³/s
altura = 20.0                             # m
eficiencia = 0.70                         # 70%
potencia_hidraulica = densidade * gravidade * vazao * altura
potencia_entrada = potencia_hidraulica / eficiencia

print(f"Tração: {potencia_tracao/1000:.1f} kW")
print(f"Potência hidráulica: {potencia_hidraulica/1000:.2f} kW")
print(f"Potência de entrada estimada: {potencia_entrada/1000:.2f} kW")`
  }
};
