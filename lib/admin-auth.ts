import type { NextRequest } from "next/server";

/**
 * Session admin sans état, basée sur un cookie signé (HMAC via Web Crypto).
 * Web Crypto est utilisé plutôt que le module `crypto` de Node afin de rester
 * compatible avec le runtime Edge du middleware Next.js.
 */
export const ADMIN_COOKIE_NAME = "hc_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 jours

async function hmacHex(data: string): Promise<string> {
  const secret = process.env.ADMIN_COOKIE_SECRET;
  if (!secret) throw new Error("ADMIN_COOKIE_SECRET is not set");
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionCookieValue(): Promise<string> {
  const expires = Date.now() + SESSION_TTL_MS;
  return `${expires}.${await hmacHex(`admin:${expires}`)}`;
}

export async function verifyAdminSession(cookieValue?: string | null): Promise<boolean> {
  if (!cookieValue) return false;
  const [expiresStr, sig] = cookieValue.split(".");
  if (!expiresStr || !sig) return false;
  const expires = Number(expiresStr);
  if (!expires || Date.now() > expires) return false;

  const expected = await hmacHex(`admin:${expires}`);
  if (sig.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) {
    diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

/** À utiliser en tête des routes /api/admin/**: renvoie true si la requête est authentifiée. */
export async function requireAdmin(request: NextRequest): Promise<boolean> {
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSession(cookie);
}
