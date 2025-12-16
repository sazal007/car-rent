"use client";

import React, { useState } from "react";

const termsTabs = [
  { id: "insurance", label: "Insurance and Coverage" },
  { id: "requirements", label: "Rental Requirements" },
  { id: "cancellation", label: "Cancellation Policy" },
];

export const TermsAndConditions: React.FC = () => {
  const [activeTab, setActiveTab] = useState("requirements");

  return (
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
  );
};

