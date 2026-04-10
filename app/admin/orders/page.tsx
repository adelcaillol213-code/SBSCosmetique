import { db } from "@/lib/db";
import { orders, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import OrderStatusButton from "./OrderStatusButton";

export default async function AdminOrdersPage() {
  const allOrders = await db.select().from(orders).all();

  const ordersWithUsers = await Promise.all(
    allOrders.map(async (order) => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, order.userId))
        .get();
      return { ...order, user };
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
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Commandes</h1>

      {ordersWithUsers.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <p className="text-muted-foreground">Aucune commande pour le moment.</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-accent/50">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">ID</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Client</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Total</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Statut</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ordersWithUsers.map((order) => (
                <tr key={order.id} className="border-b border-border last:border-0 hover:bg-accent/30 transition">
                  <td className="py-3 px-4 font-medium">#{order.id}</td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-foreground">{order.user?.name}</p>
                    <p className="text-xs text-muted-foreground">{order.user?.email}</p>
                  </td>
                  <td className="py-3 px-4 font-medium">{order.total.toFixed(2)} €</td>
                  <td className="py-3 px-4">
                    <span className={[
                      "px-2 py-1 rounded-full text-xs font-medium",
                      statusColors[order.status] || "",
                    ].join(" ")}>
                      {statusLabels[order.status] || order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end">
                      <OrderStatusButton orderId={order.id} currentStatus={order.status} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}