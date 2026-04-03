import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const db = drizzle(client, { schema });

const products = [
  {
    name: "Sneakers Urban Pro",
    description: "Chaussures de sport urbaines avec semelle amortissante. Parfaites pour la ville et le sport casual.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    category: "Chaussures",
    stock: 50,
    featured: true,
  },
  {
    name: "T-Shirt Premium Cotton",
    description: "T-shirt en coton bio 100%, coupe moderne et confortable. Disponible en plusieurs coloris.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    category: "Vêtements",
    stock: 100,
    featured: true,
  },
  {
    name: "Sac à Dos Explorer",
    description: "Sac à dos 30L imperméable avec compartiment laptop 15 pouces. Idéal pour les voyages et le quotidien.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    category: "Accessoires",
    stock: 75,
    featured: true,
  },
  {
    name: "Montre Classique Steel",
    description: "Montre analogique avec bracelet en acier inoxydable. Design élégant pour toutes occasions.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    category: "Montres",
    stock: 30,
    featured: true,
  },
  {
    name: "Casque Audio Pro",
    description: "Casque sans fil avec réduction de bruit active. Autonomie 30h et son haute fidélité.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    category: "Électronique",
    stock: 40,
    featured: true,
  },
  {
    name: "Veste Denim Classic",
    description: "Veste en jean vintage lavé, coupe droite. Un indémodable du vestiaire masculin et féminin.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&q=80",
    category: "Vêtements",
    stock: 60,
    featured: false,
  },
  {
    name: "Lunettes de Soleil Aviator",
    description: "Lunettes aviateur avec verres polarisés UV400. Monture en métal léger et résistant.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    category: "Accessoires",
    stock: 80,
    featured: false,
  },
  {
    name: "Parfum Boisé Intense",
    description: "Eau de parfum aux notes boisées et musquées. Tenue longue durée, 100ml.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
    category: "Beauté",
    stock: 45,
    featured: false,
  },
  {
    name: "Portefeuille Cuir Milano",
    description: "Portefeuille slim en cuir véritable avec protection RFID. 8 emplacements cartes.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    category: "Accessoires",
    stock: 90,
    featured: false,
  },
  {
    name: "Basket Running Elite",
    description: "Chaussure de running légère avec technologie de retour d'énergie. Pour les coureurs exigeants.",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
    category: "Chaussures",
    stock: 35,
    featured: false,
  },
  {
    name: "Sweat Hoodie Comfort",
    description: "Sweatshirt à capuche en molleton doux. Coupe oversize tendance, parfait pour les soirées fraîches.",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
    category: "Vêtements",
    stock: 70,
    featured: false,
  },
  {
    name: "Smartphone Stand Bamboo",
    description: "Support téléphone en bambou naturel, réglable et écologique. Compatible tous smartphones.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80",
    category: "Électronique",
    stock: 120,
    featured: false,
  },
];

async function seed() {
  console.log("🌱 Seeding Turso database...");

  for (const product of products) {
    await db.insert(schema.products).values({
      ...product,
      featured: product.featured ? 1 : 0,
    } as any);
  }

  console.log(`✅ ${products.length} produits ajoutés avec succès !`);
}

seed().catch(console.error);