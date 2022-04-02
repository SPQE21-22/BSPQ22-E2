from flask import request
from flask_restful import Resource
from src.database.budget import Budget
from src.database.record import Record

class RecordsAll(Resource): #Sprint 1
    def get(self): #get all the records in a budget
        records = Record.all()
        return [record.as_dict() for record in records]

    def post(self): #create a record in a budget
        if request.content_type != 'application/json':
            return {'error': 'only application/json is accepted'}, 400         

        data = request.json
        new_record = Record(
            name = data.get('name'),
            category = data.get('category'),
            value = data.get('value'),
            date = data.get('date'),
            extraInfo = data.get('extraInfo'),
            paymentType = data.get('paymentType'),
            place = data.get('place'),
            budgetId = data.get('budgetId')
        )
        new_record.save()

        return new_record.as_dict() , 201

class RecordsDetail(Resource): #Sprint 1
    def get(self, record_id): #get a single record in a budget
        record = Record.get(record_id)
        return record.as_dict()

    def put(self, record_id): #edit a single record in a budget
        if request.content_type != 'application/json':
            return {'error': 'only application/json is accepted'}, 400
        
        record = Record.get(record_id)

        data = request.json
        
        record.name = data.get('name')
        record.category = data.get('category')
        record.value = data.get('value')
        record.date = data.get('date')
        record.extraInfo = data.get('extraInfo')
        record.paymentType = data.get('paymentType')
        record.place = data.get('place')
        record.budget_id = data.get('budgetId')
        
        record.save()

        return record.as_dict(), 201

    def delete(self, record_id): #delete a single record in a budget
        if Record.exists(record_id): #if the record exists
            Record.delete_one(record_id)
            return {'result' : 'success'}, 204
        
        return {'error' : 'budget does not exist'}, 404