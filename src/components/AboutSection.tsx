import React, { useState } from 'react';
import { CenterAboutDetails } from '../data/initialData';
import { Edit3, CheckCircle2, Building2 } from 'lucide-react';

interface AboutSectionProps {
  about: CenterAboutDetails;
  address: string;
  onOpenAdminEditor: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  about,
  address,
  onOpenAdminEditor,
}) => {
  const [imgError, setImgError] = useState(false);
  const [showAdminPlaceholders, setShowAdminPlaceholders] = useState(false);

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Right Column: Introductory Editorial Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1D4ED8]">
              <span>من نحن</span>
              <span aria-hidden="true">·</span>
              <span>رسالتنا التعليمية والتدريبية</span>
            </div>

            <h2
              className="text-2xl sm:text-4xl font-bold font-display text-[#0A192F] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              عن المركز الأمريكي للتدريب
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {about.introParagraph1}
            </p>

            <p className="text-base text-slate-600 leading-relaxed">
              {about.introParagraph2}
            </p>

            {/* Vision & Mission Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div className="p-5 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                <h3 className="text-base font-bold font-display text-[#0A192F] mb-2">
                  رؤية المركز
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {about.visionText}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#F8FAFC] border border-slate-200/80">
                <h3 className="text-base font-bold font-display text-[#0A192F] mb-2">
                  منهجية التدريب
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {about.missionText}
                </p>
              </div>
            </div>

            {/* Key Pillars List */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>التركيز على التطبيق العملي وتنمية المهارات الحقيقية</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>محتوى تدريبي منظم يناسب الطلاب والخريجين</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>متابعة مباشرة للمتدربين خلال فترة البرنامج</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>موقع متميز وسهل الوصول على كورنيش النيل بأسوان</span>
              </div>
            </div>

            {/* Collapsible / Editable Official Institutional Fields (No invented claims) */}
            <div className="pt-4">
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-dashed border-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-[#0A192F] flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#C5A059]" />
                      <span>السجل المؤسسي والبيانات الإضافية للمركز (قابل للتخصيص)</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      حقول مخصصة لإدارة المركز لإضافة الاعتمادات، الشراكات، الشهادات، أو الإحصائيات الرسمية عند توفرها.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAdminPlaceholders(!showAdminPlaceholders)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      {showAdminPlaceholders ? 'إخفاء الحقول' : 'عرض الحقول القابلة للإضافة'}
                    </button>
                    <button
                      type="button"
                      onClick={onOpenAdminEditor}
                      className="px-3 py-1.5 text-xs font-semibold text-[#0A192F] bg-[#C5A059]/20 hover:bg-[#C5A059]/30 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>تعديل البيانات</span>
                    </button>
                  </div>
                </div>

                {showAdminPlaceholders && (
                  <div className="mt-4 pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-lg border border-slate-200/70">
                      <span className="font-semibold text-slate-800 block mb-1">الاعتمادات التدريبية:</span>
                      <span className="text-slate-500">{about.optionalFields.accreditation}</span>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-slate-200/70">
                      <span className="font-semibold text-slate-800 block mb-1">الشراكات المؤسسية:</span>
                      <span className="text-slate-500">{about.optionalFields.partnerships}</span>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-slate-200/70">
                      <span className="font-semibold text-slate-800 block mb-1">الشهادات المقدمة:</span>
                      <span className="text-slate-500">{about.optionalFields.certificatesInfo}</span>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-slate-200/70">
                      <span className="font-semibold text-slate-800 block mb-1">عدد المتدربين / سنوات الخبرة:</span>
                      <span className="text-slate-500">
                        {about.optionalFields.studentsCount} · {about.optionalFields.yearsOfExperience}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Left Column: Image & Verified Location Card */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100 aspect-[4/3]">
              {!imgError ? (
                <img
                  src="/src/assets/images/about_learning_hall_1791012687827.jpg"
                  alt="بيئة التعلم والتدريب في المركز الأمريكي للتدريب"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-slate-100">
                  <Building2 className="w-10 h-10 text-[#0A192F] mb-2" />
                  <span className="text-sm font-bold text-[#0A192F]">المركز الأمريكي للتدريب</span>
                </div>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-[#0A192F] text-white space-y-3">
              <div className="text-xs text-[#C5A059] font-semibold">
                المقر الرئيسي · أسوان
              </div>
              <p className="text-sm sm:text-base font-semibold leading-relaxed">
                {address}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                نستقبل المتدربين والراغبين في الاستفسار عن البرامج التدريبية يوميًا من الساعة 10:00 صباحًا حتى 10:00 مساءً.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
