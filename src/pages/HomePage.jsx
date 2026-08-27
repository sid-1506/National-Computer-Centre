import { useEffect } from 'react';
import Hero from '../components/Hero';
import MarqueeBands from '../components/MarqueeBands';
import FeaturedCourses from '../components/FeaturedCourses';
import FounderSection from '../components/FounderSection';
import Stats from '../components/Stats';
import TrustPhilosophyStrip from '../components/TrustPhilosophyStrip';

export default function HomePage({ onOpenModal }) {
  useEffect(() => {
    document.title = 'Computer Classes in Mulund West | National Computer Centre';
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Govt-recognised computer institute in Mulund West since 1998. MS-CIT, Tally Prime with GST, Advanced Excel, DTP, Python, AI-ML & Full Stack. Book 1-day free trial!';
  }, []);

  return (
    <main>
      {/* 01. Hero with Reduced Typography & Quick Enquiry Form */}
      <Hero onOpenModal={onOpenModal} />

      {/* 02. Marquee Ticker */}
      <MarqueeBands />

      {/* 03. Featured Courses (Curated 6 Tracks + Link to /courses) */}
      <FeaturedCourses />

      {/* 04. Founder & Leadership */}
      <FounderSection sectionNumber="04" />

      {/* 05. Stats / Verified Metrics */}
      <Stats />

      {/* 06. Trust & Philosophy Strip with Links to /about and /contact */}
      <TrustPhilosophyStrip />
    </main>
  );
}
