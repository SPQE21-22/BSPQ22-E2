from __future__ import annotations
from tkinter import Label
from models import User
from unicodedata import category
from sqlalchemy import Column, Integer, String
from src.database.db import Base, db_session

class Label(Base):
    __tablename__ = 'Label'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    user = Column(User, nullable=False)

    def __init__(self, name, user):
        self.name = name
        self.user = user        
        
    def __repr__(self):
        return f'<Label {self.category!r}>'
    
    def save(self):
        if not self.id:
            db_session.add(self)
        db_session.commit()
        # db_session.expunge() # REVIEW necessary when using a single session?
    
    def as_dict(self):
        return {c.category: getattr(self, c.category) for c in self.__table__.columns}
    
    @staticmethod
    def all():
        return Label.query.all()

    @staticmethod
    def get(Label_id) -> Label:
        return Label.query.get(Label_id)

    @staticmethod
    def exists(Label_id) -> bool:
        return Label.query.filter_by(id=Label_id).first() is not None

