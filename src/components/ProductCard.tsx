import React from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { Star, Eye, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const {
    requestQuoteOnWhatsApp,
    setSelectedProductId,
    setQuickViewProduct,
  } = useStore();

  const handleOpenDetail = () => {
    setSelectedProductId(product.id);
    setQuickViewProduct(product);
  };

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'Promoção':
        return 'bg-emerald-600 text-white';
      case 'Novo':
        return 'bg-[#0B5ED7] text-white';
      case 'Mais vendido':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-slate-800 text-white';
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Top Image area */}
      <div className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer" onClick={handleOpenDetail}>
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay gradient for image protection */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

        {/* Badges Left Top */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm ${getBadgeStyle(
                product.badge
              )}`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Top Right Quick view Action */}
        <div className="absolute top-3 right-3 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenDetail();
            }}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-[#0B5ED7] flex items-center justify-center transition shadow-md backdrop-blur-md cursor-pointer"
            title="Ver detalhes"
            aria-label="Ver detalhes"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Stock warning if low */}
        {product.stockQuantity < 10 && product.stockQuantity > 0 && (
          <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-amber-500/90 backdrop-blur-xs text-white text-[10px] font-bold rounded-lg text-center">
            Apenas {product.stockQuantity} un. em stock no Lubango
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className={`p-4 flex-1 flex flex-col justify-between ${compact ? 'p-3' : 'p-4'}`}>
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-semibold text-[#0B5ED7] uppercase tracking-wider">
              {product.categoryName}
            </span>

            <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-[10px] font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={handleOpenDetail}
            className="font-bold text-slate-800 hover:text-[#0B5ED7] transition-colors text-sm sm:text-base line-clamp-2 leading-snug cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
            Marca: <span className="text-slate-600 font-medium">{product.brand}</span> • Cód: {product.code}
          </p>
        </div>

        {/* Quote & Consult Price button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Preço
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-[#063B7A]">
              Sob Consulta
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              requestQuoteOnWhatsApp(product, 1);
            }}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer shrink-0"
            title="Pedir Orçamento no WhatsApp: +244 942 778 643"
            aria-label="Pedir Orçamento no WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Pedir Orçamento</span>
          </button>
        </div>
      </div>
    </div>
  );
};
