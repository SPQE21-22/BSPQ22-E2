from __future__ import annotations
from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, or_
from sqlalchemy.orm import relationship, backref
from .db import Base, db_session

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    surname = Column(String(255), nullable=False)
    bday = Column(DateTime(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)

    budgets = relationship('Budgets', backref=backref('user'))

    def __init__(self, name, email, surname, bday):
        self.name = name
        self.surname = surname
        self.bday = bday
        self.email = email
        
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

