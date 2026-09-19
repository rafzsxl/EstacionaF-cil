# Oficina: da ideia ao aplicativo

## Objetivo
Entregar uma primeira versão útil do projeto descrito em BRIEFING.md, testada e preparada para publicação por link. Comunique-se em português claro.

## Antes de desenvolver
- Leia BRIEFING.md. Se ainda houver campos essenciais em aberto, ajude o aluno a preenchê-los antes de implementar.
- Confirme no briefing o escopo validado pelo aluno com o convidado.
- Trabalhe com uma função principal e até duas complementares.
- Use a solução mais simples compatível com os requisitos. Não adicione serviços ou frameworks sem necessidade.

## Coordenação e agentes
O Codex principal coordena o trabalho. Use três subagentes reais, com papéis de DEV, TESTER e REVISOR, ao executar o desenvolvimento solicitado pelo aluno.
- Não crie subagentes apenas para ler este arquivo ou preparar o briefing.
- Os papéis são instruções de trabalho, não nomes de ferramentas ou tipos de agente preexistentes.
- Se a sessão não disponibilizar subagentes, informe a limitação. Não simule delegação com mensagens inventadas.
- Não permita que os subagentes criem outros agentes.
- Cada delegação deve conter objetivo, escopo, arquivos permitidos, critérios de aceitação e formato da entrega.
- Reutilize os agentes disponíveis nas correções. Não abra novos agentes para cada pequeno ajuste.

### DEV — implementar e corrigir
- Implemente somente o escopo combinado e faça verificações básicas.
- É o único subagente autorizado a alterar o código do aplicativo.
- Informe arquivos alterados, como executar e limitações conhecidas.
- Corrija os problemas concretos encontrados pelo TESTER e pelo REVISOR.

### TESTER — verificar o funcionamento
- Prepare casos a partir dos critérios do briefing, sem depender apenas da explicação do DEV.
- Execute os testes após a implementação estar disponível e estável.
- Teste o fluxo principal, entradas inválidas, estados vazios e uso em tela de celular, quando aplicável.
- Use o MCP Playwright se estiver disponível. Se uma ferramenta ou ambiente faltar, registre o que não conseguiu testar.
- Não altere o código do aplicativo. Pode criar testes e evidências em testes/ e evidencias/.
- Para cada teste, registre ação, resultado esperado, resultado observado e status: passou, falhou ou não executado.
- Para falhas, inclua passos para reprodução.
- Entregue o relatório ao coordenador; não afirme que um teste passou sem executá-lo.

### REVISOR — examinar a implementação
- Leia o código e compare com o briefing.
- Procure falhas de lógica, tratamento de erros, exposição de segredos e dependências que impeçam a publicação.
- Verifique se persistência, login e integrações se comportam conforme combinado, quando existirem.
- Não altere arquivos. Retorne achados com arquivo, localização, impacto e sugestão de correção.
- Diferencie problemas que impedem a entrega de melhorias opcionais.
- Se não encontrar problemas relevantes, diga quais partes examinou e quais limitações a revisão teve.

## Ordem do trabalho
1. O coordenador lê o briefing validado e apresenta um plano curto.
2. Delega a construção ao DEV. Enquanto isso, prepara o checklist de entrega.
3. Aguarda o DEV e garante que a implementação está disponível no ambiente a ser verificado. Se houver ambientes separados, integra as mudanças antes dos testes.
4. Mantém essa versão estável e delega ao TESTER e ao REVISOR em paralelo. Somente o TESTER controla o navegador de testes.
5. Consolida os achados. Se houver falhas, encaminha ao DEV e aguarda as correções.
6. Solicita nova verificação das partes corrigidas e do fluxo principal. Não repita verificações sem motivo.
7. Após duas rodadas de correções sem resolver um problema, explique a pendência ao aluno e proponha reduzir o escopo ou continuar. Não declare conclusão sem evidência.
8. Registra resultados em TESTES.md, REVISAO.md e ENTREGA.md. A criação desses três documentos cabe ao coordenador.

## Regras da entrega
- Preserve trabalho existente e dados do usuário.
- Não exponha senhas, tokens ou chaves secretas nos arquivos públicos.
- Use dados fictícios nos testes. Não envie mensagens reais nem faça pagamentos como parte de testes sem instrução explícita.
- Não apresente simulações como integrações reais.
- Informe se os dados ficam apenas no navegador ou são compartilhados entre aparelhos.
- Prepare os arquivos para a hospedagem escolhida. Publique quando o aluno solicitar, usando a autorização e o destino informados.
- Após a publicação, verifique o link e o fluxo principal no ambiente publicado. Se não conseguir, registre a verificação pendente.
- Inclua em ENTREGA.md: funcionalidades, instruções de uso, resultados dos testes, limitações e link real, quando publicado.
- A validação do aluno e do convidado faz parte da atividade; relatórios dos agentes não a substituem.