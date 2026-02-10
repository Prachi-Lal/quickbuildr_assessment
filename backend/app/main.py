from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.concurrency import run_in_threadpool
from starlette.responses import JSONResponse

from .schemas import ContactRequest
from .email_service import send_contact_email
from .config import get_settings


settings = get_settings()

app = FastAPI(title="Contact API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/contact")
async def contact(contact: ContactRequest):
    """Receive contact form submissions, validate and send email."""
    try:
        # send the blocking email operation in a threadpool
        await run_in_threadpool(send_contact_email, contact, settings)
    except Exception as exc:
        # Log is performed inside the email service; return a 502 to indicate upstream failure
        raise HTTPException(status_code=502, detail="Failed to send email") from exc

    return JSONResponse(status_code=200, content={"success": True, "message": "Email sent"})
