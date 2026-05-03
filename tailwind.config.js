/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        linen: "#F7F1E8",
        mist: "#E8F0ED",
        harbor: "#164A4F",
        pine: "#1F6B5C",
        clay: "#B75D3A",
        honey: "#EAB86B",
        ink: "#183233",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(24, 50, 51, 0.10)",
        lift: "0 14px 30px rgba(24, 50, 51, 0.14)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
