'use client';

import React from 'react';
import { NeighborhoodCardContent } from './components';
import { NeighborhoodCardProps } from './types';
import { cardStyles } from './styles';

/**
 * NeighborhoodCard Component
 * Following SOLID Principles:
 * - Single Responsibility: Only orchestrates the card wrapper logic
 * - Open/Closed: Extensible via props without modifying internal logic
 */
export function NeighborhoodCard(props: NeighborhoodCardProps) {
  const { onClick } = props;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cardStyles.wrapperButton}
      >
        <NeighborhoodCardContent {...props} />
      </button>
    );
  }

  return <NeighborhoodCardContent {...props} />;
}
