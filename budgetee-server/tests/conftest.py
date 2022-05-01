from dotenv import load_dotenv
import pytest
import jwt
from src.app import app
from src.config import app_secret_key
from src.database.user import User


@pytest.fixture(scope='session', autouse=True)
def load_env():
  load_dotenv(dotenv_path='../')


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
    
  jwt_token = jwt.encode({
    'user_id': str(user.id)
  }, app_secret_key, algorithm="HS256")
  
  if (type(jwt_token) == bytes):
    jwt_token = jwt_token.decode('utf-8')
    
  yield [user, jwt_token]


@pytest.fixture()
def extra_user(client):
  user = User(username="extrauser", name="extraname", email="email@extra.com", password="1234", birth_date="2000-01-01")
  user.save()

  jwt_token = jwt.encode({
    'user_id': str(user.id)
  }, app_secret_key, algorithm="HS256")
  
  if (type(jwt_token) == bytes):
    jwt_token = jwt_token.decode('utf-8')
  
  yield [user, jwt_token]