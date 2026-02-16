'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaEye, FaMapMarkedAlt, FaVoteYea } from 'react-icons/fa';

const HowItWorks: React.FC = () => {
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

  const steps = [
    {
      title: 'تصفح الأحياء',
      desc: 'استعرض قائمة الأحياء المشاركة. ',
      icon: <FaEye className="w-5 h-5 md:w-6 md:h-6" />,
      color: 'bg-quite-purple',
    },
    {
      title: 'اختر حيك',
      desc: 'اختر الحي المفضل لديك من بين الأحياء المتقدمة.',
      icon: <FaMapMarkedAlt className="w-5 h-5 md:w-6 md:h-6" />,
      color: 'bg-sand-brown',
    },
    {
      title: 'صوّت الآن',
      desc: 'اضغط على زر التصويت وشارك النتيجة مع أصدقائك.',
      icon: <FaVoteYea className="w-5 h-5 md:w-6 md:h-6" />,
      color: 'bg-lime-green',
    }
  ];

  return (
    <section ref={sectionRef} className="pt-4 pb-8 md:pt-6 md:pb-10 relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-white/80 backdrop-blur-sm relative z-40">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={`flex flex-col items-center gap-3 md:gap-4 group flex-1 md:flex-initial transition-all duration-700 ease-out ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${idx * 150}ms`,
                  }}
                >
                  <div className="relative shrink-0">
                    <div
                      className={`${step.color} w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${
                        isVisible ? 'animate-pulse-slow' : ''
                      }`}
                      style={{
                        animationDelay: `${idx * 200}ms`,
                      }}
                    >
                      {step.icon}
                    </div>
                    <span
                      className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-turquoise text-white flex items-center justify-center font-black text-[10px] shadow-md border-2 border-white transition-all duration-500 ${
                        isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                      }`}
                      style={{
                        transitionDelay: `${idx * 200 + 300}ms`,
                      }}
                    >
                      {idx + 1}
                    </span>
                  </div>
                  <div className="min-w-0 text-center md:text-center">
                    <h3 className="text-sm md:text-base font-bold text-navy-blue mb-0.5 group-hover:text-turquoise transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-warm-grey text-[11px] md:text-xs leading-snug">
                      {step.desc}
                    </p>
                  </div>
                </div>
                {idx !== steps.length - 1 && (
                  <div
                    className={`hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent transition-all duration-700 ${
                      isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                    }`}
                    style={{
                      transitionDelay: `${idx * 150 + 100}ms`,
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
