"""! @package database
"""
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
        """! The constructor for the label class.
        @param [in] name The title of the label
        @param [in] user The user that owns the label
        """  
        self.name = name
        self.user_id = user

    def __repr__(self):
        return f'<Label {self.category!r}>'

    def save(self):
        """! Documentation for the save function.
        
        This function will save the database state.
        """
        if not self.id:
            db_session.add(self)
        db_session.commit()
        # db_session.expunge() # REVIEW necessary when using a single session?

    def as_dict(self):
        """!Documentation for the as_dict function.
        
        This function will print the label with a format.
        """
        return {c.category: getattr(self, c.category) for c in self.__table__.columns}

    @staticmethod
    def all():
        """! Documentation for the all function.
        @return This fuction will return all the labels.
        
        """
        return Label.query.all()

    @staticmethod
    def get(label_id) -> Label:
        """! Documentation for the get function.
        @param[in] label_id The id we need to search in the database
        @return This fuction will return the label.
        
        """
        return Label.query.get(label_id)

    @staticmethod
    def get_by_user(user_id) -> Label:
        """! Documentation for the get_by_user function.
        @param[in] user_id The id we need to search in the database
        @return This fuction will return a list of labels that had been created by a user. 
        
        """
        return Label.query.filter_by(user_id = user_id) 

    @staticmethod
    def exists(label_id) -> bool:
        """! Documentation for the exists function.
        @param[in] label_id The id we need to search in the database
        @return This fuction returns a boolean if the label exists or not.

        """
        return Label.query.filter_by(id=label_id).first() is not None
