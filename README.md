# Estaciona Fácil

Aplicação web estática voltada para a gestão e controle local de estacionamento com capacidade para 10 vagas (5 carros e 5 motos).

## Funcionalidades

- **Cálculo de Tarifas**:
  - **Carro**: R$ 10,00 (taxa fixa) + R$ 10,00 por hora.
  - **Moto**: R$ 8,00 (taxa fixa) + R$ 8,00 por hora.
- **Gestão de Período**: Fechamento diário do caixa, bloqueio de novas entradas e abertura de novos períodos.
- **Histórico**: Interface dedicada em `public/historico.html` com suporte a busca e filtros por data.
- **Persistência Local**: Dados gravados diretamente no `localStorage` do navegador atual (sem sincronização entre dispositivos).
- **Migração de Dados**: Suporte a migração versionada para compatibilidade com dados legados no navegador.

---

## Execução Local

Na raiz do projeto, execute um servidor HTTP simples:

```powershell
python -m http.server 8000
```

Acesse no navegador:
- **Aplicação Principal**: `http://localhost:8000/public/`
- **Histórico de Registros**: `http://localhost:8000/public/historico.html`

---

## Deploy no Render (Configurado via Blueprint)

O deploy da aplicação no Render é realizado de forma automatizada via **Blueprint**, utilizando as definições contidas no arquivo `render.yaml`.

### Diferença entre os Modelos de Deploy no Render

- **Render Blueprint (Utilizado neste repositório)**:
  Permite definir toda a infraestrutura como código (IaC) através do arquivo `render.yaml`. Ao selecionar **New > Blueprint**, o Render lê as configurações do arquivo de forma automática — identificando que o projeto é um site estático, definindo a pasta de publicação (`public`) e dispensando comandos manuais de build. Quaisquer alterações no arquivo YAML aplicam-se automaticamente à infraestrutura.

- **Static Site (Configuração Manual)**:
  Exige a configuração manual de todos os parâmetros diretamente pela interface web do Render (pelo menu **New > Static Site**). É necessário especificar manualmente o *Publish Directory* (ex: `public`) e deixar o *Build Command* em branco a cada nova criação de projeto.

### Passo a Passo para Deploy via Blueprint

1. Suba o projeto para o GitHub ou GitLab.
2. No painel do Render, vá em **New > Blueprint**.
3. Conecte o repositório do projeto.
4. O Render detectará o arquivo `render.yaml` e exibirá o serviço de site estático pronto para provisionamento.
5. Confirme a criação do serviço.

---

## Resultado Final

### Instruções para Clonar

```bash
git clone https://github.com/rafzsxl/EstacionaF-cil.git
```

### Demonstração do Projeto

Acesse a versão em produção publicada no Render:  
[https://estaciona-facil-bzy5.onrender.com/](https://estaciona-facil-bzy5.onrender.com/)
