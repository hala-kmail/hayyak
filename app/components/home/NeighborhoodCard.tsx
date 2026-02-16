'use client';

import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import type { NeighborhoodItem } from './data';

interface NeighborhoodCardProps {
  neighborhood: NeighborhoodItem;
  totalVotes: number;
  onClick?: () => void;
  isLeader?: boolean;
}

export function NeighborhoodCard({ 
  neighborhood, 
  totalVotes,
  onClick,
  isLeader = false,
}: NeighborhoodCardProps) {
  const votes = neighborhood.votes ?? 0;
  // استخدام إجمالي الأصوات الممرر لحساب نسبة التقدم
  const progress = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

  const CardContent = (
    <div className={`group relative bg-white rounded-3xl p-6 shadow-lg shadow-gray-200/40 border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-turquoise/10 hover:border-turquoise/20 flex flex-col h-full text-right w-full ${
      onClick ? 'cursor-pointer active:scale-[0.98]' : ''
    } ${isLeader ? 'ring-2 ring-turquoise/30' : ''}`}>
      <div className="flex justify-end items-start mb-6">
        <div className="text-left">
          <span className="block text-2xl font-black text-navy-blue leading-none">
            {votes}
          </span>
          <span className="text-[9px] font-bold text-warm-grey uppercase tracking-widest">
            صوتاً
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-black text-navy-blue mb-1 group-hover:text-turquoise transition-colors">
          {neighborhood.name}
        </h3>
        <p className="text-xs text-warm-grey font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sand-brown/60" />
          {neighborhood.location}
        </p>
      </div>

      <div className="mt-auto">
        <div className="mb-4">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] font-bold text-navy-blue/40">
              نسبة التقدم
            </span>
            <span className="text-sm font-black text-turquoise">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-50">
            <div
              className="h-full bg-turquoise rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {onClick && (
          <span className="inline-flex items-center gap-2 text-xs font-bold text-turquoise opacity-0 group-hover:opacity-100 transition-opacity">
            <FaChevronLeft className="w-3 h-3" />
            اضغط للتصويت
          </span>
        )}
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full text-right"
      >
        {CardContent}
      </button>
    );
  }

  return CardContent;
}
