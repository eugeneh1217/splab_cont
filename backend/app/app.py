from typing import Union

from fastapi import FastAPI, status, HTTPException

from . import data
from . import models

summary = """
Splab backend API to provide access to Tabs, Users, and Items.
"""

description = """
## Tabs
Create tabs and get amount of tab paid.

## Users
Create users and note user payment.

## Items
Create items and add users to items.
"""

app = FastAPI(
        title="Splab Backend API",
        summary=summary,
        description=description,
        version="0.0.1")

tags_metadata = [
        {
            "name": "tabs",
            "description": "An itemized receipt"
        },
        {
            "name": "items",
            "description": "Items within a tab"
        },
        {
            "name": "user",
            "description": "Identifiers that claim portions of items"
        }
]

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/tabs/create", status_code=status.HTTP_201_CREATED, tags=["tabs"])
def create_tab(total: models.Cash):
    """
    Create new tab with with total `amount`.
    """
    db = data.SplabDB()
    tab_id = db.create_tab(total.amount)
    return {"tab_id": tab_id}

@app.get("/tabs/{tab_id}/paid", status_code=status.HTTP_200_OK, tags=["tabs"])
def get_tab_paid(tab_id: int):
    """
    Get total tab amount and portion of tab paid.
    """
    db = data.SplabDB()
    if db.get_tab(tab_id) is None:
        raise HTTPException(status_code=404, detail="Tab not found")
    tab_total, tab_paid = db.get_tab_paid(tab_id)
    return {"tab_total": tab_total, "tab_paid": tab_paid}

@app.post("/users/create", status_code=status.HTTP_201_CREATED, tags=["users"])
def create_user():
    """
    Create new user.
    """
    db = data.SplabDB()
    user_id = db.create_user()
    return {"user_id": user_id}

@app.post("/users/{user_id}/pay", status_code=status.HTTP_200_OK, tags=["users"])
def user_pay(user_id: int):
    """
    Note a user paying their portion of a tab.
    """
    db = data.SplabDB()
    if db.get_user(user_id) is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.user_pay(user_id)

@app.post("/items/create", status_code=status.HTTP_201_CREATED, tags=["items"])
def create_item_add_to_tab(request: models.CreateItemRequest):
    """
    Create a new item and assign it to a tab.
    """
    db = data.SplabDB()
    item_id = db.create_item_add_to_tab(request.tab_id, request.item_total)
    return {"item_id": item_id}

@app.post("/items/{item_id}/{user_id}/add_user",
          status_code=status.HTTP_201_CREATED, tags=["items"])
def add_user_to_item(item_id: int, user_id: int, portion: models.Cash):
    """
    Give a user a portion of an item. Portion should be less than or equal to
    total amount of tab.
    """
    db = data.SplabDB()
    user_item_id = db.add_user_to_item(
        item_id,
        user_id,
        portion.amount)

