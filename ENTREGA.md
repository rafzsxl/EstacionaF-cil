# Entrega — Estaciona Fácil

## Status

Aplicação local preparada para avaliação. Não publicada no Render; ainda não existe link real.

## Funcionalidades

- Dashboard com 5 vagas de carros e 5 de motos.
- Check-in com validação de placa, categoria e vaga.
- Cobrança registrada na entrada: carro R$ 10,00 fixos + R$ 10,00/h; moto R$ 8,00 fixos + R$ 8,00/h.
- Cronômetro, edição de registro e checkout com taxa fixa + permanência proporcional.
- Fechamento do dia, bloqueio de novas entradas e abertura de novo dia sem apagar o anterior.
- Histórico dedicado em `public/historico.html`, com busca e filtro por dia.
- Migração versionada de dados legados compartilhada entre dashboard e histórico.
- Background em gradiente, alto contraste e layout responsivo.

## Como executar localmente

Na raiz:

```powershell
python -m http.server 8000
```

Abra `http://localhost:8000/public/`. O histórico fica em `http://localhost:8000/public/historico.html`.

Os dados ficam somente no `localStorage` deste navegador e não são compartilhados entre aparelhos.

## Testes e evidências

O relatório detalhado está em [testes/RELATORIO-TESTES.md](testes/RELATORIO-TESTES.md), com capturas em [evidencias/](evidencias/). A rodada final passou em migração, tarifas, fechamento/novo dia, histórico, mobile, console e rede. O teste automatizado de carro por exatamente uma hora não foi concluído; moto por uma hora foi validada em aproximadamente R$ 16,00.

## O que falta para publicar no Render

1. Criar um serviço **Static Site** apontando para este repositório.
2. Usar `public` como Publish Directory.
3. Deixar Build Command vazio.
4. Não configurar variáveis de ambiente: não há serviços externos.
5. Publicar e validar o URL com check-in, edição, checkout, fechamento/novo dia, histórico, mobile e favicon.

Não são necessários Node, banco, backend ou dependências. A publicação ainda não foi realizada e a validação final do aluno/convidado continua necessária.
