/* Aplicações de cada assunto por contexto: agro e ambiente, políticas públicas, engenharia, dados e IA, negócios e dia a dia.
   Para acrescentar um contexto, adicione-o em CONTEXTOS (app.js) e uma chave nova em cada assunto aqui. */
const CTX_TEXTO = {
  "funcao": {
    "agro": "Toda recomendação técnica é uma função: dose de adubo vira produtividade, lâmina de água vira produção, temperatura vira ritmo de desenvolvimento. Sem a função você só tem uma tabela de pontos soltos.",
    "publico": "A cobertura de vacinação em função do investimento em campanhas, ou o tempo de espera em função do número de atendentes. Conhecer a regra e o domínio evita prometer resultado fora da faixa já observada.",
    "engenharia": "A deformação de uma mola cresce em linha reta com a carga até certo limite, e depois a regra muda. O diagrama tensão-deformação é uma função com domínio de validade.",
    "dados": "Um modelo de ML é uma função aprendida, f(entrada; parâmetros), e um endpoint de API também é uma função. Entender domínio e extrapolação explica por que um modelo erra fora do que viu no treino, o chamado drift.",
    "negocios": "A demanda em função do preço, o custo total em função da produção e a receita em função do gasto com anúncios são funções. Cada uma vale no intervalo em que foi medida.",
    "dia": "Frete por quilômetro, conta de energia e parcela de financiamento são funções. Conhecer o domínio evita extrapolar: uma dose de 1.000 kg/ha não rende 1.000 sacas."
  },
  "limite": {
    "agro": "O que acontece com a produtividade quando a dose cresce sem parar? Ela satura em um platô. Concentração de nutriente na solução, temperatura de equilíbrio e tamanho de amostra grande também são perguntas de limite.",
    "publico": "A cobertura de um serviço, como saneamento ou vacina, tende a 100% sem nunca passar disso. O limite diz para onde a série vai, mesmo que ela nunca chegue lá.",
    "engenharia": "A tensão num circuito RC tende a um valor final depois de algum tempo, e a velocidade de um objeto em queda tende à velocidade terminal. O limite descreve o regime permanente.",
    "dados": "Convergência de treino, tolerância ε, estabilidade numérica (overflow no softmax, log de zero) e o que acontece com latência e custo quando o volume cresce sem parar em um pipeline.",
    "negocios": "O custo médio por unidade tende ao custo variável quando a produção cresce, porque o custo fixo se dilui. Esse limite explica a economia de escala.",
    "dia": "É a forma rigorosa de lidar com o 0/0 e com o “tende a”. Derivada e integral são definidas como limites. Também mostra quando um modelo quebra, como em degraus de tarifa ou divisão por zero."
  },
  "derivada": {
    "agro": "Quanto cada kg extra de nitrogênio rende (produto marginal). Quão rápido a planta cresce hoje. Vazão é a derivada do volume no tempo. Taxa de infiltração é a derivada da lâmina infiltrada.",
    "publico": "O ritmo de casos novos por dia é a derivada do total de casos. Quando ele passa a cair, a epidemia desacelera, mesmo com o total ainda subindo.",
    "engenharia": "Velocidade é a derivada da posição, e aceleração é a derivada da velocidade. Num sensor, a taxa de variação da temperatura mostra se um processo esquenta rápido demais.",
    "dados": "Backpropagation é a regra da cadeia aplicada camada por camada, e os otimizadores (SGD, Adam) usam essas derivadas. Em séries temporais de métricas, a taxa de variação ajuda a detectar anomalias.",
    "negocios": "A receita marginal é a derivada da receita em relação à quantidade vendida. Elasticidade e crescimento mês a mês também são taxas de variação.",
    "dia": "O velocímetro é a derivada da posição. Em inteligência artificial, treinar um modelo é descer uma ladeira guiado por derivadas. A reta tangente é a melhor aproximação linear perto do ponto."
  },
  "maxmin": {
    "agro": "A dose de adubo que dá mais lucro não é a que dá mais produção: depois de certo ponto, o último quilo custa mais do que rende. O mesmo vale para ração, lâmina de irrigação e dimensionamento de canais.",
    "publico": "Onde pôr o próximo posto de saúde para atender mais gente com o mesmo orçamento? Achar o ponto em que o ganho marginal cai a zero é o mesmo problema de achar o máximo.",
    "engenharia": "Dimensionar uma viga ou um duto gastando o mínimo de material, respeitando a resistência. O mínimo de custo aparece onde a derivada se anula.",
    "dados": "Treinar é minimizar uma função de perda. A mesma lógica acha o ponto ideal entre custo e qualidade (tamanho de chunk, tokens, temperatura) e o limiar de um guardrail, entre falso positivo e falso negativo.",
    "negocios": "O preço que maximiza o lucro, a produção que minimiza o custo médio e o estoque que equilibra falta e sobra são problemas de máximo e mínimo.",
    "dia": "Qualquer decisão do tipo “até onde vale a pena” é um problema de otimização. O botão abaixo faz o que algoritmos de aprendizado de máquina fazem: seguir a derivada, passo a passo."
  },
  "integral": {
    "agro": "Chuva acumulada a partir da intensidade, volume irrigado a partir da vazão, carga de sedimentos, graus-dia acumulados ao longo da safra. O equipamento mede a taxa e a integral entrega o total.",
    "publico": "O gasto total de um programa a partir do gasto mensal, ou o total de atendimentos a partir do ritmo diário, é uma integral. O gráfico de taxa por tempo guarda o total na área.",
    "engenharia": "Energia é a integral da potência no tempo, e o deslocamento é a integral da velocidade. É o que fazem um medidor de energia e um hodômetro.",
    "dados": "Probabilidade é área sob uma densidade, e a AUC-ROC é uma integral. Também aparece em métricas acumuladas em janelas de streaming e no custo total de tokens ou de computação a partir de uma taxa de consumo.",
    "negocios": "A receita acumulada do ano é a soma da receita de cada mês. Aproximar por poucas faixas erra o total, e mais faixas chegam perto do valor real.",
    "dia": "Distância percorrida a partir da velocidade, energia em kWh a partir da potência, lucro acumulado a partir do fluxo de caixa. Taxa em um eixo, total na área."
  },
  "multiplas": {
    "agro": "Um pluviômetro mede a chuva em um ponto, mas a lavoura recebe chuva desigual. O volume sobre o talhão é uma integral dupla. A massa de solo em uma camada, com densidade que muda com a profundidade, é uma integral tripla.",
    "publico": "A população de uma região é a integral dupla da densidade sobre a área. Um único ponto de pesquisa pode errar muito se a densidade varia pelo mapa.",
    "engenharia": "O volume de terra a mover numa terraplenagem, a massa de uma peça de densidade variável e a carga distribuída numa laje são integrais duplas ou triplas.",
    "dados": "Distribuições conjuntas e marginalização são somas sobre várias variáveis. Quando a integral não tem fórmula fechada, métodos de Monte Carlo fazem a soma por amostragem, como em simulações e inferência bayesiana.",
    "negocios": "A demanda total de uma região soma áreas com densidades de clientes diferentes. Medir um ponto só e multiplicar pela área é o erro clássico de projeção.",
    "dia": "Volume de terra em terraplenagem, probabilidade conjunta de duas variáveis, massa de um objeto com densidade irregular. É a mesma ideia dos retângulos, agora em células e cubinhos."
  },
  "matrizes": {
    "agro": "Formular adubo ou ração é um sistema linear: quanto de cada produto comercial entrega os nutrientes-alvo? Cada coluna é um produto, cada linha é um nutriente, e a inversa devolve as quantidades.",
    "publico": "Distribuir um orçamento entre programas para atingir várias metas ao mesmo tempo, ou modelar fluxos de migração entre regiões, são problemas de sistemas lineares.",
    "engenharia": "Circuitos e estruturas viram sistemas A·x = b: as leis de Kirchhoff e o equilíbrio de forças dão uma equação por nó, e a matriz é resolvida em conjunto.",
    "dados": "Embeddings são vetores, uma camada de rede é A·x + b, e PCA e SVD reduzem dimensão. Adaptadores como LoRA aproximam as matrizes de pesos com matrizes menores.",
    "negocios": "O planejamento de produção com vários insumos e metas, e a matriz de insumo-produto de uma economia (Leontief), são sistemas lineares.",
    "dia": "Orçamentos, redes elétricas, gráficos 3D e redes neurais usam matrizes. Uma matriz sem inversa (singular) indica informação redundante: dois ingredientes que fazem o mesmo papel."
  },
  "estatistica": {
    "agro": "Comparar cultivares, doses e manejos exige repetições. Cada parcela varia por razões que você não controla. Mais repetições ou menos variação deixam o efeito real mais fácil de enxergar.",
    "publico": "Avaliar se um programa funcionou exige comparar quem recebeu e quem não recebeu e separar o efeito do acaso. Sem amostra suficiente, uma diferença pode ser ruído.",
    "engenharia": "Um teste de lote compara a resistência de peças de dois fornecedores. O número de amostras decide se o teste consegue enxergar a diferença que importa.",
    "dados": "Avaliar prompts, RAG e guardrails com amostras pede intervalo de confiança da taxa de acerto, teste A/B entre versões e tamanho adequado do conjunto de avaliação. Poucos exemplos geram conclusões frágeis.",
    "negocios": "O teste A/B de um site ou de uma oferta é um experimento: compara versões, estima a diferença e diz se ela é grande o bastante para não ser sorte.",
    "dia": "É o mesmo raciocínio do teste A/B de um site e do controle de qualidade de uma fábrica. O poder do teste diz a chance de enxergar uma diferença que realmente existe."
  },
  "jogos": {
    "agro": "Duas cooperativas decidindo se baixam o preço, vizinhos que dividem silo ou maquinário, produtor e fiscalização. Em todos, a sua melhor escolha depende do que o outro faz.",
    "publico": "Municípios que decidem se cooperam num consórcio, ou empresas que respondem a uma regulação, jogam jogos em que a melhor escolha depende da escolha do outro.",
    "engenharia": "Protocolos de rede e leilões de energia têm participantes que reagem uns aos outros. O equilíbrio de Nash descreve onde ninguém quer mudar sozinho.",
    "dados": "Atacante e defensor em prompt injection, sistemas multiagente, leilões de anúncio e preço de APIs. Redes generativas adversariais são um jogo entre dois modelos.",
    "negocios": "Guerra de preços, escolha de lançamentos e negociação com fornecedores são jogos: se o concorrente baixa o preço, a sua melhor resposta muda.",
    "dia": "Negociação, leilão, trânsito, preço de concorrentes. Marcar a melhor resposta em cada coluna e em cada linha já revela os equilíbrios."
  },
  "regressao": {
    "agro": "Prever a produtividade a partir da chuva do ciclo, da temperatura ou da dose de adubo é regressão. É a base de quase todo modelo de previsão: ajustar parâmetros para errar o mínimo possível.",
    "publico": "Prever os atendimentos do próximo mês a partir da população atendida, ou o gasto com saúde a partir da idade média, é regressão: ajustar uma reta aos dados.",
    "engenharia": "Calibrar um sensor ajusta uma reta entre a leitura bruta e o valor real. O erro quadrático médio diz quão bem a reta descreve as medidas.",
    "dados": "A regressão linear é o baseline de qualquer problema tabular: se um modelo complexo não a supera, algo está errado. Tanto o scikit-learn quanto o Spark MLlib implementam esse ajuste, e o MLflow registra os parâmetros e as métricas dos experimentos.",
    "negocios": "Prever vendas a partir do gasto em anúncios é a regressão clássica. A inclinação diz quanto cada real a mais costuma render, dentro do que os dados mostram.",
    "dia": "O treino de uma rede neural repete este laço: calcular o erro, calcular a derivada, andar na direção que reduz o erro. A taxa de aprendizado é o tamanho do passo."
  },
  "embeddings": {
    "agro": "Achar, em milhares de laudos e boletins técnicos, o trecho sobre o problema que o produtor descreveu. A busca por palavra falha quando o produtor usa outros termos; a busca por significado funciona.",
    "publico": "Buscar, em milhares de documentos de legislação ou de processos, o trecho que responde a uma dúvida do cidadão, mesmo com outras palavras, é busca semântica.",
    "engenharia": "Achar em manuais e relatórios técnicos o trecho sobre uma falha descrita em linguagem de campo usa a mesma ideia de vetores próximos.",
    "dados": "É a base do RAG: documentos e pergunta viram vetores e o retriever devolve os mais próximos. A métrica deve seguir a do modelo de embedding, e vetores normalizados fazem cosseno e produto escalar darem o mesmo ranking.",
    "negocios": "Recomendação de produtos e atendimento com base de conhecimento usam embeddings: o pedido do cliente vira um ponto e a busca devolve os mais próximos.",
    "dia": "É o que acontece por trás de recomendação de filmes, busca semântica e detecção de duplicatas. Aqui o espaço tem 2 dimensões; os modelos reais usam centenas ou milhares."
  },
  "atencao": {
    "agro": "Na frase “o milho precisa de nitrogênio”, entender “precisa” exige olhar para “milho” e “nitrogênio”. A atenção aprende quais palavras importam para cada uma.",
    "publico": "Resumir um texto longo de lei exige saber quais trechos se relacionam. A atenção é o mecanismo pelo qual o modelo pesa cada trecho ao ler o resto.",
    "engenharia": "Em séries de sensores, modelos com atenção decidem quais leituras passadas importam para prever a próxima, sem tratar todas por igual.",
    "dados": "Cada bloco de um Transformer repete este mecanismo em várias cabeças. O custo cresce com o quadrado do tamanho do contexto, e o softmax com temperatura reaparece na amostragem de tokens e na calibração de scores.",
    "negocios": "Ao responder a um cliente, o modelo pesa as partes mais relevantes do histórico e dos documentos. O custo cresce com o tamanho do contexto.",
    "dia": "É o bloco central do Transformer, repetido em várias cabeças e camadas. Os vetores abaixo são valores de brinquedo, escolhidos à mão. Em um modelo real eles vêm do treino."
  },
  "overfit": {
    "agro": "Ajustar uma curva de resposta da cultura com poucas parcelas é o caso clássico. Um polinômio de grau alto passa por todos os pontos e prevê absurdos entre eles.",
    "publico": "Um modelo que prevê bem a demanda por vagas num ano e falha no seguinte decorou o ruído. Separar treino e teste por data evita o engano.",
    "engenharia": "Ajustar uma curva de calibração com mais parâmetros do que pontos passa por todas as medidas e erra entre elas. Regularizar segura os coeficientes.",
    "dados": "Em pipelines de dados, vazamento entre treino e teste gera métricas bonitas e modelos ruins em produção. A validação deve imitar o uso real, por exemplo separando por data em vez de sortear linhas.",
    "negocios": "Um modelo que acerta todo o histórico de vendas e erra o próximo trimestre ficou complexo demais. Validar com dados que ele não viu é a defesa.",
    "dia": "Toda a prática de ML gira em torno disso: separar treino e teste, validação cruzada, regularização, parar o treino cedo. O erro no treino sempre melhora com mais complexidade. O erro no teste, não."
  },
  "logistica": {
    "agro": "Detectar doença em folhas por imagem: chamar uma planta sadia de doente custa uma visita. Deixar passar uma doente custa a safra. Os dois erros têm preços diferentes.",
    "publico": "Um classificador que marca famílias para busca ativa troca dois erros: deixar passar quem precisa e incomodar quem não precisa. O limiar vem do custo de cada erro.",
    "engenharia": "Um alarme de falha de máquina com limiar baixo dispara à toa, e com limiar alto deixa passar falhas. A escolha equilibra manutenção desnecessária e quebra.",
    "dados": "Guardrails, classificadores de intenção e filtros de qualidade são classificadores com limiar. O limiar certo vem do custo dos dois erros e da taxa real de casos ruins, não de 0,5 por padrão.",
    "negocios": "A detecção de fraude tem a mesma troca: bloquear uma compra legítima custa um cliente, e deixar passar fraude custa dinheiro. Com fraude rara, a precisão cai mesmo com bom modelo.",
    "dia": "Spam, fraude e exame médico seguem a mesma lógica. A regressão logística é o modelo mais simples que gera esse score: a sigmoide transforma uma soma ponderada em probabilidade."
  },
  "rede": {
    "agro": "Separar áreas de solo por duas medidas (por exemplo, argila e matéria orgânica) quando a fronteira não é uma reta. Uma rede com poucos neurônios já desenha fronteiras curvas.",
    "publico": "Classificar imagens de satélite para mapear a ocupação do solo, ou documentos por assunto, usa redes que aprendem fronteiras curvas entre as classes.",
    "engenharia": "Redes neurais aproximam relações não lineares que as equações físicas descrevem mal, como previsão de falhas, controle e visão em linhas de produção.",
    "dados": "Um LLM é uma rede enormemente maior, treinada com o mesmo laço: passo adiante, perda, passo atrás, atualização. Entender o laço pequeno ajuda a depurar treino, ajuste fino e taxa de aprendizado.",
    "negocios": "Previsão de demanda e classificação de clientes por perfil usam redes quando os padrões não são lineares. O treino é o laço de calcular o erro e ajustar os pesos.",
    "dia": "É a mesma máquina de redes de visão e de linguagem, em escala minúscula. Aqui há 2 entradas, uma camada oculta e 1 saída. Os pesos são treinados ao vivo no seu navegador."
  },
  "token": {
    "agro": "Para a frase “o milho precisa de ___”, o modelo pontua cada candidato. O mais provável é “nitrogênio”, mas “água” está logo atrás, e “carro” é quase impossível.",
    "publico": "Ao gerar respostas para cidadãos, temperatura baixa dá respostas mais repetíveis e fáceis de auditar. Temperatura alta dá variedade, que é arriscada onde a precisão importa.",
    "engenharia": "Na geração de código ou de relatórios técnicos, temperatura baixa e top-p moderado dão respostas mais estáveis e mantêm o formato.",
    "dados": "Temperatura, top-k e top-p são os parâmetros que você ajusta nas chamadas de API de um LLM. Temperatura baixa dá respostas mais repetíveis, útil em extração e classificação. Alta dá variedade.",
    "negocios": "Em textos de marketing e brainstorms vale uma temperatura mais alta. Na extração de dados de notas fiscais e na classificação, vale temperatura baixa.",
    "dia": "Os logits abaixo são valores de brinquedo escolhidos à mão. Em um modelo real há dezenas de milhares de candidatos, mas a conta é exatamente esta."
  },
  "trilha": {
    "agro": "A graduação treinou o hábito mais importante: formular o problema, modelar, resolver e conferir se o resultado faz sentido no mundo real.",
    "publico": "O mesmo caminho serve para quem quer avaliar políticas com dados: regressão, validação e depois modelos de linguagem para ler documentos.",
    "engenharia": "Para quem vem da engenharia, a ordem aproveita o que já se sabe de álgebra e cálculo e vai até redes e Transformers.",
    "dados": "Use esta ordem como roteiro: cada etapa reaproveita a matemática da anterior e tem um exercício com dados do seu ambiente.",
    "negocios": "Para quem decide com dados, o caminho vai de prever e comparar (regressão, teste A/B) até usar modelos de linguagem em produtos e processos.",
    "dia": "Estudar modelos sem aplicar em algo concreto não fixa. Cada etapa abaixo termina em um exercício que dá para guardar como projeto."
  },
  "ideia": {
    "agro": "O hidrômetro mede a vazão agora. A conta de água cobra o volume acumulado. O pluviômetro registra mm/h, mas a lavoura sente os mm do total da chuva.",
    "publico": "Um painel de saúde mostra casos novos por dia (a taxa) e o total acumulado. O orçamento executado até agora é a soma do gasto de cada mês. Quando a taxa cai, o total ainda cresce, só que mais devagar.",
    "engenharia": "A corrente num capacitor é a taxa de variação da carga, e a carga é a soma da corrente ao longo do tempo. É o que um medidor de energia faz ao somar a potência no tempo.",
    "dados": "No mundo dos dados, diff e cumsum (pandas, funções de janela no Spark) são a versão discreta da derivada e da integral. A taxa e o acumulado de uma métrica de streaming formam esse mesmo par.",
    "negocios": "A receita por dia é a taxa e a receita acumulada do mês é o total. O saldo em conta é a soma dos fluxos de caixa: medir um permite reconstruir o outro.",
    "dia": "Velocímetro e hodômetro. Uma mostra a taxa, o outro soma tudo. O teorema fundamental diz que a inclinação do acumulado em cada instante é a taxa daquele instante."
  },
  "regras": {
    "agro": "Respostas reais são combinações: produtividade vezes preço, uma função de dose dentro de outra de clima, uma razão custo por área. A regra certa evita derivar tudo na unha.",
    "publico": "O custo total é a soma de custo fixo e variável (regra da soma). A arrecadação é alíquota vezes base (produto). O gasto por habitante é um quociente.",
    "engenharia": "Potência é tensão vezes corrente (produto). Uma função de transferência é um quociente, e sistemas ligados em série são composições de funções.",
    "dados": "A regra da cadeia é a que mais pesa: backpropagation é a regra da cadeia aplicada camada por camada. O PyTorch calcula essas derivadas sozinho (autograd), mas saber a regra ajuda a depurar gradientes que somem ou explodem.",
    "negocios": "Receita é preço vezes quantidade, e margem é lucro dividido por receita. Se a quantidade depende do preço, derivar a receita pede a regra do produto e a da cadeia.",
    "dia": "Soma e produto são fáceis. A regra do quociente aparece em razões e médias. A regra da cadeia, função dentro de função, é a mais usada em ciência de dados."
  },
  "gradiente": {
    "agro": "Num talhão, z(x, y) é a altitude. O gradiente é a ladeira: aponta morro acima, e a água escorre no sentido contrário. A declividade é o tamanho do gradiente, e é o que comanda erosão e terraceamento.",
    "publico": "Num mapa de calor de um problema, como a incidência de uma doença, o gradiente mostra para onde ele cresce mais rápido. Isso ajuda a decidir onde intervir primeiro.",
    "engenharia": "O calor flui de quente para frio, contra o gradiente de temperatura. O mesmo vale para pressão e para potencial elétrico.",
    "dados": "Treinar um modelo é descer a superfície da perda seguindo o gradiente. Taxa grande demais oscila, vale estreito faz zigue-zague (por isso existem momento e Adam) e pontos de sela são comuns em redes grandes.",
    "negocios": "Numa superfície de lucro em função de preço e propaganda, o gradiente mostra qual ajuste melhora o resultado mais rápido. É a base de otimizar várias variáveis ao mesmo tempo.",
    "dia": "As cores são curvas de nível: cada faixa é um valor da função. O gradiente é sempre perpendicular a elas. Descer contra o gradiente é o gradiente descendente que treina modelos."
  },
  "taylor": {
    "agro": "Em torno do ponto de operação, a resposta da cultura a uma pequena mudança de dose ou de temperatura cabe numa reta ou numa parábola. Por isso modelos locais servem para ajuste fino e falham quando você extrapola.",
    "publico": "Projetar a população de uma cidade perto do último censo com uma reta ou uma parábola funciona. Longe dos dados medidos, a projeção se solta da realidade.",
    "engenharia": "O pêndulo simples usa sen(x) ≈ x para pequenos ângulos: é a aproximação de primeira ordem de Taylor. Ela falha quando o ângulo cresce.",
    "dados": "A aproximação de primeira ordem (tangente) é o que o gradiente descendente usa, e a de segunda ordem (parábola, via Hessiano) é a base de Newton e L-BFGS. Localmente tudo é quase linear, por isso passos pequenos são seguros.",
    "negocios": "Para estimar o efeito de uma pequena mudança de preço, vale a linearização da curva de demanda. Para mudanças grandes a curvatura importa, e a reta engana.",
    "dia": "É assim que calculadoras e bibliotecas calculam sen, exp e log. A tangente (ordem 1) e a parábola (ordem 2) sustentam o método de Newton e as otimizações de segunda ordem."
  },
  "newton": {
    "agro": "Achar a dose em que o lucro marginal zera, o pH de equilíbrio, a vazão em que a pressão no canal bate o limite ou a taxa de juros de um financiamento. Equações sem fórmula fechada se resolvem assim.",
    "publico": "Achar a alíquota em que a arrecadação atinge uma meta, ou o ano em que um fundo fica sem saldo, são equações sem fórmula pronta que o método de Newton resolve.",
    "engenharia": "Achar a vazão em que a perda de carga de um duto bate um limite, ou o ponto de operação de um circuito não linear, costuma usar Newton.",
    "dados": "A mesma ideia resolve equações em solvers numéricos, na calibração de modelos e no cálculo de TIR. Como toda rotina iterativa de produção, precisa de critério de parada e de tratamento dos casos em que falha.",
    "negocios": "A taxa interna de retorno de um investimento é a raiz de uma equação, e as planilhas a calculam com métodos iterativos como o de Newton.",
    "dia": "É o algoritmo por trás da raiz quadrada em calculadoras e de muitos solvers. Aplicado à derivada vira otimização de segunda ordem. Também mostra quando um algoritmo falha: tangente horizontal e chute inicial ruim."
  },
  "otimizadores": {
    "agro": "É o problema de calibrar um modelo de resposta da cultura com muitos parâmetros: a superfície do erro tem vales estreitos, e a forma de descer decide se o ajuste converge em segundos ou nunca.",
    "publico": "Alocar recursos entre áreas para minimizar um indicador de perda, como tempo de espera, custo ou risco, é otimização. Descer o gradiente é um jeito de resolver quando há muitos parâmetros.",
    "engenharia": "Calibrar um modelo físico com muitos parâmetros a partir de medições é uma otimização com vales estreitos. O otimizador escolhido decide se converge.",
    "dados": "Adam, e sua variante AdamW, é o otimizador mais comum no treino e no ajuste fino de redes e LLMs. Os sintomas ficam legíveis: perda oscilando indica taxa alta, treino lento em vale estreito indica mau condicionamento, e platôs lembram selas.",
    "negocios": "Ajustar preço, estoque e anúncios ao mesmo tempo é otimizar uma função de lucro com várias variáveis. Quando a superfície é estreita e torta, o gradiente puro avança devagar.",
    "dia": "Cada trilha é um treino. O vale estreito mostra por que o gradiente puro zigue-zagueia. A banana de Rosenbrock é o teste clássico de otimizadores. Clique no mapa para mudar o ponto de partida."
  },
  "vetores": {
    "agro": "Na engenharia agrícola, direção e sentido importam tanto quanto o valor: declividade, deslocamento de máquinas, vento e forças precisam ser tratados como vetores.",
    "publico": "Em planejamento urbano e de emergências, vento, correntes e deslocamentos de equipes são vetores. Somar rotas e forças pelas componentes evita erros de direção.",
    "engenharia": "As forças numa estrutura são vetores: decompor cada força em componentes permite checar o equilíbrio em cada eixo.",
    "dados": "Vetores aparecem em dados geoespaciais, deslocamentos, direção de vento, gradientes e decomposição de forças. Em dados, separar componentes e unidades evita somar grandezas incompatíveis.",
    "negocios": "Rotas de entrega têm direção e distância. Pensar em vetores ajuda a combinar deslocamentos e a ver o deslocamento líquido de uma frota.",
    "dia": "Rotas, velocidade do veículo e força aplicada em uma ferramenta são exemplos de grandezas que exigem módulo, direção e sentido."
  },
  "leis-newton": {
    "agro": "Aceleração de máquinas, frenagem, transporte de cargas e resistência ao movimento podem ser analisados com cinemática e leis de Newton.",
    "publico": "A segurança viária usa Newton: a distância de frenagem cresce com a velocidade, e isso fundamenta limites de velocidade e projetos de via.",
    "engenharia": "Dimensionar um motor, um freio ou um elevador exige a força necessária para a aceleração desejada com a massa envolvida (ΣF = m·a).",
    "dados": "A relação entre força resultante, massa e aceleração é um modelo simples de causa e efeito. Em sistemas de dados de sensores, velocidade e aceleração ajudam a detectar mudanças de operação.",
    "negocios": "Em logística, a carga transportada e a aceleração disponível definem o consumo de um veículo e o tempo de entrega.",
    "dia": "O cinto de segurança, a arrancada de um ônibus e o atrito ao caminhar mostram a relação entre força e movimento."
  },
  "propulsao": {
    "agro": "A propulsão ilustra conservação de quantidade de movimento e balanço de forças, conceitos úteis também para compreender bombas, jatos e sistemas de transporte de fluidos.",
    "publico": "Foguetes e satélites sustentam serviços públicos de previsão do tempo, navegação e monitoramento ambiental. Entender o empuxo mostra o custo de colocar algo em órbita.",
    "engenharia": "Empuxo, massa e conservação da quantidade de movimento dimensionam motores a jato, hélices e bombas.",
    "dados": "Conservação de quantidade de movimento ajuda a entender sistemas de propulsão e fluxos. A distinção entre força aplicada, impulso e variação de velocidade também aparece em modelos físicos discretizados.",
    "negocios": "O custo de lançar carga ao espaço depende da massa e do combustível: a equação do foguete explica por que reduzir peso reduz custo.",
    "dia": "Um balão que esvazia e se desloca demonstra, em escala simples, o princípio de ação e reação."
  },
  "gravidade": {
    "agro": "A gravidade interfere em escoamentos, estabilidade de estruturas, queda de materiais e operações de levantamento e transporte.",
    "publico": "A previsão de marés, o desenho de reservatórios e o planejamento de satélites de monitoramento dependem de gravidade e de órbitas.",
    "engenharia": "Estruturas, barragens e levantamento de cargas consideram o peso e o campo gravitacional. Um satélite precisa da velocidade certa para ficar em órbita.",
    "dados": "Modelos gravitacionais e orbitais usam relações entre distância, massa e aceleração. O mesmo cuidado com unidades e escalas é essencial em qualquer modelo científico ou geoespacial.",
    "negocios": "Empresas de satélites e de telecomunicações escolhem órbitas pela troca entre cobertura, latência e custo de lançamento.",
    "dia": "Peso, queda de objetos, satélites e marés são manifestações da interação gravitacional."
  },
  "manobras": {
    "agro": "Separar orientação, força e trajetória ajuda a analisar direção de máquinas, sistemas de controle e movimentos com atuadores.",
    "publico": "A coordenação de operações de emergência separa o rumo de um veículo da sua trajetória. Distinguir os dois evita decisões erradas.",
    "engenharia": "Sistemas de controle de drones, robôs e satélites separam a atitude (para onde aponta) da trajetória (para onde vai).",
    "dados": "Sistemas de controle separam estado, orientação, atuação e resposta. A distinção entre atitude e trajetória é análoga à diferença entre a configuração de um equipamento e o deslocamento que ele executa.",
    "negocios": "Frotas e entregas por drone dependem de sistemas que ajustam rumo e velocidade gastando o mínimo de energia.",
    "dia": "Um carro pode virar o volante, mudar a orientação das rodas e só então alterar sua trajetória; são fenômenos relacionados, mas distintos."
  },
  "fisica-engenharia": {
    "agro": "Potência na barra de tração, esforço de implementos, eficiência de bombeamento e aderência ao solo são aplicações diretas da Física na operação agrícola.",
    "publico": "A eficiência de bombeamento, de iluminação pública e de transporte coletivo são decisões de potência e energia. Cada ganho de eficiência vira economia pública.",
    "engenharia": "Potência, trabalho e atrito aparecem em motores, elevadores e máquinas. O dimensionamento compara a força e a potência necessárias com as disponíveis.",
    "dados": "Indicadores de potência, eficiência, consumo e capacidade operacional ajudam a transformar dados de máquinas e operações em decisões de engenharia. É importante distinguir potência nominal, potência útil e perdas.",
    "negocios": "O consumo de energia e a eficiência das máquinas entram direto no custo operacional: potência útil menos perdas define o custo por unidade produzida.",
    "dia": "Consumo de energia, elevadores, bombas, veículos e ferramentas podem ser comparados por trabalho, potência e eficiência."
  }
};
