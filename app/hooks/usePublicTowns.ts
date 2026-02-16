'use client';

import { useState, useEffect } from 'react';
import type { NeighborhoodItem } from '@/app/components/home/data';

interface TownWithVotes {
  id: string;
  name: string;
  address: string;
  votes: number;
  createdAt?: string;
  updatedAt?: string;
}

const NEIGHBORHOOD_ICONS = ['🌴', '🌸', '⛰️', '☀️', '🌹', '🏛️', '🏙️', '✈️', '🌳', '🏘️', '🌿', '🌺'];
const ICON_BG_COLORS = [
  'rgb(204, 251, 241)',
  'rgb(254, 226, 226)',
  'rgb(220, 252, 231)',
  'rgb(224, 242, 254)',
  'rgb(255, 228, 230)',
  'rgb(237, 242, 247)',
  'rgb(240, 253, 244)',
  'rgb(254, 243, 199)',
  'rgb(220, 252, 231)',
  'rgb(224, 242, 254)',
  'rgb(204, 251, 241)',
  'rgb(255, 237, 213)',
];

function transformTownToNeighborhood(town: TownWithVotes, index: number): NeighborhoodItem {
  const iconIndex = index % NEIGHBORHOOD_ICONS.length;
  const totalCap = 600; // يمكن جعله ديناميكي لاحقاً
  
  return {
    id: town.id,
    name: town.name,
    location: town.address,
    votes: town.votes || 0,
    icon: NEIGHBORHOOD_ICONS[iconIndex],
    iconBg: ICON_BG_COLORS[iconIndex],
    percentage: totalCap > 0 ? Math.round((town.votes / totalCap) * 100) : 0,
    totalCap,
  };
}

export function usePublicTowns() {
  const [neighborhoods, setNeighborhoods] = useState<NeighborhoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalVotes, setTotalVotes] = useState(0);

  const fetchTowns = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/towns');

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'فشل في جلب الأحياء.');
      }

      const towns: TownWithVotes[] = await response.json();
      const transformedNeighborhoods = towns.map((town, index) =>
        transformTownToNeighborhood(town, index)
      );
      
      setNeighborhoods(transformedNeighborhoods);
      setTotalVotes(transformedNeighborhoods.reduce((sum, n) => sum + n.votes, 0));
    } catch (err: any) {
      console.error('Error fetching towns:', err);
      setError(err.message || 'حدث خطأ في جلب الأحياء.');
      setNeighborhoods([]);
      setTotalVotes(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTowns();
  }, []);

  return {
    neighborhoods,
    isLoading,
    error,
    totalVotes,
    refetch: fetchTowns,
  };
}
