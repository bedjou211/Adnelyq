# CI/CD and environments

## Promotion path

| Git branch | Runtime environment | Purpose |
| --- | --- | --- |
| `feature/*` or `codex/*` | none | isolated development work |
| `develop` | `development` | merged feature validation |
| `staging` | `staging` | production-like acceptance |
| `main` | `production` | approved production release |

Pull requests and pushes on every branch run `.github/workflows/ci.yml`.
The checks cover frontend linting, TypeScript, unit tests, production builds,
Python linting, mypy, pytest, secret-file detection and both Docker images.

After a successful CI run caused by a push to `develop`, `staging` or `main`,
`.github/workflows/cd.yml`:

1. builds and publishes immutable API and worker images to GitHub Container
   Registry;
2. builds the three frontend applications with environment-specific public
   variables and stores their artifacts for seven days;
3. calls an environment deployment webhook when one is configured.

## GitHub environments

Create three GitHub Environments named exactly `development`, `staging` and `production`.
Production should require manual approval. Configure these non-secret variables
in each environment:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Configure these secrets only after a deployment target has been provisioned:

- `DEPLOY_WEBHOOK_URL`
- `DEPLOY_WEBHOOK_TOKEN`

Without `DEPLOY_WEBHOOK_URL`, CD still publishes versioned backend images and
frontend artifacts, but intentionally performs no infrastructure mutation.

Never reuse the development Supabase project in production. The production
environment remains without Supabase variables until a distinct production
project has been provisioned.

Application secrets such as `DATABASE_URL`, service-role keys, Meta/TikTok
secrets and `OPENAI_API_KEY` belong on the target host. They must never be passed
as frontend build variables or stored in GitHub repository variables.

## Required branch protection

Protect `develop`, `staging` and `main`, require pull requests and require the
three CI jobs: `frontend`, `backend` and `docker`. Disable force pushes and branch
deletion. These settings are repository controls and must be applied in GitHub
after the first push.
