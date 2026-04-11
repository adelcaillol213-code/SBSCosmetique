"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sophie M.",
    rating: 5,
    date: "Mars 2026",
    comment: "Produit absolument magnifique ! La texture est soyeuse et le parfum délicat. Je recommande vivement.",
    avatar: "S",
  },
  {
    name: "Isabelle D.",
    rating: 5,
    date: "Février 2026",
    comment: "J'utilise ce produit depuis 3 mois et ma peau n'a jamais été aussi belle. Un vrai luxe au quotidien.",
    avatar: "I",
  },
  {
    name: "Marie-Claire L.",
    rating: 4,
    date: "Janvier 2026",
    comment: "Très bonne qualité, packaging élégant. Livraison rapide. Je suis conquise !",
    avatar: "M",
  },
];

const ingredients = [
  { name: "Huile de Rose", benefit: "Hydratation intense & éclat" },
  { name: "Extrait d'Argan", benefit: "Nutrition & anti-âge" },
  { name: "Aloe Vera Bio", benefit: "Apaisement & douceur" },
  { name: "Vitamine E", benefit: "Protection & régénération" },
  { name: "Eau Florale", benefit: "Fraîcheur & équilibre" },
];

export default function ProductTabs({
  description,
}: {
  description: string;
}) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "ingredients", label: "Ingrédients" },
    { id: "reviews", label: "Avis (3)" },
  ];

  return (
    <div className="mt-16">
      {/* Tab headers */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
            style={{
              color: activeTab === tab.id ? "var(--gold)" : "var(--muted-foreground)",
            }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span
                className="absolute bottom-0 left-0 right-0 h-px transition-all duration-300"
                style={{ backgroundColor: "var(--gold)" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-10">

        {/* Description */}
        {activeTab === "description" && (
          <div className="animate-fade-in max-w-2xl">
            <p className="text-sm text-muted-foreground leading-relaxed font-light mb-6">
              {description}
            </p>
            <div className="gold-divider mb-6 max-w-xs" />
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Type de peau", value: "Tous types" },
                { label: "Contenance", value: "50 ml" },
                { label: "Origine", value: "France" },
                { label: "Certification", value: "Bio & Naturel" },
              ].map(({ label, value }) => (
                <div key={label} className="p-4 border border-border">
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">{label}</p>
                  <p className="text-sm font-medium text-foreground">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ingrédients */}
        {activeTab === "ingredients" && (
          <div className="animate-fade-in max-w-2xl">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-8">
              Ingrédients clés
            </p>
            <div className="space-y-4">
              {ingredients.map(({ name, benefit }, i) => (
                <div
                  key={name}
                  className="flex items-center justify-between p-5 border border-border group card-hover"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-full"
                      style={{ backgroundColor: "var(--gold)", color: "var(--foreground)" }}
                    >
                      {i + 1}
                    </span>
                    <span className="font-serif text-lg font-bold text-foreground"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground tracking-wide">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 border border-border bg-card">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">Liste complète :</span>{" "}
                Aqua, Rosa Damascena Flower Water, Argania Spinosa Kernel Oil,
                Aloe Barbadensis Leaf Juice*, Tocopherol, Glycerin*, Rosa Canina Fruit Oil*,
                Parfum naturel. *Ingrédients d'origine biologique.
              </p>
            </div>
          </div>
        )}

        {/* Avis */}
        {activeTab === "reviews" && (
          <div className="animate-fade-in max-w-2xl">
            {/* Rating global */}
            <div className="flex items-center gap-8 mb-10 p-8 border border-border bg-card">
              <div className="text-center">
                <p className="font-serif text-6xl font-bold text-foreground"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  4.8
                </p>
                <div className="flex gap-1 justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2 tracking-widest uppercase">
                  3 avis
                </p>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-4">{star}</span>
                    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          backgroundColor: "var(--gold)",
                          width: star === 5 ? "70%" : star === 4 ? "20%" : "0%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Liste avis */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.name} className="p-6 border border-border card-hover">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
                      >
                        {review.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed font-light italic">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}