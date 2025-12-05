'use client';

import React from 'react';
import { Button } from '../shared/Button';

export const ContactForm: React.FC = () => {
  return (
    <div className="bg-carent-gray p-8 md:p-10 rounded-2xl">
      <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-carent-text font-medium">Name</label>
            <input 
              type="text" 
              id="name"
              className="bg-white px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-carent-yellow transition-colors"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-carent-text font-medium">Email</label>
            <input 
              type="email" 
              id="email"
              className="bg-white px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-carent-yellow transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-carent-text font-medium">Phone number</label>
          <input 
            type="tel" 
            id="phone"
            className="bg-white px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-carent-yellow transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-carent-text font-medium">Message</label>
          <textarea 
            id="message"
            rows={4}
            className="bg-white px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-carent-yellow transition-colors resize-none"
          ></textarea>
        </div>

        <div>
          <Button type="submit" className="mt-2" icon={false}>Submit</Button>
        </div>

      </form>
    </div>
  );
};

