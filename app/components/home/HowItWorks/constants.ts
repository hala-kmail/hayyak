/**
 * Constants for HowItWorks component
 * Following Single Responsibility Principle - only contains constant values
 */

import { FaEye, FaMapMarkedAlt, FaVoteYea } from 'react-icons/fa';
import React from 'react';
import type { StepItem } from './types';

export const HOW_IT_WORKS_INTRO = {
  badge: 'طريقة سهلة',
  title: 'طريقة التصويت',
  description:
    'صوّت لحيك في ثلاث خطوات بسيطة وشارك الرابط مع جيرانك ليفوز حيك بحوامة رمضان.',
} as const;

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    title: 'تصفح الأحياء',
    desc: 'استعرض قائمة الأحياء المشاركة. ',
    icon: React.createElement(FaEye, { className: 'w-5 h-5 md:w-6 md:h-6' }),
    color: 'bg-quite-purple',
  },
  {
    title: 'اختر حيك',
    desc: 'اختر الحي المفضل لديك من بين الأحياء المتقدمة.',
    icon: React.createElement(FaMapMarkedAlt, { className: 'w-5 h-5 md:w-6 md:h-6' }),
    color: 'bg-sand-brown',
  },
  {
    title: 'صوّت الآن',
    desc: 'اضغط على زر التصويت وشارك النتيجة مع أصدقائك.',
    icon: React.createElement(FaVoteYea, { className: 'w-5 h-5 md:w-6 md:h-6' }),
    color: 'bg-lime-green',
  },
];
