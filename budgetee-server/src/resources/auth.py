from flask import make_response, request
from flask_restful import Resource, reqparse
from src.config import app_secret_key
from src.database.user import User
import jwt

class Login(Resource): #Sprint 2
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('email', required=True, help='parameter required')
    parser.add_argument('password', required=True, help='parameter required')

    def post(self): #send login data, get access token
        data = Login.parser.parse_args() # get data received in the HTTP request body as JSON
        
        user = User.get_by_email(data.get('email'))

        if not user:
            return {'error': 'user does not exist'}, 404
        
        if user.password != data.get('password'):   # TODO user password hashing
            return {'error': 'invalid credentials'}, 401
        
        token = jwt.encode({
            'user_id': str(user.id)
        }, app_secret_key, algorithm="HS256");
        
        response = make_response(user.as_dict(), 200)
        response.set_cookie('jwt_token', token)

        return response


class Register(Resource): #Sprint 2
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('username', required=True, help='parameter required')
    parser.add_argument('name', required=True, help='parameter required')
    parser.add_argument('email', required=True, help='parameter required')
    parser.add_argument('password', required=True, help='parameter required')
    parser.add_argument('birthDate', required=True, help='parameter required')

    def post(self): # send register data, register and get access token
        # TODO check received values:
        data = Register.parser.parse_args() # get data received in the HTTP request body as JSON

        user_email = data.get('email')

        if User.email_exists(user_email):
            return {'error': f'user with email "${user_email}" already exists'}, 409

        new_user = User(
            username = data.get('username'),
            name = data.get('name'),
            email = data.get('email'),
            password = data.get('password'),    # TODO user password hashing
            birth_date = data.get('birthDate'),
        )
        new_user.save()
        
        token = jwt.encode({
            'user_id': str(new_user.id)
        }, app_secret_key, algorithm="HS256");
        
        response = make_response(new_user.as_dict(), 201)
        response.set_cookie('jwt_token', token)

        return response


class Logout(Resource):
    def post(self):
        response = make_response({'result': 'logged out'}, 202)
        response.delete_cookie('jwt_token')
        return response