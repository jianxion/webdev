import { createContext, useContext } from 'react';

import type { Dispatch, ReactNode, SetStateAction } from 'react';

import type { Product } from '../types';

export interface ProductContextValue {
  selectedProduct: Product | null;
  setSelectedProduct: Dispatch<SetStateAction<Product | null>>;
}

const ProductContext = createContext<ProductContextValue | undefined>(undefined);

export function ProductProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: ProductContextValue;
}) {
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProductContext(): ProductContextValue {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }

  return context;
}

export { ProductContext };