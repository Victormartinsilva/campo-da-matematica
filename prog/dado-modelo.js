/* Módulo de Programação e dados: Do dado ao modelo. Atributos e rótulo, limpeza, treino e teste, métricas, vazamento e o fluxo de um projeto de ML numa tabela. */
(window.MODULOS_PROG = window.MODULOS_PROG || []).push({
  id: "dado-modelo",
  nome: "Do dado ao modelo",
  gancho: "O modelo acertou 98% no seu computador e errou metade na fazenda. O que aconteceu no caminho?",
  resumo: "Um projeto de ML numa tabela separa atributos (o que se sabe) do rótulo (o que se quer prever), limpa os dados, guarda um teste intocado e mede o resultado com a métrica certa.",
  detalhes: "Uma tabela de ML tem duas partes: os atributos (X), que são as colunas que você conhece antes do fato, e o rótulo (y), a coluna que você quer prever. Antes de modelar vem a limpeza: tratar valores faltantes, corrigir tipos, remover duplicatas e decidir o que fazer com valores absurdos. Depois, a regra de ouro: separar a tabela em treino (o modelo aprende aqui) e teste (a prova final, que o modelo nunca viu). Se os dados têm tempo, o teste deve ser o período mais recente, e não linhas sorteadas. A nota no teste é a estimativa honesta de como o modelo se sai no mundo real. A métrica precisa combinar com o problema: a acurácia engana quando o evento raro é justamente o que importa, e aí valem precisão e recall. O pior inimigo é o vazamento de dados: qualquer informação do teste (ou do futuro) que entra no treino, como escolher um limite olhando o teste ou preencher faltantes com a média da tabela inteira. O vazamento infla a nota e a decepção chega só em produção. O fluxo completo é: entender a pergunta, separar atributos e rótulo, limpar, dividir, ajustar só no treino, medir no teste e só então decidir.",
  saudacao: "Oi! Eu sou o Chaveta. Aqui a tabela de pedidos tem um defeito escondido: rode, ache o problema e conserte.",
  python: `limite = 40                       # parâmetro do modelo: mude com − e +
# (distancia_km, chuva, atrasou). A última coluna é o rótulo.
pedidos = [(12, 0, 0), (55, 0, 1), (30, 1, 1), (8, 0, 0), (62, 1, 1),
           (25, 0, 0), (41, 0, 1), (18, 1, 0), (70, 0, 1), (35, 0, 0)]

corte = int(len(pedidos) * 0.8)   # 80% para treinar
treino, teste = pedidos[:corte], pedidos[corte:]

def acuracia(dados):
    acertos = sum((p[0] > limite) == bool(p[2]) for p in dados)
    return acertos / len(dados)

print("treino:", len(treino), "teste:", len(teste))
print("acuracia no treino:", acuracia(treino))
print("acuracia no teste:", acuracia(teste))`,
  build: LabProg.python({
    id: "dado-modelo",
    titulo: "Código Python: do dado ao modelo",
    intro: "<p>A tabela tem 25 pedidos: distância em km, se choveu (1 ou 0) e o rótulo <b>atrasou</b> (1 ou 0). O modelo é uma regra simples: prevê atraso quando a distância passa de um limite. Hoje o código treina e testa na tabela inteira, e é isso que você vai consertar, passo a passo.</p>",
    dica: "Os desafios conferem o que o programa imprime.",
    inicial: `# pedidos: (distancia_km, chuva, atrasou). atrasou é o RÓTULO.
pedidos = [
    (12, 0, 0), (55, 0, 1), (30, 1, 1), (8, 0, 0), (62, 1, 1),
    (25, 0, 0), (41, 0, 1), (18, 1, 0), (70, 0, 1), (35, 0, 0),
    (48, 1, 1), (15, 0, 0), (52, 0, 1), (28, 1, 1), (20, 0, 0),
    (66, 1, 1), (38, 0, 1), (45, 0, 1), (10, 1, 0), (58, 0, 1),
    (57, 0, 0), (27, 0, 0), (14, 1, 0), (51, 1, 1), (53, 1, 1),
]

def prever(p, limite):
    return 1 if p[0] > limite else 0

def acuracia(dados, limite):
    acertos = sum(1 for p in dados if prever(p, limite) == p[2])
    return acertos / len(dados)

def melhor_limite(dados):
    candidatos = sorted(set(p[0] for p in dados))
    return max(candidatos, key=lambda c: (acuracia(dados, c), -c))

# Defeito: treino e teste são a tabela inteira. Separe 80% e 20%.
treino = pedidos
teste = pedidos
print("treino:", len(treino), "teste:", len(teste))

limite = 40
print("acuracia treino:", acuracia(treino, limite))`,
    desafios: [
      {t: "Separe os 20 primeiros pedidos para treino e os 5 últimos para teste (80% e 20%) e imprima os dois tamanhos.", teste: ({saida}) => /treino\D*20\D+teste\D*5(?!\d)/i.test(saida), win: "Agora existe uma prova que o modelo nunca viu. Com dados no tempo, o teste são as linhas mais recentes."},
      {t: "Com limite = 40, imprima a acurácia no teste (acertos divididos pelo total de linhas do teste).", teste: ({saida}) => saida.split("\n").some(l => /teste/i.test(l) && /(?<![\d.])(0[.,]80?|80(?:[.,]0+)?\s*%)(?!\d)/.test(l)), win: "Acertou 4 dos 5 pedidos do teste: 0,8. Com só 5 linhas, a nota é uma estimativa grosseira."},
      {t: "Escolha o limite ótimo usando só o treino (melhor_limite(treino)) e, para comparar, o que espiou a tabela inteira (melhor_limite(pedidos)). Imprima os dois números.", teste: ({saida, codigo}) => /melhor_limite\(\s*treino\s*\)/.test(codigo) && /melhor_limite\(\s*pedidos\s*\)/.test(codigo) && /(?<![\d.])25(?![\d.])/.test(saida) && /(?<![\d.])27(?![\d.])/.test(saida), win: "O limite honesto é 25 e o que espiou o teste é 27. Quem olhou o teste já saiu ajustado a ele."},
      {t: "Imprima a acurácia no teste com cada um dos dois limites e veja qual parece melhor.", teste: ({saida, codigo}) => /melhor_limite\(\s*treino\s*\)/.test(codigo) && /melhor_limite\(\s*pedidos\s*\)/.test(codigo) && /(?<![\d.])(0[.,]60?|60(?:[.,]0+)?\s*%)(?!\d)/.test(saida) && /(?<![\d.])(0[.,]80?|80(?:[.,]0+)?\s*%)(?!\d)/.test(saida), win: "O limite vazado mostra 0,8 e o honesto mostra 0,6. A nota maior é falsa: o teste participou da escolha. Só o 0,6 vale como previsão do mundo real."}
    ]
  }),
  formulas: [
    {nome: "Atributos e rótulo", expressao: "X = colunas conhecidas · y = coluna a prever", significado: "Os atributos (X) descrevem cada linha antes do fato. O rótulo (y) é a resposta que o modelo aprende a dar. Se um atributo só existe depois do fato, ele não pode entrar em X."},
    {nome: "Divisão treino e teste", expressao: "n_treino = 0,8 × n · n_teste = n − n_treino", significado: "O treino ajusta o modelo e o teste mede o resultado. Uma divisão comum é 80% e 20%. Com dados no tempo, o teste é o período mais recente."},
    {nome: "Acurácia", expressao: "acurácia = acertos ÷ total", significado: "Proporção de previsões corretas. Engana quando uma classe é rara: prever sempre a classe comum já dá nota alta."},
    {nome: "Precisão e recall", expressao: "precisão = VP ÷ (VP + FP) · recall = VP ÷ (VP + FN)", significado: "Precisão responde quantos alertas estavam certos. Recall responde quantos casos reais foram achados. VP são verdadeiros positivos, FP falsos positivos e FN falsos negativos."},
    {nome: "Regra contra o vazamento", expressao: "ajustar(treino) → medir(teste)", significado: "Tudo o que aprende algo dos dados (limite, média, escala, escolha de atributos) usa apenas o treino. O teste só entra na hora de medir, uma vez."}
  ],
  exemplos: [
    {titulo: "Dividir e medir a acurácia", enunciado: "Uma tabela tem 50 pedidos. Separe 80% para treino e 20% para teste. O modelo acerta 8 dos pedidos do teste. Qual é a acurácia?", passos: ["Treino: 0,8 × 50 = 40 pedidos. Teste: 50 − 40 = 10 pedidos.", "Acertos no teste: 8 de 10.", "Acurácia = 8 ÷ 10 = 0,8."], resultado: "40 linhas para treino, 10 para teste e acurácia de 0,8 (80%) no teste."},
    {titulo: "Quando a acurácia engana", enunciado: "De 1.000 pedidos, 40 atrasaram. Um modelo prevê sempre \"não atrasa\". Outro acha 30 dos 40 atrasos, com 20 falsos alarmes. Compare.", passos: ["Modelo que nunca alerta: acerta os 960 pedidos sem atraso. Acurácia = 960 ÷ 1.000 = 0,96. Recall = 0 ÷ 40 = 0.", "Segundo modelo: VP = 30, FN = 40 − 30 = 10, FP = 20, VN = 960 − 20 = 940.", "Acurácia = (30 + 940) ÷ 1.000 = 0,97. Precisão = 30 ÷ (30 + 20) = 0,6. Recall = 30 ÷ 40 = 0,75."], resultado: "As acurácias são parecidas (0,96 e 0,97), mas o primeiro modelo não acha nenhum atraso. O segundo tem precisão 0,6 e recall 0,75."}
  ],
  exercicios: [
    {pergunta: "Uma tabela tem 200 linhas e você separa 75% para treino. Quantas linhas vão para o treino e quantas para o teste?", resposta: "150 para treino e 50 para teste", explicacao: "Treino: 0,75 × 200 = 150. Teste: 200 − 150 = 50."},
    {pergunta: "Num teste de 100 pedidos, o modelo teve VP = 18, FP = 6, FN = 12 e VN = 64. Calcule precisão, recall e acurácia.", resposta: "Precisão 0,75, recall 0,6 e acurácia 0,82", explicacao: "Precisão = 18 ÷ (18 + 6) = 0,75. Recall = 18 ÷ (18 + 12) = 0,6. Acurácia = (18 + 64) ÷ 100 = 0,82."},
    {pergunta: "Você preenche os valores faltantes de distancia_km com a média da tabela inteira e só depois separa treino e teste. Isso é vazamento?", resposta: "Sim", explicacao: "A média foi calculada com linhas do teste, então informação do teste entrou no treino. O certo é separar primeiro, calcular a média só no treino e aplicar esse mesmo valor ao teste."}
  ],
  erros: [
    {erro: "Acurácia de 97% quer dizer que o modelo é ótimo.", correcao: "Veja a proporção de cada classe. Se só 4% dos pedidos atrasam, prever sempre \"não atrasa\" já dá 96%. Compare com esse modelo de referência e olhe precisão e recall da classe rara."},
    {erro: "Posso normalizar ou preencher os faltantes com a tabela toda e depois dividir.", correcao: "Divida primeiro. Média, desvio, limites e escolha de atributos são aprendidos, então devem ser calculados no treino e apenas aplicados ao teste. Fazer antes é vazamento e infla a nota."},
    {erro: "Posso testar vários modelos no teste e ficar com o melhor sem problema.", correcao: "Cada escolha feita olhando o teste faz dele parte do treino. Para comparar modelos e ajustar parâmetros, separe uma validação (ou use validação cruzada) e use o teste uma única vez, no fim."}
  ],
  fontes: [
    {titulo: "Datasets: dividing the original dataset", url: "https://developers.google.com/machine-learning/crash-course/overfitting/dividing-datasets", origem: "Google for Developers (Machine Learning Crash Course)", idioma: "en", nivel: "iniciante", estude: "Veja por que existem conjuntos de treino, validação e teste e como evitar usar o teste mais de uma vez."},
    {titulo: "Classification: accuracy, recall, precision, and related metrics", url: "https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall", origem: "Google for Developers (Machine Learning Crash Course)", idioma: "en", nivel: "iniciante", estude: "Estude quando a acurácia engana e como precisão e recall medem o que importa em classes desbalanceadas."},
    {titulo: "Common pitfalls and recommended practices", url: "https://scikit-learn.org/stable/common_pitfalls.html", origem: "scikit-learn", idioma: "en", nivel: "intermediário", estude: "Leia a seção sobre vazamento de dados e como pré-processar sem espiar o teste."},
    {titulo: "Metrics and scoring: quantifying the quality of predictions", url: "https://scikit-learn.org/stable/modules/model_evaluation.html", origem: "scikit-learn", idioma: "en", nivel: "intermediário", estude: "Consulte as métricas de classificação (accuracy, precision, recall) e como escolher a que combina com o problema."}
  ]
});
(window.CTX_TEXTO = window.CTX_TEXTO || {})["dado-modelo"] = {
  agro: "Prever quais talhões terão praga: os atributos são clima, cultura e histórico, o rótulo é \"teve praga\". Treine nas safras antigas e teste na safra mais recente, que é o que vai acontecer na prática.",
  publico: "Um modelo que aponta cadastros com risco de inconsistência precisa de recall alto, para não deixar passar casos reais, e de precisão aceitável, para não sobrecarregar a fiscalização com falsos alarmes.",
  engenharia: "Prever falha de um equipamento com dados de sensores: se o atributo inclui uma leitura de depois da falha, há vazamento do futuro. A nota fica ótima no papel e o alerta chega tarde demais.",
  dados: "No pipeline, o split vem antes do pré-processamento que aprende algo (média, escala, codificação). Ajustar essas etapas só no treino e reaplicar no teste é a defesa padrão contra vazamento.",
  negocios: "Prever cancelamento de clientes: com 3% de cancelamentos, um modelo que nunca alerta tem 97% de acurácia e valor zero. Precisão e recall dizem quanto a campanha de retenção realmente acerta.",
  dia: "É como estudar para uma prova: se você vê as questões da prova antes, a nota sobe e não prova que aprendeu. O conjunto de teste é a prova que ninguém pode ver antes."
};
