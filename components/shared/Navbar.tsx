"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../../constants";
import Image from "next/image";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = pathname === "/";

  const logoTextColor = isHomePage ? "text-white" : "text-carent-text";
  const mobileToggleColor = isHomePage ? "text-white" : "text-carent-text";

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-6 transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 md:gap-4">
          <Image
            src={`${
              isHomePage ? "/logo/logowhite.svg" : "/logo/logoblack.svg"
            }`}
            alt="Bato Ma"
            width={300}
            height={70}
            className=" object-contain"
            priority
          />
        </Link>

        {/* Desktop Links - Black Pill Container - Visible on LG and up */}
        <div className="hidden lg:flex items-center bg-carent-dark rounded-2xl px-10 py-4 gap-8 xl:px-20 xl:py-6 xl:gap-12 transition-all duration-300">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-base xl:text-lg font-medium transition-colors ${
                pathname === link.href ||
                (pathname === "/" && link.href === "/")
                  ? "text-carent-yellow"
                  : "text-white hover:text-carent-yellow"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle - Visible on MD and below (LG hidden) */}
        <button
          type="button"
          className={`lg:hidden ${mobileToggleColor} p-2 rounded-md relative z-50`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu - Full Screen */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-[9998]"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Menu Content */}
          <div className="lg:hidden fixed inset-0 bg-white flex flex-col z-[9999] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Link
                href="/"
                className="flex items-center gap-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 bg-carent-yellow rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-10 border-b-black transform rotate-0" />
                </div>
                <span className="text-2xl font-bold text-carent-text">
                  Carent
                </span>
              </Link>
              <button
                type="button"
                className="text-carent-text p-2"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <X size={28} />
              </button>
            </div>
            {/* Menu Links */}
            <div className="flex-1 flex flex-col p-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-2xl font-medium py-6 border-b border-gray-100 last:border-0 ${
                    pathname === link.href ||
                    (pathname === "/" && link.href === "/")
                      ? "text-carent-dark"
                      : "text-gray-600 hover:text-carent-dark"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};
