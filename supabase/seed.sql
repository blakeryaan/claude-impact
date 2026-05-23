-- supabase/seed.sql
-- 50 businesses: 25 real Melbourne social enterprises + 25 fictional ones.
-- Lat/lngs are approximate; fictional businesses use plausible Melbourne suburbs.

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

-- ============================================================
-- 25 fictional Melbourne businesses (IDs: 22222222-...-201 to 225)
-- Spread across inner suburbs; varied heart point totals for leaderboard variety.
-- ============================================================

insert into businesses (id, name, logo, bio, lat, lng, sdg_focus, is_hero, awards, approved) values
('22222222-2222-2222-2222-222222222201', 'Brunswick Bike Barn',       null, 'Community bike workshop in Brunswick; free repairs for concession card holders and refugee families.', -37.7745, 144.9608, '{Decent work and economic growth,Sustainable cities and communities}', false, '{}', true),
('22222222-2222-2222-2222-222222222202', 'Fitzroy Ferments',          null, 'Fermented food social enterprise; teaches preservation skills to low-income households.', -37.7993, 144.9773, '{Zero hunger,Good health}', false, '{}', true),
('22222222-2222-2222-2222-222222222203', 'Collingwood Community Kitchen', null, 'Pay-what-you-can hot meals seven days a week for the Collingwood community.', -37.8040, 144.9863, '{Zero hunger,No poverty,Good health}', true, '{City of Melbourne Award}', true),
('22222222-2222-2222-2222-222222222204', 'Northcote Nourish',         null, 'Urban farm on a council lease; all produce donated to local food banks.', -37.7690, 144.9988, '{Zero hunger,Life on land,Sustainable cities and communities}', false, '{}', true),
('22222222-2222-2222-2222-222222222205', 'Prahran Produce Exchange',  null, 'Swap table outside Prahran Market; reduces food waste and builds neighbourhood connection.', -37.8500, 144.9924, '{Zero hunger,Responsible consumption and production}', false, '{}', true),
('22222222-2222-2222-2222-222222222206', 'South Yarra Swap Shop',     null, 'Clothing and homewares exchange; 100% of proceeds to domestic-violence refuges.', -37.8402, 144.9896, '{Responsible consumption and production,Gender equality,No poverty}', false, '{}', true),
('22222222-2222-2222-2222-222222222207', 'Docklands Drop-in Cafe',    null, 'Waterfront cafe staffed by formerly homeless people; training pathways to hospitality careers.', -37.8170, 144.9440, '{No poverty,Decent work and economic growth}', false, '{}', true),
('22222222-2222-2222-2222-222222222208', 'Carlton Community Fridge',  null, 'Solar-powered street fridge stocked by local cafes and residents; zero waste, open 24 hrs.', -37.8022, 144.9655, '{Zero hunger,Responsible consumption and production,Climate action}', false, '{}', true),
('22222222-2222-2222-2222-222222222209', 'Richmond Repair Cafe',      null, 'Monthly repair event fixing electronics, clothing, and furniture; keeping things out of landfill.', -37.8170, 144.9992, '{Responsible consumption and production,Climate action}', false, '{}', true),
('22222222-2222-2222-2222-222222222210', 'St Kilda Street Kitchen',   null, 'Volunteer-run Saturday night meals on the foreshore for rough sleepers; 15 years running.', -37.8607, 144.9784, '{No poverty,Good health,Reduced inequalities}', true, '{Victorian Premier Award}', true),
('22222222-2222-2222-2222-222222222211', 'Williamstown Waterkeepers', null, 'Volunteer marine monitoring group; monthly bay cleanups and seagrass restoration.', -37.8660, 144.8970, '{Life below water,Climate action}', false, '{}', true),
('22222222-2222-2222-2222-222222222212', 'Fitzroy Learning Network',  null, 'Free adult literacy and numeracy programs in the heart of Fitzroy since 1982.', -37.8001, 144.9776, '{Quality education,Reduced inequalities}', false, '{}', true),
('22222222-2222-2222-2222-222222222213', 'Abbotsford Collective',     null, 'Converted factory housing 14 social enterprises under one roof; shared back-office reduces costs.', -37.8039, 144.9938, '{Decent work and economic growth,Reduced inequalities,Sustainable cities and communities}', true, '{B-Corp}', true),
('22222222-2222-2222-2222-222222222214', 'Brunswick Green',           null, 'Street greening crew; plants edible verge gardens and installs rain gardens with council support.', -37.7700, 144.9617, '{Sustainable cities and communities,Life on land,Climate action}', false, '{}', true),
('22222222-2222-2222-2222-222222222215', 'Coburg Community Hub',      null, 'Multicultural drop-in with free legal advice, language classes, and a shared community kitchen.', -37.7415, 144.9655, '{Reduced inequalities,Quality education,Good health}', false, '{}', true),
('22222222-2222-2222-2222-222222222216', 'Northcote Tool Library',    null, 'Membership tool-lending library; 600 members share 1,200 tools, saving landfill and cost.', -37.7673, 144.9991, '{Responsible consumption and production,Sustainable cities and communities}', false, '{}', true),
('22222222-2222-2222-2222-222222222217', 'Collingwood Yarning Circle',null, 'First Nations-led storytelling and cultural education program for schools and businesses.', -37.8051, 144.9872, '{Reduced inequalities,Quality education,Peace, justice and strong institutions}', false, '{}', true),
('22222222-2222-2222-2222-222222222218', 'Port Melbourne Tidal',      null, 'Social enterprise building artificial reef modules from recycled concrete; employs TAFE graduates.', -37.8352, 144.9375, '{Life below water,Decent work and economic growth,Climate action}', false, '{}', true),
('22222222-2222-2222-2222-222222222219', 'Footscray Fresh',           null, 'Multicultural grocery that donates 10% of each sale to West Melbourne food programs.', -37.8006, 144.8995, '{Zero hunger,No poverty,Reduced inequalities}', false, '{}', true),
('22222222-2222-2222-2222-222222222220', 'Preston Pantry',            null, 'Pay-it-forward grocery shelf in a Preston cafe; customers buy extra items for those in need.', -37.7420, 144.9978, '{No poverty,Zero hunger}', false, '{}', true),
('22222222-2222-2222-2222-222222222221', 'Thornbury Thrift',          null, 'Op shop funding frontline domestic-violence support; all sorting done by volunteers.', -37.7607, 144.9978, '{Gender equality,No poverty}', false, '{}', true),
('22222222-2222-2222-2222-222222222222', 'Fairfield Ferals',          null, 'Guerrilla gardening collective turning vacant lots into community food forests.', -37.7737, 145.0162, '{Life on land,Zero hunger,Sustainable cities and communities}', false, '{}', true),
('22222222-2222-2222-2222-222222222223', 'Kensington Makers Hub',     null, 'Open makerspace with reduced fees for job-seekers; 3D printers, laser cutters, and sewing machines.', -37.8010, 144.9280, '{Decent work and economic growth,Industry, innovation, and infrastructure}', false, '{}', true),
('22222222-2222-2222-2222-222222222224', 'Moonee Ponds Market Garden',null, 'Rooftop garden atop a shopping centre; 2 tonnes of produce donated annually to food relief.', -37.7666, 144.9207, '{Zero hunger,Life on land,Climate action}', false, '{}', true),
('22222222-2222-2222-2222-222222222225', 'Pascoe Vale Community Patch', null, 'Shared allotment garden welcoming new migrants; cooking workshops turn harvests into shared meals.', -37.7292, 144.9433, '{Zero hunger,Reduced inequalities,Good health}', false, '{}', true);

-- Contributions for fictional businesses (varied totals to make leaderboard interesting)
insert into contributions (business_id, date, description, heart_points) values
  -- Brunswick Bike Barn (total ~95)
  ('22222222-2222-2222-2222-222222222201', '2026-04-18', '38 bikes repaired for concession card holders', 38),
  ('22222222-2222-2222-2222-222222222201', '2026-03-10', 'Free maintenance day: 60 riders attended', 57),

  -- Fitzroy Ferments (total ~48)
  ('22222222-2222-2222-2222-222222222202', '2026-04-12', 'Fermentation masterclass for 20 low-income households', 30),
  ('22222222-2222-2222-2222-222222222202', '2026-02-28', 'Donated 80 jars of kimchi to food bank', 18),

  -- Collingwood Community Kitchen (total ~310)
  ('22222222-2222-2222-2222-222222222203', '2026-04-30', '1,800 pay-what-you-can meals served this month', 180),
  ('22222222-2222-2222-2222-222222222203', '2026-03-31', '1,300 meals served in March', 130),

  -- Northcote Nourish (total ~72)
  ('22222222-2222-2222-2222-222222222204', '2026-04-21', '480kg of fresh produce donated to three food banks', 48),
  ('22222222-2222-2222-2222-222222222204', '2026-02-14', 'School holiday planting program: 45 kids attended', 24),

  -- Prahran Produce Exchange (total ~29)
  ('22222222-2222-2222-2222-222222222205', '2026-04-26', 'Swap table diverted ~200kg of food from waste this month', 20),
  ('22222222-2222-2222-2222-222222222205', '2026-03-29', '12 new households registered as regular contributors', 9),

  -- South Yarra Swap Shop (total ~55)
  ('22222222-2222-2222-2222-222222222206', '2026-04-22', '$2,750 raised for Safe Steps domestic violence refuge', 55),

  -- Docklands Drop-in Cafe (total ~66)
  ('22222222-2222-2222-2222-222222222207', '2026-04-17', '3 trainees gained permanent hospitality employment', 45),
  ('22222222-2222-2222-2222-222222222207', '2026-03-05', 'Hosted workplace training for 8 new participants', 21),

  -- Carlton Community Fridge (total ~37)
  ('22222222-2222-2222-2222-222222222208', '2026-04-29', '~140kg of surplus food redistributed this month', 28),
  ('22222222-2222-2222-2222-222222222208', '2026-03-28', 'Solar panel installation reduces fridge carbon footprint to zero', 9),

  -- Richmond Repair Cafe (total ~42)
  ('22222222-2222-2222-2222-222222222209', '2026-04-06', '67 items repaired, estimated 85kg kept from landfill', 42),

  -- St Kilda Street Kitchen (total ~280)
  ('22222222-2222-2222-2222-222222222210', '2026-04-27', '210 meals served at Saturday foreshore event', 140),
  ('22222222-2222-2222-2222-222222222210', '2026-03-30', '196 meals served; 8 guests connected to housing services', 140),

  -- Williamstown Waterkeepers (total ~54)
  ('22222222-2222-2222-2222-222222222211', '2026-04-19', '34 volunteers removed 110kg of rubbish from beach', 34),
  ('22222222-2222-2222-2222-222222222211', '2026-02-22', 'Seagrass monitoring survey completed; data submitted to DELWP', 20),

  -- Fitzroy Learning Network (total ~58)
  ('22222222-2222-2222-2222-222222222212', '2026-04-15', '29 students enrolled in Term 2 literacy program', 29),
  ('22222222-2222-2222-2222-222222222212', '2026-03-12', '4 graduates achieved Certificate I in Numeracy', 29),

  -- Abbotsford Collective (total ~195)
  ('22222222-2222-2222-2222-222222222213', '2026-04-30', '14 resident social enterprises generated $340k combined revenue this month', 120),
  ('22222222-2222-2222-2222-222222222213', '2026-03-31', 'Shared services saved tenants $28k in admin costs', 75),

  -- Brunswick Green (total ~44)
  ('22222222-2222-2222-2222-222222222214', '2026-04-11', 'Installed 6 new edible verge gardens in Brunswick', 26),
  ('22222222-2222-2222-2222-222222222214', '2026-02-08', '3 rain gardens completed, estimated 12,000L stormwater captured annually', 18),

  -- Coburg Community Hub (total ~63)
  ('22222222-2222-2222-2222-222222222215', '2026-04-23', '18 households received free legal advice', 30),
  ('22222222-2222-2222-2222-222222222215', '2026-03-18', 'English conversation class: 22 new arrivals attended', 33),

  -- Northcote Tool Library (total ~31)
  ('22222222-2222-2222-2222-222222222216', '2026-04-30', '143 tool loans in April; zero items purchased new', 22),
  ('22222222-2222-2222-2222-222222222216', '2026-03-31', 'Membership grew to 620 households', 9),

  -- Collingwood Yarning Circle (total ~70)
  ('22222222-2222-2222-2222-222222222217', '2026-04-09', 'Cultural education session for 120 council staff', 48),
  ('22222222-2222-2222-2222-222222222217', '2026-02-19', 'School program reached 220 students across 3 primaries', 22),

  -- Port Melbourne Tidal (total ~88)
  ('22222222-2222-2222-2222-222222222218', '2026-04-16', '4 reef modules deployed in Port Phillip Bay', 60),
  ('22222222-2222-2222-2222-222222222218', '2026-03-07', '2 TAFE graduates hired as reef technicians', 28),

  -- Footscray Fresh (total ~76)
  ('22222222-2222-2222-2222-222222222219', '2026-04-28', '10% of April sales ($3,800) donated to Foodbank Victoria', 38),
  ('22222222-2222-2222-2222-222222222219', '2026-03-29', 'Hosted multicultural cooking evening: 60 attendees', 38),

  -- Preston Pantry (total ~22)
  ('22222222-2222-2222-2222-222222222220', '2026-04-30', '88 pay-it-forward items redeemed from the pantry shelf', 22),

  -- Thornbury Thrift (total ~47)
  ('22222222-2222-2222-2222-222222222221', '2026-04-24', '$2,350 raised for Safe Steps in April', 47),

  -- Fairfield Ferals (total ~36)
  ('22222222-2222-2222-2222-222222222222', '2026-04-13', 'Three new food forest plots established on vacant lots', 24),
  ('22222222-2222-2222-2222-222222222222', '2026-03-02', 'Community seed swap: 40 varieties exchanged', 12),

  -- Kensington Makers Hub (total ~53)
  ('22222222-2222-2222-2222-222222222223', '2026-04-20', '11 job-seekers completed 3D printing certification', 40),
  ('22222222-2222-2222-2222-222222222223', '2026-03-15', 'Hosted 22 free drop-in sessions for concession members', 13),

  -- Moonee Ponds Market Garden (total ~110)
  ('22222222-2222-2222-2222-222222222224', '2026-04-25', '480kg of rooftop produce donated to Oz Harvest', 72),
  ('22222222-2222-2222-2222-222222222224', '2026-03-22', 'School holiday tour: 55 kids learned about urban growing', 38),

  -- Pascoe Vale Community Patch (total ~45)
  ('22222222-2222-2222-2222-222222222225', '2026-04-14', 'Harvest lunch: 35 participants from 8 cultural backgrounds', 27),
  ('22222222-2222-2222-2222-222222222225', '2026-03-08', 'Cooking workshop using winter harvest; recipes translated into 4 languages', 18);
