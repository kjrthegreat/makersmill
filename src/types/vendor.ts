export type Role = 'vendor' | 'admin';
export type VendorStatus = 'pending' | 'active' | 'suspended';
export type ProductStatus = 'published' | 'draft';
export type ApplicationDecision = 'pending' | 'approved' | 'rejected';

export interface Profile {
  id: string;
  role: Role;
  created_at: string;
}

export interface Vendor {
  id: string;
  user_id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  logo_url: string | null;
  banner_url: string | null;
  contact_email: string | null;
  phone: string | null;
  website: string | null;
  instagram: string | null;
  facebook: string | null;
  location_in_mill: string | null;
  hero_headline: string | null;
  hero_subline: string | null;
  about_headline: string | null;
  accent_color: string | null;
  cta_text: string | null;
  cta_url: string | null;
  gallery_urls: string[];
  categories: string[];
  meta_description: string | null;
  status: VendorStatus;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface VendorHour {
  id: string;
  vendor_id: string;
  day_of_week: number; // 0=Sun, 6=Sat
  open_time: string | null;
  close_time: string | null;
  closed: boolean;
}

export interface Product {
  id: string;
  vendor_id: string;
  name: string;
  description: string | null;
  price: number; // stored in cents
  category: string | null;
  stock_qty: number | null;
  status: ProductStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
  product_images?: ProductImage[];
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  sort_order: number;
  created_at: string;
}

export interface VendorApplication {
  id: string;
  business_name: string;
  applicant_email: string;
  applicant_name: string | null;
  phone: string | null;
  description: string | null;
  goods_type: string | null;
  submitted_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  decision: ApplicationDecision;
  rejection_reason: string | null;
}

export type EventStatus = 'published' | 'draft';
export type EventAccentColor = 'orange' | 'rust' | 'gold' | 'warm' | 'wood' | 'dark';

export interface Event {
  id: string;
  name: string;
  type: string | null;
  detail: string | null;
  recurring: boolean;
  recurring_day: string | null;
  event_date: string | null;
  time_label: string | null;
  tag: string | null;
  cta_label: string;
  cta_url: string;
  accent_color: EventAccentColor;
  status: EventStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const PRODUCT_CATEGORIES = [
  'Art & Prints',
  'Ceramics & Pottery',
  'Clothing & Apparel',
  'Food & Pantry',
  'Handmade Goods',
  'Home & Decor',
  'Jewelry & Accessories',
  'Plants & Botanicals',
  'Skincare & Bath',
  'Toys & Kids',
  'Vintage & Collectibles',
  'Other',
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];
