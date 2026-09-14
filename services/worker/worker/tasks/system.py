from typing import Literal

from worker.celery_app import celery


@celery.task(name="system.ping")  # type: ignore[untyped-decorator]
def ping() -> dict[str, Literal["ok"]]:
    return {"status": "ok"}
