from datetime import datetime, timedelta, timezone
from uuid import uuid4

import jwt
import pytest
from fastapi import HTTPException

from app.core.config import Settings
from app.core.security import decode_access_token


def test_decode_access_token() -> None:
    secret = "test-secret-that-is-long-enough-for-hs256-signing"
    subject = str(uuid4())
    token = jwt.encode(
        {
            "sub": subject,
            "aud": "authenticated",
            "exp": datetime.now(timezone.utc) + timedelta(minutes=5),
        },
        secret,
        algorithm="HS256",
    )

    claims = decode_access_token(token, Settings(supabase_jwt_secret=secret))

    assert claims["sub"] == subject


def test_expired_access_token_is_rejected() -> None:
    secret = "test-secret-that-is-long-enough-for-hs256-signing"
    token = jwt.encode(
        {
            "sub": str(uuid4()),
            "aud": "authenticated",
            "exp": datetime.now(timezone.utc) - timedelta(minutes=1),
        },
        secret,
        algorithm="HS256",
    )

    with pytest.raises(HTTPException) as error:
        decode_access_token(token, Settings(supabase_jwt_secret=secret))

    assert error.value.status_code == 401
