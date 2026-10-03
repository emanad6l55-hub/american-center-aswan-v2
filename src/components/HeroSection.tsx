import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, PhoneCall, BookOpen } from 'lucide-react';

interface HeroSectionProps {
  onBookClick: () => void;
  onContactClick: () => void;
  address: string;
  openingHours: string;
  phone: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookClick,
  onContactClick,
  address,
  openingHours,
  phone,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#0A192F] via-[#0F2547] to-[#0A192F] text-white py-14 sm:py-20 lg:py-24 border-b border-white/10"
    >
      {/* Subtle geometric background light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#C5A059]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Right Column (RTL): Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#C5A059] font-semibold tracking-wide">
              <span>المركز الأمريكي للتدريب</span>
              <span aria-hidden="true">·</span>
              <span>أسوان، كورنيش النيل</span>
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-[52px] font-bold font-display leading-[1.2] tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              طوّر مهاراتك...{' '}
              <span className="text-[#C5A059]">وابني مستقبلك</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed max-w-2xl font-normal">
              اكتسب المعرفة والمهارات العملية التي تساعدك على التطور في دراستك وحياتك المهنية مع المركز الأمريكي للتدريب.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onBookClick}
                className="px-7 py-3.5 text-sm sm:text-base font-bold text-[#0A192F] bg-[#C5A059] hover:bg-[#d4b06a] rounded-xl shadow-lg shadow-[#C5A059]/20 transition-all duration-150 hover:-translate-y-0.5 flex items-center gap-2.5 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>احجز دورتك الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onContactClick}
                className="px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              >
                تواصل معنا
              </button>
            </div>

            {/* Verified Institutional Location & Hours Bar (No fake statistics) */}
            <div className="pt-6 mt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                <div>
                  <span className="block font-semibold text-white">الموقع بأسوان</span>
                  <span className="text-slate-300 leading-snug">{address}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                <div>
                  <span className="block font-semibold text-white">مواعيد العمل اليومية</span>
                  <span className="text-slate-300 tabular-nums">{openingHours}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                <div>
                  <span className="block font-semibold text-white">للاستفسار والحجز</span>
                  <a
                    href={`tel:${phone}`}
                    dir="ltr"
                    className="text-[#C5A059] hover:underline font-mono tabular-nums font-semibold"
                  >
                    {phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Left Column (RTL): High-Fidelity Visual Frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#112240] aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3]">
              {!imgError ? (
                <img
                  src="/src/assets/images/hero_training_center_1791012641847.jpg"
                  alt="قاعة التدريب وتطوير المهارات في المركز الأمريكي للتدريب بأسوان"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#112240] to-[#0A192F]">
                  <BookOpen className="w-12 h-12 text-[#C5A059] mb-3" />
                  <p className="text-base font-display font-bold text-white">
                    المركز الأمريكي للتدريب – أسوان
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    بيئة تعليمية وتدريبية متكاملة لتطوير المهارات العملية
                  </p>
                </div>
              )}

              {/* Measured Scrim Overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/25 to-transparent flex items-end p-5 sm:p-6">
                <div className="w-full flex items-center justify-between gap-4 border-t border-white/15 pt-3">
                  <div>
                    <p className="text-xs text-[#C5A059] font-semibold">بيئة تعليمية محفزة</p>
                    <p className="text-sm font-bold text-white">
                      تدريب عملي وتطبيق مباشر داخل القاعات
                    </p>
                  </div>
                  <span className="text-xs text-slate-300 whitespace-nowrap">
                    قاعة الماسة · كورنيش النيل
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
