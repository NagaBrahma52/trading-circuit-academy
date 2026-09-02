import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        circuit: {
          green: "#3FE05C",
          "green-dark": "#1FA83F",
          ink: "#0B0F0D",
          bg: "#F4F6F4",
          card: "#EAEDEA",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        pill: "0 2px 10px rgba(11, 15, 13, 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
