"use client";

import React, { useState } from "react";
import { FaqItem } from "@/components/faq/FaqItem";
import { FAQS } from "@/constants";

export default function FaqView() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-32 md:pt-40 lg:pt-56 pb-12 sm:pb-16 md:pb-24">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center text-carent-text mb-12 sm:mb-16 md:mb-20">
          Frequently Asked Questions
        </h1>

        <div className="max-w-4xl mx-auto">
          {FAQS.map((faq, index) => (
            <FaqItem
              key={index}
              item={faq}
              isOpen={openIndex === index}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
