'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import type { NeighborhoodItem } from '../data';
import { VoteModal } from '../VoteModal';
import { Tabs, SearchBox, ScrollButtons, EmptyState, GridCard, SectionHeader } from './components';
import { gridStyles } from './styles';
import { useHorizontalScroll } from './hooks';
import {
  getBaseNeighborhoods,
  getMaxVotes,
  isLeader,
  getRank,
  getCardWidth,
  sortNeighborhoodsByVotes,
} from './utils';
import { NEIGHBORHOOD_ICONS } from './constants';
import type { NeighborhoodsGridProps, TabType } from './types';

/**
 * NeighborhoodsGrid Component
 * Following SOLID Principles:
 * - Single Responsibility: Only orchestrates the neighborhoods grid layout
 * - Open/Closed: Extensible via props without modifying internal logic
 * - Dependency Inversion: Depends on abstractions (hooks, utils) not concrete implementations
 */
export function NeighborhoodsGrid({
  neighborhoods,
  totalVotes,
  onVoteSuccess,
  searchTowns,
}: NeighborhoodsGridProps & { searchTowns?: (query: string) => Promise<void> }) {
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<NeighborhoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('top');
  const [searchQuery, setSearchQuery] = useState('');
  const { scrollContainerRef, scroll } = useHorizontalScroll();
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);
  const previousSearchQueryRef = useRef<string>('');

  // البحث من الباك إند مع debounce
  useEffect(() => {
    // تجاهل التحميل الأولي
    if (isInitialMount.current) {
      isInitialMount.current = false;
      previousSearchQueryRef.current = searchQuery;
      return;
    }

    // تجاهل إذا لم يتغير نص البحث
    if (previousSearchQueryRef.current === searchQuery) {
      return;
    }

    // حفظ القيمة القديمة قبل التحديث
    const previousQuery = previousSearchQueryRef.current;
    const hadSearchBefore = previousQuery.trim().length > 0;
    const hasSearchNow = searchQuery.trim().length > 0;
    
    previousSearchQueryRef.current = searchQuery;

    // إلغاء البحث السابق إذا كان موجوداً
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // إذا كان هناك نص بحث، انتظر 500ms قبل البحث
    if (hasSearchNow && searchTowns) {
      debounceTimerRef.current = setTimeout(() => {
        searchTowns(searchQuery.trim());
      }, 500);
    } else if (!hasSearchNow && searchTowns && hadSearchBefore) {
      // إذا تم مسح البحث (كان هناك بحث سابق)، إعادة جلب جميع الأحياء فوراً
      searchTowns('');
    }

    // تنظيف عند إلغاء المكون أو تغيير searchQuery
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery, searchTowns]);

  // ترتيب جميع الأحياء حسب الأصوات (تنازلي) لضمان الترتيب الصحيح
  const sortedNeighborhoods = useMemo(() => sortNeighborhoodsByVotes(neighborhoods), [neighborhoods]);
  
  // تحديد الأحياء المعروضة: إذا كان هناك بحث، استخدم نتائج البحث المرتبة
  // وإلا استخدم التبويب النشط (أفضل 3 أو جميع الأحياء) - كلها مرتبة حسب الأصوات
  const displayNeighborhoods = useMemo(() => {
    if (searchQuery.trim()) {
      // عند البحث، استخدم الأحياء المرتبة حسب الأصوات
      return sortedNeighborhoods;
    }
    // عند اختيار التبويب، استخدم getBaseNeighborhoods التي ترتب البيانات حسب الأصوات
    return getBaseNeighborhoods(neighborhoods, activeTab);
  }, [searchQuery, neighborhoods, activeTab, sortedNeighborhoods]);
  
  // حساب أعلى أصوات من الأحياء المعروضة فقط (وليس جميع الأحياء)
  // هذا يضمن أن شريط التقدم يعرض النسبة الصحيحة حتى عند البحث أو تصفية الأحياء
  const maxVotes = useMemo(() => getMaxVotes(displayNeighborhoods), [displayNeighborhoods]);

  const handleNeighborhoodClick = useCallback((neighborhood: NeighborhoodItem) => {
    setSelectedNeighborhood(neighborhood);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedNeighborhood(null);
  }, []);

  const handleVoteForAnother = useCallback(() => {
    handleCloseModal();
    setTimeout(() => {
      const districtsSection = document.getElementById('districts');
      if (districtsSection) {
        districtsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  }, [handleCloseModal]);

  const isScrollable = useMemo(() => activeTab === 'all' && !searchQuery, [activeTab, searchQuery]);
  const cardWidth = useMemo(() => getCardWidth(activeTab, !!searchQuery), [activeTab, searchQuery]);
  const showScrollButtons = useMemo(() => activeTab === 'all', [activeTab]);

  return (
    <section id="districts" className={gridStyles.section} style={{ marginBottom: '-3px' }}>
      <SectionHeader />
      <div className={gridStyles.contentContainer}>
        <div className={gridStyles.navigationContainer}>
          <div className={gridStyles.controlsWrapper}>
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
            <SearchBox searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </div>

          {showScrollButtons && <ScrollButtons onScroll={scroll} />}
        </div>

        <div
          ref={scrollContainerRef}
          className={gridStyles.scrollContainer(isScrollable)}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {displayNeighborhoods.length === 0 ? (
            <EmptyState />
          ) : (
            <div className={gridStyles.cardsContainer(isScrollable)}>
              {displayNeighborhoods.map((neighborhood) => {
                const votes = neighborhood.votes ?? 0;
                const isLeaderNeighborhood = isLeader(votes, maxVotes);
                const rank = getRank(neighborhood.id, sortedNeighborhoods);
                const iconConfig = NEIGHBORHOOD_ICONS[0];

                return (
                  <GridCard
                    key={neighborhood.id}
                    neighborhood={neighborhood}
                    totalVotes={totalVotes}
                    maxVotes={maxVotes}
                    rank={rank}
                    isLeader={isLeaderNeighborhood}
                    iconConfig={iconConfig}
                    onClick={() => {
                      handleNeighborhoodClick(neighborhood);
                    }}
                    cardWidth={cardWidth}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      <VoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        neighborhood={selectedNeighborhood}
        neighborhoods={neighborhoods}
        onVoteForAnother={handleVoteForAnother}
        onVoteSuccess={onVoteSuccess}
      />
    </section>
  );
}
