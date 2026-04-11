"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingCart, User, Menu, X, Settings } from "lucide-react";
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
    <Link href="/cart" className="relative p-2 hover:opacity-60 transition">
      <ShoppingCart className="w-5 h-5" />
      {count > 0 && (
        <span
          className="absolute -top-1 -right-1 text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          {count}
        </span>
      )}
    </Link>
  );
}

export default function Header() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdmin = mounted && status !== "loading" && (session?.user as any)?.role === "admin";

  return (
    <header className={[
      "sticky top-0 z-50 transition-all duration-500",
      scrolled
        ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
        : "bg-transparent",
    ].join(" ")}>

      {/* Top bar */}
      <div className="sage-divider" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex flex-col items-start">
            <span
              className="text-2xl font-bold tracking-[0.3em] uppercase"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "var(--primary)",
              }}
            >
              SBS
            </span>
            <span
              className="text-xs tracking-[0.4em] uppercase font-light -mt-1"
              style={{ color: "var(--muted-foreground)" }}
            >
              Cosmétiques
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
                className="nav-link text-xs tracking-[0.25em] uppercase font-light text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden md:flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase font-medium border btn-hover"
                style={{
                  borderColor: "var(--primary)",
                  color: "var(--primary)",
                }}
              >
                <Settings className="w-3 h-3" />
                Admin
              </Link>
            )}

            <ThemeToggle />
            <CartBadge />

            {mounted && status !== "loading" && (
              session ? (
                <div className="hidden md:flex items-center gap-4">
                  <Link
                    href="/account"
                    className="flex items-center gap-2 text-xs tracking-widest uppercase font-light text-muted-foreground hover:text-foreground transition"
                  >
                    <User className="w-4 h-4" />
                    {session.user?.name?.split(" ")[0]}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-xs tracking-widest uppercase font-light px-4 py-2 border border-border hover:border-foreground transition-colors duration-300"
                  >
                    Quitter
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  <Link
                    href="/login"
                    className="text-xs tracking-widest uppercase font-light px-4 py-2 border border-border hover:border-foreground transition-colors duration-300"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/register"
                    className="text-xs tracking-widest uppercase font-light px-5 py-2 btn-hover"
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                    }}
                  >
                    S'inscrire
                  </Link>
                </div>
              )
            )}

            <button
              className="md:hidden p-2 hover:opacity-60 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <div className="sage-divider" />

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden py-6 border-b border-border bg-background space-y-4 px-8">
          <Link href="/" className="block text-xs tracking-widest uppercase font-light text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Accueil</Link>
          <Link href="/shop" className="block text-xs tracking-widest uppercase font-light text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Boutique</Link>
          <Link href="/cart" className="block text-xs tracking-widest uppercase font-light text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Panier</Link>
          {isAdmin && (
            <Link href="/admin" className="block text-xs tracking-widest uppercase py-2 font-medium" style={{ color: "var(--primary)" }} onClick={() => setMenuOpen(false)}>
              Panel Admin
            </Link>
          )}
          {mounted && status !== "loading" && (
            session ? (
              <>
                <Link href="/account" className="block text-xs tracking-widest uppercase font-light text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Mon compte</Link>
                <button onClick={() => signOut()} className="block text-xs tracking-widest uppercase font-light text-muted-foreground hover:text-foreground py-2">Déconnexion</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-xs tracking-widest uppercase font-light text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>Connexion</Link>
                <Link href="/register" className="block text-xs tracking-widest uppercase font-light text-muted-foreground hover:text-foreground py-2" onClick={() => setMenuOpen(false)}>S'inscrire</Link>
              </>
            )
          )}
        </div>
      )}
    </header>
  );
}