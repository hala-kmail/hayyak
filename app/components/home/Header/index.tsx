'use client';

import React from 'react';
import {
  HeaderLogo,
  HeaderLogoEnd,
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
              <div className="hidden lg:flex w-full items-center">
                <HeaderLogo
                  scrolled={scrolled}
                  mobileMenuOpen={mobileMenuOpen}
                  variant="desktop"
                />

                <div className="flex-1 flex items-center justify-end ml-4">
                  <DesktopNavLinks scrolled={scrolled} />
                </div>

                <HeaderLogoEnd scrolled={scrolled} />
              </div>

              <div className="lg:hidden flex w-full items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <MobileMenuButton
                    scrolled={scrolled}
                    mobileMenuOpen={mobileMenuOpen}
                    onClick={toggleMenu}
                  />

                  <HeaderLogo
                    scrolled={scrolled}
                    mobileMenuOpen={mobileMenuOpen}
                    variant="mobile"
                  />
                </div>

                <HeaderLogoEnd scrolled={scrolled} />
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
