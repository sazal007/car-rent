import { BookingData, TourBookingData } from "@/types/booking";
import { apiClient } from "@/api/axios";

export const createBooking = async (bookingData: BookingData) => {
  const response = await apiClient.post("/api/collections/booking/data/", {
    data: bookingData,
  });
  return response.data;
};

export const createTourBooking = async (bookingData: TourBookingData) => {
  const response = await apiClient.post(
    "/api/collections/tour-bookings/data/",
    {
      data: bookingData,
    }
  );
  return response.data;
};
