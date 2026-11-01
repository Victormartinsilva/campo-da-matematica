/* Módulo de Programação e dados: Python para dados (listas, dicionários, numpy, pandas, filtrar, agrupar e um gráfico simples). */
(window.MODULOS_PROG = window.MODULOS_PROG || []).push({
  id: "py-dados",
  nome: "Python para dados",
  gancho: "Como transformar uma tabela com milhares de linhas em uma resposta de três linhas?",
  resumo: "Listas e dicionários guardam dados; numpy faz contas em vetores inteiros; pandas trata uma tabela como um objeto só, que se filtra e se agrupa em uma linha de código.",
  detalhes: "Quase todo trabalho com dados em Python usa quatro camadas. A lista guarda uma sequência de valores e o dicionário guarda pares chave e valor, como uma ficha de cadastro. O numpy (np.array) faz a conta sobre todos os valores de uma vez, sem escrever laço: temp * 9 / 5 + 32 converte um vetor inteiro. O pandas organiza os dados em uma tabela, o DataFrame, com colunas nomeadas, e oferece as operações de sempre: escolher uma coluna, filtrar linhas com uma condição e agrupar com groupby para somar ou tirar a média por categoria. Esse trio filtrar, agrupar e resumir responde a maior parte das perguntas de vendas, saúde pública, sensores e lavoura. O gráfico entra no fim, só para enxergar o resultado. Aqui o gráfico é feito em texto, para rodar em qualquer lugar; no seu computador você usaria o matplotlib.",
  saudacao: "Oi! Eu sou o Chaveta. Hoje a gente trata uma tabela inteira com poucas linhas. Aperte Executar e veja o resultado.",
  python: `import numpy as np
import pandas as pd

# 1. lista e dicionário
leituras = [21.5, 22.0, 35.0, 21.5]       # lista: sequência ordenada
sensor = {"id": "S-01", "local": "estufa", "leituras": leituras}   # dicionário: chave -> valor
print(sensor["local"], len(sensor["leituras"]))

# 2. numpy: conta sobre o vetor inteiro, sem laço
temp = np.array(leituras)
print("média:", round(temp.mean(), 2), "| máximo:", temp.max())
print("em Fahrenheit:", np.round(temp * 9 / 5 + 32, 1))

# 3. pandas: uma tabela
vendas = pd.DataFrame({
    "regiao": ["Sul", "Norte", "Sul", "Leste", "Norte", "Sul"],
    "produto": ["A", "B", "B", "A", "A", "A"],
    "valor": [120, 80, 200, 150, 60, 90],
})
print(vendas.head(3))

# 4. filtrar linhas e agrupar
grandes = vendas[vendas["valor"] > 100]
print("vendas acima de 100:", len(grandes))
total = vendas.groupby("regiao")["valor"].sum()
print(total)

# 5. um gráfico simples, em texto
for regiao, v in total.items():
    print(f"{regiao:6}", "#" * (v // 20), v)`,
  build: LabProg.python({
    id: "py-dados",
    intro: "<p>O laboratório usa pandas e numpy. Na primeira execução ele baixa as bibliotecas (de 15 a 30 MB), então a primeira vez demora; as seguintes são rápidas.</p><p>A tabela <code>vendas</code> já está pronta no código inicial. Use as colunas <code>regiao</code>, <code>produto</code> e <code>valor</code> para responder aos desafios.</p>",
    dica: "Os desafios conferem o que o programa imprime.",
    inicial: `import pandas as pd

vendas = pd.DataFrame({
    "regiao": ["Sul", "Norte", "Sul", "Leste", "Norte", "Sul"],
    "produto": ["A", "B", "B", "A", "A", "A"],
    "valor": [120, 80, 200, 150, 60, 90],
})
print(vendas)`,
    desafios: [
      {t: "Imprima o total da coluna valor (apenas o número).", teste: ({saida}) => saida.trim().split("\n").pop().trim() === "700", win: "A coluna é um vetor: .sum() soma todos os valores de uma vez. 120 + 80 + 200 + 150 + 60 + 90 = 700."},
      {t: "Filtre as vendas com valor maior que 100 e imprima quantas linhas sobraram.", teste: ({saida, codigo}) => saida.trim().split("\n").pop().trim() === "3" && /valor/.test(codigo) && /100/.test(codigo), win: "A condição vendas[\"valor\"] > 100 cria uma máscara de verdadeiro e falso; usada como índice, mantém só as 3 linhas que passam."},
      {t: "Use groupby para somar o valor por região e imprima o resultado.", teste: ({saida, codigo}) => /groupby/.test(codigo) && /Sul\s+410/.test(saida) && /Norte\s+140/.test(saida) && /Leste\s+150/.test(saida), win: "groupby separa as linhas por região e .sum() resume cada grupo: Sul 410, Norte 140 e Leste 150."}
    ]
  }),
  formulas: [
    {nome: "Lista e dicionário", expressao: "lista = [1, 2, 3]   ficha = {\"chave\": valor}", significado: "A lista guarda valores em ordem e se acessa por posição (lista[0]). O dicionário guarda pares e se acessa pela chave (ficha[\"chave\"])."},
    {nome: "Vetor numpy", expressao: "v = np.array(lista);  v * 2 + 1", significado: "Operações aritméticas valem para todos os elementos de uma vez. Evita o laço e é muito mais rápido em listas grandes."},
    {nome: "DataFrame", expressao: "pd.DataFrame({\"coluna\": [valores]})", significado: "Tabela com colunas nomeadas. Cada coluna é uma série (vetor com rótulos) que aceita sum(), mean(), max() e outras."},
    {nome: "Filtrar linhas", expressao: "df[df[\"coluna\"] > limite]", significado: "A condição gera verdadeiro ou falso para cada linha, e o df fica só com as linhas verdadeiras."},
    {nome: "Agrupar e resumir", expressao: "df.groupby(\"categoria\")[\"coluna\"].sum()", significado: "Divide a tabela por categoria e aplica um resumo (sum, mean, count) a cada grupo. Devolve uma linha por categoria."}
  ],
  exemplos: [
    {titulo: "Média e conversão de sensores", enunciado: "Quatro leituras de temperatura de uma estufa: 21.5, 22.0, 35.0 e 21.5 (em Celsius). Calcule a média e converta tudo para Fahrenheit com numpy.", passos: ["Crie o vetor: temp = np.array([21.5, 22.0, 35.0, 21.5]).", "Média: temp.mean() = (21.5 + 22.0 + 35.0 + 21.5) / 4 = 25.0.", "Fahrenheit: temp * 9 / 5 + 32 gera [70.7, 71.6, 95.0, 70.7] sem nenhum laço."], resultado: "Média de 25.0 °C e leituras em Fahrenheit de 70.7, 71.6, 95.0 e 70.7."},
    {titulo: "Vendas por região", enunciado: "Seis vendas com região e valor: Sul 120, Norte 80, Sul 200, Leste 150, Norte 60, Sul 90. Qual região vendeu mais?", passos: ["Monte o DataFrame com as colunas regiao e valor.", "Agrupe e some: df.groupby(\"regiao\")[\"valor\"].sum().", "Sul: 120 + 200 + 90 = 410. Norte: 80 + 60 = 140. Leste: 150.", "Para pegar o nome da maior, use .idxmax() sobre o resultado."], resultado: "A região Sul vendeu mais, com 410."}
  ],
  exercicios: [
    {pergunta: "Dado ficha = {\"id\": \"S-01\", \"local\": \"estufa\"}, o que ficha[\"local\"] devolve?", resposta: "\"estufa\"", explicacao: "O dicionário é acessado pela chave, e a posição não importa. Pedir a chave \"local\" devolve o valor guardado nela."},
    {pergunta: "Com v = np.array([1, 2, 3]), qual é o resultado de v * 10?", resposta: "[10 20 30]", explicacao: "O numpy aplica a operação a cada elemento. Já uma lista comum [1, 2, 3] * 10 repetiria a lista dez vezes, que é outra coisa."},
    {pergunta: "Em um DataFrame com a coluna valor = [120, 80, 200, 150, 60, 90], quantas linhas retorna df[df[\"valor\"] > 100]?", resposta: "3 linhas", explicacao: "Passam 120, 200 e 150. O 80, o 60 e o 90 ficam de fora, porque a condição é maior que 100."}
  ],
  erros: [
    {erro: "Usar and e or para combinar condições no pandas: df[(df[\"a\"] > 1) and (df[\"b\"] < 5)].", correcao: "Em colunas, use & (e), | (ou) e ~ (não), e coloque cada condição entre parênteses: df[(df[\"a\"] > 1) & (df[\"b\"] < 5)]. O and do Python não sabe comparar vetores inteiros."},
    {erro: "Achar que df.groupby(\"regiao\") já calcula alguma coisa.", correcao: "groupby só separa os grupos. O resultado aparece quando você aplica um resumo: .sum(), .mean(), .count() ou .agg(...). Sem isso, o Python imprime só o nome do objeto."},
    {erro: "Percorrer o DataFrame com for linha por linha para somar ou filtrar.", correcao: "Prefira as operações da coluna inteira: df[\"valor\"].sum() ou df[df[\"valor\"] > 100]. O código fica mais curto, mais claro e muito mais rápido quando a tabela cresce."}
  ],
  fontes: [
    {titulo: "Estruturas de dados (listas e dicionários)", url: "https://docs.python.org/pt-br/3/tutorial/datastructures.html", origem: "Python Software Foundation", idioma: "pt", nivel: "iniciante", estude: "Leia as seções sobre listas e dicionários, com os métodos mais usados."},
    {titulo: "NumPy: the absolute basics for beginners", url: "https://numpy.org/doc/stable/user/absolute_beginners.html", origem: "NumPy", idioma: "en", nivel: "iniciante", estude: "Veja o que é um array, como criá-lo e como fazer contas com ele."},
    {titulo: "10 minutes to pandas", url: "https://pandas.pydata.org/docs/user_guide/10min.html", origem: "pandas", idioma: "en", nivel: "iniciante", estude: "Acompanhe a criação de um DataFrame, a seleção de colunas, os filtros e o groupby."},
    {titulo: "Group by: split-apply-combine", url: "https://pandas.pydata.org/docs/user_guide/groupby.html", origem: "pandas", idioma: "en", nivel: "intermediário", estude: "Entenda a ideia de dividir, aplicar e combinar, que está por trás de todo resumo por categoria."}
  ]
});
(window.CTX_TEXTO = window.CTX_TEXTO || {})["py-dados"] = {
  agro: "Uma tabela com talhão, data e produtividade vira, com groupby, a média por talhão em uma linha. Filtrar os talhões abaixo da meta mostra onde agir primeiro.",
  publico: "Atendimentos de uma rede de saúde, um por linha, viram o total por unidade e por mês com groupby. Filtrar por faixa etária ou bairro mostra quem está sem cobertura.",
  engenharia: "Milhares de leituras de um sensor ficam em um vetor numpy: máximo, média e conversão de unidade saem sem laço. Filtrar os valores fora do limite aponta as falhas.",
  dados: "O DataFrame é a unidade de trabalho de quase todo pipeline em Databricks ou Fabric. Filtrar, agrupar e resumir aparecem antes de qualquer modelo de IA.",
  negocios: "Pedidos por região e produto viram faturamento por região com um groupby. Filtrar as vendas acima de uma meta mostra onde estão os grandes negócios.",
  dia: "Uma lista de gastos do mês, com categoria e valor, vira o total por categoria com groupby. É a planilha de casa, feita em código."
};
