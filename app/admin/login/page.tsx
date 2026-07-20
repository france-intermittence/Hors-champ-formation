"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Une erreur est survenue.");
        setLoading(false);
        return;
      }
      const next = searchParams.get("next") || "/admin";
      router.push(next);
      router.refresh();
    } catch {
      setError("Une erreur est survenue.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-sm border border-line bg-paper p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center border border-ink bg-ink text-canvas">
            <Lock className="h-4 w-4" aria-hidden />
          </span>
          <p className="font-condensed text-lg font-semibold uppercase tracking-wide2 text-ink">
            Accès admin
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="code"
              className="mb-2 block font-condensed text-xs font-semibold uppercase tracking-wide2 text-muted"
            >
              Code d&apos;accès
            </label>
            <input
              id="code"
              type="password"
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border border-line bg-canvas px-4 py-3 text-ink outline-none transition-colors focus:border-ink"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full border border-ink bg-ink px-6 py-3 font-condensed text-sm font-semibold uppercase tracking-wide2 text-canvas transition-colors hover:bg-canvas hover:text-ink disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Entrer"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
