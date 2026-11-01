# Planejamento: próximos passos do caderno

Anotado a partir da sua análise do site (mapa da trilha, rolagem, temas). Tudo aqui é proposta; nada foi implementado.

## O que você pediu, item por item

| # | Pedido | O que é hoje | Proposta |
|---|---|---|---|
| 1 | Ícone próprio por assunto no mapa da trilha | Todos usam a mesma plantinha (terra, broto, espiga) | Um desenho por assunto, em 3 estágios que evoluem com o estudo (ver "Ícones") |
| 2 | Ao terminar, o ícone "vira" algo do tema | Só muda de broto para espiga | O estágio final é a versão completa do desenho (ex.: função vira função composta) |
| 3 | Preparar para 12 módulos, em duas colunas | Uma coluna, caixas de larguras diferentes | Grade de duas colunas com caixas do mesmo tamanho e ícones do mesmo tamanho |
| 4 | Entender a legenda "Terra / Broto / Espiga" | Sem explicação | Reescrever como "Não visto / Visto / Estudado", com o desenho do ícone ao lado, e um texto curto: visto = abriu o assunto, estudado = completou os desafios |
| 5 | Dar mais espaço à área de estudo | Menu lateral e conteúdo disputam a tela com o cabeçalho grande | Cabeçalho do mapa recolhível, menu lateral mais estreito e fixo, conteúdo mais largo; "Campo Vivo" e o resumo vão para um painel lateral recolhível |
| 6 | Clicar num assunto não pode rolar a página | `show()` rola para o topo do conteúdo | Trocar o conteúdo no lugar, sem rolar; só voltar ao topo do painel de estudo se o assunto anterior estava rolado |
| 7 | Tema visual por matéria | Só muda a cor de destaque | Cada matéria com paleta, fundo (textura) e ilustração próprios |
| 8 | Personagem por matéria | O Broto verde em todas | Um guia por matéria, mesma família de traço (ver "Personagens") |
| 9 | Mais didática | Texto, fórmulas, exercícios e vídeos já existem | Trilha de aprendizagem por assunto: intuição, exemplo, mãos na massa, exercício, revisão |

## Ícones por assunto (proposta)

Três estágios por ícone: não visto (contorno, cinza), visto (traço colorido), estudado (completo, com cor cheia).

| Assunto | Visto | Estudado |
|---|---|---|
| A grande ideia do cálculo | regador ou semente | planta com curva de crescimento |
| Funções | caixa com entrada e saída | máquinas encadeadas: função composta |
| Limites | seta se aproximando de um ponto | ponto preenchido com a seta tocando |
| Derivadas | reta tocando a curva | tangente com ângulo marcado |
| Regras de derivação | uma régua | caixa de ferramentas aberta |
| Taylor | reta | curva e polinômio sobrepostos |
| Máximos e mínimos | colina | colina com bandeira no topo |
| Newton | tangente descendo | tangente que chega na raiz |
| Integrais | faixa | área preenchida sob a curva |
| Integrais múltiplas | quadro | volume sob superfície |
| Gradientes | seta | mapa de curvas de nível com seta |

Física, álgebra, estatística, ML e decisão seguem o mesmo padrão, um desenho por assunto.

## Personagens por matéria (proposta)

| Matéria | Guia sugerido |
|---|---|
| Cálculo | Broto (mantém) |
| Álgebra linear | Grade viva: um quadrado que se alonga em vetor |
| Física | Foguetinho ou pêndulo com olhos |
| Estatística | Dado ou gota de chuva com um sino na cabeça |
| Machine learning | Robozinho de engrenagens que aprende |
| Decisão | Bússola ou balança |

Cada um precisa de: parado, feliz, pensativo, confuso (as poses que o Broto já tem), no mesmo estilo de traço.

## Ordem sugerida de trabalho

1. **Navegação sem rolar** (item 6). Correção pequena e a que mais incomoda no uso.
2. **Layout de estudo** (item 5) e **mapa em duas colunas** (itens 3 e 4). Mexem no mesmo CSS, vale fazer juntos.
3. **Ícones por assunto** (itens 1 e 2). Começar por Cálculo (11 ícones) como modelo; as outras matérias entram em seguida.
4. **Temas por matéria** (item 7). Fundamento: variáveis CSS por matéria, já existe a base de tokens.
5. **Personagens por matéria** (item 8). Depende de ter o estilo dos ícones fechado.
6. **Didática** (item 9). Pode andar em paralelo com 3 a 5.

Cada etapa vira um commit separado e eu mostro antes de enviar.

## Decisões que preciso de você

1. Os personagens da tabela acima servem, ou você tem outra ideia (animais, plantas, ferramentas)?
2. No mapa, 12 módulos em duas colunas: cada coluna por matéria (6 + 6) ou os assuntos misturados em ordem de estudo?
3. Quer que o tema por matéria mude também o fundo do site inteiro ou só a área de estudo?
4. Posso reaproveitar a legenda "Não visto / Visto / Estudado" ou você prefere manter terra, broto e espiga explicados?

## Extras que apareceram ao revisar (fora do pedido)

- Vídeos: falta a narração ser ouvida em voz neural no seu navegador; hoje depende das vozes instaladas.
- Labs: ainda há cenários de agro em vários laboratórios (múltiplas, gradiente, matrizes, estatística, regressão, embeddings, atenção, token, jogos, ideia) que faltam adaptar aos outros contextos.
- Python: vários exemplos de código ainda têm números e nomes de agro; os que têm linhas `nome = número` já ganham controles de ajuste.

---

# Fase 2: um vídeo por assunto e conteúdo mais forte

## Situação em números

- 29 assuntos. 4 já têm vídeo (limites, derivadas, Taylor, integrais). Faltam 25; o assunto "Trilha e ferramentas" é um guia de ferramentas e não precisa de vídeo, então são 24.
- Todos os assuntos, menos "Trilha e ferramentas", já têm fórmulas, 2 exemplos e 3 exercícios.

## Vídeos: 24 restantes em 6 lotes (um lote por matéria)

| Lote | Assuntos | Vídeos |
|---|---|---|
| Cálculo | grande ideia, funções, regras de derivação, máximos e mínimos, Newton, integrais múltiplas, gradientes | 7 |
| Álgebra linear | matrizes e sistemas | 1 |
| Física | vetores, leis de Newton, propulsão, gravidade, manobras, física aplicada | 6 |
| Estatística | experimentos | 1 |
| Machine learning | regressão, otimizadores, overfitting, classificação, redes, embeddings, atenção, token | 8 |
| Decisão | teoria dos jogos | 1 |

Cada vídeo segue o padrão dos 4 atuais: 8 peças de 7 a 10 s, cena desenhada à mão, metáfora neutra (não só agro), guia da matéria, termina com chamada para o laboratório.

## Decisão importante: a voz

Hoje a voz é a do navegador, e a qualidade depende do que está instalado. Três caminhos:

1. **Manter a voz do navegador** (como está, com a espera pela fala). Sem custo, qualidade variável.
2. **Gerar áudio fixo por vídeo** com uma voz neural em português e guardar os arquivos no projeto. Mesma voz para todo mundo, sincronia exata, funciona offline. Exige gerar 24 a 28 arquivos de áudio uma vez; depende de uma ferramenta de voz que rode na sua máquina.
3. **Você grava a sua voz.** Mais pessoal, dá mais trabalho.

Recomendo o caminho 2 depois de fechar os roteiros.

## Melhorias de conteúdo (proposta)

| Ideia | O que muda para quem estuda | Esforço |
|---|---|---|
| Erros comuns | Em cada assunto, 3 confusões típicas e como evitá-las | baixo |
| Glossário ao passar o mouse | Termos como "limite", "gradiente", "logit" ganham definição curta em qualquer página | médio |
| Exercícios que corrigem | Você digita a resposta e ela confere (com tolerância), em vez de só revelar | médio |
| Mais questões em níveis | De 3 para 6 por assunto: básico, médio, desafio | médio |
| Cartões de revisão | Fórmulas e perguntas viram cartões com repetição espaçada no "Meu caderno" | médio |
| Pré-requisitos e ligações | "Antes de estudar isto" e "onde isto reaparece" (derivada em gradiente em redes neurais) | médio |
| Projeto da matéria | Um mini-projeto por matéria, usando os dados do contexto escolhido | alto |
| Python neutro e com desafios | Exemplos sem agro e um pequeno desafio de código por assunto | médio |
| Títulos e textos por contexto | "Experimentos de campo" e outros títulos mudam com o contexto | baixo |

## Ordem sugerida

1. Lote de vídeos de Cálculo (completa a matéria mais longa) e, em paralelo, "Erros comuns" e títulos por contexto.
2. Decidir a voz e gerar o áudio dos vídeos prontos.
3. Lotes de Física, ML, Álgebra, Estatística e Decisão.
4. Exercícios que corrigem, mais questões e cartões de revisão.
5. Glossário, ligações entre assuntos e projetos por matéria.

---

# Fase 3: revisão de layout e tema (feedback de 01/11)

## O que você apontou

| # | Problema | Causa provável | Proposta |
|---|---|---|---|
| 1 | Com a tela em 100%, o vídeo fica cortado | O palco do vídeo é 16:9 e mais a barra de controles e a barra de trilha fixa passam da altura da janela | Limitar a altura do vídeo à janela (largura calculada pela altura disponível), controles sempre visíveis e botão de tela cheia |
| 2 | Os controles do laboratório ficam longe do gráfico: você desce para ajustar e não vê o gráfico mexer | O painel fica abaixo do gráfico em janelas menos largas, ou o gráfico sai da tela ao rolar | Gráfico fixo no topo enquanto você ajusta os controles (em janelas largas, painel ao lado e gráfico fixo; em janelas estreitas, gráfico fixo em cerca de 40% da altura e controles embaixo) |
| 3 | O ícone do guia de Cálculo parece um limão e os textos dos balões e cartões ainda vêm do tema antigo | O Broto é uma bolinha verde com folhas; as falas citam plantação, espiga, "Eu sou o Broto" | Redesenhar o guia de Cálculo com tema de matemática (ver abaixo) e revisar as falas, avisos, medalhas e rótulos |
| 4 | O fundo ainda parece relevo de terra em todas as matérias | As curvas de nível do hero e do fundo são as mesmas em todas | Um fundo inteiro por matéria, no lugar do relevo (ver abaixo) |
| 5 | Revisão geral do layout | Várias mudanças seguidas sem uma passada de conjunto | Auditoria de layout página por página, com checklist e correções |

## Fundo por matéria (substitui o relevo de terra)

| Matéria | Fundo |
|---|---|
| Cálculo | Curvas e tangentes suaves (famílias de funções), sem relevo |
| Álgebra linear | Grade de plano cartesiano com vetores e transformações sutis |
| Física | Espaço: estrelas, órbitas elípticas, nebulosa discreta; papel milimetrado só no palco |
| Estatística | Nuvem de pontos e curvas de distribuição |
| Machine learning | Rede de nós e conexões |
| Decisão | Tabuleiro e árvore de decisão em losangos |

Os fundos mudam o site inteiro, inclusive a página inicial quando você passa o mouse nos blocos do mapa. Eles respeitam o tema claro e escuro e o modo de movimento reduzido.

## Novo guia de Cálculo

Proposta de nomes e formas, para você escolher: **Tangente** (um lápis com olhos que desenha uma reta), **Curvinha** (uma curva suave com rosto) ou **Delta** (um triângulo com rosto, do símbolo de variação). Os outros cinco guias ficam como estão.

## Revisão de vocabulário do tema antigo

Trocar "plantação", "espiga", "talhão", "Broto" e semelhantes nas falas do guia, avisos, medalhas, o "Campo Vivo" e legendas. O Campo Vivo pode manter a metáfora da planta, já que ele é um recurso à parte, mas com o nome e os textos de caderno de estudo.

## Ordem

1. Vídeo cortado e controles junto do gráfico (itens 1 e 2): correções de layout, o que mais atrapalha o uso.
2. Fundos por matéria (item 4).
3. Novo guia de Cálculo e revisão do vocabulário (item 3).
4. Auditoria de layout página por página (item 5).
5. Retomar os vídeos que pararam por limite de uso.

---

# Fase 4: fixação, horta com foco e foco em machine learning

## 1. Flashcards (fixação do conteúdo)

- Cada assunto gera cartões automaticamente a partir do que já existe: fórmulas (nome na frente, expressão e significado atrás), perguntas de ouro, erros comuns (a frase errada na frente, a correção atrás) e as questões (pergunta e resposta).
- Revisão espaçada simples: você marca "errei", "quase" ou "acertei"; os cartões que erra voltam em breve e os que acerta voltam em dias (intervalos 1, 3, 7, 14 dias, guardados no navegador).
- Onde aparece: um botão "Cartões deste assunto" na revisão de cada assunto e uma área "Revisar hoje" no Meu caderno, com os cartões vencidos de todos os assuntos, começando pelo seu foco (machine learning).
- Tudo funciona por teclado (espaço vira o cartão, 1, 2, 3 marcam) e no celular.

## 2. Horta com foco (pomodoro que faz crescer)

- Um cronômetro de foco (25 min de estudo, 5 de pausa, ajustável) no Campo Vivo e em um mini-controle no cabeçalho da página.
- A planta escolhida cresce enquanto a sessão corre com a página aberta e visível; se você troca de aba ou pausa por mais de um minuto, a planta murcha um estágio em vez de crescer. Sessão completa vira uma planta adulta na horta.
- O tempo estudado por assunto é somado e aparece no Meu caderno (minutos por assunto e por dia).
- A horta guarda as plantas das sessões completas, e o tema da planta acompanha a matéria estudada.

## 3. Machine learning: vídeos e fontes oficiais

- Os 8 vídeos de ML (regressão, otimizadores, overfitting, classificação, redes, embeddings, atenção, token) seguem a estrutura didática: pergunta, metáfora, mecanismo, números, armadilha, ligação com o trabalho, convite ao laboratório.
- Cada assunto de ML ganha um bloco **"Para aprofundar (fontes oficiais)"** com links para a documentação e cursos de quem mantém a tecnologia, cada um com uma linha dizendo o que estudar ali e o nível:
  - Google, Machine Learning Crash Course (regressão, classificação, overfitting, redes, embeddings).
  - scikit-learn, guia do usuário (regressão, classificação, validação).
  - PyTorch, tutoriais oficiais (otimizadores, redes, retropropagação).
  - Hugging Face, cursos de LLM e de NLP (embeddings, atenção, tokens).
  - Databricks e MLflow, documentação (trabalho com dados, treino e registro de modelos).
  - Anthropic, documentação e guias de prompts e de uso de LLMs em produção.
  - DeepLearning.AI e Stanford (CS229, CS224N) para a base teórica.
- Os links serão verificados um a um antes de entrar no caderno, e o que não puder ser confirmado fica fora. Nada de resumo copiado: só links e a nossa explicação.
- Uma trilha de estudo de ML ordenada ("Comece aqui") com a sequência dos 9 assuntos e quanto tempo cada um leva.

## 4. Design da página: melhorias propostas

Olhando a página de assunto, há muita informação empilhada. Proposta:

| Ideia | Efeito |
|---|---|
| Modo passo a passo | A barra da trilha vira navegação: mostra um passo por vez (Intuição, Mãos na massa, Exemplos, Questões, Revisão) com "Próximo" no fim de cada um, em vez de uma página longa. Quem prefere ver tudo mantém a rolagem. |
| Seções recolhíveis | Fórmulas, erros comuns, exemplos e Python começam recolhidos com um resumo de uma linha; o que você abre fica lembrado. |
| Erros comuns em duas colunas | Mais compactos e fáceis de comparar em tela larga. |
| Hierarquia visual | Um peso único para os títulos de seção, menos molduras duplas, e a cor da matéria só nos destaques. |
| Ações principais sempre à vista | "Marcar como estudado", cartões e o cronômetro de foco numa faixa fixa. |
| Tela larga | Aproveitar mais a largura: conteúdo em duas colunas quando fizer sentido (fórmulas ao lado do laboratório). |

## Ordem sugerida

1. Fontes oficiais de ML e retomada dos 6 vídeos de ML que pararam por limite de uso.
2. Flashcards.
3. Horta com foco.
4. Melhorias de design (modo passo a passo primeiro).
5. Depois: ligação entre matérias e o módulo de políticas públicas com a base de leis.

---

# Fase 5: nova matéria "Programação e dados" (do iniciante à base para IA)

Pedido: um quadrado novo no mapa que ensine Python, R, SQL, bancos transacionais e analíticos, ferramentas como Fabric e Databricks e suas aplicações em dados, em um guia que vai do iniciante até os conceitos básicos para começar em IA.

## Módulos propostos (11)

| # | Módulo | O que ensina | Laboratório |
|---|---|---|---|
| 1 | Como o computador pensa | variáveis, tipos, condições, laços, funções | Python no navegador (já existe) com desafios |
| 2 | Python para dados | listas, dicionários, numpy, pandas, gráficos | tabela editável e execução de código |
| 3 | R e Python lado a lado | quando usar cada um, tidyverse contra pandas | o mesmo problema nas duas linguagens (R mostrado, Python executável) |
| 4 | SQL do zero | SELECT, WHERE, ORDER BY, funções de agregação | editor de SQL que roda no navegador sobre tabelas de exemplo |
| 5 | SQL para análise | JOIN, GROUP BY, subconsultas, janelas | editor de SQL com desafios |
| 6 | Bancos transacionais (OLTP) | tabelas, chaves, normalização, índices, ACID | simulador de transação com rollback |
| 7 | Bancos analíticos (OLAP) | armazém de dados, esquema estrela, colunar, ETL e ELT | comparação linha contra coluna |
| 8 | Lakehouse e medalhão | Delta, camadas bronze, prata e ouro, qualidade de dados | pipeline em três camadas, passo a passo |
| 9 | Fabric e Databricks na prática | espaços de trabalho, notebooks, pipelines, catálogo, governança | mapa interativo das peças de cada plataforma |
| 10 | Do dado ao modelo | atributos, treino e teste, métricas, vazamento de dados | pequeno fluxo de ML sobre uma tabela |
| 11 | Primeiros passos em IA | IA, ML, aprendizado profundo, LLMs, RAG, guardrails: o que cada um é | linha do tempo e mapa de conceitos |

Cada módulo seguiria o padrão dos outros: gancho, resumo, fórmulas e conceitos-chave, 2 exemplos, 3 questões, 3 erros comuns, fontes oficiais, cartões de revisão, vídeo e tema/guia próprios da matéria.

## Pontos de decisão

1. **Nome e guia da matéria:** "Programação e dados" com um guia próprio (sugestão: **Cursor**, um cursor piscando com rosto, ou **Chaveta**, um par de chaves {}). Cor própria no mapa e fundo de código e tabelas.
2. **SQL no navegador:** dá para rodar SQL de verdade (SQLite compilado para o navegador), sem servidor. Carregaria uma biblioteca de cerca de 1 MB sob demanda, só quando você abrir um módulo de SQL.
3. **R:** rodar R no navegador é possível, mas é pesado (dezenas de MB). Sugestão: mostrar o código R com a saída esperada e o equivalente em Python executável.
4. **Fontes oficiais:** Python (docs.python.org), pandas, R (CRAN e tidyverse), SQLite e PostgreSQL, Microsoft Fabric e Learn, Databricks e Delta Lake, Kimball (esquema estrela), cada link verificado como nas fontes de ML.
5. **Ordem de construção:** módulos 1, 2, 4, 5 primeiro (a base), depois 6 a 9 (bancos e plataformas), por fim 3, 10 e 11.

## Ícones

- Os ícones dos contextos (Todos, Agro e ambiente, Políticas públicas, Engenharia, Dados e IA, Negócios, Dia a dia) já foram refeitos, com traço mais detalhado e um destaque suave de cor.
- Os ícones de cada assunto da nova matéria seguiriam o padrão dos outros, em três estágios.
