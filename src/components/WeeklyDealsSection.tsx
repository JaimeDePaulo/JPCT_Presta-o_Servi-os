import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Clock, Flame, ArrowRight, Percent } from 'lucide-react';

export const WeeklyDealsSection: React.FC = () => {
  const { products, setCurrentView, setSelectedCategoryFilter } = useStore();

  // Dynamic countdown timer: 2 days, 14 hours, 32 mins, 45 secs from now
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return { days: 2, hours: 14, minutes: 32, seconds: 45 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter((p) => p.weeklyDeal || (p.discountPercentage && p.discountPercentage > 0)).slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-[#063B7A] via-[#0B5ED7] to-[#063B7A] text-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Banner Top Area */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-white/15 mb-12 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                <Flame className="w-3.5 h-3.5" />
                <span>Condições Especiais no Lubango</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Consulte Preços e <span className="text-amber-300">Peça Orçamento</span>
              </h2>

              <p className="text-blue-100 text-sm sm:text-base max-w-xl">
                Obtenha as melhores cotações em resmas de papel A4, cadernos executivos, material de escritório e bens essenciais com atendimento prioritário via WhatsApp.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="flex flex-col items-center shrink-0 space-y-3 bg-black/25 p-5 sm:p-6 rounded-2xl border border-white/20">
              <div className="flex items-center gap-1.5 text-xs text-blue-200 font-semibold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>Termina em:</span>
              </div>

              <div className="flex items-center gap-2 text-center font-mono">
                <div className="bg-white text-[#063B7A] p-2.5 sm:p-3 rounded-xl min-w-[54px]">
                  <span className="text-xl sm:text-2xl font-black block">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-slate-500">Dias</span>
                </div>
                <span className="text-xl font-bold text-amber-300">:</span>

                <div className="bg-white text-[#063B7A] p-2.5 sm:p-3 rounded-xl min-w-[54px]">
                  <span className="text-xl sm:text-2xl font-black block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-slate-500">Horas</span>
                </div>
                <span className="text-xl font-bold text-amber-300">:</span>

                <div className="bg-white text-[#063B7A] p-2.5 sm:p-3 rounded-xl min-w-[54px]">
                  <span className="text-xl sm:text-2xl font-black block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-slate-500">Min</span>
                </div>
                <span className="text-xl font-bold text-amber-300">:</span>

                <div className="bg-white text-[#063B7A] p-2.5 sm:p-3 rounded-xl min-w-[54px]">
                  <span className="text-xl sm:text-2xl font-black block text-rose-600">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-slate-500">Seg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Cards Grid (Product cards rendered with custom styling container) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.map((product) => (
            <div key={product.id} className="text-slate-900">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setSelectedCategoryFilter('all');
              setCurrentView('shop');
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 px-8 py-4 rounded-xl font-black text-sm tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Percent className="w-4 h-4 text-slate-900" />
            <span>Consultar Todas as Cotações</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
