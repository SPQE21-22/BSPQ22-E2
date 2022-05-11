"""@package docstring
Documentation for this module Budget.
 
More details.
"""
from __future__ import annotations
from sqlalchemy import Column, Date, Float, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, backref
from src.common.helper import camelize
from src.database.db import Base, db_session
from typing import List
import uuid

class Budget(Base): #Sprint1
    """! @Class Budget"""
    __tablename__ = 'budget'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    description = Column(String(255), nullable=True, default='')
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    initial_budget = Column(Float, nullable=False, default=0)

    user_id = Column(UUID(as_uuid=True), ForeignKey('user.id', ondelete='CASCADE'), nullable=False) #Sprint 2    
    records = relationship('Record', backref=backref('budget')) #Sprint 2


    def __init__(self,  name, description, start_date, end_date, initial_budget, user_id):
        """! The constructor for the budget class."""       
        self.name = name
        self.description = description
        self.start_date = start_date
        self.end_date = end_date
        self.initial_budget = initial_budget
        self.user_id = user_id

    def __repr__(self):
        return f'<Budget {self.name!r}>'
    
    def save(self):
        """! Documentation for the save function.
        
        This function will save the database state.
        """
        if not self.id:
            db_session.add(self)
        db_session.commit()
    
    def as_dict(self):
        """!Documentation for the as_dict function.
        
        This function will print the budget with a format.
        """
        budget = {camelize(b.name): getattr(self, b.name) for b in self.__table__.columns}
        budget['id'] = str(budget['id'])
        budget['userId'] = str(budget['userId'])
        budget['startDate'] = str(budget['startDate'])
        budget['endDate'] = str(budget['endDate'])
        return budget
    
    @staticmethod
    def all():
        """! Documentation for the all function.
        @return This fuction will return all the budgets.
        
        """
        return Budget.query.all()
    
    @staticmethod
    def get(budget_id) -> Budget:
        """! Documentation for the get function.
        @param[in] budget_id The id we need to search in the database
        @return This fuction will return the budget.
        
        """
        return Budget.query.get(budget_id)

    @staticmethod
    def get_by_user(user_id) -> List[Budget]:
        """! Documentation for the get_by_user function.
        @param[in] user_id The id we need to search in the database
        @return This fuction will return a list of budgets that had been created by a user. 
        
        """
        return Budget.query.filter_by(user_id = user_id)  
    
    @staticmethod
    def delete_one(budget_id):
        """Documentation for the delete_one function.
        @param[in] budget_id The id we need to search in the database
 
        This fuction will delete the budget.
        """
        to_delete = Budget.query.get(budget_id)
        db_session.delete(to_delete)
        db_session.commit()
  
    @staticmethod
    def exists(budget_id) -> bool:
        """Documentation for the exists function.
        @param[in] budget_id The id we need to search in the database
        @return This fuction returns a boolean if the budget exists or not.

        """
        return Budget.query.filter_by(id=budget_id).first() is not None