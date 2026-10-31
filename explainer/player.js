/* ExplainerPlayer: toca um roteiro (explainer/ESQUEMA.md) com UMA timeline mestre do GSAP.
   Fase 1: timeline, ações de cena, controles, barra por peças e legenda palavra por palavra. */
(function () {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const cor = v => (typeof v === "string" && v.startsWith("--")) ? css(v) : v;
  const reduzido = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fmtT = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
  const esc = t => String(t).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));

  /* gera os tempos das palavras a partir do texto, para o autor não escrever à mão (~2,5 palavras por segundo) */
  function palavras(texto, destaques = [], inicio = 0.2) {
    let t = inicio; const out = [], hl = destaques.map(h => h.toLowerCase());
    for (const bruto of texto.trim().split(/\s+/)) {
      const limpa = bruto.replace(/[.,;:!?…"“”]+$/g, ""), sil = Math.max(1, (limpa.match(/[aeiouáéíóúâêôãõà]+/gi) || []).length), dur = Math.min(0.55, 0.22 + 0.06 * sil);
      out.push({t: bruto, s: +t.toFixed(2), e: +(t + dur).toFixed(2), hl: hl.includes(limpa.toLowerCase())});
      t += dur + 0.04 + (/[,;:]$/.test(bruto) ? 0.2 : /[.!?…]$/.test(bruto) ? 0.4 : 0);
    }
    return out;
  }

  /* frases da legenda: quebra em pontuação ou a cada 7 palavras */
  function frases(words) {
    const out = []; let atual = [];
    words.forEach((w, i) => {
      atual.push(w);
      if (/[.,;:!?…]$/.test(w.t) || atual.length >= 7 || i === words.length - 1) { out.push({words: atual, s: atual[0].s, e: atual[atual.length - 1].e + 0.45}); atual = []; }
    });
    return out;
  }

  /* ---------- ações de cena: cada uma vira tweens na timeline mestre ---------- */
  const ACOES = {
    aparecer: (tl, el, a, t) => { tl.set(el, {opacity: 0, y: (a.de && a.de.y) || 10, scale: 0.94, transformOrigin: "50% 100%"}, t); tl.to(el, {opacity: 1, y: 0, scale: 1, duration: a.dur, ease: "back.out(1.4)"}, t); },
    /* aparecer num elemento que já está visível vira só um pulso curto */
    reaparecer: (tl, el, a, t) => tl.to(el, {scale: 1.08, transformOrigin: "50% 50%", duration: Math.min(a.dur, 0.6) / 2, yoyo: true, repeat: 1, ease: "sine.inOut"}, t),
    sumir: (tl, el, a, t) => tl.to(el, {opacity: 0, duration: a.dur, ease: "power1.in"}, t),
    mover: (tl, el, a, t) => tl.to(el, {x: a.para.x || 0, y: a.para.y || 0, duration: a.dur, ease: "power2.inOut"}, t),
    destacar: (tl, el, a, t) => { const v = a.vezes || 2; tl.to(el, {scale: 1.12, transformOrigin: "50% 50%", duration: a.dur / (2 * v), yoyo: true, repeat: 2 * v - 1, ease: "sine.inOut"}, t); },
    desenhar: (tl, el, a, t) => {
      const ps = el.matches("path") ? [el] : [...el.querySelectorAll("path")];
      tl.set(el, {opacity: 1}, t); tl.set(ps, {strokeDasharray: 1, strokeDashoffset: 1}, t); tl.to(ps, {strokeDashoffset: 0, duration: a.dur, ease: "none"}, t);
    },
    cor: (tl, el, a, t) => {
      const alvos = el.matches("path,rect,circle,ellipse,line,polyline") ? [el] : [...el.querySelectorAll("path,rect,circle,ellipse,line,polyline")], p = a.para || {}, vars = {duration: a.dur, ease: "none"};
      if (p.fill) vars.fill = cor(p.fill); if (p.stroke) vars.stroke = cor(p.stroke); tl.to(alvos, vars, t);
    },
    dimensionar: (tl, el, a, t) => tl.to(el, {scaleX: a.sx ?? 1, scaleY: a.sy ?? 1, transformOrigin: "50% 50%", duration: a.dur, ease: "power2.out"}, t)
  };

  class ExplainerPlayer {
    constructor(host, script, opts = {}) {
      this.host = host; this.script = script; this.opts = {legendas: true, autoplayNaTela: false, ...opts}; this.i = 0; this.legendas = this.opts.legendas; this.voz = "speechSynthesis" in window; this.som = this.voz && this.opts.som !== false; this.vozK = null; this.vozFalando = 0; this.segurando = false;
      if (!window.gsap) { host.innerHTML = `<p class="expl-aviso">Não consegui carregar o motor de animação. A transcrição está abaixo.</p>` + this.transcricaoHTML(this.compilar()); return; }
      this.pecas = this.compilar(); this.estatico = reduzido();
      this.montar(); this.hud = new Explainer.Hud(this); this.construirTimeline(); this.ligar(); this.sync();
      if (this.opts.autoplayNaTela && !this.estatico && "IntersectionObserver" in window) {
        this.io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? this.play() : this.pause()), {threshold: 0.6}); this.io.observe(host);
      }
    }

    /* peças em sequência, com início absoluto; o final entra como a última peça */
    compilar() {
      const lista = [...this.script.pieces.map(p => ({...p})), {...this.script.outro, id: "final", ordem: this.script.pieces.length + 1, final: true}];
      let t = 0; this.total = 0;
      return lista.map((p, k) => {
        const w = (p.words || []).map(x => ({...x, s: x.s, e: x.e}));
        const peca = {...p, k, start: t, words: w, abs: w.map(x => ({...x, s: x.s + t, e: x.e + t})), frases: null};
        peca.frases = frases(peca.abs); t += p.dur; this.total = t; return peca;
      });
    }

    /* ---------- interface ---------- */
    montar() {
      const m = this.script.meta, cena = (window.Cenas || {})[m.cena];
      this.host.classList.add("expl"); this.host.setAttribute("tabindex", "0"); this.host.setAttribute("role", "region"); this.host.setAttribute("aria-label", `Mini-vídeo: ${m.titulo}`); this.host.dataset.area = m.area || "calculo";
      this.host.innerHTML = `
        <div class="expl-stage"><svg class="expl-svg" viewBox="${cena ? cena.viewBox : "0 0 800 450"}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Cena do mini-vídeo: ${esc(m.titulo)}"></svg>
          <div class="expl-slots"><div class="slot slot-tag"></div><div class="slot slot-counter"></div><div class="slot slot-terminal"></div><div class="slot slot-pill"></div><div class="slot slot-example"></div><div class="slot slot-why"></div><div class="slot slot-cta"></div></div>
          <p class="expl-caption" aria-hidden="true"></p></div>
        <div class="expl-controls" role="toolbar" aria-label="Controles do mini-vídeo">
          <button type="button" class="eb eb-play" aria-label="Tocar"><svg viewBox="0 0 24 24" aria-hidden="true"><path class="ic-play" d="M8 5v14l11-7z"/><path class="ic-pause" d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg></button>
          <button type="button" class="eb eb-prev" aria-label="Peça anterior"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5v14M19 5L9 12l10 7z"/></svg></button>
          <button type="button" class="eb eb-next" aria-label="Próxima peça"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 5v14M5 5l10 7-10 7z"/></svg></button>
          <button type="button" class="eb eb-restart" aria-label="Reiniciar do começo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 3-6.2M4 4v5h5"/></svg></button>
          <span class="expl-pos" aria-live="polite"></span>
          <span class="expl-sp" role="group" aria-label="Velocidade">${[0.75, 1, 1.25].map(v => `<button type="button" class="es" data-v="${v}" aria-pressed="${v === 1}">${String(v).replace(".", ",")}x</button>`).join("")}</span>
          ${this.voz ? `<button type="button" class="eb eb-som" aria-pressed="${this.som}" aria-label="Narração em voz"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path class="ic-onda" d="M16 9a4 4 0 0 1 0 6M18.500 6.500a8 8 0 0 1 0 11"/></svg></button>` : ""}
          <button type="button" class="eb eb-cc" aria-pressed="${this.legendas}" aria-label="Legendas"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M9.500 10.500a2 2 0 1 0 0 3M16 10.500a2 2 0 1 0 0 3"/></svg></button>
          <span class="expl-tempo"></span></div>
        <div class="expl-bar" role="group" aria-label="Peças do vídeo">${this.pecas.map(p => `<button type="button" class="seg" data-k="${p.k}" style="flex:${p.dur}" aria-label="${p.final ? "Final" : "Peça " + p.ordem}"><i></i></button>`).join("")}</div>
        <details class="expl-transcript"><summary>Transcrição completa</summary>${this.transcricaoHTML(this.pecas)}</details>`;
      this.svg = this.host.querySelector(".expl-svg"); this.cap = this.host.querySelector(".expl-caption");
      if (cena) { this.svg.innerHTML = cena.svg; (cena.ocultos || []).forEach(id => { const el = this.svg.querySelector("#" + id); if (el) el.style.opacity = 0; }); }
      this.vb = this.svg.viewBox.baseVal; this.vb0 = [this.vb.x, this.vb.y, this.vb.width, this.vb.height];
      this.cap.hidden = !this.legendas; if (this.estatico) this.host.classList.add("expl-estatico");
    }
    transcricaoHTML(pecas) { return `<ol class="expl-texto">${pecas.map(p => `<li><b>${p.final ? "Final" : "Peça " + p.ordem}.</b> ${esc(p.narration || "")}${p.example ? ` <i>${esc(p.example.titulo)}: ${esc(p.example.texto)}</i>` : ""}${p.why ? ` <em>Por que importa: ${esc(p.why)}</em>` : ""}</li>`).join("")}</ol>`; }

    /* ---------- timeline mestre ---------- */
    construirTimeline() {
      const tl = this.tl = gsap.timeline({paused: true, onUpdate: () => this.sync(), onComplete: () => this.aoFim()});
      for (const p of this.pecas) tl.addLabel("p" + p.ordem, p.start);
      /* todas as ações em ordem de tempo, para saber se um elemento está visível quando uma ação chega */
      const todas = []; for (const p of this.pecas) for (const a of (p.scene || [])) todas.push({a, t: p.start + a.at, n: todas.length});
      todas.sort((x, y) => x.t - y.t || x.n - y.n);
      const ocultosCena = new Set(((window.Cenas || {})[this.script.meta.cena] || {}).ocultos || []), oculto = new Map();
      for (const {a} of todas) if (!oculto.has(a.alvo)) oculto.set(a.alvo, ocultosCena.has(a.alvo) || a.acao === "aparecer" || a.acao === "desenhar");
      oculto.forEach((h, id) => { const el = this.svg.querySelector("#" + id); if (el && h) el.style.opacity = 0; });
      for (const {a, t} of todas) {
        if (a.acao === "zoom") { this.zoom(tl, a, t); continue; }
        const alvo = this.svg.querySelector("#" + a.alvo);
        if (!alvo) { console.warn("Explainer: alvo ausente na cena:", a.alvo); continue; }
        const f = a.acao === "aparecer" && !oculto.get(a.alvo) ? ACOES.reaparecer : ACOES[a.acao];
        if (!f) { console.warn("Explainer: ação desconhecida:", a.acao); continue; }
        f(tl, alvo, a, t);
        if (a.acao === "aparecer" || a.acao === "desenhar") oculto.set(a.alvo, false); else if (a.acao === "sumir") oculto.set(a.alvo, true);
      }
      tl.set({}, {}, this.total);
    }
    zoom(tl, a, t) {
      const [x0, y0, W, H] = this.vb0, k = a.escala || 1, w = W / k, h = H / k, x = Math.min(x0 + W - w, Math.max(x0, a.cx - w / 2)), y = Math.min(y0 + H - h, Math.max(y0, a.cy - h / 2));
      tl.to(this.svg, {attr: {viewBox: `${x} ${y} ${w} ${h}`}, duration: a.dur, ease: "power2.inOut"}, t);
    }

    /* ---------- controles ---------- */
    ligar() {
      const q = s => this.host.querySelector(s);
      q(".eb-play").onclick = () => this.alternar(); q(".eb-prev").onclick = () => this.anterior(); q(".eb-next").onclick = () => this.proxima(); q(".eb-restart").onclick = () => this.reiniciar();
      if (this.voz) q(".eb-som").onclick = e => { this.som = !this.som; e.currentTarget.setAttribute("aria-pressed", this.som); if (!this.som) this.pararVoz(); };
      q(".eb-cc").onclick = e => { this.legendas = !this.legendas; e.currentTarget.setAttribute("aria-pressed", this.legendas); this.cap.hidden = !this.legendas; };
      this.host.querySelectorAll(".es").forEach(b => b.onclick = () => { this.tl.timeScale(+b.dataset.v); this.host.querySelectorAll(".es").forEach(o => o.setAttribute("aria-pressed", o === b)); });
      this.host.querySelectorAll(".seg").forEach(b => b.onclick = e => { const p = this.pecas[+b.dataset.k], r = b.getBoundingClientRect(), f = e.detail === 0 ? 0 : Math.min(0.999, Math.max(0, (e.clientX - r.left) / r.width)); this.ir(p.start + f * p.dur); });
      this.host.addEventListener("keydown", e => {
        if (e.target.closest("button, summary, select")) { if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return; }
        if (e.key === " ") { e.preventDefault(); this.alternar(); } else if (e.key === "ArrowRight") { e.preventDefault(); this.proxima(); } else if (e.key === "ArrowLeft") { e.preventDefault(); this.anterior(); }
      });
      if (this.estatico) { q(".eb-play").hidden = true; q(".expl-sp").hidden = true; q(".eb-restart").hidden = true; this.ir(this.fimDe(this.pecas[0])); }
    }
    play() { if (this.estatico) return; if (this.tl.progress() >= 1) this.tl.restart(); else this.tl.play(); this.atualizarPlay(); }
    pause() { this.segurando = false; this.tl.pause(); this.pararVoz(); this.atualizarPlay(); }
    alternar() { if (this.segurando) return this.pause(); this.tl.paused() || this.tl.progress() >= 1 ? this.play() : this.pause(); }
    reiniciar() { if (this.estatico) return this.ir(this.fimDe(this.pecas[0])); this.tl.restart(); this.atualizarPlay(); }
    ir(t) { const tocando = !this.tl.paused() || this.segurando; this.segurando = false; if (this.voz) this.pararVoz(); this.tl.time(Math.min(t, this.total)); if (!tocando) this.tl.pause(); else if (this.tl.paused()) this.tl.play(); this.sync(); this.atualizarPlay(); }
    atual() { const t = this.tl.time(); let k = 0; this.pecas.forEach(p => { if (t >= p.start - 1e-6) k = p.k; }); return k; }
    anterior() { const p = this.pecas[this.atual()], t = this.tl.time(); this.irPeca(this.estatico || t - p.start < 1.5 ? Math.max(0, p.k - 1) : p.k); }
    proxima() { const k = this.atual(); if (k >= this.pecas.length - 1) return this.estatico ? null : this.ir(this.total); this.irPeca(k + 1); }
    irPeca(k) { const p = this.pecas[k]; this.ir(this.estatico ? this.fimDe(p) : p.start); }
    fimDe(p) { return p.start + p.dur - 0.01; }
    aoFim() { this.pararVoz(); this.atualizarPlay(); this.host.dispatchEvent(new CustomEvent("expl:fim", {bubbles: true, detail: {id: this.script.meta.id}})); }
    atualizarPlay() { const tocando = (!this.tl.paused() || this.segurando) && this.tl.progress() < 1, b = this.host.querySelector(".eb-play"); this.host.classList.toggle("expl-tocando", tocando); b.setAttribute("aria-label", tocando ? "Pausar" : "Tocar"); }

    /* ---------- narração em voz (voz do navegador; áudio gravado entra depois) ---------- */
    /* Cada frase vira uma fala própria, enfileirada sem cortar a anterior. Se a fala passar do tempo da peça,
       a linha do tempo espera o fim dela (segurando) em vez de pular para a cena seguinte. */
    escolherVoz() {
      if (this.vozEscolhida !== undefined) return this.vozEscolhida;
      const vs = speechSynthesis.getVoices().filter(v => /^pt/i.test(v.lang)); if (!vs.length) return null;
      const nota = v => (/pt-BR/i.test(v.lang) ? 20 : 0) + (/natural|neural|online/i.test(v.name) ? 40 : 0) + (/google/i.test(v.name) ? 15 : 0) + (/francisca|antonio|thalita|camila|vitoria|luciana|maria/i.test(v.name) ? 8 : 0) + (v.localService ? 0 : 3);
      this.vozEscolhida = vs.sort((a, b) => nota(b) - nota(a))[0]; return this.vozEscolhida;
    }
    pararVoz() { if (this.voz) { this.vozGen = (this.vozGen || 0) + 1; speechSynthesis.cancel(); } this.vozK = null; this.vozFalando = 0; }
    vozFim() { if (this.segurando) { this.segurando = false; this.tl.play(); this.atualizarPlay(); } }
    falar(p, t) {
      this.vozK = p.k; const gen = this.vozGen = (this.vozGen || 0) + 1, ts = this.tl.timeScale(), rel = t - p.start;
      const falas = p.frases.map(f => ({f, ws: f.words.filter(w => w.e > rel + 0.05)})).filter(x => x.ws.length);
      speechSynthesis.cancel(); this.vozFalando = falas.length; if (!falas.length) return;
      const voz = this.escolherVoz(), neural = voz && /natural|neural|online/i.test(voz.name), base = (neural ? 1 : 0.95) * (this.calibra || 1);
      const planejado = (falas[falas.length - 1].ws.slice(-1)[0].e - falas[0].ws[0].s) / ts, completa = rel < 0.3; let ini = 0;
      falas.forEach((x, i) => {
        const u = new SpeechSynthesisUtterance(x.ws.map(w => w.t).join(" "));
        u.lang = "pt-BR"; u.voice = voz; u.rate = Math.min(1.4, Math.max(0.8, base * ts)); u.pitch = 1;
        if (i === 0) u.onstart = () => { if (gen === this.vozGen) ini = performance.now(); };
        u.onend = u.onerror = ev => {
          if (gen !== this.vozGen || (ev.type === "error" && /canceled|interrupted/.test(ev.error))) return;
          if (--this.vozFalando > 0) return;
          if (completa && ini && planejado > 1) this.calibra = Math.min(1.2, Math.max(0.85, (this.calibra || 1) * (1 + 0.5 * ((performance.now() - ini) / 1000 / planejado - 1)))); /* fala mais longa que a peça acelera um pouco a próxima */
          this.vozFim();
        };
        speechSynthesis.speak(u);
      });
    }
    destruir() { this.pararVoz(); if (this.io) this.io.disconnect(); if (this.tl) this.tl.kill(); }

    /* ---------- legenda palavra por palavra e estado ---------- */
    sync() {
      const t = this.tl.time(), k = this.atual(), p = this.pecas[k];
      if (this.ultimaPeca !== k) { this.ultimaPeca = k; this.host.dispatchEvent(new CustomEvent("expl:peca", {bubbles: true, detail: {k, id: p.id, ordem: p.ordem}})); }
      this.host.querySelector(".expl-pos").textContent = p.final ? "Final" : `Peça ${p.ordem}/${this.script.pieces.length}`;
      this.host.querySelector(".expl-tempo").textContent = `${fmtT(t)} / ${fmtT(this.total)}`;
      this.host.querySelectorAll(".seg").forEach(b => { const q = this.pecas[+b.dataset.k], f = Math.min(1, Math.max(0, (t - q.start) / q.dur)); b.style.setProperty("--f", f); b.classList.toggle("atual", q.k === k); });
      this.hud.atualizar(t, p, this.estatico);
      if (this.voz) {
        const tocando = !this.tl.paused() && this.tl.progress() < 1 && !this.estatico;
        if (tocando && this.som) {
          if (this.vozK !== p.k) this.falar(p, t);
          else if (this.vozFalando > 0 && t >= p.start + p.words[p.words.length - 1].e) { this.segurando = true; this.tl.pause(); this.atualizarPlay(); }
        } else if (!this.segurando && this.vozK !== null) this.pararVoz();
      }
      if (!this.legendas) return;
      if (this.estatico) { if (this.fraseKey !== "e" + k) { this.fraseKey = "e" + k; this.cap.innerHTML = `<span class="frase">${p.words.map(w => `<span class="w on${w.hl ? " hl" : ""}">${esc(w.t)}</span>`).join(" ")}</span>`; } return; }
      const fr = p.frases.find(f => t >= f.s && t < f.e), chave = fr ? k + ":" + fr.s : "";
      if (chave !== this.fraseKey) { this.fraseKey = chave; this.cap.innerHTML = fr ? `<span class="frase">${fr.words.map(w => `<span class="w${w.hl ? " hl" : ""}">${esc(w.t)}</span>`).join(" ")}</span>` : ""; this.ws = [...this.cap.querySelectorAll(".w")]; this.cur = fr; }
      if (fr) fr.words.forEach((w, i) => this.ws[i].classList.toggle("on", t >= w.s));
    }
  }
  window.Explainer = Object.assign(window.Explainer || {}, {Player: ExplainerPlayer, palavras});
  window.Explainers = window.Explainers || {}; window.Cenas = window.Cenas || {};
})();
