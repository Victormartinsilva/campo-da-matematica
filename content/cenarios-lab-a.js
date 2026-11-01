/* Cenários dos laboratórios "matrizes", "estatistica" e "jogos" por contexto.
   Carregado depois de cenarios-outros.js. Cada assunto tem as chaves agro, publico, engenharia, dados e negocios,
   com a mesma estrutura matemática em todas (agro reproduz o comportamento original). Leitura: cenarios(id, ctxAtual).

   matrizes: sistema A·x = b, 3×3, com a forma [[a, c, 0], [0, d, 0], [0, 0, e]].
     titA, titB = títulos das duas tabelas; cols = os 3 insumos (colunas de A, incógnitas x); linhas = as 3 exigências (linhas de A e de b);
     A0, b0 = valores iniciais; esc = divisor aplicado a A (100 quando A vem em %; 1 quando vem em unidades); passoB = passo dos campos de b;
     xr = título do resultado; un = unidade de cada x; totR, totU = rótulo e unidade do total; sing = explicação da matriz singular;
     g1, g1win = desafio e vitória da matriz singular; meta, g2, g2win = desafio de pedir b[0] ≥ meta com solução viável;
     rSing, rNeg, rOk = reações do guia. Com b[0] = meta e os demais b0, as quantidades continuam todas positivas.
   estatistica: experimento com dois grupos A e B (média base + efeito).
     base, unid, yl = média do grupo A, unidade e rótulo do eixo; rotA, rotB = rótulos dos grupos; sA, sB = nomes curtos;
     lD, lS, lN = rótulos dos três controles; d = {max, step, def}, s = {min, max, step, def}, n = {min, max, def}; dec = casas dos valores;
     metaD = efeito real que o desafio pede (alcançável com o desvio mínimo); metaN = repetições pedidas; unN = o que se repete;
     poucas = reação para amostra pequena.
   jogos: sit (rótulo do seletor), jogos = lista de 3 situações {nome, L, C, P, t} (mesmas matrizes de ganhos em todos os contextos),
     g1 (visitar as três) e g2 (dois equilíbrios na primeira). */

const _PAY = {
  dilema: [[[5, 5], [1, 7]], [[7, 1], [3, 3]]],
  coord: [[[4, 4], [0, 0]], [[0, 0], [3, 3]]],
  fiscal: [[[2, -1], [2, 0]], [[-3, 1], [4, -2]]]
};

Object.assign(CENARIOS, {
  matrizes: {
    agro: {
      titA: "A: teor de nutriente (%) em cada produto", titB: "b: meta (kg de nutriente por ha)",
      cols: ["Ureia", "MAP", "KCl"], linhas: ["N", "P₂O₅", "K₂O"], A0: [[45, 11, 0], [0, 52, 0], [0, 0, 60]], b0: [100, 80, 60], esc: 100, passoB: 5,
      xr: "x = A⁻¹·b (kg de produto por ha)", un: "kg", totR: "Total de produto", totU: "kg/ha",
      sing: "Dois produtos entregam os nutrientes na mesma proporção, então a receita não tem solução única. Troque um dos ingredientes.",
      g1: "Torne a matriz singular e veja a receita perder a solução única.", g1win: "Dois produtos iguais: sem inversa, sem receita única.",
      meta: 150, g2: "Peça 150 kg de N ou mais e ainda ache uma receita viável, sem valores negativos.", g2win: "Receita viável com a meta mais alta.",
      rSing: "Matriz singular: não existe inversa.", rNeg: "Valor negativo: essa receita é impossível.", rOk: "A inversa existe: a receita sai direto."
    },
    publico: {
      titA: "A: atendimentos por dia que cada tipo de equipe entrega", titB: "b: meta de atendimentos por dia",
      cols: ["Equipe fixa", "Mutirão", "Campanha escolar"], linhas: ["Consultas", "Vacinas", "Matrículas"], A0: [[12, 4, 0], [0, 20, 0], [0, 0, 15]], b0: [60, 80, 45], esc: 1, passoB: 5,
      xr: "x = A⁻¹·b (equipes necessárias de cada tipo)", un: "equipes", totR: "Total de equipes", totU: "equipes",
      sing: "Dois tipos de equipe entregam os serviços na mesma proporção, então o plano não tem solução única. Troque um dos tipos.",
      g1: "Torne a matriz singular e veja o plano perder a solução única.", g1win: "Duas equipes iguais: sem inversa, sem plano único.",
      meta: 100, g2: "Peça 100 consultas por dia ou mais e ainda ache um plano viável, sem valores negativos.", g2win: "Plano viável com a meta mais alta.",
      rSing: "Matriz singular: não existe inversa.", rNeg: "Valor negativo: esse plano é impossível.", rOk: "A inversa existe: o plano sai direto."
    },
    engenharia: {
      titA: "A: teor do elemento (%) em cada liga", titB: "b: meta (kg de elemento por tonelada)",
      cols: ["Liga A", "Liga B", "Liga C"], linhas: ["Cromo", "Níquel", "Molibdênio"], A0: [[30, 8, 0], [0, 40, 0], [0, 0, 50]], b0: [60, 48, 25], esc: 100, passoB: 5,
      xr: "x = A⁻¹·b (kg de liga por tonelada)", un: "kg", totR: "Total de liga", totU: "kg/t",
      sing: "Duas ligas entregam os elementos na mesma proporção, então a mistura não tem solução única. Troque uma das ligas.",
      g1: "Torne a matriz singular e veja a mistura perder a solução única.", g1win: "Duas ligas iguais: sem inversa, sem mistura única.",
      meta: 100, g2: "Peça 100 kg de cromo por tonelada ou mais e ainda ache uma mistura viável, sem valores negativos.", g2win: "Mistura viável com a meta mais alta.",
      rSing: "Matriz singular: não existe inversa.", rNeg: "Valor negativo: essa mistura é impossível.", rOk: "A inversa existe: a mistura sai direto."
    },
    dados: {
      titA: "A: proporção (%) de cada classe em cada fonte de dados", titB: "b: meta (mil exemplos rotulados por classe)",
      cols: ["Logs de suporte", "Fórum público", "Pesquisa interna"], linhas: ["Elogios", "Reclamações", "Dúvidas"], A0: [[40, 15, 0], [0, 55, 0], [0, 0, 60]], b0: [10, 8, 6], esc: 100, passoB: 1,
      xr: "x = A⁻¹·b (mil registros a coletar de cada fonte)", un: "mil registros", totR: "Total a coletar", totU: "mil registros",
      sing: "Duas fontes entregam as classes na mesma proporção, então o plano de coleta não tem solução única. Troque uma das fontes.",
      g1: "Torne a matriz singular e veja o plano de coleta perder a solução única.", g1win: "Duas fontes iguais: sem inversa, sem plano único.",
      meta: 15, g2: "Peça 15 mil elogios ou mais e ainda ache um plano de coleta viável, sem valores negativos.", g2win: "Plano viável com a meta mais alta.",
      rSing: "Matriz singular: não existe inversa.", rNeg: "Valor negativo: esse plano de coleta é impossível.", rOk: "A inversa existe: o plano de coleta sai direto."
    },
    negocios: {
      titA: "A: horas de cada setor por unidade de produto", titB: "b: horas disponíveis por semana",
      cols: ["Cadeira", "Mesa", "Armário"], linhas: ["Corte", "Montagem", "Pintura"], A0: [[3, 1, 0], [0, 4, 0], [0, 0, 5]], b0: [60, 80, 50], esc: 1, passoB: 5,
      xr: "x = A⁻¹·b (unidades de cada produto por semana)", un: "un", totR: "Total produzido", totU: "un/semana",
      sing: "Dois produtos consomem as horas dos setores na mesma proporção, então o plano de produção não tem solução única. Troque um dos produtos.",
      g1: "Torne a matriz singular e veja o plano perder a solução única.", g1win: "Dois produtos iguais: sem inversa, sem plano único.",
      meta: 100, g2: "Libere 100 horas de corte ou mais e ainda ache um plano viável, sem valores negativos.", g2win: "Plano viável com a meta mais alta.",
      rSing: "Matriz singular: não existe inversa.", rNeg: "Valor negativo: esse plano é impossível.", rOk: "A inversa existe: o plano sai direto."
    }
  },

  estatistica: {
    agro: {
      base: 60, unid: "sc/ha", yl: "produtividade (sc/ha)", rotA: "Cultivar A", rotB: "Cultivar B", sA: "A", sB: "B",
      lD: "Diferença real entre cultivares", lS: "Variação entre parcelas (desvio)", lN: "Repetições por cultivar",
      d: {max: 15, step: 0.5, def: 4}, s: {min: 1, max: 15, step: 0.5, def: 6}, n: {min: 2, max: 20, def: 5}, dec: 1,
      metaD: 3, metaN: 15, unN: "as repetições", poucas: "Poucas repetições: fica difícil separar efeito de acaso."
    },
    publico: {
      base: 60, unid: "pontos", yl: "nota na avaliação de leitura (pontos)", rotA: "Escolas sem o programa", rotB: "Escolas com o programa", sA: "sem programa", sB: "com programa",
      lD: "Efeito real do programa", lS: "Variação entre escolas (desvio)", lN: "Escolas por grupo",
      d: {max: 15, step: 0.5, def: 4}, s: {min: 1, max: 15, step: 0.5, def: 6}, n: {min: 2, max: 20, def: 5}, dec: 1,
      metaD: 3, metaN: 15, unN: "as escolas por grupo", poucas: "Poucas escolas por grupo: fica difícil separar efeito de acaso."
    },
    engenharia: {
      base: 30, unid: "MPa", yl: "resistência à compressão (MPa)", rotA: "Traço A", rotB: "Traço B", sA: "traço A", sB: "traço B",
      lD: "Diferença real entre traços", lS: "Variação entre corpos de prova (desvio)", lN: "Corpos de prova por traço",
      d: {max: 8, step: 0.25, def: 2}, s: {min: 0.5, max: 8, step: 0.25, def: 3}, n: {min: 2, max: 20, def: 5}, dec: 2,
      metaD: 1.5, metaN: 15, unN: "os corpos de prova por traço", poucas: "Poucos corpos de prova: fica difícil separar efeito de acaso."
    },
    dados: {
      base: 70, unid: "p.p.", yl: "acurácia na validação (%)", rotA: "Modelo A", rotB: "Modelo B", sA: "modelo A", sB: "modelo B",
      lD: "Diferença real entre modelos", lS: "Variação entre execuções (desvio)", lN: "Execuções por modelo",
      d: {max: 6, step: 0.25, def: 1.5}, s: {min: 0.5, max: 6, step: 0.25, def: 2}, n: {min: 2, max: 20, def: 5}, dec: 2,
      metaD: 1, metaN: 15, unN: "as execuções por modelo", poucas: "Poucas execuções: fica difícil separar efeito de acaso."
    },
    negocios: {
      base: 100, unid: "R$", yl: "ticket médio por loja (R$)", rotA: "Vitrine A", rotB: "Vitrine B", sA: "vitrine A", sB: "vitrine B",
      lD: "Diferença real entre vitrines", lS: "Variação entre lojas (desvio)", lN: "Lojas por vitrine",
      d: {max: 30, step: 1, def: 8}, s: {min: 2, max: 30, step: 1, def: 12}, n: {min: 2, max: 20, def: 5}, dec: 1,
      metaD: 6, metaN: 15, unN: "as lojas por vitrine", poucas: "Poucas lojas: fica difícil separar efeito de acaso."
    }
  },

  jogos: {
    agro: {
      sit: "Situação",
      jogos: [
        {nome: "Cooperativas: dilema dos preços", L: ["Manter preço", "Baixar preço"], C: ["Manter preço", "Baixar preço"], P: _PAY.dilema, t: "Cada uma ganha mais baixando o preço, qualquer que seja a outra. Resultado: ambas baixam e ficam pior do que se mantivessem."},
        {nome: "Vizinhos: qual cultura plantar", L: ["Soja", "Milho"], C: ["Soja", "Milho"], P: _PAY.coord, t: "Os dois só ganham se plantarem a mesma coisa (silo e frete compartilhados). Há dois equilíbrios e é preciso combinar."},
        {nome: "Produtor × fiscal", L: ["Cumprir", "Burlar"], C: ["Fiscalizar", "Ignorar"], P: _PAY.fiscal, t: "Se o fiscal sempre fiscaliza, burlar não compensa; se nunca fiscaliza, compensa. Sem equilíbrio fixo: cada um precisa misturar jogadas."}
      ],
      g1: "Visite as três situações: preços, culturas e produtor contra fiscal.", g2: "No dilema dos preços, edite os ganhos até haver dois equilíbrios de Nash."
    },
    publico: {
      sit: "Situação",
      jogos: [
        {nome: "Prefeituras vizinhas: dilema dos incentivos fiscais", L: ["Manter alíquota", "Reduzir alíquota"], C: ["Manter alíquota", "Reduzir alíquota"], P: _PAY.dilema, t: "Cada prefeitura ganha mais reduzindo a alíquota para atrair empresas, qualquer que seja a outra. Resultado: ambas reduzem e arrecadam menos do que se mantivessem."},
        {nome: "Município e estado: qual sistema adotar", L: ["Sistema A", "Sistema B"], C: ["Sistema A", "Sistema B"], P: _PAY.coord, t: "Os dois só ganham se adotarem o mesmo sistema (integração de dados e treinamento compartilhado). Há dois equilíbrios e é preciso combinar."},
        {nome: "Empresa contratada × controladoria", L: ["Cumprir", "Burlar"], C: ["Auditar", "Ignorar"], P: _PAY.fiscal, t: "Se a controladoria sempre audita, burlar não compensa; se nunca audita, compensa. Sem equilíbrio fixo: cada um precisa misturar jogadas."}
      ],
      g1: "Visite as três situações: incentivos fiscais, sistema integrado e contratada contra controladoria.", g2: "No dilema dos incentivos fiscais, edite os ganhos até haver dois equilíbrios de Nash."
    },
    engenharia: {
      sit: "Situação",
      jogos: [
        {nome: "Fabricantes rivais: dilema dos preços", L: ["Manter preço", "Baixar preço"], C: ["Manter preço", "Baixar preço"], P: _PAY.dilema, t: "Cada fabricante ganha mais baixando o preço, qualquer que seja o outro. Resultado: ambos baixam e ficam pior do que se mantivessem."},
        {nome: "Equipes de projeto: qual padrão de interface", L: ["Padrão A", "Padrão B"], C: ["Padrão A", "Padrão B"], P: _PAY.coord, t: "As duas equipes só ganham se adotarem o mesmo padrão (peças e ferramentas compartilhadas). Há dois equilíbrios e é preciso combinar."},
        {nome: "Empreiteira × inspeção de obra", L: ["Seguir a norma", "Cortar custo"], C: ["Inspecionar", "Ignorar"], P: _PAY.fiscal, t: "Se a inspeção sempre inspeciona, cortar custo não compensa; se nunca inspeciona, compensa. Sem equilíbrio fixo: cada um precisa misturar jogadas."}
      ],
      g1: "Visite as três situações: preços, padrão de interface e empreiteira contra inspeção.", g2: "No dilema dos preços, edite os ganhos até haver dois equilíbrios de Nash."
    },
    dados: {
      sit: "Situação",
      jogos: [
        {nome: "Laboratórios de IA: dilema do lançamento", L: ["Testar com cuidado", "Lançar às pressas"], C: ["Testar com cuidado", "Lançar às pressas"], P: _PAY.dilema, t: "Cada laboratório ganha mais lançando às pressas, qualquer que seja o outro. Resultado: ambos correm e ficam pior do que se testassem com cuidado."},
        {nome: "Times de dados: qual formato adotar", L: ["Parquet", "JSON"], C: ["Parquet", "JSON"], P: _PAY.coord, t: "Os dois times só ganham se usarem o mesmo formato (pipelines e leitores compartilhados). Há dois equilíbrios e é preciso combinar."},
        {nome: "Fraudador × detector", L: ["Agir normal", "Fraudar"], C: ["Verificar", "Ignorar"], P: _PAY.fiscal, t: "Se o detector sempre verifica, fraudar não compensa; se nunca verifica, compensa. Sem equilíbrio fixo: cada um precisa misturar jogadas."}
      ],
      g1: "Visite as três situações: lançamento, formato de dados e fraudador contra detector.", g2: "No dilema do lançamento, edite os ganhos até haver dois equilíbrios de Nash."
    },
    negocios: {
      sit: "Situação",
      jogos: [
        {nome: "Lojas rivais: guerra de preços", L: ["Manter preço", "Baixar preço"], C: ["Manter preço", "Baixar preço"], P: _PAY.dilema, t: "Cada loja ganha mais baixando o preço, qualquer que seja a outra. Resultado: ambas baixam e ficam pior do que se mantivessem."},
        {nome: "Parceiros: qual plataforma adotar", L: ["Plataforma A", "Plataforma B"], C: ["Plataforma A", "Plataforma B"], P: _PAY.coord, t: "Os dois só ganham se adotarem a mesma plataforma (integração e suporte compartilhados). Há dois equilíbrios e é preciso combinar."},
        {nome: "Fornecedor × controle de qualidade", L: ["Entregar conforme", "Fugir da especificação"], C: ["Inspecionar", "Ignorar"], P: _PAY.fiscal, t: "Se o controle sempre inspeciona, fugir da especificação não compensa; se nunca inspeciona, compensa. Sem equilíbrio fixo: cada um precisa misturar jogadas."}
      ],
      g1: "Visite as três situações: preços, plataforma e fornecedor contra controle de qualidade.", g2: "Na guerra de preços, edite os ganhos até haver dois equilíbrios de Nash."
    }
  }
});
