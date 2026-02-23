'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { NeighborhoodItem } from '@/app/components/home/data';
import type { Town } from './useTowns';
import { API_BASE } from '@/lib/api';
import { isMockDataEnabled, MOCK_TOWNS, MOCK_STATS } from '@/lib/mockData';

interface TownWithVotes extends Town {
  votes: number;
  percentage?: number;
}

// أيقونة موحدة لجميع الأحياء - تشير إلى موقع/حي
// ملاحظة: الأيقونة الفعلية يتم عرضها من constants.ts في NeighborhoodsGrid
// هذا الحقل موجود للتوافق مع NeighborhoodItem interface
const UNIFIED_NEIGHBORHOOD_ICON = '📍';
const UNIFIED_ICON_BG_COLOR = 'rgb(204, 251, 241)';

function transformTownToNeighborhood(town: TownWithVotes, index: number, totalVotes: number): NeighborhoodItem {
  const votes = town.votes ?? 0;
  const percentage = town.percentage ?? 0;

  return {
    id: town.id,
    name: town.name,
    location: town.address,
    votes,
    icon: UNIFIED_NEIGHBORHOOD_ICON,
    iconBg: UNIFIED_ICON_BG_COLOR,
    percentage,
    totalCap: totalVotes, // استخدام إجمالي الأصوات بدلاً من القيمة الثابتة
  };
}

export function usePublicTowns() {
  const [towns, setTowns] = useState<TownWithVotes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalVotesFromStats, setTotalVotesFromStats] = useState<number>(0);
  const [votesTodayFromStats, setVotesTodayFromStats] = useState<number>(0);
  const [searchResults, setSearchResults] = useState<TownWithVotes[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // جلب الأحياء من الباك إند - أو بيانات وهمية عند NEXT_PUBLIC_USE_MOCK_DATA=true
  const fetchTowns = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (isMockDataEnabled()) {
        setTowns(MOCK_TOWNS as TownWithVotes[]);
        setIsLoading(false);
        return;
      }
      const response = await fetch(`${API_BASE}/towns`, {
        method: 'GET',
        headers: { accept: '*/*' },
      });

      if (response.ok) {
        const data: TownWithVotes[] = await response.json();
        setTowns(Array.isArray(data) ? data : []);
      } else {
        setError('فشل في جلب الأحياء.');
        setTowns([]);
      }
    } catch (err: any) {
      console.error('Error fetching towns:', err);
      setError(err.message || 'حدث خطأ في جلب الأحياء.');
      setTowns([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // جلب إجمالي الأصوات وأصوات اليوم من API stats أو بيانات وهمية
  const fetchTotalVotes = async () => {
    try {
      if (isMockDataEnabled()) {
        setTotalVotesFromStats(MOCK_STATS.totalVotes);
        setVotesTodayFromStats(MOCK_STATS.todayVotes);
        return;
      }
      const response = await fetch(`${API_BASE}/stats`, {
        method: 'GET',
        headers: {
          'accept': '*/*',
        },
      });

      if (response.ok) {
        const stats = await response.json();
        setTotalVotesFromStats(stats.totalVotes || 0);
        setVotesTodayFromStats(stats.todayVotes || 0);
      }
    } catch (error) {
      console.error('Error fetching total votes from stats:', error);
    }
  };

  // البحث عن الأحياء من الباك إند أو تصفية البيانات الوهمية
  const searchTowns = useCallback(async (query: string): Promise<void> => {
    if (!query || query.trim() === '') {
      await fetchTowns();
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      if (isMockDataEnabled()) {
        const q = query.trim().toLowerCase();
        const filtered = MOCK_TOWNS.filter(
          (t) =>
            t.name.toLowerCase().includes(q) || t.address.toLowerCase().includes(q)
        );
        setSearchResults(filtered as TownWithVotes[]);
        setIsSearching(false);
        return;
      }
      const url = `${API_BASE}/towns/search?q=${encodeURIComponent(query)}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const data = await response.json();
        const errorText = data.error || 'فشل في البحث عن الأحياء.';
        throw new Error(errorText);
      }

      const data = await response.json();
      const searchedTowns: TownWithVotes[] = Array.isArray(data) ? data : [];
      setSearchResults(searchedTowns);
    } catch (err: any) {
      console.error('Error searching towns:', err);
      setError(err.message || 'حدث خطأ في البحث عن الأحياء.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [fetchTowns]);

  useEffect(() => {
    Promise.all([fetchTowns(), fetchTotalVotes()]);
  }, [fetchTowns]);

  // استخدام الريسبونس مباشرة - votes و percentage من الباك إند
  const neighborhoods = useMemo(() => {
    const townsToUse = searchResults !== null ? searchResults : towns;
    const sumOfAllVotes = towns.reduce((sum, t) => sum + (t.votes ?? 0), 0);
    const totalVotesForPercentage = totalVotesFromStats > 0
      ? totalVotesFromStats
      : (sumOfAllVotes > 0 ? sumOfAllVotes : 1);

    return townsToUse.map((town, index) =>
      transformTownToNeighborhood(town, index, totalVotesForPercentage)
    );
  }, [towns, searchResults, totalVotesFromStats]);

  const totalVotes = useMemo(() => {
    const sumOfAllVotes = towns.reduce((sum, t) => sum + (t.votes ?? 0), 0);
    return totalVotesFromStats > 0
      ? totalVotesFromStats
      : (sumOfAllVotes > 0 ? sumOfAllVotes : 1);
  }, [towns, totalVotesFromStats]);

  const refetch = async () => {
    await Promise.all([fetchTowns(), fetchTotalVotes()]);
  };

  return {
    neighborhoods,
    isLoading,
    isSearching,
    error,
    totalVotes,
    votesToday: votesTodayFromStats,
    refetch,
    searchTowns,
  };
}
