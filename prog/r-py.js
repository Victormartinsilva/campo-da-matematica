/* Módulo de Programação e dados: R e Python lado a lado. O R aparece como código mostrado com a saída esperada; o equivalente em Python é o que executa. */
(window.MODULOS_PROG = window.MODULOS_PROG || []).push({
  id: "r-py",
  nome: "R e Python lado a lado",
  gancho: "R ou Python: preciso escolher um, ou cada um tem o seu lugar?",
  resumo: "R nasceu para estatística e análise; Python é de uso geral e domina a IA. Os dois têm tabelas (data frame) e fazem o mesmo trabalho de filtrar, agrupar e resumir, com sintaxes diferentes.",
  detalhes: "O R foi criado por estatísticos e brilha em análise exploratória, modelos estatísticos e gráficos de publicação. O Python é uma linguagem de uso geral: serve para análise, mas também para automação, APIs e, principalmente, para o ecossistema de IA e aprendizado de máquina. Os dois organizam dados em uma tabela: o data frame no R e o DataFrame no pandas. O pacote dplyr, do tidyverse, expressa o trabalho em verbos encadeados com o pipe (|>): filter, group_by, summarise, arrange. O pandas faz o equivalente com métodos encadeados por ponto: df[df.x > 15], groupby, agg, sort_values. Em R, a coluna se acessa com $ (saude$casos); em pandas, com colchetes (saude[\"casos\"]). Outra diferença que pega iniciante: o R conta a partir de 1 e o Python a partir de 0. Neste módulo o R aparece só como código mostrado, com a saída esperada, e o Python é o que roda aqui no laboratório. Quando escolher: R para estatística e relatórios, Python quando o trabalho vai para produção ou para um modelo de IA. Em equipes de dados é comum usar os dois.",
  saudacao: "Oi! Eu sou o Chaveta. Leia o R nos comentários e rode o Python equivalente. As duas linguagens contam a mesma história.",
  python: `import pandas as pd

# R:  saude <- data.frame(municipio = c(...), semana = c(...), casos = c(...))
saude = pd.DataFrame({
    "municipio": ["Alfa", "Beta", "Gama", "Delta", "Alfa", "Beta"],
    "semana": [1, 1, 1, 1, 2, 2],
    "casos": [12, 30, 5, 18, 20, 41],
})

# R:  mean(saude$casos)
print("média de casos:", saude["casos"].mean())

# R:  filter(saude, casos > 15)
graves = saude[saude["casos"] > 15]
print("linhas com mais de 15 casos:", len(graves))

# R:  saude |> group_by(municipio) |> summarise(total = sum(casos)) |> arrange(desc(total))
resumo = (saude.groupby("municipio", as_index=False)
               .agg(total=("casos", "sum"))
               .sort_values("total", ascending=False))
print(resumo.to_string(index=False))`,
  build: LabProg.python({
    id: "r-py",
    intro: "<p>Os dados são de exemplo: casos semanais de uma doença em quatro municípios fictícios. O R aparece nos comentários do código, e o Python é o que roda. Na primeira execução o laboratório baixa as bibliotecas (pandas e numpy, de 15 a 30 MB); depois fica rápido.</p><p>Cada desafio pede o equivalente em Python de uma linha de R.</p>",
    dica: "Os desafios conferem o que o programa imprime.",
    inicial: `import pandas as pd

saude = pd.DataFrame({
    "municipio": ["Alfa", "Beta", "Gama", "Delta", "Alfa", "Beta"],
    "semana": [1, 1, 1, 1, 2, 2],
    "casos": [12, 30, 5, 18, 20, 41],
})
print(saude)`,
    desafios: [
      {t: "Equivalente de mean(saude$casos) em R: imprima a média da coluna casos.", teste: ({saida, codigo}) => /^21(\.0)?$/.test(saida.trim().split("\n").pop().trim()) && /mean/.test(codigo), win: "saude[\"casos\"].mean() faz o que mean(saude$casos) faz no R. A média é (12 + 30 + 5 + 18 + 20 + 41) / 6 = 21."},
      {t: "Equivalente de filter(saude, casos > 15): imprima quantas linhas têm mais de 15 casos.", teste: ({saida, codigo}) => saida.trim().split("\n").pop().trim() === "4" && /15/.test(codigo), win: "A condição saude[\"casos\"] > 15 mantém 30, 18, 20 e 41: quatro linhas. No dplyr o mesmo filtro devolve as mesmas quatro linhas."},
      {t: "Some os casos por município (group_by + summarise no R) e imprima só o nome do município com mais casos.", teste: ({saida, codigo}) => saida.trim().split("\n").pop().trim() === "Beta" && /groupby/.test(codigo), win: "Beta soma 30 + 41 = 71 casos, mais que Alfa (32), Delta (18) e Gama (5). O groupby com sum faz o papel do summarise."}
    ]
  }),
  formulas: [
    {nome: "Data frame", expressao: "R: data.frame(a = c(1, 2))   Python: pd.DataFrame({\"a\": [1, 2]})", significado: "A mesma ideia nas duas linguagens: uma tabela com colunas nomeadas. No R é nativo; no Python vem do pandas."},
    {nome: "Coluna", expressao: "R: saude$casos   Python: saude[\"casos\"]", significado: "O R escolhe a coluna com $ e o pandas com colchetes e o nome entre aspas. Nos dois casos o resultado é um vetor de valores."},
    {nome: "Filtrar linhas", expressao: "R: filter(saude, casos > 15)   Python: saude[saude[\"casos\"] > 15]", significado: "O dplyr usa um verbo e entende o nome da coluna direto. O pandas usa a condição como índice da tabela."},
    {nome: "Agrupar e resumir", expressao: "R: group_by(m) |> summarise(t = sum(x))   Python: df.groupby(\"m\").agg(t=(\"x\", \"sum\"))", significado: "Mesmo plano em três passos: dividir por grupo, resumir cada grupo, juntar o resultado. Muda só a escrita."},
    {nome: "Pipe e encadeamento", expressao: "R: x |> f() |> g()   Python: x.f().g()", significado: "O pipe do R passa o resultado de um passo para o próximo. No pandas o ponto faz o mesmo papel, encadeando métodos."}
  ],
  exemplos: [
    {titulo: "Média e filtro: R mostrado, Python executado", enunciado: "Casos semanais por município de exemplo: Alfa 12 e 20, Beta 30 e 41, Gama 5, Delta 18. Calcule a média de casos e conte as linhas com mais de 15 casos.", passos: ["R (mostrado): mean(saude$casos) e nrow(filter(saude, casos > 15)). Saída esperada: [1] 21 e [1] 4.", "Python (executa): saude[\"casos\"].mean() devolve 21.0.", "Python: len(saude[saude[\"casos\"] > 15]) devolve 4, pois passam 30, 18, 20 e 41."], resultado: "Média de 21 casos e 4 linhas acima de 15, nas duas linguagens (o Python imprime 21.0)."},
    {titulo: "Total por município com tidyverse e pandas", enunciado: "Com os mesmos dados, some os casos por município e ordene do maior para o menor.", passos: ["R (mostrado): saude |> group_by(municipio) |> summarise(total = sum(casos)) |> arrange(desc(total)). Saída esperada: uma tabela com Beta 71, Alfa 32, Delta 18 e Gama 5.", "Python (executa): saude.groupby(\"municipio\", as_index=False).agg(total=(\"casos\", \"sum\")).sort_values(\"total\", ascending=False).", "Conferindo a conta: Beta 30 + 41 = 71; Alfa 12 + 20 = 32; Delta 18; Gama 5."], resultado: "Beta lidera com 71 casos, seguido de Alfa (32), Delta (18) e Gama (5)."}
  ],
  exercicios: [
    {pergunta: "Qual é o equivalente em pandas de saude$casos no R?", resposta: "saude[\"casos\"]", explicacao: "O R usa $ para pegar uma coluna do data frame, e o pandas usa colchetes com o nome da coluna entre aspas."},
    {pergunta: "Em R, o primeiro elemento de x é x[1]. Qual é o primeiro elemento de uma lista x em Python?", resposta: "x[0]", explicacao: "O R conta a partir de 1 e o Python a partir de 0. É a diferença que mais confunde quem passa de uma linguagem para outra."},
    {pergunta: "Você vai treinar um modelo de IA e colocá-lo em produção dentro de uma API. R ou Python tende a ser a escolha mais prática?", resposta: "Python", explicacao: "O ecossistema de IA (PyTorch, scikit-learn, bibliotecas de LLM) e as ferramentas de produção são centrados em Python. O R continua forte em estatística e relatórios, e dá para chamar um do outro quando for preciso."}
  ],
  erros: [
    {erro: "R e Python são rivais: é preciso escolher um e abandonar o outro.", correcao: "São ferramentas que se completam. Muitas equipes usam R para exploração estatística e Python para produção e IA. As ideias de tabela, filtro, grupo e resumo são as mesmas, e aprender uma facilita a outra."},
    {erro: "Copiar a posição do R para o Python: usar x[1] esperando o primeiro elemento.", correcao: "No Python o primeiro é x[0]. Em x[1] você pega o segundo. Em compensação, range(5) vai de 0 a 4, e não de 1 a 5."},
    {erro: "Escrever o filtro do pandas como no dplyr: saude[casos > 15].", correcao: "No pandas a coluna precisa ser citada pela tabela: saude[saude[\"casos\"] > 15]. Só dentro de métodos como query(\"casos > 15\") o nome da coluna pode aparecer sozinho."}
  ],
  fontes: [
    {titulo: "R for Data Science (2ª edição): Data transformation", url: "https://r4ds.hadley.nz/data-transform.html", origem: "Hadley Wickham, Mine Çetinkaya-Rundel e Garrett Grolemund", idioma: "en", nivel: "iniciante", estude: "Leia filter, arrange, group_by e summarise com o pipe, que são os verbos citados aqui."},
    {titulo: "Tidyverse", url: "https://www.tidyverse.org/", origem: "Tidyverse", idioma: "en", nivel: "iniciante", estude: "Veja a lista de pacotes (dplyr, ggplot2, readr) e a filosofia por trás deles."},
    {titulo: "Comparison with R / R libraries", url: "https://pandas.pydata.org/docs/getting_started/comparison/comparison_with_r.html", origem: "pandas", idioma: "en", nivel: "intermediário", estude: "Consulte a tabela de equivalências entre R base, dplyr e pandas."},
    {titulo: "An Introduction to R", url: "https://cran.r-project.org/doc/manuals/r-release/R-intro.html", origem: "R Core Team (CRAN)", idioma: "en", nivel: "intermediário", estude: "Use como referência para o básico da linguagem R: vetores, data frames e funções."}
  ]
});
(window.CTX_TEXTO = window.CTX_TEXTO || {})["r-py"] = {
  agro: "Ensaios de campo com delineamento experimental costumam ser analisados em R, com testes estatísticos. Python entra quando os dados de sensores e de imagem viram um modelo.",
  publico: "Epidemiologia e estatística de saúde têm muita tradição em R. Painéis e rotinas automáticas de atualização de dados costumam ficar em Python.",
  engenharia: "Para analisar um ensaio e produzir um gráfico de publicação, o R é confortável. Para ler o sensor, tratar o sinal e integrar com o sistema de controle, Python é o caminho.",
  dados: "Em Databricks e Fabric os notebooks aceitam as duas linguagens, mas o Python tem o ecossistema de IA. Saber ler R ajuda a aproveitar análises prontas de estatísticos.",
  negocios: "Um relatório estatístico de pesquisa de mercado pode sair do R. Um modelo de previsão de vendas ligado ao sistema da empresa tende a ser em Python.",
  dia: "É como saber dois idiomas: cada um resolve melhor alguns assuntos, e quem entende a lógica (tabela, filtro, grupo) passa de um para o outro sem sofrer."
};
