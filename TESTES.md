# Relatório de testes

## Rodada de configuração do Blueprint Render — 19/09/2026

| ID | Ação | Resultado esperado | Resultado observado | Status |
| --- | --- | --- | --- | --- |
| T01 | Interpretar `render.yaml` com PyYAML | Blueprint estático válido | `type: web`, `runtime: static`, build vazio e `staticPublishPath: ./public` foram lidos | Passou |
| T02 | Servir `public/` e solicitar as páginas e assets | Respostas HTTP 200 | `/`, `/index.html`, `/historico.html`, CSS, JS e favicon responderam 200 | Passou |
| T03 | Executar `node --check` nos quatro scripts | Sintaxe JavaScript válida | Todos os scripts passaram | Passou |
| T04 | Fazer check-in fictício na página inicial | Vaga C1 ocupada e contadores atualizados | Placa `ABC1D23` confirmada; 9 livres e 1 em uso | Passou |
| T05 | Abrir `historico.html` | Página e assets carregam sem erros | Tela renderizou; console sem erros ou avisos | Passou |
| T06 | Verificar histórico em 390×844 | Sem rolagem horizontal | `scrollWidth = clientWidth = 390` | Passou |
| T07 | Executar `node testes/tarifas.test.js` | Regras de tarifa aprovadas | 15 cenários passaram | Passou |

Os testes foram executados localmente, com `python -m http.server 8765 --directory public` e Playwright. O deploy remoto, domínio e headers do Render seguem pendentes porque nenhum serviço foi publicado nesta tarefa. Os dados permanecem no `localStorage` de cada navegador.

## Rodada de preparação para o Render — 19/09/2026

- 9 cenários de deploy passaram no servidor estático local, incluindo fluxo principal, entradas inválidas, estado vazio, checkout, mobile, console, assets, rotas e cobrança.
- 15 cenários unitários de tarifas passaram.
- O relatório detalhado está em [testes/RELATORIO-DEPLOY-TESTER-2026-09-19.md](testes/RELATORIO-DEPLOY-TESTER-2026-09-19.md).
- O teste no URL publicado do Render ainda não foi executado porque o serviço não foi publicado.

Os testes foram executados pelo papel TESTER usando MCP Playwright no Chrome, contra `http://127.0.0.1:8000/public/`.

## Resultado consolidado

Validação adicional do pacote estático: com servidor local iniciado dentro de `public/`, `/`, `/index.html`, `/historico.html`, os scripts, `style.css` e `favicon.svg` responderam HTTP 200. Os quatro arquivos JavaScript passaram no `node --check`.

- Rodada 1: 6 passaram; 2 falharam (overflow mobile e 404 de favicon).
- Rodada 2: fluxo principal e estados passaram; ainda havia overflow interno e 404.
- Rodada final: check-in → edição → checkout/histórico passou; mobile passou (`scrollWidth = clientWidth = 375`); o navegador ainda registrou 404 para `/favicon.ico`.

O relatório detalhado e todas as ações/esperados/observados estão em [testes/RELATORIO-TESTES.md](testes/RELATORIO-TESTES.md). As capturas estão em `evidencias/`.

## Limitações

O teste de publicação no Render não foi executado porque a aplicação não foi publicada. A divergência do favicon deve ser revalidada em um servidor limpo; os arquivos locais existem e os checks HTTP informados pelo DEV retornaram 200.
