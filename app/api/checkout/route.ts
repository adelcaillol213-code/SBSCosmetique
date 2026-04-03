import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return NextResponse.json(
    { error: "Paiement Stripe non configuré pour le moment." },
    { status: 503 }
  );
}