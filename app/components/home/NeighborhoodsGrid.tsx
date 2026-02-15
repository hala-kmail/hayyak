'use client';

import { NeighborhoodCard } from './NeighborhoodCard';
import type { NeighborhoodItem } from './data';

interface NeighborhoodsGridProps {
  neighborhoods: NeighborhoodItem[];
  totalVotes: number;
}

export function NeighborhoodsGrid({ neighborhoods, totalVotes }: NeighborhoodsGridProps) {
  return (
    <section className="px-4 pb-12 md:pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {neighborhoods.map((n, i) => (
          <div
            key={n.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${120 * (i + 1)}ms` }}
          >
            <NeighborhoodCard neighborhood={n} totalVotes={totalVotes} />
          </div>
        ))}
      </div>
    </section>
  );
}
