'use client';

import React, { useState } from 'react';
import { INTRO_SECTIONS_DATA, INTRO_SECTIONS_HEADER } from './constants';
import { IntroSectionCard } from './components';
import { introStyles } from './styles';
import { useIntersectionObserver } from './hooks';

/**
 * IntroSections Component
 * Following SOLID Principles:
 * - Single Responsibility: Only orchestrates the intro sections layout
 * - Open/Closed: Extensible via constants without modifying component logic
 * - Dependency Inversion: Depends on abstractions (hooks, utils) not concrete implementations
 */
export function IntroSections() {
  const [habeebError, setHabeebError] = useState(false);
  const { isVisible, sectionRef } = useIntersectionObserver(0.1);

  const handleHabeebError = () => {
    setHabeebError(true);
  };

  return (
    <section ref={sectionRef} className={introStyles.section}>
      <div className={introStyles.backgroundOverlay}>
        <div className={introStyles.backgroundBlur1} />
        <div className={introStyles.backgroundBlur2} />
      </div>

      <div className={introStyles.container}>
        <div className={introStyles.headerWrapper}>
          <h2 className={introStyles.headerTitle}>{INTRO_SECTIONS_HEADER.title}</h2>
          <div className={introStyles.headerAccentLine} />
          <p className={introStyles.headerDescription}>
            {INTRO_SECTIONS_HEADER.description}
          </p>
        </div>
        <div className={introStyles.grid}>
          {INTRO_SECTIONS_DATA.map((section, idx) => (
            <React.Fragment key={section.id}>
              <IntroSectionCard
                section={section}
                isVisible={isVisible}
                habeebError={habeebError}
                onHabeebError={handleHabeebError}
              />
              {idx !== INTRO_SECTIONS_DATA.length - 1 && (
                <div
                  className={introStyles.divider(isVisible)}
                  style={{ transitionDelay: `${idx * 150 + 100}ms` }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
