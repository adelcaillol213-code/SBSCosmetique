"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Settings } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminButton() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Attend que le composant soit monté ET que la session soit chargée
  if (!mounted || status === "loading") return null;
  if (!session || (session.user as any)?.role !== "admin") return null;

  return (
    <Link
      href="/admin"
      className="flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase font-medium transition-all duration-300"
      style={{
        backgroundColor: "var(--gold)",
        color: "var(--foreground)",
      }}
    >
      <Settings className="w-3 h-3" />
      Admin
    </Link>
  );
}