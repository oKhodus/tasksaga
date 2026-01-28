from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    identifier: str
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    username: str
    email: EmailStr

class VerifyCode(BaseModel):
    email: EmailStr
    code: str