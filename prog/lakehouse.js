/* Módulo 2 de Programação e dados: Lakehouse e arquitetura medalhão.
   Laboratório próprio (build escrito à mão, em DOM): pipeline bronze, prata e ouro com dados sujos. CSS com prefixo .lh- injetado uma única vez. */
(function () {
  const esc = t => String(t == null ? "" : t).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));

  const CSS = `
.lh { display: grid; gap: var(--s-3); min-width: 0; }
.lh-flow { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr); gap: var(--s-2); align-items: start; }
.lh-arrow { align-self: center; font: 700 22px var(--f-body); color: var(--area-ink); }
.lh-col { min-width: 0; border: 2px solid var(--edge); border-radius: var(--r-card); background: var(--card); padding: var(--s-2) var(--s-3) var(--s-3); display: grid; gap: var(--s-2); }
.lh-col h4 { margin: 0; font: 700 15px var(--f-body); display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.lh-col h4 small { font: 400 12px var(--f-body); color: var(--ink-soft); }
.lh-bronze { border-top: 8px solid var(--soil); }
.lh-prata { border-top: 8px solid var(--rule-strong); }
.lh-ouro { border-top: 8px solid var(--wheat); }
.lh-wrap { overflow: auto; max-height: 300px; border: 1.5px solid var(--rule); border-radius: 6px; }
.lh-tab { border-collapse: collapse; width: 100%; font: 400 12.5px var(--f-mono); }
.lh-tab caption { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.lh-tab th, .lh-tab td { padding: 3px 7px; border-bottom: 1px solid var(--rule-soft); text-align: left; white-space: nowrap; }
.lh-tab th { position: sticky; top: 0; background: var(--paper-2); font-weight: 700; }
.lh-tab td.num { text-align: right; font-variant-numeric: tabular-nums; }
.lh-tab td.lh-bad { background: color-mix(in srgb, var(--alert) 22%, transparent); outline: 1px solid var(--alert); outline-offset: -1px; }
.lh-kpi { margin: 0; font-size: 12.5px; color: var(--ink-soft); line-height: 1.4; }
.lh-leg { margin: 0; font-size: 12.5px; color: var(--ink-soft); }
.lh-leg i { display: inline-block; width: 12px; height: 12px; vertical-align: -1px; margin-right: 4px; background: color-mix(in srgb, var(--alert) 22%, transparent); outline: 1px solid var(--alert); outline-offset: -1px; }
.lh-set { border: 1.5px solid var(--rule-strong); border-radius: 8px; padding: var(--s-2) var(--s-3); margin: 0; display: grid; gap: 6px; min-width: 0; }
.lh-set legend { font: 700 13px var(--f-body); letter-spacing: .08em; text-transform: uppercase; color: var(--area-ink); padding: 0 6px; }
.lh-opt { display: flex; gap: 8px; align-items: flex-start; font-size: 15px; line-height: 1.35; cursor: pointer; min-height: 28px; }
.lh-opt input { margin-top: 3px; width: 18px; height: 18px; flex: none; accent-color: var(--area-ink); }
.lh-sel { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 15px; }
.lh-sel select { font: 400 15px var(--f-body); padding: 6px 8px; min-height: 40px; color: var(--ink); background: var(--card); border: 2px solid var(--edge); border-radius: 8px; max-width: 100%; }
.lh-sel select:focus-visible, .lh-opt input:focus-visible { outline: 3px dashed var(--terra); outline-offset: 2px; }
@media (max-width: 860px) {
  .lh-flow { grid-template-columns: minmax(0, 1fr); }
  .lh-arrow { justify-self: center; transform: rotate(90deg); }
}
`;
  function injetaCss() {
    if (document.getElementById("lh-css")) return;
    const s = document.createElement("style"); s.id = "lh-css"; s.textContent = CSS; document.head.appendChild(s);
  }

  /* bronze: o que chegou das fontes, sem nenhuma limpeza (produtividade em sacas por hectare) */
  const BRONZE = [
    {id: 1, talhao: "T1", data: "2025-03-10", prod: 62},
    {id: 2, talhao: "T2", data: "10/03/2025", prod: 58},
    {id: 3, talhao: "T1", data: "11 mar 2025", prod: 66},
    {id: 3, talhao: "T1", data: "11 mar 2025", prod: 66},
    {id: 4, talhao: "T2", data: "2025-03-12", prod: null},
    {id: 5, talhao: "T3", data: "12/03/2025", prod: 70},
    {id: 6, talhao: "t3", data: "2025-03-13", prod: 74},
    {id: 7, talhao: "T2", data: "13 mar 2025", prod: 61},
    {id: 2, talhao: "T2", data: "10/03/2025", prod: 58},
    {id: 8, talhao: "T1 ", data: "14/03/2025", prod: null},
    {id: 9, talhao: "T3", data: "2025-03-14", prod: 72}
  ];
  const MES = {jan: 1, fev: 2, mar: 3, abr: 4, mai: 5, jun: 6, jul: 7, ago: 8, set: 9, out: 10, nov: 11, dez: 12};
  const p2 = n => String(n).padStart(2, "0");
  function isoData(txt) {
    const s = String(txt).trim().toLowerCase();
    let m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s); if (m) return s;
    m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s); if (m) return `${m[3]}-${m[2]}-${m[1]}`;
    m = /^(\d{1,2}) ([a-zç]{3}) (\d{4})$/.exec(s); if (m && MES[m[2]]) return `${m[3]}-${p2(MES[m[2]])}-${p2(m[1])}`;
    return null;
  }

  /* prata: aplica, nesta ordem, só as etapas que a pessoa ligou */
  function prata(et) {
    let r = BRONZE.map(x => ({...x}));
    if (et.dedupe) { const vistos = new Set(); r = r.filter(x => !vistos.has(x.id) && vistos.add(x.id)); }
    if (et.talhao) r.forEach(x => { x.talhao = x.talhao.trim().toUpperCase(); });
    if (et.data) r.forEach(x => { x.data = isoData(x.data) || x.data; });
    if (et.zero) r.forEach(x => { if (x.prod == null) x.prod = 0; });
    if (et.nulos) r = r.filter(x => x.prod != null);
    return r;
  }
  /* defeitos de cada linha, usados para pintar as células e contar */
  function defeitos(rows) {
    const vistos = new Set();
    return rows.map(x => {
      const dup = vistos.has(x.id); vistos.add(x.id);
      return {dup, nulo: x.prod == null, zero: x.prod === 0, data: !/^\d{4}-\d{2}-\d{2}$/.test(x.data), talhao: !/^T\d$/.test(x.talhao)};
    });
  }
  const resumo = rows => {
    const d = defeitos(rows), c = k => d.filter(x => x[k]).length;
    return {linhas: rows.length, dup: c("dup"), nulos: c("nulo"), zeros: c("zero"), datas: c("data"), talhoes: c("talhao")};
  };
  const limpa = q => q.dup + q.nulos + q.zeros + q.datas + q.talhoes === 0;

  function ouro(rows, chave, metrica) {
    const g = new Map();
    rows.forEach(x => { const k = x[chave]; if (!g.has(k)) g.set(k, []); g.get(k).push(x); });
    const sai = [];
    [...g.keys()].sort().forEach(k => {
      const L = g.get(k), v = L.filter(x => x.prod != null).map(x => x.prod);
      const soma = v.reduce((a, b) => a + b, 0);
      sai.push([k, metrica === "contagem" ? L.length : metrica === "soma" ? soma : (v.length ? Math.round(soma / v.length * 10) / 10 : null)]);
    });
    return sai;
  }

  const fmt = v => v === null ? "NULL" : typeof v === "number" ? String(+v.toFixed(2)).replace(".", ",") : String(v);
  function tabela(cols, linhas, defs, legenda) {
    const vis = s => esc(s).replace(/^ | $/g, "␣");
    return `<table class="lh-tab"><caption>${esc(legenda)}</caption><thead><tr>${cols.map(c => `<th scope="col">${esc(c)}</th>`).join("")}</tr></thead><tbody>${linhas.map((l, i) => `<tr>${l.map((v, j) => {
      const d = defs && defs[i] || {}, ruim = (cols[j] === "id" && d.dup) || (cols[j] === "talhao" && d.talhao) || (cols[j] === "data" && d.data) || (cols[j] === "prod" && (d.nulo || d.zero));
      return `<td class="${typeof v === "number" ? "num" : ""}${ruim ? " lh-bad" : ""}">${typeof v === "string" ? vis(v) : esc(fmt(v))}</td>`;
    }).join("")}</tr>`).join("")}</tbody></table>`;
  }
  const linhasDe = rows => rows.map(x => [x.id, x.talhao, x.data, x.prod]);
  const COLS = ["id", "talhao", "data", "prod"];

  function build(stage, panel, extra) {
    injetaCss();
    const ET = [
      ["dedupe", "Remover duplicados (mesmo id)"],
      ["talhao", "Padronizar talhão (maiúsculas, sem espaços)"],
      ["data", "Converter datas para AAAA-MM-DD"],
      ["zero", "Preencher produtividade nula com 0"],
      ["nulos", "Descartar linhas sem produtividade"]
    ];
    const et = {dedupe: false, talhao: false, data: false, zero: false, nulos: false};
    let chave = "data", metrica = "contagem";

    stage.innerHTML = `<div class="lh">
      <div class="lh-flow">
        <section class="lh-col lh-bronze" aria-labelledby="lh-h-b"><h4 id="lh-h-b">Bronze <small>dado bruto, como chegou</small></h4><div class="lh-wrap" role="region" aria-label="Tabela da camada bronze" tabindex="0"></div><p class="lh-kpi"></p></section>
        <span class="lh-arrow" aria-hidden="true">→</span>
        <section class="lh-col lh-prata" aria-labelledby="lh-h-p"><h4 id="lh-h-p">Prata <small>limpo e validado</small></h4><div class="lh-wrap" role="region" aria-label="Tabela da camada prata" tabindex="0"></div><p class="lh-kpi"></p></section>
        <span class="lh-arrow" aria-hidden="true">→</span>
        <section class="lh-col lh-ouro" aria-labelledby="lh-h-o"><h4 id="lh-h-o">Ouro <small>resposta para o negócio</small></h4><div class="lh-wrap" role="region" aria-label="Tabela da camada ouro" tabindex="0"></div><p class="lh-kpi"></p></section>
      </div>
      <p class="lh-leg"><i aria-hidden="true"></i>Célula marcada = problema de qualidade (duplicado, nulo ou zero inventado, data fora do padrão, talhão fora do padrão). "␣" indica espaço sobrando.</p>
    </div>`;
    panel.innerHTML = `<div class="read"><p>Produtividade (sacas por hectare) de colheitas em três talhões. A bronze guarda tudo como chegou. Ligue as etapas da prata, escolha como agregar na ouro e confira o resultado.</p></div>
      <fieldset class="lh-set"><legend>Etapas da prata</legend>${ET.map(([k, t]) => `<label class="lh-opt"><input type="checkbox" data-et="${k}"><span>${esc(t)}</span></label>`).join("")}</fieldset>
      <fieldset class="lh-set"><legend>Agregação da ouro</legend>
        <div class="lh-sel"><label for="lh-chave">Agrupar por</label><select id="lh-chave"><option value="data">data</option><option value="talhao">talhão</option></select></div>
        <div class="lh-sel"><label for="lh-metrica">Calcular</label><select id="lh-metrica"><option value="contagem">contagem de linhas</option><option value="soma">soma da produtividade</option><option value="media">média da produtividade</option></select></div>
      </fieldset>
      <div class="read lh-diag" role="status" aria-live="polite"></div>
      <div class="row"><button class="btn alt lh-reset" type="button">Reiniciar pipeline</button></div>`;

    const cols = [...stage.querySelectorAll(".lh-col")], wraps = cols.map(c => c.querySelector(".lh-wrap")), kpis = cols.map(c => c.querySelector(".lh-kpi")), diag = panel.querySelector(".lh-diag");
    const kpiTxt = q => `${q.linhas} linhas · ${q.dup} duplicadas · ${q.nulos} nulas · ${q.zeros} zeradas · ${q.datas} datas fora do padrão · ${q.talhoes} talhões fora do padrão`;
    let S = null;

    function calcula() {
      const b = BRONZE, p = prata(et), qb = resumo(b), qp = resumo(p), g = ouro(p, chave, metrica);
      S = {et: {...et}, chave, metrica, linhas: qp.linhas, dup: qp.dup, nulos: qp.nulos, zeros: qp.zeros, datas: qp.datas, talhoes: qp.talhoes, limpa: limpa(qp), ouro: Object.fromEntries(g)};
      return {b, p, qb, qp, g};
    }
    function desenha() {
      const {b, p, qb, qp, g} = calcula();
      wraps[0].innerHTML = tabela(COLS, linhasDe(b), defeitos(b), "Camada bronze: dados brutos");
      wraps[1].innerHTML = tabela(COLS, linhasDe(p), defeitos(p), "Camada prata: dados após as etapas escolhidas");
      const rotM = {contagem: "linhas", soma: "soma_prod", media: "media_prod"}[metrica];
      wraps[2].innerHTML = tabela([chave, rotM], g, null, "Camada ouro: dados agregados");
      kpis[0].textContent = kpiTxt(qb); kpis[1].textContent = kpiTxt(qp);
      kpis[2].textContent = metrica === "media" ? "A média ignora valores nulos, como o AVG do SQL." : metrica === "soma" ? "A soma ignora valores nulos." : "Conta todas as linhas da prata, inclusive as com defeito.";
      const itens = [
        ["duplicados", qp.dup, "linha(s) repetida(s) inflam somas e contagens"],
        ["nulos", qp.nulos, "linha(s) sem produtividade"],
        ["zeros inventados", qp.zeros, "zero no lugar de dado ausente puxa a média para baixo"],
        ["datas fora do padrão", qp.datas, "impedem ordenar e agrupar por dia"],
        ["talhões fora do padrão", qp.talhoes, "T3 e t3 viram grupos diferentes"]
      ];
      diag.innerHTML = `<div><b>Qualidade da prata</b></div>` + itens.map(([n, v, d]) => `<div class="${v ? "no" : "ok"}">${v ? "Pendente" : "Ok"}: ${n} (${v})${v ? ", " + d : ""}.</div>`).join("") + (S.limpa ? `<div class="ok"><b>Prata limpa:</b> ${qp.linhas} linhas prontas para agregar.</div>` : "");
    }

    panel.querySelectorAll("input[data-et]").forEach(i => i.addEventListener("change", () => { et[i.dataset.et] = i.checked; desenha(); }));
    panel.querySelector("#lh-chave").addEventListener("change", e => { chave = e.target.value; desenha(); });
    panel.querySelector("#lh-metrica").addEventListener("change", e => { metrica = e.target.value; desenha(); });
    panel.querySelector(".lh-reset").addEventListener("click", () => {
      Object.keys(et).forEach(k => { et[k] = false; }); chave = "data"; metrica = "contagem";
      panel.querySelectorAll("input[data-et]").forEach(i => { i.checked = false; });
      panel.querySelector("#lh-chave").value = chave; panel.querySelector("#lh-metrica").value = metrica; desenha();
    });
    desenha();

    kit("lakehouse", extra, {
      state: () => S,
      goals: [
        {t: "Ligue a etapa que remove os duplicados e deixe a prata sem linhas repetidas.", ok: s => s.et.dedupe && s.dup === 0, win: () => "Duplicados fora. Na bronze o dado fica como chegou, e é na prata que ele passa a valer só uma vez."},
        {t: "Deixe a prata limpa: sem duplicados, nulos, datas fora do padrão nem talhões inconsistentes.", ok: s => s.limpa && s.linhas === 7, win: () => "Prata limpa: 7 linhas confiáveis. Cada defeito tinha uma etapa própria."},
        {t: "Com a prata limpa, agrupe a ouro por talhão e calcule a média: T1 deve dar 64, T2 59,5 e T3 72.", ok: s => s.limpa && s.chave === "talhao" && s.metrica === "media" && s.ouro.T1 === 64 && s.ouro.T2 === 59.5 && s.ouro.T3 === 72, win: () => "Ouro conferida: média de produtividade por talhão, calculada sobre dado limpo."},
        {t: "Faça o estrago de propósito: preencha os nulos com 0, agrupe por talhão e veja a média de T2 cair abaixo de 50.", ok: s => s.et.zero && s.chave === "talhao" && s.metrica === "media" && s.ouro.T2 != null && s.ouro.T2 < 50, win: () => "Um zero inventado não é ausência de dado: ele entrou na média e derrubou o T2. Descartar ou marcar o nulo é mais honesto."}
      ],
      react: s => s.limpa ? ["Prata limpa. Agora escolha como agregar na ouro.", "happy"] : s.dup || s.nulos || s.datas || s.talhoes ? ["Ainda há defeitos na prata. Procure as células marcadas.", "thinking"] : ["Confira a ouro: o resultado depende do que a prata entregou.", "neutral"]
    });
    return desenha;
  }

  (window.MODULOS_PROG = window.MODULOS_PROG || []).push({
    id: "lakehouse",
    nome: "Lakehouse e arquitetura medalhão",
    gancho: "Se o dado chega bagunçado de dez fontes, onde ele fica guardado e em que momento passa a merecer confiança?",
    resumo: "O lakehouse junta a flexibilidade do data lake com a organização do warehouse. Na arquitetura medalhão o dado passa da bronze (bruto) para a prata (limpo) e para a ouro (pronto para o negócio).",
    detalhes: "Um data lake guarda arquivos de qualquer tipo a baixo custo, mas sem garantias: ninguém impede duplicados ou colunas trocadas. Um data warehouse guarda tabelas estruturadas, rápidas de consultar em SQL e com transações, mas é mais rígido com o que entra. O lakehouse combina os dois: arquivos em armazenamento aberto, com uma camada de tabelas por cima. O Delta Lake é essa camada: arquivos Parquet mais um log de transações, que dá transações ACID, imposição de esquema e viagem no tempo. Sobre isso se organiza o fluxo em camadas: a bronze guarda o dado como chegou (com poucas validações), a prata limpa e valida (duplicados, nulos, tipos, datas) e a ouro agrega para responder perguntas de negócio. No ELT, o dado é carregado bruto primeiro e transformado depois, dentro da própria plataforma, com computação em escala.",
    saudacao: "Oi! Eu sou o Chaveta. Veja o dado sujo na bronze, ligue as etapas da prata e confira a ouro. Cada defeito tem uma etapa que o resolve.",
    python: `import pandas as pd

# bronze: o dado como chegou (duplicado, nulo, datas em dois formatos, talhão em minúscula)
bronze = pd.DataFrame({
    "id":     [1, 2, 3, 3, 4, 5, 6],
    "talhao": ["T1", "T2", "T1", "T1", "T2", "T3", "t3"],
    "data":   ["2025-03-10", "10/03/2025", "11/03/2025", "11/03/2025", "2025-03-12", "12/03/2025", "2025-03-13"],
    "prod":   [62, 58, 66, 66, None, 70, 74],
})

# prata: remover duplicados, padronizar texto e datas, descartar nulos
iso = pd.to_datetime(bronze["data"], format="%Y-%m-%d", errors="coerce")
br = pd.to_datetime(bronze["data"], format="%d/%m/%Y", errors="coerce")
prata = (bronze.drop_duplicates("id")
               .assign(talhao=lambda d: d["talhao"].str.upper(),
                       data=iso.fillna(br))
               .dropna(subset=["prod"]))

# ouro: uma resposta de negócio, a média de produtividade por talhão
ouro = prata.groupby("talhao", as_index=False)["prod"].mean()
print(len(bronze), "linhas na bronze,", len(prata), "na prata")
print(ouro)

# Em um notebook do Fabric ou do Databricks, o mesmo fluxo em PySpark seria algo como
# (apenas para ler, não roda aqui):
#   prata = (spark.read.table("bronze_colheita").dropDuplicates(["id"])
#                 .withColumn("talhao", F.upper("talhao")).dropna(subset=["prod"]))
#   prata.write.format("delta").mode("overwrite").saveAsTable("prata_colheita")`,
    build,
    formulas: [
      {nome: "Lake, warehouse e lakehouse", expressao: "lake = arquivos flexíveis; warehouse = tabelas rígidas; lakehouse = os dois", significado: "O lake aceita qualquer arquivo sem garantias. O warehouse oferece SQL e transações sobre dado estruturado. O lakehouse põe tabelas transacionais sobre arquivos abertos."},
      {nome: "Delta Lake", expressao: "Delta = arquivos Parquet + log de transações", significado: "O Parquet guarda os dados em colunas e o log registra cada mudança. Disso saem transações ACID, imposição de esquema e viagem no tempo."},
      {nome: "Arquitetura medalhão", expressao: "bronze (bruto) -> prata (validado) -> ouro (negócio)", significado: "Cada camada tem um papel: preservar o original, limpar e validar, e agregar para responder perguntas. Dá para reprocessar a partir da bronze."},
      {nome: "Qualidade de dados", expressao: "duplicados + nulos + tipos + formatos = defeitos a tratar antes de agregar", significado: "Somas, médias e contagens só são confiáveis depois que a prata trata cada defeito. Agregar antes de limpar leva a números errados."},
      {nome: "ELT", expressao: "Extrair -> Carregar -> Transformar", significado: "O dado bruto é carregado primeiro e transformado onde está armazenado, com Spark ou SQL. No ETL a transformação vem antes do carregamento."}
    ],
    exemplos: [
      {titulo: "Duplicado inflando a soma", enunciado: "Um pluviômetro enviou as leituras de chuva (mm) [12, 12, 8, 15], mas a segunda leitura de 12 é o mesmo registro enviado duas vezes. Qual é a chuva total?", passos: ["Na bronze, a soma ingênua é 12 + 12 + 8 + 15 = 47 mm.", "Na prata, remova o registro repetido (mesmo id): sobram [12, 8, 15].", "Some a prata: 12 + 8 + 15 = 35 mm."], resultado: "A chuva total é 35 mm. Sem deduplicar, o número ficaria 12 mm acima do real."},
      {titulo: "Nulo preenchido com zero", enunciado: "Três colheitas renderam 60, (sem registro) e 70 sacas por hectare. Qual é a média?", passos: ["Descartando o nulo, sobram [60, 70]: média = 130 / 2 = 65.", "Preenchendo com 0, a lista vira [60, 0, 70]: média = 130 / 3 = 43,3.", "Compare: o zero inventado afirma que um talhão produziu nada."], resultado: "A média honesta é 65 sacas por hectare. Preencher com zero a derrubaria para 43,3."}
    ],
    exercicios: [
      {pergunta: "Em qual camada do medalhão se deve fazer a remoção de duplicados e o tratamento de nulos?", resposta: "Na prata", explicacao: "A bronze preserva o dado como chegou, com poucas validações, para permitir auditoria e reprocessamento. A limpeza e a validação acontecem na prata."},
      {pergunta: "Por que a ouro costuma ser agregada, e não uma cópia da prata?", resposta: "Porque ela responde perguntas de negócio de forma rápida", explicacao: "A ouro traz visões prontas, como média por talhão ou vendas por mês, organizadas para dashboards, relatórios e modelos. A prata continua guardando o detalhe limpo."},
      {pergunta: "Qual é a diferença entre ETL e ELT?", resposta: "No ETL se transforma antes de carregar; no ELT se carrega primeiro e se transforma depois", explicacao: "No ELT o dado bruto já está no armazenamento da plataforma e a transformação usa a computação dela, como Spark ou SQL, em escala."}
    ],
    erros: [
      {erro: "Limpar o dado antes de gravar na bronze, para guardar só o que está certo.", correcao: "A bronze existe para preservar o original. Se a limpeza tiver um erro, você ainda pode reprocessar a partir do bruto. A limpeza fica na prata."},
      {erro: "Preencher todo valor nulo com 0 para a conta não quebrar.", correcao: "Zero é um valor, e nulo é ausência de valor. Preencher com zero altera médias e totais. Descarte, marque ou impute com um critério explícito."},
      {erro: "Lakehouse é só outro nome para data lake.", correcao: "O lake sozinho guarda arquivos sem garantias. O lakehouse adiciona uma camada de tabelas transacionais, como o Delta Lake, que permite SQL, ACID e esquema sobre os mesmos arquivos."}
    ],
    fontes: [
      {titulo: "What is the medallion lakehouse architecture?", url: "https://docs.databricks.com/aws/en/lakehouse/medallion", origem: "Databricks", idioma: "en", nivel: "intermediário", estude: "Leia o papel de cada camada e onde a documentação coloca a limpeza, a deduplicação e a agregação."},
      {titulo: "Visão geral do Delta Lake", url: "https://learn.microsoft.com/pt-br/fabric/fundamentals/delta-lake-overview", origem: "Microsoft Learn", idioma: "pt", nivel: "iniciante", estude: "Veja que o Delta é Parquet mais um log de transações e o que isso garante (ACID, viagem no tempo)."},
      {titulo: "Armazém e Lakehouse: um guia de decisão", url: "https://learn.microsoft.com/pt-br/fabric/fundamentals/decision-guide-lakehouse-warehouse", origem: "Microsoft Learn", idioma: "pt", nivel: "intermediário", estude: "Compare lakehouse e warehouse por linguagem, tipo de dado e transações, e note onde o medalhão aparece."},
      {titulo: "O que é o Data Factory (seção ETL ou ELT)", url: "https://learn.microsoft.com/pt-br/fabric/data-factory/data-factory-overview", origem: "Microsoft Learn", idioma: "pt", nivel: "iniciante", estude: "Leia a seção que compara ETL e ELT e quando cada um serve."},
      {titulo: "Delta Lake: documentação", url: "https://docs.delta.io/", origem: "Delta Lake (Linux Foundation)", idioma: "en", nivel: "intermediário", estude: "Explore a visão geral do projeto aberto e seus recursos de transações, esquema e histórico de versões."}
    ]
  });
  (window.CTX_TEXTO = window.CTX_TEXTO || {})["lakehouse"] = {
    agro: "Leituras de sensores de solo, estações meteorológicas e colheitadeiras chegam duplicadas, com falhas e em formatos diferentes. A bronze guarda tudo, a prata corrige, e a ouro entrega a produtividade média por talhão.",
    publico: "Cadastros de vários órgãos repetem o mesmo cidadão com grafias diferentes. Na prata se unifica o registro, e a ouro mostra indicadores por município sem contar a mesma pessoa duas vezes.",
    engenharia: "Medições de sensores industriais trazem leituras repetidas e lacunas. A bronze preserva a série original para auditoria, e a prata entrega a série limpa para análise de falhas.",
    dados: "É o desenho padrão de uma plataforma de dados: ingestão bruta, tabelas Delta validadas e tabelas agregadas para relatórios e modelos. Fabric e Databricks usam essa mesma ideia.",
    negocios: "Pedidos de lojas e do site chegam com datas em formatos diferentes e duplicados. A ouro entrega vendas por mês que fecham com o financeiro, porque a prata tratou os defeitos.",
    dia: "Uma pasta de recibos fotografados é a bronze, a planilha organizada por mês é a prata, e o total gasto por categoria é a ouro."
  };
})();
