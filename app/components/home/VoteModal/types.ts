/**
 * Type definitions for VoteModal component
 * Following Interface Segregation Principle - separate interfaces for different concerns
 */

import type { NeighborhoodItem } from '../data';

export interface VoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  neighborhood: NeighborhoodItem | null;
  neighborhoods: NeighborhoodItem[];
  onVoteForAnother: () => void;
  onVoteSuccess?: () => void;
}

export interface VoteModalHeaderProps {
  onClose: () => void;
}

export interface VoteSuccessProps {
  onClose: () => void;
  onVoteSuccess?: () => void;
}

export interface VoteFormProps {
  neighborhood: NeighborhoodItem;
  visitorId: string | null;
  phoneNumber: string;
  onPhoneChange: (value: string) => void;
  phoneError: string | null;
  isSubmitting: boolean;
  voteError: string | null;
  fingerprintError: string | null;
  onVote: () => void;
  onVoteForAnother: () => void;
}
