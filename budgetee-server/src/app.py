from flask import Flask
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

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

if __name__ == '__main__':
    app.run(debug=True)