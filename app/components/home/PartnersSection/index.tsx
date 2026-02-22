'use client';

import React from 'react';
import { PARTNERS, PARTNERS_SECTION_COPY } from './constants';
import { PartnerCard } from './components';
import { partnersStyles as styles } from './styles';

/**
 * PartnersSection Component
 * Following SOLID Principles:
 * - Single Responsibility: Renders partners as branded cards
 * - Open/Closed: Partners list configurable via constants
 */
export function PartnersSection() {
  return (
    <section id="partners" dir="rtl" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>{PARTNERS_SECTION_COPY.title}</h2>
          <div className={styles.accent} />
          <p className={styles.description}>{PARTNERS_SECTION_COPY.description}</p>
        </header>

        <div className={styles.grid}>
          {PARTNERS.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}

