'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../constants';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = pathname === '/';

  const logoTextColor = isHomePage ? 'text-white' : 'text-carent-text';
  const mobileToggleColor = isHomePage ? 'text-white' : 'text-carent-text';

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-6 md:py-10 transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-carent-yellow rounded-full flex items-center justify-center">
             <div className="w-0 h-0 border-l-[6px] md:border-l-[9px] border-l-transparent border-r-[6px] md:border-r-[9px] border-r-transparent border-b-[10px] md:border-b-[14px] border-b-black transform rotate-0" />
          </div>
          <span className={`${logoTextColor} text-3xl md:text-5xl font-bold tracking-tight transition-colors duration-300`}>Carent</span>
        </Link>

        {/* Desktop Links - Black Pill Container - Visible on LG and up */}
        <div className="hidden lg:flex items-center bg-carent-dark rounded-2xl px-10 py-4 gap-8 xl:px-20 xl:py-6 xl:gap-12 transition-all duration-300">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="relative group h-full">
              {link.hasDropdown ? (
                <>
                  <span className={`text-base xl:text-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    pathname === link.href || (pathname === '/' && link.href === '/') 
                      ? 'text-carent-yellow' 
                      : 'text-white hover:text-carent-yellow'
                  }`}>
                    {link.label}
                    <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                  </span>
                  
                  {/* Dropdown Menu */}
                  {link.subLinks && (
                    <div className="absolute top-full left-0 pt-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 min-w-[220px]">
                      <div className="bg-carent-dark border border-gray-800 shadow-xl rounded-xl p-4 flex flex-col gap-1">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.label}
                            href={subLink.href}
                            className={`text-base px-4 py-3 hover:bg-white/5 rounded-lg transition-colors text-left ${
                              pathname === subLink.href ? 'text-carent-yellow' : 'text-white/80 hover:text-white'
                            }`}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link 
                  href={link.href}
                  className={`text-base xl:text-lg font-medium transition-colors flex items-center gap-1.5 ${
                    pathname === link.href || (pathname === '/' && link.href === '/') 
                      ? 'text-carent-yellow' 
                      : 'text-white hover:text-carent-yellow'
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Toggle - Visible on MD and below (LG hidden) */}
        <button 
          className={`lg:hidden ${mobileToggleColor} p-2 rounded-md`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 p-4 flex flex-col shadow-xl max-h-[80vh] overflow-y-auto mt-2 mx-4 rounded-xl z-50">
           {NAV_LINKS.map((link) => (
            <div key={link.label} className="border-b border-gray-100 last:border-0">
                <div className="flex justify-between items-center py-4">
                     <Link 
                        href={link.hasDropdown ? '#' : link.href}
                        className={`text-lg font-medium ${
                            pathname === link.href || (pathname === '/' && link.href === '/') 
                                ? 'text-carent-dark' 
                                : 'text-gray-600 hover:text-carent-dark'
                        }`}
                        onClick={() => {
                          if (!link.hasDropdown) setIsMobileMenuOpen(false);
                        }}
                     >
                        {link.label}
                     </Link>
                     {link.hasDropdown && <ChevronDown size={20} className="text-gray-400" />}
                </div>

                {/* Sublinks for Mobile */}
                {link.subLinks && (
                    <div className="pl-4 pb-2 flex flex-col gap-2 bg-gray-50 rounded-lg mb-2">
                        {link.subLinks.map(subLink => (
                            <Link
                                key={subLink.label}
                                href={subLink.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-base py-3 px-3 rounded-md ${
                                    pathname === subLink.href ? 'bg-carent-yellow/10 text-carent-dark' : 'text-gray-500 hover:text-black'
                                }`}
                            >
                                {subLink.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

