import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  BookOpen,
  PenTool,
  Briefcase,
  Newspaper,
  ShoppingBag,
  Trophy,
  Smartphone,
  Sprout,
  Armchair,
  Printer,
  ArrowRight,
} from 'lucide-react';

export const CategoriesSection: React.FC = () => {
  const { categories, setCurrentView, setSelectedCategoryFilter } = useStore();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Armchair':
        return <Armchair className="w-6 h-6" />;
      case 'Printer':
        return <Printer className="w-6 h-6" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6" />;
      case 'PenTool':
        return <PenTool className="w-6 h-6" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6" />;
      case 'Newspaper':
        return <Newspaper className="w-6 h-6" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6" />;
      case 'Trophy':
        return <Trophy className="w-6 h-6" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6" />;
      case 'Sprout':
        return <Sprout className="w-6 h-6" />;
      default:
        return <ShoppingBag className="w-6 h-6" />;
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryFilter(categoryId);
    setCurrentView('shop');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B5ED7] mb-2">
              <span className="w-2.5 h-0.5 bg-[#0B5ED7]"></span>
              <span>Comércio Multi-Sectorial no Lubango</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#063B7A] tracking-tight">
              Explore por categoria
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-xl">
              Navegue pelos nossos departamentos especializados e encontre tudo o que necessita com facilidade.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategoryFilter('all');
              setCurrentView('shop');
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0B5ED7] hover:text-[#063B7A] transition group cursor-pointer"
          >
            <span>Ver todo o catálogo</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Categories Grid (8 categories) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative bg-[#F5F7FA] hover:bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Preview with Gradient Overlay */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent"></div>

                {/* Floating Icon Box */}
                <div className="absolute bottom-3 left-4 w-12 h-12 rounded-xl bg-white text-[#0B5ED7] shadow-lg flex items-center justify-center group-hover:bg-[#0B5ED7] group-hover:text-white transition-colors duration-300">
                  {getCategoryIcon(cat.iconName)}
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold">
                  {cat.count} artigos
                </div>
              </div>

              {/* Text content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg text-[#063B7A] group-hover:text-[#0B5ED7] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#0B5ED7] group-hover:text-[#063B7A]">
                  <span>Ver produtos</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
