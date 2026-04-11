import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
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

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">
        Modifier le produit
      </h1>
      <ProductForm product={product} />
    </div>
  );
}