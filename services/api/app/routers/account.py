from typing import Annotated

from fastapi import APIRouter, Depends

from app.dependencies.tenant import TenantContext, get_tenant_context

router = APIRouter(prefix="/account", tags=["account"])


@router.get("/context", response_model=TenantContext)
async def account_context(
    tenant: Annotated[TenantContext, Depends(get_tenant_context)],
) -> TenantContext:
    return tenant
