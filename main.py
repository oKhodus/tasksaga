from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.routes import router as auth_router
import db as database

app = FastAPI(title="TaskSaga API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

database.create_db_and_tables()


@app.get("/")
async def root():
    return {
        "docs": "http://127.0.0.1:8000/docs",
    }


"""
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
"""
