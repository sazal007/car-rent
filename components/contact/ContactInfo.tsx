'use client';

import React from 'react';
import { Headphones, MapPin, Hourglass, MessageCircle } from 'lucide-react';

export const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-semibold text-carent-text mb-8">Our contact details</h2>
      
      <div className="flex flex-col gap-10">
        
        {/* Support */}
        <div className="flex gap-4">
          <div className="mt-1">
             <Headphones size={28} className="text-carent-text" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-carent-text mb-2">Support</h3>
            <p className="text-gray-600 mb-1">hello@kathmanduevrentals.com</p>
            <p className="text-gray-600">Call: (+977) 980-1234567</p>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex gap-4">
          <div className="mt-1">
             <MessageCircle size={28} className="text-carent-text" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-carent-text mb-2">WhatsApp</h3>
            <p className="text-gray-600 mb-1">Chat for quick confirmations</p>
            <p className="text-gray-600">(+977) 980-9876543</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex gap-4">
          <div className="mt-1">
             <MapPin size={28} className="text-carent-text" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-carent-text mb-2">Address</h3>
            <p className="text-gray-600 mb-1">Kathmandu Durbar Square</p>
            <p className="text-gray-600">Ward 18, Kathmandu 44600</p>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex gap-4">
          <div className="mt-1">
             <Hourglass size={28} className="text-carent-text" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-carent-text mb-2">Working hours</h3>
            <p className="text-gray-600 mb-1">Everyday: 7:00 AM - 9:00 PM</p>
            <p className="text-gray-600">Airport pickups: 24/7 on request</p>
          </div>
        </div>

      </div>
    </div>
  );
};

