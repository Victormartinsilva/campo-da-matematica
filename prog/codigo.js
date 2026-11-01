/* Módulo 1 de Programação e dados: Como o computador pensa. Serve de modelo para os demais módulos da matéria. */
(window.MODULOS_PROG = window.MODULOS_PROG || []).push({
  id: "codigo",
  nome: "Como o computador pensa",
  gancho: "Se o computador só sabe seguir ordens, como ele decide qualquer coisa?",
  resumo: "Um programa é uma receita: guarda valores em variáveis, decide com condições, repete com laços e agrupa passos em funções.",
  detalhes: "O computador executa uma instrução por vez, de cima para baixo, sem adivinhar nada. Tudo o que parece inteligência vem de quatro peças: variáveis (nomes para valores), condições (if: seguir um caminho ou outro), laços (for e while: repetir) e funções (def: dar nome a um bloco de passos). Em Python, a indentação é a estrutura: o que está recuado pertence ao bloco acima. Aprender a ler um programa passo a passo, como o computador lê, é a base de tudo o que vem depois: dados, SQL, modelos de IA.",
  saudacao: "Oi! Eu sou o Chaveta. Escreva um pedacinho de código, aperte Executar e veja o que o computador entendeu.",
  python: `preco = 120.0                 # variável: um nome para um valor
desconto = 0.1 if preco > 100 else 0   # condição: decide entre dois caminhos

def com_desconto(valor, taxa):          # função: um bloco com nome
    return valor * (1 - taxa)

for qtd in [1, 2, 3]:                   # laço: repete para cada item
    total = qtd * com_desconto(preco, desconto)
    print(qtd, "unidade(s):", total)`,
  build: LabProg.python({
    id: "codigo",
    intro: "<p>Aqui o código roda de verdade, no seu navegador. Mude os números, quebre de propósito e leia as mensagens de erro: elas dizem onde olhar.</p>",
    dica: "Os desafios conferem o que o programa imprime.",
    inicial: `# Escreva sua solução e aperte Executar
preco = 80
if preco > 50:
    print("caro")
else:
    print("barato")`,
    desafios: [
      {t: "Imprima exatamente a palavra barato mudando só o valor de preco.", teste: ({saida}) => saida.trim() === "barato", win: "A condição escolheu o outro caminho: com preco menor ou igual a 50, o else é executado."},
      {t: "Use um laço for para imprimir os números de 1 a 5, um por linha.", teste: ({saida, codigo}) => saida.trim().split(/\s+/).join(",") === "1,2,3,4,5" && /\bfor\b/.test(codigo), win: "O laço repetiu o print cinco vezes. É assim que se evita copiar e colar."},
      {t: "Crie uma função com def que devolve o dobro de um número e imprima o dobro de 21.", teste: ({saida, codigo}) => saida.trim() === "42" && /\bdef\b/.test(codigo), win: "A função ganhou um nome e pode ser reutilizada com qualquer número."}
    ]
  }),
  formulas: [
    {nome: "Variável", expressao: "nome = valor", significado: "Guarda um valor sob um nome para usar depois. O nome aponta para o valor, e pode apontar para outro depois."},
    {nome: "Condição", expressao: "if teste:  ...  else:  ...", significado: "Executa um bloco se o teste for verdadeiro e outro se for falso. O teste produz True ou False."},
    {nome: "Laço for", expressao: "for item in lista:  ...", significado: "Repete o bloco recuado uma vez para cada item da lista ou da sequência."},
    {nome: "Função", expressao: "def nome(entrada):  return saída", significado: "Dá nome a um bloco de passos. Recebe valores de entrada e devolve um resultado com return."},
    {nome: "Indentação", expressao: "4 espaços = dentro do bloco", significado: "Em Python o recuo define o que pertence ao if, ao for ou à função. Misturar recuos gera erro."}
  ],
  exemplos: [
    {titulo: "Preço com desconto condicional", enunciado: "Uma loja dá 10% de desconto para compras acima de R$ 100. Calcule o valor final de uma compra de R$ 120.", passos: ["Guarde o valor: preco = 120.", "Decida: se preco > 100, a taxa é 0.1; senão, 0.", "Calcule: final = preco * (1 - taxa) = 120 * 0.9."], resultado: "O valor final é R$ 108,00."},
    {titulo: "Somando uma lista com laço", enunciado: "Some as vendas diárias [30, 45, 25] sem usar a função sum.", passos: ["Comece com total = 0.", "Para cada venda da lista, faça total = total + venda.", "Depois do laço, imprima total."], resultado: "O total é 100."}
  ],
  exercicios: [
    {pergunta: "O que o código x = 5; x = x + 2; print(x) imprime?", resposta: "7", explicacao: "A segunda linha lê o valor atual de x (5), soma 2 e guarda o resultado (7) no mesmo nome."},
    {pergunta: "Quantas vezes o print é executado em: for i in range(4): print(i)?", resposta: "4 vezes (imprime 0, 1, 2 e 3)", explicacao: "range(4) gera os números de 0 a 3. O Python começa a contar do zero e o limite superior não entra."},
    {pergunta: "Por que este código dá erro: if x > 3:\\nprint(x)?", resposta: "Falta a indentação do print", explicacao: "O corpo do if precisa estar recuado. Sem o recuo, o Python não sabe que o print pertence ao bloco."}
  ],
  erros: [
    {erro: "O sinal = significa igual, como na matemática.", correcao: "Em código, = é atribuição: guarda o valor do lado direito no nome do esquerdo. Para comparar use ==. Em x = x + 1 não há contradição: lê x, soma 1 e guarda de volta."},
    {erro: "O Python conta a partir do 1, então range(5) vai de 1 a 5.", correcao: "A contagem começa em 0 e termina antes do limite: range(5) dá 0, 1, 2, 3, 4. A lista [10, 20, 30] tem o primeiro item no índice 0."},
    {erro: "Variáveis e funções podem se chamar de qualquer jeito, o computador entende.", correcao: "O computador não entende nomes, quem lê é você (e seu colega). Use nomes claros como total_vendas, e nunca nomes de funções do Python, como sum ou list, para variáveis."}
  ],
  fontes: [
    {titulo: "O tutorial de Python", url: "https://docs.python.org/pt-br/3/tutorial/index.html", origem: "Python Software Foundation", idioma: "pt", nivel: "iniciante", estude: "Leia os capítulos de números, listas, fluxo de controle (if e for) e funções."},
    {titulo: "Python para iniciantes", url: "https://www.python.org/about/gettingstarted/", origem: "Python.org", idioma: "en", nivel: "iniciante", estude: "Veja por onde começar e quais ferramentas instalar."}
  ]
});
(window.CTX_TEXTO = window.CTX_TEXTO || {}).codigo = {
  agro: "Uma regra de adubação é uma condição: se a análise de solo mostra fósforo baixo, aplique X; senão, não aplique. Um laço percorre todos os talhões da fazenda.",
  publico: "Regras de elegibilidade de um programa social são condições. Um laço aplica a mesma regra a milhares de cadastros, sempre do mesmo jeito.",
  engenharia: "Uma rotina de controle lê um sensor, compara com o limite (condição) e repete a leitura a cada segundo (laço).",
  dados: "Limpar uma coluna, filtrar linhas e treinar um modelo são variáveis, condições, laços e funções. Todo pipeline de dados é feito dessas quatro peças.",
  negocios: "Calcular comissão por faixa de venda é uma condição. Aplicar a regra a todos os vendedores do mês é um laço.",
  dia: "Uma planilha com SE e uma lista de compras que você percorre item por item já usam a mesma lógica."
};
