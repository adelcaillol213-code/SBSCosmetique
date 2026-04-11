"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  mainImage,
  name,
}: {
  mainImage: string;
  name: string;
}) {
  const [selected, setSelected] = useState(0);

  // Images simulées (la principale + variantes)
  const images = [
    mainImage,
    mainImage + "&w=400&h=400&fit=crop&crop=top",
    mainImage + "&w=400&h=400&fit=crop&crop=bottom",
    mainImage + "&w=400&h=400&fit=crop&crop=left",
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Image principale */}
      <div className="relative aspect-square overflow-hidden bg-card"
        style={{ border: "1px solid var(--border)" }}>
        <Image
          src={images[selected]}
          alt={name}
          fill
          className="object-cover transition-all duration-700"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        {/* Gold corners */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t border-l"
          style={{ borderColor: "var(--gold)" }} />
        <div className="absolute top-3 right-3 w-6 h-6 border-t border-r"
          style={{ borderColor: "var(--gold)" }} />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l"
          style={{ borderColor: "var(--gold)" }} />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r"
          style={{ borderColor: "var(--gold)" }} />
      </div>

      {/* Miniatures */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="relative aspect-square overflow-hidden transition-all duration-300"
            style={{
              border: selected === i
                ? "2px solid var(--gold)"
                : "1px solid var(--border)",
              opacity: selected === i ? 1 : 0.6,
            }}
          >
            <Image
              src={img}
              alt={name + " " + (i + 1)}
              fill
              className="object-cover hover:scale-110 transition-transform duration-500"
              sizes="100px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}