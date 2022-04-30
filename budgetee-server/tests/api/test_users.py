from src.database.user import User

# /auth/self tests

# GET tests
def test_users_get_self(test_user, client):
    """A logged user can get their own data"""
    user, token = test_user

    response = client.get("/auth/self", headers={"Authorization": f"bearer {token}"})

    assert response.status_code == 200

    response_user = response.json
    assert response_user.get("username") == user.username
    assert response_user.get("email") == user.email
    assert response_user.get("password") is None  # password must not be sent


def test_users_get_no_token(client):
    """The status code is 401 for unlogged users"""
    client.cookie_jar.clear()
    response = client.get("/auth/self")

    assert response.status_code == 401


def test_users_get_deleted_user(test_user, client):
    """The status code is 404 for nonexistant users; this would only trigger if the user deletes their account, but still have their token"""
    user, token = test_user

    # manually delete the user
    User.delete_one(user.id)

    response = client.get("/auth/self", headers={"Authorization": f"bearer {token}"})

    assert response.status_code == 404


# PUT tests
def test_users_put_self(test_user, client):
    """A logged user can update their own data"""
    user, token = test_user

    response = client.put(
        "/auth/self",
        data={"username": "new username"},
        headers={"Authorization": f"bearer {token}"},
    )

    assert response.status_code == 200

    response_user = response.json
    assert response_user.get('username') == 'new username'

    updated_user = User.get(user.id)
    assert updated_user.username == 'new username'


def test_users_put_no_token(client):
    """The status code is 401 for unlogged users"""
    client.cookie_jar.clear()
    response = client.put("/auth/self")

    assert response.status_code == 401


def test_users_put_deleted_user(test_user, client):
    """The status code is 404 for nonexistant users; this would only trigger if the user deletes their account, but still have their token"""
    user, token = test_user

    # manually delete the user
    User.delete_one(user.id)

    response = client.put("/auth/self", headers={"Authorization": f"bearer {token}"})

    assert response.status_code == 404


# DELETE tests
def test_users_delete_self(test_user, client):
    user, token = test_user
    
    response = client.delete("/auth/self", headers={"Authorization": f"bearer {token}"})
    
    assert response.status_code == 204
    
    deleted_user = User.get(user.id)
    assert deleted_user is None


def test_users_delete_no_token(client):
    """The status code is 401 for unlogged users"""
    client.cookie_jar.clear()
    response = client.delete("/auth/self")

    assert response.status_code == 401


def test_users_delete_deleted_user(test_user, client):
    """The status code is 404 for nonexistant users; this would only trigger if the user deletes their account, but still have their token"""
    user, token = test_user

    # manually delete the user
    User.delete_one(user.id)

    response = client.delete("/auth/self", headers={"Authorization": f"bearer {token}"})

    assert response.status_code == 404