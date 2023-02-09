/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "Arial", "sans-serif"],
    },
    extend: {
      boxShadow: {
        DEFAULT: "0px 0px 21px 0px rgba(144, 163, 232, 0.32)",
      },
      backgroundImage: {
        "hero-image" : "linear-gradient(to right, rgba(13, 37, 63, 0.8) 0%, rgba(1, 180, 228, 0.5) 100%), url('https://image.tmdb.org/t/p/original/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg')",
        "footer-image": "linear-gradient(to right, rgba(13, 37, 63, 1) 0%, rgba(1, 180, 228, 0.5) 100%), url('https://image.tmdb.org/t/p/original/ncC9ZgZuKOdaVm7yXinUn26Qyok.jpg')",
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
    },
  },
  plugins: [],
}
