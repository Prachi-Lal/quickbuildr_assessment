from pydantic import BaseModel, Field

class CompatibilityRequest(BaseModel):
    backend_interest: float = Field(..., ge=1, le=10)
    async_comfort: float = Field(..., ge=1, le=10)
    communication_value: float = Field(..., ge=1, le=10)
    timezone_overlap: float = Field(..., ge=1, le=10)
    code_quality_focus: float = Field(..., ge=1, le=10)



class CompatibilityResponse(BaseModel):
    compatibility_score: float
    verdict: str
