"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function AddToCartButton({
  productId,
  large = false,
}: {
  productId: number;
  large?: boolean;
}) {
  const [added, setAdded] = useState(false);

  async function handleAdd() {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: 1 }),
    });

    if (res.ok) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
      window.dispatchEvent(new Event("cart-updated"));
    }
  }

  if (large) {
    return (
      <button
        onClick={handleAdd}
        className="btn-ripple w-full flex items-center justify-center gap-3 py-4 text-xs tracking-[0.3em] uppercase font-light transition-all duration-300"
        style={added ? {
          backgroundColor: "var(--mint)",
          color: "var(--foreground)",
        } : {
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
        }}
      >
        <ShoppingCart className="w-4 h-4" />
        {added ? "Ajouté ✓" : "Ajouter au panier"}
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className="btn-ripple flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase font-light transition-all duration-300"
      style={added ? {
        backgroundColor: "var(--mint)",
        color: "var(--foreground)",
      } : {
        backgroundColor: "var(--primary)",
        color: "var(--primary-foreground)",
      }}
    >
      <ShoppingCart className="w-3 h-3" />
      {added ? "✓" : "Ajouter"}
    </button>
  );
}