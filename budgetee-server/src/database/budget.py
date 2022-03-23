from __future__ import annotations
from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, or_
from sqlalchemy.orm import relationship, backref
from .db import Base, db_session

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    description = Column(String(255), nullable=False)
    start_date = Column(DateTime(255), nullable=False)
    end_date = Column(DateTime(255), nullable=False)

    records = relationship('Records', backref=backref('user'))
    notifications = relationship('Notifications', backref=backref('user'))

    def __init__(self, code, title, description, start_date, end_date):
        self.code = code
        self.title = title
        self.description = description
        self.start_date = start_date
        self.end_date = end_date
        
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

