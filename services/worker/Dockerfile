FROM python:3.12-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

RUN addgroup --system app && adduser --system --ingroup app app

COPY pyproject.toml ./
COPY worker ./worker
RUN pip install --no-cache-dir .

USER app

CMD ["celery", "-A", "worker.celery_app:celery", "worker", "--loglevel=INFO"]
