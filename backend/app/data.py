import os
from datetime import datetime

from sqlalchemy import create_engine, select, update, and_
from sqlalchemy.orm import Session
from sqlalchemy.sql import func

from .datamodels import Tab, User, Item, ItemUser
from . import models

_engine = create_engine(os.environ["SQLITE3_DB_PATH"], echo=True)

class SplabDB:
    def __init__(self):
        self.engine = _engine

    def create_tab(self, total: float) -> int:
        new_tab = Tab(total=total)
        with Session(self.engine) as session:
            session.add(new_tab)
            session.commit()
            return new_tab.id

    def get_tab(self, tab_id: int) -> Tab or None:
        with Session(self.engine) as session:
            stmt = select(Tab).where(Tab.id == tab_id)
            return session.scalar(stmt)

    def get_tab_paid(self, tab_id: int) -> float:
        with Session(self.engine) as session:
            tab_total_stmt = select(Tab).where(Tab.id == tab_id)
            tab_total = session.scalars(tab_total_stmt).one()
            tab_item_ids_stmt = select(Item.id).where(Item.tab_id == tab_id)
            tab_item_ids = session.scalars(tab_item_ids_stmt)
            paid_stmt = func.sum(
                    select(ItemUser.portion)
                    .where(
                        and_(
                            ItemUser.item_id.in_(tab_item_ids),
                            ItemUser.paid == True
                        )
                    ).scalar_subquery())
            paid = session.scalars(paid_stmt).one()
            return tab_total.total, paid or 0

    def create_user(self) -> int:
        new_user = User(added=datetime.now())
        with Session(self.engine) as session:
            session.add(new_user)
            session.commit()
            return new_user.id

    def get_user(self, user_id: int) -> User or None:
        with Session(self.engine) as session:
            stmt = select(User).where(User.id == user_id)
            return session.scalar(stmt)

    def create_item_add_to_tab(self, tab_id: int, total: float) -> int:
        new_item = Item(tab_id=tab_id, total=total)
        with Session(self.engine) as session:
            session.add(new_item)
            session.commit()
            return new_item.id

    def add_user_to_item(self, item_id: int, user_id: int, portion: float) -> int:
        new_user_item = ItemUser(item_id=item_id,
                                 user_id=user_id,
                                 portion=portion,
                                 paid=False)
        with Session(self.engine) as session:
            session.add(new_user_item)
            session.commit()
            return new_user_item.id

    def user_pay(self, user_id: int) -> None:
        with Session(self.engine) as session:
            stmt = session.query(ItemUser) \
                    .filter(ItemUser.user_id == user_id) \
                    .update({ItemUser.paid: True})
            session.commit()

