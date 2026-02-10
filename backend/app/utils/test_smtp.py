import os
import smtplib
from pathlib import Path
from dotenv import load_dotenv

# Load .env from backend directory
env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(env_path)

SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
USERNAME = os.getenv("GOOGLE_SMTP_USERNAME")
PASSWORD = os.getenv("GOOGLE_SMTP_PASSWORD")
AUTHENTICATION = os.getenv("AUTHENTICATION", "Required").lower() == "required"

print("Connecting to:", SMTP_SERVER, SMTP_PORT)
print("Using username:", USERNAME)

try:
    server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login(USERNAME, PASSWORD)

    print("Login successful ✅")
    server.quit()

except Exception as e:
    print("Error occurred:", e)
