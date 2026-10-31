# Esquema do mini-vídeo explicativo

Um mini-vídeo é um roteiro em JavaScript (sem arquivo de vídeo) tocado pelo `ExplainerPlayer`.
Cada assunto tem dois arquivos: o **roteiro** (`content/explainers/<id>.js`) e a **cena SVG** (`explainer/cenas/<id>-cena.js`).

```js
window.Explainers = window.Explainers || {};
Explainers.taylor = { meta, pieces, outro };
window.Cenas = window.Cenas || {};
Cenas.taylor = { viewBox, svg, ocultos };
```

## Roteiro

```js
meta: { id: "taylor", categoria: "CÁLCULO", area: "calculo", titulo: "Séries de Taylor", duracao: 78, cena: "taylor" },
pieces: [{
  id: "tangente", ordem: 1,
  narration: "Perto do ponto, a reta já serve.",
  words: [{t: "Perto", s: 0.2, e: 0.55, hl: false}, {t: "reta", s: 1.6, e: 1.95, hl: true}],   // segundos desde o INÍCIO DA PEÇA
  dur: 7.5,                                                    // duração da peça: último e + 1,2 s de folga
  terminal: {cmd: "P1 = f(a) + f'(a)·(x − a)", at: 0.4, dur: 2.2},   // digitado no cartão de terminal
  status: {tipo: "ok", texto: "ERRO BAIXO: A RETA SERVE", at: 4.0},   // tipo: ok | alerta | erro (opcional)
  scene: [{at: 0.3, acao: "aparecer", alvo: "estaca", dur: 0.8}],     // ações visuais (ver abaixo)
  why: "A tangente é a melhor aproximação em linha reta.",          // nota "por que esta peça importa", mostrada no fim da peça
  example: {titulo: "No dia a dia", texto: "..."}                  // opcional
}],
outro: { dur: 10, narration: "...", words: [...], scene: [...], cta: "Agora mexa no laboratório", alvoLab: ".lab",
         terminal: {cmd: "import sympy as sp\n...", at: 1, dur: 5} }
```

Regras dos tempos das palavras (narração em português, ritmo de ~2,5 palavras por segundo):
- cada palavra dura cerca de 0,3 a 0,5 s (mais longa se tiver mais sílabas);
- depois de vírgula some 0,2 s de pausa, depois de ponto some 0,4 s;
- a primeira palavra começa em `s >= 0.2`;
- `hl: true` marca os termos-chave (poucos por peça, no máximo 3 a 4);
- `dur` da peça = `e` da última palavra + 1,2 s;
- a soma de `dur` de todas as peças mais o `outro.dur` deve ficar entre 60 e 90 s.

## Ações de cena

Toda ação tem `at` (segundos desde o início da peça), `acao`, `alvo` (id de um elemento do SVG da cena) e `dur`.

| acao | efeito | campos extras |
| --- | --- | --- |
| `aparecer` | o elemento surge com fade e uma pequena escala | `de` (opcional): `{y: 12}` desloca de onde vem |
| `sumir` | o elemento some com fade | |
| `mover` | translada o elemento (valores absolutos em unidades do viewBox, relativos à posição original) | `para: {x, y}` |
| `destacar` | pulso de escala e brilho para chamar atenção | `vezes` (padrão 2) |
| `desenhar` | desenha o traço do alvo (path) do começo ao fim | |
| `cor` | troca a cor de preenchimento e/ou traço | `para: {fill, stroke}` com nomes de tokens, por exemplo `"--leaf"`, `"--terra"` |
| `dimensionar` | escala o elemento a partir do centro dele | `sx`, `sy` (padrão 1) |
| `zoom` | move a câmera (viewBox) | `cx`, `cy`, `escala` (1 = tudo; 2 = metade da largura) |

Exemplo: `{at: 2.0, acao: "mover", alvo: "sensor", dur: 2.5, para: {x: 260, y: 0}}`.

## Cena SVG

```js
Cenas.taylor = {
  viewBox: "0 0 800 450",
  svg: `<g id="ceu">...</g><g id="relevo">...</g> ...`,   // todos os elementos animáveis são <g id="..."> ou <path id="...">
  ocultos: ["estaca", "bambu"]                          // ids que começam invisíveis (opacity 0)
};
```

- Horizontal em todos os tamanhos: no celular o palco é cortado ao centro (`slice`). Mantenha tudo importante dentro da faixa central `x` de 200 a 600.
- Use só variáveis de cor do projeto em `fill` e `stroke`: `var(--ink)`, `var(--paper)`, `var(--card)`, `var(--leaf)`, `var(--wheat)`, `var(--terra)`, `var(--water)`, `var(--soil)`, `var(--a-calculo-fill)`, `var(--a-calculo-ink)`, `var(--edge)`. Nada de cores fixas.
- Estilo do projeto: traço manual, cantos irregulares, `stroke-linecap: round`, `stroke-width` de 3 a 5 nos traços principais.
- Elementos que serão desenhados com `desenhar` precisam ser `<path>` com `pathLength="1"`.
- Elementos que serão movidos ou escalados não devem ter `transform` próprio no próprio elemento (envolva em um `<g id>` externo).

## Ids da cena do piloto (Séries de Taylor)

O roteiro usa só estes ids, e a cena precisa trazer todos:

| id | o que é | começa |
| --- | --- | --- |
| `ceu`, `chao` | cenário fixo (céu e faixa de terra do fundo) | visível |
| `relevo` | a função real: o perfil de um terreno ondulado, um `path` com `pathLength="1"` | oculto |
| `bandeira` | bandeirinha vermelha no ponto de operação, o centro (x = 400) | oculto |
| `estaca` | ordem 1: estaca de madeira reta encostada no relevo no centro (tangente) | oculto |
| `bambu` | ordem 2: vara de bambu dobrada seguindo a curvatura (parábola) | oculto |
| `arame` | ordem 3: arame ondulado que ajusta a cauda | oculto |
| `arame4` | ordens mais altas: curva que cola no relevo por uma faixa ainda maior | oculto |
| `faixa` | região verde translúcida ao redor do centro (faixa de boa aproximação), um retângulo centrado em x = 400, largura base 90 | oculto |
| `sensor` | carrinho-sensor sobre rodas, o ponto de teste, parado perto do centro (x = 470) | oculto |
| `erro` | marca vertical vermelha entre o relevo e a aproximação na posição final do sensor | oculto |
| `palha` | o espantalho guia (Seu Palha), no canto inferior esquerdo | visível |
| `calc` | calculadora desenhada à mão (exemplo do dia a dia) | oculto |
| `bola` | bolinha sobre um trecho de relevo inclinado (gradiente descendente, exemplo do trabalho) | oculto |
| `seta-descida` | seta curva mostrando a bola descendo contra o gradiente | oculto |

O guia (`palha`) precisa de pelo menos dois grupos internos animáveis: `palha-braco` (o braço que aponta) e `palha-chapeu`.
