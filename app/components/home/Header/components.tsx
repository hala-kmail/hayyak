'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  HeaderLogoProps,
  NavLinksProps,
  MobileMenuButtonProps,
  MobileDrawerProps,
} from './types';
import { headerStyles } from './styles';
import { NAV_LINKS, LOGO_CONFIG } from './constants';

/**
 * Header Logo Component
 * Following Single Responsibility Principle - only handles logo display
 */
export function HeaderLogo({
  scrolled,
  mobileMenuOpen,
}: HeaderLogoProps) {
  const logoSize = scrolled ? LOGO_CONFIG.scrolledSize : LOGO_CONFIG.defaultSize;

  return (
    <Link
      href="/"
      className={headerStyles.logoLink(mobileMenuOpen)}
    >
      <div className="relative">
        <Image
          src="/images/sakany.png"
          alt="سكني"
          width={logoSize}
          height={logoSize}
          className={headerStyles.logoImage}
          style={{ width: 'auto', height: 'auto' }}
          priority
        />
      </div>
      <span className={headerStyles.logoText(scrolled)}>سابع جار</span>
    </Link>
  );
}

/**
 * Desktop Navigation Links Component
 * Following Single Responsibility Principle - only handles desktop nav links
 */
export function DesktopNavLinks({ scrolled }: NavLinksProps) {
  return (
    <nav className={headerStyles.desktopNav}>
      {NAV_LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={headerStyles.navLink(scrolled)}
        >
          {label}
          <span className={headerStyles.navLinkUnderline(scrolled)} />
        </Link>
      ))}
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
      aria-label="القائمة"
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
        aria-label="القائمة"
      >
        <div className={headerStyles.drawerHeader}>
          <div className={headerStyles.drawerHeaderInner}>
            <Link href="/" className={headerStyles.drawerLogoLink} onClick={onClose}>
              <Image
                src="/images/sakany.png"
                alt="سكني"
                width={LOGO_CONFIG.mobileSize}
                height={LOGO_CONFIG.mobileSize}
                className={headerStyles.drawerLogoImage}
              />
              <span className={headerStyles.drawerLogoText}>سابع جار</span>
            </Link>
          </div>
        </div>
        <nav className={headerStyles.drawerNav}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={headerStyles.drawerNavLink}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
