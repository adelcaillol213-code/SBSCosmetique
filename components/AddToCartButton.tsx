"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function AddToCartButton({ productId }: { productId: number }) {
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

  return (
    <button
      onClick={handleAdd}
      className="flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase font-medium transition-all duration-300"
      style={added ? {
        backgroundColor: "var(--gold)",
        color: "var(--foreground)",
      } : {
        backgroundColor: "var(--primary)",
        color: "var(--primary-foreground)",
      }}
    >
      <ShoppingCart className="w-3 h-3" />
      {added ? "Ajouté ✓" : "Ajouter"}
    </button>
  );
}