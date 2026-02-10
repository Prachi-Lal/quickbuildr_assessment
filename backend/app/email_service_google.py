import smtplib
import ssl
from email.mime.text import MIMEText
from datetime import datetime
from .config_google_smtp import get_settings


def send_contact_email(contact, settings=None):import smtplib
import ssl
from email.mime.text import MIMEText
from datetime import datetime
from .config import get_settings


def send_contact_email(contact, settings=None):
    if settings is None:
        settings = get_settings()

    # Extract fields from Pydantic model
    name = contact.name
    email = contact.email
    message = contact.message

    subject = "New Contact Form Submission"

    body = f"""
New Contact Submission

Name: {name}
Email: {email}
Message:
{message}

Time: {datetime.utcnow()}
"""

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = settings.SMTP_USERNAME
    msg["To"] = settings.SMTP_USERNAME  # Mailtrap sandbox

    context = ssl.create_default_context()

    try:
        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            server.ehlo()
            server.starttls(context=context)
            server.ehlo()
            server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            server.send_message(msg)

    except Exception as e:
        raise RuntimeError(f"Failed to send email: {e}")

    if settings is None:
        settings = get_settings()
    subject = "New Contact Form Submission"

    body = f"""
New Contact Submission

Name: {name}
Email: {email}
Message:
{message}

Time: {datetime.utcnow()}
"""

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = settings.SMTP_USERNAME
    msg["To"] = settings.SMTP_USERNAME

    context = ssl.create_default_context()

    try:
        with smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT) as server:
            server.ehlo()
            server.starttls(context=context)
            server.ehlo()
            server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            server.send_message(msg)

    except Exception as e:
        raise RuntimeError(f"Failed to send email: {e}")
