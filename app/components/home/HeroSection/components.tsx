'use client';

import React from 'react';
import { FaChevronLeft, FaStar, FaHome, FaHeart } from 'react-icons/fa';
import { AnimatedCounter } from '@/base/components/ui/AnimatedCounter';
import { heroStyles } from './styles';
import { HeroContentProps, HeroStatItemProps } from './types';

/**
 * Hero Badge Component
 * Following Single Responsibility Principle - only handles badge display
 */
export function HeroBadge() {
  return (
    <div className={heroStyles.badge}>
      <span className={heroStyles.badgeIndicator}>
        <span className={heroStyles.badgePing} />
        <span className={heroStyles.badgeDot} />
      </span>
      التصويت مفتوح الآن
    </div>
  );
}

/**
 * Hero CTA Button Component
 * Following Single Responsibility Principle - only handles CTA button
 */
export function HeroCTA() {
  return (
    <div className={heroStyles.ctaWrapper}>
      <a href="#districts" className={heroStyles.ctaButton}>
        ابدأ التصويت الآن
        <FaChevronLeft className={heroStyles.ctaIcon} />
      </a>
    </div>
  );
}

/**
 * Hero Visual Badge Component
 * Following Single Responsibility Principle - only handles visual badge display
 */
export function HeroVisualBadge() {
  return (
    <div className={heroStyles.visualWrapper}>
      <div className={heroStyles.visualContainer}>
        <div className={heroStyles.visualBackdrop} />
        <div className={heroStyles.visualCard}>
          <div className={heroStyles.visualIcon}>
            <FaHome />
          </div>
          <div className={heroStyles.visualStars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <span className={heroStyles.visualText}>حيّنا الأفضل</span>
        </div>
        <div className={heroStyles.visualHeart}>
          <FaHeart />
        </div>
        <div className={heroStyles.visualSparkle}>✨</div>
      </div>
    </div>
  );
}

/**
 * Hero Stat Item Component
 * Following Single Responsibility Principle - only handles single stat display
 */
export function HeroStatItem({ value, label }: HeroStatItemProps) {
  return (
    <div className={heroStyles.statItem}>
      <div className={heroStyles.statValue}>
        <AnimatedCounter value={value} duration={2000} />
      </div>
      <div className={heroStyles.statLabel}>{label}</div>
    </div>
  );
}

/**
 * Hero Stats Component
 * Following Single Responsibility Principle - only handles stats display
 */
export function HeroStats({ stats }: HeroContentProps) {
  return (
    <div className={heroStyles.statsWrapper}>
      <div className={heroStyles.statsContainer}>
        <HeroStatItem value={stats.neighborhoodsCount} label="أحياء متقدمة" />
        <div className={heroStyles.statDivider} />
        <HeroStatItem value={stats.votesToday} label="صوت اليوم" />
        <div className={heroStyles.statDivider} />
        <HeroStatItem value={stats.totalVotes} label="إجمالي الأصوات" />
      </div>
    </div>
  );
}

/**
 * Hero Content Component
 * Following Single Responsibility Principle - only handles content layout
 */
export function HeroContent({ stats }: HeroContentProps) {
  return (
    <>
      <div className={heroStyles.mainContent}>
        <div className={heroStyles.textContent}>
          <HeroBadge />
          <h1 className={heroStyles.title}>
            صوّت لحيّك <br />
            <span className={heroStyles.titleAccent}>
              خلّه يفوز بحوّامة رمضان
            </span>
          </h1>
          <p className={heroStyles.description}>
            اختر حيك المفضل وكن سبب فوزه باحتفالية الحوامة التقليدية في آخر
            أيام رمضان المبارك 2026
          </p>
          <HeroCTA />
        </div>
        <div className={heroStyles.visualContent}>
          <HeroVisualBadge /><HeroStats stats={stats} />
        </div>
      </div>
      
    </>
  );
}

/**
 * Hero Wave Separator Component
 * Following Single Responsibility Principle - only handles wave SVG
 */
export function HeroWaveSeparator() {
  return (
    <div className={heroStyles.waveContainer}>
      <svg
        viewBox="0 0 1440 100"
        xmlns="http://www.w3.org/2000/svg"
        className={heroStyles.waveSvg}
        preserveAspectRatio="none"
      >
        <path fill="#ffffff" d="M0,0 L720,80 L1440,0 L1440,100 L0,100 Z" />
        <path
          fill="#00a89d"
          d="M0,0 L720,80 L1440,0 L1440,20 L720,100 L0,20 Z"
        />
      </svg>
    </div>
  );
}
