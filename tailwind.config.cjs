/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: "0px 0px 21px 0px rgba(144, 163, 232, 0.32)",
      },
    },
  },
  plugins: [],
}
