from sqlalchemy import Integer, String, create_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session
import config


class Base(DeclarativeBase):
    pass


class UserORM(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    login: Mapped[str] = mapped_column(String, unique=True)
    email: Mapped[str] = mapped_column(String, unique=True)
    password: Mapped[str] = mapped_column(String)

    def __repr__(self):
        return f"<User id={self.id} login={self.login} name={self.name}>"


engine = create_engine(config.DATABASE_URL, echo=True)


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
    create_db_and_tables(),
    add_user(),
    users = get_users()
    print(users)
