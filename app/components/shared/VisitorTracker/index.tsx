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
    const hasVotedSession = sessionStorage.getItem('has_voted_session');
    
    if (hasVotedSession) {
      // إذا كان المفتاح موجوداً، لا نرسل الطلب
      return;
    }

    // الحصول على رابط الـ API من متغيرات البيئة
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    
    if (!apiUrl) {
      console.warn('NEXT_PUBLIC_API_URL is not defined');
      return;
    }

    // إرسال طلب POST إلى endpoint الزوار
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

        // التحقق من نجاح الطلب
        if (response.ok) {
          // تخزين المفتاح في sessionStorage بعد نجاح الطلب
          sessionStorage.setItem('has_voted_session', 'true');
        } else {
          // في حالة فشل الطلب، لا نخزن المفتاح حتى يتم إعادة المحاولة
          console.error('Failed to track visitor:', response.status, response.statusText);
        }
      } catch (error) {
        // في حالة حدوث خطأ، لا نخزن المفتاح حتى يتم إعادة المحاولة
        console.error('Error tracking visitor:', error);
      }
    };

    sendVisitorRequest();
  }, []); // يعمل مرة واحدة فقط عند تحميل المكون

  // المكون لا يعرض أي شيء
  return null;
}
