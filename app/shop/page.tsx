import { getProducts, getCategories } from "@/lib/actions/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;

  const [allProducts, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const filtered = params.category
    ? allProducts.filter((p) => p.category === params.category)
    : allProducts;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-2">Boutique</h1>
          <p className="text-muted-foreground">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <Link
            href="/shop"
            className={[
              "px-4 py-2 rounded-xl text-sm font-medium transition border",
              !params.category
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:bg-accent",
            ].join(" ")}
          >
            Tous
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={"/shop?category=" + cat}
              className={[
                "px-4 py-2 rounded-xl text-sm font-medium transition border",
                params.category === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:bg-accent",
              ].join(" ")}
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>

      <Footer />
    </div>
  );
}