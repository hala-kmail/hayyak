'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  FaLightbulb,
  FaChartLine,
  FaVoteYea,
  FaChevronLeft,
  FaStar,
  FaHome,
  FaHeart,
} from 'react-icons/fa';
import { formatNumber } from '@/base/utils';
import { useStats } from '@/app/hooks/useStats';

interface HeroSectionProps {
  totalVotes?: number;
  neighborhoodsCount?: number;
  votesToday?: number;
}

// مكون العداد المتحرك
function AnimatedCounter({ 
  value, 
  duration = 2000,
  className = '' 
}: { 
  value: number; 
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const previousValueRef = useRef<number>(value);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter(0, value);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [hasAnimated, value]);

  // تحديث القيمة عند تغييرها
  useEffect(() => {
    if (value !== previousValueRef.current) {
      if (hasAnimated) {
        // إذا كانت الرسوم المتحركة قد بدأت، قم بتشغيل رسوم متحركة من القيمة الحالية إلى القيمة الجديدة
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animateCounter(count, value);
      } else {
        // إذا لم تبدأ بعد، قم بتحديث القيمة مباشرة
        setCount(value);
      }
      previousValueRef.current = value;
    }
  }, [value]);

  const animateCounter = (startValue: number, endValue: number) => {
    const startTime = Date.now();

    const updateCounter = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // استخدام easing function للحصول على حركة سلسة
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

      setCount(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(updateCounter);
      } else {
        setCount(endValue);
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(updateCounter);
  };

  return (
    <div ref={counterRef} className={className}>
      {formatNumber(count)}
    </div>
  );
}

export function HeroSection({
  totalVotes: propTotalVotes,
  neighborhoodsCount: propNeighborhoodsCount,
  votesToday: propVotesToday,
}: HeroSectionProps) {
  const { stats, isLoading: statsLoading } = useStats();
  
  // استخدام البيانات من API إذا كانت متوفرة، وإلا استخدام القيم الممررة
  // إعطاء الأولوية لبيانات API دائماً
  const totalVotes = stats ? stats.totalVotes : (propTotalVotes ?? 0);
  const neighborhoodsCount = stats ? stats.numberOfTowns : (propNeighborhoodsCount ?? 3);
  const votesToday = stats ? stats.todayVotes : (propVotesToday ?? 342);

  // للتأكد من أن البيانات تأتي بشكل صحيح
  useEffect(() => {
    if (stats) {
      console.log('Stats from API:', stats);
      console.log('Using values:', { totalVotes, neighborhoodsCount, votesToday });
    }
  }, [stats, totalVotes, neighborhoodsCount, votesToday]);

  return (
    <section className="relative overflow-hidden bg-white ">
      {/* الخلفية الملونة بالتدرج اللوني */}
      <div className="relative h-[600px] md:h-[680px] w-full bg-gradient-to-br from-navy-blue to-turquoise flex items-center overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[0%] w-[400px] h-[400px] bg-turquoise/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* الجانب النصي - الأيمن */}
            <div className="lg:w-3/5 text-right text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-5 py-2 rounded-2xl text-xs font-black mb-8 border border-white/20 shadow-xl shadow-black/5 animate-fade-in-up">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-turquoise opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-turquoise" />
                </span>
                التصويت مفتوح الآن
              </div>

              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.2] drop-shadow-md">
                صوّت لحيّك <br />
                <span className="text-turquoise">خلّه يفوز بحوّامة رمضان</span>
              </h1>

              <p className="text-lg md:text-xl text-white/80 font-medium max-w-xl mb-10 leading-relaxed">
                اختر حيك المفضل وكن سبب فوزه باحتفالية الحوامة التقليدية في آخر
                أيام رمضان المبارك 2026
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#districts"
                  className="px-8 py-3 bg-white text-navy-blue rounded-xl font-black text-base hover:bg-turquoise hover:text-white transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-turquoise/20 flex items-center gap-3 group active:scale-[0.97] border border-white/20 hover:border-turquoise/30"
                >
                  ابدأ التصويت الآن
                  <FaChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* الجانب البصري - وسام الحي + الإحصائيات تحته */}
            <div className="lg:w-2/5 hidden lg:flex flex-col items-center justify-center gap-8">
              <div className="relative group">
                <div className="relative w-80 h-80 flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 shadow-2xl animate-float" />
                  <div className="relative z-10 bg-white p-10 rounded-[3rem] shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700 flex flex-col items-center">
                    <div className="w-24 h-24 bg-gradient-to-tr from-turquoise to-lime-green rounded-full flex items-center justify-center text-white text-5xl shadow-lg mb-4">
                      <FaHome />
                    </div>
                    <div className="flex gap-1 text-sand-brown mb-2">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <span className="text-navy-blue font-black text-lg">
                      حيّنا الأفضل
                    </span>
                  </div>
                  <div className="absolute top-0 -right-4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-rose-500 text-2xl animate-float [animation-delay:1s] border border-gray-50">
                    <FaHeart />
                  </div>
                  <div className="absolute -bottom-4 -left-2 w-20 h-20 bg-quite-purple text-white rounded-3xl shadow-xl flex items-center justify-center text-3xl animate-float [animation-delay:2s]">
                    ✨
                  </div>
                </div>
              </div>

              {/* الإحصائيات تحت الرسمة - ديسكتوب */}
              <div className="flex flex-row items-center justify-center gap-6 w-full max-w-sm mt-10">
                <div className="flex items-center gap-3 group">
                  {/* <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 group-hover:bg-white/20 transition-all shrink-0">
                    <FaLightbulb className="w-4 h-4" />
                  </div> */}
                  <div className="text-center">
                    <div className="text-xl font-black text-white leading-tight">
                      <AnimatedCounter value={neighborhoodsCount} duration={2000} />
                    </div>
                    <div className="text-[10px] font-bold text-white/80 uppercase tracking-tight">
                      أحياء متقدمة
                    </div>
                  </div>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="flex items-center gap-3 group">
                  {/* <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 group-hover:bg-white/20 transition-all shrink-0">
                    <FaChartLine className="w-4 h-4" />
                  </div> */}
                    <div className="text-center">
                    <div className="text-xl font-black text-white leading-tight">
                      <AnimatedCounter value={votesToday} duration={2000} />
                    </div>
                    <div className="text-[10px] font-bold text-white/80 uppercase tracking-tight">
                      صوت اليوم
                    </div>
                  </div>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="flex items-center gap-3 group">
                  {/* <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 group-hover:bg-white/20 transition-all shrink-0">
                    <FaVoteYea className="w-4 h-4" />
                  </div> */}
                  <div className="text-center">
                    <div className="text-xl font-black text-white leading-tight">
                      <AnimatedCounter value={totalVotes} duration={2000} />
                    </div>
                    <div className="text-[10px] font-bold text-white/80 uppercase tracking-tight">
                      إجمالي الأصوات
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* الإحصائيات على الموبايل - تحت النص */}
          <div className="mt-10 lg:hidden w-full">
            <div className="flex flex-row items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 shrink-0">
                  <FaLightbulb className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-white leading-tight">
                    <AnimatedCounter value={neighborhoodsCount} duration={2000} />
                  </div>
                  <div className="text-[10px] font-bold text-white/80">أحياء متقدمة</div>
                </div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 shrink-0">
                  <FaChartLine className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-white leading-tight">
                    <AnimatedCounter value={votesToday} duration={2000} />
                  </div>
                  <div className="text-[10px] font-bold text-white/80">صوت اليوم</div>
                </div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 shrink-0">
                  <FaVoteYea className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-white leading-tight">
                    <AnimatedCounter value={totalVotes} duration={2000} />
                  </div>
                  <div className="text-[10px] font-bold text-white/80">إجمالي الأصوات</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* فاصل الموجة السفلي - موجة مثلثية واحدة */}
        <div className="absolute bottom-0 left-0 w-full leading-[0] z-10">
          <svg
            viewBox="0 0 1440 100"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            {/* الخلفية البيضاء */}
            <path
              fill="#ffffff"
              d="M0,0 L720,80 L1440,0 L1440,100 L0,100 Z"
            />
            {/* الموجة التوركوازية */}
            <path
              fill="#00a89d"
              d="M0,0 L720,80 L1440,0 L1440,20 L720,100 L0,20 Z"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
