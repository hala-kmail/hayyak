'use client';

import React from 'react';
import { footerStyles } from './styles';

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
      <p className={footerStyles.description}>{description}</p>
    </div>
  );
}

/**
 * Footer Partners Component
 * Following Single Responsibility Principle - only handles partners display
 */
interface FooterPartnersProps {
  partners: readonly { name: string; url: string }[];
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
