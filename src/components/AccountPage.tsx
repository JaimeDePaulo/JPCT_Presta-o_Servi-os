import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  User,
  Package,
  Heart,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { ProductCard } from './ProductCard';
import { OrderStatus } from '../types';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    loginUser,
    logoutUser,
    updateUserProfile,
    orders,
    products,
    wishlist,
    formatKz,
    companySettings,
    setCurrentView,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'wishlist' | 'profile' | 'addresses'>('dashboard');

  // Auth form state if logged out
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'recovery'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    neighborhood: currentUser?.neighborhood || '',
  });

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'recovery') {
      alert(`Instruções de recuperação de senha enviadas para ${loginEmail}`);
      setAuthMode('login');
      return;
    }
    const name = loginName.trim() || 'Cliente Lubango';
    const email = loginEmail.trim() || 'cliente@jpct.ao';
    loginUser(name, email);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(profileForm);
  };

  // Status visual badge helper
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Concluído':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Enviado':
        return 'bg-blue-100 text-[#0B5ED7] border-blue-200';
      case 'Em preparação':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Confirmado':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Cancelado':
      case 'Devolvido':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  // If user is not logged in, show Auth component
  if (!currentUser) {
    return (
      <div className="bg-[#F5F7FA] min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF4FF] text-[#0B5ED7] flex items-center justify-center mx-auto">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#063B7A]">
              {authMode === 'login' && 'Entrar na sua conta'}
              {authMode === 'register' && 'Criar conta na JPCT'}
              {authMode === 'recovery' && 'Recuperar Senha'}
            </h2>
            <p className="text-xs text-slate-500">
              Aceda ao seu histórico de compras, acompanhe entregas no Lubango e guarde os seus favoritos.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {authMode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B5ED7] outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Correio Electrónico
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="exemplo@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B5ED7] outline-none"
              />
            </div>

            {authMode !== 'recovery' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">Palavra-passe</label>
                  <button
                    type="button"
                    onClick={() => setAuthMode('recovery')}
                    className="text-[11px] text-[#0B5ED7] hover:underline"
                  >
                    Esqueceu-se?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#0B5ED7] outline-none"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0B5ED7] hover:bg-[#063B7A] text-white font-bold text-sm shadow-md transition cursor-pointer"
            >
              {authMode === 'login' && 'Entrar'}
              {authMode === 'register' && 'Registar Conta'}
              {authMode === 'recovery' && 'Enviar Instruções'}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            {authMode === 'login' ? (
              <p>
                Ainda não tem conta?{' '}
                <button
                  onClick={() => setAuthMode('register')}
                  className="text-[#0B5ED7] font-bold hover:underline"
                >
                  Criar conta agora
                </button>
              </p>
            ) : (
              <p>
                Já tem conta registada?{' '}
                <button
                  onClick={() => setAuthMode('login')}
                  className="text-[#0B5ED7] font-bold hover:underline"
                >
                  Fazer login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Calculate user metrics
  const totalOrders = orders.length;
  const processingOrders = orders.filter((o) => ['Novo', 'Confirmado', 'Em preparação', 'Enviado'].includes(o.status)).length;
  const completedOrders = orders.filter((o) => o.status === 'Concluído').length;

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Top Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0B5ED7] to-[#063B7A] text-white flex items-center justify-center font-black text-2xl shadow-md">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B5ED7] bg-[#EAF4FF] px-2.5 py-0.5 rounded-full">
                Área do Cliente JPCT
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#063B7A] mt-1">
                Olá, {currentUser.name}!
              </h1>
              <p className="text-xs text-slate-500">
                {currentUser.email} • {currentUser.city}, {currentUser.province}
              </p>
            </div>
          </div>

          <button
            onClick={logoutUser}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition self-start md:self-auto cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Terminar Sessão</span>
          </button>
        </div>

        {/* Dashboard Tabs & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-1 space-y-2">
            <div className="bg-white rounded-2xl p-3 border border-slate-200 space-y-1">
              {[
                { id: 'dashboard', label: 'Visão Geral', icon: <User className="w-4 h-4" /> },
                { id: 'orders', label: 'Histórico de Pedidos', icon: <Package className="w-4 h-4" />, count: totalOrders },
                { id: 'wishlist', label: 'Lista de Favoritos', icon: <Heart className="w-4 h-4" />, count: wishlist.length },
                { id: 'profile', label: 'Dados de Contacto', icon: <Mail className="w-4 h-4" /> },
                { id: 'addresses', label: 'Endereço no Lubango', icon: <MapPin className="w-4 h-4" /> },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-[#0B5ED7] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        activeTab === item.id
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Quick Contact Help Box */}
            <div className="p-4 rounded-2xl bg-[#EAF4FF] border border-blue-200 text-xs space-y-2">
              <span className="font-bold text-[#063B7A] block">Precisa de assistência?</span>
              <p className="text-slate-600 leading-relaxed">
                Contacte a nossa equipa no Lubango pelo WhatsApp ou telefone para suporte com as suas encomendas.
              </p>
              <div className="font-mono text-[#0B5ED7] font-bold">
                {companySettings.phone}
              </div>
            </div>
          </aside>

          {/* Main Tab Content */}
          <main className="lg:col-span-3 space-y-6">
            {/* TAB: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-semibold block">Pedidos Realizados</span>
                    <span className="text-2xl font-black text-[#063B7A] mt-1 block">{totalOrders}</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-semibold block">Em Processamento</span>
                    <span className="text-2xl font-black text-amber-600 mt-1 block">{processingOrders}</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-semibold block">Pedidos Concluídos</span>
                    <span className="text-2xl font-black text-emerald-600 mt-1 block">{completedOrders}</span>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-semibold block">Favoritos Guardados</span>
                    <span className="text-2xl font-black text-rose-500 mt-1 block">{wishlist.length}</span>
                  </div>
                </div>

                {/* Recent Orders Overview */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-[#063B7A] text-base">
                      Últimos Pedidos
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-[#0B5ED7] hover:underline"
                    >
                      Ver todos
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-slate-800">{order.id}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            {order.items.length} produto(s) • Total: <strong>{formatKz(order.total)}</strong>
                          </p>
                        </div>

                        <div className="text-right sm:text-right">
                          <span className="text-xs text-slate-400 block">
                            {new Date(order.createdAt).toLocaleDateString('pt-AO')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ORDERS */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6">
                <h3 className="font-extrabold text-xl text-[#063B7A]">
                  Histórico de Pedidos de Compra
                </h3>

                {orders.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-10">Ainda não realizou pedidos.</p>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="p-5 rounded-2xl border border-slate-200 bg-[#F5F7FA] space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                          <div>
                            <span className="text-base font-extrabold text-[#0B5ED7] font-mono">{order.id}</span>
                            <p className="text-xs text-slate-400">
                              Data: {new Date(order.createdAt).toLocaleString('pt-AO')}
                            </p>
                          </div>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(order.status)}`}>
                            {order.status}
                          </span>
                        </div>

                        {/* Order Timeline Visual */}
                        <div className="py-2">
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                            <span className="text-[#0B5ED7]">1. Novo</span>
                            <span className={['Confirmado', 'Em preparação', 'Enviado', 'Concluído'].includes(order.status) ? 'text-[#0B5ED7]' : 'text-slate-400'}>
                              2. Confirmado
                            </span>
                            <span className={['Em preparação', 'Enviado', 'Concluído'].includes(order.status) ? 'text-[#0B5ED7]' : 'text-slate-400'}>
                              3. Em preparação
                            </span>
                            <span className={['Enviado', 'Concluído'].includes(order.status) ? 'text-[#0B5ED7]' : 'text-slate-400'}>
                              4. Enviado
                            </span>
                            <span className={order.status === 'Concluído' ? 'text-emerald-600' : 'text-slate-400'}>
                              5. Concluído
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                            <div
                              className="bg-[#0B5ED7] h-full transition-all duration-500"
                              style={{
                                width:
                                  order.status === 'Novo'
                                    ? '20%'
                                    : order.status === 'Confirmado'
                                    ? '40%'
                                    : order.status === 'Em preparação'
                                    ? '60%'
                                    : order.status === 'Enviado'
                                    ? '80%'
                                    : order.status === 'Concluído'
                                    ? '100%'
                                    : '0%',
                              }}
                            />
                          </div>
                        </div>

                        {/* Items list */}
                        <div className="space-y-2 text-xs divide-y divide-slate-200/60">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="pt-2 flex justify-between items-center">
                              <span className="font-medium text-slate-800">
                                {it.quantity}x {it.product.name}
                              </span>
                              <span className="font-bold text-slate-700">
                                {formatKz(it.product.price * it.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order financial totals */}
                        <div className="pt-2 border-t border-slate-200 flex justify-between text-xs font-bold text-slate-800">
                          <span>Total Liquidado (incl. entrega):</span>
                          <span className="text-[#0B5ED7] text-sm">{formatKz(order.total)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6">
                <h3 className="font-extrabold text-xl text-[#063B7A]">
                  Meus Produtos Favoritos ({wishlistProducts.length})
                </h3>

                {wishlistProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-3">
                    <Heart className="w-12 h-12 text-slate-300 mx-auto" />
                    <p className="text-sm font-semibold text-slate-600">Ainda não guardou nenhum produto.</p>
                    <button
                      onClick={() => setCurrentView('shop')}
                      className="px-5 py-2.5 bg-[#0B5ED7] text-white text-xs font-bold rounded-xl"
                    >
                      Explorar a Loja
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB: PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6">
                <h3 className="font-extrabold text-xl text-[#063B7A]">
                  Dados de Contacto e Perfil
                </h3>

                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nome Completo</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#0B5ED7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Correio Electrónico</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#0B5ED7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Telefone (Angola)</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#0B5ED7]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#0B5ED7] text-white text-xs font-bold hover:bg-[#063B7A] transition"
                  >
                    Guardar Alterações
                  </button>
                </form>
              </div>
            )}

            {/* TAB: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6">
                <h3 className="font-extrabold text-xl text-[#063B7A]">
                  Endereços Registados no Lubango
                </h3>

                <div className="p-5 rounded-2xl border-2 border-[#0B5ED7] bg-[#EAF4FF]/40 max-w-md space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-[#0B5ED7] uppercase">Endereço Principal</span>
                    <span className="text-[10px] bg-[#0B5ED7] text-white px-2 py-0.5 rounded-full font-bold">Padrão</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{currentUser.name}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {currentUser.address}, {currentUser.neighborhood}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    Lubango, Província da Huíla • {currentUser.phone}
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
