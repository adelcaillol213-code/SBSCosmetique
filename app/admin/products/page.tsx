import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import DeleteProductButton from "./DeleteProductButton";

export default async function AdminProductsPage() {
  const allProducts = await db.select().from(products).all();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Produits</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-5 py-2.5 text-xs tracking-widest uppercase font-medium transition-all duration-300"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          <Plus className="w-4 h-4" />
          Ajouter
        </Link>
      </div>

      <div className="bg-card border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-accent/50">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs tracking-widest uppercase">Produit</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs tracking-widest uppercase">Catégorie</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs tracking-widest uppercase">Prix</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs tracking-widest uppercase">Stock</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs tracking-widest uppercase">Vedette</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium text-xs tracking-widest uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-border last:border-0 hover:bg-accent/30 transition"
              >
                <td className="py-3 px-4 font-medium text-foreground">
                  {product.name}
                </td>
                <td className="py-3 px-4 text-muted-foreground text-xs tracking-widest uppercase">
                  {product.category}
                </td>
                <td className="py-3 px-4 text-foreground font-medium">
                  {product.price.toFixed(2)} €
                </td>
                <td className="py-3 px-4 text-foreground">
                  {product.stock}
                </td>
                <td className="py-3 px-4">
                  {product.featured ? (
                    <span
                      className="px-2 py-1 text-xs font-medium tracking-widest uppercase"
                      style={{
                        backgroundColor: "var(--gold)",
                        color: "var(--foreground)",
                      }}
                    >
                      Oui
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium tracking-widest uppercase bg-accent text-muted-foreground">
                      Non
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={"/admin/products/" + product.id}
                      className="p-2 hover:bg-accent transition text-muted-foreground hover:text-foreground rounded-lg"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <DeleteProductButton productId={product.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {allProducts.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-sm tracking-widest uppercase">Aucun produit</p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 mt-4 text-xs tracking-widest uppercase"
              style={{ color: "var(--gold)" }}
            >
              <Plus className="w-4 h-4" />
              Ajouter un produit
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}