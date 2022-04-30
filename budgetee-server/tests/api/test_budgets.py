import pytest
from src.database.budget import Budget
import json
import pytest
from src.database.budget import Budget
from src.database.budget import budget


@pytest.fixture()
def base_data(test_user):
  user, token = test_user # get user object and token
  
  Budget.query.delete() # delete all budgets
  budget1 = Budget(
    name="test budget 1",
    description="test description 1",
    start_date="2022-01-01",
    end_date="2022-12-31",
    initial_budget=100,
    user_id=user.id
  )
  budget2 = Budget(
    name="test budget 2",
    description="test description 2",
    start_date="2022-01-01",
    end_date="2022-12-31",
    initial_budget=200,
    user_id=user.id
  )
  budget3 = Budget(
    name="test budget 3",
    description="test description 3",
    start_date="2022-01-01",
    end_date="2022-12-31",
    initial_budget=300,
    user_id=user.id
  )
  budget1.save()
  budget2.save()
  budget3.save()
  
  yield [budget1, budget2, budget3]



# /budgets tests
# TODO test GET, POST, PUT, DELETE methods, and check every possible error code

# GET tests
def test_budgets_get(test_user, base_data, client):
  user, token = test_user
  
  response = client.get('/budgets', headers={
    "Authorization": f"bearer {token}"  # send access token with the petition
  })
  
  assert len(response.json) == len(base_data)     # check that the received number of items is the original one
  assert base_data[0].as_dict() in response.json  # check that one of the base data is present in the request result

def test_budgets_get_no_token(base_data, client):
  """Check that the response is forbidden when the token is not sent"""
  client.cookie_jar.clear() # clear cookies before sending the request
  response = client.get('/budgets')
  assert response.status_code == 401


#POST tests
def test_budgets_post(base_data, client):
  """Test that a new budget can be created"""
  user, token, budget, base_budget_list = base_data
  
  response = client.post('/budgets', data={
    'name': 'new budget',
    'description': 'miscellaneous',
    'startDate': '2022-03-24',
    'endDate': '2022-05-24',
    'initialBudget': 400,
    'userId': user.id
  }, headers={
    'Authorization': f'bearer {token}'
  })

  assert response.status_code == 201
  
  all_budgets = Budget.query.all()
  assert len(all_budgets) == len(base_budget_list) + 1
  
  new_budget = response.json
  assert new_budget in [budget.as_dict() for budget in all_budgets]
  assert new_budget.get('name') == 'new budget'
  
  new_budget_str = json.dumps(new_budget)
  assert new_budget_str in [json.dumps(budget.as_dict()) for budget in all_budgets]

def test_budgets_post_no_token(base_data, client):
  """Check that the response is forbidden when the token is not sent"""
  client.cookie_jar.clear() # clear cookies before sending the request
  response = client.get('/budgets')
  assert response.status_code == 401

# /budget/:budget_id tests
# TODO test GET, PUT, DELETE methods, and check every possible error code

# GET tests
def test_budget_get(base_data, client):
  """Test that a budget can be obtained"""
  user, token, budget, base_budget_list = base_data
  
  base_budget = base_budget_list[0]
  
  response = client.get(f'/budgets/{str(base_budget_list[0].id)}', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 200
  
  budget = response.json
  assert json.dumps(budget) == json.dumps(base_budget.as_dict())


def test_budget_get_no_token(client):
  """The response is forbidden when the token is not sent"""
  client.cookie_jar.clear() # clear cookies before sending the request
  response = client.get('/budgets/401')
  assert response.status_code == 401
  assert 'invalid JWT' in json.dumps(response.json)


def test_budget_get_nonexistent(base_data, client):
  """The status code is 404 when the budget does not exist"""
  user, token, budget, base_budget_list = base_data
  
  response = client.get('/budgets/22968743-5e64-481d-a5d7-8cb46df035e5', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 404


def test_budget_get_invalid_uuid(base_data, client):
  """The status code is 400 when the budget ID is not a valid UUID"""
  user, token, budget, base_budget_list = base_data
  
  response = client.get('/budgets/400', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 400


def test_budget_get_not_owner(base_data, extra_user, client):
  """The status code is 403 when the user doesn't own the budget"""
  user, token, budget, base_budget_list = base_data
  user_extra, token_extra = extra_user
    
  # create a budget owned by another user
  external_budget = Budget(
    name="external budget",
    description="external description",
    start_date="2022-01-01",
    end_date="2022-12-31",
    initial_budget=100,
    user_id=user_extra.id
  )
  external_budget.save()
  
  external_budget = budget(
    name="external budget 1",
    category="entertainment",
    value=100,
    date="2022-06-01",
    extra_info="external info 1",
    payment_type="card",
    place="external place",
    budget_id=external_budget.id
  )
  external_budget.save()
  
  client.cookie_jar.clear()
  response = client.get(f'/budgets/{str(external_budget.id)}', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 403
  


# PUT tests
def test_budget_put(base_data, client):
  """Test that a budget can be edited"""
  user, token, budget, base_budget_list = base_data
  
  base_budget = base_budget_list[0]
  
  response = client.put(f'/budgets/{str(base_budget_list[0].id)}', data={
    'name': 'updated name'
  }, headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 200
  
  edited_budget = response.json
  assert edited_budget.get('name') == 'updated name'
  assert edited_budget.get('initialBudget') == base_budget.initialBudget


def test_budget_put_no_token(client):
  """The response is forbidden when the token is not sent"""
  client.cookie_jar.clear() # clear cookies before sending the request
  response = client.put('/budgets/401')
  assert response.status_code == 401


def test_budget_put_nonexistent(base_data, client):
  """The status code is 404 when the budget does not exist"""
  user, token, budget, base_budget_list = base_data
  
  response = client.put('/budgets/22968743-5e64-481d-a5d7-8cb46df035e5', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 404


def test_budget_put_invalid_uuid(base_data, client):
  """The status code is 400 when the budget ID is not a valid UUID"""
  user, token, budget, base_budget_list = base_data
  
  response = client.put('/budgets/400', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 400


def test_budget_put_not_owner(base_data, extra_user, client):
  """The status code is 403 when the user doesn't own the budget"""
  user, token, budget, base_budget_list = base_data
  user_extra, token_extra = extra_user
    
  # create a budget owned by another user
  external_budget = Budget(
    name="external budget",
    description="external description",
    start_date="2022-01-01",
    end_date="2022-12-31",
    initial_budget=100,
    user_id=user_extra.id
  )
  external_budget.save()
  
  external_budget = budget(
    name="external budget 1",
    category="entertainment",
    value=100,
    date="2022-06-01",
    extra_info="external info 1",
    payment_type="card",
    place="external place",
    budget_id=external_budget.id
  )
  external_budget.save()
  
  client.cookie_jar.clear()
  response = client.put(f'/budgets/{str(external_budget.id)}', data={
    'name': 'external name'
  }, headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 403


# DELETE tests
def test_budget_delete(base_data, client):
  user, token, budget, base_budget_list = base_data
  
  to_delete_budget = base_budget_list[0]
  
  response = client.delete(f'/budgets/{str(to_delete_budget.id)}', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 204
  
  all_budgets = budget.query.all()
  assert len(all_budgets) == len(base_budget_list) - 1
  assert json.dumps(to_delete_budget.as_dict()) not in [json.dumps(budget.as_dict()) for budget in all_budgets]


def test_budget_delete_no_token(client):
  """The response is forbidden when the token is not sent"""
  client.cookie_jar.clear() # clear cookies before sending the request
  response = client.delete('/budgets/401')
  assert response.status_code == 401


def test_budget__delete_nonexistent(base_data, client):
  """The status code is 404 when the budget does not exist"""
  user, token, budget, base_budget_list = base_data
  
  response = client.delete('/budgets/22968743-5e64-481d-a5d7-8cb46df035e5', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 404


def test_budget_delete_invalid_uuid(base_data, client):
  """The status code is 400 when the budget ID is not a valid UUID"""
  user, token, budget, base_budget_list = base_data
  
  response = client.delete('/budgets/400', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 400


def test_budget_delete_not_owner(base_data, extra_user, client):
  """The status code is 403 when the user doesn't own the budget"""
  user, token, budget, base_budget_list = base_data
  user_extra, token_extra = extra_user
    
  # create a budget owned by another user
  external_budget = Budget(
    name="external budget",
    description="external description",
    start_date="2022-01-01",
    end_date="2022-12-31",
    initial_budget=100,
    user_id=user_extra.id
  )
  external_budget.save()
  
  external_budget = budget(
    name="external budget 1",
    category="entertainment",
    value=100,
    date="2022-06-01",
    extra_info="external info 1",
    payment_type="card",
    place="external place",
    budget_id=external_budget.id
  )
  external_budget.save()
  
  client.cookie_jar.clear()
  response = client.delete(f'/budgets/{str(external_budget.id)}', headers={
    'Authorization': f'bearer {token}'
  })
  
  assert response.status_code == 403