from __future__ import annotations
from tkinter import Label
from unicodedata import category
from sqlalchemy import DateTime, Column, Integer, String
from src.database.db import Base, db_session

class Record(Base): #Sprint 1
    __tablename__ = 'Record'
    id = Column(Integer, primary_key=True)
    category = Column(String(255), nullable=False)
    label = Column(Label, nullable=False)
    value = Column(float, nullable=False)
    dateTime = Column(DateTime(255), nullable=False)
    extraInfo = Column(String(255), nullable=False) 
    paymentType = Column(String(255), nullable=False) #Do we need?
    place = Column(String(255), nullable=False) #Do we need ?

    def __init__(self, category, label, value, dateTime, extraInfo, paymentType, place):
        self.category = category
        self.label = label
        self.value = value
        self.dateTime = dateTime
        self.extraInfo = extraInfo
        self.paymentType = paymentType
        self.place = place
        
    def __repr__(self):
        return f'<Record {self.category!r}>'
    
    def save(self):
        if not self.id:
            db_session.add(self)
        db_session.commit()
        # db_session.expunge() # REVIEW necessary when using a single session?
    
    def as_dict(self):
        return {c.category: getattr(self, c.category) for c in self.__table__.columns}
    
    @staticmethod
    def all():
        return Record.query.all()

    @staticmethod
    def get(Record_id) -> Record:
        return Record.query.get(Record_id)

    @staticmethod
    def get_by_date(Record_dateTime) -> Record:
        return Record.query.filter_by(dateTime=Record_dateTime)
    
    @staticmethod
    def delete_one(record_id):
        to_delete = Record.query.get(record_id)
        db_session.delete(to_delete)
        db_session.commit()

    @staticmethod
    def exists(Record_id) -> bool:
        return Record.query.filter_by(id=Record_id).first() is not None

