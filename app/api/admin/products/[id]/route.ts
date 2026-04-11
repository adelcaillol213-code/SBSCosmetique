import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products, productImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Supprime d'abord les images liées
    await db.delete(productImages).where(eq(productImages.productId, Number(id)));
    await db.delete(products).where(eq(products.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    await db
      .update(products)
      .set({
        name: body.name,
        description: body.description,
        price: Number(body.price),
        image: body.images?.[0] || body.image,
        category: body.category,
        stock: Number(body.stock),
        featured: body.featured ? 1 : 0,
      } as any)
      .where(eq(products.id, Number(id)));

    // Met à jour les images supplémentaires
    if (body.images && body.images.length > 0) {
      await db.delete(productImages).where(eq(productImages.productId, Number(id)));
      for (let i = 0; i < body.images.length; i++) {
        if (body.images[i]) {
          await db.insert(productImages).values({
            productId: Number(id),
            url: body.images[i],
            order: i,
          });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}