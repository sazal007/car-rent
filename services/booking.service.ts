import { BookingData } from "@/types/booking";
import { apiClient } from "@/api/axios";

export const createBooking = async (bookingData: BookingData) => {
  const response = await apiClient.post("/api/collections/booking/data/", {
    data: bookingData,
  });
  return response.data;
};
