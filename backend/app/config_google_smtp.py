import os
from pathlib import Path
from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parents[1]
ENV_PATH = BASE_DIR / ".env_google_smtp"

load_dotenv(ENV_PATH)


class Settings:
    SMTP_SERVER: str = os.getenv("SMTP_SERVER")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", 587))
    SMTP_USERNAME: str = os.getenv("GOOGLE_SMTP_USERNAME")
    SMTP_PASSWORD: str = os.getenv("GOOGLE_SMTP_PASSWORD")
    AUTHENTICATION: bool = os.getenv("AUTHENTICATION", "Required").lower() == "required"

def get_settings():
    return Settings()


