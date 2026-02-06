from google.oauth2 import id_token
from google.auth.transport import requests
from typing import Optional, Dict

GOOGLE_CLIENT_ID = "477138754514-3qdjvqvgkcnffrfjcbok00ttrnpcefi4.apps.googleusercontent.com"

def verify_google_token(id_token_str: str) -> Optional[Dict]:
    try:
        payload = id_token.verify_oauth2_token(id_token_str, requests.Request(), GOOGLE_CLIENT_ID)
        return {
            "email": payload.get("email"),
            "name": payload.get("name"),
            "google_id": payload.get("sub"),
            "avatar": payload.get("picture")
        }
    except ValueError as e:
        print("Invalid token:", e)
        return None
