
# Vollink - Backend

## Descrição
O **Vollink** é um sistema que conecta voluntários e beneficiários, facilitando o gerenciamento de tarefas e o envio de notificações em tempo real.

## Tecnologias Utilizadas
- **NestJS**: Framework para construção do backend.
- **PostgreSQL**: Banco de dados relacional.
- **Kafka**: Sistema de mensageria assíncrona.
- **TypeORM**: ORM para interação com o banco de dados.

## Estrutura do Projeto
- **Modules**: Contém os módulos principais do sistema (ex: Usuários, Agendamentos, Notificações).
- **Services**: Implementações dos serviços para comunicação com Kafka e manipulação de dados.
- **Config**: Configurações globais do sistema (ex: Kafka, Banco de Dados).
- **Controllers**: Responsáveis pelas rotas e lógica de controle do fluxo do sistema.

## Como Rodar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd vollink-backend
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configurações**:
   Crie um arquivo `.env` com as variáveis necessárias:
   ```plaintext
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=vollink
   DB_PASSWORD=senha123
   DB_NAME=vollink_db
   KAFKA_BROKER=localhost:9092
   KAFKA_GROUP_ID=vollink-group
   ```

4. **Execute o projeto**:
   ```bash
   npm run start
   ```

## Como Contribuir

1. **Fork o repositório**.
2. **Crie uma branch**:
   ```bash
   git checkout -b nome-da-sua-branch
   ```
3. **Faça suas alterações** e crie commits:
   ```bash
   git commit -m "Descrição das alterações"
   ```
4. **Push suas alterações** para o repositório remoto:
   ```bash
   git push origin nome-da-sua-branch
   ```
5. **Abra um pull request**.

## Licença
Este projeto está licenciado sob a licença MIT.

## Contato
Se precisar de ajuda ou quiser colaborar, entre em contato conosco pelo e-mail: support@vollink.com
