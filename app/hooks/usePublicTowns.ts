'use client';

import { useState, useEffect, useMemo } from 'react';
import type { NeighborhoodItem } from '@/app/components/home/data';
import { fetchTownsFromAPI, type Town } from './useTowns';

interface TownWithVotes extends Town {
  votes: number;
}

// استخدام نفس الثوابت من useTowns (يمكن استخراجها لملف مشترك لاحقاً)
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

function transformTownToNeighborhood(town: TownWithVotes, index: number, totalVotes: number): NeighborhoodItem {
  const iconIndex = index % NEIGHBORHOOD_ICONS.length;
  const votes = town.votes || 0;
  
  // حساب نسبة التقدم بناءً على إجمالي الأصوات من API
  const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
  
  return {
    id: town.id,
    name: town.name,
    location: town.address,
    votes,
    icon: NEIGHBORHOOD_ICONS[iconIndex],
    iconBg: ICON_BG_COLORS[iconIndex],
    percentage,
    totalCap: totalVotes, // استخدام إجمالي الأصوات بدلاً من القيمة الثابتة
  };
}

export function usePublicTowns() {
  const [towns, setTowns] = useState<Town[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [votesMap, setVotesMap] = useState<Record<string, number>>({});
  const [votesLoading, setVotesLoading] = useState(true);
  const [votesError, setVotesError] = useState<string | null>(null);
  const [totalVotesFromStats, setTotalVotesFromStats] = useState<number>(0);
  const [votesTodayFromStats, setVotesTodayFromStats] = useState<number>(0);

  // استخدام نفس الدالة من useTowns.ts
  const fetchTowns = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // استدعاء نفس الدالة من useTowns.ts بدون authentication
      const data = await fetchTownsFromAPI(false);
      setTowns(data);
    } catch (err: any) {
      console.error('Error fetching towns:', err);
      setError(err.message || 'حدث خطأ في جلب الأحياء.');
      setTowns([]);
    } finally {
      setIsLoading(false);
    }
  };

  // جلب الأصوات من API الخارجي مباشرة
  const fetchVotes = async () => {
    setVotesLoading(true);
    setVotesError(null);
    
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api-sakani-election.orapexdev.com/api';
      
      // جلب الأحياء مع الأصوات من API الخارجي
      const votesResponse = await fetch(`${API_BASE}/towns`, {
        method: 'GET',
        headers: {
          'accept': '*/*',
        },
      });
      
      if (votesResponse.ok) {
        const townsWithVotesData: TownWithVotes[] = await votesResponse.json();
        const map = townsWithVotesData.reduce((acc, town: TownWithVotes) => {
          // استخدام votes من API الخارجي مباشرة
          acc[town.id] = town.votes ?? 0;
          return acc;
        }, {} as Record<string, number>);
        setVotesMap(map);
      } else {
        setVotesError('فشل في جلب الأصوات.');
      }
    } catch (error) {
      console.error('Error fetching votes:', error);
      setVotesError('حدث خطأ في جلب الأصوات.');
    } finally {
      setVotesLoading(false);
    }
  };

  // جلب إجمالي الأصوات وأصوات اليوم من API stats
  const fetchTotalVotes = async () => {
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api-sakani-election.orapexdev.com/api';
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

  useEffect(() => {
    fetchTowns();
    fetchVotes();
    fetchTotalVotes();
  }, []);

  // تحويل الأحياء إلى NeighborhoodItem مع الأصوات
  const neighborhoods = useMemo(() => {
    const townsWithVotes: TownWithVotes[] = towns.map((town) => {
      // استخدام الأصوات من API الخارجي
      const votes = votesMap[town.id] ?? 0;
      return {
        ...town,
        votes,
      };
    });
    
    // استخدام إجمالي الأصوات من API stats لحساب النسبة
    const totalVotesForPercentage = totalVotesFromStats > 0 ? totalVotesFromStats : 1;
    
    return townsWithVotes.map((town, index) =>
      transformTownToNeighborhood(town, index, totalVotesForPercentage)
    );
  }, [towns, votesMap, totalVotesFromStats]);

  const totalVotes = useMemo(() => {
    // استخدام إجمالي الأصوات من API stats إذا كان متوفراً، وإلا حسابها من الأحياء
    return totalVotesFromStats > 0 ? totalVotesFromStats : neighborhoods.reduce((sum, n) => sum + n.votes, 0);
  }, [neighborhoods, totalVotesFromStats]);

  const refetch = async () => {
    // جلب البيانات بشكل متوازي (parallel) بدلاً من متتالي (sequential) لتحسين الأداء
    await Promise.all([
      fetchTowns(),
      fetchVotes(),
      fetchTotalVotes(),
    ]);
  };

  // عرض البيانات حتى لو كانت بعض الطلبات لا تزال قيد التنفيذ
  // هذا يضمن عرض أفضل 3 أحياء مباشرة عند توفر البيانات الأساسية
  const isDataReady = towns.length > 0 && Object.keys(votesMap).length > 0;
  const shouldShowLoading = isLoading && votesLoading && !isDataReady;

  return {
    neighborhoods,
    isLoading: shouldShowLoading,
    error: error || votesError,
    totalVotes,
    votesToday: votesTodayFromStats,
    refetch,
  };
}
