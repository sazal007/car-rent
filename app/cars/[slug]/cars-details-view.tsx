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
import {
  Armchair,
  Settings,
  Briefcase,
  Fuel,
  CheckCircle,
  Star,
  X,
  Upload,
  CreditCard,
  Wallet,
  Banknote,
  ShieldCheck,
} from "lucide-react";

const formatNpr = (value: number) =>
  new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(value);

const termsTabs = [
  { id: "insurance", label: "Insurance and Coverage" },
  { id: "requirements", label: "Rental Requirements" },
  { id: "cancellation", label: "Cancellation Policy" },
];

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

  const [activeTab, setActiveTab] = useState("requirements");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("idle");

  const initialServiceType = car?.category?.toLowerCase().includes("self-ride")
    ? "selfRide"
    : car?.category?.toLowerCase().includes("taxi")
    ? "taxi"
    : "guided";

  // Read URL parameters
  const urlDate = searchParams.get("date");
  const urlGuests = searchParams.get("guests");
  const urlLocation = searchParams.get("location");

  const [formData, setFormData] = useState({
    serviceType: initialServiceType as "selfRide" | "guided" | "taxi",
    pickupDate: urlDate ? `${urlDate}T10:00` : "",
    returnDate: urlDate ? `${urlDate}T18:00` : "",
    fullName: "",
    email: "",
    phone: "",
    licenseFile: null as File | null,
    paymentMethod: "cash" as "cash" | "digital" | "card",
  });

  // Update serviceType when car loads
  useEffect(() => {
    if (car) {
      const serviceType = car.category?.toLowerCase().includes("self-ride")
        ? "selfRide"
        : car.category?.toLowerCase().includes("taxi")
        ? "taxi"
        : "guided";
      setFormData((prev) => ({ ...prev, serviceType }));
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
      <div className="min-h-screen pt-36 text-center">
        <p className="text-gray-500 text-lg">Loading vehicle details...</p>
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

  const isSelfRide = car?.category
    ? car.category.toLowerCase().includes("self-ride")
    : false;
  const isSelfRideSelected = formData.serviceType === "selfRide";
  const selectedLabel =
    formData.serviceType === "selfRide"
      ? "Rent Scooter"
      : formData.serviceType === "taxi"
      ? "Book Taxi"
      : "Guided Scooter";
  const priceUnit = car?.category?.toLowerCase().includes("tour")
    ? "Per tour"
    : "Per day";

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
                        Thank you for choosing Kathmandu EV Rentals. We have
                        sent a confirmation email to{" "}
                        <strong>{formData.email}</strong> and a WhatsApp note to{" "}
                        <strong>{formData.phone}</strong>.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg text-left w-full mb-6">
                        <p className="font-semibold text-gray-800">
                          Next Steps:
                        </p>
                        <ul className="list-disc pl-5 text-gray-600 mt-2 space-y-1 text-sm">
                          <li>Check your email for the booking voucher.</li>
                          {isSelfRide && (
                            <li>
                              Bring your original license and ID for
                              verification.
                            </li>
                          )}
                          {formData.paymentMethod === "cash" && (
                            <li>Please have exact cash ready upon arrival.</li>
                          )}
                        </ul>
                      </div>
                      <Button
                        onClick={() => setShowBookingForm(false)}
                        variant="outline"
                        icon={false}
                      >
                        Close
                      </Button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-6"
                    >
                      {/* 0. Service Type */}
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

                      {/* 1. Dates */}
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

                      {/* 2. License Upload (Conditional for Self-ride) */}
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

                      {/* 3. Personal Details */}
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

                      {/* 4. Payment Options */}
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

                      {/* 5. Summary & Submit */}
                      {totals ? (
                        <div className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="space-y-1">
                            <p className="text-sm text-gray-500">
                              Price breakdown
                            </p>
                            <p className="text-sm text-gray-600">
                              Base rate: {formatNpr(car.price)} × {totals.days}{" "}
                              {totals.days > 1 ? "days" : "day"}
                            </p>
                            <p className="text-2xl font-bold text-carent-text">
                              {formatNpr(totals.total)}
                            </p>
                          </div>
                          <Button
                            type="submit"
                            className="px-8"
                            icon={false}
                            disabled={
                              bookingStatus === "submitting" || isPending
                            }
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
              )}
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-4 gap-4 border-y border-gray-100 py-8 mb-10">
              <div className="flex flex-col items-center gap-3">
                <Armchair
                  strokeWidth={1.5}
                  className="text-carent-text w-6 h-6"
                />
                <span className="text-sm font-semibold text-carent-text">
                  Seat
                </span>
                <span className="text-sm text-gray-500">{car.seats}</span>
              </div>
              <div className="flex flex-col items-center gap-3 border-l border-gray-100">
                <Settings
                  strokeWidth={1.5}
                  className="text-carent-text w-6 h-6"
                />
                <span className="text-sm font-semibold text-carent-text">
                  Gearbox
                </span>
                <span className="text-sm text-gray-500">
                  {car.transmission}
                </span>
              </div>
              <div className="flex flex-col items-center gap-3 border-l border-gray-100">
                <Briefcase
                  strokeWidth={1.5}
                  className="text-carent-text w-6 h-6"
                />
                <span className="text-sm font-semibold text-carent-text">
                  Luggage
                </span>
                <span className="text-sm text-gray-500">
                  {car.luggage} bags
                </span>
              </div>
              <div className="flex flex-col items-center gap-3 border-l border-gray-100">
                <Fuel strokeWidth={1.5} className="text-carent-text w-6 h-6" />
                <span className="text-sm font-semibold text-carent-text">
                  Fuel
                </span>
                <span className="text-sm text-gray-500">
                  {car.fuel || "Electric"}
                </span>
              </div>
            </div>

            {/* Vehicle Features */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-carent-text">
                Vehicle features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {(car.features && car.features.length > 0
                  ? car.features
                  : ["Bluetooth", "A/C", "GPS", "Power Windows"]
                ).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle
                      size={20}
                      className="text-carent-text fill-transparent"
                      strokeWidth={2}
                    />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-semibold mb-12 text-center text-carent-text">
            Vehicle gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(car.gallery && car.gallery.length > 0
              ? car.gallery
              : [car.image, car.image, car.image]
            ).map((img, idx) => (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden h-64 hover:opacity-95 transition-opacity"
              >
                <Image
                  src={img}
                  alt={`Gallery ${idx}`}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms and Conditions (Dark Section) */}
      <section className="py-24 bg-carent-dark text-white rounded-t-[40px] md:rounded-t-[60px] mx-2 md:mx-4">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-bold mb-16">Terms and Conditions</h2>

          <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
            {/* Left: Tabs */}
            <div className="w-full md:w-1/3 flex flex-col gap-2">
              {termsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left text-xl py-2 pl-0 md:pl-6 border-l-2 transition-all duration-300 font-medium focus-visible:outline-none focus-visible:ring-0 ${
                    activeTab === tab.id
                      ? "border-white text-white"
                      : "border-transparent text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-2/3">
              {activeTab === "requirements" && (
                <div className="space-y-10 transition-all duration-300 ease-out">
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-white">
                      Driver age:
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      Renters must be at least 18 years old for Scooters and 21
                      for Cars.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-white">
                      Driver&apos;s license:
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      A valid driver&apos;s license (International or Home
                      Country) is required for self-ride rentals.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-white">
                      Security Deposit:
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      A refundable security deposit or original passport is
                      required during the rental period.
                    </p>
                  </div>
                </div>
              )}
              {activeTab === "insurance" && (
                <div className="space-y-10 transition-all duration-300 ease-out">
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-white">
                      Insurance and Coverage:
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      Our vehicles come with standard third-party insurance.
                      Damage to the rental vehicle is the responsibility of the
                      renter unless an additional waiver is purchased.
                    </p>
                  </div>
                </div>
              )}
              {activeTab === "cancellation" && (
                <div className="space-y-10 transition-all duration-300 ease-out">
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-white">
                      Cancellation Policy:
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      Free cancellation is available up to 24 hours before the
                      scheduled pickup time. Cancellations made within 24 hours
                      may be subject to a small booking fee.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl font-semibold mb-12 max-w-sm leading-tight text-carent-text">
            Feedback from satisfied renter
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-carent-gray p-10 rounded-sm w-full md:w-1/2">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} size={16} fill="black" className="text-black" />
                ))}
                <Star size={16} fill="#e5e5e5" className="text-gray-200" />
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                &quot;Renting the electric scooter was the highlight of my
                Kathmandu trip. So easy to park and zip around Thamel!&quot;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="https://picsum.photos/seed/u7/100/100"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                  alt="James"
                />
                <span className="font-bold text-carent-text text-lg">
                  James Wilson
                </span>
              </div>
            </div>
            <div className="bg-carent-gray p-10 rounded-sm w-full md:w-1/2">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} fill="black" className="text-black" />
                ))}
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                &quot;The guided tour was exceptional. My guide knew all the
                history and safe routes. Highly recommended for
                first-timers.&quot;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="https://picsum.photos/seed/u2/100/100"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                  alt="Sarah"
                />
                <span className="font-bold text-carent-text text-lg">
                  Sarah Chen
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <CarCollection title="You may also like" limit={2} excludeId={car.id} />
    </div>
  );
}

export default function CarsDetailsView() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-36 text-center">
          <p className="text-gray-500 text-lg">Loading vehicle details...</p>
        </div>
      }
    >
      <CarsDetailsViewContent />
    </Suspense>
  );
}
