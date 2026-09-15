from celery import Celery

from worker.config import get_worker_settings

settings = get_worker_settings()

celery = Celery(
    "adnelyq",
    broker=settings.celery_broker_url,
    backend=settings.celery_result_backend,
    include=["worker.tasks.system"],
)

celery.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    broker_connection_retry_on_startup=True,
    beat_schedule={
        "worker-heartbeat": {
            "task": "system.ping",
            "schedule": 300.0,
        }
    },
)
