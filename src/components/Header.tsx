import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  Menu,
  X,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { AppView } from '../types';
import { JpctLogo } from './JpctLogo';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    setSelectedCategoryFilter,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (view: AppView, categoryFilter?: string) => {
    if (categoryFilter) {
      setSelectedCategoryFilter(categoryFilter);
    }
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Início', view: 'home' as AppView },
    { label: 'Loja', view: 'shop' as AppView },
    { label: 'Categorias', view: 'shop' as AppView, triggerCategory: true },
    { label: 'Ofertas', view: 'shop' as AppView, promoOnly: true },
    { label: 'Sobre Nós', view: 'about' as AppView },
    { label: 'Contactos', view: 'contact' as AppView },
  ];

  return (
    <>
      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center text-left group focus:outline-none transition-transform group-hover:scale-[1.02]"
              title="JPCT - Prestação de Serviços, Lda."
            >
              <JpctLogo size="md" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = currentView === link.view && !link.promoOnly && !link.triggerCategory;
                return (
                  <button
                    key={link.label}
                    onClick={() => {
                      if (link.triggerCategory) {
                        navigateTo('shop', 'all');
                      } else if (link.promoOnly) {
                        navigateTo('shop');
                      } else {
                        navigateTo(link.view);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 relative ${
                      isActive
                        ? 'text-[#0B5ED7] bg-[#EAF4FF]'
                        : 'text-slate-700 hover:text-[#0B5ED7] hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                    {link.promoOnly && (
                      <span className="ml-1.5 inline-flex items-center px-1.5 py-0.2 text-[10px] font-bold text-rose-600 bg-rose-50 rounded-full animate-pulse">
                        % OFF
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons Right Side */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger */}
              <button
                onClick={() => {
                  navigateTo('shop');
                  setTimeout(() => {
                    const searchInput = document.getElementById('main-search-input');
                    searchInput?.focus();
                  }, 200);
                }}
                className="p-2.5 rounded-full text-slate-600 hover:text-[#0B5ED7] hover:bg-[#EAF4FF] transition"
                title="Pesquisar produtos"
                aria-label="Pesquisar produtos"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Direct WhatsApp Action Button */}
              <a
                href="https://wa.me/244942778643?text=Ol%C3%A1%20JPCT!%20Gostaria%20de%20consultar%20pre%C3%A7os%20e%20pedir%20um%20or%C3%A7amento."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 sm:px-4 py-2.5 rounded-xl font-bold text-xs tracking-wide shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                title="Pedir Orçamento no WhatsApp: +244 942 778 643"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span className="hidden sm:inline">Pedir Orçamento</span>
                <span className="font-mono text-xs">+244 942 778 643</span>
              </a>

              {/* Highlighted CTA "Ver Loja" */}
              <button
                onClick={() => navigateTo('shop')}
                className="hidden md:inline-flex items-center gap-2 bg-[#0B5ED7] hover:bg-[#063B7A] text-white px-4 py-2.5 rounded-xl font-bold text-xs tracking-wide shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ver Catálogo</span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
                aria-label="Menu principal"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  if (link.triggerCategory) {
                    navigateTo('shop', 'all');
                  } else {
                    navigateTo(link.view);
                  }
                }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:text-[#0B5ED7] hover:bg-[#EAF4FF] transition flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.promoOnly && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 font-bold">
                    Ofertas
                  </span>
                )}
              </button>
            ))}

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <a
                href="https://wa.me/244942778643?text=Ol%C3%A1%20JPCT!%20Gostaria%20de%20fazer%20uma%20encomenda."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded-xl font-bold text-sm shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Comprar no WhatsApp: +244 942 778 643</span>
              </a>

              <button
                onClick={() => navigateTo('shop')}
                className="w-full flex items-center justify-center gap-2 bg-[#0B5ED7] text-white py-2.5 rounded-xl font-semibold text-sm shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explorar Catálogo</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
