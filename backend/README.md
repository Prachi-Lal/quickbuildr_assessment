# Contact Backend (FastAPI)

This backend receives contact form submissions and sends email notifications. It uses environment variables for credentials and does not persist data.

## Project structure

backend/
- app/
  - main.py           # FastAPI application
  - schemas.py        # Pydantic request models
  - email_service.py  # Email sending logic
  - config.py         # Settings loaded from .env
- .env.example
- requirements.txt
- README.md

## Environment

Create a `.env` file in `backend/` (copy from `.env.example`) and set values:

- `EMAIL_ADDRESS` — your Gmail address
- `EMAIL_PASSWORD` — Gmail App Password (DO NOT use your normal account password)
- `SMTP_SERVER` — `smtp.gmail.com` (default)
- `SMTP_PORT` — `587` (default)
- `RECIPIENT_EMAIL` — optional override (defaults to plalindia01@gmail.com)

### Gmail App Password (brief)

1. Enable 2-Step Verification on your Google account: https://myaccount.google.com/security
2. Go to App Passwords: https://myaccount.google.com/apppasswords
3. Create an App Password for `Mail` and note the generated 16-character password.
4. Put that value into `EMAIL_PASSWORD` in your `.env`.

## Run locally

Install dependencies and run the server from repository root:

```bash
pip install -r backend/requirements.txt
# Run uvicorn from project root
uvicorn backend.app.main:app --reload --port 8000
```

The API will be available at `http://127.0.0.1:8000`.

## Endpoint

- `POST /contact`
  - JSON body: `{ "name": "..", "email": "..", "message": ".." }`
  - Validation: `name` min 2, `email` valid email, `message` min 10 chars
  - Success: `200` with `{"success": true, "message": "Email sent"}`
  - Failure sending email: `502` with error detail

## Example curl

```bash
curl -X POST http://127.0.0.1:8000/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","message":"Hello from the contact form!"}'
```

## Example fetch from React (frontend on http://localhost:5173)

```js
async function submitContact(form) {
  const res = await fetch('http://127.0.0.1:8000/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  return res.json();
}

// Usage:
// submitContact({ name: 'Joe', email: 'joe@example.com', message: 'Hi there...' })
```

## Deploy to Render (quick notes)

1. Create a new Web Service on Render.
2. Connect your repo and set the build command:

```
pip install -r backend/requirements.txt
```

3. Set the start command (Render uses `uvicorn` recommended):

```
uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT
```

4. Add environment variables (EMAIL_ADDRESS, EMAIL_PASSWORD, SMTP_SERVER, SMTP_PORT, RECIPIENT_EMAIL) in the Render dashboard.

Security: make sure `EMAIL_PASSWORD` is stored as a secret and not committed.
