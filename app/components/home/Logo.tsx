'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const LOGO_PATH = '/images/sakani.png';

interface LogoProps {
  /** عرض الأيقونة بالبكسل (عند استخدام fallback) */
  iconSize?: 'sm' | 'md';
  /** إظهار النص "سكني سابع جار" بجانب اللوجو */
  showText?: boolean;
  className?: string;
  /** لون النص - للاستخدام في النافبار */
  textColor?: 'navy' | 'white';
}

export function Logo({ iconSize = 'md', showText = true, className = '', textColor }: LogoProps) {
  const [imgError, setImgError] = useState(false);

  const iconClass = iconSize === 'sm' ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-10 h-10 sm:w-12 sm:h-12';
  const textSizeClass = iconSize === 'sm' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl';
  
  // تحديد لون النص بناءً على textColor أو القيمة الافتراضية
  const textColorClass = textColor === 'white' 
    ? 'text-white' 
    : textColor === 'navy'
    ? 'text-navy-blue'
    : 'text-navy-blue';

  return (
    <Link href="/" className={`flex items-center gap-2 sm:gap-3 shrink-0 group ${className}`}>
      {!imgError ? (
        <>
          <div className="relative">
            <div className="absolute inset-0 bg-gold/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Image
              src={LOGO_PATH}
              alt="سكني سابع جار"
              width={iconSize === 'sm' ? 48 : 64}
              height={iconSize === 'sm' ? 48 : 64}
              className="object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
              priority
            />
          </div>
          {showText && (
            <span className={`font-black ${textSizeClass} ${textColorClass} hidden sm:inline truncate tracking-tight transition-colors duration-300`}>
              سابع جار
            </span>
          )}
        </>
      ) : (
        <>
          <span
            className={`${iconClass} rounded-xl flex items-center justify-center text-white text-base sm:text-lg bg-gradient-to-br from-gold to-navy-blue shadow-md`}
          >
            🏠
          </span>
          {showText && (
            <>
              <span className={`font-bold ${textSizeClass} text-gold truncate`}>
                سكني
              </span>
              <span className={`font-bold ${textSizeClass} ${textColorClass} hidden sm:inline truncate`}>
                سابع جار
              </span>
            </>
          )}
        </>
      )}
    </Link>
  );
}
