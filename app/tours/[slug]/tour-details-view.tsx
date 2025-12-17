"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/shared/Button";
import { useCreateTourBooking } from "@/hooks/use-booking";
import { useTourBySlug } from "@/hooks/use-tours";
import { TourBookingData } from "@/types/booking";
import { Clock, Check, X } from "lucide-react";
import { DatePicker } from "@/components/booking/DatePicker";
import { ContactDetailsForm } from "@/components/booking/ContactDetailsForm";
import {
  PaymentMethodSelector,
  PaymentMethod,
} from "@/components/booking/PaymentMethodSelector";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { BookingSuccess } from "@/components/booking/BookingSuccess";
import { TourPackages } from "@/components/home/TourPakages";

const formatNpr = (value: number) =>
  new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(value);

type BookingStatus = "idle" | "submitting" | "success";

function TourDetailsViewContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slugParam = params.slug as string;
  const { mutate: createTourBooking, isPending } = useCreateTourBooking();

  // Extract slug from URL (format might be "id-slug" or just "slug")
  const actualSlug =
    slugParam.includes("-") && /^\d+-/.test(slugParam)
      ? slugParam.replace(/^\d+-/, "")
      : slugParam;

  const { data: tour, isLoading } = useTourBySlug(actualSlug);

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("idle");

  // Read URL parameters
  const urlDate = searchParams.get("date");
  const urlGuests = searchParams.get("guests");

  const [formData, setFormData] = useState({
    tourDate: urlDate || "",
    fullName: "",
    email: "",
    phone: "",
    paymentMethod: "cash" as PaymentMethod,
  });

  // Update dates when URL params change
  useEffect(() => {
    if (urlDate) {
      setFormData((prev) => ({
        ...prev,
        tourDate: urlDate,
      }));
    }
  }, [urlDate]);

  // Auto-open booking form if URL params are present
  useEffect(() => {
    if (urlDate || urlGuests) {
      setShowBookingForm(true);
    }
  }, [urlDate, urlGuests]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [actualSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-36 text-center">
        <p className="text-gray-500 text-lg">Loading tour details...</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tour) return;

    setBookingStatus("submitting");

    try {
      // Extract date from date format
      const tourDate = formData.tourDate; // Already in YYYY-MM-DD format

      // Convert phone number to number (remove non-digits)
      const phoneDigits = formData.phone.replace(/\D/g, "");
      const phoneNumber = phoneDigits ? parseInt(phoneDigits, 10) : 0;
      if (!phoneNumber || isNaN(phoneNumber)) {
        throw new Error("Invalid phone number");
      }

      // Get tour name (lowercase for consistency)
      const tourName = tour.data.name.toLowerCase();

      // Prepare booking data matching API format
      const bookingData: TourBookingData = {
        name: formData.fullName,
        "tour date": tourDate,
        "phone number": phoneNumber,
        email: formData.email,
        price: Number(tour.data.price),
        "payment method": formData.paymentMethod,
        "payment status": "pending",
        "pakage name": tourName,
      };

      createTourBooking(bookingData, {
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

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  if (!tour) {
    return (
      <div className="min-h-screen pt-36 text-center">
        <h2 className="text-3xl font-bold">Tour not found</h2>
        <Button onClick={() => router.push("/")} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const includes = JSON.parse(tour.data.includes || "[]") as string[];

  return (
    <div key={tour.id} className="pt-56 bg-white">
      {/* Top Split Section */}
      <div className="container mx-auto px-4 md:px-6 mb-20">
        <div className="flex flex-col lg:flex-row gap-12 relative items-start">
          {/* Left: Sticky Image */}
          <div className="lg:w-1/2 w-full lg:sticky lg:top-36 self-start">
            <div className="relative h-64 md:h-80 w-full overflow-hidden bg-white rounded-lg">
              <Image
                src={tour.data.image}
                alt={tour.data.name}
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:w-1/2 w-full pt-2">
            <h1 className="text-4xl md:text-5xl font-bold text-carent-text mb-3">
              {tour.data.name}
            </h1>

            {/* Duration */}
            <div className="flex items-center gap-2 text-gray-500 mb-6">
              <Clock size={20} />
              <span className="font-medium text-lg">{tour.data.duration}</span>
            </div>

            {/* Description */}
            <div
              className="text-gray-600 leading-relaxed mb-8 text-lg [&_pre]:whitespace-normal [&_pre]:bg-transparent [&_pre]:border-0 [&_pre]:p-0 [&_pre]:m-0 [&_code]:text-gray-600 [&_code]:font-normal [&_code]:text-base"
              dangerouslySetInnerHTML={{ __html: tour.data.content }}
            />

            {/* Price */}
            <div className="flex items-end gap-2 mb-8">
              <span className="text-4xl font-bold text-carent-text">
                {formatNpr(Number(tour.data.price))}
              </span>
              <span className="text-gray-500 mb-1">/per person</span>
            </div>

            {/* Includes Section */}
            {includes.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  What&apos;s Included
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {includes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-gray-600"
                    >
                      <Check
                        size={18}
                        className="text-carent-yellow shrink-0 mt-0.5"
                      />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Booking Section */}
            <div className="mb-12">
              {!showBookingForm ? (
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-stretch animate-in fade-in duration-300">
                  <Button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full sm:w-auto h-14 text-lg"
                  >
                    Book This Tour
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
                <div className="bg-white shadow-xl p-6 md:p-8 rounded-2xl border border-gray-100 transition-all duration-300 ease-out relative">
                  <button
                    onClick={() => {
                      setShowBookingForm(false);
                      setBookingStatus("idle");
                    }}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-0"
                    aria-label="Close booking form"
                  >
                    <X size={24} />
                  </button>

                  <h3 className="text-2xl font-bold mb-6 text-carent-text border-b border-gray-100 pb-4">
                    Book This Tour
                  </h3>

                  {bookingStatus === "success" ? (
                    <BookingSuccess
                      email={formData.email}
                      phone={formData.phone}
                      isSelfRide={false}
                      paymentMethod={formData.paymentMethod}
                      onClose={() => {
                        setShowBookingForm(false);
                        setBookingStatus("idle");
                      }}
                      variant="inline"
                    />
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6"
                    >
                      <DatePicker
                        label="Tour Date"
                        value={formData.tourDate}
                        onChange={(value) =>
                          handleFormDataChange({ tourDate: value })
                        }
                        type="date"
                        required
                      />

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

                      <PaymentMethodSelector
                        value={formData.paymentMethod}
                        onChange={(value) =>
                          handleFormDataChange({ paymentMethod: value })
                        }
                        variant="compact"
                      />

                      <BookingSummary
                        pricePerDay={Number(tour.data.price)}
                        days={1}
                        total={Number(tour.data.price)}
                        formatPrice={formatNpr}
                        isSubmitting={
                          bookingStatus === "submitting" || isPending
                        }
                        variant="compact"
                      />
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Other Tours Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Other Tour Packages
          </h2>
          <TourPackages excludeId={tour.id} limit={3} />
        </div>
      </div>
    </div>
  );
}

export default function TourDetailsView() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-36 text-center">
          <p className="text-gray-500 text-lg">Loading tour details...</p>
        </div>
      }
    >
      <TourDetailsViewContent />
    </Suspense>
  );
}
