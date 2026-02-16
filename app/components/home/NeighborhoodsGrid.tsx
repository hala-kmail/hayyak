'use client';

import React, { useState, useRef } from 'react';
import {
  FaTree,
  FaBuilding,
  FaMountain,
  FaCity,
  FaAward,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
} from 'react-icons/fa';
import type { NeighborhoodItem } from './data';
import { VoteModal } from './VoteModal';

const NEIGHBORHOOD_ICONS: Array<{
  icon: React.ReactNode;
  iconColor: string;
}> = [
  { icon: <FaMountain className="w-5 h-5" />, iconColor: 'text-quite-purple' },
  { icon: <FaTree className="w-5 h-5" />, iconColor: 'text-lime-green' },
  { icon: <FaCity className="w-5 h-5" />, iconColor: 'text-grey-blue' },
  { icon: <FaBuilding className="w-5 h-5" />, iconColor: 'text-sand-brown' },
];

interface NeighborhoodsGridProps {
  neighborhoods: NeighborhoodItem[];
  totalVotes: number;
  onVoteSuccess?: () => void;
}

export function NeighborhoodsGrid({
  neighborhoods,
  totalVotes,
  onVoteSuccess,
}: NeighborhoodsGridProps) {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<NeighborhoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'top'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const maxVotes = Math.max(...neighborhoods.map((n) => n.votes), 0);

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

  const sortedNeighborhoods = [...neighborhoods].sort((a, b) => b.votes - a.votes);
  const topNeighborhoods = sortedNeighborhoods.slice(0, 3);
  
  // فلترة الأحياء بناءً على البحث
  const filterNeighborhoods = (neighborhoodsList: NeighborhoodItem[]) => {
    if (!searchQuery.trim()) {
      return neighborhoodsList;
    }
    const query = searchQuery.toLowerCase().trim();
    return neighborhoodsList.filter(
      (n) =>
        n.name.toLowerCase().includes(query) ||
        n.location.toLowerCase().includes(query)
    );
  };

  const baseNeighborhoods = activeTab === 'top' ? topNeighborhoods : sortedNeighborhoods;
  const displayNeighborhoods = filterNeighborhoods(baseNeighborhoods);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tabs Navigation */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-4 gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Tabs */}
            <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => {
                  setActiveTab('all');
                }}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'all'
                    ? 'bg-white text-turquoise shadow-sm'
                    : 'text-warm-grey hover:text-navy-blue'
                }`}
              >
                جميع الأحياء
              </button>
              <button
                onClick={() => {
                  setActiveTab('top');
                }}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'top'
                    ? 'bg-white text-turquoise shadow-sm'
                    : 'text-warm-grey hover:text-navy-blue'
                }`}
              >
                المتصدرون
              </button>
            </div>

            {/* Search Box */}
            <div className="relative bg-gray-100 rounded-xl p-1 flex-1 max-w-md">
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-grey pointer-events-none">
                <FaSearch className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن حي..."
                className="w-full pr-10 pl-4 py-2 rounded-lg bg-white text-sm text-right font-bold text-warm-grey placeholder-warm-grey focus:outline-none focus:text-navy-blue transition-all"
              />
            </div>
          </div>

          {/* Scroll Buttons */}
          {activeTab === 'all' && !searchQuery && (
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-warm-grey hover:text-turquoise hover:border-turquoise transition-colors"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-warm-grey hover:text-turquoise hover:border-turquoise transition-colors"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollContainerRef}
          className={`overflow-x-auto scrollbar-hide py-4 px-2 ${
            activeTab === 'all' && !searchQuery ? 'scroll-smooth' : ''
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {displayNeighborhoods.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-warm-grey text-lg font-medium">
                لم يتم العثور على أحياء تطابق البحث
              </p>
              <p className="text-warm-grey text-sm mt-2">
                جرب البحث بكلمات مختلفة
              </p>
            </div>
          ) : (
            <div
              className={`flex gap-4 ${
                activeTab === 'all' && !searchQuery ? 'flex-nowrap' : 'flex-wrap justify-center'
              }`}
            >
              {displayNeighborhoods.map((n, index) => {
              const totalCap = n.totalCap ?? 600;
              const progress = totalCap > 0 ? (n.votes / totalCap) * 100 : 0;
              const isLeader = n.votes === maxVotes && n.votes > 0;
              const rank = sortedNeighborhoods.findIndex((neigh) => neigh.id === n.id) + 1;
              const iconConfig = NEIGHBORHOOD_ICONS[neighborhoods.findIndex((neigh) => neigh.id === n.id) % NEIGHBORHOOD_ICONS.length];

              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => handleNeighborhoodClick(n)}
                  className={`group relative flex-shrink-0 bg-white rounded-xl p-6 shadow-sm border transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer active:scale-[0.98] ${
                    isLeader
                      ? 'border-turquoise bg-turquoise/5'
                      : 'border-gray-100 hover:border-turquoise/30'
                  } ${activeTab === 'all' && !searchQuery ? 'w-[350px]' : 'w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]'}`}
                >
                  {/* Compact Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {/* Rank */}
                      {/* <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-black ${
                          rank === 1
                            ? 'bg-turquoise text-white'
                            : rank === 2
                            ? 'bg-warm-grey text-white'
                            : rank === 3
                            ? 'bg-sand-brown text-white'
                            : 'bg-gray-100 text-navy-blue'
                        }`}
                      >
                        {rank === 1 ? <FaAward className="w-5 h-5" /> : rank}
                      </div> */}
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                          isLeader ? 'bg-turquoise/10' : 'bg-gray-50'
                        }`}
                      >
                        {React.cloneElement(iconConfig.icon as React.ReactElement<{ className?: string }>, {
                          className: `w-6 h-6 ${isLeader ? 'text-turquoise' : iconConfig.iconColor}`,
                        })}
                      </div>
                      {/* Name */}
                      <div className="text-right">
                        <h3
                          className={`text-lg font-black transition-colors mb-1 ${
                            isLeader ? 'text-turquoise' : 'text-navy-blue group-hover:text-turquoise'
                          }`}
                        >
                          {n.name}
                        </h3>
                        <p className="text-xs text-warm-grey">{n.location}</p>
                      </div>
                    </div>
                    {/* Votes */}
                    <div className="text-left flex-shrink-0">
                      <span className="block text-2xl font-black text-navy-blue leading-none">
                        {n.votes}
                      </span>
                      <span className="text-[10px] font-bold text-warm-grey uppercase">
                        صوت
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                          isLeader ? 'bg-turquoise' : 'bg-turquoise/60'
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-navy-blue/50">
                        نسبة التقدم
                      </span>
                      <span className="text-sm font-black text-turquoise">
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
            </div>
          )}
        </div>
      </div>

      {/* Vote Modal */}
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
