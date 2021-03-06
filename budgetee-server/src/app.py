from flask import Flask
from flask_cors import CORS
from flask_restful import Api, Resource
from src.common.admin import create_admin
from src.config import app_secret_key
from src.database.db import init_db, db_session
from src.resources.budgets import BudgetsAll, BudgetsDetail
from src.resources.records import RecordsAll, RecordsDetail
from src.resources.labels import LabelsAll, LabelsDetail
from src.resources.auth import Login, Logout, Register
from src.resources.users import UsersSelf
import flask_profiler

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = app_secret_key
api = Api(app)

app.config["DEBUG"] = True
app.config['flask_profiler'] = {
    "enabled": app.config["DEBUG"],
    "storage": {
        "engine": "sqlalchemy",
    },
}

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
        return 'pong'


# Define API endpoint routes
api.add_resource(Ping, '/')

api.add_resource(BudgetsAll, '/budgets')
api.add_resource(BudgetsDetail, '/budgets/<string:budget_id>')

api.add_resource(RecordsAll, '/records')
api.add_resource(RecordsDetail, '/records/<string:record_id>')

api.add_resource(LabelsAll, '/labels/')
api.add_resource(LabelsDetail, '/labels/<string:label_id>')

api.add_resource(Login,'/auth/login' )
api.add_resource(Logout, '/auth/logout')
api.add_resource(Register,'/auth/register')

api.add_resource(UsersSelf,'/auth/self' )


flask_profiler.init_app(app)


if __name__ == '__main__':
    app.run(host='0.0.0.0')