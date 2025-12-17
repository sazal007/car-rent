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
  return (
    <div className="bg-carent-gray p-5 sm:p-6 md:p-8 lg:p-10 rounded-lg sm:rounded-xl md:rounded-2xl">
      <form className="flex flex-col gap-4 sm:gap-5 md:gap-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label htmlFor="name" className="text-carent-text font-medium text-sm sm:text-base">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-md border border-gray-200 focus:outline-none focus:border-carent-yellow transition-colors text-sm sm:text-base"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-2">
            <label htmlFor="email" className="text-carent-text font-medium text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-md border border-gray-200 focus:outline-none focus:border-carent-yellow transition-colors text-sm sm:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 sm:gap-2">
          <label htmlFor="phone" className="text-carent-text font-medium text-sm sm:text-base">
            Phone number
          </label>
          <input
            type="tel"
            id="phone"
            className="bg-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-md border border-gray-200 focus:outline-none focus:border-carent-yellow transition-colors text-sm sm:text-base"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5 sm:gap-2">
          <label htmlFor="message" className="text-carent-text font-medium text-sm sm:text-base">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className="bg-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-md border border-gray-200 focus:outline-none focus:border-carent-yellow transition-colors resize-none text-sm sm:text-base"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <div>
          <Button
            type="submit"
            className="mt-1 sm:mt-2 w-full sm:w-auto"
            icon={false}
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};
