# Adnelyq — AI Commerce OS

Adnelyq is a multi-tenant commerce operating system designed for COD-first
merchants. This monorepo contains the public website, merchant administration,
storefront, API, background workers, shared packages, database migrations and
local infrastructure.

## Repository map

```text
apps/
  marketing/      Public SaaS website
  admin/          Merchant administration and onboarding
  storefront/     Multi-tenant customer storefront
services/
  api/            FastAPI REST API
  worker/         Celery workers and scheduled jobs
packages/
  api-client/     Typed HTTP client shared by frontends
  config/         Shared runtime configuration helpers
  types/          Shared TypeScript domain types
  ui/             Shared React UI primitives
supabase/          Local Supabase configuration, migrations and seed data
infrastructure/    Docker, Caddy and operational scripts
docs/              Architecture and development documentation
```

## Requirements

- Node.js 20 or newer
- pnpm 10 or newer
- Python 3.12 for backend development
- Docker with Docker Compose
- Supabase CLI for the local database and Auth stack

## First run

```bash
cp .env.example .env
pnpm install
pnpm dev
```

In another terminal, start the backend dependencies:

```bash
docker compose up --build
```

Start local Supabase separately:

```bash
supabase start
supabase db reset
```

Local endpoints:

| Service | URL |
| --- | --- |
| Marketing | http://localhost:3000 |
| Admin | http://localhost:3001 |
| Storefront | http://localhost:3002/demo |
| API | http://localhost:8000/docs |
| Mailpit | http://localhost:8025 |
| MinIO console | http://localhost:9001 |
| Supabase Studio | http://localhost:54323 |

## Quality checks

```bash
pnpm lint
pnpm typecheck
pnpm test
make backend-check
```

See [docs/development.md](docs/development.md) for environment and workflow
details and [docs/architecture.md](docs/architecture.md) for system boundaries.
