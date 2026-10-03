import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  businessName: string;
  onBookClick: () => void;
  onNavigateSection: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'about', label: 'من نحن' },
  { id: 'courses', label: 'الدورات' },
  { id: 'trainers', label: 'المدربين' },
  { id: 'testimonials', label: 'آراء المتدربين' },
  { id: 'contact', label: 'تواصل معنا' },
];

export const Navbar: React.FC<NavbarProps> = ({
  businessName,
  onBookClick,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#0A192F]/95 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="text-lg sm:text-xl font-bold font-display tracking-tight text-white hover:text-[#C5A059] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded"
        >
          {businessName}
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-slate-200"
        >
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              className={`${
                idx === 5 ? 'hidden xl:inline-block' : ''
              } relative py-1 text-slate-200 hover:text-white transition-colors whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-[#C5A059] hover:after:w-full after:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary action & Mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBookClick}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#0A192F] bg-[#C5A059] hover:bg-[#d4b06a] rounded-lg transition-transform active:scale-95 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            احجز دورتك الآن
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="md:hidden p-2 text-slate-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A192F] border-b border-white/15 px-4 pt-3 pb-6 shadow-xl">
          <nav aria-label="قائمة الجوال" className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className="px-3 py-2.5 text-base font-semibold text-slate-100 hover:text-[#C5A059] hover:bg-white/5 rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-3 px-4 text-center text-sm font-bold text-[#0A192F] bg-[#C5A059] hover:bg-[#d4b06a] rounded-lg transition-colors"
              >
                احجز دورتك الآن
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
