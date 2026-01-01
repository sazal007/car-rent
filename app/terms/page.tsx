import { TERMS_SECTIONS } from "@/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read Batoma's terms and conditions for electric vehicle rentals, tours, and services.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Terms() {
  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-32 md:pt-40 lg:pt-56 pb-12 sm:pb-16 md:pb-24">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-carent-text mb-3 sm:mb-4">
            Terms & Conditions
          </h1>

          <div className="space-y-8 sm:space-y-10 md:space-y-12 mt-8 sm:mt-10 md:mt-12">
            {TERMS_SECTIONS.map((section, idx) => (
              <div key={idx}>
                {section.title && (
                  <h2 className="text-2xl sm:text-2xl md:text-3xl font-semibold text-carent-text mb-4 sm:mb-5 md:mb-6">
                    {section.title}
                  </h2>
                )}
                <div className="space-y-3 sm:space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
                {section.list && (
                  <ul className="list-disc pl-5 sm:pl-6 mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-gray-600 text-sm sm:text-base md:text-lg">
                    {section.list.map((item, lIdx) => (
                      <li key={lIdx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
