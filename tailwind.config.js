/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      sans: "Montserrat, sans-serif",
      serif: "Platypi, serif",
    },
    extend: {
      colors: {
        purple: "#715B64",
        sand: "#FDFAF8",
        green: "#89937C",
      },
    },
  },
  plugins: [],
};
