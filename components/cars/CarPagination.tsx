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
    <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-100">
        <div className="w-1/3 flex justify-start">
            {currentPage > 1 && (
                <button 
                    onClick={() => onPageChange(currentPage - 1)}
                    className="flex items-center gap-2 px-8 py-3 rounded-sm font-medium transition-colors bg-carent-yellow text-carent-dark hover:bg-yellow-400"
                >
                    <ArrowLeft size={18} /> Previous
                </button>
            )}
        </div>

        <div className="w-1/3 text-center text-lg font-medium text-carent-text">
            {currentPage} / {totalPages}
        </div>

        <div className="w-1/3 flex justify-end">
            {currentPage < totalPages && (
                <button 
                    onClick={() => onPageChange(currentPage + 1)}
                    className="flex items-center gap-2 px-8 py-3 rounded-sm font-medium transition-colors bg-carent-yellow text-carent-dark hover:bg-yellow-400"
                >
                    Next <ArrowRight size={18} />
                </button>
            )}
        </div>
    </div>
  );
};

