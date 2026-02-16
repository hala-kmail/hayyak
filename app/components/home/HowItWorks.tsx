
import React from 'react';
import { FaUserCheck, FaMapMarkedAlt, FaVoteYea } from 'react-icons/fa';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: 'سجل دخولك',
      desc: 'استخدم رقم جوالك للتحقق وضمان نزاهة التصويت.',
      icon: <FaUserCheck className="w-5 h-5 md:w-6 md:h-6" />,
      color: 'bg-quite-purple',
    },
    {
      title: 'اختر الحي',
      desc: 'تصفح قائمة الأحياء المشاركة وشاهد صور الزينة.',
      icon: <FaMapMarkedAlt className="w-5 h-5 md:w-6 md:h-6" />,
      color: 'bg-sand-brown',
    },
    {
      title: 'ارسل صوتك',
      desc: 'اضغط على زر التصويت وشارك النتيجة مع أصدقائك.',
      icon: <FaVoteYea className="w-5 h-5 md:w-6 md:h-6" />,
      color: 'bg-lime-green',
    }
  ];

  return (
    <section className="pt-4 pb-8 md:pt-6 md:pb-10  relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-white/80 backdrop-blur-sm   relative z-40">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center gap-3 md:gap-4 group flex-1 md:flex-initial">
                  <div className="relative shrink-0">
                    <div className={`${step.color} w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                      {step.icon}
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-turquoise text-white flex items-center justify-center font-black text-[10px] shadow-md border-2 border-white">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="min-w-0 text-center md:text-center">
                    <h3 className="text-sm md:text-base font-bold text-navy-blue mb-0.5 group-hover:text-turquoise transition-colors">{step.title}</h3>
                    <p className="text-warm-grey text-[11px] md:text-xs leading-snug">{step.desc}</p>
                  </div>
                </div>
                {idx !== steps.length - 1 && (
                  <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
