import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, createSessionCookieValue } from "@/lib/admin-auth";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000;
const attempts = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const now = Date.now();
  const entry = attempts.get(ip);

  if (entry && entry.resetAt > now && entry.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: "Trop de tentatives. Réessayez plus tard." }, { status: 429 });
  }

  let code: unknown;
  try {
    const body = await request.json();
    code = body?.code;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const expected = process.env.ADMIN_ACCESS_CODE;
  if (!expected || typeof code !== "string" || code !== expected) {
    const next = !entry || entry.resetAt <= now ? { count: 1, resetAt: now + WINDOW_MS } : { ...entry, count: entry.count + 1 };
    attempts.set(ip, next);
    return NextResponse.json({ error: "Code incorrect." }, { status: 401 });
  }

  attempts.delete(ip);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, await createSessionCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return response;
}
