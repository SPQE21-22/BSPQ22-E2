from __future__ import annotations
from sqlalchemy import Column, Date, String
from sqlalchemy.orm import relationship, backref
from sqlalchemy.dialects.postgresql import UUID
from src.common.helper import camelize
from src.database.db import Base, db_session
import uuid

class User(Base): #Sprint 1
    __tablename__ = 'user'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)    
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    birth_date = Column(Date, nullable=False)
    
    budgets = relationship('Budget', backref=backref('user.id'))


    def __init__(self, username, name, email, password, birth_date):
        self.name = name
        self.username = username
        self.email = email
        self.password = password
        self.birth_date = birth_date        
        
    def __repr__(self):
        return f'<User {self.name!r}>'
    
    def save(self):
        if not self.id:
            db_session.add(self)
        db_session.commit()
        # db_session.expunge() # REVIEW necessary when using a single session?
    
    def as_dict(self):
        user = {camelize(b.name): getattr(self, b.name) for b in self.__table__.columns}
        user['id'] = str(user.get('id'))
        user['birthDate'] = str(user.get('birthDate'))
        del user['password']
        return user
    
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
    def exists(user_id) -> bool:
        return User.query.get(user_id) is not None
    
    @staticmethod
    def email_exists(user_email) -> bool:
        return User.query.filter_by(email=user_email).first() is not None

    @staticmethod
    def delete_one(user_id):
        to_delete = User.query.get(user_id)
        db_session.delete(to_delete)
        db_session.commit()
