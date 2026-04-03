"use server";

import { signIn, signOut } from "@/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error: any) {
    if (error?.message?.includes("CredentialsSignin")) {
      return { error: "Email ou mot de passe incorrect." };
    }
    throw error;
  }
}

export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Tous les champs sont obligatoires." };
  }

  if (password.length < 6) {
    return { error: "Le mot de passe doit contenir au moins 6 caractères." };
  }

  // Vérifie si l'email existe déjà
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .get();

  if (existing) {
    return { error: "Cet email est déjà utilisé." };
  }

  // Hash le mot de passe
  const hashedPassword = await bcrypt.hash(password, 12);

  // Crée l'utilisateur
  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  // Connecte automatiquement après inscription
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  });
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
