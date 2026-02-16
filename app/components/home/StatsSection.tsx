'use client';

import React from 'react';
import { FaHome, FaChartLine, FaChartBar } from 'react-icons/fa';
import { formatNumber } from '@/base/utils';

export interface StatsSectionProps {
  neighborhoodsCount?: number;
  votesToday?: number;
  totalVotes?: number;
}

const StatsSection: React.FC<StatsSectionProps> = ({
  neighborhoodsCount = 4,
  votesToday = 343,
  totalVotes = 1687,
}) => {
  const stats = [
    {
      label: 'عدد الأحياء',
      value: formatNumber(neighborhoodsCount),
      icon: <FaHome className="w-8 h-8 text-lime-green" />,
      color: 'bg-lime-green/10',
    },
    {
      label: 'أصوات اليوم',
      value: formatNumber(votesToday),
      icon: <FaChartLine className="w-8 h-8 text-grey-blue" />,
      color: 'bg-grey-blue/10',
    },
    {
      label: 'إجمالي الأصوات',
      value: formatNumber(totalVotes),
      icon: <FaChartBar className="w-8 h-8 text-primary-turquoise" />,
      color: 'bg-primary-turquoise/10',
    },
  ];

  return (
    <section className="py-12 bg-gray-50/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className={`${stat.color} p-4 rounded-3xl mb-4`}>
                {stat.icon}
              </div>
              <div className="text-4xl font-black text-navy-blue mb-1">
                {stat.value}
              </div>
              <div className="text-primary-grey font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
