# Architecture

## Runtime boundaries

The three Next.js applications are independently deployable. They communicate
with the FastAPI service through the public REST contract; they never connect to
the service-role database API from the browser.

- `www.<domain>`: marketing and acquisition
- `app.<domain>`: authenticated merchant administration
- `*.shop.<domain>`: tenant storefronts
- `api.<domain>`: REST API
- Celery workers: integration sync, reports, email and media jobs

PostgreSQL is the source of truth. Redis is ephemeral infrastructure for queues,
cache, locks and rate limits. Object storage is accessed through the S3 protocol,
using MinIO locally and Cloudflare R2 in hosted environments.

## Tenant boundary

Every business record has an `organization_id`; store-scoped data also has a
`store_id`. Authorization is enforced twice:

1. the API verifies the authenticated user's membership and role;
2. PostgreSQL Row Level Security restricts rows to organizations listed in the
   caller's membership records.

Service-role credentials are backend-only and bypass RLS, so every service-role
query must include an explicit organization filter.

## Environments

Local, staging and production use separate databases, credentials, buckets and
advertising applications. No secret is committed to the repository.
