"use server";

import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getProducts() {
  return await db.select().from(products).all();
}

export async function getFeaturedProducts() {
  return await db
    .select()
    .from(products)
    .where(eq(products.featured, true))
    .all();
}

export async function getProductById(id: number) {
  return await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .get();
}

export async function getProductsByCategory(category: string) {
  return await db
    .select()
    .from(products)
    .where(eq(products.category, category))
    .all();
}

export async function getCategories(): Promise<string[]> {
  const result = await db.select({ category: products.category }).from(products).all();
  const unique = [...new Set(result.map((r) => r.category))];
  return unique;
}
