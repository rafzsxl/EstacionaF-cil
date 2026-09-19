# Estaciona Fácil

Aplicação web estática para controle local de 10 vagas (5 carros e 5 motos).

## Funcionalidades

- Cobrança: carro R$ 10,00 fixos + R$ 10,00/h; moto R$ 8,00 fixos + R$ 8,00/h.
- Fechamento do dia, bloqueio de novas entradas e abertura de novo período.
- Histórico dedicado em `public/historico.html`, com busca e filtro por dia.
- Migração versionada de dados legados no navegador.

## Como executar

Na raiz do projeto, execute:

```powershell
python -m http.server 8000
```

Acesse `http://localhost:8000/public/` ou `http://localhost:8000/public/historico.html`.

## Deploy no Render

Para publicar manualmente, no Render escolha **New > Static Site** e conecte este repositório.

1. Use `public` como Publish Directory.
2. Deixe o Build Command vazio.
3. Não configure variáveis de ambiente: o app não usa backend nem serviços externos.

O arquivo `public/index.html` é a entrada do site publicado. O histórico fica em `/historico.html`.

Os dados ficam no `localStorage` do navegador atual e não são compartilhados entre aparelhos.
