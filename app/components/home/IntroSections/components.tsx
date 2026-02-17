'use client';

import React from 'react';
import Image from 'next/image';
import { SectionItem } from './types';
import { introStyles } from './styles';
import { getLogoSrc, isAlhabibSection } from './utils';

interface LogoProps {
  section: SectionItem;
  habeebError: boolean;
  onHabeebError: () => void;
}

/**
 * Logo Component
 * Following Single Responsibility Principle - only handles logo display
 */
export function IntroLogo({ section, habeebError, onHabeebError }: LogoProps) {
  const logoSrc = getLogoSrc(section, habeebError);
  
  if (!logoSrc) {
    return null;
  }

  const isAlhabib = isAlhabibSection(section.id);
  const imageEl = isAlhabib ? (
    <img
      src={logoSrc}
      alt={section.title}
      width={144}
      height={144}
      className={introStyles.logoImage}
      onError={onHabeebError}
    />
  ) : (
    <Image
      src={logoSrc}
      alt={section.title}
      width={144}
      height={144}
      className={introStyles.logoImageNext}
    />
  );

  if (section.linkUrl) {
    return (
      <a
        href={section.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={introStyles.logoLink}
        aria-label={`زيارة موقع ${section.title}`}
      >
        {imageEl}
      </a>
    );
  }

  return imageEl;
}

interface IntroSectionCardProps {
  section: SectionItem;
  isVisible: boolean;
  habeebError: boolean;
  onHabeebError: () => void;
}

/**
 * Intro Section Card Component
 * Following Single Responsibility Principle - only handles single section card display
 */
export function IntroSectionCard({
  section,
  isVisible,
  habeebError,
  onHabeebError,
}: IntroSectionCardProps) {
  return (
    <div
      className={introStyles.card(isVisible)}
      style={{ transitionDelay: `${section.delay}ms` }}
    >
      <div className={introStyles.cardInner}>
        <div className={introStyles.logoWrapper}>
          {section.logo ? (
            <div className={introStyles.logoContainer}>
              <IntroLogo
                section={section}
                habeebError={habeebError}
                onHabeebError={onHabeebError}
              />
            </div>
          ) : (
            <h3 className={introStyles.title(section.textColor)}>
              {section.title}
            </h3>
          )}
        </div>
        <div className={introStyles.accentLine(section.accentColor)} />
        <p className={introStyles.description}>{section.description}</p>
      </div>
    </div>
  );
}
