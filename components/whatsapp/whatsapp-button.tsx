"use client";

import React, { useState } from "react";
import { Button } from "../shared/Button";
interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function WhatsAppButton({
  phoneNumber,
  message = "Hello! I'm interested in your products/services.",
  className = "",
  icon,
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    // Format phone number (remove any non-digit characters)
    const formattedPhone = phoneNumber.replace(/\D/g, "");

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;

    // Open WhatsApp in a new window/tab
    window.open(whatsappUrl, "_blank");
  };

  // Default WhatsApp icon using SVG
  const defaultWhatsAppIcon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      className="w-6 h-6"
      fill="currentColor"
    >
      <path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5s.2-.3.4-.4c.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4S9.7 8.5 9.5 8c-.1-.7-.3-.7-.5-.7h-.5c-.2 0-.5.2-.6.3Q7 8.5 7 9.7c.1.9.4 1.8 1 2.6 1.1 1.6 2.5 2.9 4.2 3.7.5.2.9.4 1.4.5.5.2 1 .2 1.6.1.7-.1 1.3-.6 1.7-1.2.2-.4.2-.8.1-1.2zm2.5-9.1C15.2 1 8.9 1 5 4.9c-3.2 3.2-3.8 8.1-1.6 12L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2 5.5 0 9.9-4.4 9.9-9.9.1-2.6-1-5.1-2.8-7m-2.7 14c-1.3.8-2.8 1.3-4.4 1.3-1.5 0-2.9-.4-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3c-2.4-4-1.2-9 2.7-11.5S16.6 3.7 19 7.5c2.4 3.9 1.3 9-2.6 11.4" />
    </svg>
  );

  return (
    <div className="fixed right-6 bottom-6">
      {/* WhatsApp Button */}
      <Button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Contact us on WhatsApp"
        icon={false}
        className={`relative h-12 w-12 rounded-full bg-[#2ea218] p-0 shadow-lg hover:bg-[#2ea218] flex items-center justify-center ${className}`}
      >
        <div className="text-white flex items-center justify-center">
          {icon || defaultWhatsAppIcon}
        </div>
      </Button>

      {/* Hover tooltip */}
      {isHovered && (
        <div className="absolute right-0 bottom-16 mb-2 rounded-lg bg-gray-800 px-3 py-2 text-sm whitespace-nowrap text-white shadow-lg">
          Chat with us on WhatsApp
          {/* Arrow pointing down */}
          <div className="absolute top-full right-4 h-0 w-0 border-t-4 border-r-4 border-l-4 border-t-gray-800 border-r-transparent border-l-transparent" />
        </div>
      )}
    </div>
  );
}
