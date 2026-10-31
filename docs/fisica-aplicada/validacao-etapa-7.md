# Etapa 7 — Testes e validação final

**Versão validada:** pacote da Etapa 6  
**Escopo:** trilha de Física, seis laboratórios, conteúdo didático e compatibilidade estrutural com o projeto existente.

## Resultado executivo

Os testes estáticos, de estrutura, de conteúdo e de consistência matemática foram concluídos com sucesso. A validação visual/interativa em navegador real permanece pendente de execução no computador do usuário: o ambiente de automação disponível bloqueou o acesso do navegador à página local (`ERR_BLOCKED_BY_ADMINISTRATOR`) e o Chromium headless não concluiu a inicialização.

Não foram alterados os códigos funcionais nesta etapa porque os testes executados não apontaram defeitos que justificassem mudanças. Foi acrescentado este relatório ao projeto.

## Testes aprovados

| Verificação | Resultado | Evidência |
|---|---|---|
| Sintaxe de `app.js` | Aprovado | `node --check app.js` |
| Sintaxe de `content.js` | Aprovado | `node --check content.js` |
| Sintaxe dos arquivos `campo/*.js` | Aprovado | `node --check` em todos os arquivos |
| Integridade do HTML | Aprovado | 14 IDs únicos; referências locais de scripts resolvidas |
| Estrutura CSS | Aprovado | 281 regras em `styles.css`, 9 em `tokens.css` e 47 em `campo/campo.css`; sem erros de parsing |
| Conteúdo dos seis capítulos | Aprovado | Todos possuem gancho, resumo, detalhes, fórmulas, exemplos, exercícios e código Python |
| Código Python dos capítulos | Aprovado | Seis snippets passaram por `ast.parse` e foram executados |
| Cadastro dos seis laboratórios | Aprovado | IDs e funções de construção encontrados no `app.js` |
| Integração de progresso | Aprovado estruturalmente | Desafios usam `Progress.get().goals` e evento `mc:goal` |
| Persistência da navegação | Aprovado estruturalmente | Seleção do módulo gravada em `localStorage` |
| CSS responsivo e movimento reduzido | Aprovado estruturalmente | Media queries para 860, 600, 560 e 380 px e `prefers-reduced-motion` |

## Verificação dos conteúdos Python

Os seis códigos didáticos foram executados com sucesso:

- Vetores: componentes Fx = 86,60 N, Fy = 50,00 N e módulo = 100,00 N.
- Leis de Newton: aceleração = 2,00 m/s²; velocidade final = 13,00 m/s; deslocamento = 36,00 m.
- Propulsão: aceleração = 2,00 m/s²; tempo ideal de frenagem = 50,0 s.
- Gravidade: g = 8,671 m/s²; velocidade orbital = 7,67 km/s; velocidade de escape = 10,84 km/s.
- Manobras: impulso = 80,0 N·s; variação de velocidade = 0,080 m/s.
- Engenharia e agricultura: tração = 36,0 kW; potência hidráulica = 3,92 kW; potência de entrada estimada = 5,61 kW.

## Verificação numérica independente dos simuladores

| Modelo | Cenário | Resultado esperado e obtido |
|---|---|---|
| Vetores | Dois vetores de 60 unidades a 0° e 180° | Resultante aproximadamente zero |
| Newton | F = 2.000 N, m = 1.000 kg, t = 5 s | a = 2 m/s²; v = 10 m/s; s = 25 m |
| Foguete | v inicial = 35 m/s; empuxo = 9.000 N; massa = 4.500 kg; t = 5 s | v final = 45 m/s |
| Órbita | Raio inicial = 1; velocidade tangencial = 1; 100 passos | raio ≈ 1,000011; energia específica ≈ -0,500000 |
| Manobras | Velocidade inicial (30, 0) m/s e impulso lateral de 5 m/s | velocidade resultante (30, 5) m/s |
| Tração agrícola | m = 6.000 kg; μ = 0,65; força solicitada = 12.000 N; v = 6 m/s | tração estimada = 38.259 N; potência = 72 kW |

## Pendências para aceite do usuário

A automação de navegador não foi concluída neste ambiente. Portanto, não declarar como testados visualmente os seguintes itens:

1. Abrir cada um dos seis módulos pela navegação e verificar se o laboratório aparece.
2. Interagir com sliders, botões, gráficos e desafios.
3. Confirmar que o progresso permanece após recarregar a página.
4. Alternar tema claro/escuro e conferir contraste.
5. Conferir desktop, tablet e celular, incluindo rolagem horizontal.
6. Abrir módulos anteriores de Cálculo, Álgebra Linear, Estatística, Machine Learning e Decisão para confirmar que não houve regressão.
7. Entrar no Campo Vivo e confirmar seu funcionamento preservado.

## Conclusão

**Validação técnica estática e matemática: aprovada.**  
**Validação visual e de interação no navegador do usuário: pendente.**  
**Publicação: não realizada.**
