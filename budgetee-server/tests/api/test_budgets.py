import pytest
from src.database.budget import Budget


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