# Física Aplicada — arquitetura do módulo

**Status:** arquitetura aprovada; conteúdo didático dos seis capítulos implementado na Etapa 3; laboratórios aguardam a Etapa 4.  
**Decisões:** manter HTML/CSS/JavaScript atuais; não integrar ao Campo Vivo nesta versão inicial.

## 1. Objetivo

Adicionar Física como uma nova área de conhecimento do Campo da Matemática, preservando navegação, padrão didático, tema claro/escuro, persistência de progresso e estrutura de laboratórios existentes.

## 2. Princípios técnicos

- Não introduzir framework, bundler ou dependência nova.
- Reutilizar o cadastro `MODS`, o objeto `CONTENT`, `layoutDidatico`, `kit`, `Progress` e os componentes/helpers já existentes em `app.js`.
- Manter os laboratórios no navegador, com cálculos em JavaScript e desenho em Canvas/SVG conforme a necessidade.
- Usar IDs estáveis e exclusivos para navegação, hash da URL e progresso salvo em `localStorage`.
- Não alterar o comportamento do Campo Vivo nesta primeira entrega.
- Preservar os assuntos atuais e seus IDs.

## 3. Área e identidade visual

- Nome da área: `Física`.
- Chave visual: `fisica`.
- Tokens: `--a-fisica-fill` e `--a-fisica-ink`, com valores próprios para tema claro e escuro.
- A área será apresentada automaticamente na navegação quando seus módulos forem registrados em `MODS`, pois `AREAS_LIST` é derivada dos grupos cadastrados.

## 4. Catálogo de módulos

| Ordem | ID estável | Nome | Laboratório previsto |
|---:|---|---|---|
| 1 | `vetores` | Grandezas, unidades e vetores | Construtor e decomposição de vetores |
| 2 | `leis-newton` | Movimento e leis de Newton | Força, massa e aceleração |
| 3 | `propulsao` | Propulsão e foguetes | Simulador de movimento e empuxo de foguete |
| 4 | `gravidade` | Gravidade e órbitas | Simulador gravitacional e orbital |
| 5 | `manobras` | Manobras e navegação espacial | Controle de atitude e trajetória |
| 6 | `fisica-engenharia` | Física aplicada à engenharia e agricultura | Trabalho, potência, atrito e tração |

Os seis IDs foram reservados em `ID_ORDER`. O cadastro efetivo dos módulos será feito na etapa de conteúdo, evitando que assuntos incompletos apareçam na navegação.

## 5. Contrato de integração com a aplicação

Cada módulo seguirá o contrato existente de `MODS`: `id`, `grupo`, `nome`, textos `campo` e `dia`, e função `build(stage, panel, extra)`. O conteúdo textual correspondente será associado pelo mesmo ID em `CONTENT`.

A função `build()` deverá:

1. Criar o elemento visual do laboratório usando os helpers existentes sempre que possível.
2. Expor controles acessíveis e compatíveis com mouse e toque.
3. Atualizar leituras e gráficos sem recarregar a página.
4. Registrar estado e objetivos por meio de `kit(id, extra, ...)`.
5. Retornar uma função de redesenho e limpar recursos/listeners quando aplicável, respeitando o padrão de `onLeave` da aplicação.

## 6. Responsabilidades dos arquivos

| Arquivo | Responsabilidade na Física |
|---|---|
| `index.html` | Continua carregando os arquivos atuais; sem mudança prevista |
| `content.js` | Textos, fórmulas, exemplos, Python e exercícios por ID |
| `app.js` | Cadastro dos seis módulos, simuladores, navegação e objetivos |
| `tokens.css` | Tokens de cor da área Física para temas claro e escuro |
| `styles.css` | Ajustes de apresentação somente se os componentes existentes não forem suficientes |
| `campo/` | Sem alteração na primeira versão |

## 7. Escopo dos simuladores

### 7.1 Vetores
- Entradas: módulo e ângulo; opção de componentes cartesianos.
- Saídas: componentes X/Y, resultante e representação gráfica.
- Validação: módulo da resultante e decomposição trigonométrica.

### 7.2 Leis de Newton
- Entradas: massa e forças aplicadas.
- Saídas: força resultante e aceleração (`a = Fresultante / m`).
- Validação: equilíbrio quando a resultante for zero.

### 7.3 Propulsão e foguetes
- Entradas: massa, empuxo, orientação e duração da queima.
- Saídas: velocidade, aceleração, posição e trajetória.
- Cenários: motor desligado, aceleração, frenagem, inversão e desvio lateral.
- Modelo inicial: dinâmica translacional simplificada, com passo de tempo controlado e unidades explícitas; sem pretensão de simular uma missão orbital real.

### 7.4 Gravidade e órbitas
- Entradas: massa central, posição e velocidade inicial.
- Saídas: força/aceleração gravitacional e trajetória aproximada.
- Validação: comparar casos de queda, escape e órbita estável em condições didáticas.

### 7.5 Manobras e navegação espacial
- Entradas: atitude/orientação, velocidade e pulsos de propulsores.
- Saídas: orientação e variação vetorial da velocidade.
- Separação conceitual obrigatória entre girar a nave e alterar sua trajetória.

### 7.6 Física aplicada à engenharia e agricultura
- Entradas: força, deslocamento, tempo, massa e condições de tração.
- Saídas: trabalho, potência, energia e estimativas de esforço.
- Exemplos: trator, implemento agrícola, bomba e transporte de carga.

## 8. Progresso e compatibilidade

Os novos IDs serão adicionados à ordem de navegação, mas só entrarão no contador de assuntos quando os respectivos módulos forem cadastrados em `MODS`. O progresso continuará usando a infraestrutura existente (`mc-progress`), sem migração de dados. Como os IDs são novos, não há colisão esperada com assuntos já concluídos.

## 9. Situação após a Etapa 3

- Conteúdo didático dos seis capítulos cadastrado em `content.js`.
- Fórmulas, exemplos resolvidos, exercícios com respostas e códigos Python documentados em `docs/fisica-aplicada/conteudo.md`.
- Os seis módulos estão registrados em `app.js` e aparecem na navegação da aplicação.
- A interface apresenta fórmulas, exemplos e exercícios; os laboratórios exibem um aviso temporário até a Etapa 4.
- Campo Vivo permanece sem alterações.
- Publicação no GitHub ou Vercel permanece fora do escopo.

## 10. Critérios de arquitetura

- [ ] Área `Física` mapeada para a chave `fisica`.
- [ ] Seis IDs exclusivos reservados em `ID_ORDER`.
- [ ] Tokens de Física disponíveis em tema claro e escuro.
- [ ] Contrato de integração documentado.
- [ ] Escopo e modelo simplificado dos laboratórios definidos.
- [ ] Nenhuma alteração nos módulos existentes ou no Campo Vivo.


## 11. Critérios de validação do conteúdo

- [x] Seis capítulos cadastrados com os IDs definidos.
- [x] Cada capítulo contém introdução, síntese, explicação, fórmulas, exemplos, exercícios e código Python.
- [x] Respostas e resoluções dos exercícios estão disponíveis em detalhes expansíveis.
- [x] A aplicação mantém os módulos anteriores e a navegação existente.
- [ ] Laboratórios interativos implementados e testados na Etapa 4.


## Atualização — Etapa 4

O módulo `propulsao` agora possui o primeiro laboratório funcional: simulador bidimensional de foguete, com controles de massa, empuxo e direção, visualização de vetores e trajetória, desafios e limpeza de animação ao navegar. Os demais cinco laboratórios permanecem planejados para a etapa de expansão. Consulte `validacao-etapa-4.md` para limites do modelo e roteiro de validação manual.
