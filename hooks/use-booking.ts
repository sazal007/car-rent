import { createBooking } from "@/services/booking.service";
import { useMutation } from "@tanstack/react-query";
import { BookingData } from "@/types/booking";
import { toast } from "sonner";

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: (bookingData: BookingData) => createBooking(bookingData),
    onSuccess: (data) => {
      toast.success("Booking created successfully");
      console.log("Booking created successfully:", data);
    },
    onError: (error) => {
      toast.error("Failed to create booking");
      console.error("Failed to create booking:", error);
    },
  });
};
