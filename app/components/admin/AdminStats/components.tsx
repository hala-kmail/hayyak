'use client';

import React from 'react';
import { FaTrophy, FaUsers, FaGlobe, FaVoteYea } from 'react-icons/fa';
import type { StatCardProps, Top3CardProps, LeadingTown } from './types';
import type { AdminVisitorStatsData } from '@/app/lib/adminVisitorStats';
import { LoadingState, AlertBanner } from '../shared';
import { adminStatsStyles } from './styles';

const VISITOR_DAYS_OPTIONS = [
  { value: 1, label: 'يوم واحد' },
  { value: 7, label: '7 أيام' },
  { value: 14, label: '14 يوم' },
  { value: 30, label: '30 يوم' },
  { value: 90, label: '90 يوم' },
];

/**
 * VisitorStatsSection Component
 * Displays admin visitor statistics with days selector
 */
export function VisitorStatsSection({
  stats,
  isLoading,
  error,
  days,
  onDaysChange,
}: {
  stats: AdminVisitorStatsData | null;
  isLoading: boolean;
  error: string | null;
  days: number;
  onDaysChange: (days: number) => void;
}) {
  if (isLoading) {
    return (
      <div className={adminStatsStyles.visitorSection}>
        <div className={adminStatsStyles.visitorHeader}>
          <div className={adminStatsStyles.top3Header}>
            <div className="bg-grey-blue/10 p-1.5 rounded-lg">
              <FaUsers className="w-4 h-4 text-grey-blue" />
            </div>
            <h2 className={adminStatsStyles.top3Title}>إحصائيات الزوار</h2>
          </div>
        </div>
        <div className="p-4">
          <LoadingState message="جاري تحميل إحصائيات الزوار..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={adminStatsStyles.visitorSection}>
        <div className={adminStatsStyles.visitorHeader}>
          <div className={adminStatsStyles.top3Header}>
            <div className="bg-grey-blue/10 p-1.5 rounded-lg">
              <FaUsers className="w-4 h-4 text-grey-blue" />
            </div>
            <h2 className={adminStatsStyles.top3Title}>إحصائيات الزوار</h2>
          </div>
        </div>
        <div className="p-4">
          <AlertBanner message={error} variant="error" />
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className={adminStatsStyles.visitorSection}>
      <div className={adminStatsStyles.visitorHeader}>
        <div className={adminStatsStyles.top3Header}>
          <div className="bg-grey-blue/10 p-2 rounded-lg">
            <FaUsers className="w-5 h-5 text-grey-blue" />
          </div>
          <h2 className={adminStatsStyles.top3Title}>إحصائيات الزوار</h2>
        </div>
        <select
          value={days}
          onChange={(e) => onDaysChange(Number(e.target.value))}
          className={adminStatsStyles.visitorDaysSelect}
        >
          {VISITOR_DAYS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              آخر {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className={adminStatsStyles.visitorStatsGrid}>
        <StatCard
          icon={<FaUsers className="w-5 h-5 text-grey-blue" />}
          iconBgClass="bg-grey-blue/10"
          label="الزوار الفريدون"
          value={(stats.uniqueVisitors ?? 0).toLocaleString('ar-SA')}
        />
        <StatCard
          icon={<FaVoteYea className="w-5 h-5 text-lime-green" />}
          iconBgClass="bg-lime-green/10"
          label="إجمالي الأصوات"
          value={(stats.totalVotes ?? 0).toLocaleString('ar-SA')}
        />
        <StatCard
          icon={<FaVoteYea className="w-5 h-5 text-grey-blue" />}
          iconBgClass="bg-grey-blue/10"
          label="نسبة المصوتين من الزوار"
          value={`${(stats.visitorsToVotersPercentage ?? 0).toFixed(1)}%`}
        />
        <StatCard
          icon={<FaGlobe className="w-5 h-5 text-grey-blue" />}
          iconBgClass="bg-grey-blue/10"
          label="الدول"
          value={(stats.visitorsByCountry?.length ?? 0).toLocaleString('ar-SA')}
        />
      </div>

      {/* من صوت ومن لم يصوت */}
      <div className={adminStatsStyles.visitorVotersSection}>
        <h3 className={adminStatsStyles.visitorVotersTitle}>
          <FaUsers className="w-3 h-3 text-grey-blue" />
          توزيع الزوار: من صوت ومن لم يصوت
        </h3>
        <div className={adminStatsStyles.visitorVotersGrid}>
          <div className={adminStatsStyles.visitorVoterCard(true)}>
            <p className={adminStatsStyles.visitorVoterLabel}>من صوت</p>
            <p className={adminStatsStyles.visitorVoterValue(true)}>
              {((stats.uniqueVisitors ?? 0) - (stats.nonVotingVisitors ?? 0)).toLocaleString('ar-SA')}
            </p>
            <p className={adminStatsStyles.visitorVoterPercent(true)}>
              {(100 - (stats.nonVotingVisitorsPercentage ?? 0)).toFixed(1)}%
            </p>
          </div>
          <div className={adminStatsStyles.visitorVoterCard(false)}>
            <p className={adminStatsStyles.visitorVoterLabel}>من لم يصوت</p>
            <p className={adminStatsStyles.visitorVoterValue(false)}>
              {(stats.nonVotingVisitors ?? 0).toLocaleString('ar-SA')}
            </p>
            <p className={adminStatsStyles.visitorVoterPercent(false)}>
              {(stats.nonVotingVisitorsPercentage ?? 0).toFixed(1)}%
            </p>
          </div>
        </div>
        <div className={adminStatsStyles.visitorProgressBar}>
          <div
            className={adminStatsStyles.visitorProgressVoters}
            style={{
              width: `${100 - (stats.nonVotingVisitorsPercentage ?? 0)}%`,
            }}
          />
          <div
            className={adminStatsStyles.visitorProgressNonVoters}
            style={{
              width: `${stats.nonVotingVisitorsPercentage ?? 0}%`,
            }}
          />
        </div>
      </div>

      {stats.visitorsByDay && stats.visitorsByDay.length > 0 && (
        <div className={adminStatsStyles.visitorTableSection}>
          <h3 className={adminStatsStyles.visitorTableTitle}>الزوار الفريدون حسب اليوم (آخر {days} يوم)</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className={adminStatsStyles.visitorByDayTable}>
              <thead className="bg-gray-bg">
                <tr>
                  <th className="px-3 py-2 text-right text-xs font-bold text-navy-blue">التاريخ</th>
                  <th className="px-3 py-2 text-right text-xs font-bold text-navy-blue">الزوار الفريدون</th>
                </tr>
              </thead>
              <tbody>
                {stats.visitorsByDay.map((row) => (
                  <tr key={row.date} className={adminStatsStyles.visitorByDayRow}>
                    <td className={adminStatsStyles.visitorByDayCellBold}>
                      {row.date.split('T')[0]}
                    </td>
                    <td className={adminStatsStyles.visitorByDayCell}>
                      {(row.uniqueVisitors ?? row.visits ?? 0).toLocaleString('ar-SA')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {stats.visitorsByCountry && stats.visitorsByCountry.length > 0 && (
        <div className={adminStatsStyles.visitorTableSection}>
          <h3 className={adminStatsStyles.visitorTableTitle}>الزوار الفريدون حسب الدولة</h3>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className={adminStatsStyles.visitorByDayTable}>
              <thead className="bg-gray-bg">
                <tr>
                  <th className="px-3 py-2 text-right text-xs font-bold text-navy-blue">الدولة</th>
                  <th className="px-3 py-2 text-right text-xs font-bold text-navy-blue">الزوار الفريدون</th>
                </tr>
              </thead>
              <tbody>
                {stats.visitorsByCountry.map((row) => (
                  <tr key={row.countryCode} className={adminStatsStyles.visitorByDayRow}>
                    <td className={adminStatsStyles.visitorByDayCellBold}>{row.countryCode}</td>
                    <td className={adminStatsStyles.visitorByDayCell}>
                      {(row.uniqueVisitors ?? row.visits ?? 0).toLocaleString('ar-SA')}
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

/**
 * StatCard Component
 * Following Single Responsibility Principle - only displays a single stat
 */
export function StatCard({ icon, iconBgClass, label, value }: StatCardProps) {
  return (
    <div className={adminStatsStyles.statRow}>
      <div className={adminStatsStyles.statIcon(iconBgClass)}>{icon}</div>
      <div>
        <h3 className={adminStatsStyles.statLabel}>{label}</h3>
        <p className={adminStatsStyles.statValue}>{value}</p>
      </div>
    </div>
  );
}

/**
 * Top3Card Component
 * Following Single Responsibility Principle - only displays a top 3 town card
 */
export function Top3Card({ town, rank, style }: Top3CardProps) {
  const percentage = town.percentage ?? 0;

  return (
    <div className={adminStatsStyles.top3Card(style.border)}>
      <div className="flex items-center justify-between mb-2">
        <div className={adminStatsStyles.top3RankWrapper(style.rankBg, style.border)}>
          <span className={adminStatsStyles.top3RankText(style.rankText)}>{rank}</span>
        </div>
      </div>
      <div>
        <h3 className={adminStatsStyles.top3TownName}>{town.name}</h3>
        <div className={adminStatsStyles.top3VotesRow}>
          <FaTrophy className={`w-4 h-4 ${style.accent}`} />
          <span className={adminStatsStyles.top3VotesText(style.accent)}>
            {town.votes.toLocaleString('ar-SA')}
          </span>
          <span className={adminStatsStyles.top3VotesLabel}>صوت</span>
        </div>
        <div className={adminStatsStyles.top3ProgressSection}>
          <div className={adminStatsStyles.top3ProgressHeader}>
            <span className={adminStatsStyles.top3ProgressLabel}>نسبة التقدم</span>
            <span className={adminStatsStyles.top3ProgressValue(style.accent)}>
              {Math.round(percentage)}%
            </span>
          </div>
          <div className={adminStatsStyles.top3ProgressBar}>
            <div
              className={adminStatsStyles.top3ProgressFill(style.progressBar)}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * LeadingTownsTable Component
 * Following Single Responsibility Principle - only displays leading towns table
 */
export function LeadingTownsTable({ towns }: { towns: LeadingTown[] }) {
  return (
    <div className={adminStatsStyles.tableWrapper}>
      <table className={adminStatsStyles.table}>
        <thead className={adminStatsStyles.tableHead}>
          <tr>
            <th className={adminStatsStyles.tableThW16}>#</th>
            <th className={adminStatsStyles.tableTh}>اسم الحي</th>
            <th className={adminStatsStyles.tableTh}>عدد الأصوات</th>
          </tr>
        </thead>
        <tbody className={adminStatsStyles.tableBody}>
          {towns.map((town, index) => (
            <tr key={town.townId} className={adminStatsStyles.tableRow}>
              <td className={adminStatsStyles.tableCellCenter}>
                <div className={adminStatsStyles.rankBadge}>
                  <span className={adminStatsStyles.rankBadgeText}>{index + 1}</span>
                </div>
              </td>
              <td className={adminStatsStyles.tableCellSemibold}>{town.name}</td>
              <td className={adminStatsStyles.tableCellCenter}>
                <span className={adminStatsStyles.votesBadge}>
                  {town.votes.toLocaleString('ar-SA')}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
