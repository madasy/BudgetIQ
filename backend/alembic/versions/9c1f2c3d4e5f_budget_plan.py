"""budget plan

Revision ID: 9c1f2c3d4e5f
Revises: 5eadb1ef8850
Create Date: 2026-02-01 10:15:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '9c1f2c3d4e5f'
down_revision = '5eadb1ef8850'
branch_labels = None
depends_on = None


def upgrade():
  op.create_table(
    'budget_plans',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('is_current', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
  )
  op.create_index(op.f('ix_budget_plans_id'), 'budget_plans', ['id'], unique=False)

  op.create_table(
    'budget_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('plan_id', sa.Integer(), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.Column('kind', sa.String(length=32), nullable=False),
    sa.Column('amount', sa.Numeric(precision=12, scale=2), nullable=False),
    sa.Column('currency', sa.String(length=8), nullable=False),
    sa.Column('group_name', sa.String(length=64), nullable=True),
    sa.Column('position', sa.Integer(), nullable=True),
    sa.Column('parent_item_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ),
    sa.ForeignKeyConstraint(['parent_item_id'], ['budget_items.id'], ),
    sa.ForeignKeyConstraint(['plan_id'], ['budget_plans.id'], ),
    sa.PrimaryKeyConstraint('id')
  )
  op.create_index(op.f('ix_budget_items_id'), 'budget_items', ['id'], unique=False)


def downgrade():
  op.drop_index(op.f('ix_budget_items_id'), table_name='budget_items')
  op.drop_table('budget_items')
  op.drop_index(op.f('ix_budget_plans_id'), table_name='budget_plans')
  op.drop_table('budget_plans')
