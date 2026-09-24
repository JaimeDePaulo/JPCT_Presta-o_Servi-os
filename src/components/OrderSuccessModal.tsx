import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  CheckCircle2,
  Package,
  MessageCircle,
  ArrowRight,
  ShoppingBag,
  MapPin,
  Calendar,
} from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const {
    isSuccessModalOpen,
    setIsSuccessModalOpen,
    latestOrder,
    formatKz,
    setCurrentView,
    openWhatsApp,
  } = useStore();

  if (!isSuccessModalOpen || !latestOrder) return null;

  const handleTrackOrder = () => {
    setIsSuccessModalOpen(false);
    setCurrentView('account');
  };

  const handleContinueShopping = () => {
    setIsSuccessModalOpen(false);
    setCurrentView('shop');
  };

  const handleSendToWhatsApp = () => {
    const msg = `Olá JPCT! Acabei de efectuar o pedido de compra ${latestOrder.id} no valor de ${formatKz(
      latestOrder.total
    )} em nome de ${latestOrder.customer.fullName}. Gostaria de confirmar e acompanhar a entrega no Lubango.`;
    openWhatsApp(msg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 p-6 sm:p-8 text-center space-y-6">
        {/* Animated Celebration Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#0B5ED7] bg-[#EAF4FF] px-3 py-1 rounded-full">
            Pedido Registado
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#063B7A] mt-2">
            Pedido realizado com sucesso! 🎉
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Muito obrigado pela sua preferência na JPCT – Prestação de Serviços, Lda.
          </p>
        </div>

        {/* Order Details Badge Card */}
        <div className="bg-[#F5F7FA] rounded-2xl p-5 border border-slate-200 text-left space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="text-xs text-slate-500 font-medium">Número do pedido:</span>
            <span className="text-base font-extrabold text-[#0B5ED7] font-mono">
              {latestOrder.id}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Data:
            </span>
            <span className="font-semibold text-slate-700">
              {new Date(latestOrder.createdAt).toLocaleDateString('pt-AO')}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Destino:
            </span>
            <span className="font-semibold text-slate-700 truncate max-w-[200px]">
              {latestOrder.customer.neighborhood}, Lubango
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 flex items-center gap-1">
              <Package className="w-3.5 h-3.5" /> Itens:
            </span>
            <span className="font-semibold text-slate-700">
              {latestOrder.items.reduce((a, b) => a + b.quantity, 0)} produtos
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 pt-2 font-bold text-sm">
            <span className="text-slate-800">Total a Pagar:</span>
            <span className="text-[#0B5ED7] text-base">{formatKz(latestOrder.total)}</span>
          </div>
        </div>

        {/* WhatsApp Notification Action */}
        <button
          onClick={handleSendToWhatsApp}
          className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>Enviar comprovativo / Falar no WhatsApp</span>
        </button>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleTrackOrder}
            className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center justify-center gap-1.5"
          >
            <span>Acompanhar pedido</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleContinueShopping}
            className="py-3 px-4 rounded-xl bg-[#0B5ED7] hover:bg-[#063B7A] text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Continuar a comprar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
