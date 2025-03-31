
# Vollink - Sistema de Conexão de Voluntários e Beneficiários

Vollink é um sistema que conecta voluntários e beneficiários de serviços em datas específicas. A aplicação é composta por microserviços que comunicam eventos assíncronos usando **Kafka** e armazena dados em um banco de dados **PostgreSQL**. A solução foi desenvolvida em **NestJS** e utiliza **Docker** para facilitar a execução de todos os serviços.

## Tecnologias Utilizadas

- **NestJS**: Framework para Node.js para construção de APIs escaláveis.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar dados do sistema.
- **Kafka**: Sistema de mensageria para comunicação assíncrona entre microserviços.
- **Docker**: Contêineres para facilitar o desenvolvimento e deploy.
- **JWT**: Autenticação e segurança via JSON Web Tokens.
- **TypeORM**: ORM utilizado para integração com o banco de dados.

## Funcionalidades

- **Microserviços**:
  - **Usuários**: Cadastro, autenticação e gerenciamento de usuários.
  - **Agendamentos**: Criação e gerenciamento de agendamentos de voluntários.
  - **Notificações**: Envio de notificações sobre ações realizadas (ex: novos usuários, novos agendamentos).
  - **Estatísticas**: Cálculo e exibição de métricas, como avaliações e desempenho.
  
- **Comunicação Assíncrona**:
  - Utiliza **Kafka** para garantir que os serviços se comuniquem de forma desacoplada e escalável.
  - Ações como o cadastro de um novo usuário ou a criação de um novo agendamento geram eventos que são consumidos por outros microserviços.

## Arquitetura

A arquitetura do projeto é baseada em **microserviços**, cada um responsável por uma funcionalidade específica. A comunicação entre os serviços é feita através de eventos assíncronos utilizando **Kafka**. O sistema também implementa autenticação JWT para garantir a segurança das rotas.

### Fluxo de Dados

1. **Usuário cadastrado**: O microserviço de **Usuários** envia um evento para o Kafka, notificando outros serviços sobre o novo usuário.
2. **Novo agendamento**: O microserviço de **Agendamentos** envia um evento de agendamento, que é consumido pelos serviços de **Notificações** e **Estatísticas**.
3. **Avaliação recebida**: O microserviço de **Estatísticas** consome eventos de avaliações e atualiza as métricas.

## Instalação

### Pré-requisitos

Antes de rodar o projeto, certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão 18 ou superior)
- **Docker** (se for usar contêineres)
- **PostgreSQL** (se não usar o Docker)
- **Kafka** (se não usar o Docker)

### Passos para rodar o projeto

1. **Clonar o repositório**:

   ```bash
   git clone https://github.com/username/vollink.git
   cd vollink
   ```

2. **Instalar dependências**:

   ```bash
   npm install
   ```

3. **Configurar o Kafka e PostgreSQL**

   Se você estiver usando **Docker** para Kafka e PostgreSQL, você pode rodar o seguinte comando para iniciar os contêineres:

   ```bash
   docker-compose up -d
   ```

   Caso contrário, configure as variáveis de ambiente no `.env`:

   ```dotenv
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=vollink
   DB_PASSWORD=senha123
   DB_NAME=vollink_db
   KAFKA_BROKER=localhost:9092
   KAFKA_GROUP_ID=vollink-group
   ```

4. **Rodar o servidor**:

   Após configurar o banco de dados e o Kafka, inicie o servidor com:

   ```bash
   npm run start:dev
   ```

5. **Acessar a API**:

   A API estará disponível em `http://localhost:3000`.

## Testes

O projeto possui testes unitários e de integração para garantir que os serviços funcionem conforme o esperado.

Para rodar os testes:

```bash
npm run test
```

## Docker

Se preferir rodar os contêineres do Kafka e PostgreSQL via Docker, basta usar o `docker-compose`:

1. **Iniciar os serviços**:

   ```bash
   docker-compose up -d
   ```

2. **Verificar os contêineres**:

   ```bash
   docker ps
   ```

Isso iniciará os serviços do Kafka e PostgreSQL em contêineres Docker, permitindo que você se concentre apenas no desenvolvimento.

## Estrutura do Projeto

```bash
src/
├── app.module.ts           # Módulo principal
├── modules/
│   ├── reviews/            # Módulo de avaliações
│   ├── users/              # Módulo de usuários
│   ├── appointments/       # Módulo de agendamentos
│   └── notifications/      # Módulo de notificações
├── config/                 # Arquivos de configuração (Kafka, DB, etc.)
└── common/                 # Funções comuns, utilitários
```

## Contribuição

Sinta-se à vontade para abrir **issues** ou **pull requests**. Ficaremos felizes em colaborar!

## Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
