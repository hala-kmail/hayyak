/**
 * Utility functions for VoteModal component
 * Following Single Responsibility Principle - only contains business logic
 */

import { ERROR_MESSAGES, SUCCESS_AUTO_CLOSE_DELAY } from './constants';

export interface VoteResponse {
  success: boolean;
  error?: string;
}

/**
 * Submits a vote to the API
 */
export async function submitVote(
  townId: string,
  fingerprint: string
): Promise<VoteResponse> {
  try {
    const response = await fetch('/api/votes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        townId,
        fingerprint,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 409) {
        return {
          success: false,
          error: ERROR_MESSAGES.ALREADY_VOTED,
        };
      }
      return {
        success: false,
        error: data.error || ERROR_MESSAGES.GENERIC_ERROR,
      };
    }

    return { success: true };
  } catch (err) {
    console.error('Error submitting vote:', err);
    return {
      success: false,
      error: ERROR_MESSAGES.NETWORK_ERROR,
    };
  }
}

/**
 * Handles vote success callback
 */
export function handleVoteSuccess(
  onClose: () => void,
  onVoteSuccess?: () => void
): void {
  setTimeout(() => {
    onClose();
    if (onVoteSuccess) {
      onVoteSuccess();
    } else {
      window.location.reload();
    }
  }, SUCCESS_AUTO_CLOSE_DELAY);
}
