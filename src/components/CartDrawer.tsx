import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Tag,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    formatKz,
    setIsCheckoutOpen,
    setCurrentView,
  } = useStore();

  if (!isCartDrawerOpen) return null;

  const discount = cartSubtotal > 50000 ? 2500 : 0;
  const estimatedDelivery = cartSubtotal > 0 ? 1500 : 0;
  const total = cartSubtotal - discount + estimatedDelivery;

  const handleProceedToCheckout = () => {
    setIsCartDrawerOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#F5F7FA]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0B5ED7]" />
              <h2 className="text-lg font-extrabold text-[#063B7A]">
                O Seu Carrinho
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#EAF4FF] text-[#0B5ED7] font-bold">
                {cart.reduce((a, b) => a + b.quantity, 0)} itens
              </span>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EAF4FF] text-[#0B5ED7] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">O carrinho está vazio</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore os nossos produtos em papelaria, livros, escritório e bens alimentares no Lubango.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCurrentView('shop');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#0B5ED7] text-white text-xs font-bold shadow-md hover:bg-[#063B7A] transition"
                >
                  Começar a comprar
                </button>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.product.id} className="pt-4 flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-50"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-2 pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 rounded-md transition"
                          title="Remover produto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {formatKz(item.product.price)} cada
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-slate-200 text-slate-600 transition"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-slate-200 text-slate-600 transition"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-extrabold text-[#0B5ED7]">
                          {formatKz(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 flex justify-between items-center text-xs">
                  <button
                    onClick={clearCart}
                    className="text-slate-400 hover:text-rose-600 flex items-center gap-1 transition"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Esvaziar carrinho</span>
                  </button>
                  <span className="text-slate-400">Preços em Kwanzas (Kz)</span>
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-[#F5F7FA] space-y-4">
              {/* Financial summary */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-800">{formatKz(cartSubtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Desconto Lubango Especial
                    </span>
                    <span>-{formatKz(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Entrega Estimada (Lubango)</span>
                  <span className="font-bold text-slate-800">{formatKz(estimatedDelivery)}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm sm:text-base font-extrabold text-[#063B7A]">
                  <span>Total Previsto</span>
                  <span className="text-[#0B5ED7]">{formatKz(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 rounded-xl bg-[#0B5ED7] hover:bg-[#063B7A] text-white font-bold text-sm shadow-xl hover:shadow-2xl transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Finalizar pedido</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Compra Segura • Pagamento no acto ou via Express</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
