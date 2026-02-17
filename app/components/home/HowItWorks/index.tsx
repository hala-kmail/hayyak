'use client';

import React from 'react';
import { HOW_IT_WORKS_STEPS } from './constants';
import { StepCard, StepDivider } from './components';
import { howItWorksStyles } from './styles';
import { useIntersectionObserver } from './hooks';

/**
 * HowItWorks Component
 * Following SOLID Principles:
 * - Single Responsibility: Only orchestrates the how it works section layout
 * - Open/Closed: Extensible via constants without modifying component logic
 * - Dependency Inversion: Depends on abstractions (hooks, utils) not concrete implementations
 */
const HowItWorks: React.FC = () => {
  const { isVisible, sectionRef } = useIntersectionObserver(0.1);

  return (
    <section ref={sectionRef} className={howItWorksStyles.section}>
      <div className={howItWorksStyles.container}>
        <div className={howItWorksStyles.contentWrapper}>
          <div className={howItWorksStyles.stepsContainer}>
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <React.Fragment key={idx}>
                <StepCard step={step} index={idx} isVisible={isVisible} />
                {idx !== HOW_IT_WORKS_STEPS.length - 1 && (
                  <StepDivider isVisible={isVisible} delay={idx * 150 + 100} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
