'use client';

import React from 'react';
import { useFingerprint } from '@/app/hooks/useFingerprint';
import { VoteModalHeader, VoteSuccess, LoadingState, VoteForm } from './components';
import { modalStyles } from './styles';
import { useVoteModal } from './hooks';
import { submitVote, handleVoteSuccess } from './utils';
import { ERROR_MESSAGES } from './constants';
import type { VoteModalProps } from './types';

/**
 * VoteModal Component
 * Following SOLID Principles:
 * - Single Responsibility: Only orchestrates the vote modal layout
 * - Open/Closed: Extensible via props without modifying internal logic
 * - Dependency Inversion: Depends on abstractions (hooks, utils, components) not concrete implementations
 */
export function VoteModal({
  isOpen,
  onClose,
  neighborhood,
  neighborhoods,
  onVoteForAnother,
  onVoteSuccess,
}: VoteModalProps) {
  const { visitorId, isLoading: isLoadingFingerprint, error: fingerprintError, hasVoted, markAsVoted } =
    useFingerprint();
  const {
    isSubmitting,
    voteError,
    voteSuccess,
    setIsSubmitting,
    setVoteError,
    setVoteSuccess,
  } = useVoteModal(isOpen);

  const handleVoteForThis = async () => {
    if (!neighborhood || !visitorId) {
      setVoteError(ERROR_MESSAGES.NO_NEIGHBORHOOD);
      return;
    }

    // التحقق من التصويت المكرر على مستوى الواجهة
    if (hasVoted) {
      setVoteError('لقد قمت بالتصويت مسبقاً.');
      return;
    }

    setIsSubmitting(true);
    setVoteError(null);

    const result = await submitVote(neighborhood.id, visitorId);

    if (!result.success) {
      // إذا كان الخطأ بسبب التصويت المكرر، نحدد الحالة محلياً أيضاً
      if (result.error?.includes('مسبقاً') || result.error?.includes('already')) {
        markAsVoted();
      }
      setVoteError(result.error || ERROR_MESSAGES.GENERIC_ERROR);
      setIsSubmitting(false);
      return;
    }

    // تحديد أن المستخدم قد صوت بعد نجاح التصويت
    markAsVoted();
    setVoteSuccess(true);
    handleVoteSuccess(onClose, onVoteSuccess);
  };

  if (!isOpen || !neighborhood) {
    return null;
  }

  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.backdrop} onClick={onClose} />

      <div className={modalStyles.modal}>
        <VoteModalHeader onClose={onClose} />

        <div className={modalStyles.content}>
          {voteSuccess ? (
            <VoteSuccess onClose={onClose} onVoteSuccess={onVoteSuccess} />
          ) : (
            <>
              {isLoadingFingerprint && <LoadingState />}

              {!isLoadingFingerprint && !fingerprintError && (
                <VoteForm
                  neighborhood={neighborhood}
                  visitorId={visitorId}
                  isSubmitting={isSubmitting}
                  voteError={voteError}
                  fingerprintError={fingerprintError || null}
                  hasVoted={hasVoted}
                  onVote={handleVoteForThis}
                  onVoteForAnother={onVoteForAnother}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
