from __future__ import annotations
from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship, backref
from src.db import Base, db_session

class Budget(Base):
    __tablename__ = 'Budget'
    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    description = Column(String(255), nullable=False)
    start_date = Column(DateTime(255), nullable=False)
    end_date = Column(DateTime(255), nullable=False)

    records = relationship('Records', backref=backref('Budget'))
    notifications = relationship('Notifications', backref=backref('Budget'))

    def __init__(self,  title, description, start_date, end_date):
       
        self.title = title
        self.description = description
        self.start_date = start_date
        self.end_date = end_date
        
    def __repr__(self):
        return f'<Budget {self.name!r}>'
    
    def save(self):
        if not self.id:
            db_session.add(self)
        db_session.commit()
        # db_session.expunge() # REVIEW necessary when using a single session?
    
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    
    @staticmethod
    def all():
        return Budget.query.all()

    @staticmethod
    def get(Budget_id) -> Budget:
        return Budget.query.get(Budget_id)

    @staticmethod
    def get_by_email(Budget_email) -> Budget:
        return Budget.query.filter_by(email=Budget_email).first()
  
    @staticmethod
    def exists(Budget_email) -> bool:
        return Budget.query.filter_by(email=Budget_email).first() is not None

