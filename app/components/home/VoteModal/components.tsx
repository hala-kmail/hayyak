'use client';

import React from 'react';
import {
  FaTimes,
  FaCheckCircle,
  FaChevronLeft,
  FaExclamationTriangle,
} from 'react-icons/fa';
import {
  VoteModalHeaderProps,
  VoteSuccessProps,
  VoteFormProps,
} from './types';
import { modalStyles } from './styles';


/**
 * Vote Modal Header Component
 * Following Single Responsibility Principle - only handles header display
 */
export function VoteModalHeader({ onClose }: VoteModalHeaderProps) {
  return (
    <div className={modalStyles.header}>
      <h2 className={modalStyles.headerTitle}>صوّت لحيّك</h2>
      <button onClick={onClose} className={modalStyles.closeButton}>
        <FaTimes className={modalStyles.closeIcon} />
      </button>
    </div>
  );
}

/**
 * Vote Success Component
 * Following Single Responsibility Principle - only handles success display
 */
export function VoteSuccess({ onClose, onVoteSuccess }: VoteSuccessProps) {
  return (
    <div className={modalStyles.successContainer}>
      <div className="text-center">
        <div className={modalStyles.successIconContainer}>
          <FaCheckCircle className={modalStyles.successIcon} />
        </div>
        <h3 className={modalStyles.successTitle}>تم التصويت بنجاح!</h3>
        <p className={modalStyles.successMessage}>
          شكراً! صوتك يدفع حيّك خطوة نحو الفوز — شارك الرابط مع جيرانك
        </p>
      </div>
    </div>
  );
}

/**
 * Loading State Component
 * Following Single Responsibility Principle - only handles loading display
 */
export function LoadingState() {
  return (
    <div className={modalStyles.loadingContainer}>
      <div className={modalStyles.loadingSpinner} />
      <p className={modalStyles.loadingText}>جاري التحضير للتصويت...</p>
    </div>
  );
}

/**
 * Error Alert Component
 * Following Single Responsibility Principle - only handles error display
 */
interface ErrorAlertProps {
  title: string;
  message: string;
}

export function ErrorAlert({ title, message }: ErrorAlertProps) {
  return (
    <div className={modalStyles.errorContainer}>
      <div className={modalStyles.errorContent}>
        <FaExclamationTriangle className={modalStyles.errorIcon} />
        <div className={modalStyles.errorTextContainer}>
          <p className={modalStyles.errorTitle}>{title}</p>
          {message && <p className={modalStyles.errorMessage}>{message}</p>}
        </div>
      </div>
    </div>
  );
}

/**
 * Neighborhood Card Component
 * Following Single Responsibility Principle - only handles neighborhood display
 */
interface NeighborhoodCardProps {
  neighborhood: {
    name: string;
    location: string;
    icon: string;
  };
}

export function NeighborhoodCard({ neighborhood }: NeighborhoodCardProps) {
  return (
    <div className={modalStyles.neighborhoodCard}>
      <div className={modalStyles.neighborhoodCardContent}>
        <div className={modalStyles.neighborhoodIcon}>{neighborhood.icon}</div>
        <div className={modalStyles.neighborhoodInfo}>
          <h4 className={modalStyles.neighborhoodName}>{neighborhood.name}</h4>
          <p className={modalStyles.neighborhoodLocation}>
            {neighborhood.location}
          </p>
        </div>
      </div>
    </div>
  );
}



/**
 * Vote Form Component
 * Following Single Responsibility Principle - only handles vote form display
 */
export function VoteForm({
  neighborhood,
  visitorId,
  phoneNumber,
  onPhoneChange,
  phoneError,
  isSubmitting,
  voteError,
  fingerprintError,
  onVote,
  onVoteForAnother,
}: VoteFormProps) {
  const canSubmit = visitorId && phoneNumber.trim() && !phoneError;

  return (
    <div className="space-y-6">
      {fingerprintError && (
        <ErrorAlert title="خطأ في التحضير" message={fingerprintError} />
      )}

      <NeighborhoodCard neighborhood={neighborhood} />

      <div>
        <label htmlFor="vote-phone" className="block text-sm font-bold text-navy-blue mb-2">
          رقم الهاتف
        </label>
        <input
          id="vote-phone"
          type="tel"
          dir="ltr"
          value={phoneNumber}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="+966501234567"
          disabled={isSubmitting}
          className={`${modalStyles.phoneInput} ${phoneError ? modalStyles.phoneInputError : ''}`}
        />
        {phoneError && (
          <p className="text-red-600 text-xs mt-1">{phoneError}</p>
        )}
      </div>

      {voteError && <ErrorAlert title={voteError} message="" />}

      <div className={modalStyles.buttonsContainer}>
        <button
          onClick={onVote}
          disabled={isSubmitting || !canSubmit}
          className={modalStyles.voteButton}
        >
          {isSubmitting ? (
            <>
              <span className={modalStyles.voteButtonSpinner} />
              جاري التصويت...
            </>
          ) : (
            <>
              <span>صوّت الآن لهذا الحي</span>
              <FaChevronLeft className={modalStyles.voteButtonIcon} />
            </>
          )}
        </button>

        <button
          onClick={onVoteForAnother}
          disabled={isSubmitting}
          className={modalStyles.cancelButton}
        >
          صوّت لحي آخر
        </button>
      </div>
    </div>
  );
}
