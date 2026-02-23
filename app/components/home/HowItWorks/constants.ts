/**
 * Constants for HowItWorks component
 * Following Single Responsibility Principle - only contains constant values
 */

import { FaEye, FaMapMarkedAlt, FaVoteYea } from 'react-icons/fa';
import React from 'react';
import type { StepItem } from './types';

export const HOW_IT_WORKS_INTRO = {
  badge: '',
  title: 'كيف تفوز بحوامة رمضان؟',
  description:
    'ثلاث خطوات فقط: تصفّح، اختر، صوّت — ثم شارك الرابط مع جيرانك وادعموا حيّكم حتى الفوز.',
} as const;

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    title: 'تصفّح الأحياء',
    desc: 'استعرض الأحياء المشاركة واختر الحي الذي تريد أن يفوز بحوامة رمضان.',
    icon: React.createElement(FaEye, { className: 'w-5 h-5 md:w-6 md:h-6' }),
    color: 'bg-quite-purple',
  },
  {
    title: 'اختر حيّك',
    desc: 'حدّد الحي المفضل لديك — صوتك يرفع ترتيبه ويدفع به نحو الفوز.',
    icon: React.createElement(FaMapMarkedAlt, { className: 'w-5 h-5 md:w-6 md:h-6' }),
    color: 'bg-sand-brown',
  },
  {
    title: 'صوّت وشارك',
    desc: 'اضغط تصويت، وشارك الرابط مع الجيران — كل صوت يحسب ويفيد حيّكم.',
    icon: React.createElement(FaVoteYea, { className: 'w-5 h-5 md:w-6 md:h-6' }),
    color: 'bg-lime-green',
  },
];

