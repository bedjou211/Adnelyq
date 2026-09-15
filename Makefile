.PHONY: setup dev infra-up infra-down backend-install backend-check test

setup:
	cp .env.example .env
	pnpm install

dev:
	pnpm dev

infra-up:
	docker compose up --build

infra-down:
	docker compose down

backend-install:
	python3 -m pip install -e './services/api[dev]' -e ./services/worker

backend-check:
	ruff check services/api services/worker
	mypy services/api/app services/worker/worker
	pytest services/api/tests services/worker/tests

test:
	pnpm lint
	pnpm typecheck
	pnpm test
	$(MAKE) backend-check
