import logging

import httpx
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.chatbot_knowledge import SYSTEM_PROMPT
from app.core.config import get_settings
from app.db.session import get_db
from app.models import DemoRequest, Inquiry
from app.schemas import (
    ChatRequest,
    ChatResponse,
    DemoRequestCreate,
    DemoRequestCreated,
    InquiryCreate,
    InquiryCreated,
)

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/inquiries", response_model=InquiryCreated, status_code=status.HTTP_201_CREATED)
def create_inquiry(payload: InquiryCreate, db: Session = Depends(get_db)) -> Inquiry:
    inquiry = Inquiry(**payload.model_dump())
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return inquiry


@router.post("/demo-requests", response_model=DemoRequestCreated, status_code=status.HTTP_201_CREATED)
def create_demo_request(payload: DemoRequestCreate, db: Session = Depends(get_db)) -> DemoRequest:
    demo_request = DemoRequest(**payload.model_dump())
    db.add(demo_request)
    db.commit()
    db.refresh(demo_request)
    return demo_request


@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest) -> ChatResponse:
    settings = get_settings()
    if not settings.chatbot_api_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Kilo is not configured yet. Please contact us by email or try again later.",
        )

    request_messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    request_messages.extend(message.model_dump() for message in payload.messages)
    endpoint = f"{settings.chatbot_api_base_url.rstrip('/')}/chat/completions"

    try:
        async with httpx.AsyncClient(timeout=45.0) as client:
            response = await client.post(
                endpoint,
                headers={"Authorization": f"Bearer {settings.chatbot_api_key}"},
                json={
                    "model": settings.chatbot_model,
                    "messages": request_messages,
                    "temperature": 0.3,
                    "max_tokens": 220,
                },
            )
    except httpx.TimeoutException as exc:
        logger.warning("Chat provider request timed out")
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="Kilo took too long to reply. Please try again.",
        ) from exc
    except httpx.RequestError as exc:
        logger.error("Could not reach chat provider: %s", exc.__class__.__name__)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Kilo is temporarily unavailable. Please try again shortly.",
        ) from exc

    if response.is_error:
        logger.error("Chat provider returned HTTP %s", response.status_code)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Kilo is temporarily unavailable. Please try again shortly.",
        )

    try:
        reply = response.json()["choices"][0]["message"]["content"]
    except (ValueError, KeyError, IndexError, TypeError) as exc:
        logger.error("Chat provider returned an invalid response")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Kilo received an unexpected response. Please try again.",
        ) from exc

    if not isinstance(reply, str) or not reply.strip():
        logger.error("Chat provider returned an empty response")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Kilo returned an empty reply. Please try again.",
        )
    return ChatResponse(reply=reply.strip())