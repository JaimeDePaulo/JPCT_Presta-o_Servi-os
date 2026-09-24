/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Toast } from './components/Toast';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { CategoriesSection } from './components/CategoriesSection';
import { FeaturedProductsSection } from './components/FeaturedProductsSection';
import { WeeklyDealsSection } from './components/WeeklyDealsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { ShopPage } from './components/ShopPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { AccountPage } from './components/AccountPage';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';

const AppContent: React.FC = () => {
  const { currentView } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notifications */}
      <Toast />

      {/* WhatsApp Floating Contact Button */}
      <FloatingWhatsApp />

      {/* Main Sticky Header */}
      <Header />

      {/* Dynamic Main View */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <SearchBar />
            <CategoriesSection />
            <FeaturedProductsSection />
            <WeeklyDealsSection />
            <BenefitsSection />
          </>
        )}

        {currentView === 'shop' && <ShopPage />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'account' && <AccountPage />}
      </main>

      {/* Product Detail Modal with Direct WhatsApp Purchase */}
      <ProductDetailModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
