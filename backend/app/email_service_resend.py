import requests
from .config_resend import get_settings

settings = get_settings()

def send_contact_email(contact, settings=None):
    if settings is None:
        settings = get_settings()

    url = "https://api.resend.com/emails"

    headers = {
        "Authorization": f"Bearer {settings.RESEND_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "from": "onboarding@resend.dev",  # temporary sender
        "to": settings.SMTP_USERNAME,     # your receiving email
        "subject": "New Contact Form Submission",
        "html": f"""
            <h3>New Contact Submission</h3>
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Message:</strong></p>
            <p>{contact.message}</p>
        """,
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code not in [200, 201]:
        raise RuntimeError(f"Resend API error: {response.text}")
