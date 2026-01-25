from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .schemas import UserCreate, UserLogin, VerifyCode
from .utils import hash_password, verify_password, create_access_token
import db
import random
from datetime import datetime, timedelta


def generate_code():
    return str(random.randint(100000, 999999))


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", status_code=201)
def register(user: UserCreate, session: Session = Depends(db.get_session)):
    existing_user = (
        session.query(db.UserORM)
        .filter((db.UserORM.email == user.email) | (db.UserORM.login == user.login))
        .first()
    )

    if existing_user:
        raise HTTPException(400, "User with this email or login already exists")

    code = generate_code()

    new_user = db.UserORM(
        name=user.name,
        login=user.login,
        email=user.email,
        password=hash_password(user.password),
        is_verified=False,
        verification_code=code,
        code_expires_at=datetime.utcnow() + timedelta(minutes=10),
    )

    print("VERIFICATION CODE:", code)

    session.add(new_user)
    session.commit()

    return {"message": "Check your email to verify account"}


@router.post("/login", status_code=200)
def login(data: UserLogin, session: Session = Depends(db.get_session)):
    user = session.query(db.UserORM).filter_by(email=data.email).first()

    if not user or not verify_password(data.password, user.password):
        raise HTTPException(401, "Invalid credentials")

    if not user.is_verified:
        raise HTTPException(403, "Email not verified")

    access_token = create_access_token({"sub": user.email})
    return {"access_token": access_token}


@router.post("/verify", status_code=200)
def verify(data: VerifyCode, session: Session = Depends(db.get_session)):
    user = session.query(db.UserORM).filter_by(email=data.email).first()

    if not user or user.verification_code != data.code:
        raise HTTPException(400, "Invalid code")

    if not user.code_expires_at or user.code_expires_at < datetime.utcnow():
        raise HTTPException(400, "Code expired")

    user.is_verified = True
    user.verification_code = None
    user.code_expires_at = None
    session.commit()

    return {"message": "Account verified"}
