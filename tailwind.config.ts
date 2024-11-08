import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      keyframes: {
        "vibration-down-8px": {
          "0%": { transform: "translateY(8px) rotate(0deg)" },
          "33%": { transform: "translateY(8px) rotate(-1deg)" },
          "67%": { transform: "translateY(8px) rotate(1deg)" },
          "100%": { transform: "translateY(8px) rotate(0deg)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        "fade-out-left": {
          "0%": { opacity: "1", transform: "translateX(0px)" },
          "100%": { opacity: "0", transform: "translateX(-20px)" },
        },
        "fade-out-right": {
          "0%": { opacity: "1", transform: "translateX(0px)" },
          "100%": { opacity: "0", transform: "translateX(20px)" },
        },
        "fade-out-down": {
          "0%": { opacity: "1", transform: "translateY(0px)" },
          "100%": { opacity: "0", transform: "translateY(20px)" },
        },
      },
      colors: {
        transparent: "transparent",
        // 기본 색상
        black: "#000000",
        white: "#ffffff",
        gray: {
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
        dark: {
          DEFAULT: "#1e1e1e",
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#1e1e1e",
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
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
