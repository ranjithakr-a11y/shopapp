export type StoreType = {
  currency: CurrencyRateType;
  cart: CartType[];
  userSession: UserSessionType;
  loading: boolean;
  search: string;
};

export type ProductType = {
  productId: number;
  productName: string;
  productPrice: string;
  productImage: string;
  productSalePrice: string;
  productStock: number;
};

export interface ProductResponseType {
  totalItems: number;
  data: ProductType[];
  currentPage: number;
  totalPages: number;
}

export type MenuType = {
  menuItem: string;
  menuLink: string;
};

export type CartType = {
  productQty: number;
} & ProductType;

export type LoginResponseType = {
  message: string;
  expiresIn: number;
  access_token: string;
};

export interface ExchangeCurrencyType {
  base: string;
  date: Date;
  rates: Map<string, number>;
  success: string;
  timestamp: any;
  __proto_: object;
}

export type CurrencyRateType = {
  currencyCode: string;
  value: number;
};


export type UserSessionType = {
  user: object | null;
  error: string | null;
};