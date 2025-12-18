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
    <div className="bg-white min-h-screen pt-56 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-5xl md:text-6xl font-semibold text-center text-carent-text mb-20">
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
