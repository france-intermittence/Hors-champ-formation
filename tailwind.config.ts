import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F7F6F2",
        paper: "#FFFFFF",
        ink: {
          DEFAULT: "#0A0A0A",
          deep: "#050505",
        },
        muted: "#565656",
        line: "#D8D8D8",
        ghost: "#B8B8B8",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Impact", "Haettenschweiler", "sans-serif"],
        condensed: ["var(--font-barlow)", "Arial Narrow", "sans-serif"],
        sans: ["var(--font-inter)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        container: "1440px",
      },
      letterSpacing: {
        label: "0.22em",
        wide2: "0.16em",
      },
      spacing: {
        gutter: "clamp(1.25rem, 4vw, 4rem)",
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 9vw, 9rem)", { lineHeight: "0.9", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2.75rem, 6vw, 6rem)", { lineHeight: "0.92", letterSpacing: "0em" }],
        "display-md": ["clamp(2rem, 4.5vw, 3.75rem)", { lineHeight: "0.95" }],
      },
      keyframes: {
        reveal: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ghost-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "0.12" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        reveal: "reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
