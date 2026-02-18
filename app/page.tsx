'use client';

import { useEffect } from 'react';
import { ScreenLayout } from '@/base';
import {
  Header,
  HeroSection,
  IntroSections,
  NeighborhoodsGrid,
  PageAccent,
  HowItWorks,
  PrizeSection,
  Footer,
} from '@/app/components/home';
import { usePublicTowns } from '@/app/hooks/usePublicTowns';
import { useElectionStatus } from '@/app/hooks/useElectionStatus';
import { useVisitorCount } from '@/app/hooks/useVisitorCount';
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
  const { uniqueVisitors } = useVisitorCount();

  // أثناء التحميل الأول فقط، افترض أن التصويت مفتوح (optimistic) لتجنب التغيير المفاجئ في الواجهة
  // بعد التحميل الأول، استخدم القيمة الفعلية حتى أثناء إعادة الجلب لتجنب الوميض
  const isElectionOpen = isInitialLoad && isElectionStatusLoading ? true : (status?.isOpen ?? false);

  // عرض LoadingState فقط عند التحميل الأولي، وليس عند البحث
  const showLoading = isLoading && neighborhoods.length === 0;

  // التمرير إلى السكشن عند فتح الصفحة بـ hash (مثلاً من النافبار أو رابط مباشر)
  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    if (!hash) {
      return;
    }
    const timer = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={pageStyles.container}>
      <PageAccent />
      <ScreenLayout noPadding className="relative">
        <Header />

        <HeroSection
          totalVotes={totalVotes}
          neighborhoodsCount={neighborhoods.length}
          votesToday={votesToday}
          uniqueVisitors={uniqueVisitors ?? 0}
          isElectionOpen={isElectionOpen}
        />
<PrizeSection />
      

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

<IntroSections />
        <Footer />
      </ScreenLayout>
    </div>
  );
}
