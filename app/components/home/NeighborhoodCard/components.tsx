'use client';

import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { NeighborhoodCardProps } from './types';
import { cardStyles } from './styles';
import { calculateProgress, getVotes } from './utils';

/**
 * Neighborhood Card Content Component
 * Following Single Responsibility Principle - only handles card content display
 */
export function NeighborhoodCardContent({
  neighborhood,
  totalVotes,
  onClick,
  isLeader = false,
}: NeighborhoodCardProps) {
  const votes = getVotes(neighborhood);
  // استخدام النسبة المحسوبة مسبقاً من usePublicTowns بدلاً من إعادة الحساب
  // هذا يضمن أن النسبة المئوية تتطابق مع عرض النص
  const progress = neighborhood.percentage ?? calculateProgress(neighborhood, totalVotes);

  return (
    <div className={cardStyles.card(!!onClick, isLeader)}>
      <div className={cardStyles.votesContainer}>
        <div className={cardStyles.votesWrapper}>
          <span className={cardStyles.votesValue}>{votes}</span>
          <span className={cardStyles.votesLabel}>صوتاً</span>
        </div>
      </div>

      <div className={cardStyles.contentContainer}>
        <h3 className={cardStyles.title}>{neighborhood.name}</h3>
        <p className={cardStyles.location}>
          <span className={cardStyles.locationDot} />
          {neighborhood.location}
        </p>
      </div>

      <div className={cardStyles.footer}>
        <div className={cardStyles.progressContainer}>
          <div className={cardStyles.progressHeader}>
            <span className={cardStyles.progressLabel}>نسبة التقدم</span>
            <span className={cardStyles.progressValue}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className={cardStyles.progressBar}>
            <div
              className={cardStyles.progressFill}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {onClick && (
          <span className={cardStyles.ctaButton}>
            <FaChevronLeft className={cardStyles.ctaIcon} />
            اضغط للتصويت
          </span>
        )}
      </div>
    </div>
  );
}
