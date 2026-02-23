'use client';

import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { NeighborhoodCardProps } from './types';
import { cardStyles } from './styles';
import { getVotes } from './utils';

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
  const progress = Number(neighborhood.percentage) || 0;

  return (
    <div className={cardStyles.card(!!onClick, isLeader)}>
      <div className={cardStyles.votesContainer}>
        <div className={cardStyles.votesWrapper}>
          <span className={cardStyles.votesValue}>{votes}</span>
          <span className={cardStyles.votesLabel}>صوتاً</span>
        </div>
      </div>

      <div className={cardStyles.contentContainer}>
        <h3 className={cardStyles.title(isLeader)}>{neighborhood.name}</h3>
        <p className={cardStyles.location}>
          <span className={cardStyles.locationDot} />
          {neighborhood.location}
        </p>
      </div>

      <div className={cardStyles.footer}>
        <div className={cardStyles.progressContainer}>
          <div className={cardStyles.progressHeader}>
            <span className={cardStyles.progressLabel}>نسبة التقدم</span>
            <span className={cardStyles.progressValue(isLeader)}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className={cardStyles.progressBar} dir="ltr">
            <div
              className={cardStyles.progressFill(isLeader)}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {onClick && (
          <span className={cardStyles.ctaButton(isLeader)}>
            <FaChevronLeft className={cardStyles.ctaIcon} />
            اضغط للتصويت
          </span>
        )}
      </div>
    </div>
  );
}
