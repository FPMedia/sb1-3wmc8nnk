export interface CustomerSession {
  phone: string;
  customerId: string;
}

export interface CustomerProfile {
  id: string;
  phone: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  created_at: string;
}