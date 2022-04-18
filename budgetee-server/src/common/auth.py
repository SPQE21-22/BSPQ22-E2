from src.config import app_secret_key
import jwt

def decode_request_jwt(request):
    cookie_token: str = request.cookies.get('jwt_token')

    if not cookie_token:
        return None

    try:
        decoded_token = jwt.decode(cookie_token, app_secret_key, algorithms=["HS256"])
        user_id = decoded_token.get('user_id')
        if not user_id:
            return None
        return user_id
    except jwt.InvalidSignatureError as err:
        print(err)
        return None