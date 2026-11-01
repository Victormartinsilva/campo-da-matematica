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
