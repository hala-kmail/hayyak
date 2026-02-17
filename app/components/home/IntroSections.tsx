'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const LOGO_HABEEB = '/images/habeeb.png';
const LOGO_SAKANI = '/images/sakany.png';

type SectionItem = {
  id: string;
  title: string;
  description: string;
  textColor: string;
  accentColor: string;
  delay: number;
  logo?: string | null;
  logoFallback?: string;
  linkUrl?: string;
};

export function IntroSections() {
  const [isVisible, setIsVisible] = useState(false);
  const [habeebError, setHabeebError] = useState(false);
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

  const sections: SectionItem[] = [
    {
      id: 'sakani',
      title: 'سكني',
      description: `منصة 'سكني' الإلكترونية، إحدى مبادرات وزارة البلديات والإسكان السعودية، تقدم حلولاً شاملة لتملك المسكن الأول؛ من وحدات جاهزة وتحت الإنشاء، إلى الأراضي المجانية والبناء الذاتي. استفد من خدمات التحقق الفوري من الاستحقاق، الحجز الإلكتروني، الحاسبة التمويلية، وتوقيع العقود رقمياً.`,
      textColor: 'text-turquoise',
      accentColor: 'bg-turquoise',
      logo: LOGO_SAKANI,
      delay: 0,
    },
    {
      id: 'alhabib',
      title: 'الحبيب',
      description: `شريكك الموثوق في التطوير العقاري منذ 1972، نجمع بين تاريخ عريق وخبرة تمتد لأكثر من 50 مشروعًا و350 خبيرًا، لنحول طموحاتك إلى واقع بقيم الثقة والجودة والابتكار.`,
      textColor: 'text-sand-brown',
      accentColor: 'bg-sand-brown',
      logo: LOGO_HABEEB,
      logoFallback: LOGO_HABEEB,
      delay: 100,
      linkUrl: 'https://www.alhabibinv.com/',
    },
    {
      id: 'seventh-neighbor',
      title: 'خدمة سابع جار',
      description: `خدمة 'سابع جار' هي حل رقمي مبتكر متاح عبر منصة سكني (تطبيق أو موقع)، يهدف إلى تعزيز إدارة الأصول والمرافق السكنية بشراكات تقنية نوعية. استمتع بتجربة متكاملة ترفع كفاءة الخدمات العقارية، ويمكنك الوصول إليها بسهولة عبر التطبيق أو الاتصال بالرقم الموحد 199090.`,
      textColor: 'text-quite-purple',
      accentColor: 'bg-quite-purple',
      logo: null,
      delay: 200,
    },
  ];

  const renderLogo = (section: SectionItem) => {
    if (!section.logo) return null;

    const isAlhabib = section.id === 'alhabib';
    const logoSrc = isAlhabib && habeebError && section.logoFallback ? section.logoFallback : section.logo;

    const imageEl = isAlhabib ? (
      <img
        src={logoSrc}
        alt={section.title}
        width={96}
        height={96}
        className="object-contain w-20  md:w-28 "
        onError={() => setHabeebError(true)}
      />
    ) : (
      <Image
        src={section.logo}
        alt={section.title}
        width={96}
        height={32}
        className="object-contain w-20  md:w-24 "
      />
    );

    if (section.linkUrl) {
      return (
        <a
          href={section.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block hover:opacity-90 hover:scale-105 transition-all duration-300"
          aria-label={`زيارة موقع ${section.title}`}
        >
          {imageEl}
        </a>
      );
    }
    return imageEl;
  };

  return (
    <section ref={sectionRef} className="py-14 md:py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-turquoise/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-quite-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`group relative ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-500 ease-out`}
              style={{ transitionDelay: `${section.delay}ms` }}
            >
              <div className="h-full flex flex-col items-center text-center p-6 md:p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                {/* عند وجود لوجو: نعرض اللوجو فقط. عند عدمه: نعرض العنوان فقط */}
                <div className="flex flex-row items-center justify-center gap-3 mb-4 shrink-0">
                  {section.logo ? (
                    <div className="flex items-center justify-center shrink-0">
                      {renderLogo(section)}
                    </div>
                  ) : (
                    <h3 className={`text-xl md:text-2xl font-black ${section.textColor}`}>
                      {section.title}
                    </h3>
                  )}
                </div>
                <div className={`w-12 h-1 rounded-full ${section.accentColor} mb-4 opacity-80 shrink-0`} />
                <p className="text-warm-grey text-sm leading-relaxed max-w-sm flex-1 min-h-0">
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
