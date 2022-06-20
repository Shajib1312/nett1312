/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        firefly: {
          DEFAULT: "#0A1929",
          50: "#4778D2",
          100: "#326BCD",
          200: "#2859A4",
          300: "#1E467B",
          400: "#143052",
          500: "#0A1929",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    // ...
  ],
};
