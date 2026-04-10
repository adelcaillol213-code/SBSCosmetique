import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import DeleteProductButton from "./DeleteProductButton";

export default async function AdminProductsPage() {
  const allProducts = await db.select().from(products).all();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Produits</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" />
          Ajouter un produit
        </Link>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-accent/50">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Produit</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Catégorie</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Prix</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Stock</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Vedette</th>
              <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={product.id} className="border-b border-border last:border-0 hover:bg-accent/30 transition">
                <td className="py-3 px-4 font-medium text-foreground">{product.name}</td>
                <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
                <td className="py-3 px-4 text-foreground">{product.price.toFixed(2)} €</td>
                <td className="py-3 px-4 text-foreground">{product.stock}</td>
                <td className="py-3 px-4">
                  {product.featured ? (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      Oui
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-accent text-muted-foreground">
                      Non
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={"/admin/products/" + product.id}
                      className="p-2 rounded-lg hover:bg-accent transition text-muted-foreground hover:text-foreground"
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
      </div>
    </div>
  );
}