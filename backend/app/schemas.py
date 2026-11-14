from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, model_validator

from app.models import DemoBatch, InquirySource, ProjectType


class InquiryCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    source: InquirySource
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    project_type: ProjectType
    project_vision: str = Field(min_length=1, max_length=1500)


class InquiryCreated(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    source: InquirySource
    created_at: datetime


class DemoRequestCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    first_name: str = Field(min_length=1, max_length=80)
    last_name: str = Field(min_length=1, max_length=80)
    email: EmailStr
    phone_number: str = Field(min_length=5, max_length=40)
    is_student: bool
    demo_batch: DemoBatch
    university: str | None = Field(default=None, max_length=180)
    degree_program: str | None = Field(default=None, max_length=180)

    @model_validator(mode="after")
    def normalize_student_details(self) -> "DemoRequestCreate":
        if self.is_student and (not self.university or not self.degree_program):
            raise ValueError("University and degree/program are required for students.")
        if not self.is_student:
            self.university = None
            self.degree_program = None
        return self


class DemoRequestCreated(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime