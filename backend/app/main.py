import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.concurrency import run_in_threadpool
from starlette.responses import JSONResponse

from .schemas import ContactRequest
from .config_google_smtp import get_settings
from .logger import setup_logging
from .email_service_google import send_contact_email



# initialize logging to console + file
setup_logging()
logger = logging.getLogger(__name__)

settings = get_settings()

logger.info("Settings loaded: SMTP_SERVER=%s, SMTP_PORT=%d", settings.SMTP_SERVER, settings.SMTP_PORT)

app = FastAPI(title="Contact API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://quickbuildr-assessment.vercel.app"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.info("FastAPI app initialized with CORS enabled for http://localhost:5173")

@app.post("/contact")
async def contact(contact: ContactRequest):
    """Receive contact form submissions, validate and send email."""
    logger.info("POST /contact received from %s", contact.email)
    logger.debug("Contact data: name=%s, email=%s, message_length=%d", contact.name, contact.email, len(contact.message))
    
    try:
        logger.info("Sending email for contact from %s (%s)", contact.name, contact.email)
        await run_in_threadpool(send_contact_email, contact, settings)
        logger.info("Email sent successfully for %s", contact.email)
    except Exception as exc:
        logger.error("Failed to send email for %s: %s", contact.email, str(exc), exc_info=True)
        raise HTTPException(status_code=502,  detail=str(exc)) from exc

    return JSONResponse(status_code=200, content={"success": True, "message": "Email sent"})
