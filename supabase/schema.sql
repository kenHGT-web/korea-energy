-- Run in Supabase SQL Editor. Scores are writable only by the service_role through Edge Function.
create table if not exists public.leaderboard (
 user_id uuid not null references auth.users(id) on delete cascade,
 nickname text not null check(length(nickname) between 3 and 20),
 game text not null check(game in ('power','electrician','reactor')),
 best_score int not null check(best_score between 0 and 10000),
 updated_at timestamptz not null default now(),
 primary key(user_id,game)
);
create index if not exists leaderboard_sort_idx on public.leaderboard(game,best_score desc);
alter table public.leaderboard enable row level security;
revoke all on public.leaderboard from anon,authenticated;
grant select on public.leaderboard to anon,authenticated;
drop policy if exists leaderboard_read on public.leaderboard;
create policy leaderboard_read on public.leaderboard for select to anon,authenticated using(true);
