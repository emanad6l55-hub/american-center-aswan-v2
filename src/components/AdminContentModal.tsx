import React, { useState } from 'react';
import {
  CenterSiteData,
  CourseItem,
  TrainerItem,
  TestimonialItem,
  INITIAL_SITE_DATA,
} from '../data/initialData';
import { X, Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

interface AdminContentModalProps {
  siteData: CenterSiteData;
  onSaveSiteData: (newData: CenterSiteData) => void;
  onClose: () => void;
}

export const AdminContentModal: React.FC<AdminContentModalProps> = ({
  siteData,
  onSaveSiteData,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    'general' | 'about' | 'courses' | 'trainers' | 'testimonials'
  >('courses');
  const [draft, setDraft] = useState<CenterSiteData>(siteData);

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSiteData(draft);
    onClose();
  };

  const handleResetDefaults = () => {
    setDraft(INITIAL_SITE_DATA);
    onSaveSiteData(INITIAL_SITE_DATA);
  };

  const addNewCourse = () => {
    const newCourse: CourseItem = {
      id: `course-${Date.now()}`,
      title: 'دورة تدريبية جديدة (قم بتعديل الاسم)',
      category: 'التطوير المهني والإداري',
      level: 'مبتدئ',
      shortDescription: 'وصف مختصر للدورة التدريبية يظهر في البطاقة الخارجية.',
      overview: 'تفاصيل شاملة حول محتوى الدورة التدريبية والمحاور العملية.',
      learningOutcomes: ['مخرج تعليمي 1', 'مخرج تعليمي 2'],
      duration: '[تُحدد المدة بواسطة الإدارة]',
      schedule: '[يُحدد الجدول بواسطة الإدارة]',
      instructor: '[اسم المدرب]',
      location: draft.address,
      price: '[يُحدد السعر بواسطة الإدارة]',
      startDate: '[تاريخ البدء]',
      requirements: ['الالتزام بحضور المحاضرات العملية'],
      imageUrl: '/src/assets/images/course_business_management_1791012676359.jpg',
    };
    setDraft({ ...draft, courses: [newCourse, ...draft.courses] });
  };

  const removeCourse = (id: string) => {
    setDraft({
      ...draft,
      courses: draft.courses.filter((c) => c.id !== id),
    });
  };

  const addNewTrainer = () => {
    const newTrainer: TrainerItem = {
      id: `trainer-${Date.now()}`,
      name: '[اسم المدرب الجديد]',
      specialization: '[التخصص التدريبي]',
      shortBio: 'نبذة مختصرة عن المدرب وخبراته العملية في مجال التدريب.',
      experience: '[سنوات الخبرة والمؤهلات]',
    };
    setDraft({ ...draft, trainers: [...draft.trainers, newTrainer] });
  };

  const removeTrainer = (id: string) => {
    setDraft({
      ...draft,
      trainers: draft.trainers.filter((t) => t.id !== id),
    });
  };

  const addNewTestimonial = () => {
    const newItem: TestimonialItem = {
      id: `testimonial-${Date.now()}`,
      name: '[اسم المتدرب]',
      program: '[اسم الدورة]',
      rating: 5,
      review: 'رأي المتدرب حول الدورة التدريبية.',
      isPlaceholder: false,
    };
    setDraft({ ...draft, testimonials: [...draft.testimonials, newItem] });
  };

  const removeTestimonial = (id: string) => {
    setDraft({
      ...draft,
      testimonials: draft.testimonials.filter((t) => t.id !== id),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#0A192F]/80 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="لوحة إدارة وتخصيص محتوى المركز"
    >
      <div className="relative w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-[#0A192F] text-white px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold font-display text-white">
              لوحة إدارة وتحديث بيانات المركز الأمريكي للتدريب
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              جميع التعديلات تُحفظ تلقائياً في المتصفح لتسهيل إدراج الدورات والمدربين والاعتمادات الرسمية.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق"
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-3 bg-[#F8FAFC] border-b border-slate-200 flex flex-wrap items-center gap-2">
          {[
            { id: 'courses', label: 'الدورات التدريبية' },
            { id: 'trainers', label: 'المدربون' },
            { id: 'about', label: 'عن المركز والاعتمادات' },
            { id: 'testimonials', label: 'آراء المتدربين' },
            { id: 'general', label: 'التواصل والروابط' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0A192F] text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <form onSubmit={handleSaveAll} className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-display text-[#0A192F]">
                  قائمة الدورات التدريبية ({draft.courses.length})
                </h3>
                <button
                  type="button"
                  onClick={addNewCourse}
                  className="px-4 py-2 text-xs font-bold text-[#0A192F] bg-[#C5A059] hover:bg-[#d4b06a] rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة دورة جديدة</span>
                </button>
              </div>

              <div className="space-y-6">
                {draft.courses.map((course, idx) => (
                  <div
                    key={course.id}
                    className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <span className="text-xs font-bold text-[#1D4ED8]">
                        دورة رقم #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCourse(course.id)}
                        className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>حذف الدورة</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          اسم الدورة
                        </label>
                        <input
                          type="text"
                          value={course.title}
                          onChange={(e) => {
                            const updated = [...draft.courses];
                            updated[idx] = { ...course, title: e.target.value };
                            setDraft({ ...draft, courses: updated });
                          }}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          المسار / القسم
                        </label>
                        <input
                          type="text"
                          value={course.category}
                          onChange={(e) => {
                            const updated = [...draft.courses];
                            updated[idx] = { ...course, category: e.target.value };
                            setDraft({ ...draft, courses: updated });
                          }}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          المستوى
                        </label>
                        <input
                          type="text"
                          value={course.level}
                          onChange={(e) => {
                            const updated = [...draft.courses];
                            updated[idx] = { ...course, level: e.target.value };
                            setDraft({ ...draft, courses: updated });
                          }}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          المدة
                        </label>
                        <input
                          type="text"
                          value={course.duration}
                          onChange={(e) => {
                            const updated = [...draft.courses];
                            updated[idx] = { ...course, duration: e.target.value };
                            setDraft({ ...draft, courses: updated });
                          }}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          المدرب
                        </label>
                        <input
                          type="text"
                          value={course.instructor}
                          onChange={(e) => {
                            const updated = [...draft.courses];
                            updated[idx] = { ...course, instructor: e.target.value };
                            setDraft({ ...draft, courses: updated });
                          }}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          تاريخ البدء
                        </label>
                        <input
                          type="text"
                          value={course.startDate}
                          onChange={(e) => {
                            const updated = [...draft.courses];
                            updated[idx] = { ...course, startDate: e.target.value };
                            setDraft({ ...draft, courses: updated });
                          }}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          السعر / الرسوم
                        </label>
                        <input
                          type="text"
                          value={course.price}
                          onChange={(e) => {
                            const updated = [...draft.courses];
                            updated[idx] = { ...course, price: e.target.value };
                            setDraft({ ...draft, courses: updated });
                          }}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          جدول المحاضرات
                        </label>
                        <input
                          type="text"
                          value={course.schedule}
                          onChange={(e) => {
                            const updated = [...draft.courses];
                            updated[idx] = { ...course, schedule: e.target.value };
                            setDraft({ ...draft, courses: updated });
                          }}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          وصف مختصر
                        </label>
                        <textarea
                          rows={2}
                          value={course.shortDescription}
                          onChange={(e) => {
                            const updated = [...draft.courses];
                            updated[idx] = { ...course, shortDescription: e.target.value };
                            setDraft({ ...draft, courses: updated });
                          }}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trainers Tab */}
          {activeTab === 'trainers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-display text-[#0A192F]">
                  قائمة المدربين ({draft.trainers.length})
                </h3>
                <button
                  type="button"
                  onClick={addNewTrainer}
                  className="px-4 py-2 text-xs font-bold text-[#0A192F] bg-[#C5A059] hover:bg-[#d4b06a] rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة مدرب جديد</span>
                </button>
              </div>

              <div className="space-y-4">
                {draft.trainers.map((trainer, idx) => (
                  <div
                    key={trainer.id}
                    className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1D4ED8]">
                        مدرب #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeTrainer(trainer.id)}
                        className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>حذف</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          اسم المدرب
                        </label>
                        <input
                          type="text"
                          value={trainer.name}
                          onChange={(e) => {
                            const updated = [...draft.trainers];
                            updated[idx] = { ...trainer, name: e.target.value };
                            setDraft({ ...draft, trainers: updated });
                          }}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          التخصص
                        </label>
                        <input
                          type="text"
                          value={trainer.specialization}
                          onChange={(e) => {
                            const updated = [...draft.trainers];
                            updated[idx] = { ...trainer, specialization: e.target.value };
                            setDraft({ ...draft, trainers: updated });
                          }}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          الخبرة والمؤهلات
                        </label>
                        <input
                          type="text"
                          value={trainer.experience}
                          onChange={(e) => {
                            const updated = [...draft.trainers];
                            updated[idx] = { ...trainer, experience: e.target.value };
                            setDraft({ ...draft, trainers: updated });
                          }}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          نبذة مختصرة
                        </label>
                        <textarea
                          rows={2}
                          value={trainer.shortBio}
                          onChange={(e) => {
                            const updated = [...draft.trainers];
                            updated[idx] = { ...trainer, shortBio: e.target.value };
                            setDraft({ ...draft, trainers: updated });
                          }}
                          className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About & Institutional Details Tab */}
          {activeTab === 'about' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold font-display text-[#0A192F]">
                نبذة عن المركز والحقول المؤسسية القابلة للإضافة
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الفقرة التعريفية الأولى
                </label>
                <textarea
                  rows={3}
                  value={draft.about.introParagraph1}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      about: { ...draft.about, introParagraph1: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الفقرة التعريفية الثانية
                </label>
                <textarea
                  rows={3}
                  value={draft.about.introParagraph2}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      about: { ...draft.about, introParagraph2: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    الاعتمادات (تُترك فارغة أو تُعدل بواسطة الإدارة)
                  </label>
                  <input
                    type="text"
                    value={draft.about.optionalFields.accreditation}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        about: {
                          ...draft.about,
                          optionalFields: {
                            ...draft.about.optionalFields,
                            accreditation: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    الشراكات المؤسسية
                  </label>
                  <input
                    type="text"
                    value={draft.about.optionalFields.partnerships}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        about: {
                          ...draft.about,
                          optionalFields: {
                            ...draft.about.optionalFields,
                            partnerships: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    الشهادات المقدمة
                  </label>
                  <input
                    type="text"
                    value={draft.about.optionalFields.certificatesInfo}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        about: {
                          ...draft.about,
                          optionalFields: {
                            ...draft.about.optionalFields,
                            certificatesInfo: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    سنوات الخبرة / عدد المتدربين
                  </label>
                  <input
                    type="text"
                    value={draft.about.optionalFields.yearsOfExperience}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        about: {
                          ...draft.about,
                          optionalFields: {
                            ...draft.about.optionalFields,
                            yearsOfExperience: e.target.value,
                          },
                        },
                      })
                    }
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold font-display text-[#0A192F]">
                  إدارة آراء المتدربين ({draft.testimonials.length})
                </h3>
                <button
                  type="button"
                  onClick={addNewTestimonial}
                  className="px-4 py-2 text-xs font-bold text-[#0A192F] bg-[#C5A059] hover:bg-[#d4b06a] rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة رأي متدرب</span>
                </button>
              </div>

              <div className="space-y-4">
                {draft.testimonials.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">
                        تقييم #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeTestimonial(item.id)}
                        className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 font-semibold cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>حذف</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => {
                          const updated = [...draft.testimonials];
                          updated[idx] = { ...item, name: e.target.value, isPlaceholder: false };
                          setDraft({ ...draft, testimonials: updated });
                        }}
                        placeholder="اسم المتدرب"
                        className="px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg"
                      />
                      <input
                        type="text"
                        value={item.program}
                        onChange={(e) => {
                          const updated = [...draft.testimonials];
                          updated[idx] = { ...item, program: e.target.value };
                          setDraft({ ...draft, testimonials: updated });
                        }}
                        placeholder="اسم الدورة"
                        className="px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg"
                      />
                      <textarea
                        rows={2}
                        value={item.review}
                        onChange={(e) => {
                          const updated = [...draft.testimonials];
                          updated[idx] = { ...item, review: e.target.value, isPlaceholder: false };
                          setDraft({ ...draft, testimonials: updated });
                        }}
                        className="sm:col-span-2 px-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* General & Social Links Tab */}
          {activeTab === 'general' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold font-display text-[#0A192F]">
                بيانات الاتصال وروابط التواصل الاجتماعي
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    رقم الهاتف الرسمي
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={draft.phone}
                    onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm font-mono bg-[#F8FAFC] border border-slate-300 rounded-lg text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    رقم واتساب (مع كود الدولة مثل 201140603755)
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={draft.whatsappNumber}
                    onChange={(e) => setDraft({ ...draft, whatsappNumber: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm font-mono bg-[#F8FAFC] border border-slate-300 rounded-lg text-right"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    العنوان التفصيلي
                  </label>
                  <input
                    type="text"
                    value={draft.address}
                    onChange={(e) => setDraft({ ...draft, address: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    رابط صفحة فيسبوك
                  </label>
                  <input
                    type="url"
                    dir="ltr"
                    value={draft.socialLinks.facebook}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        socialLinks: { ...draft.socialLinks, facebook: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    رابط حساب إنستغرام
                  </label>
                  <input
                    type="url"
                    dir="ltr"
                    value={draft.socialLinks.instagram}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        socialLinks: { ...draft.socialLinks, instagram: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg text-right"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer Modal Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-red-700 bg-slate-100 hover:bg-red-50 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة البيانات الافتراضية</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                إغلاق
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs sm:text-sm font-bold text-[#0A192F] bg-[#C5A059] hover:bg-[#d4b06a] rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>حفظ جميع التعديلات</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
