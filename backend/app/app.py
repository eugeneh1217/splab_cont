from typing import Union

from fastapi import FastAPI, status, HTTPException, WebSocket
import uvicorn
import socketio
from fastapi.middleware.cors import CORSMiddleware

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

app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
)

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

@app.get("/tabs/{tab_id}/items", status_code=status.HTTP_200_OK, tags=["tabs"])
def get_tab_items(tab_id: int):
    """
    Get all the items on a tab and the users on each tab
    """
    db = data.SplabDB()
    if db.get_tab_items(tab_id) is None:
        raise HTTPException(status_code=404, detail="Tab not found")
    tab_items = db.get_tab_items(tab_id)
    for tab_item in tab_items:
        tab_item['taken_by'] = db.get_users_on_item(tab_item['id'])

    return {"tab": tab_items}

@app.get("/tabs/{tab_id}/members", status_code=status.HTTP_200_OK, tags=["tabs"])
def get_tabb_members(tab_id: int):
    """
    Get all the members on a tab
    """
    return {"not implements"}


@app.post("/users/create", status_code=status.HTTP_201_CREATED, tags=["users"])
def create_user(request: models.UserRequest):
    """
    Create new user.
    """
    db = data.SplabDB()
    user_id = db.create_user(name=request.name)
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

sio = socketio.AsyncServer(cors_allowed_origins=["*"], async_mode="asgi")
socket_app = socketio.ASGIApp(sio)
app.mount("", socket_app)
"""
@app.websocket("/live")
async def socketio_endpoint(websocket: WebSocket):
    await sio.attach(websocket)
"""

@sio.on("connect")
async def connect(sid, env):
    print(f"new client connected to sid: {str(sid)}")

@sio.on("disconnect")
async def disconnect(sid):
    print(f"client disconnect: {str(sid)}")

@sio.on("join_tab")
async def user_join_tab(sid, data):
    db = data.SplabDB()
    user_id = data["tab_id"]
    tab_id = data["tab_id"]
    sio.enter_room(sid, str(tab_id))
    data["user_id"] = user.id
    sio.emit("join_tab", data, room=user.tab, skip_sid=sid)

@sio.on("take_item")
async def user_take_item(sid, sock_data):
    db = data.SplabDB()
    user = db.get_user_by_sid(sid)
    sock_data["user"] = user.name
    sio.emit("take_item", sock_data, room=user.tab_id, skip_sid=sid)

"""
if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, lifespan="on",
                reload=True)
"""

