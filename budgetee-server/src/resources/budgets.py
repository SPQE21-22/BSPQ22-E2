from flask import request
from flask_restful import Resource
from src.database.budget import Budget

class BudgetsAll(Resource): #Sprint 1
    def get(self): #get all the budgets
        budgets = Budget.all()
        budget_dicts = [budget.as_dict() for budget in budgets] # transform budget objects in dictionaries
        return budget_dicts

    def post(self): #create a budget
        if request.content_type != 'application/json':
            return {'error': 'only application/json is accepted'}, 400
        
        # TODO check received values:
        # - Start date is before end date
        # - Mandatory values are not empty (e.g. name)
        
        data = request.json # get data received in the HTTP request body as JSON
        new_budget = Budget(
            name=data.get('name'),
            description=data.get('description'),
            start_date=data.get('startDate'),
            end_date=data.get('endDate'),
            initial_budget=data.get('initialBudget')
        )
        new_budget.save()
        
        return new_budget.as_dict(), 201
        
class BudgetsDetail(Resource): #Sprint 1
    def get(self, budget_id): # get a single budget
        budget = Budget.get(budget_id)
        return budget.as_dict()

    def put(self, budget_id): # edit this single budget
        if request.content_type != 'application/json':
            return {'error': 'only application/json is accepted'}, 400
        
        # TODO perform same checks as in BudgetsAll.post()

        budget = Budget.get(budget_id)

        data = request.json # get data received in the HTTP request body as JSON
        
        budget.name = data.get('name')
        budget.description = data.get('description')
        budget.start_date = data.get('startDate')
        budget.end_date = data.get('endDate')
        budget.initial_budget = data.get('initialBudget')
        
        budget.save()

        return budget.as_dict(), 200

    def delete(self, budget_id): # delete this single budget_id
        if Budget.exists(budget_id):
            Budget.delete_one(budget_id)
            return {'result' : 'success'}, 204
        
        return {'error' : 'budget does not exist'}, 404