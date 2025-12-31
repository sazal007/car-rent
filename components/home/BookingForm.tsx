"use client";

import React, { useState, useEffect } from "react";
import { useVehicles } from "@/hooks/use-vehicles";
import { Vehicle } from "@/types/vehicles";
import { useCreateBooking } from "@/hooks/use-booking";
import { BookingData } from "@/types/booking";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { VehicleSelector } from "../booking/VehicleSelector";
import { DatePicker } from "../booking/DatePicker";
import { BookingDialog } from "../booking/BookingDialog";
import { ServiceType } from "../booking/ServiceTypeSelector";

type BookingStatus = "idle" | "submitting" | "success";

export const BookingForm: React.FC = () => {
  const { data: vehicles = [], isLoading } = useVehicles();
  const { mutate: createBooking, isPending } = useCreateBooking();
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("idle");

  const getInitialServiceType = (vehicle: Vehicle | null): ServiceType => {
    if (!vehicle) return "guided";
    return vehicle.category?.toLowerCase().includes("self-ride")
      ? "selfRide"
      : vehicle.category?.toLowerCase().includes("taxi")
      ? "taxi"
      : "guided";
  };

  const [formData, setFormData] = useState({
    serviceType: getInitialServiceType(selectedVehicle) as ServiceType,
    pickupDate: "",
    returnDate: "",
    fullName: "",
    email: "",
    phone: "",
    licenseFile: null as File | null,
  });

  useEffect(() => {
    if (selectedVehicle) {
      setFormData((prev) => ({
        ...prev,
        serviceType: getInitialServiceType(selectedVehicle),
      }));
    }
  }, [selectedVehicle]);

  useEffect(() => {
    if (departureDate) {
      setFormData((prev) => ({
        ...prev,
        pickupDate: `${departureDate}T10:00`,
      }));
    }
    if (returnDate) {
      setFormData((prev) => ({
        ...prev,
        returnDate: `${returnDate}T18:00`,
      }));
    }
  }, [departureDate, returnDate]);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      maximumFractionDigits: 0,
    }).format(value);

  const calculateTotal = () => {
    if (!formData.pickupDate || !formData.returnDate || !selectedVehicle)
      return null;
    const start = new Date(formData.pickupDate);
    const end = new Date(formData.returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const days = diffDays > 0 ? diffDays : 1;
    return { days, total: days * selectedVehicle.price };
  };

  const totals = calculateTotal();

  const handleBookClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedVehicle && departureDate && returnDate) {
      setShowBookingDialog(true);
    }
  };

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle || !totals) return;

    setBookingStatus("submitting");

    try {
      const pickupDateTime = new Date(formData.pickupDate);
      const returnDateTime = new Date(formData.returnDate);
      const rideDate = pickupDateTime.toISOString().split("T")[0];
      const returnDateStr = returnDateTime.toISOString().split("T")[0];

      let licenseImage: string | undefined;
      if (formData.licenseFile) {
        try {
          licenseImage = await uploadToCloudinary(formData.licenseFile, {
            folder: "licenses",
            resourceType: "image",
          });
        } catch (uploadError) {
          console.error("Failed to upload license image:", uploadError);
          throw new Error("Failed to upload license image. Please try again.");
        }
      }

      const rideTypeMap: Record<string, string> = {
        selfRide: "self-ride",
        guided: "guided",
        taxi: "taxi",
      };

      const phoneDigits = formData.phone.replace(/\D/g, "");
      const phoneNumber = phoneDigits ? parseInt(phoneDigits, 10) : 0;
      if (!phoneNumber || isNaN(phoneNumber)) {
        throw new Error("Invalid phone number");
      }

      const vehicleName = selectedVehicle.name.toLowerCase();

      const bookingData: BookingData = {
        name: formData.fullName,
        "ride type": rideTypeMap[formData.serviceType] || formData.serviceType,
        "ride date": rideDate,
        "phone number": phoneNumber,
        email: formData.email,
        price: totals.total,
        "return date": returnDateStr,
        "vehicle name": vehicleName,
        ...(licenseImage && { "license image": licenseImage }),
      };

      createBooking(bookingData, {
        onSuccess: () => {
          setBookingStatus("success");
        },
        onError: () => {
          setBookingStatus("idle");
        },
      });
    } catch (error) {
      console.error("Error preparing booking data:", error);
      setBookingStatus("idle");
    }
  };

  const selectedLabel =
    formData.serviceType === "selfRide"
      ? "Rent Scooter"
      : formData.serviceType === "taxi"
      ? "Book Taxi"
      : "Guided Scooter";

  const formatDateForInput = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <section className="py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <form
          onSubmit={handleBookClick}
          className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-100 p-4 sm:p-5 md:p-6 flex flex-col lg:flex-row items-stretch gap-4 sm:gap-5 md:gap-6"
        >
          <VehicleSelector
            vehicles={vehicles}
            selectedVehicle={selectedVehicle}
            onSelectVehicle={setSelectedVehicle}
            isLoading={isLoading}
            formatPrice={formatPrice}
          />

          <DatePicker
            label="Departure Date"
            value={departureDate}
            onChange={setDepartureDate}
            min={formatDateForInput(new Date())}
            type="date"
          />

          <DatePicker
            label="Return Date"
            value={returnDate}
            onChange={setReturnDate}
            min={departureDate || formatDateForInput(new Date())}
            type="date"
          />

          <div className="flex items-end">
            <button
              type="submit"
              disabled={!selectedVehicle || !departureDate || !returnDate}
              className="bg-carent-yellow hover:bg-yellow-400 text-carent-dark rounded-lg sm:rounded-xl px-6 sm:px-8 py-3 sm:py-4 font-semibold text-sm sm:text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-carent-yellow focus:ring-offset-2 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap w-full lg:w-auto"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>

      <BookingDialog
        isOpen={showBookingDialog}
        onClose={() => {
          setShowBookingDialog(false);
          setBookingStatus("idle");
          setFormData({
            serviceType: getInitialServiceType(selectedVehicle),
            pickupDate: "",
            returnDate: "",
            fullName: "",
            email: "",
            phone: "",
            licenseFile: null,
          });
          setDepartureDate("");
          setReturnDate("");
          setSelectedVehicle(null);
        }}
        vehicle={selectedVehicle}
        formData={formData}
        onFormDataChange={handleFormDataChange}
        onSubmit={handleBookingSubmit}
        bookingStatus={bookingStatus}
        isPending={isPending}
        totals={totals}
        formatPrice={formatPrice}
        selectedLabel={selectedLabel}
      />
    </section>
  );
};
