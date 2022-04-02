from __future__ import annotations
from sqlalchemy import Column, Date, Float, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, backref
from src.database.db import Base, db_session
import uuid

class Budget(Base): #Sprint1
    __tablename__ = 'budget'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    description = Column(String(255), nullable=True)
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    initial_budget = Column(Float, nullable=False)

    records = relationship('Record', backref=backref('budget'))

    def __init__(self,  name, description, start_date, end_date, initial_budget):       
        self.name = name
        self.description = description
        self.start_date = start_date
        self.end_date = end_date
        self.initial_budget = initial_budget
        
    def __repr__(self):
        return f'<Budget {self.name!r}>'
    
    def save(self):
        if not self.id:
            db_session.add(self)
        db_session.commit()
    
    def as_dict(self):
        budget = {b.name: getattr(self, b.name) for b in self.__table__.columns}
        budget['id'] = str(budget['id'])
        budget['start_date'] = str(budget['start_date'])
        budget['end_date'] = str(budget['end_date'])
        return budget
    
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