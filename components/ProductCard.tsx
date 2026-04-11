import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/db/schema";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card-hover group bg-card border border-border"
      style={{ borderColor: "var(--border)" }}>
      <Link href={"/product/" + product.id}>
        <div className="img-zoom relative aspect-square bg-secondary/30">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.featured && (
            <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1.5 tracking-widest uppercase"
              style={{ backgroundColor: "var(--gold)", color: "var(--foreground)" }}>
              Sélection
            </span>
          )}
        </div>
      </Link>

      <div className="p-5">
        <p className="text-xs tracking-[0.2em] uppercase font-medium mb-2"
          style={{ color: "var(--gold)" }}>
          {product.category}
        </p>
        <Link href={"/product/" + product.id}>
          <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:opacity-70 transition-opacity leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-5 leading-relaxed font-light">
          {product.description}
        </p>

        <div className="gold-divider mb-5 transition-all duration-300 group-hover:opacity-100 opacity-50" />

        <div className="flex items-center justify-between">
          <span className="font-serif text-2xl font-bold text-foreground"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {product.price.toFixed(2)} €
          </span>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}