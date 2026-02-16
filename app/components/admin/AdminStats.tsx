'use client';

import React from 'react';
import { useStats, StatsData } from '@/app/hooks/useStats';
import { FaVoteYea, FaCalendarDay, FaMapMarkedAlt, FaTrophy } from 'react-icons/fa';

export function AdminStats() {
  const { stats, isLoading, error } = useStats();

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* إجمالي الأصوات */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-r-4 border-turquoise">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-turquoise/10 p-3 rounded-xl">
              <FaVoteYea className="w-6 h-6 text-turquoise" />
            </div>
          </div>
          <h3 className="text-warm-grey text-sm font-semibold mb-2">إجمالي الأصوات</h3>
          <p className="text-3xl font-black text-navy-blue">{stats.totalVotes.toLocaleString('ar-SA')}</p>
        </div>

        {/* أصوات اليوم */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-r-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <FaCalendarDay className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-warm-grey text-sm font-semibold mb-2">أصوات اليوم</h3>
          <p className="text-3xl font-black text-navy-blue">{stats.todayVotes.toLocaleString('ar-SA')}</p>
        </div>

        {/* عدد الأحياء */}
        <div className="bg-white rounded-2xl shadow-md p-6 border-r-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <FaMapMarkedAlt className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-warm-grey text-sm font-semibold mb-2">عدد الأحياء</h3>
          <p className="text-3xl font-black text-navy-blue">{stats.numberOfTowns.toLocaleString('ar-SA')}</p>
        </div>
      </div>

      {/* الأحياء المتقدمة */}
      {stats.leadingTowns && stats.leadingTowns.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <FaTrophy className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-xl font-black text-navy-blue">الأحياء المتقدمة</h2>
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
