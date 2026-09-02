'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  nameKey?: string; // Clave de traducción para productos con nombre traducible
  price: number;
  quantity: number;
  image?: string;
  isCustom?: boolean;
  customDetails?: {
    projectNumber?: string;
    email?: string;
    phone?: string;
    amount?: number;
  };
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getIVA: () => number;
  lastAddedItem: string | null;
  lastRemovedItem: CartItem | null;
  undoRemove: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Función para cargar el carrito desde localStorage de manera síncrona
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      return Array.isArray(parsedCart) ? parsedCart : [];
    }
  } catch (e) {
    console.error('Error loading cart from localStorage:', e);
  }
  
  return [];
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);
  const [lastRemovedItem, setLastRemovedItem] = useState<CartItem | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
    }
  }, [items]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id && !i.isCustom);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id && !i.isCustom
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    setLastAddedItem(item.name);
    setTimeout(() => setLastAddedItem(null), 3000);
  };

  const removeItem = (id: string) => {
    const itemToRemove = items.find(i => i.id === id);
    if (itemToRemove) {
      setLastRemovedItem(itemToRemove);
      setItems(prevItems => prevItems.filter(i => i.id !== id));
      setTimeout(() => setLastRemovedItem(null), 5000);
    }
  };

  const undoRemove = () => {
    if (lastRemovedItem) {
      setItems(prevItems => [...prevItems, lastRemovedItem]);
      setLastRemovedItem(null);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    try {
      localStorage.removeItem('cart');
    } catch (e) {
      console.error('Error clearing cart from localStorage:', e);
    }
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getIVA = () => {
    return getSubtotal() * 0.16;
  };

  const getTotal = () => {
    return getSubtotal() + getIVA();
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getSubtotal,
        getIVA,
        lastAddedItem,
        lastRemovedItem,
        undoRemove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};