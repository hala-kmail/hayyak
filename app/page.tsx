'use client';

import { ScreenLayout } from '@/base';
import {
  Header,
  HeroSection,
  NeighborhoodsGrid,
  PageAccent,
  StatsSection,
  HowItWorks,
  Footer,
  MOCK_NEIGHBORHOODS,
  totalVotes,
} from '@/app/components/home';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100">
      <PageAccent />
      <ScreenLayout noPadding className="relative">
        <Header />
        
        <HeroSection
          totalVotes={totalVotes}
          neighborhoodsCount={MOCK_NEIGHBORHOODS.length}
          votesToday={342}
        />
       
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
          <NeighborhoodsGrid
            neighborhoods={MOCK_NEIGHBORHOODS}
            totalVotes={totalVotes}
          />
        </div>

      
        <Footer />
      </ScreenLayout>
    </div>
  );
}
