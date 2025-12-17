import { createBooking, createTourBooking } from "@/services/booking.service";
import { useMutation } from "@tanstack/react-query";
import { BookingData, TourBookingData } from "@/types/booking";
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

export const useCreateTourBooking = () => {
  return useMutation({
    mutationFn: (bookingData: TourBookingData) =>
      createTourBooking(bookingData),
    onSuccess: (data) => {
      toast.success("Tour booking created successfully");
      console.log("Tour booking created successfully:", data);
    },
    onError: (error) => {
      toast.error("Failed to create tour booking");
      console.error("Failed to create tour booking:", error);
    },
  });
};
