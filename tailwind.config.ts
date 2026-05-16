import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eef4ff",
          100: "#dae6ff",
          200: "#b8d0ff",
          300: "#8ab3ff",
          400: "#5c8eff",
          500: "#3b6bff",
          600: "#2854ef",
          700: "#1f43c2",
          800: "#1a379e",
          900: "#0f1f5c",
          950: "#08103a",
        },
        surface: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        "card":    "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        "card-lg": "0 4px 16px -4px rgb(0 0 0 / 0.10), 0 2px 6px -2px rgb(0 0 0 / 0.06)",
        "glow":    "0 0 0 3px rgb(59 107 255 / 0.18)",
        "glow-lg": "0 0 24px -4px rgb(59 107 255 / 0.35)",
        "pop":     "0 10px 32px -8px rgb(0 0 0 / 0.15), 0 2px 8px -2px rgb(0 0 0 / 0.08)",
        "inner-sm":"inset 0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      animation: {
        "fade-in":    "fadeIn 0.4s ease both",
        "slide-up":   "slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "slide-down": "slideDown 0.35s cubic-bezier(0.16,1,0.3,1) both",
        "scale-in":   "scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) both",
        "shimmer":    "shimmer 1.8s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "spin-slow":  "spin 3s linear infinite",
        "float":      "float 6s ease-in-out infinite",
        "bounce-sm":  "bounceSm 1s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:    { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp:   { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        slideDown: { from: { opacity: "0", transform: "translateY(-12px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        scaleIn:   { from: { opacity: "0", transform: "scale(0.94)" }, to: { opacity: "1", transform: "scale(1)" } },
        shimmer: {
          from: { backgroundPosition: "-200% center" },
          to:   { backgroundPosition: "200% center" },
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 0 0 rgb(59 107 255 / 0)" },
          "50%":     { boxShadow: "0 0 20px 4px rgb(59 107 255 / 0.22)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-12px)" },
        },
        bounceSm: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-4px)" },
        },
      },
      backgroundImage: {
        "gradient-mesh":
          "radial-gradient(at 20% 30%, hsl(220,100%,95%) 0px, transparent 60%), radial-gradient(at 80% 20%, hsl(260,100%,94%) 0px, transparent 50%), radial-gradient(at 60% 80%, hsl(200,100%,94%) 0px, transparent 50%)",
        "gradient-brand":
          "linear-gradient(135deg, #2854ef 0%, #7c3aed 100%)",
        "shimmer-line":
          "linear-gradient(90deg, transparent 0%, rgb(255 255 255 / 0.4) 50%, transparent 100%)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
