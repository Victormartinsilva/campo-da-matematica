# Etapa 6 — Integração visual e experiência de uso

## Escopo aplicado

- Padronização de espaçamentos e limites de largura nos blocos didáticos e laboratórios de Física.
- Ajuste responsivo dos gráficos em Canvas para telas menores, com altura fluida e limites adequados.
- Ajuste de cartões, fórmulas, exercícios e textos longos para evitar estouro horizontal.
- Controles do painel com altura mínima e melhor distribuição em telas estreitas.
- Estados de foco visíveis para botões, abas, navegação, sliders e respostas expansíveis.
- Respeito à preferência do sistema por redução de movimento.
- Inclusão de texto alternativo nos elementos Canvas e leitura atômica dos indicadores dinâmicos.
- Preservação das regras gerais de layout das outras áreas; os ajustes específicos de painel e estágio são limitados à área Física.

## Arquivos alterados nesta etapa

- `app.js`: semântica acessível dos Canvas e indicadores; altura fluida nos Canvas dos laboratórios.
- `styles.css`: refinamento visual, responsividade, foco e redução de movimento.
- `docs/fisica-aplicada/validacao-etapa-6.md`: registro desta entrega.

## Verificações executadas

- `node --check app.js`: aprovado.
- `node --check content.js`: aprovado.
- Contagem de chaves CSS: balanceada.
- Presença das regras de responsividade para 860 px, 560 px e 380 px: aprovada.
- Conferência de escopo dos ajustes mobile para não alterar os estágios das outras áreas: aprovada.

## Verificação pendente

A captura automatizada em Chromium não concluiu neste ambiente. A validação visual final deve ser feita no navegador local, em tela desktop e celular, com tema claro e escuro.

## Critérios de aceite local

1. Os seis módulos de Física abrem sem rolagem horizontal indevida.
2. Os gráficos permanecem proporcionais e legíveis em telas estreitas.
3. Os controles ficam acessíveis e não se sobrepõem.
4. Os indicadores numéricos continuam legíveis durante a interação.
5. O foco por teclado é visível.
6. O tema claro e o escuro mantêm contraste suficiente.
7. Os módulos não relacionados à Física mantêm o layout anterior.
