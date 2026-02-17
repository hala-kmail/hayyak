'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { NeighborhoodItem } from '@/app/components/home/data';
import { fetchTownsFromAPI, type Town } from './useTowns';
import { API_BASE } from '@/lib/api';

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
  const votes = town.votes || 0;
  
  // استخدام نسبة التقدم من استجابة الباكيند مباشرة
  // إذا لم تكن متوفرة، نستخدم 0 كقيمة افتراضية
  const percentage = town.percentage ?? 0;
  
  // طباعة معلومات التصحيح
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 ${town.name}: ${votes} صوت، النسبة من الباكيند: ${percentage.toFixed(2)}%`);
  }
  
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
  const [towns, setTowns] = useState<Town[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [votesMap, setVotesMap] = useState<Record<string, number>>({});
  const [votesLoading, setVotesLoading] = useState(true);
  const [votesError, setVotesError] = useState<string | null>(null);
  const [totalVotesFromStats, setTotalVotesFromStats] = useState<number>(0);
  const [votesTodayFromStats, setVotesTodayFromStats] = useState<number>(0);
  const [searchResults, setSearchResults] = useState<Town[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // استخدام نفس الدالة من useTowns.ts
  const fetchTowns = useCallback(async () => {
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
  }, []);

  // جلب الأصوات من API الخارجي مباشرة
  const fetchVotes = useCallback(async () => {
    setVotesLoading(true);
    setVotesError(null);
    
    try {
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
  }, []);

  // جلب إجمالي الأصوات وأصوات اليوم من API stats
  const fetchTotalVotes = async () => {
    try {
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

  // البحث عن الأحياء من الباك إند
  const searchTowns = useCallback(async (query: string): Promise<void> => {
    if (!query || query.trim() === '') {
      // إعادة جلب جميع الأحياء عند مسح البحث أولاً
      await fetchTowns();
      await fetchVotes();
      // ثم إعادة تعيين نتائج البحث
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const url = `/api/towns/search?q=${encodeURIComponent(query)}`;
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
      
      // تحديث خريطة الأصوات للنتائج المبحوثة
      // النسبة المئوية تأتي مباشرة من الباكيند في town.percentage
      setVotesMap((prevVotesMap) => {
        const newVotesMap = { ...prevVotesMap };
        searchedTowns.forEach((town: TownWithVotes) => {
          newVotesMap[town.id] = town.votes ?? 0;
        });
        return newVotesMap;
      });
      
      setSearchResults(searchedTowns as Town[]);
    } catch (err: any) {
      console.error('Error searching towns:', err);
      setError(err.message || 'حدث خطأ في البحث عن الأحياء.');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, [fetchTowns, fetchVotes]);

  useEffect(() => {
    // جلب البيانات بشكل متوازي (parallel) لتحسين الأداء
    Promise.all([
      fetchTowns(),
      fetchVotes(),
      fetchTotalVotes(),
    ]);
  }, [fetchTowns, fetchVotes]);

  // تحويل الأحياء إلى NeighborhoodItem مع الأصوات
  const neighborhoods = useMemo(() => {
    // استخدام نتائج البحث إذا كانت متوفرة، وإلا استخدام الأحياء العادية
    const townsToUse = searchResults !== null ? searchResults : towns;
    
    const townsWithVotes: TownWithVotes[] = townsToUse.map((town) => {
      // استخدام الأصوات والنسبة المئوية من API الخارجي
      const votes = votesMap[town.id] ?? 0;
      return {
        ...town,
        votes,
        // الحفاظ على percentage من الاستجابة الأصلية إذا كانت موجودة
        percentage: town.percentage,
      };
    });
    
    // حساب مجموع الأصوات من جميع الأحياء (وليس فقط الأحياء المعروضة)
    // هذا يضمن أن النسبة المئوية تكون صحيحة حتى عند البحث
    const sumOfAllVotes = towns.reduce((sum, town) => {
      const votes = votesMap[town.id] ?? 0;
      return sum + votes;
    }, 0);
    
    // استخدام إجمالي الأصوات من API stats إذا كان متوفراً، وإلا استخدام مجموع الأصوات من جميع الأحياء
    // يجب أن يكون على الأقل 1 لتجنب القسمة على صفر
    const totalVotesForPercentage = totalVotesFromStats > 0 
      ? totalVotesFromStats 
      : (sumOfAllVotes > 0 ? sumOfAllVotes : 1);
    
    return townsWithVotes.map((town, index) =>
      transformTownToNeighborhood(town, index, totalVotesForPercentage)
    );
  }, [towns, searchResults, votesMap, totalVotesFromStats]);

  // حساب إجمالي الأصوات من جميع الأحياء
  // يجب أن يكون إجمالي الأصوات من جميع الأحياء، وليس فقط الأحياء المعروضة
  // هذا يضمن أن النسبة المئوية لكل حي تُحسب بناءً على إجمالي جميع الأصوات
  const totalVotes = useMemo(() => {
    // حساب مجموع الأصوات من جميع الأحياء (وليس فقط الأحياء المعروضة)
    const sumOfAllVotes = towns.reduce((sum, town) => {
      const votes = votesMap[town.id] ?? 0;
      return sum + votes;
    }, 0);
    
    // استخدام إجمالي الأصوات من API stats إذا كان متوفراً، وإلا استخدام مجموع الأصوات من جميع الأحياء
    // يجب أن يكون على الأقل 1 لتجنب القسمة على صفر
    const total = totalVotesFromStats > 0 
      ? totalVotesFromStats 
      : (sumOfAllVotes > 0 ? sumOfAllVotes : 1);
    
    // طباعة معلومات التصحيح
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 إجمالي الأصوات: ${total} (من stats: ${totalVotesFromStats}, من الأحياء: ${sumOfAllVotes})`);
    }
    
    return total;
  }, [towns, votesMap, totalVotesFromStats]);

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
  // لا نعرض loading عند البحث، فقط عند التحميل الأولي
  const shouldShowLoading = isLoading && votesLoading && !isDataReady;

  return {
    neighborhoods,
    isLoading: shouldShowLoading,
    isSearching,
    error: error || votesError,
    totalVotes,
    votesToday: votesTodayFromStats,
    refetch,
    searchTowns,
  };
}
