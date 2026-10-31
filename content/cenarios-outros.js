/* Cenários dos laboratórios para os contextos publico, engenharia, dados e negocios.
   Carregado depois de cenarios.js: acrescenta chaves aos quatro assuntos, com a mesma forma matemática de agro
   (mesmos tipos de curva, na mesma ordem). O contrato dos campos está no comentário de cenarios.js. */

Object.assign(CENARIOS.funcao, {
  publico: [
    {nome: "Posto de saúde: espera por fila (linear)", curva: {tipo: "linear", p: {c0: 15, c1: 4}}, a: 0, b: 40, xu: "pessoas", yu: "min", xl: "pessoas na fila", yl: "espera (min)", simb: ["T", "n"], meta: 90},
    {nome: "Vacinação: cobertura por investimento (quadrática)", curva: {tipo: "quad", p: {c0: 40, c1: 0.30, c2: 0.0006}}, a: 0, b: 400, xu: "mil R$", yu: "%", xl: "investimento na campanha (mil R$)", yl: "cobertura vacinal (%)", simb: ["C", "x"], meta: 74},
    {nome: "Surto: casos por dia (exponencial)", curva: {tipo: "exp", p: {c0: 20, k: 0.18}}, a: 0, b: 21, xu: "dias", yu: "casos", xl: "tempo (dias)", yl: "casos por dia", simb: ["N", "t"]}
  ],
  engenharia: [
    {nome: "Mola: comprimento por carga (linear)", curva: {tipo: "linear", p: {c0: 120, c1: 0.5}}, a: 0, b: 200, xu: "N", yu: "mm", xl: "carga (N)", yl: "comprimento (mm)", simb: ["L", "F"], meta: 180},
    {nome: "Isolamento: economia de energia (quadrática)", curva: {tipo: "quad", p: {c0: 10, c1: 2.0, c2: 0.04}}, a: 0, b: 50, xu: "cm", yu: "%", xl: "espessura do isolante (cm)", yl: "economia líquida de energia (%)", simb: ["E", "e"], meta: 33.5},
    {nome: "Fadiga: comprimento da trinca (exponencial)", curva: {tipo: "exp", p: {c0: 0.2, k: 0.5}}, a: 0, b: 10, xu: "mil ciclos", yu: "mm", xl: "ciclos de carga (mil)", yl: "comprimento da trinca (mm)", simb: ["a", "N"]}
  ],
  dados: [
    {nome: "Nuvem: custo mensal por armazenamento (linear)", curva: {tipo: "linear", p: {c0: 50, c1: 23}}, a: 0, b: 100, xu: "TB", yu: "US$", xl: "armazenamento (TB)", yl: "custo mensal (US$)", simb: ["C", "x"], meta: 1200},
    {nome: "Treino: acurácia por horas (quadrática)", curva: {tipo: "quad", p: {c0: 70, c1: 1.2, c2: 0.024}}, a: 0, b: 40, xu: "h", yu: "%", xl: "horas de treino (h)", yl: "acurácia na validação (%)", simb: ["A", "t"], meta: 83},
    {nome: "API: requisições por minuto (exponencial)", curva: {tipo: "exp", p: {c0: 200, k: 0.12}}, a: 0, b: 30, xu: "dias", yu: "req/min", xl: "tempo (dias)", yl: "requisições por minuto", simb: ["R", "t"]}
  ],
  negocios: [
    {nome: "Gráfica: custo por unidades produzidas (linear)", curva: {tipo: "linear", p: {c0: 5000, c1: 12}}, a: 0, b: 1000, xu: "un", yu: "R$", xl: "unidades produzidas", yl: "custo total (R$)", simb: ["C", "q"], meta: 12000},
    {nome: "Anúncios: vendas por gasto (quadrática)", curva: {tipo: "quad", p: {c0: 200, c1: 0.8, c2: 0.0008}}, a: 0, b: 1000, xu: "R$", yu: "un/semana", xl: "gasto em anúncios (R$/semana)", yl: "vendas (un/semana)", simb: ["V", "g"], meta: 380},
    {nome: "Adoção de produto: usuários (exponencial)", curva: {tipo: "exp", p: {c0: 100, k: 0.15}}, a: 0, b: 24, xu: "meses", yu: "usuários", xl: "tempo (meses)", yl: "usuários ativos", simb: ["U", "t"]}
  ]
});

Object.assign(CENARIOS.derivada, {
  publico: [
    {nome: "Atendimentos × número de atendentes", curva: {tipo: "quad", p: {c0: 20, c1: 6, c2: 0.2}}, a: 0, b: 30, xu: "atendentes", yu: "atend./dia", x0: 8},
    {nome: "Cobertura de saneamento × anos", curva: {tipo: "logistica", p: {L: 100, k: 0.3, x0: 12}}, a: 0, b: 24, xu: "ano", yu: "% da população", x0: 12},
    {nome: "sen(x) (o clássico)", curva: {tipo: "seno", p: {c0: 0, A: 1, w: 1}}, a: -6.28, b: 6.28, xu: "", yu: "", x0: 0}
  ],
  engenharia: [
    {nome: "Rendimento do motor × carga", curva: {tipo: "quad", p: {c0: 20, c1: 1.6, c2: 0.016}}, a: 0, b: 100, xu: "% da carga", yu: "% de rendimento", x0: 30},
    {nome: "Tanque aquecido: temperatura × tempo", curva: {tipo: "logistica", p: {L: 80, k: 0.15, x0: 30}}, a: 0, b: 60, xu: "min", yu: "°C", x0: 30},
    {nome: "sen(x) (o clássico)", curva: {tipo: "seno", p: {c0: 0, A: 1, w: 1}}, a: -6.28, b: 6.28, xu: "", yu: "", x0: 0}
  ],
  dados: [
    {nome: "RAG: qualidade × tamanho do chunk", curva: {tipo: "quad", p: {c0: 40, c1: 0.2, c2: 0.0002}}, a: 0, b: 1000, xu: "tokens", yu: "pontos", x0: 200},
    {nome: "Adoção de uma API × dias", curva: {tipo: "logistica", p: {L: 5000, k: 0.2, x0: 30}}, a: 0, b: 60, xu: "dia", yu: "usuários", x0: 30},
    {nome: "sen(x) (o clássico)", curva: {tipo: "seno", p: {c0: 0, A: 1, w: 1}}, a: -6.28, b: 6.28, xu: "", yu: "", x0: 0}
  ],
  negocios: [
    {nome: "Receita semanal × preço", curva: {tipo: "quad", p: {c0: 0, c1: 400, c2: 4}}, a: 0, b: 100, xu: "R$", yu: "R$/semana", x0: 20},
    {nome: "Clientes do produto × meses", curva: {tipo: "logistica", p: {L: 10000, k: 0.35, x0: 12}}, a: 0, b: 24, xu: "mês", yu: "clientes", x0: 12},
    {nome: "sen(x) (o clássico)", curva: {tipo: "seno", p: {c0: 0, A: 1, w: 1}}, a: -6.28, b: 6.28, xu: "", yu: "", x0: 0}
  ]
});

Object.assign(CENARIOS.integral, {
  publico: [
    {nome: "Pronto-socorro: chegadas após um evento (pacientes/h) em 8 h", curva: {tipo: "decay", p: {c0: 30, tau: 2}}, a: 0, b: 8, xl: "tempo (h)", yl: "pacientes/h", u: "pacientes"},
    {nome: "Fila de atendimento: chegadas (pessoas/h) em 12 h", curva: {tipo: "seno", p: {c0: 40, A: 15, w: 0.52}}, a: 0, b: 12, xl: "tempo (h)", yl: "pessoas/h", u: "pessoas"}
  ],
  engenharia: [
    {nome: "Drenagem urbana: intensidade da chuva (mm/h) em 3 h", curva: {tipo: "decay", p: {c0: 60, tau: 0.8}}, a: 0, b: 3, xl: "tempo (h)", yl: "mm/h", u: "mm"},
    {nome: "Motor: potência pulsante (kW) em 10 s", curva: {tipo: "seno", p: {c0: 20, A: 5, w: 1.2}}, a: 0, b: 10, xl: "tempo (s)", yl: "kW", u: "kJ"}
  ],
  dados: [
    {nome: "Pico de acessos: requisições por segundo em 60 s", curva: {tipo: "decay", p: {c0: 800, tau: 15}}, a: 0, b: 60, xl: "tempo (s)", yl: "req/s", u: "requisições"},
    {nome: "Uso de API: requisições por minuto em 60 min", curva: {tipo: "seno", p: {c0: 300, A: 120, w: 0.105}}, a: 0, b: 60, xl: "tempo (min)", yl: "req/min", u: "requisições"}
  ],
  negocios: [
    {nome: "Lançamento: vendas por dia (un/dia) em 21 dias", curva: {tipo: "decay", p: {c0: 200, tau: 5}}, a: 0, b: 21, xl: "tempo (dias)", yl: "un/dia", u: "unidades"},
    {nome: "Receita sazonal (R$ mil/mês) em 12 meses", curva: {tipo: "seno", p: {c0: 80, A: 20, w: 0.52}}, a: 0, b: 12, xl: "tempo (meses)", yl: "R$ mil/mês", u: "R$ mil"}
  ]
});

Object.assign(CENARIOS.maxmin, {
  publico: {resp: {c0: 100, c1: 25, c2: 0.5}, xmax: 40, x0ini: 5, xu: "agentes", yu: "famílias/semana", xl: "equipe (agentes de saúde)", yl: "benefício líquido (R$/semana)", ent: "equipe", sub: "agentes de saúde", testada: "Equipe testada",
    preco: {r: "Benefício por família atendida", min: 40, max: 200, def: 100, step: 5, un: "R$ / família"}, custo: {r: "Custo de cada agente", min: 500, max: 3000, def: 1500, step: 100, un: "R$ / semana"}, precoAlto: 180},
  engenharia: {resp: {c0: 200, c1: 150, c2: 2.5}, xmax: 50, x0ini: 5, xu: "cm", yu: "kWh/ano", xl: "espessura do isolante (cm)", yl: "benefício líquido (R$/ano)", ent: "espessura", sub: "cm de isolamento", testada: "Espessura testada",
    preco: {r: "Preço da energia", min: 0.4, max: 1.6, def: 0.9, step: 0.05, un: "R$ / kWh"}, custo: {r: "Custo do isolante", min: 20, max: 120, def: 60, step: 5, un: "R$ / cm / ano"}, precoAlto: 1.5},
  dados: {resp: {c0: 10, c1: 6, c2: 0.1}, xmax: 50, x0ini: 5, xu: "GPUs", yu: "mil req/h", xl: "capacidade (GPUs reservadas)", yl: "lucro líquido (R$/h)", ent: "capacidade", sub: "GPUs reservadas", testada: "Capacidade testada",
    preco: {r: "Receita por mil requisições", min: 20, max: 200, def: 80, step: 5, un: "R$ / mil req."}, custo: {r: "Custo de cada GPU", min: 40, max: 400, def: 200, step: 10, un: "R$ / h"}, precoAlto: 160},
  negocios: {resp: {c0: 100, c1: 12, c2: 0.08}, xmax: 120, x0ini: 10, xu: "inserções", yu: "un/semana", xl: "veiculação (inserções por semana)", yl: "lucro líquido (R$/semana)", ent: "veiculação", sub: "inserções por semana", testada: "Veiculação testada",
    preco: {r: "Margem por unidade vendida", min: 8, max: 40, def: 15, step: 1, un: "R$ / unidade"}, custo: {r: "Custo de cada inserção", min: 30, max: 150, def: 80, step: 5, un: "R$ / inserção"}, precoAlto: 35}
});
