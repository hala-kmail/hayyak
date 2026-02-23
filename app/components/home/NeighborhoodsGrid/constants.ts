/**
 * Constants for NeighborhoodsGrid component
 * Following Single Responsibility Principle - only contains constant values
 */

import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

// أيقونة موحدة لجميع الأحياء - تشير إلى موقع/حي
export const UNIFIED_NEIGHBORHOOD_ICON: {
  icon: React.ReactNode;
  iconColor: string;
} = {
  icon: React.createElement(FaMapMarkerAlt, { className: 'w-5 h-5' }),
  iconColor: 'text-gold',
};

// الاحتفاظ بـ NEIGHBORHOOD_ICONS للتوافق مع الكود القديم (سيتم استخدام الأيقونة الموحدة)
export const NEIGHBORHOOD_ICONS: Array<{
  icon: React.ReactNode;
  iconColor: string;
}> = [UNIFIED_NEIGHBORHOOD_ICON];

export const SCROLL_AMOUNT = 300;
