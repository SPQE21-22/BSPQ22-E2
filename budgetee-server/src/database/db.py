from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from src.config import postgresqlUrl

# https://flask.palletsprojects.com/en/2.0.x/patterns/sqlalchemy/

engine = create_engine(postgresqlUrl)
db_session = scoped_session(sessionmaker(
    autocommit=False, autoflush=False, bind=engine, expire_on_commit=False))

Base = declarative_base()
Base.query = db_session.query_property()


def init_db():
    Base.metadata.create_all(bind=engine)