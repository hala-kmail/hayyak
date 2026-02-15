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

const STATS = [
  { value: 3, label: 'أحياء متقدمة', colorClass: 'text-navy-blue', delay: 260 },
  { value: 342, label: 'صوت اليوم', colorClass: 'text-sand-brown', delay: 320 },
] as const;

export function HeroStats({ totalVotes }: HeroStatsProps) {
  return (
    <div className="flex flex-wrap flex-row-reverse justify-center gap-8 md:gap-12">
      {STATS.map(({ value, label, colorClass, delay }) => (
        <StatItem
          key={label}
          value={value}
          label={label}
          colorClass={colorClass}
          animationDelay={delay}
        />
      ))}
      <StatItem
        value={totalVotes}
        label="إجمالي الأصوات"
        colorClass="text-primary-turquoise"
        animationDelay={380}
      />
    </div>
  );
}
