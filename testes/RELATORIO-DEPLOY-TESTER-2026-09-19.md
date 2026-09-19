# Relatório do TESTER — verificação para deploy estático

**Data:** 19/09/2026  
**Ambiente:** servidor estático local (`python -m http.server 8000`)  
**URL:** `http://127.0.0.1:8000/public/`  
**Navegador:** Chrome via MCP Playwright  
**Dados:** fictícios; armazenamento limpo no início da rodada

## Resultado

Todos os cenários executados passaram. Não foram alterados arquivos do aplicativo.

| ID | Ação | Resultado esperado | Resultado observado | Status |
|---|---|---|---|---|
| D01 | Abrir `/public/` com `localStorage` limpo | 10 vagas livres, 0 ocupadas, estado vazio do histórico | 10 vagas, 0 ocupadas, mensagem `Nenhum checkout registrado ainda.` e 10 cards renderizados | passou |
| D02 | Enviar placa `@@@` | Rejeitar entrada e informar erro | Mensagem `Informe uma placa válida com 7 caracteres.`; nenhum veículo criado | passou |
| D03 | Registrar `ABC1D23` como carro | Ocupar C1, atualizar contadores e iniciar cronômetro | 9 livres, 1 em uso; C1 exibiu placa, categoria e `00:00:00`; estado persistido com 1 ativo | passou |
| D04 | Registrar novamente `ABC1D23` | Impedir placa duplicada | Mensagem `Esta placa já está no estacionamento.`; permaneceu 1 vaga ocupada | passou |
| D05 | Clicar em `Saída` | Liberar vaga e criar registro no histórico | 10 livres, 0 ocupadas, 1 linha no histórico e 1 registro persistido | passou |
| D06 | Redimensionar para 390×844 | Não haver overflow horizontal | `scrollWidth=375`, `clientWidth=375`, sem descendentes fora do viewport | passou |
| D07 | Inspecionar console e assets | Sem erros e recursos locais carregados | 0 erros de console; HTML, CSS, JS e `favicon.svg` responderam 200 | passou |
| D08 | Executar `node testes/tarifas.test.js` | Cobertura de regras de cobrança sem falhas | 15 cenários passaram | passou |
| D09 | Verificar rotas estáticas `/`, `/public/`, dashboard, histórico e assets | Rotas disponíveis para hospedagem estática | Todas as 9 URLs verificadas retornaram HTTP 200 | passou |

## Evidências

- Screenshot mobile: `evidencias/rodada-deploy-mobile.png`
- As mensagens, contadores e dados persistidos foram coletados diretamente pelo Playwright durante a rodada.

## Achados e limitações

- Nenhum defeito funcional foi encontrado nesta rodada.
- A verificação foi feita localmente; o site ainda não foi publicado no Render, portanto domínio, headers e comportamento no ambiente publicado permanecem pendentes.
- A aplicação usa `localStorage` do navegador; os dados não são compartilhados entre aparelhos.
- A rota raiz retorna o HTML de redirecionamento para `public/`; a hospedagem deve servir o conteúdo do repositório conforme essa estrutura.
