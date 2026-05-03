/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        linen: "#F7FAF8",
        mist: "#EEF7F3",
        harbor: "#0B1F33",
        fjord: "#123047",
        ink: "#102A43",
        pine: "#66C244",
        leaf: "#4EAD3A",
        slate: "#5C6B73",
        clay: "#4EAD3A",
        honey: "#F2B84B",
      },
      boxShadow: {
        soft: "0 18px 48px rgba(11, 31, 51, 0.10)",
        lift: "0 20px 42px rgba(11, 31, 51, 0.16)",
        glow: "0 24px 70px rgba(102, 194, 68, 0.18)",
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
