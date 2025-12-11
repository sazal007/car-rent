import { Contact, ContactFormData } from "@/types/contact";
import { apiClient } from "@/api/axios";

export const createContact = async (
  contactData: ContactFormData
): Promise<Contact> => {
  const response = await apiClient.post("/api/contact/", contactData);

  return response.data;
};
