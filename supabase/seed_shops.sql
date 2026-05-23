-- supabase/seed_shops.sql
--
-- Demo-ready shop accounts: 3 real Melbourne businesses already in the seed,
-- assigned to dashboard-created auth users so you can sign in at /shop/login
-- and see a populated /shop/dashboard at demo time.
--
-- WHY DASHBOARD + SQL: auth.users passwords are bcrypted; the cleanest way
-- to create an auth user with a known password is via the Supabase Dashboard.
--
-- STEPS:
--   1. Supabase Dashboard → Authentication → Users → "Add user" → "Create new
--      user". Repeat 3 times with these credentials (or substitute your own —
--      just keep them consistent below):
--
--        Email:    streat@goodshit.demo
--        Password: Hackathon2026!
--        ✓ Auto Confirm User
--
--        Email:    kinfolk@goodshit.demo
--        Password: Hackathon2026!
--        ✓ Auto Confirm User
--
--        Email:    keepcup@goodshit.demo
--        Password: Hackathon2026!
--        ✓ Auto Confirm User
--
--   2. Run this SQL in the SQL Editor.
--
--   3. At demo time: sign in at /shop/login with any of those emails. The
--      dashboard will show the existing Heart Points + contributions for the
--      claimed business.

-- ---------- STREAT (Heart Points: 244, contributions: 3) ----------
insert into profiles (id, role, display_name)
select id, 'shop', 'STREAT' from auth.users where email = 'streat@goodshit.demo'
on conflict (id) do update set role = 'shop', display_name = excluded.display_name;

update businesses
  set owner_id = (select id from auth.users where email = 'streat@goodshit.demo')
  where id = '11111111-1111-1111-1111-111111111101';

-- ---------- Kinfolk Cafe (Heart Points: 100, contributions: 2) ----------
insert into profiles (id, role, display_name)
select id, 'shop', 'Kinfolk Cafe' from auth.users where email = 'kinfolk@goodshit.demo'
on conflict (id) do update set role = 'shop', display_name = excluded.display_name;

update businesses
  set owner_id = (select id from auth.users where email = 'kinfolk@goodshit.demo')
  where id = '11111111-1111-1111-1111-111111111103';

-- ---------- KeepCup (Heart Points: 120, contributions: 1) ----------
insert into profiles (id, role, display_name)
select id, 'shop', 'KeepCup' from auth.users where email = 'keepcup@goodshit.demo'
on conflict (id) do update set role = 'shop', display_name = excluded.display_name;

update businesses
  set owner_id = (select id from auth.users where email = 'keepcup@goodshit.demo')
  where id = '11111111-1111-1111-1111-111111111109';

-- Verify:
-- select b.name, u.email, b.approved
-- from businesses b
-- join auth.users u on u.id = b.owner_id
-- where u.email like '%@goodshit.demo';
