from sqlalchemy import Integer, String, create_engine, Boolean, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session
import config
from datetime import datetime


class Base(DeclarativeBase):
    pass


class UserORM(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    login: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    verification_code: Mapped[str | None] = mapped_column(String, nullable=True)
    code_expires_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)


    def __repr__(self):
        return f"<User id={self.id} login={self.login} name={self.name}>"

engine = create_engine(config.DATABASE_URL)

def create_db_and_tables():
    Base.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


def add_user(name, login, email, password):
    with Session(engine) as session:
        new_user = UserORM(
            name=name,
            login=login,
            email=email,
            password=password
        )
        session.add(new_user)
        session.commit()
        print(f"User {login} added!")


def get_users():
    with Session(engine) as session:
        return session.query(UserORM).all()


if __name__ == "__main__":
    create_db_and_tables()
    # add_user()
    users = get_users()
    print(users)
