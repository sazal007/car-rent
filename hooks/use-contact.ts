import { useMutation } from "@tanstack/react-query";
import { ContactFormData } from "../types/contact";
import { toast } from "sonner";
import { createContact } from "../services/contact.service";
export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: (data: ContactFormData) => {
      // Transform ContactFormSubmission to ContactFormData format
      const contactData: ContactFormData = {
        name: data.name,
        email: data.email || undefined,
        phone_number: data.phone_number || undefined,
        message: data.message,
      };

      return createContact(contactData);
    },
    onSuccess: (data) => {
      toast.success("Contact form submitted successfully");
      console.log("Contact form submitted successfully:", data);
    },
    onError: (error) => {
      toast.error("Failed to submit contact form");
      console.error("Failed to submit contact form:", error);
    },
  });
};
