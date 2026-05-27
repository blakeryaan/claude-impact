// Hardcoded subset of supabase/seed.sql so the app demos without a populated backend.
// Wired in when VITE_USE_MOCKS=true. See ./mockSupabase.ts for the query shim.

export type MockBusiness = {
  id: string;
  owner_id: string | null;
  name: string;
  logo: string | null;
  photo_url: string | null;
  google_place_id: string | null;
  address: string | null;
  bio: string;
  lat: number;
  lng: number;
  sdg_focus: string[];
  is_hero: boolean;
  awards: string[];
  approved: boolean;
};

export type MockContribution = {
  id: string;
  business_id: string;
  date: string;
  description: string;
  heart_points: number;
};

const b = (id: string, name: string, bio: string, lat: number, lng: number, sdg: string[], hero: boolean, awards: string[]): MockBusiness => ({
  id, owner_id: null, name, logo: null, photo_url: null, google_place_id: null, address: null,
  bio, lat, lng, sdg_focus: sdg, is_hero: hero, awards, approved: true,
});

export const BUSINESSES: MockBusiness[] = [
  b('11111111-1111-1111-1111-111111111101', 'STREAT', 'Hospitality social enterprise training disadvantaged young Melburnians.', -37.8085, 144.9633, ['No poverty','Decent work and economic growth','Reduced inequalities'], true, ['B-Corp','Telstra Business Award']),
  b('11111111-1111-1111-1111-111111111102', 'Lentil as Anything', 'Pay-as-you-feel restaurant supporting food security and refugee employment.', -37.7986, 144.9789, ['Zero hunger','Reduced inequalities'], true, ['Victorian Multicultural Award']),
  b('11111111-1111-1111-1111-111111111103', 'Kinfolk Cafe', 'Volunteer-run cafe; 100% of profits to four charity partners.', -37.8136, 144.9583, ['No poverty','Good health'], true, ['The Age Good Food Guide']),
  b('11111111-1111-1111-1111-111111111104', 'The Social Studio', 'Fashion school + manufacturer employing people from refugee backgrounds.', -37.8067, 144.9886, ['Decent work and economic growth','Reduced inequalities','Responsible consumption and production'], true, ['Australian Fashion Laureate']),
  b('11111111-1111-1111-1111-111111111105', 'Long Street Coffee', 'Cafe employing and training new arrivals to Australia.', -37.7920, 144.9690, ['Decent work and economic growth','Reduced inequalities'], false, []),
  b('11111111-1111-1111-1111-111111111106', 'Free to Feed', 'Cooking experiences led by refugees and people seeking asylum.', -37.7977, 144.9858, ['Reduced inequalities','Decent work and economic growth'], false, []),
  b('11111111-1111-1111-1111-111111111107', 'Patagonia Melbourne', 'Outdoor brand donating 1% for the planet; runs local repair days.', -37.8158, 144.9659, ['Climate action','Responsible consumption and production'], false, ['B-Corp']),
  b('11111111-1111-1111-1111-111111111108', 'Aesop Collins Street', 'Skincare brand investing in community arts and literary programs.', -37.8166, 144.9686, ['Quality education','Sustainable cities and communities'], false, ['B-Corp']),
  b('11111111-1111-1111-1111-111111111109', 'KeepCup', 'Reusable cup pioneer; offsets and donates a slice of every sale.', -37.8074, 144.9869, ['Responsible consumption and production','Climate action'], false, ['B-Corp']),
  b('11111111-1111-1111-1111-111111111110', 'Who Gives A Crap', '50% of profits to clean water and sanitation projects.', -37.8004, 144.9947, ['Clean water and sanitation','Good health'], true, ['B-Corp']),
  b('11111111-1111-1111-1111-111111111115', 'The Big Issue Vendor (CBD)', 'Magazine sold by people experiencing homelessness; vendors keep half the cover price.', -37.8136, 144.9631, ['No poverty','Decent work and economic growth'], true, ['Order of Australia']),
  b('11111111-1111-1111-1111-111111111117', 'Cathedral Coffee', 'CBD cafe routing profits to homelessness outreach.', -37.8156, 144.9678, ['No poverty','Good health'], false, []),
  b('11111111-1111-1111-1111-111111111118', 'Etiko Footwear', 'Fair-trade, vegan footwear; B-Corp; carbon-neutral.', -37.7990, 144.9670, ['Decent work and economic growth','Climate action','Responsible consumption and production'], false, ['B-Corp','Fairtrade']),
  b('11111111-1111-1111-1111-111111111120', 'Good Cycles', 'Bike shop / social enterprise; employment pathways for at-risk youth.', -37.8210, 144.9530, ['Decent work and economic growth','Sustainable cities and communities'], false, []),
  b('11111111-1111-1111-1111-111111111122', 'Replate Cafe', 'Surplus-food cafe partnering with OzHarvest.', -37.8120, 144.9710, ['Zero hunger','Responsible consumption and production'], false, []),
  b('11111111-1111-1111-1111-111111111125', 'Melbourne Period Project', 'Distributes free period products through cafes and community centres.', -37.8060, 144.9620, ['Gender equality','Good health','Reduced inequalities'], false, []),
];

const c = (business_id: string, date: string, description: string, heart_points: number): MockContribution => ({
  id: `${business_id}-${date}-${heart_points}`, business_id, date, description, heart_points,
});

export const CONTRIBUTIONS: MockContribution[] = [
  c('11111111-1111-1111-1111-111111111101', '2026-04-12', 'Trained 12 young people through hospitality programme', 120),
  c('11111111-1111-1111-1111-111111111101', '2026-03-02', '$8,400 raised at Open Day toward youth scholarships', 84),
  c('11111111-1111-1111-1111-111111111101', '2026-02-14', 'Provided 200 free meals to community partners', 40),
  c('11111111-1111-1111-1111-111111111102', '2026-04-30', 'Served 1,400 pay-as-you-feel meals this month', 140),
  c('11111111-1111-1111-1111-111111111102', '2026-03-15', 'Hosted refugee employment forum', 30),
  c('11111111-1111-1111-1111-111111111102', '2026-01-09', 'Donated kitchen time for a homelessness charity dinner', 45),
  c('11111111-1111-1111-1111-111111111103', '2026-04-22', '$6,200 donated to four charity partners', 62),
  c('11111111-1111-1111-1111-111111111103', '2026-02-20', 'Hosted 38 volunteer shifts', 38),
  c('11111111-1111-1111-1111-111111111104', '2026-04-18', 'Manufactured 600 garments locally, all ethical labour', 90),
  c('11111111-1111-1111-1111-111111111104', '2026-03-08', 'Free fashion workshop for new arrivals', 25),
  c('11111111-1111-1111-1111-111111111105', '2026-04-10', '4 trainees graduated barista program', 40),
  c('11111111-1111-1111-1111-111111111105', '2026-02-28', 'Free coffee day for community workers', 12),
  c('11111111-1111-1111-1111-111111111106', '2026-04-25', '12 cooking experiences led by refugee chefs', 60),
  c('11111111-1111-1111-1111-111111111107', '2026-04-15', 'Repair day diverted 80 jackets from landfill', 48),
  c('11111111-1111-1111-1111-111111111107', '2026-03-22', '$3,500 donated to Yarra Riverkeeper', 35),
  c('11111111-1111-1111-1111-111111111108', '2026-04-08', 'Sponsored Wheeler Centre literary programme', 50),
  c('11111111-1111-1111-1111-111111111109', '2026-04-20', 'Estimated 1.2M disposable cups avoided via sales', 120),
  c('11111111-1111-1111-1111-111111111110', '2026-04-28', '$220,000 globally to clean water (April share)', 200),
  c('11111111-1111-1111-1111-111111111110', '2026-03-30', 'Carbon-neutral certification renewed', 40),
  c('11111111-1111-1111-1111-111111111110', '2026-02-14', 'Sponsored World Water Day event in Melbourne', 30),
  c('11111111-1111-1111-1111-111111111115', '2026-04-30', '$18,200 paid to CBD vendors this month', 182),
  c('11111111-1111-1111-1111-111111111115', '2026-03-31', '$16,800 paid to CBD vendors', 168),
  c('11111111-1111-1111-1111-111111111117', '2026-04-22', '$2,400 routed to homelessness outreach', 24),
  c('11111111-1111-1111-1111-111111111118', '2026-04-17', '900 fair-trade pairs sold this month', 45),
  c('11111111-1111-1111-1111-111111111120', '2026-04-14', '14 at-risk youth in bike-mechanic placement', 56),
  c('11111111-1111-1111-1111-111111111122', '2026-04-26', '320kg surplus food rescued and served', 64),
  c('11111111-1111-1111-1111-111111111125', '2026-04-18', '6,200 period products distributed via CBD partners', 62),
];

export function computeBusinessPoints() {
  const map = new Map<string, { business_id: string; heart_points: number; contribution_count: number }>();
  BUSINESSES.forEach((b) => map.set(b.id, { business_id: b.id, heart_points: 0, contribution_count: 0 }));
  CONTRIBUTIONS.forEach((c) => {
    const row = map.get(c.business_id);
    if (!row) return;
    row.heart_points += c.heart_points;
    row.contribution_count += 1;
  });
  return [...map.values()];
}
