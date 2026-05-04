"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { PRODUCTS, Product } from "@/data/products";

export type ProductFull = Product & { photos: string[] };

interface ProductsContextType {
  products: ProductFull[];
  addProduct: (product: Omit<ProductFull, "id">) => void;
  updateProduct: (id: number, updates: Partial<ProductFull>) => void;
  deleteProduct: (id: number) => void;
  addPhoto: (productId: number, photoUrl: string) => void;
  removePhoto: (productId: number, photoIndex: number) => void;
  resetToDefaults: () => void;
}

const STORAGE_KEY = "b2b_products_v1";

function makeDefaults(): ProductFull[] {
  return PRODUCTS.map((p) => ({ ...p, photos: [] }));
}

const ProductsContext = createContext<ProductsContextType | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ProductFull[]>(makeDefaults);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ProductFull[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const persist = (prods: ProductFull[]) => {
    setProducts(prods);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prods));
    } catch {
      // ignore storage errors
    }
  };

  const addProduct = (product: Omit<ProductFull, "id">) => {
    const id = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    persist([...products, { ...product, id }]);
  };

  const updateProduct = (id: number, updates: Partial<ProductFull>) => {
    persist(products.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id: number) => {
    persist(products.filter((p) => p.id !== id));
  };

  const addPhoto = (productId: number, photoUrl: string) => {
    persist(
      products.map((p) =>
        p.id === productId ? { ...p, photos: [...p.photos, photoUrl] } : p
      )
    );
  };

  const removePhoto = (productId: number, photoIndex: number) => {
    persist(
      products.map((p) =>
        p.id === productId
          ? { ...p, photos: p.photos.filter((_, i) => i !== photoIndex) }
          : p
      )
    );
  };

  const resetToDefaults = () => {
    const defaults = makeDefaults();
    setProducts(defaults);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, addPhoto, removePhoto, resetToDefaults }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
