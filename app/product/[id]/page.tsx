import { getProductById } from "@/lib/actions/products";
import { db } from "@/lib/db";
import { productImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";
import ProductTabs from "@/components/ProductTabs";
import { notFound } from "next/navigation";
import { Package, Star, Shield, Truck } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) notFound();

  // Récupère toutes les images du produit
  const extraImages = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, Number(id)))
    .all();

  const allImages = extraImages.length > 0
    ? extraImages.sort((a, b) => a.order - b.order).map(img => img.url)
    : [product.image];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-muted-foreground font-light">
          <Link href="/" className="hover:text-foreground transition">Accueil</Link>
          <span style={{ color: "var(--sage-light)" }}>—</span>
          <Link href="/shop" className="hover:text-foreground transition">Boutique</Link>
          <span style={{ color: "var(--sage-light)" }}>—</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="sage-divider" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Galerie */}
          <div className="animate-fade-in-up delay-100">
            <ProductGallery images={allImages} name={product.name} />
          </div>

          {/* Infos produit */}
          <div className="flex flex-col justify-center animate-fade-in-up delay-200">
            <p className="text-xs tracking-[0.4em] uppercase font-light mb-4"
              style={{ color: "var(--sage-light)" }}>
              {product.category}
            </p>

            <h1 className="font-serif text-5xl font-light text-foreground mb-4 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground tracking-widest uppercase font-light">
                4.8 · 3 avis
              </span>
            </div>

            <div className="sage-divider mb-6" />

            <p className="text-sm text-muted-foreground leading-relaxed font-light mb-8">
              {product.description}
            </p>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-serif text-5xl font-light text-foreground"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {product.price.toFixed(2)} €
              </span>
              <span className="text-xs tracking-widest uppercase font-light"
                style={{ color: "var(--sage-light)" }}>
                TTC
              </span>
            </div>

            <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs tracking-widest uppercase font-light text-muted-foreground">
                En stock — {product.stock} disponibles
              </span>
            </div>

            <div className="mb-10">
              <AddToCartButton productId={product.id} large />
            </div>

            <div className="sage-divider mb-8" />

            <div className="grid grid-cols-1 gap-3">
              {[
                { icon: Truck, text: "Livraison offerte dès 50€" },
                { icon: Shield, text: "Paiement 100% sécurisé" },
                { icon: Package, text: "Retours gratuits sous 30 jours" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 flex-shrink-0"
                    style={{ color: "var(--sage-light)" }} />
                  <span className="text-xs tracking-wide font-light text-muted-foreground">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Onglets */}
        <ProductTabs description={product.description} />

        <div className="mt-20 text-center">
          <div className="sage-divider mb-10 max-w-xs mx-auto" />
          <Link
            href="/shop"
            className="btn-hover inline-flex items-center gap-3 px-10 py-4 text-xs tracking-[0.3em] uppercase font-light border"
            style={{ borderColor: "var(--primary)", color: "var(--primary)" }}
          >
            Voir toute la collection
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}