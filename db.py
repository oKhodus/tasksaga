import sqlalchemy
from sqlalchemy.orm import sessionmaker, declarative_base
from config import DATABASE_URL

engine = sqlalchemy.create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

