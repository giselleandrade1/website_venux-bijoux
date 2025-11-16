# Prisma migrations & seed

This folder contains an example seed script and instructions to run migrations.

1. Install dependencies in `venus-bijoux.app`:

```bash
npm install prisma @prisma/client ts-node typescript --save-dev
npx prisma generate
```

2. Create a migration (when DATABASE_URL is set):

```bash
npx prisma migrate dev --name init
```

3. Run seed script:

```bash
npx ts-node backend/prisma/seed.ts
```

Notes:

- The example seed assumes the Prisma schema is at `backend/prisma-schema.prisma` in the project root; adjust `prisma.schema` or `PRISMA_SCHEMA` env if needed.
- You may need to move the `prisma` schema file into a `prisma/` folder and update generator/datasource paths if you prefer the conventional layout.
