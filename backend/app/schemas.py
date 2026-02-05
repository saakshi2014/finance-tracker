from pydantic import BaseModel
from datetime import date

class TransactionCreate(BaseModel):
    date: date
    amount: float
    description: str
    category: str

class TransactionOut(TransactionCreate):
    id: int

    class Config:
        orm_mode = True
