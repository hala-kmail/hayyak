'use client';

import { ScreenLayout } from '@/base';
import {
  Header,
  HeroSection,
  IntroSections,
  NeighborhoodsGrid,
  PageAccent,
  HowItWorks,
  Footer,
} from '@/app/components/home';
import { usePublicTowns } from '@/app/hooks/usePublicTowns';
import { useElectionStatus } from '@/app/hooks/useElectionStatus';
import { LoadingState, ErrorState } from './page/components';
import { pageStyles } from './page/styles';

/**
 * HomePage Component
 * Following SOLID Principles:
 * - Single Responsibility: Only orchestrates the home page layout
 * - Open/Closed: Extensible via components without modifying internal logic
 * - Dependency Inversion: Depends on abstractions (hooks, components) not concrete implementations
 */
export default function HomePage() {
  const { neighborhoods, isLoading, error, totalVotes, votesToday, refetch } =
    usePublicTowns();
  const { status, isLoading: isElectionStatusLoading } = useElectionStatus();

  // أثناء التحميل، افترض أن التصويت مفتوح (optimistic) لتجنب التغيير المفاجئ في الواجهة
  // إذا كان التصويت فعلاً مغلقاً، سيتم تحديث الواجهة بعد تحميل البيانات
  const isElectionOpen = isElectionStatusLoading ? true : (status?.isOpen ?? false);

  return (
    <div className={pageStyles.container}>
      <PageAccent />
      <ScreenLayout noPadding className="relative">
        <Header />

        <HeroSection
          totalVotes={totalVotes}
          neighborhoodsCount={neighborhoods.length}
          votesToday={votesToday}
        />

        <IntroSections />

        {isElectionOpen && (
          <div className={pageStyles.districtsSection} style={{ marginBottom: '-3px' }}>
            <HowItWorks />

            {isLoading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState error={error} onRetry={refetch} />
            ) : (
              <NeighborhoodsGrid
                neighborhoods={neighborhoods}
                totalVotes={totalVotes}
                onVoteSuccess={refetch}
              />
            )}
          </div>
        )}

        <Footer />
      </ScreenLayout>
    </div>
  );
}
