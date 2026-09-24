import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import {
  SlidersHorizontal,
  ArrowUpDown,
  Filter,
  X,
  Check,
  Search,
  Sparkles,
  ShoppingBag,
  MessageCircle,
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    categories,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    searchQuery,
    setSearchQuery,
    openWhatsApp,
  } = useStore();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>('recent');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyPromos, setOnlyPromos] = useState<boolean>(false);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)));
    return ['all', ...list];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategoryFilter !== 'all' && p.category !== selectedCategoryFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q);
        if (!match) return false;
      }
      // In stock
      if (onlyInStock && !p.inStock) return false;
      // Promos
      if (onlyPromos && (!p.discountPercentage || p.discountPercentage <= 0)) return false;
      // Brand
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
      // Rating
      if (minRating > 0 && p.rating < minRating) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'bestseller') return (b.badge === 'Mais vendido' ? 1 : 0) - (a.badge === 'Mais vendido' ? 1 : 0);
      return 0; // 'recent'
    });
  }, [
    products,
    selectedCategoryFilter,
    searchQuery,
    onlyInStock,
    onlyPromos,
    selectedBrand,
    minRating,
    sortBy,
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSelectedCategoryFilter('all');
    setSearchQuery('');
    setOnlyInStock(false);
    setOnlyPromos(false);
    setSelectedBrand('all');
    setMinRating(0);
    setSortBy('recent');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedCategoryFilter !== 'all' ||
    searchQuery !== '' ||
    onlyInStock ||
    onlyPromos ||
    selectedBrand !== 'all' ||
    minRating > 0;

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Banner / Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B5ED7] uppercase tracking-wider mb-1">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Loja JPCT Lubango</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#063B7A]">
              Catálogo Completo de Produtos
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Produtos seleccionados com entrega rápida no município do Lubango e província da Huíla.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              Produtos encontrados: <strong className="text-[#0B5ED7]">{filteredProducts.length}</strong>
            </span>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B5ED7] text-white text-xs font-bold"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filtros</span>
            </button>
          </div>
        </div>

        {/* Layout: Sidebar + Main Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* SIDEBAR FILTERS (Desktop & Mobile Drawer) */}
          <aside
            className={`lg:block ${
              mobileFilterOpen
                ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto'
                : 'hidden'
            } lg:relative lg:inset-auto lg:z-auto lg:p-0 lg:bg-transparent`}
          >
            {mobileFilterOpen && (
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 lg:hidden">
                <h3 className="font-extrabold text-lg text-[#063B7A]">Filtros</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            )}

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-[#0B5ED7]" />
                  <span>Filtrar Resultados</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-rose-600 hover:underline font-semibold"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
                  Categorias
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategoryFilter('all');
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                      selectedCategoryFilter === 'all'
                        ? 'bg-[#EAF4FF] text-[#0B5ED7] font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>Todas as categorias</span>
                    <span className="text-[10px] text-slate-400">({products.length})</span>
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategoryFilter(cat.id);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                        selectedCategoryFilter === cat.id
                          ? 'bg-[#EAF4FF] text-[#0B5ED7] font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] text-slate-400">
                        ({products.filter((p) => p.category === cat.id).length})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quotation & Price Consultation Notice */}
              <div className="pt-4 border-t border-slate-100">
                <div className="p-3.5 rounded-2xl bg-[#EAF4FF] border border-blue-200/70 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#063B7A]">
                    <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Preços Sob Consulta</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Solicite orçamentos rápidos e cotações personalizadas para qualquer artigo via WhatsApp oficial:
                  </p>
                  <button
                    type="button"
                    onClick={() => openWhatsApp('Olá JPCT! Gostaria de pedir um orçamento geral para alguns artigos da vossa loja.')}
                    className="w-full py-2 px-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
                  >
                    <span>WhatsApp: 942 778 643</span>
                  </button>
                </div>
              </div>

              {/* Availability & Promo Toggles */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => {
                      setOnlyInStock(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="w-4 h-4 rounded text-[#0B5ED7] focus:ring-blue-400 accent-[#0B5ED7]"
                  />
                  <span>Apenas em stock</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={onlyPromos}
                    onChange={(e) => {
                      setOnlyPromos(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="w-4 h-4 rounded text-[#0B5ED7] focus:ring-blue-400 accent-[#0B5ED7]"
                  />
                  <span>Com desconto / Promoção</span>
                </label>
              </div>

              {/* Brands Filter */}
              <div className="pt-4 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Marca
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-[#0B5ED7]"
                >
                  <option value="all">Todas as marcas</option>
                  {brands.filter((b) => b !== 'all').map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Min Rating */}
              <div className="pt-4 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Avaliação Mínima
                </label>
                <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                  {[0, 4, 4.5, 4.8].map((star) => (
                    <button
                      key={star}
                      onClick={() => {
                        setMinRating(star);
                        setCurrentPage(1);
                      }}
                      className={`p-1.5 rounded-lg font-bold border transition ${
                        minRating === star
                          ? 'bg-[#0B5ED7] text-white border-[#0B5ED7]'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {star === 0 ? 'Todas' : `${star}★`}
                    </button>
                  ))}
                </div>
              </div>

              {mobileFilterOpen && (
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 rounded-xl bg-[#0B5ED7] text-white font-bold text-xs shadow-md mt-4"
                >
                  Aplicar Filtros ({filteredProducts.length})
                </button>
              )}
            </div>
          </aside>

          {/* MAIN PRODUCT AREA */}
          <main className="lg:col-span-3 space-y-6">
            {/* Sorting bar & Active filter tags */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-700">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-semibold p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:border-[#0B5ED7] cursor-pointer"
                >
                  <option value="recent">Mais recentes</option>
                  <option value="bestseller">Mais procurados</option>
                  <option value="rating">Melhor avaliados</option>
                </select>
              </div>

              {hasActiveFilters && (
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="text-slate-400 font-medium">Filtros:</span>
                  {selectedCategoryFilter !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EAF4FF] text-[#0B5ED7] font-semibold">
                      {categories.find((c) => c.id === selectedCategoryFilter)?.name}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSelectedCategoryFilter('all')}
                      />
                    </span>
                  )}
                  {onlyPromos && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 font-semibold">
                      Promoções
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setOnlyPromos(false)}
                      />
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                      &quot;{searchQuery}&quot;
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSearchQuery('')}
                      />
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Products Grid (4 on desktop, 2 on tablet, 1-2 on mobile) */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">
                  Nenhum produto encontrado
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Não encontramos artigos correspondentes aos critérios seleccionados. Tente ajustar os filtros ou pesquisar outro termo.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-[#0B5ED7] text-white text-xs font-bold hover:bg-[#063B7A] transition"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold disabled:opacity-40 hover:bg-slate-50 transition"
                >
                  Anterior
                </button>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition ${
                      currentPage === i + 1
                        ? 'bg-[#0B5ED7] text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold disabled:opacity-40 hover:bg-slate-50 transition"
                >
                  Seguinte
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
