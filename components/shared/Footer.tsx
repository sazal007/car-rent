"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, X } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-carent-dark text-white pt-24 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-24 mb-20">
          {/* Left Column: Logo & Newsletter */}
          <div className="lg:w-5/12">
            <Link href="/" className="flex items-center gap-3 mb-10 w-fit">
              <div className="w-12 h-12 bg-carent-yellow rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[11px] border-b-black transform rotate-0" />
              </div>
              <span className="text-white text-4xl font-medium tracking-tight">
                Carent
              </span>
            </Link>

            <h3 className="text-2xl font-semibold mb-6">
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

          {/* Right Column: Links */}
          <div className="lg:w-6/12 flex flex-col sm:flex-row gap-16 sm:gap-24">
            {/* Pages */}
            <div>
              <h4 className="text-xl font-bold mb-8">Pages</h4>
              <ul className="space-y-4 text-gray-400 text-lg">
                <li>
                  <Link
                    href="/"
                    className="text-carent-yellow hover:text-white transition-colors"
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
              </ul>
            </div>

            {/* Utility Pages */}
            <div>
              <h4 className="text-xl font-bold mb-8">Utility Pages</h4>
              <ul className="space-y-4 text-gray-400 text-lg">
                <li>
                  <a
                    href="#"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    Style Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    Instructions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    Licenses
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    Changelog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    Link in Bio
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    Coming Soon
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    Password Protected
                  </a>
                </li>
                <li>
                  <Link
                    href="/404"
                    className="hover:text-carent-yellow transition-colors"
                  >
                    Error 404
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white text-base">
            Designed by{" "}
            <a
              href="#"
              className="underline decoration-carent-yellow decoration-2 underline-offset-4 hover:text-carent-yellow text-white"
            >
              Webestica
            </a>
            , Powered by{" "}
            <a
              href="#"
              className="underline decoration-carent-yellow decoration-2 underline-offset-4 hover:text-carent-yellow text-white"
            >
              Webflow
            </a>
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-white hover:text-carent-yellow transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="text-white hover:text-carent-yellow transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-white hover:text-carent-yellow transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              className="text-white hover:text-carent-yellow transition-colors"
            >
              <X size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
