import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Tag, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';

export const SearchBar: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    setCurrentView,
    setQuickViewProduct,
    setSelectedProductId,
    formatKz,
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const quickPills = [
    { label: 'Cadernos A4', query: 'caderno' },
    { label: 'Papel A4 Chamex', query: 'papel a4' },
    { label: 'Sementes de Milho', query: 'milho' },
    { label: 'Livros & Dicionários', query: 'dicionario' },
    { label: 'Recargas Unitel', query: 'recarga' },
    { label: 'Bolas de Futebol', query: 'bola' },
    { label: 'Fertilizantes NPK', query: 'fertilizante' },
  ];

  // Perform search across name, categoryName, code, brand, description
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      setFilteredResults([]);
      return;
    }

    const matches = products.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(q);
      const categoryMatch = p.categoryName.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const codeMatch = p.code.toLowerCase().includes(q);
      const brandMatch = p.brand.toLowerCase().includes(q);
      const descMatch = p.description.toLowerCase().includes(q);
      return nameMatch || categoryMatch || codeMatch || brandMatch || descMatch;
    });

    setFilteredResults(matches.slice(0, 6));
  }, [searchQuery, products]);

  // Click outside to close results dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    setCurrentView('shop');
  };

  const handleSelectProduct = (product: Product) => {
    setIsOpen(false);
    setSelectedProductId(product.id);
    setQuickViewProduct(product);
  };

  const handleSelectPill = (query: string) => {
    setSearchQuery(query);
    setIsOpen(true);
  };

  return (
    <section className="relative -mt-7 z-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto" ref={containerRef}>
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/90 p-3 sm:p-4 transition-all duration-300 hover:shadow-2xl">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2 sm:gap-3">
            <div className="pl-3 sm:pl-4 text-[#0B5ED7]">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <input
              id="main-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="O que está à procura? Ex: Livros, Papel A4, Sementes, Recargas..."
              className="w-full py-2.5 sm:py-3.5 text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none font-medium bg-transparent"
              autoComplete="off"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setFilteredResults([]);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition mr-2 cursor-pointer"
                aria-label="Limpar pesquisa"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Quick search pills */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
            <span className="text-slate-400 font-semibold shrink-0 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#0B5ED7]" />
              <span>Sugestões:</span>
            </span>
            <div className="flex items-center gap-1.5 shrink-0 flex-nowrap">
              {quickPills.map((pill) => (
                <button
                  key={pill.label}
                  type="button"
                  onClick={() => handleSelectPill(pill.query)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#EAF4FF] text-slate-600 hover:text-[#0B5ED7] font-medium transition cursor-pointer"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Search Results Dropdown */}
        {isOpen && searchQuery.trim().length > 0 && (
          <div className="absolute left-4 right-4 sm:left-0 sm:right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-30 animate-in fade-in-50 slide-in-from-top-2">
            <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Resultados rápidos para: &quot;{searchQuery}&quot;</span>
              <span>{filteredResults.length} produtos encontrados</span>
            </div>

            {filteredResults.length > 0 ? (
              <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                {filteredResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="p-3 sm:p-4 hover:bg-[#EAF4FF]/40 cursor-pointer flex items-center justify-between gap-4 transition"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B5ED7] bg-[#EAF4FF] px-1.5 py-0.5 rounded">
                            {product.categoryName}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Cód: {product.code}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mt-0.5">
                          {product.name}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1">{product.brand}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-sm font-extrabold text-[#0B5ED7]">
                        {formatKz(product.price)}
                      </p>
                      {product.originalPrice && (
                        <p className="text-[11px] text-slate-400 line-through">
                          {formatKz(product.originalPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setCurrentView('shop');
                  }}
                  className="w-full p-3 text-center bg-slate-50 hover:bg-blue-50 text-xs font-bold text-[#0B5ED7] transition flex items-center justify-center gap-1.5"
                >
                  <span>Ver todos os resultados na loja</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 space-y-2">
                <p className="text-sm font-medium">Nenhum produto encontrado para &quot;{searchQuery}&quot;.</p>
                <p className="text-xs text-slate-400">
                  Tente pesquisar por categorias como Livros, Papelaria, Agricultura ou Bens Alimentares.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
