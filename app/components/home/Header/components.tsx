'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  HeaderLogoProps,
  HeaderLogoEndProps,
  NavLinksProps,
  MobileMenuButtonProps,
  MobileDrawerProps,
} from './types';
import { headerStyles } from './styles';
import { NAV_LINKS, LOGO_CONFIG } from './constants';

function scrollToSection(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Header Logo Component
 * Following Single Responsibility Principle - only handles logo display
 */
export function HeaderLogo({
  scrolled,
  mobileMenuOpen,
  variant = 'desktop',
}: HeaderLogoProps) {
  const logoSize =
    variant === 'mobile'
      ? scrolled
        ? 44
        : 48
      : scrolled
        ? LOGO_CONFIG.scrolledSize
        : LOGO_CONFIG.defaultSize;

  return (
    <Link
      href="/"
      className={headerStyles.logoLink(mobileMenuOpen)}
    >
      <div className="relative">
        <Image
          src="/images/Grey.png"
          alt="سكني"
          width={logoSize}
          height={logoSize}
          className={`${headerStyles.logoImage} ${variant === 'mobile' ? 'w-11 h-11' : ''}`}
          priority
        />
      </div>
      <span className={headerStyles.logoText(scrolled)}>سابع جار</span>
    </Link>
  );
}

/**
 * Header Logo Component
 * Following Single Responsibility Principle - only handles logo display
 */
export function HeaderLogoEnd({ scrolled }: HeaderLogoEndProps) {
  const src = scrolled ? '/images/habeeb-dark.png' : '/images/habeeb-white.png';

  return (
    <Link
      href="https://www.alhabibinv.com/"
      className="flex items-center shrink-0"
      target="_blank"
      rel="noreferrer"
      aria-label="محمد الحبيب"
    >
      <div className="relative w-[92px] sm:w-[110px] lg:w-[120px]">
        <Image
          src={src}
          alt="محمد الحبيب"
          width={120}
          height={44}
          className="block w-full h-auto object-contain"
          priority
        />
      </div>
    </Link>
  );
}

/**
 * Desktop Navigation Links Component
 * Following Single Responsibility Principle - only handles desktop nav links
 */
export function DesktopNavLinks({ scrolled }: NavLinksProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <nav className={headerStyles.desktopNav}>
      {NAV_LINKS.map(({ href, label, sectionId }) => {
        const isSectionLink = isHome && sectionId;
        return isSectionLink ? (
          <a
            key={href}
            href={href}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(sectionId);
            }}
            className={headerStyles.navLink(scrolled)}
          >
            {label}
            <span className={headerStyles.navLinkUnderline(scrolled)} />
          </a>
        ) : (
          <Link
            key={href}
            href={href}
            className={headerStyles.navLink(scrolled)}
          >
            {label}
            <span className={headerStyles.navLinkUnderline(scrolled)} />
          </Link>
        );
      })}

      
    </nav>
  );
}

/**
 * Mobile Menu Button Component
 * Following Single Responsibility Principle - only handles menu button
 */
export function MobileMenuButton({
  scrolled,
  mobileMenuOpen,
  onClick,
}: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={headerStyles.mobileMenuButton(scrolled)}
      aria-expanded={mobileMenuOpen}
      aria-label="Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©"
    >
      <svg
        className={headerStyles.menuIcon}
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
  );
}

/**
 * Mobile Drawer Component
 * Following Single Responsibility Principle - only handles mobile drawer
 */
export function MobileDrawer({
  mobileMenuOpen,
  drawerAnimateIn,
  onClose,
}: MobileDrawerProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (!mobileMenuOpen) {
    return null;
  }

  return (
    <>
      <div
        className={headerStyles.drawerOverlay(drawerAnimateIn)}
        onClick={onClose}
        aria-hidden
      />
      <div
        className={headerStyles.drawer(drawerAnimateIn)}
        role="dialog"
        aria-label="Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©"
      >
        <div className={headerStyles.drawerHeader}>
          <div className={headerStyles.drawerHeaderInner}>
            <Link href="/" className={headerStyles.drawerLogoLink} onClick={onClose}>
              <Image
                src="/images/Grey.png"
                alt="Ø³ÙƒÙ†ÙŠ"
                width={LOGO_CONFIG.mobileSize}
                height={LOGO_CONFIG.mobileSize}
                className={headerStyles.drawerLogoImage}
              />
              <span className={headerStyles.drawerLogoText}>سابع جار</span>
            </Link>
          </div>
        </div>
        <nav className={headerStyles.drawerNav}>
          {NAV_LINKS.map(({ href, label, sectionId }) => {
            const isSectionLink = isHome && sectionId;
            if (isSectionLink) {
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(sectionId);
                    onClose();
                  }}
                  className={headerStyles.drawerNavLink}
                >
                  {label}
                </a>
              );
            }
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={headerStyles.drawerNavLink}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
