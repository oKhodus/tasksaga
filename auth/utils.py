import bcrypt
import jwt as pyjwt
from datetime import datetime, timedelta
from config import ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, MAX_BCRYPT_BYTES
from dotenv import load_dotenv
import os


load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    token = pyjwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token


def hash_password(password: str) -> str:
    password_bytes = password.encode("utf-8")[:MAX_BCRYPT_BYTES]
    hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    return hashed.decode("utf-8")

def verify_password(password: str, hashed: str) -> bool:
    password_bytes = password.encode("utf-8")[:MAX_BCRYPT_BYTES]
    hashed_bytes = hashed.encode("utf-8")
    return bcrypt.checkpw(password_bytes, hashed_bytes)
