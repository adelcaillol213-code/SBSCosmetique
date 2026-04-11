"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import AdminButton from "./AdminButton";
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
    <Link href="/cart" className="relative p-2 hover:opacity-70 transition">
      <ShoppingCart className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "var(--gold)", color: "var(--foreground)" }}>
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
      "sticky top-0 z-50 transition-all duration-500",
      scrolled
        ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
        : "bg-transparent",
    ].join(" ")}>

      {/* Gold top bar */}
      <div className="gold-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex flex-col items-start">
            <span className="font-serif text-2xl font-bold tracking-widest text-foreground"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              SBS
            </span>
            <span className="text-xs tracking-[0.3em] uppercase font-light"
              style={{ color: "var(--gold)" }}>
              Cosmétique
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { href: "/", label: "Accueil" },
              { href: "/shop", label: "Boutique" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs tracking-[0.2em] uppercase font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <AdminButton />
            <ThemeToggle />
            <CartBadge />

            {session ? (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  href="/account"
                  className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition"
                >
                  <User className="w-4 h-4" />
                  {session.user?.name?.split(" ")[0]}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-xs tracking-widest uppercase px-4 py-2 border border-border hover:border-foreground transition-colors duration-300"
                >
                  Quitter
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-xs tracking-widest uppercase px-4 py-2 border border-border hover:border-foreground transition-colors duration-300"
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="text-xs tracking-widest uppercase px-5 py-2 text-primary-foreground hover:opacity-90 transition"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  S'inscrire
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2 hover:opacity-70 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="gold-divider" />

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden py-6 border-b border-border bg-background space-y-4 px-8">
          <Link href="/" className="block text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Accueil</Link>
          <Link href="/shop" className="block text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Boutique</Link>
          <Link href="/cart" className="block text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Panier</Link>
          {session ? (
            <>
              <Link href="/account" className="block text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Mon compte</Link>
              <button onClick={() => signOut()} className="block text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground py-2">Déconnexion</button>
            </>
          ) : (
            <>
              <Link href="/login" className="block text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Connexion</Link>
              <Link href="/register" className="block text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>S'inscrire</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}