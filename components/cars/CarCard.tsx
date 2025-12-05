'use client';

import React from 'react';
import Link from 'next/link';
import { Car } from '../../types';
import { Armchair, Settings, Briefcase } from 'lucide-react';

interface CarCardProps {
  car: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  // Create slug from car name
  const slug = car.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  return (
    <Link 
      href={`/cars/${car.id}-${slug}`}
      className="bg-carent-gray rounded-sm overflow-hidden group hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer h-full"
    >
      <div className="relative h-72 md:h-96 w-full overflow-hidden">
        <img 
          src={car.image} 
          alt={car.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
        />
      </div>
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-medium text-carent-text">{car.name}</h3>
          <div className="text-right">
            <span className="block text-2xl font-bold text-carent-text">${car.price}</span>
            <span className="text-sm text-gray-500">/Per day</span>
          </div>
        </div>
        
        <div className="mt-auto border-t border-gray-200 pt-6 grid grid-cols-3 gap-4 text-base text-gray-600">
          <div className="flex flex-col items-center gap-2">
            <Armchair size={20} strokeWidth={1.5} />
            <span className="text-xs uppercase tracking-wider">Seat</span>
            <span className="font-medium text-carent-text">{car.seats}</span>
          </div>
          <div className="flex flex-col items-center gap-2 border-l border-gray-200">
            <Settings size={20} strokeWidth={1.5} />
            <span className="text-xs uppercase tracking-wider">Gearbox</span>
            <span className="font-medium text-carent-text">{car.transmission}</span>
          </div>
          <div className="flex flex-col items-center gap-2 border-l border-gray-200">
            <Briefcase size={20} strokeWidth={1.5} />
            <span className="text-xs uppercase tracking-wider">Luggage</span>
            <span className="font-medium text-carent-text">{car.luggage} bags</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

