'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaHome, FaHeart, FaHandsHelping } from 'react-icons/fa';

export function IntroSections() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const sections = [
    {
      id: 'sakani',
      title: 'سكني',
      description: 'منصة سكني تهدف إلى تطوير وتحسين الأحياء السكنية من خلال مشاركة المجتمع في اتخاذ القرارات التي تهم حياتهم اليومية.',
      color: 'bg-turquoise',
      delay: 0,
    },
    {
      id: 'alhabib',
      title: 'الحبيب',
      description: 'حي الحبيب هو أحد الأحياء المميزة في المدينة، يتميز بموقع استراتيجي وخدمات متكاملة.',
      color: 'bg-sand-brown',
      delay: 150,
    },
    {
      id: 'seventh-neighbor',
      title: 'خدمة سابع جار',
      description: 'خدمة سابع جار هي مبادرة مجتمعية تهدف إلى تعزيز التواصل والترابط بين الجيران.',
      color: 'bg-quite-purple',
      delay: 300,
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Intro Cards with Triangle on Edge */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`group relative transition-all duration-700 ease-out ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${section.delay}ms`,
              }}
            >
              {/* Regular Card with Triangle on Edge */}
              <div className="relative bg-white rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Colored Triangle on Top-Left Edge */}
                <div className="absolute top-0 left-0 w-0 h-0">
                  {/* Outer colored triangle */}
                  <div
                    className={`absolute top-0 left-0 ${section.color}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                    }}
                  />
                  {/* Inner grey triangle */}
                  <div
                    className="absolute top-0 left-0 bg-warm-grey opacity-90"
                    style={{
                      width: '70px',
                      height: '70px',
                      clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                    }}
                  />
                </div>
                
                {/* Card Content */}
                <div className="relative z-10 p-6 md:p-8 pt-12 md:pt-14">
                  <h3 className={`text-2xl md:text-3xl font-black ${section.color.replace('bg-', 'text-')} mb-4`}>
                    {section.title}
                  </h3>
                  <p className="text-warm-grey text-sm md:text-base leading-relaxed text-right">
                    {section.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
