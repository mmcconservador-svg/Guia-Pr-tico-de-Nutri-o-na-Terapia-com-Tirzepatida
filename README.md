# Guia Prático de Nutrição na Terapia com Tirzepatida

Ferramentas interativas para a consulta de nutrição de pacientes em uso de tirzepatida: calculadoras, tabelas dinâmicas, avaliação da composição corporal, ficha de anamnese e um painel que liga tudo. Cada ferramenta funciona sozinha, em uma página própria. Todas também aparecem como abas do **Painel Tirzepatida** e como itens do menu do **Guia Tirzepatida**, a versão em formato de aplicativo com landing page.

> **Aviso.** Material de apoio ao raciocínio clínico do profissional de saúde. Não substitui avaliação individual, exames nem a prescrição médica. Valores de alimentos são médias aproximadas. Confira rótulos e tabelas oficiais.

## Ferramentas

| Página | O que faz |
| --- | --- |
| **Guia Tirzepatida** (`guia`) | Landing page que roda como aplicativo. Abre com uma apresentação (escada de doses interativa, mapa das ferramentas e como se ligam) e passa, em um clique, para o ambiente do app com menu lateral, tema claro e escuro, modo apresentação e todas as ferramentas com o mesmo paciente. |
| **Painel Tirzepatida** (`painel`) | Perfil único do paciente, indicadores, gráficos de peso, proteína, massa magra e sintomas, pontos de atenção, retorno sugerido, resumo para o prontuário e mensagem ao paciente. |
| Registro de consultas (aba do painel) | Peso, cintura, gordura corporal, proteína, água, sintomas 0 a 10 e sinais de alerta. Ao salvar, atualiza o perfil e todos os alertas. |
| **Avaliação da composição corporal** (`composicao-corporal`) | Escolhe a equação mais adequada ao perfil, recebe dobras cutâneas com 3 leituras por ponto (usa a mediana), compara 6 equações, calcula massa magra e gorda, risco metabólico e traz 6 casos clínicos carregáveis. |
| **GET, déficit e macronutrientes** (`get-deficit-macros`) | Mifflin-St Jeor, Harris-Benedict ou Cunningham, fator de atividade, déficit, piso calórico, macros e cenários de déficit. |
| **Progressão da proteína** (`progressao-proteina`) | g/kg por fase do escalonamento da dose, distribuição por refeição e montagem do dia com porções. |
| **Gorduras insaturadas** (`gorduras-insaturadas`) | Fontes mono, poli-insaturadas e ômega-3, com tolerância e ajuste à meta de lipídios. |
| **Fibras e fitoquímicos** (`fibras-fitoquimicos`) | Fibras por medida caseira, fitoquímicos, potencial de gases e orientação pelo sintoma. |
| **Carboidratos por volume** (`carboidratos-por-volume`) | Carboidrato por medida caseira, trocas de 15 g e prato por refeição com controle de volume. |
| **Efeitos colaterais** (`efeitos-colaterais`) | Estratégias, alimentos preferidos e a evitar e sinais de alerta de 10 queixas, ordenadas pela nota do paciente. |
| **Refeições por textura** (`refeicoes-liquidas-pastosas-solidas`) | 21 opções líquidas, pastosas e sólidas, com textura sugerida pelos sintomas. |
| **Suplementação** (`suplementacao`) | Interpreta 8 exames e mostra dose de referência, cuidados e prazo de reavaliação por nutriente. |
| **Ficha de anamnese** (`anamnese`) | Três fases (antes, durante e após o uso), com alertas para contraindicações e precauções. |

### Como as ferramentas se ligam (no painel)

- O **perfil** (sexo, idade, peso, altura, dose, semana) alimenta todas as abas.
- A **dose semanal** define a fase do tratamento e a meta de proteína em g/kg.
- A **gordura corporal** aplicada na composição corporal alimenta Cunningham, os alertas de perda de massa magra e o painel.
- Os **sintomas** da última consulta definem a textura sugerida das refeições e o prazo de retorno.
- Os **exames** da aba Suplementação geram alertas. As respostas da **anamnese** geram alertas de precaução.
- Cada regra pode ser desligada em **Automações**.

## E-book

O e-book "Guia Prático de Nutrição na Terapia com Tirzepatida" está em [docs/EBOOK.md](docs/EBOOK.md). Traz as tabelas, o exemplo resolvido de GET e macros, a escolha da equação de composição corporal, a técnica de dobras, os 6 casos clínicos e o resumo da anamnese.

## Online

As páginas são publicadas automaticamente no GitHub Pages a cada envio para `main` (`.github/workflows/pages.yml`): https://mmcconservador-svg.github.io/guia-pr-tico-de-nutri-o-na-terapia-com-tirzepatida/

## Privacidade

Tudo roda no navegador. Não há servidor, banco de dados nem análise de uso. Os dados ficam no `localStorage` do aparelho e podem ser exportados e importados em **Dados e backup**. As páginas abrem com dados fictícios de exemplo. Veja [SECURITY.md](SECURITY.md).

## Ambiente de desenvolvimento

Requisitos: Node.js 20 ou superior. O código das páginas não tem dependências. A única dependência de desenvolvimento é o Playwright, usado nos testes.

```bash
cp .env.example .env     # configuração local (não versionada)
npm ci --ignore-scripts
npm run check            # sintaxe, configuração e padrões inseguros
npm run build            # gera dist/web e dist/artifact
npm run dev              # build + servidor em http://127.0.0.1:5173
npx playwright install chromium
npm test                 # 18 testes de navegador e de cálculo
```

Há também um **devcontainer** em `.devcontainer/` (usuário sem privilégios, `--cap-drop=ALL`, `no-new-privileges`, instalação com `--ignore-scripts`).

### Configuração

| Onde | O que controla |
| --- | --- |
| `config/pages.json` | Páginas geradas, título, módulos de cada página, ordem das abas do painel, prefixo de armazenamento e política de segurança de conteúdo (CSP). |
| `.env` | `HOST` e `PORT` do servidor local, `BUILD_DIR` da saída e `HUB_URL` (link do painel publicado, exibido no rodapé das ferramentas individuais, apenas `https`). |

### Estrutura

```
src/styles/base.css          tema claro e escuro, tokens de cor e tipografia
src/js/core.js               estado, cálculos clínicos, alertas, componentes de formulário
src/js/m_dash_visits.js      painel e registro de consultas
src/js/m_comp.js             composição corporal e casos clínicos
src/js/m_get_prot.js         GET e macros, progressão da proteína
src/js/m_fat_fib_carb.js     gorduras, fibras e carboidratos
src/js/m_se_meals_supp.js    efeitos colaterais, refeições por textura, suplementação
src/js/m_anam.js             anamnese
src/js/m_app.js              landing e ambiente de aplicativo (menu lateral, tema, apresentação)
scripts/                     build, servidor local e verificações
tests/                       testes de navegador e de cálculo
docs/EBOOK.md                e-book em Markdown, com as tabelas e os exemplos resolvidos
docs/REFERENCIAS.md          equações e fontes
```

### Saídas do build

- `dist/web/*.html`: páginas completas e autônomas, com CSP por hash SHA-256 no script. Podem ser hospedadas em qualquer servidor estático (por exemplo, GitHub Pages).
- `dist/artifact/*.html`: fragmentos prontos para publicar como artefato.

### Como adicionar uma tabela ou ferramenta

1. Crie ou edite um arquivo em `src/js/` e registre o módulo com `T.reg({ id, tab, title, desc, html })`.
2. Declare o arquivo em `bundles` e a página em `pages` no `config/pages.json`.
3. Rode `npm run check && npm run build && npm test`.

## Contribuição e qualidade

- O CI (`.github/workflows/ci.yml`) roda verificação, build, testes e `npm audit` com permissão mínima.
- Use somente dados fictícios em testes, capturas de tela e issues.
- Mudanças em fórmulas ou doses devem citar a fonte em `docs/REFERENCIAS.md` e ter um teste.

## Licença

- **Código:** [MIT](LICENSE).
- **Conteúdo (e-book, referências e textos das tabelas):** CC BY-NC 4.0, veja [LICENSE-CONTEUDO.md](LICENSE-CONTEUDO.md).
