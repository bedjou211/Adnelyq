import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: { extend: { colors: { ink: "#141714", muted: "#687069", line: "#E1E5E1", brand: "#225D47" } } },
  plugins: []
} satisfies Config;
