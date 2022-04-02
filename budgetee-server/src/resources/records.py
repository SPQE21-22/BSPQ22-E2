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
            place = data.get('place')
        )
        
        return ''

class RecordsDetail(Resource): #Sprint 1
    def get(self, budget_id, record_id): #get a single record in a budget
        record = Record.get(record_id)
        return record.as_dict()

    def put(self, budget_id, record_id): #edit a single record in a budget
        if request.content_type != 'application/json':
            return {'error': 'only application/json is accepted'}, 400
        
        record = Record.get(record_id)

        data = request.json
        record.category = data['category']
        record.label = data['label']
        record.value = data['value']
        record.dateTime = data['dateTime']
        record.extraInfo = data['extraInfo']
        record.paymentType = data['paymentType']
        record.place = data['place']
        record.save()

        return record.as_dict(), 200

    def delete(self, budget_id, record_id): #delete a single record in a budget
        if(Record.exists(record_id)): #if the record exists
            record = Record.get(record_id)
            Record.delete_one(record)
            return {'result' : 'success'}, 204
        
        return{'error' : 'it is denied to complete this action'}, 403