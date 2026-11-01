/* Laboratórios de código da matéria Programação e dados: Python (Pyodide) e SQL (SQLite no navegador).
   Cada módulo chama LabProg.python({...}) ou LabProg.sql({...}) e usa o resultado como "build" do laboratório.
   Os desafios são conferidos sobre o que o código imprimiu (Python) ou sobre a tabela devolvida (SQL).

   LabProg.python({id, titulo?, intro, inicial, dica?, desafios: [{t, teste: ({saida, codigo}) => boolean, win?}]})
   LabProg.sql({id, titulo?, intro, esquema, tabelas: ["pedidos", ...], inicial, dica?, desafios: [{t, teste: ({colunas, linhas, codigo}) => boolean, win?}]})
     esquema: texto SQL (CREATE TABLE e INSERT) executado ao abrir o laboratório e em "Restaurar banco". */
const LabProg = (() => {
  const esc = t => String(t == null ? "" : t).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
  const SQLJS = "https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/";
  let sqlP = null;
  const carregarSql = () => sqlP || (sqlP = new Promise((ok, falha) => {
    const s = document.createElement("script"); s.src = SQLJS + "sql-wasm.js";
    s.onload = () => initSqlJs({locateFile: f => SQLJS + f}).then(ok, falha);
    s.onerror = () => { sqlP = null; falha(new Error("Não consegui baixar o motor de SQL. Confira a internet e tente de novo.")); };
    document.head.appendChild(s);
  }));

  const MAX_LINHAS = 100;
  const fmt = v => v === null ? "NULL" : typeof v === "number" ? (Number.isInteger(v) ? String(v) : String(+v.toFixed(4))) : String(v);
  const tabelaHTML = (cols, linhas, legenda) => !cols.length ? "" : `<div class="lp-tab-wrap" role="region" aria-label="${esc(legenda || "Resultado")}" tabindex="0"><table class="lp-tab"><thead><tr>${cols.map(c => `<th scope="col">${esc(c)}</th>`).join("")}</tr></thead><tbody>${linhas.slice(0, MAX_LINHAS).map(l => `<tr>${l.map(v => `<td${typeof v === "number" ? ' class="num"' : ""}>${esc(fmt(v))}</td>`).join("")}</tr>`).join("")}</tbody></table>${linhas.length > MAX_LINHAS ? `<p class="lp-mais">Mostrando ${MAX_LINHAS} de ${linhas.length} linhas.</p>` : ""}</div>`;

  function montar(tipo, cfg) {
    return function build(stage, panel, extra) {
      const sql = tipo === "sql", id = cfg.id;
      stage.innerHTML = `<div class="lp"><label class="lp-lbl" for="lp-${id}">${esc(cfg.titulo || (sql ? "Consulta SQL" : "Código Python"))}</label>
        <textarea class="lp-code" id="lp-${id}" spellcheck="false" autocapitalize="off" autocomplete="off" aria-describedby="lp-dica-${id}"></textarea>
        <div class="lp-acoes"><button class="btn lp-run" type="button">Executar</button><button class="btn alt lp-reset" type="button">${sql ? "Restaurar banco e consulta" : "Restaurar código"}</button><span class="lp-st" role="status" aria-live="polite"></span></div>
        <div class="lp-saida" aria-live="polite" aria-label="Resultado"></div></div>`;
      panel.innerHTML = `<div class="read">${cfg.intro || ""}</div><p class="lp-dica" id="lp-dica-${id}">Execute com o botão ou com Ctrl + Enter.${cfg.dica ? " " + esc(cfg.dica) : ""}</p>${sql ? `<div class="lp-previa"></div>` : ""}`;
      const ta = stage.querySelector(".lp-code"), st = stage.querySelector(".lp-st"), saida = stage.querySelector(".lp-saida"), run = stage.querySelector(".lp-run");
      const estado = {saida: "", colunas: [], linhas: [], erro: "", codigo: cfg.inicial, execs: 0}; let db = null, vivo = true;
      ta.value = cfg.inicial; const ajusta = () => { ta.style.height = "auto"; ta.style.height = Math.min(360, Math.max(120, ta.scrollHeight + 4)) + "px"; }; ajusta(); ta.addEventListener("input", ajusta);

      async function banco() {
        const SQL = await carregarSql(); if (!vivo) return null;
        if (!db) { db = new SQL.Database(); db.exec(cfg.esquema || ""); }
        return db;
      }
      async function previa() {
        if (!sql || !db) return; const alvo = panel.querySelector(".lp-previa"); if (!alvo) return;
        alvo.innerHTML = (cfg.tabelas || []).map(t => { try { const r = db.exec(`SELECT * FROM ${t} LIMIT 5`)[0], n = db.exec(`SELECT COUNT(*) FROM ${t}`)[0].values[0][0]; return `<details open><summary>${esc(t)} <small>(${n} linhas)</small></summary>${r ? tabelaHTML(r.columns, r.values, "Tabela " + t) : "<p>(vazia)</p>"}</details>`; } catch (e) { return ""; } }).join("");
      }
      async function rodar() {
        const codigo = ta.value; estado.codigo = codigo; run.disabled = true; st.textContent = "Executando…"; saida.innerHTML = "";
        try {
          if (sql) {
            const d = await banco(); if (!d) return; const rs = d.exec(codigo), r = rs[rs.length - 1];
            estado.colunas = r ? r.columns : []; estado.linhas = r ? r.values : []; estado.erro = ""; estado.saida = "";
            saida.innerHTML = r ? tabelaHTML(r.columns, r.values) + `<p class="lp-n">${r.values.length} ${r.values.length === 1 ? "linha" : "linhas"}</p>` : `<p class="lp-n">Comando executado. Não há linhas para mostrar.</p>`;
            st.textContent = "Pronto."; await previa();
          } else {
            const r = await PythonLab.executar(codigo, t => { st.textContent = t; }); const texto = r.saida.join("\n");
            estado.saida = texto; estado.colunas = []; estado.linhas = []; estado.erro = r.erro ? String(r.erro).trim().split("\n").slice(-4).join("\n") : "";
            saida.innerHTML = `<pre class="lp-out${estado.erro ? " erro" : ""}">${esc((texto ? texto + "\n" : "") + estado.erro) || "(o programa terminou sem imprimir nada)"}</pre>`;
            st.textContent = estado.erro ? "Deu erro. Confira o código." : "Pronto.";
          }
        } catch (e) {
          estado.erro = String(e.message || e); estado.colunas = []; estado.linhas = []; saida.innerHTML = `<pre class="lp-out erro">${esc(estado.erro)}</pre>`; st.textContent = "Deu erro. Confira o código.";
        }
        estado.execs++; run.disabled = false;
      }
      run.onclick = rodar;
      ta.addEventListener("keydown", e => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); rodar(); } });
      stage.querySelector(".lp-reset").onclick = async () => { ta.value = cfg.inicial; ajusta(); saida.innerHTML = ""; if (sql) { db = null; try { await banco(); await previa(); st.textContent = "Banco e consulta restaurados."; } catch (e) { st.textContent = String(e.message || e); } } else st.textContent = "Código original de volta."; };
      if (sql) { banco().then(previa).catch(e => { st.textContent = String(e.message || e); }); }

      kit(id, extra, {
        goals: (cfg.desafios || []).map(d => ({t: d.t, ok: s => s.execs > 0 && !s.erro && !!d.teste({saida: s.saida, colunas: s.colunas, linhas: s.linhas, codigo: s.codigo}), win: () => d.win || "Certo! O resultado confere."})),
        state: () => ({saida: estado.saida, colunas: estado.colunas, linhas: estado.linhas, erro: estado.erro, codigo: estado.codigo, execs: estado.execs}),
        react: s => s.erro ? ["Deu erro. Leia a mensagem com calma: ela aponta a linha ou a palavra.", "worried"] : s.execs ? ["Executou. Compare o resultado com o que você esperava.", "thinking"] : ["Escreva e execute. Errar aqui não custa nada.", "neutral"]
      });
      const antes = onLeave; onLeave = () => { vivo = false; try { db && db.close(); } catch (e) {} if (antes) antes(); };
      return () => {};
    };
  }
  return {python: cfg => montar("python", cfg), sql: cfg => montar("sql", cfg)};
})();
