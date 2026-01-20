from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from enum import Enum
from pydantic import BaseModel, EmailStr
import db as database

class UserType(str, Enum):
    admin = "admin"
    user = "user"

class User(BaseModel):
    name: str
    login: str
    email: EmailStr
    password: str
    id: int

app = FastAPI(title="TaskSaga API")

database.create_db_and_tables()

@app.get("/")
async def root():
    return {
        "docs": "http://127.0.0.1:8000/docs",
        "users": "http://127.0.0.1:8000/users",
        "admin": "http://127.0.0.1:8000/UserType/admin",
        "user": "http://127.0.0.1:8000/UserType/user",
    }

@app.get("/UserType/{type_name}")
async def get_class(type_name: UserType):
    if type_name is UserType.admin:
        return {"type_name": type_name, "message": "Hello, admin!"}
    return {"type_name": type_name, "message": "Hello, current user!"}

@app.post("/users")
async def create_user(name: str, login: str, email: str, password: str, db: Session = Depends(database.get_session)):
    new_user = database.UserORM(name=name, login=login, email=email, password=password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"id": new_user.id, "name": new_user.name, "login": new_user.login}

@app.get("/users")
async def get_all_users(db: Session = Depends(database.get_session)):
    users = db.query(database.UserORM).all()
    return users

@app.get("/users/{user_id}")
async def get_user_info(user_id: int):
    return {"user_id": user_id}

@app.put("/users/{user_id}")
async def get_user_info(user_id: int, user: User):
    return {"user_id": user_id, **user.model_dump()}

@app.get("/admin")
async def get_admin_info():
    return "Hello, admin!"

@app.get("/user")
async def get_current_user_info():
    return "Hello, current user!"
