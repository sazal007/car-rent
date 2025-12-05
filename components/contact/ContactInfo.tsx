'use client';

import React from 'react';
import { Headphones, MapPin, Hourglass } from 'lucide-react';

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
            <p className="text-gray-600 mb-1">example@gmail.com</p>
            <p className="text-gray-600">(+91) 125 888 666</p>
          </div>
        </div>

        {/* Address */}
        <div className="flex gap-4">
          <div className="mt-1">
             <MapPin size={28} className="text-carent-text" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-carent-text mb-2">Address</h3>
            <p className="text-gray-600 mb-1">Chicago HQ Estica Cop.</p>
            <p className="text-gray-600">Macomb, MI 48042</p>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex gap-4">
          <div className="mt-1">
             <Hourglass size={28} className="text-carent-text" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-carent-text mb-2">Working hours</h3>
            <p className="text-gray-600 mb-1">Mon - Thu: 11am - 7pm</p>
            <p className="text-gray-600">Sat: 11am - 2pm</p>
          </div>
        </div>

      </div>
    </div>
  );
};

