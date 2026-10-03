import React from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';

interface CtaBannerProps {
  onBookClick: () => void;
  onContactClick: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  onBookClick,
  onContactClick,
}) => {
  return (
    <section className="py-16 sm:py-20 bg-[#0A192F] text-white relative overflow-hidden border-b border-white/10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/3 w-96 h-96 rounded-full bg-[#C5A059]/10 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-l from-[#112240] to-[#0F2547] border border-white/15 p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A059]">
              <span>المركز الأمريكي للتدريب · أسوان</span>
              <span aria-hidden="true">·</span>
              <span>التسجيل متاح يوميًا</span>
            </div>

            <h2
              className="text-2xl sm:text-4xl font-bold font-display text-white leading-tight"
              style={{ textWrap: 'balance' }}
            >
              جاهز تبدأ خطوتك الجديدة؟
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              اختار البرنامج المناسب ليك وتواصل مع فريق المركز لمعرفة التفاصيل والحجز.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={onBookClick}
              className="px-7 py-3.5 text-sm sm:text-base font-bold text-[#0A192F] bg-[#C5A059] hover:bg-[#d4b06a] rounded-xl shadow-lg shadow-[#C5A059]/20 transition-all duration-150 hover:-translate-y-0.5 flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>احجز الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onContactClick}
              className="px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl flex items-center gap-2 transition-all duration-150 whitespace-nowrap cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#C5A059]" />
              <span>تواصل معنا</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
