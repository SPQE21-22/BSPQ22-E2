from flask import request
from flask_restful import Resource, reqparse
from src.database.budget import Budget
from src.database.user import User
from src.common.auth import decode_request_jwt
from src.common.helper import is_valid_uuid, not_none


class BudgetsAll(Resource):  # Sprint 1
    parser = reqparse.RequestParser(bundle_errors=True) # parse request values to check if they are ok
    parser.add_argument('name', required=True, help='parameter required')
    parser.add_argument('description')
    parser.add_argument('startDate', required=True, help='parameter required')
    parser.add_argument('endDate', required=True, help='parameter required')
    parser.add_argument('initialBudget', type=float, help='Initial budget cannot be converted')
    parser.add_argument('userId')
    
    def get(self):  # get all the budgets
        user_id = decode_request_jwt(request)

        if not user_id:
            return {'error': 'invalid JWT'}, 401

        budgets = Budget.get_by_user(user_id)

        return [budget.as_dict() for budget in budgets]

    def post(self):  # create a budget
        #TODO start date and end date are not checked  
        # get data received in the HTTP request body as JSON
        user_id = decode_request_jwt(request)

        if not user_id:
            return {'error': 'invalid JWT'}, 401

        data = BudgetsAll.parser.parse_args() 
  
        new_budget = Budget(
            name=data.get('name'),
            description=data.get('description'),
            start_date=data.get('startDate'),
            end_date=data.get('endDate'),
            initial_budget=data.get('initialBudget'),
            user_id=user_id
        )

        new_budget.save()

        return new_budget.as_dict(), 201


class BudgetsDetail(Resource):  # Sprint 1
    parser = reqparse.RequestParser(bundle_errors=True) # parse request values to check if they are ok
    parser.add_argument('name')
    parser.add_argument('description')
    parser.add_argument('startDate')
    parser.add_argument('endDate')
    parser.add_argument('initialBudget', type=int, help='Initial budget cannot be converted')
    parser.add_argument('userId')
    
    def get(self, budget_id):  # get a single budget
        user_id = decode_request_jwt(request)
        
        if not user_id:
            return {'error': 'invalid JWT'}, 401

        if not is_valid_uuid(budget_id):
            return {'error': 'invalid ID'}, 400
       
        budget = Budget.get(budget_id)

        if not budget:
            return {'error': 'budget does not exist'}, 404
        
        if str(budget.user_id) != user_id:
            return {'error': 'access not allowed'}, 403
        
        return budget.as_dict()


    def put(self, budget_id):  # edit this single budget
        user_id = decode_request_jwt(request)

        if not user_id:
            return {'error': 'invalid JWT'}, 401
        
        if not is_valid_uuid(budget_id):
            return {'error': 'invalid ID'}, 400
        
        budget = Budget.get(budget_id)
        
        if not budget:
            return {'error': f'budget {budget_id} does not exist'}, 404

        if str(budget.user_id) != user_id:
            return {'error': 'access not allowed'}, 403

        data = BudgetsDetail.parser.parse_args()  # get data received in the HTTP request body as JSON

        # TODO implement safer way to safe-change values
        budget.name = data.get('name') or budget.name
        budget.description = data.get('description') or budget.description
        budget.start_date = data.get('startDate') or budget.start_date
        budget.end_date = data.get('endDate') or budget.end_date
        budget.initial_budget = data.get('initialBudget') if data.get('initialBudget') is not None else budget.initial_budget

        budget.save()

        return budget.as_dict(), 200

    def delete(self, budget_id):  # delete this single budget_id
        user_id = decode_request_jwt(request)

        if not user_id:
            return {'error': 'invalid JWT'}, 401

        if not is_valid_uuid(budget_id):
            return {'error': 'invalid ID'}, 400
        
        budget = Budget.get(budget_id)
        
        if not budget:
            return {'error': f'budget {budget_id} not found'}, 404

        if str(budget.user_id) != user_id:
            return {'error': 'deletion not allowed'}, 403
            
        Budget.delete_one(budget_id)
        return {'result': 'success'}, 204

