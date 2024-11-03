import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        // 기본 색상
        black: "#000000",
        white: "#ffffff",
        "gray": {
          DEFAULT: "#b4b4b4",
          50: "#f7f7f7",
          100: "#ededed",
          200: "#dfdfdf",
          300: "#c8c8c8",
          400: "#b4b4b4",
          500: "#999999",
          600: "#888888",
          700: "#7b7b7b",
          800: "#676767",
          900: "#545454",
          950: "#363636",
        },
        // 재료 색상
        "tier-5": "#ffc802",
        "tier-4": "#d4c3d4",
        "tier-3": "#00b2f6",
        "tier-2": "#dce537",
        "tier-1": "#a0a0a0",
      },
    },
  },
  plugins: [],
};
export default config;
