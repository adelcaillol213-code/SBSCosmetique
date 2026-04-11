import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20" style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}>

      {/* Gold top line */}
      <div className="gold-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="mb-6">
              <p className="font-serif text-3xl font-bold tracking-widest"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                SBS
              </p>
              <p className="text-xs tracking-[0.4em] uppercase mt-1" style={{ color: "var(--gold)" }}>
                Cosmétique
              </p>
            </div>
            <div className="gold-divider mb-6" />
            <p className="text-xs leading-relaxed opacity-60 max-w-xs">
              L'art de la beauté naturelle et luxueuse. Des soins d'exception formulés pour sublimer votre éclat au quotidien.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase mb-6 opacity-60">
              Navigation
            </h3>
            <ul className="space-y-4">
              {[
                { href: "/", label: "Accueil" },
                { href: "/shop", label: "Boutique" },
                { href: "/cart", label: "Panier" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compte */}
          <div>
            <h3 className="text-xs tracking-[0.3em] uppercase mb-6 opacity-60">
              Mon Compte
            </h3>
            <ul className="space-y-4">
              {[
                { href: "/login", label: "Connexion" },
                { href: "/register", label: "Inscription" },
                { href: "/account", label: "Mon espace" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gold-divider my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-widest uppercase opacity-40">
            © 2026 SBS Cosmétique
          </p>
          <p className="text-xs tracking-widest uppercase opacity-40">
            Luxe · Naturel · Éthique
          </p>
        </div>
      </div>
    </footer>
  );
}