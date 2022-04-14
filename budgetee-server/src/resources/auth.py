from flask import request
from flask_restful import Resource, reqparse
from src.database.user import User

class Login(Resource): #Sprint 2

    def post(self): #send login data, get access token
        if request.content_type != 'application/json':
            return {'error': 'only application/json is accepted'}, 400
        
        # TODO check received values:
        data = Login.parser.parse_args() # get data received in the HTTP request body as JSON
        
        if not User.exists(data.user_email):
            return {'error': 'User does not exist'}, 400


        return User.get_by_email(data.user_email) , 201

     
class Register(Resource): #Sprint 2
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('username', required=True, help='parameter required')
    parser.add_argument('name', required=True, help='parameter required')
    parser.add_argument('email', required=True, help='parameter required')
    parser.add_argument('password', required=True, help='parameter required')
    parser.add_argument('birth_date')
    parser.add_argument('budgets')

    def post(self): # send register data, register and get access token
        if request.content_type != 'application/json':
            return {'error': 'only application/json is accepted'}, 400
        
        # TODO check received values:
        data = Register.parser.parse_args() # get data received in the HTTP request body as JSON
        
        if not User.exists(data.user_email):
            return {'error': 'User does not exist'}, 400

        new_user = User(
            username = data.get('username'),
            name = data.get('name'),
            value = data.get('value'),
            email = data.get('email'),
            password = data.get('password'),
            birth_date = data.get('birth_date'),
            budgets = data.get('budgets')
        )
        new_user.save()

        return new_user.as_dict() , 201   