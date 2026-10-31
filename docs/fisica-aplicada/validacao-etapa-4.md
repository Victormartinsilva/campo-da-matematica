# Etapa 4 — Laboratório de propulsão e foguetes

## Entrega

Foi implementado o primeiro laboratório interativo da trilha de Física, no módulo `propulsao`.

### Recursos

- Simulação bidimensional de movimento translacional.
- Estado inicial com velocidade de 35 m/s e motor desligado.
- Controles para massa, empuxo e direção do empuxo.
- Ligar/desligar motor, iniciar/pausar, avançar um segundo e reiniciar.
- Comando para orientar o empuxo contra o vetor velocidade atual.
- Visualização da trajetória, vetor velocidade e vetor empuxo.
- Indicadores de tempo, velocidade, aceleração, empuxo e deslocamento.
- Três desafios integrados ao sistema existente de progresso e ao Broto.
- Encerramento da animação e do monitoramento ao sair do módulo.

## Modelo físico e limites

O modelo usa integração numérica explícita em passos curtos e a relação `a = F/m`. A massa é mantida constante durante a simulação. O modelo não inclui gravidade, atmosfera, arrasto, rotação dinâmica, consumo de propelente nem dinâmica orbital. A direção do empuxo é controlada independentemente da velocidade, permitindo demonstrar que atitude e trajetória são conceitos distintos.

O cenário usa câmera que acompanha a nave; por isso, a posição visual central não representa repouso. A trajetória registrada e os indicadores numéricos representam o deslocamento no referencial inercial simplificado.

## Verificações executadas

- `node --check app.js`: aprovado.
- `node --check content.js`: aprovado.
- Revisão estática dos controles, callbacks e limpeza de `requestAnimationFrame`: realizada.
- Verificação numérica independente: com 4.500 kg e 9.000 N, a aceleração calculada é 2 m/s²; sem motor, a velocidade inicial de 35 m/s permanece constante no modelo.
- Conferência das condições dos três desafios: realizada.
- Teste automatizado de navegador: não concluído neste ambiente; a validação visual final deve ser feita localmente.

## Roteiro de validação manual

1. Abrir o módulo Física → Propulsão e foguetes.
2. Com motor desligado, avançar cinco vezes em `Avançar 1 s`; verificar velocidade próxima de 35 m/s.
3. Ligar o motor apontado para 0° e avançar alguns segundos; verificar aumento da velocidade.
4. Pausar e usar `Apontar contra velocidade`; ligar o motor e avançar até a velocidade ficar abaixo de 2 m/s.
5. Ajustar a direção para aproximadamente 90° e verificar alteração lateral da trajetória.
6. Sair do módulo durante a animação e retornar; verificar que não há animação duplicada ou atualização residual.
7. Alternar tema claro/escuro e redimensionar a janela.

## Status

Implementação concluída. Aguardando aprovação do usuário antes da Etapa 5.
