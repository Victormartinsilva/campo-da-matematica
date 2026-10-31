# Etapa 8 — Preparação para publicação

**Base:** pacote da Etapa 7.  
**Status:** preparação documental e validações locais concluídas; publicação não executada.

## Alterações desta etapa

- Atualizado o README para refletir os seis módulos e laboratórios já presentes.
- Removida a descrição antiga que indicava Física apenas como trilha em construção.
- Criado `docs/publicacao/guia-publicacao-github-vercel.md` com procedimento de pré-publicação, GitHub, Vercel, smoke tests e rollback.
- Criado `docs/publicacao/checklist-release.md` para acompanhar as aprovações e tarefas de release.

## Verificações realizadas

| Verificação | Resultado |
|---|---|
| Arquivos essenciais presentes na raiz | Aprovado |
| `index.html` referencia CSS e scripts locais existentes | Aprovado |
| IDs HTML duplicados | Nenhum encontrado (14 IDs únicos) |
| `app.js` | `node --check` aprovado |
| `content.js` | `node --check` aprovado |
| Scripts `campo/*.js` | `node --check` aprovado |
| Manifests/build | Não há `package.json`, `vercel.json` ou etapa de build |
| Estrutura de publicação estática | Compatível com `index.html` na raiz |
| README | Atualizado para refletir o estado real da Física |

## Dependências externas identificadas

O HTML carrega Google Fonts e KaTeX via CDN. O site tem fallback de fontes de sistema; a renderização de fórmulas depende do carregamento do KaTeX. Não foram adicionados novos pacotes npm.

## Itens não executados

- Não foi feito commit, push, Pull Request ou merge.
- Não houve autenticação ou alteração de configuração do GitHub.
- Não foi criado nem acionado deployment na Vercel.
- Não foi realizada validação visual automatizada em navegador.
- Não foi testada a URL de produção.

## Conclusão

O projeto está organizado e documentado para uma publicação estática na Vercel. A entrega está preparada para revisão local e aprovação do responsável. A publicação permanece bloqueada até autorização explícita.
