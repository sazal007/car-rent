"use client";

import React, { useState, useEffect } from "react";
import {
  Car,
  ChevronDown,
  X,
  Upload,
  CreditCard,
  Wallet,
  Banknote,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { useVehicles } from "@/hooks/use-vehicles";
import { Vehicle } from "@/types/vehicles";
import { useCreateBooking } from "@/hooks/use-booking";
import { BookingData } from "@/types/booking";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Button } from "../shared/Button";

type BookingStatus = "idle" | "submitting" | "success";

export const BookingForm: React.FC = () => {
  const { data: vehicles = [], isLoading } = useVehicles();
  const { mutate: createBooking, isPending } = useCreateBooking();
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showVehicleDropdown, setShowVehicleDropdown] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("idle");

  const initialServiceType = selectedVehicle?.category
    ?.toLowerCase()
    .includes("self-ride")
    ? "selfRide"
    : selectedVehicle?.category?.toLowerCase().includes("taxi")
    ? "taxi"
    : "guided";

  const [formData, setFormData] = useState({
    serviceType: initialServiceType as "selfRide" | "guided" | "taxi",
    pickupDate: "",
    returnDate: "",
    fullName: "",
    email: "",
    phone: "",
    licenseFile: null as File | null,
    paymentMethod: "cash" as "cash" | "digital" | "card",
  });

  // Update serviceType when vehicle changes
  useEffect(() => {
    if (selectedVehicle) {
      const serviceType = selectedVehicle.category
        ?.toLowerCase()
        .includes("self-ride")
        ? "selfRide"
        : selectedVehicle.category?.toLowerCase().includes("taxi")
        ? "taxi"
        : "guided";
      setFormData((prev) => ({ ...prev, serviceType }));
    }
  }, [selectedVehicle]);

  // Update dates when departure/return dates change
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

  const formatNpr = (value: number) =>
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

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle || !totals) return;

    setBookingStatus("submitting");

    try {
      // Extract dates from datetime-local format
      const pickupDateTime = new Date(formData.pickupDate);
      const returnDateTime = new Date(formData.returnDate);
      const rideDate = pickupDateTime.toISOString().split("T")[0]; // YYYY-MM-DD
      const returnDateStr = returnDateTime.toISOString().split("T")[0]; // YYYY-MM-DD

      // Upload license file to Cloudinary if present
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

      // Map serviceType to ride type (matching API format)
      const rideTypeMap: Record<string, string> = {
        selfRide: "self-ride",
        guided: "guided",
        taxi: "taxi",
      };

      // Convert phone number to number (remove non-digits)
      const phoneDigits = formData.phone.replace(/\D/g, "");
      const phoneNumber = phoneDigits ? parseInt(phoneDigits, 10) : 0;
      if (!phoneNumber || isNaN(phoneNumber)) {
        throw new Error("Invalid phone number");
      }

      // Get vehicle name (lowercase for consistency)
      const vehicleName = selectedVehicle.name.toLowerCase();

      // Prepare booking data matching API format
      const bookingData: BookingData = {
        name: formData.fullName,
        "ride type": rideTypeMap[formData.serviceType] || formData.serviceType,
        "ride date": rideDate,
        "phone number": phoneNumber,
        email: formData.email,
        price: totals.total,
        "payment method": formData.paymentMethod,
        "payment status": "pending",
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

  const isSelfRideSelected = formData.serviceType === "selfRide";
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
    <section className="py-10 bg-carent-gray">
      <div className="container mx-auto px-4 md:px-6">
        <form
          onSubmit={handleBookClick}
          className="bg-white rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-stretch gap-4 md:gap-0"
        >
          {/* Vehicle Selector - First */}
          <div className="flex-1 flex items-center gap-3 px-4  border-r border-gray-200 relative">
            <Car className="text-gray-400 w-5 h-5 shrink-0" />
            <div className="flex-1 relative">
              <button
                type="button"
                onClick={() => setShowVehicleDropdown(!showVehicleDropdown)}
                className="w-full flex items-center justify-between bg-transparent border-none outline-none text-gray-700 text-base md:text-lg focus:ring-0 focus-visible:ring-0 text-left"
              >
                <span
                  className={
                    selectedVehicle ? "text-gray-700" : "text-gray-400"
                  }
                >
                  {selectedVehicle
                    ? `${selectedVehicle.name} - ${formatPrice(
                        selectedVehicle.price
                      )}`
                    : "Select vehicle"}
                </span>
                <ChevronDown
                  className={`text-gray-400 w-4 h-4 transition-transform ${
                    showVehicleDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {showVehicleDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowVehicleDropdown(false)}
                  />
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-20">
                    {isLoading ? (
                      <div className="p-4 text-center text-gray-500">
                        Loading vehicles...
                      </div>
                    ) : vehicles.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        No vehicles available
                      </div>
                    ) : (
                      vehicles.map((vehicle) => (
                        <button
                          key={vehicle.id}
                          type="button"
                          onClick={() => {
                            setSelectedVehicle(vehicle);
                            setShowVehicleDropdown(false);
                          }}
                          className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                            selectedVehicle?.id === vehicle.id
                              ? "bg-carent-yellow/10"
                              : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 text-base">
                                {vehicle.name}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {vehicle.seats} seats • {vehicle.transmission}
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <div className="font-bold text-carent-text">
                                {formatPrice(vehicle.price)}
                              </div>
                              <div className="text-xs text-gray-500">/day</div>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Departure Date Input */}
          <div className="flex-1 flex flex-col px-4 py-3 border-r border-gray-200">
            <label className="text-xs text-gray-500 mb-1 font-medium">
              Departure day
            </label>
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                min={formatDateForInput(new Date())}
                className="flex-1 bg-transparent border-none outline-none text-gray-700 text-base md:text-lg focus:ring-0 focus-visible:ring-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>
          </div>

          {/* Return Date Input */}
          <div className="flex-1 flex flex-col px-4 py-3 border-r border-gray-200 md:border-r-0">
            <label className="text-xs text-gray-500 mb-1 font-medium">
              Return day
            </label>
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={departureDate || formatDateForInput(new Date())}
                className="flex-1 bg-transparent border-none outline-none text-gray-700 text-base md:text-lg focus:ring-0 focus-visible:ring-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>
          </div>

          {/* Book Button */}
          <div className="flex items-center md:ml-4">
            <button
              type="submit"
              disabled={!selectedVehicle || !departureDate || !returnDate}
              className="bg-carent-yellow hover:bg-yellow-400 text-carent-dark rounded-xl px-8 py-4 md:px-10 md:py-4 flex items-center justify-center gap-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-carent-yellow focus:ring-offset-2 shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-base md:text-lg">Book Now</span>
            </button>
          </div>
        </form>
      </div>

      {/* Booking Dialog */}
      {showBookingDialog && selectedVehicle && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => {
              setShowBookingDialog(false);
              setBookingStatus("idle");
            }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => {
                  setShowBookingDialog(false);
                  setBookingStatus("idle");
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-0"
                aria-label="Close booking form"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-bold mb-6 text-carent-text border-b border-gray-100 pb-4">
                {selectedLabel}
              </h3>

              {bookingStatus === "success" ? (
                <div className="flex flex-col items-center justify-center py-8 text-center transition-all duration-300 ease-out">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <CheckCircle size={40} />
                  </div>
                  <h4 className="text-2xl font-bold text-carent-text mb-2">
                    Booking Confirmed!
                  </h4>
                  <p className="text-gray-600 mb-6 text-lg max-w-md">
                    Thank you for choosing Kathmandu EV Rentals. We have sent a
                    confirmation email to <strong>{formData.email}</strong> and
                    a WhatsApp note to <strong>{formData.phone}</strong>.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg text-left w-full mb-6">
                    <p className="font-semibold text-gray-800">Next Steps:</p>
                    <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1 text-sm">
                      <li>Check your email for the booking voucher.</li>
                      {isSelfRideSelected && (
                        <li>
                          Bring your original license and ID for verification.
                        </li>
                      )}
                      {formData.paymentMethod === "cash" && (
                        <li>Please have exact cash ready upon arrival.</li>
                      )}
                    </ul>
                  </div>
                  <Button
                    onClick={() => {
                      setShowBookingDialog(false);
                      setBookingStatus("idle");
                      // Reset form
                      setFormData({
                        serviceType: initialServiceType,
                        pickupDate: "",
                        returnDate: "",
                        fullName: "",
                        email: "",
                        phone: "",
                        licenseFile: null,
                        paymentMethod: "cash",
                      });
                      setDepartureDate("");
                      setReturnDate("");
                      setSelectedVehicle(null);
                    }}
                    variant="outline"
                    icon={false}
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleBookingSubmit}
                  className="flex flex-col gap-6"
                >
                  {/* Service Type */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">
                      Choose Service
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "selfRide", label: "Self-Ride Scooter" },
                        { id: "guided", label: "Guided Scooter" },
                        { id: "taxi", label: "EV Taxi" },
                      ].map((option) => (
                        <button
                          type="button"
                          key={option.id}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              serviceType: option.id as
                                | "selfRide"
                                | "guided"
                                | "taxi",
                            })
                          }
                          className={`p-3 rounded-lg border text-left transition-all ${
                            formData.serviceType === option.id
                              ? "border-carent-yellow bg-carent-yellow/10"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <span className="block font-medium text-carent-text">
                            {option.label}
                          </span>
                          {option.id === "selfRide" && (
                            <span className="text-xs text-gray-500">
                              License upload required
                            </span>
                          )}
                          {option.id === "guided" && (
                            <span className="text-xs text-gray-500">
                              Rider/guide included
                            </span>
                          )}
                          {option.id === "taxi" && (
                            <span className="text-xs text-gray-500">
                              AC sedan/SUV with driver
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-700">
                        Pickup Date &amp; Time
                      </label>
                      <input
                        required
                        type="datetime-local"
                        className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-carent-yellow focus:ring-1 focus:ring-carent-yellow transition-all focus-visible:ring-0"
                        value={formData.pickupDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pickupDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-700">
                        Return Date &amp; Time
                      </label>
                      <input
                        required
                        type="datetime-local"
                        className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:border-carent-yellow focus:ring-1 focus:ring-carent-yellow transition-all focus-visible:ring-0"
                        value={formData.returnDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            returnDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* License Upload (Conditional for Self-ride) */}
                  {isSelfRideSelected && (
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 transition-all duration-300 ease-out">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-2">
                        <ShieldCheck size={18} className="text-blue-600" />
                        Upload Driving License
                        <span className="text-xs font-normal text-gray-500">
                          (Required for self-ride)
                        </span>
                      </label>
                      <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-white transition-all duration-300 ease-out cursor-pointer relative focus-within:border-blue-300">
                        <input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          required={isSelfRideSelected}
                          accept="image/*,.pdf"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              licenseFile: e.target.files?.[0] || null,
                            })
                          }
                        />
                        <Upload size={24} className="text-blue-400 mb-2" />
                        <span className="text-sm text-blue-600 font-medium">
                          {formData.licenseFile
                            ? formData.licenseFile.name
                            : "Click to upload License / ID"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Contact Details */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">
                      Contact Details
                    </h4>
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-carent-yellow focus-visible:ring-0"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fullName: e.target.value,
                        })
                      }
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-carent-yellow focus-visible:ring-0"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            email: e.target.value,
                          })
                        }
                      />
                      <input
                        type="tel"
                        placeholder="Phone / WhatsApp"
                        required
                        className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-carent-yellow focus-visible:ring-0"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">
                      Payment Method
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            paymentMethod: "cash",
                          })
                        }
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                          formData.paymentMethod === "cash"
                            ? "border-carent-yellow bg-carent-yellow/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Banknote size={24} className="mb-1" />
                        <span className="text-xs font-medium">Cash</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            paymentMethod: "digital",
                          })
                        }
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                          formData.paymentMethod === "digital"
                            ? "border-carent-yellow bg-carent-yellow/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Wallet size={24} className="mb-1" />
                        <span className="text-xs font-medium">
                          Digital Wallet
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            paymentMethod: "card",
                          })
                        }
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                          formData.paymentMethod === "card"
                            ? "border-carent-yellow bg-carent-yellow/10"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <CreditCard size={24} className="mb-1" />
                        <span className="text-xs font-medium">Card</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary & Submit */}
                  {totals ? (
                    <div className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Price breakdown</p>
                        <p className="text-sm text-gray-600">
                          Base rate: {formatNpr(selectedVehicle.price)} ×{" "}
                          {totals.days} {totals.days > 1 ? "days" : "day"}
                        </p>
                        <p className="text-2xl font-bold text-carent-text">
                          {formatNpr(totals.total)}
                        </p>
                      </div>
                      <Button
                        type="submit"
                        className="px-8"
                        icon={false}
                        disabled={bookingStatus === "submitting" || isPending}
                      >
                        {bookingStatus === "submitting" || isPending
                          ? "Processing..."
                          : "Confirm Booking"}
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-2 text-gray-400 text-sm">
                      Select dates to see price
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};
