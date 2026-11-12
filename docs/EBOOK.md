# Guia Prático de Nutrição na Terapia com Tirzepatida

Versão do e-book publicada em [claude.ai](https://claude.ai/artifact/B4QSUa8ZsXxufgGmtd4fD7). Esta cópia em Markdown acompanha o código das ferramentas. Os links das ferramentas interativas apontam para as páginas publicadas. Para rodar tudo localmente, veja o [README](../README.md).

## Como usar este material

Este guia reúne dez ferramentas interativas e um painel que liga todas ao mesmo paciente. Leia o e-book como apoio e use as páginas para preencher ao vivo na consulta ou projetar com o modo apresentação.

| Ferramenta | Para que serve na consulta |
| --- | --- |
| [Guia Tirzepatida (aplicativo)](https://claude.ai/artifact/XiB6QWEoug47uw1AA5DuEM) | Landing page que abre o aplicativo, com menu lateral e todas as ferramentas |
| [Painel Tirzepatida](https://claude.ai/artifact/4V1GFvJtfc4e6cZ5iPM2ri) | Indicadores, gráficos, alertas, retorno sugerido e resumo para o prontuário |
| [Composição corporal](https://claude.ai/artifact/QwTV9uNRe8sSHGLi5ENwcg) | Equação mais adequada, dobras cutâneas e casos clínicos |
| [GET, déficit e macronutrientes](https://claude.ai/artifact/3w7xQBofCX1jJRwstwa2qw) | Meta calórica e divisão de macros |
| [Progressão da proteína](https://claude.ai/artifact/SY726pbrkKrJETvCYU4Zus) | Meta de proteína por fase da dose |
| [Gorduras insaturadas](https://claude.ai/artifact/QdNUDLkQg3o8pvhqHCjJyZ) | Fontes de lipídios de boa qualidade |
| [Fibras e fitoquímicos](https://claude.ai/artifact/Rc7nHSyJj1xiAxpv9UQrvk) | Fibras, fitoquímicos e tolerância |
| [Carboidratos por volume](https://claude.ai/artifact/6omubeVYLsXTaWKrxMQWcm) | Medidas caseiras e trocas de 15 g |
| [Efeitos colaterais](https://claude.ai/artifact/Taq8XPBCCqc5TxYD1bWp3V) | Manejo nutricional por sintoma |
| [Refeições por textura](https://claude.ai/artifact/6EahhzjGSrYWhkKUyyZXJB) | Opções líquidas, pastosas e sólidas |
| [Suplementação](https://claude.ai/artifact/4jgrQsj3aiuNfhisGwb8FN) | Exames e condutas por deficiência |
| [Ficha de anamnese](https://claude.ai/artifact/9vjVDs23XGxdT9Nj2K9SNh) | Antes, durante e após o uso |

As páginas abrem com um paciente fictício. Use "Começar ficha em branco" para atender e "Dados e backup" para guardar o registro. Nada sai do navegador.

## Tirzepatida em uma página

A tirzepatida é um agonista dos receptores de GIP e de GLP-1, aplicado uma vez por semana por via subcutânea. Reduz o apetite, aumenta a saciedade e retarda o esvaziamento gástrico, e esse último efeito explica a maioria das queixas digestivas.

- **Escalonamento usual:** 2,5 mg por semana nas primeiras 4 semanas, com aumentos de 2,5 mg após pelo menos 4 semanas em cada dose. Manutenção em 5, 10 ou 15 mg, no máximo 15 mg. Conferir a bula vigente e a prescrição.
- **O que muda na conduta nutricional:** proteger a massa magra com proteína e treino de força, garantir hidratação, adaptar a textura das refeições, vigiar micronutrientes e planejar a manutenção do peso.
- **Momentos de maior risco:** após cada aumento de dose (náusea, vômito, diarreia) e em ingestões abaixo de 70% da meta de proteína.
- **Precauções que a anamnese deve rastrear:** carcinoma medular de tireoide e NEM2, pancreatite, doença da vesícula, gastroparesia, retinopatia diabética, gestação, uso de insulina ou sulfonilureia e anticoncepcional oral.

## 1. GET, déficit calórico e macronutrientes

Ferramenta interativa: [GET, déficit e macronutrientes](https://claude.ai/artifact/3w7xQBofCX1jJRwstwa2qw). Escolha a equação, o fator de atividade, o déficit e o percentual de lipídios. A proteína vem em g/kg e o carboidrato fecha a meta.

```latex
GET = TMB \times FA \qquad Meta = GET - Deficit
```

```latex
TMB_{Mifflin} = 10P + 6{,}25A - 5I + s \qquad (s = +5\ homens,\ -161\ mulheres)
```

O piso de alerta é 1.200 kcal para mulheres e 1.500 kcal para homens. A proteína usa o peso ajustado quando o IMC é alto: peso ideal + 25% do excesso.

**Exemplo resolvido** (mulher, 38 anos, 87,2 kg, 164 cm, fator 1,375, déficit de 500 kcal, 10 mg na semana 12):

| Etapa | Resultado |
| --- | --- |
| TMB (Mifflin-St Jeor) | 1.546 kcal |
| GET | 2.126 kcal |
| Meta com déficit de 500 kcal | 1.626 kcal |
| Proteína (1,45 g/kg × 66,2 kg ajustados) | 96 g, 384 kcal, 24% do VET |
| Lipídios (30% do VET) | 54 g, 488 kcal |
| Carboidratos (restante) | 189 g, 754 kcal, 46% do VET |

A perda estimada pela regra de 7.700 kcal por kg é de cerca de 0,45 kg por semana com 500 kcal de déficit. Com a tirzepatida a ingestão cai por conta própria, então a meta serve de referência de adequação de nutrientes.

## 2. Progressão da proteína

Ferramenta interativa: [Progressão da proteína](https://claude.ai/artifact/SY726pbrkKrJETvCYU4Zus). A meta sobe com a dose porque a perda de peso fica mais rápida e o apetite menor. A ferramenta lê a dose do perfil, mostra a fase e permite montar o dia com porções.

| Fase | Dose | Semanas | g/kg/dia | g/dia (exemplo, 66,2 kg) |
| --- | --- | --- | --- | --- |
| Início | 2,5 mg | 1 a 4 | 1,0 a 1,2 | 66 a 79 |
| Escalonamento inicial | 5 mg | 5 a 8 | 1,2 a 1,4 | 79 a 93 |
| Perda acelerada | 7,5 e 10 mg | 9 a 16 | 1,3 a 1,6 | 86 a 106 |
| Doses altas | 12,5 e 15 mg | 17 ou mais | 1,5 a 1,6 | 99 a 106 |
| Manutenção ou pós-uso | sem uso | | 1,2 a 1,6 | 79 a 106 |

Divida a meta em 25 a 30 g por refeição. Com 4 refeições e meta de 96 g, são 24 g em cada. Ajuste pela função renal: com TFG abaixo de 60, proteína acima de 0,8 g/kg exige decisão conjunta com o nefrologista. Se a ingestão ficar abaixo de 70% da meta, use refeições líquidas e suplemento.

## 3. Gorduras insaturadas

Ferramenta interativa: [Gorduras insaturadas](https://claude.ai/artifact/QdNUDLkQg3o8pvhqHCjJyZ). Mostra o teto de lipídios do plano e soma o que o paciente escolhe. Com saciedade intensa, prefira porções pequenas e densas, como azeite e pastas.

| Alimento | Medida caseira | kcal | Lipídios (g) | Ômega-3 (g) |
| --- | --- | --- | --- | --- |
| Azeite de oliva extra virgem | 1 colher de sopa (13 mL) | 108 | 12 | 0,1 |
| Abacate | 2 colheres de sopa (50 g) | 80 | 7,5 | 0,1 |
| Amêndoas | 10 unidades (12 g) | 70 | 6 | |
| Castanha-do-pará | 2 unidades (8 g) | 53 | 5,4 | |
| Nozes | 3 unidades (15 g) | 98 | 9,8 | 1,4 |
| Chia | 1 colher de sopa (12 g) | 58 | 3,7 | 2,1 |
| Linhaça moída | 1 colher de sopa (10 g) | 53 | 4,2 | 2,3 |
| Sardinha assada | 1 unidade média (60 g) | 125 | 6,5 | 0,9 |
| Salmão grelhado | 100 g | 200 | 11 | 2,0 |

A tabela completa tem 15 alimentos, com tipo de gordura, tolerância e observação. Duas a três porções de peixe gorduroso por semana cobrem o ômega-3 de cadeia longa. Limite a castanha-do-pará a 2 ou 3 unidades por dia.

## 4. Fibras e fitoquímicos

Ferramenta interativa: [Fibras e fitoquímicos](https://claude.ai/artifact/Rc7nHSyJj1xiAxpv9UQrvk). Filtra por grupo e por potencial de gases e adapta a dica ao sintoma da última consulta: com constipação, prioriza ameixa, kiwi, mamão e chia; com distensão, os itens de baixo potencial de gases.

Meta: 14 g por 1.000 kcal, com mínimo de 25 g (mulheres) e 30 g (homens). Aumente 3 a 5 g por semana e acompanhe com água.

| Alimento | Medida caseira | Fibras (g) | Fitoquímico principal | Gases |
| --- | --- | --- | --- | --- |
| Ameixa seca | 3 unidades (24 g) | 1,7 | Ácido neoclorogênico, sorbitol | Baixo |
| Mamão papaia | 1/2 unidade (150 g) | 2,7 | Carotenoides | Baixo |
| Chia | 1 colher de sopa (12 g) | 4,1 | Ácido clorogênico, ômega-3 | Baixo |
| Aveia em flocos | 3 colheres de sopa (30 g) | 2,7 | Beta-glucana | Baixo |
| Framboesa | 1/2 xícara (60 g) | 3,9 | Antocianinas, ácido elágico | Baixo |
| Lentilha cozida | 4 colheres de sopa (80 g) | 6,3 | Polifenóis | Médio |
| Feijão cozido | 1/2 concha (45 g) | 3,8 | Antocianinas, saponinas | Alto |
| Brócolis cozido | 4 colheres de sopa (60 g) | 2,0 | Sulforafano | Alto |
| Couve refogada | 2 colheres de sopa (40 g) | 2,3 | Luteína, kaempferol | Médio |

A tabela completa traz 26 alimentos em 8 grupos. Variar as cores do prato aumenta a variedade de fitoquímicos.

## 5. Carboidratos por volume

Ferramenta interativa: [Carboidratos por volume](https://claude.ai/artifact/6omubeVYLsXTaWKrxMQWcm). Divide a meta de carboidratos pelo número de refeições, soma as escolhas do prato e avisa quando o volume passa de cerca de 220 mL (atenção) ou 300 mL (alto), por causa do esvaziamento gástrico lento.

| Alimento | Medida caseira | Carboidrato (g) | Medidas em 15 g | Índice glicêmico |
| --- | --- | --- | --- | --- |
| Arroz branco cozido | 1 colher de sopa cheia | 7,0 | 2,1 | Alto |
| Arroz integral cozido | 1 colher de sopa cheia | 6,5 | 2,3 | Médio |
| Feijão carioca cozido | 1 concha pequena (60 g) | 8,2 | 1,8 | Baixo |
| Macarrão cozido | 1 pegador (50 g) | 15,5 | 1,0 | Médio |
| Aveia em flocos | 1 colher de sopa (10 g) | 6,7 | 2,2 | Baixo |
| Pão francês | 1 unidade (50 g) | 28,9 | 0,5 | Alto |
| Pão integral de forma | 1 fatia (25 g) | 11,7 | 1,3 | Médio |
| Batata-doce cozida | 1/2 unidade (100 g) | 18,4 | 0,8 | Médio |
| Banana prata | 1 unidade (70 g de polpa) | 18,2 | 0,8 | Médio |
| Leite desnatado | 1 copo (200 mL) | 10 | 1,5 | Baixo |

No exemplo, 189 g de carboidratos por dia em 4 refeições dão cerca de 47 g por refeição. Priorize fontes com fibras e comece o prato pela proteína.

## 6. Manejo dos efeitos colaterais

Ferramenta interativa: [Efeitos colaterais](https://claude.ai/artifact/Taq8XPBCCqc5TxYD1bWp3V). O paciente recebe nota de 0 a 10 para cada sintoma e os cartões se ordenam pela intensidade. Notas de 7 ou mais geram alerta no painel.

| Sintoma | Estratégia principal | Sinal de alerta |
| --- | --- | --- |
| Náusea | Refeições pequenas e frequentes, comer devagar, alimentos frios, gengibre | Vômitos repetidos ou não conseguir manter líquidos por mais de 24 horas |
| Vômito | Pausar sólidos por 1 a 2 horas, goles de 30 a 60 mL a cada 10 a 15 minutos, reidratação oral | Mais de 3 episódios em 24 horas ou sinais de desidratação |
| Constipação | Água de 2 a 2,5 L, fibras aos poucos, psyllium, magnésio se prescrito | Sem evacuar por mais de 4 dias com dor ou sangue nas fezes |
| Diarreia | Repor líquidos e sais, reduzir gordura, café e álcool, fibras solúveis | Mais de 3 dias, sangue, febre |
| Refluxo e azia | Jantar 3 horas antes de deitar, elevar a cabeceira, evitar café e frituras | Dificuldade para engolir, dor no peito |
| Dor abdominal | Reduzir gordura, registrar o padrão, avisar o prescritor | Dor intensa e contínua irradiada para as costas |
| Saciedade precoce | Proteína primeiro, 4 a 6 mini-refeições, líquidos proteicos | Ingestão abaixo de 800 kcal por mais de 3 dias |
| Distensão e gases | Mastigar bem, evitar gaseificados, reintroduzir leguminosas aos poucos | Distensão dolorosa com vômitos |
| Queda de cabelo | Meta de proteína, investigar ferritina, zinco, D e B12 | Falhas em placas ou lesões no couro cabeludo |
| Fadiga e tontura | Checar hidratação, calorias, anemia e glicemia | Desmaio, confusão ou glicemia abaixo de 70 mg/dL |

Em uso de insulina ou sulfonilureia, o prescritor pode precisar reduzir a dose desses medicamentos. A ferramenta traz também as listas de alimentos a preferir e a evitar.

## 7. Refeições líquidas, pastosas e sólidas

Ferramenta interativa: [Refeições por textura](https://claude.ai/artifact/6EahhzjGSrYWhkKUyyZXJB). A textura sugerida vem dos sintomas da última consulta: líquidas com náusea ou vômito intensos, pastosas com náusea moderada ou saciedade muito precoce, sólidas em pequenas porções quando os sintomas estão controlados. São 21 opções, e o paciente monta o dia contra a meta de proteína.

| Textura | Opção | kcal | Proteína (g) | Quando usar |
| --- | --- | --- | --- | --- |
| Líquida | Shake proteico de banana (200 mL de leite desnatado, 1 scoop de whey, 1/2 banana) | 225 | 31 | Café da manhã ou pós-treino com pouco apetite |
| Líquida | Caldo de ossos coado com colágeno | 50 | 10 | Náusea ou vômitos |
| Líquida | Iogurte grego batido com frutas vermelhas | 140 | 16 | Lanche da tarde |
| Líquida | Suplemento oral pronto hiperproteico (200 mL) | 200 | 20 | Ingestão abaixo de 70% da meta |
| Pastosa | Mingau de aveia proteico | 240 | 21 | Café da manhã ou ceia |
| Pastosa | Purê de batata-doce com frango desfiado | 230 | 20 | Almoço em dias de saciedade intensa |
| Pastosa | Ovos mexidos cremosos com requeijão light | 200 | 15 | Café da manhã e lanche |
| Pastosa | Papa de frango com legumes (300 mL) | 220 | 25 | Dificuldade de mastigar ou engolir |
| Sólida | Omelete de espinafre e queijo minas | 210 | 18 | Qualquer refeição |
| Sólida | Frango grelhado, legumes e arroz | 280 | 33 | Almoço e jantar |
| Sólida | Salmão com brócolis e batata-doce | 420 | 24 | Fonte de ômega-3 |
| Sólida | Iogurte grego com nozes | 220 | 15 | Lanche prático |

Valores aproximados. Para produtos industrializados, use o rótulo.

## 8. Suplementação conforme a deficiência

Ferramenta interativa: [Suplementação](https://claude.ai/artifact/4jgrQsj3aiuNfhisGwb8FN). Informe os exames e a página classifica cada um como adequado, limítrofe, deficiente ou acima, mostra a conduta do nutriente e gera um resumo para copiar. Exames baixos também geram alerta no painel.

| Nutriente | Deficiente | Dose de referência | Reavaliar |
| --- | --- | --- | --- |
| Vitamina D (25-OH) | Abaixo de 20 ng/mL (insuficiência de 20 a 29) | 50.000 UI por semana por 6 a 8 semanas e depois 1.000 a 2.000 UI por dia. Insuficiência: 1.000 a 4.000 UI por dia | 25-OH em 3 meses |
| Vitamina B12 | Abaixo de 200 pg/mL (limítrofe até 299) | 500 a 1.000 mcg por dia por via oral. Via intramuscular se grave | B12 em 2 a 3 meses |
| Ferritina | Abaixo de 15 ng/mL (baixa até 29) | 40 a 60 mg de ferro elementar por dia ou em dias alternados, com vitamina C | Ferritina e hemograma em 8 a 12 semanas |
| Hemoglobina | Abaixo de 12 g/dL (mulheres) ou 13 g/dL (homens) | Definir a causa antes de tratar | Hemograma em 8 a 12 semanas |
| Folato | Abaixo de 3 ng/mL (limítrofe até 5,9) | 400 a 800 mcg por dia | Folato em 3 meses |
| Magnésio | Abaixo de 1,7 mg/dL | 200 a 400 mg de magnésio elementar à noite | 8 a 12 semanas |
| Zinco | Abaixo de 60 µg/dL (limítrofe até 69) | 8 a 15 mg por dia, no máximo 30 mg | 8 a 12 semanas |
| Cálcio | Abaixo de 8,5 mg/dL | 1.000 a 1.200 mg por dia somando dieta e suplemento | Conforme a causa |

A página inclui também os suplementos de rotina e apoio: proteína em pó (20 a 30 g por dose quando a ingestão fica abaixo de 70% da meta), ômega-3, psyllium, eletrólitos, multivitamínico e creatina (opcional, evidência limitada neste contexto). As doses são esquemas de referência de uso comum. A prescrição e as interações com medicamentos são do profissional habilitado.

## 9. Avaliação da composição corporal

Ferramenta interativa: [Composição corporal](https://claude.ai/artifact/QwTV9uNRe8sSHGLi5ENwcg). Registre 3 leituras por ponto, a mediana entra no cálculo. A página recomenda a equação pelo perfil, compara as seis e permite aplicar o percentual de gordura ao perfil e à última consulta, o que alimenta os alertas de perda de massa magra.

**Como escolher a equação**

| Perfil | Equação recomendada | Motivo |
| --- | --- | --- |
| IMC de 35 ou mais | Circunferências (método da Marinha dos EUA), confirmar por bioimpedância ou DEXA | A prega espessa perde precisão e é difícil de pinçar |
| 60 anos ou mais | Durnin e Womersley | Coeficientes próprios para 50 anos ou mais, válida até 72 anos |
| Atleta ou muita massa muscular | Jackson e Pollock, 7 dobras | A soma de 7 pontos dilui o erro de um ponto isolado |
| 50 a 59 anos | Durnin e Womersley | Coeficientes por década |
| Até 30 anos, IMC abaixo de 30, sem treino intenso | Guedes | Desenvolvida em adultos jovens brasileiros |
| Demais adultos de 18 a 61 anos | Jackson e Pollock, 3 dobras | Prática, validada e reprodutível |

**Técnica de medida.** Lado direito do corpo, prega pinçada com polegar e indicador, adipômetro 1 cm abaixo dos dedos, leitura em 2 a 4 segundos, 3 rodadas alternadas, mesmo avaliador e mesmo aparelho no seguimento.

| Ponto | Local e direção da prega |
| --- | --- |
| Tríceps | Ponto médio entre acrômio e olécrano, face posterior, vertical |
| Bíceps | Mesmo nível, face anterior, vertical |
| Subescapular | 2 cm abaixo do ângulo inferior da escápula, oblíqua a 45° |
| Peitoral (homens) | Meio entre a linha axilar anterior e o mamilo, oblíqua |
| Axilar média | Linha axilar média, na altura do apêndice xifoide, vertical |
| Suprailíaca | Logo acima da crista ilíaca, na linha axilar anterior, oblíqua |
| Abdominal | 2 cm lateral à cicatriz umbilical, vertical |
| Coxa | Ponto médio entre a prega inguinal e a patela, face anterior, vertical |
| Panturrilha medial | Maior circunferência, face medial, vertical |

**Casos clínicos incluídos** (carregáveis na ferramenta)

| Caso | Perfil | Equação | Resultado |
| --- | --- | --- | --- |
| Marina, 38 anos | Obesidade grau I, sedentária | Jackson e Pollock, 3 dobras | 36,3% de gordura |
| Roberto, 45 anos | Obesidade grau II, pré-diabetes (IMC 38) | Circunferências (Marinha) | 37,0% de gordura |
| Helena, 62 anos | Pós-menopausa, risco de sarcopenia | Durnin e Womersley | 40,2% de gordura |
| Lucas, 29 anos | Musculação, IMC 27 por massa muscular | Jackson e Pollock, 7 dobras | 10,7% de gordura |
| Camila, 24 anos | Eutrófica com gordura corporal alta | Guedes | 28,1% de gordura |
| Carlos, 52 anos | Obesidade grau I, pré-diabetes | Durnin e Womersley | 34,9% de gordura |

Diferenças de 3 a 4 pontos percentuais entre equações são comuns. Use a mesma equação para acompanhar o mesmo paciente. A página calcula ainda cintura, relação cintura-quadril e cintura/altura.

## 10. Ficha de anamnese

Ferramenta interativa: [Ficha de anamnese](https://claude.ai/artifact/9vjVDs23XGxdT9Nj2K9SNh). Três fases com respostas guardadas no navegador, barra de preenchimento, resumo para copiar e alertas automáticos.

| Fase | O que cobre |
| --- | --- |
| Antes do uso | Motivo e expectativas, histórico de peso, comorbidades e medicamentos, precauções e contraindicações, hábitos alimentares, estilo de vida, intestino, exames e composição corporal |
| Durante o uso | Adesão e dose, apetite e saciedade, sintomas e sinais de alerta, hidratação, energia, sono e humor, atividade física, ajustes de outros medicamentos, plano e metas |
| Após o uso | Motivo da pausa, retorno do apetite, manutenção (proteína, treino, automonitoramento), exames de seguimento e plano de prevenção de recaída |

Alertas gerados: história de carcinoma medular de tireoide ou NEM2, gestação, pancreatite ou doença da vesícula, gastroparesia, retinopatia, transtorno alimentar, uso de insulina ou sulfonilureia, anticoncepcional oral, doença renal, pensamentos de se machucar e reganho de 3 kg ou mais.

## Referências e avisos de uso

As fórmulas e as fontes estão em [REFERENCIAS.md](REFERENCIAS.md).

- **Energia:** Mifflin-St Jeor (1990), Harris-Benedict revisada, Cunningham.
- **Composição corporal:** Jackson e Pollock (1978), Jackson, Pollock e Ward (1980), Durnin e Womersley (1974), Guedes (1985), Faulkner (1968), Hodgdon e Beckett (1984, método da Marinha), conversão de densidade pela equação de Siri.
- **Alimentos:** valores aproximados da Tabela Brasileira de Composição de Alimentos (TACO) e do USDA FoodData Central, em medidas caseiras usuais.
- **Tirzepatida:** conferir sempre a bula vigente e a prescrição.

**Aviso.** Material de apoio ao raciocínio clínico do profissional de saúde. Não substitui avaliação individual, exames nem prescrição médica. As doses de suplementos são esquemas de referência. Os valores de alimentos são médias aproximadas, e os rótulos de produtos industrializados prevalecem.
