# devpage

## Estrutura

- `dev/`: frontend React + Vite
- `backend/`: API Node.js + Express + MongoDB

## 1) Backend (Node + Express + MongoDB)

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Configure o arquivo `.env` com os valores reais de:

- `MONGO_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Quando o backend sobe, ele cria automaticamente o usuario admin inicial com `ADMIN_EMAIL` e `ADMIN_PASSWORD` (se ainda nao existir no banco).

API base: `http://localhost:5000/api`

## 2) Frontend

```bash
cd dev
cp .env.example .env
npm install
npm run dev
```

Por padrao, o frontend usa `VITE_API_URL=/api` e o `vite.config.js` faz proxy para `http://localhost:5000`.

## Fluxo implementado

- Formulario de contato salva no MongoDB via `POST /api/contacts`
- Login admin em `/admin/login` via `POST /api/auth/login`
- Pagina protegida `/admin/messages` lista mensagens via `GET /api/contacts` com token JWT
