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
import { Loader } from "@/components/shared/loader";
import { PriceTier, TourData } from "@/types/tours";
import { BlogContactForm } from "@/components/blog/BlogContactForm";

const PRICE_FIELD_NAME =
  "price(min_group_size,max_group_size,price_per_person)" as keyof TourData;

const formatUsd = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

// Parse price JSON string and get price tiers
const parsePriceTiers = (priceString: string): PriceTier[] => {
  try {
    const priceTiers: PriceTier[] = JSON.parse(priceString || "[]");
    return priceTiers.sort((a, b) => a.min_group_size - b.min_group_size);
  } catch {
    // Fallback: try to parse as number for backward compatibility
    const numPrice = Number(priceString);
    if (!isNaN(numPrice) && numPrice > 0) {
      return [
        { min_group_size: 1, max_group_size: 999, price_per_person: numPrice },
      ];
    }
    return [];
  }
};

// Get the starting price (highest price for smallest group)
const getStartingPrice = (priceString: string): number => {
  const tiers = parsePriceTiers(priceString);
  if (tiers.length === 0) return 0;
  return Math.max(...tiers.map((tier) => tier.price_per_person));
};

// Get valid group sizes from price tiers
const getValidGroupSizes = (priceTiers: PriceTier[]): number[] => {
  if (priceTiers.length === 0) return [1];

  const minSize = Math.min(...priceTiers.map((tier) => tier.min_group_size));
  const maxSize = Math.max(...priceTiers.map((tier) => tier.max_group_size));

  // Generate array of valid group sizes from min to max
  return Array.from({ length: maxSize - minSize + 1 }, (_, i) => minSize + i);
};

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
  const [selectedGroupSize, setSelectedGroupSize] = useState<number>(1);

  // Read URL parameters
  const urlDate = searchParams.get("date");
  const urlGuests = searchParams.get("guests");

  // Initialize selectedGroupSize based on price tiers when tour loads
  useEffect(() => {
    if (tour) {
      const tiers = parsePriceTiers(tour.data[PRICE_FIELD_NAME] || "");
      if (tiers.length > 0) {
        const validSizes = getValidGroupSizes(tiers);
        if (validSizes.length > 0) {
          setSelectedGroupSize((currentSize) => {
            // Use URL guests parameter if provided and valid
            if (urlGuests) {
              const guestsNum = parseInt(urlGuests, 10);
              if (!isNaN(guestsNum) && validSizes.includes(guestsNum)) {
                return guestsNum;
              }
            }
            // Only update if current size is not in valid range
            return validSizes.includes(currentSize)
              ? currentSize
              : validSizes[0];
          });
        }
      }
    }
  }, [tour, urlGuests]);

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
      <div className="min-h-screen pt-36 text-center flex items-center justify-center">
        <Loader />
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

      // Calculate price based on selected group size
      const priceTiers = parsePriceTiers(tour.data[PRICE_FIELD_NAME] || "");
      let bookingPrice = getStartingPrice(tour.data[PRICE_FIELD_NAME] || "");

      // Find the appropriate price tier for selected group size
      const selectedTier = priceTiers.find(
        (tier) =>
          selectedGroupSize >= tier.min_group_size &&
          selectedGroupSize <= tier.max_group_size
      );
      if (selectedTier) {
        // Price = price_per_person * group_size
        bookingPrice = selectedTier.price_per_person * selectedGroupSize;
      } else if (priceTiers.length > 0) {
        // Fallback to highest tier price
        bookingPrice =
          priceTiers[priceTiers.length - 1].price_per_person *
          selectedGroupSize;
      }

      // Prepare booking data matching API format
      const bookingData: TourBookingData = {
        name: formData.fullName,
        "tour date": tourDate,
        "phone number": phoneNumber,
        Email: formData.email,
        price: bookingPrice,
        "payment method": formData.paymentMethod,
        status: "pending",
        "package name": tourName,
        "group size": selectedGroupSize.toString(),
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
      <div className="min-h-screen pt-24 sm:pt-32 md:pt-36 text-center px-3 sm:px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          Tour not found
        </h2>
        <Button onClick={() => router.push("/")} className="mt-4 sm:mt-6">
          Go Back
        </Button>
      </div>
    );
  }

  const includes = JSON.parse(tour.data.includes || "[]") as string[];
  const excludes = tour.data.excludes || "";
  const priceTiers = parsePriceTiers(tour.data[PRICE_FIELD_NAME] || "");
  const startingPrice = getStartingPrice(tour.data[PRICE_FIELD_NAME] || "");

  // Calculate total price for selected group size
  const selectedTier = priceTiers.find(
    (tier) =>
      selectedGroupSize >= tier.min_group_size &&
      selectedGroupSize <= tier.max_group_size
  );
  const currentPricePerPerson = selectedTier?.price_per_person || startingPrice;
  // Price = price_per_person * group_size
  const totalPrice = currentPricePerPerson * selectedGroupSize;

  return (
    <div key={tour.id} className="bg-white pt-24 sm:pt-32 ">
      {/* Full Screen Hero Image */}
      <div className="relative mx-auto w-[100vw] h-[70vh] overflow-hidden bg-white">
        <Image
          src={tour.data.image}
          alt={tour.data.name}
          fill
          priority
          className="object-cover w-full h-44"
        />
      </div>

      {/* Details Section */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 pt-8 sm:pt-12 md:pt-16 mb-12 sm:mb-16 md:mb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-carent-text mb-2 sm:mb-3">
            {tour.data.name}
          </h1>

          {/* Duration */}
          <div className="flex items-center gap-2 text-gray-500 mb-4 sm:mb-5 md:mb-6">
            <Clock size={18} className="sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base md:text-lg">
              {tour.data.duration}
            </span>
          </div>

          {/* Description */}
          <div
            className="text-gray-600 leading-relaxed mb-6 sm:mb-7 md:mb-8 text-sm sm:text-base md:text-lg [&_pre]:whitespace-normal [&_pre]:bg-transparent [&_pre]:border-0 [&_pre]:p-0 [&_pre]:m-0 [&_code]:text-gray-600 [&_code]:font-normal [&_code]:text-sm [&_code]:sm:text-base"
            dangerouslySetInnerHTML={{ __html: tour.data.content }}
          />

          {/* Price */}
          <div className="mb-6 sm:mb-7 md:mb-8">
            <div className="flex items-end gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <span className="text-3xl sm:text-4xl font-bold text-carent-text">
                From {formatUsd(startingPrice)}
              </span>
              <span className="text-gray-500 mb-1 text-sm sm:text-base">
                /per person
              </span>
            </div>

            {/* Pricing Tiers Table */}
            {priceTiers.length > 0 && (
              <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5 border border-gray-200">
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
                  Group Pricing
                </h4>
                <div className="space-y-2 sm:space-y-2.5">
                  {priceTiers.map((tier, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm sm:text-base"
                    >
                      <span className="text-gray-600">
                        {tier.min_group_size === tier.max_group_size
                          ? `${tier.min_group_size} ${
                              tier.min_group_size === 1 ? "person" : "people"
                            }`
                          : `${tier.min_group_size}-${tier.max_group_size} people`}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {formatUsd(tier.price_per_person)}/person
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Includes Section */}
          {includes.length > 0 && (
            <div className="mb-6 sm:mb-7 md:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                What&apos;s Included
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                {includes.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-gray-600 text-sm sm:text-base"
                  >
                    <Check
                      size={16}
                      className="sm:w-4.5 sm:h-4.5 text-carent-yellow shrink-0 mt-0.5"
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Excludes Section */}
          {excludes && (
            <div className="mb-6 sm:mb-7 md:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                What&apos;s Not Included
              </h3>
              <div className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {excludes}
              </div>
            </div>
          )}

          {/* Booking Section */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            {!showBookingForm ? (
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-stretch animate-in fade-in duration-300">
                <Button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full sm:w-auto h-12 sm:h-14 text-base sm:text-lg"
                >
                  Book This Tour
                </Button>
                <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 px-2 py-2 sm:py-3">
                  <span className="text-carent-text font-medium text-sm sm:text-base md:text-lg">
                    Or call to book
                  </span>
                  <span className="text-carent-text font-medium text-sm sm:text-base md:text-lg">
                    (+977) 9705471232
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-white shadow-xl p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-100 transition-all duration-300 ease-out relative">
                <button
                  onClick={() => {
                    setShowBookingForm(false);
                    setBookingStatus("idle");
                  }}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-0"
                  aria-label="Close booking form"
                >
                  <X size={20} className="sm:w-6 sm:h-6" />
                </button>

                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 md:mb-6 text-carent-text border-b border-gray-100 pb-3 sm:pb-4">
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
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <DatePicker
                      label="Tour Date"
                      value={formData.tourDate}
                      onChange={(value) =>
                        handleFormDataChange({ tourDate: value })
                      }
                      type="date"
                      required
                    />

                    {/* Group Size Selector */}
                    {priceTiers.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <label className="text-sm sm:text-base font-medium text-gray-900">
                          Number of People
                        </label>
                        <select
                          value={selectedGroupSize}
                          onChange={(e) =>
                            setSelectedGroupSize(Number(e.target.value))
                          }
                          className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-carent-yellow focus:border-transparent"
                          required
                        >
                          {getValidGroupSizes(priceTiers).map((size) => (
                            <option key={size} value={size}>
                              {size} {size === 1 ? "person" : "people"}
                            </option>
                          ))}
                        </select>
                        {selectedTier && (
                          <p className="text-xs sm:text-sm text-gray-500">
                            Price: {formatUsd(currentPricePerPerson)} per person
                          </p>
                        )}
                      </div>
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

                    <PaymentMethodSelector
                      value={formData.paymentMethod}
                      onChange={(value) =>
                        handleFormDataChange({ paymentMethod: value })
                      }
                      variant="compact"
                    />

                    <BookingSummary
                      pricePerDay={currentPricePerPerson}
                      days={selectedGroupSize}
                      total={totalPrice}
                      formatPrice={formatUsd}
                      isSubmitting={bookingStatus === "submitting" || isPending}
                      variant="compact"
                      label={selectedGroupSize === 1 ? "person" : "people"}
                    />
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Other Tours Section */}
      <div className="bg-gray-50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
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
        <div className="min-h-screen pt-36 text-center flex items-center justify-center">
          <Loader />
        </div>
      }
    >
      <TourDetailsViewContent />
      <BlogContactForm />
    </Suspense>
  );
}
