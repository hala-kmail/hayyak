'use client';

import { OBadge } from '@/base';
import { HeroStats } from './HeroStats';

interface HeroSectionProps {
  totalVotes: number;
}

export function HeroSection({ totalVotes }: HeroSectionProps) {
  return (
    <section className="text-center py-10 md:py-14 px-4">
      <OBadge
        variant="warning"
        size="md"
        className="rounded-full mb-6 inline-flex items-center gap-2 border border-sand-brown animate-fade-in-up"
      >
        <span className="w-2 h-2 rounded-full bg-lime-green" />
        التصويت مفتوح الآن
      </OBadge>
      <h1 className="text-5xl md:text-8xl font-bold mx-auto leading-tight mb-4 text-primary-turquoise animate-fade-in-up [animation-delay:80ms]">
        <span className="text-navy-blue">صوّت لحيّك</span> <br />
        خلّه يفوز بحوّامة رمضان
      </h1>
      <p className="text-base md:text-lg max-w-xl mx-auto mb-10 text-warm-grey animate-fade-in-up [animation-delay:160ms] mt-4">
        اختر حيك المفضل وكن سبب فوزه باحتفالية الحوامة التقليدية في آخر أيام
        رمضان المبارك 2026
      </p>
      <HeroStats totalVotes={totalVotes} />
    </section>
  );
}
