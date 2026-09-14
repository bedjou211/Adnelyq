import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#151B18",
        muted: "#617068",
        line: "#DDE5DF",
        brand: "#1D6B4F",
        lime: "#DDF569"
      }
    }
  },
  plugins: []
} satisfies Config;
