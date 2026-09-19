# Relatório de testes

Os testes foram executados pelo papel TESTER usando MCP Playwright no Chrome, contra `http://127.0.0.1:8000/public/`.

## Resultado consolidado

- Rodada 1: 6 passaram; 2 falharam (overflow mobile e 404 de favicon).
- Rodada 2: fluxo principal e estados passaram; ainda havia overflow interno e 404.
- Rodada final: check-in → edição → checkout/histórico passou; mobile passou (`scrollWidth = clientWidth = 375`); o navegador ainda registrou 404 para `/favicon.ico`.

O relatório detalhado e todas as ações/esperados/observados estão em [testes/RELATORIO-TESTES.md](testes/RELATORIO-TESTES.md). As capturas estão em `evidencias/`.

## Limitações

O teste de publicação no Render não foi executado porque a aplicação não foi publicada. A divergência do favicon deve ser revalidada em um servidor limpo; os arquivos locais existem e os checks HTTP informados pelo DEV retornaram 200.
