'use client';

import React from 'react';
import { FaChevronLeft, FaStar, FaHome, FaHeart, FaMagic, FaTrophy, FaVoteYea } from 'react-icons/fa';
import { heroStyles } from './styles';
import { HeroContentProps, HeroLeadingNeighborhoodProps } from './types';

interface HeroBadgeProps {
  isOpen: boolean;
}

interface HeroCTAProps {
  isOpen: boolean;
}

/**
 * Hero Badge Component
 * Following Single Responsibility Principle - only handles badge display
 */
export const HeroBadge = React.memo(function HeroBadge({ isOpen }: HeroBadgeProps) {
  if (!isOpen) {
    return (
      <div className={heroStyles.badge}>
        قريباً: التصويت يبدأ مع رمضان
      </div>
    );
  }

  return (
    <div className={heroStyles.badge}>
      <span className={heroStyles.badgeIndicator}>
        <span className={heroStyles.badgePing} />
        <span className={heroStyles.badgeDot} />
      </span>
      الفرصة بين يديك — صوّت الآن واربح حيك الحوامة
    </div>
  );
});

/**
 * Hero CTA Button Component
 * Following Single Responsibility Principle - only handles CTA button
 */
export const HeroCTA = React.memo(function HeroCTA({ isOpen }: HeroCTAProps) {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={heroStyles.ctaWrapper}>
      <a href="#districts" className={heroStyles.ctaButton}>
        صوّت الآن
        <FaChevronLeft className={heroStyles.ctaIcon} />
      </a>
    </div>
  );
});

/**
 * Hero Visual Badge Component
 * Following Single Responsibility Principle - only handles visual badge display
 */
export const HeroVisualBadge = React.memo(function HeroVisualBadge() {
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
          <span className={heroStyles.visualText}>حيّك يستحق الفوز</span>
        </div>
        <div className={heroStyles.visualHeart}>
          <FaHeart />
        </div>
        <div className={heroStyles.visualSparkle} aria-hidden>
          <FaMagic />
        </div>
      </div>
    </div>
  );
});

/**
 * Hero Leading Neighborhood Component
 * بطاقة تفاعلية متحركة تعرض الحي المتصدر بتصميم عصري
 */
export const HeroLeadingNeighborhood = React.memo(function HeroLeadingNeighborhood({
  neighborhood,
}: HeroLeadingNeighborhoodProps) {
  const votes = neighborhood.votes ?? 0;
  const percentage = Math.min(Number(neighborhood.percentage) ?? 0, 100);

  return (
    <div className={heroStyles.leadingCard}>
      {/* Floating trophy */}
      <div className={heroStyles.leadingCardTrophy}>
        <FaTrophy className={heroStyles.leadingCardTrophyIcon} aria-hidden />
        <div className={heroStyles.leadingCardTrophyRing} aria-hidden />
      </div>

      <div className={heroStyles.leadingCardOuter}>
        <div className={heroStyles.leadingCardShimmer} aria-hidden>
          <div className={heroStyles.leadingCardShimmerBar} />
        </div>

        <div className={heroStyles.leadingCardInner}>
          <div className={heroStyles.leadingCardGlow} aria-hidden />

          <div className={heroStyles.leadingCardContent}>
            <span className={heroStyles.leadingCardBadgeText}>الحي المتصدر</span>

            <div className={heroStyles.leadingCardDivider} aria-hidden />

            <h2 className={heroStyles.leadingCardName}>{neighborhood.name}</h2>

            <div className={heroStyles.leadingCardStats}>
              <div className={heroStyles.leadingCardVotesBlock}>
                <span className={heroStyles.leadingCardVotesNumber}>
                  {votes.toLocaleString('ar-SA')}
                </span>
                <span className={heroStyles.leadingCardVotesLabel}>صوت حتى الآن</span>
              </div>
              <div className={heroStyles.leadingCardPercentBlock}>
                <span className={heroStyles.leadingCardPercentNumber}>
                  {Math.round(percentage)}
                  <span className={heroStyles.leadingCardPercentSign}>%</span>
                </span>
                <span className={heroStyles.leadingCardPercentLabel}>من الأصوات</span>
              </div>
            </div>

            <a href="#districts" className={heroStyles.leadingCardCta}>
              <FaVoteYea className={heroStyles.leadingCardCtaIcon} aria-hidden />
              صوّت لحيّك الآن
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * Hero Content Component
 * Following Single Responsibility Principle - only handles content layout
 */
export const HeroContent = React.memo(function HeroContent({
  leadingNeighborhood,
  isElectionOpen,
}: HeroContentProps) {
  return (
    <>
      <div className={heroStyles.mainContent}>
        <div className={heroStyles.textContent}>
          <HeroBadge isOpen={isElectionOpen} />
          <h1 className={heroStyles.title}>
            صوتك يحدد الفائز 
            <br />
            <span className={heroStyles.titleAccent}>
              صوّت لحيّك واربحوا حوّامة رمضان معاً
            </span>
          </h1>
          <p className={heroStyles.description}>
            تصويتك يفرق — اختر حيك، شارك الرابط مع جيرانك، وكونوا سبب فوز حيّكم
            باحتفالية الحوامة في آخر أيام رمضان ٢٠٢٦
          </p>
          <HeroCTA isOpen={isElectionOpen} />
        </div>
        <div className={heroStyles.visualContent}>
          {isElectionOpen && leadingNeighborhood && (
            <HeroLeadingNeighborhood neighborhood={leadingNeighborhood} />
          )}
          {isElectionOpen && !leadingNeighborhood && <HeroVisualBadge />}
        </div>
      </div>
    </>
  );
});

/**
 * Hero Wave Separator Component
 * Following Single Responsibility Principle - only handles wave SVG
 */
export const HeroWaveSeparator = React.memo(function HeroWaveSeparator() {
  return (
    <div className={heroStyles.waveContainer}>
      <svg
        viewBox="0 0 1440 100"
        xmlns="http://www.w3.org/2000/svg"
        className={heroStyles.waveSvg}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1C275F" />
            <stop offset="100%" stopColor="#CEB888" />
          </linearGradient>
          <linearGradient id="waveGradientGoldNavy" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#CEB888" />
            <stop offset="100%" stopColor="#0c3144" />
          </linearGradient>
        </defs>
        <path fill="#fffff5" d="M0,0 L720,80 L1440,0 L1440,100 L0,100 Z" />
        <path
          fill="url(#waveGradientGoldNavy)"
          d="M0,0 L720,80 L1440,0 L1440,0 L720,100 L0,0 Z"
        />
      </svg>
    </div>
  );
});
