'use client';

import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface CarPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const CarPagination: React.FC<CarPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between mt-8 sm:mt-10 md:mt-12 pt-4 sm:pt-5 md:pt-6 border-t border-gray-100">
        <div className="w-1/3 flex justify-start">
            {currentPage > 1 && (
                <button 
                    onClick={() => onPageChange(currentPage - 1)}
                    className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-sm font-medium text-sm sm:text-base transition-colors bg-carent-yellow text-carent-dark hover:bg-yellow-400"
                >
                    <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" /> <span className="hidden sm:inline">Previous</span>
                </button>
            )}
        </div>

        <div className="w-1/3 text-center text-sm sm:text-base md:text-lg font-medium text-carent-text">
            {currentPage} / {totalPages}
        </div>

        <div className="w-1/3 flex justify-end">
            {currentPage < totalPages && (
                <button 
                    onClick={() => onPageChange(currentPage + 1)}
                    className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-sm font-medium text-sm sm:text-base transition-colors bg-carent-yellow text-carent-dark hover:bg-yellow-400"
                >
                    <span className="hidden sm:inline">Next</span> <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
            )}
        </div>
    </div>
  );
};

