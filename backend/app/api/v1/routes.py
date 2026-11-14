from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models import DemoRequest, Inquiry
from app.schemas import DemoRequestCreate, DemoRequestCreated, InquiryCreate, InquiryCreated

router = APIRouter()


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