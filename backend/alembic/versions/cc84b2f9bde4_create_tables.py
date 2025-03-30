"""create tables

Revision ID: cc84b2f9bde4
Revises: 
Create Date: 2025-03-29 19:24:10.369239

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cc84b2f9bde4'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # column types: https://docs.sqlalchemy.org/en/20/core/type_basics.html
    # column constraints: https://docs.sqlalchemy.org/en/20/core/metadata.html#sqlalchemy.schema.Column:~:text=Construct%20a%20new%20Column%20object.
    op.create_table(
        "users",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("added", sa.DateTime, nullable=False)
    )
    op.create_table(
        "tabs",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("total", sa.Float, nullable=False)
    )
    op.create_table(
        "items",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("total", sa.Float, default=0, nullable=False),
        sa.Column("tab_id", sa.Integer, sa.ForeignKey("tabs.id"))
    )
    op.create_table(
        "item_users",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("item_id", sa.Integer, sa.ForeignKey("items.id")),
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id")),
        sa.Column("portion", sa.Float, nullable=False),
        sa.Column("paid", sa.Boolean, default=False)
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table("users")
    op.drop_table("tabs")
    op.drop_table("items")
    op.drop_table("item_users")

