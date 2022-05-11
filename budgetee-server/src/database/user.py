"""!@package database
"""
from __future__ import annotations
from sqlalchemy import Column, Date, String
from sqlalchemy.orm import relationship, backref
from sqlalchemy.dialects.postgresql import UUID
from src.common.helper import camelize
from src.database.db import Base, db_session
import uuid

class User(Base): #Sprint 1
    __tablename__ = 'user'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)    
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    birth_date = Column(Date, nullable=False)
    
    budgets = relationship('Budget', backref=backref('user.id'))


    def __init__(self, username, name, email, password, birth_date):
        """! The constructor for the budget class.
        @param [in] username The nickname of the user
        @param [in] name The name of the user
        @param [in] email The email of the user
        @param [in] password The password of the user
        @param [in] birth_date The birthdate with a date format
        """ 
        self.name = name
        self.username = username
        self.email = email
        self.password = password
        self.birth_date = birth_date        
        
    def __repr__(self):
        """! Documentation for the __repr__ function.
        
        This function will print the name.
        """
        return f'<User {self.name!r}>'
    
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
        
        This function will print the user with a format.
        """
        user = {camelize(b.name): getattr(self, b.name) for b in self.__table__.columns}
        user['id'] = str(user.get('id'))
        user['birthDate'] = str(user.get('birthDate'))
        del user['password']
        return user
    
    @staticmethod
    def all():
        """! Documentation for the all function.
        @return This fuction will return all the users.
        
        """
        return User.query.all()

    @staticmethod
    def get(user_id) -> User:
        """! Documentation for the get function.
        @param[in] user_id The id we need to search in the database
        @return This fuction will return the user.
        
        """
        return User.query.get(user_id)

    @staticmethod
    def get_by_email(user_email) -> User:
        """! Documentation for the get_by_email function.
        @param[in] user_email The email address we need to search in the database and filter users
        @return This fuction will return a list the user that has been created with the user_email email address. 
        
        """
        return User.query.filter_by(email=user_email).first()
    
    @staticmethod
    def delete_one(user_id):
        """! Documentation for the delete_one function.
        @param[in] user_id The id we need to search in the database
 
        This fuction will delete the user.
        """
        to_delete = User.query.get(user_id)
        db_session.delete(to_delete)
        db_session.commit()

    @staticmethod
    def exists(user_id) -> bool:
        """! Documentation for the exists function.
        @param[in] user_id The id we need to search in the database
        @return This fuction returns a boolean if the user exists or not.

        """
        return User.query.get(user_id) is not None
    
    @staticmethod
    def email_exists(user_email) -> bool:
        """! Documentation for the exists function.
        @param[in] user_email The email address we need to search in the database and filter users
        @return This fuction returns a boolean if a user that fulfils the previous condition exists

        """
        return User.query.filter_by(email=user_email).first() is not None

    
