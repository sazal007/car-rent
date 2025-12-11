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
    <div className="bg-carent-gray p-8 md:p-10 rounded-2xl">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-carent-text font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-white px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-carent-yellow transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-carent-text font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-white px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-carent-yellow transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-carent-text font-medium">
            Phone number
          </label>
          <input
            type="tel"
            id="phone"
            className="bg-white px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-carent-yellow transition-colors"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-carent-text font-medium">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className="bg-white px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-carent-yellow transition-colors resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <div>
          <Button
            type="submit"
            className="mt-2"
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
