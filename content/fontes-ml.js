/*
 * Fontes oficiais para estudar os assuntos de machine learning.
 * Verificado em 2026-11-01: todas as URLs abaixo responderam 200 apos redirecionamentos
 * (curl -sL e fetch) e o titulo da pagina foi conferido contra o assunto.
 *
 * Links tentados e descartados:
 * - https://docs.pytorch.org/docs/stable/optim.html (e as paginas stable de Adam, softmax e
 *   scaled_dot_product_attention): respondem 200, mas sao paginas-ponte de redirecionamento
 *   por JavaScript/meta refresh; foram trocadas pelas URLs versionadas 2.15, que tem o conteudo.
 * - https://huggingface.co/learn/nlp-course/chapter5/6: redireciona; usado o destino atual do curso de LLM.
 * - https://huggingface.co/docs/transformers/llm_tutorial e variantes sem /en/: duplicam as
 *   versoes /en/, mantidas apenas estas.
 * - https://www.deeplearning.ai/specializations/machine-learning e /deep-learning: redirecionam;
 *   usada a URL final em /courses/.
 * - https://www.coursera.org/specializations/machine-learning-introduction: pagina de venda e
 *   inscricao, substituida pela pagina oficial da DeepLearning.AI.
 * - https://www.cs.toronto.edu/~hinton/ e https://faiss.ai/: respondem 200, mas sao paginas
 *   iniciais sem conteudo especifico de um assunto.
 * - https://cs229.stanford.edu/ e https://course.fast.ai/: paginas gerais de curso, nao
 *   especificas de um assunto (fast.ai ficou de fora por nao ter pagina dedicada aos temas).
 * - https://mlflow.org/docs/latest/ml/ e /tracking/, https://docs.databricks.com/aws/pt/mlflow/ e
 *   https://docs.databricks.com/aws/en/machine-learning/: confirmados, mas nao usados para
 *   respeitar o limite de 5 fontes por assunto.
 * - https://scikit-learn.org/stable/modules/sgd.html e neural_networks_supervised.html: confirmados,
 *   preteridos por fontes mais diretas ao assunto.
 * - https://platform.claude.com/docs/en/build-with-claude/token-counting e /about-claude/glossary:
 *   confirmados, mas tratam de contagem de tokens da API e de vocabulario geral, nao do
 *   caminho do logit ao proximo token.
 * - Guias de prompts e uso de LLM da Anthropic nao se encaixam nestes 9 assuntos (matematica
 *   do modelo); so a pagina de embeddings foi aproveitada.
 *
 * As paginas do Google Machine Learning Crash Course usam ?hl=pt-br (versao oficial em portugues).
 * Cada fonte: titulo, url, origem, idioma, nivel, estude (frase propria, sem texto copiado).
 */
const FONTES_ML = {
  regressao: [
    {
      titulo: "Regressão linear (Machine Learning Crash Course)",
      url: "https://developers.google.com/machine-learning/crash-course/linear-regression?hl=pt-br",
      origem: "Google", idioma: "pt", nivel: "iniciante",
      estude: "Leia a ideia de reta ajustada aos dados, a equação com peso e viés e a função de perda que mede o erro."
    },
    {
      titulo: "Regressão linear: gradiente descendente",
      url: "https://developers.google.com/machine-learning/crash-course/linear-regression/gradient-descent?hl=pt-br",
      origem: "Google", idioma: "pt", nivel: "iniciante",
      estude: "Veja como o erro guia o ajuste dos parâmetros passo a passo até a perda parar de cair."
    },
    {
      titulo: "1.1. Linear Models (guia do usuário)",
      url: "https://scikit-learn.org/stable/modules/linear_model.html",
      origem: "scikit-learn", idioma: "en", nivel: "intermediário",
      estude: "Consulte as seções de mínimos quadrados e de regularização para ligar a fórmula ao código com LinearRegression, Ridge e Lasso."
    },
    {
      titulo: "CS229: notas de aula (regressão linear e descida do gradiente)",
      url: "https://cs229.stanford.edu/main_notes.pdf",
      origem: "Stanford", idioma: "en", nivel: "avançado",
      estude: "Acompanhe as primeiras seções, que derivam o mínimo quadrado, a equação normal e a regra de atualização do gradiente."
    }
  ],
  otimizadores: [
    {
      titulo: "Regressão linear: gradiente descendente",
      url: "https://developers.google.com/machine-learning/crash-course/linear-regression/gradient-descent?hl=pt-br",
      origem: "Google", idioma: "pt", nivel: "iniciante",
      estude: "Entenda o passo na direção contrária ao gradiente e o papel do tamanho do passo."
    },
    {
      titulo: "Regressão linear: hiperparâmetros",
      url: "https://developers.google.com/machine-learning/crash-course/linear-regression/hyperparameters?hl=pt-br",
      origem: "Google", idioma: "pt", nivel: "iniciante",
      estude: "Compare taxa de aprendizado, tamanho de lote e épocas e veja o que cada um muda no treino."
    },
    {
      titulo: "Optimizing Model Parameters (tutorial básico)",
      url: "https://docs.pytorch.org/tutorials/beginner/basics/optimization_tutorial.html",
      origem: "PyTorch", idioma: "en", nivel: "intermediário",
      estude: "Rode o laço de treino completo e observe onde entram a perda, o backward e o passo do otimizador."
    },
    {
      titulo: "CS231n: Learning (atualizações de parâmetros, momento e Adam)",
      url: "https://cs231n.github.io/neural-networks-3/",
      origem: "Stanford", idioma: "en", nivel: "intermediário",
      estude: "Leia a parte sobre SGD com momento, taxas adaptativas e Adam para comparar como cada um acelera a descida."
    },
    {
      titulo: "torch.optim.Adam",
      url: "https://docs.pytorch.org/docs/2.15/generated/torch.optim.Adam.html",
      origem: "PyTorch", idioma: "en", nivel: "avançado",
      estude: "Confira o algoritmo em pseudocódigo e os parâmetros betas e epsilon para casar com as fórmulas do caderno."
    }
  ],
  overfit: [
    {
      titulo: "Overfitting (Machine Learning Crash Course)",
      url: "https://developers.google.com/machine-learning/crash-course/overfitting/overfitting?hl=pt-br",
      origem: "Google", idioma: "pt", nivel: "iniciante",
      estude: "Veja como a perda de treino cai enquanto a de validação sobe e o que isso indica sobre o modelo."
    },
    {
      titulo: "Generalização (Machine Learning Crash Course)",
      url: "https://developers.google.com/machine-learning/crash-course/overfitting/generalization?hl=pt-br",
      origem: "Google", idioma: "pt", nivel: "iniciante",
      estude: "Entenda por que um modelo precisa funcionar em dados novos e como a divisão treino e teste mede isso."
    },
    {
      titulo: "Underfitting vs. Overfitting (exemplo)",
      url: "https://scikit-learn.org/stable/auto_examples/model_selection/plot_underfitting_overfitting.html",
      origem: "scikit-learn", idioma: "en", nivel: "intermediário",
      estude: "Rode o exemplo e compare polinômios de graus diferentes para ver viés alto de um lado e variância alta do outro."
    },
    {
      titulo: "3.5. Validation curves (curvas de validação e de aprendizado)",
      url: "https://scikit-learn.org/stable/modules/learning_curve.html",
      origem: "scikit-learn", idioma: "en", nivel: "intermediário",
      estude: "Use as curvas para diagnosticar se falta capacidade ao modelo ou se faltam dados."
    },
    {
      titulo: "3.1. Cross-validation: evaluating estimator performance",
      url: "https://scikit-learn.org/stable/modules/cross_validation.html",
      origem: "scikit-learn", idioma: "en", nivel: "avançado",
      estude: "Estude a validação cruzada para estimar o desempenho fora da amostra sem vazar dados do teste."
    }
  ],
  logistica: [
    {
      titulo: "Regressão logística (Machine Learning Crash Course)",
      url: "https://developers.google.com/machine-learning/crash-course/logistic-regression?hl=pt-br",
      origem: "Google", idioma: "pt", nivel: "iniciante",
      estude: "Leia como a função sigmoide transforma uma soma em probabilidade e como a perda de log penaliza erros confiantes."
    },
    {
      titulo: "Limiares e a matriz de confusão",
      url: "https://developers.google.com/machine-learning/crash-course/classification/thresholding?hl=pt-br",
      origem: "Google", idioma: "pt", nivel: "iniciante",
      estude: "Veja como o limiar converte probabilidade em decisão e o que são falsos positivos e falsos negativos."
    },
    {
      titulo: "3.3. Tuning the decision threshold for class prediction",
      url: "https://scikit-learn.org/stable/modules/classification_threshold.html",
      origem: "scikit-learn", idioma: "en", nivel: "intermediário",
      estude: "Aprenda a escolher o limiar pelo custo de cada tipo de erro, que é a base de um guardrail calibrado."
    },
    {
      titulo: "3.4. Metrics and scoring: quantifying the quality of predictions",
      url: "https://scikit-learn.org/stable/modules/model_evaluation.html",
      origem: "scikit-learn", idioma: "en", nivel: "intermediário",
      estude: "Consulte precisão, revocação, F1 e AUC para escolher a métrica que combina com o risco do problema."
    },
    {
      titulo: "precision_recall_curve",
      url: "https://scikit-learn.org/stable/modules/generated/sklearn.metrics.precision_recall_curve.html",
      origem: "scikit-learn", idioma: "en", nivel: "avançado",
      estude: "Veja como a função devolve precisão e revocação para cada limiar possível e use isso para traçar a curva."
    }
  ],
  rede: [
    {
      titulo: "Redes neurais (Machine Learning Crash Course)",
      url: "https://developers.google.com/machine-learning/crash-course/neural-networks?hl=pt-br",
      origem: "Google", idioma: "pt", nivel: "iniciante",
      estude: "Leia como camadas, neurônios e funções de ativação combinam entradas até formar curvas não lineares."
    },
    {
      titulo: "Redes neurais: como treinar usando retropropagação",
      url: "https://developers.google.com/machine-learning/crash-course/neural-networks/backpropagation?hl=pt-br",
      origem: "Google", idioma: "pt", nivel: "iniciante",
      estude: "Acompanhe como o erro volta pelas camadas para ajustar os pesos, em visão geral e sem derivação pesada."
    },
    {
      titulo: "Build the Neural Network (tutorial básico)",
      url: "https://docs.pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html",
      origem: "PyTorch", idioma: "en", nivel: "intermediário",
      estude: "Monte uma rede pequena camada por camada e veja como o código reflete a estrutura do diagrama."
    },
    {
      titulo: "Automatic Differentiation with torch.autograd",
      url: "https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html",
      origem: "PyTorch", idioma: "en", nivel: "intermediário",
      estude: "Veja o grafo computacional e como o backward calcula os gradientes automaticamente pela regra da cadeia."
    },
    {
      titulo: "CS231n: Backprop, Intuitions",
      url: "https://cs231n.github.io/optimization-2/",
      origem: "Stanford", idioma: "en", nivel: "avançado",
      estude: "Pratique a regra da cadeia nó a nó em grafos pequenos para entender o fluxo dos gradientes."
    }
  ],
  embeddings: [
    {
      titulo: "Embeddings (Machine Learning Crash Course)",
      url: "https://developers.google.com/machine-learning/crash-course/embeddings?hl=pt-br",
      origem: "Google", idioma: "pt", nivel: "iniciante",
      estude: "Entenda a ideia de representar itens como vetores em que a proximidade indica semelhança."
    },
    {
      titulo: "Embeddings: espaço de embedding e embeddings estáticos",
      url: "https://developers.google.com/machine-learning/crash-course/embeddings/embedding-space?hl=pt-br",
      origem: "Google", idioma: "pt", nivel: "iniciante",
      estude: "Veja como direções e distâncias no espaço carregam significado e como medir a similaridade entre vetores."
    },
    {
      titulo: "Embeddings (documentação da API)",
      url: "https://platform.claude.com/docs/en/build-with-claude/embeddings",
      origem: "Anthropic", idioma: "en", nivel: "intermediário",
      estude: "Leia como usar embeddings em recuperação e busca semântica e quais cuidados tomar ao escolher um modelo."
    },
    {
      titulo: "Semantic Search (Sentence Transformers)",
      url: "https://www.sbert.net/examples/applications/semantic-search/README.html",
      origem: "Sentence Transformers", idioma: "en", nivel: "intermediário",
      estude: "Rode o exemplo de busca por similaridade de cosseno e compare consulta e documentos no mesmo espaço."
    },
    {
      titulo: "Semantic search with FAISS (curso de LLM)",
      url: "https://huggingface.co/learn/llm-course/chapter5/6",
      origem: "Hugging Face", idioma: "en", nivel: "avançado",
      estude: "Acompanhe a construção de um índice vetorial para busca rápida sobre muitos embeddings."
    }
  ],
  atencao: [
    {
      titulo: "LLMs: o que é um modelo de linguagem grande?",
      url: "https://developers.google.com/machine-learning/crash-course/llm/transformers?hl=pt-br",
      origem: "Google", idioma: "pt", nivel: "iniciante",
      estude: "Leia a visão geral de transformers e da autoatenção como mecanismo que pondera o contexto."
    },
    {
      titulo: "How do Transformers work? (curso de LLM)",
      url: "https://huggingface.co/learn/llm-course/chapter1/4",
      origem: "Hugging Face", idioma: "en", nivel: "iniciante",
      estude: "Veja o panorama de codificador, decodificador e camadas de atenção dentro de um transformer."
    },
    {
      titulo: "torch.nn.functional.softmax",
      url: "https://docs.pytorch.org/docs/2.15/generated/torch.nn.functional.softmax.html",
      origem: "PyTorch", idioma: "en", nivel: "intermediário",
      estude: "Confira a definição do softmax e o eixo de aplicação, que gera os pesos de atenção somando 1."
    },
    {
      titulo: "torch.nn.functional.scaled_dot_product_attention",
      url: "https://docs.pytorch.org/docs/2.15/generated/torch.nn.functional.scaled_dot_product_attention.html",
      origem: "PyTorch", idioma: "en", nivel: "avançado",
      estude: "Compare a fórmula de consulta, chave e valor com a escala e a máscara descritas na função."
    },
    {
      titulo: "Stanford CS224N: NLP with Deep Learning",
      url: "https://web.stanford.edu/class/cs224n/",
      origem: "Stanford", idioma: "en", nivel: "avançado",
      estude: "Procure no cronograma as aulas e notas de atenção e transformers para uma derivação completa."
    }
  ],
  token: [
    {
      titulo: "Tokenizers (curso de LLM)",
      url: "https://huggingface.co/learn/llm-course/chapter2/4",
      origem: "Hugging Face", idioma: "en", nivel: "iniciante",
      estude: "Veja como o texto vira tokens e ids antes de entrar no modelo e o caminho inverso na saída."
    },
    {
      titulo: "Text generation (Transformers)",
      url: "https://huggingface.co/docs/transformers/en/llm_tutorial",
      origem: "Hugging Face", idioma: "en", nivel: "intermediário",
      estude: "Siga a geração token a token com generate e note como os logits viram a próxima escolha."
    },
    {
      titulo: "Generation strategies (Transformers)",
      url: "https://huggingface.co/docs/transformers/en/generation_strategies",
      origem: "Hugging Face", idioma: "en", nivel: "intermediário",
      estude: "Compare decodificação gulosa, amostragem, temperatura, top-k e top-p sobre a distribuição de probabilidade."
    },
    {
      titulo: "How to generate text: decoding methods with Transformers",
      url: "https://huggingface.co/blog/how-to-generate",
      origem: "Hugging Face", idioma: "en", nivel: "intermediário",
      estude: "Leia os exemplos de busca em feixe e amostragem para ver o efeito de cada método no texto produzido."
    },
    {
      titulo: "Tokenization algorithms (Transformers)",
      url: "https://huggingface.co/docs/transformers/en/tokenizer_summary",
      origem: "Hugging Face", idioma: "en", nivel: "avançado",
      estude: "Entenda BPE, WordPiece e SentencePiece para saber de onde vem o vocabulário sobre o qual o softmax é calculado."
    }
  ],
  trilha: [
    {
      titulo: "Machine Learning Crash Course",
      url: "https://developers.google.com/machine-learning/crash-course?hl=pt-br",
      origem: "Google", idioma: "pt", nivel: "iniciante",
      estude: "Use o índice do curso como mapa da trilha, dos fundamentos até redes neurais, embeddings e LLMs."
    },
    {
      titulo: "Machine Learning Specialization",
      url: "https://www.deeplearning.ai/courses/machine-learning-specialization/",
      origem: "DeepLearning.AI", idioma: "en", nivel: "iniciante",
      estude: "Veja a ementa de três cursos como segunda etapa, com prática em regressão, classificação e redes."
    },
    {
      titulo: "User Guide (scikit-learn)",
      url: "https://scikit-learn.org/stable/user_guide.html",
      origem: "scikit-learn", idioma: "en", nivel: "intermediário",
      estude: "Use o sumário para escolher a família de modelos e a ferramenta de validação para cada tipo de problema."
    },
    {
      titulo: "Learn the Basics (PyTorch)",
      url: "https://docs.pytorch.org/tutorials/beginner/basics/intro.html",
      origem: "PyTorch", idioma: "en", nivel: "intermediário",
      estude: "Percorra a sequência de tutoriais de tensores a treino como caminho prático para deep learning."
    },
    {
      titulo: "Aprendizado de máquina no Databricks",
      url: "https://docs.databricks.com/aws/pt/machine-learning/",
      origem: "Databricks", idioma: "pt", nivel: "intermediário",
      estude: "Veja onde treino, rastreamento de experimentos e implantação entram na plataforma que você já usa no trabalho."
    }
  ]
};
