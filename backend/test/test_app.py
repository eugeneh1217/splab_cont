from fastapi.testclient import TestClient
from app import app
import json

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
    response = client.post("users/create")
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
