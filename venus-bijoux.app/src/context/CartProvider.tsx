"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: number;
  name: string;
  variant: string;
  price: number;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  remove: (id: number, variant?: string) => void;
  updateQty: (id: number, variant: string, qty: number) => void;
  clear: () => void;
  total: () => number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem("venux-cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("venux-cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  function add(item: Omit<CartItem, "qty"> & { qty?: number }) {
    setItems((prev) => {
      const existing = prev.find(
        (p) => p.id === item.id && p.variant === item.variant
      );
      if (existing) {
        return prev.map((p) =>
          p.id === item.id && p.variant === item.variant
            ? { ...p, qty: p.qty + (item.qty || 1) }
            : p
        );
      }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
  }

  function remove(id: number, variant?: string) {
    setItems((prev) =>
      prev.filter(
        (p) => !(p.id === id && (variant ? p.variant === variant : true))
      )
    );
  }

  function updateQty(id: number, variant: string, qty: number) {
    setItems((prev) =>
      prev.map((p) =>
        p.id === id && p.variant === variant ? { ...p, qty } : p
      )
    );
  }

  function clear() {
    setItems([]);
  }

  function total() {
    return items.reduce((s, it) => s + it.price * it.qty, 0);
  }

  return (
    <CartContext.Provider
      value={{ items, add, remove, updateQty, clear, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
