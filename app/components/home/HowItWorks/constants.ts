/**
 * Constants for HowItWorks component
 * Following Single Responsibility Principle - only contains constant values
 */

import { FaEye, FaMapMarkedAlt, FaVoteYea, FaShareAlt } from 'react-icons/fa';
import React from 'react';
import type { StepItem } from './types';

export const HOW_IT_WORKS_INTRO = {
  badge: '',
  title: 'كيف تفوز بحوامة رمضان؟',
  description:
    'أربع خطوات بسيطة: تصفّح الأحياء، اختر حيّك، صوّت، ثم شارك مع أصدقائك — صوتهم يهمنا ويدفع حيّكم للأمام.',
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
    title: 'صوّت',
    desc: 'اضغط تصويت — كل صوت يحسب ويفيد حيّكم ويرفع فرصته بالفوز.',
    icon: React.createElement(FaVoteYea, { className: 'w-5 h-5 md:w-6 md:h-6' }),
    color: 'bg-lime-green',
  },
  {
    title: 'شارك مع أصدقائك',
    desc: 'شارك الرابط مع أصدقائك وجيرانك — صوتهم يهمنا ويدفع حيّكم خطوة للأمام.',
    icon: React.createElement(FaShareAlt, { className: 'w-5 h-5 md:w-6 md:h-6' }),
    color: 'bg-primary-grey',
  },
];

