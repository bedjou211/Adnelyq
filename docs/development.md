# Development workflow

## Branches

- `feature/*` branches target `develop`.
- `develop` is deployed to the integration environment.
- tested releases move to `staging`.
- approved releases merge to `main`, which represents production.

GitHub branch protection should require the `frontend`, `backend` and `docker`
checks before a pull request can merge.

## Environment configuration

Copy `.env.example` to `.env` and fill local values. Git ignores every `.env*`
file except the documented example. Staging and production secrets belong in the
hosting provider's secret manager.

Never expose `SUPABASE_SERVICE_ROLE_KEY`, advertising client secrets or the
OpenAI API key through a `NEXT_PUBLIC_*` variable.

## Database changes

Every schema change is a timestamped SQL migration under
`supabase/migrations/`. Apply changes locally with `supabase db reset`, validate
them, then commit the migration. Production is never edited manually.
