from __future__ import annotations
from sqlalchemy import Column, Date, Integer, String
from sqlalchemy.orm import relationship, backref
from sqlalchemy.dialects.postgresql import UUID
from src.database.db import Base, db_session
import uuid

class User(Base): #Sprint 1
    __tablename__ = 'user'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)    
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    birth_date = Column(Date, nullable=True)
    
    budgets = relationship('Budget', backref=backref('user.id'))


    def __init__(self, username, name, email, password, birthDate):
        self.name = name
        self.username = username
        self.email = email
        self.password = password
        self.birthDate = birthDate        
        
    def __repr__(self):
        return f'<User {self.name!r}>'
    
    def save(self):
        if not self.id:
            db_session.add(self)
        db_session.commit()
        # db_session.expunge() # REVIEW necessary when using a single session?
    
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    
    @staticmethod
    def all():
        return User.query.all()

    @staticmethod
    def get(user_id) -> User:
        return User.query.get(user_id)

    @staticmethod
    def get_by_email(user_email) -> User:
        return User.query.filter_by(email=user_email).first()
  
    @staticmethod
    def exists(user_email) -> bool:
        return User.query.filter_by(email=user_email).first() is not None

