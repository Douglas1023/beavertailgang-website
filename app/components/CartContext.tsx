"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "@/app/data/products";

interface CartItem {
  product: Product;
  size: string;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (index: number) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  cartCount: 0,
});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.product.id === product.id && i.size === size);
      if (idx >= 0) {
        const u = [...prev];
        u[idx] = { ...u[idx], qty: u[idx].qty + 1 };
        return u;
      }
      return [...prev, { product, size, qty: 1 }];
    });
  };

  const removeFromCart = (i: number) => setCart(p => p.filter((_, idx) => idx !== i));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}
