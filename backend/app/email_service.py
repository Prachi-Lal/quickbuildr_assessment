import smtplib
import logging
from email.mime.text import MIMEText
from datetime import datetime
from typing import Any

from .schemas import ContactRequest


logger = logging.getLogger(__name__)


def send_contact_email(contact: ContactRequest, settings: Any) -> None:
    """Send an email for the given contact submission.

    Raises exceptions from smtplib on failure so callers can handle HTTP errors.
    """
    subject = "New Contact Form Submission"
    timestamp = datetime.utcnow().isoformat() + "Z"

    body = (
        f"Name: {contact.name}\n"
        f"Email: {contact.email}\n\n"
        f"Message:\n{contact.message}\n\n"
        f"Timestamp: {timestamp}\n"
    )

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = settings.EMAIL_ADDRESS
    msg["To"] = settings.RECIPIENT_EMAIL

    try:
        server = smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT, timeout=10)
        server.ehlo()
        if settings.SMTP_PORT == 587:
            server.starttls()
            server.ehlo()
        server.login(settings.EMAIL_ADDRESS, settings.EMAIL_PASSWORD)
        server.sendmail(settings.EMAIL_ADDRESS, [settings.RECIPIENT_EMAIL], msg.as_string())
        server.quit()
        logger.info("Email sent to %s", settings.RECIPIENT_EMAIL)
    except smtplib.SMTPException:
        logger.exception("SMTP error while sending contact email")
        raise
    except Exception:
        logger.exception("Unexpected error while sending contact email")
        raise
