import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CreditCard,
  Building,
  ArrowUp,
  MessageCircle,
} from 'lucide-react';
import { AppView } from '../types';
import { JpctLogo } from './JpctLogo';

export const Footer: React.FC = () => {
  const { setCurrentView, companySettings, setSelectedCategoryFilter } = useStore();

  const handleNav = (view: AppView, categoryFilter?: string) => {
    if (categoryFilter) {
      setSelectedCategoryFilter(categoryFilter);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#063B7A] text-white pt-16 pb-8 border-t border-blue-900/60 relative overflow-hidden">
      {/* Decorative top ambient bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4 Col Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Contact brief (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/95 rounded-2xl px-4 py-2.5 inline-flex shadow-sm">
              <JpctLogo size="md" />
            </div>

            <p className="text-xs text-blue-100/80 leading-relaxed max-w-sm">
              Empresa sediada no Lubango, província da Huíla, dedicada ao comércio a retalho e prestação de serviços com qualidade, diversidade e proximidade.
            </p>

            <div className="space-y-2 text-xs text-blue-100/90 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                <span>{companySettings.address}, Lubango, Huíla, Angola</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-300 shrink-0" />
                <span>{companySettings.phone}</span>
              </div>

              <a
                href="https://wa.me/244942778643?text=Ol%C3%A1%20JPCT!%20Gostaria%20de%20fazer%20uma%20encomenda."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition font-semibold"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: +244 942 778 643</span>
              </a>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-300 shrink-0" />
                <span>{companySettings.email}</span>
              </div>
            </div>
          </div>

          {/* Col 2: A nossa loja */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm tracking-wide text-white uppercase border-b border-white/10 pb-2">
              A nossa loja
            </h4>
            <ul className="space-y-2 text-xs text-blue-200/80">
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-white transition"
                >
                  Loja Virtual
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'all')}
                  className="hover:text-white transition"
                >
                  Todos os produtos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-white transition"
                >
                  Ofertas da Semana
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-white transition"
                >
                  Novidades
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-white transition"
                >
                  Mais vendidos
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categorias */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm tracking-wide text-white uppercase border-b border-white/10 pb-2">
              Categorias
            </h4>
            <ul className="space-y-2 text-xs text-blue-200/80">
              <li>
                <button
                  onClick={() => handleNav('shop', 'livros')}
                  className="hover:text-white transition"
                >
                  Livros
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'papelaria')}
                  className="hover:text-white transition"
                >
                  Papelaria
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'escritorio')}
                  className="hover:text-white transition"
                >
                  Material de Escritório
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'alimentacao')}
                  className="hover:text-white transition"
                >
                  Bens Alimentares
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'agricultura')}
                  className="hover:text-white transition"
                >
                  Agricultura & Sementes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'recargas')}
                  className="hover:text-white transition"
                >
                  Recargas Electrónicas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Ajuda & Institucional */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm tracking-wide text-white uppercase border-b border-white/10 pb-2">
              Ajuda & Institucional
            </h4>
            <ul className="space-y-2 text-xs text-blue-200/80">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition"
                >
                  Sobre a JPCT
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition"
                >
                  Contactos e Localização
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition"
                >
                  Como comprar
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition"
                >
                  Entregas no Lubango
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition"
                >
                  Termos e condições
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition"
                >
                  Política de privacidade
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Location Row */}
        <div className="py-6 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-blue-200/70">
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
            <span className="font-semibold text-white">Métodos aceites em Angola:</span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[11px]">
              Multicaixa Express
            </span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[11px]">
              Transferência BAI / BFA
            </span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[11px]">
              TPA no Lubango
            </span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[11px]">
              Dinheiro vivo
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-200/60 gap-3">
          <p>© 2026 JPCT – Prestação de Serviços, Lda. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Comércio a retalho e serviços em Lubango, Huíla, Angola</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
