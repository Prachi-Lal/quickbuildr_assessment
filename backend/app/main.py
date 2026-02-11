import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.concurrency import run_in_threadpool
from starlette.responses import JSONResponse

from .schemas import ContactRequest
from .config_resend import get_settings
from .logger import setup_logging
from .email_service_resend import send_contact_email

import joblib
from pathlib import Path
import numpy as np

from .schemas_compatibility import CompatibilityRequest, CompatibilityResponse


# initialize logging to console + file
setup_logging()
logger = logging.getLogger(__name__)

MODEL_PATH = Path(__file__).parent / "models" / "compatibility_model.joblib"
compatibility_model = joblib.load(MODEL_PATH)

logger.info("Compatibility model loaded successfully.")


settings = get_settings()

logger.info("Settings loaded: Using Resend API with recipient %s", settings.SMTP_USERNAME)

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

@app.post("/compatibility", response_model=CompatibilityResponse)
async def predict_compatibility(payload: CompatibilityRequest):

    features = np.array([[
    payload.backend_interest,
    payload.async_comfort,
    payload.communication_value,
    payload.timezone_overlap,
    payload.code_quality_focus,
    ]])

    prediction = compatibility_model.predict(features)[0]

    prediction = float(np.clip(prediction, 0, 100))

    if prediction >= 85:
        verdict = "We’d probably build something amazing together."
    elif prediction >= 70:
        verdict = "Strong alignment — this could be fun."
    elif prediction >= 50:
        verdict = "There’s potential here."
    else:
        verdict = "We might need a few sync calls first 😄"


    return CompatibilityResponse(
        compatibility_score=round(prediction, 2),
        verdict=verdict
    )
