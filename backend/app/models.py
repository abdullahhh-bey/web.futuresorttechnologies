import enum
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum, String, Text, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class InquirySource(str, enum.Enum):
    contact = "contact"
    engagement = "engagement"


class ProjectType(str, enum.Enum):
    saas = "SaaS"
    web_development = "Web Development"
    custom_software = "Custom Software"
    ai_automation = "AI Automation"
    agentic_ai = "Agentic AI"
    mobile_applications = "Mobile Applications"
    api_integrations = "API & Integrations"
    other = "Other"


class DemoBatch(str, enum.Enum):
    technical = "technical"
    non_technical = "non-technical"


class Inquiry(Base):
    __tablename__ = "inquiries"

    id: Mapped[int] = mapped_column(primary_key=True)
    source: Mapped[InquirySource] = mapped_column(
        Enum(InquirySource, native_enum=False, values_callable=lambda items: [item.value for item in items]),
        nullable=False,
        index=True,
    )
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(254), nullable=False, index=True)
    project_type: Mapped[ProjectType] = mapped_column(
        Enum(ProjectType, native_enum=False, values_callable=lambda items: [item.value for item in items]),
        nullable=False,
    )
    project_vision: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class DemoRequest(Base):
    __tablename__ = "demo_requests"

    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(80), nullable=False)
    last_name: Mapped[str] = mapped_column(String(80), nullable=False)
    email: Mapped[str] = mapped_column(String(254), nullable=False, index=True)
    phone_number: Mapped[str] = mapped_column(String(40), nullable=False)
    is_student: Mapped[bool] = mapped_column(Boolean, nullable=False)
    demo_batch: Mapped[DemoBatch] = mapped_column(
        Enum(DemoBatch, native_enum=False, values_callable=lambda items: [item.value for item in items]),
        nullable=False,
    )
    university: Mapped[str | None] = mapped_column(String(180), nullable=True)
    degree_program: Mapped[str | None] = mapped_column(String(180), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)