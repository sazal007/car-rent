"use client";

import React, { useState } from "react";
import { Button } from "../shared/Button";
import { useSubmitContactForm } from "@/hooks/use-contact";

export const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const { mutate, isPending } = useSubmitContactForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { name, email, phone_number: phone, message },
      {
        onSuccess: () => {
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
        },
      }
    );
  };

  const inputClasses = "w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-carent-yellow transition-all duration-200";
  const labelClasses = "block text-sm font-medium text-gray-600 mb-1.5";

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg border border-gray-100">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className={labelClasses}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className={inputClasses}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="john@example.com"
              className={inputClasses}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="+977 98XXXXXXXX"
            className={inputClasses}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Tell us how we can help you..."
            className={`${inputClasses} resize-none`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold"
            icon={false}
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};