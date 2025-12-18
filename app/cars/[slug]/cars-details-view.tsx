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
import { ServiceType } from "@/components/booking/ServiceTypeSelector";
import { PaymentMethod } from "@/components/booking/PaymentMethodSelector";
import { Loader } from "@/components/shared/loader";

const formatNpr = (value: number) =>
  new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
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
    return car.category?.toLowerCase().includes("self-ride")
      ? "selfRide"
      : car.category?.toLowerCase().includes("taxi")
      ? "taxi"
      : "guided";
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
      const serviceType = car.category?.toLowerCase().includes("self-ride")
        ? "selfRide"
        : car.category?.toLowerCase().includes("taxi")
        ? "taxi"
        : "guided";
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

  const calculateTotal = () => {
    if (!formData.pickupDate || !formData.returnDate || !car) return null;
    const start = new Date(formData.pickupDate);
    const end = new Date(formData.returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const days = diffDays > 0 ? diffDays : 1;
    return { days, total: days * car.price };
  };

  const totals = calculateTotal();

  const selectedLabel =
    formData.serviceType === "selfRide"
      ? "Rent Scooter"
      : formData.serviceType === "taxi"
      ? "Book Taxi"
      : "Guided Scooter";
  const priceUnit = car?.category?.toLowerCase().includes("tour")
    ? "Per tour"
    : "Per day";

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  if (!car) {
    return (
      <div className="min-h-screen pt-36 text-center">
        <h2 className="text-3xl font-bold">Car not found</h2>
        <Button onClick={() => router.push("/cars")} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div key={car.id} className="pt-56 bg-white">
      {/* Top Split Section */}
      <div className="container mx-auto px-4 md:px-6 mb-20">
        <div className="flex flex-col lg:flex-row gap-12 relative items-start">
          {/* Left: Sticky Image */}
          <div className="lg:w-1/2 w-full lg:sticky lg:top-36 self-start">
            <div className="relative h-64 md:h-80 w-full overflow-hidden bg-white rounded-lg">
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
          <div className="lg:w-1/2 w-full pt-2">
            <h1 className="text-4xl md:text-5xl font-bold text-carent-text mb-3">
              {car.name}
            </h1>
            <p className="text-gray-500 mb-6 font-medium text-lg">
              {car.brand || "Brand"}
              <span className="mx-2 text-gray-300">|</span> {car.type}
              <span className="mx-2 text-gray-300">|</span> {car.year || "2023"}
            </p>

            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {car.description ||
                "Experience the ultimate comfort and performance with our premium rental vehicles. Perfect for any journey."}
            </p>

            <div className="flex items-end gap-2 mb-8">
              <span className="text-4xl font-bold text-carent-text">
                {formatNpr(car.price)}
              </span>
              <span className="text-gray-500 mb-1">/{priceUnit}</span>
            </div>

            {/* Booking Section */}
            <div className="mb-12">
              {!showBookingForm ? (
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-stretch animate-in fade-in duration-300">
                  <Button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full sm:w-auto h-14 text-lg"
                  >
                    Book Now
                  </Button>
                  <div className="flex items-center gap-2 px-2 py-3">
                    <span className="text-carent-text font-medium text-lg">
                      Or call to book
                    </span>
                    <span className="text-carent-text font-medium text-lg">
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
                  formatPrice={formatNpr}
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
