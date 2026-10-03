import React, { useState, useEffect } from 'react';
import {
  INITIAL_SITE_DATA,
  CenterSiteData,
  CourseItem,
  TestimonialItem,
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { CoursesSection } from './components/CoursesSection';
import { CourseDetailModal } from './components/CourseDetailModal';
import { TrainersSection } from './components/TrainersSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CtaBanner } from './components/CtaBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminContentModal } from './components/AdminContentModal';

const STORAGE_KEY = 'american_training_center_aswan_data_v1';

export default function App() {
  const [siteData, setSiteData] = useState<CenterSiteData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback to initial verified data
    }
    return INITIAL_SITE_DATA;
  });

  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [preselectedCourseForBooking, setPreselectedCourseForBooking] = useState<string>('');
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
    } catch {
      // Ignore storage quota errors
    }
  }, [siteData]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookNow = (courseTitle?: string) => {
    if (courseTitle) {
      setPreselectedCourseForBooking(courseTitle);
    }
    scrollToSection('contact');
  };

  const handleSaveSingleCourse = (updatedCourse: CourseItem) => {
    setSiteData((prev) => ({
      ...prev,
      courses: prev.courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)),
    }));
    setSelectedCourse(updatedCourse);
  };

  const handleAddTestimonial = (newItem: TestimonialItem) => {
    setSiteData((prev) => ({
      ...prev,
      testimonials: [newItem, ...prev.testimonials],
    }));
  };

  const handleUpdateMapQuery = (newQuery: string) => {
    setSiteData((prev) => ({
      ...prev,
      mapEmbedQuery: newQuery,
    }));
  };

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0A192F]">
      {/* Sticky Top Bar */}
      <Navbar
        businessName={siteData.businessName}
        onBookClick={() => handleBookNow()}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onBookClick={() => handleBookNow()}
          onContactClick={() => scrollToSection('contact')}
          address={siteData.address}
          openingHours={siteData.openingHours}
          phone={siteData.phone}
        />

        {/* About Section */}
        <AboutSection
          about={siteData.about}
          address={siteData.address}
          onOpenAdminEditor={() => setAdminModalOpen(true)}
        />

        {/* Why Choose Us Section */}
        <WhyChooseUsSection />

        {/* Courses Catalog Section */}
        <CoursesSection
          courses={siteData.courses}
          onSelectCourse={(course) => setSelectedCourse(course)}
          onBookCourse={(courseTitle) => handleBookNow(courseTitle)}
          onOpenAdminEditor={() => setAdminModalOpen(true)}
        />

        {/* Trainers Section */}
        <TrainersSection
          trainers={siteData.trainers}
          onOpenAdminEditor={() => setAdminModalOpen(true)}
        />

        {/* Testimonials Section */}
        <TestimonialsSection
          testimonials={siteData.testimonials}
          onAddTestimonial={handleAddTestimonial}
          onOpenAdminEditor={() => setAdminModalOpen(true)}
        />

        {/* Call to Action Section */}
        <CtaBanner
          onBookClick={() => handleBookNow()}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* Contact & Google Maps Section */}
        <ContactSection
          businessName={siteData.businessName}
          address={siteData.address}
          phone={siteData.phone}
          whatsappNumber={siteData.whatsappNumber}
          openingHours={siteData.openingHours}
          mapEmbedQuery={siteData.mapEmbedQuery}
          courses={siteData.courses}
          preselectedCourse={preselectedCourseForBooking}
          onUpdateMapQuery={handleUpdateMapQuery}
        />
      </main>

      {/* Footer */}
      <Footer
        businessName={siteData.businessName}
        address={siteData.address}
        phone={siteData.phone}
        whatsappNumber={siteData.whatsappNumber}
        openingHours={siteData.openingHours}
        courses={siteData.courses}
        socialLinks={siteData.socialLinks}
        onNavigateSection={scrollToSection}
        onSelectCourse={(course) => setSelectedCourse(course)}
        onOpenAdminEditor={() => setAdminModalOpen(true)}
      />

      {/* Course Details & Inline Editor Modal */}
      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          phone={siteData.phone}
          onClose={() => setSelectedCourse(null)}
          onBookCourse={(courseTitle) => handleBookNow(courseTitle)}
          onSaveCourse={handleSaveSingleCourse}
        />
      )}

      {/* Center Administration Content Editor Modal */}
      {adminModalOpen && (
        <AdminContentModal
          siteData={siteData}
          onSaveSiteData={(newData) => setSiteData(newData)}
          onClose={() => setAdminModalOpen(false)}
        />
      )}
    </div>
  );
}
