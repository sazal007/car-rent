"use client";

import React, { useState } from "react";
import { FAQS } from "@/constants";
import { FaqItem } from "@/components/faq/FaqItem";

export default function FaqView() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen pt-56 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-5xl md:text-6xl font-semibold text-center text-carent-text mb-20">
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
