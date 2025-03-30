from fastapi.testclient import TestClient
from app import app
import json

import socketio

client = TestClient(app.app)

def test_tab_create_first():
    response = client.post(
            "/tabs/create",
            data=json.dumps({"amount": 42.99}))
    assert response.status_code == 201
    assert response.json()["tab_id"] == 1

def test_tab_create_second():
    response = client.post(
            "/tabs/create",
            data=json.dumps({"amount": 42.99}))
    assert response.status_code == 201
    assert response.json()["tab_id"] == 2

def test_user_create():
    response = client.post(
            "users/create",
            data=json.dumps({"name": "name0"}))
    assert response.status_code == 201
    assert response.json()["user_id"] == 1

def test_item_create():
    response = client.post(
            "/items/create",
            data=json.dumps({"tab_id": 1, "item_total": 42.99}))
    assert response.status_code == 201
    assert response.json()["item_id"] == 1

def test_item_add_user():
    response = client.post(
            "/items/1/1/add_user",
            data=json.dumps({"amount": 20}))
    print(response.text)
    assert response.status_code == 201
"""
def test_item_add_user_invalid():
    response = client.post(
            "/ietms/add_user",
            data=json.dumps({"item_id": 100, "user_id": 1, "portion": 20})
    assert response.status_code == 
"""
def test_check_paid_unpaid():
    response = client.get("/tabs/1/paid")
    assert response.status_code == 200
    assert response.json() == {"tab_total": 42.99, "tab_paid": 0}

def test_user_pay_invalid_user():
    response = client.post("/users/404/pay")
    assert response.status_code == 404

def test_user_pay():
    response = client.post("/users/1/pay")
    assert response.status_code == 200

def test_check_paid_paid():
    response = client.get("/tabs/1/paid")
    assert response.status_code == 200
    assert response.json() == {"tab_total": 42.99, "tab_paid": 20}

def test_check_paid_invalid():
    response = client.get("tabs/404/paid")
    assert response.status_code == 404

class TestClient:
    SERVER_URL = "http://localhost:8000/"
    TRANSPORTS = ["websocket", "polling"]
    def __init__(self):
        self.sio = socketio.SimpleClient()
        self.sio.connect(self.SERVER_URL, transports=self.TRANSPORTS)
        self.sid = self.sio.sid

    def take_item(self, item_id: int):
        self.sio.emit("take_item", {"item_id": item_id})

    def join_room(self, tab_id: int):
        self.sio.emit("join_tab", {"tab_id": tab_id})

    def hear_item(self) -> int:
        return self.sio.receive(timeout=0.5)

def test_socket():
    transports = ["websockets", "polling"]
    client0 = TestClient()
    client1 = TestClient()
    client2 = TestClient()
    client0.join_room(1)
    client1.join_room(1)
    client2.join_room(2)
    client0.take_item(1)
    client1_recv = client1.hear_item()
    client2_recv = client2.hear_item()
    print(client1_recv)
    print(client2_recv)


