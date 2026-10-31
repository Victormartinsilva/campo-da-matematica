# Campo da Matemática

Laboratório interativo para revisar a matemática da graduação em Engenharia Agrícola com foco no trabalho atual em engenharia de dados e IA. Cada assunto tem três blocos de aplicação (no campo, no dia a dia, no seu trabalho), um laboratório para mexer e um trecho de código Python.

## Assuntos

- **Cálculo (11):** a grande ideia, funções, limites, derivadas e tangentes, regras de derivação, séries de Taylor, máximos e mínimos, método de Newton, integrais, integrais duplas e triplas, gradientes e curvas de nível.
- **Álgebra linear:** matrizes e sistemas.
- **Estatística:** experimentos de campo (teste t e poder).
- **Machine learning (9):** regressão linear, otimizadores (GD, momento, Adam), overfitting, classificação e guardrails, redes neurais, embeddings e busca, atenção, do logit ao próximo token, trilha de ferramentas.
- **Decisão:** teoria dos jogos.

## Estrutura

- `index.html`: estrutura da página.
- `tokens.css`: tokens de design (paleta de papel, cores por área, fontes, espaçamentos, tema escuro).
- `styles.css`: layout e componentes, sempre lendo os tokens.
- `content.js`: o texto didático de cada assunto (gancho, resumo, detalhes e o Python comentado linha a linha).
- `app.js`: ferramentas de gráfico e interface, os módulos (aplicações, laboratório, desafios e reações do Broto), o progresso e a navegação.

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
