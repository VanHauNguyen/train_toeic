import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgba(148, 163, 184, 0.22)",
        input: "rgba(148, 163, 184, 0.22)",
        ring: "#38bdf8",
        background: "#061221",
        foreground: "#e5eefc",
        primary: {
          DEFAULT: "#38bdf8",
          foreground: "#04111f",
        },
        secondary: {
          DEFAULT: "rgba(15, 23, 42, 0.86)",
          foreground: "#dbeafe",
        },
        muted: {
          DEFAULT: "rgba(30, 41, 59, 0.72)",
          foreground: "#94a3b8",
        },
        accent: {
          DEFAULT: "#22d3ee",
          foreground: "#04111f",
        },
        destructive: {
          DEFAULT: "#f43f5e",
          foreground: "#fff1f2",
        },
        card: {
          DEFAULT: "rgba(15, 23, 42, 0.62)",
          foreground: "#e5eefc",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(56, 189, 248, 0.18), 0 24px 80px rgba(8, 47, 73, 0.42)",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
