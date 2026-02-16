'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaCheckCircle, FaChevronLeft, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';
import type { NeighborhoodItem } from './data';
import { useFingerprint } from '@/app/hooks/useFingerprint';

interface VoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  neighborhood: NeighborhoodItem | null;
  neighborhoods: NeighborhoodItem[];
  onVoteForAnother: () => void;
}

export function VoteModal({
  isOpen,
  onClose,
  neighborhood,
  neighborhoods,
  onVoteForAnother,
}: VoteModalProps) {
  const { visitorId, isLoading: isLoadingFingerprint, error: fingerprintError } = useFingerprint();
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

  const handleVoteForThis = async () => {
    if (!neighborhood || !visitorId) {
      setVoteError('لا يمكن التصويت حالياً. يرجى المحاولة لاحقاً.');
      return;
    }

    setIsSubmitting(true);
    setVoteError(null);

    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          townId: neighborhood.id,
          fingerprint: visitorId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setVoteError('لقد قمت بالتصويت مسبقاً من هذا الجهاز.');
        } else {
          setVoteError(data.error || 'حدث خطأ أثناء التصويت. يرجى المحاولة لاحقاً.');
        }
        setIsSubmitting(false);
        return;
      }

      setVoteSuccess(true);
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        // Refresh the page to update vote counts
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error('Error submitting vote:', err);
      setVoteError('حدث خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.');
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !neighborhood) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <h2 className="text-xl font-black text-navy-blue">التصويت للحي</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-warm-grey hover:text-navy-blue transition-colors"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {voteSuccess ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-black text-navy-blue mb-2">
                  تم التصويت بنجاح!
                </h3>
                <p className="text-sm text-warm-grey">
                  شكراً لك على مشاركتك في التصويت
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Loading or Error State */}
              {isLoadingFingerprint && (
                <div className="text-center py-8">
                  <div className="inline-block w-8 h-8 border-2 border-turquoise border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-sm text-warm-grey">جاري التحضير للتصويت...</p>
                </div>
              )}

              {fingerprintError && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <FaExclamationTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-right flex-1">
                      <p className="text-sm font-bold text-red-800 mb-1">خطأ في التحضير</p>
                      <p className="text-xs text-red-600">{fingerprintError}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Selected Neighborhood Card */}
              {!isLoadingFingerprint && !fingerprintError && (
                <>
                  <div className="bg-white rounded-2xl p-4 border-2 border-turquoise/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-turquoise/10 rounded-xl flex items-center justify-center text-2xl">
                        {neighborhood.icon}
                      </div>
                      <div className="flex-1 text-right">
                        <h4 className="font-black text-navy-blue text-lg">
                          {neighborhood.name}
                        </h4>
                        <p className="text-xs text-warm-grey">{neighborhood.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Disclaimer */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <FaShieldAlt className="w-4 h-4 text-turquoise flex-shrink-0 mt-0.5" />
                      <div className="text-right flex-1">
                        <p className="text-xs text-warm-grey leading-relaxed">
                          نستخدم تقنية بصمة الجهاز لمنع التصويت المكرر. لا نجمع أي معلومات شخصية عنك.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {voteError && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <FaExclamationTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="text-right flex-1">
                          <p className="text-sm font-bold text-red-800">{voteError}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleVoteForThis}
                      disabled={isSubmitting || !visitorId}
                      className="w-full py-3 bg-turquoise text-white rounded-xl font-black text-base hover:shadow-lg hover:shadow-turquoise/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          جاري التصويت...
                        </>
                      ) : (
                        <>
                          <span>التصويت لهذا الحي</span>
                          <FaChevronLeft className="w-3 h-3" />
                        </>
                      )}
                    </button>

                    <button
                      onClick={onVoteForAnother}
                      disabled={isSubmitting}
                      className="w-full py-3 bg-white border-2 border-gray-200 text-navy-blue rounded-xl font-bold text-base hover:border-turquoise hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      التصويت لحى آخر
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
