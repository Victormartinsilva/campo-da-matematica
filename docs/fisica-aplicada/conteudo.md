# Física Aplicada — conteúdo didático

**Versão:** Etapa 3 · Conteúdo dos seis capítulos

> Material didático inicial. Os modelos são simplificações para aprendizagem; aplicações reais exigem hipóteses, unidades, dados e fatores de segurança adequados.

## 01 — Grandezas, unidades e vetores

**Pergunta-guia:** Como descrever uma força que aponta para o nordeste e tem intensidade de 500 N?

**Síntese:** Grandezas escalares precisam apenas de valor e unidade. Grandezas vetoriais também exigem direção e sentido. Decompor vetores transforma movimentos e forças em contas organizadas por eixo.

### Explicação
A Física começa medindo. O Sistema Internacional (SI) padroniza unidades como metro (m), quilograma (kg), segundo (s), ampere (A) e kelvin (K). Massa, tempo, temperatura e energia são exemplos de grandezas escalares: um valor com unidade basta para descrevê-las. Deslocamento, velocidade, aceleração e força são vetoriais: além do módulo, precisam de direção e sentido. Em um plano cartesiano, um vetor de módulo A e ângulo θ em relação ao eixo x pode ser decomposto em Ax = A·cos(θ) e Ay = A·sen(θ). A soma de vetores é feita componente a componente. Se dois vetores são perpendiculares, o módulo da resultante é obtido pelo teorema de Pitágoras. O ângulo deve ser medido a partir do eixo de referência informado; trocar o eixo ou o sentido muda os sinais das componentes. Unidades também precisam ser coerentes: antes de calcular, converta quilômetros para metros, horas para segundos e toneladas para quilogramas quando necessário.

### Fórmulas essenciais

**Componentes cartesianas**

`Aₓ = A · cos(θ)   |   Aᵧ = A · sen(θ)`

A é o módulo do vetor e θ é o ângulo medido a partir do eixo x positivo.

**Módulo a partir das componentes**

`|A| = √(Aₓ² + Aᵧ²)`

Reconstrói o tamanho do vetor a partir das componentes horizontal e vertical.

**Soma vetorial**

`Rₓ = ΣAₓ   |   Rᵧ = ΣAᵧ`

Some separadamente todas as componentes em cada eixo; depois calcule o módulo e a direção da resultante.

**Conversão de velocidade**

`1 m/s = 3,6 km/h`

Multiplique m/s por 3,6 para obter km/h; divida km/h por 3,6 para voltar a m/s.

### Exemplos resolvidos

#### Exemplo 1 — Decompondo uma força

Uma força de 100 N atua a 30° acima do eixo horizontal. Quais são suas componentes?

1. Componente horizontal: Fx = 100 · cos(30°).
2. Componente vertical: Fy = 100 · sen(30°).
3. Usando cos(30°) ≈ 0,866 e sen(30°) = 0,5: Fx ≈ 86,6 N e Fy = 50 N.

**Resultado:** A força equivale a 86,6 N na horizontal e 50 N na vertical.

#### Exemplo 2 — Resultante perpendicular

Duas forças perpendiculares têm módulos de 3 N e 4 N. Qual é o módulo da resultante?

1. Como os vetores são perpendiculares, use Pitágoras.
2. R = √(3² + 4²) = √25.

**Resultado:** R = 5 N. A direção depende da orientação dos dois vetores.

### Exercícios

1. Um deslocamento tem módulo 20 m e forma 60° com o eixo x positivo. Quais são aproximadamente suas componentes?

   **Resposta:** Ax = 10 m e Ay ≈ 17,32 m.

   **Resolução:** Ax = 20·cos(60°) = 10. Ay = 20·sen(60°) ≈ 17,32.

2. Uma pessoa caminha 6 m para leste e depois 8 m para norte. Qual é o módulo do deslocamento resultante?

   **Resposta:** 10 m.

   **Resolução:** Os deslocamentos são perpendiculares: R = √(6² + 8²) = 10 m.

3. A velocidade de 72 km/h corresponde a quantos m/s?

   **Resposta:** 20 m/s.

   **Resolução:** 72 ÷ 3,6 = 20.

### Código Python

```python
import math

modulo = 100.0                              # intensidade do vetor em newtons
angulo_graus = 30.0                        # ângulo em relação ao eixo x
angulo = math.radians(angulo_graus)        # converte graus para radianos

ax = modulo * math.cos(angulo)             # componente horizontal
ay = modulo * math.sin(angulo)             # componente vertical
resultante = math.hypot(ax, ay)            # módulo reconstruído

print(f"Fx = {ax:.2f} N")
print(f"Fy = {ay:.2f} N")
print(f"Módulo = {resultante:.2f} N")
```

## 02 — Movimento e leis de Newton

**Pergunta-guia:** Por que um caminhão precisa de mais força que uma bicicleta para ganhar a mesma aceleração?

**Síntese:** A cinemática descreve como o movimento muda. As leis de Newton explicam por que ele muda: a força resultante produz aceleração, enquanto a inércia resiste à mudança de velocidade.

### Explicação
Posição, deslocamento, velocidade e aceleração descrevem o movimento. No movimento retilíneo uniforme, a velocidade é constante e a aceleração é zero. No movimento uniformemente variado, a aceleração é constante. A primeira lei de Newton afirma que um corpo mantém seu estado de repouso ou movimento retilíneo uniforme quando a força resultante é nula. A segunda lei relaciona força resultante, massa e aceleração: ΣF = m·a. A terceira lei diz que forças de interação surgem em pares de mesma intensidade e direção, mas sentidos opostos, aplicadas em corpos diferentes. Peso é a força gravitacional sobre um corpo; massa mede sua inércia. Atrito é uma força de contato que se opõe ao deslizamento relativo ou à tendência de deslizamento. Em problemas, desenhe o diagrama de corpo livre, escolha eixos, decomponha forças e só então aplique as equações. A aceleração acompanha a força resultante, não necessariamente a direção da velocidade.

### Fórmulas essenciais

**Velocidade média**

`vₘ = Δs / Δt`

Deslocamento dividido pelo intervalo de tempo. No SI, m/s.

**Aceleração média**

`a = Δv / Δt`

Variação da velocidade por unidade de tempo. No SI, m/s².

**Movimento com aceleração constante**

`v = v₀ + a·t   |   Δs = v₀·t + ½·a·t²`

Equações horárias para movimento retilíneo com aceleração constante.

**Segunda lei de Newton**

`ΣF = m·a`

A força resultante, em newtons, é igual à massa em kg multiplicada pela aceleração em m/s².

**Peso próximo à superfície da Terra**

`P = m·g   (g ≈ 9,81 m/s²)`

Peso é uma força e varia com o campo gravitacional; massa não muda ao trocar de planeta.

### Exemplos resolvidos

#### Exemplo 1 — Aceleração de um veículo

Um veículo de 1.200 kg recebe força resultante horizontal de 2.400 N. Desprezando outras forças horizontais, qual é sua aceleração?

1. Identifique m = 1.200 kg e ΣF = 2.400 N.
2. Aplique ΣF = m·a e isole a: a = ΣF/m.
3. a = 2.400/1.200 = 2 m/s².

**Resultado:** A aceleração é 2 m/s² no sentido da força resultante.

#### Exemplo 2 — Velocidade após alguns segundos

Um corpo parte com velocidade de 5 m/s e acelera a 2 m/s² durante 4 s. Qual será a velocidade final?

1. Use v = v₀ + a·t.
2. v = 5 + 2·4 = 13 m/s.

**Resultado:** A velocidade final é 13 m/s, supondo aceleração constante.

### Exercícios

1. Uma força resultante de 900 N atua em uma massa de 300 kg. Qual é a aceleração?

   **Resposta:** 3 m/s².

   **Resolução:** a = ΣF/m = 900/300 = 3 m/s².

2. Um objeto de 10 kg está em repouso e recebe força resultante constante de 20 N durante 3 s. Qual é sua velocidade final?

   **Resposta:** 6 m/s.

   **Resolução:** a = 20/10 = 2 m/s². Então v = 0 + 2·3 = 6 m/s.

3. Se a força resultante sobre um corpo é zero, ele necessariamente está parado?

   **Resposta:** Não.

   **Resolução:** Pela primeira lei de Newton, ele pode estar em repouso ou em movimento retilíneo uniforme.

### Código Python

```python
massa = 1200.0                              # massa do veículo em kg
forca_resultante = 2400.0                  # força horizontal resultante em N
velocidade_inicial = 5.0                   # velocidade inicial em m/s
tempo = 4.0                                # duração em segundos

aceleracao = forca_resultante / massa     # segunda lei de Newton
velocidade_final = velocidade_inicial + aceleracao * tempo
deslocamento = velocidade_inicial * tempo + 0.5 * aceleracao * tempo**2

print(f"Aceleração: {aceleracao:.2f} m/s²")
print(f"Velocidade final: {velocidade_final:.2f} m/s")
print(f"Deslocamento: {deslocamento:.2f} m")
```

## 03 — Propulsão e foguetes

**Pergunta-guia:** Se não existe ar no espaço, contra o que o foguete empurra para avançar?

**Síntese:** Um foguete acelera ao expelir massa em alta velocidade. A conservação da quantidade de movimento explica a propulsão; o empuxo altera a velocidade e pode acelerar, frear ou desviar a nave.

### Explicação
O motor de um foguete não precisa empurrar o ar. Ele lança gases para trás e, pela conservação da quantidade de movimento, o foguete recebe variação de movimento no sentido oposto. A terceira lei de Newton descreve as forças de interação entre motor e gases; a conservação do momento explica o sistema foguete + propelente. Empuxo é uma força, medida em newtons. A aceleração instantânea depende da força resultante e da massa naquele instante. Como o combustível é consumido, a massa do foguete diminui; por isso, a aceleração pode aumentar mesmo com empuxo aproximadamente constante. Desligar o motor não faz a nave parar: sem força resultante significativa, ela mantém sua velocidade. Para frear, é necessário produzir aceleração contrária à velocidade. Para curvar, aplica-se uma força com componente perpendicular à velocidade. Em uma descrição mais completa, a equação ideal do foguete relaciona a variação de velocidade à velocidade efetiva de exaustão e à razão entre massa inicial e final. Atmosfera, gravidade, perdas e limites estruturais tornam o voo real mais complexo; os exemplos desta trilha isolam princípios para facilitar a compreensão.

### Fórmulas essenciais

**Quantidade de movimento**

`p = m·v`

Produto da massa pela velocidade; é uma grandeza vetorial.

**Impulso**

`J = F·Δt = Δp`

Para força constante, o impulso é força vezes tempo e corresponde à variação da quantidade de movimento.

**Aceleração translacional**

`a = Fresultante / m`

Modelo instantâneo: use a massa atual do veículo e a força resultante naquele instante.

**Equação ideal do foguete**

`Δv = vₑ · ln(m₀ / m_f)`

vₑ é a velocidade efetiva de exaustão; m₀ é a massa inicial e m_f a massa final. Modelo ideal sem perdas externas.

### Exemplos resolvidos

#### Exemplo 1 — Aceleração simplificada

Um veículo espacial tem massa instantânea de 6.000 kg e recebe empuxo resultante de 12.000 N. Qual é a aceleração naquele instante?

1. Considere o empuxo como força resultante no eixo analisado.
2. a = F/m = 12.000/6.000.
3. a = 2 m/s².

**Resultado:** A aceleração instantânea é 2 m/s². À medida que a massa diminui, esse valor muda se o empuxo permanecer igual.

#### Exemplo 2 — Frenagem no espaço

Uma nave se desloca a 100 m/s para a direita. Um motor produz aceleração constante de 2 m/s² para a esquerda. Quanto tempo leva para reduzir a velocidade a zero?

1. Defina a direita como positiva: v₀ = 100 m/s e a = −2 m/s².
2. Use v = v₀ + a·t e faça v = 0.
3. 0 = 100 − 2t; portanto t = 50 s.

**Resultado:** A nave leva 50 s para parar nesse modelo. O motor precisa atuar no sentido contrário ao movimento.

### Exercícios

1. Uma nave de 2.000 kg recebe força resultante de 4.000 N. Qual é a aceleração instantânea?

   **Resposta:** 2 m/s².

   **Resolução:** a = F/m = 4.000/2.000 = 2 m/s².

2. Uma nave segue em linha reta com motores desligados e força resultante desprezível. O que acontece com sua velocidade?

   **Resposta:** Permanece constante.

   **Resolução:** A primeira lei de Newton: força resultante zero implica aceleração zero, não velocidade zero.

3. Para reduzir a velocidade de uma nave que avança para a direita, em que sentido deve apontar a aceleração de frenagem?

   **Resposta:** Para a esquerda.

   **Resolução:** A aceleração precisa ter componente contrária à velocidade para reduzir seu módulo.

### Código Python

```python
massa = 6000.0                              # massa instantânea em kg
empuxo = 12000.0                            # empuxo resultante em N
velocidade = 100.0                          # velocidade inicial em m/s

aceleracao = empuxo / massa                # modelo instantâneo com massa constante no passo
print(f"Aceleração: {aceleracao:.2f} m/s²")

# Exemplo separado: frenagem com aceleração contrária ao movimento
aceleracao_frenagem = -2.0                 # sinal negativo: sentido oposto à velocidade
tempo_parada = -velocidade / aceleracao_frenagem
print(f"Tempo para parar: {tempo_parada:.1f} s")

# Em um foguete real, a massa diminui durante a queima do propelente.
```

## 04 — Gravidade e órbitas

**Pergunta-guia:** Se a gravidade puxa a estação espacial, por que ela não cai diretamente sobre a Terra?

**Síntese:** A gravidade atua mesmo a grandes altitudes. Uma órbita acontece quando a velocidade tangencial faz o corpo cair continuamente ao redor do planeta, sem atingir sua superfície.

### Explicação
Toda massa atrai outra massa. A lei da gravitação universal calcula a intensidade dessa força usando as massas envolvidas e a distância entre seus centros. Próximo à superfície terrestre, o campo gravitacional tem módulo aproximado de 9,81 m/s², mas esse valor diminui com a altitude. Em órbita circular, a gravidade fornece a força centrípeta necessária para curvar a trajetória. A nave está em queda livre contínua: ela e tudo dentro dela aceleram aproximadamente juntos, o que produz a sensação de ausência de peso. Isso não significa ausência de gravidade. Para uma órbita circular ideal, a velocidade depende da massa do corpo central e do raio orbital medido a partir do centro do planeta. Se a velocidade tangencial for insuficiente, a trajetória pode interceptar o planeta; se for muito alta, pode se tornar uma órbita elíptica ou uma trajetória de escape, dependendo das condições. A velocidade de escape é a mínima velocidade ideal para chegar muito longe sem propulsão adicional, desprezando atmosfera e outros corpos. Órbitas reais sofrem perturbações de outros corpos, irregularidades gravitacionais e resistência atmosférica em baixas altitudes.

### Fórmulas essenciais

**Gravitação universal**

`F = G · (M·m / r²)`

G é a constante gravitacional; M e m são as massas; r é a distância entre os centros.

**Campo gravitacional**

`g = G·M / r²`

Aceleração gravitacional produzida por uma massa M a uma distância r.

**Velocidade orbital circular**

`vₒ = √(G·M / r)`

Velocidade necessária para uma órbita circular ideal de raio r ao redor da massa M.

**Velocidade de escape**

`vₑₛc = √(2·G·M / r)`

Velocidade mínima ideal para escapar do campo gravitacional sem propulsão posterior.

### Exemplos resolvidos

#### Exemplo 1 — Gravidade em altitude

Considere um planeta de massa M. Se a distância ao centro dobra, como fica o módulo do campo gravitacional?

1. Use g = G·M/r².
2. Substitua r por 2r: g₂ = G·M/(2r)².
3. g₂ = G·M/(4r²) = g₁/4.

**Resultado:** O campo gravitacional cai para um quarto do valor inicial quando a distância ao centro dobra.

#### Exemplo 2 — Velocidade orbital terrestre aproximada

Use G = 6,674×10⁻¹¹ SI, M = 5,972×10²⁴ kg e raio orbital r = 6,78×10⁶ m. Estime a velocidade circular.

1. Aplique v = √(G·M/r).
2. Substitua os valores em unidades SI.
3. O resultado é aproximadamente 7.670 m/s.

**Resultado:** A velocidade orbital é cerca de 7,67 km/s, em um modelo circular ideal.

### Exercícios

1. Se a distância entre dois corpos dobra, mantendo as massas, como muda a força gravitacional?

   **Resposta:** Cai para um quarto.

   **Resolução:** A força é inversamente proporcional ao quadrado da distância: 1/(2²) = 1/4.

2. Astronautas em uma estação orbital estão fora da gravidade terrestre?

   **Resposta:** Não.

   **Resolução:** A gravidade ainda atua. A sensação de ausência de peso ocorre porque estação e astronautas estão em queda livre conjunta.

3. Na fórmula da velocidade orbital, r é a altitude acima do solo ou a distância ao centro do planeta?

   **Resposta:** Distância ao centro do planeta.

   **Resolução:** Se a altitude for h, use r = raio do planeta + h.

### Código Python

```python
G = 6.674e-11                               # constante gravitacional, N·m²/kg²
M_terra = 5.972e24                          # massa da Terra em kg
raio_orbital = 6.78e6                       # distância ao centro da Terra em m

g = G * M_terra / raio_orbital**2          # campo gravitacional na órbita
v_orbital = (G * M_terra / raio_orbital) ** 0.5
v_escape = (2 * G * M_terra / raio_orbital) ** 0.5

print(f"g = {g:.3f} m/s²")
print(f"Velocidade orbital = {v_orbital/1000:.2f} km/s")
print(f"Velocidade de escape = {v_escape/1000:.2f} km/s")
```

## 05 — Manobras e navegação espacial

**Pergunta-guia:** Uma nave pode girar para apontar a câmera sem mudar o caminho que está percorrendo?

**Síntese:** Orientação e trajetória são coisas diferentes. Girar a nave altera sua atitude; aplicar força altera sua quantidade de movimento e, portanto, sua trajetória.

### Explicação
A atitude descreve para onde a nave está apontada. A trajetória descreve como sua posição muda no espaço. Uma nave pode girar em torno do próprio centro de massa sem alterar significativamente a velocidade do centro de massa. Para isso, sistemas de controle de atitude aplicam torques: rodas de reação, giroscópios de controle ou pequenos propulsores. Já para mudar a trajetória, é necessário produzir impulso externo, por exemplo com propulsores. Um pulso de força altera a quantidade de movimento: quanto maior a força ou o tempo de aplicação, maior a variação de velocidade para uma mesma massa. Uma queima na direção do movimento aumenta a velocidade; uma queima contrária reduz; uma queima perpendicular altera principalmente a direção da velocidade. Em órbita, pequenas variações de velocidade podem mudar bastante a forma e a orientação da órbita ao longo do tempo. O controle real exige considerar massa variável, braços de alavanca, acoplamentos, atrasos dos atuadores e restrições de combustível. O modelo didático separa primeiro rotação e translação para evitar a confusão comum de que apontar o nariz da nave automaticamente muda seu rumo.

### Fórmulas essenciais

**Impulso e variação de velocidade**

`Δv = F·Δt / m`

Para força constante e massa aproximadamente constante durante o pulso.

**Torque**

`τ = r × F`

O torque depende da força e do braço perpendicular em relação ao centro de massa.

**Momento angular**

`L = I·ω`

Para rotação em torno de eixo principal fixo: I é o momento de inércia e ω a velocidade angular.

**Aceleração angular**

`τ = I·α`

Em um modelo de eixo fixo, torque resultante produz aceleração angular.

### Exemplos resolvidos

#### Exemplo 1 — Pulso de propulsor

Um propulsor aplica 20 N durante 4 s em uma nave de 1.000 kg. Qual é a variação de velocidade?

1. Calcule o impulso: J = F·Δt = 20·4 = 80 N·s.
2. Use Δv = J/m.
3. Δv = 80/1.000 = 0,08 m/s.

**Resultado:** A velocidade muda em 0,08 m/s na direção do propulsor. O sentido depende da orientação do jato e da força sobre a nave.

#### Exemplo 2 — Girar sem transladar

Uma nave usa propulsores em pares opostos, produzindo torque resultante, mas força resultante aproximadamente nula. O que muda?

1. A força resultante próxima de zero implica aceleração translacional próxima de zero.
2. O torque resultante diferente de zero altera a rotação.
3. A atitude muda, mas a velocidade do centro de massa permanece aproximadamente igual.

**Resultado:** A nave pode apontar para outra direção sem mudar imediatamente sua trajetória.

### Exercícios

1. Um propulsor de 10 N atua por 5 s em uma nave de 500 kg. Qual é o módulo de Δv?

   **Resposta:** 0,10 m/s.

   **Resolução:** Δv = F·Δt/m = 10·5/500 = 0,10 m/s.

2. Uma nave gira 90° usando rodas de reação, sem aplicar força externa significativa. Sua trajetória muda automaticamente?

   **Resposta:** Não.

   **Resolução:** A orientação muda; sem força externa resultante, a velocidade do centro de massa não muda de forma significativa.

3. Qual é o efeito de um impulso perpendicular à velocidade instantânea?

   **Resposta:** Altera a direção da velocidade.

   **Resolução:** A componente perpendicular de Δv muda a direção do vetor velocidade; uma componente paralela muda seu módulo.

### Código Python

```python
massa = 1000.0                               # massa da nave em kg
forca = 20.0                                 # força aplicada pelo propulsor em N
duracao = 4.0                               # tempo de acionamento em s

impulso = forca * duracao                  # N·s
delta_v = impulso / massa                  # variação de velocidade em m/s

print(f"Impulso: {impulso:.1f} N·s")
print(f"Variação de velocidade: {delta_v:.3f} m/s")

# O cálculo não descreve a rotação da nave. Para isso, seria necessário
# conhecer o torque aplicado e o momento de inércia.
```

## 06 — Física aplicada à engenharia e agricultura

**Pergunta-guia:** Por que um trator mais potente nem sempre consegue puxar um implemento mais pesado?

**Síntese:** Trabalho, energia, potência, atrito e tração ajudam a dimensionar máquinas, bombas e operações agrícolas. Potência disponível não elimina limites de aderência, resistência e eficiência.

### Explicação
Trabalho mede a energia transferida por uma força ao longo de um deslocamento. Quando a força é paralela ao movimento, trabalho é força vezes deslocamento; quando há ângulo, entra o cosseno desse ângulo. Potência mede a rapidez com que o trabalho é realizado. Em movimento retilíneo com força e velocidade na mesma direção, P = F·v. Para um trator, a potência no motor não chega integralmente à barra de tração: transmissão, pneus, solo e implemento introduzem perdas. A força de tração disponível depende da aderência entre pneu e solo e pode ser limitada pelo patinamento. Atrito de deslizamento é frequentemente aproximado por μ·N em modelos simples, mas o solo agrícola é deformável e seu comportamento depende de umidade, textura, compactação e tipo de rodado. Em sistemas de bombeamento, a potência hidráulica ideal depende da densidade do fluido, gravidade, vazão e altura manométrica; a potência exigida no eixo é maior devido à eficiência menor que 100%. Esses modelos são estimativas de engenharia: para dimensionamento real, use curvas do fabricante, medições de campo, condições de operação e fatores de segurança.

### Fórmulas essenciais

**Trabalho de uma força constante**

`W = F·d·cos(θ)`

F é a força, d o deslocamento e θ o ângulo entre força e deslocamento. Unidade: joule (J).

**Potência média**

`P = W / Δt`

Trabalho realizado por unidade de tempo. Unidade: watt (W).

**Potência mecânica em movimento**

`P = F·v`

Válida quando força e velocidade são paralelas; para ângulo, use P = F·v·cos(θ).

**Atrito cinético simplificado**

`Fₐₜ = μₖ·N`

μₖ é o coeficiente de atrito cinético e N a força normal. É uma aproximação de contato seco rígido.

**Potência hidráulica de uma bomba**

`Pₕ = ρ·g·Q·H   |   Pentrada = Pₕ / η`

ρ é densidade, Q vazão volumétrica, H altura manométrica e η eficiência global.

### Exemplos resolvidos

#### Exemplo 1 — Potência na barra de tração

Um trator exerce força de tração de 18 kN e se desloca a 2 m/s. Qual é a potência mecânica transmitida nessa condição?

1. Converta 18 kN para 18.000 N.
2. Como força e velocidade estão na mesma direção, use P = F·v.
3. P = 18.000·2 = 36.000 W.

**Resultado:** A potência na barra é 36 kW. A potência exigida no motor será maior devido às perdas do sistema.

#### Exemplo 2 — Potência de bombeamento

Uma bomba movimenta água (ρ = 1.000 kg/m³) com vazão de 0,02 m³/s e altura manométrica de 20 m. Considere eficiência global de 70%. Estime a potência de entrada.

1. Calcule a potência hidráulica: Pₕ = ρ·g·Q·H.
2. Pₕ = 1.000·9,81·0,02·20 = 3.924 W.
3. Divida pela eficiência: Pentrada = 3.924/0,70 ≈ 5.606 W.

**Resultado:** A potência de entrada estimada é 5,6 kW. O valor real depende da curva da bomba e das perdas da instalação.

### Exercícios

1. Uma máquina aplica força constante de 500 N ao longo de 10 m, na mesma direção do deslocamento. Qual é o trabalho?

   **Resposta:** 5.000 J.

   **Resolução:** W = F·d = 500·10 = 5.000 J.

2. Um equipamento realiza 12.000 J de trabalho em 20 s. Qual é a potência média?

   **Resposta:** 600 W.

   **Resolução:** P = W/Δt = 12.000/20 = 600 W.

3. Se a eficiência de uma bomba é 80%, a potência de entrada é menor ou maior que a potência hidráulica útil?

   **Resposta:** Maior.

   **Resolução:** Pentrada = Pútil/η. Com η menor que 1, a potência de entrada precisa ser maior para compensar as perdas.

### Código Python

```python
# Potência de tração de um trator
forca_tracao = 18_000.0                    # 18 kN convertidos para N
velocidade = 2.0                           # m/s
potencia_tracao = forca_tracao * velocidade

# Estimativa de potência de entrada de uma bomba
densidade = 1000.0                        # água, kg/m³
gravidade = 9.81                           # m/s²
vazao = 0.02                              # m³/s
altura = 20.0                             # m
eficiencia = 0.70                         # 70%
potencia_hidraulica = densidade * gravidade * vazao * altura
potencia_entrada = potencia_hidraulica / eficiencia

print(f"Tração: {potencia_tracao/1000:.1f} kW")
print(f"Potência hidráulica: {potencia_hidraulica/1000:.2f} kW")
print(f"Potência de entrada estimada: {potencia_entrada/1000:.2f} kW")
```
