from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = "local"
    log_level: str = "INFO"
    api_public_url: str = "http://localhost:8000"
    allowed_origins: str = "http://localhost:3000,http://localhost:3001,http://localhost:3002"

    database_url: str = ""
    redis_url: str = "redis://localhost:6379/0"

    supabase_url: str = "http://localhost:54321"
    supabase_jwt_secret: str = ""
    supabase_jwt_audience: str = "authenticated"

    model_config = SettingsConfigDict(
        env_file=(".env", "../../.env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]

    @property
    def async_database_url(self) -> str:
        if self.database_url.startswith("postgresql://"):
            return self.database_url.replace("postgresql://", "postgresql+asyncpg://", 1)
        return self.database_url


@lru_cache
def get_settings() -> Settings:
    return Settings()
