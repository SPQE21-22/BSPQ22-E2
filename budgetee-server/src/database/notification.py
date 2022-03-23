from __future__ import annotations
from datetime import date
from xmlrpc.client import Boolean
from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, or_
from sqlalchemy.orm import relationship, backref
from .db import Base, db_session

class Notification(Base):
    __tablename__ = 'Notification'
    id = Column(Integer, primary_key=True)
    summary = Column(String(255), nullable=False)
    text = Column(Integer, nullable=False)
    dateTime = Column(DateTime, nullable=False)
    
    def __init__(self, summary, text, dateTime):
        self.summary = summary
        self.text = text
        self.dateTime = dateTime
        
    def __repr__(self):
        return f'<Notification {self.summary!r}>'
    
    def save(self):
        if not self.id:
            db_session.add(self)
        db_session.commit()
        # db_session.expunge() # REVIEW necessary when using a single session?
    
    def as_dict(self):
        return {c.summary: getattr(self, c.summary) for c in self.__table__.columns}
    
    @staticmethod
    def all():
        return Notification.query.all()

    @staticmethod
    def get(Notification_id) -> Notification:
        return Notification.query.get(Notification_id)

    @staticmethod
    def get_by_email(Notification_email) -> Notification:
        return Notification.query.filter_by(email=Notification_email).first()
  
    @staticmethod
    def exists(Notification_email) -> bool:
        return Notification.query.filter_by(email=Notification_email).first() is not None

