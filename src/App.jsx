import { useState } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeBands from './components/MarqueeBands';
import Courses from './components/Courses';
import About from './components/About';
import WhyNCC from './components/WhyNCC';
import Stats from './components/Stats';
import ComboOffer from './components/ComboOffer';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';

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
    <div className="relative min-h-screen bg-[#EFEDE8] text-[#111111] font-sans antialiased selection:bg-[#1B3FAE] selection:text-white">
      {/* 00. Navigation (Fixed Swiss Minimal Nav) */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* Main Single Page Content Sections (Strictly in Spec Order) */}
      <main>
        {/* 01. Hero */}
        <Hero onOpenModal={handleOpenModal} />

        {/* 02. Marquee Ticker */}
        <MarqueeBands />

        {/* 03. Courses */}
        <Courses onOpenModal={handleOpenModal} />

        {/* 04. About */}
        <About onOpenModal={handleOpenModal} />

        {/* 05. Why NCC */}
        <WhyNCC />

        {/* 06. Stats */}
        <Stats />

        {/* 07. Anniversary Offer */}
        <ComboOffer onOpenModal={handleOpenModal} />

        {/* 08. Testimonials */}
        <Testimonials />

        {/* 09. Gallery */}
        <Gallery />

        {/* 10. Contact */}
        <Contact />
      </main>

      {/* 11. Footer */}
      <Footer onOpenModal={handleOpenModal} />

      {/* Booking Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        defaultCourse={selectedCourse}
      />
    </div>
  );
}
