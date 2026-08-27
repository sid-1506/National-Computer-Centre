import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import About from '../components/About';
import WhyNCC from '../components/WhyNCC';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import ComboOffer from '../components/ComboOffer';

export default function AboutPage({ onOpenModal }) {
  useEffect(() => {
    document.title = 'About Us — 28 Years of Practical IT Education | National Computer Centre Mulund West';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Learn the story of National Computer Centre, established on 15 August 1998 in Mulund West. Over 35,000+ students trained with 1-on-1 practical computer terminal methodology.';
  }, []);

  return (
    <div className="bg-[#EFEDE8] text-[#111111] min-h-screen">
      <main>
        {/* 01. About Legacy & Founder Block */}
        <About onOpenModal={onOpenModal} />

        {/* 02. Why NCC */}
        <WhyNCC />

        {/* 03. Photo Gallery */}
        <Gallery />

        {/* 04. Student Testimonials */}
        <Testimonials />

        {/* 05. Anniversary Offer */}
        <ComboOffer onOpenModal={onOpenModal} />
      </main>
    </div>
  );
}
