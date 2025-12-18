"use client";

import React, { useState } from "react";
import { FaqItem } from "@/components/faq/FaqItem";
import { useGetFAQs } from "@/hooks/use-faq";
import { Loader } from "@/components/shared/loader";

export default function FaqView() {
  const { data: faqs, isLoading, error } = useGetFAQs();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-36 text-center flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-36 text-center flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          An error occurred while loading FAQs
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-32 md:pt-40 lg:pt-56 pb-12 sm:pb-16 md:pb-24">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center text-carent-text mb-12 sm:mb-16 md:mb-20">
          Frequently Asked Questions
        </h1>

        <div className="max-w-4xl mx-auto">
          {faqs?.map((faq, index) => (
            <FaqItem
              key={index}
              item={{ question: faq.question, answer: faq.answer }}
              isOpen={openIndex === index}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
