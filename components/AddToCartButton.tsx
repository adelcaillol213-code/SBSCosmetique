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
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
        added
          ? "bg-green-500 text-white"
          : "bg-primary text-primary-foreground hover:opacity-90"
      }`}
    >
      <ShoppingCart className="w-4 h-4" />
      {added ? "Ajouté !" : "Ajouter"}
    </button>
  );
}