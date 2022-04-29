import json
import pytest
from src.database.budget import Budget
from src.database.record import Record
from src.database.user import User


@pytest.fixture()
def base_data(test_user):
  user, token = test_user
  
  Budget.query.delete() # delete all budgets
  Record.query.delete() # delete all records
  
  budget = Budget(  # create base budget
    name="test budget",
    description="test description",
    start_date="2022-01-01",
    end_date="2022-12-31",
    initial_budget=100,
    user_id=user.id
  )
  budget.save()
  
  record1 = Record(
    name="test record 1",
    category="entertainment",
    value=100,
    date="2022-06-01",
    extra_info="extra info 1",
    payment_type="card",
    place="test place",
    budget_id=budget.id
  )
  record2 = Record(
    name="test record 2",
    category="entertainment",
    value=200,
    date="2022-06-01",
    extra_info="extra info 2",
    payment_type="card",
    place="test place",
    budget_id=budget.id
  )
  record3 = Record(
    name="test record 3",
    category="entertainment",
    value=300,
    date="2022-06-01",
    extra_info="extra info 3",
    payment_type="card",
    place="test place",
    budget_id=budget.id
  )
  record1.save()
  record2.save()
  record3.save()
  
  yield [budget, [record1, record2, record3]]



# /record tests
# GET tests
def test_records_get(test_user, base_data, client):
  """Test if the records are properly received"""
  user, token = test_user
  budget, base_record_list = base_data
  
  response = client.get('/records', headers={
    'Authorization': f'bearer {token}'  # send access token with the petition
  })
  
  assert response.status_code == 200
  
  response_records = response.json
  assert len(response_records) == len(base_record_list)
  
  base_record = base_record_list[0].as_dict()
  assert base_record in response_records


def test_records_get_no_token(client):
  """Check that the response is forbidden when the token is not sent"""
  client.cookie_jar.clear() # clear cookies before sending the request
  response = client.get('/records')
  assert response.status_code == 401


# POST tests
def test_records_post(test_user, base_data, client):
  """Test that a new record can be created"""
  user, token = test_user
  budget, base_record_list = base_data
  
  response = client.post('/records', data={
    'name': 'new budget',
    'category': 'miscellaneous',
    'value': 400,
    'date': '2022-03-24',
    'extraInfo': 'new extra info',
    'paymentType': 'card',
    'place': 'new place',
    'budgetId': budget.id
  }, headers={
    'Authorization': f'bearer {token}'
  })

  assert response.status_code == 201
  
  all_records = Record.query.all()
  assert len(all_records) == len(base_record_list) + 1
  
  new_record = response.json
  assert new_record in [record.as_dict() for record in all_records]
  assert new_record.get('name') == 'new budget'
  
  new_record_str = json.dumps(new_record)
  assert new_record_str in [json.dumps(record.as_dict()) for record in all_records]


def test_records_nonexistent_budget(test_user, client):
  """Test that the status code is 404 when the budget doesn't exist"""
  user, token = test_user
  
  response = client.post('/records', data={
    'name': 'new budget',
    'category': 'miscellaneous',
    'value': 400,
    'date': '2022-03-24',
    'extraInfo': 'new extra info',
    'paymentType': 'card',
    'place': 'new place',
    'budgetId': 'a697d7cf-71b5-46cf-9d28-18be27383777'
  }, headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 404


def test_records_invalid_budget(test_user, client):
  """Test that the status code is 400 when the budget ID is not a valid UUID"""
  user, token = test_user
  
  response = client.post('/records', data={
    'name': 'new budget',
    'category': 'miscellaneous',
    'value': 400,
    'date': '2022-03-24',
    'extraInfo': 'new extra info',
    'paymentType': 'card',
    'place': 'new place',
    'budgetId': '400'
  }, headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 400



# /record/:record_id tests
# TODO test GET, PUT, DELETE methods, and check every possible error code

# GET tests
def test_record_get(test_user, base_data, client):
  """Test that a record can be obtained"""
  user, token = test_user
  budget, base_record_list = base_data
  
  base_record = base_record_list[0]
  
  response = client.get(f'/records/{str(base_record_list[0].id)}', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 200
  
  record = response.json
  assert json.dumps(record) == json.dumps(base_record.as_dict())


def test_record_get_no_token(client):
  """The response is forbidden when the token is not sent"""
  client.cookie_jar.clear() # clear cookies before sending the request
  response = client.get('/records/401')
  assert response.status_code == 401


def test_record_nonexistent(test_user, client):
  """The status code is 404 when the record does not exist"""
  user, token = test_user
  
  response = client.get('/records/22968743-5e64-481d-a5d7-8cb46df035e5', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 404


def test_record_invalid_uuid(test_user, client):
  """The status code is 400 when the record ID is not a valid UUID"""
  user, token = test_user
  
  response = client.get('/records/400', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 400


def test_record_get_not_owner(test_user, client):
  """The status code is 403 when the user doesn't own the record"""
  # TODO


# PUT tests
def test_record_put(test_user, base_data, client):
  """Test that a record can be edited"""
  user, token = test_user
  budget, base_record_list = base_data
  
  base_record = base_record_list[0]
  
  response = client.put(f'/records/{str(base_record_list[0].id)}', data={
    'name': 'updated name'
  } ,headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 200
  
  edited_record = response.json
  assert edited_record.get('name') == 'updated name'
  assert edited_record.get('value') == base_record.value


def test_record_get_no_token(client):
  """The response is forbidden when the token is not sent"""
  client.cookie_jar.clear() # clear cookies before sending the request
  response = client.put('/records/401')
  assert response.status_code == 401


def test_record_nonexistent(test_user, client):
  """The status code is 404 when the record does not exist"""
  user, token = test_user
  
  response = client.put('/records/22968743-5e64-481d-a5d7-8cb46df035e5', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 404


def test_record_invalid_uuid(test_user, client):
  """The status code is 400 when the record ID is not a valid UUID"""
  user, token = test_user
  
  response = client.put('/records/400', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 400


def test_record_put_not_owner(test_user, client):
  """The status code is 403 when the user doesn't own the record"""
  # TODO


# DELETE tests
def test_record_delete(test_user, base_data, client):
  user, token = test_user
  budget, base_record_list = base_data
  
  to_delete_record = base_record_list[0]
  
  response = client.delete(f'/records/{str(to_delete_record.id)}', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 204
  
  all_records = Record.query.all()
  assert len(all_records) == len(base_record_list) - 1
  assert json.dumps(to_delete_record.as_dict()) not in [json.dumps(record.as_dict()) for record in all_records]


def test_record_get_no_token(client):
  """The response is forbidden when the token is not sent"""
  client.cookie_jar.clear() # clear cookies before sending the request
  response = client.delete('/records/401')
  assert response.status_code == 401


def test_record_nonexistent(test_user, client):
  """The status code is 404 when the record does not exist"""
  user, token = test_user
  
  response = client.delete('/records/22968743-5e64-481d-a5d7-8cb46df035e5', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 404


def test_record_invalid_uuid(test_user, client):
  """The status code is 400 when the record ID is not a valid UUID"""
  user, token = test_user
  
  response = client.delete('/records/400', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 400


def test_record_delete_not_owner(test_user, client):
  """The status code is 403 when the user doesn't own the record"""
  # TODO