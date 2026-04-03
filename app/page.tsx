import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/lib/actions/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Shield, Truck, RefreshCw } from "lucide-react";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-6">
              ✨ Nouvelle collection 2026
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Style &amp; Qualité{" "}
              <span className="text-primary">Premium</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Découvrez notre sélection exclusive de produits haut de gamme.
              Livraison rapide, retours gratuits.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition"
              >
                Découvrir la boutique
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/register"
                className="px-8 py-4 border border-border text-foreground font-semibold rounded-xl hover:bg-accent transition"
              >
                Créer un compte
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent hidden lg:block" />
      </section>

      {/* Features */}
      <section className="border-y border-border bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: "Livraison gratuite", desc: "Dès 50€ d'achat" },
              { icon: RefreshCw, title: "Retours gratuits", desc: "Sous 30 jours" },
              { icon: Shield, title: "Paiement sécurisé", desc: "Crypté SSL" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4 p-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Coups de cœur</h2>
            <p className="text-muted-foreground mt-2">Notre sélection du moment</p>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Voir tout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-primary rounded-3xl p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à découvrir nos produits ?
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            Plus de 12 produits sélectionnés pour vous.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition"
          >
            Voir la boutique <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}