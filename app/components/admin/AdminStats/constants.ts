/**
 * AdminStats constants
 * Following Single Responsibility Principle - only contains constant values
 */

import type { Top3CardStyle } from './types';

export const TOP3_CARD_STYLES: Top3CardStyle[] = [
  {
    border: 'border-gold',
    rankBg: 'bg-gold/10',
    rankText: 'text-gold',
    accent: 'text-gold',
    progressBar: 'bg-gold',
  },
  {
    border: 'border-grey-blue',
    rankBg: 'bg-grey-blue/10',
    rankText: 'text-grey-blue',
    accent: 'text-grey-blue',
    progressBar: 'bg-grey-blue',
  },
  {
    border: 'border-sand-brown',
    rankBg: 'bg-sand-brown/10',
    rankText: 'text-sand-brown',
    accent: 'text-sand-brown',
    progressBar: 'bg-sand-brown',
  },
];
