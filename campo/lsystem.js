/* L-System: expande as regras de uma espécie e transforma em segmentos e folhas.
   Cada estágio de crescimento é uma iteração a mais. */
const LSystem = (() => {
  const cache = new Map();
  function expandir(axiom, regras, n) {
    let s = axiom;
    for (let i = 0; i < n; i++) { let t = ""; for (const c of s) t += regras[c] ?? c; s = t; }
    return s;
  }
  /* tartaruga: anda no plano com y para baixo, então o ângulo inicial aponta para cima */
  function tartaruga(s, graus, folha) {
    const ang = graus * Math.PI / 180, pilha = [], segs = [], folhas = []; let x = 0, y = 0, a = -Math.PI / 2, d = 0;
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (c === "F") {
        const nx = x + Math.cos(a), ny = y + Math.sin(a); segs.push([x, y, nx, ny, d]);
        if (folha === "pontas" && (s[i + 1] === "]" || i === s.length - 1)) folhas.push([nx, ny]);
        x = nx; y = ny;
      } else if (c === "X" && folha === "X") folhas.push([x, y]);
      else if (c === "+") a += ang;
      else if (c === "-") a -= ang;
      else if (c === "[") { pilha.push([x, y, a, d]); d++; }
      else if (c === "]") { [x, y, a, d] = pilha.pop(); }
    }
    return {segs, folhas};
  }
  /* devolve a figura normalizada para altura 1, com a base na origem */
  function gerar(especie, estagio) {
    const chave = especie.nome + ":" + estagio; if (cache.has(chave)) return cache.get(chave);
    const L = especie.lsystem, {segs, folhas} = tartaruga(expandir(L.axiom, L.regras, estagio), L.angulo, L.folha);
    let topo = 0; for (const [, y1, , y2] of segs) topo = Math.min(topo, y1, y2); for (const [, y] of folhas) topo = Math.min(topo, y);
    const figura = {segs, folhas, escala: 1 / (-topo || 1)};
    cache.set(chave, figura); return figura;
  }
  return {gerar, expandir};
})();
