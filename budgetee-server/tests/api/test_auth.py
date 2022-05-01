import pytest
import jwt
from src.config import app_secret_key
from src.database.user import User


@pytest.fixture()
def base_user():
    """Base user"""
    User.query.delete()
    user = User(
        username="testuser",
        name="testname",
        email="test@user.com",
        password="1234",
        birth_date="2000-01-01",
    )
    user.save()

    yield user


# /auth/register tests
def test_register(client):
    User.query.delete()
    response = client.post(
        "/auth/register",
        json={
            "username": "testuser",
            "name": "testname",
            "email": "test@user.com",
            "password": "1234",
            "birthDate": "2000-01-01",
        },
    )

    assert response.status_code == 201

    created_user = User.get_by_email("test@user.com")
    assert created_user.username == "testuser"

    jwt_token = response.headers.getlist("Set-Cookie")[0].split(";")[0].split("=")[1]
    assert jwt_token is not None

    decoded_user_id = jwt.decode(jwt_token, app_secret_key, algorithms=["HS256"]).get(
        "user_id"
    )
    assert decoded_user_id == str(created_user.id)


def test_register_registered_email(base_user, client):
    response = client.post(
        "/auth/register",
        json={
            "username": "testuser",
            "name": "testname",
            "email": base_user.email,
            "password": "1234",
            "birthDate": "2000-01-01",
        },
    )

    assert response.status_code == 409


# /auth/login tests
def test_login(base_user, client):
    response = client.post(
        "/auth/login",
        json={
            "email": base_user.email,
            "password": base_user.password,
        },
    )

    assert response.status_code == 200

    jwt_token = response.headers.getlist("Set-Cookie")[0].split(";")[0].split("=")[1]
    assert jwt_token is not None

    decoded_user_id = jwt.decode(jwt_token, app_secret_key, algorithms=["HS256"]).get(
        "user_id"
    )
    assert decoded_user_id == str(base_user.id)


def test_login_no_user(client):
    User.query.delete()
    response = client.post(
        "auth/login", json={"email": "wrong@email.com", "password": "1234"}
    )
    
    assert response.status_code == 404


def test_login_wrong_password(base_user, client):
    response = client.post(
        '/auth/login',
        json={
            "email": base_user.email,
            "password": '4321',
        }
    )
    
    assert response.status_code == 401


# /auth/logout tests
def test_logout(client):
    response = client.post('/auth/logout')
    
    expired_token = response.headers.getlist('Set-Cookie')[0]
    assert '01 Jan 1970 00:00:00 GMT' in expired_token