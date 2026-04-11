import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/db/schema";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card-hover group bg-card border border-border">
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
            <span
              className="absolute top-3 left-3 text-xs font-light px-3 py-1.5 tracking-widest uppercase"
              style={{ backgroundColor: "var(--mint)", color: "var(--foreground)" }}
            >
              Signature
            </span>
          )}
        </div>
      </Link>

      <div className="p-5">
        <p className="text-xs tracking-[0.25em] uppercase font-light mb-2"
          style={{ color: "var(--sage-light)" }}>
          {product.category}
        </p>
        <Link href={"/product/" + product.id}>
          <h3 className="font-serif text-xl font-light text-foreground mb-2 group-hover:opacity-60 transition-opacity leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {product.name}
          </h3>
        </Link>
        <p className="text-xs font-light text-muted-foreground line-clamp-2 mb-5 leading-relaxed">
          {product.description}
        </p>

        <div className="sage-divider mb-5" />

        <div className="flex items-center justify-between">
          <span className="font-serif text-2xl font-light text-foreground"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {product.price.toFixed(2)} €
          </span>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}