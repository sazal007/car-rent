"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/shared/Button";
import { CarCollection } from "@/components/home/CarCollection";
import { useCreateBooking } from "@/hooks/use-booking";
import { useVehicleBySlug } from "@/hooks/use-vehicles";
import { BookingData } from "@/types/booking";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { InlineBookingForm } from "@/components/booking/InlineBookingForm";
import { CarSpecs } from "@/components/cars/CarSpecs";
import { CarFeatures } from "@/components/cars/CarFeatures";
import { CarGallery } from "@/components/cars/CarGallery";
import { TermsAndConditions } from "@/components/cars/TermsAndConditions";
import { CarFeedback } from "@/components/cars/CarFeedback";
import { ServiceOptions } from "@/components/cars/ServiceOptions";
import { ServiceType } from "@/components/booking/ServiceTypeSelector";
import { PaymentMethod } from "@/components/booking/PaymentMethodSelector";
import { Loader } from "@/components/shared/loader";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

type BookingStatus = "idle" | "submitting" | "success";

function CarsDetailsViewContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slugParam = params.slug as string;
  const { mutate: createBooking, isPending } = useCreateBooking();

  // Extract slug from URL (format might be "id-slug" or just "slug")
  // Try to get the actual slug - if it contains a number prefix, extract the slug part
  const actualSlug =
    slugParam.includes("-") && /^\d+-/.test(slugParam)
      ? slugParam.replace(/^\d+-/, "")
      : slugParam;

  const { data: car, isLoading } = useVehicleBySlug(actualSlug);

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("idle");

  const getInitialServiceType = (): ServiceType => {
    if (!car) return "guided";
    const isTaxi = car.category?.toLowerCase() === "taxi";
    const isScooter = car.category?.toLowerCase() === "scooter";

    // For taxis with options, default to "guided" (with guide) if available, otherwise "taxi" (without guide)
    if (isTaxi) {
      if (car.guidedOptions && car.guidedOptions.length > 0) {
        return "guided";
      }
      return "taxi";
    }

    // For scooters, default to "guided" if available
    if (isScooter) {
      return "guided";
    }

    return "guided";
  };

  // Read URL parameters
  const urlDate = searchParams.get("date");
  const urlGuests = searchParams.get("guests");
  const urlLocation = searchParams.get("location");

  const [formData, setFormData] = useState({
    serviceType: getInitialServiceType() as ServiceType,
    pickupDate: urlDate ? `${urlDate}T10:00` : "",
    returnDate: urlDate ? `${urlDate}T18:00` : "",
    fullName: "",
    email: "",
    phone: "",
    licenseFile: null as File | null,
    paymentMethod: "cash" as PaymentMethod,
  });

  // Update serviceType when car loads
  useEffect(() => {
    if (car) {
      const isTaxi = car.category?.toLowerCase() === "taxi";
      const isScooter = car.category?.toLowerCase() === "scooter";

      // For taxis with options, default to "guided" (with guide) if available, otherwise "taxi" (without guide)
      let serviceType: ServiceType = "guided";
      if (isTaxi) {
        if (car.guidedOptions && car.guidedOptions.length > 0) {
          serviceType = "guided";
        } else if (car.unguidedOptions && car.unguidedOptions.length > 0) {
          serviceType = "taxi";
        }
      } else if (isScooter) {
        // For scooters, default to "guided" if available
        serviceType = "guided";
      }

      setFormData((prev) => ({
        ...prev,
        serviceType,
      }));
    }
  }, [car]);

  // Update dates when URL params change
  useEffect(() => {
    if (urlDate) {
      setFormData((prev) => ({
        ...prev,
        pickupDate: `${urlDate}T10:00`,
        returnDate: `${urlDate}T18:00`,
      }));
    }
  }, [urlDate]);

  // Auto-open booking form if URL params are present
  useEffect(() => {
    if (urlDate || urlGuests || urlLocation) {
      setShowBookingForm(true);
    }
  }, [urlDate, urlGuests, urlLocation]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [actualSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-36 text-center flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!car || !totals) return;

    setBookingStatus("submitting");

    try {
      // Extract dates from datetime-local format
      const pickupDateTime = new Date(formData.pickupDate);
      const returnDateTime = new Date(formData.returnDate);
      const rideDate = pickupDateTime.toISOString().split("T")[0]; // YYYY-MM-DD
      const returnDate = returnDateTime.toISOString().split("T")[0]; // YYYY-MM-DD

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
      const vehicleName = car.name.toLowerCase();

      // Get effective price for booking
      const effectivePrice = getEffectivePrice();
      const bookingPrice = totals ? totals.total : effectivePrice;

      // Prepare booking data matching API format
      const bookingData: BookingData = {
        name: formData.fullName,
        "ride type": rideTypeMap[formData.serviceType] || formData.serviceType,
        "ride date": rideDate,
        "phone number": phoneNumber,
        email: formData.email,
        price: bookingPrice,
        "payment method": formData.paymentMethod,
        "payment status": "pending",
        "return date": returnDate,
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

  // Helper to extract numeric price from complex price strings (for taxis)
  const extractPrice = (priceString: string): number => {
    // If it's a simple number, parse it
    const simpleNum = parseFloat(priceString);
    if (!isNaN(simpleNum)) return simpleNum;

    // For complex strings like "[ max 3 person] - $250 for 1 person , 2 $400, 3 $500"
    // Extract the first price found
    const priceMatch = priceString.match(/\$(\d+)/);
    if (priceMatch && priceMatch[1]) {
      return parseFloat(priceMatch[1]) || 0;
    }

    return 0;
  };

  // Get the effective price based on vehicle type and service type
  const getEffectivePrice = (): number => {
    if (!car) return 0;

    // For scooters and taxis with guided/unguided options, use those prices
    const isScooter = car.category?.toLowerCase() === "scooter";
    const isTaxi = car.category?.toLowerCase() === "taxi";

    if (isScooter || isTaxi) {
      // Guided option (with guide)
      if (
        formData.serviceType === "guided" &&
        car.guidedOptions &&
        car.guidedOptions.length > 0
      ) {
        return extractPrice(car.guidedOptions[0].price);
      }
      // Unguided options (without guide)
      // For scooters: selfRide = unguided
      // For taxis: taxi = unguided (without guide)
      if (
        (formData.serviceType === "selfRide" ||
          (isTaxi && formData.serviceType === "taxi")) &&
        car.unguidedOptions &&
        car.unguidedOptions.length > 0
      ) {
        return extractPrice(car.unguidedOptions[0].price);
      }
    }

    // For other vehicles or fallback, use the regular price
    return car.price || 0;
  };

  const calculateTotal = () => {
    if (!formData.pickupDate || !formData.returnDate || !car) return null;
    const start = new Date(formData.pickupDate);
    const end = new Date(formData.returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const days = diffDays > 0 ? diffDays : 1;
    const effectivePrice = getEffectivePrice();

    // For scooters and taxis with tour pricing (price === 0), use fixed price per tour
    // For other vehicles, multiply by days
    const isScooterTour =
      car.category?.toLowerCase() === "scooter" && car.price === 0;
    const isTaxiTour =
      car.category?.toLowerCase() === "taxi" && car.price === 0;
    const total =
      isScooterTour || isTaxiTour ? effectivePrice : days * effectivePrice;

    return { days, total };
  };

  const totals = calculateTotal();

  const getSelectedLabel = (): string => {
    const isTaxi = car?.category?.toLowerCase() === "taxi";
    const isScooter = car?.category?.toLowerCase() === "scooter";

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

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  if (!car) {
    return (
      <div className="min-h-screen pt-24 sm:pt-32 md:pt-36 text-center px-3 sm:px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          Car not found
        </h2>
        <Button onClick={() => router.push("/cars")} className="mt-4 sm:mt-6">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div key={car.id} className="pt-24 sm:pt-32 md:pt-40 lg:pt-56 bg-white">
      {/* Top Split Section */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 mb-12 sm:mb-16 md:mb-20">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 relative items-start">
          {/* Left: Sticky Image */}
          <div className="lg:w-1/2 w-full lg:sticky lg:top-24 xl:top-36 self-start">
            <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden bg-white rounded-lg sm:rounded-xl">
              <Image
                src={car.image}
                alt={car.name}
                width={800}
                height={600}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:w-1/2 w-full pt-0 sm:pt-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-carent-text mb-2 sm:mb-3">
              {car.name}
            </h1>
            <p className="text-gray-500 mb-4 sm:mb-5 md:mb-6 font-medium text-sm sm:text-base md:text-lg">
              {car.brand || "Brand"}
              <span className="mx-1.5 sm:mx-2 text-gray-300">|</span> {car.type}
              <span className="mx-1.5 sm:mx-2 text-gray-300">|</span>{" "}
              {car.year || "2023"}
            </p>

            <p className="text-gray-600 leading-relaxed mb-6 sm:mb-7 md:mb-8 text-sm sm:text-base md:text-lg">
              {car.description ||
                "Experience the ultimate comfort and performance with our premium rental vehicles. Perfect for any journey."}
            </p>

            {/* <div className="flex items-end gap-1.5 sm:gap-2 mb-6 sm:mb-7 md:mb-8">
              <span className="text-3xl sm:text-4xl font-bold text-carent-text">
                {formatPrice(getEffectivePrice() || getDisplayPrice())}
              </span>
              <span className="text-gray-500 mb-1 text-sm sm:text-base">
                /{priceUnit}
              </span>
            </div> */}

            {/* Service Options (for scooters) */}
            <ServiceOptions vehicle={car} />

            {/* Booking Section */}
            <div className="mb-8 sm:mb-10 md:mb-12">
              {!showBookingForm ? (
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-stretch animate-in fade-in duration-300">
                  <Button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full sm:w-auto h-12 sm:h-14 text-base sm:text-lg"
                  >
                    Book Now
                  </Button>
                  <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 px-2 py-2 sm:py-3">
                    <span className="text-carent-text font-medium text-sm sm:text-base md:text-lg">
                      Or call to book
                    </span>
                    <span className="text-carent-text font-medium text-sm sm:text-base md:text-lg">
                      (+977) 980-1234567
                    </span>
                  </div>
                </div>
              ) : (
                <InlineBookingForm
                  isOpen={showBookingForm}
                  onClose={() => {
                    setShowBookingForm(false);
                    setBookingStatus("idle");
                  }}
                  vehicle={car}
                  formData={formData}
                  onFormDataChange={handleFormDataChange}
                  onSubmit={handleSubmit}
                  bookingStatus={bookingStatus}
                  isPending={isPending}
                  totals={totals}
                  formatPrice={formatPrice}
                  selectedLabel={selectedLabel}
                />
              )}
            </div>

            <CarSpecs vehicle={car} />

            <CarFeatures vehicle={car} />
          </div>
        </div>
      </div>

      <CarGallery vehicle={car} />

      <TermsAndConditions />

      <CarFeedback />

      {/* You May Also Like */}
      <CarCollection title="You may also like" limit={2} excludeId={car.id} />
    </div>
  );
}

export default function CarsDetailsView() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-36 text-center flex items-center justify-center">
          <Loader />
        </div>
      }
    >
      <CarsDetailsViewContent />
    </Suspense>
  );
}
