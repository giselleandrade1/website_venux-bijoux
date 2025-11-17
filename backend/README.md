# Backend — Venux Bijoux

This backend uses Express + TypeScript with Prisma as ORM.

Quick start (local dev):

1. Install deps

```bash
cd backend
npm install
```

2. Set up environment

- Copy `.env.example` to `.env` and set `DATABASE_URL` to your Postgres connection string.

3. Generate Prisma client and run migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Seed an initial admin user (optional)

```bash
# uses defaults ADMIN_EMAIL=admin@local ADMIN_PASSWORD=secret
npm run seed
```

You can override defaults by setting `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your environment before running the seed script.

4. Start dev server

```bash
npm run dev
```

Notes

- Admin-protected endpoints use a simple JWT middleware in `src/middleware/auth.ts`.
- Files uploaded by the uploads route are stored in `backend/uploads` and served statically by the server during development.

If you want, I can create a docker-compose file to run Postgres locally and run migrations automatically.
