'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { prizeStyles } from './styles';
import { useIntersectionObserver } from './hooks';
import { PRIZE_IMAGES } from './constants';

/**
 * PrizeSection Component
 * Following SOLID Principles:
 * - Single Responsibility: Only orchestrates the prize section layout
 * - Open/Closed: Extensible via constants without modifying component logic
 */
export function PrizeSection() {
  const { isVisible, sectionRef } = useIntersectionObserver(0.1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = useCallback(() => {
    setCurrentIndex((i) => (i === 0 ? PRIZE_IMAGES.length - 1 : i - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((i) => (i === PRIZE_IMAGES.length - 1 ? 0 : i + 1));
  }, []);

  return (
    <section
      id="prize"
      ref={sectionRef}
      className={prizeStyles.section}
    >
      <div className={prizeStyles.backgroundOverlay}>
        <div className={prizeStyles.backgroundBlur1} />
        <div className={prizeStyles.backgroundBlur2} />
      </div>

      <div className={prizeStyles.container}>
        <div className={prizeStyles.contentWrapper}>
          <h2 className={prizeStyles.title}>الجائزة</h2>
          <div className={prizeStyles.accentLine} />
          <p className={prizeStyles.description}>
            إذا فاز حيك ستحصل على حوامة كاملة
          </p>
          <div
            className={prizeStyles.carouselWrapper}
            dir="ltr"
          >
            
            
            <div className={prizeStyles.carouselTrack}>
              <div
                className={prizeStyles.slidesContainer}
                style={{
                  width: `${PRIZE_IMAGES.length * 100}%`,
                  transform: `translateX(-${currentIndex * (100 / PRIZE_IMAGES.length)}%)`,
                }}
              >
                {PRIZE_IMAGES.map((img) => (
                  <div
                    key={img.src}
                    className={prizeStyles.slide}
                    style={{ width: `${100 / PRIZE_IMAGES.length}%` }}
                  >
                    <div className={prizeStyles.imageWrapper(isVisible)}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={800}
                        height={448}
                        className={prizeStyles.image}
                        sizes="(max-width: 768px) 100vw, 672px"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={goToNext}
              className={`${prizeStyles.navButton} ${prizeStyles.navButtonPrev}`}
              aria-label="الصورة التالية"
            >
              <span className="text-xl" aria-hidden>‹</span>
            </button>
            <button
              type="button"
              onClick={goToPrev}
              className={`${prizeStyles.navButton} ${prizeStyles.navButtonNext}`}
              aria-label="الصورة السابقة"
            >
              <span className="text-xl" aria-hidden>›</span>
            </button>
          </div>

          <div className={prizeStyles.dots}>
            {PRIZE_IMAGES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={prizeStyles.dot(idx === currentIndex)}
                aria-label={`انتقل إلى الصورة ${idx + 1}`}
                aria-current={idx === currentIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
