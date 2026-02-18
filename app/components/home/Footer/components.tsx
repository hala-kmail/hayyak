'use client';

import React from 'react';
import { footerStyles } from './styles';

/**
 * Footer Wave Separator Component
 * Following Single Responsibility Principle - only handles wave SVG
 */
export function FooterWaveSeparator() {
  return (
    <div
      className={footerStyles.waveContainer}
      style={{ top: '0px', height: '99px', lineHeight: 0 }}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className={footerStyles.waveSvg}
        style={{ display: 'block', verticalAlign: 'top' }}
      >
        <path
          d="M0,100 L720,0 L1440,100 L1440,0 L720,0 L0,0 Z"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
}

/**
 * Footer Background Effects Component
 * Following Single Responsibility Principle - only handles background effects
 */
export function FooterBackgroundEffects() {
  return (
    <div className={footerStyles.backgroundEffects}>
      <div className={footerStyles.backgroundBlur1} />
      <div className={footerStyles.backgroundBlur2} />
    </div>
  );
}

/**
 * Footer Content Component
 * Following Single Responsibility Principle - only handles content display
 */
interface FooterContentProps {
  title: string;
  description: string;
}

export function FooterContent({ title, description }: FooterContentProps) {
  return (
    <div className={footerStyles.contentSection}>
      <h3 className={footerStyles.title}>{title}</h3>
      <div className={footerStyles.divider} />
      <p className={footerStyles.description}>{description}</p>
    </div>
  );
}

/**
 * Footer Partners Component
 * Following Single Responsibility Principle - only handles partners display
 */
interface FooterPartnersProps {
  partners: Array<{ name: string; url: string }>;
}

export function FooterPartners({ partners }: FooterPartnersProps) {
  return (
    <div className={footerStyles.partnersSection}>
      <h4 className={footerStyles.partnersTitle}>شركاء النجاح</h4>
      <div className={footerStyles.partnersList}>
        {partners.map((partner, index) => (
          <a
            key={index}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className={footerStyles.partnerLink}
          >
            {partner.name}
          </a>
        ))}
      </div>
    </div>
  );
}

/**
 * Footer Copyright Component
 * Following Single Responsibility Principle - only handles copyright display
 */
interface FooterCopyrightProps {
  copyright: string;
}

export function FooterCopyright({ copyright }: FooterCopyrightProps) {
  return (
    <div className={footerStyles.copyrightSection}>
      <p className={footerStyles.copyright}>{copyright}</p>
    </div>
  );
}
