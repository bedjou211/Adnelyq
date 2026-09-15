from collections.abc import AsyncIterator
from functools import lru_cache

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from app.core.config import get_settings


@lru_cache
def get_engine() -> AsyncEngine | None:
    database_url = get_settings().async_database_url
    if not database_url:
        return None
    return create_async_engine(database_url, pool_pre_ping=True)


async def get_db() -> AsyncIterator[AsyncSession]:
    engine = get_engine()
    if engine is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database is not configured",
        )

    session_factory = async_sessionmaker(engine, expire_on_commit=False)
    async with session_factory() as session:
        yield session
