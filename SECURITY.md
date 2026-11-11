# Segurança e privacidade

## Princípio de projeto

As páginas deste projeto funcionam inteiramente no navegador. **Nenhum dado de paciente sai do aparelho**: não há servidor, banco de dados, análise de uso nem chamadas de rede feitas pelo código. Os dados ficam no `localStorage` do navegador de quem usa e podem ser exportados e importados manualmente pelo botão "Dados e backup".

## O que o ambiente de desenvolvimento garante

- **Sem dependências em tempo de execução.** O código das páginas não carrega bibliotecas externas. A única dependência de desenvolvimento é o Playwright, usado nos testes.
- **Política de segurança de conteúdo (CSP).** Cada página gerada declara uma CSP com `default-src 'none'`. O script inline só executa se o hash SHA-256 coincidir com o gerado no build. Não há `eval`, `new Function`, `document.write` nem manipuladores de evento inline.
- **Verificação estática.** `npm run check` falha se o código-fonte contiver chamadas de rede (`fetch`, `XMLHttpRequest`, `WebSocket`, `sendBeacon`), `eval` ou padrões que lembrem segredos.
- **Servidor local restrito.** `npm run serve` escuta apenas em `127.0.0.1`, aceita só `GET` e `HEAD`, bloqueia travessia de diretórios e envia `X-Content-Type-Options: nosniff`.
- **Contêiner sem privilégios.** O devcontainer roda com usuário não root, `--cap-drop=ALL` e `no-new-privileges`, e instala dependências com `--ignore-scripts`.
- **Segredos fora do repositório.** `.env` e arquivos de backup de pacientes estão no `.gitignore`. Use `.env.example` como modelo.
- **CI com permissão mínima.** O fluxo do GitHub Actions usa apenas `contents: read` e não persiste credenciais do checkout. O Dependabot atualiza dependências e ações semanalmente.

## O que não fazer

- Não versione backups exportados, prints de tela nem exemplos com dados reais de pacientes. Use apenas dados fictícios nos testes e na documentação.
- Não hospede as páginas com scripts de terceiros (rastreadores, chat, analytics) sem rever a CSP e a política de privacidade da clínica.
- Ao usar o aparelho compartilhado, limpe os dados do site no navegador ou use o botão "Restaurar exemplo".

## Como relatar uma vulnerabilidade

Abra um [relatório privado de vulnerabilidade](../../security/advisories/new) neste repositório. Se não estiver disponível, abra uma issue sem detalhes técnicos sensíveis pedindo contato privado. Não inclua dados de pacientes.
