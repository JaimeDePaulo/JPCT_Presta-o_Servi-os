import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export const FeaturedProductsSection: React.FC = () => {
  const { products, setCurrentView } = useStore();
  const [activeTab, setActiveTab] = useState<'all' | 'papelaria' | 'escritorio' | 'agricultura' | 'livros'>('all');

  const featuredList = products.filter((p) => p.featured || p.badge);

  const filtered = activeTab === 'all'
    ? featuredList.slice(0, 8)
    : featuredList.filter((p) => p.category === activeTab).slice(0, 8);

  return (
    <section className="py-16 sm:py-20 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF4FF] text-[#0B5ED7] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Seleccionados para si</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#063B7A] tracking-tight">
              Produtos em destaque
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-1.5">
              Os itens mais procurados e recomendados para a sua empresa, escola ou lar.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'papelaria', label: 'Papelaria' },
              { id: 'escritorio', label: 'Escritório' },
              { id: 'livros', label: 'Livros' },
              { id: 'agricultura', label: 'Agricultura' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#0B5ED7] text-white shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid (4 columns desktop, 2 tablet, 1-2 mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-white hover:bg-[#EAF4FF] text-[#063B7A] hover:text-[#0B5ED7] font-bold text-sm border-2 border-blue-200/80 hover:border-[#0B5ED7] shadow-sm transition-all duration-200 cursor-pointer"
          >
            <span>Ver todo o catálogo da loja</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
