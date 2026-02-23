'use client';

/** الشريط العمودي الملون على حافة الصفحة */
export function PageAccent() {
  return (
    <div
      className="fixed top-0 bottom-0 w-1 left-0 z-10 bg-primary-gold"
      aria-hidden
    />
  );
}
