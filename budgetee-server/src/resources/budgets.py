from flask import request
from flask_restful import Resource
from common.utils import get_user_from_token
from database import Budget

class BudgetsAll(Resource):
    def get(self): 
        budgets = Budget.all()
        budget_dicts = [budgets.as_dict() for budget in budgets]
        return budget_dicts

    def post(self):
        if request.content_type != 'application/json':
            return {'error': 'only application/json is accepted'}, 400        
        data = request.json
        new_budget = Budget(
            name=data.get('name'),
            description=data.get('description'),
            start_date=data.get('start_date'),
            end_date=data.get('end_date'),
        )
        new_budget.save()
        return new_budget.as_dict(), 201
        
class BudgetsDetail(Resource):
    def get(self, budget_id):
        return Budget.get(budget_id)

    #def put(self, budget_id, budget):

    #def delete(self, budget_id):

