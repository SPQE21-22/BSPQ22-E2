from flask import Flask
from flask_restful import Api, Resource
from src.common.admin import create_admin
from src.config import app_secret_key
from src.database.db import init_db, db_session
from src.resources.budgets import BudgetsAll, BudgetsDetail
from src.resources.records import RecordsAll, RecordsDetail

from src.database.budget import Budget

app = Flask(__name__)
app.secret_key = app_secret_key
api = Api(app)

init_db()
create_admin(app)

@app.before_request
def middleware():
    """Executed once before every received request"""
    pass

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()


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
api.add_resource(BudgetsDetail, '/budgets/<string:budget_id>')
api.add_resource(RecordsAll, '/records')
api.add_resource(RecordsDetail, '/records/<int:record_id>')

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)