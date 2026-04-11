import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-0" style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}>
      <div className="sage-divider opacity-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <p className="text-3xl font-bold tracking-[0.3em] uppercase"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                SBS
              </p>
              <p className="text-xs tracking-[0.4em] uppercase font-light mt-1 opacity-60">
                Cosmétiques · Step by Step
              </p>
            </div>
            <div className="sage-divider mb-6 opacity-20" />
            <p className="text-xs font-light leading-relaxed opacity-50 max-w-xs">
              L'art du soin naturel en 3 étapes. Des formules d'exception pour une peau éclatante, lisse et réparée.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase mb-6 opacity-40 font-light">
              Navigation
            </h3>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Accueil" },
                { href: "/shop", label: "Boutique" },
                { href: "/cart", label: "Panier" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-xs tracking-widest uppercase font-light opacity-50 hover:opacity-100 transition-opacity">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compte */}
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase mb-6 opacity-40 font-light">
              Mon Compte
            </h3>
            <ul className="space-y-4">
              {[
                { href: "/login", label: "Connexion" },
                { href: "/register", label: "Inscription" },
                { href: "/account", label: "Mon espace" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-xs tracking-widest uppercase font-light opacity-50 hover:opacity-100 transition-opacity">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sage-divider my-10 opacity-20" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-widest uppercase opacity-30 font-light">
            © 2026 SBS Cosmétiques
          </p>
          <p className="text-xs tracking-widest uppercase opacity-30 font-light">
            Naturel · Éthique · Step by Step
          </p>
        </div>
      </div>
    </footer>
  );
}