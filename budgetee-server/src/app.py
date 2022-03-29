from flask import Flask
from flask_restful import Api, Resource
from src.common.admin import create_admin
from src.database.db import init_db
from src.resources.budgets import BudgetsAll

app = Flask(__name__)
api = Api(app)

init_db()
create_admin(app)

@app.before_request
def middleware():
    """Executed once before every received request"""
    pass


"""Example API endpoint"""
class Ping(Resource):
    def get(self):
        return 'pong GET'

    def post(self):
        return 'pong POST'

    def put(self):
        return 'pong PUT'

    def delete(self):
        return 'pong DELETE'


# Define API endpoint routes
api.add_resource(Ping, '/')
api.add_resource(BudgetsAll, '/budgets')

if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)