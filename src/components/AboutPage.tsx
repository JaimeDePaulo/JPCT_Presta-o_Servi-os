import React from 'react';
import { useStore } from '../context/StoreContext';
import { JpctLogo } from './JpctLogo';
import {
  Building2,
  MapPin,
  CheckCircle2,
  Users,
  ShoppingBag,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentView, companySettings } = useStore();

  const corePillars = [
    {
      title: 'Comércio Local',
      description: 'Actuação enraizada no município do Lubango e província da Huíla, promovendo o desenvolvimento do tecido comercial da nossa região.',
      icon: <MapPin className="w-6 h-6 text-[#0B5ED7]" />,
    },
    {
      title: 'Diversidade de Produtos',
      description: 'Ampla variedade que abrange livros, material escolar, consumíveis de escritório, mercearia, artigos desportivos e sementes agrícolas.',
      icon: <ShoppingBag className="w-6 h-6 text-[#0B5ED7]" />,
    },
    {
      title: 'Atendimento Personalizado',
      description: 'Foco na atenção dedicada a cada cliente, particular ou empresarial, compreendendo as necessidades específicas de cada pedido.',
      icon: <Users className="w-6 h-6 text-[#0B5ED7]" />,
    },
    {
      title: 'Qualidade Garantida',
      description: 'Selecção cuidadosa de marcas e artigos testados e prontos para uso em ambiente profissional, académico ou doméstico.',
      icon: <ShieldCheck className="w-6 h-6 text-[#0B5ED7]" />,
    },
    {
      title: 'Conveniência na Compra',
      description: 'Plataforma digital integrada com atendimento rápido, entregas locais ágeis e opções flexíveis de levantamento presencial.',
      icon: <CheckCircle2 className="w-6 h-6 text-[#0B5ED7]" />,
    },
    {
      title: 'Proximidade com o Cliente',
      description: 'Canais directos de diálogo, transparência nas relações e facilidade de contacto via telefone, WhatsApp e balcão físico.',
      icon: <HeartHandshake className="w-6 h-6 text-[#0B5ED7]" />,
    },
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section of About */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF4FF] text-[#0B5ED7] text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>Identidade Oficial</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#063B7A] tracking-tight">
                Sobre a JPCT
              </h1>

              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-normal">
                A <strong>JPCT – Prestação de Serviços, Lda.</strong> é uma empresa sediada no Lubango, província da Huíla, dedicada ao comércio a retalho e à prestação de serviços, disponibilizando diferentes categorias de produtos para particulares, empresas e comunidade.
              </p>

              <div className="pt-2 flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="w-4 h-4 text-[#0B5ED7] shrink-0" />
                <span>{companySettings.address}, Lubango, Huíla, Angola</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl p-6 border border-slate-200/60 flex flex-col items-center justify-center text-center shadow-xs">
              <JpctLogo variant="full" size="xl" />
              <div className="mt-4 pt-3 border-t border-slate-200/80 w-full text-center">
                <p className="text-xs text-slate-500 font-medium">Empresa Registada no Lubango</p>
                <p className="text-xs font-bold text-slate-700">NIF: {companySettings.nif}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sectors of activity */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#0B5ED7] uppercase tracking-wider bg-[#EAF4FF] px-3 py-1 rounded-full">
              Objecto Comercial
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#063B7A] mt-2">
              Soluções Integradas para as suas Necessidades
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              O objecto comercial da empresa abrange um leque diversificado de bens essenciais e serviços:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Livros e manuais',
              'Jornais e publicações',
              'Artigos de papelaria',
              'Material de escritório',
              'Bens alimentares essenciais',
              'Bolas e artigos similares',
              'Recargas electrónicas',
              'Sementes e fertilizantes',
              'Máquinas de escritório',
              'Consumíveis corporativos',
              'Outros materiais e serviços',
              'Prestação de serviços diversos',
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#0B5ED7] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#063B7A]">
              Valores e Princípios da Nossa Actuação
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Pilares que orientam o atendimento ao cliente no Lubango e em toda a província da Huíla.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {corePillars.map((pillar, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md transition space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="font-bold text-base text-[#063B7A]">{pillar.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Shop */}
        <div className="bg-gradient-to-r from-[#063B7A] to-[#0B5ED7] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Pronto para fazer a sua encomenda?
            </h3>
            <p className="text-blue-100 text-sm max-w-lg">
              Explore a nossa loja online, consulte a disponibilidade imediata e efectue o seu pedido com comodidade.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('shop')}
            className="px-8 py-3.5 rounded-xl bg-white text-[#063B7A] hover:bg-[#EAF4FF] font-black text-sm shadow-md transition flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Explorar produtos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
