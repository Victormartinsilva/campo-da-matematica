/* Tela de entrada do caderno. Guarda só o resumo (SHA-256) do usuário e da senha, nunca o texto da senha.
   Atenção: o site é estático. A tela fecha o caderno para quem passa por ele, mas não é segurança de verdade:
   quem lê o código-fonte pode contorná-la. Para proteção real, use autenticação no servidor. */
(() => {
  const RESUMO = "38ea5801c3e67d127d0d97b30638a8e264e7dafc796adcaea2dcc04d9c08345d", CHAVE = "mc-auth", raiz = document.documentElement;
  const lembrado = () => { try { return sessionStorage.getItem(CHAVE) === "1" || localStorage.getItem(CHAVE) === "1"; } catch (e) { return false; } };
  const hex = async t => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)))].map(b => b.toString(16).padStart(2, "0")).join("");
  const inertes = on => [...document.body.children].forEach(el => { if (el.id !== "login") { if (on) el.setAttribute("inert", ""); else el.removeAttribute("inert"); } });

  function botaoSair() {
    const t = document.getElementById("theme"); if (!t || document.getElementById("sair")) return;
    const b = document.createElement("button"); b.id = "sair"; b.type = "button"; b.className = "sair"; b.textContent = "Sair"; b.setAttribute("aria-label", "Sair do caderno");
    b.onclick = () => { try { sessionStorage.removeItem(CHAVE); localStorage.removeItem(CHAVE); } catch (e) {} location.reload(); };
    t.insertAdjacentElement("beforebegin", b);
  }
  if (lembrado()) { raiz.classList.remove("mc-bloq"); botaoSair(); return; }

  const guia = typeof BROTO_SVG === "function" ? BROTO_SVG("calculo") : "";
  const el = document.createElement("div"); el.id = "login"; el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); el.setAttribute("aria-labelledby", "login-t");
  el.innerHTML = `<form class="login-card" novalidate autocomplete="on">
      <div class="login-guia" aria-hidden="true">${guia}</div>
      <p class="login-eyebrow">Caderno de campo</p>
      <h1 id="login-t">Matemática <em>no Campo</em></h1>
      <p class="login-sub">Entre para abrir o seu caderno de estudo.</p>
      <label class="login-campo"><span>Usuário</span><input name="username" type="text" autocomplete="username" autocapitalize="off" spellcheck="false" required></label>
      <label class="login-campo"><span>Senha</span><span class="login-senha"><input name="password" type="password" autocomplete="current-password" required><button type="button" class="login-ver" aria-pressed="false" aria-label="Mostrar a senha">Mostrar</button></span></label>
      <label class="login-lembrar"><input type="checkbox" name="lembrar"> Manter neste navegador</label>
      <p class="login-erro" role="alert" aria-live="assertive" hidden></p>
      <button class="btn login-entrar" type="submit">Entrar</button>
    </form>`;
  document.body.appendChild(el); inertes(true);
  const f = el.querySelector("form"), u = f.elements.username, s = f.elements.password, erro = el.querySelector(".login-erro"), ver = el.querySelector(".login-ver"), entrar = el.querySelector(".login-entrar");
  u.focus(); let falhas = 0, bloqueadoAte = 0;
  ver.onclick = () => { const mostrar = s.type === "password"; s.type = mostrar ? "text" : "password"; ver.textContent = mostrar ? "Ocultar" : "Mostrar"; ver.setAttribute("aria-pressed", mostrar); ver.setAttribute("aria-label", mostrar ? "Ocultar a senha" : "Mostrar a senha"); };
  const mostrarErro = t => { erro.textContent = t; erro.hidden = false; };
  f.addEventListener("submit", async e => {
    e.preventDefault(); const agora = Date.now();
    if (agora < bloqueadoAte) return mostrarErro(`Aguarde ${Math.ceil((bloqueadoAte - agora) / 1000)} s para tentar de novo.`);
    if (!u.value.trim() || !s.value) return mostrarErro("Preencha o usuário e a senha.");
    if (!(window.crypto && crypto.subtle)) return mostrarErro("Este navegador não permite conferir a senha aqui. Abra o site por https.");
    entrar.disabled = true;
    const certo = (await hex(`mc|${u.value.trim().toLowerCase()}|${s.value}`)) === RESUMO; entrar.disabled = false;
    if (!certo) { falhas++; bloqueadoAte = Date.now() + Math.min(30, 2 * falhas) * 1000; s.value = ""; s.focus(); return mostrarErro("Usuário ou senha incorretos."); }
    try { sessionStorage.setItem(CHAVE, "1"); if (f.elements.lembrar.checked) localStorage.setItem(CHAVE, "1"); } catch (x) {}
    el.remove(); inertes(false); raiz.classList.remove("mc-bloq"); botaoSair();
  });
})();
