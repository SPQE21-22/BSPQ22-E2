from flask import request
from flask_restful import Resource, reqparse
from src.database.budget import Budget
from src.database.record import Record
from src.database.user import User
from src.common.auth import decode_request_jwt

class RecordsAll(Resource): #Sprint 1
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('name', required=True, help='parameter required')
    parser.add_argument('category', required=True, help='parameter required')
    parser.add_argument('value', type=int, required=True, help='parameter required')    # TODO send both errors
    parser.add_argument('date')
    parser.add_argument('extraInfo')
    parser.add_argument('paymentType')
    parser.add_argument('place')
    parser.add_argument('budgetId', required=True, help='budget id cannot be converted')    # TODO send both errors
    
    def get(self): #get all the records in a budget
        user_id = decode_request_jwt(request)

        if not user_id:
            return {'error': 'invalid JWT'}, 401

        records = Record.get_by_user(user_id)        
       
        return [record.as_dict() for record in records]

    def post(self): #create a record in a budget
        if request.content_type != 'application/json':
            return {'error': 'only application/json is accepted'}, 400
        
        # TODO check received values:
        # - Date has proper format
        # - Budget with id 'budget_id' exists
        data = RecordsAll.parser.parse_args() # get data received in the HTTP request body as JSON
        
        if not Budget.exists(data.budgetId):
            return {'error': 'budget does not exist'}, 400

        new_record = Record(
            name = data.get('name'),
            category = data.get('category'),
            value = data.get('value'),
            date = data.get('date'),
            extra_info = data.get('extraInfo'),
            payment_type = data.get('paymentType'),
            place = data.get('place'),
            budget_id = data.get('budgetId')
        )
        new_record.save()

        return new_record.as_dict() , 201

class RecordsDetail(Resource): #Sprint 1
    def get(self, record_id): #get a single record in a budget
        
        user_id = decode_request_jwt(request)

        if not user_id:
            return {'error': 'invalid JWT'}, 401

        records = Record.get_by_user(user_id) 
        for record in records:
            if (record.id == record_id):
                return record.as_dict()
        
        return {'error' : 'record does not exist'}, 404

    def put(self, record_id): #edit a single record in a budget
        if request.content_type != 'application/json':
            return {'error': 'only application/json is accepted'}, 400
        
        # TODO perform same checks as in RecordsAll.post()
        
        record = Record.get(record_id)
        budget = Budget.get(record.budget_id)

        user_id = decode_request_jwt(request)

        if not user_id:
            return {'error': 'invalid JWT'}, 401
        
        user = User.get(user_id)

        if not user:
            return {'error': 'user does not exist'}, 404


        if (budget.user_id == user_id):
            data = request.json # get data received in the HTTP request body as JSON
            
            record.name = data.get('name')
            record.category = data.get('category')
            record.value = data.get('value')
            record.date = data.get('date')
            record.extra_info = data.get('extraInfo')
            record.payment_type = data.get('paymentType')
            record.place = data.get('place')
            record.budget_id = data.get('budgetId')
            
            record.save()

            return record.as_dict(), 201
        
        return {'Error: record is not correctly created'}, 404

    def delete(self, record_id): # delete a single record in a budget
        record = Record.get(record_id)
        budget = Budget.get(record.budget_id)

        user_id = decode_request_jwt(request)

        if not user_id:
            return {'error': 'invalid JWT'}, 401
        
        user = User.get(user_id)

        if not user:
            return {'error': 'user does not exist'}, 404

        if (budget.user_id == user_id):    
            if Record.exists(record_id): # if the record exists
                Record.delete_one(record_id)
                return {'result' : 'success'}, 204
            
        return {'error' : 'record does not exist'}, 404
        