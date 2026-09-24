import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Share2,
  Check,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageCircle,
} from 'lucide-react';
import { ProductCard } from './ProductCard';

export const ProductDetailModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    setSelectedProductId,
    requestQuoteOnWhatsApp,
    products,
    showToast,
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'delivery'>('description');

  if (!quickViewProduct) return null;

  const handleClose = () => {
    setQuickViewProduct(null);
    setSelectedProductId(null);
    setQuantity(1);
    setActiveImageIndex(0);
  };

  const handleRequestQuoteWhatsApp = () => {
    requestQuoteOnWhatsApp(quickViewProduct, quantity);
    handleClose();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      showToast('Link Copiado', 'Link do produto copiado para a área de transferência.', 'success');
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    const text = `Olá! Veja este artigo no catálogo da JPCT no Lubango: ${quickViewProduct.name} (Ref: ${quickViewProduct.code}) - Solicite cotação e disponibilidade via WhatsApp: +244 942 778 643`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === quickViewProduct.category && p.id !== quickViewProduct.id)
    .slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-slate-200 my-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition shadow-xs"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {quickViewProduct.badge && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#0B5ED7] text-white shadow-md">
                    {quickViewProduct.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex items-center gap-3">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                      activeImageIndex === idx ? 'border-[#0B5ED7] ring-2 ring-blue-100' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Miniatura" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Badges below image */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-slate-600">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center">
                <Truck className="w-4 h-4 text-[#0B5ED7] mb-1" />
                <span>Lubango & Huíla</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
                <span>Garantia JPCT</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-blue-600 mb-1" />
                <span>Troca Rápida</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category, SKU & Brand */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#EAF4FF] text-[#0B5ED7] text-xs font-bold uppercase tracking-wider">
                  {quickViewProduct.categoryName}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Ref: {quickViewProduct.code}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#063B7A] tracking-tight mt-2">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-center gap-3 mt-2 text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{quickViewProduct.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({quickViewProduct.reviewsCount} avaliações)</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">Marca: <strong className="text-slate-700">{quickViewProduct.brand}</strong></span>
              </div>

              {/* Price & Quote Consultation box */}
              <div className="mt-4 p-4 rounded-2xl bg-[#EAF4FF]/70 border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0B5ED7] uppercase tracking-wider">Preço & Cotação</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#063B7A] text-[10px] font-extrabold">Sob Consulta</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-[#063B7A] mt-1">
                    Pedir Orçamento
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Preços actualizados e condições especiais para empresas e particulares.
                  </p>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    quickViewProduct.inStock
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${quickViewProduct.inStock ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                    <span>{quickViewProduct.inStock ? 'Em stock no Lubango' : 'Sob encomenda'}</span>
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {quickViewProduct.stockQuantity} unidades disponíveis
                  </p>
                </div>
              </div>

              {/* Tabs: Description / Specifications / Delivery */}
              <div className="mt-5">
                <div className="flex border-b border-slate-200 text-xs font-bold gap-4">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`pb-2.5 transition border-b-2 ${
                      activeTab === 'description'
                        ? 'border-[#0B5ED7] text-[#0B5ED7]'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Descrição
                  </button>
                  <button
                    onClick={() => setActiveTab('specifications')}
                    className={`pb-2.5 transition border-b-2 ${
                      activeTab === 'specifications'
                        ? 'border-[#0B5ED7] text-[#0B5ED7]'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Especificações
                  </button>
                  <button
                    onClick={() => setActiveTab('delivery')}
                    className={`pb-2.5 transition border-b-2 ${
                      activeTab === 'delivery'
                        ? 'border-[#0B5ED7] text-[#0B5ED7]'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Entrega & Levantamento
                  </button>
                </div>

                <div className="pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-h-44 overflow-y-auto pr-1">
                  {activeTab === 'description' && (
                    <div className="space-y-3">
                      <p>{quickViewProduct.description}</p>
                      {quickViewProduct.features && (
                        <ul className="space-y-1 mt-2">
                          {quickViewProduct.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-700">
                              <Check className="w-4 h-4 text-[#0B5ED7] shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {activeTab === 'specifications' && (
                    <div className="divide-y divide-slate-100">
                      {quickViewProduct.specifications.map((spec, i) => (
                        <div key={i} className="py-1.5 flex justify-between">
                          <span className="text-slate-500 font-medium">{spec.label}</span>
                          <span className="text-slate-800 font-bold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'delivery' && (
                    <div className="space-y-2 text-xs">
                      <p>
                        <strong>Levantamento em Loja:</strong> Grátis na sede da JPCT no Lubango (Bairro Comandante Cow Boy).
                      </p>
                      <p>
                        <strong>Entrega Rápida no Lubango:</strong> 1.500 Kz para residências, empresas e escolas municipais.
                      </p>
                      <p>
                        <strong>Envios para a Huíla e Outras Províncias:</strong> Sob consulta via transportadora ou correio expresso.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions: Quantity + Primary WhatsApp Buy Button */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity selector */}
                <div className="flex items-center justify-between border border-slate-300 rounded-xl overflow-hidden bg-slate-50 px-1 py-0.5 shrink-0">
                  <span className="text-xs text-slate-500 font-semibold px-2 sm:hidden">Qtd:</span>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="px-3.5 py-2 text-slate-700 hover:bg-slate-200 disabled:opacity-40 transition font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-center text-sm font-bold min-w-[36px]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(quickViewProduct.stockQuantity, q + 1))}
                      disabled={quantity >= quickViewProduct.stockQuantity}
                      className="px-3.5 py-2 text-slate-700 hover:bg-slate-200 disabled:opacity-40 transition font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Primary WhatsApp Quote Button */}
                <button
                  onClick={handleRequestQuoteWhatsApp}
                  className="flex-1 py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
                  title="Pedir Orçamento no WhatsApp: +244 942 778 643"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Pedir Orçamento via WhatsApp</span>
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition shrink-0 flex items-center justify-center cursor-pointer"
                  title="Copiar Link"
                  aria-label="Copiar Link"
                >
                  {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
                </button>
              </div>

              {/* Security & Order info */}
              <div className="rounded-xl bg-[#EAF4FF] p-3 text-xs text-[#063B7A] flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#0B5ED7] shrink-0" />
                <span>
                  Cotações rápidas e atendimento comercial via WhatsApp: <strong>+244 942 778 643</strong>. Fornecimento para particulares, escolas e empresas no Lubango e Huíla.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Footer */}
        {relatedProducts.length > 0 && (
          <div className="bg-[#F5F7FA] p-6 sm:p-8 border-t border-slate-200">
            <h3 className="font-bold text-lg text-[#063B7A] mb-4">
              Produtos Relacionados
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedProducts.map((rel) => (
                <div key={rel.id} onClick={handleClose}>
                  <ProductCard product={rel} compact />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
