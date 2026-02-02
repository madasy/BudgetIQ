"""add gross/net amounts to budget items

Revision ID: 4f2c0f9c2e1a
Revises: 235a3fd32840
Create Date: 2026-02-02 10:18:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "4f2c0f9c2e1a"
down_revision = "235a3fd32840"
branch_labels = None
depends_on = None


def upgrade():
  op.add_column("budget_items", sa.Column("gross_amount", sa.Numeric(12, 2), nullable=True))
  op.add_column("budget_items", sa.Column("net_amount", sa.Numeric(12, 2), nullable=True))


def downgrade():
  op.drop_column("budget_items", "net_amount")
  op.drop_column("budget_items", "gross_amount")
