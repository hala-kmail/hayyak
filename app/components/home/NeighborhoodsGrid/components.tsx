'use client';

import React, { useState } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
} from 'react-icons/fa';
import type { TabType } from './types';
import { gridStyles } from './styles';
import { GridCardProps } from './types';

/**
 * Tabs Component
 * Following Single Responsibility Principle - only handles tabs display
 */
interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Tabs = React.memo(function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className={gridStyles.tabsContainer}>
      
      <button
        onClick={() => {
          onTabChange('top');
        }}
        className={gridStyles.tabButton(activeTab === 'top')}
      >
        المتصدرون
      </button>
      <button
        onClick={() => {
          onTabChange('all');
        }}
        className={gridStyles.tabButton(activeTab === 'all')}
      >
        جميع الأحياء
      </button>
    </div>
  );
});

/**
 * Search Box Component
 * Following Single Responsibility Principle - only handles search input
 */
interface SearchBoxProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchBox = React.memo(function SearchBox({ searchQuery, onSearchChange }: SearchBoxProps) {
  return (
    <div className={gridStyles.searchContainer}>
      <div className={gridStyles.searchIcon}>
        <FaSearch className={gridStyles.searchIconSvg} />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => {
          onSearchChange(e.target.value);
        }}
        placeholder="ابحث عن حي..."
        className={gridStyles.searchInput}
      />
    </div>
  );
});

/**
 * Scroll Buttons Component
 * Following Single Responsibility Principle - only handles scroll buttons
 */
interface ScrollButtonsProps {
  onScroll: (direction: 'left' | 'right') => void;
}

export const ScrollButtons = React.memo(function ScrollButtons({ onScroll }: ScrollButtonsProps) {
  return (
    <div className={gridStyles.scrollButtonsContainer}>
      <button
        onClick={() => {
          onScroll('left');
        }}
        className={gridStyles.scrollButton}
      >
        <FaChevronRight className={gridStyles.scrollIcon} />
      </button>
      <button
        onClick={() => {
          onScroll('right');
        }}
        className={gridStyles.scrollButton}
      >
        <FaChevronLeft className={gridStyles.scrollIcon} />
      </button>
    </div>
  );
});

/**
 * Section Header Component
 * Following Single Responsibility Principle - only handles section header display
 */
export const SectionHeader = React.memo(function SectionHeader() {
  return (
    <div className={gridStyles.headerContainer}>
      {/* <span className={gridStyles.headerBadge}>
        المنافسة مشتعلة
      </span> */}
      <h2 className={gridStyles.headerTitle}>
        الأحياء المشاركة
      </h2>
      <div className={gridStyles.headerDivider} />
    </div>
  );
});

/**
 * Empty State Component
 * Following Single Responsibility Principle - only handles empty state display
 */
export const EmptyState = React.memo(function EmptyState() {
  return (
    <div className={gridStyles.emptyState}>
      <p className={gridStyles.emptyStateTitle}>
        لم يتم العثور على أحياء تطابق البحث
      </p>
      <p className={gridStyles.emptyStateSubtitle}>
        جرب البحث بكلمات مختلفة
      </p>
    </div>
  );
});

/**
 * Grid Card Component
 * Following Single Responsibility Principle - only handles single card display
 */
export const GridCard = React.memo(function GridCard({
  neighborhood,
  rank,
  isLeader,
  iconConfig,
  onClick,
  cardWidth,
}: GridCardProps) {
  const votes = neighborhood.votes ?? 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className={gridStyles.card(isLeader, cardWidth)}
    >
      <div className={gridStyles.cardHeader}>
        <div className={gridStyles.cardLeftSection}>
          <div className={gridStyles.rankContainer(isLeader)}>
            <span className={gridStyles.rankNumber(isLeader)}>{rank}</span>
          </div>
          <div className={gridStyles.cardTextSection}>
            <h3 className={gridStyles.cardTitle(isLeader)}>
              {neighborhood.name}
            </h3>
            <p className={gridStyles.cardLocation}>{neighborhood.location}</p>
          </div>
        </div>
        <div className={gridStyles.votesSection}>
          <span className={gridStyles.votesValue}>{votes}</span>
          <span className={gridStyles.votesLabel}>صوت</span>
        </div>
      </div>

      <div className={gridStyles.progressContainer}>
        <div className={gridStyles.progressBar} >
          <div
            className={gridStyles.progressFill(isLeader)}
            style={{ width: `${Math.min(Number(neighborhood.percentage) || 0, 100)}%` }}
          />
        </div>
        <div className={gridStyles.progressFooter}>
          <span className={gridStyles.progressLabel}>نسبة التقدم</span>
          <span className={gridStyles.progressValue(isLeader)}>
            {Math.round(Number(neighborhood.percentage) || 0)}%
          </span>
        </div>
      </div>
    </button>
  );
});
