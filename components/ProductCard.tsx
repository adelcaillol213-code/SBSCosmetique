import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/db/schema";
import AddToCartButton from "./AddToCartButton";
import { Leaf } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      <Link href={"/product/" + product.id}>
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.featured && (
            <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              Coup de cœur
            </span>
          )}
        </div>
      </Link>

      <div className="p-5">
        <span className="text-xs text-primary font-medium uppercase tracking-wider">
          {product.category}
        </span>
        <Link href={"/product/" + product.id}>
          <h3 className="font-serif font-bold text-foreground mt-1 mb-2 hover:text-primary transition text-lg leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-foreground">
            {product.price.toFixed(2)} €
          </span>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}