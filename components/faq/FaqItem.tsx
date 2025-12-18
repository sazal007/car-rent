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
    <div className="bg-carent-gray rounded-sm overflow-hidden mb-3 sm:mb-4">
      <button 
        onClick={onToggle} 
        className="flex justify-between items-start sm:items-center w-full p-4 sm:p-5 md:p-6 text-left font-medium text-base sm:text-lg md:text-xl text-carent-text hover:bg-black/5 transition-colors focus:outline-none gap-3 sm:gap-4"
      >
        <span className="flex-1">{item.question}</span>
        <ChevronDown 
          className={`transform transition-transform duration-300 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      <div 
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
           <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
             {item.answer}
           </div>
        </div>
      </div>
    </div>
  );
};

