from flask import request
from flask_restful import Resource, reqparse
from src.common.auth import decode_request_jwt
from src.database.user import User

def not_none(s, d):
    if s is None:
        return d
    return s

class UsersSelf(Resource): #Sprint 2
    edit_parser = reqparse.RequestParser(bundle_errors=True)
    edit_parser.add_argument('username')
    edit_parser.add_argument('name')
    edit_parser.add_argument('email')
    edit_parser.add_argument('password')
    edit_parser.add_argument('birthDate')

    def get(self): # get a user's own data
        user_id = decode_request_jwt(request)
        
        if not user_id:
            return {'error': 'invalid JWT'}, 401
        
        user = User.get(user_id)
        
        # this error should never trigger, as we sign the token in the server with a secret key
        if not user:
            return {'error': 'user does not exist'}, 404
        
        return user.as_dict()

    def put(self): # edit a user's own data
        user_id = decode_request_jwt(request)
        
        if not user_id:
            return {'error': 'invalid JWT'}, 401
        
        user = User.get(user_id)
        
        # this error should never trigger, as we sign the token in the server with a secret key
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
        user_id = decode_request_jwt(request)
        
        if not user_id:
            return {'error': 'invalid JWT'}, 401
        
        if User.exists(user_id): 
            User.delete_one(user_id)
            return {'result' : 'success'}, 204
        
        return {'error' : 'user does not exist'}, 404