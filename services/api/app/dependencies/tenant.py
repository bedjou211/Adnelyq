from typing import Annotated, Any
from uuid import UUID

from fastapi import Depends, Header, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import get_current_claims
from app.db.session import get_db


class TenantContext(BaseModel):
    user_id: UUID
    organization_id: UUID
    role: str


async def get_tenant_context(
    organization_id: Annotated[UUID, Header(alias="X-Organization-Id")],
    claims: Annotated[dict[str, Any], Depends(get_current_claims)],
    session: Annotated[AsyncSession, Depends(get_db)],
) -> TenantContext:
    try:
        user_id = UUID(str(claims["sub"]))
    except (KeyError, TypeError, ValueError) as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token is missing a valid subject",
        ) from exc

    membership = await session.execute(
        text(
            """
            select role::text
            from public.organization_members
            where organization_id = :organization_id and user_id = :user_id
            """
        ),
        {"organization_id": organization_id, "user_id": user_id},
    )
    role = membership.scalar_one_or_none()
    if role is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not belong to this organization",
        )

    return TenantContext(user_id=user_id, organization_id=organization_id, role=role)
