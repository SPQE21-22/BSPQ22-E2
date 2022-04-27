from flask import request
from flask_restful import Resource, reqparse
from src.database.budget import Budget
from src.database.user import User
from src.common.auth import decode_request_jwt


class BudgetsAll(Resource):  # Sprint 1
    parser = reqparse.RequestParser(bundle_errors=True) # parse request values to check if they are ok
    parser.add_argument('name', required=True, help='parameter required')
    parser.add_argument('description')
    parser.add_argument('startDate', required=True, help='parameter required')
    parser.add_argument('endDate', required=True, help='parameter required')
    parser.add_argument('initialBudget', type=int, help='Initial budget cannot be converted')
    parser.add_argument('userId', help='parameter required')
    
    def get(self):  # get all the budgets
        user_id = decode_request_jwt(request)

        if not user_id:
            return {'error': 'invalid JWT'}, 401
        
        user = User.get(user_id)

        if not user:
            return {'error': 'user does not exist'}, 404

        budgets = Budget.get_by_user(user_id)

        budget_dicts = []
        for budget in budgets:
            budget_dicts.append(budget.as_dict() )
        return budget_dicts

    def post(self):  # create a budget
        #TODO start date and end date are not checked  
        # get data received in the HTTP request body as JSON
        data = BudgetsAll.parser.parse_args()     
        
        new_budget = Budget(
            name=data.get('name'),
            description=data.get('description'),
            start_date=data.get('startDate'),
            end_date=data.get('endDate'),
            initial_budget=data.get('initialBudget'),
            user_id=data.get('userId')
        )
        if (new_budget.start_date > new_budget.end_date):
            return {'error': 'dates are incorrect'}, 404
        
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
        budget = Budget.get(budget_id) 
        user_id = decode_request_jwt(request)
        if not user_id:
            return {'error': 'invalid JWT'}, 401
       
        user = User.get(user_id)

        if not user:
            return {'error': 'user does not exist'}, 404

        if (budget.user_id == user_id):
            return budget.as_dict()

        return {'error': 'budget does not exist'}, 404

    def put(self, budget_id):  # edit this single budget
        budget = Budget.get(budget_id)
        user_id = decode_request_jwt(request)

        if not user_id:
            return {'error': 'invalid JWT'}, 401
        
        user = User.get(user_id)

        if not user:
            return {'error': 'user does not exist'}, 404


        if (budget.user_id == user_id):

            data = BudgetsDetail.parser.parse_args()  # get data received in the HTTP request body as JSON

            # TODO implement safer way to safe-change values
            budget.name = data.get('name') or budget.name
            budget.description = data.get('description') or budget.description
            budget.start_date = data.get('startDate') or budget.start_date
            budget.end_date = data.get('endDate') or budget.end_date
            budget.initial_budget = data.get('initialBudget') if data.get('initialBudget') is not None else budget.initial_budget

            budget.save()

            return budget.as_dict(), 200
        
        return {'error': 'budget does not belong this user'}, 404

    def delete(self, user_id, budget_id):  # delete this single budget_id

        user_id = decode_request_jwt(request)

        if not user_id:
            return {'error': 'invalid JWT'}, 401
        
        user = User.get(user_id)

        if not user:
            return {'error': 'user does not exist'}, 404

        budget = Budget.get(budget_id)

        if Budget.exists(budget_id):
            if (budget.user_id == user_id):
                Budget.delete_one(budget_id)
                return {'result': 'success'}, 204

        return {'error': 'budget does not exist'}, 404
