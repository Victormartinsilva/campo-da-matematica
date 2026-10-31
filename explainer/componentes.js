/* Componentes visuais do mini-vídeo: etiqueta de categoria, contador de peças, terminal com digitação,
   pílula de status, exemplo, nota "por que importa", confete e chamada para ação.
   O Hud é uma função do tempo: dado o instante da timeline, mostra o estado certo (assim funciona ao voltar e avançar). */
(function () {
  const esc = t => String(t).replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const reduzido = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ICONES = {
    ok: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.500l4.500 4.500L19 7"/></svg>`,
    alerta: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l9 16H3zM12 10v4.500M12 17.500v.5"/></svg>`,
    erro: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>`
  };

  /* confete discreto de folhas e grãos dentro do palco */
  function confete(palco, n = 30) {
    if (reduzido()) return;
    const cores = ["--leaf", "--wheat", "--terra", "--water"].map(css), r = palco.getBoundingClientRect();
    for (let i = 0; i < n; i++) {
      const el = document.createElement("i"); el.className = "expl-cf " + (i % 3 ? "leaf" : "grain"); el.style.background = cores[i % cores.length]; el.style.left = Math.random() * r.width + "px"; el.style.top = "-14px"; palco.appendChild(el);
      const dx = (Math.random() - 0.5) * 120, rot = (Math.random() - 0.5) * 900, alt = r.height + 30;
      el.animate([{transform: "translate(0,0) rotate(0)", opacity: 1}, {transform: `translate(${dx}px,${alt}px) rotate(${rot}deg)`, opacity: 0.9}], {duration: 1700 + Math.random() * 1300, delay: Math.random() * 500, easing: "cubic-bezier(.3,.6,.5,1)", fill: "forwards"}).onfinish = () => el.remove();
    }
  }

  class Hud {
    constructor(player) {
      this.p = player; const h = player.host, m = player.script.meta;
      this.slot = n => h.querySelector(".slot-" + n); this.total = player.script.pieces.length; this.estado = {};
      this.slot("tag").innerHTML = `<span class="tag"><i></i>${esc(m.categoria)}</span>`;
      this.slot("counter").innerHTML = `<span class="contador"></span>`;
      this.slot("terminal").innerHTML = `<div class="term"><div class="term-bar"><i></i><i></i><i></i><span>terminal</span></div><pre class="cmd"></pre></div>`;
      this.slot("pill").innerHTML = `<span class="pill" role="status"></span>`;
      this.slot("example").innerHTML = `<div class="exemplo"><b class="ex-t"></b><p class="ex-p"></p></div>`;
      this.slot("why").innerHTML = `<div class="why"><b>Por que importa</b><p></p></div>`;
      this.slot("cta").innerHTML = `<button type="button" class="expl-cta"></button>`;
      this.cmd = this.slot("terminal").querySelector(".cmd"); this.pill = this.slot("pill").querySelector(".pill"); this.cta = this.slot("cta").querySelector(".expl-cta");
      this.cta.onclick = () => {
        const alvo = this.p.script.outro.alvoLab && document.querySelector(this.p.script.outro.alvoLab);
        h.dispatchEvent(new CustomEvent("expl:cta", {bubbles: true, detail: {id: m.id, alvo: this.p.script.outro.alvoLab}}));
        if (alvo) { alvo.scrollIntoView({behavior: reduzido() ? "auto" : "smooth", block: "center"}); alvo.setAttribute("tabindex", "-1"); alvo.focus({preventScroll: true}); }
      };
    }
    /* mostra ou esconde um slot, só mexendo no DOM quando o estado muda */
    ligar(nome, on) { if (this.estado[nome] === on) return false; this.estado[nome] = on; this.slot(nome).classList.toggle("on", on); return true; }

    atualizar(t, p, estatico) {
      const rel = t - p.start, E = this.estado;
      /* contador e etiqueta ficam sempre */
      const rot = p.final ? "FINAL" : `PEÇAS ${p.ordem}/${this.total}`;
      if (E.rot !== rot) { E.rot = rot; this.slot("counter").querySelector(".contador").textContent = rot; }
      this.slot("tag").classList.add("on"); this.slot("counter").classList.add("on");
      /* terminal com efeito de digitação */
      const T = p.terminal;
      if (T && rel >= T.at - 0.05) {
        const n = Math.floor(T.cmd.length * clamp((rel - T.at) / Math.max(0.1, T.dur), 0, 1)), chave = p.k + ":" + n;
        if (this.ligar("terminal", true) || E.cmd !== chave) { E.cmd = chave; this.cmd.textContent = T.cmd.slice(0, n); this.cmd.classList.toggle("digitando", n < T.cmd.length); }
      } else this.ligar("terminal", false);
      /* pílula de status */
      const S = p.status;
      if (S && rel >= S.at) { if (E.pillChave !== p.k) { E.pillChave = p.k; this.pill.className = "pill " + S.tipo; this.pill.innerHTML = `${ICONES[S.tipo] || ""}<span>${esc(S.texto)}</span>`; } this.ligar("pill", true); }
      else { this.ligar("pill", false); E.pillChave = null; }
      /* exemplo do dia a dia ou do trabalho */
      const X = p.example, xAt = X ? (X.at ?? 1.2) : 0;
      if (X && rel >= xAt) { if (E.exK !== p.k) { E.exK = p.k; const el = this.slot("example"); el.querySelector(".ex-t").textContent = X.titulo; el.querySelector(".ex-p").textContent = X.texto; } this.ligar("example", true); } else { this.ligar("example", false); E.exK = null; }
      /* por que esta peça importa, no fim da peça */
      if (p.why && rel >= p.dur - 2.6) { if (E.whyK !== p.k) { E.whyK = p.k; this.slot("why").querySelector("p").textContent = p.why; } this.ligar("why", true); } else { this.ligar("why", false); E.whyK = null; }
      /* final: chamada para ação e confete */
      if (p.final && rel >= 0.6) {
        if (E.ctaK !== p.k) { E.ctaK = p.k; this.cta.textContent = this.p.script.outro.cta || "Agora mexa no laboratório"; }
        this.ligar("cta", true);
        if (!E.confete && !estatico) { E.confete = true; confete(this.p.host.querySelector(".expl-stage")); }
      } else { this.ligar("cta", false); if (!p.final || rel < 0.2) E.confete = false; }
      this.slot("cta").style.pointerEvents = E.cta ? "auto" : "none";
    }
  }
  window.Explainer = Object.assign(window.Explainer || {}, {Hud, confete});
})();
