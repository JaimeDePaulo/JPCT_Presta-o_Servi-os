import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  User,
  Truck,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Building2,
  Smartphone,
  Banknote,
  Receipt,
} from 'lucide-react';
import { DeliveryMethod, PaymentMethod, CustomerData } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    formatKz,
    createOrder,
    companySettings,
    currentUser,
  } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState<CustomerData>({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '+244 9',
    email: currentUser?.email || '',
    address: currentUser?.address || '',
    neighborhood: currentUser?.neighborhood || 'Bairro Comercial',
    city: 'Lubango',
    province: 'Huíla',
    notes: '',
  });

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('lubango_express');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('multicaixa_express');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen) return null;

  const getDeliveryCost = () => {
    switch (deliveryMethod) {
      case 'lubango_express':
        return 1500;
      case 'store_pickup':
        return 0;
      case 'huila_regional':
        return 3500;
      default:
        return 1500;
    }
  };

  const deliveryCost = getDeliveryCost();
  const discount = cartSubtotal > 50000 ? 2500 : 0;
  const total = cartSubtotal - discount + deliveryCost;

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Por favor indique o seu nome completo.';
    if (!formData.phone.trim() || formData.phone.length < 8) errs.phone = 'Indique um número de telefone válido (ex: 923 000 000).';
    if (!formData.address.trim()) errs.address = 'Indique o endereço no Lubango ou arredores.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    createOrder(formData, deliveryMethod, paymentMethod, deliveryCost, formData.notes);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 my-8">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 bg-[#F5F7FA] flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#063B7A]">
              Finalizar Pedido de Compra
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              JPCT – Prestação de Serviços, Lda. • Lubango, Huíla
            </p>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress bar */}
        <div className="px-6 py-4 bg-white border-b border-slate-100">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 1 ? 'bg-[#0B5ED7] text-white shadow-md' : 'bg-slate-200 text-slate-500'
              }`}>
                1
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${step === 1 ? 'text-[#0B5ED7]' : 'text-slate-500'}`}>
                Cliente
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-[#0B5ED7]' : 'bg-slate-200'}`} />

            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 2 ? 'bg-[#0B5ED7] text-white shadow-md' : 'bg-slate-200 text-slate-500'
              }`}>
                2
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${step === 2 ? 'text-[#0B5ED7]' : 'text-slate-500'}`}>
                Entrega
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? 'bg-[#0B5ED7]' : 'bg-slate-200'}`} />

            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= 3 ? 'bg-[#0B5ED7] text-white shadow-md' : 'bg-slate-200 text-slate-500'
              }`}>
                3
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${step === 3 ? 'text-[#0B5ED7]' : 'text-slate-500'}`}>
                Pagamento
              </span>
            </div>
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: Dados do Cliente */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <User className="w-5 h-5 text-[#0B5ED7]" />
                <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                  1. Identificação e Contacto do Comprador
                </h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Ex: Manuel Domingos"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#0B5ED7] focus:ring-2 focus:ring-blue-100 text-sm outline-none"
                />
                {errors.fullName && <p className="text-rose-600 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Telefone de Contacto (Angola) *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+244 923 000 000"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#0B5ED7] focus:ring-2 focus:ring-blue-100 text-sm outline-none"
                  />
                  {errors.phone && <p className="text-rose-600 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Correio Electrónico (Opcional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="exemplo@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#0B5ED7] focus:ring-2 focus:ring-blue-100 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bairro no Lubango *
                  </label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    placeholder="Ex: Comandante Cow Boy, Comercial, Lage..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#0B5ED7] focus:ring-2 focus:ring-blue-100 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Província e Município
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Lubango, Huíla, Angola"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 text-slate-500 border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Endereço Detalhado / Ponto de Referência *
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Rua, número da casa, empresa ou referência próxima..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:border-[#0B5ED7] focus:ring-2 focus:ring-blue-100 text-sm outline-none"
                />
                {errors.address && <p className="text-rose-600 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>
          )}

          {/* STEP 2: Entrega */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Truck className="w-5 h-5 text-[#0B5ED7]" />
                <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                  2. Método e Local de Entrega
                </h3>
              </div>

              <div className="space-y-3">
                {/* Method 1 */}
                <label
                  onClick={() => setDeliveryMethod('lubango_express')}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition ${
                    deliveryMethod === 'lubango_express'
                      ? 'border-[#0B5ED7] bg-[#EAF4FF]/40 ring-1 ring-[#0B5ED7]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0B5ED7] flex items-center justify-center">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">
                        Entrega Rápida ao Domicílio (Lubango)
                      </h4>
                      <p className="text-xs text-slate-500">
                        Entrega directa no seu escritório, colégio ou residência no município do Lubango.
                      </p>
                    </div>
                  </div>
                  <span className="font-black text-sm text-[#0B5ED7]">1.500 Kz</span>
                </label>

                {/* Method 2 */}
                <label
                  onClick={() => setDeliveryMethod('store_pickup')}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition ${
                    deliveryMethod === 'store_pickup'
                      ? 'border-[#0B5ED7] bg-[#EAF4FF]/40 ring-1 ring-[#0B5ED7]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">
                        Levantamento na Sede da JPCT (Lubango)
                      </h4>
                      <p className="text-xs text-slate-500">
                        {companySettings.address}
                      </p>
                    </div>
                  </div>
                  <span className="font-black text-sm text-emerald-600 uppercase">Grátis</span>
                </label>

                {/* Method 3 */}
                <label
                  onClick={() => setDeliveryMethod('huila_regional')}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition ${
                    deliveryMethod === 'huila_regional'
                      ? 'border-[#0B5ED7] bg-[#EAF4FF]/40 ring-1 ring-[#0B5ED7]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">
                        Envio Regional (Huíla / Humpata / Chibia)
                      </h4>
                      <p className="text-xs text-slate-500">
                        Envio via transportadora local credenciada.
                      </p>
                    </div>
                  </div>
                  <span className="font-black text-sm text-slate-800">3.500 Kz</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Observações para a Entrega
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ex: Entregar até às 16h; ligar antes de chegar..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:border-[#0B5ED7] text-sm outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Pagamento */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <CreditCard className="w-5 h-5 text-[#0B5ED7]" />
                <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                  3. Método de Pagamento em Angola
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Multicaixa Express */}
                <div
                  onClick={() => setPaymentMethod('multicaixa_express')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                    paymentMethod === 'multicaixa_express'
                      ? 'border-[#0B5ED7] bg-[#EAF4FF]/40 ring-1 ring-[#0B5ED7]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-5 h-5 text-[#0B5ED7]" />
                    <h4 className="font-bold text-sm text-slate-800">Multicaixa Express</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Pagamento imediato por aplicação móvel. Envio de comprovativo por WhatsApp.
                  </p>
                </div>

                {/* Transferência Bancária */}
                <div
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-[#0B5ED7] bg-[#EAF4FF]/40 ring-1 ring-[#0B5ED7]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="w-5 h-5 text-[#0B5ED7]" />
                    <h4 className="font-bold text-sm text-slate-800">Transferência Bancária</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Transferência para conta BAI / BFA da JPCT com IBAN angolano.
                  </p>
                </div>

                {/* TPA no Acto */}
                <div
                  onClick={() => setPaymentMethod('tpa')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                    paymentMethod === 'tpa'
                      ? 'border-[#0B5ED7] bg-[#EAF4FF]/40 ring-1 ring-[#0B5ED7]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-5 h-5 text-[#0B5ED7]" />
                    <h4 className="font-bold text-sm text-slate-800">TPA no Acto da Entrega</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Pague com o seu cartão multicaixa no momento da recepção do produto.
                  </p>
                </div>

                {/* Dinheiro Vivo */}
                <div
                  onClick={() => setPaymentMethod('cash_on_delivery')}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition ${
                    paymentMethod === 'cash_on_delivery'
                      ? 'border-[#0B5ED7] bg-[#EAF4FF]/40 ring-1 ring-[#0B5ED7]'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Banknote className="w-5 h-5 text-[#0B5ED7]" />
                    <h4 className="font-bold text-sm text-slate-800">Pagamento em Dinheiro</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Liquidação em numerário no balcão da loja ou ao estafeta na entrega.
                  </p>
                </div>
              </div>

              {/* Bank Details Box */}
              {paymentMethod === 'bank_transfer' && (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs space-y-1.5 animate-in fade-in">
                  <div className="font-bold text-blue-900 flex items-center gap-1.5">
                    <Receipt className="w-4 h-4 text-[#0B5ED7]" />
                    <span>Coordenadas Bancárias da JPCT:</span>
                  </div>
                  <p className="text-slate-700"><strong>Banco:</strong> {companySettings.bankDetails.bankName}</p>
                  <p className="text-slate-700"><strong>Titular:</strong> {companySettings.bankDetails.holder}</p>
                  <p className="text-slate-700 font-mono"><strong>IBAN:</strong> {companySettings.bankDetails.iban}</p>
                </div>
              )}

              {paymentMethod === 'multicaixa_express' && (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs space-y-1 animate-in fade-in">
                  <p className="font-bold text-blue-900">Número de Pagamento Multicaixa Express:</p>
                  <p className="text-base font-extrabold text-[#0B5ED7] font-mono">{companySettings.bankDetails.multicaixaPhone}</p>
                  <p className="text-slate-600">Poderá enviar o comprovativo directamente para o nosso WhatsApp após a confirmação.</p>
                </div>
              )}

              {/* Order Items Preview */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-700 block">Resumo do Carrinho ({cart.length} itens):</span>
                {cart.slice(0, 3).map((it) => (
                  <div key={it.product.id} className="flex justify-between text-slate-600">
                    <span className="truncate max-w-[280px]">{it.quantity}x {it.product.name}</span>
                    <span className="font-bold text-slate-800">{formatKz(it.product.price * it.quantity)}</span>
                  </div>
                ))}
                {cart.length > 3 && (
                  <span className="text-[11px] text-slate-400 italic">+ outros {cart.length - 3} itens</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer & Actions */}
        <div className="p-5 sm:p-6 border-t border-slate-200 bg-[#F5F7FA] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left w-full sm:w-auto">
            <span className="text-xs text-slate-500 block">Total a Pagar (incl. entrega)</span>
            <span className="text-2xl font-black text-[#0B5ED7]">{formatKz(total)}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar</span>
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-3 rounded-xl bg-[#0B5ED7] hover:bg-[#063B7A] text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
              >
                <span>Continuar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitOrder}
                className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xl hover:shadow-2xl transition flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Confirmar e Finalizar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
