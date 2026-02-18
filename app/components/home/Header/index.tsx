'use client';

import React from 'react';
import {
  HeaderLogo,
  DesktopNavLinks,
  MobileMenuButton,
  MobileDrawer,
} from './components';
import { headerStyles } from './styles';
import { useScrollDetection, useMobileMenu } from './hooks';

/**
 * Header Component
 * Following SOLID Principles:
 * - Single Responsibility: Only orchestrates the header layout
 * - Open/Closed: Extensible via constants without modifying component logic
 * - Dependency Inversion: Depends on abstractions (hooks, components) not concrete implementations
 */
export function Header() {
  const scrolled = useScrollDetection();
  const { mobileMenuOpen, drawerAnimateIn, toggleMenu, closeMenu } =
    useMobileMenu();

  return (
    <>
      <header className={headerStyles.header(mobileMenuOpen)}>
        <nav className={headerStyles.nav(scrolled)}>
          <div className={headerStyles.navContainer(scrolled)}>
          <div className={headerStyles.navInner}>
            <HeaderLogo scrolled={scrolled} mobileMenuOpen={mobileMenuOpen} />
            <div className="hidden lg:flex items-center gap-4">
              <DesktopNavLinks scrolled={scrolled} />
            </div>
            <div className="lg:hidden flex items-center gap-2">
              <MobileMenuButton
                scrolled={scrolled}
                mobileMenuOpen={mobileMenuOpen}
                onClick={toggleMenu}
              />
            </div>
          </div>
          </div>
        </nav>
      </header>

      <MobileDrawer
        mobileMenuOpen={mobileMenuOpen}
        drawerAnimateIn={drawerAnimateIn}
        onClose={closeMenu}
      />
    </>
  );
}
