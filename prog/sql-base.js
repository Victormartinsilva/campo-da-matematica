/* Módulo de Programação e dados: SQL do zero. Segue o modelo de codigo.js. */
(window.MODULOS_PROG = window.MODULOS_PROG || []).push({
  id: "sql-base",
  nome: "SQL do zero",
  gancho: "Como perguntar a uma tabela com 24 linhas, ou com 24 milhões, usando as mesmas poucas palavras?",
  resumo: "Uma tabela guarda dados em linhas e colunas. SELECT escolhe colunas, WHERE filtra linhas, ORDER BY ordena, LIMIT corta, e COUNT, SUM, AVG, MIN e MAX resumem tudo em um número.",
  detalhes: "SQL é uma linguagem de perguntas sobre tabelas. Uma tabela tem colunas (cada uma com nome e tipo) e linhas (cada uma é um registro). Você descreve o que quer e o banco decide como buscar. A ordem de escrita é SELECT, FROM, WHERE, ORDER BY, LIMIT, mas o banco primeiro acha a tabela (FROM), depois filtra (WHERE), calcula o que for pedido e só no fim ordena e corta. As funções de agregação (COUNT, SUM, AVG, MIN, MAX) comprimem várias linhas em uma. Um valor ausente é NULL, que não é zero nem texto vazio: ele não é igual a nada, nem a outro NULL. O mesmo SQL que você escreve aqui serve, com pequenas variações, em Databricks, Fabric, PostgreSQL e SQL Server.",
  saudacao: "Oi! Eu sou o Chaveta. A tabela pedidos já está carregada. Escreva uma consulta, aperte Executar e veja as linhas que voltam.",
  python: `import sqlite3

banco = sqlite3.connect(":memory:")          # banco temporário, só na memória
banco.execute("CREATE TABLE pedidos (id INTEGER, produto TEXT, categoria TEXT, quantidade INTEGER, valor_unit REAL, status TEXT, cupom TEXT)")
banco.executemany("INSERT INTO pedidos VALUES (?, ?, ?, ?, ?, ?, ?)", [
    (1, "Café 500g", "Mercearia", 2, 18.90, "entregue", None),
    (2, "Fone Bluetooth", "Eletronicos", 1, 129.90, "entregue", "PROMO10"),
    (3, "Arroz 5kg", "Mercearia", 3, 27.50, "entregue", None),
    (4, "Teclado USB", "Eletronicos", 1, 89.00, "cancelado", None),
    (5, "Suco de uva", "Bebidas", 6, 8.40, "entregue", None),
    (6, "Webcam HD", "Eletronicos", 1, 199.00, "pendente", None),
])

# WHERE filtra, ORDER BY ordena, LIMIT corta
consulta = "SELECT produto, valor_unit FROM pedidos WHERE status = 'entregue' ORDER BY valor_unit DESC LIMIT 2"
for linha in banco.execute(consulta):
    print(linha)

# agregações resumem várias linhas em uma
total, soma = banco.execute("SELECT COUNT(*), SUM(quantidade * valor_unit) FROM pedidos WHERE status = 'entregue'").fetchone()
print("entregues:", total, "faturado:", round(soma, 2))

# NULL só se testa com IS NULL
print("sem cupom:", banco.execute("SELECT COUNT(*) FROM pedidos WHERE cupom IS NULL").fetchone()[0])`,
  build: LabProg.sql({
    id: "sql-base",
    titulo: "Consulta SQL sobre a tabela pedidos",
    intro: "<p>A tabela <code>pedidos</code> é de uma loja virtual: cada linha é um pedido, com cliente, produto, categoria, quantidade, valor unitário, status e cupom (vazio quando o cliente não usou cupom). O SQL roda de verdade no seu navegador, num banco SQLite que nasce de novo toda vez que você restaura. Troque o filtro, o número do LIMIT, a coluna da ordenação e veja o resultado mudar.</p>",
    dica: "Os desafios conferem as linhas devolvidas, não o jeito de escrever.",
    esquema: `CREATE TABLE pedidos (id INTEGER PRIMARY KEY, cliente TEXT, produto TEXT, categoria TEXT, quantidade INTEGER, valor_unit REAL, status TEXT, cupom TEXT);
INSERT INTO pedidos VALUES
  (1, 'Ana Souza', 'Café 500g', 'Mercearia', 2, 18.90, 'entregue', NULL),
  (2, 'Bruno Lima', 'Fone Bluetooth', 'Eletronicos', 1, 129.90, 'entregue', 'PROMO10'),
  (3, 'Carla Dias', 'Arroz 5kg', 'Mercearia', 3, 27.50, 'entregue', NULL),
  (4, 'Diego Rocha', 'Teclado USB', 'Eletronicos', 1, 89.00, 'cancelado', NULL),
  (5, 'Elisa Pinto', 'Suco de uva', 'Bebidas', 6, 8.40, 'entregue', NULL),
  (6, 'Fábio Neves', 'Mouse sem fio', 'Eletronicos', 2, 45.50, 'entregue', 'PROMO10'),
  (7, 'Gabi Alves', 'Feijão 1kg', 'Mercearia', 4, 9.80, 'entregue', NULL),
  (8, 'Hugo Costa', 'Água 1,5L', 'Bebidas', 12, 2.90, 'pendente', NULL),
  (9, 'Inês Melo', 'Detergente', 'Limpeza', 5, 2.45, 'entregue', NULL),
  (10, 'Jorge Maia', 'Carregador', 'Eletronicos', 1, 59.90, 'entregue', NULL),
  (11, 'Karen Luz', 'Cerveja lata', 'Bebidas', 24, 3.75, 'entregue', 'PROMO10'),
  (12, 'Lucas Prado', 'Sabão em pó', 'Limpeza', 2, 16.20, 'cancelado', NULL),
  (13, 'Marta Reis', 'Café 500g', 'Mercearia', 1, 18.90, 'entregue', NULL),
  (14, 'Nuno Vaz', 'Webcam HD', 'Eletronicos', 1, 199.00, 'pendente', NULL),
  (15, 'Olga Teles', 'Refrigerante 2L', 'Bebidas', 8, 7.60, 'entregue', NULL),
  (16, 'Paulo Sá', 'Desinfetante', 'Limpeza', 3, 6.30, 'entregue', NULL),
  (17, 'Rita Cunha', 'Macarrão', 'Mercearia', 10, 4.20, 'entregue', NULL),
  (18, 'Sérgio Lins', 'Headset', 'Eletronicos', 2, 149.90, 'entregue', NULL),
  (19, 'Tânia Borges', 'Esponja', 'Limpeza', 10, 1.80, 'pendente', NULL),
  (20, 'Ulisses Paz', 'Suco de uva', 'Bebidas', 3, 8.40, 'entregue', NULL),
  (21, 'Vera Lopes', 'Óleo de soja', 'Mercearia', 6, 7.35, 'entregue', NULL),
  (22, 'Wilson Faria', 'Teclado USB', 'Eletronicos', 1, 89.00, 'entregue', NULL),
  (23, 'Yara Moura', 'Água 1,5L', 'Bebidas', 12, 2.90, 'entregue', NULL),
  (24, 'Zeca Brito', 'Desinfetante', 'Limpeza', 2, 6.30, 'cancelado', NULL);`,
    tabelas: ["pedidos"],
    inicial: `-- Escreva sua consulta e aperte Executar
SELECT cliente, produto, quantidade
FROM pedidos
WHERE status = 'entregue'
ORDER BY quantidade DESC
LIMIT 5;`,
    desafios: [
      {t: "Liste os pedidos de status 'entregue' da categoria 'Eletronicos'. Devolva as colunas cliente e produto.", teste: ({linhas}) => {
        const esperado = ["Fone Bluetooth", "Mouse sem fio", "Carregador", "Headset", "Teclado USB"];
        return linhas.length === 5 && esperado.every(p => linhas.some(l => l.includes(p))) && linhas.some(l => l.includes("Bruno Lima"));
      }, win: "O WHERE juntou duas condições com AND: só passa a linha que cumpre as duas."},
      {t: "Mostre os 3 produtos de maior valor_unit, do mais caro ao mais barato, com as colunas produto e valor_unit.", teste: ({linhas}) => {
        const esperado = [["Webcam HD", 199], ["Headset", 149.9], ["Fone Bluetooth", 129.9]];
        return linhas.length === 3 && esperado.every(([p, v], i) => linhas[i].includes(p) && linhas[i].some(x => typeof x === "number" && Math.abs(x - v) < 0.005));
      }, win: "ORDER BY ... DESC ordena do maior para o menor, e LIMIT 3 guarda só as três primeiras linhas."},
      {t: "Em uma única linha, calcule quantos pedidos foram entregues e quanto eles faturaram (soma de quantidade * valor_unit).", teste: ({linhas}) => linhas.length === 1 && linhas[0].some(x => x === 18) && linhas[0].some(x => typeof x === "number" && Math.abs(x - 1226.45) < 0.01),
        win: "COUNT contou as linhas filtradas e SUM somou a conta feita linha a linha. Agregações rodam depois do WHERE."}
    ]
  }),
  formulas: [
    {nome: "Escolher colunas", expressao: "SELECT coluna1, coluna2 FROM tabela", significado: "SELECT diz quais colunas voltam e FROM diz de que tabela. SELECT * traz todas as colunas, útil para espiar, ruim para produção."},
    {nome: "Filtrar linhas", expressao: "WHERE status = 'entregue' AND valor_unit > 50", significado: "Mantém só as linhas em que a condição é verdadeira. Texto vai entre aspas simples. Combine condições com AND, OR e NOT."},
    {nome: "Ordenar e cortar", expressao: "ORDER BY valor_unit DESC LIMIT 3", significado: "ORDER BY ordena (ASC é do menor ao maior, DESC é o contrário) e LIMIT guarda só as primeiras linhas. Sem ORDER BY, a ordem das linhas não é garantida."},
    {nome: "Agregações", expressao: "COUNT(*), SUM(x), AVG(x), MIN(x), MAX(x)", significado: "Resumem várias linhas em um valor. COUNT(*) conta linhas, COUNT(coluna) conta só as não nulas, e SUM, AVG, MIN e MAX ignoram NULL."},
    {nome: "Valor ausente", expressao: "coluna IS NULL / coluna IS NOT NULL", significado: "NULL significa desconhecido. Comparar com = NULL nunca devolve linha alguma: use IS NULL."}
  ],
  exemplos: [
    {titulo: "Os maiores pedidos entregues", enunciado: "Na tabela pedidos, mostre os 3 pedidos entregues de maior valor total (quantidade * valor_unit), com cliente e total.", passos: ["Filtre: WHERE status = 'entregue'.", "Calcule o total na própria consulta: quantidade * valor_unit AS total.", "Ordene por total DESC e guarde só 3 linhas com LIMIT 3."], resultado: "Sérgio Lins (299,80), Bruno Lima (129,90) e Fábio Neves (91,00). Consulta: SELECT cliente, quantidade * valor_unit AS total FROM pedidos WHERE status = 'entregue' ORDER BY total DESC LIMIT 3."},
    {titulo: "Resumo de uma categoria", enunciado: "Qual é o menor, o maior e o preço médio unitário da categoria Bebidas, e quantas unidades foram pedidas?", passos: ["Filtre a categoria: WHERE categoria = 'Bebidas'.", "Peça as quatro agregações juntas: MIN(valor_unit), MAX(valor_unit), AVG(valor_unit), SUM(quantidade).", "Como só há agregações, o resultado é uma única linha."], resultado: "Menor R$ 2,90, maior R$ 8,40, média R$ 5,66 (média simples dos 6 pedidos) e 65 unidades pedidas."}
  ],
  exercicios: [
    {pergunta: "Quantos pedidos a tabela tem ao todo? Escreva a consulta.", resposta: "SELECT COUNT(*) FROM pedidos; devolve 24", explicacao: "COUNT(*) conta todas as linhas, sem olhar o conteúdo das colunas."},
    {pergunta: "Quantos pedidos usaram cupom? Dica: COUNT(cupom) e COUNT(*) dão resultados diferentes.", resposta: "3 (SELECT COUNT(cupom) FROM pedidos)", explicacao: "COUNT(coluna) ignora os NULL. Das 24 linhas, só 3 têm cupom preenchido, então COUNT(cupom) vale 3 e COUNT(*) vale 24."},
    {pergunta: "Qual consulta devolve os nomes dos produtos com valor_unit acima de 100, do mais caro ao mais barato?", resposta: "SELECT produto FROM pedidos WHERE valor_unit > 100 ORDER BY valor_unit DESC;", explicacao: "O filtro vem antes da ordenação na escrita. Devolve Webcam HD, Headset e Fone Bluetooth (3 linhas)."}
  ],
  erros: [
    {erro: "WHERE cupom = NULL acha os pedidos sem cupom.", correcao: "NULL não é igual a nada, nem a ele mesmo, então essa condição nunca é verdadeira e devolve zero linhas. Use WHERE cupom IS NULL (ou IS NOT NULL)."},
    {erro: "LIMIT 3 devolve os 3 maiores valores.", correcao: "LIMIT só corta as primeiras linhas do resultado. Sem ORDER BY valor_unit DESC, essas três são quaisquer. Primeiro ordene, depois corte."},
    {erro: "Aspas duplas e simples são a mesma coisa para texto.", correcao: "Em SQL padrão, texto vai entre aspas simples: status = 'entregue'. Aspas duplas servem para nomes de colunas e tabelas, e alguns bancos aceitam como texto por engano, o que esconde erros."}
  ],
  fontes: [
    {titulo: "SQLite: instrução SELECT", url: "https://www.sqlite.org/lang_select.html", origem: "SQLite.org", idioma: "en", nivel: "iniciante", estude: "Leia as cláusulas na ordem em que o banco as processa: FROM, WHERE, GROUP BY, ORDER BY e LIMIT."},
    {titulo: "SQLite: funções de agregação", url: "https://www.sqlite.org/lang_aggfunc.html", origem: "SQLite.org", idioma: "en", nivel: "iniciante", estude: "Veja como count, sum, avg, min e max tratam valores NULL."},
    {titulo: "PostgreSQL: criando uma tabela", url: "https://www.postgresql.org/docs/current/tutorial-table.html", origem: "PostgreSQL Global Development Group", idioma: "en", nivel: "iniciante", estude: "Entenda como colunas e tipos definem uma tabela com CREATE TABLE."},
    {titulo: "SELECT (Transact-SQL)", url: "https://learn.microsoft.com/pt-br/sql/t-sql/queries/select-transact-sql", origem: "Microsoft Learn", idioma: "pt", nivel: "intermediário", estude: "Compare com a versão do SQL Server, usada no Fabric: TOP no lugar de LIMIT, por exemplo."},
    {titulo: "Python: módulo sqlite3", url: "https://docs.python.org/pt-br/3/library/sqlite3.html", origem: "Python Software Foundation", idioma: "pt", nivel: "iniciante", estude: "Veja connect, execute e executemany, usados no bloco Python deste módulo."}
  ]
});
(window.CTX_TEXTO = window.CTX_TEXTO || {})["sql-base"] = {
  agro: "Uma tabela de safras com talhão, cultura, área e produtividade responde, com WHERE e AVG, qual cultura rendeu mais por hectare e quais talhões ficaram abaixo da média, sem abrir planilha.",
  publico: "Num cadastro de atendimentos de postos de saúde, COUNT e WHERE dizem quantas pessoas foram atendidas por mês e quantas ainda esperam, e IS NULL acha os registros incompletos.",
  engenharia: "Leituras de sensores guardadas numa tabela viram perguntas simples: MAX(temperatura) por dia, ORDER BY horário DESC LIMIT 10 para ver as últimas medições.",
  dados: "SELECT, WHERE e agregações são a base de qualquer consulta em Databricks SQL, Fabric ou PostgreSQL. Antes de um modelo de IA, alguém escreveu um SQL assim para montar a tabela de treino.",
  negocios: "Faturamento, ticket médio e pedidos cancelados saem de SUM, AVG e COUNT com um WHERE no status. É o relatório de vendas da semana, em três linhas.",
  dia: "O filtro de uma planilha, a busca num aplicativo de compras com preço máximo e ordem por menor preço fazem o mesmo que WHERE e ORDER BY."
};
