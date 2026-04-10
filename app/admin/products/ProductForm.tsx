"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/db/schema";

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      image: formData.get("image"),
      category: formData.get("category"),
      stock: formData.get("stock"),
      featured: formData.get("featured") === "on",
    };

    const url = product
      ? "/api/admin/products/" + product.id
      : "/api/admin/products";

    const method = product ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      setError("Une erreur est survenue.");
      setLoading(false);
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Nom du produit</label>
        <input type="text" name="name" required defaultValue={product?.name} placeholder="Ex: Sneakers Urban Pro" className={inputClass} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Description</label>
        <textarea name="description" required defaultValue={product?.description} placeholder="Description du produit..." rows={4} className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Prix (€)</label>
          <input type="number" name="price" required step="0.01" defaultValue={product?.price} placeholder="29.99" className={inputClass} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Stock</label>
          <input type="number" name="stock" required defaultValue={product?.stock} placeholder="100" className={inputClass} />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Catégorie</label>
        <input type="text" name="category" required defaultValue={product?.category} placeholder="Ex: Vêtements" className={inputClass} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">URL de l'image</label>
        <input type="url" name="image" required defaultValue={product?.image} placeholder="https://images.unsplash.com/..." className={inputClass} />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="featured"
          id="featured"
          defaultChecked={!!product?.featured}
          className="w-4 h-4 rounded border-border"
        />
        <label htmlFor="featured" className="text-sm font-medium text-foreground">
          Produit mis en avant (coup de cœur)
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : product ? "Modifier" : "Ajouter"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="px-8 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-accent transition"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}