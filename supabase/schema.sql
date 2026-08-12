-- Folio schema: categories, expenses, budgets
-- Each row is owned by a single auth.users row (user_id) and Row Level
-- Security ensures a user can only ever see/modify their own rows.

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  color text not null,
  created_at timestamptz not null default now()
);

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id uuid references categories(id) on delete set null,
  title text not null,
  amount numeric(10, 2) not null,
  date date not null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id uuid references categories(id) on delete cascade,
  "limit" numeric(10, 2) not null,
  month text not null,
  created_at timestamptz not null default now()
);

alter table categories enable row level security;
alter table expenses enable row level security;
alter table budgets enable row level security;

create policy "Users manage own categories" on categories
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own expenses" on expenses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage own budgets" on budgets
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists expenses_user_id_idx on expenses(user_id);
create index if not exists categories_user_id_idx on categories(user_id);
create index if not exists budgets_user_id_idx on budgets(user_id);
