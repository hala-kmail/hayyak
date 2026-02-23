'use client';

import React from 'react';
import { HeroContent, HeroWaveSeparator } from './components';
import { heroStyles } from './styles';
import { HeroSectionProps } from './types';

/**
 * HeroSection Component
 * Following SOLID Principles:
 * - Single Responsibility: Only orchestrates the hero section layout
 * - Open/Closed: Extensible via props without modifying internal logic
 * - Dependency Inversion: Depends on abstractions (hooks, utils) not concrete implementations
 */
export const HeroSection = React.memo(function HeroSection({
  leadingNeighborhood = null,
  isElectionOpen,
}: HeroSectionProps) {
  return (
    <section className={heroStyles.section}>
      <div className={heroStyles.container}>
        {/* Background blur effects */}
        <div className={heroStyles.backgroundBlur1} />
        <div className={heroStyles.backgroundBlur2} />
        <div className={heroStyles.backgroundBlur3} />

        {/* Main content */}
        <div className={heroStyles.contentWrapper}>
          <HeroContent leadingNeighborhood={leadingNeighborhood} isElectionOpen={isElectionOpen} />
        </div>

        {/* Wave separator */}
        <HeroWaveSeparator />
      </div>
    </section>
  );
});
