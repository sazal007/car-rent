


"use client";

import React from "react";
import { Phone, MapPin, Clock, Mail } from "lucide-react";

interface ContactDetail {
  text: string;
  link?: string;
}

export const ContactInfo: React.FC = () => {
  const contactItems = [
    {
      icon: Phone,
      title: "Call Us",
      details: [
        { text: "(+977) 9705471232", link: "tel:+9779705471232" },
      ],
    },
    {
      icon: Mail,
      title: "Email",
      details: [
        { text: "bato1111ma@gmail.com", link: "mailto:bato1111ma@gmail.com" },
      ],
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: [
        { text: "Rudramati Marg" },
        { text: "Kathmandu 44600" },
      ],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [
        { text: "Everyday: 7:00 AM - 9:00 PM" },
        { text: "Airport pickups: 24/7 on request" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {contactItems.map((item, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="shrink-0 p-3 bg-gray-50 rounded-xl group-hover:bg-carent-yellow/10 transition-all duration-300">
            <item.icon className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {item.title}
            </h3>
            <div className="space-y-1">
              {item.details.map((detail: ContactDetail, idx) => (
                detail.link ? (
                  <a
                    key={idx}
                    href={detail.link}
                    className="block text-sm text-gray-600 hover:text-black hover:underline transition-colors duration-200"
                  >
                    {detail.text}
                  </a>
                ) : (
                  <p key={idx} className="text-sm text-gray-600">
                    {detail.text}
                  </p>
                )
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};