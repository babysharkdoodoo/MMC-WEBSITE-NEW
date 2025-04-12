import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
        serif: ["var(--font-stix-two)", "serif"],
        sans: ["var(--font-quicksand)", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        wave: {
          "0%": { transform: "translateX(0) translateY(0)" },
          "25%": { transform: "translateX(5px) translateY(-5px)" },
          "50%": { transform: "translateX(0) translateY(0)" },
          "75%": { transform: "translateX(-5px) translateY(5px)" },
          "100%": { transform: "translateX(0) translateY(0)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)" },
        },
        scale: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 3s ease-in-out infinite",
        spin: "spin 10s linear infinite",
        "spin-slow": "spin 15s linear infinite",
        "spin-fast": "spin 5s linear infinite",
        wave: "wave 5s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        bounce: "bounce 1s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        glow: "glow 2s ease-in-out infinite",
        scale: "scale 2s ease-in-out infinite",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "hsl(var(--foreground))",
            a: {
              color: "hsl(var(--primary))",
              "&:hover": {
                color: "hsl(var(--primary))",
                opacity: 0.8,
              },
            },
            h1: {
              fontFamily: theme("fontFamily.mono"),
              fontWeight: 700,
              color: "hsl(var(--foreground))",
            },
            h2: {
              fontFamily: theme("fontFamily.mono"),
              fontWeight: 700,
              color: "hsl(var(--foreground))",
            },
            h3: {
              fontFamily: theme("fontFamily.mono"),
              fontWeight: 600,
              color: "hsl(var(--foreground))",
            },
            h4: {
              fontFamily: theme("fontFamily.mono"),
              fontWeight: 600,
              color: "hsl(var(--foreground))",
            },
            blockquote: {
              fontStyle: "italic",
              borderLeftColor: "hsl(var(--primary))",
              color: "hsl(var(--foreground))",
              opacity: 0.8,
            },
            code: {
              fontFamily: theme("fontFamily.mono"),
              color: "hsl(var(--primary))",
              backgroundColor: "hsl(var(--muted))",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
            },
            pre: {
              backgroundColor: "hsl(var(--muted))",
              borderRadius: "0.5rem",
              padding: "1rem",
            },
            strong: {
              fontWeight: 600,
              color: "hsl(var(--foreground))",
            },
            table: {
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
            },
            thead: {
              fontFamily: theme("fontFamily.mono"),
            },
            "thead th": {
              fontWeight: 600,
              color: "hsl(var(--foreground))",
            },
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config

export default config
