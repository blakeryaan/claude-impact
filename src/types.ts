export type Role = 'customer' | 'shop' | 'admin';

export type Profile = {
  id: string;
  role: Role;
  display_name: string | null;
  avatar_url: string | null;
};

export type Business = {
  id: string;
  owner_id: string | null;
  name: string;
  logo: string | null;
  bio: string | null;
  lat: number;
  lng: number;
  sdg_focus: string[];
  is_hero: boolean;
  awards: string[];
  approved: boolean;
};

export type Contribution = {
  id: string;
  business_id: string;
  date: string;
  description: string;
  heart_points: number;
};

export type BusinessWithPoints = Business & {
  heart_points: number;
  contribution_count: number;
};
