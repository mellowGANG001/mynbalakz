import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // MYNBALA Brand Colors
        primary: {
          DEFAULT: "#7DD957",
          50: "#F2FBEF",
          100: "#E6F8DE",
          200: "#D1F1BE",
          300: "#BCEB9E",
          400: "#98DF6D",
          500: "#7DD957",
          600: "#5CB338",
          700: "#46892A",
          800: "#315E1C",
          900: "#1B340F",
        },
        secondary: {
          DEFAULT: "#FFD93D",
          50: "#FFFDF0",
          100: "#FFF9DB",
          200: "#FFF2B0",
          300: "#FFE785",
          400: "#FFDD5A",
          500: "#FFD93D",
          600: "#F5C400",
          700: "#BD9700",
          800: "#856A00",
          900: "#4D3D00",
        },
        accent: {
          DEFAULT: "#00B4D8",
          50: "#E0F7FF",
          100: "#B8ECFF",
          200: "#90E0EF",
          300: "#5DD3F3",
          400: "#20C6E6",
          500: "#00B4D8",
          600: "#0092B0",
          700: "#00718A",
          800: "#005165",
          900: "#003241",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        "4xl": "2.5rem",
        "5xl": "3rem",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        glow: "var(--shadow-glow)",
        "glow-secondary": "var(--shadow-glow-yellow)",
        "glow-accent": "var(--shadow-glow-blue)",
      },
      backgroundImage: {
        "gradient-brand": "var(--gradient-brand)",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
