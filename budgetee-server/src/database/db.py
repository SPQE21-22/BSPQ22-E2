from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

# https://flask.palletsprojects.com/en/2.0.x/patterns/sqlalchemy/

# TODO load os.environ before initializing the engine
SQLALCHEMY_DATABASE_URL = 'postgresql://postgres:mysecret@localhost:5432/postgres'

engine = create_engine(SQLALCHEMY_DATABASE_URL)
db_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    import resources
    Base.metadata.create_all(bind=engine)