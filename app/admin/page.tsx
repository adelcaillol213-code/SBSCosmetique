import { db } from "@/lib/db";
import { products, orders, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Package, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  const [allProducts, allOrders, allUsers] = await Promise.all([
    db.select().from(products).all(),
    db.select().from(orders).all(),
    db.select().from(users).all(),
  ]);

  const totalRevenue = allOrders
    .filter((o) => o.status === "paid" || o.status === "delivered")
    .reduce((sum, o) => sum + o.total, 0);

  const stats = [
    {
      title: "Produits",
      value: allProducts.length,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Commandes",
      value: allOrders.length,
      icon: ShoppingBag,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Utilisateurs",
      value: allUsers.length,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      title: "Revenus",
      value: totalRevenue.toFixed(2) + " €",
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-50 dark:bg-orange-900/20",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(({ title, value, icon: Icon, color, bg }) => (
          <div
            key={title}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-sm text-muted-foreground mt-1">{title}</p>
          </div>
        ))}
      </div>

      {/* Dernières commandes */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">
          Dernières commandes
        </h2>

        {allOrders.length === 0 ? (
          <p className="text-muted-foreground text-sm">Aucune commande pour le moment.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">ID</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Total</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Statut</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-border last:border-0">
                    <td className="py-3 px-4 font-medium">#{order.id}</td>
                    <td className="py-3 px-4">{order.total.toFixed(2)} €</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-accent">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}