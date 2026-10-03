import React from 'react';
import { WHY_CHOOSE_US_ITEMS } from '../data/initialData';

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1D4ED8]">
            <span>مميزات التدريب لدينا</span>
            <span aria-hidden="true">·</span>
            <span>بيئة تعليمية متكاملة</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl font-bold font-display text-[#0A192F] leading-tight"
            style={{ textWrap: 'balance' }}
          >
            ليه تختار المركز الأمريكي للتدريب؟
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            نلتزم بتقديم تجربة تدريبية منظمة تركز على الفهم التطبيقي وتطوير المهارات العملية في بيئة مريحة ومحفزة.
          </p>
        </div>

        {/* 6 Cards Grid with clean human editorial numbering */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 hover:border-[#C5A059] transition-all duration-150 hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-mono text-sm font-semibold text-[#C5A059] tabular-nums">
                    {item.number}.
                  </span>
                  <span className="text-xs text-slate-400 group-hover:text-[#0A192F] transition-colors">
                    المركز الأمريكي للتدريب
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display text-[#0A192F] group-hover:text-[#1D4ED8] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
