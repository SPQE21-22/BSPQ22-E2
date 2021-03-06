"""! @package resources """
from flask import request
from flask_restful import Resource, reqparse
from src.common.auth import decode_request_jwt
from src.common.helper import not_none
from src.database.user import User


class UsersSelf(Resource): #Sprint 2
    """! @class UserSelf
    @param username
    @param name
    @param email
    @param password
    @param birth date
    """
    edit_parser = reqparse.RequestParser(bundle_errors=True)
    edit_parser.add_argument('username')
    edit_parser.add_argument('name')
    edit_parser.add_argument('email')
    edit_parser.add_argument('password')
    edit_parser.add_argument('birthDate')

    def get(self): # get a user's own data
        """! gets a single user
        @return user
        """
        user_id = decode_request_jwt(request)
        
        if not user_id:
            return {'error': 'invalid JWT'}, 401
        
        user = User.get(user_id)
        
        if not user:
            return {'error': 'user does not exist'}, 404
        
        return user.as_dict()

    def put(self): # edit a user's own data
        """! edits a single record
        @return 200 if successful
        @return the edited user
        """  
        user_id = decode_request_jwt(request)
        
        if not user_id:
            return {'error': 'invalid JWT'}, 401
        
        user = User.get(user_id)
        
        if not user:
            return {'error': 'user does not exist'}, 404
        
        data = UsersSelf.edit_parser.parse_args()
        
        user.username = not_none(data.get('username'), user.username)
        user.name = not_none(data.get('name'), user.name)
        user.email = not_none(data.get('email'), user.email)
        user.password = not_none(data.get('password'), user.password)
        user.birth_date = not_none(data.get('birthDate'), user.birth_date)
        
        user.save()

        return user.as_dict(), 200

    def delete(self): # delete a single User
        """! deletes a single user
        @return 204 if successful
        """        
        user_id = decode_request_jwt(request)
        
        if not user_id:
            return {'error': 'invalid JWT'}, 401
        
        user = User.get(user_id)
        
        if not user:
            return {'error' : 'user does not exist'}, 404
        
        User.delete_one(user_id)
        return {'result' : 'success'}, 204