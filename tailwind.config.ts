import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enables dark mode using the "dark" class
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          400: "#60a5fa",
          500: "#3b82f6",
          700: "#1e40af",
        },
        gray: {
          800: "#1f2937",
        },
      },
    },
  },
  plugins: [],
};

export default config;
