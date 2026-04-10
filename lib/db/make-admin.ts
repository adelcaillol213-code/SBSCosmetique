import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const db = drizzle(client, { schema });

async function makeAdmin() {
  // Remplace par ton email
  const email = "adelcaillol@hotmail.com";

  await db
    .update(schema.users)
    .set({ role: "admin" })
    .where(eq(schema.users.email, email));

  console.log(`✅ ${email} est maintenant admin !`);
}

makeAdmin().catch(console.error);