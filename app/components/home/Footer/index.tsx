'use client';

import React from 'react';
import { FOOTER_CONTENT } from './constants';
import {
  FooterWaveSeparator,
  FooterBackgroundEffects,
  FooterContent,
  FooterCopyright,
} from './components';
import { footerStyles } from './styles';

/**
 * Footer Component
 * Following SOLID Principles:
 * - Single Responsibility: Only orchestrates the footer layout
 * - Open/Closed: Extensible via constants without modifying component logic
 * - Dependency Inversion: Depends on abstractions (components, constants) not concrete implementations
 */
const Footer: React.FC = () => {
  return (
    <footer
      className={footerStyles.footer}
      style={{ marginTop: '-3px' }}
    >
      <FooterWaveSeparator />
      <FooterBackgroundEffects />

      <div className={footerStyles.container}>
        <FooterContent
          title={FOOTER_CONTENT.title}
          description={FOOTER_CONTENT.description}
        />
        <FooterCopyright copyright={FOOTER_CONTENT.copyright} />
      </div>
    </footer>
  );
};

export default Footer;
