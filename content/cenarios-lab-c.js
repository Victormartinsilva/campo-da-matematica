/* Cenários dos laboratórios "Integrais duplas e triplas" (multiplas), "Gradientes e curvas de nível" (gradiente)
   e "A grande ideia do cálculo" (ideia), para os cinco contextos. Carregado depois de cenarios-outros.js.
   Em cada assunto, agro reproduz o comportamento original; os outros contextos mantêm a mesma estrutura matemática.

   multiplas: {dupla, tripla}
     dupla: densidade dens(x, y) = base + amp·e^(−((x − cx)² + (y − cy)²)/(2·s²)), com x e y em % do lado (0 a 100) da região quadrada de lado `lado`.
       legenda (texto sob o mapa), so ("só o pluviômetro"), unico ("o pluviômetro único", usado na reação do guia),
       lado (tamanho real da região, na unidade de comprimento), densU (unidade da densidade), fator (converte densidade × área em total), totU (unidade do total).
     tripla: densidade ρ(z) = rho.r0 + rho.r1·z (rho.u é a unidade); z = valor do controle ÷ z.esc, em unidades do modelo.
       titulo, area (multiplicador da base), totU, cam (palavra para a camada), medr (rótulo da média), meta (valor do controle do desafio), g: {t, win}.
   gradiente: {fl, ex, ey, sup, g2}; sup = 5 itens [tigela, vale estreito, sela, relevo, dois vales] com {nome, t, ex?, ey?}.
     fl = letra da função; ex, ey = rótulos dos eixos; g2 = {t, win} do desafio do relevo (item 3).
   ideia: {termo, g1, g2, sit}; sit = 2 itens [seno, decay], cada um {nome, curva, a, b, xl, ql, Vl, u, ur, tu}.
     curva da taxa q(t) (CURVA seno ou decay); o total é V(t) = F(t) − F(a). g2 = {t, win, k, t0}: instante t0 (na unidade do tempo) da situação k. */

const gradBaseLabC = [
  "Mínimo único no centro. O gradiente aponta para fora; descer leva ao centro em linha reta.",
  "O gradiente não aponta para o mínimo e a descida faz zigue-zague. Suba a taxa até 0,25 e veja a oscilação crescer.",
  "Sobe num eixo e desce no outro. No centro o gradiente é zero, mas não é mínimo.",
  "Cores escuras são os altos. A trilha de descida é o caminho que a água escorre. Onde as faixas ficam juntas, o terreno é mais íngreme.",
  "Quatro mínimos. Para onde a descida vai depende de onde começa, como no treino de redes neurais."
];

CENARIOS.multiplas = {
  agro: {
    dupla: {legenda: "talhão 100 m × 100 m · ponto = pluviômetro", so: "só o pluviômetro", unico: "o pluviômetro único", real: "a chuva real", lado: 100, densU: "mm", fator: 1 / 1000, totU: "m³",
      dens: {base: 5, amp: 20, cx: 30, cy: 65, s: 22}},
    tripla: {titulo: "Integral tripla: massa de solo em 1 ha", rho: {r0: 1.15, r1: 0.5, u: "Mg/m³"}, z: {r: "Profundidade da camada", min: 5, max: 50, step: 1, def: 20, esc: 100, u: "cm"}, area: 10000, totU: "Mg/ha", cam: "camada", medr: "densidade média", meta: 30,
      g: {t: "Escolha uma camada de solo de 30 cm ou mais e veja a massa por hectare.", win: "Quanto mais fundo, mais massa e maior a densidade média."}}
  },
  publico: {
    dupla: {legenda: "bairro 4 km × 4 km · ponto = posto de saúde", so: "só o posto de saúde", unico: "o posto de saúde único", lado: 4, densU: "hab/km²", fator: 1, totU: "habitantes",
      dens: {base: 400, amp: 3600, cx: 35, cy: 60, s: 22}},
    tripla: {titulo: "Integral tripla: moradores em 1 km² verticalizado", rho: {r0: 800, r1: 120, u: "moradores por km² por andar"}, z: {r: "Altura dos prédios", min: 2, max: 20, step: 1, def: 8, esc: 1, u: "andares"}, area: 1, totU: "moradores/km²", cam: "prédios", medr: "densidade média por andar", meta: 15,
      g: {t: "Escolha prédios de 15 andares ou mais e veja os moradores por km².", win: "Quanto mais alto, mais gente e maior a densidade média por andar."}}
  },
  engenharia: {
    dupla: {legenda: "placa 0,5 m × 0,5 m · ponto = sensor de fluxo", so: "só o sensor", unico: "o sensor único", lado: 0.5, densU: "kW/m²", fator: 1, totU: "kW",
      dens: {base: 5, amp: 45, cx: 65, cy: 35, s: 22}},
    tripla: {titulo: "Integral tripla: massa de um bloco de material graduado (base de 1 m²)", rho: {r0: 2300, r1: 150, u: "kg/m³"}, z: {r: "Altura do bloco", min: 10, max: 200, step: 5, def: 100, esc: 100, u: "cm"}, area: 1, totU: "kg", cam: "bloco", medr: "densidade média", meta: 150,
      g: {t: "Escolha um bloco de 150 cm ou mais e veja a massa total.", win: "Quanto mais alto, mais massa e maior a densidade média."}}
  },
  dados: {
    dupla: {legenda: "cidade 20 km × 20 km · ponto = torre de medição", so: "só a torre", unico: "a torre única", lado: 20, densU: "usuários/km²", fator: 1, totU: "usuários ativos",
      dens: {base: 50, amp: 450, cx: 30, cy: 65, s: 22}},
    tripla: {titulo: "Integral tripla: pontos de uma nuvem LiDAR em 1 ha", rho: {r0: 12, r1: 0.4, u: "pontos/m³"}, z: {r: "Altura da coluna", min: 5, max: 50, step: 1, def: 20, esc: 1, u: "m"}, area: 10000, totU: "pontos", cam: "coluna", medr: "densidade média", meta: 30,
      g: {t: "Escolha uma coluna de 30 m ou mais e veja o total de pontos.", win: "Quanto mais alto, mais pontos e maior a densidade média."}}
  },
  negocios: {
    dupla: {legenda: "região de vendas 30 km × 30 km · ponto = loja", so: "só a loja", unico: "a loja única", lado: 30, densU: "mil R$/km² por mês", fator: 1, totU: "mil R$ por mês",
      dens: {base: 2, amp: 18, cx: 30, cy: 65, s: 22}},
    tripla: {titulo: "Integral tripla: unidades empilhadas num armazém de 500 m²", rho: {r0: 120, r1: -8, u: "unidades/m³"}, z: {r: "Altura da pilha", min: 1, max: 12, step: 1, def: 5, esc: 1, u: "m"}, area: 500, totU: "unidades", cam: "pilha", medr: "densidade média", meta: 8,
      g: {t: "Escolha uma pilha de 8 m ou mais e veja as unidades guardadas.", win: "Pilha mais alta guarda mais unidades, mas a densidade média cai porque o alto é mais vazio."}}
  }
};

CENARIOS.gradiente = {
  agro: {fl: "f", ex: "x", ey: "y",
    sup: [
      {nome: "Tigela (perda simples)", t: gradBaseLabC[0]},
      {nome: "Vale estreito (perda mal condicionada)", t: gradBaseLabC[1]},
      {nome: "Sela", t: gradBaseLabC[2]},
      {nome: "Relevo de um talhão (altitude)", t: gradBaseLabC[3]},
      {nome: "Dois vales (Himmelblau)", t: gradBaseLabC[4]}
    ],
    g2: {t: "No relevo do talhão, faça a descida terminar num ponto de gradiente quase zero.", win: "A água parou aqui: é uma baixada do terreno."}},
  publico: {fl: "C", ex: "ajuste na verba de saúde (mi R$)", ey: "ajuste na verba de educação (mi R$)",
    sup: [
      {nome: "Custo social simples (um ótimo de alocação)", t: "Há uma única alocação de menor custo social, no centro. O gradiente aponta para onde o custo cresce; descer leva ao ótimo em linha reta."},
      {nome: "Custo desbalanceado (a educação pesa mais)", t: "Mexer na verba de educação muda o custo bem mais do que mexer na de saúde. O gradiente não aponta para o mínimo e a descida faz zigue-zague. Suba a taxa até 0,25 e veja a oscilação crescer."},
      {nome: "Sela (duas metas em conflito)", t: "O custo sobe num eixo e desce no outro. No centro o gradiente é zero, mas não é o ponto de menor custo."},
      {nome: "Mapa de vulnerabilidade de um município", t: "Cores escuras são as zonas de maior vulnerabilidade. A trilha de descida mostra para onde a vulnerabilidade cai mais depressa. Onde as faixas ficam juntas, o índice muda rápido de um bairro para o outro.", ex: "posição leste-oeste (km)", ey: "posição norte-sul (km)"},
      {nome: "Quatro alocações boas (Himmelblau)", t: "Quatro mínimos. Para onde a descida vai depende da alocação inicial: arranjos diferentes de verba podem ser ótimos locais."}
    ],
    g2: {t: "No mapa de vulnerabilidade, faça a descida terminar num ponto de gradiente quase zero.", win: "A descida parou aqui: é um bolsão de menor vulnerabilidade."}},
  engenharia: {fl: "E", ex: "deslocamento x (mm)", ey: "deslocamento y (mm)",
    sup: [
      {nome: "Energia de um sistema de molas (tigela)", t: "Equilíbrio único no centro. O gradiente da energia é a força com sinal trocado e aponta para fora; descer leva ao equilíbrio em linha reta."},
      {nome: "Molas de rigidez muito diferente (mal condicionado)", t: "A rigidez em y é oito vezes a de x. O gradiente não aponta para o equilíbrio e a descida faz zigue-zague. Suba a taxa até 0,25 e veja a oscilação crescer."},
      {nome: "Sela de energia (equilíbrio instável)", t: "Estável num eixo e instável no outro. No centro o gradiente é zero, mas o equilíbrio não é estável."},
      {nome: "Temperatura numa placa", t: "Cores escuras são as regiões mais quentes. A trilha de descida segue o fluxo de calor, do quente para o frio. Onde as faixas ficam juntas, a temperatura varia depressa.", ex: "posição x na placa (cm)", ey: "posição y na placa (cm)"},
      {nome: "Quatro equilíbrios (Himmelblau)", t: "Quatro mínimos. O equilíbrio atingido depende da posição inicial, como em otimização de projeto com vários ótimos locais."}
    ],
    g2: {t: "Na placa, faça a descida terminar num ponto de gradiente quase zero.", win: "O calor parou de escoar: é um ponto frio local da placa."}},
  dados: {fl: "L", ex: "peso w₁", ey: "peso w₂",
    sup: [
      {nome: "Perda quadrática simples (regressão)", t: "Mínimo único no centro. O gradiente aponta para fora; descer leva ao centro em linha reta."},
      {nome: "Perda mal condicionada (atributos em escalas diferentes)", t: "Os atributos têm escalas muito diferentes: o gradiente não aponta para o mínimo e a descida faz zigue-zague. Suba a taxa até 0,25 e veja a oscilação crescer."},
      {nome: "Sela da perda", t: "Sobe num eixo e desce no outro. No centro o gradiente é zero, mas não é mínimo: é o tipo de ponto que atrasa o treino."},
      {nome: "Paisagem de perda de uma rede pequena", t: "Cores escuras são perdas altas. A trilha é o caminho do gradiente descendente. Onde as faixas ficam juntas, a perda varia rápido."},
      {nome: "Dois vales (Himmelblau)", t: gradBaseLabC[4]}
    ],
    g2: {t: "Na paisagem de perda, faça a descida terminar num ponto de gradiente quase zero.", win: "O treino estacionou: é um mínimo local da perda."}},
  negocios: {fl: "C", ex: "ajuste no preço (R$)", ey: "ajuste no estoque (mil un.)",
    sup: [
      {nome: "Custo simples (um ponto ótimo)", t: "Há uma única combinação de menor custo, no centro. O gradiente aponta para onde o custo cresce; descer leva à melhor combinação em linha reta."},
      {nome: "Custo mal condicionado (o estoque pesa mais)", t: "Mexer no estoque muda o custo bem mais do que mexer no preço. O gradiente não aponta para o mínimo e a descida faz zigue-zague. Suba a taxa até 0,25 e veja a oscilação crescer."},
      {nome: "Sela (dois efeitos opostos)", t: "O custo sobe num eixo e desce no outro. No centro o gradiente é zero, mas não é o mínimo."},
      {nome: "Custo logístico de uma região", t: "Cores escuras são os pontos de maior custo de entrega. A trilha de descida vai para a zona mais barata. Onde as faixas ficam juntas, o custo muda depressa com a distância.", ex: "posição leste-oeste (km)", ey: "posição norte-sul (km)"},
      {nome: "Quatro combinações boas (Himmelblau)", t: "Quatro mínimos. Para onde a descida vai depende da combinação inicial de preço e estoque."}
    ],
    g2: {t: "No mapa de custo logístico, faça a descida terminar num ponto de gradiente quase zero.", win: "O custo parou de cair: é uma zona de entrega mais barata."}}
};

CENARIOS.ideia = {
  agro: {termo: "o volume",
    g1: {t: "Leve o instante até o fim e veja o volume fechar o total.", win: "Fechou: a área até o fim é o volume total."},
    g2: {t: "Na chuva, pare perto de 3 h e compare a área sombreada com a altura do gráfico de baixo.", win: "As duas leituras batem: área em cima, altura embaixo.", k: 1, t0: 3},
    sit: [
      {nome: "Reservatório: vazão e volume", curva: {tipo: "seno", p: {c0: 30, A: 10, w: 1}}, a: 0, b: 10, xl: "tempo (min)", ql: "vazão q(t) em L/min", Vl: "volume acumulado V(t) em L", u: "L", ur: "L/min", tu: "min"},
      {nome: "Chuva: intensidade e acumulado", curva: {tipo: "decay", p: {c0: 12, tau: 2}}, a: 0, b: 6, xl: "tempo (h)", ql: "intensidade i(t) em mm/h", Vl: "chuva acumulada em mm", u: "mm", ur: "mm/h", tu: "h"}
    ]},
  publico: {termo: "o acumulado",
    g1: {t: "Leve o instante até o fim e veja o acumulado fechar o total.", win: "Fechou: a área até o fim é o total de pacientes."},
    g2: {t: "No surto, pare perto de 3 semanas e compare a área sombreada com a altura do gráfico de baixo.", win: "As duas leituras batem: área em cima, altura embaixo.", k: 1, t0: 3},
    sit: [
      {nome: "Pronto-socorro: chegadas e pacientes acumulados", curva: {tipo: "seno", p: {c0: 30, A: 10, w: 1}}, a: 0, b: 10, xl: "tempo (h)", ql: "chegadas q(t) em pacientes/h", Vl: "pacientes acumulados V(t)", u: "pacientes", ur: "pacientes/h", tu: "h"},
      {nome: "Surto controlado: casos novos e acumulado", curva: {tipo: "decay", p: {c0: 60, tau: 2}}, a: 0, b: 6, xl: "tempo (semanas)", ql: "casos novos c(t) em casos/semana", Vl: "casos acumulados", u: "casos", ur: "casos/semana", tu: "sem"}
    ]},
  engenharia: {termo: "a energia",
    g1: {t: "Leve o instante até o fim e veja a energia fechar o total.", win: "Fechou: a área até o fim é a energia total."},
    g2: {t: "Na descarga, pare perto de 3 s e compare a área sombreada com a altura do gráfico de baixo.", win: "As duas leituras batem: área em cima, altura embaixo.", k: 1, t0: 3},
    sit: [
      {nome: "Motor: potência e energia consumida", curva: {tipo: "seno", p: {c0: 30, A: 10, w: 1}}, a: 0, b: 10, xl: "tempo (s)", ql: "potência P(t) em kW", Vl: "energia acumulada E(t) em kJ", u: "kJ", ur: "kW", tu: "s"},
      {nome: "Descarga de capacitor: corrente e carga", curva: {tipo: "decay", p: {c0: 12, tau: 2}}, a: 0, b: 6, xl: "tempo (s)", ql: "corrente I(t) em mA", Vl: "carga transferida Q(t) em mC", u: "mC", ur: "mA", tu: "s"}
    ]},
  dados: {termo: "o acumulado",
    g1: {t: "Leve o instante até o fim e veja o acumulado fechar o total.", win: "Fechou: a área até o fim é o total de requisições."},
    g2: {t: "Na fila, pare perto de 3 h e compare a área sombreada com a altura do gráfico de baixo.", win: "As duas leituras batem: área em cima, altura embaixo.", k: 1, t0: 3},
    sit: [
      {nome: "Servidor: requisições por minuto e total", curva: {tipo: "seno", p: {c0: 30, A: 10, w: 1}}, a: 0, b: 10, xl: "tempo (min)", ql: "tráfego q(t) em mil req/min", Vl: "requisições acumuladas V(t) em mil", u: "mil req", ur: "mil req/min", tu: "min"},
      {nome: "Fila de processamento: vazão e tarefas concluídas", curva: {tipo: "decay", p: {c0: 12, tau: 2}}, a: 0, b: 6, xl: "tempo (h)", ql: "vazão r(t) em mil tarefas/h", Vl: "tarefas concluídas em mil", u: "mil tarefas", ur: "mil tarefas/h", tu: "h"}
    ]},
  negocios: {termo: "o acumulado",
    g1: {t: "Leve o instante até o fim e veja o acumulado fechar o total.", win: "Fechou: a área até o fim é a venda total do dia."},
    g2: {t: "Na campanha, pare perto de 3 dias e compare a área sombreada com a altura do gráfico de baixo.", win: "As duas leituras batem: área em cima, altura embaixo.", k: 1, t0: 3},
    sit: [
      {nome: "Loja: vendas por hora e total do dia", curva: {tipo: "seno", p: {c0: 30, A: 10, w: 1}}, a: 0, b: 10, xl: "tempo (h)", ql: "vendas v(t) em mil R$/h", Vl: "vendas acumuladas V(t) em mil R$", u: "mil R$", ur: "mil R$/h", tu: "h"},
      {nome: "Campanha: pedidos por dia e acumulado", curva: {tipo: "decay", p: {c0: 120, tau: 2}}, a: 0, b: 6, xl: "tempo (dias)", ql: "pedidos p(t) em pedidos/dia", Vl: "pedidos acumulados", u: "pedidos", ur: "pedidos/dia", tu: "dias"}
    ]}
};
