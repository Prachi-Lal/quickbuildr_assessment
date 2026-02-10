from pydantic import BaseModel, Field, EmailStr


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    message: str = Field(..., min_length=10)
