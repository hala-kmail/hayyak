'use client';

import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import type { StatCardProps, Top3CardProps, LeadingTown } from './types';
import { LoadingState, EmptyState, AlertBanner } from '../shared';
import { adminStatsStyles } from './styles';

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
      <div className="flex items-center justify-between mb-4">
        <div className={adminStatsStyles.top3RankWrapper(style.rankBg, style.border)}>
          <span className={adminStatsStyles.top3RankText(style.rankText)}>{rank}</span>
        </div>
      </div>
      <div>
        <h3 className={adminStatsStyles.top3TownName}>{town.name}</h3>
        <div className={adminStatsStyles.top3VotesRow}>
          <FaTrophy className={`w-5 h-5 ${style.accent}`} />
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
