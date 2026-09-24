import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  OrderStatus,
  CompanySettings,
  AppView,
  ToastMessage,
  DeliveryMethod,
  PaymentMethod,
  CustomerData,
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_COMPANY_SETTINGS,
} from '../data/mockData';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  neighborhood: string;
  city: string;
  province: string;
}

interface StoreContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  companySettings: CompanySettings;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  latestOrder: Order | null;
  setLatestOrder: (order: Order | null) => void;
  isSuccessModalOpen: boolean;
  setIsSuccessModalOpen: (open: boolean) => void;
  
  // Search & Filter Global State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (categoryId: string) => void;
  
  // User Profile
  currentUser: UserProfile | null;
  loginUser: (name: string, email: string) => void;
  logoutUser: () => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotalCount: number;
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Orders
  createOrder: (customer: CustomerData, deliveryMethod: DeliveryMethod, paymentMethod: PaymentMethod, deliveryCost: number, notes?: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  
  // Admin Product Actions
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateCompanySettings: (settings: Partial<CompanySettings>) => void;
  
  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Helpers
  formatKz: (value: number) => string;
  openWhatsApp: (customMessage?: string) => void;
  buyProductOnWhatsApp: (product: Product, quantity?: number) => void;
  requestQuoteOnWhatsApp: (product: Product, quantity?: number) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('jpct_products_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 10 && parsed[0]?.id === 'p-mob-01') {
          return parsed;
        }
      }
      localStorage.setItem('jpct_products_v4', JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Categories
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('jpct_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jpct_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('jpct_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Settings
  const [companySettings, setCompanySettings] = useState<CompanySettings>(() => {
    try {
      const saved = localStorage.getItem('jpct_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure new phone and WhatsApp number are applied
        return {
          ...parsed,
          whatsappNumber: '244942778643',
          phone: '+244 942 778 643',
          secondaryPhone: '+244 942 778 643',
        };
      }
      return INITIAL_COMPANY_SETTINGS;
    } catch {
      return INITIAL_COMPANY_SETTINGS;
    }
  });

  // Current User
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('jpct_user');
      return saved
        ? JSON.parse(saved)
        : {
            name: 'Cliente Lubango',
            email: 'cliente@exemplo.ao',
            phone: '+244 923 123 456',
            address: 'Bairro Comercial, Rua Direita',
            neighborhood: 'Comercial',
            city: 'Lubango',
            province: 'Huíla',
          };
    } catch {
      return null;
    }
  });

  // UI state
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // LocalStorage sync
  useEffect(() => {
    try {
      localStorage.setItem('jpct_products_v4', JSON.stringify(products));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('jpct_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('jpct_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('jpct_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('jpct_settings', JSON.stringify(companySettings));
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [companySettings]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('jpct_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('jpct_user');
      }
    } catch (e) {
      console.warn('Storage sync failed', e);
    }
  }, [currentUser]);

  // Toast helper
  const showToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Currency Formatter: 8500 -> "8.500 Kz"
  const formatKz = (value: number): string => {
    if (isNaN(value)) return '0 Kz';
    const formatted = Math.round(value).toLocaleString('pt-PT');
    return `${formatted} Kz`;
  };

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast('Adicionado ao carrinho', `${product.name} (${quantity} un.)`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Produto removido', 'Item retirado do seu carrinho', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Favoritos', 'Item removido dos seus favoritos', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Favoritos', 'Adicionado aos seus favoritos ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // User auth simulation
  const loginUser = (name: string, email: string) => {
    const updated = {
      name,
      email,
      phone: '+244 923 000 000',
      address: 'Bairro Comercial, Lubango',
      neighborhood: 'Comercial',
      city: 'Lubango',
      province: 'Huíla',
    };
    setCurrentUser(updated);
    showToast('Sessão Iniciada', `Bem-vindo de volta à JPCT, ${name}!`, 'success');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('Sessão Terminada', 'Até breve!', 'info');
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    setCurrentUser((prev) => (prev ? { ...prev, ...data } : null));
    showToast('Perfil Actualizado', 'Os seus dados foram guardados.', 'success');
  };

  // Orders
  const createOrder = (
    customer: CustomerData,
    deliveryMethod: DeliveryMethod,
    paymentMethod: PaymentMethod,
    deliveryCost: number,
    notes?: string
  ): Order => {
    const subtotal = cartSubtotal;
    const discount = subtotal > 50000 ? 2500 : 0; // small promotional discount if above 50.000 Kz
    const total = subtotal - discount + deliveryCost;

    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      id: `#JPCT-00${orderNumber}`,
      createdAt: new Date().toISOString(),
      customer,
      items: [...cart],
      subtotal,
      deliveryMethod,
      deliveryCost,
      discount,
      total,
      paymentMethod,
      status: 'Novo',
      notes,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setLatestOrder(newOrder);
    setIsCheckoutOpen(false);
    setIsSuccessModalOpen(true);
    showToast('Pedido Efectuado!', `O seu pedido ${newOrder.id} foi registado com sucesso!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    showToast('Estado Actualizado', `Pedido ${orderId} alterado para: ${status}`, 'info');
  };

  // Admin Product Actions
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `p-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast('Produto Adicionado', `${newProduct.name} foi criado no catálogo.`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Produto Actualizado', 'As alterações foram gravadas.', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Produto Eliminado', 'O item foi removido do catálogo.', 'info');
  };

  const updateCompanySettings = (settings: Partial<CompanySettings>) => {
    setCompanySettings((prev) => ({ ...prev, ...settings }));
    showToast('Definições Gravadas', 'Dados da empresa e WhatsApp actualizados.', 'success');
  };

  // WhatsApp integration helper
  const openWhatsApp = (customMessage?: string) => {
    const defaultMsg = 'Olá! Encontrei os produtos da JPCT no vosso website e gostaria de obter mais informações.';
    const message = customMessage || defaultMsg;
    const cleanNumber = companySettings.whatsappNumber ? companySettings.whatsappNumber.replace(/\D/g, '') : '244942778643';
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // WhatsApp quote / price consultation helper
  const requestQuoteOnWhatsApp = (product: Product, quantity: number = 1) => {
    const cleanNumber = companySettings.whatsappNumber ? companySettings.whatsappNumber.replace(/\D/g, '') : '244942778643';
    const quantityText = quantity > 1 ? `\n• Quantidade Estimada: ${quantity} un.` : '';
    const msg = `Olá JPCT! Gostaria de consultar o preço e pedir orçamento:\n• Artigo: ${product.name}\n• Ref/Código: ${product.code}\n• Categoria: ${product.categoryName}\n• Marca: ${product.brand}${quantityText}\n\nPor favor, enviem a cotação actualizada e condições para entrega ou levantamento na vossa sede no Lubango, Huíla.`;
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Alias for backward compatibility
  const buyProductOnWhatsApp = (product: Product, quantity: number = 1) => {
    requestQuoteOnWhatsApp(product, quantity);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        cart,
        wishlist,
        orders,
        companySettings,
        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,
        quickViewProduct,
        setQuickViewProduct,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        latestOrder,
        setLatestOrder,
        isSuccessModalOpen,
        setIsSuccessModalOpen,
        searchQuery,
        setSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        currentUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartTotalCount,
        toggleWishlist,
        isInWishlist,
        createOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        updateCompanySettings,
        toasts,
        showToast,
        removeToast,
        formatKz,
        openWhatsApp,
        buyProductOnWhatsApp,
        requestQuoteOnWhatsApp,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
