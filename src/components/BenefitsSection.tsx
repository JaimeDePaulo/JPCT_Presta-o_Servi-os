import React from 'react';
import { MapPin, PhoneCall, Layers, CreditCard } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <MapPin className="w-7 h-7 text-[#0B5ED7]" />,
      title: 'Comércio Local no Lubango',
      description: 'Empresa sediada no município do Lubango, com instalações físicas no Bairro Comandante Cow Boy e entregas na Huíla.',
    },
    {
      icon: <Layers className="w-7 h-7 text-[#0B5ED7]" />,
      title: 'Soluções Num Só Lugar',
      description: 'Catálogo diversificado: livros, papelaria, consumíveis de escritório, mercearia, bolas desportivas e produtos agrícolas.',
    },
    {
      icon: <CreditCard className="w-7 h-7 text-[#0B5ED7]" />,
      title: 'Pagamento Confiável',
      description: 'Facilidade de liquidação através de Multicaixa Express, transferência bancária ou pagamento presencial com TPA.',
    },
    {
      icon: <PhoneCall className="w-7 h-7 text-[#0B5ED7]" />,
      title: 'Atendimento Próximo & Rápido',
      description: 'Linha directa de apoio ao cliente e canal WhatsApp dedicado para cotações, esclarecimento de dúvidas e encomendas.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0B5ED7] uppercase tracking-wider bg-[#EAF4FF] px-3 py-1 rounded-full">
            Porquê escolher a JPCT?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#063B7A] tracking-tight mt-3">
            Compromisso com a qualidade e proximidade
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Trabalhamos diariamente para fornecer aos lubanguenses e empresas da região um serviço ágil e produtos de confiança.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200/70 hover:border-blue-300 hover:bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white group-hover:bg-[#EAF4FF] flex items-center justify-center shadow-sm mb-5 transition-colors">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg text-[#063B7A] group-hover:text-[#0B5ED7] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
