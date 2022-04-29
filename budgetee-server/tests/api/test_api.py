def test_base(client):
  """Test if the root API endpoint runs correctly"""
  response = client.get('/')
  assert b'pong' in response.data


def test_data(test_user):
  """Test if the base user has been created properly"""
  user, token = test_user

  assert user.username == "testuser"