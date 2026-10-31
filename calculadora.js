/* Calculadora científica do caderno: avalia expressões com um parser próprio (sem eval) e abre num painel flutuante.
   Aceita + − × ÷ ^ ( ), vírgula decimal, sqrt, sin, cos, tan, asin, acos, atan, ln, log, exp, abs, pi, e e ans. */
const Calculadora = (() => {
  const FN = {sqrt: Math.sqrt, sin: null, cos: null, tan: null, asin: null, acos: null, atan: null, ln: Math.log, log: Math.log10, exp: Math.exp, abs: Math.abs};

  /* avalia uma expressão; devolve {ok, valor} ou {ok: false, erro} */
  function avaliar(texto, {graus = true, ans = 0} = {}) {
    const rad = graus ? x => x * Math.PI / 180 : x => x, deg = graus ? x => x * 180 / Math.PI : x => x;
    const f = {...FN, sen: x => Math.sin(rad(x)), sin: x => Math.sin(rad(x)), cos: x => Math.cos(rad(x)), tan: x => Math.tan(rad(x)), asin: x => deg(Math.asin(x)), acos: x => deg(Math.acos(x)), atan: x => deg(Math.atan(x))};
    const src = String(texto).replace(/[×·]/g, "*").replace(/÷/g, "/").replace(/[−–]/g, "-").replace(/π/g, "pi").replace(/√/g, "sqrt").replace(/,/g, ".").replace(/\s+/g, "");
    if (!src) return {ok: false, erro: "Digite uma expressão."};
    const tok = []; let i = 0;
    while (i < src.length) {
      const c = src[i];
      if (/[0-9.]/.test(c)) { const m = src.slice(i).match(/^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i); if (!m) return {ok: false, erro: "Número inválido."}; tok.push({t: "n", v: parseFloat(m[0])}); i += m[0].length; }
      else if (/[a-z]/i.test(c)) { const m = src.slice(i).match(/^[a-z]+/i)[0].toLowerCase(); tok.push({t: "id", v: m}); i += m.length; }
      else if ("+-*/^()".includes(c)) { tok.push({t: c}); i++; }
      else return {ok: false, erro: `Símbolo não reconhecido: ${c}`};
    }
    let p = 0; const pk = () => tok[p], tipo = t => pk() && pk().t === t;
    const erro = m => { throw new Error(m); };
    function expr() { let v = termo(); while (tipo("+") || tipo("-")) { const op = tok[p++].t; const w = termo(); v = op === "+" ? v + w : v - w; } return v; }
    function termo() {
      let v = unario();
      for (;;) {
        if (tipo("*") || tipo("/")) { const op = tok[p++].t, w = unario(); if (op === "/" && w === 0) erro("Divisão por zero."); v = op === "*" ? v * w : v / w; }
        else if (pk() && (tipo("(") || tipo("n") || tipo("id"))) v *= unario();   /* multiplicação implícita: 2π, 3(4+1) */
        else return v;
      }
    }
    function unario() { if (tipo("-")) { p++; return -unario(); } if (tipo("+")) { p++; return unario(); } return potencia(); }
    function potencia() { const b = atomo(); if (tipo("^")) { p++; return Math.pow(b, unario()); } return b; }
    function atomo() {
      const t = pk(); if (!t) erro("Expressão incompleta.");
      if (t.t === "n") { p++; return t.v; }
      if (t.t === "(") { p++; const v = expr(); if (!tipo(")")) erro("Falta fechar o parêntese."); p++; return v; }
      if (t.t === "id") {
        p++; if (t.v === "pi") return Math.PI; if (t.v === "e") return Math.E; if (t.v === "ans") return ans;
        if (!(t.v in f)) erro(`Função desconhecida: ${t.v}`);
        if (!tipo("(")) erro(`Use ${t.v}( … ).`); p++; const v = expr(); if (!tipo(")")) erro("Falta fechar o parêntese."); p++; return f[t.v](v);
      }
      return erro("Expressão inválida.");
    }
    try { const v = expr(); if (p < tok.length) erro("Sobrou algo no fim da expressão."); if (!Number.isFinite(v)) return {ok: false, erro: "Resultado fora do domínio."}; return {ok: true, valor: v}; }
    catch (e) { return {ok: false, erro: e.message}; }
  }

  const formatar = v => { const a = Math.abs(v); const t = (a !== 0 && (a >= 1e10 || a < 1e-6)) ? v.toExponential(6) : String(+v.toPrecision(10)); return t.replace(".", ","); };

  /* ---------- painel flutuante ---------- */
  let el = null, ans = 0, graus = true; const hist = [];
  try { graus = localStorage.getItem("mc-graus") !== "0"; } catch (e) {}
  const TECLAS = [["sin(", "sin"], ["cos(", "cos"], ["tan(", "tan"], ["ln(", "ln"], ["log(", "log"], ["sqrt(", "√"], ["^", "xʸ"], ["(", "("], [")", ")"], ["pi", "π"], ["7"], ["8"], ["9"], ["/", "÷"], ["C", "C"], ["4"], ["5"], ["6"], ["*", "×"], ["⌫", "⌫"], ["1"], ["2"], ["3"], ["-", "−"], ["ans", "ans"], ["0"], [","], ["e", "e"], ["+"], ["=", "="]];
  function montar() {
    el = document.createElement("div"); el.className = "calc"; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", "Calculadora"); el.hidden = true;
    el.innerHTML = `<div class="calc-top"><b>Calculadora</b><button type="button" class="calc-modo" aria-pressed="${graus}"></button><button type="button" class="calc-fechar" aria-label="Fechar a calculadora">×</button></div>
      <input class="calc-in" type="text" inputmode="text" autocomplete="off" spellcheck="false" aria-label="Expressão" placeholder="ex.: 100·cos(30)">
      <p class="calc-out" role="status" aria-live="polite">&nbsp;</p><ul class="calc-hist" aria-label="Resultados anteriores"></ul>
      <div class="calc-teclas">${TECLAS.map(([v, r]) => `<button type="button" data-k="${v}">${r || v}</button>`).join("")}</div>`;
    document.body.appendChild(el);
    const inp = el.querySelector(".calc-in"), out = el.querySelector(".calc-out"), modo = el.querySelector(".calc-modo");
    const rotulo = () => { modo.textContent = graus ? "Graus" : "Radianos"; modo.setAttribute("aria-pressed", graus); };
    const inserir = t => { const a = inp.selectionStart ?? inp.value.length, b = inp.selectionEnd ?? a; inp.value = inp.value.slice(0, a) + t + inp.value.slice(b); inp.focus(); inp.setSelectionRange(a + t.length, a + t.length); };
    const calcular = () => {
      const r = avaliar(inp.value, {graus, ans}); if (!r.ok) { out.textContent = r.erro; out.classList.add("erro"); return; }
      out.classList.remove("erro"); ans = r.valor; out.textContent = "= " + formatar(r.valor); hist.unshift({e: inp.value, v: formatar(r.valor)}); hist.length = Math.min(hist.length, 5);
      el.querySelector(".calc-hist").innerHTML = hist.map((h, i) => `<li><button type="button" data-h="${i}">${h.e.replace(/</g, "&lt;")} = <b>${h.v}</b></button></li>`).join("");
    };
    inp.addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); calcular(); } if (e.key === "Escape") fechar(); });
    el.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.classList.contains("calc-fechar")) return fechar();
      if (b === modo) { graus = !graus; try { localStorage.setItem("mc-graus", graus ? "1" : "0"); } catch (x) {} rotulo(); return; }
      if (b.dataset.h != null) { inp.value = hist[+b.dataset.h].e; inp.focus(); return; }
      const k = b.dataset.k; if (k === "=") calcular(); else if (k === "C") { inp.value = ""; out.innerHTML = "&nbsp;"; inp.focus(); } else if (k === "⌫") { inp.value = inp.value.slice(0, -1); inp.focus(); } else inserir(k);
    });
    rotulo();
  }
  const fechar = () => { if (el) { el.hidden = true; document.querySelector("[data-abre-calc][aria-expanded=true]")?.setAttribute("aria-expanded", "false"); } };
  function abrir(origem) {
    if (!el) montar(); el.hidden = false; el.querySelector(".calc-in").focus(); if (origem) origem.setAttribute("aria-expanded", "true");
  }
  return {avaliar, formatar, abrir, fechar};
})();
