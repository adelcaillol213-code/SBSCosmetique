"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Image principale */}
      <div
        className="relative w-full overflow-hidden bg-card"
        style={{
          paddingBottom: "100%",
          border: "1px solid var(--border)",
        }}
      >
        <Image
          src={images[selected]}
          alt={name}
          fill
          className="object-contain p-8 transition-all duration-500"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />

        {/* Coins décoratifs */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t border-l"
          style={{ borderColor: "var(--sage-light)" }} />
        <div className="absolute top-3 right-3 w-6 h-6 border-t border-r"
          style={{ borderColor: "var(--sage-light)" }} />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l"
          style={{ borderColor: "var(--sage-light)" }} />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r"
          style={{ borderColor: "var(--sage-light)" }} />
      </div>

      {/* Miniatures — seulement si plusieurs images */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="relative overflow-hidden bg-card transition-all duration-300"
              style={{
                paddingBottom: "100%",
                border: selected === i
                  ? "2px solid var(--primary)"
                  : "1px solid var(--border)",
                opacity: selected === i ? 1 : 0.5,
              }}
            >
              <img
                src={img}
                alt={name + " " + (i + 1)}
                className="absolute inset-0 w-full h-full object-contain p-2 hover:opacity-80 transition-opacity"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}