from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    login: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    login: str
    email: EmailStr

class VerifyCode(BaseModel):
    email: EmailStr
    code: str