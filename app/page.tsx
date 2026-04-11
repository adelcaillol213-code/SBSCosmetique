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
        {/* Decorative blobs */}
        <div className="absolute top-20 right-10 w-80 h-80 rounded-full opacity-30 animate-float"
          style={{ backgroundColor: "var(--mint)", filter: "blur(60px)" }} />
        <div className="absolute bottom-20 left-10 w-60 h-60 rounded-full opacity-20 animate-float"
          style={{ backgroundColor: "var(--pink)", filter: "blur(50px)", animationDelay: "2s" }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — Text */}
            <div>
              <p className="animate-fade-in-up delay-100 step-badge mb-4"
                style={{ color: "var(--muted-foreground)" }}>
                Step by Step
              </p>

              <h1 className="animate-fade-in-up delay-200 font-serif text-6xl md:text-7xl font-light text-foreground leading-tight mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Soin intensif
                <span className="block italic font-light" style={{ color: "var(--sage-light)" }}>
                  en 3 étapes
                </span>
              </h1>

              <div className="animate-fade-in-up delay-300 sage-divider mb-8 max-w-xs" />

              <p className="animate-fade-in-up delay-400 text-sm font-light text-muted-foreground mb-10 leading-relaxed max-w-md tracking-wide">
                Peau éclatante, lisse et réparée. Nos formules naturelles agissent en synergie pour révéler votre beauté authentique.
              </p>

              <div className="animate-fade-in-up delay-500 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="btn-ripple btn-hover inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.3em] uppercase font-light"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                  }}
                >
                  Découvrir
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/shop"
                  className="btn-hover inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.3em] uppercase font-light border"
                  style={{
                    borderColor: "var(--primary)",
                    color: "var(--primary)",
                  }}
                >
                  Voir la collection
                </Link>
              </div>
            </div>

            {/* Right — Steps */}
            <div className="animate-fade-in-up delay-300 hidden lg:grid grid-cols-3 gap-4">
              {[
                { step: "01", name: "Gel Peeling", desc: "Élimine les impuretés", color: "var(--pink)" },
                { step: "02", name: "Gel Activateur", desc: "Stimule la régénération", color: "var(--mint)" },
                { step: "03", name: "Masque Réparateur", desc: "Répare & illumine", color: "var(--pink)" },
              ].map(({ step, name, desc, color }) => (
                <div
                  key={step}
                  className="card-hover p-6 flex flex-col items-center text-center border border-border bg-card"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xs font-light tracking-widest"
                    style={{ backgroundColor: color, color: "var(--foreground)" }}
                  >
                    {step}
                  </div>
                  <p className="text-xs tracking-widest uppercase font-medium text-foreground mb-1">{name}</p>
                  <p className="text-xs font-light text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="sage-divider" />

      {/* Features */}
      <section style={{ backgroundColor: "var(--card)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { icon: Truck, title: "Livraison Offerte", desc: "Dès 50€ d'achat" },
              { icon: RefreshCw, title: "Retours Gratuits", desc: "Sous 30 jours" },
              { icon: Shield, title: "100% Naturel", desc: "Certifié bio" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-5 p-8 group">
                <Icon
                  className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: "var(--sage-light)" }}
                />
                <div>
                  <p className="text-xs tracking-widest uppercase font-medium text-foreground">{title}</p>
                  <p className="text-xs font-light text-muted-foreground mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sage-divider" />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <p className="step-badge mb-4" style={{ color: "var(--muted-foreground)" }}>
            Sélection
          </p>
          <h2 className="font-serif text-5xl font-light text-foreground mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Nos Soins Signature
          </h2>
          <div className="sage-divider max-w-xs mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            href="/shop"
            className="btn-hover inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.3em] uppercase font-light border"
            style={{ borderColor: "var(--primary)", color: "var(--primary)" }}
          >
            Voir toute la collection
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <div className="sage-divider" />

      {/* Steps section */}
      <section className="py-24" style={{ backgroundColor: "var(--card)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="step-badge mb-4" style={{ color: "var(--muted-foreground)" }}>
              Notre méthode
            </p>
            <h2 className="font-serif text-5xl font-light text-foreground"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Step by Step
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "Step 1", name: "Gel Peeling", desc: "Exfolie délicatement la peau pour éliminer les cellules mortes et préparer la peau à recevoir les soins suivants.", color: "var(--pink)" },
              { step: "Step 2", name: "Gel Activateur", desc: "Stimule la régénération cellulaire et booste l'éclat naturel de votre peau pour un teint lumineux.", color: "var(--mint)" },
              { step: "Step 3", name: "Masque Réparateur", desc: "Répare, nourrit et illumine en profondeur. La touche finale pour une peau parfaitement régénérée.", color: "var(--pink)" },
            ].map(({ step, name, desc, color }) => (
              <div
                key={step}
                className="card-hover group border border-border p-10 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: color }}
                >
                  <span className="font-serif text-xs tracking-widest uppercase font-light"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--foreground)" }}>
                    {step.split(" ")[1]}
                  </span>
                </div>
                <div className="sage-divider mb-6 max-w-xs mx-auto" />
                <h3 className="font-serif text-2xl font-light text-foreground mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {name}
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sage-divider" />

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="step-badge mb-4" style={{ color: "var(--muted-foreground)" }}>
              Notre philosophie
            </p>
            <h2 className="font-serif text-5xl font-light text-foreground"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Nos Engagements
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { emoji: "🌿", title: "Ingrédients Naturels", desc: "Formules composées d'ingrédients d'origine naturelle, soigneusement sélectionnés pour leur efficacité et pureté." },
              { emoji: "🐰", title: "Cruelty-Free", desc: "Aucun test sur les animaux. Nous respectons toute forme de vie pour une beauté éthique et responsable." },
              { emoji: "♻️", title: "Éco-Responsable", desc: "Emballages recyclables et production respectueuse de l'environnement pour préserver notre planète." },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="card-hover text-center p-10 border border-border group">
                <div className="text-4xl mb-6 inline-block transition-transform duration-300 group-hover:scale-110">
                  {emoji}
                </div>
                <div className="sage-divider mb-6 max-w-xs mx-auto" />
                <h3 className="font-serif text-2xl font-light text-foreground mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {title}
                </h3>
                <p className="text-sm font-light text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sage-divider" />

      {/* CTA */}
      <section className="py-32 relative overflow-hidden"
        style={{ backgroundColor: "var(--primary)" }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 animate-float"
          style={{ backgroundColor: "var(--mint)", filter: "blur(80px)" }} />
        <div className="max-w-3xl mx-auto px-4 text-center relative"
          style={{ color: "var(--primary-foreground)" }}>
          <p className="step-badge mb-6 opacity-70">
            Rejoignez-nous
          </p>
          <h2 className="font-serif text-5xl md:text-6xl font-light mb-6 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Sublimez votre beauté naturelle
          </h2>
          <div className="sage-divider mb-8 max-w-xs mx-auto opacity-30" />
          <p className="text-sm mb-12 opacity-70 font-light tracking-wide leading-relaxed">
            Des milliers de femmes font confiance à SBS Cosmétiques pour révéler leur beauté authentique.
          </p>
          <Link
            href="/shop"
            className="btn-ripple btn-hover inline-flex items-center gap-3 px-12 py-5 text-xs tracking-[0.3em] uppercase font-light"
            style={{ backgroundColor: "var(--background)", color: "var(--primary)" }}
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