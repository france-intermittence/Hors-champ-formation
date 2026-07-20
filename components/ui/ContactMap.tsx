"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { MapPin } from "lucide-react";
import { site } from "@/data/navigation";

const formationLocation = {
  longitude: 2.4057553,
  latitude: 48.86032,
  zoom: 15.6,
};

export default function ContactMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [formationLocation.longitude, formationLocation.latitude],
      zoom: formationLocation.zoom,
      attributionControl: { compact: true },
      cooperativeGestures: true,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    const markerEl = document.createElement("div");
    markerEl.className =
      "group relative flex h-16 w-16 -translate-y-1 items-center justify-center";

    const shadow = document.createElement("span");
    shadow.style.cssText =
      "position:absolute;bottom:4px;left:50%;width:28px;height:10px;transform:translateX(-50%);border-radius:999px;background:rgba(10,10,10,.16);filter:blur(5px);";

    const pin = document.createElement("span");
    pin.style.cssText =
      "position:relative;display:flex;width:48px;height:48px;align-items:center;justify-content:center;border:1px solid #0A0A0A;background:#0A0A0A;color:#F7F6F2;box-shadow:0 14px 34px rgba(0,0,0,.24);transform:rotate(45deg);";

    const dot = document.createElement("span");
    dot.style.cssText =
      "display:block;width:12px;height:12px;border:2px solid currentColor;border-radius:999px;transform:rotate(-45deg);";

    pin.appendChild(dot);
    markerEl.append(shadow, pin);

    const popupNode = document.createElement("div");
    popupNode.style.cssText =
      "font-family: Arial, sans-serif; color: #0A0A0A; min-width: 230px;";

    const eyebrow = document.createElement("span");
    eyebrow.textContent = "Lieu de formation";
    eyebrow.style.cssText =
      "display:inline-flex;margin-bottom:10px;border:1px solid #D8D8D8;padding:4px 8px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.16em;color:#565656;";

    const title = document.createElement("strong");
    title.textContent = site.name;
    title.style.cssText =
      "display:block;font-size:16px;line-height:1.05;text-transform:uppercase;letter-spacing:.1em;";

    const address = document.createElement("span");
    address.textContent = `${site.address.street}\n${site.address.zip} ${site.address.city}`;
    address.style.cssText =
      "display:block;margin-top:10px;white-space:pre-line;font-size:13px;line-height:1.55;color:#565656;";

    const routeLink = document.createElement("a");
    routeLink.href = `https://www.openstreetmap.org/?mlat=${formationLocation.latitude}&mlon=${formationLocation.longitude}#map=17/${formationLocation.latitude}/${formationLocation.longitude}`;
    routeLink.target = "_blank";
    routeLink.rel = "noopener noreferrer";
    routeLink.textContent = "Voir l'itinéraire";
    routeLink.style.cssText =
      "display:inline-flex;margin-top:14px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:#0A0A0A;text-decoration:underline;text-underline-offset:4px;";

    popupNode.append(eyebrow, title, address, routeLink);

    const popup = new maplibregl.Popup({
      offset: 28,
      closeButton: false,
      closeOnClick: false,
      className: "contact-map-popup",
    }).setDOMContent(popupNode);

    new maplibregl.Marker({ element: markerEl, anchor: "bottom" })
      .setLngLat([formationLocation.longitude, formationLocation.latitude])
      .setPopup(popup)
      .addTo(map);

    return () => map.remove();
  }, []);

  return (
    <section className="border-y border-line bg-canvas">
      <div className="grid lg:grid-cols-[1fr_420px]">
        <div
          ref={containerRef}
          className="h-[420px] min-h-[320px] w-full lg:h-[520px]"
          role="img"
          aria-label={`Carte du lieu de formation : ${site.address.zip} ${site.address.city}`}
        />
        <div className="flex flex-col justify-center border-t border-line bg-paper p-8 lg:border-l lg:border-t-0 lg:p-12">
          <p className="font-condensed text-xs font-semibold uppercase tracking-label text-muted">
            Lieu de formation
          </p>
          <div className="mt-5 flex items-start gap-4">
            <MapPin className="mt-1 h-6 w-6 shrink-0 text-ink" strokeWidth={1.5} aria-hidden />
            <div>
              <h2 className="font-display text-4xl uppercase leading-none">
                Paris
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {site.address.street}
                <br />
                {site.address.zip} {site.address.city}, {site.address.country}
              </p>
              <a
                href={`https://www.openstreetmap.org/?mlat=${formationLocation.latitude}&mlon=${formationLocation.longitude}#map=15/${formationLocation.latitude}/${formationLocation.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex font-condensed text-sm font-semibold uppercase tracking-wide2 text-ink underline underline-offset-4"
              >
                Ouvrir la carte
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
