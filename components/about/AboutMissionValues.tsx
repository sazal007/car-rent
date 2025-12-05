'use client';

import React from 'react';
import { COMPANY_VALUES } from '../../constants';

export const AboutMissionValues: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Mission */}
          <div>
            <h2 className="text-3xl font-semibold text-carent-text mb-6">Our mission</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Our mission is to provide exceptional car rental services that make urban travel easy, affordable, and enjoyable. We aim to create a seamless experience by offering a diverse fleet of vehicles, flexible rental options, and outstanding customer support. We are committed to being your trusted partner in city travel, ensuring every journey is smooth, convenient, and tailored to your needs.
            </p>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-3xl font-semibold text-carent-text mb-8">Our values</h2>
            <div className="space-y-6">
              {COMPANY_VALUES.map((value, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="mt-2.5 w-1.5 h-1.5 bg-black shrink-0" />
                  <div>
                    <span className="font-bold text-carent-text mr-1">{value.title}:</span>
                    <span className="text-gray-600 leading-relaxed">{value.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

