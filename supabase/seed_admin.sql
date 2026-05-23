-- supabase/seed_admin.sql
--
-- Promote an existing auth.users row to the 'admin' role.
--
-- WHY THIS IS TWO STEPS:
-- You cannot reliably INSERT into auth.users via SQL — passwords must be bcrypted
-- and the auth schema has internal constraints. So we create the auth user via the
-- Supabase Dashboard, then run this SQL to add the matching profiles row.
--
-- STEPS:
--   1. Supabase Dashboard → Authentication → Users → "Add user" (top right) →
--      "Create new user". Email: admin@goodshit.demo (or any real-looking domain
--      — DO NOT use example.com; Supabase rejects test/disposable domains by
--      default). Password: pick any. TICK "Auto Confirm User" so you can sign in
--      immediately without email verification.
--
--   2. Replace the email in the SQL below with the one you used, then run it in
--      the SQL Editor.

insert into profiles (id, role, display_name)
select id, 'admin', 'Admin'
from auth.users
where email = 'admin@goodshit.demo'
on conflict (id) do update set role = 'admin', display_name = excluded.display_name;

-- Verify:
-- select p.id, u.email, p.role from profiles p join auth.users u on u.id = p.id;
