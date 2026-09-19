# Relatório de testes — Estaciona Fácil

**Data:** 19/09/2026  
**URL testada:** http://127.0.0.1:8000/public/  
**Ambiente:** Chrome controlado exclusivamente por MCP Playwright; dados fictícios.

## Resumo

- 6 testes funcionais passaram.
- 1 teste de responsividade falhou por overflow horizontal.
- 1 teste de console falhou por recurso inexistente (`favicon.ico`).
- Todos os testes executados possuem screenshot correspondente em `evidencias/`.

## Casos executados

### T01 — Estado vazio inicial

- **Ação:** abrir a aplicação sem registros.
- **Esperado:** 10 vagas livres, nenhum veículo em uso e mensagem de histórico vazio.
- **Observado:** 10 vagas livres, 0 em uso e “Nenhum checkout registrado ainda.”.
- **Status:** passou.
- **Evidência:** `evidencias/01-estado-inicial.png`

### T02 — Entrada inválida

- **Ação:** informar `@@@` como placa e registrar entrada.
- **Esperado:** rejeitar a placa e mostrar mensagem de validação.
- **Observado:** entrada rejeitada com “Informe uma placa válida com 7 caracteres.”; contador permaneceu em 10 vagas livres.
- **Status:** passou.
- **Evidência:** `evidencias/02-entrada-invalida.png`

### T03 — Check-in válido, status e cronômetro

- **Ação:** registrar a placa fictícia `ABC1D23` na vaga C1.
- **Esperado:** vaga ocupada, status de sucesso, contador atualizado e cronômetro no formato `HH:MM:SS`.
- **Observado:** C1 exibiu `ABC1D23`, status “Entrada registrada na vaga C1.”, 9 vagas livres, 1 em uso e cronômetro `00:00:00` que avançou depois.
- **Status:** passou.
- **Evidência:** `evidencias/03-checkin-valido-status.png`

### T04 — Placa duplicada / proteção de vaga ocupada

- **Ação:** tentar registrar novamente `ABC1D23` enquanto C1 estava ocupada.
- **Esperado:** impedir duplicidade sem criar novo registro.
- **Observado:** mensagem “Esta placa já está no estacionamento.”; permaneceu apenas um veículo em uso. A lista de vagas disponíveis também removeu C1.
- **Status:** passou.
- **Evidência:** `evidencias/04-placa-duplicada-vaga-ocupada.png`

### T05 — Edição de placa, categoria e vaga

- **Ação:** editar o registro de `ABC1D23/C1/Carro` para `XYZ9K88/M1/Moto`.
- **Esperado:** atualizar os três dados e manter o veículo ativo.
- **Observado:** M1 exibiu `XYZ9K88`, `Moto`, cronômetro ativo e status “Registro atualizado.”; C1 ficou disponível.
- **Status:** passou.
- **Evidência:** `evidencias/05-edicao.png`

### T06 — Checkout, cálculo e histórico

- **Ação:** encerrar `XYZ9K88` após permanência inferior a um minuto.
- **Esperado:** liberar a vaga, registrar histórico e calcular cobrança proporcional à tarifa de moto (R$ 8,00/h).
- **Observado:** vaga M1 foi liberada; histórico registrou Moto/M1, tempo `00:00:57`, valor `R$ 0,13`; arrecadação mostrou `R$ 0,13` e 1 checkout.
- **Status:** passou.
- **Evidência:** `evidencias/06-checkout-historico-valor.png`

### T07 — Responsividade em viewport móvel

- **Ação:** redimensionar o Chrome para 390×844 e verificar o layout e caixas delimitadoras.
- **Esperado:** conteúdo caber no viewport, sem overflow horizontal relevante.
- **Observado:** a página principal ficou empilhada, mas o mapa posicionou C4/C5 além da largura visível (x=337 e x=439) e a tabela de histórico manteve 680 px de largura. Há overflow horizontal.
- **Status:** falhou.
- **Reprodução:** abrir a URL, definir viewport 390×844 e rolar horizontalmente; o mapa/tabela ultrapassam a largura do dispositivo.
- **Evidência:** `evidencias/07-mobile-responsividade.png`

### T08 — Erros básicos de console

- **Ação:** coletar mensagens de erro do console após a navegação e os fluxos.
- **Esperado:** nenhum erro de console causado pela aplicação.
- **Observado:** 1 erro: `Failed to load resource: the server responded with a status of 404 (File not found) @ http://127.0.0.1:8000/favicon.ico:0`.
- **Status:** falhou.
- **Reprodução:** abrir DevTools/console ou executar coleta de mensagens após navegar para a URL; o navegador requisita `/favicon.ico` e recebe 404.
- **Evidências:** `evidencias/08-console-errors.log` e `evidencias/08-console-errors.png`

## Limitações da rodada

- O servidor local já estava disponível em `127.0.0.1:8000`; não foi necessário iniciar outro processo.
- Não foi testada publicação no Render, autenticação ou compartilhamento entre dispositivos, pois a aplicação é local e usa `localStorage`.
- O teste de edição utilizou sobrescrita temporária de `window.prompt` no contexto do navegador para fornecer os dados fictícios de forma determinística; o resultado foi validado pela interface renderizada.
- Não foram alterados arquivos da aplicação. Foram criadas apenas as evidências e este relatório.

## Rodada 2 — verificação dirigida após correções do DEV

**Data:** 19/09/2026  
**URL testada:** http://127.0.0.1:8000/public/  
**Ambiente:** Chrome controlado exclusivamente por MCP Playwright; dados fictícios; `localStorage` limpo antes do estado inicial.

### Resumo da rodada 2

- 4 dos 6 pontos verificados passaram.
- O fluxo funcional repetido permaneceu estável.
- A ausência de overflow horizontal não foi confirmada.
- A ausência de 404/favicon não foi confirmada: ainda há 404 para `/favicon.ico`, embora `/public/favicon.svg` responda 200.

### T09 — Estado inicial

- **Ação:** limpar o `localStorage`, recarregar e abrir a aplicação.
- **Esperado:** 10 vagas livres, 0 veículos em uso e histórico vazio.
- **Observado:** 10 vagas livres, 0 em uso e “Nenhum checkout registrado ainda.”.
- **Status:** passou.
- **Evidência:** `evidencias/09-r2-estado-inicial.png`

### T10 — Check-in válido

- **Ação:** registrar `R2ABC12` como carro na vaga C1.
- **Esperado:** C1 ocupada, 9 vagas livres, 1 veículo em uso e status de sucesso.
- **Observado:** C1 exibiu `R2ABC12`, `Carro · 00:00:02`, 9 vagas livres, 1 em uso e “Entrada registrada na vaga C1.”.
- **Status:** passou.
- **Evidência:** `evidencias/10-r2-checkin-valido.png`

### T11 — Edição

- **Ação:** editar `R2ABC12/C1/Carro` para `R2XYZ99/M1/Moto`.
- **Esperado:** atualizar placa, categoria e vaga sem perder o registro ativo.
- **Observado:** M1 exibiu `R2XYZ99`, `Moto`, cronômetro ativo e status “Registro atualizado.”; C1 ficou disponível.
- **Status:** passou.
- **Evidência:** `evidencias/11-r2-edicao.png`

### T12 — Checkout e histórico

- **Ação:** encerrar `R2XYZ99` após permanência de 18 segundos.
- **Esperado:** liberar M1, registrar histórico e calcular cobrança proporcional de moto.
- **Observado:** M1 foi liberada; histórico registrou `R2XYZ99`, `Moto`, `M1`, `00:00:18`, `R$ 0,04`; arrecadação mostrou `R$ 0,04` e 1 checkout.
- **Status:** passou.
- **Evidência:** `evidencias/12-r2-checkout-historico.png`

### T13 — Viewport móvel e overflow horizontal

- **Ação:** redimensionar para 390×844 e medir o viewport, elementos e contêineres roláveis.
- **Esperado:** nenhum conteúdo ou contêiner ultrapassar horizontalmente a área disponível.
- **Observado:** `documentElement.scrollWidth` ficou em 390 px, mas há overflow interno: `.parking-grid` tem `scrollWidth=500` e `clientWidth=177`; cards chegaram a `right=531`, além do viewport. A tabela de histórico permaneceu com 680 px de largura.
- **Status:** falhou.
- **Reprodução:** abrir a URL, definir viewport 390×844 e inspecionar/rolar o mapa de vagas e a tabela; o conteúdo fica cortado/ultrapassa seus contêineres.
- **Evidência:** `evidencias/13-r2-mobile-sem-overflow.png`

### T14 — Console e network: favicon/404

- **Ação:** coletar erros do console e requisições relacionadas a favicon após navegação e os fluxos.
- **Esperado:** zero erros e zero respostas 404 relacionadas ao favicon.
- **Observado:** o console ainda registrou `404 (File not found) @ http://127.0.0.1:8000/favicon.ico:0`. A requisição `http://127.0.0.1:8000/public/favicon.svg` respondeu 200 OK.
- **Status:** falhou.
- **Reprodução:** abrir a aplicação e coletar as mensagens de erro do console; o navegador ainda tenta `/favicon.ico` na raiz do servidor.
- **Evidências:** `evidencias/14-r2-console-network.png` e `evidencias/14-r2-console-errors.log`

### Limitações da rodada 2

- A checagem de console reteve o erro 404 reportado pela sessão Playwright; a listagem de network identificou `public/favicon.svg` como 200, mas não exibiu a requisição raiz `/favicon.ico` na listagem filtrada.
- O `localStorage` foi limpo somente no contexto do navegador de teste para isolar a rodada; isso não altera os arquivos do projeto.
- Nenhum código da aplicação foi alterado. Foram adicionadas apenas as evidências e este relatório.

## Rodada final de verificação — pós-rodada 2

**Data:** 19/09/2026  
**URL testada:** http://127.0.0.1:8000/public/  
**Ambiente:** Chrome controlado exclusivamente por MCP Playwright; `localStorage` limpo antes do fluxo.

Esta é a rodada final de verificação solicitada. O fluxo funcional e a responsividade passaram, mas a rodada **não recebe aprovação final completa** porque o erro de favicon ainda aparece no console.

### T15 — Fluxo principal completo

- **Ação:** registrar `FINABC1`, editar para `FINXYZ2/Moto/M1` e concluir a saída.
- **Esperado:** check-in, edição e checkout/histórico funcionarem em sequência.
- **Observado:** check-in ocupou C1; edição moveu o registro para M1 e alterou placa/categoria; checkout liberou a vaga e registrou `FINXYZ2`, `Moto`, `M1`, `00:00:16`, `R$ 0,04` no histórico.
- **Status:** passou.
- **Evidências:** `evidencias/15-final-checkin.png`, `evidencias/16-final-edicao.png`, `evidencias/17-final-checkout-historico.png`

### T16 — Viewport móvel sem overflow horizontal

- **Ação:** redimensionar para 390×844 e medir `documentElement`, `.parking-grid`, `table` e seus descendentes.
- **Esperado:** `documentElement.scrollWidth <= clientWidth`; mapa e tabela dentro da largura disponível, sem overflow horizontal relevante.
- **Observado:** viewport efetivo de 375 px; `documentElement.scrollWidth=375` e `clientWidth=375`; `.parking-grid` ficou em 168 px com `scrollWidth=168`; tabela ficou em 313 px com `scrollWidth=313`; nenhum descendente do mapa/tabela ultrapassou o viewport.
- **Status:** passou.
- **Evidência:** `evidencias/18-final-mobile-sem-overflow.png`

### T17 — Console/network sem 404 de favicon

- **Ação:** coletar erros do console e requisições relacionadas a favicon/404.
- **Esperado:** nenhum 404 de favicon e nenhum erro no console.
- **Observado:** a requisição `http://127.0.0.1:8000/public/favicon.svg` respondeu 200 OK, porém o console ainda registrou `404 (File not found) @ http://127.0.0.1:8000/favicon.ico:0`.
- **Status:** falhou.
- **Reprodução:** abrir a aplicação no servidor `127.0.0.1:8000` e coletar erros do console; o navegador solicita `/favicon.ico` na raiz, que continua inexistente.
- **Pendência:** disponibilizar `favicon.ico` na raiz servida pelo servidor ou remover/corrigir a referência que provoca essa solicitação.
- **Evidências:** `evidencias/19-final-console-network.png` e `evidencias/19-final-console-errors.log`

### Resultado final da verificação

- Fluxo principal: aprovado.
- Mobile/overflow: aprovado.
- Favicon/console: pendente por 404.
- **Conclusão:** rodada final executada, mas entrega ainda não está 100% aprovada devido exclusivamente ao 404 de `/favicon.ico`.

### Limitações

- A listagem de network filtrada exibiu apenas `public/favicon.svg` com 200 OK; o 404 de `/favicon.ico` foi confirmado pela mensagem de erro do console.
- O `localStorage` foi limpo somente no contexto do navegador para garantir isolamento dos dados de teste.
- Nenhum código da aplicação foi alterado.

## Rodada T20–T28 — evolução funcional

**Data:** 19/09/2026  
**URL:** http://127.0.0.1:8000/public/  
**Ambiente:** Chrome controlado exclusivamente por MCP Playwright. O `localStorage` do domínio de teste foi limpo antes do início; foram usados somente dados fictícios.

### T20 — Dashboard/background e estado inicial

- **Ação:** abrir o dashboard após limpar o `localStorage`.
- **Esperado:** dashboard carregado, dia em operação visível, 10 vagas livres, nenhum veículo e histórico vazio.
- **Observado:** dashboard carregou com mapa de 10 vagas, 10 vagas livres, 0 em uso, arrecadação R$ 0,00, dia em operação e mensagem de histórico vazio.
- **Status:** passou.
- **Evidência:** `evidencias/20-dashboard-estado-inicial.png`

### T21 — Check-in de carro e taxas

- **Ação:** registrar `CARRO10` como carro na vaga C1.
- **Esperado:** taxa fixa de R$ 10,00, taxa horária de R$ 10,00 e estimativa exibida.
- **Observado:** status informou “Taxa fixa: R$ 10,00”; o cartão mostrou `Carro · 00:00:01` e `Estimativa: R$ 10,00`. A estrutura persistida do registro confirmou `fixedFee=10` e `hourlyRate=10`.
- **Status:** passou.
- **Evidência:** `evidencias/21-checkin-carro-taxas.png`

### T22 — Check-in de moto e taxas

- **Ação:** registrar `MOTO800` como moto na vaga M1.
- **Esperado:** taxa fixa de R$ 8,00, taxa horária de R$ 8,00 e estimativa exibida.
- **Observado:** status informou “Taxa fixa: R$ 8,00”; o cartão mostrou `Moto · 00:00:01` e `Estimativa: R$ 8,00`. O registro persistido confirmou a categoria `motorcycle` e a tarifa horária de 8.
- **Status:** passou.
- **Evidência:** `evidencias/22-checkin-moto-taxas.png`

### T23 — Checkout com permanência simulada

- **Ação:** ajustar, somente no contexto do navegador, a entrada de `CARRO10` para aproximadamente 90 minutos antes e realizar o checkout.
- **Esperado:** valor igual à taxa fixa mais o proporcional: R$ 10,00 + aproximadamente R$ 15,00 = aproximadamente R$ 25,00.
- **Observado:** duração registrada de `01:30:08` e valor `R$ 25,02`; histórico e arrecadação exibiram o mesmo valor. A diferença de centavos corresponde ao tempo transcorrido entre simulação e checkout.
- **Status:** passou.
- **Evidência:** `evidencias/23-checkout-permanencia-valor.png`

### T24 — Fechar dia e bloquear novo check-in

- **Ação:** confirmar “Fechar dia” com `MOTO800` ainda ativo.
- **Esperado:** dia fechado, novos check-ins bloqueados e mensagem/estado correspondente; dados ativos e histórico preservados.
- **Observado:** estado mudou para “Dia fechado”, campos e botão de entrada ficaram desabilitados e apareceu “Dia fechado. Abra um novo dia para registrar entradas.”; o veículo ativo e histórico permaneceram visíveis.
- **Status:** passou.
- **Evidência:** `evidencias/24-fechar-dia-bloqueio.png`

### T25 — Abrir novo dia e manter acesso ao anterior

- **Ação:** clicar em “Abrir novo dia”.
- **Esperado:** check-in novamente liberado e registros do dia anterior preservados.
- **Observado:** apareceu “Novo dia aberto para check-ins.”, o formulário foi habilitado e o histórico manteve `CARRO10`, `C1`, duração `01:30:08` e valor `R$ 25,02`.
- **Status:** passou.
- **Evidência:** `evidencias/25-abrir-novo-dia.png`

### T26 — `historico.html`, navegação, filtro e colunas

- **Ação:** navegar por “Histórico completo” e buscar `CARRO10`.
- **Esperado:** página própria, filtro/busca funcional e colunas de tipo, entrada, saída, duração e valor, incluindo registros de dias anteriores.
- **Observado:** `historico.html` abriu; busca retornou 1 registro; foram exibidas as colunas Placa, Tipo, Vaga, Entrada, Saída, Duração e Valor, com o registro encerrado do dia anterior.
- **Status:** passou.
- **Evidência:** `evidencias/26-historico-filtro-colunas.png`

### T27 — Entradas inválidas e vaga/placa ocupada

- **Ação:** tentar registrar `@@@` e depois tentar registrar novamente `MOTO800`, que permanecia ativo em M1.
- **Esperado:** rejeitar formato inválido e impedir duplicidade/uso indevido de vaga ocupada.
- **Observado:** `@@@` gerou “Informe uma placa válida com 7 caracteres.”; `MOTO800` gerou “Esta placa já está no estacionamento.”; M1 permaneceu ocupada e não foi criado segundo registro.
- **Status:** passou.
- **Evidências:** `evidencias/27-invalidas-e-vaga-ocupada.png` e `evidencias/27b-placa-vaga-ocupada.png`

### T28 — Viewport móvel e console/network

- **Ação:** usar viewport estreito de 390×844; medir `documentElement`, `.parking-grid` e `table`; coletar erros do console e requisições de favicon/404.
- **Esperado:** sem overflow horizontal relevante e sem erros/404 básicos.
- **Observado:** viewport efetivo de 375 px; `documentElement.scrollWidth=375` e `clientWidth=375`; mapa e tabela tiveram `scrollWidth` igual ao `clientWidth` (168 e 313 px respectivamente); nenhum descendente ultrapassou o viewport; console retornou 0 erros; `public/favicon.svg` respondeu 200 OK.
- **Status:** passou.
- **Evidências:** `evidencias/28-mobile-console-network.png` e `evidencias/28-console-errors.log`

### Resultado da rodada T20–T28

Todos os testes obrigatórios desta rodada passaram após execução no navegador. A rodada foi isolada com `localStorage` limpo no início e não houve alteração no código da aplicação.

### Limitações

- A permanência de 90 minutos do T23 foi simulada alterando o timestamp no `localStorage` do contexto do navegador, sem alterar arquivos da aplicação; isso foi necessário para testar o cálculo proporcional sem esperar 90 minutos.
- O dia de teste ficou com `MOTO800` ativo ao ser fechado, comportamento permitido pela interface e preservado ao abrir o novo dia.

## Rodada final solicitada — migração, fechamento de dia e histórico

**Data:** 19/09/2026  
**URL:** http://127.0.0.1:8000/public/  
**Ambiente:** Chrome controlado exclusivamente por MCP Playwright; dados fictícios; nenhum arquivo da aplicação foi alterado.

### T30 — Migração de `localStorage` legado no dashboard

- **Ação:** limpar o armazenamento e gravar estado sintético antigo com `active` e `history`; recarregar o dashboard.
- **Esperado:** registros legados visíveis e estado migrado com `days`, `currentDayId`, `dayId`, `fixedFee`, `hourlyRate`, `schema` e `version`.
- **Observado:** `ABC1D23` apareceu como ativo e `XYZ9K88` no histórico; estado salvo com `version=3`, `schema=parking-days-v1`, `days/currentDayId` e taxas normalizadas (carro 10/10; moto 8/8).
- **Status:** passou.
- **Evidência:** `evidencias/30-legado-dashboard-migrado.png`

### T31 — Histórico dedicado com estado legado migrado

- **Ação:** abrir diretamente `public/historico.html` após a migração.
- **Esperado:** registros do mesmo armazenamento, filtro de dia e colunas de placa, tipo, vaga, entrada, saída, duração e valor.
- **Observado:** `XYZ9K88` foi exibido; o controle de dia estava presente; cabeçalhos observados: Placa, Tipo, Vaga, Entrada, Saída, Duração e Valor.
- **Status:** passou.
- **Evidência:** `evidencias/31-legado-historico-direto.png`

### T32 — Check-in de carro e moto com taxas registradas

- **Ação:** limpar o estado e registrar `CAR1A23` como carro em C1 e `MOT1B23` como moto em M1.
- **Esperado:** dois veículos ativos, com carro em 10/10 e moto em 8/8 (fixa/hora).
- **Observado:** os dois registros ficaram visíveis e persistidos com as tarifas esperadas.
- **Status:** passou.
- **Evidência:** `evidencias/32-fluxo-checkin-carro-moto.png`

### T33 — Fechar dia e bloquear novas entradas

- **Ação:** confirmar o botão “Fechar dia”.
- **Esperado:** dia fechado, formulário desabilitado, mensagem de bloqueio e botão para abrir novo dia; registros ativos preservados.
- **Observado:** dia fechado, formulário e botão de entrada desabilitados, mensagem “Dia fechado. Abra um novo dia para registrar entradas.” e botão “Abrir novo dia” visível. Na primeira leitura imediatamente após a confirmação, a asserção automática de quantidade de ativos não coincidiu; a sequência seguinte confirmou que os ativos continuavam preservados no estado e na tela do novo dia.
- **Status:** passou com observação de sincronização na leitura imediata.
- **Reprodução da observação:** confirmar o diálogo e consultar `active.length` no mesmo instante da renderização; repetir após a renderização estabilizar.
- **Evidências:** `evidencias/33-dia-fechado-entrada-bloqueada.png`, `evidencias/34-dia-fechado-confirmado.png`

### T34 — Abrir novo dia e realizar checkout com cobrança

- **Ação:** abrir novo dia; registrar `NOV1A23` como carro; realizar checkout; registrar `MOT2C34` como moto com entrada simulada uma hora antes; realizar checkout.
- **Esperado:** novo dia aberto, dia anterior preservado, histórico atualizado e cobrança fixa + hora (aproximadamente R$ 20 para carro de uma hora e R$ 16 para moto de uma hora).
- **Observado:** dois dias ficaram persistidos, um fechado e um aberto; checkout do carro foi criado. O teste exato de uma hora foi concluído para `MOT2C34`, com `fixedFee=8`, `hourlyRate=8` e valor `R$ 16,00024` (arredondamento de centavos). O primeiro carro também foi encerrado durante a sequência, com valor proporcional registrado.
- **Status:** passou para o cálculo de moto e para o fluxo; a expectativa exata de R$ 20 foi não executada para `NOV1A23` porque o timestamp sintético foi aplicado ao registro anterior, não ao novo carro.
- **Evidências:** `evidencias/36-novo-dia-checkout-cobranca.png`, `evidencias/37-cobranca-moto-fixa-hora.png`

### T35 — Histórico final, filtros e colunas

- **Ação:** abrir `historico.html` após os check-outs e consultar as linhas geradas.
- **Esperado:** tabela com filtro, colunas completas e registros encerrados.
- **Observado:** 3 linhas, filtro presente, colunas Placa/Tipo/Vaga/Entrada/Saída/Duração/Valor e valores monetários exibidos; `CAR1A23` e `MOT2C34` apareceram.
- **Status:** passou.
- **Evidência:** `evidencias/38-historico-final-colunas-filtro.png`

### T36 — Viewport móvel, console e rede

- **Ação:** redimensionar para 390×844; medir largura; coletar console e requisições de rede.
- **Esperado:** sem overflow horizontal, zero erros de console e recursos locais carregados sem erro.
- **Observado:** viewport efetivo de 390 px, `scrollWidth=375`, sem overflow horizontal (`horizontalOverflow=false`); console com 0 mensagens; dashboard, CSS, storage, app e favicon.svg responderam 200.
- **Status:** passou.
- **Evidências:** `evidencias/39-viewport-mobile-final.png`, `evidencias/40-console-errors-final.log`, `evidencias/41-network-final.log`

### Resultado desta rodada

- Migração legada: passou.
- Histórico dedicado: passou.
- Check-in carro/moto e taxas persistidas: passou.
- Fechamento/bloqueio/novo dia: passou, com observação de sincronização na primeira leitura automática.
- Checkout e cálculo: passou para a cobrança de moto em uma hora; o cenário exato de carro em uma hora não foi concluído devido à aplicação do timestamp sintético no registro errado.
- Histórico final: passou.
- Mobile, console e rede: passou.

### Limitações

- O teste de uma hora foi simulado alterando timestamps no `localStorage` do contexto do navegador, sem modificar a aplicação.
- O primeiro registro após o fechamento apresentou uma leitura automática inconsistente da quantidade de ativos antes da renderização estabilizar; a sequência posterior mostrou os registros preservados.
- O estado de teste permanece no `localStorage` do perfil Chrome usado pelo Playwright; isso não altera arquivos do projeto.
- Os dados ficam no navegador local de teste; não foi testado compartilhamento entre dispositivos.
