"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, User, Menu, X, Leaf } from "lucide-react";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

function CartBadge() {
  const [count, setCount] = useState(0);

  async function fetchCount() {
    try {
      const res = await fetch("/api/cart");
      const items = await res.json();
      const total = items.reduce(
        (sum: number, item: { quantity: number }) => sum + item.quantity,
        0
      );
      setCount(total);
    } catch {
      setCount(0);
    }
  }

  useEffect(() => {
    fetchCount();
    window.addEventListener("cart-updated", fetchCount);
    return () => window.removeEventListener("cart-updated", fetchCount);
  }, []);

  return (
    <Link href="/cart" className="relative p-2 rounded-xl hover:bg-accent transition">
      <ShoppingCart className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}

export default function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={[
      "sticky top-0 z-50 transition-all duration-300",
      scrolled
        ? "bg-background/90 backdrop-blur-md shadow-sm border-b border-border"
        : "bg-transparent",
    ].join(" ")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-bold text-foreground">
              SBS Cosmétique
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition font-medium">
              Accueil
            </Link>
            <Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground transition font-medium">
              Boutique
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <CartBadge />

            {session ? (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/account"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
                >
                  <User className="w-4 h-4" />
                  {session.user?.name?.split(" ")[0]}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm px-4 py-2 rounded-xl border border-border hover:bg-accent transition"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-sm px-4 py-2 rounded-xl border border-border hover:bg-accent transition font-medium"
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="text-sm px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition font-medium"
                >
                  S'inscrire
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2 rounded-xl hover:bg-accent transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-border space-y-3 bg-background rounded-b-2xl px-4">
            <Link href="/" className="block text-sm text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Accueil</Link>
            <Link href="/shop" className="block text-sm text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Boutique</Link>
            <Link href="/cart" className="block text-sm text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Panier</Link>
            {session ? (
              <>
                <Link href="/account" className="block text-sm text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Mon compte</Link>
                <button onClick={() => signOut()} className="block text-sm text-muted-foreground hover:text-foreground py-2">Déconnexion</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-sm text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Connexion</Link>
                <Link href="/register" className="block text-sm text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>S'inscrire</Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}