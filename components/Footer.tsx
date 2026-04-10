import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-bold">SBS Cosmétique</span>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed max-w-xs">
              Des produits cosmétiques naturels et biologiques, formulés avec soin pour sublimer votre beauté au naturel.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-9 h-9 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition text-sm font-bold">
                ig
              </a>
              <a href="#" className="w-9 h-9 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition text-sm font-bold">
                fb
              </a>
              <a href="#" className="w-9 h-9 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition text-sm font-bold">
                tw
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-background/80 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-background/60 hover:text-background transition">Accueil</Link></li>
              <li><Link href="/shop" className="text-sm text-background/60 hover:text-background transition">Boutique</Link></li>
              <li><Link href="/cart" className="text-sm text-background/60 hover:text-background transition">Panier</Link></li>
            </ul>
          </div>

          {/* Compte */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-background/80 uppercase tracking-wider">
              Compte
            </h3>
            <ul className="space-y-3">
              <li><Link href="/login" className="text-sm text-background/60 hover:text-background transition">Connexion</Link></li>
              <li><Link href="/register" className="text-sm text-background/60 hover:text-background transition">Inscription</Link></li>
              <li><Link href="/account" className="text-sm text-background/60 hover:text-background transition">Mon compte</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/40">
            © 2026 SBS Cosmétique — Tous droits réservés
          </p>
          <p className="text-sm text-background/40">
            🌿 100% Naturel · 🐰 Cruelty-Free · ♻️ Éco-responsable
          </p>
        </div>
      </div>
    </footer>
  );
}