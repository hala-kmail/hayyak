/**
 * Utility functions for VoteModal component
 * Following Single Responsibility Principle - only contains business logic
 */

import { ERROR_MESSAGES } from './constants';
import { API_BASE } from '@/lib/api';
import { isMockDataEnabled } from '@/lib/mockData';

export interface VoteResponse {
  success: boolean;
  error?: string;
  alreadyVoted?: boolean;
}

// Timeout constant (10 seconds)
const VOTE_TIMEOUT = 10000;

/**
 * Submits a vote to the API with timeout handling
 * Payload: { townId, fingerprint, phoneNumber }
 */
export async function submitVote(
  townId: string,
  fingerprint: string,
  phoneNumber: string
): Promise<VoteResponse> {
  try {
    if (isMockDataEnabled()) {
      return { success: true };
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), VOTE_TIMEOUT);

    try {
      const response = await fetch(`${API_BASE}/votes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          townId,
          fingerprint,
          phoneNumber,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          return {
            success: false,
            error: ERROR_MESSAGES.ALREADY_VOTED,
            alreadyVoted: true,
          };
        }
        return {
          success: false,
          error: data.error || ERROR_MESSAGES.GENERIC_ERROR,
        };
      }

      return { success: true };
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        return {
          success: false,
          error: 'انتهت مهلة الطلب. يرجى المحاولة مرة أخرى.',
        };
      }
      throw fetchError;
    }
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
 * يُحدّث البيانات فوراً لكن يبقي الـ modal مفتوحاً ليتمكن المستخدم من مشاركة النتيجة
 */
export function handleVoteSuccess(
  onClose: () => void,
  onVoteSuccess?: () => void
): void {
  if (onVoteSuccess) {
    onVoteSuccess();
  }
}
