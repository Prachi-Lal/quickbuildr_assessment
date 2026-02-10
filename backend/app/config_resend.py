import os
import logging
from pathlib import Path
from dotenv import load_dotenv


logger = logging.getLogger(__name__)

BASE_DIR = Path(__file__).resolve().parents[1]
ENV_PATH = BASE_DIR / ".env_resend"

load_dotenv(ENV_PATH)


class Settings:
    def __init__(self):
        self.RESEND_API_KEY = os.getenv("RESEND_API_KEY")
        self.SMTP_USERNAME = os.getenv("SMTP_USERNAME")
        
        if not self.RESEND_API_KEY:
            raise ValueError("RESEND_API_KEY not set in .env_resend")
        if not self.SMTP_USERNAME:
            raise ValueError("SMTP_USERNAME not set in .env_resend")
        
        logger.info("Resend settings loaded: RESEND_API_KEY=%s..., SMTP_USERNAME=%s", 
                    self.RESEND_API_KEY[:10] + "***", self.SMTP_USERNAME)

def get_settings():
    return Settings()
