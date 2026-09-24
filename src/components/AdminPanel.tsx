import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Settings,
  Plus,
  Trash2,
  Edit3,
  TrendingUp,
  AlertTriangle,
  Users,
  CheckCircle,
  X,
  Search,
  Filter,
  Save,
  MessageCircle,
  Phone,
  Building,
  DollarSign,
} from 'lucide-react';
import { Product, OrderStatus, CategoryId } from '../types';

export const AdminPanel: React.FC = () => {
  const {
    products,
    categories,
    orders,
    companySettings,
    formatKz,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateCompanySettings,
    setCurrentView,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'settings'>('overview');

  // Search & filter inside admin
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Product Edit / New Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    code: '',
    category: 'papelaria' as CategoryId,
    categoryName: 'Papelaria',
    brand: '',
    price: 1000,
    originalPrice: 0,
    stockQuantity: 20,
    badge: '' as any,
    description: '',
    images: ['https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80'],
    active: true,
  });

  // Settings form
  const [settingsForm, setSettingsForm] = useState({ ...companySettings });

  // Metrics
  const totalSalesKz = orders.reduce((sum, ord) => sum + (ord.status !== 'Cancelado' ? ord.total : 0), 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;
  const lowStockCount = products.filter((p) => p.stockQuantity < 10).length;
  const simulatedCustomersCount = 142; // Registered clients in Lubango

  // Open modal for new product
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      code: `JPCT-${Math.floor(100 + Math.random() * 900)}`,
      category: 'papelaria',
      categoryName: 'Papelaria',
      brand: 'JPCT Office',
      price: 2500,
      originalPrice: 0,
      stockQuantity: 50,
      badge: 'Novo',
      description: 'Descrição completa do novo artigo disponível no Lubango.',
      images: ['https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80'],
      active: true,
    });
    setIsProductModalOpen(true);
  };

  // Open modal for editing product
  const handleOpenEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProductForm({
      name: p.name,
      code: p.code,
      category: p.category,
      categoryName: p.categoryName,
      brand: p.brand,
      price: p.price,
      originalPrice: p.originalPrice || 0,
      stockQuantity: p.stockQuantity,
      badge: p.badge || '',
      description: p.description,
      images: p.images.length > 0 ? p.images : ['https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80'],
      active: p.active,
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find((c) => c.id === productForm.category);
    const catName = cat ? cat.name : 'Papelaria';

    if (editingProductId) {
      updateProduct(editingProductId, {
        ...productForm,
        categoryName: catName,
        discountPercentage:
          productForm.originalPrice > productForm.price
            ? Math.round(((productForm.originalPrice - productForm.price) / productForm.originalPrice) * 100)
            : undefined,
        inStock: productForm.stockQuantity > 0,
      });
    } else {
      addProduct({
        ...productForm,
        categoryName: catName,
        rating: 5.0,
        reviewsCount: 1,
        inStock: productForm.stockQuantity > 0,
        features: ['Produto original garantido', 'Disponível no Lubango'],
        specifications: [{ label: 'Origem', value: 'Distribuição Oficial JPCT' }],
        discountPercentage:
          productForm.originalPrice > productForm.price
            ? Math.round(((productForm.originalPrice - productForm.price) / productForm.originalPrice) * 100)
            : undefined,
      });
    }

    setIsProductModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanySettings(settingsForm);
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    if (productCategoryFilter !== 'all' && p.category !== productCategoryFilter) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    return true;
  });

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Admin Header */}
        <div className="bg-[#063B7A] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Painel de Controlo Administrativo</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Gestão da Loja JPCT Lubango
            </h1>
            <p className="text-xs sm:text-sm text-blue-200 mt-1">
              Administração de produtos, pedidos de compra, clientes e definições comerciais.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('shop')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
            >
              Ver Loja Pública
            </button>
            <button
              onClick={handleOpenAddProduct}
              className="px-5 py-2.5 rounded-xl bg-[#0B5ED7] hover:bg-blue-600 text-white text-xs font-black shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Produto</span>
            </button>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-200 pb-2">
          {[
            { id: 'overview', label: 'Visão Geral & Métricas', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'products', label: 'Gestão de Produtos', icon: <Package className="w-4 h-4" />, count: totalProductsCount },
            { id: 'orders', label: 'Gestão de Pedidos', icon: <ShoppingBag className="w-4 h-4" />, count: totalOrdersCount },
            { id: 'settings', label: 'Definições da Loja & WhatsApp', icon: <Settings className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-[#0B5ED7] shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* 1. TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* 5 KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Total de Vendas */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>Total de Vendas</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#063B7A] mt-2">
                  {formatKz(totalSalesKz)}
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
                  ↑ Pedidos activos no Lubango
                </span>
              </div>

              {/* Pedidos */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>Pedidos Realizados</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B5ED7] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#063B7A] mt-2">
                  {totalOrdersCount}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Registados no sistema
                </span>
              </div>

              {/* Produtos */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>Catálogo de Produtos</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#063B7A] mt-2">
                  {totalProductsCount}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Em 8 categorias
                </span>
              </div>

              {/* Clientes */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>Clientes Registados</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-black text-[#063B7A] mt-2">
                  {simulatedCustomersCount}
                </div>
                <span className="text-[10px] text-amber-600 font-semibold mt-1 block">
                  Província da Huíla
                </span>
              </div>

              {/* Stock Baixo */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>Stock Baixo (&lt;10 un.)</span>
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-black text-rose-600 mt-2">
                  {lowStockCount}
                </div>
                <span className="text-[10px] text-rose-500 font-semibold mt-1 block">
                  Requer reposição
                </span>
              </div>
            </div>

            {/* Visual Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Sales Period Visual Bar Chart (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-extrabold text-base text-[#063B7A]">
                      Vendas por Período (Últimos 6 Meses)
                    </h3>
                    <p className="text-xs text-slate-400">Valores faturados em Milhares de Kwanzas (Kz)</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    +24% vs ano anterior
                  </span>
                </div>

                <div className="h-56 pt-6 flex items-end justify-between gap-3 px-2">
                  {[
                    { month: 'Mai', value: 380, label: '380k' },
                    { month: 'Jun', value: 450, label: '450k' },
                    { month: 'Jul', value: 520, label: '520k' },
                    { month: 'Ago', value: 680, label: '680k' },
                    { month: 'Set', value: 890, label: '890k' },
                    { month: 'Out (Proj)', value: 1050, label: '1.05M', highlight: true },
                  ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition">
                        {bar.label}
                      </span>
                      <div
                        className={`w-full max-w-[48px] rounded-t-xl transition-all duration-500 ${
                          bar.highlight ? 'bg-[#0B5ED7]' : 'bg-blue-200 group-hover:bg-[#1677FF]'
                        }`}
                        style={{ height: `${(bar.value / 1100) * 100}%` }}
                      />
                      <span className="text-[11px] font-semibold text-slate-600 mt-1">
                        {bar.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Breakdown (5 cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-extrabold text-base text-[#063B7A]">
                  Categorias Mais Procuradas
                </h3>
                <p className="text-xs text-slate-400">Distribuição do volume de procura no Lubango</p>

                <div className="space-y-3 pt-2">
                  {[
                    { name: 'Material de Escritório (A4, Agrafadores)', percent: 35, color: 'bg-[#0B5ED7]' },
                    { name: 'Papelaria & Material Escolar', percent: 25, color: 'bg-[#1677FF]' },
                    { name: 'Agricultura & Sementes Huíla', percent: 18, color: 'bg-emerald-500' },
                    { name: 'Bens Alimentares', percent: 12, color: 'bg-amber-500' },
                    { name: 'Livros & Recargas', percent: 10, color: 'bg-purple-500' },
                  ].map((cat, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{cat.name}</span>
                        <span className="font-bold">{cat.percent}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${cat.color}`}
                          style={{ width: `${cat.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. TAB: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-xl text-[#063B7A]">
                  Gestão do Catálogo de Produtos
                </h3>
                <p className="text-xs text-slate-500">
                  Adicione novos itens, altere preços em Kwanzas (Kz), modifique stocks e active promoções.
                </p>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2.5 rounded-xl bg-[#0B5ED7] hover:bg-[#063B7A] text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Artigo</span>
              </button>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Pesquisar por nome, código ou marca..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0B5ED7] outline-none"
                />
              </div>

              <select
                value={productCategoryFilter}
                onChange={(e) => setProductCategoryFilter(e.target.value)}
                className="text-xs p-2 rounded-xl border border-slate-200 bg-white text-slate-700 outline-none"
              >
                <option value="all">Todas as categorias</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 divide-y divide-slate-200">
                <thead className="bg-[#F5F7FA] text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Artigo</th>
                    <th className="p-3">Cód / SKU</th>
                    <th className="p-3">Categoria</th>
                    <th className="p-3">Preço (Kz)</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Destaque / Promo</th>
                    <th className="p-3 text-right">Acções</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50 transition">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block max-w-xs truncate">
                              {product.name}
                            </span>
                            <span className="text-[10px] text-slate-400">{product.brand}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3 font-mono font-medium">{product.code}</td>

                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-[#EAF4FF] text-[#0B5ED7] font-bold text-[10px]">
                          {product.categoryName}
                        </span>
                      </td>

                      <td className="p-3">
                        <span className="font-extrabold text-[#063B7A]">
                          {formatKz(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="block text-[10px] text-slate-400 line-through">
                            {formatKz(product.originalPrice)}
                          </span>
                        )}
                      </td>

                      <td className="p-3">
                        <span
                          className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                            product.stockQuantity < 10
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {product.stockQuantity} un.
                        </span>
                      </td>

                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          {product.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-white">
                              {product.badge}
                            </span>
                          )}
                          {product.discountPercentage && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-600">
                              -{product.discountPercentage}%
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditProduct(product)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B5ED7] hover:bg-blue-50 transition"
                            title="Editar produto"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Tem a certeza que deseja eliminar ${product.name}?`)) {
                                deleteProduct(product.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                            title="Eliminar produto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. TAB: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-xl text-[#063B7A]">
                  Gestão de Pedidos dos Clientes
                </h3>
                <p className="text-xs text-slate-500">
                  Actualize o estado das encomendas (Novo → Confirmado → Em preparação → Enviado → Concluído).
                </p>
              </div>

              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 outline-none"
              >
                <option value="all">Todos os Estados</option>
                <option value="Novo">Novo</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Em preparação">Em preparação</option>
                <option value="Enviado">Enviado</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Devolvido">Devolvido</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-[#F5F7FA] space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <span className="text-base font-extrabold text-[#0B5ED7] font-mono">
                        {order.id}
                      </span>
                      <span className="text-xs text-slate-400 ml-2">
                        {new Date(order.createdAt).toLocaleString('pt-AO')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Alterar Estado:</span>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className="text-xs font-bold p-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 outline-none focus:border-[#0B5ED7]"
                      >
                        <option value="Novo">Novo</option>
                        <option value="Confirmado">Confirmado</option>
                        <option value="Em preparação">Em preparação</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Concluído">Concluído</option>
                        <option value="Cancelado">Cancelado</option>
                        <option value="Devolvido">Devolvido</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="font-bold text-slate-700 block">Cliente:</span>
                      <p className="font-medium text-slate-900">{order.customer.fullName}</p>
                      <p className="text-slate-500">{order.customer.phone}</p>
                      <p className="text-slate-500">{order.customer.email}</p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 block">Endereço de Entrega:</span>
                      <p className="text-slate-800">{order.customer.address}</p>
                      <p className="text-slate-500">{order.customer.neighborhood}, Lubango</p>
                    </div>

                    <div>
                      <span className="font-bold text-slate-700 block">Pagamento & Total:</span>
                      <p className="text-slate-700 uppercase font-semibold">Método: {order.paymentMethod}</p>
                      <p className="text-base font-extrabold text-[#0B5ED7] mt-1">{formatKz(order.total)}</p>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="pt-2 border-t border-slate-200/80 text-xs">
                    <span className="font-bold text-slate-600 block mb-1">Itens Encomendados:</span>
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((it, idx) => (
                        <span key={idx} className="bg-white px-2.5 py-1 rounded-md border border-slate-200 text-slate-700">
                          {it.quantity}x {it.product.name} ({formatKz(it.product.price * it.quantity)})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. TAB: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="font-extrabold text-xl text-[#063B7A]">
                Definições da Empresa & WhatsApp
              </h3>
              <p className="text-xs text-slate-500">
                Configure os dados oficiais da empresa e o número de WhatsApp utilizado no botão flutuante.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nome Oficial da Empresa
                  </label>
                  <input
                    type="text"
                    value={settingsForm.companyName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:border-[#0B5ED7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Número de WhatsApp para Atendimento (sem sinais)
                  </label>
                  <div className="relative">
                    <MessageCircle className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={settingsForm.whatsappNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      placeholder="244942778643"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono outline-none focus:border-[#0B5ED7]"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Utilizado no botão flutuante &quot;Falar connosco&quot; e no envio de comprovativos.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Telefone de Contacto Principal
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono outline-none focus:border-[#0B5ED7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Correio Electrónico
                  </label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:border-[#0B5ED7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Endereço Físico no Lubango
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm outline-none focus:border-[#0B5ED7]"
                />
              </div>

              {/* Bank Details section */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h4 className="font-bold text-sm text-[#063B7A]">Coordenadas Bancárias Angolanas</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Banco e Titular</label>
                    <input
                      type="text"
                      value={settingsForm.bankDetails.bankName}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          bankDetails: { ...settingsForm.bankDetails, bankName: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">IBAN Angolano</label>
                    <input
                      type="text"
                      value={settingsForm.bankDetails.iban}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          bankDetails: { ...settingsForm.bankDetails, iban: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs font-mono outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-[#0B5ED7] hover:bg-[#063B7A] text-white font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Gravar Definições</span>
              </button>
            </form>
          </div>
        )}

        {/* PRODUCT ADD/EDIT MODAL */}
        {isProductModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-4 border border-slate-200 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-lg text-[#063B7A]">
                  {editingProductId ? 'Editar Artigo' : 'Adicionar Novo Artigo'}
                </h3>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nome do Produto *</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Código / SKU *</label>
                    <input
                      type="text"
                      required
                      value={productForm.code}
                      onChange={(e) => setProductForm({ ...productForm, code: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Marca *</label>
                    <input
                      type="text"
                      required
                      value={productForm.brand}
                      onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Categoria *</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value as CategoryId })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs outline-none"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Etiqueta Especial</label>
                    <select
                      value={productForm.badge}
                      onChange={(e) => setProductForm({ ...productForm, badge: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs outline-none"
                    >
                      <option value="">Nenhuma</option>
                      <option value="Novo">Novo</option>
                      <option value="Promoção">Promoção</option>
                      <option value="Mais vendido">Mais vendido</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Preço em Kz *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Preço Anterior (Kz)</label>
                    <input
                      type="number"
                      min="0"
                      value={productForm.originalPrice}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Quantidade em Stock</label>
                    <input
                      type="number"
                      min="0"
                      value={productForm.stockQuantity}
                      onChange={(e) => setProductForm({ ...productForm, stockQuantity: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">URL da Imagem</label>
                  <input
                    type="url"
                    value={productForm.images[0]}
                    onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Descrição Detalhada</label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#0B5ED7] text-white font-bold hover:bg-[#063B7A] transition"
                  >
                    Gravar Artigo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
