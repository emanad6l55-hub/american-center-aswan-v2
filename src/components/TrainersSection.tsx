import React from 'react';
import { TrainerItem } from '../data/initialData';
import { UserCheck, Edit3 } from 'lucide-react';

interface TrainersSectionProps {
  trainers: TrainerItem[];
  onOpenAdminEditor: () => void;
}

export const TrainersSection: React.FC<TrainersSectionProps> = ({
  trainers,
  onOpenAdminEditor,
}) => {
  return (
    <section id="trainers" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1D4ED8]">
              <span>الهيئة التدريبية</span>
              <span aria-hidden="true">·</span>
              <span>بطاقات تعريفية قابلة للتحديث من الإدارة</span>
            </div>

            <h2
              className="text-2xl sm:text-4xl font-bold font-display text-[#0A192F] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              مدربونا
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              يحرص المركز الأمريكي للتدريب على التعاون مع مدربين متخصصين ذوي كفاءة في توصيل المهارات العملية. البطاقات التالية مهيأة لإدارة المركز لإدراج أسماء وخبرات المدربين الفعليين لكل برنامج.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenAdminEditor}
            className="self-start md:self-end px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#0A192F] bg-white hover:bg-slate-100 border border-slate-300 rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
          >
            <Edit3 className="w-4 h-4 text-[#C5A059]" />
            <span>تحديث بيانات المدربين</span>
          </button>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trainers.map((trainer, index) => (
            <div
              key={trainer.id}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-[#C5A059] transition-all duration-150 flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Trainer Avatar / Photo Slot */}
                <div className="flex items-center gap-4">
                  {trainer.photoUrl ? (
                    <img
                      src={trainer.photoUrl}
                      alt={trainer.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-[#0A192F] text-[#C5A059] flex items-center justify-center shrink-0 border border-[#C5A059]/30">
                      <UserCheck className="w-7 h-7" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <span className="text-xs font-mono text-slate-400 tabular-nums block">
                      0{index + 1}.
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-display text-[#0A192F] truncate">
                      {trainer.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#1D4ED8] truncate mt-0.5">
                      {trainer.specialization}
                    </p>
                  </div>
                </div>

                {/* Short Bio */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {trainer.shortBio}
                </p>
              </div>

              {/* Experience Footer */}
              <div className="pt-4 mt-5 border-t border-slate-100 text-xs">
                <span className="font-semibold text-slate-800 block mb-1">
                  الخبرة والمؤهلات:
                </span>
                <span className="text-slate-600">{trainer.experience}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
