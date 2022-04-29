from __future__ import annotations
from unicodedata import category
from sqlalchemy import Column, Integer, String, ForeignKey
from .db import Base, db_session
from sqlalchemy.dialects.postgresql import UUID
import uuid 


class Label(Base): #Sprint 2 
    __tablename__ = 'Label'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey('user.id', ondelete='CASCADE'), nullable=False) 

    def __init__(self, name, user):
        self.name = name
        self.user_id = user

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
    def get_by_user(user_id) -> Label:
        return Label.query.filter_by(user_id = user_id) 

    @staticmethod
    def exists(Label_id) -> bool:
        return Label.query.filter_by(id=Label_id).first() is not None
