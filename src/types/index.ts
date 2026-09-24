export type CategoryId =
  | 'mobiliario'
  | 'informatica'
  | 'livros'
  | 'papelaria'
  | 'escritorio'
  | 'jornais'
  | 'alimentacao'
  | 'bolas'
  | 'recargas'
  | 'agricultura';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  count: number;
  image: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  code: string; // SKU / Código
  category: CategoryId;
  categoryName: string;
  brand: string;
  price: number; // in Kz
  originalPrice?: number; // in Kz
  discountPercentage?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockQuantity: number;
  badge?: 'Novo' | 'Promoção' | 'Mais vendido';
  description: string;
  features: string[];
  specifications: ProductSpecification[];
  images: string[];
  featured?: boolean;
  weeklyDeal?: boolean;
  active: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | 'Novo'
  | 'Confirmado'
  | 'Em preparação'
  | 'Enviado'
  | 'Concluído'
  | 'Cancelado'
  | 'Devolvido';

export type DeliveryMethod = 'lubango_express' | 'store_pickup' | 'huila_regional';

export type PaymentMethod =
  | 'multicaixa_express'
  | 'bank_transfer'
  | 'cash_on_delivery'
  | 'tpa';

export interface CustomerData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  neighborhood: string; // Bairro no Lubango
  city: string;
  province: string;
  notes?: string;
}

export interface Order {
  id: string; // e.g. #JPCT-000125
  createdAt: string;
  customer: CustomerData;
  items: CartItem[];
  subtotal: number;
  deliveryMethod: DeliveryMethod;
  deliveryCost: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  notes?: string;
}

export interface CompanySettings {
  companyName: string;
  nif: string;
  address: string;
  neighborhood: string;
  city: string;
  province: string;
  country: string;
  phone: string;
  secondaryPhone: string;
  whatsappNumber: string; // Editable, e.g. "244923123456"
  email: string;
  workingHours: string;
  bankDetails: {
    bankName: string;
    accountNumber: string;
    iban: string;
    holder: string;
    multicaixaPhone: string;
  };
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export type AppView =
  | 'home'
  | 'shop'
  | 'about'
  | 'contact'
  | 'account'
  | 'cart'
  | 'checkout';
