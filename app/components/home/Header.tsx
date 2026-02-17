'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const navLinks = [
  { href: '/vote', label: 'التصويت' },
  { href: '/award', label: 'الجائزة' },
  { href: '/partner', label: 'شراء' },
];

const DRAWER_DURATION_MS = 280;
const SCROLL_THRESHOLD = 50;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawerAnimateIn, setDrawerAnimateIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      const t = requestAnimationFrame(() => setDrawerAnimateIn(true));
      return () => cancelAnimationFrame(t);
    } else {
      setDrawerAnimateIn(false);
    }
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setDrawerAnimateIn(false);
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setMobileMenuOpen(false);
      closeTimeoutRef.current = null;
    }, DRAWER_DURATION_MS);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[100] pointer-events-none">
        <nav
          className={`w-full transition-all duration-500 ${
            scrolled ? 'pt-0' : 'pt-6'
          }`}
        >
          <div
            className={`pointer-events-auto transition-all duration-500 ${
              scrolled
                ? 'bg-white shadow-lg'
                : 'bg-transparent'
            }`}
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
              {/* اللوجو */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <Image
                    src="/images/sakany.png"
                    alt="سكني"
                    width={scrolled ? 50 : 56}
                    height={scrolled ? 50 : 56}
                    className="object-contain transition-all duration-500 group-hover:scale-110"
                    priority
                  />
                </div>
                <span
                  className={`font-black text-xl sm:text-2xl transition-colors duration-500 hidden sm:block ${
                    scrolled ? 'text-navy-blue' : 'text-white'
                  }`}
                >
                  سابع جار
                </span>
              </Link>

              {/* روابط التنقل - سطح المكتب */}
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 relative group ${
                      scrolled
                        ? 'text-navy-blue hover:text-turquoise hover:bg-turquoise/5'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute bottom-1 right-1/2 translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                        scrolled ? 'bg-turquoise' : 'bg-white'
                      } w-0 group-hover:w-3/4`}
                    />
                  </Link>
                ))}
              </nav>

              {/* زر القائمة - الموبايل */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((o) => !o)}
                className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                  scrolled
                    ? 'text-navy-blue hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-expanded={mobileMenuOpen}
                aria-label="القائمة"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* قائمة الموبايل */}
      {mobileMenuOpen && (
        <>
          <div
            className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
              drawerAnimateIn ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={closeMenu}
            aria-hidden
          />
          <div
            className={`lg:hidden fixed top-0 bottom-0 right-0 w-80 max-w-[85vw] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
              drawerAnimateIn ? 'translate-x-0' : 'translate-x-full'
            }`}
            role="dialog"
            aria-label="القائمة"
          >
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
                  <Image
                    src="/images/sakany.png"
                    alt="سكني"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                  <span className="font-black text-xl text-navy-blue">سابع جار</span>
                </Link>
              </div>
            </div>
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="px-4 py-3 rounded-xl text-navy-blue hover:bg-turquoise/10 hover:text-turquoise font-semibold transition-all duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
