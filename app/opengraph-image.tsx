import { ImageResponse } from "next/og";

export const alt =
  "Hors Champ Formation — Formation audiovisuelle en présentiel à Paris";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Image Open Graph générée (monochrome, esprit de l'identité).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F7F6F2",
          color: "#0A0A0A",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#565656",
          }}
        >
          <span>Formation audiovisuelle</span>
          <span>Paris</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 150,
              fontWeight: 800,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: -4,
            }}
          >
            Hors Champ
          </span>
          <span
            style={{
              fontSize: 38,
              marginTop: 28,
              color: "#565656",
              maxWidth: 820,
            }}
          >
            Ce que vous ne voyez pas fait la différence.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            fontSize: 22,
            textTransform: "uppercase",
            letterSpacing: 4,
            color: "#565656",
          }}
        >
          <span>Tournage</span>
          <span>·</span>
          <span>Image</span>
          <span>·</span>
          <span>Son</span>
          <span>·</span>
          <span>Postproduction</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
