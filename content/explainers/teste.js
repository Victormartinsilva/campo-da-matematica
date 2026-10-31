/* Roteiro de teste do player (Fase 1): três peças com uma cena simples. Use como modelo mínimo. */
window.Explainers = window.Explainers || {};
Explainers.teste = {
  meta: {id: "teste", categoria: "TESTE", area: "calculo", titulo: "Cenário de teste do player", duracao: 24, cena: "teste"},
  pieces: [
    {id: "terreno", ordem: 1, narration: "Este é o terreno. A curva mostra a altura em cada ponto da lavoura.", dur: 7,
      words: Explainer.palavras("Este é o terreno. A curva mostra a altura em cada ponto da lavoura.", ["terreno", "curva", "altura"]),
      scene: [{at: 0.4, acao: "desenhar", alvo: "relevo", dur: 3}]},
    {id: "centro", ordem: 2, narration: "Aqui fica o centro, o ponto onde a gente vai olhar de perto.", dur: 7,
      words: Explainer.palavras("Aqui fica o centro, o ponto onde a gente vai olhar de perto.", ["centro", "perto"]),
      scene: [{at: 0.3, acao: "aparecer", alvo: "bandeira", dur: 0.7}, {at: 1.2, acao: "destacar", alvo: "bandeira", dur: 1}, {at: 3, acao: "aparecer", alvo: "faixa", dur: 0.8}]},
    {id: "afastar", ordem: 3, narration: "Se o sensor se afasta do centro, a faixa verde fica para trás.", dur: 8,
      words: Explainer.palavras("Se o sensor se afasta do centro, a faixa verde fica para trás.", ["sensor", "faixa", "verde"]),
      scene: [{at: 0.2, acao: "aparecer", alvo: "ponto", dur: 0.6}, {at: 1, acao: "mover", alvo: "ponto", dur: 3, para: {x: 220, y: -26}}, {at: 1, acao: "zoom", cx: 480, cy: 250, escala: 1.4, dur: 2}, {at: 4.5, acao: "cor", alvo: "ponto", dur: 0.6, para: {fill: "--alert"}}]}
  ],
  outro: {id: "final", dur: 6, narration: "É isso. Agora o player já toca, pausa, volta e avança.", words: Explainer.palavras("É isso. Agora o player já toca, pausa, volta e avança.", ["player"]),
    scene: [{at: 0.3, acao: "zoom", cx: 400, cy: 225, escala: 1, dur: 1.2}]}
};
