/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#faf9ec",
          100: "#f4f2cd",
          200: "#ebe39d",
          300: "#dfce65",
          400: "#d4b83b",
          500: "#c7a52e",
          600: "#a98125",
          700: "#875f21",
          800: "#714e22",
          900: "#614122",
          950: "#382210",
        },
      },
      fontFamily: {
        quicksand: "'Quicksand', sans-serif",
      },
    },
  },
  plugins: [],
};
