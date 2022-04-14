from flask import request
from flask_restful import Resource, reqparse
from src.database.user import User

class UsersDetail(Resource): #Sprint 2
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('username', required=True, help='parameter required')
    parser.add_argument('name', required=True, help='parameter required')
    parser.add_argument('email', required=True, help='parameter required')
    parser.add_argument('password', required=True, help='parameter required')
    parser.add_argument('birth_date')
    parser.add_argument('budgets')

    def get(self, user_id): #get a single User in a budget
        user = User.get(user_id)
        return user.as_dict()

    def put(self, user_id): #edit a single User in a budget
        if request.content_type != 'application/json':
            return {'error': 'only application/json is accepted'}, 400
        
        # TODO perform same checks as in UsersAll.post()
        
        user = User.get(user_id)

        data = request.json # get data received in the HTTP request body as JSON
        
        user.username = data.get('username')
        user.name = data.get('name')
        user.email = data.get('email')
        user.password = data.get('password')
        user.birth_date = data.get('birth_date')
        user.budgets= data.get('budgets')
        
        user.save()

        return user.as_dict(), 201

    def delete(self, user_id): # delete a single User
        if User.exists(user_id): 
            User.delete_one(user_id)
            return {'result' : 'success'}, 204
        
        return {'error' : 'This user does not exist'}, 404