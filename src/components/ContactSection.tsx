import React, { useState, useEffect } from 'react';
import { CourseItem } from '../data/initialData';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Edit3,
  ExternalLink,
} from 'lucide-react';

interface ContactSectionProps {
  businessName: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  openingHours: string;
  mapEmbedQuery: string;
  courses: CourseItem[];
  preselectedCourse: string;
  onUpdateMapQuery: (newQuery: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  businessName,
  address,
  phone,
  whatsappNumber,
  openingHours,
  mapEmbedQuery,
  courses,
  preselectedCourse,
  onUpdateMapQuery,
}) => {
  const [fullName, setFullName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(preselectedCourse || '');
  const [message, setMessage] = useState('');

  const [formError, setFormError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [editingMap, setEditingMap] = useState(false);
  const [mapInput, setMapInput] = useState(mapEmbedQuery);

  useEffect(() => {
    if (preselectedCourse) {
      setSelectedCourse(preselectedCourse);
    }
  }, [preselectedCourse]);

  useEffect(() => {
    setMapInput(mapEmbedQuery);
  }, [mapEmbedQuery]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('يرجى إدخال الاسم بالكامل.');
      return;
    }

    const cleanPhone = userPhone.replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      setFormError('يرجى إدخال رقم هاتف صحيح للتواصل.');
      return;
    }

    setFormSubmitted(true);
  };

  const whatsappDirectUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `مرحباً ${businessName}، أود الاستفسار عن الدورات التدريبية المتاحة والحجز${
      selectedCourse ? ` (${selectedCourse})` : ''
    }.`
  )}`;

  const googleMapsEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    mapEmbedQuery
  )}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  const googleMapsExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    mapEmbedQuery
  )}`;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1D4ED8]">
            <span>تواصل معنا واحجز مقعدك</span>
            <span aria-hidden="true">·</span>
            <span>نستقبلكم يوميًا في مقر المركز بأسوان</span>
          </div>

          <h2
            className="text-2xl sm:text-4xl font-bold font-display text-[#0A192F] leading-tight"
            style={{ textWrap: 'balance' }}
          >
            تواصل مع {businessName}
          </h2>

          <p className="text-base text-slate-600 leading-relaxed">
            يسعدنا الرد على جميع استفساراتكم حول البرامج التدريبية المتاحة، المواعيد، ونظام الحجز عبر الهاتف أو واتساب أو من خلال زيارة مقر المركز.
          </p>
        </div>

        {/* Main Contact Grid: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Right Column (RTL): Verified Contact Details & Direct Action Buttons */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0A192F] text-white space-y-6 shadow-xl">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-semibold text-[#C5A059] block mb-1">
                  بيانات التواصل الرسمية
                </span>
                <h3 className="text-xl font-bold font-display text-white">
                  {businessName}
                </h3>
              </div>

              <div className="space-y-5 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-[#C5A059] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-300 block mb-1">العنوان</span>
                    <p className="font-semibold text-white leading-relaxed">
                      {address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-[#C5A059] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-300 block mb-1">رقم الهاتف</span>
                    <a
                      href={`tel:${phone}`}
                      dir="ltr"
                      className="text-base font-bold font-mono tabular-nums text-[#C5A059] hover:underline"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-[#C5A059] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-300 block mb-1">مواعيد العمل</span>
                    <p className="font-semibold text-white tabular-nums">
                      يوميًا: {openingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Call & WhatsApp Buttons */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${phone}`}
                  className="py-3 px-4 rounded-xl bg-[#C5A059] hover:bg-[#d4b06a] text-[#0A192F] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4" />
                  <span>اتصال هاتفي مباشر</span>
                </a>

                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>تواصل عبر واتساب</span>
                </a>
              </div>
            </div>
          </div>

          {/* Left Column (RTL): Interactive Contact / Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 lg:p-9 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
              <div className="mb-6">
                <h3 className="text-xl font-bold font-display text-[#0A192F]">
                  نموذج التسجيل والاستفسار عن الدورات
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  املأ البيانات التالية وسيتواصل معك فريق المركز لتأكيد الحجز أو الإجابة عن استفسارك.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold font-display text-[#0A192F]">
                    تم استلام طلبك بنجاح، {fullName}!
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed max-w-md mx-auto">
                    شكراً لتواصلك مع {businessName}. سيقوم فريق خدمة المتدربين بالتواصل معك على الرقم{' '}
                    <span dir="ltr" className="font-mono font-bold tabular-nums">
                      {userPhone}
                    </span>{' '}
                    في أقرب وقت خلال مواعيد العمل الرسمية ({openingHours}).
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl flex items-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>إرسال الطلب عبر واتساب أيضاً</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setFormSubmitted(false);
                        setFullName('');
                        setUserPhone('');
                        setEmail('');
                        setMessage('');
                      }}
                      className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      إرسال استفسار آخر
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
                  {formError && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* الاسم */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-bold text-slate-800 mb-1.5"
                      >
                        الاسم *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="أدخل اسمك بالكامل"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-[#F8FAFC] border border-slate-300 rounded-xl focus:outline-none focus:bg-white focus:border-[#0A192F] transition-colors"
                      />
                    </div>

                    {/* رقم الهاتف */}
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-bold text-slate-800 mb-1.5"
                      >
                        رقم الهاتف *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        dir="ltr"
                        placeholder="01XXXXXXXXX"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm font-mono tabular-nums text-right bg-[#F8FAFC] border border-slate-300 rounded-xl focus:outline-none focus:bg-white focus:border-[#0A192F] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* البريد الإلكتروني */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-bold text-slate-800 mb-1.5"
                      >
                        البريد الإلكتروني (اختياري)
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        dir="ltr"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm text-right bg-[#F8FAFC] border border-slate-300 rounded-xl focus:outline-none focus:bg-white focus:border-[#0A192F] transition-colors"
                      />
                    </div>

                    {/* الدورة المهتم بها */}
                    <div>
                      <label
                        htmlFor="contact-course"
                        className="block text-xs font-bold text-slate-800 mb-1.5"
                      >
                        الدورة المهتم بها
                      </label>
                      <select
                        id="contact-course"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm bg-[#F8FAFC] border border-slate-300 rounded-xl focus:outline-none focus:bg-white focus:border-[#0A192F] transition-colors"
                      >
                        <option value="">-- اختر الدورة التدريبية أو استفسار عام --</option>
                        {courses.map((c) => (
                          <option key={c.id} value={c.title}>
                            {c.title}
                          </option>
                        ))}
                        <option value="استفسار عام عن البرامج والمواعيد">
                          استفسار عام عن البرامج والمواعيد
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* الرسالة */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-bold text-slate-800 mb-1.5"
                    >
                      الرسالة
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="اكتب أي تفاصيل إضافية أو استفسار حول المواعيد والمستويات..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-[#F8FAFC] border border-slate-300 rounded-xl focus:outline-none focus:bg-white focus:border-[#0A192F] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-[#0A192F] bg-[#C5A059] hover:bg-[#d4b06a] rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال طلب الحجز / الاستفسار</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-sm">
          <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold font-display text-[#0A192F] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C5A059]" />
                <span>موقع المركز على خرائط جوجل (أسوان)</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">{address}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingMap(!editingMap)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-[#F8FAFC] hover:bg-slate-100 border border-slate-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>تحديث موقع الخريطة</span>
              </button>

              <a
                href={googleMapsExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0A192F] hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <span>فتح في خرائط جوجل</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {editingMap && (
            <div className="p-4 bg-[#F8FAFC] border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="text"
                value={mapInput}
                onChange={(e) => setMapInput(e.target.value)}
                placeholder="أدخل العنوان أو الإحداثيات لتحديث الخريطة..."
                className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0A192F]"
              />
              <button
                type="button"
                onClick={() => {
                  if (mapInput.trim()) {
                    onUpdateMapQuery(mapInput.trim());
                    setEditingMap(false);
                  }
                }}
                className="px-4 py-2 text-xs font-bold text-[#0A192F] bg-[#C5A059] hover:bg-[#d4b06a] rounded-lg cursor-pointer"
              >
                حفظ وتحديث الخريطة
              </button>
            </div>
          )}

          <div className="w-full h-80 sm:h-96 bg-slate-100 relative">
            <iframe
              title={`خريطة موقع ${businessName} بأسوان`}
              src={googleMapsEmbedSrc}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
