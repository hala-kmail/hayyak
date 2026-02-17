'use client';

import React, { useMemo } from 'react';
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
  totalVotes: propTotalVotes,
  neighborhoodsCount: propNeighborhoodsCount,
  votesToday: propVotesToday,
  isElectionOpen,
}: HeroSectionProps & { isElectionOpen: boolean }) {
  // استخدام البيانات من props مباشرة بدلاً من جلبها مرة أخرى
  // إضافة قيم افتراضية لتجنب undefined
  const stats = useMemo(() => ({
    totalVotes: propTotalVotes ?? 0,
    neighborhoodsCount: propNeighborhoodsCount ?? 0,
    votesToday: propVotesToday ?? 0,
  }), [propTotalVotes, propNeighborhoodsCount, propVotesToday]);

  return (
    <section className={heroStyles.section}>
      <div className={heroStyles.container}>
        {/* Background blur effects */}
        <div className={heroStyles.backgroundBlur1} />
        <div className={heroStyles.backgroundBlur2} />

        {/* Main content */}
        <div className={heroStyles.contentWrapper}>
          <HeroContent stats={stats} isElectionOpen={isElectionOpen} />
        </div>

        {/* Wave separator */}
        <HeroWaveSeparator />
      </div>
    </section>
  );
});
