import ProductForm from "../ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">
        Ajouter un produit
      </h1>
      <ProductForm />
    </div>
  );
}