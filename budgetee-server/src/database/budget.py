from __future__ import annotations
from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship, backref
from src.database.db import Base, db_session
from src.database.record import Record

class Budget(Base): #Sprint1
    __tablename__ = 'Budget'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    description = Column(String(255), nullable=True)
    start_date = Column(DateTime(255), nullable=True)
    end_date = Column(DateTime(255), nullable=True)

    # records = relationship('Record', backref=backref('Budget'))

    def __init__(self,  name, description, start_date, end_date):       
        self.name = name
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
        return {b.name: getattr(self, b.name) for b in self.__table__.columns}
    
    @staticmethod
    def all():
        return Budget.query.all()

    @staticmethod
    def get(Budget_id) -> Budget:
        return Budget.query.get(Budget_id)

    @staticmethod
    def get_records(budget_id):
        return Budget.query.get(budget_id).records

    @staticmethod
    def delete_one(budget_id):
        to_delete = Budget.query.get(budget_id)
        db_session.delete(to_delete)
        db_session.commit()
  
    @staticmethod
    def exists(budget_id) -> bool:
        return Budget.query.filter_by(id=budget_id).first() is not None



