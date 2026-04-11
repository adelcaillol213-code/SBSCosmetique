import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products, productImages } from "@/lib/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await db.insert(products).values({
      name: body.name,
      description: body.description,
      price: Number(body.price),
      image: body.images?.[0] || body.image,
      category: body.category,
      stock: Number(body.stock),
      featured: body.featured ? 1 : 0,
    } as any).returning();

    const productId = result[0].id;

    // Ajoute les images supplémentaires
    if (body.images && body.images.length > 0) {
      for (let i = 0; i < body.images.length; i++) {
        if (body.images[i]) {
          await db.insert(productImages).values({
            productId,
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