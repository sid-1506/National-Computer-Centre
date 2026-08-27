import { Phone, MessageSquare, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/nccData';

export default function MobileActionBar({ onOpenModal }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0C0C0C]/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 shadow-2xl">
      <div className="flex items-center gap-2">
        {/* Call Now */}
        <a
          href="tel:9821115699"
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 px-3 text-xs font-semibold text-white active:bg-white/20 transition-colors"
        >
          <Phone className="h-4 w-4 text-white" />
          <span>Call Centre</span>
        </a>

        {/* WhatsApp */}
        <a
          href={BUSINESS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 px-3 text-xs font-semibold text-white active:bg-primary/90 transition-colors"
        >
          <MessageSquare className="h-4 w-4 text-white" />
          <span>WhatsApp</span>
        </a>

        {/* Free Trial Button */}
        <button
          onClick={onOpenModal}
          className="flex items-center justify-center rounded-xl bg-white text-[#0C0C0C] py-2.5 px-3 text-xs font-bold active:bg-white/90 transition-colors"
          aria-label="Book Free Trial"
        >
          <Sparkles className="h-4 w-4 text-primary" />
        </button>
      </div>
    </div>
  );
}
