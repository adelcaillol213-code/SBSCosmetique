# LuxeShop — E-commerce Next.js

Un site e-commerce complet construit avec Next.js 16, TypeScript, Tailwind CSS, et Stripe.

## 🚀 Technologies

- **Next.js 16** — App Router, Server Components, Server Actions
- **TypeScript** — Typage statique
- **Tailwind CSS v4** — Styles utilitaires
- **shadcn/ui** — Composants UI
- **Drizzle ORM + SQLite** — Base de données
- **NextAuth.js v5** — Authentification
- **Stripe** — Paiement en ligne (mode test)
- **Lucide React** — Icônes

## 📦 Installation

### 1. Clone le projet et installe les dépendances

npm install

### 2. Configure les variables d'environnement

Crée un fichier `.env.local` à la racine :

DATABASE_URL="./database.db"
AUTH_SECRET="ton-secret-32-caracteres"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"

### 3. Initialise la base de données

npm run db:push

### 4. Ajoute les produits de démonstration

npm run db:seed

### 5. Lance le serveur de développement

npm run dev

Ouvre http://localhost:3000

## 💳 Tester le paiement Stripe

Utilise ces informations de carte test :
- Numéro : 4242 4242 4242 4242
- Date : 12/26
- CVC : 123

## 📁 Structure du projet

ecommerce/
├── app/                    # Pages et routes Next.js
│   ├── api/               # API Routes
│   ├── account/           # Page Mon compte
│   ├── cart/              # Page Panier
│   ├── checkout/          # Page Checkout
│   ├── login/             # Page Connexion
│   ├── product/[id]/      # Page Produit
│   ├── register/          # Page Inscription
│   └── shop/              # Page Boutique
├── components/            # Composants React
├── hooks/                 # Custom hooks
├── lib/
│   ├── actions/           # Server Actions
│   └── db/                # Schéma et config DB
├── auth.ts                # Config NextAuth
├── middleware.ts          # Protection des routes
└── drizzle.config.ts      # Config Drizzle ORM

## 🌙 Fonctionnalités

- ✅ Page d'accueil avec hero et produits mis en avant
- ✅ Catalogue avec filtres par catégorie
- ✅ Page produit détaillée
- ✅ Panier dynamique avec cookies
- ✅ Inscription et connexion
- ✅ Page Mon compte avec historique
- ✅ Checkout avec Stripe
- ✅ Dark mode
- ✅ Design responsive