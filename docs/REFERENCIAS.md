# Equações e referências

As fórmulas estão implementadas em `src/js/core.js` (energia e proteína) e `src/js/m_comp.js` (composição corporal). Valores de alimentos, doses de suplementos e metas são **aproximações de apoio** e devem ser conferidas em fontes atualizadas antes do uso clínico.

## Energia

| Item | Fórmula |
| --- | --- |
| Mifflin-St Jeor | TMB = 10·peso + 6,25·altura − 5·idade + 5 (homens) ou − 161 (mulheres) |
| Harris-Benedict revisada | Homens: 88,362 + 13,397·peso + 4,799·altura − 5,677·idade. Mulheres: 447,593 + 9,247·peso + 3,098·altura − 4,330·idade |
| Cunningham | TMB = 500 + 22·massa magra (kg) |
| GET | TMB × fator de atividade |
| Meta | GET − déficit. Piso de alerta: 1.200 kcal (mulheres) e 1.500 kcal (homens) |
| Peso ideal | IMC 22 × altura². Peso ajustado = ideal + 25% do excesso |

## Composição corporal

Todas convertem densidade corporal em percentual de gordura pela equação de Siri: %G = 495 / D − 450.

| Equação | Referência | Pontos |
| --- | --- | --- |
| Jackson e Pollock, 3 dobras | Jackson e Pollock (1978); Jackson, Pollock e Ward (1980) | Homens: peitoral, abdominal, coxa. Mulheres: tríceps, suprailíaca, coxa |
| Jackson e Pollock, 7 dobras | idem | Peitoral, axilar média, tríceps, subescapular, abdominal, suprailíaca, coxa |
| Durnin e Womersley | Durnin e Womersley (1974) | Bíceps, tríceps, subescapular, suprailíaca. Coeficientes por sexo e década |
| Guedes | Guedes (1985) | Homens: tríceps, suprailíaca, abdominal. Mulheres: subescapular, suprailíaca, coxa |
| Faulkner | Faulkner (1968) | %G = 0,153 · (tríceps + subescapular + suprailíaca + abdominal) + 5,783 |
| Circunferências (Marinha dos EUA, versão métrica) | Hodgdon e Beckett (1984) | Homens: cintura e pescoço. Mulheres: cintura, quadril e pescoço, mais a altura |

A classificação do percentual de gordura segue as faixas do American Council on Exercise (essencial, atlético, fitness, aceitável e acima do aceitável). A escolha automática da equação considera IMC (35 ou mais favorece circunferências e métodos por imagem), idade, e perfil atlético.

**Limites.** Equações de dobras têm erro de alguns pontos percentuais e perdem precisão na obesidade importante. Compare sempre com a mesma equação e o mesmo avaliador. Quando possível, confirme por bioimpedância ou DEXA.

## Condutas nutricionais

- Proteína de 1,2 a 1,6 g/kg/dia por fase, ajustada por função renal, idade e treino.
- Fibras: 14 g por 1.000 kcal, com mínimo de 25 g (mulheres) e 30 g (homens).
- Água: 35 mL/kg do peso ajustado, entre 2 e 3 L.
- Doses de suplementos: esquemas usuais de prática clínica, com cuidados e prazos de reavaliação. A prescrição é do profissional habilitado.
- Precauções da tirzepatida (carcinoma medular de tireoide, NEM2, pancreatite, vesícula, gastroparesia, retinopatia, gestação, hipoglicemia com insulina ou sulfonilureia, redução da eficácia de anticoncepcional oral): conferir a bula vigente.

## Tabelas de alimentos

Valores aproximados com base na Tabela Brasileira de Composição de Alimentos (TACO) e no USDA FoodData Central, em medidas caseiras usuais. Arredondamentos e escolhas de porção são do projeto. Conferir os rótulos de produtos industrializados.
