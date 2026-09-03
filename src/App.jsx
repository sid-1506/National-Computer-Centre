import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AllCourses from './components/AllCourses';
import OnlineCourses from './components/OnlineCourses';
import CourseDetail from './components/CourseDetail';

export default function App() {
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
      {/* Route change scroll-to-top handler */}
      <ScrollToTop />
      
      <div className="relative min-h-screen bg-white text-[#0F172A] font-sans antialiased flex flex-col justify-between overflow-x-hidden">
        {/* Sticky Navbar */}
        <Navbar onOpenModal={handleOpenModal} />

        {/* Dynamic Route Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onOpenModal={handleOpenModal} />} />
            <Route path="/courses" element={<AllCourses onOpenModal={handleOpenModal} />} />
            <Route path="/courses/:slug" element={<CourseDetail onOpenModal={handleOpenModal} />} />
            <Route path="/online-courses" element={<OnlineCourses onOpenModal={handleOpenModal} />} />
            <Route path="/online-courses/:slug" element={<CourseDetail onOpenModal={handleOpenModal} isOnline={true} />} />
            <Route path="/contact" element={<ContactPage onOpenModal={handleOpenModal} />} />
          </Routes>
        </div>

        {/* Footer */}
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
