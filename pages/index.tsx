'use client';

import { OButton, OCard, OBadge, ScreenLayout } from '@/base';
import { useCSSVar } from '@/base/hooks';
import { formatNumber } from '@/base/utils';
import Link from 'next/link';

const MOCK_NEIGHBORHOODS = [
  {
    id: '1',
    name: 'حي النخيل',
    location: 'الرياض - شمال العريض',
    votes: 375,
    icon: '🌴',
    iconBg: 'rgb(204, 251, 241)',
    percentage: 29,
  },
  {
    id: '2',
    name: 'حي البستان',
    location: 'الرياض - شرق الطريق الدائري',
    votes: 294,
    icon: '🌸',
    iconBg: 'rgb(254, 226, 226)',
    percentage: 23,
  },
  {
    id: '3',
    name: 'حي الأخوة',
    location: 'الرياض - غرب العليا',
    votes: 267,
    icon: '⛰️',
    iconBg: 'rgb(220, 252, 231)',
    percentage: 21,
  },
  {
    id: '4',
    name: 'حي العورات العربية',
    location: 'الرياض - جنوب النخيل',
    votes: 351,
    icon: '☀️',
    iconBg: 'rgb(224, 242, 254)',
    percentage: 27,
  },
];

const totalVotes = MOCK_NEIGHBORHOODS.reduce((s, n) => s + n.votes, 0);

export default function HomePage() {
  const primary600 = useCSSVar('--color-primary-600');
  const textMuted = useCSSVar('--color-text-muted');

  return (
    <div dir="rtl" className="min-h-screen bg-[rgb(var(--color-background))]">
      {/* Left edge teal accent */}
      <div
        className="fixed top-0 bottom-0 w-1 left-0 z-10"
        style={{ backgroundColor: primary600 }}
        aria-hidden
      />

      <ScreenLayout noPadding className="relative">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 py-4 px-4 md:px-6 border-b border-gray-200">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-lg"
                style={{ backgroundColor: primary600 }}
              >
                🏠
              </span>
              <span className="font-bold text-lg" style={{ color: primary600 }}>
                سكني
              </span>
              <span className="font-bold text-lg text-gray-800">سابع جار</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/vote" className="text-gray-600 hover:text-gray-900">
                التصويت
              </Link>
              <Link href="/award" className="text-gray-600 hover:text-gray-900">
                الجائزة
              </Link>
              <Link href="/partner" className="text-gray-600 hover:text-gray-900">
                شرك
              </Link>
            </nav>
          </div>
          <OButton variant="primary" size="lg" className="rounded-full">
            صوت الآن
          </OButton>
        </header>

        {/* Hero */}
        <section className="text-center py-10 md:py-14 px-4">
          <OBadge
            variant="warning"
            size="md"
            className="rounded-full mb-6 inline-flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-green-500" />
            التصويت مفتوح الآن
          </OBadge>
          <h1
            className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto leading-tight mb-4"
            style={{ color: primary600 }}
          >
            صوت لحيك خله يفوز بحوامة رمضان
          </h1>
          <p
            className="text-base md:text-lg max-w-xl mx-auto mb-10"
            style={{ color: textMuted }}
          >
            اختر حيك المفضل وكن سبب فوزه باحتفالية الحوامة التقليدية في آخر أيام
            رمضان المبارك 2026
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-amber-600">٣</p>
              <p className="text-xs text-gray-500 mt-1">أحياء متقدمة</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-amber-600">٣٤٢</p>
              <p className="text-xs text-gray-500 mt-1">صوت اليوم</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-amber-600">
                {formatNumber(totalVotes)}
              </p>
              <p className="text-xs text-gray-500 mt-1">إجمالي الأصوات</p>
            </div>
          </div>
        </section>

        {/* Neighborhood cards */}
        <section className="px-4 pb-12 md:pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {MOCK_NEIGHBORHOODS.map((n) => (
              <NeighborhoodCard key={n.id} neighborhood={n} totalVotes={totalVotes} />
            ))}
          </div>
        </section>
      </ScreenLayout>
    </div>
  );
}

function NeighborhoodCard({
  neighborhood,
  totalVotes,
}: {
  neighborhood: (typeof MOCK_NEIGHBORHOODS)[0];
  totalVotes: number;
}) {
  const primary600 = useCSSVar('--color-primary-600');
  const gray200 = useCSSVar('--color-gray-200');
  const progress = totalVotes > 0 ? (neighborhood.votes / totalVotes) * 100 : 0;

  return (
    <OCard variant="elevated" className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <OBadge variant="warning" size="sm">
          {formatNumber(neighborhood.votes)} صوت
        </OBadge>
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
          style={{ backgroundColor: neighborhood.iconBg }}
        >
          {neighborhood.icon}
        </div>
      </div>
      <h3 className="font-bold text-lg text-gray-900 mb-1">{neighborhood.name}</h3>
      <p className="text-sm text-gray-500 mb-4">{neighborhood.location}</p>
      <div className="mt-auto">
        <div
          className="h-2 rounded-full overflow-hidden mb-1"
          style={{ backgroundColor: gray200 }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${progress}%`,
              backgroundColor: primary600,
            }}
          />
        </div>
        <p className="text-xs text-gray-500">{neighborhood.percentage}٪</p>
      </div>
    </OCard>
  );
}
