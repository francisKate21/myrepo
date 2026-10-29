import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: "var(--coral)",
        sunshine: "var(--sunshine)",
        ink: "var(--ink)",
        cream: "var(--cream)",
      },
    },
  },
  plugins: [],
};

export default config;
