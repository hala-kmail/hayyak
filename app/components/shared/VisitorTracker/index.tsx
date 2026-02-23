'use client';

import { useEffect } from 'react';

/**
 * VisitorTracker Component
 * 
 * مكون تتبع الزوار الذي يرسل طلب POST عند تحميل الصفحة لأول مرة
 * - يستخدم sessionStorage لمنع التكرار عند إعادة تحميل الصفحة
 * - يرسل payload: { "path": "/vote" }
 * - لا يعرض أي شيء (return null)
 */
export function VisitorTracker() {
  useEffect(() => {
    // التحقق من وجود المفتاح في sessionStorage لمنع التكرار
    // Safari private mode throws QuotaExceededError on sessionStorage access - wrap in try/catch
    try {
      const hasVotedSession = sessionStorage.getItem('has_voted_session');
      if (hasVotedSession) {
        return;
      }
    } catch {
      return; // Safari private mode - storage unavailable
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      console.warn('NEXT_PUBLIC_API_URL is not defined');
      return;
    }

    const sendVisitorRequest = async () => {
      try {
        const response = await fetch(`${apiUrl}/visitors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: '/vote',
          }),
        });

        if (response.ok) {
          try {
            sessionStorage.setItem('has_voted_session', 'true');
          } catch {
            // Safari private mode - ignore
          }
        } else {
          console.error('Failed to track visitor:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    sendVisitorRequest();
  }, []);

  // المكون لا يعرض أي شيء
  return null;
}
