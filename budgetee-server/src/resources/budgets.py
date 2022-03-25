from flask import request
from flask_restful import Resource
#from common.utils import get_user_from_token
from database import Budget

class BudgetsAll(Resource): #Sprint 1
    def get(self): #get all the budgets
        budgets = Budget.all()
        budget_dicts = [budget.as_dict() for budget in budgets]
        return budget_dicts

    def post(self): #create a budget
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
        
class BudgetsDetail(Resource): #Sprint 1
    def get(self, budget_id): #get a single budget
        budget = Budget.get(budget_id)
        return budget.as_dict()

    def put(self, budget_id, budget): #edit this single budget
        if request.content_type != 'application/json':
            return {'error': 'only application/json is accepted'}, 400

        budget = Budget.get(budget_id)

        data = request.json
        budget.name = data['name']
        budget.description = data['description']
        budget.start_date = data['start_date']
        budget.end_date = data['end_date']
        budget.records = data['records']
        budget.warnings = data['warnings']
        budget.save()

        return budget.as_dict(), 200

    def delete(self, budget_id): #delete this single budget_id
        if(Budget.exists(budget_id)):
            budget = Budget.get(budget_id)
            Budget.delete_one(budget)
            return{'result' : 'success'}, 204
        
        return{'error' : 'it is denied to complete this action'}, 403
           
        
        

