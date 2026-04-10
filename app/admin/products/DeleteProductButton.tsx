"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteProductButton({ productId }: { productId: number }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Supprimer ce produit ?")) return;

    await fetch("/api/admin/products/" + productId, {
      method: "DELETE",
    });

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition text-muted-foreground hover:text-red-600"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}