import { Asterisk } from 'lucide-react';
import { COURSES } from '../data/nccData';

export default function MarqueeBands() {
  const courseNames = COURSES.map((c) => c.name);

  const facts = [
    'GOVERNMENT RECOGNISED',
    'ADMISSIONS OPEN',
    'ONE DAY FREE TRIAL',
    'EST. 15 AUGUST 1998',
    'MULUND WEST, MUMBAI',
    '28 YEARS OF TRUST',
    '1-ON-1 PC TERMINALS',
    'OPENS 07:00 AM',
  ];

  return (
    <section className="w-full bg-[#EFEDE8] border-y border-[#111111]/15 overflow-hidden py-0">
      {/* Strip 1: Course Names scrolling Left */}
      <div className="py-3 border-b border-[#111111]/15 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee-left flex items-center">
          {[...courseNames, ...courseNames, ...courseNames, ...courseNames].map((item, idx) => (
            <div key={idx} className="flex items-center mx-4 sm:mx-6 shrink-0">
              <span className="font-display text-lg sm:text-xl tracking-tight text-[#111111] uppercase">
                {item}
              </span>
              <Asterisk className="w-3.5 h-3.5 ml-4 sm:ml-6 text-[#1B3FAE] shrink-0 stroke-[2.5]" />
            </div>
          ))}
        </div>
      </div>

      {/* Strip 2: Key Facts scrolling Right (Opposite Direction) */}
      <div className="py-3 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee-right flex items-center">
          {[...facts, ...facts, ...facts, ...facts].map((item, idx) => (
            <div key={idx} className="flex items-center mx-4 sm:mx-6 shrink-0">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-[#111111] uppercase">
                {item}
              </span>
              <Asterisk className="w-3.5 h-3.5 ml-4 sm:ml-6 text-[#111111]/30 shrink-0 stroke-[2]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
