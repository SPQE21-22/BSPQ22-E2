import pytest
from src.database.budget import Budget
from src.database.record import Record


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
  
  yield [record1, record2, record3]



# /record tests
# TODO test GET, POST, PUT, DELETE methods, and check every possible error code

# GET tests
def test_records_get(test_user, base_data, client):
  user, token = test_user
  
  response = client.get('/records', headers={
    "Authorization": f"bearer {token}"  # send access token with the petition
  })
  
  # ...