import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Building,
  CheckCircle2,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { companySettings, openWhatsApp, showToast } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Mensagem Enviada', 'Recebemos a sua mensagem e entraremos em contacto brevemente.', 'success');
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#0B5ED7] uppercase tracking-wider bg-[#EAF4FF] px-3 py-1 rounded-full">
            Atendimento Directo
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#063B7A] tracking-tight mt-2">
            Fale connosco
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Estamos ao seu dispor para informações sobre produtos, encomendas corporativas, cotações e entregas no Lubango.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Localização */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col items-start space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF4FF] text-[#0B5ED7] flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#063B7A]">Localização & Sede</h3>
              <p className="text-xs font-semibold text-slate-700 mt-1">
                {companySettings.companyName}
              </p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {companySettings.address}
              </p>
              <p className="text-xs font-bold text-[#0B5ED7] mt-1">
                {companySettings.city}, {companySettings.province}, Angola
              </p>
            </div>
          </div>

          {/* Card 2: Telefones & WhatsApp */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col items-start space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div className="w-full">
              <h3 className="font-extrabold text-base text-[#063B7A]">Telefones & WhatsApp</h3>
              <p className="text-xs text-slate-500 mt-1">Linha Principal:</p>
              <p className="text-sm font-bold text-slate-800 font-mono">{companySettings.phone}</p>
              <p className="text-xs text-slate-500 mt-1">Linha Alternativa:</p>
              <p className="text-sm font-bold text-slate-800 font-mono">{companySettings.secondaryPhone}</p>

              <button
                onClick={() => openWhatsApp('Olá JPCT! Gostaria de obter informações sobre os vossos produtos e entregas no Lubango.')}
                className="mt-3 w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Conversar no WhatsApp (+244 942 778 643)</span>
              </button>
            </div>
          </div>

          {/* Card 3: Email & Horário */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col items-start space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#063B7A]">Email & Horários</h3>
              <p className="text-xs text-slate-500 mt-1">Correio Electrónico:</p>
              <p className="text-sm font-bold text-[#0B5ED7]">{companySettings.email}</p>
              <p className="text-xs text-slate-500 mt-2">Horário de Funcionamento:</p>
              <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                {companySettings.workingHours}
              </p>
            </div>
          </div>
        </div>

        {/* Form and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#063B7A]">
                Envie-nos uma Mensagem
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Preencha o formulário e a nossa equipa entrará em contacto no mesmo dia útil.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-lg text-emerald-900">Mensagem Enviada com Sucesso!</h3>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Agradecemos o seu contacto. A equipa da JPCT irá analisar o seu pedido e responder rapidamente.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Manuel Silva"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B5ED7] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Correio Electrónico
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seuemail@exemplo.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B5ED7] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Telefone (Angola) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+244 923 000 000"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B5ED7] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Assunto *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Ex: Cotação de material de escritório"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B5ED7] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mensagem *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Escreva aqui a sua mensagem ou especifique os artigos pretendidos..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B5ED7] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0B5ED7] hover:bg-[#063B7A] text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar mensagem</span>
                </button>
              </form>
            )}
          </div>

          {/* Interactive Lubango Map representation (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="font-extrabold text-base text-[#063B7A]">
                Nossa Localização no Lubango
              </h3>
              <p className="text-xs text-slate-500">
                Bairro Comandante Cow Boy, Rua Principal, próximo ao Restaurante Casa Verde.
              </p>
            </div>

            {/* Simulated Clean Map Box */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-72 bg-slate-100">
              <iframe
                title="Mapa de Localização JPCT Lubango"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?q=Lubango,Huila,Angola&t=&z=14&ie=UTF8&iwloc=&output=embed"
              ></iframe>

              {/* Pin Overlay Badge */}
              <div className="absolute top-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-200 flex items-center gap-3 pointer-events-none">
                <div className="w-9 h-9 rounded-lg bg-[#0B5ED7] text-white flex items-center justify-center font-bold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800">JPCT – Prestação de Serviços, Lda.</p>
                  <p className="text-slate-500 text-[11px] leading-tight">Bairro Comandante Cow Boy (junto à Casa Verde)</p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F5F7FA] text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800">Como chegar até nós:</p>
              <p>Seguir pela Rua Principal do Bairro Comandante Cow Boy em direcção ao Restaurante Casa Verde. As nossas instalações possuem sinalética visível da JPCT.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
