import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/lib/actions/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Leaf, Shield, Truck, RefreshCw, Star } from "lucide-react";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-8">
              <Leaf className="w-4 h-4" />
              100% Naturel & Bio
            </div>
            <h1 className="font-serif text-6xl md:text-7xl font-bold text-foreground leading-tight mb-6">
              La beauté
              <span className="block text-primary italic">au naturel</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Découvrez notre gamme de cosmétiques bio, formulés avec des ingrédients naturels soigneusement sélectionnés pour prendre soin de vous.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-2xl hover:opacity-90 transition text-sm"
              >
                Découvrir la boutique
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-border text-foreground font-semibold rounded-2xl hover:bg-accent transition text-sm"
              >
                Créer un compte
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 mt-10">
              <div className="flex -space-x-2">
                {["bg-green-200", "bg-yellow-200", "bg-pink-200", "bg-blue-200"].map((color, i) => (
                  <div key={i} className={`w-8 h-8 ${color} rounded-full border-2 border-background`} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">+2000 clientes satisfaites</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none hidden lg:block" />
        <div className="absolute right-32 top-1/4 w-48 h-48 bg-secondary/30 rounded-full blur-2xl pointer-events-none hidden lg:block" />
      </section>

      {/* Features */}
      <section className="border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: "Livraison gratuite", desc: "Dès 50€ d'achat" },
              { icon: RefreshCw, title: "Retours gratuits", desc: "Sous 30 jours" },
              { icon: Shield, title: "100% Naturel", desc: "Certifié bio" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4 p-4">
                <div className="p-3 bg-primary/10 rounded-2xl flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-primary text-sm font-medium uppercase tracking-widest mb-2">
              Sélection
            </p>
            <h2 className="font-serif text-4xl font-bold text-foreground">
              Nos coups de cœur
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Voir tout <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="sm:hidden text-center mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Voir tous les produits <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Values section */}
      <section className="bg-primary/5 border-y border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
              Nos engagements
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Chaque produit est formulé avec amour et respect pour vous et la planète.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { emoji: "🌿", title: "Ingrédients naturels", desc: "Tous nos ingrédients sont d'origine naturelle et certifiés biologiques." },
              { emoji: "🐰", title: "Cruelty-Free", desc: "Aucun test sur les animaux. Jamais. Nous respectons toute forme de vie." },
              { emoji: "♻️", title: "Éco-responsable", desc: "Emballages recyclables et processus de fabrication respectueux de l'environnement." },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="text-center p-8 bg-card rounded-3xl border border-border">
                <div className="text-4xl mb-4">{emoji}</div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-primary rounded-3xl p-12 md:p-16 text-center text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-8 text-6xl">🌿</div>
            <div className="absolute bottom-4 right-8 text-6xl">🌸</div>
            <div className="absolute top-1/2 left-1/4 text-4xl">✨</div>
          </div>
          <div className="relative">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Prête à sublimer votre beauté ?
            </h2>
            <p className="text-primary-foreground/80 mb-8 text-lg max-w-xl mx-auto">
              Rejoignez plus de 2000 femmes qui font confiance à SBS Cosmétique.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-10 py-4 bg-background text-foreground font-semibold rounded-2xl hover:opacity-90 transition"
            >
              Découvrir nos produits <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}