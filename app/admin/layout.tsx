import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, ArrowLeft } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if ((session.user as any).role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col fixed h-full">
        <div className="p-6 border-b border-border">
          <h1 className="font-bold text-lg text-foreground">Panel Admin</h1>
          <p className="text-xs text-muted-foreground mt-1">LuxeShop</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition"
          >
            <Package className="w-4 h-4" />
            Produits
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition"
          >
            <ShoppingBag className="w-4 h-4" />
            Commandes
          </Link>
        </nav>

        <div className="p-4 border-t border-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}