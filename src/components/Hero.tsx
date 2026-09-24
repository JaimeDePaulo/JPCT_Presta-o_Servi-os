import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Package,
  BookOpen,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  MessageCircle,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { setCurrentView } = useStore();

  const trustBadges = [
    'Produtos seleccionados',
    'Atendimento no WhatsApp: 942 778 643',
    'Comércio local no Lubango',
    'Compra rápida e sem complicações',
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF4FF]/60 via-white to-[#F5F7FA] pt-8 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-200/60">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-sky-300/15 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF4FF] border border-blue-200/80 text-[#0B5ED7] text-xs font-bold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0B5ED7] animate-pulse"></span>
              <span>JPCT – PRESTAÇÃO DE SERVIÇOS, LDA • LUBANGO, HUÍLA</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#063B7A] tracking-tight leading-[1.12]">
              Tudo o que precisa, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#0B5ED7] via-[#1677FF] to-[#063B7A] bg-clip-text text-transparent">
                num só lugar.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#475569] max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Encontre livros, papelaria, material de escritório, produtos alimentares e muito mais na JPCT. Atendimento de excelência e comércio seguro no Lubango.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setCurrentView('shop')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#0B5ED7] hover:bg-[#063B7A] text-white font-bold text-base shadow-lg shadow-blue-600/25 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Explorar produtos</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href="https://wa.me/244942778643?text=Ol%C3%A1%20JPCT!%20Gostaria%20de%20pedir%20um%20or%C3%A7amento%20ou%20consultar%20pre%C3%A7os."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-base shadow-lg shadow-emerald-600/25 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Pedir Orçamento no WhatsApp</span>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="pt-6 border-t border-slate-200/80">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0">
                {trustBadges.map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#0B5ED7] shrink-0" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition with Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Card */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 relative group aspect-4/3 sm:aspect-square">
                <img
                  src="/images/jpct_office_desk_1790249696423.jpg"
                  alt="JPCT Lubango Mobiliário Escritório e Papelaria"
                  className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063B7A]/90 via-[#063B7A]/20 to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/80 backdrop-blur-md text-xs font-bold text-white">
                    <Package className="w-3.5 h-3.5" />
                    <span>Mobiliário, Informática & Papelaria</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                    Equipamentos e materiais completos no Lubango.
                  </h3>
                  <p className="text-xs text-blue-100 font-light">
                    Carteiras escolares, secretárias, armários de arquivo, impressoras HP e consumíveis com cotação direta.
                  </p>
                </div>
              </div>

              {/* Floating Pill Card 1: Books & Stationery */}
              <div className="absolute -top-6 -left-6 sm:-left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce [animation-duration:4s]">
                <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#0B5ED7] flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Livros & Papelaria</p>
                  <p className="text-[11px] text-slate-500">Cadernos, resmas e manuais</p>
                </div>
              </div>

              {/* Floating Pill Card 2: Local Delivery in Lubango */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-extrabold text-slate-900">Lubango Express</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <p className="text-[11px] text-slate-500">Entrega rápida ou levantamento</p>
                </div>
              </div>

              {/* Small Stats Tag */}
              <div className="absolute top-1/2 -right-4 bg-[#063B7A] text-white p-2.5 rounded-xl shadow-lg border border-blue-400/30 hidden sm:flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold">+100 Produtos Disponíveis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
