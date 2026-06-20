/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // "Mission Control" palette — deep navy base with circuit-amber + signal-cyan accents.
        ink: {
          950: "#070A12",
          900: "#0A0E1A",
          800: "#0F1424",
          700: "#141A2E",
          600: "#1B2238",
        },
        slate: {
          250: "#C7CEE0",
          350: "#9AA5C0",
        },
        amber: {
          400: "#FFC247",
          500: "#FDB813",
          600: "#E89F00",
        },
        signal: {
          400: "#5CF0E0",
          500: "#22D3EE",
          600: "#0EA5C4",
        },
      },
      fontFamily: {
        display: ["Unbounded", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(253,184,19,0.15), 0 20px 60px -20px rgba(253,184,19,0.35)",
        "glow-cyan": "0 0 0 1px rgba(34,211,238,0.15), 0 20px 60px -20px rgba(34,211,238,0.35)",
        panel: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 30px 60px -30px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
