/* Séries de Taylor com manipulação direta: arraste o centro a e o ponto de teste x no próprio gráfico.
   Carregado antes do app.js; os helpers globais (ctl, sel, btn, row, canvas, plane, arrastavel, kit...) só são usados dentro da função. */
window.LABS_V2 = window.LABS_V2 || {};

LABS_V2.taylor = function (stage, panel, extra) {
  const sc = {a0: -4.2, a1: 4.2, x0: -7, x1: 7, y0: -2.2, y1: 2.2};
  const FS = [
    {nome: "sen x", f: Math.sin, dn: (n, a) => [Math.sin(a), Math.cos(a), -Math.sin(a), -Math.cos(a)][n % 4], ...sc},
    {nome: "cos x", f: Math.cos, dn: (n, a) => [Math.cos(a), -Math.sin(a), -Math.cos(a), Math.sin(a)][n % 4], ...sc},
    {nome: "eˣ", f: Math.exp, dn: (n, a) => Math.exp(a), a0: -2, a1: 2, x0: -4, x1: 4, y0: -2, y1: 20},
    {nome: "ln(1 + x)", f: x => Math.log(1 + x), dn: (n, a) => n === 0 ? Math.log(1 + a) : (n % 2 ? 1 : -1) * fact(n - 1) / Math.pow(1 + a, n), a0: 0, a1: 3, x0: -0.95, x1: 5, y0: -3, y1: 2.5}
  ];
  const G = [
    {t: "Mova o ponto de teste até o erro ficar menor que 0,01, a pelo menos 0,5 de distância do centro.", ok: s => s.err < 0.01 && Math.abs(s.x - s.a) >= 0.5, win: () => "Acertou! Dá para confiar no polinômio nesse ponto."},
    {t: "Deixe só a tangente (ordem 1) e ache um ponto de teste onde o erro passe de 1.", ok: s => s.n === 1 && s.err > 1, win: () => "Isso mesmo: uma reta só segura a curva por perto."},
    {t: "No sen x, com centro em 0, chegue em x ≈ 3 com erro menor que 0,01. Qual a menor ordem que serve?", ok: s => s.k === 0 && Math.abs(s.a) <= 0.15 && Math.abs(s.x - 3) <= 0.12 && s.err < 0.01, win: s => `Acertou! Precisou de ordem ${s.n}. Dá para tentar com menos?`}
  ];
  const done = G.map((_, i) => !!Progress.get().goals["taylor:" + i]); let k = 0, first = true, tm = 0, prev = null, anim = 0, alvo = "x", pos = null;
  const c = canvas(stage, 380); c.setAttribute("role", "img");

  /* o Broto comenta o que mudou, um instante depois de você parar de mexer */
  function react(s) {
    const p = prev; prev = s; if (!broto) return;
    if (p && p.k !== s.k) return broto.say(`Agora é o ${FS[s.k].nome}. Onde você quer o centro?`, "thinking");
    if (s.lvl === "ok") return broto.say("Colou! Aqui a curva e o polinômio quase não se distinguem.", "happy");
    if (s.lvl === "bad") return broto.say(s.beyond ? "O ln(1 + x) só vale até 1 + a de distância do centro. Mais termos não ajudam." : s.dist > 1.2 ? "Muito longe do centro, a curva se solta!" : s.n < 12 ? "Poucos termos para essa curvatura. Que tal subir a ordem?" : "Nem com ordem alta. Chega o centro mais perto daqui.", "worried");
    if (p && p.n !== s.n) return broto.say(s.w > p.w ? "Mais um termo e a faixa verde cresceu." : "A faixa verde mudou de tamanho.", "neutral");
    broto.say("Quase lá. Dá para usar, mas a diferença já aparece.", "thinking");
  }

  const cen = a => (a - FS[k].a0) / (FS[k].a1 - FS[k].a0), A = () => FS[k].a0 + as.get() * (FS[k].a1 - FS[k].a0), XT = () => FS[k].x0 + xt.get() * (FS[k].x1 - FS[k].x0);
  const s = sel(panel, "Função", FS.map(f => f.nome), v => { parar(); k = v; as.set(cen(0)); xt.set(clamp((1 - FS[k].x0) / (FS[k].x1 - FS[k].x0), 0, 1)); draw(); }); panel.insertBefore(s.parentElement, panel.firstChild);
  const ns = ctl(panel, "Ordem do polinômio", 0, 12, 1, 3, v => v, () => { parar(); draw(); });
  const as = ctl(panel, "Centro a", 0, 1, 0.005, 0.5, v => fmt(FS[k].a0 + v * (FS[k].a1 - FS[k].a0), 2), draw);
  const xt = ctl(panel, "Ponto de teste x", 0, 1, 0.005, 0.8, v => fmt(FS[k].x0 + v * (FS[k].x1 - FS[k].x0), 2), draw);

  /* animação: a ordem sobe de 0 a 8, um passo por segundo; o temporizador é limpo ao sair do assunto */
  const rb = row(panel), bAn = btn(rb, "Animar a ordem", () => {
    if (anim) return parar();
    ns.set(0); bAn.textContent = "Parar"; bAn.setAttribute("aria-pressed", "true"); draw();
    anim = setInterval(() => { const n = ns.get() + 1; ns.set(n); draw(); if (n >= 8) { parar(); draw(); } }, 1000);
  }, true);
  function parar() { clearInterval(anim); anim = 0; bAn.textContent = "Animar a ordem"; bAn.setAttribute("aria-pressed", "false"); }
  const oldLeave = onLeave; onLeave = () => { clearInterval(anim); anim = 0; clearTimeout(tm); if (oldLeave) oldLeave(); };

  /* arrastar: pega o ponto mais próximo do clique (centro a ou ponto de teste x) e o leva ao longo da curva */
  const drag = arrastavel(c, (x, y, e) => {
    if (e.type === "pointerdown" && pos) {
      const b = c.getBoundingClientRect(), cx = e.clientX - b.left, cy = e.clientY - b.top, d = h => Math.hypot(cx - h.x, cy - h.y);
      alvo = d(pos.a) < d(pos.x) - 1 ? "a" : "x";
    }
    const F = FS[k];
    if (alvo === "a") as.set(clamp(cen(x), 0, 1)); else xt.set(clamp((x - F.x0) / (F.x1 - F.x0), 0, 1));
    draw();
  });

  /* ponto "pegável": círculo grande com anel e rótulo; fica dentro do quadro mesmo se a curva sai dele */
  function alca(p, t, y, cor, rot) {
    const g = p.g, px = p.X(t), py = clamp(p.Y(y), p.m.t + 14, p.h - p.m.b - 14);
    g.save(); g.beginPath(); g.arc(px, py, 14, 0, 7); g.globalAlpha = 0.2; g.fillStyle = cor; g.fill(); g.globalAlpha = 1; g.lineWidth = 2; g.strokeStyle = cor; g.stroke();
    g.beginPath(); g.arc(px, py, 7.5, 0, 7); g.fillStyle = cor; g.fill(); g.lineWidth = 2; g.strokeStyle = css("--panel"); g.stroke();
    g.font = `700 12px ${css("--f-body")}`; g.fillStyle = cor; g.textAlign = "center"; g.textBaseline = "bottom"; g.fillText(rot, px, py - 17); g.restore();
    return {x: px, y: py};
  }

  panel.insertAdjacentHTML("beforeend", `<div class="meter"><div class="meter-track" role="img" aria-label="Medidor de erro"><i class="g"></i><i class="y"></i><i class="r"></i><b class="pin"></b></div><div class="meter-lbl"><span>quase igual</span><span>perdida</span></div></div>
    <p class="msg" role="status"></p><div class="formula" aria-label="Polinômio de Taylor"></div><p class="hint"></p>`);
  const pin = $(".pin", panel), msg = $(".msg", panel), fml = $(".formula", panel), hint = $(".hint", panel), meter = $(".meter", panel);
  extra.innerHTML = `<h3 class="goals-title">Desafios</h3><ol class="goals">${G.map((g, i) => `<li class="goal" data-i="${i}"><span class="goal-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 13l5 5L20 6"/></svg></span><span>${g.t}</span></li>`).join("")}</ol><p class="goal-msg" role="status"></p>`;
  done.forEach((d, i) => { if (d) $(`.goal[data-i="${i}"]`, extra).classList.add("done"); });
  const P = (F, n, a, x) => { let s = 0; for (let j = 0; j <= n; j++) s += F.dn(j, a) / fact(j) * (x - a) ** j; return s; };

  function draw() {
    const F = FS[k], n = ns.get(), a = A(), x = XT(), fx = F.f(x), px = P(F, n, a, x), err = Math.abs(fx - px);
    const good = t => Math.abs(F.f(t) - P(F, n, a, t)) <= 0.05 * Math.max(1, Math.abs(F.f(t))), dt = (F.x1 - F.x0) / 600; let xl = a, xr = a;
    while (xr + dt <= F.x1 && good(xr + dt)) xr += dt; while (xl - dt >= F.x0 && good(xl - dt)) xl -= dt;
    const p = plane(c, F.x0, F.x1, F.y0, F.y1, "x", "y"), g = p.g; drag(p);
    p.clip(); g.globalAlpha = 0.17; g.fillStyle = css("--leaf"); g.fillRect(p.X(xl), p.m.t, p.X(xr) - p.X(xl), p.h - p.m.t - p.m.b); g.restore(); g.globalAlpha = 1;
    p.line(xl, F.y0, xl, F.y1, css("--leaf"), 1.5, [5, 4]); p.line(xr, F.y0, xr, F.y1, css("--leaf"), 1.5, [5, 4]);
    if (p.X(xr) - p.X(xl) > 74) { g.font = `700 20px ${css("--f-hand")}`; g.fillStyle = css("--leaf"); g.textAlign = "left"; g.textBaseline = "top"; g.fillText("faixa boa", p.X(xl) + 8, p.m.t + 6); }
    p.curve(F.f, css("--curve"), 3); p.curve(t => P(F, n, a, t), css("--amber"), 2.5);
    p.line(x, F.y0, x, F.y1, css("--muted"), 1, [4, 4]); p.dot(x, px, css("--amber"), 4.5);
    pos = {a: alca(p, a, F.f(a), css("--good"), "a"), x: alca(p, x, fx, css("--curve"), "x")};
    const rel = err / Math.max(1, Math.abs(fx)), lvl = rel < 0.01 ? "ok" : rel < 0.1 ? "mid" : "bad";
    pin.style.left = clamp((Math.log10(Math.max(rel, 1e-4)) + 4) / 4, 0, 1) * 100 + "%"; meter.dataset.level = lvl;
    $(".meter-track", panel).setAttribute("aria-label", `Medidor de erro: ${lvl === "ok" ? "bom" : lvl === "mid" ? "aceitável" : "aproximação perdida"}`);
    c.setAttribute("aria-label", `Gráfico de ${F.nome} em azul e do polinômio de Taylor de ordem ${n} em laranja, com centro a = ${fmt(a, 2)} e ponto de teste x = ${fmt(x, 2)}. Faixa boa de x = ${fmt(xl, 2)} até ${fmt(xr, 2)}. Diferença no ponto de teste: ${fmt(err, 4)}. Os controles deslizantes ajustam os mesmos valores.`);
    const beyond = k === 3 && Math.abs(x - a) > 1 + a;
    msg.dataset.level = lvl;
    msg.textContent = lvl === "ok" ? (rel < 0.0005 ? "Colados: aqui a curva e o polinômio quase não se distinguem." : "Bateu. A aproximação funciona neste ponto.")
      : lvl === "mid" ? "Dá para usar, mas já dá para ver a diferença."
      : beyond ? "Aqui a série do ln(1 + x) nunca fecha: ela só vale até 1 + a de distância do centro. Mais termos não resolvem."
      : n < 12 ? "Aqui a aproximação já se perdeu. Tente aumentar a ordem ou chegar mais perto do centro." : "Mesmo com ordem alta, esse ponto está longe demais do centro. Mova o centro para perto dele.";
    tex(fml, taylorTex(F, n, a));
    hint.textContent = `Faixa boa: de x = ${fmt(xl, 2)} até ${fmt(xr, 2)}. Diferença neste ponto: ${fmt(err, 4)}. Arraste no gráfico o ponto verde (centro a) ou o azul (ponto de teste x).`;
    const st = {k, n, a, x, err}; let won = false;
    /* durante a animação os desafios esperam: a ordem passa por valores que não são escolha sua */
    G.forEach((gl, i) => { if (!anim && !done[i] && gl.ok(st)) { won = true;
      done[i] = true; const li = $(`.goal[data-i="${i}"]`, extra); li.classList.add("done", "just"); $(".goal-msg", extra).textContent = gl.win(st);
      meter.classList.remove("flash"); void meter.offsetWidth; meter.classList.add("flash");
      if (broto) { clearTimeout(tm); broto.say(gl.win(st), "happy"); }
      window.dispatchEvent(new CustomEvent("mc:goal", {detail: {module: "taylor", index: i, total: G.length, el: li}}));
    } });
    const next = done.indexOf(false); extra.querySelectorAll(".goal").forEach((li, i) => li.classList.toggle("active", i === next));
    const now = {lvl, beyond, n, k, dist: Math.abs(x - a), w: xr - xl};
    if (first) { prev = now; first = false; } else if (!won) { clearTimeout(tm); tm = setTimeout(() => react(now), 450); }
  }
  draw(); return draw;
};
