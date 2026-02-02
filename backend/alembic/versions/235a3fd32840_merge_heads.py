"""merge heads

Revision ID: 235a3fd32840
Revises: 2b6e30724a5d, 9c1f2c3d4e5f
Create Date: 2026-02-01 21:20:21.779882
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '235a3fd32840'
down_revision = ('2b6e30724a5d', '9c1f2c3d4e5f')
branch_labels = None
depends_on = None


def upgrade():
  pass


def downgrade():
  pass
