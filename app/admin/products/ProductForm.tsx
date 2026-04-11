"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/db/schema";
import { Plus, Trash2 } from "lucide-react";

export default function ProductForm({ product, existingImages = [] }: {
  product?: Product;
  existingImages?: string[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [images, setImages] = useState<string[]>(
    existingImages.length > 0 ? existingImages : [product?.image || ""]
  );

  function addImage() {
    setImages([...images, ""]);
  }

  function removeImage(index: number) {
    if (images.length === 1) return;
    setImages(images.filter((_, i) => i !== index));
  }

  function updateImage(index: number, value: string) {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  }

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
      image: images[0],
      images: images.filter(img => img.trim() !== ""),
      category: formData.get("category") as string,
      stock: formData.get("stock") as string,
      featured: formData.get("featured") === "on",
    };

    if (data.images.length === 0) {
      setError("Ajoutez au moins une image.");
      setLoading(false);
      return;
    }

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
        setSuccess(product ? "Produit modifié !" : "Produit ajouté !");
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 1000);
      } else {
        setError(result.error || "Une erreur est survenue.");
      }
    } catch (err) {
      setError("Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full px-4 py-3 border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition text-sm font-light";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          ❌ {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3">
          ✅ {success}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-xs tracking-widest uppercase font-medium text-foreground">
          Nom du produit *
        </label>
        <input
          type="text"
          name="name"
          required
          defaultValue={product?.name}
          placeholder="Ex: Coffret Soin 3 Pièces"
          className={inputClass}
          style={{ borderColor: "var(--border)" }}
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs tracking-widest uppercase font-medium text-foreground">
          Description *
        </label>
        <textarea
          name="description"
          required
          defaultValue={product?.description}
          placeholder="Description détaillée..."
          rows={4}
          className={inputClass}
          style={{ borderColor: "var(--border)" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs tracking-widest uppercase font-medium text-foreground">
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
          <label className="text-xs tracking-widest uppercase font-medium text-foreground">
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
        <label className="text-xs tracking-widest uppercase font-medium text-foreground">
          Catégorie *
        </label>
        <input
          type="text"
          name="category"
          required
          defaultValue={product?.category}
          placeholder="Ex: Visage, Corps, Coffret..."
          className={inputClass}
          style={{ borderColor: "var(--border)" }}
        />
      </div>

      {/* Images multiples */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs tracking-widest uppercase font-medium text-foreground">
            Images du produit *
          </label>
          <button
            type="button"
            onClick={addImage}
            className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium px-3 py-2 border border-border hover:bg-accent transition"
          >
            <Plus className="w-3 h-3" />
            Ajouter une image
          </button>
        </div>

        <p className="text-xs text-muted-foreground font-light">
          URL externe (https://...) ou chemin local (/images/nom.jpg)
        </p>

        <div className="space-y-3">
          {images.map((img, index) => (
            <div key={index} className="flex gap-3 items-start">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-light w-16">
                    {index === 0 ? "Principale" : "Image " + (index + 1)}
                  </span>
                  {index === 0 && (
                    <span className="text-xs px-2 py-0.5 font-light"
                      style={{ backgroundColor: "var(--mint)", color: "var(--foreground)" }}>
                      Couverture
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  value={img}
                  onChange={(e) => updateImage(index, e.target.value)}
                  placeholder={index === 0 ? "Image principale..." : "Image supplémentaire..."}
                  className={inputClass}
                  style={{ borderColor: index === 0 ? "var(--primary)" : "var(--border)" }}
                />
                {/* Aperçu */}
                {img && (
                  <div className="relative w-20 h-20 border border-border overflow-hidden bg-card">
                    <img
                      src={img}
                      alt={"Aperçu " + (index + 1)}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="mt-8 p-2 text-muted-foreground hover:text-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 border border-border bg-card">
        <input
          type="checkbox"
          name="featured"
          id="featured"
          defaultChecked={!!product?.featured || (product?.featured as any) === 1}
          className="w-4 h-4"
        />
        <label htmlFor="featured" className="text-sm font-light text-foreground cursor-pointer">
          ⭐ Produit mis en avant (affiché sur la page d'accueil)
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300 disabled:opacity-50 btn-hover"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          {loading ? "Enregistrement..." : product ? "✓ Modifier" : "✓ Ajouter"}
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