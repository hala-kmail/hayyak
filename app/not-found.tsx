import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" dir="rtl">
      <h1 className="text-2xl font-bold text-gray-800">404</h1>
      <p className="text-gray-600 mt-2">الصفحة غير موجودة</p>
      <Link href="/" className="mt-4 text-teal-600 hover:underline">
        العودة للرئيسية
      </Link>
    </div>
  );
}
