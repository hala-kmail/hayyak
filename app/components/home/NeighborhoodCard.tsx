'use client';

import { OCard, OBadge } from '@/base';
import { formatNumber } from '@/base/utils';
import type { NeighborhoodItem } from './data';

interface NeighborhoodCardProps {
  neighborhood: NeighborhoodItem;
  totalVotes: number;
}

export function NeighborhoodCard({ neighborhood, totalVotes }: NeighborhoodCardProps) {
  const progress = totalVotes > 0 ? (neighborhood.votes / totalVotes) * 100 : 0;

  return (
    <OCard variant="elevated" className="flex flex-col h-full">
      <div className="flex flex-row-reverse justify-between items-start mb-3">
        <OBadge variant="warningLight" size="sm">
          {formatNumber(neighborhood.votes)} صوت
        </OBadge>
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
          style={{ backgroundColor: neighborhood.iconBg }}
        >
          {neighborhood.icon}
        </div>
      </div>
      <h3 className="font-bold text-lg text-navy-blue mb-1">{neighborhood.name}</h3>
      <p className="text-sm text-primary-grey mb-4">{neighborhood.location}</p>
      <div className="mt-auto">
        <div className="h-2 rounded-full overflow-hidden mb-1 bg-[#efecea]">
          <div
            className="h-full rounded-full transition-all bg-primary-turquoise"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-primary-grey">{neighborhood.percentage}٪</p>
      </div>
    </OCard>
  );
}
