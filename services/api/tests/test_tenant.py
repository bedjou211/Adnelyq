from typing import Any
from uuid import uuid4

import pytest
from fastapi import HTTPException

from app.dependencies.tenant import get_tenant_context


class FakeResult:
    def __init__(self, role: str | None) -> None:
        self.role = role

    def scalar_one_or_none(self) -> str | None:
        return self.role


class FakeSession:
    def __init__(self, role: str | None) -> None:
        self.role = role
        self.parameters: dict[str, Any] = {}

    async def execute(self, _statement: Any, parameters: dict[str, Any]) -> FakeResult:
        self.parameters = parameters
        return FakeResult(self.role)


@pytest.mark.asyncio
async def test_member_can_open_own_organization() -> None:
    user_id = uuid4()
    organization_id = uuid4()
    session = FakeSession("OWNER")

    context = await get_tenant_context(organization_id, {"sub": str(user_id)}, session)  # type: ignore[arg-type]

    assert context.organization_id == organization_id
    assert session.parameters == {"organization_id": organization_id, "user_id": user_id}


@pytest.mark.asyncio
async def test_member_cannot_open_another_organization() -> None:
    session = FakeSession(None)

    with pytest.raises(HTTPException) as error:
        await get_tenant_context(uuid4(), {"sub": str(uuid4())}, session)  # type: ignore[arg-type]

    assert error.value.status_code == 403
