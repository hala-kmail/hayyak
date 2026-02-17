'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for vote modal state management
 * Following Single Responsibility Principle - only handles modal state
 */
export function useVoteModal(isOpen: boolean) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voteError, setVoteError] = useState<string | null>(null);
  const [voteSuccess, setVoteSuccess] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsSubmitting(false);
      setVoteError(null);
      setVoteSuccess(false);
    }
  }, [isOpen]);

  return {
    isSubmitting,
    voteError,
    voteSuccess,
    setIsSubmitting,
    setVoteError,
    setVoteSuccess,
  };
}
