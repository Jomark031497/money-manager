/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#faf5fb",
        secondary: "#a24bb5",
        accent: "#ca7eac",
        text: "#140916",
      },
    },
  },
  plugins: [],
};
