'use client';

import { ScreenLayout } from '@/base';
import {
  Header,
  HeroSection,
  NeighborhoodsGrid,
  PageAccent,
  MOCK_NEIGHBORHOODS,
  totalVotes,
} from '@/app/components/home';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100">
      <PageAccent />
      <ScreenLayout noPadding className="relative">
        <Header />
        <HeroSection totalVotes={totalVotes} />
        <NeighborhoodsGrid neighborhoods={MOCK_NEIGHBORHOODS} totalVotes={totalVotes} />
      </ScreenLayout>
    </div>
  );
}
