'use client';

import React from 'react';
import { useStats } from '@/app/hooks/useStats';
import { useElectionStatus } from '@/app/hooks/useElectionStatus';
import { HeroContent, HeroWaveSeparator } from './components';
import { heroStyles } from './styles';
import { HeroSectionProps } from './types';
import { mergeStatsData } from './utils';

/**
 * HeroSection Component
 * Following SOLID Principles:
 * - Single Responsibility: Only orchestrates the hero section layout
 * - Open/Closed: Extensible via props without modifying internal logic
 * - Dependency Inversion: Depends on abstractions (hooks, utils) not concrete implementations
 */
export function HeroSection({
  totalVotes: propTotalVotes,
  neighborhoodsCount: propNeighborhoodsCount,
  votesToday: propVotesToday,
}: HeroSectionProps) {
  const { stats } = useStats();
  const { status, isLoading: isElectionStatusLoading } = useElectionStatus();

  // Merge API stats with prop values (API takes priority)
  const mergedStats = mergeStatsData(stats, {
    totalVotes: propTotalVotes,
    neighborhoodsCount: propNeighborhoodsCount,
    votesToday: propVotesToday,
  });

  // أثناء التحميل، افترض أن التصويت مفتوح (optimistic) لتجنب التغيير المفاجئ في الواجهة
  // إذا كان التصويت فعلاً مغلقاً، سيتم تحديث الواجهة بعد تحميل البيانات
  const isElectionOpen = isElectionStatusLoading ? true : (status?.isOpen ?? false);

  return (
    <section className={heroStyles.section}>
      <div className={heroStyles.container}>
        {/* Background blur effects */}
        <div className={heroStyles.backgroundBlur1} />
        <div className={heroStyles.backgroundBlur2} />

        {/* Main content */}
        <div className={heroStyles.contentWrapper}>
          <HeroContent stats={mergedStats} isElectionOpen={isElectionOpen} />
        </div>

        {/* Wave separator */}
        <HeroWaveSeparator />
      </div>
    </section>
  );
}
