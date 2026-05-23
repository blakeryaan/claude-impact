-- supabase/rls.sql
alter table profiles      enable row level security;
alter table businesses    enable row level security;
alter table contributions enable row level security;
alter table favorites     enable row level security;
alter table applause      enable row level security;
alter table follows       enable row level security;
alter table testimonials  enable row level security;

-- helper: is current user an admin?
create or replace function public.is_admin() returns boolean
language sql stable security definer as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin');
$$;

-- profiles
create policy "profiles readable by anyone" on profiles for select using (true);
create policy "own profile update"          on profiles for update using (auth.uid() = id);
create policy "admin profile update"        on profiles for update using (public.is_admin());
create policy "self-insert profile"         on profiles for insert with check (auth.uid() = id);

-- businesses
create policy "approved businesses public"  on businesses for select using (approved or auth.uid() = owner_id or public.is_admin());
create policy "owner updates business"      on businesses for update using (auth.uid() = owner_id);
create policy "admin updates business"      on businesses for update using (public.is_admin());
create policy "admin inserts business"      on businesses for insert with check (public.is_admin());
create policy "shop signup business"        on businesses for insert with check (auth.uid() = owner_id);
create policy "admin deletes business"      on businesses for delete using (public.is_admin());

-- contributions
create policy "contributions public"        on contributions for select using (true);
create policy "owner manages contributions" on contributions for all
  using (exists (select 1 from businesses b where b.id = business_id and b.owner_id = auth.uid()))
  with check (exists (select 1 from businesses b where b.id = business_id and b.owner_id = auth.uid()));
create policy "admin manages contributions" on contributions for all using (public.is_admin()) with check (public.is_admin());

-- favorites / applause / follows: per-user own rows
create policy "own favorites"  on favorites  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own applause"   on applause   for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own follows"    on follows    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- testimonials
create policy "testimonials readable" on testimonials for select using (true);
create policy "auth insert testimonial" on testimonials for insert with check (auth.uid() = user_id);
create policy "author or admin deletes" on testimonials for delete using (auth.uid() = user_id or public.is_admin());
