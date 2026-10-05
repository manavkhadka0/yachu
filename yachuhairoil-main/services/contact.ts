import { fetcher, franchise } from "@/lib/api";
import type {
  Contact,
  ContactFormData,
  PaginatedContacts,
  ContactFilters,
} from "@/types";

export const contactApi = {
  getContacts: (params?: ContactFilters): Promise<PaginatedContacts> => {
    const query = new URLSearchParams({
      ...(params as Record<string, string>),
      franchise,
    }).toString();
    return fetcher<PaginatedContacts>(`/contacts/?${query}`);
  },

  createContact: (data: ContactFormData): Promise<Contact> =>
    fetcher<Contact>("/contacts/", {
      method: "POST",
      body: JSON.stringify({ ...data, franchise }),
    }),
};
