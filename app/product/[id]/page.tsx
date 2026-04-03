import { getProductById } from "@/lib/actions/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Package, Star } from "lucide-react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-accent">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.featured && (
              <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-semibold px-3 py-1.5 rounded-full">
                Coup de coeur
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <span className="text-sm text-primary font-medium uppercase tracking-wider mb-3">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm text-muted-foreground ml-2">(24 avis)</span>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-bold text-foreground">
                {product.price.toFixed(2)} €
              </span>
              <span className="text-sm text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full font-medium">
                En stock ({product.stock} disponibles)
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <AddToCartButton productId={product.id} />
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Package className="w-5 h-5" />
                Livraison gratuite des 50€ · Retours sous 30 jours
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}