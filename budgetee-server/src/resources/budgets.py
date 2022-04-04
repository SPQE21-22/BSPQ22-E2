from flask import request
from flask_restful import Resource, reqparse
from src.database.budget import Budget


class BudgetsAll(Resource):  # Sprint 1
    parser = reqparse.RequestParser(bundle_errors=True) # parse request values to check if they are ok
    parser.add_argument('name', required=True, help='parameter required')
    parser.add_argument('description')
    parser.add_argument('startDate', required=True, help='parameter required')
    parser.add_argument('endDate', required=True, help='parameter required')
    parser.add_argument('initialBudget', type=int, help='Initial budget cannot be converted')
    
    def get(self):  # get all the budgets
        budgets = Budget.all()
        budget_dicts = [budget.as_dict() for budget in budgets] # transform budget objects in dictionaries
        return budget_dicts

    def post(self):  # create a budget
        # TODO revise, is this is necessary or does the parser do the work?
        if request.content_type != 'application/json':
            return {'error': 'only application/json is accepted'}, 400

        # TODO check received values:
        # - Start date is before end date, they both have the correct format

        # get data received in the HTTP request body as JSON
        data = BudgetsAll.parser.parse_args()
        new_budget = Budget(
            name=data.get('name'),
            description=data.get('description'),
            start_date=data.get('startDate'),
            end_date=data.get('endDate'),
            initial_budget=data.get('initialBudget')
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
    
    def get(self, budget_id):  # get a single budget
        budget = Budget.get(budget_id)
        return budget.as_dict()

    def put(self, budget_id):  # edit this single budget
        if request.content_type != 'application/json':
            return {'error': 'only application/json is accepted'}, 400

        budget = Budget.get(budget_id)

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
        if Budget.exists(budget_id):
            Budget.delete_one(budget_id)
            return {'result': 'success'}, 204

        return {'error': 'budget does not exist'}, 404
