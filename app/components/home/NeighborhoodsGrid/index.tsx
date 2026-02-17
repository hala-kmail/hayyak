'use client';

import React, { useState } from 'react';
import type { NeighborhoodItem } from '../../data';
import { VoteModal } from '../VoteModal';
import { Tabs, SearchBox, ScrollButtons, EmptyState, GridCard } from './components';
import { gridStyles } from './styles';
import { useHorizontalScroll } from './hooks';
import {
  getBaseNeighborhoods,
  filterNeighborhoods,
  getMaxVotes,
  calculateProgress,
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
}: NeighborhoodsGridProps) {
  const [selectedNeighborhood, setSelectedNeighborhood] =
    useState<NeighborhoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { scrollContainerRef, scroll } = useHorizontalScroll();

  const maxVotes = getMaxVotes(neighborhoods);
  const sortedNeighborhoods = sortNeighborhoodsByVotes(neighborhoods);
  const baseNeighborhoods = getBaseNeighborhoods(neighborhoods, activeTab);
  const displayNeighborhoods = filterNeighborhoods(baseNeighborhoods, searchQuery);

  const handleNeighborhoodClick = (neighborhood: NeighborhoodItem) => {
    setSelectedNeighborhood(neighborhood);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNeighborhood(null);
  };

  const handleVoteForAnother = () => {
    handleCloseModal();
    setTimeout(() => {
      const districtsSection = document.getElementById('districts');
      if (districtsSection) {
        districtsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const isScrollable = activeTab === 'all' && !searchQuery;
  const cardWidth = getCardWidth(activeTab, !!searchQuery);

  return (
    <section className={gridStyles.section}>
      <div className={gridStyles.container}>
        <div className={gridStyles.navigationContainer}>
          <div className={gridStyles.controlsWrapper}>
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
            <SearchBox searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </div>

          {isScrollable && <ScrollButtons onScroll={scroll} />}
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
                const progress = calculateProgress(votes, totalVotes);
                const isLeaderNeighborhood = isLeader(votes, maxVotes);
                const rank = getRank(neighborhood.id, sortedNeighborhoods);
                const iconIndex =
                  neighborhoods.findIndex((n) => n.id === neighborhood.id) %
                  NEIGHBORHOOD_ICONS.length;
                const iconConfig = NEIGHBORHOOD_ICONS[iconIndex];

                return (
                  <GridCard
                    key={neighborhood.id}
                    neighborhood={neighborhood}
                    totalVotes={totalVotes}
                    maxVotes={maxVotes}
                    rank={rank}
                    progress={progress}
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
