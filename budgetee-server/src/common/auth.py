from src.config import app_secret_key
import jwt

def decode_request_jwt(request):
    cookie_token: str = request.cookies.get('jwt_token')
    header_token: str = request.headers.get('Authorization')

    if cookie_token:
        token = cookie_token
    elif header_token and header_token.lower().startswith('bearer'):
        token = header_token[7:]
    else:
        return None

    try:
        decoded_token = jwt.decode(token, app_secret_key, algorithms=["HS256"])
        user_id = decoded_token.get('user_id')
        if not user_id:
            return None
        return user_id
    except jwt.InvalidSignatureError as err:
        print(err)
        return None