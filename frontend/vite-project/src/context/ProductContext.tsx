import { createContext, FunctionComponent, useCallback, useState } from "react";
import { api } from "../services/axios";

export type Rating = {
  id: string;
  userId: string;
  productId: string;
  rating: string;
  starValue: number;
};
export interface RatingProps {
  id: string;
  rating: Rating[];
}

export interface Size {
  id: string;
  sizeId: string;
  productId: string;
  name: string;
}

export interface Category{
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
  categoryId: string;
  quantity: number;
  size: Size;
  rating: Rating[];
  stock: boolean;
}

type ProductContextType = {
  products: Product[];
  loadProducts: () => Promise<void>;
  selectProduct: (product: Product) => void;
  selectedProduct: Product | null;
};

export const ProductContext = createContext({} as ProductContextType);

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider: FunctionComponent<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      const response = await api.get("/v1/api/products");
      setProducts(response.data.products);

    } catch (error) {
      console.error("Error during get products:", error);
    }
  }, []);

  const selectProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    console.log(product)
  }, []);

  return (
    <ProductContext.Provider
      value={{ loadProducts, products, selectProduct, selectedProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
