'use client';

import { OButton } from '@/base';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';

const navLinks = [
  { href: '/vote', label: 'التصويت' },
  { href: '/award', label: 'الجائزة' },
  { href: '/partner', label: 'شراء' },
];

const DRAWER_DURATION_MS = 280;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawerAnimateIn, setDrawerAnimateIn] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setMobileMenuOpen(false);
      closeTimeoutRef.current = null;
    }, DRAWER_DURATION_MS);
  };

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="flex md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between md:justify-stretch gap-2 md:gap-4 py-3 px-3 sm:py-4 sm:px-4 md:px-8">
        {/* أيقونة القائمة أقصى اليمين ثم الشعار (موبايل: همبرغر + لوجو) */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 md:flex-initial justify-start">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-navy-blue hover:bg-gray-100 flex-shrink-0"
            aria-expanded={mobileMenuOpen}
            aria-label="فتح القائمة"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
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
          <Logo iconSize="sm" />
        </div>

        {/* نافيجيشن - ديسكتوب */}
        <nav className="hidden md:flex items-center justify-center gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-primary-grey hover:text-navy-blue"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* زر صوت الآن - أقصى اليسار */}
        <div className="flex items-center justify-end flex-shrink-0">
          <OButton
            variant="primary"
            size="lg"
            className="rounded-full py-2 px-4 text-sm sm:py-2.5 sm:px-6 sm:text-base shrink-0"
          >
            صوت الآن
          </OButton>
        </div>
      </div>

      {/* درج القائمة: بعرض ثلثي الشاشة وعطول الشاشة (موبايل) + أنيميشن */}
      {mobileMenuOpen && (
        <>
          <div
            className={`md:hidden fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ease-out ${
              drawerAnimateIn ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden
            onClick={closeMenu}
          />
          <div
            className={`md:hidden fixed top-0 bottom-0 right-0 w-2/3 bg-white shadow-xl z-50 flex flex-col transition-transform duration-300 ease-out ${
              drawerAnimateIn ? 'translate-x-0' : 'translate-x-full'
            }`}
            role="dialog"
            aria-label="قائمة التنقل"
          >
            <div className="pt-6 px-4 pb-4 border-b border-gray-100">
              <Logo iconSize="md" showText />
            </div>
            <nav className="flex flex-col gap-1 py-4 px-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="py-3 px-4 rounded-lg text-primary-grey hover:text-navy-blue hover:bg-gray-50 text-lg"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
