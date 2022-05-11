"""! @package database
"""
from __future__ import annotations
from sqlalchemy import DateTime, Column, Float, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from src.common.helper import camelize
from src.database.db import Base, db_session
from src.database.budget import Budget
from typing import List
import uuid

class Record(Base): #Sprint 1
    """! @Class Record"""
    __tablename__ = 'record'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(128), nullable=False)
    category = Column(String(255), nullable=False)
    value = Column(Float, nullable=False)
    date = Column(DateTime, nullable=True, default=None)
    extra_info = Column(String(255), nullable=True)
    payment_type = Column(String(255), nullable=True)
    place = Column(String(255), nullable=True, default='')
    
    budget_id = Column(UUID(as_uuid=True), ForeignKey('budget.id', ondelete='CASCADE'), nullable=False)

    def __init__(self, name, category, value, date, extra_info, payment_type, place, budget_id):
        """! The constructor for the record class.
        @param [in] name The title of the record
        @param [in] category The category in which we classify the record
        @param [in] value The value that is stored with the record
        @param [in] date The date we place the record
        @param [in] payment_type If it is in cash, cheque... 
        @param [in] place The location we store with the record
        @param [in] budget_id The budget that this record belongs
        """ 
        self.name = name
        self.category = category
        self.value = value
        self.date = date
        self.extraInfo = extra_info
        self.paymentType = payment_type
        self.place = place
        self.budget_id = budget_id

    def __repr__(self):
        """! Documentation for the __repr__ function.
        
        This function will print the name.
        """
        return f'<Record {self.name!r}>'
    
    def save(self):
        """! Documentation for the save function.
        
        This function will save the database state.
        """
        if not self.id:
            db_session.add(self)
        db_session.commit()
    
    def as_dict(self):
        """!Documentation for the as_dict function.
        
        This function will print the record with a format.
        """
        record = {camelize(c.name): getattr(self, c.name) for c in self.__table__.columns}
        record['id'] = str(record['id'])
        record['budgetId'] = str(record['budgetId'])
        record['date'] = str(record['date'])
        return record
    
    @staticmethod
    def all() -> List[Record]:
        """! Documentation for the all function.
        @return This fuction will return all the records.
        
        """
        return Record.query.all()

    @staticmethod
    def get(record_id) -> Record:
        """! Documentation for the get function.
        @param[in] rudget_id The id we need to search in the database
        @return This fuction will return the record.
        
        """
        return Record.query.get(record_id)

    @staticmethod
    def get_by_date(record_dateTime) -> Record:
        """! Documentation for the get_by_date function.
        @param[in] record_dateTime The id we need to search in the database
        @return This fuction will return a list of records that had been created at the specified date. 
        
        """
        return Record.query.filter_by(dateTime=record_dateTime)
    
    @staticmethod
    def get_by_user(user_id) -> Record:
        """! Documentation for the get_by_user function.
        @param[in] user_id The id we need to search in the database
        @return This fuction will return a list of records that had been created by a user. 
        
        """
        budget_ids = [budget.id for budget in Budget.get_by_user(user_id)] 
        all_records = Record.all()
        records = []
        for record in all_records:
            if record.budget_id in budget_ids:
                records.append(record)
        return records

    @staticmethod
    def delete_one(record_id):
        """! Documentation for the delete_one function.
        @param[in] record_id The id we need to search in the database
 
        This fuction will delete the record.
        """
        to_delete = Record.query.get(record_id)
        db_session.delete(to_delete)
        db_session.commit()

    @staticmethod
    def exists(record_id) -> bool:
        """! Documentation for the exists function.
        @param[in] record_id The id we need to search in the database
        @return This fuction returns a boolean if the record exists or not.

        """
        return Record.query.filter_by(id=record_id).first() is not None

