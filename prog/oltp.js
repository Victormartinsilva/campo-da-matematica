/* Módulo de Programação e dados: Bancos transacionais (OLTP). Laboratório de SQL real (SQLite no navegador) com contas e movimentações. */
(window.MODULOS_PROG = window.MODULOS_PROG || []).push({
  id: "oltp",
  nome: "Bancos transacionais (OLTP)",
  gancho: "Quando você transfere dinheiro, o saldo de um lado cai e o do outro sobe. E se o sistema travar bem no meio?",
  resumo: "Um banco transacional guarda o dia a dia de um sistema em tabelas ligadas por chaves, e agrupa mudanças em transações que valem por inteiro ou não valem de jeito nenhum (ACID).",
  detalhes: "OLTP (processamento transacional online) é o banco que sustenta aplicativos: cadastros, pedidos, saldos. Os dados ficam em tabelas, cada linha identificada por uma chave primária (PRIMARY KEY). Uma chave estrangeira (FOREIGN KEY) liga uma tabela a outra e impede, por exemplo, uma movimentação de uma conta que não existe. A normalização guarda cada fato em um só lugar (o nome do titular fica na tabela de contas, sem se repetir em cada movimentação), o que evita contradições. Um índice é um atalho de busca: acelera a leitura de poucas linhas, mas custa espaço e deixa a escrita um pouco mais lenta. A peça central é a transação: um bloco BEGIN ... COMMIT em que todas as mudanças são aplicadas juntas, ou ROLLBACK desfaz tudo. As propriedades ACID (atomicidade, consistência, isolamento, durabilidade) garantem que o dinheiro de uma transferência não some no meio do caminho, mesmo com erro, queda de energia ou dois usuários mexendo ao mesmo tempo.",
  saudacao: "Oi! Eu sou o Chaveta. Aqui o banco é de verdade, rodando no seu navegador. Faça uma transferência, desfaça outra e confira se o dinheiro bate.",
  python: `import sqlite3

con = sqlite3.connect(":memory:")
con.executescript("""
CREATE TABLE contas (
  id INTEGER PRIMARY KEY,
  titular TEXT NOT NULL,
  saldo REAL NOT NULL CHECK (saldo >= 0)
);
INSERT INTO contas VALUES (1, 'Ana', 1000), (2, 'Bruno', 500);
""")

def transferir(origem, destino, valor):
    try:
        with con:  # abre a transação: COMMIT se tudo der certo, ROLLBACK se der erro
            con.execute("UPDATE contas SET saldo = saldo - ? WHERE id = ?", (valor, origem))
            cur = con.execute("UPDATE contas SET saldo = saldo + ? WHERE id = ?", (valor, destino))
            if cur.rowcount == 0:
                raise ValueError("conta de destino não existe")
        print("transferência concluída")
    except (ValueError, sqlite3.IntegrityError) as erro:
        print("transferência desfeita:", erro)

transferir(1, 2, 200)      # tudo certo
transferir(1, 99, 300)     # o débito acontece, o crédito falha: o ROLLBACK devolve os 300
print(con.execute("SELECT id, titular, saldo FROM contas").fetchall())`,
  build: LabProg.sql({
    id: "oltp",
    titulo: "Consulta SQL (banco bancário)",
    intro: "<p>O banco abaixo tem <b>contas</b> (saldo atual de cada titular) e <b>movimentacoes</b> (o histórico, ligado às contas por uma chave estrangeira). Uma transação começa com <code>BEGIN;</code> e termina com <code>COMMIT;</code> (confirma tudo) ou <code>ROLLBACK;</code> (desfaz tudo). Termine sempre com um <code>SELECT</code> para ver o estado final.</p><p>O banco guarda o que você fez entre uma execução e outra. Se uma execução parar em erro no meio de uma transação, rode <code>ROLLBACK;</code> ou use Restaurar banco e consulta.</p>",
    dica: "Os desafios conferem a tabela devolvida pelo último SELECT.",
    esquema: `PRAGMA foreign_keys = ON;
CREATE TABLE contas (id INTEGER PRIMARY KEY, titular TEXT NOT NULL, saldo REAL NOT NULL CHECK (saldo >= 0));
CREATE TABLE movimentacoes (id INTEGER PRIMARY KEY AUTOINCREMENT, conta_id INTEGER NOT NULL REFERENCES contas(id), valor REAL NOT NULL, tipo TEXT NOT NULL, data TEXT NOT NULL);
INSERT INTO contas VALUES (1,'Ana',1000),(2,'Bruno',500),(3,'Carla',250);
INSERT INTO movimentacoes (conta_id, valor, tipo, data) VALUES (1,1000,'deposito','2025-01-02'),(2,500,'deposito','2025-01-02'),(3,250,'deposito','2025-01-03');`,
    tabelas: ["contas", "movimentacoes"],
    inicial: `-- Veja as contas. Depois escreva sua transação.
SELECT id, titular, saldo FROM contas;`,
    desafios: [
      {t: "Transfira 200 da conta 1 para a conta 2 dentro de uma transação (BEGIN, dois UPDATE, COMMIT) e termine com SELECT id, saldo FROM contas ORDER BY id. Se já repetiu a transferência, use Restaurar banco antes, porque o banco guarda o estado.", teste: ({colunas, linhas, codigo}) => /\bbegin\b/i.test(codigo) && /\bcommit\b/i.test(codigo) && linhas.length === 3 && linhas.map(l => l[colunas.indexOf("saldo")]).join(",") === "800,700,250", win: "As duas mudanças valeram juntas: Ana ficou com 800 e Bruno com 700. A soma continua 1750."},
      {t: "Inicie uma transação, debite 300 da conta 2 e desfaça com ROLLBACK. Termine com SELECT SUM(saldo) AS total FROM contas e confirme que o total continua 1750.", teste: ({colunas, linhas, codigo}) => /\bbegin\b/i.test(codigo) && /\bupdate\b/i.test(codigo) && /\brollback\b/i.test(codigo) && colunas[0] === "total" && linhas.length === 1 && linhas[0][0] === 1750, win: "O ROLLBACK devolveu os 300 como se o débito nunca tivesse existido. É a atomicidade em ação."},
      {t: "Registre as duas pernas da transferência de 200 (conta 1 para conta 2) em movimentacoes: um INSERT de -200 na conta 1 e outro de +200 na conta 2, dentro de BEGIN ... COMMIT. Depois mostre SELECT c.id, c.saldo, SUM(m.valor) AS soma, COUNT(m.id) AS n FROM contas c JOIN movimentacoes m ON m.conta_id = c.id GROUP BY c.id e confira que saldo e soma são iguais.", teste: ({colunas, linhas, codigo}) => { const i = n => colunas.indexOf(n); return /\binsert\b/i.test(codigo) && linhas.length === 3 && i("saldo") >= 0 && i("soma") >= 0 && i("n") >= 0 && linhas.every(l => l[i("saldo")] === l[i("soma")]) && linhas.reduce((a, l) => a + l[i("n")], 0) >= 5; }, win: "Saldo e histórico concordam em todas as contas. Esse é o tipo de regra que o banco ajuda a manter verdadeira."},
      {t: "Crie um índice chamado idx_mov_conta em movimentacoes(conta_id) e liste com SELECT name FROM sqlite_master WHERE type = 'index' AND name LIKE 'idx_%'.", teste: ({linhas, codigo}) => /create\s+index/i.test(codigo) && linhas.some(l => l[0] === "idx_mov_conta"), win: "O índice existe. Agora buscar as movimentações de uma conta não precisa ler a tabela inteira."}
    ]
  }),
  formulas: [
    {nome: "Transação", expressao: "BEGIN; ... COMMIT;  ou  ROLLBACK;", significado: "Agrupa várias mudanças em uma unidade. COMMIT confirma todas; ROLLBACK desfaz todas."},
    {nome: "Atomicidade (A)", expressao: "tudo ou nada", significado: "Ou todas as mudanças da transação acontecem, ou nenhuma. Não existe meio-termo, como debitar sem creditar."},
    {nome: "Consistência (C)", expressao: "regras sempre verdadeiras", significado: "Depois de cada transação, as regras do banco continuam valendo: chaves, CHECK (saldo >= 0), tipos. Uma mudança que quebra uma regra é recusada."},
    {nome: "Isolamento (I)", expressao: "transações simultâneas sem se atropelar", significado: "Cada transação se comporta como se estivesse sozinha, sem ver o estado pela metade de outra. O nível de isolamento define o quanto."},
    {nome: "Durabilidade (D)", expressao: "COMMIT = gravado", significado: "Depois do COMMIT, o resultado sobrevive a queda de energia ou travamento, porque foi registrado em armazenamento permanente."}
  ],
  exemplos: [
    {titulo: "Transferência sem perder dinheiro", enunciado: "Ana (conta 1, saldo 1000) transfere 200 para Bruno (conta 2, saldo 500). O sistema cai logo depois do débito. Como o banco evita o desastre?", passos: ["BEGIN: abre a transação.", "UPDATE contas SET saldo = saldo - 200 WHERE id = 1: Ana passa a ter 800 dentro da transação.", "Antes do crédito, o sistema cai. O COMMIT nunca aconteceu.", "Ao reiniciar, o banco desfaz o que não foi confirmado: Ana volta a 1000 e Bruno segue com 500."], resultado: "A soma continua 1500. Sem transação, Ana teria perdido 200 e Bruno não teria recebido nada."},
    {titulo: "Por que normalizar", enunciado: "Uma tabela de movimentações repete o nome do titular em cada linha. Ana muda de nome. O que acontece?", passos: ["Com o nome repetido, é preciso corrigir cada linha, e esquecer uma deixa dois nomes para a mesma pessoa.", "Normalizando, o nome fica só na tabela contas e movimentacoes guarda apenas conta_id (chave estrangeira).", "Corrigir o nome é um único UPDATE em uma linha."], resultado: "Cada fato mora em um só lugar, então o banco não se contradiz."}
  ],
  exercicios: [
    {pergunta: "Qual propriedade ACID garante que, se o crédito falhar, o débito também seja desfeito?", resposta: "Atomicidade", explicacao: "A transação é indivisível: todas as mudanças valem ou nenhuma vale. Por isso o débito sem o crédito nunca fica gravado."},
    {pergunta: "Para que serve uma chave estrangeira em movimentacoes.conta_id?", resposta: "Garantir que toda movimentação aponte para uma conta que existe", explicacao: "A chave estrangeira liga a movimentação à tabela contas e recusa linhas órfãs, como uma movimentação da conta 99 quando ela não existe."},
    {pergunta: "Um índice acelera a leitura. Qual é o custo dele?", resposta: "Espaço em disco e escrita um pouco mais lenta", explicacao: "O banco mantém o índice atualizado a cada INSERT, UPDATE e DELETE. Por isso se indexam as colunas muito consultadas, e só elas."}
  ],
  erros: [
    {erro: "Basta fazer os dois UPDATE seguidos que o dinheiro não some.", correcao: "Sem BEGIN e COMMIT, cada UPDATE vale sozinho. Se algo falhar entre os dois, o primeiro já está gravado. A transação é o que junta os dois em um bloco só."},
    {erro: "Índice em todas as colunas deixa o banco sempre mais rápido.", correcao: "Cada índice ocupa espaço e precisa ser atualizado a cada escrita. Em um banco transacional, com muitas gravações, indexe o que é muito buscado, como chaves e colunas de filtro."},
    {erro: "Chave estrangeira é só uma anotação, o banco não confere nada.", correcao: "Ela é uma regra que o banco aplica ao inserir e apagar linhas. Atenção: no SQLite essa conferência precisa ser ligada com PRAGMA foreign_keys = ON; em outros bancos ela já vem ativa."}
  ],
  fontes: [
    {titulo: "SQLite: BEGIN, COMMIT e ROLLBACK (transações)", url: "https://www.sqlite.org/lang_transaction.html", origem: "SQLite.org", idioma: "en", nivel: "iniciante", estude: "Leia como BEGIN, COMMIT e ROLLBACK delimitam uma transação e o que acontece quando ela fica aberta."},
    {titulo: "PostgreSQL: Transações (tutorial)", url: "https://www.postgresql.org/docs/current/tutorial-transactions.html", origem: "PostgreSQL Global Development Group", idioma: "en", nivel: "iniciante", estude: "O exemplo de transferência entre contas bancárias mostra exatamente por que as mudanças precisam valer juntas."},
    {titulo: "PostgreSQL: Chaves estrangeiras (tutorial)", url: "https://www.postgresql.org/docs/current/tutorial-fk.html", origem: "PostgreSQL Global Development Group", idioma: "en", nivel: "iniciante", estude: "Veja como uma chave estrangeira mantém duas tabelas coerentes."},
    {titulo: "PostgreSQL: Introdução aos índices", url: "https://www.postgresql.org/docs/current/indexes-intro.html", origem: "PostgreSQL Global Development Group", idioma: "en", nivel: "iniciante", estude: "Entenda por que um índice acelera a busca e por que ele tem custo."},
    {titulo: "SQLite: Atomic Commit", url: "https://www.sqlite.org/atomiccommit.html", origem: "SQLite.org", idioma: "en", nivel: "avançado", estude: "Leia, sem pressa, como um banco consegue gravar tudo ou nada mesmo se faltar energia no meio."}
  ]
});
(window.CTX_TEXTO = window.CTX_TEXTO || {})["oltp"] = {
  agro: "O registro de cada entrega de grãos na cooperativa é uma transação: baixa o estoque do silo e lança o crédito do produtor juntos. Se um dos lados falhar, nenhum vale, e o estoque nunca diverge do financeiro.",
  publico: "Pagamento de um benefício debita o orçamento e credita o beneficiário. Com transação, uma falha no meio não deixa dinheiro público perdido nem pago em duplicidade.",
  engenharia: "Um sistema de manutenção que baixa uma peça do almoxarifado e abre a ordem de serviço precisa fazer os dois passos juntos, senão o estoque e a fábrica passam a contar histórias diferentes.",
  dados: "Os sistemas de origem de qualquer pipeline são bancos OLTP. Entender chaves e transações ajuda a ler esses dados e a saber que eles mudam o tempo todo, o que pesa na hora de extrair.",
  negocios: "Uma venda no caixa baixa o estoque, registra o pagamento e emite a nota. Tudo isso é uma transação: ou a venda inteira existe, ou nada existe.",
  dia: "Ao pagar no Pix, o seu saldo cai e o do outro lado sobe. Se a conexão cair no meio, o banco desfaz o que não foi concluído, e você não perde dinheiro."
};
