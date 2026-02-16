'use client';

import { formatNumber } from '@/base/utils';
import { useCountUp } from './useCountUp';

interface StatItemProps {
  value: number;
  label: string;
  colorClass: string;
  animationDelay: number;
}

function StatItem({ value, label, colorClass, animationDelay }: StatItemProps) {
  const count = useCountUp(value, {
    duration: 1200,
    delay: animationDelay + 200,
    enabled: true,
  });

  return (
    <div
      className="text-center animate-fade-in-up"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <p className={`text-2xl md:text-3xl font-bold tabular-nums ${colorClass}`}>
        {formatNumber(count)}
      </p>
      <p className="text-xs text-primary-grey mt-1">{label}</p>
    </div>
  );
}

interface HeroStatsProps {
  totalVotes: number;
}


export function HeroStats({ totalVotes }: HeroStatsProps) {
  return (
    <div className="flex flex-wrap flex-row-reverse justify-center gap-8 md:gap-12">
     
      <StatItem
        value={totalVotes}
        label="إجمالي الأصوات"
        colorClass="text-primary-turquoise"
        animationDelay={380}
      />
    </div>
  );
}
