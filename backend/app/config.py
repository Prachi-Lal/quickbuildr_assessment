from pydantic_settings import BaseSettings
from functools import lru_cache
from pathlib import Path


class Settings(BaseSettings):
    EMAIL_ADDRESS: str
    EMAIL_PASSWORD: str
    SMTP_SERVER: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    RECIPIENT_EMAIL: str = "plalindia01@gmail.com"

    class Config:
        env_file = str(Path(__file__).parent.parent.parent / "backend" / ".env")
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
