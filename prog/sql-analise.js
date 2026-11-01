/* Módulo de Programação e dados: SQL para análise. Segue o modelo de codigo.js. */
(window.MODULOS_PROG = window.MODULOS_PROG || []).push({
  id: "sql-analise",
  nome: "SQL para análise",
  gancho: "Como cruzar duas tabelas, resumir por grupo e ainda saber quem foi o pior caso de cada grupo, tudo numa consulta?",
  resumo: "JOIN junta tabelas pela chave, GROUP BY resume por grupo e HAVING filtra os grupos, subconsultas usam um resultado dentro de outro, CASE WHEN cria categorias e funções de janela (ROW_NUMBER, SUM() OVER) calculam sem apagar as linhas.",
  detalhes: "Dados reais vêm em várias tabelas ligadas por uma chave: cada atendimento guarda o id do posto, e o nome do posto mora na tabela postos. O JOIN reúne as duas lado a lado. GROUP BY agrupa linhas iguais e permite resumir cada grupo; WHERE filtra linhas antes de agrupar, HAVING filtra grupos depois de resumir. Uma subconsulta é um SELECT dentro de outro, útil para comparar cada linha com um número calculado (a média geral, por exemplo). CASE WHEN transforma números em categorias. As funções de janela olham para um conjunto de linhas relacionadas sem colapsá-las: ROW_NUMBER numera dentro de cada grupo e SUM() OVER acumula. São a ferramenta de quem faz engenharia de dados: ranking, acumulado e comparação com o grupo, em Databricks, Fabric, PostgreSQL e SQLite.",
  saudacao: "Oi! Eu sou o Chaveta. Agora são duas tabelas: postos e atendimentos. Cruze, agrupe e compare. Se o resultado parecer estranho, conte as linhas antes de confiar nele.",
  python: `import sqlite3

banco = sqlite3.connect(":memory:")
banco.execute("CREATE TABLE postos (id_posto INTEGER PRIMARY KEY, nome TEXT)")
banco.execute("CREATE TABLE atendimentos (id INTEGER PRIMARY KEY, id_posto INTEGER, tipo TEXT, espera_min INTEGER)")
banco.executemany("INSERT INTO postos VALUES (?, ?)", [(1, "Posto Centro"), (2, "Posto Vila Nova"), (3, "Posto Esperança")])
banco.executemany("INSERT INTO atendimentos VALUES (?, ?, ?, ?)", [
    (1, 1, "consulta", 27), (2, 2, "consulta", 22), (3, 1, "vacina", 18), (4, 2, "exame", 31),
    (5, 1, "exame", 40), (6, 2, "vacina", 25), (7, 1, "consulta", 24), (8, 2, "exame", 17),
])

# JOIN + GROUP BY + HAVING: média de espera por posto, só dos postos acima de 25 min
sql_grupo = """
SELECT p.nome, COUNT(*) AS atendimentos, ROUND(AVG(a.espera_min), 2) AS media
FROM atendimentos a
JOIN postos p ON p.id_posto = a.id_posto
GROUP BY p.nome
HAVING AVG(a.espera_min) > 25
"""
print(banco.execute(sql_grupo).fetchall())

# LEFT JOIN: o posto sem atendimentos aparece com zero
sql_left = "SELECT p.nome, COUNT(a.id) FROM postos p LEFT JOIN atendimentos a ON a.id_posto = p.id_posto GROUP BY p.nome ORDER BY p.nome"
print(banco.execute(sql_left).fetchall())

# Função de janela: o atendimento mais demorado de cada posto
sql_janela = """
SELECT id_posto, id, espera_min FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY id_posto ORDER BY espera_min DESC) AS pos
  FROM atendimentos
) WHERE pos = 1
"""
print(banco.execute(sql_janela).fetchall())`,
  build: LabProg.sql({
    id: "sql-analise",
    titulo: "Consulta SQL sobre postos e atendimentos",
    intro: "<p>Duas tabelas de uma rede de postos de saúde. <code>postos</code> tem o cadastro (id_posto, nome, bairro) e <code>atendimentos</code> tem uma linha por atendimento (id, id_posto, tipo, idade, espera_min, data_atend). A chave que liga as duas é <code>id_posto</code>. O Posto Esperança ainda não tem atendimentos, de propósito: compare JOIN e LEFT JOIN para ver o que acontece com ele.</p>",
    dica: "Os desafios conferem as linhas devolvidas.",
    esquema: `CREATE TABLE postos (id_posto INTEGER PRIMARY KEY, nome TEXT, bairro TEXT);
INSERT INTO postos VALUES
  (1, 'Posto Centro', 'Centro'),
  (2, 'Posto Vila Nova', 'Vila Nova'),
  (3, 'Posto Zona Rural', 'Zona Rural'),
  (4, 'Posto Jardim', 'Jardim das Flores'),
  (5, 'Posto Esperança', 'Esperança');
CREATE TABLE atendimentos (id INTEGER PRIMARY KEY, id_posto INTEGER, tipo TEXT, idade INTEGER, espera_min INTEGER, data_atend TEXT);
INSERT INTO atendimentos VALUES
  (1, 1, 'consulta', 11, 27, '2025-04-01'),
  (2, 2, 'consulta', 48, 22, '2025-04-01'),
  (3, 3, 'vacina', 6, 18, '2025-04-01'),
  (4, 4, 'consulta', 57, 13, '2025-04-02'),
  (5, 1, 'curativo', 9, 24, '2025-04-02'),
  (6, 2, 'consulta', 30, 20, '2025-04-02'),
  (7, 3, 'consulta', 75, 26, '2025-04-03'),
  (8, 4, 'curativo', 8, 14, '2025-04-03'),
  (9, 1, 'vacina', 39, 32, '2025-04-03'),
  (10, 2, 'curativo', 20, 17, '2025-04-04'),
  (11, 3, 'vacina', 15, 23, '2025-04-04'),
  (12, 4, 'vacina', 49, 19, '2025-04-04'),
  (13, 1, 'consulta', 81, 40, '2025-04-05'),
  (14, 2, 'vacina', 65, 25, '2025-04-05'),
  (15, 3, 'exame', 61, 30, '2025-04-05'),
  (16, 4, 'curativo', 48, 14, '2025-04-06'),
  (17, 1, 'vacina', 12, 25, '2025-04-06'),
  (18, 2, 'exame', 69, 31, '2025-04-06'),
  (19, 3, 'curativo', 38, 26, '2025-04-07'),
  (20, 4, 'consulta', 17, 22, '2025-04-07'),
  (21, 1, 'exame', 21, 25, '2025-04-07'),
  (22, 2, 'curativo', 55, 17, '2025-04-08'),
  (23, 3, 'exame', 45, 45, '2025-04-08'),
  (24, 4, 'exame', 78, 24, '2025-04-08'),
  (25, 1, 'consulta', 13, 15, '2025-04-09'),
  (26, 2, 'exame', 62, 18, '2025-04-09'),
  (27, 3, 'exame', 75, 33, '2025-04-09'),
  (28, 4, 'curativo', 38, 19, '2025-04-10'),
  (29, 1, 'exame', 4, 26, '2025-04-10'),
  (30, 3, 'curativo', 47, 17, '2025-04-10');`,
    tabelas: ["postos", "atendimentos"],
    inicial: `-- Escreva sua consulta e aperte Executar
SELECT p.nome, COUNT(*) AS atendimentos, AVG(a.espera_min) AS espera_media
FROM atendimentos a
JOIN postos p ON p.id_posto = a.id_posto
GROUP BY p.nome
ORDER BY espera_media DESC;`,
    desafios: [
      {t: "Mostre o nome do posto e a espera média (AVG de espera_min) apenas dos postos cuja média passa de 25 minutos.", teste: ({linhas}) => {
        const esperado = [["Posto Centro", 26.75], ["Posto Zona Rural", 27.25]];
        return linhas.length === 2 && esperado.every(([n, v]) => linhas.some(l => l.includes(n) && l.some(x => typeof x === "number" && Math.abs(x - v) < 0.06)));
      }, win: "O HAVING filtrou os grupos depois da média calculada. Um WHERE não conseguiria, porque a média ainda não existe quando ele roda."},
      {t: "Liste id e espera_min dos atendimentos cuja espera é maior que a espera média de todos os atendimentos. Use uma subconsulta.", teste: ({colunas, linhas, codigo}) => {
        let i = colunas.findIndex(c => c.toLowerCase() === "id"); if (i < 0) i = 0;
        const ids = linhas.map(l => l[i]).sort((a, b) => a - b).join(",");
        return ids === "1,5,7,9,13,14,15,17,18,19,21,23,24,27,29" && (codigo.match(/select/gi) || []).length >= 2;
      }, win: "A subconsulta calculou a média geral (23,57) uma vez, e o WHERE comparou cada atendimento com ela."},
      {t: "Devolva o atendimento mais demorado de cada posto (id_posto, id, espera_min), usando ROW_NUMBER() OVER (PARTITION BY ...).", teste: ({colunas, linhas, codigo}) => {
        let i = colunas.findIndex(c => c.toLowerCase() === "id"); if (i < 0) i = 0;
        const ids = linhas.map(l => l[i]).sort((a, b) => a - b).join(",");
        return ids === "13,18,23,24" && /row_number\s*\(/i.test(codigo) && /over/i.test(codigo);
      }, win: "ROW_NUMBER numerou os atendimentos dentro de cada posto, do mais demorado ao menos. Filtrar numeração 1 deixa o campeão de cada grupo."}
    ]
  }),
  formulas: [
    {nome: "JOIN", expressao: "FROM a JOIN b ON a.chave = b.chave", significado: "Une as linhas de duas tabelas quando a condição do ON é verdadeira. JOIN (INNER) mantém só os pares que casam, LEFT JOIN mantém todas as linhas da tabela da esquerda, com NULL onde não houver par."},
    {nome: "GROUP BY e HAVING", expressao: "GROUP BY grupo HAVING AVG(x) > 25", significado: "GROUP BY forma um grupo por valor e cada função de agregação resume um grupo. WHERE filtra linhas antes de agrupar, HAVING filtra os grupos depois."},
    {nome: "Subconsulta", expressao: "WHERE x > (SELECT AVG(x) FROM tabela)", significado: "Um SELECT entre parênteses usado como valor (uma célula) ou como lista dentro de outro SELECT. É calculada primeiro."},
    {nome: "CASE WHEN", expressao: "CASE WHEN x < 20 THEN 'rápido' ELSE 'demorado' END", significado: "Cria uma coluna por regra: a primeira condição verdadeira decide o valor. Sem ELSE, o que sobra vira NULL."},
    {nome: "Função de janela", expressao: "ROW_NUMBER() OVER (PARTITION BY g ORDER BY x DESC)", significado: "Calcula olhando um conjunto de linhas relacionadas sem colapsá-las. PARTITION BY divide em grupos, ORDER BY ordena dentro deles. SUM(x) OVER (ORDER BY d) dá o acumulado."}
  ],
  exemplos: [
    {titulo: "Faixas de espera com CASE WHEN", enunciado: "Classifique cada atendimento como rápido (menos de 20 min), normal (20 a 30) ou demorado (mais de 30) e conte quantos há em cada faixa.", passos: ["Crie a faixa: CASE WHEN espera_min < 20 THEN 'rápido' WHEN espera_min <= 30 THEN 'normal' ELSE 'demorado' END AS faixa.", "Agrupe por faixa: GROUP BY faixa (SQLite e PostgreSQL aceitam o apelido; no SQL Server repita o CASE).", "Conte com COUNT(*) em cada grupo."], resultado: "Normal: 14, rápido: 11, demorado: 5. Soma 30, o total de atendimentos."},
    {titulo: "Espera acumulada de um posto", enunciado: "No Posto Centro (id_posto = 1), mostre cada atendimento em ordem e a soma acumulada das esperas.", passos: ["Filtre: WHERE id_posto = 1.", "Use SUM(espera_min) OVER (ORDER BY id) AS acumulado.", "Cada linha continua aparecendo, e a coluna nova soma da primeira linha até a atual."], resultado: "Os 8 atendimentos acumulam 27, 51, 83, 123, 148, 173, 188 e 214 minutos. O último valor é a soma total do posto."}
  ],
  exercicios: [
    {pergunta: "Quais tipos de atendimento aparecem pelo menos 8 vezes? Qual cláusula filtra isso?", resposta: "consulta, curativo e exame (8 cada). HAVING COUNT(*) >= 8", explicacao: "A contagem só existe depois do GROUP BY, então o filtro é HAVING. Vacina aparece 6 vezes e fica de fora."},
    {pergunta: "Se você contar atendimentos por posto com LEFT JOIN a partir de postos, qual posto aparece com zero?", resposta: "Posto Esperança", explicacao: "Ele existe em postos mas não tem linhas em atendimentos. Com LEFT JOIN e COUNT(a.id), ele aparece com 0. Com JOIN comum, some do resultado."},
    {pergunta: "Qual é a espera média geral e quantos atendimentos ficam acima dela?", resposta: "Cerca de 23,57 minutos; 15 atendimentos", explicacao: "AVG(espera_min) dá 23,57 sobre as 30 linhas. A subconsulta WHERE espera_min > (SELECT AVG(espera_min) FROM atendimentos) devolve 15 linhas."}
  ],
  erros: [
    {erro: "Para filtrar postos com média de espera acima de 25, escrevo WHERE AVG(espera_min) > 25.", correcao: "WHERE roda antes do agrupamento, quando a média ainda não existe, e o banco recusa a consulta. Use HAVING AVG(espera_min) > 25 depois do GROUP BY. WHERE filtra linhas, HAVING filtra grupos."},
    {erro: "Se esqueço o ON do JOIN, a consulta só junta as tabelas do jeito certo.", correcao: "Sem condição, cada linha de uma tabela casa com todas da outra: 30 atendimentos x 5 postos = 150 linhas. Resultado inflado, somas erradas, sem aviso. Depois de um JOIN, confira se a contagem de linhas faz sentido."},
    {erro: "JOIN comum mantém todos os postos, mesmo os sem atendimento.", correcao: "O JOIN comum (INNER) só devolve pares que casam, então o Posto Esperança desaparece. Para manter todos os postos use LEFT JOIN a partir de postos, e conte com COUNT(a.id), não COUNT(*), que contaria 1 para a linha sem par."}
  ],
  fontes: [
    {titulo: "PostgreSQL: junções entre tabelas", url: "https://www.postgresql.org/docs/current/tutorial-join.html", origem: "PostgreSQL Global Development Group", idioma: "en", nivel: "iniciante", estude: "Leia a diferença entre INNER JOIN e LEFT OUTER JOIN com o exemplo de clima e cidades."},
    {titulo: "PostgreSQL: funções de janela", url: "https://www.postgresql.org/docs/current/tutorial-window.html", origem: "PostgreSQL Global Development Group", idioma: "en", nivel: "intermediário", estude: "Veja OVER, PARTITION BY e ORDER BY em exemplos curtos antes de ler a referência completa."},
    {titulo: "SQLite: funções de janela", url: "https://www.sqlite.org/windowfunctions.html", origem: "SQLite.org", idioma: "en", nivel: "intermediário", estude: "Consulte a lista de ROW_NUMBER, RANK e das agregações usadas como janela, que é a mesma do laboratório."},
    {titulo: "GROUP BY (Transact-SQL)", url: "https://learn.microsoft.com/pt-br/sql/t-sql/queries/select-group-by-transact-sql", origem: "Microsoft Learn", idioma: "pt", nivel: "intermediário", estude: "Leia o que pode ir no SELECT junto de GROUP BY e como o HAVING se encaixa, vale para o Fabric."},
    {titulo: "JOIN no Databricks SQL", url: "https://docs.databricks.com/aws/en/sql/language-manual/sql-ref-syntax-qry-select-join", origem: "Databricks", idioma: "en", nivel: "intermediário", estude: "Veja os tipos de JOIN disponíveis no Databricks, incluindo LEFT SEMI e ANTI, úteis em engenharia de dados."}
  ]
});
(window.CTX_TEXTO = window.CTX_TEXTO || {})["sql-analise"] = {
  agro: "Safras num banco: um JOIN liga cada talhão à sua cultura, GROUP BY dá a produtividade média por cultura e ROW_NUMBER aponta o talhão mais produtivo de cada fazenda.",
  publico: "Atendimentos de vários postos cruzados com o cadastro: HAVING mostra os postos com espera média alta e LEFT JOIN revela os que não registraram nada no período.",
  engenharia: "Leituras de sensores por equipamento: GROUP BY resume por máquina, SUM() OVER acumula o consumo ao longo do dia e uma subconsulta marca leituras acima da média.",
  dados: "JOIN, GROUP BY e funções de janela são o dia a dia na camada prata e ouro do Databricks e do Fabric. Para IA, é com elas que se monta a tabela de variáveis de um modelo.",
  negocios: "Pedidos ligados a clientes: faturamento por cliente com HAVING, ranking com ROW_NUMBER (o maior pedido de cada cliente) e CASE WHEN para separar faixas de valor.",
  dia: "Seu extrato do cartão agrupado por categoria, o gasto acumulado do mês e o maior gasto de cada semana são as mesmas perguntas, só que em SQL."
};
