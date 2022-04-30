import pytest
from src.app import app
from src.database.user import User

@pytest.fixture()
def app_fixture():
  app_obj = app
  yield app_obj


@pytest.fixture()
def client(app_fixture):
  return app_fixture.test_client()


@pytest.fixture()
def runner(app_fixture):
  return app_fixture.test_cli_runner()


@pytest.fixture()
def test_user(client):
  User.query.delete()
  user = User(username="testuser", name="testname", email="email@test.com", password="1234", birth_date="2000-01-01")
  user.save()
    
  response = client.post('/auth/login', data={
    "email": "email@test.com",
    "password": "1234"
  })
  
  jwt_token: str = response.headers.getlist('Set-Cookie')[0].split(';')[0].split('=')[1]
  
  yield [user, jwt_token]


@pytest.fixture()
def extra_user(client):
  user = User(username="extrauser", name="extraname", email="email@extra.com", password="1234", birth_date="2000-01-01")
  user.save()
    
  response = client.post('/auth/login', data={
    "email": "email@extra.com",
    "password": "1234"
  })
  
  jwt_token: str = response.headers.getlist('Set-Cookie')[0].split(';')[0].split('=')[1]
  
  yield [user, jwt_token]