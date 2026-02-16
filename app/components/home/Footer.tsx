'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-blue text-white py-12 md:py-16 relative overflow-hidden">
      {/* موجة مثلثية علوية - متجهة للأعلى */}
      <div className="absolute top-0 left-0 w-full leading-[0] z-10" style={{ marginTop: 0, paddingTop: 0 }}>
        <svg
          viewBox="0 0 1440 100"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
          style={{ display: 'block', verticalAlign: 'bottom' }}
        >
          {/* الخلفية - الأزرق الداكن (navy blue) */}
          <path
            fill="rgb(28, 39, 95)"
            d="M0,100 L720,0 L1440,100 L1440,100 L0,100 Z"
          />
          {/* الموجة البيضاء - مثلث يبدأ من القمة (Y=0 في الوسط) */}
          <path
            fill="#FFFFFF"
            d="M0,100 L720,0 L1440,100 L1440,0 L720,0 L0,0 Z"
          />
        </svg>
      </div>

      {/* تأثيرات خلفية خفيفة */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-10 right-10 w-64 h-64 bg-turquoise rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-lime-green rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl font-black mb-3 text-white">
            صوت الحياة
          </h3>
          <div className="w-16 h-1 bg-turquoise mx-auto rounded-full mb-6" />
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            مبادرة تهدف لتعزيز روح الترابط الاجتماعي في أحيائنا عبر المنافسة
            الإيجابية في احتفالية الحوامة التقليدية.
          </p>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm font-medium">
            جميع الحقوق محفوظة © 2026 - صوت الحياة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
