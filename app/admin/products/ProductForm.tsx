"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/db/schema";

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      image: formData.get("image") as string,
      category: formData.get("category") as string,
      stock: formData.get("stock") as string,
      featured: formData.get("featured") === "on",
    };

    const url = product
      ? "/api/admin/products/" + product.id
      : "/api/admin/products";

    const method = product ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess(product ? "Produit modifié avec succès !" : "Produit ajouté avec succès !");
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 1000);
      } else {
        setError(result.error || "Une erreur est survenue.");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full px-4 py-3 border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition text-sm"

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          ❌ {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
          ✅ {success}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Nom du produit *
        </label>
        <input
          type="text"
          name="name"
          required
          defaultValue={product?.name}
          placeholder="Ex: Sérum Visage Éclat"
          className={inputClass}
          style={{ borderColor: "var(--border)" }}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Description *
        </label>
        <textarea
          name="description"
          required
          defaultValue={product?.description}
          placeholder="Description détaillée du produit..."
          rows={4}
          className={inputClass}
          style={{ borderColor: "var(--border)" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Prix (€) *
          </label>
          <input
            type="number"
            name="price"
            required
            step="0.01"
            min="0"
            defaultValue={product?.price}
            placeholder="29.99"
            className={inputClass}
            style={{ borderColor: "var(--border)" }}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Stock *
          </label>
          <input
            type="number"
            name="stock"
            required
            min="0"
            defaultValue={product?.stock}
            placeholder="100"
            className={inputClass}
            style={{ borderColor: "var(--border)" }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Catégorie *
        </label>
        <input
          type="text"
          name="category"
          required
          defaultValue={product?.category}
          placeholder="Ex: Visage, Corps, Cheveux..."
          className={inputClass}
          style={{ borderColor: "var(--border)" }}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          URL de l'image *
        </label>
        <input
         type="text"
         name="image"
         required
         defaultValue={product?.image}
         placeholder="https://... ou /images/mon-image.jpg"
         className={inputClass}
         style={{ borderColor: "var(--border)" }}
        />
        {product?.image && (
          <div className="mt-2 relative w-24 h-24 border border-border overflow-hidden">
            <img
              src={product.image}
              alt="Aperçu"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 p-4 border border-border bg-card">
        <input
          type="checkbox"
          name="featured"
          id="featured"
          defaultChecked={!!product?.featured}
          className="w-4 h-4"
        />
        <label htmlFor="featured" className="text-sm font-medium text-foreground cursor-pointer">
          ⭐ Produit mis en avant (affiché sur la page d'accueil)
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300 disabled:opacity-50"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          {loading
            ? "Enregistrement..."
            : product
            ? "✓ Modifier le produit"
            : "✓ Ajouter le produit"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="px-8 py-3 text-xs tracking-widest uppercase font-medium border border-border hover:bg-accent transition"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}