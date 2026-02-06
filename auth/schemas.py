from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    username: str | None = None
    email: EmailStr
    password: str | None = None

class UserLogin(BaseModel):
    identifier: str
    password: str

class GoogleToken(BaseModel):
    id_token: str

class UserOut(BaseModel):
    id: int
    name: str
    username: str
    email: EmailStr

class VerifyCode(BaseModel):
    email: EmailStr
    code: str