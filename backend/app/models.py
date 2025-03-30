from pydantic import BaseModel

class Cash(BaseModel):
    amount: float

class UserRequest(BaseModel):
    name: str

class CreateItemRequest(BaseModel):
    tab_id: int
    item_total: float

class UserToItem(BaseModel):
    item_id: int
    user_id: int
    portion: float

