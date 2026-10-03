import React, { useState, useMemo } from 'react';
import { CourseItem } from '../data/initialData';
import { BookOpen, Edit3, PlusCircle, ArrowLeft } from 'lucide-react';

interface CoursesSectionProps {
  courses: CourseItem[];
  onSelectCourse: (course: CourseItem) => void;
  onBookCourse: (courseTitle: string) => void;
  onOpenAdminEditor: () => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  courses,
  onSelectCourse,
  onBookCourse,
  onOpenAdminEditor,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [selectedLevel, setSelectedLevel] = useState<string>('الكل');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const categories = useMemo(() => {
    const unique = Array.from(new Set(courses.map((c) => c.category)));
    return ['الكل', ...unique];
  }, [courses]);

  const levels = useMemo(() => {
    const unique = Array.from(new Set(courses.map((c) => c.level)));
    return ['الكل', ...unique];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchCat = selectedCategory === 'الكل' || course.category === selectedCategory;
      const matchLvl = selectedLevel === 'الكل' || course.level === selectedLevel;
      return matchCat && matchLvl;
    });
  }, [courses, selectedCategory, selectedLevel]);

  return (
    <section id="courses" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Admin Quick Action */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1D4ED8]">
              <span>الدليل التدريبي</span>
              <span aria-hidden="true">·</span>
              <span>نماذج دورات قابلة للتخصيص من إدارة المركز</span>
            </div>

            <h2
              className="text-2xl sm:text-4xl font-bold font-display text-[#0A192F] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              اكتشف دوراتنا التدريبية
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              تصفح البرامج التدريبية حسب المسار أو المستوى. جميع تفاصيل الدورات المعروضة أدناه مهيأة كقوالب قابلة للتعديل والإضافة المباشرة بواسطة إدارة المركز الأمريكي للتدريب.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-end">
            <button
              type="button"
              onClick={onOpenAdminEditor}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#0A192F] bg-[#F8FAFC] hover:bg-slate-100 border border-slate-300 rounded-xl flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#C5A059]" />
              <span>إضافة أو تعديل الدورات (إدارة المركز)</span>
            </button>
          </div>
        </div>

        {/* Interactive Filter Controls (Segmented Buttons) */}
        <div className="mb-10 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 ml-2">المسار التدريبي:</span>
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#0A192F] text-white shadow-sm'
                      : 'text-slate-700 hover:text-[#0A192F]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 ml-2">المستوى:</span>
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-[#C5A059] text-[#0A192F] shadow-sm'
                      : 'text-slate-700 hover:text-[#0A192F]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Catalog Grid */}
        {filteredCourses.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-[#F8FAFC] border border-slate-200 p-8">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold font-display text-[#0A192F]">
              لا توجد دورات مطابقة لخيارات التصفية الحالية
            </h3>
            <p className="text-sm text-slate-600 mt-1 mb-5">
              جرب اختيار مسار تدريبي آخر أو إعادة ضبط عوامل التصفية لعرض جميع الدورات.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('الكل');
                setSelectedLevel('الكل');
              }}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#0A192F] rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              عرض جميع الدورات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCourses.map((course) => (
              <article
                key={course.id}
                className="group rounded-2xl bg-white border border-slate-200/90 hover:border-[#C5A059] transition-all duration-150 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Course Image with Resilient Fallback */}
                  <div
                    onClick={() => onSelectCourse(course)}
                    className="relative aspect-[16/9] bg-slate-100 overflow-hidden cursor-pointer border-b border-slate-100"
                  >
                    {!failedImages[course.id] && course.imageUrl ? (
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [course.id]: true }))
                        }
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0A192F] to-[#112240] text-white">
                        <BookOpen className="w-10 h-10 text-[#C5A059] mb-2" />
                        <span className="text-xs font-semibold text-slate-300">
                          {course.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Course Card Content (Zero-Pill Metadata Discipline) */}
                  <div className="p-6 sm:p-7 space-y-4">
                    {/* Quiet 1-line text kicker with · separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#1D4ED8]">
                      <span>{course.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-600">المستوى: {course.level}</span>
                    </div>

                    <h3
                      onClick={() => onSelectCourse(course)}
                      className="text-lg sm:text-xl font-bold font-display text-[#0A192F] group-hover:text-[#1D4ED8] transition-colors leading-snug cursor-pointer"
                    >
                      {course.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {course.shortDescription}
                    </p>

                    {/* Structured Course Metadata Specifications */}
                    <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-slate-800">المدة التدريبية:</span>
                        <span className="text-slate-600 truncate max-w-[230px] sm:max-w-xs">
                          {course.duration}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-slate-800">المدرب:</span>
                        <span className="text-slate-600 truncate max-w-[230px] sm:max-w-xs">
                          {course.instructor}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-slate-800">تاريخ البدء:</span>
                        <span className="text-slate-600 truncate max-w-[230px] sm:max-w-xs">
                          {course.startDate}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-slate-800">الرسوم / السعر:</span>
                        <span className="text-[#0A192F] font-semibold truncate max-w-[230px] sm:max-w-xs">
                          {course.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-slate-100 flex items-center gap-3 bg-[#F8FAFC]/50">
                  <button
                    type="button"
                    onClick={() => onBookCourse(course.title)}
                    className="flex-1 py-2.5 px-4 text-xs sm:text-sm font-bold text-[#0A192F] bg-[#C5A059] hover:bg-[#d4b06a] rounded-xl transition-colors whitespace-nowrap cursor-pointer"
                  >
                    احجز الآن
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectCourse(course)}
                    className="flex-1 py-2.5 px-4 text-xs sm:text-sm font-semibold text-[#0A192F] bg-white hover:bg-slate-100 border border-slate-300 rounded-xl flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <span>اعرف المزيد</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
