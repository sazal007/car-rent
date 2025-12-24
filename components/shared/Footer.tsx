"use client";

import React from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  X,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-carent-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-20 mb-16">
          {/* Left Column: Logo, Description & Newsletter */}
          <div className="lg:w-4/12">
            <Link href="/" className="flex items-center gap-3 mb-6 w-fit">
              <Image
                src="/logo/batomabg.png"
                alt="Carent"
                width={300}
                height={100}
                className="w-full h-full object-contain invert"
              />
            </Link>

            <p className="text-gray-400 text-base mb-8 leading-relaxed max-w-md">
              Your trusted partner for reliable car rentals. We offer a wide
              selection of vehicles to suit your needs, from compact city cars
              to spacious SUVs. Experience quality service and competitive
              rates.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Subscribe to our newsletter
            </h3>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-dark-secondary border border-dark-border-light text-gray-300 px-6 py-4 rounded-lg flex-grow focus:outline-none focus:border-carent-yellow transition-colors placeholder:text-gray-500"
              />
              <button className="bg-carent-yellow text-carent-dark font-semibold px-8 py-4 rounded-lg hover:bg-yellow-400 transition-colors whitespace-nowrap">
                Subscribe!
              </button>
            </div>
          </div>

          {/* Right Column: Links & Location */}
          <div className="lg:w-8/12 flex flex-col sm:flex-row gap-12 sm:gap-16">
            {/* Pages */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Pages</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link
                    href="/"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cars"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    Cars
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Legal</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Location & Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Location</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin
                    size={20}
                    className="text-carent-yellow mt-0.5 shrink-0"
                  />
                  <span className="leading-relaxed">
                    123 Main Street,
                    <br />
                    City Center, State 12345
                    <br />
                    United States
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={20} className="text-carent-yellow shrink-0" />
                  <a
                    href="tel:+1234567890"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={20} className="text-carent-yellow shrink-0" />
                  <a
                    href="mailto:info@carent.com"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    info@carent.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Carent. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-carent-yellow transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-carent-yellow transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-carent-yellow transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-carent-yellow transition-colors"
              aria-label="X (Twitter)"
            >
              <X size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
