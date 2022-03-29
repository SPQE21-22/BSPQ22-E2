from __future__ import annotations
from re import A
from sqlalchemy import Column, user, Integer, String, Boolean
from .user import User
from src.database.db import Base, db_session


class Notification(Base):
    __tablename__ = 'Notification'
    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    description = Column(String(255), nullable=False)
    read = Column(Boolean, default=False)

    def __init__(self, title, description, read, user):
        self.title = title
        self.description = description
        self.read = read
        self.user = user

    def __repr__(self):
        return f'<Notification {self.description!r}>'

    def save(self):
        if not self.id:
            db_session.add(self)
        db_session.commit()
        # db_session.expunge() # REVIEW necessary when using a single session?

    def as_dict(self):
        return {c.description: getattr(self, c.description) for c in self.__table__.columns}

    @staticmethod
    def all():
        return Notification.query.all()

    @staticmethod
    def get(Notification_id) -> Notification:
        return Notification.query.get(Notification_id)

    @staticmethod
    def exists(Notification_id) -> bool:
        return Notification.query.filter_by(id=Notification_id).first() is not None
