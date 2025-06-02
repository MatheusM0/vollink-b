
# Vollink

Vollink é uma plataforma que conecta voluntários a pessoas que precisam de ajuda em atividades do dia a dia. A aplicação foi desenvolvida utilizando NestJS para o backend e React com Vite e Tailwind CSS para o frontend.

## Funcionalidades

- Cadastro e autenticação de usuários
- Escolha entre perfil de voluntário ou beneficiário
- Voluntário pode registrar serviços disponíveis
- Beneficiário pode visualizar e solicitar serviços
- Página "Meus Serviços" para voluntários
- API protegida por JWT

## Tecnologias Utilizadas

- **Backend:** Node.js, NestJS, TypeORM, PostgreSQL, Kafka
- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Outros:** Docker, JWT, Vercel (Frontend)

## Como Executar o Projeto

### Pré-requisitos

- Node.js e npm
- Docker (para subir banco e Kafka)
- PostgreSQL (caso não use Docker)
- Vite (já incluído no `devDependencies`)

### Backend

```bash
git clone https://github.com/seu-usuario/vollink-b.git
cd vollink-b
npm install
npm run start
```

Crie um arquivo `.env` com:

```
JWT_SECRET=sua_chave_secreta
DATABASE_URL=postgres://user:password@localhost:5432/seubanco
```

### Frontend

```bash
git clone https://github.com/seu-usuario/vollink-frontend.git
cd vollink-frontend
npm install
npm run dev
```

No arquivo `.env` do frontend:

```
VITE_API_URL=http://localhost:3000
```

Contribuições são bem-vindas!

## Licença

Este projeto está licenciado sob a MIT License.
