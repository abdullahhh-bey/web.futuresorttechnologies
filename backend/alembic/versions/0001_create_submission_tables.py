"""Create inquiry and demo submission tables."""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "0001_submissions"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "inquiries",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("source", sa.String(length=10), nullable=False),
        sa.Column("name", sa.String(length=120), nullable=False),
        sa.Column("email", sa.String(length=254), nullable=False),
        sa.Column("project_type", sa.String(length=24), nullable=False),
        sa.Column("project_vision", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_inquiries_source", "inquiries", ["source"])
    op.create_index("ix_inquiries_email", "inquiries", ["email"])

    op.create_table(
        "demo_requests",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("first_name", sa.String(length=80), nullable=False),
        sa.Column("last_name", sa.String(length=80), nullable=False),
        sa.Column("email", sa.String(length=254), nullable=False),
        sa.Column("phone_number", sa.String(length=40), nullable=False),
        sa.Column("is_student", sa.Boolean(), nullable=False),
        sa.Column("demo_batch", sa.String(length=13), nullable=False),
        sa.Column("university", sa.String(length=180), nullable=True),
        sa.Column("degree_program", sa.String(length=180), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_demo_requests_email", "demo_requests", ["email"])


def downgrade() -> None:
    op.drop_index("ix_demo_requests_email", table_name="demo_requests")
    op.drop_table("demo_requests")
    op.drop_index("ix_inquiries_email", table_name="inquiries")
    op.drop_index("ix_inquiries_source", table_name="inquiries")
    op.drop_table("inquiries")