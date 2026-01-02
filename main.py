import fastapi
from db import Base, engine
from auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = fastapi.FastAPI(title="TaskSaga API")
app.include_router(auth_router)

@app.get("/")
async def root():
    return {"status":"ok"}