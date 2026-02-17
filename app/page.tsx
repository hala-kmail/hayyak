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

export default function HomePage() {
  const { neighborhoods, isLoading, error, totalVotes, votesToday, refetch } = usePublicTowns();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100">
      <PageAccent />
      <ScreenLayout noPadding className="relative">
        <Header />
        
        <HeroSection
          totalVotes={totalVotes}
          neighborhoodsCount={neighborhoods.length}
          votesToday={votesToday}
        />
       
        {/* الأقسام التعريفية */}
        <IntroSections />
       
        {/* قسم الأحياء المشاركة */}
        <div id="districts" className="py-20 relative bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 relative">
            <span className="text-turquoise font-black tracking-[0.3em] uppercase text-[10px] mb-2 block">
              المنافسة مشتعلة
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-navy-blue mb-4">
              الأحياء المشاركة
            </h2>
            <div className="w-12 h-1 bg-turquoise mx-auto rounded-full mb-6" />
           
          </div>  <HowItWorks />
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-turquoise border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-warm-grey">جاري تحميل الأحياء...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={refetch}
                className="px-6 py-2 bg-turquoise text-white rounded-xl font-bold hover:shadow-lg transition-all"
              >
                إعادة المحاولة
              </button>
            </div>
          ) : (
            <NeighborhoodsGrid
              neighborhoods={neighborhoods}
              totalVotes={totalVotes}
              onVoteSuccess={refetch}
            />
          )}
        </div>

      
        <Footer />
      </ScreenLayout>
    </div>
  );
}
