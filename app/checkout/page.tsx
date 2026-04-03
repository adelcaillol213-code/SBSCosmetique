"use client";

import { useCart } from "@/hooks/useCart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Lock, ArrowRight, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shipping = total >= 50 ? 0 : 4.99;
  const grandTotal = total + shipping;

  async function handleCheckout() {
    if (items.length === 0) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue.");
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError("Erreur de connexion. Réessayez.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Votre panier est vide
          </h1>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition"
          >
            Voir la boutique <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-10">
          Finaliser la commande
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Récapitulatif produits */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Vos articles ({items.length})
            </h2>

            {items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 bg-card border border-border rounded-2xl p-4"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-accent flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Quantité : {item.quantity}
                  </p>
                </div>
                <p className="font-bold text-foreground">
                  {(item.price * item.quantity).toFixed(2)} €
                </p>
              </div>
            ))}
          </div>

          {/* Résumé paiement */}
          <div>
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Résumé de la commande
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Livraison</span>
                  <span className="text-green-600">
                    {shipping === 0 ? "Gratuite" : "4.99 €"}
                  </span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-bold text-foreground text-lg">Total</span>
                  <span className="font-bold text-xl text-foreground">
                    {grandTotal.toFixed(2)} €
                  </span>
                </div>
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg px-4 py-3 mb-4">
                  {error}
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Lock className="w-4 h-4" />
                {loading ? "Redirection vers Stripe..." : "Payer en sécurité"}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="w-3 h-3" />
                Paiement sécurisé par Stripe
              </div>

              <div className="mt-4 p-3 bg-accent rounded-xl">
                <p className="text-xs text-muted-foreground text-center font-medium mb-1">
                  Mode test Stripe
                </p>
                <p className="text-xs text-muted-foreground text-center">
                  Carte test : 4242 4242 4242 4242
                </p>
                <p className="text-xs text-muted-foreground text-center">
                  Date : 12/26 · CVC : 123
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}