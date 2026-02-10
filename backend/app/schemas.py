import logging
from pydantic import BaseModel, Field, EmailStr


logger = logging.getLogger(__name__)


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    message: str = Field(..., min_length=10)
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "message": "This is a test message from the contact form."
            }
        }

    def __init__(self, **data):
        super().__init__(**data)
        logger.debug("ContactRequest validated: name=%s, email=%s", self.name, self.email)
