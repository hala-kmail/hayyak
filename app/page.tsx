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
  const { neighborhoods, isLoading, error, totalVotes, votesToday, refetch, searchTowns } =
    usePublicTowns();
  const { status, isLoading: isElectionStatusLoading, isInitialLoad } = useElectionStatus();

  // أثناء التحميل الأول فقط، افترض أن التصويت مفتوح (optimistic) لتجنب التغيير المفاجئ في الواجهة
  // بعد التحميل الأول، استخدم القيمة الفعلية حتى أثناء إعادة الجلب لتجنب الوميض
  const isElectionOpen = isInitialLoad && isElectionStatusLoading ? true : (status?.isOpen ?? false);

  // عرض LoadingState فقط عند التحميل الأولي، وليس عند البحث
  const showLoading = isLoading && neighborhoods.length === 0;

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

            {showLoading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState error={error} onRetry={refetch} />
            ) : (
              <NeighborhoodsGrid
                key="neighborhoods-grid"
                neighborhoods={neighborhoods}
                totalVotes={totalVotes}
                onVoteSuccess={refetch}
                searchTowns={searchTowns}
              />
            )}
          </div>
        )}

        <Footer />
      </ScreenLayout>
    </div>
  );
}
