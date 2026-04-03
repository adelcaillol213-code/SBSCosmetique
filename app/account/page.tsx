import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { orders, orderItems, products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  User,
  Package,
  ShoppingBag,
  LogOut,
  ArrowRight,
} from "lucide-react";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Récupère les commandes de l'utilisateur
  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, Number(session.user.id)))
    .all();

  // Récupère les items pour chaque commande
  const ordersWithItems = await Promise.all(
    userOrders.map(async (order) => {
      const items = await db
        .select({
          quantity: orderItems.quantity,
          price: orderItems.price,
          productName: products.name,
          productImage: products.image,
        })
        .from(orderItems)
        .leftJoin(products, eq(orderItems.productId, products.id))
        .where(eq(orderItems.orderId, order.id))
        .all();

      return { ...order, items };
    })
  );

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
    paid: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    shipped: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    delivered: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
  };

  const statusLabels: Record<string, string> = {
    pending: "En attente",
    paid: "Payée",
    shipped: "Expédiée",
    delivered: "Livrée",
    cancelled: "Annulée",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header profil */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {session.user.name}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {session.user.email}
                </p>
              </div>
            </div>
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm text-muted-foreground hover:bg-accent transition"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </form>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-accent/50 rounded-xl p-4">
              <p className="text-2xl font-bold text-foreground">
                {userOrders.length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Commande{userOrders.length > 1 ? "s" : ""}
              </p>
            </div>
            <div className="bg-accent/50 rounded-xl p-4">
              <p className="text-2xl font-bold text-foreground">
                {userOrders
                  .filter((o) => o.status === "delivered")
                  .length}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Livrée{userOrders.filter((o) => o.status === "delivered").length > 1 ? "s" : ""}
              </p>
            </div>
            <div className="bg-accent/50 rounded-xl p-4">
              <p className="text-2xl font-bold text-foreground">
                {userOrders
                  .reduce((sum, o) => sum + o.total, 0)
                  .toFixed(2)} €
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Total dépensé
              </p>
            </div>
          </div>
        </div>

        {/* Historique commandes */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              Mes commandes
            </h2>
          </div>

          {ordersWithItems.length === 0 ? (
            <div className="bg-card border border-border rounded-2xl p-12 text-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Aucune commande pour l'instant
              </h3>
              <p className="text-muted-foreground mb-6">
                Découvrez nos produits et passez votre première commande !
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition"
              >
                Voir la boutique <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {ordersWithItems.map((order) => (
                <div
                  key={order.id}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  {/* Order header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-foreground">
                        Commande #{order.id}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={[
                          "px-3 py-1 rounded-full text-xs font-semibold",
                          statusColors[order.status] || "",
                        ].join(" ")}
                      >
                        {statusLabels[order.status] || order.status}
                      </span>
                      <span className="font-bold text-foreground">
                        {order.total.toFixed(2)} €
                      </span>
                    </div>
                  </div>

                  {/* Order items */}
                  {order.items.length > 0 && (
                    <div className="border-t border-border pt-4">
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-muted-foreground">
                              {item.productName} × {item.quantity}
                            </span>
                            <span className="font-medium text-foreground">
                              {(item.price * item.quantity).toFixed(2)} €
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}