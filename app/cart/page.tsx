"use client";

import { useCart } from "@/hooks/useCart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { items, loading, total, updateQuantity, removeItem, clearCart } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-accent rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
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
          <p className="text-muted-foreground mb-8">
            Découvrez nos produits et ajoutez-en à votre panier !
          </p>
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-foreground">Mon Panier</h1>
          <button
            onClick={clearCart}
            className="text-sm text-muted-foreground hover:text-destructive transition flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Vider le panier
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex gap-4 bg-card border border-border rounded-2xl p-4"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-accent flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <Link
                    href={"/product/" + item.productId}
                    className="font-semibold text-foreground hover:text-primary transition line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <p className="text-primary font-bold mt-1">
                    {item.price.toFixed(2)} €
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-medium text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-foreground">
                        {(item.price * item.quantity).toFixed(2)} €
                      </span>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-2 text-muted-foreground hover:text-destructive transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Récapitulatif
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="font-medium">{total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Livraison</span>
                  <span className="font-medium text-green-600">
                    {total >= 50 ? "Gratuite" : "4.99 €"}
                  </span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-xl text-foreground">
                    {(total >= 50 ? total : total + 4.99).toFixed(2)} €
                  </span>
                </div>
              </div>

              {total < 50 && (
                <p className="text-xs text-muted-foreground mb-4 bg-accent rounded-lg p-3">
                  Plus que {(50 - total).toFixed(2)} € pour la livraison gratuite !
                </p>
              )}

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition"
              >
                Commander <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/shop"
                className="w-full flex items-center justify-center gap-2 py-3 mt-3 border border-border text-foreground font-medium rounded-xl hover:bg-accent transition text-sm"
              >
                Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}