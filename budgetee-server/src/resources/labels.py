from flask import request
from flask_restful import Resource, reqparse
from src.database.label import Label
from src.common.auth import decode_request_jwt

class LabelsAll(Resource):  # Sprint 2
    parser = reqparse.RequestParser(bundle_errors=True) # parse request values to check if they are ok
    parser.add_argument('name')
    parser.add_argument('user_id')

    def get(self, user_id): #return every label of this user

        labels = Label.get_by_user(user_id)
        
        return labels.as_dict()   

     


class LabelsDetail(Resource):  # Sprint 2
    parser = reqparse.RequestParser(bundle_errors=True) # parse request values to check if they are ok
    parser.add_argument('name')
    parser.add_argument('user_id')
    
    def get(self, label_id):  # get a single budget
        user_id = decode_request_jwt(request)
        
        if not user_id:
            return {'error': 'invalid JWT'}, 401
       
        label = Label.get(label_id)

        if not label:
            return {'error': 'budget not found'}, 404
        
        if (label.user_id != user_id):
            return {'error': 'access not allowed'}, 403
        
        return label.as_dict()

    def post(self):  # create a label
        data = LabelsDetail.parser.parse_args()     
        
        new_label = Label(
            name=data.get('name'),
            user_id=data.get('user_id')
        )
        
        new_label.save()

        return new_label.as_dict(), 201

    def put(self, label_id):  # edit this single label
        user_id = decode_request_jwt(request)

        if not user_id:
            return {'error': 'invalid JWT'}, 401
        
        label = Label.get(label_id)
        
        if not label:
            return {'error': 'Label not found'}, 404

        if (label.user_id != user_id):
            return {'error': 'access not allowed'}, 403

        data = LabelsDetail.parser.parse_args()  # get data received in the HTTP request body as JSON

        # TODO implement safer way to safe-change values
        label.name = data.get('name') or label.name        
        label.save()

        return label.as_dict(), 200

    def delete(self, user_id, label_id):  # delete this single label

        user_id = decode_request_jwt(request)

        if not user_id:
            return {'error': 'invalid JWT'}, 401

        label = Label.get(label_id)
        
        if not label:
            return {'error': 'label not found'}, 404

        if (label.user_id != user_id):
            return {'error': 'deletion not allowed'}, 403
            
        Label.delete_one(label_id)
        return {'result': 'success'}, 204

