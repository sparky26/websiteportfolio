import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "Apple Color Emoji", "Segoe UI Emoji"]
      },
      colors: {
        ink: {
          950: "#06080d",
          900: "#0b1020",
          800: "#121a2f",
          700: "#1a2440"
        }
      }
    }
  },
  plugins: []
} satisfies Config;
