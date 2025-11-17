# Venux Bijoux — Local Development

This repository contains a Next.js frontend (`venux-studio`) and an Express + Prisma backend (`backend`) for a small e-commerce demo.

Quick start (dev)

1. Backend: install, start DB, run migrations and seed

```bash
cd backend
npm install
# Bring up Postgres + Adminer (docker-compose)
bash scripts/setup-db.sh
# This script runs docker-compose, prisma generate, migrate and seed.
# Alternatively, you can run the commands manually:
# docker-compose up -d
# npx prisma generate
# npx prisma migrate dev --name init
# npm run seed

# Start backend dev server
npm run dev
```

2. Frontend: install and run

```bash
cd venux-studio
npm install
npm run dev
```

Environment variables

- Backend

  - `DATABASE_URL` — database connection string (default used by `scripts/setup-db.sh` is `postgresql://venux:venuxpass@localhost:5432/venux_dev`)
  - `JWT_SECRET` — secret for signing JWTs (defaults to `dev` in development)
  - `ADMIN_EMAIL`, `ADMIN_PASSWORD` — optional values used by the seed script to create an initial admin user

- Frontend
  - `NEXT_PUBLIC_API_URL` — base URL for the API (defaults to `http://localhost:4000/api`)

Default local admin credentials (from seed)

- Email: `admin@local`
- Password: `secret`

Testing

- Unit tests (frontend)

```bash
cd venux-studio
npm install
npm run test
```

- E2E tests (Playwright)

```bash
cd venux-studio
npm install
npx playwright install --with-deps
# Start the frontend (in another terminal): npm run dev
npm run e2e
```

CI

- GitHub Actions workflow is present at `.github/workflows/ci.yml` and runs build & tests for backend + frontend and Playwright e2e tests.

Notes & next steps

- The backend stores uploaded files under `uploads/` in development; in production switch to an object storage provider (S3) and use presigned URLs.
- The backend uses Prisma + PostgreSQL. Run the `scripts/setup-db.sh` helper to prepare a dev database.
- The admin panel and protected routes require a JWT with role `admin` — the seed creates an admin user by default.

If you'd like, I can:

- Add more documentation (architecture, deployment, ENV examples)
- Commit all changes and prepare a release branch
- Harden auth (refresh token rotation + revocation)
