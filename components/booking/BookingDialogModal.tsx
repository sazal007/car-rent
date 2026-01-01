"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Vehicle } from "@/types/vehicles";
import { useVehicles } from "@/hooks/use-vehicles";
import { useCreateBooking } from "@/hooks/use-booking";
import { BookingData } from "@/types/booking";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { VehicleSelector } from "./VehicleSelector";
import { ServiceTypeSelector, ServiceType } from "./ServiceTypeSelector";
import { LicenseUpload } from "./LicenseUpload";
import { ContactDetailsForm } from "./ContactDetailsForm";
import { DatePicker } from "./DatePicker";
import { BookingSummary } from "./BookingSummary";
import { BookingSuccess } from "./BookingSuccess";

type BookingStatus = "idle" | "submitting" | "success";

interface BookingDialogModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedVehicle?: Vehicle | null;
  preselectedCategory?: string | null;
}

export const BookingDialogModal: React.FC<BookingDialogModalProps> = ({
  isOpen,
  onClose,
  preselectedVehicle = null,
  preselectedCategory = null,
}) => {
  const { data: vehicles = [], isLoading } = useVehicles();
  const { mutate: createBooking, isPending } = useCreateBooking();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(
    preselectedVehicle
  );
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("idle");

  // Filter vehicles by category if preselectedCategory is provided
  const availableVehicles = preselectedCategory
    ? vehicles.filter(
        (v) => v.category?.toLowerCase() === preselectedCategory.toLowerCase()
      )
    : vehicles;

  // Set preselected vehicle when it changes
  useEffect(() => {
    if (preselectedVehicle) {
      setSelectedVehicle(preselectedVehicle);
    }
  }, [preselectedVehicle]);

  // Auto-select first vehicle if category is preselected and no vehicle is selected
  useEffect(() => {
    if (
      preselectedCategory &&
      !selectedVehicle &&
      availableVehicles.length > 0
    ) {
      setSelectedVehicle(availableVehicles[0]);
    }
  }, [preselectedCategory, availableVehicles, selectedVehicle]);

  const getInitialServiceType = (vehicle: Vehicle | null): ServiceType => {
    if (!vehicle) return "guided";
    const isTaxi = vehicle.category?.toLowerCase() === "taxi";
    const isScooter = vehicle.category?.toLowerCase() === "scooter";

    if (isTaxi) {
      if (vehicle.guidedOptions && vehicle.guidedOptions.length > 0) {
        return "guided";
      }
      return "taxi";
    }

    if (isScooter) {
      return "guided";
    }

    return "guided";
  };

  const [formData, setFormData] = useState({
    serviceType: "guided" as ServiceType,
    pickupDate: "",
    returnDate: "",
    fullName: "",
    email: "",
    phone: "",
    licenseFile: null as File | null,
    numberOfPersons: 1,
  });

  useEffect(() => {
    if (selectedVehicle) {
      setFormData((prev) => ({
        ...prev,
        serviceType: getInitialServiceType(selectedVehicle),
      }));
    }
  }, [selectedVehicle]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setBookingStatus("idle");
      setSelectedVehicle(preselectedVehicle || null);
      setFormData({
        serviceType: "guided",
        pickupDate: "",
        returnDate: "",
        fullName: "",
        email: "",
        phone: "",
        licenseFile: null,
        numberOfPersons: 1,
      });
    }
  }, [isOpen, preselectedVehicle]);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  // Helper to extract numeric price from complex price strings
  const extractPrice = (
    priceString: string,
    numberOfPersons: number = 1
  ): number => {
    const simpleNum = parseFloat(priceString);
    if (!isNaN(simpleNum)) return simpleNum;

    const maxPersonPattern = /max\s+(\d+)\s+person\s*-\s*(?:\$)?(\d+)/i;
    const maxMatch = priceString.match(maxPersonPattern);
    if (maxMatch && maxMatch[1] && maxMatch[2]) {
      const maxPersons = parseInt(maxMatch[1], 10);
      if (numberOfPersons <= maxPersons) {
        return parseFloat(maxMatch[2]) || 0;
      }
    }

    const bracketMaxPattern = /\[max\s+(\d+)\s+person\]\s*(?:\$)?(\d+)/i;
    const bracketMaxMatch = priceString.match(bracketMaxPattern);
    if (bracketMaxMatch && bracketMaxMatch[1] && bracketMaxMatch[2]) {
      const maxPersons = parseInt(bracketMaxMatch[1], 10);
      if (numberOfPersons <= maxPersons) {
        return parseFloat(bracketMaxMatch[2]) || 0;
      }
    }

    const pattern1 = new RegExp(
      `(?:\\$)?(\\d+)\\s+for\\s+${numberOfPersons}\\s+person`,
      "i"
    );
    const match1 = priceString.match(pattern1);
    if (match1 && match1[1]) {
      return parseFloat(match1[1]) || 0;
    }

    const pattern2 = new RegExp(
      `(?:^|,\\s*)${numberOfPersons}\\s+(?:\\$)?(\\d+)`,
      "i"
    );
    const match2 = priceString.match(pattern2);
    if (match2 && match2[1]) {
      return parseFloat(match2[1]) || 0;
    }

    const rangePattern = /(\d+)\/(\d+)\s+(?:\$)?(\d+)/g;
    let rangeMatch;
    while ((rangeMatch = rangePattern.exec(priceString)) !== null) {
      const min = parseInt(rangeMatch[1], 10);
      const max = parseInt(rangeMatch[2], 10);
      if (numberOfPersons >= min && numberOfPersons <= max) {
        return parseFloat(rangeMatch[3]) || 0;
      }
    }

    const priceMatch = priceString.match(/(?:\$)?(\d+)/);
    if (priceMatch && priceMatch[1]) {
      return parseFloat(priceMatch[1]) || 0;
    }

    return 0;
  };

  const getEffectivePrice = (): number => {
    if (!selectedVehicle) return 0;

    const isScooter = selectedVehicle.category?.toLowerCase() === "scooter";
    const isTaxi = selectedVehicle.category?.toLowerCase() === "taxi";

    if (isScooter || isTaxi) {
      if (
        formData.serviceType === "guided" &&
        selectedVehicle.guidedOptions &&
        selectedVehicle.guidedOptions.length > 0
      ) {
        return extractPrice(
          selectedVehicle.guidedOptions[0].price,
          isTaxi ? formData.numberOfPersons : 1
        );
      }
      if (
        (formData.serviceType === "selfRide" ||
          (isTaxi && formData.serviceType === "taxi")) &&
        selectedVehicle.unguidedOptions &&
        selectedVehicle.unguidedOptions.length > 0
      ) {
        return extractPrice(
          selectedVehicle.unguidedOptions[0].price,
          isTaxi ? formData.numberOfPersons : 1
        );
      }
    }

    return selectedVehicle.price || 0;
  };

  const calculateTotal = () => {
    if (!formData.pickupDate || !formData.returnDate || !selectedVehicle)
      return null;
    const start = new Date(formData.pickupDate);
    const end = new Date(formData.returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const days = diffDays > 0 ? diffDays : 1;
    const effectivePrice = getEffectivePrice();

    const isScooterTour =
      selectedVehicle.category?.toLowerCase() === "scooter" &&
      selectedVehicle.price === 0;
    const isTaxiTour =
      selectedVehicle.category?.toLowerCase() === "taxi" &&
      selectedVehicle.price === 0;
    const total =
      isScooterTour || isTaxiTour ? effectivePrice : days * effectivePrice;

    return { days, total };
  };

  const totals = calculateTotal();

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      const effectivePrice = getEffectivePrice();
      const bookingPrice = totals ? totals.total : effectivePrice;

      const bookingData: BookingData = {
        name: formData.fullName,
        "ride type": rideTypeMap[formData.serviceType] || formData.serviceType,
        "ride date": rideDate,
        "phone number": phoneNumber,
        email: formData.email,
        price: bookingPrice,
        "return date": returnDateStr,
        "vehicle name": vehicleName,
        ...(licenseImage && { "license image": licenseImage }),
        ...(selectedVehicle.category?.toLowerCase() === "taxi" && {
          "number of persons": formData.numberOfPersons,
        }),
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

  const getSelectedLabel = (): string => {
    if (!selectedVehicle) return "Book Your Ride";
    const isTaxi = selectedVehicle.category?.toLowerCase() === "taxi";
    const isScooter = selectedVehicle.category?.toLowerCase() === "scooter";

    if (isTaxi) {
      return formData.serviceType === "guided"
        ? "Book Taxi with Guide"
        : "Book Taxi";
    }

    if (isScooter) {
      return formData.serviceType === "selfRide"
        ? "Rent Scooter"
        : "Guided Scooter";
    }

    return formData.serviceType === "selfRide"
      ? "Rent Scooter"
      : formData.serviceType === "taxi"
      ? "Book Taxi"
      : "Guided Scooter";
  };

  const selectedLabel = getSelectedLabel();
  const isSelfRideSelected = formData.serviceType === "selfRide";
  const isTaxi = selectedVehicle?.category?.toLowerCase() === "taxi";

  const getTaxiMaxPersons = (): number => {
    if (!isTaxi || !selectedVehicle) return 1;
    const option =
      formData.serviceType === "guided"
        ? selectedVehicle.guidedOptions?.[0]?.price
        : selectedVehicle.unguidedOptions?.[0]?.price;
    if (!option) return 10;
    const maxMatch = option.match(/max\s+(\d+)\s+person/i);
    if (maxMatch && maxMatch[1]) {
      return parseInt(maxMatch[1], 10);
    }
    return 10;
  };

  const effectivePrice = getEffectivePrice();
  const isScooterTour =
    selectedVehicle?.category?.toLowerCase() === "scooter" &&
    selectedVehicle?.price === 0;
  const isTaxiTour =
    selectedVehicle?.category?.toLowerCase() === "taxi" &&
    selectedVehicle?.price === 0;
  const showDaysBreakdown =
    totals && !isScooterTour && !isTaxiTour ? totals.days : undefined;

  const handleClose = () => {
    setBookingStatus("idle");
    setSelectedVehicle(preselectedVehicle || null);
    setFormData({
      serviceType: "guided",
      pickupDate: "",
      returnDate: "",
      fullName: "",
      email: "",
      phone: "",
      licenseFile: null,
      numberOfPersons: 1,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={handleClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-2.5 md:p-3 lg:p-4 overflow-visible">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 max-w-2xl w-full max-h-[98vh] sm:max-h-[95vh] md:max-h-[90vh] overflow-y-auto overflow-x-hidden relative">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 text-gray-400 hover:text-gray-900 transition-colors z-10"
            aria-label="Close"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 text-gray-900 pr-8 sm:pr-10">
            {selectedVehicle ? selectedLabel : "Book Your Ride"}
          </h3>

          {bookingStatus === "success" ? (
            <BookingSuccess
              email={formData.email}
              phone={formData.phone}
              isSelfRide={isSelfRideSelected}
              onClose={handleClose}
              variant="dialog"
            />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-5 md:space-y-6 overflow-visible"
            >
              {/* Vehicle Selection */}
              <div className="relative overflow-visible" style={{ zIndex: 60 }}>
                <VehicleSelector
                  vehicles={preselectedCategory ? availableVehicles : vehicles}
                  selectedVehicle={selectedVehicle}
                  onSelectVehicle={setSelectedVehicle}
                  isLoading={isLoading}
                  formatPrice={formatPrice}
                />
              </div>

              {selectedVehicle && (
                <>
                  <ServiceTypeSelector
                    value={formData.serviceType}
                    onChange={(value) =>
                      handleFormDataChange({ serviceType: value })
                    }
                    vehicle={selectedVehicle}
                    variant="compact"
                  />

                  {/* Number of Persons Selector for Taxis */}
                  {isTaxi && (
                    <div>
                      <label
                        htmlFor="numberOfPersons"
                        className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
                      >
                        Number of Persons
                      </label>
                      <select
                        id="numberOfPersons"
                        value={formData.numberOfPersons}
                        onChange={(e) =>
                          handleFormDataChange({
                            numberOfPersons: parseInt(e.target.value, 10),
                          })
                        }
                        className="w-full px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-carent-yellow focus:border-carent-yellow outline-none transition-colors"
                        required
                      >
                        {Array.from(
                          { length: getTaxiMaxPersons() },
                          (_, i) => i + 1
                        ).map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Person" : "Persons"}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <DatePicker
                      label="Pickup Date & Time"
                      value={formData.pickupDate}
                      onChange={(value) =>
                        handleFormDataChange({ pickupDate: value })
                      }
                      type="datetime-local"
                      required
                    />
                    <DatePicker
                      label="Return Date & Time"
                      value={formData.returnDate}
                      onChange={(value) =>
                        handleFormDataChange({ returnDate: value })
                      }
                      type="datetime-local"
                      required
                    />
                  </div>

                  {isSelfRideSelected && (
                    <LicenseUpload
                      file={formData.licenseFile}
                      onChange={(file) =>
                        handleFormDataChange({ licenseFile: file })
                      }
                      required
                    />
                  )}

                  <ContactDetailsForm
                    fullName={formData.fullName}
                    email={formData.email}
                    phone={formData.phone}
                    onFullNameChange={(value) =>
                      handleFormDataChange({ fullName: value })
                    }
                    onEmailChange={(value) =>
                      handleFormDataChange({ email: value })
                    }
                    onPhoneChange={(value) =>
                      handleFormDataChange({ phone: value })
                    }
                  />

                  {totals ? (
                    <BookingSummary
                      pricePerDay={effectivePrice}
                      days={showDaysBreakdown}
                      total={totals.total}
                      formatPrice={formatPrice}
                      isSubmitting={bookingStatus === "submitting" || isPending}
                      variant="compact"
                      label={isScooterTour ? "tour" : undefined}
                    />
                  ) : (
                    <div className="text-center py-2 text-gray-400 text-xs sm:text-sm">
                      Select dates to see price
                    </div>
                  )}
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </>
  );
};
