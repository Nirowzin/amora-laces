export type Product = {
  id: string;
  code: string;
  slug: string;
  name: string;
  category: string;
  material: string;
  colors: string[];
  lengths: string[];
  price: number;
  promoPrice?: number;
  shortDescription: string;
  description: string;
  specifications: string[];
  images: string[];
  videos?: string[];
  isNew?: boolean;
  isPremium?: boolean;
  isOnSale?: boolean;
  isFeatured?: boolean;
  views: number;
};

export type CartItem = {
  lineId: string;
  productId: string;
  productName: string;
  productCode: string;
  productSlug: string;
  price: number;
  quantity: number;
  color?: string;
  length?: string;
  image: string;
};

export type BuyForm = {
  quantity: number;
  color?: string;
  length?: string;
  notes?: string;
  customerName: string;
  phone: string;
  city?: string;
};

export type StoreSettings = {
  brandName: string;
  whatsappNumber: string;
  instagramUrl: string;
  adminSecretPath: string;
};
