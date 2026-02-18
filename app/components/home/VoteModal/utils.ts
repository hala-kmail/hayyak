/**
 * Utility functions for VoteModal component
 * Following Single Responsibility Principle - only contains business logic
 */

import { ERROR_MESSAGES, SUCCESS_AUTO_CLOSE_DELAY } from './constants';
import { API_BASE } from '@/lib/api';

export interface VoteResponse {
  success: boolean;
  error?: string;
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
 * يغلق الـ modal ويستدعي callback التحديث بشكل متوازي لتحسين الأداء
 */
export function handleVoteSuccess(
  onClose: () => void,
  onVoteSuccess?: () => void
): void {
  setTimeout(() => {
    onClose();
    // استدعاء callback التحديث بشكل غير متزامن لعدم تأخير إغلاق الـ modal
    if (onVoteSuccess) {
      // استخدام setTimeout(0) لضمان عدم تأخير إغلاق الـ modal
      setTimeout(() => {
        onVoteSuccess();
      }, 0);
    } else {
      window.location.reload();
    }
  }, SUCCESS_AUTO_CLOSE_DELAY);
}
