"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/hooks/useCart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle, ArrowRight, ShoppingBag } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const { clearCart, items } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const emailSent = useRef(false);

  useEffect(() => {
    if (emailSent.current) return;
    emailSent.current = true;

    clearCart();

    // Envoie l'email de confirmation
    if (sessionId) {
      fetch("/api/checkout/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      }).catch(console.error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-foreground mb-4">
          Commande confirmée !
        </h1>

        <p className="text-lg text-muted-foreground mb-8">
          Merci pour votre achat. Un email de confirmation vous a été envoyé.
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 mb-8 text-left">
          <h2 className="font-semibold text-foreground mb-3">Prochaines étapes</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
              Email de confirmation envoyé
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
              Préparation de votre commande (1-2 jours)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
              Livraison sous 3-5 jours ouvrés
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition"
          >
            Continuer mes achats <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/account"
            className="flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground font-semibold rounded-xl hover:bg-accent transition"
          >
            <ShoppingBag className="w-5 h-5" />
            Mes commandes
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}