# Briefing Técnico: Sistema de Gestão de Estacionamento ("Estaciona Fácil")

## 1. Visão Geral e Objetivos do Sistema
O **Estaciona Fácil** é uma aplicação web CRUD (Create, Read, Update, Delete) voltada para o controle operacional e monitoramento em tempo real de ocupação de vagas de estacionamento. O sistema visa otimizar o fluxo de entrada/saída de veículos e fornecer dados precisos de tarifação por tempo de permanência para motoristas em busca urgente de vagas.

---

## 2. Requisitos Funcionais (RF)

*   **RF-01 (Mapeamento de Vagas):**
    *   **Carros:** 5 vagas totais ($V_{C1}$ a $V_{C5}$).
    *   **Motos:** 5 vagas totais ($V_{M1}$ a $V_{M5}$).
*   **RF-02 (Regra de Negócio e Tarifação):**
    *   Taxa de permanência para **Carros**: R$ 10,00 / hora (cálculo proporcional ou fração de hora, conforme parametrização).
    *   Taxa de permanência para **Motos**: R$ 8,00 / hora.
*   **RF-03 (Operações CRUD de Registro):**
    *   **Create:** Check-in de veículo associando placa, categoria (Carro/Moto), horário de entrada (`timestamp`) e código da vaga.
    *   **Read:** Leitura do status atual de ocupação e histórico de permanência.
    *   **Update:** Alteração de dados do registro (ex.: correção de placa ou realocação de vaga).
    *   **Delete/Check-out:** Encerramento do ciclo da vaga, cálculo de valor devido com base no `timestamp` atual e liberação do slot.
*   **RF-04 (Telemetria e Cronometragem):**
    *   Cálculo em tempo real do tempo decorrido ($T_{atual} - T_{entrada}$) exibido dinamicamente por veículo cadastrado.

---

## 3. Requisitos Não Funcionais (RNF) e UX/UI

*   **RNF-01 (Identidade Visual & Palette):**
    *   Design baseado em alto contraste para rápida leitura visual sob estresse/urgência.
    *   **Cores Primárias:** Cinza Escuro (`#212529`), Preto (`#121212`) e Amarelo Industrial (`#FFC107`).
*   **RNF-02 (Dashboard e Visualização Estruturada):**
    *   **Vagas Disponíveis:** Destaque com indicador visual distinto (ex.: Verde `#28A745` ou Neutro) facilitando a identificação imediata.
    *   **Vagas Ocupadas:** Destaque obrigatório em **Vermelho** (`#DC3545`), exibindo em overlay: placa do veículo, categoria e contador de tempo ativo em formato `HH:MM:SS`.
*   **RNF-03 (Layout Responsivo):**
    *   Grid visual representando a planta física das 10 vagas (5 de carros, 5 de motos) atualizado via atualização de estado no frontend.

---

## 4. Perfil de Usuário / Público-Alvo
*   **Persona Operacional:** Operadores de pátio que necessitam de uma interface de rápida digitação e checkout.
*   **Persona Consumidor:** Condutores de veículos e motocicletas com alta necessidade de alocação imediata de vaga, dependentes de um sistema com baixa latência na atualização de disponibilidade.