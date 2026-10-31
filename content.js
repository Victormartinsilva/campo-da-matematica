/* Conteúdo didático dos assuntos: gancho, resumo, detalhes e Python comentado.
   As aplicações (campo, dia a dia, trabalho) e os laboratórios ficam em app.js. */
const CONTENT = {
  ideia: {
    gancho: "Se a conta de água é o total, o que o hidrômetro mede agora?",
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
    gancho: "Se eu dobrar o adubo, a lavoura dobra a produção?",
    resumo: "Uma função liga uma entrada a uma saída. Conhecer a regra e o domínio evita prometer o que a curva não entrega.",
    detalhes: "Cada situação aqui tem a sua regra: o frete cresce em linha reta, a produtividade sobe e depois cai, a praga explode. A pergunta é sempre a mesma: para essa entrada, qual é a saída? E até onde a regra vale? Fora do domínio medido, a curva é só um palpite.",
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
    gancho: "A planta está crescendo rápido ou devagar agora?",
    resumo: "A derivada é a inclinação da tangente: a velocidade com que a saída muda naquele ponto.",
    detalhes: "Comece com uma secante, a reta que liga dois pontos próximos. Quanto menor a distância h, mais ela se parece com a tangente. A inclinação resultante é a taxa de variação: cm por dia na planta, sacas por kg de adubo na produtividade. O gráfico de baixo mostra a derivada em todos os pontos de uma vez.",
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
    gancho: "Mais adubo sempre dá mais lucro?",
    resumo: "Onde a derivada vale zero, a curva para de subir. Esse ponto é a melhor dose, e quase nunca é a de maior produção.",
    detalhes: "O lucro é a receita da produção menos o custo do adubo. No começo cada quilo rende mais do que custa. Depois de certo ponto, o último quilo custa mais do que rende. O topo da curva de lucro fica antes do topo da produção. O botão de subida faz o que o aprendizado de máquina faz: seguir a derivada, passo a passo.",
    python: `B, C2 = 0.30, 0.0009                        # parâmetros da curva de produtividade
p, c = 60, 6                                # preço da saca e custo do kg de N
dL = lambda x: p*(B - 2*C2*x) - c           # derivada do lucro em relação à dose

x = 40.0                                    # dose inicial
for passo in range(10):                     # dez passos de subida
    x += 0.5 * dL(x) / (2*p*C2)             # anda na direção em que o lucro sobe
print(x, (B - c/p)/(2*C2))                  # numérico e analítico se encontram`
  },
  newton: {
    gancho: "Como achar a dose em que o lucro marginal zera, sem fórmula pronta?",
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
    gancho: "Quanta chuva caiu no total se a intensidade não parou de mudar?",
    resumo: "A integral soma uma quantidade que varia. Com retângulos cada vez mais finos, a soma vira a área exata.",
    detalhes: "O pluviômetro mede mm por hora, mas a lavoura sente os mm do total. Dividir o tempo em faixas, multiplicar altura por largura e somar dá uma aproximação. Quanto mais faixas, menor o erro, e o limite dessa soma é a integral.",
    python: `import numpy as np                          # contas numéricas

t = np.linspace(0, 6, 1000)                 # 1000 instantes em 6 horas
i = 12*np.exp(-t/2)                         # intensidade da chuva em mm/h
total = np.sum((i[1:] + i[:-1])/2 * np.diff(t))     # soma de trapézios: chuva total em mm
print(total)                                # perto de 22,8`
  },
  multiplas: {
    gancho: "Um pluviômetro só basta para saber a chuva da lavoura inteira?",
    resumo: "A integral dupla soma sobre uma região e a tripla soma sobre um volume, como a massa de solo.",
    detalhes: "A chuva não cai igual no talhão. Dividir a área em células, medir cada uma e somar dá o volume total. Com poucas células o erro é grande, e um único pluviômetro pode errar muito. Para a massa de solo, soma-se também ao longo da profundidade, com a densidade mudando em cada camada.",
    python: `import numpy as np                          # contas numéricas

n, L = 200, 100                             # 200 células por lado, talhão de 100 m
x = (np.arange(n) + .5) * L/n               # centro de cada célula
X, Y = np.meshgrid(x, x)                    # todas as posições (x, y)
r = 5 + 20*np.exp(-((X-30)**2 + (Y-65)**2)/(2*22**2))   # chuva em mm em cada célula
V = (r/1000).sum() * (L/n)**2               # mm viram m e multiplicam a área da célula
print(V)                                    # volume total em m3, perto de 110`
  },
  gradiente: {
    gancho: "Para onde a água escorre neste talhão?",
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
    gancho: "Quanto de cada adubo comercial entrega o N, o P e o K que a lavoura pede?",
    resumo: "Um sistema vira A·x = b. Quando a matriz tem inversa, a receita sai de x = A⁻¹·b.",
    detalhes: "Cada coluna da matriz é um produto e cada linha, um nutriente. Resolver é achar quanto de cada produto fecha as metas. Se dois produtos entregam os nutrientes na mesma proporção, a matriz perde a inversa e a receita deixa de ter solução única. Quantidades negativas indicam que a receita é inviável.",
    python: `import numpy as np                          # álgebra linear

A = np.array([[.45, .11, 0],                # linha N: teor de N em ureia, MAP e KCl
              [0,   .52, 0],                # linha P2O5
              [0,   0,   .60]])             # linha K2O
b = np.array([100, 80, 60])                 # meta em kg de nutriente por hectare
print(np.linalg.solve(A, b))                # kg de ureia, MAP e KCl que fecham a meta`
  },
  estatistica: {
    gancho: "A cultivar B rendeu mais, ou foi sorte do solo?",
    resumo: "O teste compara a diferença entre as médias com a variação entre parcelas. Mais repetições deixam o efeito real mais fácil de ver.",
    detalhes: "Cada parcela varia por motivos que você não controla. O teste t de Welch pergunta se a diferença observada seria comum só pelo acaso. O poder do teste é a chance de enxergar uma diferença que realmente existe, e cresce com mais repetições, menos ruído e efeito maior.",
    python: `import numpy as np                          # sorteios
from scipy import stats                     # testes estatísticos

rng = np.random.default_rng()               # gerador de números aleatórios
a = rng.normal(60, 6, 5)                    # cultivar A: média 60, desvio 6, 5 parcelas
b = rng.normal(64, 6, 5)                    # cultivar B: 4 sc/ha melhor de verdade
print(stats.ttest_ind(a, b, equal_var=False))   # teste de Welch: estatística e p-valor`
  },
  regressao: {
    gancho: "Dá para prever a produtividade só pela chuva do ciclo?",
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
    gancho: "Como achar o trecho certo quando o produtor usa outras palavras?",
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
  }
};
