'use client';

import React from 'react';
import type { AlertBannerProps, AlertVariant } from './types';
import { sharedStyles } from './styles';

const VARIANT_STYLES: Record<AlertVariant, { container: string; text: string }> = {
  error: { container: sharedStyles.alertError, text: sharedStyles.alertTextError },
  success: { container: sharedStyles.alertSuccess, text: sharedStyles.alertTextSuccess },
  info: { container: sharedStyles.alertInfo, text: sharedStyles.alertTextInfo },
};

/**
 * AlertBanner Component
 * Following Single Responsibility Principle - only handles alert message display
 */
export function AlertBanner({ message, variant = 'error' }: AlertBannerProps) {
  const { container, text } = VARIANT_STYLES[variant];

  return (
    <div className={container}>
      <p className={text}>{message}</p>
    </div>
  );
}
