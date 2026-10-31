# Campo da Matemática

Caderno de estudo interativo de matemática, física, estatística e IA, com aplicações em vários contextos: agro e ambiente, políticas públicas, engenharia, dados e IA, negócios e dia a dia. Cada assunto tem um seletor de contexto (a escolha vale para o site inteiro e fica lembrada), um laboratório para mexer e um trecho de código Python comentado.

## Assuntos

- **Cálculo (11):** a grande ideia, funções, limites, derivadas e tangentes, regras de derivação, séries de Taylor, máximos e mínimos, método de Newton, integrais, integrais duplas e triplas, gradientes e curvas de nível.
- **Álgebra linear:** matrizes e sistemas.
- **Estatística:** experimentos de campo (teste t e poder).
- **Machine learning (9):** regressão linear, otimizadores (GD, momento, Adam), overfitting, classificação e guardrails, redes neurais, embeddings e busca, atenção, do logit ao próximo token, trilha de ferramentas.
- **Decisão:** teoria dos jogos.
- **Física (6):** grandezas e vetores, movimento e leis de Newton, propulsão e foguetes, gravidade e órbitas, manobras, e física aplicada à engenharia. Cada capítulo traz fórmulas, exemplos resolvidos, exercícios com resposta e laboratório. A documentação de cada etapa está em `docs/fisica-aplicada/`.

## Estrutura

- `index.html`: estrutura da página.
- `tokens.css`: tokens de design (paleta de papel, cores por área, fontes, espaçamentos, tema escuro).
- `styles.css`: layout e componentes, sempre lendo os tokens.
- `content.js`: o texto didático de cada assunto (gancho, resumo, detalhes e o Python comentado linha a linha).
- `content/contextos.js`: a aplicação de cada assunto em cada contexto. Para criar um contexto novo, adicione-o em `CONTEXTOS` (app.js) e uma chave nova em cada assunto.
- `content/cenarios.js` e `content/cenarios-outros.js`: os cenários dos laboratórios por contexto (curvas, unidades, rótulos e metas). Hoje cobrem Funções, Derivadas, Máximos e mínimos e Integrais. Os demais laboratórios ainda usam exemplos de agro.
- `app.js`: ferramentas de gráfico e interface, os módulos (aplicações, laboratório, desafios e reações do Broto), o progresso e a navegação.

## Campo Vivo

Aba "Meu campo" na navegação: um ecossistema em SVG que cresce com o seu estudo.

- Concluir um assunto planta uma muda da espécie da área. Mexer no laboratório rega (uma vez por dia por assunto). Cumprir um desafio ou copiar o código aduba. Dias seguidos deixam o solo fértil e fazem nascer capim sozinho. Concluir assuntos libera biomas (pomar, mata ciliar). O tempo também faz crescer, com teto de 24 h desde a última visita.
- `campo/config.js`: espécies, regras de L-System, biomas, assuntos ativos e pesos de crescimento. É o único arquivo para ajustar o jogo.
- `campo/estado.js`: estado salvo em `mc-campo` (esquema versionado, com reset), tempo offline e crescimento.
- `campo/lsystem.js`: expande as regras; cada estágio é uma iteração a mais.
- `campo/cena.js`: cena SVG de cada bioma. `campo/campo.js`: aba, eventos do app e detalhe da planta. `campo/campo.css`: estilo.
- O app fala com o Campo Vivo por eventos (`mc:done`, `mc:lab`, `mc:copy`, `mc:goal`) e por `CampoVivo.init(deps)`.
- Protótipo: só Séries de Taylor e Regressão linear plantam. Para ligar outros assuntos, acrescente os ids em `assuntosAtivos` e a espécie da área em `areaEspecie`.

## Rodar localmente

É uma página estática, sem build. Abra `index.html` no navegador ou sirva a pasta:

```bash
npx serve .
```

As fontes vêm do Google Fonts. Sem internet a página usa as fontes do sistema.

## Publicar na Vercel

1. Importe este repositório na Vercel.
2. Framework preset: **Other**. Deixe Build Command e Output Directory em branco.
3. Cada push na branch principal publica uma nova versão.

## Notas

- Os valores de exemplo (dose de adubo, preços, vetores de atenção, logits) são ilustrativos e não são recomendações agronômicas nem financeiras.
- Os modelos de ML dos laboratórios (regressão, rede neural, otimizadores) rodam no navegador com JavaScript puro.
