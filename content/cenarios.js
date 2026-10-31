/* Cenários dos laboratórios por contexto.
   Cada laboratório lê CENARIOS[assunto][contexto]. Contextos de laboratório: agro, publico, engenharia, dados, negocios.
   "todos" usa agro e "dia" usa negocios. Falta de um contexto cai em agro.

   curva = {tipo, p}, onde y é a saída e x a entrada:
     linear     y = c0 + c1·x                    p: {c0, c1}
     quad       y = c0 + c1·x − c2·x²            p: {c0, c1, c2}     (sobe e depois cai: c1, c2 > 0)
     exp        y = c0·e^(k·x)                   p: {c0, k}
     logistica  y = L / (1 + e^(−k·(x − x0)))    p: {L, k, x0}
     decay      y = c0·e^(−x/tau)                p: {c0, tau}
     seno       y = c0 + A·sen(w·x)              p: {c0, A, w}

   funcao: lista de 3 itens [linear, quad, exp]. Cada item: {nome, curva, a, b, xu, yu, xl, yl, simb: [saída, entrada], meta?}
     item 0 (linear): meta = valor que a saída deve ficar ABAIXO (alcançável dentro de [a, b]);
     item 1 (quad): meta = valor que a saída deve ULTRAPASSAR (um pouco abaixo do pico, que fica dentro de [a, b]).
   derivada: lista de 3 itens [quad, logistica, seno]. Cada item: {nome, curva, a, b, xu, yu, x0}. x0 é o ponto inicial.
     No item de logística, x0 deve ser o p.x0 da curva (onde a taxa é máxima).
   integral: lista de 2 itens [decay, seno]. Cada item: {nome, curva, a, b, xl, yl, u}. u é a unidade do total (área).
   maxmin: objeto {resp: {c0, c1, c2}, xmax, x0ini, xu, yu, xl, yl, ent, sub, testada, preco, custo, precoAlto}
     resposta y = c0 + c1·x − c2·x² (pico dentro de [0, xmax]); lucro L(x) = preço·y − custo·x.
     ent = como chamar a entrada ("dose"), sub = unidade da entrada ("kg de N/ha"), testada = rótulo do controle ("Dose testada").
     preco e custo: {r: rótulo, min, max, def, step, un}; precoAlto = valor de preço acima do qual o desafio "suba o preço" vale.
     Com preco.def e custo.def, o ótimo x* = (c1 − custo/preço)/(2·c2) deve ficar entre 10% e 90% de xmax. */
const CURVA = (() => {
  const nb = v => String(+Number(v).toFixed(5)).replace(".", ",");
  const T = {
    linear: p => ({f: x => p.c0 + p.c1 * x, df: () => p.c1, F: x => p.c0 * x + p.c1 * x * x / 2, eq: (y, x) => `${y}(${x}) = ${nb(p.c0)} + ${nb(p.c1)}·${x}`}),
    quad: p => ({f: x => p.c0 + p.c1 * x - p.c2 * x * x, df: x => p.c1 - 2 * p.c2 * x, F: x => p.c0 * x + p.c1 * x * x / 2 - p.c2 * x ** 3 / 3, eq: (y, x) => `${y}(${x}) = ${nb(p.c0)} + ${nb(p.c1)}·${x} − ${nb(p.c2)}·${x}²`}),
    exp: p => ({f: x => p.c0 * Math.exp(p.k * x), df: x => p.c0 * p.k * Math.exp(p.k * x), F: x => p.c0 / p.k * Math.exp(p.k * x), eq: (y, x) => `${y}(${x}) = ${nb(p.c0)}·e^(${nb(p.k)}·${x})`}),
    logistica: p => ({f: x => p.L / (1 + Math.exp(-p.k * (x - p.x0))), df: x => { const e = Math.exp(-p.k * (x - p.x0)); return p.L * p.k * e / ((1 + e) ** 2); }, F: x => p.L / p.k * Math.log(1 + Math.exp(p.k * (x - p.x0))), eq: (y, x) => `${y}(${x}) = ${nb(p.L)} / (1 + e^(−${nb(p.k)}·(${x} − ${nb(p.x0)})))`}),
    decay: p => ({f: x => p.c0 * Math.exp(-x / p.tau), df: x => -p.c0 / p.tau * Math.exp(-x / p.tau), F: x => -p.c0 * p.tau * Math.exp(-x / p.tau), eq: (y, x) => `${y}(${x}) = ${nb(p.c0)}·e^(−${x}/${nb(p.tau)})`}),
    seno: p => ({f: x => p.c0 + p.A * Math.sin(p.w * x), df: x => p.A * p.w * Math.cos(p.w * x), F: x => p.c0 * x - p.A / p.w * Math.cos(p.w * x), eq: (y, x) => `${y}(${x}) = ${nb(p.c0)} + ${nb(p.A)}·sen(${nb(p.w)}·${x})`})
  };
  return c => T[c.tipo](c.p);
})();

const CENARIOS = {
  funcao: {
    agro: [
      {nome: "Frete: custo por distância (linear)", curva: {tipo: "linear", p: {c0: 120, c1: 3.5}}, a: 0, b: 200, xu: "km", yu: "R$", xl: "distância (km)", yl: "custo (R$)", simb: ["C", "x"], meta: 300},
      {nome: "Adubação: produtividade (quadrática)", curva: {tipo: "quad", p: {c0: 80, c1: 0.30, c2: 0.0009}}, a: 0, b: 300, xu: "kg N/ha", yu: "sc/ha", xl: "dose de N (kg/ha)", yl: "produtividade (sc/ha)", simb: ["y", "x"], meta: 104},
      {nome: "Praga: população (exponencial)", curva: {tipo: "exp", p: {c0: 50, k: 0.22}}, a: 0, b: 14, xu: "dias", yu: "indivíduos", xl: "tempo (dias)", yl: "população", simb: ["N", "t"]}
    ]
  },
  derivada: {
    agro: [
      {nome: "Produtividade × adubo", curva: {tipo: "quad", p: {c0: 80, c1: 0.30, c2: 0.0009}}, a: 0, b: 300, xu: "kg N/ha", yu: "sc/ha", x0: 100},
      {nome: "Altura da planta × dias", curva: {tipo: "logistica", p: {L: 200, k: 0.25, x0: 20}}, a: 0, b: 40, xu: "dia", yu: "cm", x0: 20},
      {nome: "sen(x) (o clássico)", curva: {tipo: "seno", p: {c0: 0, A: 1, w: 1}}, a: -6.28, b: 6.28, xu: "", yu: "", x0: 0}
    ]
  },
  integral: {
    agro: [
      {nome: "Chuva: intensidade (mm/h) em 6 h", curva: {tipo: "decay", p: {c0: 12, tau: 2}}, a: 0, b: 6, xl: "tempo (h)", yl: "mm/h", u: "mm"},
      {nome: "Irrigação: vazão pulsante (L/min) em 10 min", curva: {tipo: "seno", p: {c0: 30, A: 10, w: 1}}, a: 0, b: 10, xl: "tempo (min)", yl: "L/min", u: "L"}
    ]
  },
  maxmin: {
    agro: {resp: {c0: 80, c1: 0.30, c2: 0.0009}, xmax: 300, x0ini: 40, xu: "kg N/ha", yu: "sc/ha", xl: "dose de N (kg/ha)", yl: "lucro após adubo (R$/ha)", ent: "dose", sub: "kg de N/ha", testada: "Dose testada",
      preco: {r: "Preço do milho", min: 30, max: 120, def: 60, step: 1, un: "R$ / saca"}, custo: {r: "Custo do nitrogênio", min: 2, max: 14, def: 6, step: 0.5, un: "R$ / kg"}, precoAlto: 100}
  }
};

/* cenários do laboratório no contexto escolhido (agro quando o contexto não tem cenário próprio) */
function cenarios(id, contexto) {
  const mapa = {todos: "agro", dia: "negocios"}, c = mapa[contexto] || contexto, S = CENARIOS[id] || {};
  return S[c] || S.agro;
}
