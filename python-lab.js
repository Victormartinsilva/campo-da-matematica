/* Python no navegador: transforma o bloco de código de cada assunto num editor com botão Executar.
   Usa o Pyodide (Python em WebAssembly) dentro de um Web Worker, baixado só na primeira execução.
   Os números do início do código (nome = valor) viram controles com − e + para testar outros valores. */
const PythonLab = (() => {
  const PYODIDE = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js", LIMITE_S = 20;
  const SRC = `importScripts(${JSON.stringify(PYODIDE)});
    let py = null;
    self.onmessage = async e => {
      const {id, code} = e.data;
      try {
        if (!py) { self.postMessage({id, tipo: "estado", t: "Baixando o Python (só na primeira vez, uns 10 MB)…"}); py = await loadPyodide(); }
        self.postMessage({id, tipo: "pronto"});
        py.setStdout({batched: s => self.postMessage({id, tipo: "out", t: s})}); py.setStderr({batched: s => self.postMessage({id, tipo: "err", t: s})});
        await py.loadPackagesFromImports(code); await py.runPythonAsync(code); self.postMessage({id, tipo: "fim"});
      } catch (err) { self.postMessage({id, tipo: "erro", t: String((err && err.message) || err)}); }
    };`;
  let worker = null, pronto = false, seq = 0;
  const novoWorker = () => { worker = new Worker(URL.createObjectURL(new Blob([SRC], {type: "text/javascript"}))); pronto = false; return worker; };

  /* roda o código; devolve uma promessa que termina com {saida, erro} e chama aoMsg(texto) com o andamento */
  function executar(code, aoMsg) {
    const w = worker || novoWorker(), id = ++seq;
    return new Promise(ok => {
      let saida = [], limite = 0;
      const fim = r => { clearTimeout(limite); w.removeEventListener("message", ouve); ok(r); };
      const arma = () => { clearTimeout(limite); limite = setTimeout(() => { w.terminate(); worker = null; pronto = false; fim({saida, erro: `Passei de ${LIMITE_S} s e parei a execução. Há um laço sem fim?`}); }, LIMITE_S * 1000); };
      const ouve = e => {
        const d = e.data; if (d.id !== id) return;
        if (d.tipo === "estado") aoMsg(d.t); else if (d.tipo === "pronto") { pronto = true; aoMsg("Rodando…"); arma(); }
        else if (d.tipo === "out") saida.push(d.t); else if (d.tipo === "err") saida.push(d.t);
        else if (d.tipo === "fim") fim({saida});
        else if (d.tipo === "erro") fim({saida, erro: d.t});
      };
      w.addEventListener("message", ouve); w.addEventListener("error", () => { worker = null; pronto = false; fim({saida, erro: "Não consegui carregar o Python neste navegador (sem internet ou bloqueado)."}); }, {once: true});
      w.postMessage({id, code});
    });
  }

  const amigavel = t => {
    const mod = (t.match(/No module named '([\w.]+)'/) || [])[1];
    if (mod) return `Este exemplo usa a biblioteca "${mod}", que não roda no navegador. Dá para ler e editar o código, mas rode no seu computador.`;
    const linhas = t.trim().split("\n"); return linhas.slice(-4).join("\n");
  };

  /* linhas "nome = número  # comentário" no começo viram controles */
  const RE = /^([A-Za-z_]\w*)\s*=\s*(-?\d+(?:\.\d+)?)(\s*#.*)?$/;
  const passo = (txt, v) => { const dec = (txt.split(".")[1] || "").length; return dec ? (v >= 10 ? 1 : v >= 1 ? 0.1 : 0.05) : (v >= 100 ? 10 : 1); };
  const casas = txt => (txt.split(".")[1] || "").length;

  function montar(wrap, codigo) {
    const pre = wrap.querySelector("pre"); if (!pre) return;
    const ed = document.createElement("div"); ed.className = "py-editor";
    ed.innerHTML = `<div class="py-params" role="group" aria-label="Valores do exemplo" hidden></div>
      <textarea class="py-code" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Código Python, pode editar"></textarea>
      <div class="py-acoes"><button class="btn py-run" type="button">Executar</button><button class="btn alt py-reset" type="button">Restaurar código</button><span class="py-st" role="status" aria-live="polite"></span></div>
      <pre class="py-out" aria-label="Saída do programa" hidden></pre>`;
    pre.replaceWith(ed);
    const ta = ed.querySelector(".py-code"), par = ed.querySelector(".py-params"), out = ed.querySelector(".py-out"), st = ed.querySelector(".py-st"), run = ed.querySelector(".py-run");
    ta.value = codigo; const ajusta = () => { ta.style.height = "auto"; ta.style.height = Math.min(520, ta.scrollHeight + 4) + "px"; };
    let jaRodou = false, tm = 0;

    const lerParams = () => ta.value.split("\n").map((l, i) => { const m = l.match(RE); return m ? {i, nome: m[1], txt: m[2], com: m[3] || ""} : null; }).filter(Boolean).slice(0, 8);
    function params() {
      const ps = lerParams(); par.hidden = !ps.length;
      par.innerHTML = ps.length ? `<span class="py-params-t">Valores do exemplo</span>` + ps.map(p => `<label class="py-par"><span>${p.nome}</span><button type="button" data-d="-1" data-i="${p.i}" aria-label="Diminuir ${p.nome}">−</button><input type="number" value="${p.txt}" step="${passo(p.txt, Math.abs(+p.txt))}" data-i="${p.i}" aria-label="${p.nome}"><button type="button" data-d="1" data-i="${p.i}" aria-label="Aumentar ${p.nome}">+</button></label>`).join("") : "";
    }
    function escreve(i, valor) {
      const ls = ta.value.split("\n"), m = ls[i].match(RE); if (!m) return;
      const dec = Math.max(casas(m[2]), casas(String(valor))), v = +valor; ls[i] = `${m[1]} = ${dec ? v.toFixed(Math.min(dec, 6)) : String(Math.round(v))}${m[3] || ""}`;
      ta.value = ls.join("\n"); params(); if (jaRodou) { clearTimeout(tm); tm = setTimeout(rodar, 350); } else st.textContent = "Clique em Executar para ver a saída.";
    }
    par.addEventListener("click", e => { const b = e.target.closest("button[data-d]"); if (!b) return; const inp = par.querySelector(`input[data-i="${b.dataset.i}"]`); escreve(+b.dataset.i, +inp.value + b.dataset.d * +inp.step); par.querySelector(`input[data-i="${b.dataset.i}"]`)?.focus(); });
    par.addEventListener("change", e => { const inp = e.target.closest("input[data-i]"); if (inp && inp.value !== "") escreve(+inp.dataset.i, +inp.value); });
    ta.addEventListener("input", () => { ajusta(); clearTimeout(tm); tm = setTimeout(() => { if (!par.contains(document.activeElement)) params(); }, 500); });

    async function rodar() {
      run.disabled = true; out.hidden = false; out.className = "py-out"; out.textContent = ""; st.textContent = "Preparando…";
      const r = await executar(ta.value, t => { st.textContent = t; });
      run.disabled = false; jaRodou = true; const texto = r.saida.join("\n");
      if (r.erro) { out.classList.add("erro"); out.textContent = (texto ? texto + "\n" : "") + amigavel(r.erro); st.textContent = "Deu erro. Confira o código."; }
      else { out.textContent = texto || "(o programa terminou sem imprimir nada)"; st.textContent = "Pronto."; }
    }
    run.onclick = rodar;
    ed.querySelector(".py-reset").onclick = () => { ta.value = codigo; ajusta(); params(); st.textContent = "Código original de volta."; if (jaRodou) rodar(); };
    ta.addEventListener("keydown", e => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); rodar(); } });
    ajusta(); params();
    return {obter: () => ta.value};
  }
  return {montar, executar};
})();
