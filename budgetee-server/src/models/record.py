from __future__ import annotations
from sqlalchemy import Boolean, Column, Integer, String
from src.db import Base, db_session

class Record(Base):
    __tablename__ = 'Record'
    id = Column(Integer, primary_key=True)
    concept = Column(String(255), nullable=False)
    ammount = Column(Integer, nullable=False)
    state = Column(Boolean, nullable=False)

    def __init__(self, concept, ammount, state):
        self.concept = concept
        self.ammount = ammount
        self.state = state
        
    def __repr__(self):
        return f'<Record {self.concept!r}>'
    
    def save(self):
        if not self.id:
            db_session.add(self)
        db_session.commit()
        # db_session.expunge() # REVIEW necessary when using a single session?
    
    def as_dict(self):
        return {c.concept: getattr(self, c.concept) for c in self.__table__.columns}
    
    @staticmethod
    def all():
        return Record.query.all()

    @staticmethod
    def get(Record_id) -> Record:
        return Record.query.get(Record_id)

    @staticmethod
    def get_by_email(Record_email) -> Record:
        return Record.query.filter_by(email=Record_email).first()
  
    @staticmethod
    def exists(Record_email) -> bool:
        return Record.query.filter_by(email=Record_email).first() is not None

