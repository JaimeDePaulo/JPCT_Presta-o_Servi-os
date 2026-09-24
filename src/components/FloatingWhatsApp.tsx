import React from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { openWhatsApp } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip on hover */}
      <div className="hidden sm:flex items-center mr-3 px-3.5 py-1.5 bg-[#063B7A] text-white text-xs font-semibold rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
        Pedir Orçamento via WhatsApp: +244 942 778 643
        <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#063B7A] rotate-45"></div>
      </div>

      <button
        onClick={() => openWhatsApp('Olá JPCT! Gostaria de consultar preços e pedir um orçamento.')}
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300/50 cursor-pointer"
        aria-label="Pedir orçamento no WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="font-bold text-sm tracking-wide pr-1">Pedir Orçamento</span>
      </button>
    </div>
  );
};
