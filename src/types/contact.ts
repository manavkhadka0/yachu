export interface Contact {
  id: number;
  full_name: string;
  email: string | null;
  phone: string | null;
  message: string;
  created_at: string;
  updated_at: string;
  franchise: number | null;
}

export interface ContactFormData {
  full_name: string;
  email?: string;
  phone?: string;
  message: string;
}

export interface PaginatedContacts {
  count: number;
  next: string | null;
  previous: string | null;
  results: Contact[];
}

export interface ContactFilters {
  page?: number;
  page_size?: number;
}
