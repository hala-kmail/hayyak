'use client';

import React from 'react';
import { StepCardProps, StepDividerProps } from './types';
import { howItWorksStyles } from './styles';

/**
 * Step Card Component
 * Following Single Responsibility Principle - only handles single step display
 */
export function StepCard({ step, index, isVisible }: StepCardProps) {
  const cardDelay = index * 150;
  const iconDelay = index * 200;
  const numberDelay = index * 200 + 300;

  return (
    <div
      className={howItWorksStyles.stepCard(isVisible)}
      style={{ transitionDelay: `${cardDelay}ms` }}
    >
      <div className={howItWorksStyles.iconWrapper}>
        <div
          className={howItWorksStyles.iconContainer(step.color, isVisible)}
          style={{ animationDelay: `${iconDelay}ms` }}
        >
          {step.icon}
        </div>
        <span
          className={howItWorksStyles.stepNumber(isVisible)}
          style={{ transitionDelay: `${numberDelay}ms` }}
        >
          {index + 1}
        </span>
      </div>
      <div className={howItWorksStyles.textWrapper}>
        <h3 className={howItWorksStyles.stepTitle}>{step.title}</h3>
        <p className={howItWorksStyles.stepDescription}>{step.desc}</p>
      </div>
    </div>
  );
}

/**
 * Step Divider Component
 * Following Single Responsibility Principle - only handles divider display
 */
export function StepDivider({ isVisible, delay }: StepDividerProps) {
  return (
    <div
      className={howItWorksStyles.divider(isVisible)}
      style={{ transitionDelay: `${delay}ms` }}
    />
  );
}
