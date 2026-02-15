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
}

export function Logo({ iconSize = 'md', showText = true, className = '' }: LogoProps) {
  const [imgError, setImgError] = useState(false);

  const iconClass = iconSize === 'sm' ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-8 h-8';
  const textSizeClass = iconSize === 'sm' ? 'text-base sm:text-lg' : 'text-lg';

  return (
    <Link href="/" className={`flex items-center gap-1.5 sm:gap-2 shrink-0 ${className}`}>
      {!imgError ? (
        <>
          
            <Image
              src={LOGO_PATH}
              alt="سكني سابع جار"
              width={ 60}
              height={60}
              className="object-contain"
              onError={() => setImgError(true)}
            />
         
          {showText && (
            <>
              <span className={`font-bold ${textSizeClass} text-navy-blue hidden sm:inline truncate`}>
                سابع جار
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <span
            className={`${iconClass} rounded-lg flex items-center justify-center text-white text-base sm:text-lg bg-primary-turquoise`}
          >
            🏠
          </span>
          {showText && (
            <>
              <span className={`font-bold ${textSizeClass} text-primary-turquoise truncate`}>
                سكني
              </span>
              <span className={`font-bold ${textSizeClass} text-navy-blue hidden sm:inline truncate`}>
                سابع جار
              </span>
            </>
          )}
        </>
      )}
    </Link>
  );
}
