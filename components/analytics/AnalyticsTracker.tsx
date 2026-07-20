"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const CONSENT_KEY = "hors-champ-cookie-consent";
const SESSION_KEY = "hc_session_id";

function hasConsent(): boolean {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

function getSessionId(): string {
  try {
    let id = window.localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "unknown";
  }
}

function sendEvent(payload: Record<string, unknown>) {
  if (!hasConsent()) return;
  const body = JSON.stringify({ ...payload, sessionId: getSessionId() });
  const url = "/api/analytics/event";
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
  } else {
    fetch(url, { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(
      () => {}
    );
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    sendEvent({ type: "page_view", path: pathname });
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const trackEl = target?.closest<HTMLElement>("[data-track]");
      if (!trackEl) return;
      sendEvent({ type: "click", path: window.location.pathname, label: trackEl.dataset.track });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
