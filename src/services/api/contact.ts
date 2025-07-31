import {
  Contact,
  ContactFormData,
  PaginatedContacts,
  ContactFilters,
} from "@/types/contact";
import { BASE_API_URL } from "@/utils/config";
import { franchise } from "@/constants/constant";

export const contactAPI = {
  getContacts: async (
    filters: ContactFilters = {}
  ): Promise<PaginatedContacts> => {
    const { page = 1, page_size = 10 } = filters;

    const url = new URL(`${BASE_API_URL}/contacts/`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("page_size", page_size.toString());

    if (franchise) {
      url.searchParams.append("franchise", franchise);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch contacts: ${response.status}`);
    }

    return await response.json();
  },

  createContact: async (contactData: ContactFormData): Promise<Contact> => {
    const response = await fetch(`${BASE_API_URL}/contacts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...contactData,
        franchise: franchise,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create contact: ${response.status}`);
    }

    return await response.json();
  },
};
