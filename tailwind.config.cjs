/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    gridTemplateColumns: {
      "fit-500": "repeat(auto-fit, minmax(500px, 1fr))",
      "fit-300": "repeat(auto-fit, minmax(300px, 1fr))",
    },
    extend: {},
  },
  plugins: [],
};
