"use client";

import { useState, useEffect, useCallback } from "react";

export type CartItem = {
  productId: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
};

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch("/api/cart");
      const cartItems = await res.json();

      if (cartItems.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }

      // Récupère les détails des produits
      const detailed = await Promise.all(
        cartItems.map(async (item: { productId: number; quantity: number }) => {
          const pRes = await fetch(`/api/products/${item.productId}`);
          const product = await pRes.json();
          return {
            productId: item.productId,
            quantity: item.quantity,
            name: product.name,
            price: product.price,
            image: product.image,
          };
        })
      );

      setItems(detailed);
    } catch (error) {
      console.error("Erreur chargement panier:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
    window.addEventListener("cart-updated", fetchCart);
    return () => window.removeEventListener("cart-updated", fetchCart);
  }, [fetchCart]);

  const updateQuantity = async (productId: number, quantity: number) => {
    await fetch("/api/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    fetchCart();
  };

  const removeItem = async (productId: number) => {
    await fetch("/api/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: 0 }),
    });
    fetchCart();
  };

  const clearCart = async () => {
    await fetch("/api/cart", { method: "DELETE" });
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return { items, loading, total, count, updateQuantity, removeItem, clearCart, fetchCart };
}
