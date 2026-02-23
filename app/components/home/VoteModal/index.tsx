'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useFingerprint } from '@/app/hooks/useFingerprint';
import { VoteModalHeader, VoteSuccess, AlreadyVotedShare, LoadingState, VoteForm } from './components';
import { modalStyles } from './styles';
import { useVoteModal } from './hooks';
import { submitVote, handleVoteSuccess } from './utils';
import { ERROR_MESSAGES, PHONE_REGEX } from './constants';
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
  const { visitorId, isLoading: isLoadingFingerprint, error: fingerprintError } =
    useFingerprint();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPhoneNumber('');
      setPhoneError(null);
    }
  }, [isOpen]);

  const {
    isSubmitting,
    voteError,
    voteSuccess,
    alreadyVoted,
    setIsSubmitting,
    setVoteError,
    setVoteSuccess,
    setAlreadyVoted,
  } = useVoteModal(isOpen);

  const handlePhoneChange = useCallback((value: string) => {
    setPhoneNumber(value);
    if (value.trim()) {
      setPhoneError(PHONE_REGEX.test(value.trim()) ? null : ERROR_MESSAGES.INVALID_PHONE);
    } else {
      setPhoneError(null);
    }
  }, []);

  const handleVoteForThis = async () => {
    if (!neighborhood || !visitorId) {
      setVoteError(ERROR_MESSAGES.NO_NEIGHBORHOOD);
      return;
    }

    const trimmedPhone = phoneNumber.trim();
    if (!trimmedPhone) {
      setVoteError(ERROR_MESSAGES.NO_PHONE);
      return;
    }
    if (!PHONE_REGEX.test(trimmedPhone)) {
      setVoteError(ERROR_MESSAGES.INVALID_PHONE);
      return;
    }

    setIsSubmitting(true);
    setVoteError(null);

    const result = await submitVote(neighborhood.id, visitorId, trimmedPhone);

    if (!result.success) {
      if (result.alreadyVoted) {
        setAlreadyVoted(true);
        setIsSubmitting(false);
        return;
      }
      setVoteError(result.error || ERROR_MESSAGES.GENERIC_ERROR);
      setIsSubmitting(false);
      return;
    }

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
            <VoteSuccess onClose={onClose} onVoteSuccess={onVoteSuccess} neighborhoodName={neighborhood.name} />
          ) : alreadyVoted ? (
            <AlreadyVotedShare onClose={onClose} neighborhoodName={neighborhood.name} />
          ) : (
            <>
              {isLoadingFingerprint && <LoadingState />}

              {!isLoadingFingerprint && !fingerprintError && (
                <VoteForm
                  neighborhood={neighborhood}
                  visitorId={visitorId}
                  phoneNumber={phoneNumber}
                  onPhoneChange={handlePhoneChange}
                  phoneError={phoneError}
                  isSubmitting={isSubmitting}
                  voteError={voteError}
                  fingerprintError={fingerprintError || null}
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
