'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqItem as FaqItemType } from '../../types';

interface FaqItemProps {
  item: FaqItemType;
  isOpen: boolean;
  onToggle: () => void;
}

export const FaqItem: React.FC<FaqItemProps> = ({ item, isOpen, onToggle }) => {
  return (
    <div className="bg-carent-gray rounded-sm overflow-hidden mb-4">
      <button 
        onClick={onToggle} 
        className="flex justify-between items-center w-full p-6 text-left font-medium text-lg md:text-xl text-carent-text hover:bg-black/5 transition-colors focus:outline-none"
      >
        <span>{item.question}</span>
        <ChevronDown 
          className={`transform transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} 
          size={20}
        />
      </button>
      
      <div 
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
           <div className="px-6 pb-6 text-gray-600 leading-relaxed text-base md:text-lg">
             {item.answer}
           </div>
        </div>
      </div>
    </div>
  );
};

