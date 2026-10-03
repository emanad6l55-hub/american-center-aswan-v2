import React, { useState } from 'react';
import { TestimonialItem } from '../data/initialData';
import { Star, MessageSquarePlus, Edit3, CheckCircle } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: TestimonialItem[];
  onAddTestimonial: (newItem: TestimonialItem) => void;
  onOpenAdminEditor: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onAddTestimonial,
  onOpenAdminEditor,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [program, setProgram] = useState('');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !review.trim()) return;

    onAddTestimonial({
      id: `testimonial-${Date.now()}`,
      name: name.trim(),
      program: program.trim() || 'برنامج تدريبي بالمركز',
      rating,
      review: review.trim(),
      isPlaceholder: false,
    });

    setName('');
    setProgram('');
    setRating(5);
    setReview('');
    setShowAddForm(false);
    setSubmittedNotice(true);
    setTimeout(() => setSubmittedNotice(false), 4000);
  };

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1D4ED8]">
              <span>تقييمات وانطباعات</span>
              <span aria-hidden="true">·</span>
              <span>مساحة مخصصة لآراء المتدربين الحقيقية</span>
            </div>

            <h2
              className="text-2xl sm:text-4xl font-bold font-display text-[#0A192F] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              آراء المتدربين
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              نلتزم بالمصداقية التامة في عرض تقييمات المتدربين. القوالب التالية مخصصة لإدارة المركز لإدراج الآراء الحقيقية للملتحقين بالدورات، كما يمكن للمتدربين إضافة تقييمهم مباشرة.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold text-[#0A192F] bg-[#C5A059] hover:bg-[#d4b06a] rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>{showAddForm ? 'إغلاق نموذج التقييم' : 'أضف رأيك كمتدرب'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenAdminEditor}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-[#F8FAFC] hover:bg-slate-100 border border-slate-300 rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>إدارة الآراء</span>
            </button>
          </div>
        </div>

        {submittedNotice && (
          <div className="mb-8 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3 text-sm font-semibold">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>تمت إضافة تقييمك بنجاح وعرضه في قسم آراء المتدربين.</span>
          </div>
        )}

        {/* Interactive Form to Add Real Review */}
        {showAddForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-12 p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 space-y-5"
          >
            <h3 className="text-lg font-bold font-display text-[#0A192F]">
              إضافة تقييم جديد من متدرب
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  اسم المتدرب *
                </label>
                <input
                  type="text"
                  required
                  placeholder="الاسم الثلاثي أو الثنائي"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  اسم الدورة التدريبية
                </label>
                <input
                  type="text"
                  placeholder="مثال: دورة اللغات / الحاسب الآلي"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#0A192F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  التقييم (من 5)
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      aria-label={`تقييم ${num} من 5`}
                      className="p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          num <= rating
                            ? 'text-[#C5A059] fill-[#C5A059]'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono font-bold text-slate-700 tabular-nums mr-1">
                    ({rating}/5)
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                نص التقييم أو التجربة التدريبية *
              </label>
              <textarea
                rows={3}
                required
                placeholder="اكتب رأيك الصادق حول تجربتك التدريبية داخل المركز..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#0A192F]"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#0A192F] hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                نشر التقييم
              </button>
            </div>
          </form>
        )}

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                {/* Rating Stars & Status Text */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1" aria-label={`التقييم ${item.rating} من 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < item.rating
                            ? 'text-[#C5A059] fill-[#C5A059]'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  {item.isPlaceholder && (
                    <span className="text-[11px] text-slate-500 font-medium">
                      نموذج قابل للتعديل
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  "{item.review}"
                </p>
              </div>

              {/* Trainee Name & Course Info */}
              <div className="pt-4 border-t border-slate-200/70">
                <p className="text-sm font-bold font-display text-[#0A192F]">
                  {item.name}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{item.program}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
