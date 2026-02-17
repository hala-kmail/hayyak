/**
 * Constants for NeighborhoodsGrid component
 * Following Single Responsibility Principle - only contains constant values
 */

import React from 'react';
import { FaTree, FaBuilding, FaMountain, FaCity } from 'react-icons/fa';

export const NEIGHBORHOOD_ICONS: Array<{
  icon: React.ReactNode;
  iconColor: string;
}> = [
  { icon: React.createElement(FaMountain, { className: 'w-5 h-5' }), iconColor: 'text-quite-purple' },
  { icon: React.createElement(FaTree, { className: 'w-5 h-5' }), iconColor: 'text-lime-green' },
  { icon: React.createElement(FaCity, { className: 'w-5 h-5' }), iconColor: 'text-grey-blue' },
  { icon: React.createElement(FaBuilding, { className: 'w-5 h-5' }), iconColor: 'text-sand-brown' },
];

export const SCROLL_AMOUNT = 300;
