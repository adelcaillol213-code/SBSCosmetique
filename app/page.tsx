import Link from "next/link";
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
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-float absolute top-20 right-20 w-96 h-96 rounded-full opacity-10"
            style={{ backgroundColor: "var(--gold)", filter: "blur(80px)" }} />
          <div className="animate-float delay-300 absolute bottom-20 left-20 w-64 h-64 rounded-full opacity-10"
            style={{ backgroundColor: "var(--primary)", filter: "blur(60px)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            <p className="animate-fade-in-up delay-100 text-xs tracking-[0.4em] uppercase mb-6 font-medium"
              style={{ color: "var(--gold)" }}>
              Maison de Cosmétique Naturelle
            </p>

            <h1 className="animate-fade-in-up delay-200 font-serif text-7xl md:text-8xl font-bold text-foreground leading-none mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              L'Art de la
              <span className="block italic gold-shimmer">
                Beauté Pure
              </span>
            </h1>

            <div className="animate-fade-in-up delay-300 gold-divider mb-8 max-w-xs" />

            <p className="animate-fade-in-up delay-400 text-base text-muted-foreground mb-12 leading-relaxed max-w-lg font-light tracking-wide">
              Des soins d'exception formulés avec les meilleurs ingrédients naturels. Une expérience beauté qui célèbre votre élégance naturelle.
            </p>

            <div className="animate-fade-in-up delay-500 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="btn-ripple btn-hover inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.3em] uppercase font-medium text-primary-foreground"
                style={{ backgroundColor: "var(--primary)" }}
              >
                Découvrir
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                className="btn-gold inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.3em] uppercase font-medium border"
                style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
              >
                Nous rejoindre
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Features */}
      <section className="bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { icon: Truck, title: "Livraison Offerte", desc: "Dès 50€ d'achat" },
              { icon: RefreshCw, title: "Retours Gratuits", desc: "Sous 30 jours" },
              { icon: Shield, title: "100% Naturel", desc: "Certifié bio" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-5 p-8 group">
                <Icon className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-125"
                  style={{ color: "var(--gold)" }} />
                <div>
                  <p className="text-xs tracking-widest uppercase font-medium text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase mb-4 font-medium"
            style={{ color: "var(--gold)" }}>
            Sélection Exclusive
          </p>
          <h2 className="font-serif text-5xl font-bold text-foreground mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Nos Coups de Cœur
          </h2>
          <div className="gold-divider max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/shop"
            className="btn-gold inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.3em] uppercase font-medium border"
            style={{ borderColor: "var(--gold)", color: "var(--gold)" }}
          >
            Voir toute la collection
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <div className="gold-divider" />

      {/* Values */}
      <section className="py-24" style={{ backgroundColor: "var(--card)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.4em] uppercase mb-4 font-medium"
              style={{ color: "var(--gold)" }}>
              Notre Philosophie
            </p>
            <h2 className="font-serif text-5xl font-bold text-foreground"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Nos Engagements
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { emoji: "🌿", title: "Ingrédients Naturels", desc: "Chaque formule est composée d'ingrédients d'origine naturelle, soigneusement sélectionnés pour leur efficacité et leur pureté." },
              { emoji: "🐰", title: "Cruelty-Free", desc: "Aucun test sur les animaux. Nous respectons toute forme de vie et nous engageons pour une beauté éthique et responsable." },
              { emoji: "♻️", title: "Éco-Responsable", desc: "Des emballages recyclables et une production respectueuse de l'environnement pour préserver notre planète." },
            ].map(({ emoji, title, desc }) => (
              <div key={title}
                className="card-hover text-center p-10 border border-border group"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="text-4xl mb-6 transition-transform duration-300 group-hover:scale-110 inline-block">
                  {emoji}
                </div>
                <div className="gold-divider mb-6 max-w-xs mx-auto transition-all duration-300 group-hover:max-w-full" />
                <h3 className="font-serif text-2xl font-bold text-foreground mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* CTA */}
      <section className="py-32 relative overflow-hidden" style={{ backgroundColor: "var(--primary)" }}>
        <div className="animate-float absolute top-10 right-10 w-64 h-64 rounded-full opacity-10"
          style={{ backgroundColor: "var(--gold)", filter: "blur(60px)" }} />
        <div className="max-w-3xl mx-auto px-4 text-center relative"
          style={{ color: "var(--primary-foreground)" }}>
          <p className="text-xs tracking-[0.4em] uppercase mb-6 font-medium"
            style={{ color: "var(--gold)" }}>
            Rejoignez-nous
          </p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Sublimez votre beauté naturelle
          </h2>
          <div className="gold-divider mb-8 max-w-xs mx-auto" />
          <p className="text-sm mb-12 opacity-80 font-light tracking-wide leading-relaxed">
            Rejoignez des milliers de femmes qui font confiance à SBS Cosmétique pour révéler leur beauté authentique.
          </p>
          <Link
            href="/shop"
            className="animate-glow btn-ripple inline-flex items-center gap-3 px-12 py-5 text-xs tracking-[0.3em] uppercase font-medium hover:opacity-90 transition-all duration-300"
            style={{ backgroundColor: "var(--gold)", color: "var(--foreground)" }}
          >
            Découvrir la collection
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}