/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#212429",
        light: "#5F5C67",
        accent: "#0062F4",
      },
    },
  },
  plugins: [],
};
