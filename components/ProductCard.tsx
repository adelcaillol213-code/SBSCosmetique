import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/db/schema";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-accent">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.featured && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
              Coup de cœur
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {product.category}
        </span>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-foreground mt-1 mb-2 hover:text-primary transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-foreground">
            {product.price.toFixed(2)} €
          </span>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}