-- supabase/seed.sql
-- 25 Melbourne businesses spread across the CoM LGA.
-- Lat/lngs are approximate to public addresses.

insert into businesses (id, name, logo, bio, lat, lng, sdg_focus, is_hero, awards, approved) values
('11111111-1111-1111-1111-111111111101', 'STREAT', null, 'Hospitality social enterprise training disadvantaged young Melburnians.', -37.8085, 144.9633, '{No poverty,Decent work and economic growth,Reduced inequalities}', true, '{B-Corp,Telstra Business Award}', true),
('11111111-1111-1111-1111-111111111102', 'Lentil as Anything', null, 'Pay-as-you-feel restaurant supporting food security and refugee employment.', -37.7986, 144.9789, '{Zero hunger,Reduced inequalities}', true, '{Victorian Multicultural Award}', true),
('11111111-1111-1111-1111-111111111103', 'Kinfolk Cafe', null, 'Volunteer-run cafe; 100% of profits to four charity partners.', -37.8136, 144.9583, '{No poverty,Good health}', true, '{The Age Good Food Guide}', true),
('11111111-1111-1111-1111-111111111104', 'The Social Studio', null, 'Fashion school + manufacturer employing people from refugee backgrounds.', -37.8067, 144.9886, '{Decent work and economic growth,Reduced inequalities,Responsible consumption and production}', true, '{Australian Fashion Laureate}', true),
('11111111-1111-1111-1111-111111111105', 'Long Street Coffee', null, 'Cafe employing and training new arrivals to Australia.', -37.7920, 144.9690, '{Decent work and economic growth,Reduced inequalities}', false, '{}', true),
('11111111-1111-1111-1111-111111111106', 'Free to Feed', null, 'Cooking experiences led by refugees and people seeking asylum.', -37.7977, 144.9858, '{Reduced inequalities,Decent work and economic growth}', false, '{}', true),
('11111111-1111-1111-1111-111111111107', 'Patagonia Melbourne', null, 'Outdoor brand donating 1% for the planet; runs local repair days.', -37.8158, 144.9659, '{Climate action,Responsible consumption and production}', false, '{B-Corp}', true),
('11111111-1111-1111-1111-111111111108', 'Aesop Collins Street', null, 'Skincare brand investing in community arts and literary programs.', -37.8166, 144.9686, '{Quality education,Sustainable cities and communities}', false, '{B-Corp}', true),
('11111111-1111-1111-1111-111111111109', 'KeepCup', null, 'Reusable cup pioneer; offsets and donates a slice of every sale.', -37.8074, 144.9869, '{Responsible consumption and production,Climate action}', false, '{B-Corp}', true),
('11111111-1111-1111-1111-111111111110', 'Who Gives A Crap', null, '50% of profits to clean water and sanitation projects.', -37.8004, 144.9947, '{Clean water and sanitation,Good health}', true, '{B-Corp}', true),
('11111111-1111-1111-1111-111111111111', 'Brotherhood Books', null, 'Online bookshop funding the Brotherhood of St Laurence anti-poverty programs.', -37.7837, 144.9700, '{No poverty,Quality education}', false, '{}', true),
('11111111-1111-1111-1111-111111111112', 'Sacred Heart Mission Op Shop', null, 'Retail proceeds fund crisis support and homelessness services.', -37.8623, 144.9870, '{No poverty,Sustainable cities and communities}', false, '{}', true),
('11111111-1111-1111-1111-111111111113', 'Friends of the Earth Food Co-op', null, 'Bulk-foods co-op; reduces packaging and supports ethical producers.', -37.7984, 144.9710, '{Responsible consumption and production,Zero hunger}', false, '{}', true),
('11111111-1111-1111-1111-111111111114', 'Outland Denim Melbourne', null, 'Ethical denim; employs survivors of human trafficking.', -37.8146, 144.9700, '{Decent work and economic growth,Gender equality}', false, '{B-Corp}', true),
('11111111-1111-1111-1111-111111111115', 'The Big Issue Vendor (CBD)', null, 'Magazine sold by people experiencing homelessness; vendors keep half the cover price.', -37.8136, 144.9631, '{No poverty,Decent work and economic growth}', true, '{Order of Australia (organisation)}', true),
('11111111-1111-1111-1111-111111111116', 'Carlton Neighbourhood Learning Centre', null, 'Adult learning + community programs for migrants and seniors.', -37.8030, 144.9657, '{Quality education,Reduced inequalities}', false, '{}', true),
('11111111-1111-1111-1111-111111111117', 'Cathedral Coffee', null, 'CBD cafe routing profits to homelessness outreach.', -37.8156, 144.9678, '{No poverty,Good health}', false, '{}', true),
('11111111-1111-1111-1111-111111111118', 'Etiko Footwear', null, 'Fair-trade, vegan footwear; B-Corp; carbon-neutral.', -37.7990, 144.9670, '{Decent work and economic growth,Climate action,Responsible consumption and production}', false, '{B-Corp,Fairtrade}', true),
('11111111-1111-1111-1111-111111111119', 'Hairspace', null, 'Salon offering free cuts for people experiencing homelessness monthly.', -37.7951, 144.9712, '{No poverty,Good health}', false, '{}', true),
('11111111-1111-1111-1111-111111111120', 'Good Cycles', null, 'Bike shop / social enterprise; employment pathways for at-risk youth.', -37.8210, 144.9530, '{Decent work and economic growth,Sustainable cities and communities}', false, '{}', true),
('11111111-1111-1111-1111-111111111121', 'Slow Beer Co.', null, 'Carbon-neutral brewery donating to Melbourne waterways restoration.', -37.7945, 144.9620, '{Climate action,Life below water}', false, '{}', true),
('11111111-1111-1111-1111-111111111122', 'Replate Cafe', null, 'Surplus-food cafe partnering with OzHarvest.', -37.8120, 144.9710, '{Zero hunger,Responsible consumption and production}', false, '{}', true),
('11111111-1111-1111-1111-111111111123', 'Working Heritage Bookshop', null, 'Proceeds fund heritage-building restoration around Melbourne.', -37.8132, 144.9665, '{Sustainable cities and communities}', false, '{}', true),
('11111111-1111-1111-1111-111111111124', 'Bowery to Williamstown', null, 'Coastal cafe donating 5% of sales to local marine cleanup.', -37.8650, 144.9000, '{Life below water,Climate action}', false, '{}', true),
('11111111-1111-1111-1111-111111111125', 'Melbourne Period Project', null, 'Distributes free period products through cafes and community centres.', -37.8060, 144.9620, '{Gender equality,Good health,Reduced inequalities}', false, '{}', true);

-- contributions: 3-8 per business, fabricated but plausible
insert into contributions (business_id, date, description, heart_points) values
  -- STREAT
  ('11111111-1111-1111-1111-111111111101', '2026-04-12', 'Trained 12 young people through hospitality programme', 120),
  ('11111111-1111-1111-1111-111111111101', '2026-03-02', '$8,400 raised at Open Day toward youth scholarships', 84),
  ('11111111-1111-1111-1111-111111111101', '2026-02-14', 'Provided 200 free meals to community partners', 40),
  -- Lentil as Anything
  ('11111111-1111-1111-1111-111111111102', '2026-04-30', 'Served 1,400 pay-as-you-feel meals this month', 140),
  ('11111111-1111-1111-1111-111111111102', '2026-03-15', 'Hosted refugee employment forum', 30),
  ('11111111-1111-1111-1111-111111111102', '2026-01-09', 'Donated kitchen time for a homelessness charity dinner', 45),
  -- Kinfolk
  ('11111111-1111-1111-1111-111111111103', '2026-04-22', '$6,200 donated to four charity partners', 62),
  ('11111111-1111-1111-1111-111111111103', '2026-02-20', 'Hosted 38 volunteer shifts', 38),
  -- Social Studio
  ('11111111-1111-1111-1111-111111111104', '2026-04-18', 'Manufactured 600 garments locally, all ethical labour', 90),
  ('11111111-1111-1111-1111-111111111104', '2026-03-08', 'Free fashion workshop for new arrivals', 25),
  -- Long Street Coffee
  ('11111111-1111-1111-1111-111111111105', '2026-04-10', '4 trainees graduated barista program', 40),
  ('11111111-1111-1111-1111-111111111105', '2026-02-28', 'Free coffee day for community workers', 12),
  -- Free to Feed
  ('11111111-1111-1111-1111-111111111106', '2026-04-25', '12 cooking experiences led by refugee chefs', 60),
  -- Patagonia
  ('11111111-1111-1111-1111-111111111107', '2026-04-15', 'Repair day diverted 80 jackets from landfill', 48),
  ('11111111-1111-1111-1111-111111111107', '2026-03-22', '$3,500 donated to Yarra Riverkeeper', 35),
  -- Aesop
  ('11111111-1111-1111-1111-111111111108', '2026-04-08', 'Sponsored Wheeler Centre literary programme', 50),
  -- KeepCup
  ('11111111-1111-1111-1111-111111111109', '2026-04-20', 'Estimated 1.2M disposable cups avoided via sales', 120),
  -- Who Gives A Crap
  ('11111111-1111-1111-1111-111111111110', '2026-04-28', '$220,000 globally to clean water (April share)', 200),
  ('11111111-1111-1111-1111-111111111110', '2026-03-30', 'Carbon-neutral certification renewed', 40),
  ('11111111-1111-1111-1111-111111111110', '2026-02-14', 'Sponsored World Water Day event in Melbourne', 30),
  -- Brotherhood Books
  ('11111111-1111-1111-1111-111111111111', '2026-04-19', '$4,100 raised for BSL anti-poverty programs', 41),
  -- Sacred Heart Op Shop
  ('11111111-1111-1111-1111-111111111112', '2026-04-26', '8,500 garments rehomed; revenue to crisis support', 85),
  -- FoE Co-op
  ('11111111-1111-1111-1111-111111111113', '2026-04-21', 'Avoided ~430kg of packaging via bulk sales', 43),
  -- Outland Denim
  ('11111111-1111-1111-1111-111111111114', '2026-04-14', '6 graduates of trafficking-survivor employment program', 60),
  -- Big Issue
  ('11111111-1111-1111-1111-111111111115', '2026-04-30', '$18,200 paid to CBD vendors this month', 182),
  ('11111111-1111-1111-1111-111111111115', '2026-03-31', '$16,800 paid to CBD vendors', 168),
  -- Carlton NLC
  ('11111111-1111-1111-1111-111111111116', '2026-04-15', '34 migrants attended free English classes', 34),
  -- Cathedral Coffee
  ('11111111-1111-1111-1111-111111111117', '2026-04-22', '$2,400 routed to homelessness outreach', 24),
  -- Etiko
  ('11111111-1111-1111-1111-111111111118', '2026-04-17', '900 fair-trade pairs sold this month', 45),
  -- Hairspace
  ('11111111-1111-1111-1111-111111111119', '2026-04-05', 'Free cuts day: 28 people served', 28),
  -- Good Cycles
  ('11111111-1111-1111-1111-111111111120', '2026-04-13', '5 at-risk youth started bike-mechanic traineeships', 50),
  -- Slow Beer Co.
  ('11111111-1111-1111-1111-111111111121', '2026-04-23', '$1,800 donated to Yarra waterway restoration', 18),
  -- Replate
  ('11111111-1111-1111-1111-111111111122', '2026-04-29', 'Rescued 320kg of surplus produce', 32),
  -- Working Heritage
  ('11111111-1111-1111-1111-111111111123', '2026-04-11', '$3,000 to Royal Arcade restoration fund', 30),
  -- Bowery
  ('11111111-1111-1111-1111-111111111124', '2026-04-27', '12 volunteers, 80kg of beach litter removed', 24),
  -- Melbourne Period Project
  ('11111111-1111-1111-1111-111111111125', '2026-04-24', '3,200 period products distributed to 18 sites', 64);
