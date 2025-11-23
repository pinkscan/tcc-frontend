/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pinkscan: {
          light: "#ffd3de",
          primary: "#f26a9b",
          dark: "#33343b",
        },
      },
    },
  },
  plugins: [],
};
