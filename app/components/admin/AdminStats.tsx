'use client';

import React from 'react';
import { useStats, StatsData } from '@/app/hooks/useStats';
import { useTop3Towns } from '@/app/hooks/useTop3Towns';
import { FaVoteYea, FaCalendarDay, FaMapMarkedAlt, FaTrophy, FaMedal } from 'react-icons/fa';

export function AdminStats() {
  const { stats, isLoading, error } = useStats();
  const { top3Towns, isLoading: top3Loading, error: top3Error } = useTop3Towns();

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-12 text-center">
        <div className="inline-block w-8 h-8 border-2 border-turquoise border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-warm-grey">جاري تحميل الإحصائيات...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
          <p className="text-red-700 font-semibold">خطأ في جلب الإحصائيات</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <p className="text-warm-grey">لا توجد إحصائيات متاحة</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* إحصائيات عامة */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* إجمالي الأصوات */}
          <div className="flex items-center gap-4">
            <div className="bg-turquoise/10 p-3 rounded-xl">
              <FaVoteYea className="w-6 h-6 text-turquoise" />
            </div>
            <div>
              <h3 className="text-warm-grey text-sm font-semibold mb-1">إجمالي الأصوات</h3>
              <p className="text-4xl font-bold text-navy-blue tracking-tight">{stats.totalVotes.toLocaleString('ar-SA')}</p>
            </div>
          </div>

          {/* أصوات اليوم */}
          <div className="flex items-center gap-4 border-r border-gray-200 md:pr-6">
            <div className="bg-green-100 p-3 rounded-xl">
              <FaCalendarDay className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-warm-grey text-sm font-semibold mb-1">أصوات اليوم</h3>
              <p className="text-3xl font-bold text-navy-blue">{stats.todayVotes.toLocaleString('ar-SA')}</p>
            </div>
          </div>

          {/* عدد الأحياء */}
          <div className="flex items-center gap-4 border-r border-gray-200 md:pr-6">
            <div className="bg-blue-100 p-3 rounded-xl">
              <FaMapMarkedAlt className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-warm-grey text-sm font-semibold mb-1">عدد الأحياء</h3>
              <p className="text-3xl font-bold text-navy-blue">{stats.numberOfTowns.toLocaleString('ar-SA')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* أفضل 3 أحياء */}
      {!top3Loading && !top3Error && top3Towns.length > 0 && (
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-turquoise/10 p-2 rounded-lg">
                <FaMedal className="w-5 h-5 text-turquoise" />
              </div>
              <h2 className="text-xl font-bold text-navy-blue">أفضل 3 أحياء</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {top3Towns.map((town) => {
              const cardStyles = [
                { 
                  border: 'border-turquoise',
                  rankBg: 'bg-turquoise/10',
                  rankText: 'text-turquoise',
                  accent: 'text-turquoise'
                },
                { 
                  border: 'border-grey-blue',
                  rankBg: 'bg-grey-blue/10',
                  rankText: 'text-grey-blue',
                  accent: 'text-grey-blue'
                },
                { 
                  border: 'border-sand-brown',
                  rankBg: 'bg-sand-brown/10',
                  rankText: 'text-sand-brown',
                  accent: 'text-sand-brown'
                },
              ];
              const style = cardStyles[town.rank - 1] || cardStyles[0];
              
              return (
                <div
                  key={town.townId}
                  className={`relative bg-white rounded-xl p-6 shadow-lg border-r-4 ${style.border} transform transition-all hover:scale-105`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${style.rankBg} rounded-full w-12 h-12 flex items-center justify-center border-2 ${style.border}`}>
                      <span className={`text-xl font-bold ${style.rankText}`}>{town.rank}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy-blue mb-2">{town.name}</h3>
                    <div className="flex items-center gap-2 mt-4">
                      <FaTrophy className={`w-5 h-5 ${style.accent}`} />
                      <span className={`text-2xl font-bold ${style.accent}`}>
                        {town.votes.toLocaleString('ar-SA')}
                      </span>
                      <span className="text-sm text-warm-grey">صوت</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* الأحياء المتقدمة */}
      {stats.leadingTowns && stats.leadingTowns.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <FaTrophy className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-xl font-bold text-navy-blue">الأحياء المتقدمة</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-navy-blue w-16">#</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-navy-blue">اسم الحي</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-navy-blue">عدد الأصوات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stats.leadingTowns.map((town, index) => (
                  <tr key={town.townId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-turquoise/10">
                        <span className="text-sm font-bold text-turquoise">{index + 1}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-navy-blue">{town.name}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-turquoise/10 text-turquoise font-bold text-sm">
                        {town.votes.toLocaleString('ar-SA')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
