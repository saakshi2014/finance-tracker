from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from . import models
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from .database import SessionLocal, engine
from . import models
from .schemas import TransactionCreate, TransactionOut


models.Base.metadata.create_all(bind=engine)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI(title="Personal Finance Backend")

# Allow React frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/transactions", response_model=TransactionOut)
def create_transaction(
    tx: TransactionCreate,
    db: Session = Depends(get_db)
):
    transaction = models.Transaction(**tx.dict())
    db.add(transaction)
    db.commit()
    db.refresh(transaction)
    return transaction


@app.get("/transactions", response_model=List[TransactionOut])
def get_transactions(
    db: Session = Depends(get_db)
):
    return db.query(models.Transaction).all()


@app.get("/")
def root():
    return {"message": "Backend is running"}
