/**
 * ElectionPage type definitions
 */

import type { UpdateElectionConfigData } from '@/app/hooks/useElectionConfig';

export interface ElectionStatusDisplay {
  isOpen: boolean;
  mode: 'manual' | 'scheduled';
  startAt?: string | null;
  endAt?: string | null;
  timezone?: string;
}

export type { UpdateElectionConfigData };
