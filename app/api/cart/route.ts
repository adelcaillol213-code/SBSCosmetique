import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export type CartItem = {
  productId: number;
  quantity: number;
};

async function getCart(): Promise<CartItem[]> {
  const cookieStore = await cookies();
  const cart = cookieStore.get("cart");
  if (!cart) return [];
  try {
    return JSON.parse(cart.value);
  } catch {
    return [];
  }
}

function saveCart(res: NextResponse, cart: CartItem[]) {
  res.cookies.set("cart", JSON.stringify(cart), {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

// GET — récupère le panier
export async function GET() {
  const cart = await getCart();
  return NextResponse.json(cart);
}

// POST — ajoute un article
export async function POST(req: NextRequest) {
  const { productId, quantity } = await req.json();
  const cart = await getCart();

  const existing = cart.find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  const res = NextResponse.json({ success: true });
  saveCart(res, cart);
  return res;
}

// PUT — met à jour la quantité
export async function PUT(req: NextRequest) {
  const { productId, quantity } = await req.json();
  const cart = await getCart();

  if (quantity <= 0) {
    const updated = cart.filter((item) => item.productId !== productId);
    const res = NextResponse.json({ success: true });
    saveCart(res, updated);
    return res;
  }

  const item = cart.find((item) => item.productId === productId);
  if (item) item.quantity = quantity;

  const res = NextResponse.json({ success: true });
  saveCart(res, cart);
  return res;
}

// DELETE — vide le panier
export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.set("cart", "", { maxAge: 0, path: "/" });
  return res;
}