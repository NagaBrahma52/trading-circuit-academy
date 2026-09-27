import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        circuit: {
          green: "#8CFF2E",
          "green-dark": "#69CC12",
          ink: "#000000",
          bg: "#000000",
          card: "#0C0F0C",
          border: "rgba(255,255,255,0.08)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        pill: "0 2px 10px rgba(0, 0, 0, 0.3)",
        glow: "0 0 60px rgba(140, 255, 46, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
