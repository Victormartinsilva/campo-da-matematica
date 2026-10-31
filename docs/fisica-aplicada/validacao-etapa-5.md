# Etapa 5 — Laboratórios interativos de Física

## Escopo implementado

A etapa acrescenta cinco laboratórios, mantendo o simulador de foguete da Etapa 4:

1. **Vetores:** módulos, ângulos, componentes cartesianas e resultante de dois vetores; desafios de equilíbrio e soma vetorial.
2. **Leis de Newton:** controles de força, massa e duração; cálculo de aceleração, velocidade e deslocamento sob força constante.
3. **Gravidade e órbitas:** modelo gravitacional bidimensional normalizado (`μ = 1`), integração velocity-Verlet e visualização da trajetória para diferentes velocidades tangenciais.
4. **Manobras:** aplicação de impulsos vetoriais, avanço da posição e distinção entre direção da trajetória e orientação selecionada.
5. **Engenharia e agricultura:** estimativa didática da tração máxima por `μ·m·g`, força efetivamente transmitida e potência útil `P = F·v`.

## Limites físicos e didáticos

- Vetores: unidades genéricas, sem associação automática a uma grandeza física específica.
- Newton: força constante, massa constante, movimento unidimensional e condições iniciais de repouso.
- Órbitas: unidades normalizadas e parâmetro gravitacional unitário; não representa escala terrestre real. A integração usa velocity-Verlet.
- Manobras: impulsos instantâneos e movimento retilíneo uniforme entre impulsos; sem gravidade ou rotação dinâmica.
- Agricultura: aproximação de tração limitada por aderência `Fmáx = μ·N`, com `N ≈ m·g`; não modela distribuição de carga por eixo, deformação do pneu, resistência ao rolamento, declividade, patinagem quantitativa ou eficiência de transmissão.

## Verificações executadas

- `node --check app.js`: aprovado.
- `node --check content.js`: aprovado.
- Verificação estática dos seis roteamentos de laboratório: aprovada.
- Verificação numérica independente: órbita circular com velocidade inicial 1,00 permaneceu em raio 1,00001 após 100 passos; caso com velocidade 0,70 permaneceu ligado (energia específica negativa); Newton com 2.000 N e 1.000 kg resultou em 2 m/s²; tração agrícola inicial calculada em 38.259 N e potência útil em 72 kW.
- Teste automatizado de navegador: não concluído neste ambiente; a validação visual e de interação permanece necessária localmente.

## Roteiro de validação manual

1. Abrir cada um dos seis módulos da área Física e confirmar que o laboratório correspondente aparece.
2. **Vetores:** ajustar A e B para mesmo módulo e sentidos opostos; a resultante deve ficar próxima de zero.
3. **Newton:** configurar 1.000 kg e 2.000 N; executar; a aceleração deve ser 2 m/s².
4. **Órbitas:** velocidade inicial 1,00 e avançar 100 passos; a distância ao centro deve permanecer próxima de uma unidade. Reiniciar com 0,70 e comparar a trajetória.
5. **Manobras:** aplicar impulso de 5 m/s a 90°; a componente vertical da velocidade deve aumentar em aproximadamente 5 m/s.
6. **Agricultura:** conferir a tração estimada com `μ × massa × 9,81`; elevar a força solicitada acima desse valor e observar o alerta de patinagem.
7. Voltar ao módulo de foguete e confirmar que o laboratório anterior continua funcionando.
8. Navegar entre módulos durante e após interações; confirmar que não há atualizações ou animações residuais.
9. Testar tema claro/escuro, largura reduzida e persistência do progresso.

## Status

Implementação dos cinco laboratórios concluída. Aguardando validação local e aprovação antes da Etapa 6.
