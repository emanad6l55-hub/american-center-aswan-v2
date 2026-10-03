import React, { useState, useEffect } from 'react';
import { CourseItem } from '../data/initialData';
import {
  ArrowRight,
  CheckCircle2,
  Edit3,
  Save,
  BookOpen,
  MapPin,
  PhoneCall,
} from 'lucide-react';

interface CourseDetailModalProps {
  course: CourseItem;
  phone: string;
  onClose: () => void;
  onBookCourse: (courseTitle: string) => void;
  onSaveCourse: (updatedCourse: CourseItem) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  phone,
  onClose,
  onBookCourse,
  onSaveCourse,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<CourseItem>(course);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setDraft(course);
  }, [course]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCourse(draft);
    setIsEditing(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0A192F]/80 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-detail-title"
    >
      <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Top Bar inside Detail View */}
        <div className="bg-[#0A192F] text-white px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-200 hover:text-[#C5A059] transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى قائمة الدورات</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#0A192F] bg-[#C5A059] hover:bg-[#d4b06a] rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'إلغاء التعديل' : 'تعديل بيانات هذه الدورة'}</span>
            </button>
          </div>
        </div>

        {isEditing ? (
          /* Inline Course Editor Form */
          <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-5 bg-[#F8FAFC]">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold font-display text-[#0A192F]">
                تعديل تفاصيل الدورة التدريبية (وضع الإدارة)
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                يمكنك تحديث جميع بيانات هذه الدورة ليتم حفظها فورًا وعرضها للزوار.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  اسم الدورة التدريبية
                </label>
                <input
                  type="text"
                  required
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  المسار / التصنيف
                </label>
                <input
                  type="text"
                  required
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  المستوى
                </label>
                <input
                  type="text"
                  required
                  value={draft.level}
                  onChange={(e) => setDraft({ ...draft, level: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  المدة التدريبية
                </label>
                <input
                  type="text"
                  value={draft.duration}
                  onChange={(e) => setDraft({ ...draft, duration: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  مواعيد وجدول المحاضرات
                </label>
                <input
                  type="text"
                  value={draft.schedule}
                  onChange={(e) => setDraft({ ...draft, schedule: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  اسم المدرب
                </label>
                <input
                  type="text"
                  value={draft.instructor}
                  onChange={(e) => setDraft({ ...draft, instructor: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  تاريخ البدء
                </label>
                <input
                  type="text"
                  value={draft.startDate}
                  onChange={(e) => setDraft({ ...draft, startDate: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  السعر / رسوم الدورة
                </label>
                <input
                  type="text"
                  value={draft.price}
                  onChange={(e) => setDraft({ ...draft, price: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  مكان الانعقاد
                </label>
                <input
                  type="text"
                  value={draft.location}
                  onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  نبذة مختصرة (تظهر في البطاقة الخارجية)
                </label>
                <textarea
                  rows={2}
                  value={draft.shortDescription}
                  onChange={(e) => setDraft({ ...draft, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  نظرة عامة مفصلة على الدورة
                </label>
                <textarea
                  rows={3}
                  value={draft.overview}
                  onChange={(e) => setDraft({ ...draft, overview: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  مخرجات التعلم (كل سطر يمثل نقطة مستقلة)
                </label>
                <textarea
                  rows={4}
                  value={draft.learningOutcomes.join('\n')}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      learningOutcomes: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  متطلبات الحضور (كل سطر يمثل نقطة مستقلة)
                </label>
                <textarea
                  rows={3}
                  value={draft.requirements.join('\n')}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      requirements: e.target.value.split('\n').filter(Boolean),
                    })
                  }
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A192F]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-[#0A192F] bg-[#C5A059] hover:bg-[#d4b06a] rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>حفظ التعديلات</span>
              </button>
            </div>
          </form>
        ) : (
          /* Course Detailed Reader View */
          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            {/* Header & Image Banner */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1D4ED8]">
                  <span>{course.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>المستوى: {course.level}</span>
                </div>

                <h2
                  id="course-detail-title"
                  className="text-2xl sm:text-3xl font-bold font-display text-[#0A192F] leading-snug"
                >
                  {course.title}
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {course.shortDescription}
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-xl overflow-hidden border border-slate-200 aspect-[16/10] bg-slate-100">
                  {!imgError && course.imageUrl ? (
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#0A192F] text-white">
                      <BookOpen className="w-10 h-10 text-[#C5A059] mb-2" />
                      <span className="text-xs text-slate-300">{course.category}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Key Specifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 text-xs sm:text-sm">
              <div className="p-3 bg-white rounded-xl border border-slate-200/60">
                <span className="text-slate-500 block mb-1">المدة التدريبية</span>
                <span className="font-bold text-[#0A192F]">{course.duration}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/60">
                <span className="text-slate-500 block mb-1">جدول المحاضرات</span>
                <span className="font-bold text-[#0A192F]">{course.schedule}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/60">
                <span className="text-slate-500 block mb-1">المدرب</span>
                <span className="font-bold text-[#0A192F]">{course.instructor}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/60">
                <span className="text-slate-500 block mb-1">تاريخ البدء</span>
                <span className="font-bold text-[#0A192F]">{course.startDate}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/60">
                <span className="text-slate-500 block mb-1">السعر / الرسوم</span>
                <span className="font-bold text-[#1D4ED8]">{course.price}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200/60">
                <span className="text-slate-500 block mb-1">المقر</span>
                <span className="font-bold text-[#0A192F]">{course.location}</span>
              </div>
            </div>

            {/* Overview, Learning Outcomes, Requirements */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-display text-[#0A192F] mb-2">
                    نظرة عامة على الدورة
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {course.overview}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold font-display text-[#0A192F] mb-3">
                    ماذا ستتعلم في هذه الدورة؟ (مخرجات التعلم)
                  </h3>
                  <ul className="space-y-2.5">
                    {course.learningOutcomes.map((outcome, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200">
                  <h3 className="text-base font-bold font-display text-[#0A192F] mb-3">
                    متطلبات الالتحاق بالدورة
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {course.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#C5A059] font-bold">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Registration Callout Card */}
                <div className="p-6 rounded-2xl bg-[#0A192F] text-white space-y-4">
                  <h4 className="text-base font-bold font-display text-[#C5A059]">
                    التسجيل والاستفسار عن الدورة
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>{course.location}</span>
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onBookCourse(course.title);
                      }}
                      className="flex-1 py-3 px-4 text-xs sm:text-sm font-bold text-[#0A192F] bg-[#C5A059] hover:bg-[#d4b06a] rounded-xl text-center transition-colors cursor-pointer"
                    >
                      سجّل في هذه الدورة الآن
                    </button>
                    <a
                      href={`tel:${phone}`}
                      className="py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      <PhoneCall className="w-4 h-4 text-[#C5A059]" />
                      <span dir="ltr" className="font-mono tabular-nums">{phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
