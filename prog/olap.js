/* Módulo de Programação e dados: Bancos analíticos (OLAP). Laboratório de SQL real (SQLite no navegador) com um esquema estrela. */
(window.MODULOS_PROG = window.MODULOS_PROG || []).push({
  id: "olap",
  nome: "Bancos analíticos (OLAP)",
  gancho: "Por que o gerente não pode rodar o relatório do ano inteiro no mesmo banco onde os caixas registram as vendas?",
  resumo: "Um data warehouse guarda dados históricos organizados para perguntas de análise: uma tabela fato com os números no centro e dimensões em volta (esquema estrela), muitas vezes armazenada por colunas.",
  detalhes: "OLAP (processamento analítico online) responde a perguntas que somam milhões de linhas: faturamento por região, por mês, por produto. Fazer isso no banco OLTP do dia a dia disputa recursos com quem registra vendas e deixa o sistema lento, por isso os dados são copiados para um data warehouse. Lá se usa o esquema estrela: uma tabela fato (cada linha é um evento, como uma venda, com medidas numéricas e chaves) cercada por dimensões (produto, tempo, região), que descrevem o contexto e servem para filtrar e agrupar. Armazenar por colunas acelera a análise, porque uma soma de valor lê só a coluna valor, sem arrastar o resto de cada linha. O caminho dos dados até o warehouse é o ETL (extrair, transformar, carregar) ou o ELT (carregar primeiro e transformar dentro do próprio warehouse, hoje comum em plataformas como Databricks e Fabric).",
  saudacao: "Oi! Eu sou o Chaveta. Temos uma tabela fato e três dimensões. Junte, agrupe e veja o faturamento aparecer por região, categoria e mês.",
  python: `import sqlite3

con = sqlite3.connect(":memory:")
con.executescript("""
CREATE TABLE dim_regiao (id INTEGER PRIMARY KEY, nome TEXT);
CREATE TABLE dim_produto (id INTEGER PRIMARY KEY, nome TEXT, categoria TEXT);
CREATE TABLE fato_vendas (produto_id INT, regiao_id INT, quantidade INT, valor REAL);
INSERT INTO dim_regiao VALUES (1, 'Sul'), (2, 'Centro-Oeste');
INSERT INTO dim_produto VALUES (1, 'Soja', 'Grãos'), (2, 'Adubo NPK', 'Insumos');
INSERT INTO fato_vendas VALUES (1, 1, 100, 12000), (2, 1, 50, 15000), (1, 2, 120, 15000), (2, 2, 40, 12400);
""")

consulta = """
SELECT r.nome, p.categoria, SUM(f.valor) AS total
FROM fato_vendas f
JOIN dim_regiao r ON r.id = f.regiao_id
JOIN dim_produto p ON p.id = f.produto_id
GROUP BY r.nome, p.categoria
ORDER BY r.nome, p.categoria
"""
for linha in con.execute(consulta):
    print(linha)

# Linha contra coluna: o mesmo dado em dois formatos
por_linha = [{"produto": 1, "valor": 12000}, {"produto": 2, "valor": 15000}]
por_coluna = {"produto": [1, 2], "valor": [12000, 15000]}
print(sum(l["valor"] for l in por_linha))   # percorre registros inteiros
print(sum(por_coluna["valor"]))             # lê só a coluna que interessa`,
  build: LabProg.sql({
    id: "olap",
    titulo: "Consulta SQL (esquema estrela)",
    intro: "<p><b>Linha contra coluna.</b> Em um banco por linhas (típico de OLTP), cada registro fica inteiro junto no disco: ótimo para ler ou gravar uma venda completa. Em um banco por colunas (típico de OLAP), os valores de cada coluna ficam juntos: uma soma de <code>valor</code> lê só essa coluna, e valores parecidos lado a lado comprimem bem. Por isso relatórios sobre milhões de linhas são muito mais rápidos por colunas. (O SQLite deste laboratório guarda por linhas; o conceito vale para os warehouses reais.)</p><p>O banco abaixo é um esquema estrela: <b>fato_vendas</b> (as medidas <code>quantidade</code> e <code>valor</code>) no centro e as dimensões <b>dim_produto</b>, <b>dim_tempo</b> e <b>dim_regiao</b> em volta. Para analisar, faça <code>JOIN</code> do fato com a dimensão e use <code>GROUP BY</code> nela.</p>",
    dica: "Os desafios conferem a tabela devolvida pelo último SELECT. Devolva primeiro a coluna da dimensão (nome, categoria ou mes) e depois o total.",
    esquema: `CREATE TABLE dim_produto (id INTEGER PRIMARY KEY, nome TEXT, categoria TEXT);
CREATE TABLE dim_tempo (id INTEGER PRIMARY KEY, data TEXT, ano INTEGER, mes INTEGER);
CREATE TABLE dim_regiao (id INTEGER PRIMARY KEY, nome TEXT);
CREATE TABLE fato_vendas (id INTEGER PRIMARY KEY, produto_id INTEGER REFERENCES dim_produto(id), tempo_id INTEGER REFERENCES dim_tempo(id), regiao_id INTEGER REFERENCES dim_regiao(id), quantidade INTEGER, valor REAL);
INSERT INTO dim_produto VALUES (1,'Soja','Grãos'),(2,'Milho','Grãos'),(3,'Adubo NPK','Insumos'),(4,'Herbicida','Insumos');
INSERT INTO dim_tempo VALUES (1,'2025-01-15',2025,1),(2,'2025-01-28',2025,1),(3,'2025-02-10',2025,2),(4,'2025-02-24',2025,2),(5,'2025-03-12',2025,3),(6,'2025-03-30',2025,3);
INSERT INTO dim_regiao VALUES (1,'Sul'),(2,'Centro-Oeste'),(3,'Sudeste');
INSERT INTO fato_vendas VALUES (1,1,1,1,100,12000),(2,2,1,2,80,6400),(3,3,2,1,50,15000),(4,1,3,2,120,15000),(5,4,3,3,20,8000),(6,2,4,1,60,5400),(7,1,4,2,90,11700),(8,3,5,3,40,12400),(9,4,5,1,25,10250),(10,1,5,2,150,19500),(11,2,6,3,70,6300),(12,3,6,1,45,13500);`,
    tabelas: ["fato_vendas", "dim_produto", "dim_tempo", "dim_regiao"],
    inicial: `-- O faturamento total, sem nenhuma dimensão
SELECT SUM(valor) AS total FROM fato_vendas;`,
    desafios: [
      {t: "Faturamento total por região: SELECT r.nome, SUM(f.valor) AS total, ligando fato_vendas a dim_regiao e agrupando por r.nome.", teste: ({linhas, codigo}) => /group\s+by/i.test(codigo) && linhas.length === 3 && linhas.map(l => l[0] + ":" + l[1]).sort().join("|") === "Centro-Oeste:52600|Sudeste:26700|Sul:56150", win: "Cada linha do fato foi parar na região certa. O Sul lidera com 56150."},
      {t: "Faturamento total por categoria de produto, ligando o fato a dim_produto e agrupando por p.categoria.", teste: ({linhas, codigo}) => /group\s+by/i.test(codigo) && linhas.length === 2 && linhas.map(l => l[0] + ":" + l[1]).sort().join("|") === "Grãos:76300|Insumos:59150", win: "Grãos somam 76300 e Insumos 59150. Trocar a dimensão muda a pergunta, sem mexer no fato."},
      {t: "Relatório por mês: t.mes e SUM(f.valor) AS total, ligando o fato a dim_tempo, agrupando e ordenando por t.mes.", teste: ({linhas, codigo}) => /group\s+by/i.test(codigo) && linhas.map(l => l[0] + ":" + l[1]).join("|") === "1:33400|2:40100|3:61950", win: "O faturamento cresceu mês a mês, de 33400 em janeiro a 61950 em março."},
      {t: "Cruze duas dimensões: o faturamento por mês só dos produtos da categoria Insumos (junte dim_tempo e dim_produto, filtre com WHERE e agrupe por mês).", teste: ({linhas, codigo}) => /group\s+by/i.test(codigo) && /\bwhere\b/i.test(codigo) && linhas.map(l => l[0] + ":" + l[1]).join("|") === "1:15000|2:8000|3:36150", win: "Duas dimensões na mesma consulta: é para isso que o esquema estrela existe."}
    ]
  }),
  formulas: [
    {nome: "Tabela fato", expressao: "evento + medidas + chaves", significado: "Uma linha por evento (uma venda), com medidas numéricas somáveis (quantidade, valor) e chaves que apontam para as dimensões."},
    {nome: "Dimensão", expressao: "quem, o quê, quando, onde", significado: "Descreve o contexto do fato: produto, tempo, região. É por ela que se filtra e agrupa (GROUP BY)."},
    {nome: "Esquema estrela", expressao: "fato no centro, dimensões em volta", significado: "Modelo em que a tabela fato se liga diretamente a cada dimensão por chave. As consultas viram JOIN do fato com dimensões e GROUP BY."},
    {nome: "Linha contra coluna", expressao: "SUM(valor) lê só a coluna valor", significado: "No armazenamento por colunas, cada coluna fica junta no disco. Análises que usam poucas colunas de muitas linhas leem muito menos dado e comprimem melhor."},
    {nome: "ETL e ELT", expressao: "E-T-L  ou  E-L-T", significado: "ETL transforma os dados antes de carregar no warehouse; ELT carrega os dados brutos primeiro e transforma lá dentro, usando a capacidade do próprio warehouse."}
  ],
  exemplos: [
    {titulo: "Faturamento por região", enunciado: "Da tabela fato_vendas, obter o faturamento total de cada região.", passos: ["O fato tem regiao_id, mas só a dimensão dim_regiao tem o nome da região.", "Junte as duas: JOIN dim_regiao r ON r.id = f.regiao_id.", "Agrupe e some: GROUP BY r.nome com SUM(f.valor)."], resultado: "Sul 56150, Centro-Oeste 52600 e Sudeste 26700. A soma, 135450, bate com o total do fato."},
    {titulo: "Por que não rodar o relatório no banco do dia a dia", enunciado: "Todo fim de mês o financeiro roda um relatório pesado no banco onde os caixas registram vendas. O que acontece?", passos: ["O relatório lê milhões de linhas e consome CPU e disco por minutos.", "As gravações dos caixas disputam os mesmos recursos e ficam lentas, ou travam.", "Solução: copiar os dados por ETL ou ELT para um warehouse, otimizado para leitura e por colunas, e rodar o relatório lá."], resultado: "O caixa segue rápido e o relatório roda sem atrapalhar ninguém."}
  ],
  exercicios: [
    {pergunta: "Em um esquema estrela, o que fica na tabela fato e o que fica nas dimensões?", resposta: "Fato: medidas e chaves. Dimensões: descrições do contexto", explicacao: "O fato guarda os números do evento (quantidade, valor) e as chaves. Nome do produto, mês e região ficam nas dimensões, usados para filtrar e agrupar."},
    {pergunta: "Por que somar uma coluna é mais rápido em armazenamento por colunas?", resposta: "Porque lê só a coluna necessária", explicacao: "Por linhas, o banco carrega cada registro inteiro para pegar um campo. Por colunas, ele lê apenas os valores dessa coluna, que ainda comprimem bem por serem parecidos."},
    {pergunta: "Qual a diferença entre ETL e ELT?", resposta: "ETL transforma antes de carregar; ELT carrega e transforma depois, no warehouse", explicacao: "No ELT os dados brutos chegam primeiro ao warehouse e as transformações rodam lá, aproveitando o poder de processamento da plataforma."}
  ],
  erros: [
    {erro: "OLAP é só um banco OLTP maior.", correcao: "Os dois têm objetivos diferentes. OLTP otimiza muitas operações pequenas e concorrentes sobre poucas linhas; OLAP otimiza poucas consultas enormes que leem muitas linhas e poucas colunas. Por isso o modelo e o armazenamento mudam."},
    {erro: "No esquema estrela basta uma tabela só, com tudo repetido.", correcao: "Repetir nome de produto e de região em cada linha do fato incha o dado e permite versões divergentes. As dimensões guardam cada descrição uma vez, e o fato aponta para elas por chave."},
    {erro: "Esquecer o GROUP BY, ou agrupar por uma coluna que não está no SELECT.", correcao: "Toda coluna que aparece no SELECT sem função de agregação deve estar no GROUP BY. Sem o agrupamento, SUM junta tudo em uma linha só."}
  ],
  fontes: [
    {titulo: "Entenda o esquema em estrela e a importância para o Power BI", url: "https://learn.microsoft.com/pt-br/power-bi/guidance/star-schema", origem: "Microsoft Learn", idioma: "pt", nivel: "iniciante", estude: "Veja a diferença entre tabelas de fato e de dimensão e por que o modelo estrela facilita relatórios."},
    {titulo: "Processamento analítico online (OLAP)", url: "https://learn.microsoft.com/pt-br/azure/architecture/data-guide/relational-data/online-analytical-processing", origem: "Microsoft Learn (Azure Architecture Center)", idioma: "pt", nivel: "iniciante", estude: "Compare OLAP com OLTP e veja onde cada um entra na arquitetura de dados."},
    {titulo: "O que é o Fabric Data Warehouse?", url: "https://learn.microsoft.com/pt-br/fabric/data-warehouse/data-warehousing", origem: "Microsoft Learn", idioma: "pt", nivel: "intermediário", estude: "Leia o que é um warehouse no Fabric e como ele se conecta ao restante da plataforma."},
    {titulo: "ETL (extração, transformação, carregamento)", url: "https://learn.microsoft.com/pt-br/azure/architecture/data-guide/relational-data/etl", origem: "Microsoft Learn (Azure Architecture Center)", idioma: "pt", nivel: "intermediário", estude: "Entenda as etapas de ETL e a diferença para ELT."},
    {titulo: "Dimensional Modeling Techniques", url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/", origem: "Kimball Group", idioma: "en", nivel: "avançado", estude: "Consulte as técnicas clássicas de modelagem dimensional (fatos, dimensões, granularidade) quando for projetar um warehouse."}
  ]
});
(window.CTX_TEXTO = window.CTX_TEXTO || {})["olap"] = {
  agro: "Somar a produtividade de cada talhão por safra, cultura e município, ao longo de dez anos, é uma pergunta de warehouse: o fato é a colheita, as dimensões são talhão, cultura, safra e município.",
  publico: "Um painel de matrículas por escola, bairro e ano letivo roda sobre dados históricos copiados dos sistemas escolares. Assim o painel não derruba o sistema que a secretaria usa todo dia.",
  engenharia: "Leituras de milhares de sensores ao longo de meses viram um fato, com dimensões de equipamento, turno e linha. A engenharia compara desempenho sem tocar no sistema de controle.",
  dados: "É a camada que o engenheiro de dados constrói: ETL ou ELT leva os dados dos sistemas OLTP para o warehouse ou lakehouse (Databricks, Fabric), onde a modelagem em estrela alimenta os relatórios.",
  negocios: "Faturamento por região, produto e mês é o relatório clássico de gestão. Com fato e dimensões, uma nova pergunta é só um novo GROUP BY.",
  dia: "O extrato do cartão que mostra gastos por categoria e por mês é uma análise: o mesmo conjunto de transações, agrupado por dimensões diferentes."
};
