create extension if not exists pgcrypto;

create type public.organization_role as enum (
  'OWNER',
  'ADMIN',
  'MARKETING',
  'SUPPORT',
  'VIEWER'
);

create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  role public.organization_role not null default 'VIEWER',
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create index organization_members_user_id_idx
  on public.organization_members (user_id, organization_id);

create table public.stores (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  name text not null check (char_length(name) between 2 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  currency text not null default 'DZD' check (currency ~ '^[A-Z]{3}$'),
  status text not null default 'DRAFT' check (status in ('DRAFT', 'ACTIVE', 'PAUSED')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, organization_id)
);

create index stores_organization_id_idx on public.stores (organization_id);

create table public.store_settings (
  store_id uuid primary key,
  organization_id uuid not null references public.organizations (id) on delete cascade,
  country text not null default 'DZ' check (country ~ '^[A-Z]{2}$'),
  timezone text not null default 'Africa/Algiers',
  locale text not null default 'fr' check (locale in ('fr', 'ar', 'en')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (store_id, organization_id)
    references public.stores (id, organization_id)
    on delete cascade
);

create index store_settings_organization_id_idx
  on public.store_settings (organization_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger users_set_updated_at
before update on public.users
for each row execute function public.set_updated_at();

create trigger organizations_set_updated_at
before update on public.organizations
for each row execute function public.set_updated_at();

create trigger stores_set_updated_at
before update on public.stores
for each row execute function public.set_updated_at();

create trigger store_settings_set_updated_at
before update on public.store_settings
for each row execute function public.set_updated_at();

create or replace function public.is_organization_member(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_members
    where organization_id = target_organization_id
      and user_id = auth.uid()
  );
$$;

create or replace function public.can_manage_organization(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_members
    where organization_id = target_organization_id
      and user_id = auth.uid()
      and role in ('OWNER', 'ADMIN')
  );
$$;

revoke all on function public.is_organization_member(uuid) from public;
revoke all on function public.can_manage_organization(uuid) from public;
grant execute on function public.is_organization_member(uuid) to authenticated;
grant execute on function public.can_manage_organization(uuid) to authenticated;

alter table public.users enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.stores enable row level security;
alter table public.store_settings enable row level security;

create policy "users can read their own profile"
on public.users for select
to authenticated
using (id = auth.uid());

create policy "users can update their own profile"
on public.users for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "members can read organizations"
on public.organizations for select
to authenticated
using (public.is_organization_member(id));

create policy "admins can update organizations"
on public.organizations for update
to authenticated
using (public.can_manage_organization(id))
with check (public.can_manage_organization(id));

create policy "members can read organization memberships"
on public.organization_members for select
to authenticated
using (public.is_organization_member(organization_id));

create policy "admins can add organization memberships"
on public.organization_members for insert
to authenticated
with check (public.can_manage_organization(organization_id));

create policy "admins can update organization memberships"
on public.organization_members for update
to authenticated
using (public.can_manage_organization(organization_id))
with check (public.can_manage_organization(organization_id));

create policy "admins can remove organization memberships"
on public.organization_members for delete
to authenticated
using (
  public.can_manage_organization(organization_id)
  and user_id <> auth.uid()
);

create policy "members can read stores"
on public.stores for select
to authenticated
using (public.is_organization_member(organization_id));

create policy "admins can create stores"
on public.stores for insert
to authenticated
with check (public.can_manage_organization(organization_id));

create policy "admins can update stores"
on public.stores for update
to authenticated
using (public.can_manage_organization(organization_id))
with check (public.can_manage_organization(organization_id));

create policy "admins can delete stores"
on public.stores for delete
to authenticated
using (public.can_manage_organization(organization_id));

create policy "members can read store settings"
on public.store_settings for select
to authenticated
using (public.is_organization_member(organization_id));

create policy "admins can create store settings"
on public.store_settings for insert
to authenticated
with check (
  public.can_manage_organization(organization_id)
  and exists (
    select 1 from public.stores
    where stores.id = store_settings.store_id
      and stores.organization_id = store_settings.organization_id
  )
);

create policy "admins can update store settings"
on public.store_settings for update
to authenticated
using (public.can_manage_organization(organization_id))
with check (public.can_manage_organization(organization_id));

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_organization_id uuid;
  requested_name text;
  generated_slug text;
begin
  requested_name := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'business_name'), ''),
    'Nouvelle organisation'
  );

  generated_slug := trim(both '-' from regexp_replace(lower(requested_name), '[^a-z0-9]+', '-', 'g'));
  if generated_slug = '' then
    generated_slug := 'organisation';
  end if;
  generated_slug := generated_slug || '-' || substring(new.id::text, 1, 8);

  insert into public.users (id, email, full_name)
  values (
    new.id,
    coalesce(new.email, ''),
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), '')
  );

  insert into public.organizations (name, slug)
  values (requested_name, generated_slug)
  returning id into new_organization_id;

  insert into public.organization_members (organization_id, user_id, role)
  values (new_organization_id, new.id, 'OWNER');

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

create or replace function public.complete_merchant_onboarding(
  business_name text,
  store_name text,
  store_slug text,
  country_code text,
  currency_code text,
  timezone_name text,
  locale_code text
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  target_organization_id uuid;
  new_store_id uuid;
begin
  select organization_id
  into target_organization_id
  from public.organization_members
  where user_id = auth.uid()
  order by created_at
  limit 1;

  if target_organization_id is null
    or not public.can_manage_organization(target_organization_id) then
    raise exception 'No manageable organization found';
  end if;

  update public.organizations
  set name = business_name,
      onboarding_completed_at = now()
  where id = target_organization_id;

  insert into public.stores (organization_id, name, slug, currency)
  values (
    target_organization_id,
    store_name,
    store_slug,
    upper(currency_code)
  )
  returning id into new_store_id;

  insert into public.store_settings (
    store_id,
    organization_id,
    country,
    timezone,
    locale
  )
  values (
    new_store_id,
    target_organization_id,
    upper(country_code),
    timezone_name,
    locale_code
  );

  return new_store_id;
end;
$$;

revoke all on function public.complete_merchant_onboarding(text, text, text, text, text, text, text) from public;
grant execute on function public.complete_merchant_onboarding(text, text, text, text, text, text, text) to authenticated;
