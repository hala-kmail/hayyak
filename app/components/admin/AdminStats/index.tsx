'use client';

import React from 'react';
import { FaVoteYea, FaCalendarDay, FaMapMarkedAlt, FaTrophy } from 'react-icons/fa';
import { StatCard, Top3Card, LeadingTownsTable, VisitorStatsSection } from './components';
import { useAdminStats } from './hooks';
import { TOP3_CARD_STYLES } from './constants';
import { LoadingState, EmptyState, AlertBanner } from '../shared';
import { adminStatsStyles } from './styles';

/**
 * AdminStats Component
 * Following SOLID Principles:
 * - Single Responsibility: Orchestrates admin stats display
 * - Open/Closed: Extensible via constants without modifying logic
 * - Dependency Inversion: Depends on hooks and components abstractions
 */
export function AdminStats() {
  const {
    stats,
    top3Towns,
    isLoading,
    error,
    top3Loading,
    top3Error,
    visitorStats,
    visitorStatsLoading,
    visitorStatsError,
    visitorDays,
    setVisitorDays,
  } = useAdminStats();

  if (isLoading) {
    return <LoadingState message="جاري تحميل الإحصائيات..." />;
  }

  if (error) {
    return (
      <div className={adminStatsStyles.card}>
        <AlertBanner message={`خطأ في جلب الإحصائيات: ${error}`} variant="error" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className={adminStatsStyles.card}>
        <EmptyState message="لا توجد إحصائيات متاحة" />
      </div>
    );
  }

  return (
    <div className={adminStatsStyles.container}>
      {/* إحصائيات عامة */}
      <div className={adminStatsStyles.card}>
        <div className={adminStatsStyles.statsGrid}>
          <StatCard
            icon={<FaVoteYea className="w-5 h-5 text-gold" />}
            iconBgClass="bg-gold/10"
            label="إجمالي الأصوات"
            value={stats.totalVotes.toLocaleString('ar-SA')}
          />
          <StatCard
            icon={<FaCalendarDay className="w-5 h-5 text-green-600" />}
            iconBgClass="bg-green-100"
            label="أصوات اليوم"
            value={stats.todayVotes.toLocaleString('ar-SA')}
          />
          <StatCard
            icon={<FaMapMarkedAlt className="w-5 h-5 text-blue-600" />}
            iconBgClass="bg-blue-100"
            label="عدد الأحياء"
            value={stats.numberOfTowns.toLocaleString('ar-SA')}
          />
        </div>
      </div>

      {/* إحصائيات الزوار */}
      <VisitorStatsSection
        stats={visitorStats}
        isLoading={visitorStatsLoading}
        error={visitorStatsError}
        days={visitorDays}
        onDaysChange={setVisitorDays}
      />

      {/* أفضل 3 أحياء */}
      {!top3Loading && !top3Error && top3Towns.length > 0 && (
        <div>
          <div className={adminStatsStyles.top3Section}>
            <div className={adminStatsStyles.top3Header}>
              <div className={adminStatsStyles.top3IconWrapper}>
                <FaTrophy className="w-4 h-4 text-gold" />
              </div>
              <h2 className={adminStatsStyles.top3Title}>أفضل 3 أحياء</h2>
            </div>
          </div>
          <div className={adminStatsStyles.top3Grid}>
            {top3Towns.map((town, index) => {
              const rank = town.rank ?? index + 1;
              const style = TOP3_CARD_STYLES[rank - 1] ?? TOP3_CARD_STYLES[0];
              return (
                <Top3Card
                  key={`top3-${town.townId ?? town.id ?? rank ?? index}`}
                  town={town}
                  rank={rank}
                  style={style}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* الأحياء المتقدمة */}
      {stats.leadingTowns && stats.leadingTowns.length > 0 && (
        <div className={adminStatsStyles.cardOverflow}>
          <div className={adminStatsStyles.leadingHeader}>
            <div className={adminStatsStyles.top3Header}>
              <div className={adminStatsStyles.leadingIconWrapper}>
                <FaTrophy className="w-4 h-4 text-yellow-600" />
              </div>
              <h2 className={adminStatsStyles.top3Title}>الأحياء المتقدمة</h2>
            </div>
          </div>
          <LeadingTownsTable towns={stats.leadingTowns} />
        </div>
      )}
    </div>
  );
}
