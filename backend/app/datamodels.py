from datetime import datetime

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

class Tab(Base):
    __tablename__ = "tabs"

    id: Mapped[int] = mapped_column(primary_key=True)
    total: Mapped[float]

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    added: Mapped[datetime]

class Item(Base):
    __tablename__ = "items"

    id: Mapped[int] = mapped_column(primary_key=True)
    tab_id: Mapped[int] = mapped_column(ForeignKey("tabs.id"))
    total: Mapped[float]

class ItemUser(Base):
    __tablename__ = "item_users"

    id: Mapped[int] = mapped_column(primary_key=True)
    item_id: Mapped[int] = mapped_column(ForeignKey("items.id"))
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    portion: Mapped[float]
    paid: Mapped[bool]

