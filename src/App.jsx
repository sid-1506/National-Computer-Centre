import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AllCourses from './components/AllCourses';
import CourseDetail from './components/CourseDetail';

export default function App() {
  // Lenis smooth scroll synced with GSAP
  useSmoothScroll();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('MS-CIT');

  const handleOpenModal = (courseName = 'MS-CIT') => {
    setSelectedCourse(courseName);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen bg-[#EFEDE8] text-[#111111] font-sans antialiased selection:bg-primary selection:text-white flex flex-col justify-between">
        {/* 00. Fixed Swiss Minimal Nav with Responsive Logo Lockup */}
        <Navbar onOpenModal={handleOpenModal} />

        {/* Dynamic Route Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onOpenModal={handleOpenModal} />} />
            <Route path="/courses" element={<AllCourses onOpenModal={handleOpenModal} />} />
            <Route path="/courses/:slug" element={<CourseDetail onOpenModal={handleOpenModal} />} />
            <Route path="/about" element={<AboutPage onOpenModal={handleOpenModal} />} />
            <Route path="/contact" element={<ContactPage onOpenModal={handleOpenModal} />} />
          </Routes>
        </div>

        {/* 11. Footer */}
        <Footer onOpenModal={handleOpenModal} />

        {/* Quick Booking Modal */}
        <EnquiryModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          defaultCourse={selectedCourse}
        />
      </div>
    </BrowserRouter>
  );
}
