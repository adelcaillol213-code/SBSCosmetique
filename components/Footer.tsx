import Link from "next/link";
import { Store } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <Store className="w-5 h-5 text-primary" />
              LuxeShop
            </Link>
            <p className="text-sm text-muted-foreground">
              Votre boutique premium en ligne. Qualité et style garantis.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition">Accueil</Link></li>
              <li><Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground transition">Boutique</Link></li>
              <li><Link href="/cart" className="text-sm text-muted-foreground hover:text-foreground transition">Panier</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Compte</h3>
            <ul className="space-y-2">
              <li><Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition">Connexion</Link></li>
              <li><Link href="/register" className="text-sm text-muted-foreground hover:text-foreground transition">Inscription</Link></li>
              <li><Link href="/account" className="text-sm text-muted-foreground hover:text-foreground transition">Mon compte</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2026 LuxeShop. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}