import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";

export async function POST(req: NextRequest) {
  const body = await req.json();

  await db.insert(products).values({
    name: body.name,
    description: body.description,
    price: Number(body.price),
    image: body.image,
    category: body.category,
    stock: Number(body.stock),
    featured: body.featured ? 1 : 0,
  } as any);

  return NextResponse.json({ success: true });
}