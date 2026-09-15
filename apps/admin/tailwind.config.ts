import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18201C",
        muted: "#68736D",
        line: "#E2E8E4",
        brand: "#176B4D",
        lime: "#DDF36A",
        canvas: "#F5F7F5"
      },
      boxShadow: { card: "0 1px 2px rgba(24,32,28,.04), 0 12px 32px rgba(24,32,28,.05)" }
    }
  },
  plugins: []
} satisfies Config;
