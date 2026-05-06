-- Create users table
create table if not exists users (
  id uuid primary key default auth.uid(),
  email text not null unique,
  name text not null,
  avatar_url text,
  level integer not null default 1,
  xp integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create task_posts table
create table if not exists task_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null,
  description text,
  type text not null,
  difficulty text not null,
  proof_image_url text,
  xp_gained integer not null default 0,
  likes_count integer not null default 0,
  dislikes_count integer not null default 0,
  comments_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create indexes for common queries
create index if not exists task_posts_user_id_idx on task_posts(user_id);
create index if not exists task_posts_created_at_idx on task_posts(created_at desc);

-- Enable Row Level Security
alter table users enable row level security;
alter table task_posts enable row level security;

-- RLS Policies for users table
create policy "Users can view all user profiles"
  on users for select
  using (true);

create policy "Users can update their own profile"
  on users for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on users for insert
  with check (auth.uid() = id);

-- RLS Policies for task_posts table
create policy "Anyone can view task posts"
  on task_posts for select
  using (true);

create policy "Users can insert their own task posts"
  on task_posts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own task posts"
  on task_posts for update
  using (auth.uid() = user_id);

create policy "Users can delete their own task posts"
  on task_posts for delete
  using (auth.uid() = user_id);

