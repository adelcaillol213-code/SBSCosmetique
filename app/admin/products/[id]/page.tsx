import { db } from "@/lib/db";
import { products, productImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import ProductForm from "../ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await db
    .select()
    .from(products)
    .where(eq(products.id, Number(id)))
    .get();

  if (!product) notFound();

  // Récupère les images existantes
  const images = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, Number(id)))
    .all();

  const imageUrls = images.length > 0
    ? images.sort((a, b) => a.order - b.order).map(img => img.url)
    : [product.image];

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">
        Modifier le produit
      </h1>
      <ProductForm product={product} existingImages={imageUrls} />
    </div>
  );
}