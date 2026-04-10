import { NextRequest, NextResponse } from "next/server";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { db } from "@/lib/db";
import { orders, orderItems, products, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // Récupère la dernière commande de l'utilisateur
    const lastOrder = await db
      .select()
      .from(orders)
      .where(eq(orders.userId, Number(session.user.id)))
      .all()
      .then((orders) => orders[orders.length - 1]);

    if (!lastOrder) {
      return NextResponse.json({ error: "Commande non trouvée" }, { status: 404 });
    }

    // Récupère les items de la commande
    const items = await db
      .select({
        quantity: orderItems.quantity,
        price: orderItems.price,
        productName: products.name,
      })
      .from(orderItems)
      .leftJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, lastOrder.id))
      .all();

    // Envoie l'email
    await sendOrderConfirmationEmail({
      to: session.user.email!,
      name: session.user.name!,
      orderId: lastOrder.id,
      items: items.map((i) => ({
        name: i.productName || "Produit",
        quantity: i.quantity,
        price: i.price,
      })),
      total: lastOrder.total,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Confirm email error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}