import React from 'react';
import { CourseItem, SocialLinks } from '../data/initialData';
import { MapPin, Phone, Clock, Settings, MessageCircle } from 'lucide-react';

interface FooterProps {
  businessName: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  openingHours: string;
  courses: CourseItem[];
  socialLinks: SocialLinks;
  onNavigateSection: (sectionId: string) => void;
  onSelectCourse: (course: CourseItem) => void;
  onOpenAdminEditor: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  businessName,
  address,
  phone,
  whatsappNumber,
  openingHours,
  courses,
  socialLinks,
  onNavigateSection,
  onSelectCourse,
  onOpenAdminEditor,
}) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigateSection(id);
  };

  return (
    <footer className="bg-[#0A192F] text-slate-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Short Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#home"
              onClick={(e) => handleNav(e, 'home')}
              className="text-xl font-bold font-display text-white hover:text-[#C5A059] transition-colors inline-block"
            >
              {businessName}
            </a>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              اكتسب المعرفة والمهارات العملية التي تساعدك على التطور في دراستك وحياتك المهنية مع المركز الأمريكي للتدريب في أسوان.
            </p>

            {/* Editable Social Media Links */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-semibold text-[#C5A059] block">
                منصات التواصل الاجتماعي (قابلة للربط والتحديث):
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={socialLinks.facebook || '#contact'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="فيسبوك"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#C5A059] hover:text-[#0A192F] text-xs font-semibold text-slate-200 border border-white/10 transition-colors"
                >
                  فيسبوك
                </a>
                <a
                  href={socialLinks.instagram || '#contact'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="إنستغرام"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#C5A059] hover:text-[#0A192F] text-xs font-semibold text-slate-200 border border-white/10 transition-colors"
                >
                  إنستغرام
                </a>
                <a
                  href={socialLinks.linkedin || '#contact'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="لينكدإن"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#C5A059] hover:text-[#0A192F] text-xs font-semibold text-slate-200 border border-white/10 transition-colors"
                >
                  لينكدإن
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="واتساب"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-semibold border border-emerald-500/30 flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>واتساب</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold font-display text-white">روابط سريعة</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleNav(e, 'home')}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  الرئيسية
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNav(e, 'about')}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  من نحن
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  onClick={(e) => handleNav(e, 'courses')}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  الدورات التدريبية
                </a>
              </li>
              <li>
                <a
                  href="#trainers"
                  onClick={(e) => handleNav(e, 'trainers')}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  المدربين
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => handleNav(e, 'testimonials')}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  آراء المتدربين
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNav(e, 'contact')}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Courses Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold font-display text-white">البرامج والدورات</h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {courses.slice(0, 4).map((course) => (
                <li key={course.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCourse(course)}
                    className="text-right text-slate-300 hover:text-[#C5A059] transition-colors line-clamp-1 cursor-pointer"
                  >
                    {course.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Verified Contact Info (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-sm">
            <h3 className="text-sm font-bold font-display text-white">معلومات التواصل</h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-1" />
                <span className="leading-relaxed">{address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a
                  href={`tel:${phone}`}
                  dir="ltr"
                  className="font-mono tabular-nums font-semibold text-white hover:text-[#C5A059] transition-colors"
                >
                  {phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span className="tabular-nums">يوميًا: {openingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Center Administration Editor Trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {businessName} – أسوان، مصر. جميع الحقوق محفوظة.
          </p>

          <button
            type="button"
            onClick={onOpenAdminEditor}
            className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>لوحة تخصيص محتوى الموقع (إدارة المركز)</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
