#!/usr/bin/env bash
set -euo pipefail

# Helper script to bring up the local Postgres (via docker-compose), generate Prisma client,
# run migrations and seed an initial admin user.
# Run from project root: `bash backend/scripts/setup-db.sh`

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "[venux] Starting Postgres via docker-compose..."
docker-compose up -d

echo "[venux] Waiting for Postgres to come up..."
# Simple wait; if your environment provides `pg_isready` prefer that.
for i in {1..12}; do
  if docker-compose exec -T db pg_isready -q >/dev/null 2>&1; then
    echo "[venux] Postgres is ready"
    break
  fi
  echo "[venux] Waiting for Postgres... ($i/12)"
  sleep 2
done

echo "[venux] Generating Prisma client..."
npm run prisma:generate

echo "[venux] Running migrations..."
npm run prisma:migrate

echo "[venux] Seeding database..."
npm run seed

echo "[venux] Done. You can now run the backend with: npm run dev"
