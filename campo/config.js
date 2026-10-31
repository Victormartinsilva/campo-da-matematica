/* Configuração do Campo Vivo. Ajuste aqui as espécies, os biomas e os pesos de crescimento.
   A lógica fica em estado.js, lsystem.js, cena.js e campo.js. */
const CAMPO_CONFIG = {
  schema: 1,
  chave: "mc-campo",

  /* protótipo: só estes assuntos plantam. Para ligar os outros, acrescente os ids aqui. */
  assuntosAtivos: ["taylor", "regressao"],

  /* espécie de cada área da matemática */
  areaEspecie: {calculo: "arvore", ml: "arbusto"},

  /* L-System: axiom é o começo, regras reescrevem cada letra a cada estágio.
     F = andar e desenhar, + e - = girar, [ e ] = abrir e fechar um galho, X = ponta que só cresce.
     iteracoes é o estágio máximo. folha: "pontas" põe folhas no fim de cada galho, "X" põe folhas nos X. */
  especies: {
    arvore: {
      nome: "Árvore", bioma: "pomar", altura: [16, 150], cores: {tronco: "--soil", folha: "--a-calculo-fill"},
      descricao: "ramifica em três a cada estágio e vira uma copa cheia",
      lsystem: {axiom: "F", regras: {F: "FF-[-F+F+F]+[+F-F-F]"}, angulo: 22.5, iteracoes: 4, folha: "pontas"}
    },
    arbusto: {
      nome: "Arbusto ramificado", bioma: "horta", altura: [14, 100], cores: {tronco: "--soil", folha: "--a-ml-fill"},
      descricao: "abre galhos laterais cada vez mais finos",
      lsystem: {axiom: "F", regras: {F: "F[+F]F[-F]F"}, angulo: 25.7, iteracoes: 4, folha: "pontas"}
    },
    capim: {
      nome: "Capim de cobertura", bioma: "horta", altura: [10, 70], cores: {tronco: "--leaf", folha: "--a-estatistica-fill"},
      descricao: "nasce sozinho quando o solo está vivo, e faz o campo ter mais espécies",
      lsystem: {axiom: "X", regras: {X: "F-[[X]+X]+F[+FX]-X", F: "FF"}, angulo: 22.5, iteracoes: 4, folha: "X"}
    }
  },

  /* biomas: desbloqueio nulo é liberado desde o início; senão, é preciso concluir todos os assuntos listados */
  biomas: {
    horta: {nome: "Horta", desbloqueio: null, descricao: "canteiros para arbustos e capim"},
    pomar: {nome: "Pomar", desbloqueio: {assuntos: ["taylor"]}, descricao: "fileiras de árvores"},
    mata: {nome: "Mata ciliar", desbloqueio: {assuntos: ["taylor", "regressao"]}, descricao: "uma beira de riacho cheia de vida"}
  },

  /* crescimento: o estágio é a parte inteira de "crescimento" */
  crescimento: {
    tempo: 0.04,             // estágios por hora para uma planta bem regada em solo comum
    rega: 0.4,               // estágios ganhos ao mexer num laboratório (uma vez por dia por assunto)
    adubo: 0.7,              // estágios ganhos ao cumprir um desafio ou copiar o código (copiar: uma vez por dia)
    solo: 1,                 // quanto a fertilidade acelera o tempo: fator = 1 + solo × fertilidade/100
    fertilidadePorDia: 12,   // pontos de fertilidade por dia seguido de estudo, até 100
    aguaDuraHoras: 24,       // tempo para a água zerar
    adubaDuraHoras: 72,      // tempo para o adubo zerar
    offlineMaxHoras: 24,     // teto do tempo contado desde a última visita
    capimPorDias: 2,         // a cada N dias seguidos nasce mais um capim em cada bioma liberado
    capimMax: 4              // máximo de capins por bioma
  }
};
